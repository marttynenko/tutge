$.fn.extend({
	printElement: function() {
		var frameName = 'printIframe';
		var doc = window.frames[frameName];
		if (!doc) {
			$('<iframe>').hide().attr('name', frameName).appendTo(document.body);
			doc = window.frames[frameName];
		}
		doc.document.body.innerHTML = this.html();
		doc.window.print();
		return this;
	}
});


$.extend(true, $.magnificPopup.defaults, {
  tClose: 'Закрыть (Esc)', // Alt text on close button
  tLoading: 'Загрузка...', // Text that is displayed during loading. Can contain %curr% and %total% keys
  gallery: {
    tPrev: 'Предыдущий (Левая стрелка на клавиатуре)', // Alt text on left arrow
    tNext: 'Следующий (Правая стрелка на клавиатуре)', // Alt text on right arrow
    tCounter: '%curr% из %total%' // Markup for "1 of 7" counter
  },
  image: {
    tError: 'Ошибка. <a href="%url%">Изображение</a> не может быть загружено.' // Error message when image could not be loaded
  },
  ajax: {
    tError: 'Ошибка. <a href="%url%">Содержимое</a> не может быть загружено.' // Error message when ajax request failed
  }
});




jQuery(document).ready(function($){

	if (window.devicePixelRatio == 1) {
		$('html').addClass('no-retina');
	}
	
	var slickChannels = $('.slick-channels');
	slickChannels.slick({
		slidesToShow: 4,
		responsive: [
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 5,
				}
			},
			{
				breakpoint: 850,
				settings: {
					slidesToShow: 4,
				}
			},
			{
				breakpoint: 576,
				settings: {
					slidesToShow: 3
				}
			},
			{
				breakpoint: 410,
				settings: {
					slidesToShow: 2
				}
			}
		]
	});

	$('.add-feed-item .btn').on('click',function(e){
		e.preventDefault();
		if (this.lastChild.textContent == 'Написать') {
			$('.add-feed-form').slideDown(200);
			this.lastChild.textContent = 'Скрыть';
		} else {
			$('.add-feed-form').slideUp(200);
			this.lastChild.textContent = 'Написать';
		}
		/*$('.add-feed-form').slideToggle(200);
		console.log(this.lastChild.textContent);*/
	});

	function readURL(input) {
	  if (input.files && input.files[0]) {
	    var reader = new FileReader();
	    reader.onload = function(e) {
				//$('.preview-avatar img').attr('src', e.target.result);
				var img =	document.createElement('img');
				img.src = e.target.result;
				$(input).next().remove();
				$(input).after(img);
	    }
	    reader.readAsDataURL(input.files[0]);
	  }
	}

	$('.upload-with-preview input[type="file"]').on('change',function(){
		readURL(this);
	});
	$('.account-ava-file input[type="file"]').on('change',function(){
		readURL(this);
	});


	$('.feed-panel-search-toggler').on('click',function(e){
		$(this).toggleClass('opened');
		$('.feed-panel-search-form').stop().toggleClass('opened');
	})


	$(document).on('click','.feed-item-actions-toggler',function(e){
		e.preventDefault();
		$(this).stop().toggleClass('opened');
		$(this).next().stop().toggleClass('opened');
	})


	$(document).on('mouseup',function(e){
		if ($('.feed-item-actions-links').has(e.target).length === 0){
    	$('.feed-item-actions-links').removeClass('opened');
      $('.feed-item-actions-toggler').removeClass('opened');
    }
	});

	$(document).on('click','.js-trick-phone',function(e){
		e.preventDefault();
		var number = $(this).find('.show-phone').data('phone');
		$(this).find('.show-phone').text(number);
	})


	//Считаем кол-во введеных в инпут/текстарею символов
  function charsLength(selector) {
  	$(selector).each(function(key,item){
  		var count = $(item).attr('maxlength');
			$(item).wrap('<div class="maxlength-wrap"></div>');
			$(item).after('<span class="current-length"><i class="last-length">'+count+'</i> из '+count+'</span>')

	   	$(item).keyup(function(){
	  		var $this = $(this),
	  				$revLength = $this.val().length,
	  				$length = count - $revLength;
	  		$this.next().find('.last-length').text($length);
	   	});
  	});
  }
	charsLength('.maxlength');
	

	$(document).on('click','.mobile-search-toggler',function(e){
		e.preventDefault();
		$('.flx-search').stop().addClass('opened');
	})

	$(document).on('click','.mobile-search-close',function(e){
		e.preventDefault();
		$('.flx-search').stop().removeClass('opened');
	})


	if ( $('.ya-share2').length ) {
		var shareScript = document.createElement('script');
		shareScript.src = '//yastatic.net/share2/share.js';
		document.body.appendChild(shareScript);
	}


	//функция для навешивания изображений фоном
	function backgrounded (selector) {
		$(selector).each(function(){
			var $this = $(this),
			$src = $this.find('.bg').attr('src');
			if($this.find('.bg').length) {
				$this.addClass('backgrounded').css('backgroundImage','url('+$src+')');
			}
		});
	}


	$(document).on('click','.toggleUp',function(e){
		e.preventDefault();
		$(this).prev('.toggledDiv').stop().slideToggle(100);
	});


	$('.middle table').wrap('<div class="responsive-table"></div>');


	
	


  if(matchMedia) {
		var screen992 = window.matchMedia('(max-width:992px)');
		screen992.addListener(changes2);
		changes2(screen992);
	}


	function changes2(screen992) {
		if(screen992.matches) {
			// console.log('<992');
		} else {
		}
	}

	

	//Замена телефонов и email ссылками
	$('.phone-link, .tel').each(function(){
		var phone = $(this).text().replace(/[^+0-9]/g, '');
		$(this).wrapInner('<a href="tel:' + phone + '"></a>');
	});
	$('.mail-link').each(function(){
		var mail = $(this).text().replace(/\W\@/g, '');
		$(this).wrapInner('<a href="mailto:' + mail + '"></a>');
	});






	//разворачиваемые блоки
	$('.toggleDown').on('click',function(e){
		e.preventDefault();
		$(this).toggleClass('opened');
		$(this).next('.toggledDown').slideToggle(150);
	});
   

	
	//инициализация MFP popup для форм
	$(document).on('click','.ajax-mfp',function(){
		var a = $(this);
		$.magnificPopup.open({
			items: { src: a.attr('data-href') },
			type: 'ajax',    
			overflowY: 'scroll',
			removalDelay: 300,
			mainClass: 'my-mfp-zoom-in',
			ajax: {
				tError: 'Ошибка. <a href="%url%">Контент</a> не может быть загружен',
			},
			callbacks: {
				open: function () {
					setTimeout(function(){
						$('.mfp-wrap').addClass('not_delay');
						$('.white-popup').addClass('not_delay');
					},700);
				}
		  }
		});
		return false;
	});


	//стилизация элементов форм
  $(function() {
		$('input[type="checkbox"], input[type="radio"], input[type="file"], select').not('.not-styler').styler({
			singleSelectzIndex: '1',
		});
	});


	$(function() {
    $.fn.scrollToTop = function() {
	    // $(this).hide().removeAttr("href");
	    if ($(window).scrollTop() >= "350") $(this).addClass('active')
	    var scrollDiv = $(this);
	    $(window).scroll(function() {
	     if ($(window).scrollTop() <= "350") $(scrollDiv).removeClass('active')
	     else $(scrollDiv).addClass('active')
	    });
	    $(this).click(function() {
	     $("html, body").animate({scrollTop: 0}, "slow")
	    })
    }
  });
	$(function() {
	 $(".scroll-top").scrollToTop();
	});


	$(document).on('click','.notification-close',function(e){
		e.preventDefault();
		$(this).closest('.notification').slideUp(60);
	});


	$('.slick-slide:not(.slick-cloned) .slick-gallery, .gallery').magnificPopup({
		type: 'image',
		gallery:{
			enabled:true
		}
	});


	$('.tabs a').tabs();


	$(document).on('click','.ob-item-drop-toggler',function(e){
		$(this).toggleClass('opened');
		$(this).next().toggleClass('opened');
	});

	$(document).on('mouseup',function(e){
		if ($('.ob-item-drop').has(e.target).length === 0){
    	$('.ob-item-drop-links').removeClass('opened');
      $('.ob-item-drop-toggler').removeClass('opened');
    }
	});


	$(document).on('click','.phone-from-attr',function(e){
		e.preventDefault();
		var phone = $(this).attr('data-phone');
		$(this).text(phone);
	})

	$(document).on('click','.ui-autocomplete-cancel',function(e){
		e.preventDefault();
		// var parent = $(this).closest('.ui-autocomplete');
		/* parent.find('input').val('');
		parent.find('.ui-autocomplete-drop').removeClass('opened'); */
		$('.ui-autocomplete input').val('');
		$('.ui-autocomplete-drop').removeClass('opened');
	});

	$(document).on('focus','.ui-autocomplete input',function(e){
		var parent = $(this).closest('.ui-autocomplete');
		parent.find('.ui-autocomplete-cancel').addClass('opened');
		parent.find('.ui-autocomplete-drop').addClass('opened');
	});

	$(document).on('blur','.ui-autocomplete input',function(e){
		console.log(e.relatedTarget);
		// if(e.relatedTarget !== '')
		setTimeout(function(){
			$('.ui-autocomplete-drop').removeClass('opened');
			$('.ui-autocomplete-cancel').removeClass('opened');
		},500);
	});

	

	$(document).on('click','.field-price-toggler',function(e){
		e.preventDefault();
		$(this).toggleClass('opened');
		$(this).next().slideToggle(100);
	});

	$("#term-range").ionRangeSlider({
		grid: true,
		grid_snap: true
	});


	$('.add-ob-btn').on('click',function(e){
		e.preventDefault();
		$(this).toggleClass('opened');
		$('.add-ob-form').slideToggle(100);
	});


	/* $('.feed-panel-style a').on('click',function(e){
		e.preventDefault();
		var $style = $(this).data('style');
		if ( $(this).hasClass('active') ) {return}
		$('.feed-panel-style a').removeClass('active');
		localStorage.setItem('feedStyle',$style);
		$('.ob-list').attr('data-style',$style);
		$(this).addClass('active');
	}); */
	/* if (localStorage.getItem('feedStyle')) {
		var $style = localStorage.getItem('feedStyle');
		$('.ob-list').attr('data-style',$style);
		$('.feed-panel-style a').removeClass('active');
		$('.feed-panel-style a[data-style="'+$style+'"]').addClass('active');
	} */


	$('.feed-panel-style a').on('click',function(e){
		e.preventDefault();
		var $style = $(this).data('is-full'),
		$storageStyle;
		if ( $(this).hasClass('active') ) {
			$storageStyle = 'compact';
		} else {
			$storageStyle = 'full';
		}
		localStorage.setItem('feedStyle',$storageStyle);
		$('.ob-list').attr('data-style',$storageStyle);
		$(this).toggleClass('active');
	});

	if (localStorage.getItem('feedStyle')) {
		var $style = localStorage.getItem('feedStyle');
		$('.ob-list').attr('data-style',$style);
		if ($style == 'full') {
			$('.feed-panel-style a').addClass('active');
		} else {
			$('.feed-panel-style a').removeClass('active');
		}
	}

	$(document).on('click','.ob-item-to-map',function(e){
		$('.screen-map').addClass('opened');
		window.scrollTo(0,0);
		$('html').addClass('screen-map-open');
	});

	$(document).on('click','.screen-map-close',function(e){
		$('.screen-map').removeClass('opened');
		$('html').removeClass('screen-map-open');
	});


});//ready close


