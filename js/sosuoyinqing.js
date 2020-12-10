const ul = document.querySelector('ul')
        const inp = document.querySelector('input')
        console.log(ul)
        console.log(inp)
        // 2. 给 文本框 绑定一个 input 事件
        inp.addEventListener('input', function(){
            // 3. 拿到文本框中的内容
            // trim() 去除首位空格
            const value = this.value.trim()
            if(!value) return
            // 4. 准备发送请求
            // 动态创建 script 标签
            const script = document.createElement('script')
            // 准备一个请求地址
            const url = `https://www.baidu.com/sugrec?pre=1&p=3&ie=utf-8&json=1&prod=pc&from=pc_web&sugsid=1446,32857,33124,33061,32973,33099,33101,32962,22159&wd=${value}&req=2&csor=1&cb=bindHtml&_=1605768936993`
            script.src = url
            //  把 script 标签插入到页面里
            document.body.appendChild(script)
            script.remove()
        })

        function bindHtml(res){
            if(!res.g){
                ul.classList.remove('active')
                return
            }
            let str = ''
            for(let i = 0; i < res.g.length; i++){
                str += `
                <li>${res.g[i].q}</li>
                `
            }

            ul.innerHTML = str
            ul.classList.add('active')
        }