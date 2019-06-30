$(function() {

    $("#getCode").on("click", function() {
        $.ajax({
            url: "/user/vCodeForUpdatePassword",
            success: function(res) {
                $("#vCode").val(res.vCode);
            }
        })
    })
    $("#regBtn").on("click", function() {
        alert(1)
        var oldPassword = $("#oldPassword").val();
        var newPassword = $("#newPassword").val();
        var againPass = $("#againPass").val();
        var vCode = $("#vCode").val();
        $.ajax({
            url: "/user/updatePassword",
            type: "post",
            data: {
                oldPassword,
                newPassword,
                vCode
            },
            beforeSend: function() {
                if (oldPassword.trim() == "") {
                    mui.alert("原密码不能为空");
                    return false;
                }
                if (newPassword.trim() == "") {
                    mui.alert("新密码不能为空");
                    return false;
                }
                if (newPassword != againPass) {
                    mui.alert("两次密码输入不一致");
                    return false;
                }
            },
            success: function(res) {
                console.log(res);
                if (res.success) {
                    mui.toast("密码修改成功");
                    setInterval(() => {
                        location.href = "login.html"
                    }, 2000);
                } else {
                    mui.alert(res.message)
                }
            }
        })
    })
})