//получаем центр карты
function getMathMapCenter(selector) {
	var cX_all = 0, cY_all = 0, length = $(selector).length;
	$(selector).each(function(key,item){
		var cX = $(item).attr('data-coords').split(',')[0];
		var cY = $(item).attr('data-coords').split(',')[1];

		cX_all += +cX;
		cY_all += +cY;
	});
	cX_all = (cX_all / length).toFixed(6);
	cY_all = (cY_all / length).toFixed(6)
	return [cX_all,cY_all];
}

//формируем карточки объявлений для карты
function renderMapCards(destination, X, Y, avatar, desc, info, adr){
	let mapCard = `<div class="map-card" data-cxy="${X},${Y}">
		<div class="map-card-top flex valign-center">
			<div class="map-card-ava"><img src="${avatar}" /></div>
			<div class="map-card-desc"><span>${desc}</span></div>
		</div>
		<div class="map-card-info flex">${info}</div>
		<div class="map-card-adr"><span>${adr}</span></div>
	</div>`;

	$(destination).append(mapCard);
}

function initObMap(){
	ymaps.ready(function () {
		var obMap = new ymaps.Map("ob-map", {
			center: [55.753215, 37.622504],
			zoom: 10,
			controls: ['zoomControl', 'typeSelector', 'searchControl']
		});

		//obMap.geoObjects.add(myPlacemark);

		//отрубаем скролл карты мышью
		obMap.behaviors.disable('scrollZoom');

		obMap.container.events.add('fullscreenenter', function(){
			obMap.behaviors.enable(['scrollZoom']);
		});
		obMap.container.events.add('fullscreenexit', function(){
			obMap.behaviors.disable(['scrollZoom']);
		});
	});
}


