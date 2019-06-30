$(function() {
    var x = new URLSearchParams(location.search);
    var proName = x.get("keyword");
    var price = 1;
    var brandId = null;
    var num = 1;
    var page = 1;
    var pageSize = 2;
    $.ajax({
        url: "/product/queryProduct",
        data: {
            proName,
            price,
            num,
            page,
            pageSize
        },
        success: function(res) {
            // console.log(res);

            var html = template("product", res);
            $(".list").html(html);

        }
    })

    mui.init({
        pullRefresh: {
            container: ".xxx",
            up: {
                callback: function() {

                    page++;
                    $.ajax({
                        url: "/product/queryProduct",
                        data: {
                            proName,
                            price,
                            num,
                            page,
                            pageSize
                        },
                        success: (res) => {
                            // console.log(res);
                            //如果有值 渲染数据 会进行刷新操作 
                            if (res.data.length > 0) {
                                var html = template("product", res);
                                $(".list").append(html);

                                this.endPullupToRefresh(false);
                            } else {
                                this.endPullupToRefresh(true);
                            }
                        }


                    })
                }
            }
        }
    });
    $(".priceSort").on("tap", function() {

        $(this).find("span").toggleClass("mui-icon-arrowdown mui-icon-arrowup");

        price = $(this).find("span").hasClass("mui-icon-arrowdown") ? 2 : 1;
        console.log(price);


        page = 1;
        mui(".xxx").pullRefresh().refresh(true);
        console.log(1);

        $.ajax({
            url: "/product/queryProduct",
            data: {
                proName,
                price,
                num,
                page,
                pageSize
            },
            success: function(res) {
                console.log(res);

                var html = template("product", res);
                $(".list").html(html);

            }
        })

    })
    $(".numSrot").on("tap", function() {

        $(this).find("span").toggleClass("mui-icon-arrowdown mui-icon-arrowup");

        num = $(this).find("span").hasClass("mui-icon-arrowdown") ? 2 : 1;
        console.log(num);


        page = 1;
        mui(".xxx").pullRefresh().refresh(true);
        console.log(1);

        $.ajax({
            url: "/product/queryProduct",
            data: {
                proName,
                price,
                num,
                page,
                pageSize
            },
            success: function(res) {
                console.log(res);

                var html = template("product", res);
                $(".list").html(html);

            }
        })

    })
})