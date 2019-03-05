$(document).ready(function() {
	var w=$(window),
		$d=$(document),
		body = $('body'),
		div = $('div'),
		time = '.time',
		moscow = $('#timeMoscow'),
		tokyo = $('#timeTokyo'),
		newYork = $('#timeNewYork'),
		navWrapList = $('.nav-wrapper'),
		navWrapListitem = navWrapList.find('.nav-item'),
		header=$('header'),
		logo=$('#header-logo'),
		$scrollbar=$('#scrollbar'),
		$anchorLink=$('.post-nav-link');

/*	(function() {
		var subscribeModal = document.getElementById('emailSubscribe'),
			day=86400,
			dateForShown = new Date(new Date().getTime() + day * 1000),
			isSubscribe=getCookie('subscribe'),
			thisLocation=location.href;


		document.getElementById('subscribeLocation').value=thisLocation;

		//console.log(isSubscribe);
		if(isSubscribe == 'shown' || isSubscribe == 'signed'){
			return false
		} else {
			var subscribeOpen = setTimeout(function() {
				$(subscribeModal).modal('show');
				document.cookie = "subscribe=shown; path=/; expires=" + dateForShown.toUTCString();
			}, 30000);
		}
	})();*/
/*    (function() {
        var yasub = '.yasub',
            day=86400,
            dateForShown = new Date(new Date().getTime() + day * 1000),
            isYasub=getCookie('yasub');
        $('.yasublater').click(function(event){
            event.preventDefault();
            $(yasub).fadeOut();
        })
        if(isYasub == 'shown' || isYasub == 'signed'){
            return false
        } else {
            var YasubOpen = setTimeout(function() {
                $(yasub).fadeIn();
                document.cookie = "yasub=shown; path=/; expires=" + dateForShown.toUTCString();
            }, 10000);
        }
    })();*/
    $('.ok_cookie').click(function(event){
        event.preventDefault();
        var dateForShown = new Date(2020, 0, 1, 0, 0, 0, 0);
        document.cookie = "cookie_accept=ok; path=/; expires=" + dateForShown.toUTCString();
        $('.cookie_accept').remove();
    })

	//прогрессбар
	if ($('.post_section.active').length > 0){
		w.scroll(function() {
			var scrollTop = w.scrollTop();
			var article = $('.post_section.active'),articleTop = article.offset().top,
				articleHeight = article.outerHeight();

			if( scrollTop >= articleTop && articleTop + articleHeight > scrollTop) {
				var ratio = ((scrollTop - articleTop)/articleHeight)*100;
				$scrollbar.width (ratio + "%");
			}
		});
	}
	/*w.scroll(function() {
		var	ratio = $d.scrollTop () / (($d.height () - w.height ()) / 100);

		$scrollbar.width (ratio + "%");$('#scrollbar').width ("10%");
	});*/

	/* Поделиться */
	var shareURL=window.location.href,
		sharePageTitle=document.getElementsByTagName('title')[0].innerText,
		shareDesc=$("meta[name=\'description\']").attr("content"),
		shareImg=$("meta[property=\'og:image\']").attr("content"),
		shareImgICO=$('.ico_card-ico');

	if(shareImgICO.length!=0){
		shareImg=shareImgICO.find('img').attr('src');
	}

	Share = {
		vkontakte: function() {
			var url  = 'http://vk.com/share.php?';
			url += 'url='          + encodeURIComponent(window.location.href);
			url += '&title='       + encodeURIComponent(sharePageTitle);
			url += '&description=' + encodeURIComponent(shareDesc);
			url += '&image='       + encodeURIComponent(shareImg);
			Share.popup(url);
			console.log(encodeURIComponent(window.location.href));
		},
		odnoklassniki: function() {
			var url  = 'https://connect.ok.ru/dk?cmd=WidgetSharePreview&st.cmd=WidgetSharePreview&st._aid=ExternalShareWidget_SharePreview&st.hosterId=8185092';
			url += '&st.shareUrl='    + encodeURIComponent(window.location.href);
			Share.popup(url);
		},
		facebook: function() {
			var url  = 'http://www.facebook.com/sharer.php?';
			url += '&referrer=social_plugin';
			url += '&u='       + encodeURIComponent(window.location.href);
			url += '&_rdr';
			Share.popup(url);
		},
		twitter: function() {
			var url  = 'http://twitter.com/share?';
			url += 'text='      + encodeURIComponent(sharePageTitle);
			url += '&url='      + encodeURIComponent(window.location.href);
			url += '&counturl=' + encodeURIComponent(window.location.href);
			Share.popup(url);
		},
		google: function() {
			var url  = 'http://plus.google.com/share?';
			url += '&url='      + encodeURIComponent(window.location.href);
			Share.popup(url);
		},

		popup: function(url) {
			window.open(url,'','toolbar=0,status=0,width=626,height=436');
		}
	};

	//плавный скролл
	$anchorLink.click(function(event) {
		event.preventDefault();
		var href=$(this).attr('href');

		$('html, body').animate({scrollTop: $(href).offset().top-$('.for-scroll').outerHeight(true)}, 500);
	});

	//Время на сайте
	setInterval(function() {
		var utc = moment(),

			timeMoscow = utc.utcOffset(3).format('HH:mm:ss'),
			timeTokyo = utc.utcOffset(9).format('HH:mm:ss'),
			timeNewYork = utc.utcOffset(-5).format('HH:mm:ss');

		moscow.find(time).html(timeMoscow);
		tokyo.find(time).html(timeTokyo);
		newYork.find(time).html(timeNewYork);
	}, 1000);

	//Меню
	navWrapListitem.each(function() {
		if(location.href.indexOf(this.getElementsByTagName('a')[0].href) == 0) {
			$(this).children('a').addClass('current');
		}
	});

	/* Копирайт */
	$('#copyright').find('span').html(moment().format('YYYY'));

	/* Голосование */
	$('.user-vote-btn-plus').on('click', function(e) {
		e.preventDefault();
		userVote($('.user-vote-plus'));
		userVote=null;
	});
	$('.user-vote-btn-minus').on('click', function(e) {
		e.preventDefault();
		userVote($('.user-vote-minus'));
		userVote=null;
	});

	//лайтбокс
	$(document).on('click', '[data-toggle="lightbox"]', function(event) {
		event.preventDefault();
		$(this).ekkoLightbox();
	});
	//Вспомнить пароль для авторизации в комментариях
	$(function() {
		var btn = $('#restore_pass_btn'),
			wrapper = $('#auth');

		btn.click(function() {
			wrapper.modal('hide');
		});
	});
	//Очистка списка файлов после отправки сообщения
	$(function() {
		var btnSubmit = $('#submit'),
			btnClear = $('#clear'),
			list = $('#list'),
			files = $('#files');

		btnSubmit.click(function() {
			list.html('');
			files.value = "";
			btnClear.css('display', 'none')
		});
	});
	//Кнопка вверх
	$(function() {
		var scrollHeight = 250,
			toTop = $('#to_top');

		$(window).scroll(function() {
			if($(this).scrollTop() > scrollHeight) {
				toTop.fadeIn();
			} else {
				toTop.fadeOut();
			}

			toTop.click(function() {
				$('html, body').animate({scrollTop: 0}, 500);
				return false;
			});
			if($(this).scrollTop() == 0) $('html, body').stop(true);
		});
	});
	//Работа Popover bootstrap
	$(function() {
		$('[data-toggle="popover"]').popover();

		var btn = $('.popover-btn');

		btn.click(function() {
			$(this).toggleClass('focus');
		});

		/*$(document).mouseup(function(e) {
		 if(btn.has(e.target).length === 0) {
		 if($popover.has(e.target).length === 0) {
		 btn.popover('hide');
		 }
		 }
		 });*/
	});
	//Заголовки категорий
	if(div.is('.subcategory_box')) {
		$(function() {
			var title = $('.subcategory_box').find('h1'),
				titleBackup = title.html(),
				arr = title.html().split(' ');

			titleSlice();

			$(window).resize(function() {
				titleSlice();
			});

			function titleSlice() {
				if($(window).width() < '992') {
					title.html(arr[0]);
				} else {
					title.html(titleBackup);
				}
			}
		});
	}
	//Профиль пользователя
	$(function() {
		var btnProfile=$('#commment-profile-btn'),
			btnSave=$('#save-profile'),
			input=$('#office-profile-form').find('input'),
			profile=$('#profile'),
			check=false,
			checkModal=$('#checkModal'),
			passLast=$('#prifile-pass-last'),
			passNew=$('#prifile-pass-new'),
			passWatch=$('#prifile-pass-watch');

		btnProfile.click(function(){
			btnSave.prop('disabled', true);
			passNew.prop('disabled', true);
		});

		input.on('input keyup', function(e){
			btnSave.prop('disabled', false);
			check=true;
		});

		passLast.on('input keyup', function(e){
			passNew.prop('disabled', false);
			check=true;
		});

		btnSave.click(function(){
			if(check){
				check=false;
				btnSave.prop('disabled', true);
				passNew.prop('disabled', true);
			}
		});

		passWatch.click(function(){
			var type = passNew.attr('type') == "password" ? "text" : 'password';
			if($(this).hasClass('fa-eye-slash')){
				$(this).removeClass('fa-eye-slash');
				$(this).addClass('fa-eye');
			} else {
				$(this).removeClass('fa-eye');
				$(this).addClass('fa-eye-slash');
			}
			passNew.prop('type', type);
		});

		$(document).mouseup(function (e){
			if(profile.hasClass('show')){
				var div = profile.find('.modal-dialog');
				if (!div.is(e.target)
					&& div.has(e.target).length === 0
					&& check) {
					check=false;
					checkModal.modal('show');
				}
			}
		});
	});

	hideTextInFooter();//Скрыть текст в подвале
	fixedheader();//фиксированный header

	/* мигающие кнопки */
	if($('button').is('.cbutton')){
		$('.cbutton').click(function() {
			$(this).addClass('accent');
			$('.post_like-count').addClass('accent');
		});
	}

	if($('a').is('.btn-animation')){
		$(function() {
			let btn=$('.btn-animation'),
				i=0;

			$(btn).addClass('active');

			var btnAnimation=setInterval(function() {
				$(btn[i%4]).removeClass('active');

				setTimeout(function() {
					$(btn[i%4]).addClass('active');
				},1000);
				i++
			}, 2500);
		});
	}

	/* Таблицы */
	$('.currency_table').DataTable({
		"dom": "<'row'<'col-sm-12 table-responsive't>>"
	});

	if($(window).width() > '1200') {
		var rate_table = $('.rate_table').DataTable({
			"language": {
				"url": "new_theme/js/russian.json"
			},
			"dom": 'frt'+"<'row'<'col-sm-6'i><'col-sm-6'p>>",
			"columnDefs": [
				{
					"render": icoRate(),
					"targets": 0,
				}
			],
			responsive: false,
		});
	} else {
		var rate_table = $('.rate_table').DataTable({
			"language": {
				"url": "new_theme/js/russian.json"
			},
			"dom": 'frt'+"<'row'<'col-sm-6'i><'col-sm-6'p>>",
			"columnDefs": [
				{
					"render": icoRate(),
					"targets": 0,
				}
			],
			responsive: true,
			columns: [
				{ responsivePriority: 0 },
				{ responsivePriority: 1 },
				{ responsivePriority: 4 },
				{ responsivePriority: 5 },
				{ responsivePriority: 3 },
				{ responsivePriority: 2 }
			]
		});
	}
	rate_table.on( 'order.dt search.dt', function () {
		rate_table.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
			cell.innerHTML = i+1;
		} );
	} ).draw();

	$('a[data-toggle="tab"]').on('shown.bs.tab', function(e){
		$($.fn.dataTable.tables(true)).DataTable()
			.columns.adjust()
			.responsive.recalc();
	});

	$('.dt-content').DataTable({
		"language": {"url": "new_theme/js/russian.json"},
		"dom": 'frt'+"<'row'<'col-sm-6'i><'col-sm-6'p>>",
		responsive:false
	});

	/* Рейтинг фондов */
	(function() {
		var fundRate = $('#fund-rate').DataTable({
			responsive:true,
			"lengthMenu": [ 10, 20, 50, 75, 100 ],
			"language": {
				"url": "new_theme/js/russian.json"
			},
			'pageLength':20,
			"order": [ 1, 'asc' ],
			"columnDefs": [
				{ "orderable": false, "targets": 2 },
				{"searchable": false,"orderable": false,"targets": 0}
			],
			"fnRowCallback": function(oSettings) {
				var table = $('#fund-rate').dataTable(), // получаем таблицу
					rows = table.fnGetNodes(); // получаем все строки, а не только на текущей страниц

				$(rows).each(function () {
					$(this).find('td:first').text(this._DT_RowIndex + 1);
				});
			}
		});

		fundRate.on( 'order.dt search.dt', function () {
			fundRate.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
				cell.innerHTML = i+1;
			} );
		} ).draw();
	})();

	//Таблица криптовалют на главной
	stickyColOfTable($('#cryptoTable'), '.currency_table', '.coin-name');

	/* Категория записей */
	//Меню подкатегорий
	$(function() {
		var btn = $('#btnSubcategory'),
			menuBox = $('.subcategory_box'),
			heightClose = 50;

		btn.click(function() {
			if(menuBox.height() == heightClose) {
				menuBox.addClass('open');
				btn.addClass('box')
			} else {
				menuBox.removeClass('open');
				btn.removeClass('box');
			}
		});
	});

	/* База Знаний */
	eduCollapse();//Статьи базы знаний
	/*$(function() {
		/!* Активный пункт меню *!/
		var wrap = $('.edu_sidebar'),
			list = wrap.find('.list-group-item');

		list.each(function() {
			if(this.href == location) $(this).addClass('active');
		});
	});*/

	/* Вакансии */
	$(function() {
		var slider = $('#offise_slider'),
			arrowWrapper = $('#offise_slider-arrows'),
			arrowLeft = arrowWrapper.find('.fa-angle-left'),
			arrowRight = arrowWrapper.find(('.fa-angle-right'));

		slider.slick({
			infinite: true,
			dots: true,
			fade: true,
			autoplay: true,
			swipe: true,
			cssEase: 'linear',
			prevArrow: arrowLeft,
			nextArrow: arrowRight,
			responsive: [
				{
					breakpoint: 550,
					settings: {
						dots: false,
						centerMode: true,
						slidesToShow: 1,
						slidesToScroll: 1,
						arrow: false,
						prevArrow: null,
						nextArrow: null,
					}
				}
			]
		});
	});

	/* Рейтинг ICO */
	//Общий рейтинг
	if(div.is('.rate_table')) icoRate();//Таймер таблицы
	//Таймер на странице ICO
	if(div.is('.ico_card')) icoTimerItem();

	/* Баннеры */
	(function() {
		"use strict";
		var bnrs=$('.bnr-animate');

		bnrs.slick({
			dots: false,
			arrows:false,
			infinite: true,
			autoplay:true,
			speed: 500,
			fade: true,
			cssEase: 'linear',
			pauseOnFocus:false,
			pauseOnHover:false,
			lazyLoad:'progressive',
		});
	})();

	/* Ресайз */
	w.resize(function() {
		hideTextInFooter();//Скрыть текст в подвале
		fixedheader();//фиксированный header
		eduCollapse();//Статьи базы знаний
		stickyColOfTable($('#cryptoTable'), '.currency_table', '.coin-name');//Таблица криптовалют на главной
		//header.height(logo.innerHeight()+headerCourses.height());//Адаптивная высота header
	});

	/* Функции */
	//Скрыть текст в подвале
	function hideTextInFooter() {
		var mobileCollapseBlocs = $('.f-mob-hide');
		if($(window).width() < '992') {
			mobileCollapseBlocs.addClass('collapse');
		} else {
			mobileCollapseBlocs.removeClass('collapse');
		}
	}

	//Фиксированный header
	function fixedheader() {
		var header = $('header'),
			scrollHeight = $('.courses').height()+header.height(),
			nav = $('#slide-out'),
			btn = $('#navbtn'),
			substrate = $('#substrate');

		w.scroll(function() {
			if($(this).scrollTop() > scrollHeight) {
				header.addClass('fixed');
			} else {
				header.removeClass('fixed');
			}
		});

		if(w.scrollTop() > scrollHeight){
			header.addClass('fixed');
		}else {
			header.removeClass('fixed');
		}

		btn.click(function() {
			menuShow();
		});
		substrate.click(function() {
			menuHide();
		});
		nav.swipe({
			swipeStatus: function(event, phase, direction, distance, duration, fingers) {
				if(phase == 'move' && direction == 'right' && distance > 100) {
					menuHide();
					return false;
				}
			}
		});
		substrate.swipe({
			swipeStatus: function(event, phase, direction, distance, duration, fingers) {
				if(phase == 'move' && direction == 'right' && distance > 25) {
					menuHide();
					return false;
				}
			}
		});

		if(w.width() > '991') menuHide();

		function menuShow() {
			nav.addClass('open');
			substrate.addClass('show_menu');
			body.addClass('modal-open');
		}
		function menuHide() {
			nav.removeClass('open');
			substrate.removeClass('show_menu');
			body.removeClass('modal-open');
		}
	}

	//Склонение числительных
	function declOfNum(number, titles) {
		cases = [2, 0, 1, 1, 1, 2];
		return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
	}

	//Заркепление колонки в таблицах
	function stickyColOfTable(wrap, tableOfWrap, coinNameCol) {
		var wrapper = wrap,
			table = wrapper.find(tableOfWrap),
			stickyCol = table.find(coinNameCol);
		if(wrapper.width() < table.width()) {
			stickyCol.addClass('sticky');
		} else {
			stickyCol.removeClass('sticky');
		}
	}

	/* База знаний */
	function eduCollapse() {
		var wrap = $('.edu_cnt'),
			title = $('h2, h3'),
			text = wrap.find('.hide-mobile'),
			firstH1 = $(wrap.find('h1')[0]),
			firstH2 = $(wrap.find('h2')[0]),
			p = $('.edu_cnt div > div');

		if($(window).width() < '991') {
			if(firstH2.text().length <= 1) $(firstH2.find('a')).before('<span>' + firstH1.text() + '</span>');

			p.addClass('card');
			$(p.find(title)).addClass('card-header');
			text.addClass('collapse');
			$(text[0]).addClass('show');
			$($(text).parent().find(title)[0]).addClass('open');
			wrap.find(title).click(function() {
				$(this).toggleClass('open');
			});
		} else {
			if($(firstH2.find('span')).text().length > 1) $(firstH2.find('span')).html('');
			text.removeClass('collapse');
			p.removeClass('card');
			$(p.find(title)).removeClass('card-header');
		}
	}

	/* Рейтинг ICO */
	//Таймер таблицы
	function icoRate() {
		var wrapper = $('.rate_table tbody'),
			rows = wrapper.find('tr'),
			rowsArr = [],
			arrTitle = [['день', 'дня', 'дней'],
				['час', 'часа', 'часов'],
				['минута', 'минуты', 'минут'],
				['секунда', 'секунды', 'секунд']];

		for(var iRows = 0; iRows < rows.length; iRows++) {
			var atr = $(rows[iRows]).find('.rate-date').attr('data-order');

			if(atr < 9999999999999999) rowsArr.push(rows[iRows]);
		}

		setInterval(function() {
			for(var iRowsArr = 0; iRowsArr < rowsArr.length; iRowsArr++) {
				var date = moment().unix(),
					row = icoDate = $(rowsArr[iRowsArr]),
					icoDate = row.find('.rate-date'),
					timestamp = icoDate.attr('data-order'),
					countdown = timestamp - date,
					rowD = row.find('.d-count'),
					rowH = row.find('.h-count'),
					rowM = row.find('.m-count'),
					rowS = row.find('.s-count'),
					d = 60 * 60 * 24,
					h = 60 * 60,
					m = 60,
					days = Math.floor(countdown / d),
					hours = Math.floor((countdown - d * days) / h),
					minutes = Math.floor(((countdown - d * days) - h * hours) / m),
					seconds = Math.floor((((countdown - d * days) - h * hours) - m * minutes)),
					txtD = row.find('.d-text'),
					txtH = row.find('.h-text'),
					txtM = row.find('.m-text'),
					txtS = row.find('.s-text');

				rowD.html(days);
				txtD.html(declOfNum(days, arrTitle[0]));
				rowH.html(hours);
				txtH.html(declOfNum(hours, arrTitle[1]));
				rowM.html(minutes);
				txtM.html(declOfNum(minutes, arrTitle[2]));
				rowS.html(seconds);
				txtS.html(declOfNum(seconds, arrTitle[3]));
			}
		}, 1000);
	}
	//Таймер на странице
	function icoTimerItem() {
		var wrap=$('.ico_card .timer'),
			arrTitle=[['день', 'дня', 'дней'],
				['час', 'часа', 'часов'],
				['минута', 'минуты', 'минут'],
				['секунда', 'секунды', 'секунд']],
			dTimer = wrap.attr('data-timer'),
			tD=wrap.find('.timer-d'),
			timeD=tD.find('.timer-time'),
			txtD=tD.find('.timer-txt'),
			tH=wrap.find('.timer-h'),
			timeH=tH.find('.timer-time'),
			txtH=tH.find('.timer-txt'),
			tM=wrap.find('.timer-m'),
			timeM=tM.find('.timer-time'),
			txtM=tM.find('.timer-txt'),
			tS=wrap.find('.timer-s'),
			timeS=tS.find('.timer-time'),
			txtS=tS.find('.timer-txt');

		if(dTimer>0){
			setInterval(function() {
				var date = moment().unix(),
					countdown=dTimer-date,
					d=60 * 60 * 24,
					h=60 * 60,
					m=60,
					days=Math.floor(countdown / d),
					hours=Math.floor((countdown - d * days) / h),
					minutes=Math.floor(((countdown - d * days) - h * hours) / m),
					seconds=Math.floor((((countdown - d * days) - h * hours) - m * minutes));

				timeD.html(days);
				txtD.html(declOfNum(days, arrTitle[0]));
				timeH.html(hours);
				txtH.html(declOfNum(hours, arrTitle[1]));
				timeM.html(minutes);
				txtM.html(declOfNum(minutes, arrTitle[2]));
				timeS.html(seconds);
				txtS.html(declOfNum(seconds, arrTitle[3]));
			}, 1000);
		} else {
			return false;
		}
	}

	/* Голосование */
	function userVote(voteNumber){
		$('.user-vote').addClass('user-vote-done');
		$('.user-vote-btn').addClass('user-vote-btn-done');
		var userVoteNumbaer=+(voteNumber.html());
		voteNumber.html(userVoteNumbaer+1);
	}

	/* Категории если не будут помещаться в одной строке то скрывать в кнопку как на тренмаркете */
	/*function subcat() {
	 var $nav = $('#menuSubcategory');
	 var $btn = $('.b-subcat button');
	 var $vlinks = $nav.find('.subcategory');
	 var $hlinks = $(".b-subcat .hidden-links");
	 var $moreText = $(".more-txt");
	 var $lessText = $(".less-txt");

	 var breaks = [];

	 function updateNav() {
	 var availableSpace;
	 if ($(document).width() > 850) {
	 availableSpace = $btn.hasClass("hidden")
	 ? $nav.width()
	 : $nav.width() - $btn.width()/!* - 20*!/;
	 }

	 if ($vlinks.width() > availableSpace) {
	 breaks.push($vlinks.width());
	 $vlinks.children().last().prependTo($hlinks);
	 if ($btn.hasClass("hidden")) {
	 $btn.removeClass("hidden");
	 }
	 } else {
	 if (availableSpace > breaks[breaks.length - 1]) {
	 $hlinks.children().first().appendTo($vlinks);
	 breaks.pop();
	 }
	 if (breaks.length < 1) {
	 $btn.addClass("hidden");
	 $hlinks.addClass("hidden");
	 }
	 }
	 $btn.attr("count", breaks.length);
	 if ($vlinks.width() > availableSpace) {
	 updateNav();
	 }
	 }

	 $(window).resize(function() {
	 ($(document).width() < 850) ? subcatMobile() : updateNav();
	 });

	 ($(document).width() < 850) ? subcatMobile() : updateNav();

	 buttonMoreOrLess();

	 function buttonMoreOrLess() {
	 $btn.on("click", function() {
	 if ($lessText.hasClass("hidden")) {
	 $lessText.removeClass("hidden");
	 $moreText.addClass("hidden");
	 } else if ($moreText.hasClass("hidden")) {
	 $moreText.removeClass("hidden");
	 $lessText.addClass("hidden");
	 }
	 $hlinks.toggleClass("hidden");
	 $btn.toggleClass('opened')
	 });
	 }

	 function subcatMobile() {
	 var $subcatLi = $("ul.visible-links li");
	 var $subcatLiCount = $subcatLi.size();

	 while ($subcatLiCount > 3) {
	 --$subcatLiCount;
	 breaks.push($vlinks.width());
	 $vlinks.children().last().prependTo($hlinks);
	 if ($btn.hasClass("hidden")) {
	 $btn.removeClass("hidden");
	 }
	 }
	 if (breaks.length < 1) {
	 $btn.addClass("hidden");
	 $hlinks.addClass("hidden");
	 }
	 }
	 }*/

	$('.cs-slider').cubeslider({
		cubesNum: 		{rows:1, cols:1},
		orientation:	'h',
		cubeSync		:50,
		autoplay:true,
		arrows:false,
		navigation:false,
		play:false,
		backfacesColor:'transparent'
	});

	if(document.getElementsByTagName("aside")[0] && w.width() > 991){
		(function() {
			var doc = $(document),
				fixed = false,
				sidebarElements=document.getElementsByTagName('aside')[0].getElementsByClassName('box'),
				anchor = sidebarElements[sidebarElements.length-1],
				content = $(anchor.firstElementChild),
				footer=document.getElementsByTagName('footer')[0];

			$(anchor).height(content.outerHeight());

			var onScroll = function(e) {
				var docTop = doc.scrollTop(),
					anchorTop = $(anchor).offset().top;

				if(docTop > anchorTop) {
					if(!fixed) {
						content.addClass('position-fixed');
						content.css({
							width: $(anchor).outerWidth(true),
							top: $('.for-scroll').outerHeight(true)
						});

						fixed = true;
					}
				} else   {
					if(fixed){
						content.removeClass('position-fixed');
						content.css({
							top: 0
						});
						fixed = false;
					}
				}
			};

			onScroll();

			window.addEventListener('scroll', onScroll);
		})();
	}
});

