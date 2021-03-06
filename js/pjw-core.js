window.potatojw_intl = function() {
  if (typeof(window.pjw_version) == "string") return;

  window.pjw_platform = "@platform@";
  if (window.pjw_platform[0] == "@")
    window.pjw_platform = "General Plugin";

  window.pjw_version = "@version@";
  if (window.pjw_version[0] == "@")
    window.pjw_version = "0.2.7";
  
  if (jQuery.fn.jquery == "3.5.1")
    window.$$ = jQuery.noConflict();
  else
    window.$$ = $;

  var head_metadata = `
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,height=device-height,initial-scale=1.0,maximum-scale=1.0,user-scalable=0">
    <link rel="shortcut icon" href="https://www.nju.edu.cn/_upload/tpl/01/36/310/template310/images/16.ico" type="image/x-icon">
  `;
  $$("head").prepend(head_metadata);

  // UI Improvement
  if ($$("#Function").length) {
    $$("#Function").addClass("light");
    $$("#Function").find("li").on("click", (e) => {
      window.location.href = $$(e.delegateTarget).find("a").attr("href");
    });
  }

  if ($$("#UserInfo").length) {
    $$("#UserInfo").html(`
      <div id="pjw-user-info" onclick="window.location.href = '/jiaowu/student/teachinginfo/courseList.do?method=currentTermCourse';">${$$("#UserInfo").html().slice(4).match(/.*?\&/)[0].slice(0, -1)}
        <div id="pjw-user-type">${$$("#UserInfo").html().slice(4).match(/：.*/)[0].slice(1)}</div>
      </div>
    `);
    if (store.has("privilege")) $$("#pjw-user-type").html(store.get("privilege")); 
    $$("#pjw-user-type").on("click", (e) => { if (window.click_count) {window.click_count++;}
      else {window.click_count = 1; setTimeout(() => {delete click_count;}, 2000);} if (window.click_count >= 5) { window.click_count = 0; if (store.has("privilege")) { store.remove("privilege"); $$("#pjw-user-type").html("学生");} else store.set("privilege", "root"); if (store.has("privilege")) $$("#pjw-user-type").html(store.get("privilege"));}/*ifyouareheretryitout*/
      e.stopPropagation();
    });
    $$("#TopLink").children("img").remove();
    if ($$(".Line").length) {
      $$("table").find("tr").each((index, obj) => {
        if ($$(obj).html().trim() == "")
          $$(obj).remove();
      });
      $$("table").find("td[align=right] > b").css({
        "font-size": "14px",
        "color": "rgba(0, 0, 0, .75)",
        "font-weight": "bold"
      });
      $$("table").find("td[align=left] > b").css({
        "font-size": "14px",
        "color": "rgba(0, 0, 0, .65)",
        "font-weight": "normal"
      });
      $$("table").find("td[align=left] > b > a").css({
        "font-size": "14px",
        "color": "rgba(0, 0, 0, .65)",
        "font-weight": "normal"
      });
    }
  }

  if ($$("div#TopLink").length > 0) {
    $$("div#TopLink").html(`<span class="pjw-mini-button" onclick="window.open('https://cubiccm.ddns.net/potatoplus')">v${pjw_version}</span>
      <span class="pjw-mini-button" id="pjw-logout-button" onclick="window.location.href='exit.do?type=student'">退出登录</span>`);
  }

  function collapseSidebarIntoFilter() {
    $$("#comment").detach().prependTo(".pjw-filter-panel");
    $$("#courseDetail").detach().prependTo(".pjw-filter-panel");
    $$("#courseDetail").css({
      width: "100%",
      left: 0
    });
    $$("#comment").css({
      width: "100%",
      left: 0,
      top: "5px",
      color: "rgba(0, 0, 0, .4)"
    });
  }

  window.reset_storage_confirm = false;
  window.reset_storage_timeout = 0;
  window.resetStorage = function() {
    if (reset_storage_confirm) {
      store.clearAll();
      reset_storage_confirm = false;
      $$("#reset_storage").html("重置存储");
      clearInterval(reset_storage_timeout);
    } else {
      $$("#reset_storage").html("确定重置 PotatoPlus 的全部存储？");
      reset_storage_confirm = true;
      reset_storage_timeout = setTimeout(() => {
        $$("#reset_storage").html("重置存储");
        reset_storage_confirm = false;
      }, 2000);
    }
  }

  console.log(`PotatoPlus v${pjw_version} (${pjw_platform}) by Limos`);

  if (pjw_mode == "") return;

  console.log(pjw_mode + " mode activated");

  if (store.get("login_settings") != null && store.get("login_settings").share_stats == true) {
    $$("head").append($$(google_analytics_js));
  }

  var filter_mode_list = {"major_course": 6};
  var pjw_classlist_mode_list = {"dis_view": true, "open_view": true, "all_course_list": true, "dis": true, "open": true, "common": true, "public": true, "read_view": true, "gym": true, "read": true, "grade_info": true, "public_view": true};

  const custom_toolbar_html = {
    course_eval: `
      <span class="pjw-mini-button" onclick="toggleAutoEval();" id="toggle_auto_eval_button">开启自动评价</span>
      <span>开启后，点一下对应课程即自动五星好评。</span>
    `,
    login_page: `
      <input type="checkbox" id="store_login_info" class="login_settings" checked="checked">
      <label for="store_login_info">记住登录信息</label>
      <input type="checkbox" id="solve_captcha" class="login_settings" checked="checked">
      <label for="solve_captcha">验证码识别</label>
      <input type="checkbox" id="share_stats" class="login_settings" checked="checked">
      <label for="share_stats">发送匿名统计数据</label>
    `,
    filter: `
      <div id="filter-control-bar">
        <section>
          <input type="checkbox" id="filter_switch">
          <label for="filter_switch">课程过滤器</label>
          <span class="pjw-mini-button" id="show_filter_setting" onclick="showFilterSettings();">配置</span>
        </section>
        <section>
          <input type="checkbox" id="auto_refresh">
          <label for="auto_refresh" style="font-weight: bold; margin-right: 8px;">刷新</label>
          <span style="color: #dedede; font-size: 11px;">标准</span>
          <input type="range" id="auto_refresh_frequency" style="width: 50px; height: 15px;" value="0" onchange="frequencyUpdate();">
          <span style="color: #dedede; font-size: 11px;">封号退学</span>
        </section>
        <section style="opacity: .6;">
          <input type="checkbox" id="auto_select" disabled="disabled">
          <label for="auto_select" style="font-weight: bold;">自动选择 *弃用</label>
        </section>
      </div>
    `,
    default: `<span>正在此页面上运行。</span>`
  };

  const about_this_project = `
  <span style="user-select: text;">PotatoPlus v` + pjw_version + `</span>
  `;

  if (pjw_mode in filter_mode_list) {
    const filter_setting_html = `
      <div id="potatojw_mask"></div>
      <div id="potatojw_filter_setting_frame">
        <section id="filter_full_class" class="filter_section">
          <input type="checkbox" id="is_filter_full_class" checked="checked">
          <label for="is_filter_full_class">仅显示空余课程</label>
        </section>

        <section id="filter_major" class="filter_section">
          <h3>专业过滤</h3>
          <h5>将会自动选择此专业。</h5>
          <input type="text" id="filter_major_text">
        </section>

        <section id="filter_grade" class="filter_section">
          <h3>年级过滤</h3>
          <h5>将会自动选择此年级。</h5>
          <input type="text" id="filter_grade_text">
        </section>

        <section id="filter_class_name" class="filter_section">
          <h3>课名过滤</h3>
          <h5>仅显示含有以下关键字的课程。</h5>
          <input type="text" id="filter_class_name_text">
        </section>
        <section id="filter_teacher_name" class="filter_section">
          <h3>教师过滤</h3>
          <h5>仅显示含有该教师的课程。</h5>
          <input type="text" id="filter_teacher_name_text">
        </section>
        <section id="filter_time" class="filter_section">
          <h3>上课时间过滤</h3>
        </section>
        <br>
        <span class="pjw-mini-button" onclick="hideFilterSettings();">完成设置</span>
        <br><br>
        <span>请留意，此处的课程过滤器是 PotatoPlus v0.1 的功能，近期未经过测试和更新，请不要依赖此功能。</span>
        <br>
        <span>上课时间过滤器暂不能储存，刷新页面后会消失。</span>
        <br>
        <span>打开开发者界面（F12 / Option + Command + I）的控制台（Console）可查看输出信息</span>
        <br>
        <div class="about-proj"></div>
      </div>
    `;
    $$("body").append(filter_setting_html);
  }

  if (pjw_mode != "" && !(pjw_mode in pjw_classlist_mode_list) && pjw_mode != "main_page") {
    $$("body").append(`<div id='pjw-toolbar'><div id="pjw-toolbar-content">` +
        custom_toolbar_html[(pjw_mode in filter_mode_list ? "filter" : (pjw_mode in custom_toolbar_html ? pjw_mode : "default"))]
    + `<div class="about-proj"></div></div></div>`);
    const toolbar_button_html = `
    <div id="pjw-toolbar-collapse-bg"><canvas id="pjw-toolbar-collapse" width="30px" height="30px"></canvas></div>
    `;
    $$("#pjw-toolbar").prepend(toolbar_button_html);

    // Initiate toolbar
    $$(".about-proj").html(about_this_project);

    // Draw collapse button
    var canvas = document.getElementById("pjw-toolbar-collapse");
    window.ctx = canvas.getContext('2d');
    ctx.fillStyle = "#63065f";

    ctx.beginPath();
    ctx.moveTo(6, 7);
    ctx.lineTo(6, 23);
    ctx.lineTo(7, 24);
    ctx.lineTo(8, 23);
    ctx.lineTo(8, 7);
    ctx.lineTo(7, 6);
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(22, 6);
    ctx.lineTo(9, 15);
    ctx.lineTo(22, 24);
    ctx.lineTo(23, 25);
    ctx.lineTo(24, 24);
    ctx.lineTo(12, 15);
    ctx.lineTo(24, 6);
    ctx.lineTo(23, 5);
    ctx.fill();
    ctx.closePath();

    // Collapse / Expand toolbar
    function switchToolBar() {
      if (store.get("is_toolbar_collapsed") == true) expandToolBar();
      else collapseToolBar();
    }
    function collapseToolBar() {
      $$("#pjw-toolbar").css("left", "-100%");
      $$("#pjw-toolbar-collapse-bg").css("background-color", "");
      $$("#pjw-toolbar-collapse").css({
        "position": "fixed",
        "left": "30px",
        "bottom": "30px",
        "top": "calc(100% - 60px)",
        "transform": "rotate(180deg)"
      });
      store.set("is_toolbar_collapsed", true);
    }
    if (store.get("is_toolbar_collapsed") == null)
      store.set("is_toolbar_collapsed", false);
    else if (store.get("is_toolbar_collapsed") == true)
      collapseToolBar();
    $$("#pjw-toolbar-collapse-bg").on("click", switchToolBar);
    $$("#pjw-toolbar-collapse").on("mousedown", () => { if (store.get("is_toolbar_collapsed") == false) $$("#pjw-toolbar-collapse-bg").css("background-color", "rgba(255, 255, 255, 1.0)");} );
    $$("#pjw-toolbar-collapse-bg").on("mousedown", () => { if (store.get("is_toolbar_collapsed") == false) $$("#pjw-toolbar-collapse-bg").css("background-color", "rgba(255, 255, 255, 1.0)");} );

    // Show toolbar
    function expandToolBar() {
      $$("#pjw-toolbar").css("left", "");
      $$("#pjw-toolbar").css("opacity", "");
      $$("#pjw-toolbar-collapse").css({
        "position": "",
        "left": "",
        "bottom": "",
        "top": "",
        "transform": ""
      });
      store.set("is_toolbar_collapsed", false);
    }
  }

  if (pjw_mode in pjw_classlist_mode_list)
    ClassListPlugin();


  // Storage Upgrade  
  if (store.get("version") == null || store.get("version") != pjw_version) {
    store.set("is_toolbar_collapsed", false);
    store.remove("privilege");
    store.set("version", pjw_version);
    store.remove("bulletin_update_timestamp");
    store.remove("bulletin_content");
  }


  if (pjw_mode == "main_page") {
    window.pconsole = new PJWConsole();
    if (typeof(window.alert_data) != "undefined") {
      pconsole.alert(window.alert_data);
    }

    $$("div#TopLink").prepend(`<span class="pjw-mini-button" style="color: gray; opacity: 0.5;" onclick="resetStorage();" id="reset_storage">重置存储</span>`);

    var update_html = "";
    if (pjw_platform == "Userscript") {
      update_html = `<a href="https://github.com/cubiccm/potatoplus/releases/latest/download/potatoplus.user.js">&gt; 获取更新 - Userscript</a><br><br>PotatoPlus 浏览器扩展已经在<a href="https://chrome.google.com/webstore/detail/potatoplus/mokphlegfcilcbnjmhgfikjgnbnconba" target="_blank">Chrome网上应用店</a>和<a href="https://microsoftedge.microsoft.com/addons/detail/potatoplus/miofoebmeohjbieochdmaolpaneapmib" target="_blank">Microsoft Edge Add-ons</a>上线，Firefox 用户可以到<a href="https://github.com/cubiccm/potatoplus/releases/latest/download/PotatoPlus.xpi" target="_blank">GitHub Releases</a>获取，建议您迁移到插件版本以在部分功能上获得更好的体验。安装插件后请关闭当前脚本的执行。`;
    } else if (pjw_platform == "General Plugin") {
      update_html = `您所安装的版本可能不支持自动更新，请访问<a href="https://github.com/cubiccm/potatoplus/releases/latest/" target="_blank">GitHub Releases</a>页面检查及获取更新。`;
    }

    const mailing_list_html = `
      <div style="display: flex; opacity: .8;">
        <div class="pjw-mini-button" onclick="window.open('https://cubiccm.ddns.net/potato-mailing-list/');">加入邮件列表</div>
        <div class="pjw-mini-button" onclick="window.open('mailto:illimosity@gmail.com');">发送反馈邮件</div>
      </div>
    `;

    var welcome_html = `
      <div id="pjw-welcome" class="pjw-card">
        <p>PotatoPlus 0.2.7 对成绩查询进行了一些小改进。</p>
        <p id="pjw-bulletin-content">${store.get("bulletin_content") || ""}</p>
        <br>
        <div class="pjw-welcome-get-update">${update_html}</div>
        ${mailing_list_html}
        <note>
          <a href="https://cubiccm.ddns.net/potatoplus" target="_blank" style="margin-left: 0;">PotatoPlus ${pjw_version}</a>
          <a href="https://github.com/cubiccm/potatoplus" target="_blank">GitHub</a>
          <a href="https://cubiccm.ddns.net/about" target="_blank" onmousemove="pconsole.love('Some people are worth melting for. --Olaf', 'love');">@Limos</a>
        </note>
      </div>
    `;

    const cn_days_name = ["日", "一", "二", "三", "四", "五", "六"];

    var calcCurrentWeek = () => {
      const semester_begin = new Date(new Date("2021-03-01").getTime() - 8 * 3600000);
      const exam_begin = new Date(new Date("2021-06-21").getTime() - 8 * 3600000);
      const summer_school_begin = new Date(new Date("2021-07-05").getTime() - 8 * 3600000);
      const holiday_begin = new Date(new Date("2021-08-02").getTime() - 8 * 3600000);
      const next_sem_begin = new Date(new Date("2021-08-30").getTime() - 8 * 3600000); // Undetermined
      const today = new Date();
      if (today < semester_begin)
        return `学期将开始于 ${semester_begin.toDateString()}`;
      else if (today < exam_begin)
        return `学期第<num>${Math.ceil((today - semester_begin + 1) / (7 * 24 * 60 * 60 * 1000))}</num>周`;
      else if (today < summer_school_begin)
        return "考试周";
      else if (today < holiday_begin)
        return "暑期学校";
      else if (today < next_sem_begin)
        return "暑假";
      else
        return "查看教学周历";
    }

    const menu_html = `
      <div id="pjw-menu" class="pjw-card">
        <heading>Howdy, NJUer</heading><br>
        <subheading>${new Date().getMonth() + 1}月${new Date().getDate()}日 星期${cn_days_name[new Date().getDay()]} <a href="https://jw.nju.edu.cn/qxnjxxl/list.htm" target="_blank">${calcCurrentWeek()}</a></subheading>
        <br>
        <br>
        <div data-mdc-auto-init="MDCRipple" class="mdc-button mdc-button--raised pjw-menu-button" style="background-color: rgba(46, 19, 197, .9);" data-link="/jiaowu/student/teachinginfo/courseList.do?method=currentTermCourse">
          <div class="mdc-button__ripple"></div>
          <i class="material-icons-round">today</i>
          <div class="mdc-button__label">我的课程</div>
          <div data-mdc-auto-init="MDCRipple" class="mdc-button mdc-button--raised pjw-menu-button pjw-menu-button--inserted" style="background-color: white; color: rgb(99, 110, 255);" data-link="/jiaowu/student/elective/index.do">
            <div class="mdc-button__ripple"></div>
            <i class="material-icons-round">add</i>
            <div class="mdc-button__label">选课</div>
          </div>
        </div>
        <div data-mdc-auto-init="MDCRipple" class="mdc-button mdc-button--raised pjw-menu-button" style="background-color: rgba(255, 255, 255, .3);" data-link="/jiaowu/student/teachinginfo/allCourseList.do?method=getTermAcademy">
          <div class="mdc-button__ripple"></div>
          <i class="material-icons-round">search</i>
          <div class="mdc-button__label">查询全部课程</div>
        </div>

        <div data-mdc-auto-init="MDCRipple" class="mdc-button mdc-button--raised pjw-menu-button" style="background-color: rgba(255, 255, 255, .3);" data-link="/jiaowu/student/studentinfo/achievementinfo.do?method=searchTermList">
          <div class="mdc-button__ripple"></div>
          <i class="material-icons-round">calculate</i>
          <div class="mdc-button__label">成绩查看</div>
        </div>
        <br>
        <br>
      </div>
    `;

    if (!store.has("bulletin_update_timestamp") || store.get("bulletin_update_timestamp") + 300000 <= new Date().getTime()) {
      var is_sharing_stats = ("share_stats" in store.get("login_settings")) && (store.get("login_settings")["share_stats"] == true);
      welcome_html += `<iframe src="https://cubiccm.ddns.net/apps/potatoplus-bulletin/?version=${pjw_version}&share_stats=${is_sharing_stats ? 1 : 0}" width="300" height="300" style="display: none;"></iframe>`;

      window.addEventListener("message", (e) => {
        if (e.origin !== "https://cubiccm.ddns.net") return;
        store.set("bulletin_update_timestamp", new Date().getTime());
        store.set("bulletin_content", e.data);
        $$("#pjw-bulletin-content").html(store.get("bulletin_content"));
      });
    }

    $$("#Function").before(menu_html);
    $$("#pjw-menu").append($$("#Function"));
    $$("#Function:eq(1)").remove();
    $$("#Function").addClass("main-page-function");

    $$(".Line").before(welcome_html);
    $$(".Line").remove();

    $$(".pjw-menu-button").on("click", (e) => {
      e.stopPropagation();
      var target = $$(e.delegateTarget);
      if (target.attr("data-link"))
        window.location.href = target.attr("data-link");
    })
    window.mdc.autoInit();
  } else if (pjw_mode == "course_eval") {
    window.quick_eval_mode_enabled = false;
    window.updateEval = function() {
      document.getElementById("td" + g_evlId).innerHTML = quick_eval_mode_enabled ? "已自动评价" : "已评";
      $('evalDetail').innerHTML = "谢谢您的评估！";
    }
    window.quickSubmitEval = function() {
      $$.ajax({
        url: "/jiaowu/student/evalcourse/courseEval.do?method=submitEval",
        data: "question1=5&question2=5&question3=5&question4=5&question5=5&question6=5&question7=5&question8=5&question9=5&question10=5&question=+10&mulItem1=0&mulItem=+1&ta1=",
        type: "POST",
        success: function(res) {
          updateEval();
        },
        error: function(res) {
          console.log("ERROR: " + res);
        }
      });
    };

    window.showEvalItem = function(id) {
      g_evlId = id;
      $$.ajax({
        url: "/jiaowu/student/evalcourse/courseEval.do",
        data: 'method=currentEvalItem&id=' + id,
        type: "POST",
        success: function(res) {
          if (quick_eval_mode_enabled == true)
            quickSubmitEval();
          else {
            $$("#evalDetail").html(res);
            $$("#sub").after("<br><br><br>");
          }
        },
        error: function(res) {
          console.log("ERROR: " + res);
        }
      });
    };

    window.toggleAutoEval = function() {
      if (quick_eval_mode_enabled == true) {
        quick_eval_mode_enabled = false;
        $$("#toggle_auto_eval_button").html("开启自动评价");
      } else {
        quick_eval_mode_enabled = true;
        $$("#toggle_auto_eval_button").html("停用自动评价");
      }
    };
  } else if (pjw_mode == "all_course_list") {
    // if ($$("#termList > option:eq(1)").html() != "2020-2021学年第二学期")
    //   $$("#termList > option:eq(1)").before('<option value="20202">*2020-2021学年第二学期</option>');

    window.list = new PJWClassList($$("body"), ["acl_major_switch", "switch", "hours", "frozen"]);
    total_weeks_history = {
      "20202": 16,
      "20201": 17,
      "20192": 17,
      "20191": 17,
      "20182": 16,
      "20181": 17,
      "20172": 16,
      "20171": 18
    };

    list.parse = function(data) {
      return new Promise((resolve, reject) => {
        try {
          $$("body").append("<div id='ghost-div' style='display:none;'>" + data + "</div>");
          var table = $$("#ghost-div").find("table.TABLE_BODY > tbody");
          table.find("tr:gt(0)").each((index, val) => {
            var td = (i) => ($$(val).children(`td:eq(${i})`));
            var res = this.parseClassTime(td(8).html());
            data = {
              title: td(1).html(),
              teachers: this.parseTeacherNames(td(7).html()),
              course_number: this.parseClassNumber(td(0)),
              info: [{
                key: "课程编号",
                val: this.parseClassNumber(td(0))
              }, {
                key: "开课院系",
                val: td(3).html()
              }, {
                key: "课程性质",
                val: td(2).html()
              }, {
                key: "校区",
                val: td(6).html(),
                hidden: true
              }],
              num_info: [{
                num: parseInt(td(4).html()),
                label: "学分"
              }, {
                num: parseInt(td(5).html()),
                label: "学时"
              }],
              lesson_time: res.lesson_time,
              time_detail: td(8).html(),
              places: res.places,
              class_weeknum: res.class_weeknum,
              select_button: {
                status: false
              },
              comment_button: {
                status: true,
                // text: (Math.random() * 10).toFixed(1)
              }
            };
            list.add(data);
          });
          list.update();
          $$("#ghost-div").remove();
          resolve();
        } catch(e) {
          reject(e);
        }
      });
    }

    list.load = function() {
      return new Promise((resolve, reject) => {
        var sel = this.selectors;
        var major_code;
        if (sel.institution.obj.selectedIndex == 0)
          major_code = "";
        else
          major_code = sel.major.val();
        $$.ajax({
          type: "GET",
          url: "/jiaowu/student/teachinginfo/allCourseList.do",
          data: {
            method: "getCourseList",
            curTerm: sel.term.val(),
            curGrade: sel.grade.val(),
            curSpeciality: major_code
          }
        }).done((data) => {
          this.setTotalWeeks(total_weeks_history[sel.term.val()] || 18);
          this.parse(data);
          resolve();
        }).fail((data) => {
          reject(data);
        });
      });
    }

    $$("#academySelect > option:eq(0)").html("全部院系");
    $$("#academySelect > option:eq(0)").val("00");
    $$("#academySelect > option:eq(29)").after(`<option value="30">人工智能学院</option>`);
    academySelectgroup.splice(30, 0, [$$(`<option value="301">计算机科学与技术（人工智能方向）</option>`)[0], $$(`<option value="302">人工智能</option>`)[0]]);

    list.selectors = {
      term: new PJWSelect("termList", "学期", list.heading.children(".pjw-classlist-selectors")),
      grade: new PJWSelect("gradeList", "年级", list.heading.children(".pjw-classlist-selectors")),
      institution: new PJWSelect("academySelect", "院系", list.heading.children(".pjw-classlist-selectors"), 0),
      major: new PJWSelect("specialitySelect", "专业", list.heading.children(".pjw-classlist-selectors"))
    };

    $$("table").remove();

    window.reloadMajor = function(e) {
      list.selectors.major.clear();  
      for (var item of academySelectgroup[parseInt(list.selectors.institution.obj.selectedIndex)]) {
        if (item.value != "")
          list.selectors.major.addItem(item);
      }
    };

    // 自动获取年级及专业
    function autofillInfo() {
      var stu_info = store.get("stu_info");
      var stu_grade = stu_info.grade, stu_dept = stu_info.department, stu_major = stu_info.major;
      var sel = list.selectors;
      sel.grade.setByText(stu_grade);
      sel.institution.setByText("全部课程");
      list.selectors.major.dom.hide();
      // sel.institution.setByText(stu_dept);
      reloadMajor();
      // sel.major.setByText(stu_major);
      list.refresh();
      fillCompleted();
      $$("#acl-major-switch-label").html(`${stu_dept} > ${stu_major}`);
      $$("#acl-major-switch-button").on("click", null, {
        dept: stu_dept,
        major: stu_major
      }, (e) => {
        sel.institution.setByText(e.data.dept);
        sel.major.setByText(e.data.major);
        list.refresh(true);
      }).css("display", "inline-block");
    }

    function fillCompleted() {
      list.selectors.term.onchange( (e) => { list.refresh(true); } );
      list.selectors.grade.onchange( (e) => { list.refresh(true); } );
      list.selectors.major.onchange( (e) => { 
        if (e.detail.index == -1) return;
        list.refresh(true);
      } );
      list.selectors.institution.onchange( (e) => {
        if (list.selectors.institution.obj.selectedIndex == 0) {
          list.selectors.major.dom.hide();
          list.clear();
          list.refresh(true);
          return;
        } else {
          list.selectors.major.dom.show();
          reloadMajor();
          list.selectors.major.obj.selectedIndex = 0;
        }
      });
    }

    if (store.get("stu_info") != null && Date.now() - store.get("stu_info").last_update < 3 * 24 * 3600 * 1000) {
      autofillInfo();
    } else {
      $$.ajax({
        url: "/jiaowu/student/studentinfo/studentinfo.do?method=searchAllList",
        type: "POST"
      }).done(function(res) {
        window.aux_data = $$(res);
        var stu_grade = aux_data.find("div#d11 > form > table > tbody > tr:eq(4) > td:eq(3)").html();
        var stu_dept = aux_data.find("div#d11 > form > table > tbody > tr:eq(3) > td:eq(1)").html();
        var stu_major = aux_data.find("div#d11 > form > table > tbody > tr:eq(3) > td:eq(3)").html();
        store.set("stu_info", {grade: stu_grade, department: stu_dept, major: stu_major, last_update: Date.now()});
        autofillInfo();
      }).fail(() => {
        reloadMajor();
        fillCompleted();
      });
    }
  } else if (pjw_mode == "gym") {
    window.list = new PJWClassList($$("body"));
    window.initClassList = () => {};
    $$("#courseList").hide();
    $$("#comment").appendTo("body");

    list.select = function(classID, class_data) {
      return new Promise((resolve, reject) => {
        var deselect = class_data.select_button.status == "Deselect";
        var target = this;
        $$.ajax({
          url: "/jiaowu/student/elective/selectCourse.do",
          data: {
            method: (deselect ? "delGymSelect" : "addGymSelect"),
            classId: classID
          },
          type: "POST"
        }).done(function(res) {
          if ($$(res).is("#successMsg")) {
            target.console.success(`${deselect ? "退选" : "选择"}${class_data.title}（${class_data.teachers.join("，")}）：${$$(res).attr("title")}`);
            resolve(res);
          } else if ($$(res).is("#errMsg")) {
            target.console.warn(`${deselect ? "退选" : "选择"}${class_data.title}（${class_data.teachers.join("，")}）：${$$(res).attr("title")}`);
            reject(res);
          } else {
            target.console.success(`${deselect ? "退选" : "选择"}${class_data.title}（${class_data.teachers.join("，")}）：${$$(res).attr("title") || res}`);
            resolve(res);
          }
        }).fail((res) => {
          target.console.error(`${deselect ? "退选" : "选择"}失败：${res}`);
          reject(res);
        });
      });
    }

    list.parse = function(data) {
      return new Promise((resolve, reject) => {
        try {
          if ($$("#comment").html().includes("现在是体育课补选阶段")) {
            this.stage = "supp";
          } else {
            this.stage = "pre";
          }
          var rows = $$(data).find("tbody").find("tr");
          rows.each((index, val) => {
            var td = (i) => ($$(val).children(`td:eq(${i})`));

            // Prepare lesson time
            var res = this.parseClassTime(td(1).html());

            // Prepare select button
            var classID = this.getClassID(td(5));
            var select_status = "";
            if (classID == false) {
              select_status = "Selected";
            } else {
              if (this.stage == "supp") {
                if (parseInt(td(3).html()) == parseInt(td(4).html()))
                  select_status = "Full";
                else
                  select_status = "Select";
              } else {
                select_status = (td(5).children("a").html() == "选择" ? "Select" : "Deselect");
              }
            }

            // Construct class data
            data = {
              classID: classID,
              title: td(0).html(),
              teachers: this.parseTeacherNames(td(2).html()),
              info: [],
              num_info: [{
                num: res.lesson_time[0].start + '-' + res.lesson_time[0].end,
                label: "节"
              }],
              lesson_time: res.lesson_time,
              time_detail: td(1).html(),
              places: res.places,
              select_button: {
                status: select_status,
                text: `${parseInt(td(3).html())}/${parseInt(td(4).html())}`,
                action: (e) => {
                  return new Promise((resolve, reject) => {
                    e.data.target.list.select(classID, e.data.target.data).then(() => {
                      resolve();
                    }).catch((res) => {
                      reject(res);
                    });
                  });
                }
              },
              comment_button: {
                status: true,
                // text: (Math.random() * 10).toFixed(1)
              }
            };

            this.add(data);
          });

          // Render DOM
          this.update();
          resolve();
        } catch (e) {
          reject(e);
        }
      });
    }

    list.load = function() {
      return new Promise((resolve, reject) => {
        $$.ajax({
          type: "POST",
          url: "/jiaowu/student/elective/courseList.do",
          data: {
            method: "gymCourseList"
          }
        }).done((data) => {
          this.parse(data);
          resolve();
        }).fail((data) => {
          reject("无法获取数据：" + data);
        });
      });
    }

    list.refresh();
  } else if (pjw_mode == "read") {
    window.list = new PJWClassList($$("body"));
    window.initClassList = () => {};
    $$("#courseList").hide();
    $$("#comment").appendTo("body");

    list.select = function(classID, class_data) {
      return new Promise((resolve, reject) => {
        var target = this;
        $$.ajax({
          url: "/jiaowu/student/elective/courseList.do",
          data: {
            method: "readRenewCourseSelect",
            classid: classID
          },
          type: "POST"
        }).done(function(res) {
          if ($$(res).is("#successMsg")) {
            if ($$(res).attr("title").includes("成功"))
              target.console.success(`选择${class_data.title}（${class_data.teachers.join("，")}）：${$$(res).attr("title")}`);
            else
              target.console.warn(`选择${class_data.title}（${class_data.teachers.join("，")}）：${$$(res).attr("title")}`);
            resolve(res);
          } else if ($$(res).is("#errMsg")) {
            target.console.warn(`选择${class_data.title}（${class_data.teachers.join("，")}）：${$$(res).attr("title")}`);
            reject(res);
          }
        }).fail((res) => {
          target.console.error(`选择失败：${res}`);
          reject(res);
        });
      });
    }

    list.parse = function(data) {
      return new Promise((resolve, reject) => {
        try {
          var rows = $$(data).find("tbody").find("tr");
          rows.each((index, val) => {
            var td = (i) => ($$(val).children(`td:eq(${i})`));

            // Prepare select button
            var classID = this.getClassNameFromFuncStr(td(6).attr("onclick"));
            var select_status = "Full";
            if (td(6).children("a").html() == "选择") select_status = "Select";
            else if (td(6).children("a").html() == "已选") select_status = "Selected";

            // Construct class data
            data = {
              classID: classID,
              title: td(1).html(),
              teachers: this.parseTeacherNames(td(2).html()),
              course_number: td(0).html(),
              info: [{
                key: "类别",
                val: td(3).html()
              }, {
                key: "课程编号",
                val: td(0).html(),
                hidden: true
              }],
              num_info: [{
                num: '' + parseInt(td(5).html()) + '/' + parseInt(td(4).html()),
                label: "已选/限额"
              }],
              select_button: {
                status: select_status,
                text: `${parseInt(td(5).html())}/${parseInt(td(4).html())}`,
                action: (e) => {
                  return new Promise((resolve, reject) => {
                    e.data.target.list.select(classID, e.data.target.data).then(() => {
                      resolve();
                    }).catch((res) => {
                      reject(res);
                    });
                  });
                }
              },
              comment_button: {
                status: true,
                // text: (Math.random() * 10).toFixed(1)
              }
            };

            this.add(data);
          });

          // Render DOM
          this.update();
          resolve();
        } catch (e) {
          reject(e);
        }
      });
    }

    list.load = function() {
      return new Promise((resolve, reject) => {
        $$.ajax({
          type: "POST",
          url: "/jiaowu/student/elective/courseList.do",
          data: {
            method: "readRenewCourseList",
            type: this.selectors.type.val()
          }
        }).done((data) => {
          this.parse(data);
          resolve();
        }).fail((data) => {
          reject("无法获取数据：" + data);
        });
      });
    }

    $$.ajax({
      type: "POST",
      url: "/jiaowu/student/elective/courseList.do",
      data: {
        method: "readRenewCourseList",
        type: 7
      }
    }).done((data) => {
      list.selectors = {
        type: new PJWSelect($$(data).filter("#readRenewType"), "书目类别", list.heading.children(".pjw-classlist-selectors"), 0, 6)
      };
      list.selectors.type.onchange( (e) => {
        list.refresh(true);
      } );
      list.refresh();
    });
  } else if (pjw_mode == "read_view") {
    window.list = new PJWClassList($$("body"));
    window.initClassList = () => {};
    $$("#courseList").hide();
    $$("#comment").appendTo("body");

    list.select = function(classID, class_data) {
      return new Promise((resolve, reject) => {
        var deselect = class_data.select_button.status == "Deselect";
        var target = this;
        $$.ajax({
          url: "/jiaowu/student/elective/selectCourse.do",
          data: {
            method: (deselect ? "readCourseDelete" : "readCourseSelect"),
            classid: classID
          },
          type: "POST"
        }).done(function(res) {
          if ($$(res).is("#successMsg")) {
            target.console.success(`${deselect ? "退选" : "选择"}${class_data.title}（${class_data.teachers.join("，")}）：${$$(res).attr("title")}`);
            resolve(res);
          } else if ($$(res).is("#errMsg")) {
            target.console.warn(`${deselect ? "退选" : "选择"}${class_data.title}（${class_data.teachers.join("，")}）：${$$(res).attr("title")}`);
            reject(res);
          }
        }).fail((res) => {
          target.console.error(`${deselect ? "退选" : "选择"}失败：${res}`);
          reject(res);
        });
      });
    }

    list.parse = function(data) {
      return new Promise((resolve, reject) => {
        try {
          var rows = $$(data).find("tbody").find("tr");
          rows.each((index, val) => {
            var td = (i) => ($$(val).children(`td:eq(${i})`));

            // Prepare select button
            var classID = this.getClassNameFromFuncStr(td(6).attr("onclick"));
            var select_status = (td(6).children("a").html() == "选择" ? "Select" : "Deselect");

            // Construct class data
            data = {
              classID: classID,
              title: td(1).html(),
              teachers: this.parseTeacherNames(td(2).html()),
              info: [{
                key: "类别",
                val: td(3).html()
              }, {
                key: "课程编号",
                val: td(0).html(),
                hidden: true
              }],
              num_info: [{
                num: '' + parseInt(td(5).html()) + '/' + parseInt(td(4).html()),
                label: "已选/限额"
              }],
              select_button: {
                status: select_status,
                text: `${parseInt(td(5).html())}/${parseInt(td(4).html())}`,
                action: (e) => {
                  return new Promise((resolve, reject) => {
                    e.data.target.list.select(classID, e.data.target.data).then(() => {
                      resolve();
                    }).catch((res) => {
                      reject(res);
                    });
                  });
                }
              },
              comment_button: {
                status: true,
                // text: (Math.random() * 10).toFixed(1)
              }
            };

            this.add(data);
          });

          // Render DOM
          this.update();
          resolve();
        } catch (e) {
          reject(e);
        }
      });
    }

    list.load = function() {
      return new Promise((resolve, reject) => {
        $$.ajax({
          type: "POST",
          url: "/jiaowu/student/elective/courseList.do",
          data: {
            method: "readCourseList",
            type: this.selectors.type.val()
          }
        }).done((data) => {
          this.parse(data);
          resolve();
        }).fail((data) => {
          reject("无法获取数据：" + data);
        });
      });
    }

    $$.ajax({
      type: "POST",
      url: "/jiaowu/student/elective/courseList.do",
      data: {
        method: "readCourseList",
        type: 7
      }
    }).done((data) => {
      list.selectors = {
        type: new PJWSelect($$(data).filter("#readType"), "书目类别", list.heading.children(".pjw-classlist-selectors"), 0, 6)
      };
      list.selectors.type.onchange( (e) => {
        list.refresh(true);
      } );
      list.refresh();
    });
  } else if (pjw_mode == "common") {
    window.list = new PJWClassList($$("body"));

    window.selectedClass = function(classID, class_kind) {
      return class_kind;
    };

    list.select = function(classID, class_kind, class_data) {
      return new Promise((resolve, reject) => {
        var target = this;
        $$.ajax({
          url: "/jiaowu/student/elective/courseList.do?method=submitCommonRenew&classId=" + classID + "&courseKind=" + class_kind,
          type: "GET"
        }).done(function(res) {
          res = res.slice(res.search("function initSelectedList()"));
          if (/\{\s*\}/.test(res) == true) {
            res = "没有应答信息。";
          } else {
            var start = res.search(/\"*\"/);
            var end = res.search(/\"\)/);
            res = res.slice(start + 1, end);
          }
          if (res.search("成功！") != -1) {
            target.console.success(`选择${target.getClassInfoForAlert(class_data)}：${res}`);
            resolve();
          } else {
            target.console.warn(`选择${target.getClassInfoForAlert(class_data)}：${res}`);
            reject();
          }
        }).fail((res) => {
          target.console.error(`请求失败：${res}`);
          reject(res);
        });
      });
    }

    list.parse = function(data) {
      return new Promise((resolve, reject) => {
        try {
          var table = $$(data).find("table > tbody");
          table.find("tr").each((index, val) => {
            var td = (i) => ($$(val).children(`td:eq(${i})`));
            var res = this.parseClassTime(td(4).html());
            var classID = this.getClassID(td(0)), 
                class_kind = "13";
            if (td(9).html() != "") {
              select_status = "Select";
              var class_kind = Function(td(9).children("a").attr("href").replace("javascript:", "return "))()[1];
            } else {
              select_status = "Full";
            }
            
            data = {
              classID: classID,
              title: td(2).html(),
              teachers: this.parseTeacherNames(td(5).html()),
              info: [{
                key: "课程编号",
                val: this.parseClassNumber(td(0))
              }, {
                key: "备注",
                val: td(8).html(),
                hidden: true
              }],
              num_info: [{
                num: parseInt(td(3).html()),
                label: "学分"
              }],
              lesson_time: res.lesson_time,
              time_detail: td(4).html(),
              places: res.places,
              class_weeknum: res.class_weeknum,
              select_button: {
                status: select_status,
                text: `${td(7).html()}/${td(6).html()}`,
                action: (e) => {
                  return new Promise((resolve, reject) => {
                    e.data.target.list.select(classID, class_kind, e.data.target.data).then(() => {
                      resolve();
                    }).catch((res) => {
                      reject(res);
                    });
                  });
                }
              },
              comment_button: {
                status: true,
                // text: (Math.random() * 10).toFixed(1)
              }
            };
            list.add(data);
          });
          list.update();
          resolve();
        } catch(e) {
          reject(e);
        }
      });
    }

    list.load = function() {
      return new Promise((resolve, reject) => {
        $$.ajax({
          type: "GET",
          url: "/jiaowu/student/elective/courseList.do",
          data: {
            method: "commonCourseRenewList",
            courseKind: this.selectors.class_kind.val()
          }
        }).done((data) => {
          this.parse(data);
          resolve();
        }).fail((data) => {
          reject("无法获取数据：" + data);
        });
      });
    }

    list.selectors = {
      class_kind: new PJWSelect("courseKindList", "课程类型", list.heading.children(".pjw-classlist-selectors"))
    };
    list.selectors.class_kind.onchange( (e) => {
      list.refresh(true);
    } );
    list.refresh();

    $$("table#tbCourseList").remove();
    $$("#courseKindList").parent().remove();
  } else if (pjw_mode == "dis" || pjw_mode == "public") {
    window.list = new PJWClassList($$("body"));

    // Optimize class list
    (function() {
      $$("input[type='radio']").css("display", "none");
      $$("input[type='button']").css("display", "none");
      $$("input[type='radio']").each(function() {
        $$(this).after("<a onclick='selectClass(" + $$(this).attr("value") + ");'>选择</a>")
      });
    })();

    list.select = function(classID, class_data) {
      return new Promise((resolve, reject) => {
        var campus = this.selectors.campus.val();
        var target = this;
        $$.ajax({
          url: "/jiaowu/student/elective/courseList.do?method=submit" + (pjw_mode == "dis" ? "Discuss" : "Public") + "Renew&classId=" + classID + "&campus=" + campus,
          type: "GET"
        }).done(function(res) {
          res = res.slice(res.search("function initSelectedList()"));
          if (/\{\s*\}/.test(res) == true) {
            res = "没有应答信息。";
          } else {
            var start = res.search(/\"*\"/);
            var end = res.search(/\"\)/);
            res = res.slice(start + 1, end);
          }
          if (res.search("成功！") != -1) {
            target.console.success(`选择${target.getClassInfoForAlert(class_data)}：${res}`);
            resolve();
          } else {
            target.console.warn(`选择${target.getClassInfoForAlert(class_data)}：${res}`);
            reject();
          }
        }).fail((res) => {
          target.console.error(`请求失败：${res}`);
          reject(res);
        });
      });
    }

    list.parse = function(data) {
      return new Promise((resolve, reject) => {
        try {
          var table = $$(data).find("table#tbCourseList");
          table.find("tbody").each((index, val) => {
            if ($$(val).css("display") == "none") return;

            $$(val).find("tr").each((index, val) => {
              var td = (i) => ($$(val).children(`td:eq(${i})`));
              var res = this.parseClassTime(td(4).html());
              if (td(9).html() != "") select_status = "Select";
              else select_status = "Full";

              var classID = this.getClassID(td(0));
              if (classID === false) td(9).children("input").val();

              data = {
                classID: classID,
                title: td(2).html(),
                teachers: this.parseTeacherNames(td(5).html()),
                info: [{
                  key: "课程编号",
                  val: this.parseClassNumber(td(0)),
                  hidden: false
                }, {
                  key: "备注",
                  val: td(8).html(),
                  hidden: true
                }],
                num_info: [{
                  num: parseInt(td(3).html()),
                  label: "学分"
                }],
                lesson_time: res.lesson_time,
                time_detail: td(4).html(),
                places: res.places,
                class_weeknum: res.class_weeknum,
                select_button: {
                  status: select_status,
                  text: `${td(7).html()}/${td(6).html()}`,
                  action: (e) => {
                    return new Promise((resolve, reject) => {
                      e.data.target.list.select(classID, e.data.target.data).then(() => {
                        resolve();
                      }).catch((res) => {
                        reject(res);
                      });
                    });
                  }
                },
                comment_button: {
                  status: true,
                  // text: (Math.random() * 10).toFixed(1)
                }
              };
              this.add(data);
            });
          });
          this.update();
          resolve();
        } catch(e) {
          reject(e);
        }
      });
    }

    list.load = function() {
      return new Promise((resolve, reject) => {
        $$.ajax({
          type: "GET",
          url: window.location.pathname,
          data: {
            method: (pjw_mode == "dis" ? "discuss" : "public") + "RenewCourseList",
            campus: this.selectors.campus.val()
          }
        }).done((data) => {
          this.parse(data);
          resolve();
        }).fail((data) => {
          reject("无法获取数据：" + data);
        });
      });
    }

    list.selectors = {
      campus: new PJWSelect("campusList", "校区", list.heading.children(".pjw-classlist-selectors"))
    };
    list.selectors.campus.onchange( (e) => {
      list.refresh(true);
    } );
    list.refresh();

    $$("#campusList").parent().remove();
    $$("table#tbCourseList").remove();
    $$("body > div[align=center]").children("p").remove();
  } else if (pjw_mode == "dis_view" || pjw_mode == "public_view") {
    window.list = new PJWClassList($$("body"));
    collapseSidebarIntoFilter();
    window.initList = () => {};
    window.exitElective = function(classId) {
      for(var i = 0; i < $('tbCourseListEx').rows.length; i++){
        if($('tbCourseListEx').rows[i].id == "trClass" + classId){
          $('tbCourseListEx').deleteRow($('tbCourseListEx').rows[i].rowIndex);
        }
      }
      g_selectedLeft++;
      var classIdList = $('classIdList').innerHTML;
      var arrClassId = classIdList.split(",");
      var arrTempClassId = new Array();
      var j = 0;
      for(var i = 0; i < arrClassId.length; i++){
        if(arrClassId[i] != classId){
          arrTempClassId[j] = arrClassId[i];
          j++;
        }
      }
      
      $('classIdList').innerHTML = arrTempClassId.join(",");
      list.console.log("这门课程已经从列表中移除，请在修改完成后按“提交”按钮保存。");
    }

    list.select = function(classID, class_data) {
      var bIsExist = false;
      var classIdList = $('classIdList').innerHTML;
      var arrClassId = classIdList.split(",");
      for(var i = 0; i < arrClassId.length; i++){
        if (arrClassId[i] == classID) {
          bIsExist = true;
          break;
        }
      }
      if (bIsExist) {
        this.console.log("这门课程已经在已选列表中了。");
        return;
      }

      var newRow = $('tbCourseListEx').insertRow(-1);
      newRow.id = "trClass" + classID;
      var mynewcell = newRow.insertCell(-1);
      mynewcell.innerHTML = class_data.class_name_for_list;
      mynewcell = newRow.insertCell(-1);
      mynewcell.innerHTML = "<a href='javascript:upClick(" + classID + ")'>上移</a>";
      mynewcell = newRow.insertCell(-1);
      mynewcell.innerHTML = "<a href='javascript:exitElective(" + classID + ")'>退选</a>";
      
      $('classIdList').innerHTML = $('classIdList').innerHTML + "," + classID;
      
      g_selectedLeft--;

      this.console.log(`${this.getClassInfoForAlert(class_data)} 已添加到已选列表，请在选择完成后按“提交”按钮保存。` + (g_selectedLeft <= 0 ? `选课数量已经达到初选阶段上限（${g_totalSelected}门），但似乎仍可继续添加，超出上限的课可能不会被抽中。` : ""));
    }

    list.parse = function(data) {
      return new Promise((resolve, reject) => {
        try {
          var table = $$(data).filter("table#tbCourseList");
          var campus_id = this.getCampusID(this.selectors.campus.val());
          table.find(`tbody#tb_campus${campus_id}`).each((index, val) => {
            $$(val).find("tr").each((index, val) => {
              var td = (i) => ($$(val).children(`td:eq(${i})`));
              var res = this.parseClassTime(td(4).html());
              if (td(9).html() != "") select_status = "Select";
              else select_status = "Full";

              var class_name_for_list = this.getClassNameFromFuncStr(td(9));
              var classID = this.getClassID(td(0));
              if (classID === false) td(9).children("input").val();

              data = {
                classID: classID,
                class_name_for_list: class_name_for_list,
                title: td(2).html(),
                teachers: this.parseTeacherNames(td(5).html()),
                info: [{
                  key: "课程编号",
                  val: this.parseClassNumber(td(0)),
                  hidden: false
                }],
                num_info: [{
                  num: parseInt(td(3).html()),
                  label: "学分"
                }, {
                  num: '' + parseInt(td(8).html()) + '/' + parseInt(td(7).html()),
                  label: "已选/限额"
                }],
                lesson_time: res.lesson_time,
                time_detail: td(4).html(),
                places: res.places,
                class_weeknum: res.class_weeknum,
                select_button: {
                  status: select_status,
                  text: `${td(8).html()}/${td(7).html()}`,
                  action: (e) => {
                    return new Promise((resolve, reject) => {
                      e.data.target.list.select(classID, e.data.target.data).then(() => {
                        resolve();
                      }).catch((res) => {
                        reject(res);
                      });
                    });
                  }
                },
                comment_button: {
                  status: true,
                  // text: (Math.random() * 10).toFixed(1)
                }
              };
              this.add(data);
            });
          });
          this.update();
          resolve();
        } catch(e) {
          reject(e);
        }
      });
    }

    list.load = function() {
      return new Promise((resolve, reject) => {
        $$.ajax({
          type: "POST",
          url: "/jiaowu/student/elective/courseList.do",
          data: {
            method: pjw_mode == "dis_view" ? "discussGeneralCourse" : "publicCourseList"
          }
        }).done((data) => {
          this.parse(data);
          resolve();
        }).fail((data) => {
          reject("无法获取数据：" + data);
        });
      });
    }

    $$.ajax({
      type: "POST",
      url: "/jiaowu/student/elective/courseList.do",
      data: {
        method: pjw_mode == "dis_view" ? "discussGeneralCourse" : "publicCourseList"
      }
    }).done((data) => {
      list.selectors = {
        campus: new PJWSelect($$(data).filter("#campusList"), "校区", list.heading.children(".pjw-classlist-selectors"))
      };
      list.selectors.campus.onchange( (e) => {
        list.refresh(true);
      } );
      list.refresh();
    });
  } else if (pjw_mode == "open") {
    window.list = new PJWClassList($$("body"));

    window.showCourseDetailInfo = function(classID, courseNumber){
      window.open("/jiaowu/student/elective/courseList.do?method=getCourseInfoM&courseNumber="+courseNumber+"&classid="+classID);
    };

    window.selectedClass = function(classID, name) {
      return classID;
    };

    list.select = function(classID, class_data) {
      return new Promise((resolve, reject) => {
        var academy_ID = this.selectors.academy.val();
        var target = this;
        $$.ajax({
          url: "/jiaowu/student/elective/courseList.do?method=submitOpenRenew&classId=" + classID + "&academy=" + academy_ID,
          type: "GET"
        }).done(function(res) {
          res = res.slice(res.search("function initSelectedList()"));
          if (/\{\s*\}/.test(res) == true) {
            res = "没有应答信息。";
          } else {
            var start = res.search(/\"*\"/);
            var end = res.search(/\"\)/);
            res = res.slice(start + 1, end);
          }
          if (res.search("成功！") != -1) {
            target.console.success(`选择${target.getClassInfoForAlert(class_data)}：${res}`);
            resolve();
          } else {
            target.console.warn(`选择${target.getClassInfoForAlert(class_data)}：${res}`);
            reject();
          }
        }).fail((res) => {
          target.console.error(`请求失败：${res}`);
          reject(res);
        });
      });
    }

    list.parse = function(data) {
      return new Promise((resolve, reject) => {
        try {
          var rows = $$(data).find("table > tbody").find("tr:gt(0)");
          rows.each((index, val) => {
            var td = (i) => ($$(val).children(`td:eq(${i})`));

            // Prepare lesson time
            var res = this.parseClassTime(td(5).html());

            // Prepare select button
            var classID = this.getClassID(td(0));
            if (td(9).html() != "" && td(9).html() != "&nbsp;") {
              select_status = "Select";
              if (classID === false) classID = Function(td(9).children("a").attr("href").replace("javascript:", "return "))();
            } else {
              select_status = "Full";
            }

            // Construct class data
            data = {
              classID: classID,
              title: td(2).html(),
              teachers: this.parseTeacherNames(td(6).html()),
              info: [{
                key: "课程编号",
                val: this.parseClassNumber(td(0))
              }, {
                key: "开课年级",
                val: td(4).html()
              }, {
                key: "开课院系",
                val: this.selectors.academy.text(),
                hidden: true
              }],
              num_info: [{
                num: parseInt(td(3).html()),
                label: "学分"
              }],
              lesson_time: res.lesson_time,
              time_detail: td(5).html(),
              places: res.places,
              class_weeknum: res.class_weeknum,
              select_button: {
                status: select_status,
                text: `${td(8).html()}/${td(7).html()}`,
                action: (e) => {
                  return new Promise((resolve, reject) => {
                    e.data.target.list.select(classID, e.data.target.data).then(() => {
                      resolve();
                    }).catch((res) => {
                      reject(res);
                    }); 
                  });
                }
              },
              comment_button: {
                status: true,
                // text: (Math.random() * 10).toFixed(1)
              }
            };

            this.add(data);
          });

          // Render DOM
          this.update();
          resolve();
        } catch (e) {
          reject(e);
        }
      });
    }

    list.load = function() {
      return new Promise((resolve, reject) => {
        $$.ajax({
          type: "GET",
          url: window.location.pathname,
          data: {
            method: "openRenewCourse",
            campus: "全部校区",
            academy: this.selectors.academy.val()
          }
        }).done((data) => {
          this.parse(data);
          resolve();
        }).fail((data) => {
          reject("无法获取数据：" + data);
        });
      });
    }

    list.selectors = {
      academy: new PJWSelect("academyList", "院系", list.heading.children(".pjw-classlist-selectors"))
    };
    list.selectors.academy.onchange( (e) => {
      list.refresh(true);
    } );
    list.refresh();

    $$("#iframeTable").remove();
    $$("#myForm").remove();
    $$("#operationInfo").remove();
  } else if (pjw_mode == "open_view") {
    window.list = new PJWClassList($$("body"));
    collapseSidebarIntoFilter();
    window.initList = () => {};
    window.exitElective = function(classId) {
      for(var i = 0; i < $('tbCourseListEx').rows.length; i++){
        if($('tbCourseListEx').rows[i].id == "trClass" + classId){
          $('tbCourseListEx').deleteRow($('tbCourseListEx').rows[i].rowIndex);
        }
      }
      g_selectedLeft++;
      var classIdList = $('classIdList').innerHTML;
      var arrClassId = classIdList.split(",");
      var arrTempClassId = new Array();
      var j = 0;
      for(var i = 0; i < arrClassId.length; i++){
        if(arrClassId[i] != classId){
          arrTempClassId[j] = arrClassId[i];
          j++;
        }
      }
      
      $('classIdList').innerHTML = arrTempClassId.join(",");
      list.console.log("这门课程已经从列表中移除，请在修改完成后按“提交”按钮保存。");
    }

    list.select = function(classID, class_data) {
      var bIsExist = false;
      var classIdList = $('classIdList').innerHTML;
      var arrClassId = classIdList.split(",");
      for(var i = 0; i < arrClassId.length; i++){
        if (arrClassId[i] == classID) {
          bIsExist = true;
          break;
        }
      }
      if (bIsExist) {
        this.console.log("这门课程已经在已选列表中了。");
        return;
      }

      var newRow = $('tbCourseListEx').insertRow(-1);
      newRow.id = "trClass" + classID;
      var mynewcell = newRow.insertCell(-1);
      mynewcell.innerHTML = class_data.class_name_for_list;
      mynewcell = newRow.insertCell(-1);
      mynewcell.innerHTML = "<a href='javascript:upClick(" + classID + ")'>上移</a>";
      mynewcell = newRow.insertCell(-1);
      mynewcell.innerHTML = "<a href='javascript:exitElective(" + classID + ")'>退选</a>";
      
      $('classIdList').innerHTML = $('classIdList').innerHTML + "," + classID;
      
      g_selectedLeft--;

      this.console.log(`${this.getClassInfoForAlert(class_data)} 已添加到已选列表，请在选择完成后按“提交”按钮保存。` + (g_selectedLeft <= 0 ? `选课数量已经达到初选阶段上限（${g_totalSelected}门），但似乎仍可继续添加，超出上限的课可能不会被抽中。` : ""));
    }

    list.parse = function(data) {
      return new Promise((resolve, reject) => {
        try {
          var rows = $$(data).find("tbody").find("tr:gt(0)");
          rows.each((index, val) => {
            var td = (i) => ($$(val).children(`td:eq(${i})`));

            // Prepare lesson time
            var res = this.parseClassTime(td(5).html());

            // Prepare select button
            var classID = this.getClassID(td(0));
            var class_name_for_list = this.getClassNameFromFuncStr(td(10));
            var select_status = "Select";

            // Construct class data
            data = {
              classID: classID,
              class_name_for_list: class_name_for_list,
              title: td(2).html(),
              teachers: this.parseTeacherNames(td(6).html()),
              info: [{
                key: "开课年级",
                val: td(4).html()
              }, {
                key: "课程编号",
                val: this.parseClassNumber(td(0))
              }, {
                key: "开课院系",
                val: this.selectors.academy.text(),
                hidden: true
              }],
              num_info: [{
                num: parseInt(td(3).html()),
                label: "学分"
              }, {
                num: `<span style="font-size: 60%; color: rgba(0, 0, 0, .6);">${parseInt(td(9).html())}/ </span>${parseInt(td(8).html())}/${parseInt(td(7).html())}`,
                label: "<span style=\"font-size: 9px;\">专业意向/</span>已选/限额"
              }],
              lesson_time: res.lesson_time,
              time_detail: td(5).html(),
              places: res.places,
              class_weeknum: res.class_weeknum,
              select_button: {
                status: select_status,
                text: `${td(8).html()}/${td(7).html()}`,
                action: (e) => {
                  return new Promise((resolve, reject) => {
                    e.data.target.list.select(classID, e.data.target.data);
                    resolve();
                  });
                }
              },
              comment_button: {
                status: true,
                // text: (Math.random() * 10).toFixed(1)
              }
            };

            this.add(data);
          });

          // Render DOM
          this.update();
          resolve();
        } catch (e) {
          reject(e);
        }
      });
    }

    list.load = function() {
      return new Promise((resolve, reject) => {
        $$.ajax({
          type: "POST",
          url: "/jiaowu/student/elective/courseList.do",
          data: {
            method: "opencourse",
            campus: "全部校区",
            academy: this.selectors.academy.val()
          }
        }).done((data) => {
          this.parse(data);
          resolve();
        }).fail((data) => {
          reject("无法获取数据：" + data);
        });
      });
    }

    $$.ajax({
      type: "POST",
      url: "/jiaowu/student/elective/courseList.do",
      data: {
        method: "openCourse"
      }
    }).done((data) => {
      list.selectors = {
        academy: new PJWSelect($$(data).filter("#academyList"), "院系", list.heading.children(".pjw-classlist-selectors"))
      };
      list.selectors.academy.onchange( (e) => {
        list.refresh(true);
      } );
      list.refresh();
    });
  } else if (pjw_mode == "major_course") {
    window.hideCourseDetail = function(response){
      $('courseDetail').style.visibility = "hidden";
      if (auto_select_switch) doAutoClassSelect();
    }
    window.initClassList = function(success_func = function() {}) {
      var filtered_major = filter_settings.filter_major_text;
      var filtered_grade = filter_settings.filter_grade_text;
      if ($$("#specialityList").length > 0 && (filtered_major && filtered_grade)) {
        $$("#specialityList").val($$("#specialityList").find('option:contains("' + filtered_major + '")').val());
        $$("#gradeList").val($$("#gradeList").find('option:contains("' + filtered_grade + '")').val());
      }
      if ($$("#specialityList").length > 0) {
        specialityChange();
        return;
      }
      var pars = 'method=specialityCourseList';
      var myAjax = new Ajax.Updater(
        'courseList',
        '/jiaowu/student/elective/courseList.do',
        {
          method : 'post',
          parameters : pars,
          evalScript : true
        }
      );
    };

    window.completeSelected = function(response) {
      $('courseOperation').innerHTML = response.responseText;
      if (document.getElementById('errMsg') != null) {
        alert(document.getElementById('errMsg').title);
        return;
      }
      if (document.getElementById("tdSelected" + g_selectingCourseNumber) != null) {
        document.getElementById("tdSelected" + g_selectingCourseNumber).innerHTML = "<font color='#000000'>已选</font>";
        stopAuto();
      }
    }

    window.class_list_auto_triggered = false;
    window.showCourseDetail = function(res){
      $('courseDetail').style.visibility = "visible";
      if (class_list_auto_triggered == true && auto_select_switch == true) {
        class_list_auto_triggered = false;
        $$("div#classList > table > tbody > tr").each(function() {
          var current_teacher_name = $$(this).find("td:eq(1) > table > tbody > tr:eq(2) > td:eq(1)").html();
          if (current_teacher_name.indexOf(filter_settings.filter_teacher_name_text) < 0)
            return true;
          console.log("Class Match. Selection requested.");
          $$(this).children("td:eq(2)").children("input")[0].click();
          selectClass();
        })
      }
    }

    window.checkCourse = function(element) {
      var current_class_name = $$(element).children("td:eq(1)").html();
      if (current_class_name.indexOf(filter_settings.filter_class_name_text) < 0)
        return true;
      if ($$(element).children("td:eq(7)").html() == "已选")
        return true;
      $$(element).children("td:eq(7)")[0].click();
      class_list_auto_triggered = true;
    };

    $$(document).ready(function() {
      showFilter("grade");
      showFilter("major");
      $$("#filter_switch").css("display", "none");
    });
  } else if (pjw_mode == "login_page") {
    // Load login settings
    window.login_settings = {};
    function updateLoginSettings(write = false) {
      if (store.get("login_settings") != null) {
        login_settings = store.get("login_settings");
      }
      $$(".login_settings").each(function() {
        var t = $$(this);
        if (t.attr("id") in login_settings) {
          if (write)
            login_settings[t.attr("id")] = t.prop("checked");
          else
            t.prop("checked", login_settings[t.attr("id")]);
        } else {
          login_settings[t.attr("id")] = t.prop("checked");
        }
      });
      store.set("login_settings", login_settings);
      if (!write) return login_settings;

      if (login_settings["store_login_info"] == false)
        store.remove("login_info");
      if (login_settings["solve_captcha"] == true && $$("#ValidateCode").val().length == 0)
        fillCAPTCHA();
      return login_settings;
    }

    login_settings = updateLoginSettings();
    $$(".login_settings").on("change", function() { updateLoginSettings(true); });

    // Username & password auto-fill
    if (login_settings["store_login_info"] == true && store.get("login_info") != null) {
      var login_info = store.get("login_info");
      if ($$("#userName").val().length == 0)
        $$("#userName").val(login_info.username);
      if ($$("#password").val().length == 0)
        $$("#password").val(login_info.password);
    }
    $$("form[action=\"login.do\"]").attr("onsubmit", "");
    $$("form[action=\"login.do\"]").on("submit", function() {
      login_settings = store.get("login_settings");
      if (CheckForm()) {
        if (login_settings["store_login_info"] == true) {
          var login_info = {
            username: $$("#userName").val(),
            password: $$("#password").val()
          }
          store.set("login_info", login_info);
        }
        return true;
      } else {
        return false;
      }
    });

    // CAPTCHA auto-fill
    CAPTCHAPlugin();

    function fillCAPTCHA() {
      login_settings = store.get("login_settings");
      if (login_settings["solve_captcha"] == false) return;
      var res = solveCAPTCHA($$("#ValidateImg")[0]);
      if (res === false) {
        $$("#ValidateCode").val("Please wait...");
        RefreshValidateImg('ValidateImg');
      } else {
        $$("#ValidateCode").val(res);
      }
    }
    if ($$("#ValidateImg")[0].complete) {
      fillCAPTCHA();
    }
    $$("#ValidateImg").on("load", function() {
      fillCAPTCHA();
    });
  } else if (pjw_mode == "grade_info") {
    window.pconsole = new PJWConsole();

    window.list = new PJWMiniList();
    list.dom.prependTo($$("td[valign=top][align=left]"));
    list.dom.after(`<div class="pjw-mini-button" id="show-grade-table" onclick="$$('table.TABLE_BODY').css('display', 'table'); $$('#show-grade-table').hide();">显示成绩表格</div>`)

    initGradeList = () => {
      $$(".click-to-show").on("click", (e) => {
        e.stopPropagation();
        var target = $$(e.delegateTarget);
        target.parent().html(target.attr("data-value"));
      });

      function showGrade() {
        $$(".click-to-show").click();
      }

      $$(".pjw-minilist-heading").html(`
        <div>
          <input type="checkbox" id="hide-grade" class="grade_info_settings" checked="checked">
          <label for="hide-grade">默认隐藏成绩</label>
          <span id="show-all-grade" class="pjw-mini-button">显示全部成绩</span>
        </div>
        <div class="pjw-float--fixed" style="flex-direction: column;">
          <div>
            <span id="average-score" style="font-size: 14px; height: 24px; line-height: 24px">PotatoPlus GPA计算器</span>
          </div>
          <div>
            <span id="calc-all-grade" class="pjw-mini-button">计算全部</span>
            <span id="remove-all-grade" class="pjw-mini-button">移除全部</span>
          </div>
        </div>
      `);

      if (store.get("grade_info_settings") == null) {
        store.set("grade_info_settings", true);
      }
      if (!store.get("grade_info_settings")) {
        showGrade();
        $$("#hide-grade").prop("checked", false);
        $$("#show-all-grade").css("display", "none");
      }
      $$("#hide-grade").on("change", function() {
        store.set("grade_info_settings", $$("#hide-grade").prop("checked"));
      });
      $$("#show-all-grade").on("click", function() {
        showGrade();
      });
      $$("#calc-all-grade").on("click", function() {
        $$(".pjw-miniclass-add-to-calc").each((index, val) => {
          if ($$(val).attr("data-status") == "add")
            switchCalcStatus($$(val));
        });
        calcGPA();
      });
      $$("#remove-all-grade").on("click", function() {
        $$(".pjw-miniclass-add-to-calc").each((index, val) => {
          if ($$(val).attr("data-status") == "remove")
            switchCalcStatus($$(val));
        });
        calcGPA();
      });

      window.grade_list = [];
      $$(".pjw-miniclass").on("click", (e) => {
        if (window.getSelection().toString() != "") return;
        var target = $$(e.delegateTarget).find(".pjw-miniclass-add-to-calc");
        switchCalcStatus(target);
        calcGPA();
      });

      window.mdc.autoInit();
    };

    function switchCalcStatus(target) {
      if (target.attr("data-status") == "remove") {
        grade_list = grade_list.filter((item) => (item != target.attr("data-index")));
        target.css("background-color", "rgb(164, 199, 21)");
        target.find(".pjw-miniclass-button__label").html("添加");
        target.attr("data-status", "add");
      } else {
        grade_list.push(parseInt(target.attr("data-index")));
        target.css("background-color", "darkred");
        target.find(".pjw-miniclass-button__label").html("移除");
        target.attr("data-status", "remove");
      }
    }
    
    function calcGPA() {
      var total = 0, total_credit = 0;
      for (var item of grade_list) {
        var credit = parseInt(list.class_data[item - 1].data.num_info[0].num);
        if (!credit) credit = 0;
        total_credit += credit;
        total += parseFloat(list.class_data[item - 1].data.num_info[1].num) / 20 * credit;
      }
      if (total_credit == 0) {
        $$("#average-score").html("PotatoPlus GPA计算器");
      } else {
        $$("#average-score").html(`${grade_list.length} 门课程的平均学分绩：<span style="font-weight: bold; font-size: 18px;">${(total / total_credit).toFixed(4)}</span>`);
        pconsole.debug(`${grade_list.length} 门课程的平均学分绩：${total / total_credit}`, "calc_grade");
      }
    }

    function parseGrade(obj) {
      obj.find("table.TABLE_BODY:eq(0) > tbody > tr:gt(0)").each((index, val) => {
        var td = (i) => ($$(val).children(`td:eq(${i})`));
        
        list.add({
          title: td(2).html(),
          note: `${td(3).html()} / <span class="pjw-miniclass-course-number" onclick="window.open('${td(1).children("a").attr("href")}');">${td(1).find("u").html()}</span> / ${td(4).html()}${td(7).html().trim() ? ` / 交换成绩对应课程：${td(7).html()}` : ""}`,
          num_info: [{
            num: td(5).html(),
            label: "学分"
          }, {
            num: (td(6).children("ul").html() || td(6).html()),
            label: "总评",
            hidden: true
          }]
        });
      });
    }

    function loadGrade(id, limit = -1) {
      if (limit == 0 || id >= $$(`table:eq(0) > tbody > tr:eq(1) > td:eq(1) > div > table > tbody > tr`).length || !$$(`table:eq(0) > tbody > tr:eq(1) > td:eq(1) > div > table > tbody > tr:eq(${id}) > td > a`).length) {
        initGradeList();
        return;
      }
      $$(`table:eq(0) > tbody > tr:eq(1) > td:eq(1) > div > table > tbody > tr:eq(${id}) > td > a`).each((index, val) => {
        $$.ajax({
          url: $$(val).attr("href"),
          method: "GET"
        }).done((res) => {
          parseGrade($$(res));
          loadGrade(id + 1, limit - 1);
        });
      });
    };

    var search_params = new URLSearchParams(window.location.search);
    if (search_params.has("termCode")) {
      if (search_params.get("termCode") == "all") {
        loadGrade(2);
      } else {
        parseGrade($$("body"));
        initGradeList();
        $$("table:eq(0) > tbody > tr:eq(1) > td:eq(1) > div > table > tbody").prepend(`<div class="pjw-mini-button" onclick="window.location.href = '/jiaowu/student/studentinfo/achievementinfo.do?method=searchTermList&termCode=all';">加载所有学期成绩</div>`);
      }
    } else {
      loadGrade(2, 1);
      $$("table:eq(0) > tbody > tr:eq(1) > td:eq(1) > div > table > tbody").prepend(`<div class="pjw-mini-button" onclick="window.location.href = '/jiaowu/student/studentinfo/achievementinfo.do?method=searchTermList&termCode=all';">加载所有学期成绩</div>`);
    }
    
  } else return;

  if (pjw_mode in filter_mode_list) {
    window.select_class_button_index = {
    };

    window.class_name_index = {
      "major_course": -1
    };

    window.teacher_name_index = {
      "major_course": -1
    };

    window.class_time_index = {
    };

    if (store.get("filter_settings_" + pjw_mode) == null || store.get("filter_settings_" + pjw_mode) == "")
      window.filter_settings = {};
    else
      window.filter_settings = store.get("filter_settings_" + pjw_mode);

    $$(document).ready(function() {
      if (typeof(class_name_index[pjw_mode]) != "undefined")
        showFilter("class_name");
      if (typeof(teacher_name_index[pjw_mode]) != "undefined")
        showFilter("teacher_name");
      if (typeof(class_time_index[pjw_mode]) != "undefined")
        showFilter("time");
      if (typeof(isClassFull) != "undefined")
        showFilter("full_class");
    });
    window.showFilter = function(filter_name) {
      $$("#filter_" + filter_name).css("display", "block");
    };

    window.showFilterSettings = function() {
      $$("#potatojw_mask").css("display", "block");
      $$("#potatojw_filter_setting_frame").css("display", "block");
      $$("#is_filter_full_class").prop("checked", filter_settings.is_filter_full_class);
      $$("#potatojw_filter_setting_frame input").each(function() {
        if ($$(this).attr("id") in filter_settings)
          $$(this).val(filter_settings[$$(this).attr("id")]);
      });
    };

    window.hideFilterSettings = function() {
      $$("#potatojw_filter_setting_frame input").each(function() {
        filter_settings[$$(this).attr("id")] = $$(this).val();
      });
      filter_settings["is_filter_full_class"] = $$('#is_filter_full_class').is(":checked");
      applyFilter();
      $$("#potatojw_mask").css("display", "none");
      $$("#potatojw_filter_setting_frame").css("display", "none");
      store.set("filter_settings_" + pjw_mode, window.filter_settings);
      $$("#filter_switch").prop("checked", true);
      $$("#filter_switch").trigger("change");
    };

    window.applyFilter = function() {
      getAllClassDOM().each(function() {
        $$(this).css("display", (filterClass(this) ? "table-row" : "none"));
      });
    };

    // Register control bar event
    window.auto_refresh_interval_id = -1;
    $$("#auto_refresh").change(function() {
      $$("#auto_refresh").prop("checked") ? (function() {
        startAutoRefresh();
      } ()) : (function() {
        stopAutoRefresh();
      } ());
    });

    $$("#filter_switch").change(function() {
      applyFilter();
      $$("#auto_select").prop("disabled", false);
      $$("#auto_select").trigger("change");
    });

    window.auto_select_switch = false;
    $$("#auto_select").change(function() {
      window.auto_select_switch = $$("#auto_select").prop("checked");
    });

    window.stopAuto = function(){
      $$("#auto_refresh").prop("checked", false);
      $$("#auto_refresh").trigger("change");
      $$("#auto_select").prop("checked", false);
      $$("#auto_select").trigger("change");
    };

    window.getAllClassDOM = function() {
      return (pjw_mode == "open" ? $$("div#tbCourseList > tbody > tr:gt(0)") : $$("table#tbCourseList:eq(0) > tbody > tr"));
    };

    window.getNumberInNormalDistribution = function(mean, std_dev, lower_limit, upper_limit) {
      var res = Math.floor(mean + randomNormalDistribution() * std_dev);
      if (res >= upper_limit) return upper_limit;
      if (res >= mean) return res;
      res = mean - (mean-res) * 0.8;
      if (res < lower_limit) return lower_limit;
      return res;
    };

    window.randomNormalDistribution = function() {
      var u=0.0, v=0.0, w=0.0, c=0.0;
      do {
        u = Math.random()*2 - 1.0;
        v = Math.random()*2 - 1.0;
        w = u*u + v*v;
      } while (w == 0.0 || w >= 1.0)
      c = Math.sqrt((-2 * Math.log(w)) / w);
      return u * c;
    };

    window.auto_refresh_frequency = 1.0,
    window.auto_refresh_loss_rate = 0.1;

    // Auto-update class list
    window.startAutoRefresh = function() {
      initClassList(function() {doAutoClassSelect();});
      window.auto_refresh_loss_rate = 0.1 + getNumberInNormalDistribution(10, 10, 0, 20) / 100;
      var auto_check_times = 1;
      console.log("First time refreshed.");
      var random_interval = auto_refresh_frequency * getNumberInNormalDistribution(Math.floor(Math.random() * 600) + 1400, 800, 800, 3000);
      window.auto_refresh_interval_id = window.setInterval(function() {
        if (Math.random() < window.auto_refresh_loss_rate) return;
        window.setTimeout(function() {
          initClassList(function() {doAutoClassSelect();});
          console.log((++auto_check_times) + " times refreshed.");
        }, getNumberInNormalDistribution(random_interval * 0.3, random_interval * 0.3, 60, random_interval * 0.8));
      }, random_interval);
    };

    window.stopAutoRefresh = function() {
      window.clearInterval(window.auto_refresh_interval_id);
      window.auto_refresh_interval_id = -1;
    };

    window.frequencyUpdate = function() {
      window.auto_refresh_frequency = 1.0 / (1.0 + parseInt($$("#auto_refresh_frequency").val()) / 25);
      if (window.auto_refresh_interval_id != -1) {
        stopAutoRefresh();
        startAutoRefresh();
      }
    };

    // Select class automatically based on filter
    window.doAutoClassSelect = function() {
      if (auto_select_switch == false) return;
      getAllClassDOM().each(function() {
        if (auto_select_switch == false) return;
        if (pjw_mode == "major_course") {
          checkCourse(this); return;
        }
        if (!filterClass(this)) return;
        if (typeof(isClassFull) == "function" && !isClassFull(this)) {
          $$(this).children("td:eq(" + select_class_button_index[pjw_mode] + ")").children("a")[0].click();
          console.log("Class Selected: " + $$(this).children("td:eq(" + class_name_index[pjw_mode] + ")").html());
          stopAuto();
        }
      });
    };

    // Get the time of a given class
    // 获取课程上课时间
    window.getClassTime = function(element) {
      return $$(element).children("td:eq(" + class_time_index[pjw_mode] + ")").html();
    };

    window.time_list = new Array();
    window.updateFilterList = function() {
      time_list = [];
      $$("section#filter_time > input").css("display", "none");
      $$("section#filter_time > label").css("display", "none");
      $$("section#filter_time > br").css("display", "none");
      var date_num = 0;
      getAllClassDOM().each(function() {
        if (typeof(class_time_index[pjw_mode]) != "undefined") {
          var current_time_val = getClassTime(this);
          var str_array = current_time_val.split("<br>");
          for (var i = 0; i < str_array.length; i++) {
            if (time_list.includes(str_array[i])) return;
            time_list.push(str_array[i]);
            var filter_time_append_html = `
              <input type="checkbox" class="filter_time_checkbox" id="filter_time_checkbox_` + date_num + `" checked="checked">
              <label for="filter_time_checkbox_` + (date_num++) + `">` + str_array[i] + `</label><br>
            `;
            $$("section#filter_time").append(filter_time_append_html);
          }
        }
      });
    };
    updateFilterList();

    // Check if the given class satisfy the filter
    // 检查课程是否符合过滤器
    window.filterClass = function(element) {
      if ($$("#filter_switch").prop("checked") == false || pjw_mode == "major_course")
        return true;
      if (filter_settings.is_filter_full_class == true)
        if (typeof(isClassFull) == "function" && isClassFull(element))
          return false;
      if (typeof(class_time_index[pjw_mode]) != "undefined") {
        var current_time_val = getClassTime(element);
        var str_array = current_time_val.split("<br>");
        for (var i = 0; i < str_array.length; i++)
          if (time_list.indexOf(str_array[i]) >= 0 && $$("#filter_time_checkbox_" + time_list.indexOf(str_array[i])).prop("checked") == false)
            return false;
      }
      if (typeof(class_name_index[pjw_mode]) != "undefined") {
        var current_class_name = $$(element).children("td:eq(" + class_name_index[pjw_mode] + ")").html();
        if (current_class_name.indexOf(filter_settings.filter_class_name_text) < 0)
          return false;
      }
      if (typeof(teacher_name_index[pjw_mode]) != "undefined") {
        var current_teacher_name = $$(element).children("td:eq(" + teacher_name_index[pjw_mode] + ")").html();
        if (current_teacher_name.indexOf(filter_settings.filter_teacher_name_text) < 0)
          return false;
      }
      return true;
    };

    // Rewrite refresh function
    // 改写刷新按钮：刷新课程列表
    window.refreshCourseList = function() {
      initClassList();
    };
  }
};

var google_analytics_js = `
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-173014211-1"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'UA-173014211-1', {
    'custom_map': {'dimension1': 'version'}
  });
  gtag('event', 'version_dimension', {'version': pjw_version + " " + pjw_platform});
</script>
`;

(function() {
  if (document.readyState == "complete")
    potatojw_intl();
  else
    window.addEventListener("load", potatojw_intl);
})();