$(window).on('load',function(){

	$('.preloader').addClass('loaded');
	setTimeout(function(){
		$('.preloader').remove();
	},350);

	var yaMapScript = document.createElement('script');
	yaMapScript.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU';
	

	if ( $('.ob-item').length ) {
		document.body.appendChild(yaMapScript);

		yaMapScript.onload = function(){
			ymaps.ready(function () {
        var myMap = new ymaps.Map("screen-map", {
          center: getMathMapCenter('.ob-item'),
					zoom: 11,
					controls: ['zoomControl', 'typeSelector']
        });
				
        var pin = document.querySelectorAll('.ob-item');
        for(var i = 0; i < pin.length; i++) {
					var pinCoords = pin[i].getAttribute('data-coords'),
							pinAdr = pin[i].getAttribute('data-adr'),
							pinX = (pinCoords === null) ? 0 : pinCoords.split(',')[0],
							pinY = (pinCoords === null) ? 0 : pinCoords.split(',')[1],
							pinAva = pin[i].querySelector('.ob-item-author img').src,
							pinTxt = pin[i].querySelector('.ob-item-txt').textContent,
							pinInfo = pin[i].querySelector('.ob-item-bottom').innerHTML;

					
					if (pinCoords !== null) {
						var currentPin = 'pin'+i;
						
						currentPin = new ymaps.Placemark([pinX, pinY], {
							hintContent: pinAdr,
						},{
							iconLayout: 'default#image',
							iconImageHref: 'images/svg/pin-new.svg',
							iconImageSize: [32, 52],
							iconImageOffset: [-16, -52],
						});

						//добавляем все пины на карту
						myMap.geoObjects.add(currentPin);

						currentPin.events.add('click', function(e){
							var pinCoords = e.get('target').geometry.getCoordinates();
							var card = document.querySelector('[data-cxy="'+pinCoords+'"]');
							$('.map-card').removeClass('active');
							card.classList.add('active');
							card.scrollIntoView();
						});
						renderMapCards('.screen-map-feed', pinX, pinY, pinAva, pinTxt, pinInfo, pinAdr);
					}
        }


        //отрубаем скролл карты мышью
        /* myMap.behaviors.disable('scrollZoom');
        myMap.container.events.add('fullscreenenter', function(){
          myMap.behaviors.enable(['scrollZoom']);
        });
        myMap.container.events.add('fullscreenexit', function(){
          myMap.behaviors.disable(['scrollZoom']);
				}); */
				
				$(document).on('click','.map-card-adr, .map-card-desc',function(e){
					e.preventDefault();
					var card = $(this).closest('.map-card'),
							coords = card.attr('data-cxy');
					var cX = parseFloat(coords.split(',')[0]), cY = parseFloat(coords.split(',')[1]);
					console.log(cX,cY);
					setTimeout(function(){
						if (myMap.getZoom() === 11) {
							myMap.setZoom(13);
						}
						myMap.panTo([cX,cY], {});
						$('.map-card').removeClass('active');
						card.addClass('active');
					},10);
				});
			});

			initObMap();
		}/* script onload */
	}/* if end */

});