function subscribe(form) {
	event.preventDefault();

	var modal=document.getElementById('emailSubscribe'),
		msg=$(form).serialize(),
		day=86400,
		dateForSigned = new Date(new Date().getTime() + 90*day * 1000),
		input=$(modal).find('input'),
		subscribeResult=document.getElementById('subscribeResult');

	subscribeResult.classList.remove('text-danger');
	subscribeResult.innerText='';

	if(input.val()){
		$.ajax({
			type: 'POST',
			url: 'assets/components/subscribe/action.php',
			data: msg,
			success: function(data) {
				console.log('подписка оформлена')
			},
			error:  function(xhr, str){
				console.log('Возникла ошибка: ' + xhr.responseCode);
			}
		});

		subscribeResult.classList.add('text-success');
		subscribeResult.innerText='Подписка успешно оформлена';

		document.cookie = "subscribe=shown; path=/; expires=" + dateForSigned.toUTCString();

		$(modal).modal('hide');
	} else {
		subscribeResult.classList.add('text-danger');
		subscribeResult.innerText='E-mail введен некорректно';
	}
}

function getCookie(name) {
	var matches = document.cookie.match(new RegExp(
		"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
	));
	return matches ? decodeURIComponent(matches[1]) : undefined;
}

var App = {
	/*pollSubmit:function(id) {
		var form=document.getElementById(id),
			msg=$(form).serialize(),
			day=86400,
			dateForSigned = new Date(new Date().getTime() + 30*day * 1000),
			inputs=form.getElementsByClassName('poll-option'),
			voted=form.elements.option.value,
			formVarian=form.getElementsByTagName('label'),
			btn=form.getElementsByTagName('button')[0];

		$.ajax({
			type: 'POST',
			url: 'assets/components/subscribe/action.php',
			data: msg,
			success: function(data) {
				document.cookie = id+'=voted; path=/; expires=' + dateForSigned.toUTCString();

				var fullRate=+form.dataset.rate+1;

				for(var iInputs=0;iInputs<inputs.length;iInputs++){
					inputs[iInputs].classList.add('d-none');
				}

				btn.classList.add('disable');
				btn.disabled=true;

				for(var iFormVarian=0;iFormVarian<formVarian.length;iFormVarian++){
					var thisVariant=formVarian[iFormVarian];

					if(thisVariant.id==voted){
						thisVariant.dataset.rate=+thisVariant.dataset.rate+1;
					}

					thisVariant.getElementsByTagName('span')[0].innerText=calcRate(thisVariant.dataset.rate, fullRate);

					$(thisVariant)[0].getElementsByClassName('progress-bar')[0].style.width=calcRate(thisVariant.dataset.rate, fullRate)
				}
			},
			error:  function(xhr, str){
				console.log('Возникла ошибка: ' + xhr.responseCode);
			}
		});

		function calcRate(itemRate, fullRate) {
			return itemRate/fullRate*100+'%';
		}
	}*/
};

