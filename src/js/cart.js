class Cart{
    constructor(){
        this.addEvent();
        this.changeEvent();
        this.clickEvent();
        this.checkEvent();
        this.productEvent();
    }
    addEvent(){
        let storage = window.localStorage;
        // console.log(storage)
        if(storage.length==0){
            $(".cart-con-none").css("display","block");
        }else{
            $(".cart-con-none").css("display","none");
            for(var i=0;i<storage.length;i++){
                let key = storage.key(i);
                let value = storage.getItem(key);
                let good = JSON.parse(value);
                let str=`
                <div class="content" data-item-id="product_${good.id}">
                    <ul>
                        <input type="checkbox" class="chk">
                        <img src="../img/cart/pro.png" alt="">
                        <li>
                            <b class="title">${good.name}</b>
                            <strong>&yen;${good.price}</strong>
                            <span class="pro-num">
                                <b class="minus">-</b>
                                <input type="text" value="${good.num}" class="num">
                                <b class="add">+</b>
                            </span>
                            <em class="sum">￥${good.price*good.num}</em>
                            <span class="del">删除</span>
                        </li>
                    </ul>
                </div>
                `;
                document.write(str);
            }
        }
    }
    // 修改数量
    changeEvent(){
        // 正则查找价格
        let reg=/(\d+)/;
        // 点击+  +1
        $(".add").on("click",function(){
            // 修改localStorage中num的值
            let storage = window.localStorage;
            let pro_id=$(this).parent().parent().parent().parent().attr("data-item-id");
            let pro_obj=JSON.parse(storage[pro_id]);
            pro_obj.num ++;
            storage[pro_id] = JSON.stringify(pro_obj);
            // 数量写入页面
            $(this).prev().val(pro_obj.num)
            // 加有￥的价格
            let pro_price=$(this).parent().prev().html()
            pro_price=parseInt(reg.exec(pro_price)[1])
            // 总价
            pro_price=pro_price*pro_obj.num
            $(this).parent().next().text("￥"+pro_price);
        })
        // 点击-  -1
        $(".minus").on("click",function(){
            // 修改localStorage中num的值
            let storage = window.localStorage;
            let pro_id=$(this).parent().parent().parent().parent().attr("data-item-id");
            let pro_obj=JSON.parse(storage[pro_id]);
            if(pro_obj.num > 1){
                pro_obj.num --;
            }
            storage[pro_id] = JSON.stringify(pro_obj);
            // 数量写入页面
            $(this).next().val(pro_obj.num)
            // 加有￥的价格
            let pro_price=$(this).parent().prev().html()
            pro_price=parseInt(reg.exec(pro_price)[1])
            // 总价
            pro_price=pro_price*pro_obj.num
            $(this).parent().next().text("￥"+pro_price);
        })
        // 修改num
        $(".num").blur(function(){
            // 修改localStorage中num的值
            let storage = window.localStorage;
            let pro_id=$(this).parent().parent().parent().parent().attr("data-item-id");
            let pro_obj=JSON.parse(storage[pro_id]);
            pro_obj.num=$(this).val();
            storage[pro_id] = JSON.stringify(pro_obj);
            // 数量写入页面
            $(this).val(pro_obj.num)
            // 加有￥的价格
            let pro_price=$(this).parent().prev().html()
            pro_price=parseInt(reg.exec(pro_price)[1])
            // 总价
            pro_price=pro_price*pro_obj.num
            $(this).parent().next().text("￥"+pro_price);
        })
        
    }
    // 删除
    clickEvent(){
        $(".del").on("click",function(){
            let storage = window.localStorage;
            console.log(storage)
            let pro_id=$(this).parent().parent().parent().attr("data-item-id");
            delete storage[pro_id]
            $(this).parent().parent().parent().remove()
            if(storage.length==0){
                $(".cart-con-none").css("display","block");
                $(".content").css("display","none");
            }
        })
    }
    // 全选
    checkEvent(){
        $(".all_big").on("click",function(){
            if($("input[type='checkbox']").prop("checked")){
                console.log($("input[type='checkbox']").prop("checked"))
                $(".chk").prop("checked","checked");
                let storage = window.localStorage;
                let pro_par=$(this).parent().next().children(".content")
                console.log(pro_par)
                let all_price=0;
                let all_num;
                $.each(pro_par,(index,value)=>{
                    let pro_id=JSON.parse(storage[$(value).attr("data-item-id")]);
                    let pri=pro_id.num*pro_id.price;
                    all_price+=pri
                    all_num=pro_par.length;
                })
                    console.log(all_price)
                    $(".all_sum").text("￥"+all_price+".00")
                    $(".all_num").text(all_num)
            }else{
                console.log($("input[type='checkbox']").prop("checked"))
                $(".chk").removeProp("checked");
                $(".all_sum").text("￥0.00")
                $(".all_num").text("0")
            }
        })
        $(".Gobuy").on("click",function(){
            location.href="https://auth.alipay.com/login/index.htm";
        })
        
    }
    // 去逛逛
    productEvent(){
        $(".go").click(function(){
            location.href="./product.html"
        })
    }
    
}

class CartBottom{
    constructor(){
        this.checkEvent();
    }
    checkEvent(){
        $(".Gobuy").on("click",function(){
            location.href="https://auth.alipay.com/login/index.htm";
        })
    }
}

    

    

