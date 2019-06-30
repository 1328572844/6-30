$(function() {
    // 分页页面
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006

    });
    // 发送一级分类请求数据
    $.ajax({
            url: "/category/queryTopCategory",
            type: "get",
            datatype: "joan",
            success: function(res) {
                console.log(res);
                var html = template("first", res);
                $(".left ul").html(html);
                // 给第一个li添加自动触发事件
                if ($(".left ul li").length > 0) {
                    $(".left ul li").eq(0).click();
                }

            }
        })
        // 因为li是动态生成的 所以 需要on点击事件
    $(".left ul").on("click", "li", function() {
        // li排他思想 
        $(this).addClass("active").siblings().removeClass("active");
        // 获取id 给ajax请求添加id
        var id = $(this).attr("data-id");

        // mui框架 滑动返回顶部
        mui('.right').scroll().scrollTo(0, 0, 100);

        $.ajax({
            url: "/category/querySecondCategory",
            type: "get",
            data: {
                id
            },
            success: function(res) {
                console.log(res);
                var html = template("second", res);
                $(".right ul").html(html);

            }
        })
    })
})