$(function () {
  let domain = "http://wkt.myhope365.com";

  // 头部 课程分类 导航 start
  function nav() {
    $(".categories-menu ul").hide();
    $(".categories-menu").bind({
      mouseenter() {
        $(".categories-menu ul").stop().slideToggle(200);
      },
      mouseleave() {
        $(".categories-menu ul").stop().slideToggle(200);
      },
    });
    let api = "/weChat/applet/subject/list";

    // 课程分类下拉菜单 start
    function categoriesDropMenu() {
      $.ajax({
        url: `${domain}${api}`,
        type: "POST",
        async: true,
        data: JSON.stringify({
          enable: 1,
        }),
        timeout: 5000,
        dataType: "json",
        contentType: "application/json",
        success: function (data) {
          // console.log(data.rows);
          renderDropMenu(data.rows);
        },
        error: function (xhr) {
          console.log(xhr.responseText);
        },
      });
    }
    categoriesDropMenu();
    // 渲染 下拉菜单数据 start
    function renderDropMenu(data) {
      data.forEach((item) => {
        let li = document.createElement("li");
        let a = document.createElement("a");
        a.href = "#";
        a.innerHTML = `${item.title}`;
        li.appendChild(a);
        document.querySelector(".categories-menu ul").appendChild(li);
      });
    }
    // 渲染 下拉菜单数据 end
    // 课程分类下拉菜单 end
  }
  nav();
  // 头部课程导航 end

  // 登录注册 start
  function signupSignin() {
    // 登录 start
    function signIn() {
      let api = "/pcUser/login";
      let username = $("#username").val();
      let password = $("#password").val();
      $.ajax({
        url: `${domain}${api}`,
        type: "POST",
        async: true,
        data: {
          username: username,
          password: password,
          rememberMe: true,
        },
        timeout: 5000,
        dataType: "json",
        contentType: "application/x-www-form-urlencoded",
        success: function (data) {
          // console.log(data);
          validate(data);
        },
        error: function (xhr) {
          console.log(xhr.responseText);
        },
      });
    }
    // 登录 end

    // 注册 start
    function signUp() {
      let api = "/pcUser/register";
      let loginName = $("#signup-username").val();
      let password = $("#signup-password").val();
      let nickname = $("#signup-nickname").val();
      let mobile = $("#signup-tel").val();
      let code = $("#signup-code").val();
      $.ajax({
        url: `${domain}${api}`,
        type: "POST",
        async: true,
        data: {
          loginName: loginName,
          password: password,
          nickname: nickname,
          mobile: mobile,
          code: code,
        },
        timeout: 5000,
        dataType: "json",
        contentType: "application/x-www-form-urlencoded",
        success: function (data) {
          if (data.code == 0) {
            alert("注册成功");
          }
        },
        error: function (xhr) {
          console.log(xhr.responseText);
        },
      });
    }
    // 注册 end

    // 点击登录 start
    $(".signin-btn").click(function () {
      signIn();
    });
    // 点击登录 end

    // 点击注册 start
    $(".signup-btn").click(function () {
      signUp();
    });
    // 点击注册 end

    // 确认并处理数据
    function validate(data) {
      if (data.code == 0) {
        localStorage.setItem("userInfo", JSON.stringify(data.userInfo));
        window.location.href = "./personalcenter/personalcenter.html";
      } else {
        alert("No");
      }
    }
    // 聚焦输入框效果 start
    function focusOrBlurInput() {
      $(".formbox input")
        .not(".get-signup-verificationcode input")
        .focus(function () {
          // 判断确认密码框
          if ($(this).attr("id") == "signup-confirm-password") {
            // 直到两次密码输入一致,阴影变为绿色
            $(this).keyup(function () {
              if ($(this).val() == $("#signup-password").val()) {
                $(this)
                  .parents(".formbox")
                  .not(".getauthcode")
                  .css("box-shadow", "0 0 4px 2px #00cf8ca6");
              } else {
                $(this)
                  .parents(".formbox")
                  .not(".getauthcode")
                  .css("box-shadow", "0 0 4px 2px #ff909090");
              }
            });
          } else {
            $(this)
              .parents(".formbox")
              .not(".getauthcode")
              .css("box-shadow", "0 0 4px 2px #00cf8ca6");
          }
        });
      $(".formbox input").blur(function () {
        $(this).parents(".formbox").css("box-shadow", "0 0 0 0 #c4c4c4a6");
      });
    }
    focusOrBlurInput();
    // 聚焦输入框效果 end

    // 注册登录切换显示 start
    function signupSigninToggle() {
      // 初始样式 start
      // $("#modal-container-signup").hide();
      $("#modal-container-signin .form-title button:eq(0)").css(
        "border-bottom",
        "2px solid #00cf8c"
      );
      // 初始样式 end

      // 点击 普通登录 start
      $("#modal-container-signin .form-title button:eq(0)").click(function () {
        $("#modal-container-signin .form-title button").css(
          "border-bottom",
          "2px solid #ffffff"
        );
        $(this).css("border-bottom", "2px solid #00cf8c");
        $(".form-content-inner").css("transform", "translateX(0%)");
      });
      // 点击 普通登录 end

      // 点击 手机登录 start
      $("#modal-container-signin .form-title button:eq(1)").click(function () {
        $("#modal-container-signin .form-title button").css(
          "border-bottom",
          "2px solid #ffffff"
        );
        $(this).css("border-bottom", "2px solid #00cf8c");
        $(".form-content-inner").css("transform", "translateX(-50%)");
      });
      // 点击 手机登录 end

      // 点击 立即注册 start
      $(".go-signup-btn").click(function () {
        $("#modal-container-signin .form-close-btn").click();
        setTimeout(() => {
          $("#modal-1").click();
        }, 200);
      });
      // 点击 立即注册 end

      // 点击 去登录 start
      $(".go-signin-btn").click(function () {
        $("#modal-container-signup .form-close-btn").click();
        setTimeout(() => {
          $("#modal-0").click();
        }, 200);
      });
      // 点击 去登录 end
    }
    signupSigninToggle();
    // 注册登录切换显示 end

    // 点击验获取证码按钮 start
    function getVerificationCode() {
      // 点击禁用获取验证码按钮 start
      function clickToDisabledBtn(dom) {
        $(dom).attr("disabled", "disabled");
        $(dom).css({
          backgroundColor: "#f1f1f1",
          color: "#333333",
        });
        verificationCodeCountDown(dom);
      }
      // 点击禁用获取验证码按钮 end

      function clickToGetVerificationCode() {
        let mobile = $("#signup-tel").val();
        let api = `/pcUser/register/send/code/${mobile}`;
        $.ajax({
          url: `${domain}${api}`,
          type: "GET",
          async: true,
          data: {},
          timeout: 5000,
          dataType: "json",
          contentType: "application/x-www-form-urlencoded",
          success: function (data) {
            console.log(data);
          },
          error: function (xhr) {
            console.log(xhr.responseText);
          },
        });
      }
      // 点击获取登录验证码 start
      $(".get-signin-verificationcode button").click(function () {
        clickToGetVerificationCode();
        clickToDisabledBtn(this);
      });
      // 点击获取登录验证码 end

      // 点击获取注册验证码 start
      $(".get-signup-verificationcode button").click(function () {
        clickToGetVerificationCode();
        clickToDisabledBtn(this);
      });
      // 点击获取注册验证码 end
    }
    getVerificationCode();
    // 点击验获取证码按钮 end

    let countDownInterval;
    // 验证码倒计时 start
    function verificationCodeCountDown(dom) {
      clearInterval(countDownInterval);
      let seconds = 1 * 60;
      $(dom).text(seconds);
      countDownInterval = setInterval(() => {
        if (seconds != 0) {
          seconds--;
          $(dom).text(seconds);
        } else {
          clearInterval(countDownInterval);
        }
      }, 1000);
    }
    // 验证码倒计时 end
  }
  signupSignin();
  // 登录注册 end

  // 友情链接 start
  function friendLink() {
    let api = "/system/dict/data/list/open";
    $.ajax({
      url: `${domain}${api}`,
      type: "POST",
      async: true,
      data: {
        dictType: "blogroll",
        pageNum: 1,
        pageSize: 10,
        orderByColumn: "dictSort",
        isAsc: "asc",
      },
      timeout: 5000,
      dataType: "json",
      contentType: "application/x-www-form-urlencoded",
      success: function (data) {
        // console.log(data.rows);
        renderData(data.rows);
      },
      error: function (xhr) {
        console.log(xhr.responseText);
      },
    });

    // 渲染数据
    function renderData(data) {
      data.forEach((item) => {
        // console.log(item.dictLabel);
        let span = document.createElement("span");
        let a = document.createElement("a");
        a.href = item.dictValue;
        $(a).html(item.dictLabel);
        $(span).append(a);
        $(".fridendslink").append(span);
      });
    }
  }
  friendLink();
  // 友情链接 end
});
