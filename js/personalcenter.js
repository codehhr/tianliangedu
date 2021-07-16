$(function () {
  // personalcenter start
  // 个人中心 start

  // localStorage.clear();
  let userInfo = JSON.parse(localStorage.getItem("userInfo"));
  // 渲染数据
  $(".nickname").append(userInfo.nickname);
  $(".mobile").append(userInfo.mobile);
  $(".avatar img").prop("src", userInfo.avatarUrl);
  localStorage.clear();
  // 个人中心 end
  // personalcenter end
});
