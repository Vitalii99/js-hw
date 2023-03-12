'use strict'
/** Додайте на сайт по замовленню піци слайдер із 3-х картинок, які знаходяться в папці img.
 * Слайдер повинен переміщати картинки кожні 15 секунд. Також користувач натискаючи стрілку з
 * ліва чи з права міг самовільно переміщати картинки. Реалізувати слайдер використовуючи jQuery. 
*/

$(document).ready(function () {
    // cache DOM
    const containerSlides = $('#container .slides');
    const slides = $('div.picture');
    const wrapperDots = $('#container .dots');
    const dots = $('div.dot');

    // button function to move slides to the right
    function moveRight() {
        // cache DOM
        const currentSlide = $('div.active');
        const nextSlide = currentSlide.next();
        const validDot = $('div.valid');
        const nextDot = validDot.next();

        if (nextSlide.length !== 0 && nextDot.length !== 0) {
            containerSlides.find(currentSlide).next().addClass('active').prev().removeClass('active');
            wrapperDots.find(validDot).next().addClass('valid').prev().removeClass('valid');
        } else {
            currentSlide.removeClass('active');
            slides.first().addClass('active');
            validDot.removeClass('valid');
            dots.first().addClass('valid');
        }

    };

    // handler button to move slides to the right
    $('.next').on('click', function (e) {
        moveRight();
    });

    // handler button to move slides to the left
    $('.prev').on('click', function (e) {
        // cache DOM
        const currentSlide = $('div.active');
        const prevSlide = currentSlide.prev();
        const validDot = $('div.valid');
        const prevDot = validDot.prev();

        if (prevSlide.length === 0 && prevDot.length === 0) {
            currentSlide.removeClass('active');
            slides.last().addClass('active');
            validDot.removeClass('valid');
            dots.last().addClass('valid');
        } else {
            containerSlides.find(currentSlide).prev().addClass('active').next().removeClass('active');
            wrapperDots.find(validDot).prev().addClass('valid').next().removeClass('valid');
        }

    });

    // configaration of the slider
    const pause = 15000;
    let interval;

    // slider launch function
    function startSlider() {
        interval = setInterval(function () {
            moveRight();
        }, pause);
    };

    // slider stop function
    function stopSlider() {
        clearInterval(interval);
    };

    // launch the slider
    startSlider();

    // cache DOM
    const btnNext = $('button.next');
    const btnPrev = $('button.prev');

    /** on the buttons, when hovering the mouse pointer, the slider stops working, and when you leave it,
    * it resumes
    */
    btnNext.on('mouseover', stopSlider).on('mouseout', startSlider);
    btnPrev.on('mouseenter', stopSlider).on('mouseleave', startSlider);
});

