import './common.css'
import './index.css'

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

    // header category 商品导航
    $('.header .category-item').hover(function() {
        $(this).find('.category-detail').show()
    }, function() {
        $(this).find('.category-detail').hide()
    })

    // header 搜索框
    $('.header .search-form .search-text').focus(function() {
        $(this).css('border-color', '#ff6700').next().css('border-color', '#ff6700').next().fadeOut(200).next().slideDown(200)
    }).blur(function() {
        $(this).css('border-color', '#e0e0e0').next().css('border-color', '#e0e0e0').next().fadeIn(200).next().slideUp(200)
    })

    // home-container 轮播图, 定时器
    var carouselTimer = setInterval(function() {
        var $homeGoodsSlider = $('.home-container .home-goods-slider')
        var $slideItems = $homeGoodsSlider.find('.carousel-viewport .slide-item')
        var $pagerItems = $homeGoodsSlider.find('.carousel-controls-pager .pager-item')
        var activatedIndex = $homeGoodsSlider.find('.carousel-viewport .slide-item-active').index()
        var nextIndex = 0
        if (activatedIndex >= ($slideItems.length - 1)) {
            nextIndex = 0
        } else {
            nextIndex = activatedIndex + 1
        }
        $slideItems.removeClass('slide-item-active').hide().eq(nextIndex).addClass('slide-item-active').fadeIn(1000)
        $pagerItems.removeClass('pager-item-active').eq(nextIndex).addClass('pager-item-active')
    }, 3000)

    // home-container 轮播图, 左右箭头点击事件
    $('.home-container .home-goods-slider .carousel-controls-direction').on('click', 'a', function(event) {
        clearInterval(carouselTimer)
        var direction = $(this).attr('class')
        var $homeGoodsSlider = $(this).parents('.home-goods-slider')
        var $slideItems = $homeGoodsSlider.find('.carousel-viewport .slide-item')
        var $activatedItem = $homeGoodsSlider.find('.carousel-viewport .slide-item-active')
        var $siblingItem = undefined
        if (direction === 'prev') {
            $siblingItem = $activatedItem.prev('.slide-item')
            if ($siblingItem.length === 0) {
                $siblingItem = $slideItems.eq($slideItems.length - 1)
            }
        } else {
            $siblingItem = $activatedItem.next('.slide-item')
            if ($siblingItem.length === 0) {
                $siblingItem = $slideItems.eq(0)
            }
        }
        $activatedItem.removeClass('slide-item-active').hide()
        $siblingItem.addClass('slide-item-active').fadeIn(1000)
        $homeGoodsSlider.find('.carousel-controls-pager .pager-item').removeClass('pager-item-active').eq($siblingItem.index()).addClass('pager-item-active')
    })

    // home-container 轮播图, 小圆点点击事件
    $('.home-container .home-goods-slider .carousel-controls-pager').on('click', 'a', function(event) {
        if (!$(this).hasClass('pager-item-active')) {
            clearInterval(carouselTimer)
            var index = $(this).data('index')
            $(this).parents('.carousel-controls-pager').find('.pager-item').removeClass('pager-item-active').eq(index).addClass('pager-item-active')
            $(this).parents('.home-goods-slider').find('.carousel-viewport .slide-item').removeClass('slide-item-active').hide().eq(index).addClass('slide-item-active').fadeIn(1000)
        }
    })

    // home-container 明星单品 轮播图 定时器
    var startGoodsTimerFn = function() {
        var $startGoodsDirection = $('.home-container .home-star-goods .carousel-controls-direction')
        var direction = $startGoodsDirection.find('.disabled').data('direction')
        $startGoodsDirection.find('.disabled').removeClass('disabled').siblings('a').addClass('disabled')
        if (direction === 'prev') {
            $startGoodsDirection.parents('.home-star-goods').find('.carousel-list').css('margin-left', '0px')
        } else {
            $startGoodsDirection.parents('.home-star-goods').find('.carousel-list').css('margin-left', '-1240px')
        }
    }
    var startGoodsTimer = setInterval(startGoodsTimerFn, 4000)

    $('.home-container .home-star-goods .carousel-controls-direction').hover(function() {
        clearInterval(startGoodsTimer)
    }, function() {
        startGoodsTimer = setInterval(startGoodsTimerFn, 4000)
    })

    // home-container 明星单品 轮播图
    $('.home-container .home-star-goods .carousel-controls-direction').on('click', 'a', function() {
        var direction = $(this).data('direction')
        if (!$(this).hasClass('disabled')) {
            var $homeStarGoods = $(this).parents('.home-star-goods')
            $(this).addClass('disabled').siblings('a').removeClass('disabled')
            if (direction === 'prev') {
                $homeStarGoods.find('.carousel-list').css('margin-left', '0px')
            } else {
                $homeStarGoods.find('.carousel-list').css('margin-left', '-1240px')
            }
        }
    })
})
