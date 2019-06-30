 var userInfo = null;
 $.ajax({
     url: "/user/queryUserMessage",
     async: false,
     success: function(res) {
         console.log(res);

         if (res.error && res.error == 400) {
             alert("你还没有登录");
             location.href = "login.html";
         } else {
             userInfo = res;


         }
     }
 })


 $(function() {
     console.log(userInfo);
     if (userInfo) {
         $(".mui-media-body span").html(userInfo.mobile)
         $(".mui-media-body p").html(userInfo.username)
     }
     $(".mui-text-center").on("click", function() {
         $.ajax({
             url: "/user/logout",
             success: function(res) {
                 if (res.success) {
                     mui.toast("退出成功");
                     setInterval(function() {
                         location.href = "login.html"
                     }, 2000)
                 } else {
                     mui.alert(res.message)

                 }
             }
         })
     })

 })