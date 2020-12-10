$(function(){
    let list = null
    const list_info={
      cat_one: 'all',
      cat_two: 'all',
      cat_three: 'all',
      sort_method: '综合',
      sort_type: 'ASC',
      current: 1,
      pagesize: 12,
    }
// 1. 请求一级分类列表
yiji()
async function yiji() {
  const cat_one_list = await $.get('../server/yiji.php', null, null, 'json')
  let str = `<span data-type="all" class="active">全部</span>`
    cat_one_list.list.forEach(item => {
      str += `
        <span data-type="${ item.cat_one_id }">${ item.cat_one_id }</span>
      `
    })
    $('.cateOneBox > .right').html(str)
}

//渲染分页器
fyq()
  async function fyq() {
    const totalInfo = await $.get('../server/fyq.php', list_info, null, 'json')
    //分页器插件
    $('.pagination').pagination({
        pageCount: 50,
        jump: true,
        coping: true,
        homePage: '首页',
        endPage: '末页',
        prevContent: '上页',
        nextContent: '下页',
      callback (index) {
        list_info.current = index.getCurrent()
        xr()
    }
    })
  }
//渲染商品
xr()
  async function xr() {
    const goodsList = await $.get('../server/xr.php', list_info, null, 'json')
    list = goodsList.list
    let str = ''
    goodsList.list.forEach(item => {
      str += `
        <li class="thumbnail">
          <img src="${ item.goods_big_logo }" alt="...">
          <div class="caption">
            <h3 data-id="${ item.goods_id }">${ item.goods_name }</h3>
            <p class="price">￥
              <span class="text-danger">${ item.goods_price }</span>
            </p>
            <p>
              <a href="javascript:;" class="btn btn-danger addCart" role="button" data-id="${ item.goods_id }">加入购物车</a>
              <a href="../html/gowuche.html" class="btn btn-warning" role="button">去结算</a>
            </p>
          </div>
        </li>
      `
    })
    $('.goodsList > ul').html(str)
  }
//一级点击事件
$('.cateOneBox').on('click', 'span', function () {
    $(this).addClass('active').siblings().removeClass('active')
    const type = $(this).data('type')
    list_info.cat_two = 'all'
    list_info.cat_three = 'all'
    list_info.current = 1
    list_info.cat_one = type
    fyq()
    xr()
    $('.catThreeBox .right').html('<span data-type="all" class="active">全部</span>')
  })
//排序方式的点击事件
$('.sortBox').on('click', 'span', function () {
    const method = $(this).attr('data-method')
    const type = $(this).attr('data-type')
    $(this).addClass('active').siblings().removeClass('active')
    list_info.sort_method = method
    list_info.sort_type = type
    fyq()
    xr()
    $(this)
      .attr('data-type', type === 'ASC' ? 'DESC' : 'ASC')
      .siblings()
      .attr('data-type', 'ASC')
  })
//点击跳转到详情页
$('.goodsList ul').on('click', 'h3', function () {
console.log(this)
  const id = $(this).data('id')
  setCookie('goods_id', id)
  window.location.href = '../html/xiangqing.html'
})
//加入购物车的操作
$('.goodsList').on('click', '.addCart', function () {
  const cart = JSON.parse(window.localStorage.getItem('cart')) || []
  const id = $(this).data('id')
  const flag = cart.some(item => item.goods_id == id)
  if (flag) {
    const cart_goods = cart.filter(item => item.goods_id == id)[0]
    cart_goods.cart_number = cart_goods.cart_number - 0 + 1
  } else {
    const info = list.filter(item => item.goods_id == id)[0]
    info.cart_number = 1
    cart.push(info)
  }
  window.localStorage.setItem('cart', JSON.stringify(cart))
})

})

