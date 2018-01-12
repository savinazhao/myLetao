$(function () {
  // 1、登录表单的校验 使用了bootstrapValidator 插件
  //要求用户名不能为空
  //要求密码不能为空，并且长度是6-12
  var $form = $('form');
  //初始化表单校验插件
  $form.bootstrapValidator({
    //指定校验字段
    fields:{
      username:{
        //校验的规则
        validators:{
          notEmpty:{
            message:'用户名不能为空哦!'
          },
          callback:{
            message:'用户名不存在'
          }
        }
      },
      password:{
        validators:{
          notEmpty:{
           message:'密码不能为空'
          },
          //长度校验
          stringLength:{
            min:6,
            max:12,
            message:'密码长度为6-12位'
          },
          callback:{
            message:'密码错误'
          }
        }
      }
    },
    //指定校验时的图标显示
    feedbackIcons:{
      valid:'glyphicon glyphicon-ok',
      invalid:'glyphicon glyphicon-remove',
      validating:'glyphicon glyphicon-refresh'
    }
  });
  //bootstrapValidator表单校验插件会在表单提交的时候进行校验，表单校验成功的时候会让表单提交，校验不成功会阻止表单的提交
  //表单校验成会触发success.form.bv事件，但是在表单校验成功的时候应该阻止默认的表单提交，用ajax请求登录
  //2、 给表单注册校验成功的事件
  $form.on('success.form.bv',function (e) {
    //阻止表单提交的默认事件
    e.preventDefault();
    //发送ajax请求登录
    $.ajax({
      type:'post',
      url:'/employee/employeeLogin',
      data:$form.serialize(),
      success:function (info) {
        console.log(info);
        //{error: 1000, message: "用户名不存在! "}
        if(info.success) {
          //跳转到首页
          location.href = 'index.html';
        }
        if(info.error==1000) {
          //用户名不存在，更新表单元素的状态
          //获取表单校验的实例$form.data('bootstrapValidator')
          $form.data('bootstrapValidator').updateStatus('username','INVALID','callback');
        }
        if(info.error==1001) {
          $form.data('bootstrapValidator').updateStatus('password','INVALID','callback');
        }
      },
      error:function (e) {
        console.log(e);
      }
    })
  })
  // 3 、 表单重置，重置表单中设置过校验的内容，将隐藏所有图标和错误
 $('button[type="reset"]').on('click',function () {
   $form.data('bootstrapValidator').resetForm(true);
 })
  
  
})