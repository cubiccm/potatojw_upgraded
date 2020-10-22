var pjw_filter = {
  /* switch module v1.0 */
  switch: {
    html: `
      <div id="pjw-switch-filter">
        <div class="pjw-switch-box">
          <div class="mdc-switch" id="pjw-switch-switch">
            <div class="mdc-switch__track"></div>
            <div class="mdc-switch__thumb-underlay">
              <div class="mdc-switch__thumb"></div>
              <input type="checkbox" id="pjw-switch-switch-input" class="mdc-switch__native-control" role="switch" aria-checked="false">
            </div>
          </div>
          <label id="pjw-switch-switch-label" for="pjw-switch-switch-input">过滤器：关闭</label>
        </div>
      </div>
    `,
    intl: (space, list) => {
      space.switch = new mdc.switchControl.MDCSwitch($$("#pjw-switch-switch")[0]);
      $$("#pjw-switch-filter").find("#pjw-switch-switch-input").on("change", null, {
        space: space,
        list: list
      }, (e) => {
        if (e.data.space.switch.checked) {
          $$("#pjw-switch-switch-label").html("过滤器：开启");
          e.data.list.filter_panel.css("filter", "saturate(3)");
        } else {
          $$("#pjw-switch-switch-label").html("过滤器：关闭");
          e.data.list.filter_panel.css("filter", "");
        }
        e.data.list.filter_enabled = !e.data.list.filter_enabled;
        e.data.list.update();
      });
    },
    check: (space, data) => {
      return 0;
    }
  },

  /* avail module v1.2 */
  avail: {
    html: `
      <div id="pjw-avail-filter">
        <heading><span class="material-icons-round">add_task</span>空余课程</heading>
        <div class="content">
          <div class="pjw-switch-box">
            <div class="mdc-switch" id="pjw-avail-switch">
              <div class="mdc-switch__track"></div>
              <div class="mdc-switch__thumb-underlay">
                <div class="mdc-switch__thumb"></div>
                <input type="checkbox" id="pjw-avail-switch-input" class="mdc-switch__native-control" role="switch" aria-checked="false">
              </div>
            </div>
            <label for="pjw-avail-switch-input">过滤不可选课程</label>
          </div>
          <div class="pjw-switch-box" id="pjw-deselect-switch-box">
            <div class="mdc-switch" id="pjw-deselect-switch">
              <div class="mdc-switch__track"></div>
              <div class="mdc-switch__thumb-underlay">
                <div class="mdc-switch__thumb"></div>
                <input type="checkbox" id="pjw-deselect-switch-input" class="mdc-switch__native-control" role="switch" aria-checked="false">
              </div>
            </div>
            <label for="pjw-deselect-switch-input">保留可退选课程</label>
          </div>
        </div>
      </div>
    `,
    intl: (space, list) => {
      space.dom = $$("#pjw-avail-filter");
      space.switch = new mdc.switchControl.MDCSwitch($$("#pjw-avail-switch")[0]);
      space.deselect_switch = new mdc.switchControl.MDCSwitch($$("#pjw-deselect-switch")[0]);

      space.switch.checked = true;
      space.status = true;

      space.dom.find("#pjw-avail-switch-input").on("change", null, {
        space: space,
        list: list
      }, (e) => {
        e.data.space.status = e.data.space.switch.checked;
        e.data.space.status ? $$("#pjw-deselect-switch-box").show() : $$("#pjw-deselect-switch-box").hide();
        e.data.list.update();
      });

      space.dom.find("#pjw-deselect-switch-input").on("change", null, {
        space: space,
        list: list
      }, (e) => {
        e.data.space.keep_deselect = e.data.space.deselect_switch.checked;
        e.data.list.update();
      });
    },
    check: (space, data) => {
      if (!space.status) return 0;
      if ("select_button" in data && data.select_button.status !== false) {
        if (data.select_button.status == "Deselect" && space.keep_deselect)
          return 0;
        else if (data.select_button.status != "Select")
          return false;
      }
      return 0;
    }
  }, 

  /* hours module v0.2 */
  hours: {
    html: `
      <div id="pjw-hours-filter">
        <heading><span class="material-icons-round">schedule</span>课程时间</heading>
        <div class="content">
          <div class="pjw-class-weekcal">
            <div class="pjw-class-weekcal-heading">
              <div class="pjw-class-weekcal-heading-day select-all">ALL</div>
              <div class="pjw-class-weekcal-heading-day">MO</div>
              <div class="pjw-class-weekcal-heading-day">TU</div>
              <div class="pjw-class-weekcal-heading-day">WE</div>
              <div class="pjw-class-weekcal-heading-day">TH</div>
              <div class="pjw-class-weekcal-heading-day">FR</div>
              <div class="pjw-class-weekcal-heading-day">SA</div>
              <div class="pjw-class-weekcal-heading-day">SU</div>
            </div>
            <div class="pjw-class-weekcal-calendar">
              <div class="pjw-class-weekcal-calendar-day select-time">
                <span>1&gt;</span><span>2&gt;</span><span>3&gt;</span><span>4&gt;</span><span>5&gt;</span><span>6&gt;</span><span>7&gt;</span><span>8&gt;</span><span>9&gt;</span><span>10&gt;</span><span>11&gt;</span><span>12&gt;</span>
              </div>
              <div class="pjw-class-weekcal-calendar-day">
                <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span><span>11</span><span>12</span>
              </div>
              <div class="pjw-class-weekcal-calendar-day">
                <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span><span>11</span><span>12</span>
              </div>
              <div class="pjw-class-weekcal-calendar-day">
                <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span><span>11</span><span>12</span>
              </div>
              <div class="pjw-class-weekcal-calendar-day">
                <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span><span>11</span><span>12</span>
              </div>
              <div class="pjw-class-weekcal-calendar-day">
                <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span><span>11</span><span>12</span>
              </div>
              <div class="pjw-class-weekcal-calendar-day">
                <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span><span>11</span><span>12</span>
              </div>
              <div class="pjw-class-weekcal-calendar-day">
                <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span><span>11</span><span>12</span>
              </div>
            </div>
          </div>
          <div id="pjw-hours-filter-control">
            <div id="clear-calendar" class="pjw-mini-button">清空</div>
            <div id="reset-calendar" class="pjw-mini-button">过滤冲突课程</div>
          </div>
        </div>
      </div>
    `,
    intl: (space, list) => {
      space.data = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      ];
      space.dom = $$("#pjw-hours-filter").find(".pjw-class-weekcal");

      // Value: 0, false
      space.setValue = function(day, lesson, val) {
        this.data[day][lesson] = val;
        var target_lesson = this.dom.find(`div.pjw-class-weekcal-calendar-day:eq(${day})`).children(`span:eq(${lesson - 1})`);
        if (val === false) target_lesson.addClass("selected");
        else target_lesson.removeClass("selected");
      };

      space.clear = function() {
        for (var i = 1; i <= 7; i++)
          for (var j = 1; j <= 12; j++)
            space.setValue(i, j, 0);
      };

      space.loadMyClass = function(include_odd_even = true) {
        return new Promise((resolve, reject) => {
          $$.ajax({
            url: "http://elite.nju.edu.cn/jiaowu/student/teachinginfo/courseList.do",
            data: {
              method: "currentTermCourse"
            },
            method: "GET"
          }).done((res) => {
            $$(res).find(".TABLE_BODY > tbody > tr:gt(0)").each((index, val) => {
              var lesson_time = list.parseClassTime($$(val).children("td:eq(4)").html()).lesson_time;
              for (var item of lesson_time) {
                if (include_odd_even || item.type == "normal") {
                  for (var i = item.start; i <= item.end; i++)
                    space.setValue(item.weekday, i, false);
                }
              }
            });
            resolve();
          }).catch((res) => {
            list.console.error("课程时间筛选器无法加载已有课程：" + res);
            reject();
          });
        });
      };

      space.loadMyClass();

      $$("#clear-calendar").on("click", null, {
        space: space,
        list: list
      }, (e) => {
        e.data.space.clear();
        e.data.list.update();
      });

      $$("#reset-calendar").on("click", null, {
        space: space,
        list: list
      }, (e) => {
        e.data.space.clear();
        e.data.space.loadMyClass().then(() => {e.data.list.update();});
      });

      space.mouse_select = false;
      space.handleMouseUp = function() {
        if (space.mouse_select == true) {
          space.mouse_select = false;
          delete space.mouse_select_start;
        }
      };

      space.dom.on("mousedown", null, {
        space: space
      }, (e) => {
        e.data.space.mouse_select = true;
      });

      space.dom.on("mouseup", null, {
        space: space
      }, (e) => {
        e.data.space.handleMouseUp();

      });

      space.dom.find("div.pjw-class-weekcal-calendar-day:gt(0)").children("span").on("mousemove", null, {
        space: space,
        list: list
      }, (e) => {
        if (!e.data.space.mouse_select) return;
        var elem = $$(e.delegateTarget);
        var day = elem.parent().index();
        var lesson = elem.index() + 1;
        var val = false;
        if (elem.hasClass("selected")) val = 0;
        if (typeof(e.data.space.mouse_select_start) == "undefined")
          e.data.space.mouse_select_start = val;
        else
          val = e.data.space.mouse_select_start;
        e.data.space.setValue(day, lesson, val);
      });

      space.dom.find("div.pjw-class-weekcal-calendar-day:gt(0)").children("span").on("mousedown", null, {
        space: space,
        list: list
      }, (e) => {
        var elem = $$(e.delegateTarget);
        var day = elem.parent().index();
        var lesson = elem.index() + 1;
        var val = false;
        if (elem.hasClass("selected")) val = 0;
        if (typeof(e.data.space.mouse_select_start) == "undefined")
          e.data.space.mouse_select_start = val;
        else
          val = e.data.space.mouse_select_start;
        e.data.space.setValue(day, lesson, val);
      });

      space.dom.find("div.pjw-class-weekcal-calendar-day:gt(0)").children("span").on("mouseup", null, {
        space: space,
        list: list
      }, (e) => {
        e.data.list.update();
      });

      space.dom.find(`div.pjw-class-weekcal-calendar-day:eq(0)`).children("span").on("click", null, {
        space: space,
        list: list
      }, (e) => {
        var elem = $$(e.delegateTarget);
        var lesson = elem.index() + 1;
        var val = 0;
        for (var i = 1; i <= 7; i++)
          if (e.data.space.data[i][lesson] !== false) {
            val = false;
            break;
          }
        for (var i = 1; i <= 7; i++)
          e.data.space.setValue(i, lesson, val);
        e.data.list.update();
      });

      space.dom.find("div.pjw-class-weekcal-heading-day:gt(0)").on("click", null, {
        space: space,
        list: list
      }, (e) => {
        var elem = $$(e.delegateTarget);
        var day = elem.index();
        var val = 0;
        for (var j = 1; j <= 12; j++)
          if (e.data.space.data[day][j] !== false) {
            val = false;
            break;
          }
        for (var j = 1; j <= 12; j++)
          e.data.space.setValue(day, j, val);
        e.data.list.update();
      });

      space.dom.find("div.pjw-class-weekcal-heading-day.select-all").on("click", null, {
        space: space,
        list: list
      }, (e) => {
        var val = 0;
        for (var i = 1; i <= 7; i++)
          for (var j = 1; j <= 12; j++)
            if (e.data.space.data[i][j] !== false) {
              val = false;
              break;
            }
        for (var i = 1; i <= 7; i++)
          for (var j = 1; j <= 12; j++)
            e.data.space.setValue(i, j, val);
        e.data.list.update();
      });

      $$("body").on("mouseup", null, {
        target: space
      }, (e) => {
        e.data.target.handleMouseUp();
      });
    }, 
    check: (space, data) => {
      if (!data.lesson_time || !data.lesson_time.length) return 0;
      var priority = 0.0;
      for (var item of data.lesson_time) {
        for (var i = item.start; i <= item.end; i++) {
          var this_priority = space.data[item.weekday][i];
          if (this_priority === false)
            return false;
          else priority += this_priority / (item.end - item.start + 1);
        }
      }
      return priority / data.lesson_time.length;
    }
  },

  /* potatoes module v0.2 */
  potatoes: {
    html: `
      <div id="pjw-potatoes-filter">
        <heading><span class="material-icons-round">flight_takeoff</span>自动选课</heading>
        <div class="content">
          <div class="pjw-switch-box">
            <div class="mdc-switch" id="pjw-potatoes-switch">
              <div class="mdc-switch__track"></div>
              <div class="mdc-switch__thumb-underlay">
                <div class="mdc-switch__thumb"></div>
                <input type="checkbox" id="pjw-potatoes-switch-input" class="mdc-switch__native-control" role="switch" aria-checked="false">
              </div>
            </div>
            <label for="pjw-potatoes-switch-input">自动选课</label>
          </div>
          <div class="pjw-switch-box">
            <div class="mdc-switch" id="pjw-potatoes-continue-on-failure">
              <div class="mdc-switch__track"></div>
              <div class="mdc-switch__thumb-underlay">
                <div class="mdc-switch__thumb"></div>
                <input type="checkbox" id="pjw-potatoes-continue-on-failure-input" class="mdc-switch__native-control" role="switch" aria-checked="false">
              </div>
            </div>
            <label for="pjw-potatoes-continue-on-failure-input">选课失败后继续</label>
          </div>
          <div class="pjw-switch-box">
            <div class="mdc-switch" id="pjw-potatoes-continue-on-success">
              <div class="mdc-switch__track"></div>
              <div class="mdc-switch__thumb-underlay">
                <div class="mdc-switch__thumb"></div>
                <input type="checkbox" id="pjw-potatoes-continue-on-success-input" class="mdc-switch__native-control" role="switch" aria-checked="false">
              </div>
            </div>
            <label for="pjw-potatoes-continue-on-success-input">选课成功后继续</label>
          </div>
          <p>Take Care & Good Luck!</p>
        </div>
      </div>
    `,
    intl: (space, list) => {
      space.dom = $$("#pjw-potatoes-filter");
      space.switch = new mdc.switchControl.MDCSwitch($$("#pjw-potatoes-switch")[0]);
      space.continue_on_success_switch = new mdc.switchControl.MDCSwitch($$("#pjw-potatoes-continue-on-success")[0]);
      space.continue_on_failure_switch = new mdc.switchControl.MDCSwitch($$("#pjw-potatoes-continue-on-failure")[0]);

      space.status = false;
      space.dom.find("#pjw-potatoes-switch-input").on("change", null, {
        target: space,
      }, (e) => {
        e.data.target.status = e.data.target.switch.checked;
      });

      space.dom.find("#pjw-potatoes-continue-on-success-input").on("change", null, {
        target: space,
      }, (e) => {
        e.data.target.continue_on_success = e.data.target.continue_on_success_switch.checked;
      });

      space.dom.find("#pjw-potatoes-continue-on-failure-input").on("change", null, {
        target: space,
      }, (e) => {
        e.data.target.continue_on_failure = e.data.target.continue_on_failure_switch.checked;
      });

      space.potatoes_queue = [];
      space.is_select_ongoing = false;
    },
    check: (space, data, class_obj) => {
      if (!space.status || space.queue_lock) return 0;
      space.potatoes_queue.push([data, class_obj]);
      return 0;
    },
    handlePotatoes: (space) => {
      if (space.potatoes_queue.length == 0 || space.is_select_ongoing == false || space.switch.checked == false) {
        space.is_select_ongoing = false;
        return;
      }
      data = space.potatoes_queue[0][0];
      class_obj = space.potatoes_queue[0][1];
      space.potatoes_queue = space.potatoes_queue.slice(1);
      if (data.select_button && data.select_button.action && data.select_button.status == "Select") {
        var e = {data: {target: class_obj}};
        data.select_button.action(e).then(() => {
          class_obj.list.console.debug("Got a success from the potatoes module!");
          if (space.continue_on_success == true)
            space.handlePotatoes(space);
          else
            space.switch.checked = space.status = is_select_ongoing = false;
        }).catch((res) => {
          class_obj.list.console.debug("Got an error from the potatoes module: " + res);
          if (space.continue_on_failure == true)
            space.handlePotatoes(space);
          else 
            space.switch.checked = space.status = is_select_ongoing = false;
        });
      } else {
        space.handlePotatoes(space);
      }
    },
    handleParseComplete: (space, list) => {
      space.is_select_ongoing = false;
      space.potatoes_queue = [];
      space.queue_lock = false;
    },
    handleRefreshComplete: (space, list) => {
      if (!space.status) return;
      space.is_select_ongoing = true;
      space.queue_lock = true;
      space.handlePotatoes(space);
    }
  },

  /* frozen module v1.1 */
  frozen: {
    html: `
      <div id="pjw-frozen-filter" style="order: 3;">
        <heading><span class="material-icons-round" id="frozen-icon" style="cursor: pointer;">ac_unit</span><span id="frozen-quotes"></span></heading>
      </div>
    `,
    intl: (space, list) => {
      $$("#frozen-icon").on("click", null, {
        space: space
      }, (e) => {
        e.data.space.target.html(e.data.space.getRandomQuotes());
      });
      space.target = $$("#frozen-quotes");
    },
    handleParseComplete: (space, list) => {
      space.target.html(space.getRandomQuotes());
    },
    getRandomQuotes: () => {
      var quotes_lib = frozen_quotes.split("\n");
      return quotes_lib[Math.floor(Math.random() * quotes_lib.length)];
    }
  }
}