(function() {
    window.addEventListener('click', function (e) {
        if (e.target.getAttribute('contenteditable')) {
            return;
        }
    
        const xInside = e.offsetX;
        const yInside = e.offsetY;

        if(window.getComputedStyle(e.target).position !== 'absolute') {
            e.target.classList.add('prevent-overflow');
        }
    
        const circle = document.createElement('span');
        circle.classList.add('circle');
        circle.style.top = yInside + 'px';
        circle.style.left = xInside + 'px';
    
        e.target.appendChild(circle);
    
        setTimeout(() => {
            e.target.classList.remove('prevent-overflow');
            circle.remove();
        }, 500);
    });
})()