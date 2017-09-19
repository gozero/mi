$(document).ready(function() {
	// topbar 购物车
	$('.topbar .topbar-cart').hover(function() {
		$(this).addClass('topbar-cart-active').find('.cart-menu').slideDown(200)
	}, function() {
		$(this).removeClass('topbar-cart-active').find('.cart-menu').slideUp(200)
	})

	// header 导航二级菜单
	$('.header-nav .nav-item').hover(function() {
		$(this).find('.header-nav-menu').show().addClass('header-nav-menu-active').find('ul').show()
	}, function() {
		$(this).find('.header-nav-menu').removeClass('header-nav-menu-active').hide().find('ul').hide()
	})

	// header 搜索框
	$('.header .search-form .search-text').focus(function() {
		$(this).css('border-color', '#ff6700').next().css('border-color', '#ff6700').next().fadeOut(200).next().slideDown(200)
	}).blur(function() {
		$(this).css('border-color', '#e0e0e0').next().css('border-color', '#e0e0e0').next().fadeIn(200).next().slideUp(200)
	})
})
