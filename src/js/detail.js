// console.log(window.location.search);
let id=window.location.search.slice(4);
// console.log(id)

$.ajax({
    type:"POST",
    url:"../php/detail.php",
    success:function(data){
        data=JSON.parse(data);
        // console.log(data)
        $.each(data,(index,value)=>{
            // console.log(value)
            if(value.id==id){
                let str=`
            <ul class="detail-top-left">
                <li class="min">
                    <img src=${value.url_big} alt="">
                    <strong class="mask"><img src=${value.url_big} alt=""></strong>
                    <strong class="min_i"></strong>
                </li>
                <li class="small">
                    <i class="iconfont icon-arrow-left s_left"></i>
                    <span id="imgCon">
                        <img src=${value.url_small.one} alt="">
                        <img src=${value.url_small.two} alt="">
                        <img src=${value.url_small.three} alt="">
                        <img src=${value.url_small.four} alt="">
                        <img src=${value.url_small.five} alt="">
                        <img src=${value.url_small.sex} alt="">
                        <img src=${value.url_small.seven} alt="">
                        <img src=${value.url_small.eight} alt="">
                    </span>
                    <i class="iconfont icon-jiantou s_right"></i>
                </li>
            </ul>
            <ul class="detail-top-right">
                <li>
                    <h4 class="title">${value.title}</h4> 
                    <a href="javascript:;">【新品首销】①赠华为耳机②赠华为云服务礼包③晒单限量赠精美礼品|老用户加赠延保，点击参与>>></a>
                    <em>6.8英寸超清大屏；22.5W超级快充；6400W高清摄影；极速5G新体验；颜值实力派；全系128G大存储；</em>
                    <p class="price">
                        <span><label>价格</label><strong>&yen;${value.price}</strong></span>
                        <span>
                            <label>促销</label>
                            <em>
                                <strong>赠品</strong>
                                <strong>去选择></strong>
                            </em>
                            <em>
                                <strong>一站式换新</strong>
                                <strong>APP专享，最高补贴530元</strong>
                            </em>
                            <em>
                                <strong>商品赠券</strong>
                                <strong>支付后赠送精美礼券</strong>
                            </em>
                            <em>
                                <strong>赠送积分</strong>
                                <strong>购买即赠商城积分，积分可抵现~</strong>
                            </em>
                        </span>
                    </p>
                    <p class="ser">
                        <em>
                            <label>服务说明</label>
                            <span>
                                预计付款5天内发货
                                <i class="iconfont icon-wenhao"></i>
                            </span>
                            <span>
                                <b>
                                    <i class="iconfont icon-duigou"></i>
                                    <strong>已满48元已免运费</strong>
                                </b>
                                <b>
                                    <i class="iconfont icon-duigou"></i>
                                    <strong>已满48元已免运费</strong>
                                </b>
                            </span>
                        </em>
                        <em>
                            <label>商品编码</label>
                            <b>2601010226605</b>
                        </em>
                    </p>
                    <p class="select">
                        <em>
                            <label>选择颜色</label>
                            <a href="javascript:;"><img src="../img/magnify/ss.png" alt=""><b>${value.select.first}</b></a>
                            <a href="javascript:;"><img src="../img/magnify/ss2.png" alt=""><b>${value.select.second}</b></a>
                            <a href="javascript:;"><img src="../img/magnify/ss3.png" alt=""><b>${value.select.third}</b></a>
                        </em>
                        <em>
                            <label>选择版本</label>
                            <a href="javascript:;">${value.selected.first}</a>
                            <a href="javascript:;">${value.selected.second}</a>
                        </em>
                        <em>
                            <label>选择套餐</label>
                            <a href="javascript:;">官方标配</a>
                        </em>
                        <em>
                            <label>保障服务</label>
                            <a href="javascript:;">碎屏服务保1年 &yen; 103.2</a>
                            <a href="javascript:;">延长服务保1年 &yen; 94.4</a>
                        </em>
                    </p>
                    <p class="selected">
                        <em>  
                            <label>已选择商品：</label>
                            <span>樱雪晴空 / 5GB全网通 8GB+128GB / 官网标配</span>
                        </em>
                        <em>
                            <span class="pro-num">
                                <b id="minus">-</b>
                                <input type="text" value="1" class="num">
                                <b id="add">+</b>
                            </span>
                            <span class="cart">加入购物车</span>
                            <span class="buy">立即下单</span>
                        </em>
                    </p>
                </li>
            </ul> `
                $("#detail").html(str)
            }
            
            
        })

        $(".min").on("mouseenter",function(){
            $(this).on("mousemove",function(e){
                // 计算鼠标移动时的位置
                let disX=e.pageX-$(this).offset().left;
                let disY=e.pageY-$(this).offset().top;
                // console.log(disX,disY);

                // 计算鼠标位于框的中心
                let left=disX-$(".min_i").width()/2;
                let top=disY-$(".min_i").height()/2;

                // 计算边界
                let wid_min_i=$(".min").width()-$(".min_i").width();
                let hei_min_i=$(".min").height()-$(".min_i").height();
                if(left<0){
                    left=0;
                }else if(left> wid_min_i){
                    left= wid_min_i;
                }
                if(top<0){
                    top=0
                }else if(top>hei_min_i){
                    top=hei_min_i;
                }
                $(".min_i").css({"left":left,"top":top});

                // 比例  他移动的位置比他能移动的位置
                let x=left/wid_min_i;
                let y=top/hei_min_i;
                let maskX=$(".mask").width()-$(".mask img").width();
                let maskY=$(".mask").height()-$(".mask img").height();

                // 比例*小框的宽高  大图在小框里能移动的位置
                let mask_l=x*maskX;
                let mask_t=y*maskY;

                $(".mask img").css({"left":mask_l,"top":mask_t})

            })

            $(".min_i").show();
            $(".mask").show();
        });
        $(".min").on("mouseleave",function(){
            $(".min_i").hide();
            $(".mask").hide();
        })

        // 点击左右按钮
        let n=0
        $(".s_left").click(function(){
            // console.log(n)
            n--;
            if(n<-1) n=-1;
            $("#imgCon").css("left",-n*35+"px")
        })
        $(".s_right").click(function(){
            // console.log(n)
            n++;
            if(n>6) n=6 ;
            $("#imgCon").css("left",-n*35+"px")
        })

        // 滑过imgCon变换图片
        $("#imgCon img").each((index,value)=>{
            $(value).mouseenter(function(){
                let img_src=$(this).attr("src");
                $(".min img").attr("src",img_src);
            })
        })

        // 点击+ 数量+1
        $("#add").click(function(){
            let a=$(".num").val();
            a++
            $(".num").val(a);  
            // console.log(a)
        })

        // 点击- 数量-1
        $("#minus").click(function(){
            let a=$(".num").val();
            a--
            if(a<=1) a=1;
            $(".num").val(a);  
            // console.log(a)
        })

        // 修改num
        $(".num").blur(function(){
            if($(".num").val()<=1) $(".num").val(1)
        })

        // 点击加入购物车
        $(".cart").click(function(){
            let good_id=id;
            let good_title=$(".title").text();
            let good_price=$(".price").children().first().html();
            let price_reg=/(\d+)/;
            good_price=price_reg.exec(good_price)[1];
            let count=$(".num").val();
            console.log(good_id,good_title,good_price,count)
            let storage = window.localStorage;
            var msg = `{"id" : ${good_id},"name" : "${good_title}","price" : ${good_price},"num" : ${count}}`;
            storage.setItem(`product_${good_id}`, msg);
            $(".Tocart").first().text("购物车("+count+")").css("color","red");
            $(".hungBar-wrap i a").css("display","block").text(count);
            console.log($(".Tocart").first().html())
        })

        $(".Tocart").click(function(){
            location.href="./cart.html";
        })
        $(".hungBar-wrap .to").click(function(){
            location.href="./cart.html";
        })
    }
})

// 置顶
class HungBar{
    constructor(){
        this.addEvent();
        this.bool=false;
    }
    addEvent(){
        window.onscroll=function(){
            if(document.documentElement.scrollTop>document.documentElement.clientHeight){
                $(".hungBar-wrap .top").css("display","block");
                console.log((document.documentElement.clientHeight)+100)
            }else{
                $(".hungBar-wrap .top").css("display","none");
            }
        }
        let that=this;
        $(".hungBar-wrap .top").on("click",function(){
            that.bool=true;
            setInterval(function(){
                if(!that.bool) return;
                document.documentElement.scrollTop-=100;
                if(document.documentElement.scrollTop===0){
                    that.bool=false;
                }
            },16)
        })
    }
}

