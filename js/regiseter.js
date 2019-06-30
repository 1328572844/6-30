// 注册页面 获取验证码 将验证码填入文本框中
$(function() {
    $("#getCode").on("click", function() {
        $.ajax({
            url: "/user/vCode",
            success: function(res) {
                console.log(res);
                $("#vCode").val(res.vCode);
            }
        })
    })

    //获取表单值  发送ajax传值 
    $("#regBtn").on("click", function() {
        var username = $("#username").val();
        var mobile = $("#mobile").val();
        var password = $("#password").val();
        var againPass = $("#againPass").val();
        var vCode = $("#vCode").val();

        $.ajax({
            url: "/user/register",
            type: "post",
            data: {
                username,
                mobile,
                password,
                vCode
            },
            //进行判断是否输入值
            beforeSend: function() {
                if (username.trim() === "") {
                    mui.alert("用户名不能为空")
                    return false;
                };
                if (/^1\d{10}$/.test(mobile) === false) {
                    mui.alert("手机号格式不对");
                    return false;
                };
                if (password.trim() === "") {
                    mui.alert("密码不能为空");
                    return false;
                };
                if (password != againPass) {
                    mui.alert("两次密码不一致");
                    return false;
                };

                if (vCode.trim() === "") {
                    mui.alert("验证码不能为空");
                    return false;
                };

            },
            success: function(res) {
                if (res.success) {
                    mui.toast("注册成功");
                    setInterval(() => {
                        location.href = "login.html";
                    }, 3000);

                } else {
                    mui.alert("注册失败, 请联系管理员")
                }
            }
        })
    })

})