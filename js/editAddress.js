$(function() {
    var id = new URLSearchParams(location.search).get("id")
    console.log(id);
    $.ajax({
        url: "/address/queryAddress",
        success: function(res) {
            console.log(res);

            for (var i = 0; i < res.length; i++) {
                if (res[i].id == id) {
                    $("#recipients").val(res[i].recipients);
                    $("#postcode").val(res[i].postCode);
                    $("#address").val(res[i].address);
                    $("#addressDetail").val(res[i].addressDetail);

                }
            }
        }
    })
    var picker = new mui.PopPicker({ layer: 3 });
    picker.setData(cityData);
    $("#address").on("click", function() {
        picker.show((selectedItem) => {
            var str = "";
            selectedItem.forEach((item) => {
                if (item.text) {
                    str += item.text
                }
            })
            $("#address").val(str);
        })
    })
    $("#btnEdit").on("click", function() {
        var recipients = $("#recipients").val();
        var postcode = $("#postcode").val();
        var address = $("#address").val();
        var addressDetail = $("#addressDetail").val();
        $.ajax({
            url: "/address/updateAddress",
            type: "post",
            data: {
                id,
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
                if (res.success) {
                    mui.toast("地址修改成功");
                    setInterval(function() {
                        location.href = "address.html";
                    }, 2000)
                } else {
                    mui.alert(res.mussage)
                }
            }
        })

    })

})