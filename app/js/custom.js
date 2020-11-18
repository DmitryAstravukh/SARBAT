
$(document).ready(function(){

	/*------ Прокрутка вниз --------*/
    $('.go_to').click(function(event){ // ловим клик по ссылке с классом go_to
    	event.preventDefault();
			var scroll_el = $(this).attr('href'); // возьмем содержимое атрибута href, должен быть селектором, т.е. например начинаться с # или .
        if ($(scroll_el).length != 0) { // проверим существование элемента чтобы избежать ошибки
	    $('html, body').animate({ scrollTop: $(scroll_el).offset().top }, 700); // анимируем скроолинг к элементу scroll_el
        }
    });


/*---------Меню - бургер----------*/
    $('.burger').on('click', function(){
    	$('.menuBurger').slideToggle(300, function(){
    		if($(this).css('display') === 'none'){
    			$(this).removeAttr('style');
    		}
    	})
    });


/*------------------- Прогрессбары ------------------*/
    var bar = new ProgressBar.Circle(container1, {
      strokeWidth: 6,
      easing: 'easeInOut',
      duration: 1400,
      color: '#ad174a',
      trailColor: '#000',
      trailWidth: 1,
      svgStyle: null
    });

    bar.animate(0.7);  // Number from 0.0 to 1.0

    var bar = new ProgressBar.Circle(container2, {
      strokeWidth: 6,
      easing: 'easeInOut',
      duration: 1400,
      color: '#ad174a',
      trailColor: '#000',
      trailWidth: 1,
      svgStyle: null
    });

    bar.animate(0.9);  // Number from 0.0 to 1.0

    var bar = new ProgressBar.Circle(container3, {
      strokeWidth: 6,
      easing: 'easeInOut',
      duration: 1400,
      color: '#ad174a',
      trailColor: '#000',
      trailWidth: 1,
      svgStyle: null
    });

    bar.animate(0.6);  // Number from 0.0 to 1.0

    var bar = new ProgressBar.Circle(container4, {
      strokeWidth: 6,
      easing: 'easeInOut',
      duration: 1400,
      color: '#ad174a',
      trailColor: '#000',
      trailWidth: 1,
      svgStyle: null
    });

    bar.animate(0.4);  // Number from 0.0 to 1.0



/*------------Слайдер---------------*/

function windowSize(){
    if ($(window).width() < '1398'){
        $('.fa-chevron-left').css('display','none');
        $('.fa-chevron-right').css('display','none');
    } else {
    	$('.fa-chevron-left').css('display','block');
      $('.fa-chevron-right').css('display','block');
    }
}
$(window).resize(windowSize);

  $(".slider").slick({
  	arrows: false,
      dots: false,
      infinite: true,
      speed: 300,
      slidesPerRow:2,
      slidesToShow: 2,
      slidesToScroll: 2,
      responsive: [
    {
      breakpoint: 1400,
      settings: {
      	slidesPerRow:2,
        slidesToShow: 2,
        slidesToScroll: 2,
        dots: true
      }
    }, {

      breakpoint: 1000,
      settings: {
        dots: true,
        slidesPerRow:1,
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
      }

    }
  ]
});

  $('.fa-chevron-left').click(function(){
  	$('.slider').slick('slickPrev');
	})

	$('.fa-chevron-right').click(function(){
	  $('.slider').slick('slickNext');
	})

  wow = new WOW(
    {
      offset: 150,
      mobile: false
    })
  wow.init();

});


