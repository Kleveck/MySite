function changeLanguage(lang) {
    // 1. Atualiza o atributo lang do HTML para boas práticas de SEO/Acessibilidade
    document.documentElement.lang = lang;

    // 2. Traduz elementos simples (h2, p, strong, li) que têm o atributo data-pt
    const elementsToTranslate = document.querySelectorAll('[data-pt]');

    elementsToTranslate.forEach(el => {
        if (lang === 'pt') {
            // Guarda o texto original em inglês se ainda não o fizemos
            if (!el.dataset.en) {
                el.dataset.en = el.innerText;
            }
            el.innerText = el.dataset.pt;
        } else {
            // Volta para o texto em inglês guardado ou o original
            el.innerText = el.dataset.en || el.innerText;
        }
    });

    // 3. Lógica especial para listas complexas (como as Skills ou Experience)
    const listsToTranslate = document.querySelectorAll('[data-pt-list]');
    
    listsToTranslate.forEach(list => {
        const items = list.querySelectorAll('li');
        const translations = list.getAttribute('data-pt-list').split(';');

        items.forEach((li, index) => {
            if (lang === 'pt' && translations[index]) {
                if (!li.dataset.en) li.dataset.en = li.innerText;
                li.innerText = translations[index];
            } else {
                li.innerText = li.dataset.en || li.innerText;
            }
        });
    });
}