$(document).ready(function() {
	// topbar 购物车
	$('.topbar .topbar-cart').hover(function() {
		$(this).addClass('topbar-cart-active').find('.cart-menu').slideDown(200)
	}, function() {
		$(this).removeClass('topbar-cart-active').find('.cart-menu').slideUp(200)
	})
})
