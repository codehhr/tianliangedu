$(function () {
  let domain = "http://wkt.myhope365.com";

  // 课程详情 start
  function getCourseDetail() {
    let api = `/pc/course/detail/${location.href.split("=")[1]}`;
    $.ajax({
      url: `${domain}${api}`,
      type: "GET",
      async: true,
      data: {
        // courseId: 103,
      },
      timeout: 5000,
      dataType: "json",
      // contentType: "application/x-www-form-urlencoded",
      success: function (data) {
        // console.log(data.data);
        renderData(data.data);
      },
      error: function (xhr) {
        console.log(xhr.responseText);
      },
    });

    // 渲染数据
    function renderData(data) {
      $(".introduce .cover").css(
        "background",
        `url("${data.coverFileUrl}") 0 0 no-repeat`
      );
      $(".introduce-content h3").text(data.courseTitle);
      $("p .participationsCount").text(data.participationsCount);
      if (data.isFree == 1) {
        $(".is-free").text("免费");
      }
      //
      $(".courseDetail").append(data.courseDetail);
      // 目录 start
      // 大 ul
      let sectionsUl = document.createElement("ul");
      $(sectionsUl).addClass("sections-ul");
      // 填充大 ul start
      data.sections.forEach((item, index) => {
        // 大 li
        let sectionsLi = document.createElement("li");
        $(sectionsLi).addClass("sections-li");
        // 大 li 里的标题
        let h3 = document.createElement("h3");
        $(h3).text(`${index + 1}.${item.sectionName}`);
        $(sectionsLi).append(h3);
        // 大 li 里的 小 ul
        let subSectionsUl = document.createElement("ul");
        $(subSectionsUl).addClass("sub-sections-ul");
        // 遍历填充大 li 里的 小 ul start
        item.subSections.forEach((subSectionItem, subIndex) => {
          let subSectionsLi = document.createElement("li");
          $(subSectionsLi).addClass("sub-sections-li");
          $(subSectionsLi).text(
            `${index + 1}-${subIndex + 1} ${subSectionItem.sectionName}`
          );
          $(subSectionsLi).append(
            `<svg data-v-3a7480b1="" viewBox="64 64 896 896" data-icon="play-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false" class=""><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path><path d="M719.4 499.1l-296.1-215A15.9 15.9 0 0 0 398 297v430c0 13.1 14.8 20.5 25.3 12.9l296.1-215a15.9 15.9 0 0 0 0-25.8zm-257.6 134V390.9L628.5 512 461.8 633.1z"></path></svg>`
          );
          let a = document.createElement("a");
          $(a).attr("href", "#");
          $(a).append(subSectionsLi);
          $(subSectionsUl).append(a);
        });
        $(sectionsLi).append(subSectionsUl);
        // 遍历填充大 li 里的 小 ul end
        $(sectionsUl).append(sectionsLi);
        // 填充大 ul end
      });
      $(".course-section").append(sectionsUl);

      // 目录 end
    }

    // 点击滑动 start
    function clickanimate() {
      $(".course-detail-title-item").css({
        color: "#000000a6",
      });
      $(".line").css(
        "width",
        `${$(".course-detail-title-item:eq(0)").width() * 1.6}px`
      );
      $(".course-detail-title-item").click(function () {
        // title transform start
        $(".line").css(
          "transform",
          `translateX(${
            $(this).index() * $(".course-detail-title-item").width() * 2
          }px)`
        );
        // title transform end

        // content transform start
        $(".course-detail-content-inner").css({
          transform: `translateX(${$(this).index() * 1200 * -1}px)`,
          height: "auto",
          overflow: "auto",
        });
        // content transform end
        // $("footer").css({
        //   position: "relative",
        // });
      });
      // 为了适应布局 start
      function clickAdaptation() {
        $(".course-detail-content-inner").css({
          height: "180px",
          overflow: "hidden",
        });
        // $("footer").css({
        //   position: "absolute",
        //   bottom: "0",
        //   left: "0",
        // });
      }
      $(".course-detail-title-item:eq(0)").click(function () {
        clickAdaptation();
      });
      clickAdaptation();
      // 为了适应布局 end
    }
    clickanimate();
    // 点击滑动 end
  }
  getCourseDetail();
  // 课程详情 end
});
