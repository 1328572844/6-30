$(function() {
    // 如果要保存搜索关键字， 就需啊哟知道lacalStorage中是否已经存在关键字
    // 先获取到localStorage中保存keyword对应的数据
    var arr = localStorage.getItem("keyword")
        // arr有值取反 判断为null 设置为空数组
    if (!arr) {
        arr = [];
    } else {
        // 将取出来的字符串转换为数组
        arr = JSON.parse(arr);
    }
    var html = template("list", { list: arr });
    $("#historySearch").html(html);

    $("#btnSearch").on("click", function() {
        var value = $("#keyWord").val();
        // trim 情况值旁边的空格
        if (value.trim() === "") {
            mui.alert("请输入搜索关键字");
            return;
        } else {
            // 用indexof 利用元素获取索引 为-1 表示没有
            if (arr.indexOf(value) >= 0) {
                //  删除数组中的值 删除的个数
                arr.splice(arr.indexOf(value), 1);
            }
            arr.push(value);
            // 因为储存只能接受字符串 所以需要将数组转换为字符串
            localStorage.setItem("keyword", JSON.stringify(arr))
                // 将表单重置诶空
            $("#keyWord").val("");
            //  点击之后跳转页面
            location.href = "result.html?keyWord=" + value;
        }
    })
    $(".mui-icon-trash").on("click", function() {
        mui.confirm("请问是否删除搜索历史记录", "是否删除", ["是", "否"], (e) => {
            if (e.index == 0) {
                arr = [];
                $(".mui-table-view").html("");
                localStorage.removeItem("keyword");
            }
        })
    })
})