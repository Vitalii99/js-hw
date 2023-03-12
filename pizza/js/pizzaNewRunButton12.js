window.addEventListener('DOMContentLoaded', () => {

    const runBtn = document.querySelector('#banner');
    const OFFSET = 100;

    //отримуєм розміри елемента width та height з допомогою метода get.ComputedStyle(element)[styleName]
    const widthRunBtn = parseInt(window.getComputedStyle(runBtn)['width']) +
        parseInt(window.getComputedStyle(runBtn)['padding-left']) * 2
    parseInt(window.getComputedStyle(runBtn)['border-left']) * 2
    const heightRunBtn = parseInt(window.getComputedStyle(runBtn)['height']) +
        parseInt(window.getComputedStyle(runBtn)['padding-top']) * 2
    parseInt(window.getComputedStyle(runBtn)['border-top']) * 2

    //отримуєм розміри елемента width та height вікна
    const widthDocument = document.documentElement.clientWidth;
    const heightDocument = document.documentElement.clientHeight;
    
    runBtn.addEventListener('click', () => {
        alert(`Вітаємо! Ви отримали знижку 30%`);
    })

    runBtn.addEventListener('mouseover', (e) => {

        let right = parseInt(window.getComputedStyle(runBtn)["right"])
        let bottom = parseInt(window.getComputedStyle(runBtn)["bottom"])

        const moveX = (x) => { runBtn.style.right = `${right + x}px`; }
        const moveY = (y) => { runBtn.style.bottom = `${bottom + y}px`; }

        if (e.offsetX < widthRunBtn / 2) {
            (e.clientX < (widthDocument - (widthRunBtn + OFFSET))) ? moveX(-OFFSET) : moveX(OFFSET);
        }

        if (e.offsetX > widthRunBtn / 2) {
            (e.clientX > (widthRunBtn + OFFSET)) ? moveX(OFFSET) : moveX(-OFFSET);
        }

        if (e.offsetY < heightRunBtn / 2) {
            (e.clientY < heightDocument - (heightRunBtn + OFFSET)) ? moveY(-OFFSET) : moveY(OFFSET);
        }

        if (e.offsetY > heightRunBtn / 2) {
            (e.clientY > (heightRunBtn + OFFSET)) ? moveY(OFFSET) : moveY(-OFFSET);
        }

    })
})