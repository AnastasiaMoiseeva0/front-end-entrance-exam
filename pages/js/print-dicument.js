(function() {
    document.getElementById('print').addEventListener('click', () => {
        const style = document.createElement('style');
        const height = document.body.scrollHeight;

        style.innerHTML = `@page {size: 595px ${height}px; margin: 0 }`;
        document.head.appendChild(style);

        window.print();

        document.head.removeChild(style);
    });
})()