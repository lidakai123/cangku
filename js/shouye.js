$(function () {
    const nickname = getCookie('nickname')
    if (nickname) {
      $('.header3').addClass('hide')
      $('.on').removeClass('hide').text(`欢迎您: ${nickname}`)
    } else {
      $('.header3').removeClass('hide')
      $('.on').addClass('hide')
    }
})