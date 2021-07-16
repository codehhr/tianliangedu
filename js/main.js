$(function () {
  let domain = "http://wkt.myhope365.com";

  // 轮播图 start

  // 请求图片
  function getSwiperImg() {
    let api = "/weChat/applet/course/banner/list";
    $.ajax({
      url: `${domain}${api}`,
      type: "GET",
      async: true,
      data: {
        number: 4,
      },
      timeout: 5000,
      dataType: "json",

      success: function (data) {
        renderSwiper(data.data);
      },
      error: function (xhr) {
        console.log(xhr.responseText);
      },
    });
  }
  getSwiperImg();

  // 渲染轮播图片
  function renderSwiper(data) {
    data.forEach((item, index) => {
      let li = document.createElement("li");
      $(".carousel-indicators").append(
        `<li data-target="#carousel-0" data-slide-to="${index}" class="active"></li>`
      );
      let div = document.createElement("div");
      $(div).addClass("item");
      let imgDiv = document.createElement("div");
      $(imgDiv).addClass("img-div");
      $(imgDiv).css(
        "background",
        `url("${item.imgUrlPc}") center center no-repeat`
      );
      $(imgDiv).css("backgroundSize", "cover");
      $(div).append(imgDiv);
      // let img = document.createElement("img");
      // img.src = item.imgUrlPc;
      // $(div).append(img);
      $(".carousel-inner").append(div);
    });
    $(".carousel-inner .item:nth-last-of-type(1)").addClass("active");
  }
  // 轮播图 end

  // 直播课程 start
  function liveCourse() {
    $(".live-course-item .bar").css("visibility", "hidden");
    $(".live-course-item:eq(0) .bar").css("visibility", "visible");
    $(".live-course-item").each(function (index, value) {
      $(value).bind({
        mouseenter() {
          changePreviewCourse(index);
          $(".live-course-item .bar").css("visibility", "hidden");
          $(".live-course-item .bar").eq(index).css("visibility", "visible");
          $(".live-course-item").eq(index).css("color", "#00cf8c");
          $(".live-course-item").eq(index).css("backgroundColor", "#ffffff");
        },
        mouseleave() {
          // $(".live-course-item .bar").eq(index).css("visibility", "hidden");
          $(".live-course-item").eq(index).css("color", "#333333");
          $(".live-course-item").eq(index).css("backgroundColor", "#f4f4f4");
        },
      });
    });

    function changePreviewCourse(index) {
      $(".preview-item").hide();
      $(".preview-item").eq(index).css("display", "flex");
    }
  }
  liveCourse();
  // 直播课程 end

  // 课程模板 start
  function course(api, type, date, dataType, contentType, fatherClassName) {
    // 请求数据
    $.ajax({
      url: `${domain}${api}`,
      type: type,
      async: true,
      data: JSON.parse(date),
      timeout: 5000,
      dataType: dataType,
      contentType: contentType,
      success: function (data) {
        // console.log(data.rows);
        randerData(data.rows);
      },
      error: function (xhr) {
        console.log(xhr.responseText);
      },
    });

    // 渲染数据
    function randerData(data) {
      createFreeCourseItem(data);

      // 创建每一个课程
      function createFreeCourseItem(data) {
        data.forEach((item) => {
          // console.log(item);
          let div = document.createElement("div");
          // div.setAttribute("class", "free-course-item");
          $(div).addClass("free-course-item");
          let img = document.createElement("img");
          img.src = item.coverFileUrl;
          let courseAlinkTag = document.createElement("a");
          $(courseAlinkTag).attr(
            "href",
            `./coursedetail/coursedetail.html?courseId=${item.courseId}`
          );
          $(courseAlinkTag).append(img);
          $(div).append(courseAlinkTag);

          let p1 = document.createElement("p");
          let a = document.createElement("a");
          a.href = "#";
          a.innerHTML = item.courseTitle;
          $(p1).append(a);
          $(div).append(p1);

          let p2 = document.createElement("p");
          $(p2).html(
            `共 ${item.learningNum} 节课 | ${item.participationsCount} 人报名`
          );
          $(div).append(p2);

          let p3 = document.createElement("p");
          if (item.isFree == 1) {
            $(p3).html("免费");
            $(div).append(p3);
          } else if (item.isDiscount == 1) {
            let span1 = document.createElement("span");
            $(span1).html(`￥${item.discountPrice}`);
            $(span1).addClass("discountPrice");
            $(p3).append(span1);
            let span2 = document.createElement("span");
            $(span2).html(`${item.coursePrice}`);
            $(span2).addClass("coursePrice");
            $(p3).append(span2);
            let span3 = document.createElement("span");
            $(span3).html("限时钜惠");
            $(span3).addClass("sold");
            $(p3).append(span3);
            $(div).append(p3);
          }
          $("." + fatherClassName).append(div);
        });
      }
    }
  }
  // 课程模板 end

  // 免费课程 start
  function freeCourse(...rest) {
    course(...rest);
  }
  freeCourse(
    "/weChat/applet/course/list/type",
    "POST",
    JSON.stringify({
      type: "free",
      pageNum: 1,
      pageSize: 10,
    }),
    "json",
    "application/x-www-form-urlencoded",
    "free-course-content"
  );
  // 免费课程 end

  // 精品课程 start
  function highQualityCourse(...rest) {
    course(...rest);
  }
  highQualityCourse(
    "/weChat/applet/course/list/type",
    "POST",
    JSON.stringify({
      type: "discount",
      pageNum: 1,
      pageSize: 5,
    }),
    "json",
    "application/x-www-form-urlencoded",
    "high-quality-course-content"
  );
  // 精品课程 end

  // 限时折扣课程 start
  function discountCoursesForLimitedTime(...rest) {
    course(...rest);
  }
  discountCoursesForLimitedTime(
    "/weChat/applet/course/list/type",
    "POST",
    JSON.stringify({
      type: "discount",
      pageNum: 1,
      pageSize: 5,
    }),
    "json",
    "application/x-www-form-urlencoded",
    "discountCoursesForLimitedTime-course-content"
  );
  // 限时折扣课程 end
});
