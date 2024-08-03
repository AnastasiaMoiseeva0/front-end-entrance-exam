
(function() {
    const LOCAL_STORAGE_KEY = 'RESUME_VALUE';
    const editableElements = document.querySelectorAll('[resume-field]');

    let resume = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || {};

    editableElements.forEach(element => {
        const fieldName = element.getAttribute('resume-field');

        // Здесь должен быть аналог sanitize, иначе XSS
        element.innerHTML = resume[fieldName] ? resume[fieldName]?.trim() : element.innerHTML.trim();

        element.setAttribute('data-auto-grow', true);
        element.setAttribute('contenteditable', true);

        element.addEventListener('input', event => {
            resume[fieldName] = event.target.innerHTML;
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(resume));
        })
    });
})();

(function() {
    const texareas = document.querySelectorAll('[data-auto-grow]');

    function autoGrow(element) {
        const DEFAULT_HEIGHT = window.getComputedStyle(element).lineHeight;

        element.style.scrollbarWidth = "none";
        element.style.height = 0;
        element.style.height = element.scrollHeight ? element.scrollHeight + "px" : DEFAULT_HEIGHT;
        element.style.removeProperty('scrollbar-width');
    }
    
    function syncTextareas(elements) {
        elements.forEach(element => {
            autoGrow(element)
        });
    };
    
    window.addEventListener('load', function() {
        syncTextareas(texareas);
      });
    window.addEventListener('resize', function() {
        syncTextareas(texareas);
      });
      
    texareas.forEach((element) => {
        element.addEventListener('input', () => {
            autoGrow(element);
        })
    });
})();
