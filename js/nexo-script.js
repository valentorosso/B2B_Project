/* globals $:false, google:false */

(function ($, window) {
	
	"use strict";
  
	var initMap;

	/* LOADER */
	$(window).on('load', function(){
		$(".loader-container").fadeOut(500);
	});
  
	$(document).ready(function() {

		/* SCROLL UP */
		$( window )
			.on('scroll', function() {
				if ( $( this )
					.scrollTop() > 100 ) {
					$( '.scrollup' )
						.fadeIn();
				} else {
					$( '.scrollup' )
						.fadeOut();
				}
			} );
		$( '#scrollup' )
			.on('click', function() {
				$( "html, body" )
					.animate( {
						scrollTop: 0
					}, 500 );
				return false;
			} );

		/* SMOOTH SCROLL */
		$( function() {
			$( 'a[href*="#"]:not([href="#"])' )
				.on('click', function() {
					if ( location.pathname.replace( /^\//, '' ) == this.pathname.replace( /^\//, '' ) && location.hostname == this.hostname ) {
						var target = $( this.hash );
						target = target.length ? target : $( '[name=' + this.hash.slice( 1 ) + ']' );
						if ( target.length ) {
							$( 'html, body' )
								.animate( {
									scrollTop: target.offset()
										.top
								}, 1000 );
							return false;
						}
					}
				} );
		} );

		/* HIDE MOBILE MENU AFTER CLICK */
		$( ".navbar-nav li a" )
			.on('click', function( event ) {
				$( ".navbar-collapse" )
					.collapse( 'hide' );
			} );


		/* SLICK SLIDES */
		$( ".gallery" )
			.slick( {
				autoplay: false,
				dots: true,
				slidesToShow: 3,
				slidesToScroll: 1,
				infinite: false,
				centerMode: true,
				variableWidth: true
			} );
		$( ".clients" )
			.slick( {
				autoplay: true,
				dots: true,
				infinite: true,
				slidesToShow: 5,
				slidesToScroll: 1,
				responsive: [ {
					breakpoint: 1024,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 1,
						infinite: true
					}
				}, {
					breakpoint: 600,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 1,
						infinite: true

					}
				}, {
					breakpoint: 480,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1
					}
				} ]
			} );
		$( ".testimonials" )
			.slick( {
				autoplay: false,
				dots: true,
				infinite: true,
				slidesToShow: 1,
				slidesToScroll: 1
			} );


		/* COUNTER ON SCROLL */
		var a = 0;
		$(window).on('scroll', function() {

		  var oTop = $('#counter').offset().top - window.innerHeight;
		  if (a === 0 && $(window).scrollTop() > oTop) {
			$('.counter-value').each(function() {
			  var $this = $(this),
				countTo = $this.attr('data-count');
			  $({
				countNum: $this.text()
			  }).animate({
				  countNum: countTo
				},

				{

				  duration: 2000,
				  easing: 'swing',
				  step: function() {
					$this.text(Math.floor(this.countNum));
				  },
				  complete: function() {
					$this.text(this.countNum);
					//alert('finished');
				  }

				});
			});
			a = 1;
		  }

		});

		/* VALIDATING FORM */
		$( "#contact-form" )
			.validator()
			.on( "submit", function( event ) {
				if ( event.isDefaultPrevented() ) {
					// handle the invalid form...
				} else {
					// everything looks good!
					event.preventDefault();
					submitForm();
				}
			} );

		/* FORM SEND  */
		function submitForm() {
			// Initiate Variables With Form Content
			var name = $( "#name" )
				.val();
			var email = $( "#email" )
				.val();
			var phone = $( "#phone" )
				.val();
			var message = $( "#message" )
				.val();

			$.ajax( {
				type: "POST",
				url: "php/sendmail.php",
				data: "name=" + name + "&email=" + email + "&phone=" + phone + "&message=" + message,
				dataType: 'json',
				success: function( response ) {
				var output = '';
					if ( response.type == 'error' ) { //load json data from server and output message     
						output = '<div class="error">' + response.text + '</div>';
					} else {
						output = '<div class="success">' + response.text + '</div>';
						//reset values in all input fields
						$( "#contact-form  input[required=true]" )
							.val( '' );
						$( "#contact-form #contact-body" )
							.slideUp(); //hide form after success
					}
					$( "#contact-form #contact-results" )
						.hide()
						.html( output )
						.slideDown();
				}
			} );

		}

		/* VALIDATING NEWSLETTER FORM */
		$( "#signup" )
			.validator()
			.on( "submit", function( event ) {
				if ( event.isDefaultPrevented() ) {
					// handle the invalid form...
				} else {
					// everything looks good!
					event.preventDefault();
					signupForm();
				}
			} );

		/* NEWSLETTER */
		function signupForm() {
			// Initiate Variables With Form Content
			var emailn = $( "#emailn" )
				.val();

			$.ajax( {
				type: "POST",
				url: "php/subscribe.php",
				data: "emailn=" + emailn,
				dataType: 'json',
				success: function( response ) {
			  var output = '';
					if ( response.type == 'error' ) { //load json data from server and output message     
						output = '<div class="error">' + response.text + '</div>';
					} else {
						output = '<div class="success">' + response.text + '</div>';
						//reset values in all input fields
						$( "#signup  input[required=true]" )
							.val( '' );
						$( "#signup #signup-body" )
							.slideUp(); //hide form after success
					}
					$( "#signup #signup-results" )
						.hide()
						.html( output )
						.slideDown();
				}
			} );

		}

	});

	/* GOOGLE MAP */
	initMap = function initMap() {
		var uluru = {
			lat: 51.521062,
			lng: -0.127697
		};
		var map = new google.maps.Map( document.getElementById( 'map' ), {
			zoom: 14,
			center: uluru,
			styles: [ {
				"featureType": "water",
				"elementType": "geometry",
				"stylers": [ {
					"color": "#e9e9e9"
				}, {
					"lightness": 17
				} ]
			}, {
				"featureType": "landscape",
				"elementType": "geometry",
				"stylers": [ {
					"color": "#f5f5f5"
				}, {
					"lightness": 20
				} ]
			}, {
				"featureType": "road.highway",
				"elementType": "geometry.fill",
				"stylers": [ {
					"color": "#ffffff"
				}, {
					"lightness": 17
				} ]
			}, {
				"featureType": "road.highway",
				"elementType": "geometry.stroke",
				"stylers": [ {
					"color": "#ffffff"
				}, {
					"lightness": 29
				}, {
					"weight": 0.2
				} ]
			}, {
				"featureType": "road.arterial",
				"elementType": "geometry",
				"stylers": [ {
					"color": "#ffffff"
				}, {
					"lightness": 18
				} ]
			}, {
				"featureType": "road.local",
				"elementType": "geometry",
				"stylers": [ {
					"color": "#ffffff"
				}, {
					"lightness": 16
				} ]
			}, {
				"featureType": "poi",
				"elementType": "geometry",
				"stylers": [ {
					"color": "#f5f5f5"
				}, {
					"lightness": 21
				} ]
			}, {
				"featureType": "poi.park",
				"elementType": "geometry",
				"stylers": [ {
					"color": "#dedede"
				}, {
					"lightness": 21
				} ]
			}, {
				"elementType": "labels.text.stroke",
				"stylers": [ {
					"visibility": "on"
				}, {
					"color": "#ffffff"
				}, {
					"lightness": 16
				} ]
			}, {
				"elementType": "labels.text.fill",
				"stylers": [ {
					"saturation": 36
				}, {
					"color": "#333333"
				}, {
					"lightness": 40
				} ]
			}, {
				"elementType": "labels.icon",
				"stylers": [ {
					"visibility": "off"
				} ]
			}, {
				"featureType": "transit",
				"elementType": "geometry",
				"stylers": [ {
					"color": "#f2f2f2"
				}, {
					"lightness": 19
				} ]
			}, {
				"featureType": "administrative",
				"elementType": "geometry.fill",
				"stylers": [ {
					"color": "#fefefe"
				}, {
					"lightness": 20
				} ]
			}, {
				"featureType": "administrative",
				"elementType": "geometry.stroke",
				"stylers": [ {
					"color": "#fefefe"
				}, {
					"lightness": 17
				}, {
					"weight": 1.2
				} ]
			} ]
		} );

		var marker = new google.maps.Marker( {
			position: uluru,
			map: map
		} );
	};

	window.initMap = initMap;
	
}($, window));