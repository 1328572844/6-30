$(function() {
    var page = 1;
    var pageSize = 1000;
    var total = 0;
    var size;

    $.ajax({
        url: "/cart/queryCart",
        success: function(res) {
            console.log(res);
            var html = template("cart", { data: res });
            $("ul").html(html);
        }
    });
    $(".mui-content").on("change", "input", function() {
        total = 0;
        $("input:checked").each((i, v) => {
            var now = $(v).parents(".mui-table-view-cell");
            var price = now.find(".one").text();
            var num = now.find(".three").text();
            total += price * num;



        });

        $(".tatal").html("商品总计:" + total.toFixed(2))
    })


    $("ul").on("tap", ".mui-btn-red", function() {
        var id = $(this).attr("data-id");
        console.log(id);

        $.ajax({
            url: "/cart/deleteCart",
            data: {
                id
            },
            success: function(res) {
                console.log(res);
                if (res.success) {
                    mui.toast("删除成功");
                    location.reload()
                } else {
                    mui.alert("无法删除")
                }

            }
        })

    })


    $("ul").on("tap", ".mui-btn-blue", function() {


        var html = template("editConfirm", { size: 50, num: 3, productSize: '40-50' });
        html = html.replace(/>\s*</g, "><");
        $("body").on("click", ".data-size span", function() {
            size = $(this).text();
            $(this).addClass("active").siblings().removeClass("active")
        })
        mui.confirm(html, "编辑商品", ["是", "否"], (e) => {
            if (e.index == 0) {
                var id = $(this).attr("data-id");
                var num = $("#test").val();
                $.ajax({
                    url: "/cart/updateCart",
                    type: "post",
                    data: {
                        id,
                        num,
                        size
                    },
                    success: function(res) {
                        if (res.success) {
                            mui.toast('修改成功');
                            location.reload()
                        } else {
                            mui.alert(rs.mussage);
                        }

                    }
                })
            }
        })
        mui(".mui-numbox").numbox();
    })

})