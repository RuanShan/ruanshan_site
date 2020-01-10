var UA = {
  val: window.navigator.userAgent,
  isPC: function() {
    var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
      if (UA.val.indexOf(Agents[v]) > 0) {
        flag = false;
        break
      }
    }
    return flag
  },
  isIOS: function() {
    return /iPhone/i.test(UA.val) || /iPad/i.test(UA.val)
  },
  isIPhone: function() {
    return /iPhone/i.test(UA.val)
  },
  isIPhone6() {
    return this.isIPhone() && (window.screen.availWidth === 375 || window.screen.availWidth === 414)
  },
  isIPhone4() {
    return this.isIPhone() && (window.screen.availHeight === 460)
  },
  isAndroid: function() {
    return /Android/i.test(UA.val) || /Linux/i.test(UA.val)
  },
  isWX: function() {
    return /MicroMessenger/i.test(UA.val)
  },
  getWxVer: function() {
    var wechatInfo = UA.val.match(/MicroMessenger\/([\d\.]+)/i);
    if (wechatInfo && wechatInfo[1]) {
      return wechatInfo[1]
    }
    return ""
  },
};

(function($) {
  'use strict';
  var $moreTags = $('#more-tags');
  var $toggleTagsButton = $('#toggle-all-tags');

  $toggleTagsButton.on('click', function(evt) {
    $moreTags.slideToggle({
      done: function() {
        // Once the animation is done, switch to class-based hiding
        // so that the lists line up better
        $moreTags
          .toggleClass('collapsed')
          .removeAttr('style');
      }
    });
    // Flip label in the button
    $toggleTagsButton.find('span').toggleClass('hidden');
  });
})(jQuery);




(function($) {
  // 游戏详细页面，生成游戏预览二维码
  var imgbox = $('#qrcode');
  if (imgbox.is('*')) {
    var data = imgbox.data();
    var src = data.src
    var qrcode = new QRCode(document.getElementById("qrcode"), {
      text: src,
      width: 200,
      height: 200,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H
    });
  }

  // 首页， 游戏管理端二维码，游戏试玩二维码
  var qrcodeBackend = $('#qrcodeBackend');
  if (qrcodeBackend.is('*')) {
    var data = qrcodeBackend.data();
    var src = data.src
    var qrcode = new QRCode(document.getElementById("qrcodeBackend"), {
      text: src,
      width: 200,
      height: 200,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H
    });
  }

  var qrcodeDemo = $('#qrcodeDemo');
  if (qrcodeDemo.is('*')) {
    var data = qrcodeDemo.data();
    var src = data.src
    var qrcode = new QRCode(document.getElementById("qrcodeDemo"), {
      text: src,
      width: 200,
      height: 200,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H
    });
  }

  function changeIndexSwiperBg() {
    var bgs = $("#index-swiper .swiper-bg");
    var n;
    n = ["ppxl", "green", "service"];
    var i = this.activeIndex,
      a = n.length;
    i > a && (i -= a),
      i < 1 && (i += a);
    var o = bgs.find(".active-bg"),
      s = bgs.find("." + n[i - 1]);

    o[0] !== s[0] && (s.addClass("active-bg"), o.removeClass("active-bg"))
  }
  if (Swiper.device.desktop) {
    console.debug("UA.isPC");
    new Swiper("#index-swiper", {
      effect: "fade",
      loop: true,
      // simulateTouch: false,
      //speed: 10,
      autoplay: {
        delay: 4500,
        stopOnLastSlide: false,
        disableOnInteraction: true
      },
      // autoplayDisableOnInteraction: false,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
        renderBullet: function(index, className) {
          var i = [
              ["建站", "green"],
              ["小程序", "slateblue"],
              ["分销", "blue"],
              ["企服", "cyan"],
              ["推广", "orange"]
            ],
            a = i[index],
            o = a[0],
            s = a[1];
          return '<div class="' + className + " " + s + '">0' + (index + 1) + "<span>" + o + "</span></div>"
        }
      },
      // onInit: function(e) {
      //     window.swiperAnimate && window.swiperAnimate(e)
      // },
      // paginationBulletRender: function(e, t, n) {
      //     var i = [["建站", "green"], ["小程序", "slateblue"], ["分销", "blue"], ["企服", "cyan"], ["推广", "orange"]],
      //     a = i[t],
      //     o = a[0],
      //     s = a[1];
      //     return '<div class="' + n + " " + s + '">0' + (t + 1) + "<span>" + o + "</span></div>"
      // },
      on: {
        slideChangeTransitionStart: changeIndexSwiperBg
      },
      // onSlideChangeEnd: function(e) {
      //     window.swiperAnimate && window.swiperAnimate(e)
      // }
    })
  } else {
    new Swiper("#index-swiper", {
      effect: "fade",
      loop: !0,
      speed: 10,
      autoplay: 4500,
      pagination: ".swiper-pagination",
      autoplayDisableOnInteraction: !1,
      paginationClickable: !0,
      followFinger: !1,
      longSwipesRatio: .01,
      onInit: function(e) {
        window.swiperAnimate && window.swiperAnimate(e)
      },
      onSlideChangeEnd: function(t) {
        changeIndexSwiperBg(t),
          window.swiperAnimate && window.swiperAnimate(t)
      }
    })
  }

  // new Swiper("#case-swiper", {
  //   // effect: "slide",
  //   loop: true,
  //   autoplay: true,
  //   slidesPerView: 'auto',
  //   // loopedSlides: 5
  // })

})(jQuery);

// (function( $ ) {
//   $('body').scrollspy({ target: '.achievement' })
//
//   $('.achievement').on('activate.bs.scrollspy', function (e) {
//     console.log( " e =", e)
//     $(".elementor-counter-number",this).each( function() {
//                     var e = $(this)
//                       , n = e.data()
//                       , i = n.toValue.toString().match(/\.(.*)/);
//                     i && (n.rounding = i[1].length),
//                     e.numerator(n)
//
//     })
//   })
// })( jQuery );

// DM Top
$(window).scroll(function() {
  if ($(this).scrollTop() > 1) {
    $('.dmtop').css({
      bottom: "25px"
    });
  } else {
    $('.dmtop').css({
      bottom: "-100px"
    });
  }
});

$('.dmtop').click(function() {
  $('html, body').animate({
    scrollTop: '0px'
  }, 800);
  return false;
});

// // DM Menu
// $('#nav').affix({
//   offset: {
//     top: $('#nav').offset().top
//   }
// });
