function Enlarge(ele){
    this.ele=document.querySelector(ele)
    console.log(this.ele)
    this.show=this.ele.querySelector('.show')
    this.mask=this.ele.querySelector('.mask')
    this.enlarge=this.ele.querySelector('.enlarge')
    this.list=this.ele.querySelector('.list')
    this.show_width=this.show.clientWidth
    this.show_height=this.show.clientHeight
    this.enlarge_width=parseInt(window.getComputedStyle(this.enlarge).width)
    this.enlarge_height=parseInt(window.getComputedStyle(this.enlarge).height)
    this.bg_width=parseInt(window.getComputedStyle(this.enlarge).backgroundSize.split(' ')[0])
    this.bg_height=parseInt(window.getComputedStyle(this.enlarge).backgroundSize.split(' ')[1])
    this.init()
//     this.ele = document.querySelector(ele)
//   // 1. show 盒子
//   this.show = this.ele.querySelector('.show')
//   // 2. mask 盒子
//   this.mask = this.ele.querySelector('.mask')
//   // 3. enlarge 盒子
//   this.enlarge = this.ele.querySelector('.enlarge')
//   // 4. show 盒子的宽高
//   // clientWidth 获取元素的尺寸(内容 + padding)
//   this.show_width = this.show.clientWidth
//   this.show_height = this.show.clientHeight
//   // 5. enlarge 盒子的宽高
//   // 因为 enlarge 盒子默认是隐藏的, clientWidth 不好使
//   // 获取元素非行内样式
//   this.enlarge_width = parseInt(window.getComputedStyle(this.enlarge).width)
//   this.enlarge_height = parseInt(window.getComputedStyle(this.enlarge).height)
//   // 6. 背景图片的尺寸
//   // split() 按照你给出的符号切割字符串, 返回值是一个数组
//   this.bg_width = parseInt(window.getComputedStyle(this.enlarge).backgroundSize.split(' ')[0])
//   this.bg_height = parseInt(window.getComputedStyle(this.enlarge).backgroundSize.split(' ')[1])
//   // 7. 获取列表盒子
//   this.list = this.ele.querySelector('.list')

//   // 直接启动入口函数
//   this.init()
}
Enlarge.prototype.init=function(){
    this.a()
    this.b()
    this.c()
    // this.d()
}
//第一步调整比例
Enlarge.prototype.a=function(){
    this.mask_width = this.show_width * this.enlarge_width / this.bg_width
    this.mask_height = this.show_height * this.enlarge_height / this.bg_height
    // this.mask_width=this.show_width*this.enlarge.width/this.bg_width
    // this.mask_height=this.show_height*this.enlarge.height/this.bg_height
    this.mask.style.width=this.mask_width+'px'
    this.mask.style.height=this.mask_height+'px'
}
//一出一入
Enlarge.prototype.b=function(){
    this.show.addEventListener('mouseover',()=>{
        this.mask.style.display='block'
        this.enlarge.style.display='block'
    })
    this.show.addEventListener('mouseout',()=>{
        this.mask.style.display='none'
        this.enlarge.style.display='none'
    })
}
//移动的时候
Enlarge.prototype.c=function(){
    this.show.addEventListener('mousemove',e=>{
        e=e||window.event
        let x=e.offsetX-this.mask_width/2
        let y=e.offsetY-this.mask_height/2
        if(x<=0)x=0
        if(y<=0)y=0
        if (x >= this.show_width - this.mask_width) x = this.show_width - this.mask_width
        if (y >= this.show_height - this.mask_height) y = this.show_height - this.mask_height
        this.mask.style.left = x + 'px'
    this.mask.style.top = y + 'px'
    const bg_x = this.enlarge_width * x / this.mask_width
    const bg_y = this.enlarge_height * y / this.mask_height
        this.enlarge.style.backgroundPosition = `-${ bg_x }px -${ bg_y }px`
    })
}
//点击事件
// Enlarge.prototype.d=function(){
//     this.list.addEventListener('click',e=>{
//         e=e||window.event
//         const target=e.target||e.srcElement
//         if(target.nodeName==='IMG'){
//             const show_url = target.getAttribute('show')
//             const enlarge_url = target.getAttribute('enlarge')
//             this.show.firstElementChild.src = show_url
//             this.enlarge.style.backgroundImage = `url(${ enlarge_url })`
//             for (let i = 0; i < this.list.children.length; i++) {
//               this.list.children[i].classList.remove('active')
//             }
//             target.parentElement.classList.add('active')  
//         }
//     })
// }