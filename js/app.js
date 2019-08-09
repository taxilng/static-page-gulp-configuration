$(function () {
  var mySwiper = new Swiper('.swiper-container', {
    // direction: 'vertical', // 垂直切换选项
    loop: true, // 循环模式选项
    autoplay: true,
    // 如果需要分页器
    pagination: {
      el: '.swiper-pagination',
    },
  })
  // tabs 切换
  $('.tabs li').on('click', function () {
    var idx = $(this).index()
    $(this)
      .addClass('active')
      .siblings()
      .removeClass('active')
    $('.list')
      .eq(idx)
      .addClass('active')
      .siblings()
      .removeClass('active')
  })
})