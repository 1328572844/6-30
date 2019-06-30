$(function() {
    var productId = new URLSearchParams(location.search).get("productId");
    console.log(productId);
    $.ajax({
        url: "/product/queryProductDetail",
        data: {
            id: productId
        },
        success: function(res) {
            console.log(res);
            var html = template("product", res);
            $(".mui-content").html(html);
            mui(".mui-slider").slider()
            mui(".mui-numbox").numbox()
        }
    })

    $(".mui-content").on("click", ".detail-size span", function() {

        $(this).addClass("active").siblings().removeClass("active");
    });
    $(".mui-content").on("click", "#addCart", function() {
        var num = $("#test").val();
        var size = $(".mui-content .detail-size  span[class='active']").text();
        // alert(1)
        $.ajax({
            url: "/cart/addCart",
            type: "post",
            data: {
                productId,
                num,
                size
            },
            success: function(res) {
                console.log(res);

                if (res.success) {
                    mui.confirm("添加成功，去购物车看看?", "温馨提示", ["是", "否"], (e) => {
                        if (e.index == 0) {
                            location.href = "cart.html";
                        }
                    })
                } else {
                    mui.alert(res.mussage);
                }
            }
        })

    })

})