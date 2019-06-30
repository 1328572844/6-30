$(function() {
    // 登录页面
    $("#loginBtn").on("click", function() {

        var username = $("#username").val();
        var password = $("#password").val();
        $.ajax({
            url: "/user/login",
            type: "post",
            data: {
                username,
                password
            },
            success: function(res) {
                if (res.success) {
                    mui.toast("登陆成功");
                    setInterval(() => {
                        location.href = "user.html";
                    }, 3000)
                } else {
                    mui.alert(res.message);
                }
            }

        })
    })
})