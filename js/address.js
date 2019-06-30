$(function() {
    $.ajax({
        url: "/address/queryAddress",
        success: function(res) {
            console.log(res);

            var html = template("addressList", { data: res });
            $("ul").html(html);
        }
    })
    $("ul").on("click", ".mui-btn-red", function() {
        mui.confirm("是否删除此收货地址", "删除地址", ["是", "否"], (e) => {
            if (e.index === 0) {
                var id = $(this).attr("data-id");
                $.ajax({
                    url: "/address/deleteAddress",
                    type: "post",
                    data: {
                        id
                    },
                    success: function(res) {
                        console.log(res);
                        if (res.success) {
                            mui.toast("删除成功");
                            location.reload()
                        } else {
                            mui.toast(res.message)
                        }

                    }
                })
            }
        })

    })
})