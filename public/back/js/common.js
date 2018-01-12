$(function () {
  //进度条功能
  // 每个页面ajax请求的时候，开启进度条
  // ajax请求结束的时候关闭进度条
  //这里因为每个页面的很多地方都有ajax请求，所以用到可ajax的全局事件
  //ajax的全局事件给document或者window注册
  $(document).ajaxStart(function () {
    //开启进度条
    NProgress.start();
  });
  $(document).ajaxStop(function () {
    //因为服务在本地，所以在ajax请求结束的时候延迟一秒关闭进度条
    setTimeout(function () {
       NProgress.done();
    },1000)
  })
})