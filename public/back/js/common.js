$(function () {
  //1、进度条功能
  // 每个页面ajax请求的时候，开启进度条
  // ajax请求结束的时候关闭进度条
  //这里因为每个页面的很多地方都有ajax请求，所以用到可ajax的全局事件
  //ajax的全局事件给document或者window注册
  //配置，关闭进度环
  NProgress.configure({ showSpinner: false });
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
  
  // 2 、除了登录页面。进入其他页面都要判断用户是否登录了
  //ajax请求判断用户是否登录了，登录了就可进入对应页面，没有登录跳转到登录页
  if(location.href.indexOf('login.html')==-1) {
    //说明不是登录页
    $.ajax({
      type:'get',
      url:'/employee/checkRootLogin',
      dataType:'json',
      success:function (info) {
        // console.log(info);
        if(info.error==400) {
          //没有登录跳转到登录页
            location.href = 'login.html';
        }
      }
    })
  }
  
  // 3、分类管理菜单的二级管理的显示与隐藏功能
  $('.second').prev().on('click',function () {
      $(this).next().slideToggle();
  })
  
  // 4、点击icon_menu按钮侧边栏显示或者隐藏
  $('.icon_menu').on('click',function () {
        $('.lt_aside').toggleClass('now');
        $('.lt_main').toggleClass('now');
  })
  // 5 点击退出按钮icon_logout弹出模态框
  $('.icon_logout').on('click',function () {
    //初始化模态框
    $('#logoutModal').modal('show');
  });
  
  $('.btn-logout').on('click',function () {
    //ajax请求退出登录
    $.ajax({
      type:'get',
      url:'/employee/employeeLogout',
      success:function (info) {
        // console.log(info);
        if(info.success) {
          //跳转到登录页
          location.href = 'login.html';
        }
      }
    })
    
  })
})