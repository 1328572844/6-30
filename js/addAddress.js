$(function() {
    //创建一个泡泡选择器 3页查看
    var picker = new mui.PopPicker({ layer: 3 });
    // 可以通过选择器对象的setData方法来设置需要显示的数据
    // cityData对象来源于city.js文件
    picker.setData(cityData);
    // 当用户点击点击选择 弹出文本框 显示选择器
    $("#address").on("click", function() {
        // 调用picker里面的show方法显示出选择器
        // show方法里面可以传递一个函数 这个函数可以让用户选择内容之后的处理
        picker.show((selectedItems) => {
            // 形参selectedItems是一个数据形式的数据 可以获取用户选择的省市区
            var names = "";
            selectedItems.forEach((v) => {

                    // 遍历数据  判断是否存在值
                    if (v.text) {
                        // 字符串拼接
                        names += v.text;
                    }

                })
                // 箭头函数this指向外层函数 文本值赋值
            $(this).val(names)
        })
    });

    $("#loginBtn").on("click", function() {
        var recipients = $("#recipients").val();
        var postcode = $("#postcode").val();
        var address = $("#address").val();
        var addressDetail = $("#addressDetail").val();
        $.ajax({
            url: "/address/addAddress",
            type: "post",
            data: {
                recipients,
                postcode,
                address,
                addressDetail
            },
            beforeSend: function() {
                if (recipients.trim() == "") {
                    mui.alert("收货人姓名不能为空");
                    return false;
                }
                if (postcode.trim() == "") {
                    mui.alert("邮编不能为空");
                    return false;
                }
                if (address.trim() == "") {
                    mui.alert("收货地址不能为空");
                    return false;
                }
                if (addressDetail.trim() == "") {
                    mui.alert("收货地址不能为空");
                    return false;
                }
            },
            success: function(res) {
                console.log(res);
                if (res.success) {
                    mui.alert("添加收货地址成功");
                    setInterval(() => {
                        location.href = "address.html"
                    })
                } else {
                    mui.alert(res.message)
                }
            }
        })
    })
})