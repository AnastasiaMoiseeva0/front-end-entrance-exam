(function() {
    class EditableElementsManager {
        LOCAL_STORAGE_KEY = 'RESUME_VALUE';

        editableElements = [];
        resume = {};

        init() {
            this.editableElements = document.querySelectorAll('[data-resume-field]');
            this.resume = JSON.parse(localStorage.getItem(this.LOCAL_STORAGE_KEY)) || {};

            this._initGlobalEventListners();

            this.editableElements.forEach((element) => {
                const fieldName = element.getAttribute('data-resume-field');
                this._createNestedEditor(element, fieldName);
        
                element.addEventListener('input', (event) => this._onEditorInput(event, fieldName));
            });
            
            this._adjustAllEditorsSize();
        }

        destroy() {
            this.editableElements.forEach(element => element.removeEventListener(this._onEditorInput));
        }

        _onEditorInput(event, fieldName) {
            this._fillValueFromStorage(event, fieldName);
            this._adjustEditorSize(event.target);
        }

        _initGlobalEventListners() {
            window.addEventListener('load', () => {
                this._adjustAllEditorsSize();
            });
            window.addEventListener('resize', () => {
                this._adjustAllEditorsSize();
            });
        }

        _createNestedEditor(element, fieldName) {
            const editor = document.createElement('div');
            element.setAttribute('data-resume-field-wrapper', true);
            editor.classList.add('tile__textarea-editor');

            const value = this.resume[fieldName] ? this.resume[fieldName]?.trim() : element.innerText.trim();

            element.innerText = '';
            editor.innerText = value;

            editor.setAttribute('contenteditable', 'plaintext-only');
            element.appendChild(editor);
        }

        _fillValueFromStorage (event, fieldName) {
            this.resume[fieldName] = event.target.innerText;
            localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(this.resume));
        }

        _adjustEditorSize(element) {
            const DEFAULT_HEIGHT = window.getComputedStyle(element).lineHeight;
    
            const parent = element.closest('[data-resume-field-wrapper]');
            parent.style.height = element.scrollHeight ? element.scrollHeight + 'px' : DEFAULT_HEIGHT;
        }

            
        _adjustAllEditorsSize() {
            this.editableElements.forEach((element) => {
                this._adjustEditorSize(element);
            });
        }
    }

    const manager = new EditableElementsManager();

    manager.init();
})();