/**
 * main.js
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2016, Codrops
 * http://www.codrops.com
 */
;(function(window) {

	'use strict';

	var mainContainer = document.querySelector('.main-wrap'),
		openCtrl = document.getElementById('btn-search'),
		closeCtrl = document.getElementById('btn-search-close'),
		searchContainer = document.querySelector('.search'),
		inputSearch = searchContainer.querySelector('.search__input');

	function init() {
		initEvents();
	}

	function initEvents() {
		openCtrl.addEventListener('click', openSearch);
		closeCtrl.addEventListener('click', closeSearch);
		document.addEventListener('keyup', function(ev) {
			// escape key.
			if( ev.keyCode == 27 ) {
				closeSearch();
			}
		});
	}

	function openSearch() {
		mainContainer.classList.add('main-wrap--move');
		searchContainer.classList.add('search--open');
		setTimeout(function() {
			inputSearch.focus();
		}, 600);
	}

	function closeSearch() {
		mainContainer.classList.remove('main-wrap--move');
		searchContainer.classList.remove('search--open');
		inputSearch.blur();
		inputSearch.value = '';
	}

	init();

})(window);/**
 * Created by alexandermarginal on 05.02.2018.
 */
var $datePickerValue;
$(function() {
	var $datePicker = $('#date_range');
	var numPick=0;
	$datePicker.datepicker({
		range: 'period', // режим - выбор периода
		numberOfMonths: 2,
		dateFormat: 'dd/mm/yy',
		onSelect: function(dateText, inst, extensionRange) {
			// extensionRange - объект расширения
			$datePicker.val(extensionRange.startDateText + ' - ' + extensionRange.endDateText);
			numPick++;
			if(numPick%2==0){
				var datePick = document.getElementById("date_range").value.split(' - '),
					arrStart=datePick[0],
					arrEnd=datePick[1],
					dateStart=new Date(arrStart.split("/").reverse().join("/")).getTime(),
					dateEnd=new Date(arrEnd.split("/").reverse().join("/")).getTime();

				$datePicker.data("date_start", dateStart);
				$datePicker.data("date_end", dateEnd);
			}
		}
	});
});