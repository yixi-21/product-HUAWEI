$.ajax({
    type: "POST",
    url: "../php/product.php",
    success:function (data) {
        data=JSON.parse(data);
        var str='';
        $.each(data,(index,value)=>{
            var str1=`
            <li class="pro" data_id="${value.pro_id}">
                <img src="${value.url}" alt="">
                <b>${value.title}</b>
                <strong>${value.price}起</strong>
                <span><em>一站式换新</em><em>商品赠券</em></span>
                <p><u>${value.evaluate}人评价</u><u>${value.good}好评</u></p>
                <h5>${value.new}</h5>
            </li>
            `
            str+=str1;
            $(".channel-list").html(str);
        })
        $(".pro").on("click",function(){
            let pro_id=$(this).attr("data_id");
            $.ajax({
                type:"GET",
                url:"./detail.html?id="+pro_id,
                success:function(res){
                    location.href="./detail.html?id="+pro_id
                }
            })
        })
    },
});

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
            }else{
                $(".hungBar-wrap .top").css("display","none");
            }
            if(document.documentElement.scrollTop>(document.documentElement.clientHeight)+800){
                $(".event-wrap").css("display","block");
            }else{
                $(".event-wrap").css("display","none");
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