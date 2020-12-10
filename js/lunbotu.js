var mySwiper = new Swiper ('.swiper-container', {
    // direction: 'vertical', // 垂直切换选项
     loop: true, // 循环模式选项
     autoplay:true,
    // 如果需要分页器
    pagination: {
      el: '.swiper-pagination',
      renderBullet: function (index, className) {
        return '<span class="' + className + '">' + (index + 1) + '</span>';
      },
    renderBullet: function (index, className) {
        switch(index){
          case 0:text='12.12来袭 钜惠重启';break;
          case 1:text='灵越爆款 限时重返低价';break;
          case 2:text='G系列 限时重返低价';break;
          case 3:text='外星人专享特权';break;
          case 4:text='显示器升级五年服务';break;
        }
        return '<span class="' + className + '">' + text + '</span>';
      },
    },
    
    // 如果需要前进后退按钮
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    
    // 如果需要滚动条
    scrollbar: {
      el: '.swiper-scrollbar',
    },
  })        