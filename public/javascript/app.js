$.fn.isInViewport = function() {
	var elementTop = $(this).offset().top;
	var elementBottom = elementTop + $(this).outerHeight();
	var viewportTop = $(window).scrollTop();
	var viewportBottom = viewportTop + $(window).height();
	return elementBottom > viewportTop && elementTop < viewportBottom;
};

let mountAnimation = true;

$(document).ready(function() {
	if (mountAnimation) {
		particlesJS('particles-js', {
			particles: {
				number: {
					value: 150,
					density: {
						enable: true,
						value_area: 1800
					}
				},
				color: {
					value: '#ffffff'
				},
				shape: {
					type: 'circle',
					stroke: {
						width: 0,
						color: '#000000'
					},
					polygon: {
						nb_sides: 5
					},
					image: {
						src: 'img/github.svg',
						width: 100,
						height: 100
					}
				},
				opacity: {
					value: 0.5,
					random: false,
					anim: {
						enable: false,
						speed: 1,
						opacity_min: 0.1,
						sync: false
					}
				},
				size: {
					value: 5,
					random: true,
					anim: {
						enable: false,
						speed: 40,
						size_min: 0.1,
						sync: false
					}
				},
				line_linked: {
					enable: true,
					distance: 200,
					color: '#ffffff',
					opacity: 0.4,
					width: 1
				},
				move: {
					enable: true,
					speed: 5,
					direction: 'none',
					random: false,
					straight: false,
					out_mode: 'bounce',
					bounce: false,
					attract: {
						enable: false,
						rotateX: 600,
						rotateY: 1200
					}
				}
			},
			interactivity: {
				detect_on: 'window',
				events: {
					onhover: {
						enable: true,
						mode: 'grab'
					},
					onclick: {
						enable: true,
						mode: 'push'
					},
					resize: true
				},
				modes: {
					grab: {
						distance: 140,
						line_linked: {
							opacity: 1
						}
					},
					bubble: {
						distance: 400,
						size: 40,
						duration: 2,
						opacity: 8,
						speed: 3
					},
					repulse: {
						distance: 200,
						duration: 0.4
					},
					push: {
						particles_nb: 1
					},
					remove: {
						particles_nb: 2
					}
				}
			},
			retina_detect: true
		});
	}
	$(window).on('scroll', function() {
		if (
			// if we are more than 300px down the page
			window.pageYOffset >
			$(window).height() - 300
		) {
			$('.navigation-container').css({
				background: '#28476C',
				padding: '0'
			});
			if ($(window).width() < 1000) {
				$('.navigation-container').css({
					background: '#28476C',
					padding: '25px 35px'
				});
			}
		} else {
			if (!$('#nav-toggle').hasClass('active')) {
				$('.navigation-container').css({
					background: 'none',
					padding: '25px 35px'
				});
			}
		}
	});

	$('header').on('click', function(e) {
		e.stopPropagation();
	});

	if ($(window).width() < 1000) {
		$(document).on('click', function() {
			if ($('#nav-toggle').hasClass('active')) {
				$('nav ul').slideUp();
				$('#nav-toggle').removeClass('active');
			}
		});
	}
	// Hamburger to X toggle
	$('#nav-toggle').on('click', function() {
		this.classList.toggle('active');
		$('nav ul').slideToggle();
		$('header').addClass('applyBlueBackground');
	});
});
