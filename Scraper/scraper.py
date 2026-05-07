import os
import json
import time
import pandas as pd
from datetime import datetime
from pathlib import Path
from playwright.sync_api import sync_playwright


current_file = Path(__file__).resolve()
root_dir = current_file.parent.parent
JSON_OUTPUT_PATH = root_dir / "src" / "vagas.json"
CSV_OUTPUT_PATH = current_file.parent / "jobs.csv"
# --------------------

def get_jobs():
    with sync_playwright() as p:
        print("A iniciar o browser...")
        browser = p.chromium.launch(headless=True) # Headless=True para correr no GitHub
        context = browser.new_context(
            user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36"
        )
        page = context.new_page()
        
        # URL do Indeed (podes ajustar os filtros aqui)
        url = "https://pt.indeed.com/jobs?q=junior+it&l=Portugal&sort=date"
        print(f"A abrir: {url}")
        
        try:
            page.goto(url, wait_until="domcontentloaded", timeout=60000)
            time.sleep(4) # Espera para garantir que o JS carrega os cartões
            
            job_cards = page.query_selector_all(".job_seen_beacon")
            print(f"Vagas encontradas na página: {len(job_cards)}")
            
            scraped_jobs = []
            for card in job_cards:
                title_el = card.query_selector(".jobTitle")
                company_el = card.query_selector("[data-testid='company-name']")
                link_el = card.query_selector(".jobTitle a")
                
                if title_el:
                    title = title_el.inner_text().strip()
                    company = company_el.inner_text().strip() if company_el else "N/A"
                    # Criar ID único baseado no título e empresa
                    job_id = f"{title}-{company}".replace(" ", "_").lower()
                    link = "https://pt.indeed.com" + link_el.get_attribute("href")
                    
                    scraped_jobs.append({
                        "id": job_id,
                        "titulo": title,
                        "empresa": company,
                        "link": link,
                        "data_scraped": datetime.now().strftime("%d/%m/%Y"),
                        "status": "Nova"
                    })

            if scraped_jobs:
                # 1. Lógica para o CSV (Histórico Completo)
                df_new = pd.DataFrame(scraped_jobs)
                if os.path.exists(CSV_OUTPUT_PATH):
                    df_old = pd.read_csv(CSV_OUTPUT_PATH)
                    # Junta o que já tinhas com o novo, removendo duplicados pelo ID
                    df_final = pd.concat([df_old, df_new]).drop_duplicates(subset=['id'], keep='first')
                else:
                    df_final = df_new
                
                df_final.to_csv(CSV_OUTPUT_PATH, index=False)
                
                # 2. Lógica para o JSON (Alimentar o React)
                # Vamos converter o DataFrame final para uma lista de dicionários para o JSON
                jobs_list = df_final.to_dict(orient="records")
                
                # Garante que a pasta src existe antes de salvar (importante para o GitHub Actions)
                os.makedirs(os.path.dirname(JSON_OUTPUT_PATH), exist_ok=True)
                
                with open(JSON_OUTPUT_PATH, "w", encoding="utf-8") as f:
                    json.dump(jobs_list, f, ensure_ascii=False, indent=4)
                
                print(f"Sucesso! {len(df_final)} vagas totais guardadas no CSV e JSON.")
            else:
                print("Aviso: Nenhuma vaga encontrada. Verifica o seletor ou se houve bloqueio.")
                page.screenshot(path="debug_error.png")

        except Exception as e:
            print(f"Erro durante o scraping: {e}")
        
        browser.close()

if __name__ == "__main__":
    get_jobs()