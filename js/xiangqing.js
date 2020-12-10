$(function () {

    let info = null

    // 1. 拿到 cookie 中的 goods_id 属性
    const id = getCookie('goods_id')
  
    // 2. 根据 id 信息去请求商品数据
    xiangqing()
    async function xiangqing() {
    const goodsInfo = await $.get('../server/xiangqing.php', { goods_id: id }, null, 'json')
    bindHtml(goodsInfo.info)
    info = goodsInfo.info
  }

  function bindHtml(info) {

    // 1. 渲染左边放大镜位置
    $('.enlargeBox').html(`
    <div class="enlarge" style="background-image: url(${info.goods_big_logo});">
    </div>
      <div class="show">
         <div class="mask"></div>
        <img src="${ info.goods_big_logo }" alt="">
      </div>
      <div class="list">
        <p class="active">
          <img src="${ info.goods_small_logo }" alt="">
        </p>
      </div>
    `)
    const e1 = new Enlarge('.enlargeBox') 
    // $('.enlarge').css("background-image","url(`${ info.goods_big_logo}`)");
    // console.log($('.enlarge'))
//渲染背景图








    // 2. 商品详细信息渲染
    $('.goodsInfo').html(`
      <p class="desc">${ info.goods_name }</p>
      <div class="btn-group size">
        <button type="button" class="btn btn-default">S</button>
        <button type="button" class="btn btn-default">M</button>
        <button type="button" class="btn btn-default">L</button>
        <button type="button" class="btn btn-default">XL</button>
      </div>
      <p class="price">
        ￥ <span class="text-danger">${ info.goods_price }</span>
      </p>
      <div class="num">
        <button class="subNum">-</button>
        <input type="text" value="1" class="cartNum">
        <button class="addNum">+</button>
      </div>
      <div>
        <button class="btn btn-success addCart">加入购物车</button>
        <button class="btn btn-warning continue"><a href="../html/liebiaoye.html">继续去购物</a></button>
      </div>
    `)
    }
 //3.加入购物车的操作
$('.goodsInfo').on('click', '.addCart', function () {
  const cart = JSON.parse(window.localStorage.getItem('cart')) || []
  const flag = cart.some(item => item.goods_id === id)
  if (flag) {
    const cart_goods = cart.filter(item => item.goods_id === id)[0]
    cart_goods.cart_number = cart_goods.cart_number - 0 + ($('.cartNum').val() - 0)
  } else {
    info.cart_number = 1
    cart.push(info)
  }
  window.localStorage.setItem('cart', JSON.stringify(cart))
})

// 4. ++ -- 的事件
$('.goodsInfo')
  .on('click', '.subNum', function () {
    let num = $('.cartNum').val() - 0
    if (num === 1) return
    $('.cartNum').val(num - 1)
  })
  .on('click', '.addNum', function () {
    let num = $('.cartNum').val() - 0
    $('.cartNum').val(num + 1)
  })

})