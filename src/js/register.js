
class Register{
    constructor(){
        this.phoneEvent();
        this.emailEvent(); 
        this.signEvent();
        this.arr=[false,false,false,false];
    }
    // 手机号注册
    phoneEvent(){
        this.addPhone();
        $(".reg_phone").css("background","#E5F2FF");
        // 点击手机号注册
        $(".reg_phone").on("click",function(){
            $(this).css("background","#E5F2FF");
            $(".reg_email").css("background","");
            $(".reg").show();
            $(".reg1").hide();
        })
        // 点击出现验证并验证验证码
        let that=this;
        $("#getCode").on("click",function(){
            $(".codelook").css("display","block");
            let code=that.randomCode();
            $(".codelook").text(code)
            $(".codelook").css("color",that.randomColor());
            // 验证验证码
            $("#code").on("blur",function(){
                // console.log($(this).val(),$(".codelook").text())
                if($(this).val()==$(".codelook").text()){
                    $(".codelook").next().text("正确");
                    that.arr[1]=true;
                    // 验证密码
                    $(".psw").on("blur",function(){
                        if(!$(this).val()){
                            alert("请输入密码")
                            return
                        }
                        var psw_reg=/^\d{5,10}$/;
                        if(psw_reg.test($(this).val())){
                            $(this).next().text("正确");
                            that.arr[2]=true;
                        }else{
                            alert("密码格式不正确");
                            that.arr[2]=false;
                        }
                    })
                }else{
                    alert("验证码不正确");
                    that.arr[1]=false;
                }
            })
        })
        // 确认密码
        $(".sure").on("blur",function(){
            if(!$(this).val()){
                alert("请输入确认密码")
                return
            }
            var sure_reg=$(".psw").val();
            if($(this).val()==sure_reg){
                $(this).next().text("正确");
                that.arr[3]=true;
            }else{
                alert("与密码不符");
                that.arr[3]=false;
            }
        })

    }
    // 验证手机号
    addPhone(){
        let that=this;
        // 验证手机号
        $("#phone").on("blur",function(){
            let user_name=$(this).val();
            if(!user_name){
                alert("请输入手机号");
                return;
            }
            var phone_reg=/^1\d{10}$/;
            if(phone_reg.test(user_name)){
                $(this).next().text("正确");
                that.arr[0]=true;
            }else{
                alert("手机号格式不正确");
                that.arr[0]=false;
            }
            //获取cookie
            let cookieObj=$.cookie("registers") ? JSON.parse($.cookie("registers")) : {};
            // console.log(cookieObj)
            if(cookieObj){
                // console.log(cookieObj)
                if(user_name in cookieObj){
                    alert('手机号已存在！');
                    that.arr[0] = false;
                    return;
                }else{
                    that.arr[0] = true;
                }
            }
        })
    }
    // 邮箱注册
    emailEvent(){
        // 验证手机号
        this.addEmail();
        // 点击邮箱注册
        $(".reg_email").on("click",function(){
            $(this).css("background","#E5F2FF");
            $(".reg_phone").css("background","");
            $(".reg1").show();
            $(".reg").hide();
        })
        // 点击出现验证并验证验证码
        let that=this;
        $("#getCode2").on("click",function(){
            $(".codelook2").css("display","block");
            let code=that.randomCode();
            $(".codelook2").text(code)
            $(".codelook2").css("color",that.randomColor());
            // 验证验证码
            $("#code2").on("blur",function(){
                // console.log($(this).val(),$(".codelook2").text())
                if($(this).val()==$(".codelook2").text()){
                    $(".codelook2").next().text("正确");
                    that.arr[1]=true;
                    // 验证密码
                    $(".psw2").on("blur",function(){
                        if(!$(this).val()){
                            alert("请输入密码")
                            return
                        }
                        var psw_reg=/^\d{5,10}$/;
                        if(psw_reg.test($(this).val())){
                            $(this).next().text("正确");
                            that.arr[2]=true;
                        }else{
                            alert("密码格式不正确");
                            that.arr[2]=false;
                        }
                    })
                }else{
                    alert("验证码不正确");
                    that.arr[1]=false;
                }
            })
        })
        
        // 确认密码
        $(".sure2").on("blur",function(){
            if(!$(this).val()){
                alert("请输入确认密码")
                return
            }
            var sure_reg=$(".psw2").val();
            if($(this).val()==sure_reg){
                $(this).next().text("正确");
                that.arr[3]=true;
            }else{
                alert("与密码不符");
                that.arr[3]=false;
            }
        })
    }
    // 验证邮箱
    addEmail(){
        // 验证邮箱
        let that=this;
        $("#email").on("blur",function(){
            let user_name=$(this).val()
            if(!user_name){
                alert("请输入邮箱");
                return;
            }
            var email_reg=/^.+[126]|[163]|[qq].+[\.com]|[\.cn]$/;
            if(email_reg.test(user_name)){
                $(this).next().text("正确");
                that.arr[0]=true;
            }else{
                alert("邮箱格式不正确");
                that.arr[0]=false;
            }
            //获取cookie
            let cookieObj=$.cookie("registers") ? JSON.parse($.cookie("registers")) : {};

            if(cookieObj){
                console.log(cookieObj)
                if(user_name in cookieObj){
                    alert('邮箱已存在！');
                    that.arr[0] = false;
                    return;
                }else{
                    that.arr[0] = true;
                }
            }
        })
    }
    // 随机验证码
    randomCode(){
        var n="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        var num="";
        for(var i=0;i<6;i++){
            var nn=parseInt(Math.random()*n.length);
            num+=n[nn];
        }
        // console.log(num)
        return num
    }
    // 随机颜色
    randomColor(){
        var col="#";
        var num="0123456789ABCDEFabcdef";
        for(var i=0;i<6;i++){
            var cc=parseInt(Math.random()*num.length);
            col+=num[cc];
        }
        return col
    }
    // 点击注册按钮
    signEvent(){
        let that=this;
        // 手机号
        $("#sign").on("click",function(){
            console.log(that.arr);
            if(that.arr.indexOf(false)===-1){
                //获取 用户名
                let user = $("#phone").val();
                //获取密码
                let pwd = $(".psw").val();
                //获取cookie
                let cookieObj=$.cookie("registers") ? JSON.parse($.cookie("registers")) : {};
                cookieObj[user]=pwd;
                console.log(cookieObj)
                $.cookie("registers",JSON.stringify(cookieObj),{expires : 7,path : '/'})
                alert("登录成功！");
                location.href="./login.html";
            }
        })
        // 邮箱
        $("#reg").on("click",function(){
            console.log(that.arr)
            if(that.arr.indexOf(false)===-1){
                //获取 用户名
                let email = $("#email").val();
                console.log(email)
                //获取密码
                let pwd = $(".psw2").val();
                //获取cookie
                let cookieObj=$.cookie("registers") ? JSON.parse($.cookie("registers")) : {};
                cookieObj[email]=pwd;
                console.log(cookieObj)
                $.cookie("registers",JSON.stringify(cookieObj),{expires : 7,path : '/'})
                alert("登录成功！");
                location.href="./login.html"

            }
        })
    }
}