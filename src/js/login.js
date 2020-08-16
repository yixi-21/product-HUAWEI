class Login{
    constructor(){
        this.cookieObj=$.cookie("registers") ? JSON.parse($.cookie("registers")) : {};
        this.addEvent();
        this.logEvent();
        this.arr=[false,false];
    }
    addEvent(){
        let that=this;
        // 手机号
        $(".phone").on("blur",function(){
            let user_name=$(this).val();
            if(!user_name){
                alert("请输入手机号或者邮箱");
                return;
            }
            var phone_reg=/^1\d{10}$/;
            var email_reg=/^.+[126]|[163]|[qq].+[\.com]|[\.cn]$/;
            if(phone_reg.test(user_name)){
                // alert("手机号正确");
                that.arr[0]=true;
            }else if(email_reg.test(user_name)){
                // alert("邮箱正确");
                that.arr[0]=true;
            }else{
                alert("输入格式不正确");
                that.arr[0]=false;
            }
            console.log(that.arr)
            // 验证密码
            $(".pwd").on("blur",function(){
                var psw_reg=/^\d{5,10}$/;
                if(psw_reg.test($(this).val())){
                    that.arr[1]=true;
                    // console.log("输入格式正确")
                }else{
                    alert("密码格式不正确");
                    that.arr[1]=false;
                }
            })
        })
    }
    // 点击登录
    logEvent(){
        let that=this;
        $(".log").on("click",function(){
            console.log(that.arr)
            if(that.arr.indexOf(false) === -1){
                let user_name=$(".user").val();
                let user_pwd=$(".pwd").val();
                if(user_name in that.cookieObj){
                    if(user_pwd === that.cookieObj[user_name]){
                        alert('登录成功');
                        location.href="../index.html";
                        return;
                    }else{
                        alert("密码错误")
                    }
                    return;
                }else{
                    alert("用户名不存在,去注册");
                    location.href="./register.html";
                }
            }

        })
    }
}

