// ==UserScript==
// @name         potatoplus
// @version      0.2
// @description  土豆改善工程！
// @author       Limos
// @match        *://*.nju.edu.cn/jiaowu*
// @match        *://219.219.120.46/jiaowu*
// @run-at       document-start
// @grant        none
// ==/UserScript==

function injectScript(path, module = false, defer = false) {
  var script = document.createElement('script');
  if (defer) script.setAttribute('defer', '');
  if (module) script.setAttribute('type', 'module');
  else script.setAttribute('type', 'text/javascript');
  script.src = chrome.extension.getURL(path);
  document.documentElement.appendChild(script);
}

function injectStyle(path) {
  var stylesheet = document.createElement('link');
  stylesheet.setAttribute('type', 'text/css');
  stylesheet.setAttribute('rel', 'stylesheet');
  stylesheet.setAttribute('href', chrome.extension.getURL(path));
  document.documentElement.appendChild(stylesheet);
}

function injectScriptFromString(str) {
  var script = document.createElement('script');
  script.text = str;
  document.documentElement.appendChild(script);
}

function injectStyleFromString(str) {
  var style = document.createElement('style');
  style.setAttribute('type', 'text/css');
  style.innerHTML = str;
  document.documentElement.appendChild(style);
}

(function() {
  var modes_reg = {
    major_course: /student\/elective\/specialityCourseList.do/i, // 专业选课
    gym: /gymClassList.do/i, // 体育补选
    read: /readRenewCourseList.do/i, // 经典导读读书班补选
    dis: /discussRenewCourseList/i, // 导学、研讨、通识课补选
    public: /publicRenewCourseList/i, // 公选课补选
    open: /openRenewCourse/i, // 跨专业补选
    common: /commonCourseRenewList|commonRenew.do/i, // 通修课补选

    read_view: /elective\/readCourseList.do/i, // 经典导读读书班初选
    dis_view: /elective\/freshman_discuss.do/i, // 导学、研讨、通识课初选
    open_view: /elective\/open.do/i, // 跨专业初选

    freshmen_exam: /student\/exam\/index.do/i, // 新生测试
    course_eval: /evalcourse\/courseEval.do\?method=currentEvalCourse/i, // 课程评估

    all_course_list: /teachinginfo\/allCourseList.do\?method=getTermAcademy/i, // 全校课程
    grade_info: /student\/studentinfo\/achievementinfo.do\?method=searchTermList/i, // 成绩查看

    main_page: /(\/jiaowu\/student\/index.do|\/jiaowu\/login.do)/i, // 主页
    login_page: /(\/jiaowu\/exit.do|\/jiaowu$|\/jiaowu\/$|\/jiaowu\/index.jsp)/i // 登录页
  }
  window.pjw_mode = "";
  for (const mode_name in modes_reg) {
    if (modes_reg[mode_name].test(window.location.href) == true) {
      pjw_mode = mode_name;
      break;
    }
  }


/* css/material-components-web.min.css */
injectStyleFromString(`/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/material-components/material-components-web/blob/master/LICENSE
 */
.mdc-touch-target-wrapper{display:inline}.mdc-elevation-overlay{position:absolute;border-radius:inherit;opacity:0;pointer-events:none;transition:opacity 280ms cubic-bezier(0.4, 0, 0.2, 1);background-color:#fff}.mdc-button{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:PingFang SC,Microsoft YaHei, sans-serif;font-family:var(--mdc-typography-button-font-family, var(--mdc-typography-font-family, PingFang SC, Microsoft YaHei, sans-serif));font-size:0.875rem;font-size:var(--mdc-typography-button-font-size, 0.875rem);line-height:2.25rem;line-height:var(--mdc-typography-button-line-height, 2.25rem);font-weight:500;font-weight:var(--mdc-typography-button-font-weight, 500);letter-spacing:0.0892857143em;letter-spacing:var(--mdc-typography-button-letter-spacing, 0.0892857143em);text-decoration:none;-webkit-text-decoration:var(--mdc-typography-button-text-decoration, none);text-decoration:var(--mdc-typography-button-text-decoration, none);text-transform:uppercase;text-transform:var(--mdc-typography-button-text-transform, uppercase);padding:0 8px 0 8px;position:relative;display:inline-flex;align-items:center;justify-content:center;box-sizing:border-box;min-width:64px;border:none;outline:none;line-height:inherit;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-appearance:none;overflow:visible;vertical-align:middle;border-radius:4px;border-radius:var(--mdc-shape-small, 4px);height:36px}.mdc-button .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}.mdc-button::-moz-focus-inner{padding:0;border:0}.mdc-button:active{outline:none}.mdc-button:hover{cursor:pointer}.mdc-button:disabled{cursor:default;pointer-events:none}.mdc-button .mdc-button__ripple{border-radius:4px;border-radius:var(--mdc-shape-small, 4px)}.mdc-button:not(:disabled){background-color:transparent}.mdc-button:disabled{background-color:transparent}.mdc-button .mdc-button__icon{margin-left:0;margin-right:8px;display:inline-block;width:18px;height:18px;font-size:18px;vertical-align:top}[dir=rtl] .mdc-button .mdc-button__icon,.mdc-button .mdc-button__icon[dir=rtl]{margin-left:8px;margin-right:0}.mdc-button .mdc-button__touch{position:absolute;top:50%;right:0;height:48px;left:0;-webkit-transform:translateY(-50%);transform:translateY(-50%)}.mdc-button:not(:disabled){color:#6200ee;color:var(--mdc-theme-primary, #6200ee)}.mdc-button:disabled{color:rgba(0,0,0,.38)}.mdc-button__label+.mdc-button__icon{margin-left:8px;margin-right:0}[dir=rtl] .mdc-button__label+.mdc-button__icon,.mdc-button__label+.mdc-button__icon[dir=rtl]{margin-left:0;margin-right:8px}svg.mdc-button__icon{fill:currentColor}.mdc-button--raised .mdc-button__icon,.mdc-button--unelevated .mdc-button__icon,.mdc-button--outlined .mdc-button__icon{margin-left:-4px;margin-right:8px}[dir=rtl] .mdc-button--raised .mdc-button__icon,.mdc-button--raised .mdc-button__icon[dir=rtl],[dir=rtl] .mdc-button--unelevated .mdc-button__icon,.mdc-button--unelevated .mdc-button__icon[dir=rtl],[dir=rtl] .mdc-button--outlined .mdc-button__icon,.mdc-button--outlined .mdc-button__icon[dir=rtl]{margin-left:8px;margin-right:-4px}.mdc-button--raised .mdc-button__label+.mdc-button__icon,.mdc-button--unelevated .mdc-button__label+.mdc-button__icon,.mdc-button--outlined .mdc-button__label+.mdc-button__icon{margin-left:8px;margin-right:-4px}[dir=rtl] .mdc-button--raised .mdc-button__label+.mdc-button__icon,.mdc-button--raised .mdc-button__label+.mdc-button__icon[dir=rtl],[dir=rtl] .mdc-button--unelevated .mdc-button__label+.mdc-button__icon,.mdc-button--unelevated .mdc-button__label+.mdc-button__icon[dir=rtl],[dir=rtl] .mdc-button--outlined .mdc-button__label+.mdc-button__icon,.mdc-button--outlined .mdc-button__label+.mdc-button__icon[dir=rtl]{margin-left:-4px;margin-right:8px}.mdc-button--raised,.mdc-button--unelevated{padding:0 16px 0 16px}.mdc-button--raised:not(:disabled),.mdc-button--unelevated:not(:disabled){background-color:#6200ee;background-color:var(--mdc-theme-primary, #6200ee)}.mdc-button--raised:not(:disabled),.mdc-button--unelevated:not(:disabled){color:#fff;color:var(--mdc-theme-on-primary, #fff)}.mdc-button--raised:disabled,.mdc-button--unelevated:disabled{background-color:rgba(0,0,0,.12)}.mdc-button--raised:disabled,.mdc-button--unelevated:disabled{color:rgba(0,0,0,.38)}.mdc-button--raised{box-shadow:0px 3px 1px -2px rgba(0, 0, 0, 0.2),0px 2px 2px 0px rgba(0, 0, 0, 0.14),0px 1px 5px 0px rgba(0,0,0,.12);transition:box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-button--raised:hover,.mdc-button--raised:focus{box-shadow:0px 2px 4px -1px rgba(0, 0, 0, 0.2),0px 4px 5px 0px rgba(0, 0, 0, 0.14),0px 1px 10px 0px rgba(0,0,0,.12)}.mdc-button--raised:active{box-shadow:0px 5px 5px -3px rgba(0, 0, 0, 0.2),0px 8px 10px 1px rgba(0, 0, 0, 0.14),0px 3px 14px 2px rgba(0,0,0,.12)}.mdc-button--raised:disabled{box-shadow:0px 0px 0px 0px rgba(0, 0, 0, 0.2),0px 0px 0px 0px rgba(0, 0, 0, 0.14),0px 0px 0px 0px rgba(0,0,0,.12)}.mdc-button--outlined{padding:0 15px 0 15px;border-width:1px;border-style:solid}.mdc-button--outlined .mdc-button__ripple{top:-1px;left:-1px;border:1px solid transparent}.mdc-button--outlined .mdc-button__touch{left:-1px;width:calc(100% + 2 * 1px)}.mdc-button--outlined:not(:disabled){border-color:rgba(0,0,0,.12)}.mdc-button--outlined:disabled{border-color:rgba(0,0,0,.12)}.mdc-button--touch{margin-top:6px;margin-bottom:6px}@-webkit-keyframes mdc-ripple-fg-radius-in{from{-webkit-animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1);animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1);-webkit-transform:translate(var(--mdc-ripple-fg-translate-start, 0)) scale(1);transform:translate(var(--mdc-ripple-fg-translate-start, 0)) scale(1)}to{-webkit-transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1));transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}}@keyframes mdc-ripple-fg-radius-in{from{-webkit-animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1);animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1);-webkit-transform:translate(var(--mdc-ripple-fg-translate-start, 0)) scale(1);transform:translate(var(--mdc-ripple-fg-translate-start, 0)) scale(1)}to{-webkit-transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1));transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}}@-webkit-keyframes mdc-ripple-fg-opacity-in{from{-webkit-animation-timing-function:linear;animation-timing-function:linear;opacity:0}to{opacity:var(--mdc-ripple-fg-opacity, 0)}}@keyframes mdc-ripple-fg-opacity-in{from{-webkit-animation-timing-function:linear;animation-timing-function:linear;opacity:0}to{opacity:var(--mdc-ripple-fg-opacity, 0)}}@-webkit-keyframes mdc-ripple-fg-opacity-out{from{-webkit-animation-timing-function:linear;animation-timing-function:linear;opacity:var(--mdc-ripple-fg-opacity, 0)}to{opacity:0}}@keyframes mdc-ripple-fg-opacity-out{from{-webkit-animation-timing-function:linear;animation-timing-function:linear;opacity:var(--mdc-ripple-fg-opacity, 0)}to{opacity:0}}.mdc-button{--mdc-ripple-fg-size: 0;--mdc-ripple-left: 0;--mdc-ripple-top: 0;--mdc-ripple-fg-scale: 1;--mdc-ripple-fg-translate-end: 0;--mdc-ripple-fg-translate-start: 0;-webkit-tap-highlight-color:rgba(0,0,0,0)}.mdc-button .mdc-button__ripple::before,.mdc-button .mdc-button__ripple::after{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:""}.mdc-button .mdc-button__ripple::before{transition:opacity 15ms linear,background-color 15ms linear;z-index:1}.mdc-button.mdc-ripple-upgraded .mdc-button__ripple::before{-webkit-transform:scale(var(--mdc-ripple-fg-scale, 1));transform:scale(var(--mdc-ripple-fg-scale, 1))}.mdc-button.mdc-ripple-upgraded .mdc-button__ripple::after{top:0;left:0;-webkit-transform:scale(0);transform:scale(0);-webkit-transform-origin:center center;transform-origin:center center}.mdc-button.mdc-ripple-upgraded--unbounded .mdc-button__ripple::after{top:var(--mdc-ripple-top, 0);left:var(--mdc-ripple-left, 0)}.mdc-button.mdc-ripple-upgraded--foreground-activation .mdc-button__ripple::after{-webkit-animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards;animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards}.mdc-button.mdc-ripple-upgraded--foreground-deactivation .mdc-button__ripple::after{-webkit-animation:mdc-ripple-fg-opacity-out 150ms;animation:mdc-ripple-fg-opacity-out 150ms;-webkit-transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1));transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}.mdc-button .mdc-button__ripple::before,.mdc-button .mdc-button__ripple::after{top:calc(50% - 100%);left:calc(50% - 100%);width:200%;height:200%}.mdc-button.mdc-ripple-upgraded .mdc-button__ripple::after{width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}.mdc-button .mdc-button__ripple::before,.mdc-button .mdc-button__ripple::after{background-color:#6200ee;background-color:var(--mdc-theme-primary, #6200ee)}.mdc-button:hover .mdc-button__ripple::before{opacity:.04}.mdc-button.mdc-ripple-upgraded--background-focused .mdc-button__ripple::before,.mdc-button:not(.mdc-ripple-upgraded):focus .mdc-button__ripple::before{transition-duration:75ms;opacity:.12}.mdc-button:not(.mdc-ripple-upgraded) .mdc-button__ripple::after{transition:opacity 150ms linear}.mdc-button:not(.mdc-ripple-upgraded):active .mdc-button__ripple::after{transition-duration:75ms;opacity:.12}.mdc-button.mdc-ripple-upgraded{--mdc-ripple-fg-opacity: 0.12}.mdc-button .mdc-button__ripple{position:absolute;box-sizing:content-box;width:100%;height:100%;overflow:hidden}.mdc-button:not(.mdc-button--outlined) .mdc-button__ripple{top:0;left:0}.mdc-button--raised .mdc-button__ripple::before,.mdc-button--raised .mdc-button__ripple::after,.mdc-button--unelevated .mdc-button__ripple::before,.mdc-button--unelevated .mdc-button__ripple::after{background-color:#fff;background-color:var(--mdc-theme-on-primary, #fff)}.mdc-button--raised:hover .mdc-button__ripple::before,.mdc-button--unelevated:hover .mdc-button__ripple::before{opacity:.08}.mdc-button--raised.mdc-ripple-upgraded--background-focused .mdc-button__ripple::before,.mdc-button--raised:not(.mdc-ripple-upgraded):focus .mdc-button__ripple::before,.mdc-button--unelevated.mdc-ripple-upgraded--background-focused .mdc-button__ripple::before,.mdc-button--unelevated:not(.mdc-ripple-upgraded):focus .mdc-button__ripple::before{transition-duration:75ms;opacity:.24}.mdc-button--raised:not(.mdc-ripple-upgraded) .mdc-button__ripple::after,.mdc-button--unelevated:not(.mdc-ripple-upgraded) .mdc-button__ripple::after{transition:opacity 150ms linear}.mdc-button--raised:not(.mdc-ripple-upgraded):active .mdc-button__ripple::after,.mdc-button--unelevated:not(.mdc-ripple-upgraded):active .mdc-button__ripple::after{transition-duration:75ms;opacity:.24}.mdc-button--raised.mdc-ripple-upgraded,.mdc-button--unelevated.mdc-ripple-upgraded{--mdc-ripple-fg-opacity: 0.24}.mdc-card{border-radius:4px;border-radius:var(--mdc-shape-medium, 4px);background-color:#fff;background-color:var(--mdc-theme-surface, #fff);position:relative;box-shadow:0px 2px 1px -1px rgba(0, 0, 0, 0.2),0px 1px 1px 0px rgba(0, 0, 0, 0.14),0px 1px 3px 0px rgba(0,0,0,.12);display:flex;flex-direction:column;box-sizing:border-box}.mdc-card .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}.mdc-card--outlined{box-shadow:0px 0px 0px 0px rgba(0, 0, 0, 0.2),0px 0px 0px 0px rgba(0, 0, 0, 0.14),0px 0px 0px 0px rgba(0,0,0,.12);border-width:1px;border-style:solid;border-color:#e0e0e0}.mdc-card__media{position:relative;box-sizing:border-box;background-repeat:no-repeat;background-position:center;background-size:cover}.mdc-card__media::before{display:block;content:""}.mdc-card__media:first-child{border-top-left-radius:inherit;border-top-right-radius:inherit}.mdc-card__media:last-child{border-bottom-left-radius:inherit;border-bottom-right-radius:inherit}.mdc-card__media--square::before{margin-top:100%}.mdc-card__media--16-9::before{margin-top:56.25%}.mdc-card__media-content{position:absolute;top:0;right:0;bottom:0;left:0;box-sizing:border-box}.mdc-card__primary-action{display:flex;flex-direction:column;box-sizing:border-box;position:relative;outline:none;color:inherit;text-decoration:none;cursor:pointer;overflow:hidden}.mdc-card__primary-action:first-child{border-top-left-radius:inherit;border-top-right-radius:inherit}.mdc-card__primary-action:last-child{border-bottom-left-radius:inherit;border-bottom-right-radius:inherit}.mdc-card__actions{display:flex;flex-direction:row;align-items:center;box-sizing:border-box;min-height:52px;padding:8px}.mdc-card__actions--full-bleed{padding:0}.mdc-card__action-buttons,.mdc-card__action-icons{display:flex;flex-direction:row;align-items:center;box-sizing:border-box}.mdc-card__action-icons{color:rgba(0,0,0,.6);flex-grow:1;justify-content:flex-end}.mdc-card__action-buttons+.mdc-card__action-icons{margin-left:16px;margin-right:0}[dir=rtl] .mdc-card__action-buttons+.mdc-card__action-icons,.mdc-card__action-buttons+.mdc-card__action-icons[dir=rtl]{margin-left:0;margin-right:16px}.mdc-card__action{display:inline-flex;flex-direction:row;align-items:center;box-sizing:border-box;justify-content:center;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.mdc-card__action:focus{outline:none}.mdc-card__action--button{margin-left:0;margin-right:8px;padding:0 8px}[dir=rtl] .mdc-card__action--button,.mdc-card__action--button[dir=rtl]{margin-left:8px;margin-right:0}.mdc-card__action--button:last-child{margin-left:0;margin-right:0}[dir=rtl] .mdc-card__action--button:last-child,.mdc-card__action--button:last-child[dir=rtl]{margin-left:0;margin-right:0}.mdc-card__actions--full-bleed .mdc-card__action--button{justify-content:space-between;width:100%;height:auto;max-height:none;margin:0;padding:8px 16px;text-align:left}[dir=rtl] .mdc-card__actions--full-bleed .mdc-card__action--button,.mdc-card__actions--full-bleed .mdc-card__action--button[dir=rtl]{text-align:right}.mdc-card__action--icon{margin:-6px 0;padding:12px}.mdc-card__action--icon:not(:disabled){color:rgba(0,0,0,.6)}.mdc-card__primary-action{--mdc-ripple-fg-size: 0;--mdc-ripple-left: 0;--mdc-ripple-top: 0;--mdc-ripple-fg-scale: 1;--mdc-ripple-fg-translate-end: 0;--mdc-ripple-fg-translate-start: 0;-webkit-tap-highlight-color:rgba(0,0,0,0)}.mdc-card__primary-action::before,.mdc-card__primary-action::after{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:""}.mdc-card__primary-action::before{transition:opacity 15ms linear,background-color 15ms linear;z-index:1}.mdc-card__primary-action.mdc-ripple-upgraded::before{-webkit-transform:scale(var(--mdc-ripple-fg-scale, 1));transform:scale(var(--mdc-ripple-fg-scale, 1))}.mdc-card__primary-action.mdc-ripple-upgraded::after{top:0;left:0;-webkit-transform:scale(0);transform:scale(0);-webkit-transform-origin:center center;transform-origin:center center}.mdc-card__primary-action.mdc-ripple-upgraded--unbounded::after{top:var(--mdc-ripple-top, 0);left:var(--mdc-ripple-left, 0)}.mdc-card__primary-action.mdc-ripple-upgraded--foreground-activation::after{-webkit-animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards;animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards}.mdc-card__primary-action.mdc-ripple-upgraded--foreground-deactivation::after{-webkit-animation:mdc-ripple-fg-opacity-out 150ms;animation:mdc-ripple-fg-opacity-out 150ms;-webkit-transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1));transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}.mdc-card__primary-action::before,.mdc-card__primary-action::after{top:calc(50% - 100%);left:calc(50% - 100%);width:200%;height:200%}.mdc-card__primary-action.mdc-ripple-upgraded::after{width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}.mdc-card__primary-action::before,.mdc-card__primary-action::after{background-color:#000}.mdc-card__primary-action:hover::before{opacity:.04}.mdc-card__primary-action.mdc-ripple-upgraded--background-focused::before,.mdc-card__primary-action:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:.12}.mdc-card__primary-action:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-card__primary-action:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:.12}.mdc-card__primary-action.mdc-ripple-upgraded{--mdc-ripple-fg-opacity: 0.12}@-webkit-keyframes mdc-checkbox-unchecked-checked-checkmark-path{0%,50%{stroke-dashoffset:29.7833385}50%{-webkit-animation-timing-function:cubic-bezier(0, 0, 0.2, 1);animation-timing-function:cubic-bezier(0, 0, 0.2, 1)}100%{stroke-dashoffset:0}}@keyframes mdc-checkbox-unchecked-checked-checkmark-path{0%,50%{stroke-dashoffset:29.7833385}50%{-webkit-animation-timing-function:cubic-bezier(0, 0, 0.2, 1);animation-timing-function:cubic-bezier(0, 0, 0.2, 1)}100%{stroke-dashoffset:0}}@-webkit-keyframes mdc-checkbox-unchecked-indeterminate-mixedmark{0%,68.2%{-webkit-transform:scaleX(0);transform:scaleX(0)}68.2%{-webkit-animation-timing-function:cubic-bezier(0, 0, 0, 1);animation-timing-function:cubic-bezier(0, 0, 0, 1)}100%{-webkit-transform:scaleX(1);transform:scaleX(1)}}@keyframes mdc-checkbox-unchecked-indeterminate-mixedmark{0%,68.2%{-webkit-transform:scaleX(0);transform:scaleX(0)}68.2%{-webkit-animation-timing-function:cubic-bezier(0, 0, 0, 1);animation-timing-function:cubic-bezier(0, 0, 0, 1)}100%{-webkit-transform:scaleX(1);transform:scaleX(1)}}@-webkit-keyframes mdc-checkbox-checked-unchecked-checkmark-path{from{-webkit-animation-timing-function:cubic-bezier(0.4, 0, 1, 1);animation-timing-function:cubic-bezier(0.4, 0, 1, 1);opacity:1;stroke-dashoffset:0}to{opacity:0;stroke-dashoffset:-29.7833385}}@keyframes mdc-checkbox-checked-unchecked-checkmark-path{from{-webkit-animation-timing-function:cubic-bezier(0.4, 0, 1, 1);animation-timing-function:cubic-bezier(0.4, 0, 1, 1);opacity:1;stroke-dashoffset:0}to{opacity:0;stroke-dashoffset:-29.7833385}}@-webkit-keyframes mdc-checkbox-checked-indeterminate-checkmark{from{-webkit-animation-timing-function:cubic-bezier(0, 0, 0.2, 1);animation-timing-function:cubic-bezier(0, 0, 0.2, 1);-webkit-transform:rotate(0deg);transform:rotate(0deg);opacity:1}to{-webkit-transform:rotate(45deg);transform:rotate(45deg);opacity:0}}@keyframes mdc-checkbox-checked-indeterminate-checkmark{from{-webkit-animation-timing-function:cubic-bezier(0, 0, 0.2, 1);animation-timing-function:cubic-bezier(0, 0, 0.2, 1);-webkit-transform:rotate(0deg);transform:rotate(0deg);opacity:1}to{-webkit-transform:rotate(45deg);transform:rotate(45deg);opacity:0}}@-webkit-keyframes mdc-checkbox-indeterminate-checked-checkmark{from{-webkit-animation-timing-function:cubic-bezier(0.14, 0, 0, 1);animation-timing-function:cubic-bezier(0.14, 0, 0, 1);-webkit-transform:rotate(45deg);transform:rotate(45deg);opacity:0}to{-webkit-transform:rotate(360deg);transform:rotate(360deg);opacity:1}}@keyframes mdc-checkbox-indeterminate-checked-checkmark{from{-webkit-animation-timing-function:cubic-bezier(0.14, 0, 0, 1);animation-timing-function:cubic-bezier(0.14, 0, 0, 1);-webkit-transform:rotate(45deg);transform:rotate(45deg);opacity:0}to{-webkit-transform:rotate(360deg);transform:rotate(360deg);opacity:1}}@-webkit-keyframes mdc-checkbox-checked-indeterminate-mixedmark{from{-webkit-animation-timing-function:mdc-animation-deceleration-curve-timing-function;animation-timing-function:mdc-animation-deceleration-curve-timing-function;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);opacity:0}to{-webkit-transform:rotate(0deg);transform:rotate(0deg);opacity:1}}@keyframes mdc-checkbox-checked-indeterminate-mixedmark{from{-webkit-animation-timing-function:mdc-animation-deceleration-curve-timing-function;animation-timing-function:mdc-animation-deceleration-curve-timing-function;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);opacity:0}to{-webkit-transform:rotate(0deg);transform:rotate(0deg);opacity:1}}@-webkit-keyframes mdc-checkbox-indeterminate-checked-mixedmark{from{-webkit-animation-timing-function:cubic-bezier(0.14, 0, 0, 1);animation-timing-function:cubic-bezier(0.14, 0, 0, 1);-webkit-transform:rotate(0deg);transform:rotate(0deg);opacity:1}to{-webkit-transform:rotate(315deg);transform:rotate(315deg);opacity:0}}@keyframes mdc-checkbox-indeterminate-checked-mixedmark{from{-webkit-animation-timing-function:cubic-bezier(0.14, 0, 0, 1);animation-timing-function:cubic-bezier(0.14, 0, 0, 1);-webkit-transform:rotate(0deg);transform:rotate(0deg);opacity:1}to{-webkit-transform:rotate(315deg);transform:rotate(315deg);opacity:0}}@-webkit-keyframes mdc-checkbox-indeterminate-unchecked-mixedmark{0%{-webkit-animation-timing-function:linear;animation-timing-function:linear;-webkit-transform:scaleX(1);transform:scaleX(1);opacity:1}32.8%,100%{-webkit-transform:scaleX(0);transform:scaleX(0);opacity:0}}@keyframes mdc-checkbox-indeterminate-unchecked-mixedmark{0%{-webkit-animation-timing-function:linear;animation-timing-function:linear;-webkit-transform:scaleX(1);transform:scaleX(1);opacity:1}32.8%,100%{-webkit-transform:scaleX(0);transform:scaleX(0);opacity:0}}.mdc-checkbox{display:inline-block;position:relative;flex:0 0 18px;box-sizing:content-box;width:18px;height:18px;line-height:0;white-space:nowrap;cursor:pointer;vertical-align:bottom;padding:11px}.mdc-checkbox .mdc-checkbox__native-control:checked~.mdc-checkbox__background::before,.mdc-checkbox .mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background::before,.mdc-checkbox .mdc-checkbox__native-control[data-indeterminate=true]~.mdc-checkbox__background::before{background-color:#018786;background-color:var(--mdc-theme-secondary, #018786)}.mdc-checkbox.mdc-checkbox--selected .mdc-checkbox__ripple::before,.mdc-checkbox.mdc-checkbox--selected .mdc-checkbox__ripple::after{background-color:#018786;background-color:var(--mdc-theme-secondary, #018786)}.mdc-checkbox.mdc-checkbox--selected:hover .mdc-checkbox__ripple::before{opacity:.04}.mdc-checkbox.mdc-checkbox--selected.mdc-ripple-upgraded--background-focused .mdc-checkbox__ripple::before,.mdc-checkbox.mdc-checkbox--selected:not(.mdc-ripple-upgraded):focus .mdc-checkbox__ripple::before{transition-duration:75ms;opacity:.12}.mdc-checkbox.mdc-checkbox--selected:not(.mdc-ripple-upgraded) .mdc-checkbox__ripple::after{transition:opacity 150ms linear}.mdc-checkbox.mdc-checkbox--selected:not(.mdc-ripple-upgraded):active .mdc-checkbox__ripple::after{transition-duration:75ms;opacity:.12}.mdc-checkbox.mdc-checkbox--selected.mdc-ripple-upgraded{--mdc-ripple-fg-opacity: 0.12}.mdc-checkbox.mdc-ripple-upgraded--background-focused.mdc-checkbox--selected .mdc-checkbox__ripple::before,.mdc-checkbox.mdc-ripple-upgraded--background-focused.mdc-checkbox--selected .mdc-checkbox__ripple::after{background-color:#018786;background-color:var(--mdc-theme-secondary, #018786)}.mdc-checkbox .mdc-checkbox__background{top:11px;left:11px}.mdc-checkbox .mdc-checkbox__background::before{top:-13px;left:-13px;width:40px;height:40px}.mdc-checkbox .mdc-checkbox__native-control{top:0px;right:0px;left:0px;width:40px;height:40px}.mdc-checkbox__native-control:enabled:not(:checked):not(:indeterminate):not([data-indeterminate=true])~.mdc-checkbox__background{border-color:rgba(0,0,0,.54);background-color:transparent}.mdc-checkbox__native-control:enabled:checked~.mdc-checkbox__background,.mdc-checkbox__native-control:enabled:indeterminate~.mdc-checkbox__background,.mdc-checkbox__native-control[data-indeterminate=true]:enabled~.mdc-checkbox__background{border-color:#018786;border-color:var(--mdc-theme-secondary, #018786);background-color:#018786;background-color:var(--mdc-theme-secondary, #018786)}@-webkit-keyframes mdc-checkbox-fade-in-background-8A000000secondary00000000secondary{0%{border-color:rgba(0,0,0,.54);background-color:transparent}50%{border-color:#018786;border-color:var(--mdc-theme-secondary, #018786);background-color:#018786;background-color:var(--mdc-theme-secondary, #018786)}}@keyframes mdc-checkbox-fade-in-background-8A000000secondary00000000secondary{0%{border-color:rgba(0,0,0,.54);background-color:transparent}50%{border-color:#018786;border-color:var(--mdc-theme-secondary, #018786);background-color:#018786;background-color:var(--mdc-theme-secondary, #018786)}}@-webkit-keyframes mdc-checkbox-fade-out-background-8A000000secondary00000000secondary{0%,80%{border-color:#018786;border-color:var(--mdc-theme-secondary, #018786);background-color:#018786;background-color:var(--mdc-theme-secondary, #018786)}100%{border-color:rgba(0,0,0,.54);background-color:transparent}}@keyframes mdc-checkbox-fade-out-background-8A000000secondary00000000secondary{0%,80%{border-color:#018786;border-color:var(--mdc-theme-secondary, #018786);background-color:#018786;background-color:var(--mdc-theme-secondary, #018786)}100%{border-color:rgba(0,0,0,.54);background-color:transparent}}.mdc-checkbox--anim-unchecked-checked .mdc-checkbox__native-control:enabled~.mdc-checkbox__background,.mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__native-control:enabled~.mdc-checkbox__background{-webkit-animation-name:mdc-checkbox-fade-in-background-8A000000secondary00000000secondary;animation-name:mdc-checkbox-fade-in-background-8A000000secondary00000000secondary}.mdc-checkbox--anim-checked-unchecked .mdc-checkbox__native-control:enabled~.mdc-checkbox__background,.mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__native-control:enabled~.mdc-checkbox__background{-webkit-animation-name:mdc-checkbox-fade-out-background-8A000000secondary00000000secondary;animation-name:mdc-checkbox-fade-out-background-8A000000secondary00000000secondary}.mdc-checkbox__native-control[disabled]:not(:checked):not(:indeterminate):not([data-indeterminate=true])~.mdc-checkbox__background{border-color:rgba(0,0,0,.38);background-color:transparent}.mdc-checkbox__native-control[disabled]:checked~.mdc-checkbox__background,.mdc-checkbox__native-control[disabled]:indeterminate~.mdc-checkbox__background,.mdc-checkbox__native-control[data-indeterminate=true][disabled]~.mdc-checkbox__background{border-color:transparent;background-color:rgba(0,0,0,.38)}.mdc-checkbox__native-control:enabled~.mdc-checkbox__background .mdc-checkbox__checkmark{color:#fff}.mdc-checkbox__native-control:enabled~.mdc-checkbox__background .mdc-checkbox__mixedmark{border-color:#fff}.mdc-checkbox__native-control:disabled~.mdc-checkbox__background .mdc-checkbox__checkmark{color:#fff}.mdc-checkbox__native-control:disabled~.mdc-checkbox__background .mdc-checkbox__mixedmark{border-color:#fff}@media screen and (-ms-high-contrast: active){.mdc-checkbox__native-control[disabled]:not(:checked):not(:indeterminate):not([data-indeterminate=true])~.mdc-checkbox__background{border-color:GrayText;background-color:transparent}.mdc-checkbox__native-control[disabled]:checked~.mdc-checkbox__background,.mdc-checkbox__native-control[disabled]:indeterminate~.mdc-checkbox__background,.mdc-checkbox__native-control[data-indeterminate=true][disabled]~.mdc-checkbox__background{border-color:GrayText;background-color:transparent}.mdc-checkbox__native-control:disabled~.mdc-checkbox__background .mdc-checkbox__checkmark{color:GrayText}.mdc-checkbox__native-control:disabled~.mdc-checkbox__background .mdc-checkbox__mixedmark{border-color:GrayText}.mdc-checkbox__mixedmark{margin:0 1px}}.mdc-checkbox--disabled{cursor:default;pointer-events:none}.mdc-checkbox__background{display:inline-flex;position:absolute;align-items:center;justify-content:center;box-sizing:border-box;width:18px;height:18px;border:2px solid currentColor;border-radius:2px;background-color:transparent;pointer-events:none;will-change:background-color,border-color;transition:background-color 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1),border-color 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-checkbox__background .mdc-checkbox__background::before{background-color:#000;background-color:var(--mdc-theme-on-surface, #000)}.mdc-checkbox__checkmark{position:absolute;top:0;right:0;bottom:0;left:0;width:100%;opacity:0;transition:opacity 180ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-checkbox--upgraded .mdc-checkbox__checkmark{opacity:1}.mdc-checkbox__checkmark-path{transition:stroke-dashoffset 180ms 0ms cubic-bezier(0.4, 0, 0.6, 1);stroke:currentColor;stroke-width:3.12px;stroke-dashoffset:29.7833385;stroke-dasharray:29.7833385}.mdc-checkbox__mixedmark{width:100%;height:0;-webkit-transform:scaleX(0) rotate(0deg);transform:scaleX(0) rotate(0deg);border-width:1px;border-style:solid;opacity:0;transition:opacity 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1),-webkit-transform 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1);transition:opacity 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1),transform 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1);transition:opacity 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1),transform 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1),-webkit-transform 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-checkbox--upgraded .mdc-checkbox__background,.mdc-checkbox--upgraded .mdc-checkbox__checkmark,.mdc-checkbox--upgraded .mdc-checkbox__checkmark-path,.mdc-checkbox--upgraded .mdc-checkbox__mixedmark{transition:none !important}.mdc-checkbox--anim-unchecked-checked .mdc-checkbox__background,.mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__background,.mdc-checkbox--anim-checked-unchecked .mdc-checkbox__background,.mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__background{-webkit-animation-duration:180ms;animation-duration:180ms;-webkit-animation-timing-function:linear;animation-timing-function:linear}.mdc-checkbox--anim-unchecked-checked .mdc-checkbox__checkmark-path{-webkit-animation:mdc-checkbox-unchecked-checked-checkmark-path 180ms linear 0s;animation:mdc-checkbox-unchecked-checked-checkmark-path 180ms linear 0s;transition:none}.mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__mixedmark{-webkit-animation:mdc-checkbox-unchecked-indeterminate-mixedmark 90ms linear 0s;animation:mdc-checkbox-unchecked-indeterminate-mixedmark 90ms linear 0s;transition:none}.mdc-checkbox--anim-checked-unchecked .mdc-checkbox__checkmark-path{-webkit-animation:mdc-checkbox-checked-unchecked-checkmark-path 90ms linear 0s;animation:mdc-checkbox-checked-unchecked-checkmark-path 90ms linear 0s;transition:none}.mdc-checkbox--anim-checked-indeterminate .mdc-checkbox__checkmark{-webkit-animation:mdc-checkbox-checked-indeterminate-checkmark 90ms linear 0s;animation:mdc-checkbox-checked-indeterminate-checkmark 90ms linear 0s;transition:none}.mdc-checkbox--anim-checked-indeterminate .mdc-checkbox__mixedmark{-webkit-animation:mdc-checkbox-checked-indeterminate-mixedmark 90ms linear 0s;animation:mdc-checkbox-checked-indeterminate-mixedmark 90ms linear 0s;transition:none}.mdc-checkbox--anim-indeterminate-checked .mdc-checkbox__checkmark{-webkit-animation:mdc-checkbox-indeterminate-checked-checkmark 500ms linear 0s;animation:mdc-checkbox-indeterminate-checked-checkmark 500ms linear 0s;transition:none}.mdc-checkbox--anim-indeterminate-checked .mdc-checkbox__mixedmark{-webkit-animation:mdc-checkbox-indeterminate-checked-mixedmark 500ms linear 0s;animation:mdc-checkbox-indeterminate-checked-mixedmark 500ms linear 0s;transition:none}.mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__mixedmark{-webkit-animation:mdc-checkbox-indeterminate-unchecked-mixedmark 300ms linear 0s;animation:mdc-checkbox-indeterminate-unchecked-mixedmark 300ms linear 0s;transition:none}.mdc-checkbox__native-control:checked~.mdc-checkbox__background,.mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background,.mdc-checkbox__native-control[data-indeterminate=true]~.mdc-checkbox__background{transition:border-color 90ms 0ms cubic-bezier(0, 0, 0.2, 1),background-color 90ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-checkbox__native-control:checked~.mdc-checkbox__background .mdc-checkbox__checkmark-path,.mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background .mdc-checkbox__checkmark-path,.mdc-checkbox__native-control[data-indeterminate=true]~.mdc-checkbox__background .mdc-checkbox__checkmark-path{stroke-dashoffset:0}.mdc-checkbox__background::before{position:absolute;-webkit-transform:scale(0, 0);transform:scale(0, 0);border-radius:50%;opacity:0;pointer-events:none;content:"";will-change:opacity,transform;transition:opacity 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1),-webkit-transform 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1);transition:opacity 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1),transform 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1);transition:opacity 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1),transform 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1),-webkit-transform 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-checkbox__native-control:focus~.mdc-checkbox__background::before{-webkit-transform:scale(1);transform:scale(1);opacity:.12;transition:opacity 80ms 0ms cubic-bezier(0, 0, 0.2, 1),-webkit-transform 80ms 0ms cubic-bezier(0, 0, 0.2, 1);transition:opacity 80ms 0ms cubic-bezier(0, 0, 0.2, 1),transform 80ms 0ms cubic-bezier(0, 0, 0.2, 1);transition:opacity 80ms 0ms cubic-bezier(0, 0, 0.2, 1),transform 80ms 0ms cubic-bezier(0, 0, 0.2, 1),-webkit-transform 80ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-checkbox__native-control{position:absolute;margin:0;padding:0;opacity:0;cursor:inherit}.mdc-checkbox__native-control:disabled{cursor:default;pointer-events:none}.mdc-checkbox--touch{margin-top:4px;margin-bottom:4px;margin-right:4px;margin-left:4px}.mdc-checkbox--touch .mdc-checkbox__native-control{top:-4px;right:-4px;left:-4px;width:48px;height:48px}.mdc-checkbox__native-control:checked~.mdc-checkbox__background .mdc-checkbox__checkmark{transition:opacity 180ms 0ms cubic-bezier(0, 0, 0.2, 1),-webkit-transform 180ms 0ms cubic-bezier(0, 0, 0.2, 1);transition:opacity 180ms 0ms cubic-bezier(0, 0, 0.2, 1),transform 180ms 0ms cubic-bezier(0, 0, 0.2, 1);transition:opacity 180ms 0ms cubic-bezier(0, 0, 0.2, 1),transform 180ms 0ms cubic-bezier(0, 0, 0.2, 1),-webkit-transform 180ms 0ms cubic-bezier(0, 0, 0.2, 1);opacity:1}.mdc-checkbox__native-control:checked~.mdc-checkbox__background .mdc-checkbox__mixedmark{-webkit-transform:scaleX(1) rotate(-45deg);transform:scaleX(1) rotate(-45deg)}.mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background .mdc-checkbox__checkmark,.mdc-checkbox__native-control[data-indeterminate=true]~.mdc-checkbox__background .mdc-checkbox__checkmark{-webkit-transform:rotate(45deg);transform:rotate(45deg);opacity:0;transition:opacity 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1),-webkit-transform 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1);transition:opacity 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1),transform 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1);transition:opacity 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1),transform 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1),-webkit-transform 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background .mdc-checkbox__mixedmark,.mdc-checkbox__native-control[data-indeterminate=true]~.mdc-checkbox__background .mdc-checkbox__mixedmark{-webkit-transform:scaleX(1) rotate(0deg);transform:scaleX(1) rotate(0deg);opacity:1}.mdc-checkbox{--mdc-ripple-fg-size: 0;--mdc-ripple-left: 0;--mdc-ripple-top: 0;--mdc-ripple-fg-scale: 1;--mdc-ripple-fg-translate-end: 0;--mdc-ripple-fg-translate-start: 0;-webkit-tap-highlight-color:rgba(0,0,0,0)}.mdc-checkbox .mdc-checkbox__ripple::before,.mdc-checkbox .mdc-checkbox__ripple::after{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:""}.mdc-checkbox .mdc-checkbox__ripple::before{transition:opacity 15ms linear,background-color 15ms linear;z-index:1}.mdc-checkbox.mdc-ripple-upgraded .mdc-checkbox__ripple::before{-webkit-transform:scale(var(--mdc-ripple-fg-scale, 1));transform:scale(var(--mdc-ripple-fg-scale, 1))}.mdc-checkbox.mdc-ripple-upgraded .mdc-checkbox__ripple::after{top:0;left:0;-webkit-transform:scale(0);transform:scale(0);-webkit-transform-origin:center center;transform-origin:center center}.mdc-checkbox.mdc-ripple-upgraded--unbounded .mdc-checkbox__ripple::after{top:var(--mdc-ripple-top, 0);left:var(--mdc-ripple-left, 0)}.mdc-checkbox.mdc-ripple-upgraded--foreground-activation .mdc-checkbox__ripple::after{-webkit-animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards;animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards}.mdc-checkbox.mdc-ripple-upgraded--foreground-deactivation .mdc-checkbox__ripple::after{-webkit-animation:mdc-ripple-fg-opacity-out 150ms;animation:mdc-ripple-fg-opacity-out 150ms;-webkit-transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1));transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}.mdc-checkbox .mdc-checkbox__ripple::before,.mdc-checkbox .mdc-checkbox__ripple::after{background-color:#000;background-color:var(--mdc-theme-on-surface, #000)}.mdc-checkbox:hover .mdc-checkbox__ripple::before{opacity:.04}.mdc-checkbox.mdc-ripple-upgraded--background-focused .mdc-checkbox__ripple::before,.mdc-checkbox:not(.mdc-ripple-upgraded):focus .mdc-checkbox__ripple::before{transition-duration:75ms;opacity:.12}.mdc-checkbox:not(.mdc-ripple-upgraded) .mdc-checkbox__ripple::after{transition:opacity 150ms linear}.mdc-checkbox:not(.mdc-ripple-upgraded):active .mdc-checkbox__ripple::after{transition-duration:75ms;opacity:.12}.mdc-checkbox.mdc-ripple-upgraded{--mdc-ripple-fg-opacity: 0.12}.mdc-checkbox .mdc-checkbox__ripple::before,.mdc-checkbox .mdc-checkbox__ripple::after{top:calc(50% - 50%);left:calc(50% - 50%);width:100%;height:100%}.mdc-checkbox.mdc-ripple-upgraded .mdc-checkbox__ripple::before,.mdc-checkbox.mdc-ripple-upgraded .mdc-checkbox__ripple::after{top:var(--mdc-ripple-top, calc(50% - 50%));left:var(--mdc-ripple-left, calc(50% - 50%));width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}.mdc-checkbox.mdc-ripple-upgraded .mdc-checkbox__ripple::after{width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}.mdc-checkbox__ripple{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none}.mdc-ripple-upgraded--background-focused .mdc-checkbox__background::before{content:none}.mdc-chip-trailing-action__touch{position:absolute;top:50%;right:0;height:48px;left:50%;width:48px;-webkit-transform:translate(-50%, -50%);transform:translate(-50%, -50%)}.mdc-chip-trailing-action{border:none;display:inline-flex;position:relative;align-items:center;justify-content:center;box-sizing:border-box;padding:0;outline:none;cursor:pointer;-webkit-appearance:none;background:none}.mdc-chip-trailing-action .mdc-chip-trailing-action__icon{height:18px;width:18px;font-size:18px}.mdc-chip-trailing-action .mdc-chip-trailing-action{color:#000;color:var(--mdc-theme-on-surface, #000)}.mdc-chip-trailing-action .mdc-chip-trailing-action__touch{width:26px}.mdc-chip-trailing-action .mdc-chip-trailing-action__icon{fill:currentColor;color:inherit}.mdc-chip-trailing-action{--mdc-ripple-fg-size: 0;--mdc-ripple-left: 0;--mdc-ripple-top: 0;--mdc-ripple-fg-scale: 1;--mdc-ripple-fg-translate-end: 0;--mdc-ripple-fg-translate-start: 0;-webkit-tap-highlight-color:rgba(0,0,0,0)}.mdc-chip-trailing-action .mdc-chip-trailing-action__ripple::before,.mdc-chip-trailing-action .mdc-chip-trailing-action__ripple::after{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:""}.mdc-chip-trailing-action .mdc-chip-trailing-action__ripple::before{transition:opacity 15ms linear,background-color 15ms linear;z-index:1}.mdc-chip-trailing-action.mdc-ripple-upgraded .mdc-chip-trailing-action__ripple::before{-webkit-transform:scale(var(--mdc-ripple-fg-scale, 1));transform:scale(var(--mdc-ripple-fg-scale, 1))}.mdc-chip-trailing-action.mdc-ripple-upgraded .mdc-chip-trailing-action__ripple::after{top:0;left:0;-webkit-transform:scale(0);transform:scale(0);-webkit-transform-origin:center center;transform-origin:center center}.mdc-chip-trailing-action.mdc-ripple-upgraded--unbounded .mdc-chip-trailing-action__ripple::after{top:var(--mdc-ripple-top, 0);left:var(--mdc-ripple-left, 0)}.mdc-chip-trailing-action.mdc-ripple-upgraded--foreground-activation .mdc-chip-trailing-action__ripple::after{-webkit-animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards;animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards}.mdc-chip-trailing-action.mdc-ripple-upgraded--foreground-deactivation .mdc-chip-trailing-action__ripple::after{-webkit-animation:mdc-ripple-fg-opacity-out 150ms;animation:mdc-ripple-fg-opacity-out 150ms;-webkit-transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1));transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}.mdc-chip-trailing-action .mdc-chip-trailing-action__ripple::before,.mdc-chip-trailing-action .mdc-chip-trailing-action__ripple::after{top:calc(50% - 50%);left:calc(50% - 50%);width:100%;height:100%}.mdc-chip-trailing-action.mdc-ripple-upgraded .mdc-chip-trailing-action__ripple::before,.mdc-chip-trailing-action.mdc-ripple-upgraded .mdc-chip-trailing-action__ripple::after{top:var(--mdc-ripple-top, calc(50% - 50%));left:var(--mdc-ripple-left, calc(50% - 50%));width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}.mdc-chip-trailing-action.mdc-ripple-upgraded .mdc-chip-trailing-action__ripple::after{width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}.mdc-chip-trailing-action .mdc-chip-trailing-action__ripple::before,.mdc-chip-trailing-action .mdc-chip-trailing-action__ripple::after{background-color:#000;background-color:var(--mdc-theme-on-surface, #000)}.mdc-chip-trailing-action:hover .mdc-chip-trailing-action__ripple::before{opacity:.04}.mdc-chip-trailing-action.mdc-ripple-upgraded--background-focused .mdc-chip-trailing-action__ripple::before,.mdc-chip-trailing-action:not(.mdc-ripple-upgraded):focus .mdc-chip-trailing-action__ripple::before{transition-duration:75ms;opacity:.12}.mdc-chip-trailing-action:not(.mdc-ripple-upgraded) .mdc-chip-trailing-action__ripple::after{transition:opacity 150ms linear}.mdc-chip-trailing-action:not(.mdc-ripple-upgraded):active .mdc-chip-trailing-action__ripple::after{transition-duration:75ms;opacity:.12}.mdc-chip-trailing-action.mdc-ripple-upgraded{--mdc-ripple-fg-opacity: 0.12}.mdc-chip-trailing-action .mdc-chip-trailing-action__ripple{position:absolute;box-sizing:content-box;width:100%;height:100%;overflow:hidden}.mdc-chip__icon--leading{color:rgba(0,0,0,.54)}.mdc-chip-trailing-action{color:#000}.mdc-chip__icon--trailing{color:rgba(0,0,0,.54)}.mdc-chip__icon--trailing:hover{color:rgba(0,0,0,.62)}.mdc-chip__icon--trailing:focus{color:rgba(0,0,0,.87)}.mdc-chip__icon.mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden){width:20px;height:20px;font-size:20px}.mdc-chip-trailing-action__icon{height:18px;width:18px;font-size:18px}.mdc-chip__icon.mdc-chip__icon--trailing{width:18px;height:18px;font-size:18px}.mdc-chip-trailing-action{margin-left:4px;margin-right:-4px}[dir=rtl] .mdc-chip-trailing-action,.mdc-chip-trailing-action[dir=rtl]{margin-left:-4px;margin-right:4px}.mdc-chip__icon--trailing{margin-left:4px;margin-right:-4px}[dir=rtl] .mdc-chip__icon--trailing,.mdc-chip__icon--trailing[dir=rtl]{margin-left:-4px;margin-right:4px}.mdc-chip{border-radius:16px;background-color:#e0e0e0;color:rgba(0,0,0,.87);-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:PingFang SC,Microsoft YaHei, sans-serif;font-family:var(--mdc-typography-body2-font-family, var(--mdc-typography-font-family, PingFang SC, Microsoft YaHei, sans-serif));font-size:0.875rem;font-size:var(--mdc-typography-body2-font-size, 0.875rem);line-height:1.25rem;line-height:var(--mdc-typography-body2-line-height, 1.25rem);font-weight:400;font-weight:var(--mdc-typography-body2-font-weight, 400);letter-spacing:0.0178571429em;letter-spacing:var(--mdc-typography-body2-letter-spacing, 0.0178571429em);text-decoration:inherit;-webkit-text-decoration:var(--mdc-typography-body2-text-decoration, inherit);text-decoration:var(--mdc-typography-body2-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-body2-text-transform, inherit);height:32px;position:relative;display:inline-flex;align-items:center;box-sizing:border-box;padding:0 12px;border-width:0;outline:none;cursor:pointer;-webkit-appearance:none}.mdc-chip .mdc-chip__ripple{border-radius:16px}.mdc-chip:hover{color:rgba(0,0,0,.87)}.mdc-chip.mdc-chip--selected .mdc-chip__checkmark,.mdc-chip .mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden){margin-left:-4px;margin-right:4px}[dir=rtl] .mdc-chip.mdc-chip--selected .mdc-chip__checkmark,.mdc-chip.mdc-chip--selected .mdc-chip__checkmark[dir=rtl],[dir=rtl] .mdc-chip .mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden),.mdc-chip .mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden)[dir=rtl]{margin-left:4px;margin-right:-4px}.mdc-chip .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}.mdc-chip::-moz-focus-inner{padding:0;border:0}.mdc-chip:hover{color:#000;color:var(--mdc-theme-on-surface, #000)}.mdc-chip .mdc-chip__touch{position:absolute;top:50%;right:0;height:48px;left:0;-webkit-transform:translateY(-50%);transform:translateY(-50%)}.mdc-chip--exit{transition:opacity 75ms cubic-bezier(0.4, 0, 0.2, 1),width 150ms cubic-bezier(0, 0, 0.2, 1),padding 100ms linear,margin 100ms linear;opacity:0}.mdc-chip__overflow{text-overflow:ellipsis;overflow:hidden}.mdc-chip__text{white-space:nowrap}.mdc-chip__icon{border-radius:50%;outline:none;vertical-align:middle}.mdc-chip__checkmark{height:20px}.mdc-chip__checkmark-path{transition:stroke-dashoffset 150ms 50ms cubic-bezier(0.4, 0, 0.6, 1);stroke-width:2px;stroke-dashoffset:29.7833385;stroke-dasharray:29.7833385}.mdc-chip__primary-action:focus{outline:none}.mdc-chip--selected .mdc-chip__checkmark-path{stroke-dashoffset:0}.mdc-chip__icon--leading,.mdc-chip__icon--trailing{position:relative}.mdc-chip-set--choice .mdc-chip.mdc-chip--selected{color:#6200ee;color:var(--mdc-theme-primary, #6200ee)}.mdc-chip-set--choice .mdc-chip.mdc-chip--selected .mdc-chip__icon--leading{color:rgba(98,0,238,.54)}.mdc-chip-set--choice .mdc-chip.mdc-chip--selected:hover{color:#6200ee;color:var(--mdc-theme-primary, #6200ee)}.mdc-chip-set--choice .mdc-chip .mdc-chip__checkmark-path{stroke:#6200ee;stroke:var(--mdc-theme-primary, #6200ee)}.mdc-chip-set--choice .mdc-chip--selected{background-color:#fff;background-color:var(--mdc-theme-surface, #fff)}.mdc-chip__checkmark-svg{width:0;height:20px;transition:width 150ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-chip--selected .mdc-chip__checkmark-svg{width:20px}.mdc-chip-set--filter .mdc-chip__icon--leading{transition:opacity 75ms linear;transition-delay:-50ms;opacity:1}.mdc-chip-set--filter .mdc-chip__icon--leading+.mdc-chip__checkmark{transition:opacity 75ms linear;transition-delay:80ms;opacity:0}.mdc-chip-set--filter .mdc-chip__icon--leading+.mdc-chip__checkmark .mdc-chip__checkmark-svg{transition:width 0ms}.mdc-chip-set--filter .mdc-chip--selected .mdc-chip__icon--leading{opacity:0}.mdc-chip-set--filter .mdc-chip--selected .mdc-chip__icon--leading+.mdc-chip__checkmark{width:0;opacity:1}.mdc-chip-set--filter .mdc-chip__icon--leading-hidden.mdc-chip__icon--leading{width:0;opacity:0}.mdc-chip-set--filter .mdc-chip__icon--leading-hidden.mdc-chip__icon--leading+.mdc-chip__checkmark{width:20px}.mdc-chip{--mdc-ripple-fg-size: 0;--mdc-ripple-left: 0;--mdc-ripple-top: 0;--mdc-ripple-fg-scale: 1;--mdc-ripple-fg-translate-end: 0;--mdc-ripple-fg-translate-start: 0;-webkit-tap-highlight-color:rgba(0,0,0,0)}.mdc-chip .mdc-chip__ripple::before,.mdc-chip .mdc-chip__ripple::after{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:""}.mdc-chip .mdc-chip__ripple::before{transition:opacity 15ms linear,background-color 15ms linear;z-index:1}.mdc-chip.mdc-ripple-upgraded .mdc-chip__ripple::before{-webkit-transform:scale(var(--mdc-ripple-fg-scale, 1));transform:scale(var(--mdc-ripple-fg-scale, 1))}.mdc-chip.mdc-ripple-upgraded .mdc-chip__ripple::after{top:0;left:0;-webkit-transform:scale(0);transform:scale(0);-webkit-transform-origin:center center;transform-origin:center center}.mdc-chip.mdc-ripple-upgraded--unbounded .mdc-chip__ripple::after{top:var(--mdc-ripple-top, 0);left:var(--mdc-ripple-left, 0)}.mdc-chip.mdc-ripple-upgraded--foreground-activation .mdc-chip__ripple::after{-webkit-animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards;animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards}.mdc-chip.mdc-ripple-upgraded--foreground-deactivation .mdc-chip__ripple::after{-webkit-animation:mdc-ripple-fg-opacity-out 150ms;animation:mdc-ripple-fg-opacity-out 150ms;-webkit-transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1));transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}.mdc-chip .mdc-chip__ripple::before,.mdc-chip .mdc-chip__ripple::after{top:calc(50% - 100%);left:calc(50% - 100%);width:200%;height:200%}.mdc-chip.mdc-ripple-upgraded .mdc-chip__ripple::after{width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}.mdc-chip .mdc-chip__ripple::before,.mdc-chip .mdc-chip__ripple::after{background-color:rgba(0,0,0,.87)}.mdc-chip:hover .mdc-chip__ripple::before{opacity:.04}.mdc-chip.mdc-ripple-upgraded--background-focused .mdc-chip__ripple::before,.mdc-chip.mdc-ripple-upgraded:focus-within .mdc-chip__ripple::before,.mdc-chip:not(.mdc-ripple-upgraded):focus .mdc-chip__ripple::before,.mdc-chip:not(.mdc-ripple-upgraded):focus-within .mdc-chip__ripple::before{transition-duration:75ms;opacity:.12}.mdc-chip:not(.mdc-ripple-upgraded) .mdc-chip__ripple::after{transition:opacity 150ms linear}.mdc-chip:not(.mdc-ripple-upgraded):active .mdc-chip__ripple::after{transition-duration:75ms;opacity:.12}.mdc-chip.mdc-ripple-upgraded{--mdc-ripple-fg-opacity: 0.12}.mdc-chip .mdc-chip__ripple{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;overflow:hidden}.mdc-chip-set--choice .mdc-chip.mdc-chip--selected .mdc-chip__ripple::before{opacity:.08}.mdc-chip-set--choice .mdc-chip.mdc-chip--selected .mdc-chip__ripple::before,.mdc-chip-set--choice .mdc-chip.mdc-chip--selected .mdc-chip__ripple::after{background-color:#6200ee;background-color:var(--mdc-theme-primary, #6200ee)}.mdc-chip-set--choice .mdc-chip.mdc-chip--selected:hover .mdc-chip__ripple::before{opacity:.12}.mdc-chip-set--choice .mdc-chip.mdc-chip--selected.mdc-ripple-upgraded--background-focused .mdc-chip__ripple::before,.mdc-chip-set--choice .mdc-chip.mdc-chip--selected.mdc-ripple-upgraded:focus-within .mdc-chip__ripple::before,.mdc-chip-set--choice .mdc-chip.mdc-chip--selected:not(.mdc-ripple-upgraded):focus .mdc-chip__ripple::before,.mdc-chip-set--choice .mdc-chip.mdc-chip--selected:not(.mdc-ripple-upgraded):focus-within .mdc-chip__ripple::before{transition-duration:75ms;opacity:.2}.mdc-chip-set--choice .mdc-chip.mdc-chip--selected:not(.mdc-ripple-upgraded) .mdc-chip__ripple::after{transition:opacity 150ms linear}.mdc-chip-set--choice .mdc-chip.mdc-chip--selected:not(.mdc-ripple-upgraded):active .mdc-chip__ripple::after{transition-duration:75ms;opacity:.2}.mdc-chip-set--choice .mdc-chip.mdc-chip--selected.mdc-ripple-upgraded{--mdc-ripple-fg-opacity: 0.2}@-webkit-keyframes mdc-chip-entry{from{-webkit-transform:scale(0.8);transform:scale(0.8);opacity:.4}to{-webkit-transform:scale(1);transform:scale(1);opacity:1}}@keyframes mdc-chip-entry{from{-webkit-transform:scale(0.8);transform:scale(0.8);opacity:.4}to{-webkit-transform:scale(1);transform:scale(1);opacity:1}}.mdc-chip-set{padding:4px;display:flex;flex-wrap:wrap;box-sizing:border-box}.mdc-chip-set .mdc-chip{margin:4px}.mdc-chip-set .mdc-chip--touch{margin-top:8px;margin-bottom:8px}.mdc-chip-set--input .mdc-chip{-webkit-animation:mdc-chip-entry 100ms cubic-bezier(0, 0, 0.2, 1);animation:mdc-chip-entry 100ms cubic-bezier(0, 0, 0.2, 1)}.mdc-circular-progress__determinate-circle,.mdc-circular-progress__indeterminate-circle-graphic{stroke:#6200ee;stroke:var(--mdc-theme-primary, #6200ee)}@-webkit-keyframes mdc-circular-progress-container-rotate{to{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes mdc-circular-progress-container-rotate{to{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@-webkit-keyframes mdc-circular-progress-spinner-layer-rotate{12.5%{-webkit-transform:rotate(135deg);transform:rotate(135deg)}25%{-webkit-transform:rotate(270deg);transform:rotate(270deg)}37.5%{-webkit-transform:rotate(405deg);transform:rotate(405deg)}50%{-webkit-transform:rotate(540deg);transform:rotate(540deg)}62.5%{-webkit-transform:rotate(675deg);transform:rotate(675deg)}75%{-webkit-transform:rotate(810deg);transform:rotate(810deg)}87.5%{-webkit-transform:rotate(945deg);transform:rotate(945deg)}100%{-webkit-transform:rotate(1080deg);transform:rotate(1080deg)}}@keyframes mdc-circular-progress-spinner-layer-rotate{12.5%{-webkit-transform:rotate(135deg);transform:rotate(135deg)}25%{-webkit-transform:rotate(270deg);transform:rotate(270deg)}37.5%{-webkit-transform:rotate(405deg);transform:rotate(405deg)}50%{-webkit-transform:rotate(540deg);transform:rotate(540deg)}62.5%{-webkit-transform:rotate(675deg);transform:rotate(675deg)}75%{-webkit-transform:rotate(810deg);transform:rotate(810deg)}87.5%{-webkit-transform:rotate(945deg);transform:rotate(945deg)}100%{-webkit-transform:rotate(1080deg);transform:rotate(1080deg)}}@-webkit-keyframes mdc-circular-progress-color-1-fade-in-out{from{opacity:.99}25%{opacity:.99}26%{opacity:0}89%{opacity:0}90%{opacity:.99}to{opacity:.99}}@keyframes mdc-circular-progress-color-1-fade-in-out{from{opacity:.99}25%{opacity:.99}26%{opacity:0}89%{opacity:0}90%{opacity:.99}to{opacity:.99}}@-webkit-keyframes mdc-circular-progress-color-2-fade-in-out{from{opacity:0}15%{opacity:0}25%{opacity:.99}50%{opacity:.99}51%{opacity:0}to{opacity:0}}@keyframes mdc-circular-progress-color-2-fade-in-out{from{opacity:0}15%{opacity:0}25%{opacity:.99}50%{opacity:.99}51%{opacity:0}to{opacity:0}}@-webkit-keyframes mdc-circular-progress-color-3-fade-in-out{from{opacity:0}40%{opacity:0}50%{opacity:.99}75%{opacity:.99}76%{opacity:0}to{opacity:0}}@keyframes mdc-circular-progress-color-3-fade-in-out{from{opacity:0}40%{opacity:0}50%{opacity:.99}75%{opacity:.99}76%{opacity:0}to{opacity:0}}@-webkit-keyframes mdc-circular-progress-color-4-fade-in-out{from{opacity:0}65%{opacity:0}75%{opacity:.99}90%{opacity:.99}to{opacity:0}}@keyframes mdc-circular-progress-color-4-fade-in-out{from{opacity:0}65%{opacity:0}75%{opacity:.99}90%{opacity:.99}to{opacity:0}}@-webkit-keyframes mdc-circular-progress-left-spin{from{-webkit-transform:rotate(265deg);transform:rotate(265deg)}50%{-webkit-transform:rotate(130deg);transform:rotate(130deg)}to{-webkit-transform:rotate(265deg);transform:rotate(265deg)}}@keyframes mdc-circular-progress-left-spin{from{-webkit-transform:rotate(265deg);transform:rotate(265deg)}50%{-webkit-transform:rotate(130deg);transform:rotate(130deg)}to{-webkit-transform:rotate(265deg);transform:rotate(265deg)}}@-webkit-keyframes mdc-circular-progress-right-spin{from{-webkit-transform:rotate(-265deg);transform:rotate(-265deg)}50%{-webkit-transform:rotate(-130deg);transform:rotate(-130deg)}to{-webkit-transform:rotate(-265deg);transform:rotate(-265deg)}}@keyframes mdc-circular-progress-right-spin{from{-webkit-transform:rotate(-265deg);transform:rotate(-265deg)}50%{-webkit-transform:rotate(-130deg);transform:rotate(-130deg)}to{-webkit-transform:rotate(-265deg);transform:rotate(-265deg)}}.mdc-circular-progress{width:48px;height:48px;display:inline-block;position:relative;direction:ltr;transition:opacity 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-circular-progress .mdc-circular-progress__determinate-circle-graphic,.mdc-circular-progress .mdc-circular-progress__indeterminate-circle-graphic{stroke-width:4px}.mdc-circular-progress .mdc-circular-progress__gap-patch .mdc-circular-progress__indeterminate-circle-graphic{stroke-width:3.2px}.mdc-circular-progress--small{width:24px;height:24px}.mdc-circular-progress--small .mdc-circular-progress__determinate-circle-graphic,.mdc-circular-progress--small .mdc-circular-progress__indeterminate-circle-graphic{stroke-width:2.5px}.mdc-circular-progress--small .mdc-circular-progress__gap-patch .mdc-circular-progress__indeterminate-circle-graphic{stroke-width:2px}.mdc-circular-progress--medium{width:36px;height:36px}.mdc-circular-progress--medium .mdc-circular-progress__determinate-circle-graphic,.mdc-circular-progress--medium .mdc-circular-progress__indeterminate-circle-graphic{stroke-width:3px}.mdc-circular-progress--medium .mdc-circular-progress__gap-patch .mdc-circular-progress__indeterminate-circle-graphic{stroke-width:2.4px}.mdc-circular-progress--large{width:48px;height:48px}.mdc-circular-progress--large .mdc-circular-progress__determinate-circle-graphic,.mdc-circular-progress--large .mdc-circular-progress__indeterminate-circle-graphic{stroke-width:4px}.mdc-circular-progress--large .mdc-circular-progress__gap-patch .mdc-circular-progress__indeterminate-circle-graphic{stroke-width:3.2px}.mdc-circular-progress__determinate-container,.mdc-circular-progress__indeterminate-circle-graphic,.mdc-circular-progress__indeterminate-container,.mdc-circular-progress__spinner-layer{position:absolute;width:100%;height:100%}.mdc-circular-progress__determinate-container{-webkit-transform:rotate(-90deg);transform:rotate(-90deg)}.mdc-circular-progress__indeterminate-container{opacity:0}.mdc-circular-progress__determinate-circle-graphic,.mdc-circular-progress__indeterminate-circle-graphic{fill:transparent}.mdc-circular-progress__determinate-circle{transition:stroke-dashoffset 500ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-circular-progress__gap-patch{position:absolute;top:0;left:47.5%;box-sizing:border-box;width:5%;height:100%;overflow:hidden}.mdc-circular-progress__gap-patch .mdc-circular-progress__indeterminate-circle-graphic{left:-900%;width:2000%;-webkit-transform:rotate(180deg);transform:rotate(180deg)}.mdc-circular-progress__circle-clipper{display:inline-block;position:relative;width:50%;height:100%;overflow:hidden}.mdc-circular-progress__circle-clipper .mdc-circular-progress__indeterminate-circle-graphic{width:200%}.mdc-circular-progress__circle-right .mdc-circular-progress__indeterminate-circle-graphic{left:-100%}.mdc-circular-progress--indeterminate .mdc-circular-progress__determinate-container{opacity:0}.mdc-circular-progress--indeterminate .mdc-circular-progress__indeterminate-container{opacity:1}.mdc-circular-progress--indeterminate .mdc-circular-progress__indeterminate-container{-webkit-animation:mdc-circular-progress-container-rotate 1568.2352941176ms linear infinite;animation:mdc-circular-progress-container-rotate 1568.2352941176ms linear infinite}.mdc-circular-progress--indeterminate .mdc-circular-progress__spinner-layer{-webkit-animation:mdc-circular-progress-spinner-layer-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;animation:mdc-circular-progress-spinner-layer-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both}.mdc-circular-progress--indeterminate .mdc-circular-progress__color-1{-webkit-animation:mdc-circular-progress-spinner-layer-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both,mdc-circular-progress-color-1-fade-in-out 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;animation:mdc-circular-progress-spinner-layer-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both,mdc-circular-progress-color-1-fade-in-out 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both}.mdc-circular-progress--indeterminate .mdc-circular-progress__color-2{-webkit-animation:mdc-circular-progress-spinner-layer-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both,mdc-circular-progress-color-2-fade-in-out 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;animation:mdc-circular-progress-spinner-layer-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both,mdc-circular-progress-color-2-fade-in-out 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both}.mdc-circular-progress--indeterminate .mdc-circular-progress__color-3{-webkit-animation:mdc-circular-progress-spinner-layer-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both,mdc-circular-progress-color-3-fade-in-out 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;animation:mdc-circular-progress-spinner-layer-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both,mdc-circular-progress-color-3-fade-in-out 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both}.mdc-circular-progress--indeterminate .mdc-circular-progress__color-4{-webkit-animation:mdc-circular-progress-spinner-layer-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both,mdc-circular-progress-color-4-fade-in-out 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;animation:mdc-circular-progress-spinner-layer-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both,mdc-circular-progress-color-4-fade-in-out 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both}.mdc-circular-progress--indeterminate .mdc-circular-progress__circle-left .mdc-circular-progress__indeterminate-circle-graphic{-webkit-animation:mdc-circular-progress-left-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;animation:mdc-circular-progress-left-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both}.mdc-circular-progress--indeterminate .mdc-circular-progress__circle-right .mdc-circular-progress__indeterminate-circle-graphic{-webkit-animation:mdc-circular-progress-right-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;animation:mdc-circular-progress-right-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both}.mdc-circular-progress--closed{opacity:0}.mdc-data-table__content{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:PingFang SC,Microsoft YaHei, sans-serif;font-family:var(--mdc-typography-body2-font-family, var(--mdc-typography-font-family, PingFang SC, Microsoft YaHei, sans-serif));font-size:0.875rem;font-size:var(--mdc-typography-body2-font-size, 0.875rem);line-height:1.25rem;line-height:var(--mdc-typography-body2-line-height, 1.25rem);font-weight:400;font-weight:var(--mdc-typography-body2-font-weight, 400);letter-spacing:0.0178571429em;letter-spacing:var(--mdc-typography-body2-letter-spacing, 0.0178571429em);text-decoration:inherit;-webkit-text-decoration:var(--mdc-typography-body2-text-decoration, inherit);text-decoration:var(--mdc-typography-body2-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-body2-text-transform, inherit)}.mdc-data-table{background-color:#fff;background-color:var(--mdc-theme-surface, #fff);border-radius:4px;border-radius:var(--mdc-shape-medium, 4px);border-width:1px;border-style:solid;border-color:rgba(0,0,0,.12);-webkit-overflow-scrolling:touch;display:inline-flex;flex-direction:column;box-sizing:border-box;position:relative}.mdc-data-table__row{background-color:inherit}.mdc-data-table__header-row{background-color:inherit}.mdc-data-table__row--selected{background-color:rgba(98,0,238,.04)}.mdc-data-table__pagination-rows-per-page-select:not(.mdc-select--disabled) .mdc-notched-outline__leading,.mdc-data-table__pagination-rows-per-page-select:not(.mdc-select--disabled) .mdc-notched-outline__notch,.mdc-data-table__pagination-rows-per-page-select:not(.mdc-select--disabled) .mdc-notched-outline__trailing{border-color:rgba(0,0,0,.12)}.mdc-data-table__row,.mdc-data-table__pagination{border-top-color:rgba(0,0,0,.12)}.mdc-data-table__row,.mdc-data-table__pagination{border-top-width:1px;border-top-style:solid}.mdc-data-table__row:not(.mdc-data-table__row--selected):hover{background-color:rgba(0,0,0,.04)}.mdc-data-table__header-cell{color:rgba(0,0,0,.87)}.mdc-data-table__pagination-total,.mdc-data-table__pagination-rows-per-page-label,.mdc-data-table__cell{color:rgba(0,0,0,.87)}.mdc-data-table__cell{height:52px}.mdc-data-table__pagination{min-height:52px}.mdc-data-table__header-cell{height:56px}.mdc-data-table__cell,.mdc-data-table__header-cell{padding-right:16px;padding-left:16px}.mdc-data-table__header-cell--checkbox,.mdc-data-table__cell--checkbox{padding-left:16px;padding-right:0}[dir=rtl] .mdc-data-table__header-cell--checkbox,.mdc-data-table__header-cell--checkbox[dir=rtl],[dir=rtl] .mdc-data-table__cell--checkbox,.mdc-data-table__cell--checkbox[dir=rtl]{padding-left:0;padding-right:16px}.mdc-data-table__sort-icon-button{color:rgba(0,0,0,.6)}.mdc-data-table__sort-icon-button::before,.mdc-data-table__sort-icon-button::after{background-color:rgba(0,0,0,.6)}.mdc-data-table__sort-icon-button:hover::before{opacity:.04}.mdc-data-table__sort-icon-button.mdc-ripple-upgraded--background-focused::before,.mdc-data-table__sort-icon-button:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:.12}.mdc-data-table__sort-icon-button:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-data-table__sort-icon-button:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:.12}.mdc-data-table__sort-icon-button.mdc-ripple-upgraded{--mdc-ripple-fg-opacity: 0.12}.mdc-data-table__header-cell--sorted .mdc-data-table__sort-icon-button{color:rgba(0,0,0,.87)}.mdc-data-table__header-cell--sorted .mdc-data-table__sort-icon-button::before,.mdc-data-table__header-cell--sorted .mdc-data-table__sort-icon-button::after{background-color:rgba(0,0,0,.87)}.mdc-data-table__header-cell--sorted .mdc-data-table__sort-icon-button:hover::before{opacity:.04}.mdc-data-table__header-cell--sorted .mdc-data-table__sort-icon-button.mdc-ripple-upgraded--background-focused::before,.mdc-data-table__header-cell--sorted .mdc-data-table__sort-icon-button:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:.12}.mdc-data-table__header-cell--sorted .mdc-data-table__sort-icon-button:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-data-table__header-cell--sorted .mdc-data-table__sort-icon-button:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:.12}.mdc-data-table__header-cell--sorted .mdc-data-table__sort-icon-button.mdc-ripple-upgraded{--mdc-ripple-fg-opacity: 0.12}.mdc-data-table__table-container{-webkit-overflow-scrolling:touch;overflow-x:auto;width:100%}.mdc-data-table__table{min-width:100%;border:0;white-space:nowrap;border-collapse:collapse;table-layout:fixed}.mdc-data-table__cell{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:PingFang SC,Microsoft YaHei, sans-serif;font-family:var(--mdc-typography-body2-font-family, var(--mdc-typography-font-family, PingFang SC, Microsoft YaHei, sans-serif));font-size:0.875rem;font-size:var(--mdc-typography-body2-font-size, 0.875rem);line-height:1.25rem;line-height:var(--mdc-typography-body2-line-height, 1.25rem);font-weight:400;font-weight:var(--mdc-typography-body2-font-weight, 400);letter-spacing:0.0178571429em;letter-spacing:var(--mdc-typography-body2-letter-spacing, 0.0178571429em);text-decoration:inherit;-webkit-text-decoration:var(--mdc-typography-body2-text-decoration, inherit);text-decoration:var(--mdc-typography-body2-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-body2-text-transform, inherit);box-sizing:border-box;overflow:hidden;text-align:left;text-overflow:ellipsis}[dir=rtl] .mdc-data-table__cell,.mdc-data-table__cell[dir=rtl]{text-align:right}.mdc-data-table__cell--numeric{text-align:right}[dir=rtl] .mdc-data-table__cell--numeric,.mdc-data-table__cell--numeric[dir=rtl]{text-align:left}.mdc-data-table__header-cell{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:PingFang SC,Microsoft YaHei, sans-serif;font-family:var(--mdc-typography-subtitle2-font-family, var(--mdc-typography-font-family, PingFang SC, Microsoft YaHei, sans-serif));font-size:0.875rem;font-size:var(--mdc-typography-subtitle2-font-size, 0.875rem);line-height:1.375rem;line-height:var(--mdc-typography-subtitle2-line-height, 1.375rem);font-weight:500;font-weight:var(--mdc-typography-subtitle2-font-weight, 500);letter-spacing:0.0071428571em;letter-spacing:var(--mdc-typography-subtitle2-letter-spacing, 0.0071428571em);text-decoration:inherit;-webkit-text-decoration:var(--mdc-typography-subtitle2-text-decoration, inherit);text-decoration:var(--mdc-typography-subtitle2-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-subtitle2-text-transform, inherit);box-sizing:border-box;text-align:left;text-overflow:ellipsis;overflow:hidden;outline:none}[dir=rtl] .mdc-data-table__header-cell,.mdc-data-table__header-cell[dir=rtl]{text-align:right}.mdc-data-table__header-cell--checkbox,.mdc-data-table__cell--checkbox{width:1px}.mdc-data-table__header-cell--numeric{text-align:right}[dir=rtl] .mdc-data-table__header-cell--numeric,.mdc-data-table__header-cell--numeric[dir=rtl]{text-align:left}.mdc-data-table__sort-icon-button{width:28px;height:28px;padding:2px;margin-left:4px;margin-right:0;transition:-webkit-transform 150ms 0ms cubic-bezier(0.4, 0, 0.2, 1);transition:transform 150ms 0ms cubic-bezier(0.4, 0, 0.2, 1);transition:transform 150ms 0ms cubic-bezier(0.4, 0, 0.2, 1), -webkit-transform 150ms 0ms cubic-bezier(0.4, 0, 0.2, 1);opacity:0}[dir=rtl] .mdc-data-table__sort-icon-button,.mdc-data-table__sort-icon-button[dir=rtl]{margin-left:0;margin-right:4px}.mdc-data-table__header-cell--numeric .mdc-data-table__sort-icon-button{margin-left:0;margin-right:4px}[dir=rtl] .mdc-data-table__header-cell--numeric .mdc-data-table__sort-icon-button,.mdc-data-table__header-cell--numeric .mdc-data-table__sort-icon-button[dir=rtl]{margin-left:4px;margin-right:0}.mdc-data-table__header-cell--sorted-descending .mdc-data-table__sort-icon-button{-webkit-transform:rotate(-180deg);transform:rotate(-180deg)}.mdc-data-table__sort-icon-button:focus,.mdc-data-table__header-cell:hover .mdc-data-table__sort-icon-button,.mdc-data-table__header-cell--sorted .mdc-data-table__sort-icon-button{opacity:1}.mdc-data-table__header-cell-wrapper{align-items:center;display:inline-flex;vertical-align:middle}.mdc-data-table__header-cell--with-sort{cursor:pointer}.mdc-data-table__progress-indicator{display:none;position:absolute;width:100%}.mdc-data-table--in-progress .mdc-data-table__progress-indicator{display:block}.mdc-data-table__scrim{background-color:#fff;background-color:var(--mdc-theme-surface, #fff);height:100%;opacity:.32;position:absolute;top:0;width:100%}.mdc-data-table__sort-status-label{clip:rect(1px, 1px, 1px, 1px);height:1px;overflow:hidden;position:absolute;white-space:nowrap;width:1px}.mdc-data-table__pagination{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:PingFang SC,Microsoft YaHei, sans-serif;font-family:var(--mdc-typography-body2-font-family, var(--mdc-typography-font-family, PingFang SC, Microsoft YaHei, sans-serif));font-size:0.875rem;font-size:var(--mdc-typography-body2-font-size, 0.875rem);line-height:1.25rem;line-height:var(--mdc-typography-body2-line-height, 1.25rem);font-weight:400;font-weight:var(--mdc-typography-body2-font-weight, 400);letter-spacing:0.0178571429em;letter-spacing:var(--mdc-typography-body2-letter-spacing, 0.0178571429em);text-decoration:inherit;-webkit-text-decoration:var(--mdc-typography-body2-text-decoration, inherit);text-decoration:var(--mdc-typography-body2-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-body2-text-transform, inherit);box-sizing:border-box;display:flex;justify-content:flex-end}.mdc-data-table__pagination-trailing{margin-left:4px;margin-right:0;align-items:center;display:flex;flex-wrap:wrap;justify-content:flex-end}[dir=rtl] .mdc-data-table__pagination-trailing,.mdc-data-table__pagination-trailing[dir=rtl]{margin-left:0;margin-right:4px}.mdc-data-table__pagination-navigation{align-items:center;display:flex}.mdc-data-table__pagination-button{margin-left:0;margin-right:4px}[dir=rtl] .mdc-data-table__pagination-button .mdc-button__icon,.mdc-data-table__pagination-button .mdc-button__icon[dir=rtl]{-webkit-transform:rotate(180deg);transform:rotate(180deg)}[dir=rtl] .mdc-data-table__pagination-button,.mdc-data-table__pagination-button[dir=rtl]{margin-left:4px;margin-right:0}.mdc-data-table__pagination-total{margin-left:14px;margin-right:36px;white-space:nowrap}[dir=rtl] .mdc-data-table__pagination-total,.mdc-data-table__pagination-total[dir=rtl]{margin-left:36px;margin-right:14px}.mdc-data-table__pagination-rows-per-page{margin-left:0;margin-right:22px;align-items:center;display:inline-flex}[dir=rtl] .mdc-data-table__pagination-rows-per-page,.mdc-data-table__pagination-rows-per-page[dir=rtl]{margin-left:22px;margin-right:0}.mdc-data-table__pagination-rows-per-page-label{margin-left:0;margin-right:12px;white-space:nowrap}[dir=rtl] .mdc-data-table__pagination-rows-per-page-label,.mdc-data-table__pagination-rows-per-page-label[dir=rtl]{margin-left:12px;margin-right:0}.mdc-data-table__pagination-rows-per-page-select{min-width:80px;min-width:80px;margin:8px 0}.mdc-data-table__pagination-rows-per-page-select .mdc-select__anchor{height:36px}.mdc-data-table__pagination-rows-per-page-select .mdc-select__anchor .mdc-floating-label--float-above{-webkit-transform:translateY(-27.25px) scale(1);transform:translateY(-27.25px) scale(1)}.mdc-data-table__pagination-rows-per-page-select .mdc-select__anchor .mdc-floating-label--float-above{font-size:.75rem}.mdc-data-table__pagination-rows-per-page-select .mdc-select__anchor.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-data-table__pagination-rows-per-page-select .mdc-select__anchor .mdc-notched-outline--upgraded .mdc-floating-label--float-above{-webkit-transform:translateY(-24.75px) scale(0.75);transform:translateY(-24.75px) scale(0.75)}.mdc-data-table__pagination-rows-per-page-select .mdc-select__anchor.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-data-table__pagination-rows-per-page-select .mdc-select__anchor .mdc-notched-outline--upgraded .mdc-floating-label--float-above{font-size:1rem}.mdc-data-table__pagination-rows-per-page-select .mdc-select__anchor .mdc-floating-label--shake{-webkit-animation:mdc-floating-label-shake-float-above-select-outlined-36px 250ms 1;animation:mdc-floating-label-shake-float-above-select-outlined-36px 250ms 1}@-webkit-keyframes mdc-floating-label-shake-float-above-select-outlined-36px{0%{-webkit-transform:translateX(calc(0 - 0%)) translateY(-24.75px) scale(0.75);transform:translateX(calc(0 - 0%)) translateY(-24.75px) scale(0.75)}33%{-webkit-animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);-webkit-transform:translateX(calc(4% - 0%)) translateY(-24.75px) scale(0.75);transform:translateX(calc(4% - 0%)) translateY(-24.75px) scale(0.75)}66%{-webkit-animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);-webkit-transform:translateX(calc(-4% - 0%)) translateY(-24.75px) scale(0.75);transform:translateX(calc(-4% - 0%)) translateY(-24.75px) scale(0.75)}100%{-webkit-transform:translateX(calc(0 - 0%)) translateY(-24.75px) scale(0.75);transform:translateX(calc(0 - 0%)) translateY(-24.75px) scale(0.75)}}@keyframes mdc-floating-label-shake-float-above-select-outlined-36px{0%{-webkit-transform:translateX(calc(0 - 0%)) translateY(-24.75px) scale(0.75);transform:translateX(calc(0 - 0%)) translateY(-24.75px) scale(0.75)}33%{-webkit-animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);-webkit-transform:translateX(calc(4% - 0%)) translateY(-24.75px) scale(0.75);transform:translateX(calc(4% - 0%)) translateY(-24.75px) scale(0.75)}66%{-webkit-animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);-webkit-transform:translateX(calc(-4% - 0%)) translateY(-24.75px) scale(0.75);transform:translateX(calc(-4% - 0%)) translateY(-24.75px) scale(0.75)}100%{-webkit-transform:translateX(calc(0 - 0%)) translateY(-24.75px) scale(0.75);transform:translateX(calc(0 - 0%)) translateY(-24.75px) scale(0.75)}}.mdc-data-table__pagination-rows-per-page-select .mdc-select__dropdown-icon{width:20px;height:20px}.mdc-data-table__pagination-rows-per-page-select.mdc-select--outlined .mdc-select__anchor :not(.mdc-notched-outline--notched) .mdc-notched-outline__notch{max-width:calc(100% - 56px)}.mdc-data-table__pagination-rows-per-page-select .mdc-list-item{height:36px}.mdc-data-table__header-row-checkbox .mdc-checkbox__native-control:checked~.mdc-checkbox__background::before,.mdc-data-table__header-row-checkbox .mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background::before,.mdc-data-table__header-row-checkbox .mdc-checkbox__native-control[data-indeterminate=true]~.mdc-checkbox__background::before,.mdc-data-table__row-checkbox .mdc-checkbox__native-control:checked~.mdc-checkbox__background::before,.mdc-data-table__row-checkbox .mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background::before,.mdc-data-table__row-checkbox .mdc-checkbox__native-control[data-indeterminate=true]~.mdc-checkbox__background::before{background-color:#6200ee;background-color:var(--mdc-theme-primary, #6200ee)}.mdc-data-table__header-row-checkbox.mdc-checkbox--selected .mdc-checkbox__ripple::before,.mdc-data-table__header-row-checkbox.mdc-checkbox--selected .mdc-checkbox__ripple::after,.mdc-data-table__row-checkbox.mdc-checkbox--selected .mdc-checkbox__ripple::before,.mdc-data-table__row-checkbox.mdc-checkbox--selected .mdc-checkbox__ripple::after{background-color:#6200ee;background-color:var(--mdc-theme-primary, #6200ee)}.mdc-data-table__header-row-checkbox.mdc-checkbox--selected:hover .mdc-checkbox__ripple::before,.mdc-data-table__row-checkbox.mdc-checkbox--selected:hover .mdc-checkbox__ripple::before{opacity:.04}.mdc-data-table__header-row-checkbox.mdc-checkbox--selected.mdc-ripple-upgraded--background-focused .mdc-checkbox__ripple::before,.mdc-data-table__header-row-checkbox.mdc-checkbox--selected:not(.mdc-ripple-upgraded):focus .mdc-checkbox__ripple::before,.mdc-data-table__row-checkbox.mdc-checkbox--selected.mdc-ripple-upgraded--background-focused .mdc-checkbox__ripple::before,.mdc-data-table__row-checkbox.mdc-checkbox--selected:not(.mdc-ripple-upgraded):focus .mdc-checkbox__ripple::before{transition-duration:75ms;opacity:.12}.mdc-data-table__header-row-checkbox.mdc-checkbox--selected:not(.mdc-ripple-upgraded) .mdc-checkbox__ripple::after,.mdc-data-table__row-checkbox.mdc-checkbox--selected:not(.mdc-ripple-upgraded) .mdc-checkbox__ripple::after{transition:opacity 150ms linear}.mdc-data-table__header-row-checkbox.mdc-checkbox--selected:not(.mdc-ripple-upgraded):active .mdc-checkbox__ripple::after,.mdc-data-table__row-checkbox.mdc-checkbox--selected:not(.mdc-ripple-upgraded):active .mdc-checkbox__ripple::after{transition-duration:75ms;opacity:.12}.mdc-data-table__header-row-checkbox.mdc-checkbox--selected.mdc-ripple-upgraded,.mdc-data-table__row-checkbox.mdc-checkbox--selected.mdc-ripple-upgraded{--mdc-ripple-fg-opacity: 0.12}.mdc-data-table__header-row-checkbox.mdc-ripple-upgraded--background-focused.mdc-checkbox--selected .mdc-checkbox__ripple::before,.mdc-data-table__header-row-checkbox.mdc-ripple-upgraded--background-focused.mdc-checkbox--selected .mdc-checkbox__ripple::after,.mdc-data-table__row-checkbox.mdc-ripple-upgraded--background-focused.mdc-checkbox--selected .mdc-checkbox__ripple::before,.mdc-data-table__row-checkbox.mdc-ripple-upgraded--background-focused.mdc-checkbox--selected .mdc-checkbox__ripple::after{background-color:#6200ee;background-color:var(--mdc-theme-primary, #6200ee)}.mdc-data-table__header-row-checkbox .mdc-checkbox__native-control:enabled:not(:checked):not(:indeterminate):not([data-indeterminate=true])~.mdc-checkbox__background,.mdc-data-table__row-checkbox .mdc-checkbox__native-control:enabled:not(:checked):not(:indeterminate):not([data-indeterminate=true])~.mdc-checkbox__background{border-color:rgba(0,0,0,.54);background-color:transparent}.mdc-data-table__header-row-checkbox .mdc-checkbox__native-control:enabled:checked~.mdc-checkbox__background,.mdc-data-table__header-row-checkbox .mdc-checkbox__native-control:enabled:indeterminate~.mdc-checkbox__background,.mdc-data-table__header-row-checkbox .mdc-checkbox__native-control[data-indeterminate=true]:enabled~.mdc-checkbox__background,.mdc-data-table__row-checkbox .mdc-checkbox__native-control:enabled:checked~.mdc-checkbox__background,.mdc-data-table__row-checkbox .mdc-checkbox__native-control:enabled:indeterminate~.mdc-checkbox__background,.mdc-data-table__row-checkbox .mdc-checkbox__native-control[data-indeterminate=true]:enabled~.mdc-checkbox__background{border-color:#6200ee;border-color:var(--mdc-theme-primary, #6200ee);background-color:#6200ee;background-color:var(--mdc-theme-primary, #6200ee)}@-webkit-keyframes mdc-checkbox-fade-in-background-8A000000primary00000000primary{0%{border-color:rgba(0,0,0,.54);background-color:transparent}50%{border-color:#6200ee;border-color:var(--mdc-theme-primary, #6200ee);background-color:#6200ee;background-color:var(--mdc-theme-primary, #6200ee)}}@keyframes mdc-checkbox-fade-in-background-8A000000primary00000000primary{0%{border-color:rgba(0,0,0,.54);background-color:transparent}50%{border-color:#6200ee;border-color:var(--mdc-theme-primary, #6200ee);background-color:#6200ee;background-color:var(--mdc-theme-primary, #6200ee)}}@-webkit-keyframes mdc-checkbox-fade-out-background-8A000000primary00000000primary{0%,80%{border-color:#6200ee;border-color:var(--mdc-theme-primary, #6200ee);background-color:#6200ee;background-color:var(--mdc-theme-primary, #6200ee)}100%{border-color:rgba(0,0,0,.54);background-color:transparent}}@keyframes mdc-checkbox-fade-out-background-8A000000primary00000000primary{0%,80%{border-color:#6200ee;border-color:var(--mdc-theme-primary, #6200ee);background-color:#6200ee;background-color:var(--mdc-theme-primary, #6200ee)}100%{border-color:rgba(0,0,0,.54);background-color:transparent}}.mdc-data-table__header-row-checkbox.mdc-checkbox--anim-unchecked-checked .mdc-checkbox__native-control:enabled~.mdc-checkbox__background,.mdc-data-table__header-row-checkbox.mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__native-control:enabled~.mdc-checkbox__background,.mdc-data-table__row-checkbox.mdc-checkbox--anim-unchecked-checked .mdc-checkbox__native-control:enabled~.mdc-checkbox__background,.mdc-data-table__row-checkbox.mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__native-control:enabled~.mdc-checkbox__background{-webkit-animation-name:mdc-checkbox-fade-in-background-8A000000primary00000000primary;animation-name:mdc-checkbox-fade-in-background-8A000000primary00000000primary}.mdc-data-table__header-row-checkbox.mdc-checkbox--anim-checked-unchecked .mdc-checkbox__native-control:enabled~.mdc-checkbox__background,.mdc-data-table__header-row-checkbox.mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__native-control:enabled~.mdc-checkbox__background,.mdc-data-table__row-checkbox.mdc-checkbox--anim-checked-unchecked .mdc-checkbox__native-control:enabled~.mdc-checkbox__background,.mdc-data-table__row-checkbox.mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__native-control:enabled~.mdc-checkbox__background{-webkit-animation-name:mdc-checkbox-fade-out-background-8A000000primary00000000primary;animation-name:mdc-checkbox-fade-out-background-8A000000primary00000000primary}.mdc-dialog,.mdc-dialog__scrim{position:fixed;top:0;left:0;align-items:center;justify-content:center;box-sizing:border-box;width:100%;height:100%}.mdc-dialog{display:none;z-index:7}.mdc-dialog .mdc-dialog__surface{background-color:#fff;background-color:var(--mdc-theme-surface, #fff)}.mdc-dialog .mdc-dialog__scrim{background-color:rgba(0,0,0,.32)}.mdc-dialog .mdc-dialog__title{color:rgba(0,0,0,.87)}.mdc-dialog .mdc-dialog__content{color:rgba(0,0,0,.6)}.mdc-dialog.mdc-dialog--scrollable .mdc-dialog__title,.mdc-dialog.mdc-dialog--scrollable .mdc-dialog__actions{border-color:rgba(0,0,0,.12)}.mdc-dialog .mdc-dialog__content{padding:20px 24px 20px 24px}.mdc-dialog .mdc-dialog__surface{min-width:280px}@media(max-width: 592px){.mdc-dialog .mdc-dialog__surface{max-width:calc(100vw - 32px)}}@media(min-width: 592px){.mdc-dialog .mdc-dialog__surface{max-width:560px}}.mdc-dialog .mdc-dialog__surface{max-height:calc(100% - 32px)}.mdc-dialog .mdc-dialog__surface{border-radius:4px;border-radius:var(--mdc-shape-medium, 4px)}.mdc-dialog__scrim{opacity:0;z-index:-1}.mdc-dialog__container{display:flex;flex-direction:row;align-items:center;justify-content:space-around;box-sizing:border-box;height:100%;-webkit-transform:scale(0.8);transform:scale(0.8);opacity:0;pointer-events:none}.mdc-dialog__surface{position:relative;box-shadow:0px 11px 15px -7px rgba(0, 0, 0, 0.2),0px 24px 38px 3px rgba(0, 0, 0, 0.14),0px 9px 46px 8px rgba(0,0,0,.12);display:flex;flex-direction:column;flex-grow:0;flex-shrink:0;box-sizing:border-box;max-width:100%;max-height:100%;pointer-events:auto;overflow-y:auto}.mdc-dialog__surface .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}.mdc-dialog[dir=rtl] .mdc-dialog__surface,[dir=rtl] .mdc-dialog .mdc-dialog__surface{text-align:right}.mdc-dialog__title{display:block;margin-top:0;line-height:normal;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:PingFang SC,Microsoft YaHei, sans-serif;font-family:var(--mdc-typography-headline6-font-family, var(--mdc-typography-font-family, PingFang SC, Microsoft YaHei, sans-serif));font-size:1.25rem;font-size:var(--mdc-typography-headline6-font-size, 1.25rem);line-height:2rem;line-height:var(--mdc-typography-headline6-line-height, 2rem);font-weight:500;font-weight:var(--mdc-typography-headline6-font-weight, 500);letter-spacing:0.0125em;letter-spacing:var(--mdc-typography-headline6-letter-spacing, 0.0125em);text-decoration:inherit;-webkit-text-decoration:var(--mdc-typography-headline6-text-decoration, inherit);text-decoration:var(--mdc-typography-headline6-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-headline6-text-transform, inherit);position:relative;flex-shrink:0;box-sizing:border-box;margin:0;padding:0 24px 9px;border-bottom:1px solid transparent}.mdc-dialog__title::before{display:inline-block;width:0;height:40px;content:"";vertical-align:0}.mdc-dialog[dir=rtl] .mdc-dialog__title,[dir=rtl] .mdc-dialog .mdc-dialog__title{text-align:right}.mdc-dialog--scrollable .mdc-dialog__title{padding-bottom:15px}.mdc-dialog__content{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:PingFang SC,Microsoft YaHei, sans-serif;font-family:var(--mdc-typography-body1-font-family, var(--mdc-typography-font-family, PingFang SC, Microsoft YaHei, sans-serif));font-size:1rem;font-size:var(--mdc-typography-body1-font-size, 1rem);line-height:1.5rem;line-height:var(--mdc-typography-body1-line-height, 1.5rem);font-weight:400;font-weight:var(--mdc-typography-body1-font-weight, 400);letter-spacing:0.03125em;letter-spacing:var(--mdc-typography-body1-letter-spacing, 0.03125em);text-decoration:inherit;-webkit-text-decoration:var(--mdc-typography-body1-text-decoration, inherit);text-decoration:var(--mdc-typography-body1-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-body1-text-transform, inherit);flex-grow:1;box-sizing:border-box;margin:0;overflow:auto;-webkit-overflow-scrolling:touch}.mdc-dialog__content>:first-child{margin-top:0}.mdc-dialog__content>:last-child{margin-bottom:0}.mdc-dialog__title+.mdc-dialog__content{padding-top:0}.mdc-dialog--scrollable .mdc-dialog__title+.mdc-dialog__content{padding-top:8px;padding-bottom:8px}.mdc-dialog__content .mdc-list:first-child:last-child{padding:6px 0 0}.mdc-dialog--scrollable .mdc-dialog__content .mdc-list:first-child:last-child{padding:0}.mdc-dialog__actions{display:flex;position:relative;flex-shrink:0;flex-wrap:wrap;align-items:center;justify-content:flex-end;box-sizing:border-box;min-height:52px;margin:0;padding:8px;border-top:1px solid transparent}.mdc-dialog--stacked .mdc-dialog__actions{flex-direction:column;align-items:flex-end}.mdc-dialog__button{margin-left:8px;margin-right:0;max-width:100%;text-align:right}[dir=rtl] .mdc-dialog__button,.mdc-dialog__button[dir=rtl]{margin-left:0;margin-right:8px}.mdc-dialog__button:first-child{margin-left:0;margin-right:0}[dir=rtl] .mdc-dialog__button:first-child,.mdc-dialog__button:first-child[dir=rtl]{margin-left:0;margin-right:0}.mdc-dialog[dir=rtl] .mdc-dialog__button,[dir=rtl] .mdc-dialog .mdc-dialog__button{text-align:left}.mdc-dialog--stacked .mdc-dialog__button:not(:first-child){margin-top:12px}.mdc-dialog--open,.mdc-dialog--opening,.mdc-dialog--closing{display:flex}.mdc-dialog--opening .mdc-dialog__scrim{transition:opacity 150ms linear}.mdc-dialog--opening .mdc-dialog__container{transition:opacity 75ms linear,-webkit-transform 150ms 0ms cubic-bezier(0, 0, 0.2, 1);transition:opacity 75ms linear,transform 150ms 0ms cubic-bezier(0, 0, 0.2, 1);transition:opacity 75ms linear,transform 150ms 0ms cubic-bezier(0, 0, 0.2, 1),-webkit-transform 150ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-dialog--closing .mdc-dialog__scrim,.mdc-dialog--closing .mdc-dialog__container{transition:opacity 75ms linear}.mdc-dialog--closing .mdc-dialog__container{-webkit-transform:none;transform:none}.mdc-dialog--open .mdc-dialog__scrim{opacity:1}.mdc-dialog--open .mdc-dialog__container{-webkit-transform:none;transform:none;opacity:1}.mdc-dialog-scroll-lock{overflow:hidden}.mdc-drawer{border-color:rgba(0,0,0,.12);background-color:#fff;border-top-left-radius:0;border-top-right-radius:0;border-top-right-radius:var(--mdc-shape-large, 0);border-bottom-right-radius:0;border-bottom-right-radius:var(--mdc-shape-large, 0);border-bottom-left-radius:0;z-index:6;width:256px;display:flex;flex-direction:column;flex-shrink:0;box-sizing:border-box;height:100%;border-right-width:1px;border-right-style:solid;overflow:hidden;transition-property:-webkit-transform;transition-property:transform;transition-property:transform, -webkit-transform;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1)}.mdc-drawer .mdc-drawer__title{color:rgba(0,0,0,.87)}.mdc-drawer .mdc-list-group__subheader{color:rgba(0,0,0,.6)}.mdc-drawer .mdc-drawer__subtitle{color:rgba(0,0,0,.6)}.mdc-drawer .mdc-list-item__graphic{color:rgba(0,0,0,.6)}.mdc-drawer .mdc-list-item{color:rgba(0,0,0,.87)}.mdc-drawer .mdc-list-item--activated .mdc-list-item__graphic{color:#6200ee}.mdc-drawer .mdc-list-item--activated{color:rgba(98,0,238,.87)}[dir=rtl] .mdc-drawer,.mdc-drawer[dir=rtl]{border-top-left-radius:0;border-top-left-radius:var(--mdc-shape-large, 0);border-top-right-radius:0;border-bottom-right-radius:0;border-bottom-left-radius:0;border-bottom-left-radius:var(--mdc-shape-large, 0)}.mdc-drawer .mdc-list-item{border-radius:4px;border-radius:var(--mdc-shape-small, 4px)}.mdc-drawer.mdc-drawer--open:not(.mdc-drawer--closing)+.mdc-drawer-app-content{margin-left:256px;margin-right:0}[dir=rtl] .mdc-drawer.mdc-drawer--open:not(.mdc-drawer--closing)+.mdc-drawer-app-content,.mdc-drawer.mdc-drawer--open:not(.mdc-drawer--closing)+.mdc-drawer-app-content[dir=rtl]{margin-left:0;margin-right:256px}[dir=rtl] .mdc-drawer,.mdc-drawer[dir=rtl]{border-right-width:0;border-left-width:1px;border-right-style:none;border-left-style:solid}.mdc-drawer .mdc-list-item{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:PingFang SC,Microsoft YaHei, sans-serif;font-family:var(--mdc-typography-subtitle2-font-family, var(--mdc-typography-font-family, PingFang SC, Microsoft YaHei, sans-serif));font-size:0.875rem;font-size:var(--mdc-typography-subtitle2-font-size, 0.875rem);line-height:1.375rem;line-height:var(--mdc-typography-subtitle2-line-height, 1.375rem);font-weight:500;font-weight:var(--mdc-typography-subtitle2-font-weight, 500);letter-spacing:0.0071428571em;letter-spacing:var(--mdc-typography-subtitle2-letter-spacing, 0.0071428571em);text-decoration:inherit;-webkit-text-decoration:var(--mdc-typography-subtitle2-text-decoration, inherit);text-decoration:var(--mdc-typography-subtitle2-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-subtitle2-text-transform, inherit);height:calc(48px - 2 * 4px);margin:8px 8px;padding:0 8px}.mdc-drawer .mdc-list-item:nth-child(1){margin-top:2px}.mdc-drawer .mdc-list-item:nth-last-child(1){margin-bottom:0}.mdc-drawer .mdc-list-group__subheader{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:PingFang SC,Microsoft YaHei, sans-serif;font-family:var(--mdc-typography-body2-font-family, var(--mdc-typography-font-family, PingFang SC, Microsoft YaHei, sans-serif));font-size:0.875rem;font-size:var(--mdc-typography-body2-font-size, 0.875rem);line-height:1.25rem;line-height:var(--mdc-typography-body2-line-height, 1.25rem);font-weight:400;font-weight:var(--mdc-typography-body2-font-weight, 400);letter-spacing:0.0178571429em;letter-spacing:var(--mdc-typography-body2-letter-spacing, 0.0178571429em);text-decoration:inherit;-webkit-text-decoration:var(--mdc-typography-body2-text-decoration, inherit);text-decoration:var(--mdc-typography-body2-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-body2-text-transform, inherit);display:block;margin-top:0;line-height:normal;margin:0;padding:0 16px}.mdc-drawer .mdc-list-group__subheader::before{display:inline-block;width:0;height:24px;content:"";vertical-align:0}.mdc-drawer .mdc-list-divider{margin:3px 0 4px}.mdc-drawer .mdc-list-item__text,.mdc-drawer .mdc-list-item__graphic{pointer-events:none}.mdc-drawer--animate{-webkit-transform:translateX(-100%);transform:translateX(-100%)}[dir=rtl] .mdc-drawer--animate,.mdc-drawer--animate[dir=rtl]{-webkit-transform:translateX(100%);transform:translateX(100%)}.mdc-drawer--opening{-webkit-transform:translateX(0);transform:translateX(0);transition-duration:250ms}[dir=rtl] .mdc-drawer--opening,.mdc-drawer--opening[dir=rtl]{-webkit-transform:translateX(0);transform:translateX(0)}.mdc-drawer--closing{-webkit-transform:translateX(-100%);transform:translateX(-100%);transition-duration:200ms}[dir=rtl] .mdc-drawer--closing,.mdc-drawer--closing[dir=rtl]{-webkit-transform:translateX(100%);transform:translateX(100%)}.mdc-drawer__header{flex-shrink:0;box-sizing:border-box;min-height:64px;padding:0 16px 4px}.mdc-drawer__title{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:PingFang SC,Microsoft YaHei, sans-serif;font-family:var(--mdc-typography-headline6-font-family, var(--mdc-typography-font-family, PingFang SC, Microsoft YaHei, sans-serif));font-size:1.25rem;font-size:var(--mdc-typography-headline6-font-size, 1.25rem);line-height:2rem;line-height:var(--mdc-typography-headline6-line-height, 2rem);font-weight:500;font-weight:var(--mdc-typography-headline6-font-weight, 500);letter-spacing:0.0125em;letter-spacing:var(--mdc-typography-headline6-letter-spacing, 0.0125em);text-decoration:inherit;-webkit-text-decoration:var(--mdc-typography-headline6-text-decoration, inherit);text-decoration:var(--mdc-typography-headline6-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-headline6-text-transform, inherit);display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-drawer__title::before{display:inline-block;width:0;height:36px;content:"";vertical-align:0}.mdc-drawer__title::after{display:inline-block;width:0;height:20px;content:"";vertical-align:-20px}.mdc-drawer__subtitle{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:PingFang SC,Microsoft YaHei, sans-serif;font-family:var(--mdc-typography-body2-font-family, var(--mdc-typography-font-family, PingFang SC, Microsoft YaHei, sans-serif));font-size:0.875rem;font-size:var(--mdc-typography-body2-font-size, 0.875rem);line-height:1.25rem;line-height:var(--mdc-typography-body2-line-height, 1.25rem);font-weight:400;font-weight:var(--mdc-typography-body2-font-weight, 400);letter-spacing:0.0178571429em;letter-spacing:var(--mdc-typography-body2-letter-spacing, 0.0178571429em);text-decoration:inherit;-webkit-text-decoration:var(--mdc-typography-body2-text-decoration, inherit);text-decoration:var(--mdc-typography-body2-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-body2-text-transform, inherit);display:block;margin-top:0;line-height:normal;margin-bottom:0}.mdc-drawer__subtitle::before{display:inline-block;width:0;height:20px;content:"";vertical-align:0}.mdc-drawer__content{height:100%;overflow-y:auto;-webkit-overflow-scrolling:touch}.mdc-drawer--dismissible{left:0;right:initial;display:none;position:absolute}[dir=rtl] .mdc-drawer--dismissible,.mdc-drawer--dismissible[dir=rtl]{left:initial;right:0}.mdc-drawer--dismissible.mdc-drawer--open{display:flex}.mdc-drawer-app-content{margin-left:0;margin-right:0;position:relative}[dir=rtl] .mdc-drawer-app-content,.mdc-drawer-app-content[dir=rtl]{margin-left:0;margin-right:0}.mdc-drawer--modal{box-shadow:0px 8px 10px -5px rgba(0, 0, 0, 0.2),0px 16px 24px 2px rgba(0, 0, 0, 0.14),0px 6px 30px 5px rgba(0,0,0,.12);left:0;right:initial;display:none;position:fixed}.mdc-drawer--modal+.mdc-drawer-scrim{background-color:rgba(0,0,0,.32)}[dir=rtl] .mdc-drawer--modal,.mdc-drawer--modal[dir=rtl]{left:initial;right:0}.mdc-drawer--modal.mdc-drawer--open{display:flex}.mdc-drawer-scrim{display:none;position:fixed;top:0;left:0;width:100%;height:100%;z-index:5;transition-property:opacity;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1)}.mdc-drawer--open+.mdc-drawer-scrim{display:block}.mdc-drawer--animate+.mdc-drawer-scrim{opacity:0}.mdc-drawer--opening+.mdc-drawer-scrim{transition-duration:250ms;opacity:1}.mdc-drawer--closing+.mdc-drawer-scrim{transition-duration:200ms;opacity:0}.mdc-elevation--z0{box-shadow:0px 0px 0px 0px rgba(0, 0, 0, 0.2),0px 0px 0px 0px rgba(0, 0, 0, 0.14),0px 0px 0px 0px rgba(0,0,0,.12)}.mdc-elevation--z1{box-shadow:0px 2px 1px -1px rgba(0, 0, 0, 0.2),0px 1px 1px 0px rgba(0, 0, 0, 0.14),0px 1px 3px 0px rgba(0,0,0,.12)}.mdc-elevation--z2{box-shadow:0px 3px 1px -2px rgba(0, 0, 0, 0.2),0px 2px 2px 0px rgba(0, 0, 0, 0.14),0px 1px 5px 0px rgba(0,0,0,.12)}.mdc-elevation--z3{box-shadow:0px 3px 3px -2px rgba(0, 0, 0, 0.2),0px 3px 4px 0px rgba(0, 0, 0, 0.14),0px 1px 8px 0px rgba(0,0,0,.12)}.mdc-elevation--z4{box-shadow:0px 2px 4px -1px rgba(0, 0, 0, 0.2),0px 4px 5px 0px rgba(0, 0, 0, 0.14),0px 1px 10px 0px rgba(0,0,0,.12)}.mdc-elevation--z5{box-shadow:0px 3px 5px -1px rgba(0, 0, 0, 0.2),0px 5px 8px 0px rgba(0, 0, 0, 0.14),0px 1px 14px 0px rgba(0,0,0,.12)}.mdc-elevation--z6{box-shadow:0px 3px 5px -1px rgba(0, 0, 0, 0.2),0px 6px 10px 0px rgba(0, 0, 0, 0.14),0px 1px 18px 0px rgba(0,0,0,.12)}.mdc-elevation--z7{box-shadow:0px 4px 5px -2px rgba(0, 0, 0, 0.2),0px 7px 10px 1px rgba(0, 0, 0, 0.14),0px 2px 16px 1px rgba(0,0,0,.12)}.mdc-elevation--z8{box-shadow:0px 5px 5px -3px rgba(0, 0, 0, 0.2),0px 8px 10px 1px rgba(0, 0, 0, 0.14),0px 3px 14px 2px rgba(0,0,0,.12)}.mdc-elevation--z9{box-shadow:0px 5px 6px -3px rgba(0, 0, 0, 0.2),0px 9px 12px 1px rgba(0, 0, 0, 0.14),0px 3px 16px 2px rgba(0,0,0,.12)}.mdc-elevation--z10{box-shadow:0px 6px 6px -3px rgba(0, 0, 0, 0.2),0px 10px 14px 1px rgba(0, 0, 0, 0.14),0px 4px 18px 3px rgba(0,0,0,.12)}.mdc-elevation--z11{box-shadow:0px 6px 7px -4px rgba(0, 0, 0, 0.2),0px 11px 15px 1px rgba(0, 0, 0, 0.14),0px 4px 20px 3px rgba(0,0,0,.12)}.mdc-elevation--z12{box-shadow:0px 7px 8px -4px rgba(0, 0, 0, 0.2),0px 12px 17px 2px rgba(0, 0, 0, 0.14),0px 5px 22px 4px rgba(0,0,0,.12)}.mdc-elevation--z13{box-shadow:0px 7px 8px -4px rgba(0, 0, 0, 0.2),0px 13px 19px 2px rgba(0, 0, 0, 0.14),0px 5px 24px 4px rgba(0,0,0,.12)}.mdc-elevation--z14{box-shadow:0px 7px 9px -4px rgba(0, 0, 0, 0.2),0px 14px 21px 2px rgba(0, 0, 0, 0.14),0px 5px 26px 4px rgba(0,0,0,.12)}.mdc-elevation--z15{box-shadow:0px 8px 9px -5px rgba(0, 0, 0, 0.2),0px 15px 22px 2px rgba(0, 0, 0, 0.14),0px 6px 28px 5px rgba(0,0,0,.12)}.mdc-elevation--z16{box-shadow:0px 8px 10px -5px rgba(0, 0, 0, 0.2),0px 16px 24px 2px rgba(0, 0, 0, 0.14),0px 6px 30px 5px rgba(0,0,0,.12)}.mdc-elevation--z17{box-shadow:0px 8px 11px -5px rgba(0, 0, 0, 0.2),0px 17px 26px 2px rgba(0, 0, 0, 0.14),0px 6px 32px 5px rgba(0,0,0,.12)}.mdc-elevation--z18{box-shadow:0px 9px 11px -5px rgba(0, 0, 0, 0.2),0px 18px 28px 2px rgba(0, 0, 0, 0.14),0px 7px 34px 6px rgba(0,0,0,.12)}.mdc-elevation--z19{box-shadow:0px 9px 12px -6px rgba(0, 0, 0, 0.2),0px 19px 29px 2px rgba(0, 0, 0, 0.14),0px 7px 36px 6px rgba(0,0,0,.12)}.mdc-elevation--z20{box-shadow:0px 10px 13px -6px rgba(0, 0, 0, 0.2),0px 20px 31px 3px rgba(0, 0, 0, 0.14),0px 8px 38px 7px rgba(0,0,0,.12)}.mdc-elevation--z21{box-shadow:0px 10px 13px -6px rgba(0, 0, 0, 0.2),0px 21px 33px 3px rgba(0, 0, 0, 0.14),0px 8px 40px 7px rgba(0,0,0,.12)}.mdc-elevation--z22{box-shadow:0px 10px 14px -6px rgba(0, 0, 0, 0.2),0px 22px 35px 3px rgba(0, 0, 0, 0.14),0px 8px 42px 7px rgba(0,0,0,.12)}.mdc-elevation--z23{box-shadow:0px 11px 14px -7px rgba(0, 0, 0, 0.2),0px 23px 36px 3px rgba(0, 0, 0, 0.14),0px 9px 44px 8px rgba(0,0,0,.12)}.mdc-elevation--z24{box-shadow:0px 11px 15px -7px rgba(0, 0, 0, 0.2),0px 24px 38px 3px rgba(0, 0, 0, 0.14),0px 9px 46px 8px rgba(0,0,0,.12)}.mdc-elevation-transition{transition:box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);will-change:box-shadow}.mdc-fab{position:relative;box-shadow:0px 3px 5px -1px rgba(0, 0, 0, 0.2),0px 6px 10px 0px rgba(0, 0, 0, 0.14),0px 1px 18px 0px rgba(0,0,0,.12);display:inline-flex;position:relative;align-items:center;justify-content:center;box-sizing:border-box;width:56px;height:56px;padding:0;border:none;fill:currentColor;text-decoration:none;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-moz-appearance:none;-webkit-appearance:none;overflow:visible;transition:box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1),opacity 15ms linear 30ms,-webkit-transform 270ms 0ms cubic-bezier(0, 0, 0.2, 1);transition:box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1),opacity 15ms linear 30ms,transform 270ms 0ms cubic-bezier(0, 0, 0.2, 1);transition:box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1),opacity 15ms linear 30ms,transform 270ms 0ms cubic-bezier(0, 0, 0.2, 1),-webkit-transform 270ms 0ms cubic-bezier(0, 0, 0.2, 1);background-color:#018786;background-color:var(--mdc-theme-secondary, #018786);color:#fff;color:var(--mdc-theme-on-secondary, #fff)}.mdc-fab .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}.mdc-fab:not(.mdc-fab--extended){border-radius:50%}.mdc-fab:not(.mdc-fab--extended) .mdc-fab__ripple{border-radius:50%}.mdc-fab::-moz-focus-inner{padding:0;border:0}.mdc-fab:hover,.mdc-fab:focus{box-shadow:0px 5px 5px -3px rgba(0, 0, 0, 0.2),0px 8px 10px 1px rgba(0, 0, 0, 0.14),0px 3px 14px 2px rgba(0,0,0,.12)}.mdc-fab:active{box-shadow:0px 7px 8px -4px rgba(0, 0, 0, 0.2),0px 12px 17px 2px rgba(0, 0, 0, 0.14),0px 5px 22px 4px rgba(0,0,0,.12)}.mdc-fab:active,.mdc-fab:focus{outline:none}.mdc-fab:hover{cursor:pointer}.mdc-fab>svg{width:100%}.mdc-fab .mdc-fab__icon{width:24px;height:24px;font-size:24px}.mdc-fab--mini{width:40px;height:40px}.mdc-fab--extended{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:PingFang SC,Microsoft YaHei, sans-serif;font-family:var(--mdc-typography-button-font-family, var(--mdc-typography-font-family, PingFang SC, Microsoft YaHei, sans-serif));font-size:0.875rem;font-size:var(--mdc-typography-button-font-size, 0.875rem);line-height:2.25rem;line-height:var(--mdc-typography-button-line-height, 2.25rem);font-weight:500;font-weight:var(--mdc-typography-button-font-weight, 500);letter-spacing:0.0892857143em;letter-spacing:var(--mdc-typography-button-letter-spacing, 0.0892857143em);text-decoration:none;-webkit-text-decoration:var(--mdc-typography-button-text-decoration, none);text-decoration:var(--mdc-typography-button-text-decoration, none);text-transform:uppercase;text-transform:var(--mdc-typography-button-text-transform, uppercase);border-radius:24px;padding:0 20px;width:auto;max-width:100%;height:48px;line-height:normal}.mdc-fab--extended .mdc-fab__ripple{border-radius:24px}.mdc-fab--extended .mdc-fab__icon{margin-left:-8px;margin-right:12px}[dir=rtl] .mdc-fab--extended .mdc-fab__icon,.mdc-fab--extended .mdc-fab__icon[dir=rtl]{margin-left:12px;margin-right:-8px}.mdc-fab--extended .mdc-fab__label+.mdc-fab__icon{margin-left:12px;margin-right:-8px}[dir=rtl] .mdc-fab--extended .mdc-fab__label+.mdc-fab__icon,.mdc-fab--extended .mdc-fab__label+.mdc-fab__icon[dir=rtl]{margin-left:-8px;margin-right:12px}.mdc-fab--touch{margin-top:4px;margin-bottom:4px;margin-right:4px;margin-left:4px}.mdc-fab--touch .mdc-fab__touch{position:absolute;top:50%;right:0;height:48px;left:50%;width:48px;-webkit-transform:translate(-50%, -50%);transform:translate(-50%, -50%)}.mdc-fab::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:1px solid transparent;border-radius:inherit;content:""}.mdc-fab__label{justify-content:flex-start;text-overflow:ellipsis;white-space:nowrap;overflow-x:hidden;overflow-y:visible}.mdc-fab__icon{transition:-webkit-transform 180ms 90ms cubic-bezier(0, 0, 0.2, 1);transition:transform 180ms 90ms cubic-bezier(0, 0, 0.2, 1);transition:transform 180ms 90ms cubic-bezier(0, 0, 0.2, 1), -webkit-transform 180ms 90ms cubic-bezier(0, 0, 0.2, 1);fill:currentColor;will-change:transform}.mdc-fab .mdc-fab__icon{display:inline-flex;align-items:center;justify-content:center}.mdc-fab--exited{-webkit-transform:scale(0);transform:scale(0);opacity:0;transition:opacity 15ms linear 150ms,-webkit-transform 180ms 0ms cubic-bezier(0.4, 0, 1, 1);transition:opacity 15ms linear 150ms,transform 180ms 0ms cubic-bezier(0.4, 0, 1, 1);transition:opacity 15ms linear 150ms,transform 180ms 0ms cubic-bezier(0.4, 0, 1, 1),-webkit-transform 180ms 0ms cubic-bezier(0.4, 0, 1, 1)}.mdc-fab--exited .mdc-fab__icon{-webkit-transform:scale(0);transform:scale(0);transition:-webkit-transform 135ms 0ms cubic-bezier(0.4, 0, 1, 1);transition:transform 135ms 0ms cubic-bezier(0.4, 0, 1, 1);transition:transform 135ms 0ms cubic-bezier(0.4, 0, 1, 1), -webkit-transform 135ms 0ms cubic-bezier(0.4, 0, 1, 1)}.mdc-fab{--mdc-ripple-fg-size: 0;--mdc-ripple-left: 0;--mdc-ripple-top: 0;--mdc-ripple-fg-scale: 1;--mdc-ripple-fg-translate-end: 0;--mdc-ripple-fg-translate-start: 0;-webkit-tap-highlight-color:rgba(0,0,0,0)}.mdc-fab .mdc-fab__ripple::before,.mdc-fab .mdc-fab__ripple::after{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:""}.mdc-fab .mdc-fab__ripple::before{transition:opacity 15ms linear,background-color 15ms linear;z-index:1}.mdc-fab.mdc-ripple-upgraded .mdc-fab__ripple::before{-webkit-transform:scale(var(--mdc-ripple-fg-scale, 1));transform:scale(var(--mdc-ripple-fg-scale, 1))}.mdc-fab.mdc-ripple-upgraded .mdc-fab__ripple::after{top:0;left:0;-webkit-transform:scale(0);transform:scale(0);-webkit-transform-origin:center center;transform-origin:center center}.mdc-fab.mdc-ripple-upgraded--unbounded .mdc-fab__ripple::after{top:var(--mdc-ripple-top, 0);left:var(--mdc-ripple-left, 0)}.mdc-fab.mdc-ripple-upgraded--foreground-activation .mdc-fab__ripple::after{-webkit-animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards;animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards}.mdc-fab.mdc-ripple-upgraded--foreground-deactivation .mdc-fab__ripple::after{-webkit-animation:mdc-ripple-fg-opacity-out 150ms;animation:mdc-ripple-fg-opacity-out 150ms;-webkit-transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1));transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}.mdc-fab .mdc-fab__ripple::before,.mdc-fab .mdc-fab__ripple::after{top:calc(50% - 100%);left:calc(50% - 100%);width:200%;height:200%}.mdc-fab.mdc-ripple-upgraded .mdc-fab__ripple::after{width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}.mdc-fab .mdc-fab__ripple::before,.mdc-fab .mdc-fab__ripple::after{background-color:#fff;background-color:var(--mdc-theme-on-secondary, #fff)}.mdc-fab:hover .mdc-fab__ripple::before{opacity:.08}.mdc-fab.mdc-ripple-upgraded--background-focused .mdc-fab__ripple::before,.mdc-fab:not(.mdc-ripple-upgraded):focus .mdc-fab__ripple::before{transition-duration:75ms;opacity:.24}.mdc-fab:not(.mdc-ripple-upgraded) .mdc-fab__ripple::after{transition:opacity 150ms linear}.mdc-fab:not(.mdc-ripple-upgraded):active .mdc-fab__ripple::after{transition-duration:75ms;opacity:.24}.mdc-fab.mdc-ripple-upgraded{--mdc-ripple-fg-opacity: 0.24}.mdc-fab .mdc-fab__ripple{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;overflow:hidden}.mdc-floating-label{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:PingFang SC,Microsoft YaHei, sans-serif;font-family:var(--mdc-typography-subtitle1-font-family, var(--mdc-typography-font-family, PingFang SC, Microsoft YaHei, sans-serif));font-size:1rem;font-size:var(--mdc-typography-subtitle1-font-size, 1rem);font-weight:400;font-weight:var(--mdc-typography-subtitle1-font-weight, 400);letter-spacing:0.009375em;letter-spacing:var(--mdc-typography-subtitle1-letter-spacing, 0.009375em);text-decoration:inherit;-webkit-text-decoration:var(--mdc-typography-subtitle1-text-decoration, inherit);text-decoration:var(--mdc-typography-subtitle1-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-subtitle1-text-transform, inherit);position:absolute;left:0;-webkit-transform-origin:left top;transform-origin:left top;line-height:1.15rem;text-align:left;text-overflow:ellipsis;white-space:nowrap;cursor:text;overflow:hidden;will-change:transform;transition:color 150ms cubic-bezier(0.4, 0, 0.2, 1),-webkit-transform 150ms cubic-bezier(0.4, 0, 0.2, 1);transition:transform 150ms cubic-bezier(0.4, 0, 0.2, 1),color 150ms cubic-bezier(0.4, 0, 0.2, 1);transition:transform 150ms cubic-bezier(0.4, 0, 0.2, 1),color 150ms cubic-bezier(0.4, 0, 0.2, 1),-webkit-transform 150ms cubic-bezier(0.4, 0, 0.2, 1)}[dir=rtl] .mdc-floating-label,.mdc-floating-label[dir=rtl]{right:0;left:auto;-webkit-transform-origin:right top;transform-origin:right top;text-align:right}.mdc-floating-label--float-above{cursor:auto}.mdc-floating-label--required::after{margin-left:1px;margin-right:0px;content:"*"}[dir=rtl] .mdc-floating-label--required::after,.mdc-floating-label--required[dir=rtl]::after{margin-left:0;margin-right:1px}.mdc-floating-label--float-above{-webkit-transform:translateY(-106%) scale(0.75);transform:translateY(-106%) scale(0.75)}.mdc-floating-label--shake{-webkit-animation:mdc-floating-label-shake-float-above-standard 250ms 1;animation:mdc-floating-label-shake-float-above-standard 250ms 1}@-webkit-keyframes mdc-floating-label-shake-float-above-standard{0%{-webkit-transform:translateX(calc(0 - 0%)) translateY(-106%) scale(0.75);transform:translateX(calc(0 - 0%)) translateY(-106%) scale(0.75)}33%{-webkit-animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);-webkit-transform:translateX(calc(4% - 0%)) translateY(-106%) scale(0.75);transform:translateX(calc(4% - 0%)) translateY(-106%) scale(0.75)}66%{-webkit-animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);-webkit-transform:translateX(calc(-4% - 0%)) translateY(-106%) scale(0.75);transform:translateX(calc(-4% - 0%)) translateY(-106%) scale(0.75)}100%{-webkit-transform:translateX(calc(0 - 0%)) translateY(-106%) scale(0.75);transform:translateX(calc(0 - 0%)) translateY(-106%) scale(0.75)}}@keyframes mdc-floating-label-shake-float-above-standard{0%{-webkit-transform:translateX(calc(0 - 0%)) translateY(-106%) scale(0.75);transform:translateX(calc(0 - 0%)) translateY(-106%) scale(0.75)}33%{-webkit-animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);-webkit-transform:translateX(calc(4% - 0%)) translateY(-106%) scale(0.75);transform:translateX(calc(4% - 0%)) translateY(-106%) scale(0.75)}66%{-webkit-animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);-webkit-transform:translateX(calc(-4% - 0%)) translateY(-106%) scale(0.75);transform:translateX(calc(-4% - 0%)) translateY(-106%) scale(0.75)}100%{-webkit-transform:translateX(calc(0 - 0%)) translateY(-106%) scale(0.75);transform:translateX(calc(0 - 0%)) translateY(-106%) scale(0.75)}}.mdc-form-field{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:PingFang SC,Microsoft YaHei, sans-serif;font-family:var(--mdc-typography-body2-font-family, var(--mdc-typography-font-family, PingFang SC, Microsoft YaHei, sans-serif));font-size:0.875rem;font-size:var(--mdc-typography-body2-font-size, 0.875rem);line-height:1.25rem;line-height:var(--mdc-typography-body2-line-height, 1.25rem);font-weight:400;font-weight:var(--mdc-typography-body2-font-weight, 400);letter-spacing:0.0178571429em;letter-spacing:var(--mdc-typography-body2-letter-spacing, 0.0178571429em);text-decoration:inherit;-webkit-text-decoration:var(--mdc-typography-body2-text-decoration, inherit);text-decoration:var(--mdc-typography-body2-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-body2-text-transform, inherit);color:rgba(0,0,0,.87);color:var(--mdc-theme-text-primary-on-background, rgba(0, 0, 0, 0.87));display:inline-flex;align-items:center;vertical-align:middle}.mdc-form-field>label{margin-left:0;margin-right:auto;padding-left:4px;padding-right:0;order:0}[dir=rtl] .mdc-form-field>label,.mdc-form-field>label[dir=rtl]{margin-left:auto;margin-right:0}[dir=rtl] .mdc-form-field>label,.mdc-form-field>label[dir=rtl]{padding-left:0;padding-right:4px}.mdc-form-field--nowrap>label{text-overflow:ellipsis;overflow:hidden;white-space:nowrap}.mdc-form-field--align-end>label{margin-left:auto;margin-right:0;padding-left:0;padding-right:4px;order:-1}[dir=rtl] .mdc-form-field--align-end>label,.mdc-form-field--align-end>label[dir=rtl]{margin-left:0;margin-right:auto}[dir=rtl] .mdc-form-field--align-end>label,.mdc-form-field--align-end>label[dir=rtl]{padding-left:4px;padding-right:0}.mdc-form-field--space-between{justify-content:space-between}.mdc-form-field--space-between>label{margin:0}[dir=rtl] .mdc-form-field--space-between>label,.mdc-form-field--space-between>label[dir=rtl]{margin:0}.mdc-icon-button{display:inline-block;position:relative;box-sizing:border-box;border:none;outline:none;background-color:transparent;fill:currentColor;color:inherit;font-size:24px;text-decoration:none;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;width:48px;height:48px;padding:12px}.mdc-icon-button svg,.mdc-icon-button img{width:24px;height:24px}.mdc-icon-button:disabled{color:rgba(0,0,0,.38);color:var(--mdc-theme-text-disabled-on-light, rgba(0, 0, 0, 0.38))}.mdc-icon-button:disabled{cursor:default;pointer-events:none}.mdc-icon-button__icon{display:inline-block}.mdc-icon-button__icon.mdc-icon-button__icon--on{display:none}.mdc-icon-button--on .mdc-icon-button__icon{display:none}.mdc-icon-button--on .mdc-icon-button__icon.mdc-icon-button__icon--on{display:inline-block}.mdc-icon-button{--mdc-ripple-fg-size: 0;--mdc-ripple-left: 0;--mdc-ripple-top: 0;--mdc-ripple-fg-scale: 1;--mdc-ripple-fg-translate-end: 0;--mdc-ripple-fg-translate-start: 0;-webkit-tap-highlight-color:rgba(0,0,0,0)}.mdc-icon-button::before,.mdc-icon-button::after{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:""}.mdc-icon-button::before{transition:opacity 15ms linear,background-color 15ms linear;z-index:1}.mdc-icon-button.mdc-ripple-upgraded::before{-webkit-transform:scale(var(--mdc-ripple-fg-scale, 1));transform:scale(var(--mdc-ripple-fg-scale, 1))}.mdc-icon-button.mdc-ripple-upgraded::after{top:0;left:0;-webkit-transform:scale(0);transform:scale(0);-webkit-transform-origin:center center;transform-origin:center center}.mdc-icon-button.mdc-ripple-upgraded--unbounded::after{top:var(--mdc-ripple-top, 0);left:var(--mdc-ripple-left, 0)}.mdc-icon-button.mdc-ripple-upgraded--foreground-activation::after{-webkit-animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards;animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards}.mdc-icon-button.mdc-ripple-upgraded--foreground-deactivation::after{-webkit-animation:mdc-ripple-fg-opacity-out 150ms;animation:mdc-ripple-fg-opacity-out 150ms;-webkit-transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1));transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}.mdc-icon-button::before,.mdc-icon-button::after{top:calc(50% - 50%);left:calc(50% - 50%);width:100%;height:100%}.mdc-icon-button.mdc-ripple-upgraded::before,.mdc-icon-button.mdc-ripple-upgraded::after{top:var(--mdc-ripple-top, calc(50% - 50%));left:var(--mdc-ripple-left, calc(50% - 50%));width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}.mdc-icon-button.mdc-ripple-upgraded::after{width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}.mdc-icon-button::before,.mdc-icon-button::after{background-color:#000}.mdc-icon-button:hover::before{opacity:.04}.mdc-icon-button.mdc-ripple-upgraded--background-focused::before,.mdc-icon-button:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:.12}.mdc-icon-button:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-icon-button:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:.12}.mdc-icon-button.mdc-ripple-upgraded{--mdc-ripple-fg-opacity: 0.12}.mdc-image-list{display:flex;flex-wrap:wrap;margin:0 auto;padding:0}.mdc-image-list__item,.mdc-image-list__image-aspect-container{position:relative;box-sizing:border-box}.mdc-image-list__item{list-style-type:none}.mdc-image-list__image{width:100%}.mdc-image-list__image-aspect-container .mdc-image-list__image{position:absolute;top:0;right:0;bottom:0;left:0;height:100%;background-repeat:no-repeat;background-position:center;background-size:cover}.mdc-image-list__image-aspect-container{padding-bottom:calc(100% / 1)}.mdc-image-list__image{border-radius:0}.mdc-image-list--with-text-protection .mdc-image-list__supporting{border-top-left-radius:0;border-top-right-radius:0;border-bottom-right-radius:0;border-bottom-left-radius:0}.mdc-image-list__supporting{color:rgba(0,0,0,.87);color:var(--mdc-theme-text-primary-on-background, rgba(0, 0, 0, 0.87));display:flex;align-items:center;justify-content:space-between;box-sizing:border-box;padding:8px 0;line-height:24px}.mdc-image-list__label{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:PingFang SC,Microsoft YaHei, sans-serif;font-family:var(--mdc-typography-subtitle1-font-family, var(--mdc-typography-font-family, PingFang SC, Microsoft YaHei, sans-serif));font-size:1rem;font-size:var(--mdc-typography-subtitle1-font-size, 1rem);line-height:1.75rem;line-height:var(--mdc-typography-subtitle1-line-height, 1.75rem);font-weight:400;font-weight:var(--mdc-typography-subtitle1-font-weight, 400);letter-spacing:0.009375em;letter-spacing:var(--mdc-typography-subtitle1-letter-spacing, 0.009375em);text-decoration:inherit;-webkit-text-decoration:var(--mdc-typography-subtitle1-text-decoration, inherit);text-decoration:var(--mdc-typography-subtitle1-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-subtitle1-text-transform, inherit);text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.mdc-image-list--with-text-protection .mdc-image-list__supporting{position:absolute;bottom:0;width:100%;height:48px;padding:0 16px;background:rgba(0,0,0,.6);color:#fff}.mdc-image-list--masonry{display:block}.mdc-image-list--masonry .mdc-image-list__item{-webkit-column-break-inside:avoid;break-inside:avoid-column}.mdc-image-list--masonry .mdc-image-list__image{display:block;height:auto}:root{--mdc-layout-grid-margin-desktop: 24px;--mdc-layout-grid-gutter-desktop: 24px;--mdc-layout-grid-column-width-desktop: 72px;--mdc-layout-grid-margin-tablet: 16px;--mdc-layout-grid-gutter-tablet: 16px;--mdc-layout-grid-column-width-tablet: 72px;--mdc-layout-grid-margin-phone: 16px;--mdc-layout-grid-gutter-phone: 16px;--mdc-layout-grid-column-width-phone: 72px}@media(min-width: 840px){.mdc-layout-grid{box-sizing:border-box;margin:0 auto;padding:24px;padding:var(--mdc-layout-grid-margin-desktop, 24px)}}@media(min-width: 600px)and (max-width: 839px){.mdc-layout-grid{box-sizing:border-box;margin:0 auto;padding:16px;padding:var(--mdc-layout-grid-margin-tablet, 16px)}}@media(max-width: 599px){.mdc-layout-grid{box-sizing:border-box;margin:0 auto;padding:16px;padding:var(--mdc-layout-grid-margin-phone, 16px)}}@media(min-width: 840px){.mdc-layout-grid__inner{display:flex;flex-flow:row wrap;align-items:stretch;margin:-12px;margin:calc(var(--mdc-layout-grid-gutter-desktop, 24px) / 2 * -1)}@supports(display: grid){.mdc-layout-grid__inner{display:grid;margin:0;grid-gap:24px;grid-gap:var(--mdc-layout-grid-gutter-desktop, 24px);grid-template-columns:repeat(12, minmax(0, 1fr))}}}@media(min-width: 600px)and (max-width: 839px){.mdc-layout-grid__inner{display:flex;flex-flow:row wrap;align-items:stretch;margin:-8px;margin:calc(var(--mdc-layout-grid-gutter-tablet, 16px) / 2 * -1)}@supports(display: grid){.mdc-layout-grid__inner{display:grid;margin:0;grid-gap:16px;grid-gap:var(--mdc-layout-grid-gutter-tablet, 16px);grid-template-columns:repeat(8, minmax(0, 1fr))}}}@media(max-width: 599px){.mdc-layout-grid__inner{display:flex;flex-flow:row wrap;align-items:stretch;margin:-8px;margin:calc(var(--mdc-layout-grid-gutter-phone, 16px) / 2 * -1)}@supports(display: grid){.mdc-layout-grid__inner{display:grid;margin:0;grid-gap:16px;grid-gap:var(--mdc-layout-grid-gutter-phone, 16px);grid-template-columns:repeat(4, minmax(0, 1fr))}}}@media(min-width: 840px){.mdc-layout-grid__cell{width:calc(33.3333333333% - 24px);width:calc(33.3333333333% - var(--mdc-layout-grid-gutter-desktop, 24px));box-sizing:border-box;margin:12px;margin:calc(var(--mdc-layout-grid-gutter-desktop, 24px) / 2)}@supports(display: grid){.mdc-layout-grid__cell{width:auto;grid-column-end:span 4}}@supports(display: grid){.mdc-layout-grid__cell{margin:0}}.mdc-layout-grid__cell--span-1,.mdc-layout-grid__cell--span-1-desktop{width:calc(8.3333333333% - 24px);width:calc(8.3333333333% - var(--mdc-layout-grid-gutter-desktop, 24px))}@supports(display: grid){.mdc-layout-grid__cell--span-1,.mdc-layout-grid__cell--span-1-desktop{width:auto;grid-column-end:span 1}}.mdc-layout-grid__cell--span-2,.mdc-layout-grid__cell--span-2-desktop{width:calc(16.6666666667% - 24px);width:calc(16.6666666667% - var(--mdc-layout-grid-gutter-desktop, 24px))}@supports(display: grid){.mdc-layout-grid__cell--span-2,.mdc-layout-grid__cell--span-2-desktop{width:auto;grid-column-end:span 2}}.mdc-layout-grid__cell--span-3,.mdc-layout-grid__cell--span-3-desktop{width:calc(25% - 24px);width:calc(25% - var(--mdc-layout-grid-gutter-desktop, 24px))}@supports(display: grid){.mdc-layout-grid__cell--span-3,.mdc-layout-grid__cell--span-3-desktop{width:auto;grid-column-end:span 3}}.mdc-layout-grid__cell--span-4,.mdc-layout-grid__cell--span-4-desktop{width:calc(33.3333333333% - 24px);width:calc(33.3333333333% - var(--mdc-layout-grid-gutter-desktop, 24px))}@supports(display: grid){.mdc-layout-grid__cell--span-4,.mdc-layout-grid__cell--span-4-desktop{width:auto;grid-column-end:span 4}}.mdc-layout-grid__cell--span-5,.mdc-layout-grid__cell--span-5-desktop{width:calc(41.6666666667% - 24px);width:calc(41.6666666667% - var(--mdc-layout-grid-gutter-desktop, 24px))}@supports(display: grid){.mdc-layout-grid__cell--span-5,.mdc-layout-grid__cell--span-5-desktop{width:auto;grid-column-end:span 5}}.mdc-layout-grid__cell--span-6,.mdc-layout-grid__cell--span-6-desktop{width:calc(50% - 24px);width:calc(50% - var(--mdc-layout-grid-gutter-desktop, 24px))}@supports(display: grid){.mdc-layout-grid__cell--span-6,.mdc-layout-grid__cell--span-6-desktop{width:auto;grid-column-end:span 6}}.mdc-layout-grid__cell--span-7,.mdc-layout-grid__cell--span-7-desktop{width:calc(58.3333333333% - 24px);width:calc(58.3333333333% - var(--mdc-layout-grid-gutter-desktop, 24px))}@supports(display: grid){.mdc-layout-grid__cell--span-7,.mdc-layout-grid__cell--span-7-desktop{width:auto;grid-column-end:span 7}}.mdc-layout-grid__cell--span-8,.mdc-layout-grid__cell--span-8-desktop{width:calc(66.6666666667% - 24px);width:calc(66.6666666667% - var(--mdc-layout-grid-gutter-desktop, 24px))}@supports(display: grid){.mdc-layout-grid__cell--span-8,.mdc-layout-grid__cell--span-8-desktop{width:auto;grid-column-end:span 8}}.mdc-layout-grid__cell--span-9,.mdc-layout-grid__cell--span-9-desktop{width:calc(75% - 24px);width:calc(75% - var(--mdc-layout-grid-gutter-desktop, 24px))}@supports(display: grid){.mdc-layout-grid__cell--span-9,.mdc-layout-grid__cell--span-9-desktop{width:auto;grid-column-end:span 9}}.mdc-layout-grid__cell--span-10,.mdc-layout-grid__cell--span-10-desktop{width:calc(83.3333333333% - 24px);width:calc(83.3333333333% - var(--mdc-layout-grid-gutter-desktop, 24px))}@supports(display: grid){.mdc-layout-grid__cell--span-10,.mdc-layout-grid__cell--span-10-desktop{width:auto;grid-column-end:span 10}}.mdc-layout-grid__cell--span-11,.mdc-layout-grid__cell--span-11-desktop{width:calc(91.6666666667% - 24px);width:calc(91.6666666667% - var(--mdc-layout-grid-gutter-desktop, 24px))}@supports(display: grid){.mdc-layout-grid__cell--span-11,.mdc-layout-grid__cell--span-11-desktop{width:auto;grid-column-end:span 11}}.mdc-layout-grid__cell--span-12,.mdc-layout-grid__cell--span-12-desktop{width:calc(100% - 24px);width:calc(100% - var(--mdc-layout-grid-gutter-desktop, 24px))}@supports(display: grid){.mdc-layout-grid__cell--span-12,.mdc-layout-grid__cell--span-12-desktop{width:auto;grid-column-end:span 12}}}@media(min-width: 600px)and (max-width: 839px){.mdc-layout-grid__cell{width:calc(50% - 16px);width:calc(50% - var(--mdc-layout-grid-gutter-tablet, 16px));box-sizing:border-box;margin:8px;margin:calc(var(--mdc-layout-grid-gutter-tablet, 16px) / 2)}@supports(display: grid){.mdc-layout-grid__cell{width:auto;grid-column-end:span 4}}@supports(display: grid){.mdc-layout-grid__cell{margin:0}}.mdc-layout-grid__cell--span-1,.mdc-layout-grid__cell--span-1-tablet{width:calc(12.5% - 16px);width:calc(12.5% - var(--mdc-layout-grid-gutter-tablet, 16px))}@supports(display: grid){.mdc-layout-grid__cell--span-1,.mdc-layout-grid__cell--span-1-tablet{width:auto;grid-column-end:span 1}}.mdc-layout-grid__cell--span-2,.mdc-layout-grid__cell--span-2-tablet{width:calc(25% - 16px);width:calc(25% - var(--mdc-layout-grid-gutter-tablet, 16px))}@supports(display: grid){.mdc-layout-grid__cell--span-2,.mdc-layout-grid__cell--span-2-tablet{width:auto;grid-column-end:span 2}}.mdc-layout-grid__cell--span-3,.mdc-layout-grid__cell--span-3-tablet{width:calc(37.5% - 16px);width:calc(37.5% - var(--mdc-layout-grid-gutter-tablet, 16px))}@supports(display: grid){.mdc-layout-grid__cell--span-3,.mdc-layout-grid__cell--span-3-tablet{width:auto;grid-column-end:span 3}}.mdc-layout-grid__cell--span-4,.mdc-layout-grid__cell--span-4-tablet{width:calc(50% - 16px);width:calc(50% - var(--mdc-layout-grid-gutter-tablet, 16px))}@supports(display: grid){.mdc-layout-grid__cell--span-4,.mdc-layout-grid__cell--span-4-tablet{width:auto;grid-column-end:span 4}}.mdc-layout-grid__cell--span-5,.mdc-layout-grid__cell--span-5-tablet{width:calc(62.5% - 16px);width:calc(62.5% - var(--mdc-layout-grid-gutter-tablet, 16px))}@supports(display: grid){.mdc-layout-grid__cell--span-5,.mdc-layout-grid__cell--span-5-tablet{width:auto;grid-column-end:span 5}}.mdc-layout-grid__cell--span-6,.mdc-layout-grid__cell--span-6-tablet{width:calc(75% - 16px);width:calc(75% - var(--mdc-layout-grid-gutter-tablet, 16px))}@supports(display: grid){.mdc-layout-grid__cell--span-6,.mdc-layout-grid__cell--span-6-tablet{width:auto;grid-column-end:span 6}}.mdc-layout-grid__cell--span-7,.mdc-layout-grid__cell--span-7-tablet{width:calc(87.5% - 16px);width:calc(87.5% - var(--mdc-layout-grid-gutter-tablet, 16px))}@supports(display: grid){.mdc-layout-grid__cell--span-7,.mdc-layout-grid__cell--span-7-tablet{width:auto;grid-column-end:span 7}}.mdc-layout-grid__cell--span-8,.mdc-layout-grid__cell--span-8-tablet{width:calc(100% - 16px);width:calc(100% - var(--mdc-layout-grid-gutter-tablet, 16px))}@supports(display: grid){.mdc-layout-grid__cell--span-8,.mdc-layout-grid__cell--span-8-tablet{width:auto;grid-column-end:span 8}}.mdc-layout-grid__cell--span-9,.mdc-layout-grid__cell--span-9-tablet{width:calc(100% - 16px);width:calc(100% - var(--mdc-layout-grid-gutter-tablet, 16px))}@supports(display: grid){.mdc-layout-grid__cell--span-9,.mdc-layout-grid__cell--span-9-tablet{width:auto;grid-column-end:span 8}}.mdc-layout-grid__cell--span-10,.mdc-layout-grid__cell--span-10-tablet{width:calc(100% - 16px);width:calc(100% - var(--mdc-layout-grid-gutter-tablet, 16px))}@supports(display: grid){.mdc-layout-grid__cell--span-10,.mdc-layout-grid__cell--span-10-tablet{width:auto;grid-column-end:span 8}}.mdc-layout-grid__cell--span-11,.mdc-layout-grid__cell--span-11-tablet{width:calc(100% - 16px);width:calc(100% - var(--mdc-layout-grid-gutter-tablet, 16px))}@supports(display: grid){.mdc-layout-grid__cell--span-11,.mdc-layout-grid__cell--span-11-tablet{width:auto;grid-column-end:span 8}}.mdc-layout-grid__cell--span-12,.mdc-layout-grid__cell--span-12-tablet{width:calc(100% - 16px);width:calc(100% - var(--mdc-layout-grid-gutter-tablet, 16px))}@supports(display: grid){.mdc-layout-grid__cell--span-12,.mdc-layout-grid__cell--span-12-tablet{width:auto;grid-column-end:span 8}}}@media(max-width: 599px){.mdc-layout-grid__cell{width:calc(100% - 16px);width:calc(100% - var(--mdc-layout-grid-gutter-phone, 16px));box-sizing:border-box;margin:8px;margin:calc(var(--mdc-layout-grid-gutter-phone, 16px) / 2)}@supports(display: grid){.mdc-layout-grid__cell{width:auto;grid-column-end:span 4}}@supports(display: grid){.mdc-layout-grid__cell{margin:0}}.mdc-layout-grid__cell--span-1,.mdc-layout-grid__cell--span-1-phone{width:calc(25% - 16px);width:calc(25% - var(--mdc-layout-grid-gutter-phone, 16px))}@supports(display: grid){.mdc-layout-grid__cell--span-1,.mdc-layout-grid__cell--span-1-phone{width:auto;grid-column-end:span 1}}.mdc-layout-grid__cell--span-2,.mdc-layout-grid__cell--span-2-phone{width:calc(50% - 16px);width:calc(50% - var(--mdc-layout-grid-gutter-phone, 16px))}@supports(display: grid){.mdc-layout-grid__cell--span-2,.mdc-layout-grid__cell--span-2-phone{width:auto;grid-column-end:span 2}}.mdc-layout-grid__cell--span-3,.mdc-layout-grid__cell--span-3-phone{width:calc(75% - 16px);width:calc(75% - var(--mdc-layout-grid-gutter-phone, 16px))}@supports(display: grid){.mdc-layout-grid__cell--span-3,.mdc-layout-grid__cell--span-3-phone{width:auto;grid-column-end:span 3}}.mdc-layout-grid__cell--span-4,.mdc-layout-grid__cell--span-4-phone{width:calc(100% - 16px);width:calc(100% - var(--mdc-layout-grid-gutter-phone, 16px))}@supports(display: grid){.mdc-layout-grid__cell--span-4,.mdc-layout-grid__cell--span-4-phone{width:auto;grid-column-end:span 4}}.mdc-layout-grid__cell--span-5,.mdc-layout-grid__cell--span-5-phone{width:calc(100% - 16px);width:calc(100% - var(--mdc-layout-grid-gutter-phone, 16px))}@supports(display: grid){.mdc-layout-grid__cell--span-5,.mdc-layout-grid__cell--span-5-phone{width:auto;grid-column-end:span 4}}.mdc-layout-grid__cell--span-6,.mdc-layout-grid__cell--span-6-phone{width:calc(100% - 16px);width:calc(100% - var(--mdc-layout-grid-gutter-phone, 16px))}@supports(display: grid){.mdc-layout-grid__cell--span-6,.mdc-layout-grid__cell--span-6-phone{width:auto;grid-column-end:span 4}}.mdc-layout-grid__cell--span-7,.mdc-layout-grid__cell--span-7-phone{width:calc(100% - 16px);width:calc(100% - var(--mdc-layout-grid-gutter-phone, 16px))}@supports(display: grid){.mdc-layout-grid__cell--span-7,.mdc-layout-grid__cell--span-7-phone{width:auto;grid-column-end:span 4}}.mdc-layout-grid__cell--span-8,.mdc-layout-grid__cell--span-8-phone{width:calc(100% - 16px);width:calc(100% - var(--mdc-layout-grid-gutter-phone, 16px))}@supports(display: grid){.mdc-layout-grid__cell--span-8,.mdc-layout-grid__cell--span-8-phone{width:auto;grid-column-end:span 4}}.mdc-layout-grid__cell--span-9,.mdc-layout-grid__cell--span-9-phone{width:calc(100% - 16px);width:calc(100% - var(--mdc-layout-grid-gutter-phone, 16px))}@supports(display: grid){.mdc-layout-grid__cell--span-9,.mdc-layout-grid__cell--span-9-phone{width:auto;grid-column-end:span 4}}.mdc-layout-grid__cell--span-10,.mdc-layout-grid__cell--span-10-phone{width:calc(100% - 16px);width:calc(100% - var(--mdc-layout-grid-gutter-phone, 16px))}@supports(display: grid){.mdc-layout-grid__cell--span-10,.mdc-layout-grid__cell--span-10-phone{width:auto;grid-column-end:span 4}}.mdc-layout-grid__cell--span-11,.mdc-layout-grid__cell--span-11-phone{width:calc(100% - 16px);width:calc(100% - var(--mdc-layout-grid-gutter-phone, 16px))}@supports(display: grid){.mdc-layout-grid__cell--span-11,.mdc-layout-grid__cell--span-11-phone{width:auto;grid-column-end:span 4}}.mdc-layout-grid__cell--span-12,.mdc-layout-grid__cell--span-12-phone{width:calc(100% - 16px);width:calc(100% - var(--mdc-layout-grid-gutter-phone, 16px))}@supports(display: grid){.mdc-layout-grid__cell--span-12,.mdc-layout-grid__cell--span-12-phone{width:auto;grid-column-end:span 4}}}.mdc-layout-grid__cell--order-1{order:1}.mdc-layout-grid__cell--order-2{order:2}.mdc-layout-grid__cell--order-3{order:3}.mdc-layout-grid__cell--order-4{order:4}.mdc-layout-grid__cell--order-5{order:5}.mdc-layout-grid__cell--order-6{order:6}.mdc-layout-grid__cell--order-7{order:7}.mdc-layout-grid__cell--order-8{order:8}.mdc-layout-grid__cell--order-9{order:9}.mdc-layout-grid__cell--order-10{order:10}.mdc-layout-grid__cell--order-11{order:11}.mdc-layout-grid__cell--order-12{order:12}.mdc-layout-grid__cell--align-top{align-self:flex-start}@supports(display: grid){.mdc-layout-grid__cell--align-top{align-self:start}}.mdc-layout-grid__cell--align-middle{align-self:center}.mdc-layout-grid__cell--align-bottom{align-self:flex-end}@supports(display: grid){.mdc-layout-grid__cell--align-bottom{align-self:end}}@media(min-width: 840px){.mdc-layout-grid--fixed-column-width{width:1176px;width:calc( var(--mdc-layout-grid-column-width-desktop, 72px) * 12 + var(--mdc-layout-grid-gutter-desktop, 24px) * 11 + var(--mdc-layout-grid-margin-desktop, 24px) * 2 )}}@media(min-width: 600px)and (max-width: 839px){.mdc-layout-grid--fixed-column-width{width:720px;width:calc( var(--mdc-layout-grid-column-width-tablet, 72px) * 8 + var(--mdc-layout-grid-gutter-tablet, 16px) * 7 + var(--mdc-layout-grid-margin-tablet, 16px) * 2 )}}@media(max-width: 599px){.mdc-layout-grid--fixed-column-width{width:368px;width:calc( var(--mdc-layout-grid-column-width-phone, 72px) * 4 + var(--mdc-layout-grid-gutter-phone, 16px) * 3 + var(--mdc-layout-grid-margin-phone, 16px) * 2 )}}.mdc-layout-grid--align-left{margin-right:auto;margin-left:0}.mdc-layout-grid--align-right{margin-right:0;margin-left:auto}.mdc-line-ripple::before,.mdc-line-ripple::after{position:absolute;bottom:0;left:0;width:100%;border-bottom-style:solid;content:""}.mdc-line-ripple::before{border-bottom-width:1px;z-index:1}.mdc-line-ripple::after{-webkit-transform:scaleX(0);transform:scaleX(0);border-bottom-width:2px;opacity:0;z-index:2}.mdc-line-ripple::after{transition:opacity 180ms cubic-bezier(0.4, 0, 0.2, 1),-webkit-transform 180ms cubic-bezier(0.4, 0, 0.2, 1);transition:transform 180ms cubic-bezier(0.4, 0, 0.2, 1),opacity 180ms cubic-bezier(0.4, 0, 0.2, 1);transition:transform 180ms cubic-bezier(0.4, 0, 0.2, 1),opacity 180ms cubic-bezier(0.4, 0, 0.2, 1),-webkit-transform 180ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-line-ripple--active::after{-webkit-transform:scaleX(1);transform:scaleX(1);opacity:1}.mdc-line-ripple--deactivating::after{opacity:0}@-webkit-keyframes mdc-linear-progress-primary-indeterminate-translate{0%{-webkit-transform:translateX(0);transform:translateX(0)}20%{-webkit-animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);-webkit-transform:translateX(0);transform:translateX(0)}59.15%{-webkit-animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);-webkit-transform:translateX(83.67142%);transform:translateX(83.67142%)}100%{-webkit-transform:translateX(200.611057%);transform:translateX(200.611057%)}}@keyframes mdc-linear-progress-primary-indeterminate-translate{0%{-webkit-transform:translateX(0);transform:translateX(0)}20%{-webkit-animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);-webkit-transform:translateX(0);transform:translateX(0)}59.15%{-webkit-animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);-webkit-transform:translateX(83.67142%);transform:translateX(83.67142%)}100%{-webkit-transform:translateX(200.611057%);transform:translateX(200.611057%)}}@-webkit-keyframes mdc-linear-progress-primary-indeterminate-scale{0%{-webkit-transform:scaleX(0.08);transform:scaleX(0.08)}36.65%{-webkit-animation-timing-function:cubic-bezier(0.334731, 0.12482, 0.785844, 1);animation-timing-function:cubic-bezier(0.334731, 0.12482, 0.785844, 1);-webkit-transform:scaleX(0.08);transform:scaleX(0.08)}69.15%{-webkit-animation-timing-function:cubic-bezier(0.06, 0.11, 0.6, 1);animation-timing-function:cubic-bezier(0.06, 0.11, 0.6, 1);-webkit-transform:scaleX(0.661479);transform:scaleX(0.661479)}100%{-webkit-transform:scaleX(0.08);transform:scaleX(0.08)}}@keyframes mdc-linear-progress-primary-indeterminate-scale{0%{-webkit-transform:scaleX(0.08);transform:scaleX(0.08)}36.65%{-webkit-animation-timing-function:cubic-bezier(0.334731, 0.12482, 0.785844, 1);animation-timing-function:cubic-bezier(0.334731, 0.12482, 0.785844, 1);-webkit-transform:scaleX(0.08);transform:scaleX(0.08)}69.15%{-webkit-animation-timing-function:cubic-bezier(0.06, 0.11, 0.6, 1);animation-timing-function:cubic-bezier(0.06, 0.11, 0.6, 1);-webkit-transform:scaleX(0.661479);transform:scaleX(0.661479)}100%{-webkit-transform:scaleX(0.08);transform:scaleX(0.08)}}@-webkit-keyframes mdc-linear-progress-secondary-indeterminate-translate{0%{-webkit-animation-timing-function:cubic-bezier(0.15, 0, 0.515058, 0.409685);animation-timing-function:cubic-bezier(0.15, 0, 0.515058, 0.409685);-webkit-transform:translateX(0);transform:translateX(0)}25%{-webkit-animation-timing-function:cubic-bezier(0.31033, 0.284058, 0.8, 0.733712);animation-timing-function:cubic-bezier(0.31033, 0.284058, 0.8, 0.733712);-webkit-transform:translateX(37.651913%);transform:translateX(37.651913%)}48.35%{-webkit-animation-timing-function:cubic-bezier(0.4, 0.627035, 0.6, 0.902026);animation-timing-function:cubic-bezier(0.4, 0.627035, 0.6, 0.902026);-webkit-transform:translateX(84.386165%);transform:translateX(84.386165%)}100%{-webkit-transform:translateX(160.277782%);transform:translateX(160.277782%)}}@keyframes mdc-linear-progress-secondary-indeterminate-translate{0%{-webkit-animation-timing-function:cubic-bezier(0.15, 0, 0.515058, 0.409685);animation-timing-function:cubic-bezier(0.15, 0, 0.515058, 0.409685);-webkit-transform:translateX(0);transform:translateX(0)}25%{-webkit-animation-timing-function:cubic-bezier(0.31033, 0.284058, 0.8, 0.733712);animation-timing-function:cubic-bezier(0.31033, 0.284058, 0.8, 0.733712);-webkit-transform:translateX(37.651913%);transform:translateX(37.651913%)}48.35%{-webkit-animation-timing-function:cubic-bezier(0.4, 0.627035, 0.6, 0.902026);animation-timing-function:cubic-bezier(0.4, 0.627035, 0.6, 0.902026);-webkit-transform:translateX(84.386165%);transform:translateX(84.386165%)}100%{-webkit-transform:translateX(160.277782%);transform:translateX(160.277782%)}}@-webkit-keyframes mdc-linear-progress-secondary-indeterminate-scale{0%{-webkit-animation-timing-function:cubic-bezier(0.205028, 0.057051, 0.57661, 0.453971);animation-timing-function:cubic-bezier(0.205028, 0.057051, 0.57661, 0.453971);-webkit-transform:scaleX(0.08);transform:scaleX(0.08)}19.15%{-webkit-animation-timing-function:cubic-bezier(0.152313, 0.196432, 0.648374, 1.004315);animation-timing-function:cubic-bezier(0.152313, 0.196432, 0.648374, 1.004315);-webkit-transform:scaleX(0.457104);transform:scaleX(0.457104)}44.15%{-webkit-animation-timing-function:cubic-bezier(0.257759, -0.003163, 0.211762, 1.38179);animation-timing-function:cubic-bezier(0.257759, -0.003163, 0.211762, 1.38179);-webkit-transform:scaleX(0.72796);transform:scaleX(0.72796)}100%{-webkit-transform:scaleX(0.08);transform:scaleX(0.08)}}@keyframes mdc-linear-progress-secondary-indeterminate-scale{0%{-webkit-animation-timing-function:cubic-bezier(0.205028, 0.057051, 0.57661, 0.453971);animation-timing-function:cubic-bezier(0.205028, 0.057051, 0.57661, 0.453971);-webkit-transform:scaleX(0.08);transform:scaleX(0.08)}19.15%{-webkit-animation-timing-function:cubic-bezier(0.152313, 0.196432, 0.648374, 1.004315);animation-timing-function:cubic-bezier(0.152313, 0.196432, 0.648374, 1.004315);-webkit-transform:scaleX(0.457104);transform:scaleX(0.457104)}44.15%{-webkit-animation-timing-function:cubic-bezier(0.257759, -0.003163, 0.211762, 1.38179);animation-timing-function:cubic-bezier(0.257759, -0.003163, 0.211762, 1.38179);-webkit-transform:scaleX(0.72796);transform:scaleX(0.72796)}100%{-webkit-transform:scaleX(0.08);transform:scaleX(0.08)}}@-webkit-keyframes mdc-linear-progress-buffering{from{-webkit-transform:rotate(180deg) translateX(-10px);transform:rotate(180deg) translateX(-10px)}}@keyframes mdc-linear-progress-buffering{from{-webkit-transform:rotate(180deg) translateX(-10px);transform:rotate(180deg) translateX(-10px)}}@-webkit-keyframes mdc-linear-progress-primary-indeterminate-translate-reverse{0%{-webkit-transform:translateX(0);transform:translateX(0)}20%{-webkit-animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);-webkit-transform:translateX(0);transform:translateX(0)}59.15%{-webkit-animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);-webkit-transform:translateX(-83.67142%);transform:translateX(-83.67142%)}100%{-webkit-transform:translateX(-200.611057%);transform:translateX(-200.611057%)}}@keyframes mdc-linear-progress-primary-indeterminate-translate-reverse{0%{-webkit-transform:translateX(0);transform:translateX(0)}20%{-webkit-animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);-webkit-transform:translateX(0);transform:translateX(0)}59.15%{-webkit-animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);-webkit-transform:translateX(-83.67142%);transform:translateX(-83.67142%)}100%{-webkit-transform:translateX(-200.611057%);transform:translateX(-200.611057%)}}@-webkit-keyframes mdc-linear-progress-secondary-indeterminate-translate-reverse{0%{-webkit-animation-timing-function:cubic-bezier(0.15, 0, 0.515058, 0.409685);animation-timing-function:cubic-bezier(0.15, 0, 0.515058, 0.409685);-webkit-transform:translateX(0);transform:translateX(0)}25%{-webkit-animation-timing-function:cubic-bezier(0.31033, 0.284058, 0.8, 0.733712);animation-timing-function:cubic-bezier(0.31033, 0.284058, 0.8, 0.733712);-webkit-transform:translateX(-37.651913%);transform:translateX(-37.651913%)}48.35%{-webkit-animation-timing-function:cubic-bezier(0.4, 0.627035, 0.6, 0.902026);animation-timing-function:cubic-bezier(0.4, 0.627035, 0.6, 0.902026);-webkit-transform:translateX(-84.386165%);transform:translateX(-84.386165%)}100%{-webkit-transform:translateX(-160.277782%);transform:translateX(-160.277782%)}}@keyframes mdc-linear-progress-secondary-indeterminate-translate-reverse{0%{-webkit-animation-timing-function:cubic-bezier(0.15, 0, 0.515058, 0.409685);animation-timing-function:cubic-bezier(0.15, 0, 0.515058, 0.409685);-webkit-transform:translateX(0);transform:translateX(0)}25%{-webkit-animation-timing-function:cubic-bezier(0.31033, 0.284058, 0.8, 0.733712);animation-timing-function:cubic-bezier(0.31033, 0.284058, 0.8, 0.733712);-webkit-transform:translateX(-37.651913%);transform:translateX(-37.651913%)}48.35%{-webkit-animation-timing-function:cubic-bezier(0.4, 0.627035, 0.6, 0.902026);animation-timing-function:cubic-bezier(0.4, 0.627035, 0.6, 0.902026);-webkit-transform:translateX(-84.386165%);transform:translateX(-84.386165%)}100%{-webkit-transform:translateX(-160.277782%);transform:translateX(-160.277782%)}}@-webkit-keyframes mdc-linear-progress-buffering-reverse{from{-webkit-transform:translateX(-10px);transform:translateX(-10px)}}@keyframes mdc-linear-progress-buffering-reverse{from{-webkit-transform:translateX(-10px);transform:translateX(-10px)}}.mdc-linear-progress{position:relative;width:100%;height:4px;-webkit-transform:translateZ(0);transform:translateZ(0);outline:1px solid transparent;overflow:hidden;transition:opacity 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-linear-progress__bar{position:absolute;width:100%;height:100%;-webkit-animation:none;animation:none;-webkit-transform-origin:top left;transform-origin:top left;transition:-webkit-transform 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1);transition:transform 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1);transition:transform 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1), -webkit-transform 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-linear-progress__bar-inner{display:inline-block;position:absolute;width:100%;-webkit-animation:none;animation:none;border-top:4px solid}.mdc-linear-progress__buffer{display:flex;position:absolute;width:100%;height:100%}.mdc-linear-progress__buffer-dots{background-repeat:repeat-x;background-size:10px 4px;flex:auto;-webkit-transform:rotate(180deg);transform:rotate(180deg);-webkit-animation:mdc-linear-progress-buffering 250ms infinite linear;animation:mdc-linear-progress-buffering 250ms infinite linear}.mdc-linear-progress__buffer-bar{flex:0 1 100%;transition:flex-basis 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-linear-progress__primary-bar{-webkit-transform:scaleX(0);transform:scaleX(0)}.mdc-linear-progress__secondary-bar{visibility:hidden}.mdc-linear-progress--indeterminate .mdc-linear-progress__bar{transition:none}.mdc-linear-progress--indeterminate .mdc-linear-progress__primary-bar{left:-145.166611%;-webkit-animation:mdc-linear-progress-primary-indeterminate-translate 2s infinite linear;animation:mdc-linear-progress-primary-indeterminate-translate 2s infinite linear}.mdc-linear-progress--indeterminate .mdc-linear-progress__primary-bar>.mdc-linear-progress__bar-inner{-webkit-animation:mdc-linear-progress-primary-indeterminate-scale 2s infinite linear;animation:mdc-linear-progress-primary-indeterminate-scale 2s infinite linear}.mdc-linear-progress--indeterminate .mdc-linear-progress__secondary-bar{left:-54.888891%;visibility:visible;-webkit-animation:mdc-linear-progress-secondary-indeterminate-translate 2s infinite linear;animation:mdc-linear-progress-secondary-indeterminate-translate 2s infinite linear}.mdc-linear-progress--indeterminate .mdc-linear-progress__secondary-bar>.mdc-linear-progress__bar-inner{-webkit-animation:mdc-linear-progress-secondary-indeterminate-scale 2s infinite linear;animation:mdc-linear-progress-secondary-indeterminate-scale 2s infinite linear}.mdc-linear-progress--reversed .mdc-linear-progress__bar{right:0;-webkit-transform-origin:center right;transform-origin:center right}.mdc-linear-progress--reversed .mdc-linear-progress__primary-bar{-webkit-animation-name:mdc-linear-progress-primary-indeterminate-translate-reverse;animation-name:mdc-linear-progress-primary-indeterminate-translate-reverse}.mdc-linear-progress--reversed .mdc-linear-progress__secondary-bar{-webkit-animation-name:mdc-linear-progress-secondary-indeterminate-translate-reverse;animation-name:mdc-linear-progress-secondary-indeterminate-translate-reverse}.mdc-linear-progress--reversed .mdc-linear-progress__buffer-dots{-webkit-animation:mdc-linear-progress-buffering-reverse 250ms infinite linear;animation:mdc-linear-progress-buffering-reverse 250ms infinite linear;order:0;-webkit-transform:rotate(0);transform:rotate(0)}.mdc-linear-progress--reversed .mdc-linear-progress__buffer-bar{order:1}.mdc-linear-progress--closed{opacity:0;-webkit-animation:none;animation:none}.mdc-linear-progress__bar-inner{border-color:#6200ee;border-color:var(--mdc-theme-primary, #6200ee)}.mdc-linear-progress__buffer-dots{background-image:url("data:image/svg+xml,%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' enable-background='new 0 0 5 2' xml:space='preserve' viewBox='0 0 5 2' preserveAspectRatio='none slice'%3E%3Ccircle cx='1' cy='1' r='1' fill='%23e6e6e6'/%3E%3C/svg%3E")}.mdc-linear-progress__buffer-bar{background-color:#e6e6e6}.mdc-linear-progress--indeterminate.mdc-linear-progress--reversed .mdc-linear-progress__primary-bar{right:-145.166611%;left:auto}.mdc-linear-progress--indeterminate.mdc-linear-progress--reversed .mdc-linear-progress__secondary-bar{right:-54.888891%;left:auto}.mdc-list{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:PingFang SC,Microsoft YaHei, sans-serif;font-family:var(--mdc-typography-subtitle1-font-family, var(--mdc-typography-font-family, PingFang SC, Microsoft YaHei, sans-serif));font-size:1rem;font-size:var(--mdc-typography-subtitle1-font-size, 1rem);line-height:1.75rem;line-height:var(--mdc-typography-subtitle1-line-height, 1.75rem);font-weight:400;font-weight:var(--mdc-typography-subtitle1-font-weight, 400);letter-spacing:0.009375em;letter-spacing:var(--mdc-typography-subtitle1-letter-spacing, 0.009375em);text-decoration:inherit;-webkit-text-decoration:var(--mdc-typography-subtitle1-text-decoration, inherit);text-decoration:var(--mdc-typography-subtitle1-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-subtitle1-text-transform, inherit);line-height:1.5rem;margin:0;padding:8px 0;list-style-type:none;color:rgba(0,0,0,.87);color:var(--mdc-theme-text-primary-on-background, rgba(0, 0, 0, 0.87))}.mdc-list:focus{outline:none}.mdc-list-item{height:48px}.mdc-list-item__secondary-text{color:rgba(0,0,0,.54);color:var(--mdc-theme-text-secondary-on-background, rgba(0, 0, 0, 0.54))}.mdc-list-item__graphic{background-color:transparent}.mdc-list-item__graphic{color:rgba(0,0,0,.38);color:var(--mdc-theme-text-icon-on-background, rgba(0, 0, 0, 0.38))}.mdc-list-item__meta{color:rgba(0,0,0,.38);color:var(--mdc-theme-text-hint-on-background, rgba(0, 0, 0, 0.38))}.mdc-list-group__subheader{color:rgba(0,0,0,.87);color:var(--mdc-theme-text-primary-on-background, rgba(0, 0, 0, 0.87))}.mdc-list-item--disabled .mdc-list-item__text{opacity:.38}.mdc-list-item--disabled .mdc-list-item__text,.mdc-list-item--disabled .mdc-list-item__primary-text,.mdc-list-item--disabled .mdc-list-item__secondary-text{color:#000;color:var(--mdc-theme-on-surface, #000)}.mdc-list-item--selected,.mdc-list-item--activated{color:#6200ee;color:var(--mdc-theme-primary, #6200ee)}.mdc-list-item--selected .mdc-list-item__graphic,.mdc-list-item--activated .mdc-list-item__graphic{color:#6200ee;color:var(--mdc-theme-primary, #6200ee)}.mdc-list--dense{padding-top:4px;padding-bottom:4px;font-size:.812rem}.mdc-list-item{display:flex;position:relative;align-items:center;justify-content:flex-start;overflow:hidden;padding:0;padding-left:16px;padding-right:16px;height:48px}.mdc-list-item:focus{outline:none}.mdc-list-item:not(.mdc-list-item--selected):focus::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:1px solid transparent;border-radius:inherit;content:""}.mdc-list-item.mdc-list-item--selected::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:3px double transparent;border-radius:inherit;content:""}[dir=rtl] .mdc-list-item,.mdc-list-item[dir=rtl]{padding-left:16px;padding-right:16px}.mdc-list--icon-list .mdc-list-item{padding-left:16px;padding-right:16px;height:56px}[dir=rtl] .mdc-list--icon-list .mdc-list-item,.mdc-list--icon-list .mdc-list-item[dir=rtl]{padding-left:16px;padding-right:16px}.mdc-list--avatar-list .mdc-list-item{padding-left:16px;padding-right:16px;height:56px}[dir=rtl] .mdc-list--avatar-list .mdc-list-item,.mdc-list--avatar-list .mdc-list-item[dir=rtl]{padding-left:16px;padding-right:16px}.mdc-list--thumbnail-list .mdc-list-item{padding-left:16px;padding-right:16px;height:56px}[dir=rtl] .mdc-list--thumbnail-list .mdc-list-item,.mdc-list--thumbnail-list .mdc-list-item[dir=rtl]{padding-left:16px;padding-right:16px}.mdc-list--image-list .mdc-list-item{padding-left:16px;padding-right:16px;height:72px}[dir=rtl] .mdc-list--image-list .mdc-list-item,.mdc-list--image-list .mdc-list-item[dir=rtl]{padding-left:16px;padding-right:16px}.mdc-list--video-list .mdc-list-item{padding-left:0px;padding-right:16px;height:72px}[dir=rtl] .mdc-list--video-list .mdc-list-item,.mdc-list--video-list .mdc-list-item[dir=rtl]{padding-left:16px;padding-right:0px}.mdc-list--dense .mdc-list-item__graphic{margin-left:0;margin-right:16px;width:20px;height:20px}[dir=rtl] .mdc-list--dense .mdc-list-item__graphic,.mdc-list--dense .mdc-list-item__graphic[dir=rtl]{margin-left:16px;margin-right:0}.mdc-list-item__graphic{flex-shrink:0;align-items:center;justify-content:center;fill:currentColor;-o-object-fit:cover;object-fit:cover;margin-left:0;margin-right:32px;width:24px;height:24px}[dir=rtl] .mdc-list-item__graphic,.mdc-list-item__graphic[dir=rtl]{margin-left:32px;margin-right:0}.mdc-list--icon-list .mdc-list-item__graphic{margin-left:0;margin-right:32px;width:24px;height:24px}[dir=rtl] .mdc-list--icon-list .mdc-list-item__graphic,.mdc-list--icon-list .mdc-list-item__graphic[dir=rtl]{margin-left:32px;margin-right:0}.mdc-list--avatar-list .mdc-list-item__graphic{margin-left:0;margin-right:16px;width:40px;height:40px;border-radius:50%}[dir=rtl] .mdc-list--avatar-list .mdc-list-item__graphic,.mdc-list--avatar-list .mdc-list-item__graphic[dir=rtl]{margin-left:16px;margin-right:0}.mdc-list--thumbnail-list .mdc-list-item__graphic{margin-left:0;margin-right:16px;width:40px;height:40px}[dir=rtl] .mdc-list--thumbnail-list .mdc-list-item__graphic,.mdc-list--thumbnail-list .mdc-list-item__graphic[dir=rtl]{margin-left:16px;margin-right:0}.mdc-list--image-list .mdc-list-item__graphic{margin-left:0;margin-right:16px;width:56px;height:56px}[dir=rtl] .mdc-list--image-list .mdc-list-item__graphic,.mdc-list--image-list .mdc-list-item__graphic[dir=rtl]{margin-left:16px;margin-right:0}.mdc-list--video-list .mdc-list-item__graphic{margin-left:0;margin-right:16px;width:100px;height:56px}[dir=rtl] .mdc-list--video-list .mdc-list-item__graphic,.mdc-list--video-list .mdc-list-item__graphic[dir=rtl]{margin-left:16px;margin-right:0}.mdc-list .mdc-list-item__graphic{display:inline-flex}.mdc-list-item__meta{margin-left:auto;margin-right:0}.mdc-list-item__meta:not(.material-icons){-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:PingFang SC,Microsoft YaHei, sans-serif;font-family:var(--mdc-typography-caption-font-family, var(--mdc-typography-font-family, PingFang SC, Microsoft YaHei, sans-serif));font-size:0.75rem;font-size:var(--mdc-typography-caption-font-size, 0.75rem);line-height:1.25rem;line-height:var(--mdc-typography-caption-line-height, 1.25rem);font-weight:400;font-weight:var(--mdc-typography-caption-font-weight, 400);letter-spacing:0.0333333333em;letter-spacing:var(--mdc-typography-caption-letter-spacing, 0.0333333333em);text-decoration:inherit;-webkit-text-decoration:var(--mdc-typography-caption-text-decoration, inherit);text-decoration:var(--mdc-typography-caption-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-caption-text-transform, inherit)}.mdc-list-item[dir=rtl] .mdc-list-item__meta,[dir=rtl] .mdc-list-item .mdc-list-item__meta{margin-left:0;margin-right:auto}.mdc-list-item__text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.mdc-list-item__text[for]{pointer-events:none}.mdc-list-item__primary-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item__primary-text::before{display:inline-block;width:0;height:28px;content:"";vertical-align:0}.mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:"";vertical-align:-20px}.mdc-list--video-list .mdc-list-item__primary-text,.mdc-list--image-list .mdc-list-item__primary-text,.mdc-list--thumbnail-list .mdc-list-item__primary-text,.mdc-list--avatar-list .mdc-list-item__primary-text,.mdc-list--icon-list .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list--video-list .mdc-list-item__primary-text::before,.mdc-list--image-list .mdc-list-item__primary-text::before,.mdc-list--thumbnail-list .mdc-list-item__primary-text::before,.mdc-list--avatar-list .mdc-list-item__primary-text::before,.mdc-list--icon-list .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:"";vertical-align:0}.mdc-list--video-list .mdc-list-item__primary-text::after,.mdc-list--image-list .mdc-list-item__primary-text::after,.mdc-list--thumbnail-list .mdc-list-item__primary-text::after,.mdc-list--avatar-list .mdc-list-item__primary-text::after,.mdc-list--icon-list .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:"";vertical-align:-20px}.mdc-list--dense .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list--dense .mdc-list-item__primary-text::before{display:inline-block;width:0;height:24px;content:"";vertical-align:0}.mdc-list--dense .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:"";vertical-align:-20px}.mdc-list-item__secondary-text{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:PingFang SC,Microsoft YaHei, sans-serif;font-family:var(--mdc-typography-body2-font-family, var(--mdc-typography-font-family, PingFang SC, Microsoft YaHei, sans-serif));font-size:0.875rem;font-size:var(--mdc-typography-body2-font-size, 0.875rem);line-height:1.25rem;line-height:var(--mdc-typography-body2-line-height, 1.25rem);font-weight:400;font-weight:var(--mdc-typography-body2-font-weight, 400);letter-spacing:0.0178571429em;letter-spacing:var(--mdc-typography-body2-letter-spacing, 0.0178571429em);text-decoration:inherit;-webkit-text-decoration:var(--mdc-typography-body2-text-decoration, inherit);text-decoration:var(--mdc-typography-body2-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-body2-text-transform, inherit);text-overflow:ellipsis;white-space:nowrap;overflow:hidden;display:block;margin-top:0;line-height:normal}.mdc-list-item__secondary-text::before{display:inline-block;width:0;height:20px;content:"";vertical-align:0}.mdc-list--dense .mdc-list-item__secondary-text{font-size:inherit}.mdc-list--dense .mdc-list-item{height:40px}.mdc-list--two-line .mdc-list-item__text{align-self:flex-start}.mdc-list--two-line .mdc-list-item{height:64px}.mdc-list--two-line.mdc-list--video-list .mdc-list-item,.mdc-list--two-line.mdc-list--image-list .mdc-list-item,.mdc-list--two-line.mdc-list--thumbnail-list .mdc-list-item,.mdc-list--two-line.mdc-list--avatar-list .mdc-list-item,.mdc-list--two-line.mdc-list--icon-list .mdc-list-item{height:72px}.mdc-list--two-line.mdc-list--icon-list .mdc-list-item__graphic{align-self:flex-start;margin-top:16px}.mdc-list--two-line.mdc-list--dense .mdc-list-item,.mdc-list--avatar-list.mdc-list--dense .mdc-list-item{height:60px}.mdc-list--avatar-list.mdc-list--dense .mdc-list-item__graphic{margin-left:0;margin-right:16px;width:36px;height:36px}[dir=rtl] .mdc-list--avatar-list.mdc-list--dense .mdc-list-item__graphic,.mdc-list--avatar-list.mdc-list--dense .mdc-list-item__graphic[dir=rtl]{margin-left:16px;margin-right:0}:not(.mdc-list-item--disabled).mdc-list-item{cursor:pointer}a.mdc-list-item{color:inherit;text-decoration:none}.mdc-list-divider{height:0;margin:0;border:none;border-bottom-width:1px;border-bottom-style:solid}.mdc-list-divider{border-bottom-color:rgba(0,0,0,.12)}.mdc-list-divider--padded{margin-left:16px;margin-right:0;width:calc(100% - 32px)}[dir=rtl] .mdc-list-divider--padded,.mdc-list-divider--padded[dir=rtl]{margin-left:0;margin-right:16px}.mdc-list-divider--inset{margin-left:72px;margin-right:0;width:calc(100% - 72px)}[dir=rtl] .mdc-list-divider--inset,.mdc-list-divider--inset[dir=rtl]{margin-left:0;margin-right:72px}.mdc-list-divider--inset.mdc-list-divider--padded{margin-left:72px;margin-right:0;width:calc(100% - 88px)}[dir=rtl] .mdc-list-divider--inset.mdc-list-divider--padded,.mdc-list-divider--inset.mdc-list-divider--padded[dir=rtl]{margin-left:0;margin-right:72px}.mdc-list .mdc-list-divider--inset-leading{margin-left:16px;margin-right:0;width:calc(100% - 16px)}[dir=rtl] .mdc-list .mdc-list-divider--inset-leading,.mdc-list .mdc-list-divider--inset-leading[dir=rtl]{margin-left:0;margin-right:16px}.mdc-list .mdc-list-divider--inset-trailing{width:calc(100% - 16px)}.mdc-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing{margin-left:16px;margin-right:0;width:calc(100% - 32px)}[dir=rtl] .mdc-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing,.mdc-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing[dir=rtl]{margin-left:0;margin-right:16px}.mdc-list .mdc-list-divider--inset-leading.mdc-list-divider--padding{margin-left:16px;margin-right:0;width:calc(100% - 16px)}[dir=rtl] .mdc-list .mdc-list-divider--inset-leading.mdc-list-divider--padding,.mdc-list .mdc-list-divider--inset-leading.mdc-list-divider--padding[dir=rtl]{margin-left:0;margin-right:16px}.mdc-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding{margin-left:16px;margin-right:0;width:calc(100% - 32px)}[dir=rtl] .mdc-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding,.mdc-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding[dir=rtl]{margin-left:0;margin-right:16px}.mdc-list--icon-list .mdc-list-divider--inset-leading{margin-left:72px;margin-right:0;width:calc(100% - 72px)}[dir=rtl] .mdc-list--icon-list .mdc-list-divider--inset-leading,.mdc-list--icon-list .mdc-list-divider--inset-leading[dir=rtl]{margin-left:0;margin-right:72px}.mdc-list--icon-list .mdc-list-divider--inset-trailing{width:calc(100% - 16px)}.mdc-list--icon-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing{margin-left:72px;margin-right:0;width:calc(100% - 88px)}[dir=rtl] .mdc-list--icon-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing,.mdc-list--icon-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing[dir=rtl]{margin-left:0;margin-right:72px}.mdc-list--icon-list .mdc-list-divider--inset-leading.mdc-list-divider--padding{margin-left:16px;margin-right:0;width:calc(100% - 16px)}[dir=rtl] .mdc-list--icon-list .mdc-list-divider--inset-leading.mdc-list-divider--padding,.mdc-list--icon-list .mdc-list-divider--inset-leading.mdc-list-divider--padding[dir=rtl]{margin-left:0;margin-right:16px}.mdc-list--icon-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding{margin-left:16px;margin-right:0;width:calc(100% - 32px)}[dir=rtl] .mdc-list--icon-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding,.mdc-list--icon-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding[dir=rtl]{margin-left:0;margin-right:16px}.mdc-list--avatar-list .mdc-list-divider--inset-leading{margin-left:72px;margin-right:0;width:calc(100% - 72px)}[dir=rtl] .mdc-list--avatar-list .mdc-list-divider--inset-leading,.mdc-list--avatar-list .mdc-list-divider--inset-leading[dir=rtl]{margin-left:0;margin-right:72px}.mdc-list--avatar-list .mdc-list-divider--inset-trailing{width:calc(100% - 16px)}.mdc-list--avatar-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing{margin-left:72px;margin-right:0;width:calc(100% - 88px)}[dir=rtl] .mdc-list--avatar-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing,.mdc-list--avatar-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing[dir=rtl]{margin-left:0;margin-right:72px}.mdc-list--avatar-list .mdc-list-divider--inset-leading.mdc-list-divider--padding{margin-left:16px;margin-right:0;width:calc(100% - 16px)}[dir=rtl] .mdc-list--avatar-list .mdc-list-divider--inset-leading.mdc-list-divider--padding,.mdc-list--avatar-list .mdc-list-divider--inset-leading.mdc-list-divider--padding[dir=rtl]{margin-left:0;margin-right:16px}.mdc-list--avatar-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding{margin-left:16px;margin-right:0;width:calc(100% - 32px)}[dir=rtl] .mdc-list--avatar-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding,.mdc-list--avatar-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding[dir=rtl]{margin-left:0;margin-right:16px}.mdc-list--thumbnail-list .mdc-list-divider--inset-leading{margin-left:72px;margin-right:0;width:calc(100% - 72px)}[dir=rtl] .mdc-list--thumbnail-list .mdc-list-divider--inset-leading,.mdc-list--thumbnail-list .mdc-list-divider--inset-leading[dir=rtl]{margin-left:0;margin-right:72px}.mdc-list--thumbnail-list .mdc-list-divider--inset-trailing{width:calc(100% - 16px)}.mdc-list--thumbnail-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing{margin-left:72px;margin-right:0;width:calc(100% - 88px)}[dir=rtl] .mdc-list--thumbnail-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing,.mdc-list--thumbnail-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing[dir=rtl]{margin-left:0;margin-right:72px}.mdc-list--thumbnail-list .mdc-list-divider--inset-leading.mdc-list-divider--padding{margin-left:16px;margin-right:0;width:calc(100% - 16px)}[dir=rtl] .mdc-list--thumbnail-list .mdc-list-divider--inset-leading.mdc-list-divider--padding,.mdc-list--thumbnail-list .mdc-list-divider--inset-leading.mdc-list-divider--padding[dir=rtl]{margin-left:0;margin-right:16px}.mdc-list--thumbnail-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding{margin-left:16px;margin-right:0;width:calc(100% - 32px)}[dir=rtl] .mdc-list--thumbnail-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding,.mdc-list--thumbnail-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding[dir=rtl]{margin-left:0;margin-right:16px}.mdc-list--image-list .mdc-list-divider--inset-leading{margin-left:88px;margin-right:0;width:calc(100% - 88px)}[dir=rtl] .mdc-list--image-list .mdc-list-divider--inset-leading,.mdc-list--image-list .mdc-list-divider--inset-leading[dir=rtl]{margin-left:0;margin-right:88px}.mdc-list--image-list .mdc-list-divider--inset-trailing{width:calc(100% - 16px)}.mdc-list--image-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing{margin-left:88px;margin-right:0;width:calc(100% - 104px)}[dir=rtl] .mdc-list--image-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing,.mdc-list--image-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing[dir=rtl]{margin-left:0;margin-right:88px}.mdc-list--image-list .mdc-list-divider--inset-leading.mdc-list-divider--padding{margin-left:16px;margin-right:0;width:calc(100% - 16px)}[dir=rtl] .mdc-list--image-list .mdc-list-divider--inset-leading.mdc-list-divider--padding,.mdc-list--image-list .mdc-list-divider--inset-leading.mdc-list-divider--padding[dir=rtl]{margin-left:0;margin-right:16px}.mdc-list--image-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding{margin-left:16px;margin-right:0;width:calc(100% - 32px)}[dir=rtl] .mdc-list--image-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding,.mdc-list--image-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding[dir=rtl]{margin-left:0;margin-right:16px}.mdc-list--video-list .mdc-list-divider--inset-leading{margin-left:116px;margin-right:0;width:calc(100% - 116px)}[dir=rtl] .mdc-list--video-list .mdc-list-divider--inset-leading,.mdc-list--video-list .mdc-list-divider--inset-leading[dir=rtl]{margin-left:0;margin-right:116px}.mdc-list--video-list .mdc-list-divider--inset-trailing{width:calc(100% - 16px)}.mdc-list--video-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing{margin-left:116px;margin-right:0;width:calc(100% - 132px)}[dir=rtl] .mdc-list--video-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing,.mdc-list--video-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing[dir=rtl]{margin-left:0;margin-right:116px}.mdc-list--video-list .mdc-list-divider--inset-leading.mdc-list-divider--padding{margin-left:0px;margin-right:0;width:calc(100% - 0px)}[dir=rtl] .mdc-list--video-list .mdc-list-divider--inset-leading.mdc-list-divider--padding,.mdc-list--video-list .mdc-list-divider--inset-leading.mdc-list-divider--padding[dir=rtl]{margin-left:0;margin-right:0px}.mdc-list--video-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding{margin-left:0px;margin-right:0;width:calc(100% - 16px)}[dir=rtl] .mdc-list--video-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding,.mdc-list--video-list .mdc-list-divider--inset-leading.mdc-list-divider--inset-trailing.mdc-list-divider--inset-padding[dir=rtl]{margin-left:0;margin-right:0px}.mdc-list-group .mdc-list{padding:0}.mdc-list-group__subheader{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:PingFang SC,Microsoft YaHei, sans-serif;font-family:var(--mdc-typography-subtitle1-font-family, var(--mdc-typography-font-family, PingFang SC, Microsoft YaHei, sans-serif));font-size:1rem;font-size:var(--mdc-typography-subtitle1-font-size, 1rem);line-height:1.75rem;line-height:var(--mdc-typography-subtitle1-line-height, 1.75rem);font-weight:400;font-weight:var(--mdc-typography-subtitle1-font-weight, 400);letter-spacing:0.009375em;letter-spacing:var(--mdc-typography-subtitle1-letter-spacing, 0.009375em);text-decoration:inherit;-webkit-text-decoration:var(--mdc-typography-subtitle1-text-decoration, inherit);text-decoration:var(--mdc-typography-subtitle1-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-subtitle1-text-transform, inherit);margin:calc((3rem - 1.5rem) / 2) 16px}:not(.mdc-list-item--disabled).mdc-list-item{--mdc-ripple-fg-size: 0;--mdc-ripple-left: 0;--mdc-ripple-top: 0;--mdc-ripple-fg-scale: 1;--mdc-ripple-fg-translate-end: 0;--mdc-ripple-fg-translate-start: 0;-webkit-tap-highlight-color:rgba(0,0,0,0)}:not(.mdc-list-item--disabled).mdc-list-item .mdc-list-item__ripple::before,:not(.mdc-list-item--disabled).mdc-list-item .mdc-list-item__ripple::after{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:""}:not(.mdc-list-item--disabled).mdc-list-item .mdc-list-item__ripple::before{transition:opacity 15ms linear,background-color 15ms linear;z-index:1}:not(.mdc-list-item--disabled).mdc-list-item.mdc-ripple-upgraded .mdc-list-item__ripple::before{-webkit-transform:scale(var(--mdc-ripple-fg-scale, 1));transform:scale(var(--mdc-ripple-fg-scale, 1))}:not(.mdc-list-item--disabled).mdc-list-item.mdc-ripple-upgraded .mdc-list-item__ripple::after{top:0;left:0;-webkit-transform:scale(0);transform:scale(0);-webkit-transform-origin:center center;transform-origin:center center}:not(.mdc-list-item--disabled).mdc-list-item.mdc-ripple-upgraded--unbounded .mdc-list-item__ripple::after{top:var(--mdc-ripple-top, 0);left:var(--mdc-ripple-left, 0)}:not(.mdc-list-item--disabled).mdc-list-item.mdc-ripple-upgraded--foreground-activation .mdc-list-item__ripple::after{-webkit-animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards;animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards}:not(.mdc-list-item--disabled).mdc-list-item.mdc-ripple-upgraded--foreground-deactivation .mdc-list-item__ripple::after{-webkit-animation:mdc-ripple-fg-opacity-out 150ms;animation:mdc-ripple-fg-opacity-out 150ms;-webkit-transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1));transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}:not(.mdc-list-item--disabled).mdc-list-item .mdc-list-item__ripple::before,:not(.mdc-list-item--disabled).mdc-list-item .mdc-list-item__ripple::after{top:calc(50% - 100%);left:calc(50% - 100%);width:200%;height:200%}:not(.mdc-list-item--disabled).mdc-list-item.mdc-ripple-upgraded .mdc-list-item__ripple::after{width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}:not(.mdc-list-item--disabled).mdc-list-item .mdc-list-item__ripple::before,:not(.mdc-list-item--disabled).mdc-list-item .mdc-list-item__ripple::after{background-color:#000}:not(.mdc-list-item--disabled).mdc-list-item:hover .mdc-list-item__ripple::before{opacity:.04}:not(.mdc-list-item--disabled).mdc-list-item.mdc-ripple-upgraded--background-focused .mdc-list-item__ripple::before,:not(.mdc-list-item--disabled).mdc-list-item:not(.mdc-ripple-upgraded):focus .mdc-list-item__ripple::before{transition-duration:75ms;opacity:.12}:not(.mdc-list-item--disabled).mdc-list-item:not(.mdc-ripple-upgraded) .mdc-list-item__ripple::after{transition:opacity 150ms linear}:not(.mdc-list-item--disabled).mdc-list-item:not(.mdc-ripple-upgraded):active .mdc-list-item__ripple::after{transition-duration:75ms;opacity:.12}:not(.mdc-list-item--disabled).mdc-list-item.mdc-ripple-upgraded{--mdc-ripple-fg-opacity: 0.12}:not(.mdc-list-item--disabled).mdc-list-item--activated .mdc-list-item__ripple::before{opacity:.12}:not(.mdc-list-item--disabled).mdc-list-item--activated .mdc-list-item__ripple::before,:not(.mdc-list-item--disabled).mdc-list-item--activated .mdc-list-item__ripple::after{background-color:#6200ee;background-color:var(--mdc-theme-primary, #6200ee)}:not(.mdc-list-item--disabled).mdc-list-item--activated:hover .mdc-list-item__ripple::before{opacity:.16}:not(.mdc-list-item--disabled).mdc-list-item--activated.mdc-ripple-upgraded--background-focused .mdc-list-item__ripple::before,:not(.mdc-list-item--disabled).mdc-list-item--activated:not(.mdc-ripple-upgraded):focus .mdc-list-item__ripple::before{transition-duration:75ms;opacity:.24}:not(.mdc-list-item--disabled).mdc-list-item--activated:not(.mdc-ripple-upgraded) .mdc-list-item__ripple::after{transition:opacity 150ms linear}:not(.mdc-list-item--disabled).mdc-list-item--activated:not(.mdc-ripple-upgraded):active .mdc-list-item__ripple::after{transition-duration:75ms;opacity:.24}:not(.mdc-list-item--disabled).mdc-list-item--activated.mdc-ripple-upgraded{--mdc-ripple-fg-opacity: 0.24}:not(.mdc-list-item--disabled).mdc-list-item--selected .mdc-list-item__ripple::before{opacity:.08}:not(.mdc-list-item--disabled).mdc-list-item--selected .mdc-list-item__ripple::before,:not(.mdc-list-item--disabled).mdc-list-item--selected .mdc-list-item__ripple::after{background-color:#6200ee;background-color:var(--mdc-theme-primary, #6200ee)}:not(.mdc-list-item--disabled).mdc-list-item--selected:hover .mdc-list-item__ripple::before{opacity:.12}:not(.mdc-list-item--disabled).mdc-list-item--selected.mdc-ripple-upgraded--background-focused .mdc-list-item__ripple::before,:not(.mdc-list-item--disabled).mdc-list-item--selected:not(.mdc-ripple-upgraded):focus .mdc-list-item__ripple::before{transition-duration:75ms;opacity:.2}:not(.mdc-list-item--disabled).mdc-list-item--selected:not(.mdc-ripple-upgraded) .mdc-list-item__ripple::after{transition:opacity 150ms linear}:not(.mdc-list-item--disabled).mdc-list-item--selected:not(.mdc-ripple-upgraded):active .mdc-list-item__ripple::after{transition-duration:75ms;opacity:.2}:not(.mdc-list-item--disabled).mdc-list-item--selected.mdc-ripple-upgraded{--mdc-ripple-fg-opacity: 0.2}:not(.mdc-list-item--disabled).mdc-list-item .mdc-list-item__ripple{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none}.mdc-list-item--disabled{--mdc-ripple-fg-size: 0;--mdc-ripple-left: 0;--mdc-ripple-top: 0;--mdc-ripple-fg-scale: 1;--mdc-ripple-fg-translate-end: 0;--mdc-ripple-fg-translate-start: 0;-webkit-tap-highlight-color:rgba(0,0,0,0)}.mdc-list-item--disabled .mdc-list-item__ripple::before,.mdc-list-item--disabled .mdc-list-item__ripple::after{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:""}.mdc-list-item--disabled .mdc-list-item__ripple::before{transition:opacity 15ms linear,background-color 15ms linear;z-index:1}.mdc-list-item--disabled.mdc-ripple-upgraded .mdc-list-item__ripple::before{-webkit-transform:scale(var(--mdc-ripple-fg-scale, 1));transform:scale(var(--mdc-ripple-fg-scale, 1))}.mdc-list-item--disabled.mdc-ripple-upgraded .mdc-list-item__ripple::after{top:0;left:0;-webkit-transform:scale(0);transform:scale(0);-webkit-transform-origin:center center;transform-origin:center center}.mdc-list-item--disabled.mdc-ripple-upgraded--unbounded .mdc-list-item__ripple::after{top:var(--mdc-ripple-top, 0);left:var(--mdc-ripple-left, 0)}.mdc-list-item--disabled.mdc-ripple-upgraded--foreground-activation .mdc-list-item__ripple::after{-webkit-animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards;animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards}.mdc-list-item--disabled.mdc-ripple-upgraded--foreground-deactivation .mdc-list-item__ripple::after{-webkit-animation:mdc-ripple-fg-opacity-out 150ms;animation:mdc-ripple-fg-opacity-out 150ms;-webkit-transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1));transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}.mdc-list-item--disabled .mdc-list-item__ripple::before,.mdc-list-item--disabled .mdc-list-item__ripple::after{top:calc(50% - 100%);left:calc(50% - 100%);width:200%;height:200%}.mdc-list-item--disabled.mdc-ripple-upgraded .mdc-list-item__ripple::after{width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}.mdc-list-item--disabled .mdc-list-item__ripple::before,.mdc-list-item--disabled .mdc-list-item__ripple::after{background-color:#000}.mdc-list-item--disabled.mdc-ripple-upgraded--background-focused .mdc-list-item__ripple::before,.mdc-list-item--disabled:not(.mdc-ripple-upgraded):focus .mdc-list-item__ripple::before{transition-duration:75ms;opacity:.12}.mdc-list-item--disabled .mdc-list-item__ripple{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none}.mdc-menu{min-width:112px}.mdc-menu .mdc-list-item__meta{color:rgba(0,0,0,.87)}.mdc-menu .mdc-list-item__graphic{color:rgba(0,0,0,.87)}.mdc-menu .mdc-list{color:rgba(0,0,0,.87);position:relative}.mdc-menu .mdc-list .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}.mdc-menu .mdc-list-divider{margin:8px 0}.mdc-menu .mdc-list-item{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.mdc-menu .mdc-list-item--disabled{cursor:auto}.mdc-menu a.mdc-list-item .mdc-list-item__text,.mdc-menu a.mdc-list-item .mdc-list-item__graphic{pointer-events:none}.mdc-menu__selection-group{padding:0;fill:currentColor}.mdc-menu__selection-group .mdc-list-item{padding-left:56px;padding-right:16px}[dir=rtl] .mdc-menu__selection-group .mdc-list-item,.mdc-menu__selection-group .mdc-list-item[dir=rtl]{padding-left:16px;padding-right:56px}.mdc-menu__selection-group .mdc-menu__selection-group-icon{left:16px;right:initial;display:none;position:absolute;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%)}[dir=rtl] .mdc-menu__selection-group .mdc-menu__selection-group-icon,.mdc-menu__selection-group .mdc-menu__selection-group-icon[dir=rtl]{left:initial;right:16px}.mdc-menu-item--selected .mdc-menu__selection-group-icon{display:inline}.mdc-menu-surface{display:none;position:absolute;box-sizing:border-box;max-width:calc(100vw - 32px);max-height:calc(100vh - 32px);margin:0;padding:0;-webkit-transform:scale(1);transform:scale(1);-webkit-transform-origin:top left;transform-origin:top left;opacity:0;overflow:auto;will-change:transform,opacity;z-index:8;transition:opacity .03s linear,-webkit-transform .12s cubic-bezier(0, 0, 0.2, 1);transition:opacity .03s linear,transform .12s cubic-bezier(0, 0, 0.2, 1);transition:opacity .03s linear,transform .12s cubic-bezier(0, 0, 0.2, 1),-webkit-transform .12s cubic-bezier(0, 0, 0.2, 1);box-shadow:0px 5px 5px -3px rgba(0, 0, 0, 0.2),0px 8px 10px 1px rgba(0, 0, 0, 0.14),0px 3px 14px 2px rgba(0,0,0,.12);background-color:#fff;background-color:var(--mdc-theme-surface, #fff);color:#000;color:var(--mdc-theme-on-surface, #000);border-radius:4px;border-radius:var(--mdc-shape-medium, 4px);transform-origin-left:top left;transform-origin-right:top right}.mdc-menu-surface:focus{outline:none}.mdc-menu-surface--open{display:inline-block;-webkit-transform:scale(1);transform:scale(1);opacity:1}.mdc-menu-surface--animating-open{display:inline-block;-webkit-transform:scale(0.8);transform:scale(0.8);opacity:0}.mdc-menu-surface--animating-closed{display:inline-block;opacity:0;transition:opacity .075s linear}[dir=rtl] .mdc-menu-surface,.mdc-menu-surface[dir=rtl]{transform-origin-left:top right;transform-origin-right:top left}.mdc-menu-surface--anchor{position:relative;overflow:visible}.mdc-menu-surface--fixed{position:fixed}.mdc-menu-surface--fullwidth{width:100%}.mdc-notched-outline{display:flex;position:absolute;top:0;right:0;left:0;box-sizing:border-box;width:100%;max-width:100%;height:100%;text-align:left;pointer-events:none}[dir=rtl] .mdc-notched-outline,.mdc-notched-outline[dir=rtl]{text-align:right}.mdc-notched-outline__leading,.mdc-notched-outline__notch,.mdc-notched-outline__trailing{box-sizing:border-box;height:100%;border-top:1px solid;border-bottom:1px solid;pointer-events:none}.mdc-notched-outline__leading{border-left:1px solid;border-right:none;width:12px}[dir=rtl] .mdc-notched-outline__leading,.mdc-notched-outline__leading[dir=rtl]{border-left:none;border-right:1px solid}.mdc-notched-outline__trailing{border-left:none;border-right:1px solid;flex-grow:1}[dir=rtl] .mdc-notched-outline__trailing,.mdc-notched-outline__trailing[dir=rtl]{border-left:1px solid;border-right:none}.mdc-notched-outline__notch{flex:0 0 auto;width:auto;max-width:calc(100% - 12px * 2)}.mdc-notched-outline .mdc-floating-label{display:inline-block;position:relative;max-width:100%}.mdc-notched-outline .mdc-floating-label--float-above{text-overflow:clip}.mdc-notched-outline--upgraded .mdc-floating-label--float-above{max-width:calc(100% / 0.75)}.mdc-notched-outline--notched .mdc-notched-outline__notch{padding-left:0;padding-right:8px;border-top:none}[dir=rtl] .mdc-notched-outline--notched .mdc-notched-outline__notch,.mdc-notched-outline--notched .mdc-notched-outline__notch[dir=rtl]{padding-left:8px;padding-right:0}.mdc-notched-outline--no-label .mdc-notched-outline__notch{padding:0}.mdc-radio{padding:10px;display:inline-block;position:relative;flex:0 0 auto;box-sizing:content-box;width:20px;height:20px;cursor:pointer;will-change:opacity,transform,border-color,color}.mdc-radio .mdc-radio__native-control:enabled:not(:checked)+.mdc-radio__background .mdc-radio__outer-circle{border-color:rgba(0,0,0,.54)}.mdc-radio .mdc-radio__native-control:enabled:checked+.mdc-radio__background .mdc-radio__outer-circle{border-color:#018786;border-color:var(--mdc-theme-secondary, #018786)}.mdc-radio .mdc-radio__native-control:enabled+.mdc-radio__background .mdc-radio__inner-circle{border-color:#018786;border-color:var(--mdc-theme-secondary, #018786)}.mdc-radio [aria-disabled=true] .mdc-radio__native-control:not(:checked)+.mdc-radio__background .mdc-radio__outer-circle,.mdc-radio .mdc-radio__native-control:disabled:not(:checked)+.mdc-radio__background .mdc-radio__outer-circle{border-color:rgba(0,0,0,.38)}.mdc-radio [aria-disabled=true] .mdc-radio__native-control:checked+.mdc-radio__background .mdc-radio__outer-circle,.mdc-radio .mdc-radio__native-control:disabled:checked+.mdc-radio__background .mdc-radio__outer-circle{border-color:rgba(0,0,0,.38)}.mdc-radio [aria-disabled=true] .mdc-radio__native-control+.mdc-radio__background .mdc-radio__inner-circle,.mdc-radio .mdc-radio__native-control:disabled+.mdc-radio__background .mdc-radio__inner-circle{border-color:rgba(0,0,0,.38)}.mdc-radio .mdc-radio__background::before{background-color:#018786;background-color:var(--mdc-theme-secondary, #018786)}.mdc-radio .mdc-radio__background::before{top:-10px;left:-10px;width:40px;height:40px}.mdc-radio .mdc-radio__native-control{top:0px;right:0px;left:0px;width:40px;height:40px}.mdc-radio__background{display:inline-block;position:relative;box-sizing:border-box;width:20px;height:20px}.mdc-radio__background::before{position:absolute;-webkit-transform:scale(0, 0);transform:scale(0, 0);border-radius:50%;opacity:0;pointer-events:none;content:"";transition:opacity 120ms 0ms cubic-bezier(0.4, 0, 0.6, 1),-webkit-transform 120ms 0ms cubic-bezier(0.4, 0, 0.6, 1);transition:opacity 120ms 0ms cubic-bezier(0.4, 0, 0.6, 1),transform 120ms 0ms cubic-bezier(0.4, 0, 0.6, 1);transition:opacity 120ms 0ms cubic-bezier(0.4, 0, 0.6, 1),transform 120ms 0ms cubic-bezier(0.4, 0, 0.6, 1),-webkit-transform 120ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-radio__outer-circle{position:absolute;top:0;left:0;box-sizing:border-box;width:100%;height:100%;border-width:2px;border-style:solid;border-radius:50%;transition:border-color 120ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-radio__inner-circle{position:absolute;top:0;left:0;box-sizing:border-box;width:100%;height:100%;-webkit-transform:scale(0, 0);transform:scale(0, 0);border-width:10px;border-style:solid;border-radius:50%;transition:border-color 120ms 0ms cubic-bezier(0.4, 0, 0.6, 1),-webkit-transform 120ms 0ms cubic-bezier(0.4, 0, 0.6, 1);transition:transform 120ms 0ms cubic-bezier(0.4, 0, 0.6, 1),border-color 120ms 0ms cubic-bezier(0.4, 0, 0.6, 1);transition:transform 120ms 0ms cubic-bezier(0.4, 0, 0.6, 1),border-color 120ms 0ms cubic-bezier(0.4, 0, 0.6, 1),-webkit-transform 120ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-radio__native-control{position:absolute;margin:0;padding:0;opacity:0;cursor:inherit;z-index:1}.mdc-radio--touch{margin-top:4px;margin-bottom:4px;margin-right:4px;margin-left:4px}.mdc-radio--touch .mdc-radio__native-control{top:-4px;right:-4px;left:-4px;width:48px;height:48px}.mdc-radio__native-control:checked+.mdc-radio__background,.mdc-radio__native-control:disabled+.mdc-radio__background{transition:opacity 120ms 0ms cubic-bezier(0, 0, 0.2, 1),-webkit-transform 120ms 0ms cubic-bezier(0, 0, 0.2, 1);transition:opacity 120ms 0ms cubic-bezier(0, 0, 0.2, 1),transform 120ms 0ms cubic-bezier(0, 0, 0.2, 1);transition:opacity 120ms 0ms cubic-bezier(0, 0, 0.2, 1),transform 120ms 0ms cubic-bezier(0, 0, 0.2, 1),-webkit-transform 120ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-radio__native-control:checked+.mdc-radio__background .mdc-radio__outer-circle,.mdc-radio__native-control:disabled+.mdc-radio__background .mdc-radio__outer-circle{transition:border-color 120ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-radio__native-control:checked+.mdc-radio__background .mdc-radio__inner-circle,.mdc-radio__native-control:disabled+.mdc-radio__background .mdc-radio__inner-circle{transition:border-color 120ms 0ms cubic-bezier(0, 0, 0.2, 1),-webkit-transform 120ms 0ms cubic-bezier(0, 0, 0.2, 1);transition:transform 120ms 0ms cubic-bezier(0, 0, 0.2, 1),border-color 120ms 0ms cubic-bezier(0, 0, 0.2, 1);transition:transform 120ms 0ms cubic-bezier(0, 0, 0.2, 1),border-color 120ms 0ms cubic-bezier(0, 0, 0.2, 1),-webkit-transform 120ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-radio--disabled{cursor:default;pointer-events:none}.mdc-radio__native-control:checked+.mdc-radio__background .mdc-radio__inner-circle{-webkit-transform:scale(0.5);transform:scale(0.5);transition:border-color 120ms 0ms cubic-bezier(0, 0, 0.2, 1),-webkit-transform 120ms 0ms cubic-bezier(0, 0, 0.2, 1);transition:transform 120ms 0ms cubic-bezier(0, 0, 0.2, 1),border-color 120ms 0ms cubic-bezier(0, 0, 0.2, 1);transition:transform 120ms 0ms cubic-bezier(0, 0, 0.2, 1),border-color 120ms 0ms cubic-bezier(0, 0, 0.2, 1),-webkit-transform 120ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-radio__native-control:disabled+.mdc-radio__background,[aria-disabled=true] .mdc-radio__native-control+.mdc-radio__background{cursor:default}.mdc-radio__native-control:focus+.mdc-radio__background::before{-webkit-transform:scale(1);transform:scale(1);opacity:.12;transition:opacity 120ms 0ms cubic-bezier(0, 0, 0.2, 1),-webkit-transform 120ms 0ms cubic-bezier(0, 0, 0.2, 1);transition:opacity 120ms 0ms cubic-bezier(0, 0, 0.2, 1),transform 120ms 0ms cubic-bezier(0, 0, 0.2, 1);transition:opacity 120ms 0ms cubic-bezier(0, 0, 0.2, 1),transform 120ms 0ms cubic-bezier(0, 0, 0.2, 1),-webkit-transform 120ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-radio{--mdc-ripple-fg-size: 0;--mdc-ripple-left: 0;--mdc-ripple-top: 0;--mdc-ripple-fg-scale: 1;--mdc-ripple-fg-translate-end: 0;--mdc-ripple-fg-translate-start: 0;-webkit-tap-highlight-color:rgba(0,0,0,0)}.mdc-radio .mdc-radio__ripple::before,.mdc-radio .mdc-radio__ripple::after{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:""}.mdc-radio .mdc-radio__ripple::before{transition:opacity 15ms linear,background-color 15ms linear;z-index:1}.mdc-radio.mdc-ripple-upgraded .mdc-radio__ripple::before{-webkit-transform:scale(var(--mdc-ripple-fg-scale, 1));transform:scale(var(--mdc-ripple-fg-scale, 1))}.mdc-radio.mdc-ripple-upgraded .mdc-radio__ripple::after{top:0;left:0;-webkit-transform:scale(0);transform:scale(0);-webkit-transform-origin:center center;transform-origin:center center}.mdc-radio.mdc-ripple-upgraded--unbounded .mdc-radio__ripple::after{top:var(--mdc-ripple-top, 0);left:var(--mdc-ripple-left, 0)}.mdc-radio.mdc-ripple-upgraded--foreground-activation .mdc-radio__ripple::after{-webkit-animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards;animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards}.mdc-radio.mdc-ripple-upgraded--foreground-deactivation .mdc-radio__ripple::after{-webkit-animation:mdc-ripple-fg-opacity-out 150ms;animation:mdc-ripple-fg-opacity-out 150ms;-webkit-transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1));transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}.mdc-radio .mdc-radio__ripple::before,.mdc-radio .mdc-radio__ripple::after{top:calc(50% - 50%);left:calc(50% - 50%);width:100%;height:100%}.mdc-radio.mdc-ripple-upgraded .mdc-radio__ripple::before,.mdc-radio.mdc-ripple-upgraded .mdc-radio__ripple::after{top:var(--mdc-ripple-top, calc(50% - 50%));left:var(--mdc-ripple-left, calc(50% - 50%));width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}.mdc-radio.mdc-ripple-upgraded .mdc-radio__ripple::after{width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}.mdc-radio .mdc-radio__ripple::before,.mdc-radio .mdc-radio__ripple::after{background-color:#018786;background-color:var(--mdc-theme-secondary, #018786)}.mdc-radio:hover .mdc-radio__ripple::before{opacity:.04}.mdc-radio.mdc-ripple-upgraded--background-focused .mdc-radio__ripple::before,.mdc-radio:not(.mdc-ripple-upgraded):focus .mdc-radio__ripple::before{transition-duration:75ms;opacity:.12}.mdc-radio:not(.mdc-ripple-upgraded) .mdc-radio__ripple::after{transition:opacity 150ms linear}.mdc-radio:not(.mdc-ripple-upgraded):active .mdc-radio__ripple::after{transition-duration:75ms;opacity:.12}.mdc-radio.mdc-ripple-upgraded{--mdc-ripple-fg-opacity: 0.12}.mdc-radio.mdc-ripple-upgraded--background-focused .mdc-radio__background::before{content:none}.mdc-radio__ripple{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none}.mdc-ripple-surface{--mdc-ripple-fg-size: 0;--mdc-ripple-left: 0;--mdc-ripple-top: 0;--mdc-ripple-fg-scale: 1;--mdc-ripple-fg-translate-end: 0;--mdc-ripple-fg-translate-start: 0;-webkit-tap-highlight-color:rgba(0,0,0,0);position:relative;outline:none;overflow:hidden}.mdc-ripple-surface::before,.mdc-ripple-surface::after{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:""}.mdc-ripple-surface::before{transition:opacity 15ms linear,background-color 15ms linear;z-index:1}.mdc-ripple-surface.mdc-ripple-upgraded::before{-webkit-transform:scale(var(--mdc-ripple-fg-scale, 1));transform:scale(var(--mdc-ripple-fg-scale, 1))}.mdc-ripple-surface.mdc-ripple-upgraded::after{top:0;left:0;-webkit-transform:scale(0);transform:scale(0);-webkit-transform-origin:center center;transform-origin:center center}.mdc-ripple-surface.mdc-ripple-upgraded--unbounded::after{top:var(--mdc-ripple-top, 0);left:var(--mdc-ripple-left, 0)}.mdc-ripple-surface.mdc-ripple-upgraded--foreground-activation::after{-webkit-animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards;animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards}.mdc-ripple-surface.mdc-ripple-upgraded--foreground-deactivation::after{-webkit-animation:mdc-ripple-fg-opacity-out 150ms;animation:mdc-ripple-fg-opacity-out 150ms;-webkit-transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1));transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}.mdc-ripple-surface::before,.mdc-ripple-surface::after{background-color:#000}.mdc-ripple-surface:hover::before{opacity:.04}.mdc-ripple-surface.mdc-ripple-upgraded--background-focused::before,.mdc-ripple-surface:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:.12}.mdc-ripple-surface:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-ripple-surface:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:.12}.mdc-ripple-surface.mdc-ripple-upgraded{--mdc-ripple-fg-opacity: 0.12}.mdc-ripple-surface::before,.mdc-ripple-surface::after{top:calc(50% - 100%);left:calc(50% - 100%);width:200%;height:200%}.mdc-ripple-surface.mdc-ripple-upgraded::after{width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}.mdc-ripple-surface[data-mdc-ripple-is-unbounded]{overflow:visible}.mdc-ripple-surface[data-mdc-ripple-is-unbounded]::before,.mdc-ripple-surface[data-mdc-ripple-is-unbounded]::after{top:calc(50% - 50%);left:calc(50% - 50%);width:100%;height:100%}.mdc-ripple-surface[data-mdc-ripple-is-unbounded].mdc-ripple-upgraded::before,.mdc-ripple-surface[data-mdc-ripple-is-unbounded].mdc-ripple-upgraded::after{top:var(--mdc-ripple-top, calc(50% - 50%));left:var(--mdc-ripple-left, calc(50% - 50%));width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}.mdc-ripple-surface[data-mdc-ripple-is-unbounded].mdc-ripple-upgraded::after{width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}.mdc-ripple-surface--primary::before,.mdc-ripple-surface--primary::after{background-color:#6200ee;background-color:var(--mdc-theme-primary, #6200ee)}.mdc-ripple-surface--primary:hover::before{opacity:.04}.mdc-ripple-surface--primary.mdc-ripple-upgraded--background-focused::before,.mdc-ripple-surface--primary:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:.12}.mdc-ripple-surface--primary:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-ripple-surface--primary:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:.12}.mdc-ripple-surface--primary.mdc-ripple-upgraded{--mdc-ripple-fg-opacity: 0.12}.mdc-ripple-surface--accent::before,.mdc-ripple-surface--accent::after{background-color:#018786;background-color:var(--mdc-theme-secondary, #018786)}.mdc-ripple-surface--accent:hover::before{opacity:.04}.mdc-ripple-surface--accent.mdc-ripple-upgraded--background-focused::before,.mdc-ripple-surface--accent:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:.12}.mdc-ripple-surface--accent:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-ripple-surface--accent:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:.12}.mdc-ripple-surface--accent.mdc-ripple-upgraded{--mdc-ripple-fg-opacity: 0.12}.mdc-select-helper-text{margin:0;margin-left:16px;margin-right:16px;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:PingFang SC,Microsoft YaHei, sans-serif;font-family:var(--mdc-typography-caption-font-family, var(--mdc-typography-font-family, PingFang SC, Microsoft YaHei, sans-serif));font-size:0.75rem;font-size:var(--mdc-typography-caption-font-size, 0.75rem);line-height:1.25rem;line-height:var(--mdc-typography-caption-line-height, 1.25rem);font-weight:400;font-weight:var(--mdc-typography-caption-font-weight, 400);letter-spacing:0.0333333333em;letter-spacing:var(--mdc-typography-caption-letter-spacing, 0.0333333333em);text-decoration:inherit;-webkit-text-decoration:var(--mdc-typography-caption-text-decoration, inherit);text-decoration:var(--mdc-typography-caption-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-caption-text-transform, inherit);display:block;margin-top:0;line-height:normal}[dir=rtl] .mdc-select-helper-text,.mdc-select-helper-text[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-select-helper-text::before{display:inline-block;width:0;height:16px;content:"";vertical-align:0}.mdc-select-helper-text--validation-msg{opacity:0;transition:opacity 180ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-select--invalid+.mdc-select-helper-text--validation-msg,.mdc-select-helper-text--validation-msg-persistent{opacity:1}.mdc-select--with-leading-icon .mdc-select__icon{display:inline-block;box-sizing:border-box;border:none;text-decoration:none;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;flex-shrink:0;align-self:center;background-color:transparent;fill:currentColor}.mdc-select--with-leading-icon .mdc-select__icon{margin-left:12px;margin-right:12px}[dir=rtl] .mdc-select--with-leading-icon .mdc-select__icon,.mdc-select--with-leading-icon .mdc-select__icon[dir=rtl]{margin-left:12px;margin-right:12px}.mdc-select__icon:not([tabindex]),.mdc-select__icon[tabindex="-1"]{cursor:default;pointer-events:none}.mdc-select__anchor{--mdc-ripple-fg-size: 0;--mdc-ripple-left: 0;--mdc-ripple-top: 0;--mdc-ripple-fg-scale: 1;--mdc-ripple-fg-translate-end: 0;--mdc-ripple-fg-translate-start: 0;-webkit-tap-highlight-color:rgba(0,0,0,0)}.mdc-select__anchor .mdc-select__ripple::before,.mdc-select__anchor .mdc-select__ripple::after{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:""}.mdc-select__anchor .mdc-select__ripple::before{transition:opacity 15ms linear,background-color 15ms linear;z-index:1}.mdc-select__anchor.mdc-ripple-upgraded .mdc-select__ripple::before{-webkit-transform:scale(var(--mdc-ripple-fg-scale, 1));transform:scale(var(--mdc-ripple-fg-scale, 1))}.mdc-select__anchor.mdc-ripple-upgraded .mdc-select__ripple::after{top:0;left:0;-webkit-transform:scale(0);transform:scale(0);-webkit-transform-origin:center center;transform-origin:center center}.mdc-select__anchor.mdc-ripple-upgraded--unbounded .mdc-select__ripple::after{top:var(--mdc-ripple-top, 0);left:var(--mdc-ripple-left, 0)}.mdc-select__anchor.mdc-ripple-upgraded--foreground-activation .mdc-select__ripple::after{-webkit-animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards;animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards}.mdc-select__anchor.mdc-ripple-upgraded--foreground-deactivation .mdc-select__ripple::after{-webkit-animation:mdc-ripple-fg-opacity-out 150ms;animation:mdc-ripple-fg-opacity-out 150ms;-webkit-transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1));transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}.mdc-select__anchor .mdc-select__ripple::before,.mdc-select__anchor .mdc-select__ripple::after{top:calc(50% - 100%);left:calc(50% - 100%);width:200%;height:200%}.mdc-select__anchor.mdc-ripple-upgraded .mdc-select__ripple::after{width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}.mdc-select__anchor .mdc-select__ripple::before,.mdc-select__anchor .mdc-select__ripple::after{background-color:rgba(0,0,0,.87)}.mdc-select__anchor:hover .mdc-select__ripple::before{opacity:.04}.mdc-select__anchor.mdc-ripple-upgraded--background-focused .mdc-select__ripple::before,.mdc-select__anchor:not(.mdc-ripple-upgraded):focus .mdc-select__ripple::before{transition-duration:75ms;opacity:.12}.mdc-select__anchor .mdc-select__ripple{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none}.mdc-select__menu .mdc-list .mdc-list-item--selected .mdc-list-item__ripple::before,.mdc-select__menu .mdc-list .mdc-list-item--selected .mdc-list-item__ripple::after{background-color:#000;background-color:var(--mdc-theme-on-surface, #000)}.mdc-select__menu .mdc-list .mdc-list-item--selected:hover .mdc-list-item__ripple::before{opacity:.04}.mdc-select__menu .mdc-list .mdc-list-item--selected.mdc-ripple-upgraded--background-focused .mdc-list-item__ripple::before,.mdc-select__menu .mdc-list .mdc-list-item--selected:not(.mdc-ripple-upgraded):focus .mdc-list-item__ripple::before{transition-duration:75ms;opacity:.12}.mdc-select__menu .mdc-list .mdc-list-item--selected:not(.mdc-ripple-upgraded) .mdc-list-item__ripple::after{transition:opacity 150ms linear}.mdc-select__menu .mdc-list .mdc-list-item--selected:not(.mdc-ripple-upgraded):active .mdc-list-item__ripple::after{transition-duration:75ms;opacity:.12}.mdc-select__menu .mdc-list .mdc-list-item--selected.mdc-ripple-upgraded{--mdc-ripple-fg-opacity: 0.12}.mdc-select{min-width:200px;display:inline-flex;position:relative}.mdc-select:not(.mdc-select--disabled) .mdc-select__anchor{background-color:#f5f5f5}.mdc-select:not(.mdc-select--disabled) .mdc-select__selected-text{color:rgba(0,0,0,.87)}.mdc-select:not(.mdc-select--disabled) .mdc-floating-label{color:rgba(0,0,0,.6)}.mdc-select:not(.mdc-select--disabled) .mdc-line-ripple::before{border-bottom-color:rgba(0,0,0,.42)}.mdc-select:not(.mdc-select--disabled) .mdc-select__dropdown-icon{fill:rgba(0,0,0,.54)}.mdc-select:not(.mdc-select--disabled).mdc-select--focused .mdc-select__dropdown-icon{fill:#6200ee;fill:var(--mdc-theme-primary, #6200ee)}.mdc-select:not(.mdc-select--disabled)+.mdc-select-helper-text{color:rgba(0,0,0,.6)}.mdc-select:not(.mdc-select--disabled) .mdc-select__icon{color:rgba(0,0,0,.54)}.mdc-select:not(.mdc-select--disabled).mdc-select--focused .mdc-line-ripple::after{border-bottom-color:#6200ee;border-bottom-color:var(--mdc-theme-primary, #6200ee)}.mdc-select:not(.mdc-select--disabled).mdc-select--focused .mdc-floating-label{color:rgba(98,0,238,.87)}.mdc-select:not(.mdc-select--disabled):hover .mdc-line-ripple::before{border-bottom-color:rgba(0,0,0,.87)}.mdc-select.mdc-select--disabled .mdc-select__anchor{background-color:#fafafa}.mdc-select.mdc-select--disabled .mdc-floating-label{color:rgba(0,0,0,.38)}.mdc-select.mdc-select--disabled .mdc-line-ripple::before{border-bottom-color:rgba(0,0,0,.06)}.mdc-select.mdc-select--disabled .mdc-select__dropdown-icon{fill:rgba(0,0,0,.38)}.mdc-select.mdc-select--disabled .mdc-select__selected-text{color:rgba(0,0,0,.38)}.mdc-select.mdc-select--disabled+.mdc-select-helper-text{color:rgba(0,0,0,.38)}.mdc-select.mdc-select--disabled .mdc-select__icon{color:rgba(0,0,0,.38)}@media screen and (-ms-high-contrast: active){.mdc-select.mdc-select--disabled .mdc-select__selected-text{color:GrayText}.mdc-select.mdc-select--disabled .mdc-select__dropdown-icon{fill:red}.mdc-select.mdc-select--disabled .mdc-floating-label{color:GrayText}.mdc-select.mdc-select--disabled .mdc-line-ripple::before{border-bottom-color:GrayText}.mdc-select.mdc-select--disabled .mdc-notched-outline__leading,.mdc-select.mdc-select--disabled .mdc-notched-outline__notch,.mdc-select.mdc-select--disabled .mdc-notched-outline__trailing{border-color:GrayText}.mdc-select.mdc-select--disabled .mdc-select__icon{color:GrayText}.mdc-select.mdc-select--disabled+.mdc-select-helper-text{color:GrayText}}.mdc-select .mdc-floating-label{left:16px;right:initial;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);pointer-events:none}[dir=rtl] .mdc-select .mdc-floating-label,.mdc-select .mdc-floating-label[dir=rtl]{left:initial;right:16px}.mdc-select.mdc-select--filled .mdc-floating-label{max-width:calc(100% - 64px)}.mdc-select.mdc-select--filled .mdc-floating-label--float-above{max-width:calc(100% / 0.75 - 64px / 0.75)}.mdc-select.mdc-select--outlined .mdc-floating-label{left:4px;right:initial}[dir=rtl] .mdc-select.mdc-select--outlined .mdc-floating-label,.mdc-select.mdc-select--outlined .mdc-floating-label[dir=rtl]{left:initial;right:4px}.mdc-select .mdc-select__anchor{height:56px;display:flex;align-items:baseline}.mdc-select .mdc-select__anchor::before{display:inline-block;width:0;height:40px;content:"";vertical-align:0}.mdc-select.mdc-select--no-label .mdc-select__anchor .mdc-select__selected-text::before{content:"​"}.mdc-select.mdc-select--no-label .mdc-select__anchor .mdc-select__selected-text{height:100%;display:inline-flex;align-items:center}.mdc-select.mdc-select--no-label .mdc-select__anchor::before{display:none}.mdc-select .mdc-select__anchor{border-top-left-radius:4px;border-top-right-radius:4px;border-bottom-right-radius:0;border-bottom-left-radius:0}.mdc-select .mdc-select__anchor{padding-left:16px;padding-right:0}[dir=rtl] .mdc-select .mdc-select__anchor,.mdc-select .mdc-select__anchor[dir=rtl]{padding-left:0;padding-right:16px}.mdc-select.mdc-select--with-leading-icon .mdc-select__anchor{padding-left:0;padding-right:0}[dir=rtl] .mdc-select.mdc-select--with-leading-icon .mdc-select__anchor,.mdc-select.mdc-select--with-leading-icon .mdc-select__anchor[dir=rtl]{padding-left:0;padding-right:0}.mdc-select .mdc-select__icon{width:24px;height:24px;font-size:24px}.mdc-select .mdc-select__dropdown-icon{width:24px;height:24px}.mdc-select .mdc-select__menu .mdc-list-item{padding-left:16px;padding-right:16px}[dir=rtl] .mdc-select .mdc-select__menu .mdc-list-item,.mdc-select .mdc-select__menu .mdc-list-item[dir=rtl]{padding-left:16px;padding-right:16px}.mdc-select .mdc-select__menu .mdc-list-item__graphic{margin-left:0;margin-right:12px}[dir=rtl] .mdc-select .mdc-select__menu .mdc-list-item__graphic,.mdc-select .mdc-select__menu .mdc-list-item__graphic[dir=rtl]{margin-left:12px;margin-right:0}.mdc-select__dropdown-icon{margin-left:12px;margin-right:12px;display:inline-flex;position:relative;align-self:center;align-items:center;justify-content:center;flex-shrink:0;pointer-events:none}.mdc-select__dropdown-icon .mdc-select__dropdown-icon-active,.mdc-select__dropdown-icon .mdc-select__dropdown-icon-inactive{position:absolute;top:0;left:0}.mdc-select__dropdown-icon .mdc-select__dropdown-icon-graphic{width:41.6666666667%;height:20.8333333333%}.mdc-select__dropdown-icon .mdc-select__dropdown-icon-inactive{opacity:1;transition:opacity 75ms linear 75ms}.mdc-select__dropdown-icon .mdc-select__dropdown-icon-active{opacity:0;transition:opacity 75ms linear}[dir=rtl] .mdc-select__dropdown-icon,.mdc-select__dropdown-icon[dir=rtl]{margin-left:12px;margin-right:12px}.mdc-select--activated .mdc-select__dropdown-icon .mdc-select__dropdown-icon-inactive{opacity:0;transition:opacity 49.5ms linear}.mdc-select--activated .mdc-select__dropdown-icon .mdc-select__dropdown-icon-active{opacity:1;transition:opacity 100.5ms linear 49.5ms}.mdc-select__anchor{width:100%;position:relative;box-sizing:border-box;overflow:hidden;outline:none;cursor:pointer}.mdc-select__anchor .mdc-floating-label--float-above{-webkit-transform:translateY(-106%) scale(0.75);transform:translateY(-106%) scale(0.75)}.mdc-select__anchor.mdc-select--focused.mdc-line-ripple::after{-webkit-transform:scale(1, 2);transform:scale(1, 2);opacity:1}.mdc-select__selected-text{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:PingFang SC,Microsoft YaHei, sans-serif;font-family:var(--mdc-typography-subtitle1-font-family, var(--mdc-typography-font-family, PingFang SC, Microsoft YaHei, sans-serif));font-size:1rem;font-size:var(--mdc-typography-subtitle1-font-size, 1rem);line-height:1.75rem;line-height:var(--mdc-typography-subtitle1-line-height, 1.75rem);font-weight:400;font-weight:var(--mdc-typography-subtitle1-font-weight, 400);letter-spacing:0.009375em;letter-spacing:var(--mdc-typography-subtitle1-letter-spacing, 0.009375em);text-decoration:inherit;-webkit-text-decoration:var(--mdc-typography-subtitle1-text-decoration, inherit);text-decoration:var(--mdc-typography-subtitle1-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-subtitle1-text-transform, inherit);box-sizing:border-box;width:auto;flex-grow:1;height:28px;border:none;outline:none;padding:0;white-space:nowrap;-webkit-appearance:none;-moz-appearance:none;appearance:none;pointer-events:none;overflow:hidden;background-color:transparent;color:inherit}.mdc-select__selected-text::-ms-expand{display:none}.mdc-select__selected-text::-ms-value{background-color:transparent;color:inherit}.mdc-select--outlined{border:none}.mdc-select--outlined:not(.mdc-select--disabled) .mdc-select__anchor{background-color:transparent}.mdc-select--outlined:not(.mdc-select--disabled) .mdc-notched-outline__leading,.mdc-select--outlined:not(.mdc-select--disabled) .mdc-notched-outline__notch,.mdc-select--outlined:not(.mdc-select--disabled) .mdc-notched-outline__trailing{border-color:rgba(0,0,0,.38)}.mdc-select--outlined:not(.mdc-select--disabled):not(.mdc-select--focused) .mdc-select__anchor:hover .mdc-notched-outline .mdc-notched-outline__leading,.mdc-select--outlined:not(.mdc-select--disabled):not(.mdc-select--focused) .mdc-select__anchor:hover .mdc-notched-outline .mdc-notched-outline__notch,.mdc-select--outlined:not(.mdc-select--disabled):not(.mdc-select--focused) .mdc-select__anchor:hover .mdc-notched-outline .mdc-notched-outline__trailing{border-color:rgba(0,0,0,.87)}.mdc-select--outlined:not(.mdc-select--disabled).mdc-select--focused .mdc-notched-outline .mdc-notched-outline__leading,.mdc-select--outlined:not(.mdc-select--disabled).mdc-select--focused .mdc-notched-outline .mdc-notched-outline__notch,.mdc-select--outlined:not(.mdc-select--disabled).mdc-select--focused .mdc-notched-outline .mdc-notched-outline__trailing{border-width:2px}.mdc-select--outlined:not(.mdc-select--disabled).mdc-select--focused .mdc-notched-outline .mdc-notched-outline__leading,.mdc-select--outlined:not(.mdc-select--disabled).mdc-select--focused .mdc-notched-outline .mdc-notched-outline__notch,.mdc-select--outlined:not(.mdc-select--disabled).mdc-select--focused .mdc-notched-outline .mdc-notched-outline__trailing{border-color:#6200ee;border-color:var(--mdc-theme-primary, #6200ee)}.mdc-select--outlined.mdc-select--disabled .mdc-notched-outline__leading,.mdc-select--outlined.mdc-select--disabled .mdc-notched-outline__notch,.mdc-select--outlined.mdc-select--disabled .mdc-notched-outline__trailing{border-color:rgba(0,0,0,.06)}.mdc-select--outlined.mdc-select--disabled .mdc-select__anchor{background-color:transparent}.mdc-select--outlined .mdc-notched-outline .mdc-notched-outline__leading{border-top-left-radius:4px;border-top-right-radius:0;border-bottom-right-radius:0;border-bottom-left-radius:4px}[dir=rtl] .mdc-select--outlined .mdc-notched-outline .mdc-notched-outline__leading,.mdc-select--outlined .mdc-notched-outline .mdc-notched-outline__leading[dir=rtl]{border-top-left-radius:0;border-top-right-radius:4px;border-bottom-right-radius:4px;border-bottom-left-radius:0}.mdc-select--outlined .mdc-notched-outline .mdc-notched-outline__trailing{border-top-left-radius:0;border-top-right-radius:4px;border-bottom-right-radius:4px;border-bottom-left-radius:0}[dir=rtl] .mdc-select--outlined .mdc-notched-outline .mdc-notched-outline__trailing,.mdc-select--outlined .mdc-notched-outline .mdc-notched-outline__trailing[dir=rtl]{border-top-left-radius:4px;border-top-right-radius:0;border-bottom-right-radius:0;border-bottom-left-radius:4px}.mdc-select--outlined .mdc-select__selected-text{border-radius:4px}.mdc-select--outlined:not(.mdc-select--disabled) .mdc-select__anchor{background-color:transparent}.mdc-select--outlined .mdc-select__anchor :not(.mdc-notched-outline--notched) .mdc-notched-outline__notch{max-width:calc(100% - 60px)}.mdc-select--outlined .mdc-select__anchor{overflow:visible}.mdc-select--outlined .mdc-select__anchor .mdc-floating-label--shake{-webkit-animation:mdc-floating-label-shake-float-above-select-outlined 250ms 1;animation:mdc-floating-label-shake-float-above-select-outlined 250ms 1}.mdc-select--outlined .mdc-select__anchor .mdc-floating-label--float-above{-webkit-transform:translateY(-37.25px) scale(1);transform:translateY(-37.25px) scale(1)}.mdc-select--outlined .mdc-select__anchor .mdc-floating-label--float-above{font-size:.75rem}.mdc-select--outlined .mdc-select__anchor.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-select--outlined .mdc-select__anchor .mdc-notched-outline--upgraded .mdc-floating-label--float-above{-webkit-transform:translateY(-34.75px) scale(0.75);transform:translateY(-34.75px) scale(0.75)}.mdc-select--outlined .mdc-select__anchor.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-select--outlined .mdc-select__anchor .mdc-notched-outline--upgraded .mdc-floating-label--float-above{font-size:1rem}.mdc-select--outlined .mdc-select__anchor .mdc-notched-outline--notched .mdc-notched-outline__notch{padding-top:1px}.mdc-select--outlined .mdc-select__anchor .mdc-select__selected-text::before{content:"​"}.mdc-select--outlined .mdc-select__anchor .mdc-select__selected-text{height:100%;display:inline-flex;align-items:center}.mdc-select--outlined .mdc-select__anchor::before{display:none}.mdc-select--outlined .mdc-select__selected-text{display:flex;border:none;z-index:1;background-color:transparent}.mdc-select--outlined .mdc-select__icon{z-index:2}.mdc-select--outlined .mdc-floating-label{line-height:1.15rem}.mdc-select--outlined.mdc-select--focused .mdc-notched-outline--notched .mdc-notched-outline__notch{padding-top:2px}.mdc-select--invalid:not(.mdc-select--disabled) .mdc-floating-label{color:#b00020;color:var(--mdc-theme-error, #b00020)}.mdc-select--invalid:not(.mdc-select--disabled) .mdc-line-ripple::before{border-bottom-color:#b00020;border-bottom-color:var(--mdc-theme-error, #b00020)}.mdc-select--invalid:not(.mdc-select--disabled).mdc-select--focused .mdc-line-ripple::after{border-bottom-color:#b00020;border-bottom-color:var(--mdc-theme-error, #b00020)}.mdc-select--invalid:not(.mdc-select--disabled).mdc-select--focused .mdc-floating-label{color:#b00020}.mdc-select--invalid:not(.mdc-select--disabled).mdc-select--invalid+.mdc-select-helper-text--validation-msg{color:#b00020;color:var(--mdc-theme-error, #b00020)}.mdc-select--invalid:not(.mdc-select--disabled) .mdc-select__dropdown-icon{fill:#b00020;fill:var(--mdc-theme-error, #b00020)}.mdc-select--invalid:not(.mdc-select--disabled).mdc-select--focused .mdc-select__dropdown-icon{fill:#b00020;fill:var(--mdc-theme-error, #b00020)}.mdc-select--invalid:not(.mdc-select--disabled):hover .mdc-line-ripple::before{border-bottom-color:#b00020;border-bottom-color:var(--mdc-theme-error, #b00020)}.mdc-select--invalid.mdc-select--outlined:not(.mdc-select--disabled) .mdc-notched-outline__leading,.mdc-select--invalid.mdc-select--outlined:not(.mdc-select--disabled) .mdc-notched-outline__notch,.mdc-select--invalid.mdc-select--outlined:not(.mdc-select--disabled) .mdc-notched-outline__trailing{border-color:#b00020;border-color:var(--mdc-theme-error, #b00020)}.mdc-select--invalid.mdc-select--outlined:not(.mdc-select--disabled):not(.mdc-select--focused) .mdc-select__anchor:hover .mdc-notched-outline .mdc-notched-outline__leading,.mdc-select--invalid.mdc-select--outlined:not(.mdc-select--disabled):not(.mdc-select--focused) .mdc-select__anchor:hover .mdc-notched-outline .mdc-notched-outline__notch,.mdc-select--invalid.mdc-select--outlined:not(.mdc-select--disabled):not(.mdc-select--focused) .mdc-select__anchor:hover .mdc-notched-outline .mdc-notched-outline__trailing{border-color:#b00020;border-color:var(--mdc-theme-error, #b00020)}.mdc-select--invalid.mdc-select--outlined:not(.mdc-select--disabled).mdc-select--focused .mdc-notched-outline .mdc-notched-outline__leading,.mdc-select--invalid.mdc-select--outlined:not(.mdc-select--disabled).mdc-select--focused .mdc-notched-outline .mdc-notched-outline__notch,.mdc-select--invalid.mdc-select--outlined:not(.mdc-select--disabled).mdc-select--focused .mdc-notched-outline .mdc-notched-outline__trailing{border-width:2px}.mdc-select--invalid.mdc-select--outlined:not(.mdc-select--disabled).mdc-select--focused .mdc-notched-outline .mdc-notched-outline__leading,.mdc-select--invalid.mdc-select--outlined:not(.mdc-select--disabled).mdc-select--focused .mdc-notched-outline .mdc-notched-outline__notch,.mdc-select--invalid.mdc-select--outlined:not(.mdc-select--disabled).mdc-select--focused .mdc-notched-outline .mdc-notched-outline__trailing{border-color:#b00020;border-color:var(--mdc-theme-error, #b00020)}.mdc-select--disabled{cursor:default;pointer-events:none}.mdc-select--with-leading-icon .mdc-floating-label{left:48px;right:initial}[dir=rtl] .mdc-select--with-leading-icon .mdc-floating-label,.mdc-select--with-leading-icon .mdc-floating-label[dir=rtl]{left:initial;right:48px}.mdc-select--with-leading-icon .mdc-select__menu .mdc-list-item{padding-left:12px;padding-right:12px}[dir=rtl] .mdc-select--with-leading-icon .mdc-select__menu .mdc-list-item,.mdc-select--with-leading-icon .mdc-select__menu .mdc-list-item[dir=rtl]{padding-left:12px;padding-right:12px}.mdc-select--with-leading-icon.mdc-select--filled .mdc-floating-label{max-width:calc(100% - 96px)}.mdc-select--with-leading-icon.mdc-select--filled .mdc-floating-label--float-above{max-width:calc(100% / 0.75 - 96px / 0.75)}.mdc-select--with-leading-icon.mdc-select--outlined .mdc-floating-label{left:36px;right:initial}[dir=rtl] .mdc-select--with-leading-icon.mdc-select--outlined .mdc-floating-label,.mdc-select--with-leading-icon.mdc-select--outlined .mdc-floating-label[dir=rtl]{left:initial;right:36px}.mdc-select--with-leading-icon.mdc-select--outlined .mdc-floating-label--float-above{-webkit-transform:translateY(-37.25px) translateX(-32px) scale(1);transform:translateY(-37.25px) translateX(-32px) scale(1)}[dir=rtl] .mdc-select--with-leading-icon.mdc-select--outlined .mdc-floating-label--float-above,.mdc-select--with-leading-icon.mdc-select--outlined .mdc-floating-label--float-above[dir=rtl]{-webkit-transform:translateY(-37.25px) translateX(32px) scale(1);transform:translateY(-37.25px) translateX(32px) scale(1)}.mdc-select--with-leading-icon.mdc-select--outlined .mdc-floating-label--float-above{font-size:.75rem}.mdc-select--with-leading-icon.mdc-select--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-select--with-leading-icon.mdc-select--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{-webkit-transform:translateY(-34.75px) translateX(-32px) scale(0.75);transform:translateY(-34.75px) translateX(-32px) scale(0.75)}[dir=rtl] .mdc-select--with-leading-icon.mdc-select--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-select--with-leading-icon.mdc-select--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above[dir=rtl],[dir=rtl] .mdc-select--with-leading-icon.mdc-select--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-select--with-leading-icon.mdc-select--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above[dir=rtl]{-webkit-transform:translateY(-34.75px) translateX(32px) scale(0.75);transform:translateY(-34.75px) translateX(32px) scale(0.75)}.mdc-select--with-leading-icon.mdc-select--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-select--with-leading-icon.mdc-select--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{font-size:1rem}.mdc-select--with-leading-icon.mdc-select--outlined .mdc-floating-label--shake{-webkit-animation:mdc-floating-label-shake-float-above-select-outlined-leading-icon-56px 250ms 1;animation:mdc-floating-label-shake-float-above-select-outlined-leading-icon-56px 250ms 1}@-webkit-keyframes mdc-floating-label-shake-float-above-select-outlined-leading-icon-56px{0%{-webkit-transform:translateX(calc(0 - 32px)) translateY(-34.75px) scale(0.75);transform:translateX(calc(0 - 32px)) translateY(-34.75px) scale(0.75)}33%{-webkit-animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);-webkit-transform:translateX(calc(4% - 32px)) translateY(-34.75px) scale(0.75);transform:translateX(calc(4% - 32px)) translateY(-34.75px) scale(0.75)}66%{-webkit-animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);-webkit-transform:translateX(calc(-4% - 32px)) translateY(-34.75px) scale(0.75);transform:translateX(calc(-4% - 32px)) translateY(-34.75px) scale(0.75)}100%{-webkit-transform:translateX(calc(0 - 32px)) translateY(-34.75px) scale(0.75);transform:translateX(calc(0 - 32px)) translateY(-34.75px) scale(0.75)}}@keyframes mdc-floating-label-shake-float-above-select-outlined-leading-icon-56px{0%{-webkit-transform:translateX(calc(0 - 32px)) translateY(-34.75px) scale(0.75);transform:translateX(calc(0 - 32px)) translateY(-34.75px) scale(0.75)}33%{-webkit-animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);-webkit-transform:translateX(calc(4% - 32px)) translateY(-34.75px) scale(0.75);transform:translateX(calc(4% - 32px)) translateY(-34.75px) scale(0.75)}66%{-webkit-animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);-webkit-transform:translateX(calc(-4% - 32px)) translateY(-34.75px) scale(0.75);transform:translateX(calc(-4% - 32px)) translateY(-34.75px) scale(0.75)}100%{-webkit-transform:translateX(calc(0 - 32px)) translateY(-34.75px) scale(0.75);transform:translateX(calc(0 - 32px)) translateY(-34.75px) scale(0.75)}}[dir=rtl] .mdc-select--with-leading-icon.mdc-select--outlined .mdc-floating-label--shake,.mdc-select--with-leading-icon.mdc-select--outlined[dir=rtl] .mdc-floating-label--shake{-webkit-animation:mdc-floating-label-shake-float-above-select-outlined-leading-icon-56px 250ms 1;animation:mdc-floating-label-shake-float-above-select-outlined-leading-icon-56px 250ms 1}@-webkit-keyframes mdc-floating-label-shake-float-above-select-outlined-leading-icon-56px-rtl{0%{-webkit-transform:translateX(calc(0 - -32px)) translateY(-34.75px) scale(0.75);transform:translateX(calc(0 - -32px)) translateY(-34.75px) scale(0.75)}33%{-webkit-animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);-webkit-transform:translateX(calc(4% - -32px)) translateY(-34.75px) scale(0.75);transform:translateX(calc(4% - -32px)) translateY(-34.75px) scale(0.75)}66%{-webkit-animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);-webkit-transform:translateX(calc(-4% - -32px)) translateY(-34.75px) scale(0.75);transform:translateX(calc(-4% - -32px)) translateY(-34.75px) scale(0.75)}100%{-webkit-transform:translateX(calc(0 - -32px)) translateY(-34.75px) scale(0.75);transform:translateX(calc(0 - -32px)) translateY(-34.75px) scale(0.75)}}@keyframes mdc-floating-label-shake-float-above-select-outlined-leading-icon-56px-rtl{0%{-webkit-transform:translateX(calc(0 - -32px)) translateY(-34.75px) scale(0.75);transform:translateX(calc(0 - -32px)) translateY(-34.75px) scale(0.75)}33%{-webkit-animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);-webkit-transform:translateX(calc(4% - -32px)) translateY(-34.75px) scale(0.75);transform:translateX(calc(4% - -32px)) translateY(-34.75px) scale(0.75)}66%{-webkit-animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);-webkit-transform:translateX(calc(-4% - -32px)) translateY(-34.75px) scale(0.75);transform:translateX(calc(-4% - -32px)) translateY(-34.75px) scale(0.75)}100%{-webkit-transform:translateX(calc(0 - -32px)) translateY(-34.75px) scale(0.75);transform:translateX(calc(0 - -32px)) translateY(-34.75px) scale(0.75)}}.mdc-select--with-leading-icon.mdc-select--outlined .mdc-select__anchor :not(.mdc-notched-outline--notched) .mdc-notched-outline__notch{max-width:calc(100% - 96px)}.mdc-select--filled .mdc-menu-surface--is-open-below{border-top-left-radius:0px;border-top-right-radius:0px}.mdc-select__menu .mdc-select__icon{margin-left:0;margin-right:0}[dir=rtl] .mdc-select__menu .mdc-select__icon,.mdc-select__menu .mdc-select__icon[dir=rtl]{margin-left:0;margin-right:0}.mdc-select__menu .mdc-list .mdc-list-item--selected,.mdc-select__menu .mdc-list .mdc-list-item--activated{color:#000;color:var(--mdc-theme-on-surface, #000)}.mdc-select__menu .mdc-list .mdc-list-item--selected .mdc-list-item__graphic,.mdc-select__menu .mdc-list .mdc-list-item--activated .mdc-list-item__graphic{color:#000;color:var(--mdc-theme-on-surface, #000)}@-webkit-keyframes mdc-slider-emphasize{0%{-webkit-animation-timing-function:ease-out;animation-timing-function:ease-out}50%{-webkit-animation-timing-function:ease-in;animation-timing-function:ease-in;-webkit-transform:scale(0.85);transform:scale(0.85)}100%{-webkit-transform:scale(0.571);transform:scale(0.571)}}@keyframes mdc-slider-emphasize{0%{-webkit-animation-timing-function:ease-out;animation-timing-function:ease-out}50%{-webkit-animation-timing-function:ease-in;animation-timing-function:ease-in;-webkit-transform:scale(0.85);transform:scale(0.85)}100%{-webkit-transform:scale(0.571);transform:scale(0.571)}}.mdc-slider{position:relative;width:100%;height:48px;cursor:pointer;touch-action:pan-x;-webkit-tap-highlight-color:rgba(0,0,0,0)}.mdc-slider:not(.mdc-slider--disabled) .mdc-slider__track{background-color:#018786;background-color:var(--mdc-theme-secondary, #018786)}.mdc-slider:not(.mdc-slider--disabled) .mdc-slider__track-container::after{background-color:#018786;background-color:var(--mdc-theme-secondary, #018786);opacity:.26}.mdc-slider:not(.mdc-slider--disabled) .mdc-slider__track-marker-container{background-color:#018786;background-color:var(--mdc-theme-secondary, #018786)}.mdc-slider:not(.mdc-slider--disabled) .mdc-slider__thumb{fill:#018786;fill:var(--mdc-theme-secondary, #018786);stroke:#018786;stroke:var(--mdc-theme-secondary, #018786)}.mdc-slider:not(.mdc-slider--disabled) .mdc-slider__focus-ring{background-color:#018786;background-color:var(--mdc-theme-secondary, #018786)}.mdc-slider:not(.mdc-slider--disabled) .mdc-slider__pin{background-color:#018786;background-color:var(--mdc-theme-secondary, #018786)}.mdc-slider:not(.mdc-slider--disabled) .mdc-slider__pin{color:#fff;color:var(--mdc-theme-text-primary-on-dark, white)}.mdc-slider--disable-touch-action{touch-action:none}.mdc-slider--disabled{cursor:auto}.mdc-slider--disabled .mdc-slider__track{background-color:#9a9a9a}.mdc-slider--disabled .mdc-slider__track-container::after{background-color:#9a9a9a;opacity:.26}.mdc-slider--disabled .mdc-slider__track-marker-container{background-color:#9a9a9a}.mdc-slider--disabled .mdc-slider__thumb{fill:#9a9a9a;stroke:#9a9a9a}.mdc-slider--disabled .mdc-slider__thumb{stroke:#fff;stroke:var(--mdc-slider-bg-color-behind-component, white)}.mdc-slider:focus{outline:none}.mdc-slider__track-container{position:absolute;top:50%;width:100%;height:2px;overflow:hidden}.mdc-slider__track-container::after{position:absolute;top:0;left:0;display:block;width:100%;height:100%;content:""}.mdc-slider__track{position:absolute;width:100%;height:100%;-webkit-transform-origin:left top;transform-origin:left top;will-change:transform}.mdc-slider[dir=rtl] .mdc-slider__track,[dir=rtl] .mdc-slider .mdc-slider__track{-webkit-transform-origin:right top;transform-origin:right top}.mdc-slider__track-marker-container{display:flex;margin-right:0;margin-left:-1px;visibility:hidden}.mdc-slider[dir=rtl] .mdc-slider__track-marker-container,[dir=rtl] .mdc-slider .mdc-slider__track-marker-container{margin-right:-1px;margin-left:0}.mdc-slider__track-marker-container::after{display:block;width:2px;height:2px;content:""}.mdc-slider__track-marker{flex:1}.mdc-slider__track-marker::after{display:block;width:2px;height:2px;content:""}.mdc-slider__track-marker:first-child::after{width:3px}.mdc-slider__thumb-container{position:absolute;top:15px;left:0;width:21px;height:100%;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;will-change:transform}.mdc-slider__thumb{position:absolute;top:0;left:0;-webkit-transform:scale(0.571);transform:scale(0.571);stroke-width:3.5;transition:fill 100ms ease-out,stroke 100ms ease-out,-webkit-transform 100ms ease-out;transition:transform 100ms ease-out,fill 100ms ease-out,stroke 100ms ease-out;transition:transform 100ms ease-out,fill 100ms ease-out,stroke 100ms ease-out,-webkit-transform 100ms ease-out}.mdc-slider__focus-ring{width:21px;height:21px;border-radius:50%;opacity:0;transition:opacity 266.67ms ease-out,background-color 266.67ms ease-out,-webkit-transform 266.67ms ease-out;transition:transform 266.67ms ease-out,opacity 266.67ms ease-out,background-color 266.67ms ease-out;transition:transform 266.67ms ease-out,opacity 266.67ms ease-out,background-color 266.67ms ease-out,-webkit-transform 266.67ms ease-out}.mdc-slider__pin{display:flex;position:absolute;top:0;left:0;align-items:center;justify-content:center;width:26px;height:26px;margin-top:-2px;margin-left:-2px;-webkit-transform:rotate(-45deg) scale(0) translate(0, 0);transform:rotate(-45deg) scale(0) translate(0, 0);border-radius:50% 50% 50% 0%;z-index:1;transition:-webkit-transform 100ms ease-out;transition:transform 100ms ease-out;transition:transform 100ms ease-out, -webkit-transform 100ms ease-out}.mdc-slider__pin-value-marker{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:PingFang SC,Microsoft YaHei, sans-serif;font-family:var(--mdc-typography-body2-font-family, var(--mdc-typography-font-family, PingFang SC, Microsoft YaHei, sans-serif));font-size:0.875rem;font-size:var(--mdc-typography-body2-font-size, 0.875rem);line-height:1.25rem;line-height:var(--mdc-typography-body2-line-height, 1.25rem);font-weight:400;font-weight:var(--mdc-typography-body2-font-weight, 400);letter-spacing:0.0178571429em;letter-spacing:var(--mdc-typography-body2-letter-spacing, 0.0178571429em);text-decoration:inherit;-webkit-text-decoration:var(--mdc-typography-body2-text-decoration, inherit);text-decoration:var(--mdc-typography-body2-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-body2-text-transform, inherit);-webkit-transform:rotate(45deg);transform:rotate(45deg)}.mdc-slider--active .mdc-slider__thumb{-webkit-transform:scale3d(1, 1, 1);transform:scale3d(1, 1, 1)}.mdc-slider--focus .mdc-slider__thumb{-webkit-animation:mdc-slider-emphasize 266.67ms linear;animation:mdc-slider-emphasize 266.67ms linear}.mdc-slider--focus .mdc-slider__focus-ring{-webkit-transform:scale3d(1.55, 1.55, 1.55);transform:scale3d(1.55, 1.55, 1.55);opacity:.25}.mdc-slider--in-transit .mdc-slider__thumb{transition-delay:140ms}.mdc-slider--in-transit .mdc-slider__thumb-container,.mdc-slider--in-transit .mdc-slider__track,.mdc-slider:focus:not(.mdc-slider--active) .mdc-slider__thumb-container,.mdc-slider:focus:not(.mdc-slider--active) .mdc-slider__track{transition:-webkit-transform 80ms ease;transition:transform 80ms ease;transition:transform 80ms ease, -webkit-transform 80ms ease}.mdc-slider--discrete.mdc-slider--active .mdc-slider__thumb{-webkit-transform:scale(calc(12 / 21));transform:scale(calc(12 / 21))}.mdc-slider--discrete.mdc-slider--active .mdc-slider__pin{-webkit-transform:rotate(-45deg) scale(1) translate(19px, -20px);transform:rotate(-45deg) scale(1) translate(19px, -20px)}.mdc-slider--discrete.mdc-slider--focus .mdc-slider__thumb{-webkit-animation:none;animation:none}.mdc-slider--discrete.mdc-slider--display-markers .mdc-slider__track-marker-container{visibility:visible}.mdc-snackbar{z-index:8;margin:8px;display:none;position:fixed;right:0;bottom:0;left:0;align-items:center;justify-content:center;box-sizing:border-box;pointer-events:none;-webkit-tap-highlight-color:rgba(0,0,0,0)}.mdc-snackbar__surface{background-color:#333}.mdc-snackbar__label{color:rgba(255,255,255,.87)}.mdc-snackbar__surface{min-width:344px}@media(max-width: 480px),(max-width: 344px){.mdc-snackbar__surface{min-width:100%}}.mdc-snackbar__surface{max-width:672px}.mdc-snackbar__surface{box-shadow:0px 3px 5px -1px rgba(0, 0, 0, 0.2),0px 6px 10px 0px rgba(0, 0, 0, 0.14),0px 1px 18px 0px rgba(0,0,0,.12)}.mdc-snackbar__surface{border-radius:4px;border-radius:var(--mdc-shape-small, 4px)}.mdc-snackbar--opening,.mdc-snackbar--open,.mdc-snackbar--closing{display:flex}.mdc-snackbar--leading{justify-content:flex-start}.mdc-snackbar--stacked .mdc-snackbar__label{padding-left:16px;padding-right:0;padding-bottom:12px}[dir=rtl] .mdc-snackbar--stacked .mdc-snackbar__label,.mdc-snackbar--stacked .mdc-snackbar__label[dir=rtl]{padding-left:0;padding-right:16px}.mdc-snackbar--stacked .mdc-snackbar__surface{flex-direction:column;align-items:flex-start}.mdc-snackbar--stacked .mdc-snackbar__actions{align-self:flex-end;margin-bottom:8px}.mdc-snackbar__surface{padding-left:0;padding-right:8px;display:flex;align-items:center;justify-content:flex-start;box-sizing:border-box;-webkit-transform:scale(0.8);transform:scale(0.8);opacity:0}[dir=rtl] .mdc-snackbar__surface,.mdc-snackbar__surface[dir=rtl]{padding-left:8px;padding-right:0}.mdc-snackbar--open .mdc-snackbar__surface{-webkit-transform:scale(1);transform:scale(1);opacity:1;pointer-events:auto;transition:opacity 150ms 0ms cubic-bezier(0, 0, 0.2, 1),-webkit-transform 150ms 0ms cubic-bezier(0, 0, 0.2, 1);transition:opacity 150ms 0ms cubic-bezier(0, 0, 0.2, 1),transform 150ms 0ms cubic-bezier(0, 0, 0.2, 1);transition:opacity 150ms 0ms cubic-bezier(0, 0, 0.2, 1),transform 150ms 0ms cubic-bezier(0, 0, 0.2, 1),-webkit-transform 150ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-snackbar--closing .mdc-snackbar__surface{-webkit-transform:scale(1);transform:scale(1);transition:opacity 75ms 0ms cubic-bezier(0.4, 0, 1, 1)}.mdc-snackbar__label{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:PingFang SC,Microsoft YaHei, sans-serif;font-family:var(--mdc-typography-body2-font-family, var(--mdc-typography-font-family, PingFang SC, Microsoft YaHei, sans-serif));font-size:0.875rem;font-size:var(--mdc-typography-body2-font-size, 0.875rem);line-height:1.25rem;line-height:var(--mdc-typography-body2-line-height, 1.25rem);font-weight:400;font-weight:var(--mdc-typography-body2-font-weight, 400);letter-spacing:0.0178571429em;letter-spacing:var(--mdc-typography-body2-letter-spacing, 0.0178571429em);text-decoration:inherit;-webkit-text-decoration:var(--mdc-typography-body2-text-decoration, inherit);text-decoration:var(--mdc-typography-body2-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-body2-text-transform, inherit);padding-left:16px;padding-right:8px;width:100%;flex-grow:1;box-sizing:border-box;margin:0;padding-top:14px;padding-bottom:14px}[dir=rtl] .mdc-snackbar__label,.mdc-snackbar__label[dir=rtl]{padding-left:8px;padding-right:16px}.mdc-snackbar__label::before{display:inline;content:attr(data-mdc-snackbar-label-text)}.mdc-snackbar__actions{display:flex;flex-shrink:0;align-items:center;box-sizing:border-box}.mdc-snackbar__action:not(:disabled){color:#bb86fc}.mdc-snackbar__action::before,.mdc-snackbar__action::after{background-color:#bb86fc}.mdc-snackbar__action:hover::before{opacity:.08}.mdc-snackbar__action.mdc-ripple-upgraded--background-focused::before,.mdc-snackbar__action:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:.24}.mdc-snackbar__action:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-snackbar__action:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:.24}.mdc-snackbar__action.mdc-ripple-upgraded{--mdc-ripple-fg-opacity: 0.24}.mdc-snackbar__dismiss{color:rgba(255,255,255,.87)}.mdc-snackbar__dismiss::before,.mdc-snackbar__dismiss::after{background-color:rgba(255,255,255,.87)}.mdc-snackbar__dismiss:hover::before{opacity:.08}.mdc-snackbar__dismiss.mdc-ripple-upgraded--background-focused::before,.mdc-snackbar__dismiss:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:.24}.mdc-snackbar__dismiss:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-snackbar__dismiss:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:.24}.mdc-snackbar__dismiss.mdc-ripple-upgraded{--mdc-ripple-fg-opacity: 0.24}.mdc-snackbar__dismiss.mdc-snackbar__dismiss{width:36px;height:36px;padding:9px;font-size:18px}.mdc-snackbar__dismiss.mdc-snackbar__dismiss svg,.mdc-snackbar__dismiss.mdc-snackbar__dismiss img{width:18px;height:18px}.mdc-snackbar__action+.mdc-snackbar__dismiss{margin-left:8px;margin-right:0}[dir=rtl] .mdc-snackbar__action+.mdc-snackbar__dismiss,.mdc-snackbar__action+.mdc-snackbar__dismiss[dir=rtl]{margin-left:0;margin-right:8px}.mdc-switch__thumb-underlay{left:-18px;right:initial;top:-17px;width:48px;height:48px}[dir=rtl] .mdc-switch__thumb-underlay,.mdc-switch__thumb-underlay[dir=rtl]{left:initial;right:-18px}.mdc-switch__native-control{width:68px;height:48px}.mdc-switch{display:inline-block;position:relative;outline:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.mdc-switch.mdc-switch--checked .mdc-switch__track{background-color:#018786;background-color:var(--mdc-theme-secondary, #018786)}.mdc-switch.mdc-switch--checked .mdc-switch__thumb{background-color:#018786;background-color:var(--mdc-theme-secondary, #018786);border-color:#018786;border-color:var(--mdc-theme-secondary, #018786)}.mdc-switch:not(.mdc-switch--checked) .mdc-switch__track{background-color:#000;background-color:var(--mdc-theme-on-surface, #000)}.mdc-switch:not(.mdc-switch--checked) .mdc-switch__thumb{background-color:#fff;background-color:var(--mdc-theme-surface, #fff);border-color:#fff;border-color:var(--mdc-theme-surface, #fff)}.mdc-switch__native-control{left:0;right:initial;position:absolute;top:0;margin:0;opacity:0;cursor:pointer;pointer-events:auto;transition:-webkit-transform 90ms cubic-bezier(0.4, 0, 0.2, 1);transition:transform 90ms cubic-bezier(0.4, 0, 0.2, 1);transition:transform 90ms cubic-bezier(0.4, 0, 0.2, 1), -webkit-transform 90ms cubic-bezier(0.4, 0, 0.2, 1)}[dir=rtl] .mdc-switch__native-control,.mdc-switch__native-control[dir=rtl]{left:initial;right:0}.mdc-switch__track{box-sizing:border-box;width:32px;height:14px;border:1px solid transparent;border-radius:7px;opacity:.38;transition:opacity 90ms cubic-bezier(0.4, 0, 0.2, 1),background-color 90ms cubic-bezier(0.4, 0, 0.2, 1),border-color 90ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-switch__thumb-underlay{display:flex;position:absolute;align-items:center;justify-content:center;-webkit-transform:translateX(0);transform:translateX(0);transition:background-color 90ms cubic-bezier(0.4, 0, 0.2, 1),border-color 90ms cubic-bezier(0.4, 0, 0.2, 1),-webkit-transform 90ms cubic-bezier(0.4, 0, 0.2, 1);transition:transform 90ms cubic-bezier(0.4, 0, 0.2, 1),background-color 90ms cubic-bezier(0.4, 0, 0.2, 1),border-color 90ms cubic-bezier(0.4, 0, 0.2, 1);transition:transform 90ms cubic-bezier(0.4, 0, 0.2, 1),background-color 90ms cubic-bezier(0.4, 0, 0.2, 1),border-color 90ms cubic-bezier(0.4, 0, 0.2, 1),-webkit-transform 90ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-switch__thumb{box-shadow:0px 3px 1px -2px rgba(0, 0, 0, 0.2),0px 2px 2px 0px rgba(0, 0, 0, 0.14),0px 1px 5px 0px rgba(0,0,0,.12);box-sizing:border-box;width:20px;height:20px;border:10px solid;border-radius:50%;pointer-events:none;z-index:1}.mdc-switch--checked .mdc-switch__track{opacity:.54}.mdc-switch--checked .mdc-switch__thumb-underlay{-webkit-transform:translateX(20px);transform:translateX(20px)}[dir=rtl] .mdc-switch--checked .mdc-switch__thumb-underlay,.mdc-switch--checked .mdc-switch__thumb-underlay[dir=rtl]{-webkit-transform:translateX(-20px);transform:translateX(-20px)}.mdc-switch--checked .mdc-switch__native-control{-webkit-transform:translateX(-20px);transform:translateX(-20px)}[dir=rtl] .mdc-switch--checked .mdc-switch__native-control,.mdc-switch--checked .mdc-switch__native-control[dir=rtl]{-webkit-transform:translateX(20px);transform:translateX(20px)}.mdc-switch--disabled{opacity:.38;pointer-events:none}.mdc-switch--disabled .mdc-switch__thumb{border-width:1px}.mdc-switch--disabled .mdc-switch__native-control{cursor:default;pointer-events:none}.mdc-switch:not(.mdc-switch--checked) .mdc-switch__thumb-underlay::before,.mdc-switch:not(.mdc-switch--checked) .mdc-switch__thumb-underlay::after{background-color:#9e9e9e}.mdc-switch:not(.mdc-switch--checked) .mdc-switch__thumb-underlay:hover::before{opacity:.08}.mdc-switch:not(.mdc-switch--checked) .mdc-switch__thumb-underlay.mdc-ripple-upgraded--background-focused::before,.mdc-switch:not(.mdc-switch--checked) .mdc-switch__thumb-underlay:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:.24}.mdc-switch:not(.mdc-switch--checked) .mdc-switch__thumb-underlay:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-switch:not(.mdc-switch--checked) .mdc-switch__thumb-underlay:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:.24}.mdc-switch:not(.mdc-switch--checked) .mdc-switch__thumb-underlay.mdc-ripple-upgraded{--mdc-ripple-fg-opacity: 0.24}.mdc-switch__thumb-underlay{--mdc-ripple-fg-size: 0;--mdc-ripple-left: 0;--mdc-ripple-top: 0;--mdc-ripple-fg-scale: 1;--mdc-ripple-fg-translate-end: 0;--mdc-ripple-fg-translate-start: 0;-webkit-tap-highlight-color:rgba(0,0,0,0)}.mdc-switch__thumb-underlay::before,.mdc-switch__thumb-underlay::after{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:""}.mdc-switch__thumb-underlay::before{transition:opacity 15ms linear,background-color 15ms linear;z-index:1}.mdc-switch__thumb-underlay.mdc-ripple-upgraded::before{-webkit-transform:scale(var(--mdc-ripple-fg-scale, 1));transform:scale(var(--mdc-ripple-fg-scale, 1))}.mdc-switch__thumb-underlay.mdc-ripple-upgraded::after{top:0;left:0;-webkit-transform:scale(0);transform:scale(0);-webkit-transform-origin:center center;transform-origin:center center}.mdc-switch__thumb-underlay.mdc-ripple-upgraded--unbounded::after{top:var(--mdc-ripple-top, 0);left:var(--mdc-ripple-left, 0)}.mdc-switch__thumb-underlay.mdc-ripple-upgraded--foreground-activation::after{-webkit-animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards;animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards}.mdc-switch__thumb-underlay.mdc-ripple-upgraded--foreground-deactivation::after{-webkit-animation:mdc-ripple-fg-opacity-out 150ms;animation:mdc-ripple-fg-opacity-out 150ms;-webkit-transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1));transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}.mdc-switch__thumb-underlay::before,.mdc-switch__thumb-underlay::after{top:calc(50% - 50%);left:calc(50% - 50%);width:100%;height:100%}.mdc-switch__thumb-underlay.mdc-ripple-upgraded::before,.mdc-switch__thumb-underlay.mdc-ripple-upgraded::after{top:var(--mdc-ripple-top, calc(50% - 50%));left:var(--mdc-ripple-left, calc(50% - 50%));width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}.mdc-switch__thumb-underlay.mdc-ripple-upgraded::after{width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}.mdc-switch__thumb-underlay::before,.mdc-switch__thumb-underlay::after{background-color:#018786;background-color:var(--mdc-theme-secondary, #018786)}.mdc-switch__thumb-underlay:hover::before{opacity:.04}.mdc-switch__thumb-underlay.mdc-ripple-upgraded--background-focused::before,.mdc-switch__thumb-underlay:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:.12}.mdc-switch__thumb-underlay:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-switch__thumb-underlay:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:.12}.mdc-switch__thumb-underlay.mdc-ripple-upgraded{--mdc-ripple-fg-opacity: 0.12}.mdc-tab{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:PingFang SC,Microsoft YaHei, sans-serif;font-family:var(--mdc-typography-button-font-family, var(--mdc-typography-font-family, PingFang SC, Microsoft YaHei, sans-serif));font-size:0.875rem;font-size:var(--mdc-typography-button-font-size, 0.875rem);line-height:2.25rem;line-height:var(--mdc-typography-button-line-height, 2.25rem);font-weight:500;font-weight:var(--mdc-typography-button-font-weight, 500);letter-spacing:0.0892857143em;letter-spacing:var(--mdc-typography-button-letter-spacing, 0.0892857143em);text-decoration:none;-webkit-text-decoration:var(--mdc-typography-button-text-decoration, none);text-decoration:var(--mdc-typography-button-text-decoration, none);text-transform:uppercase;text-transform:var(--mdc-typography-button-text-transform, uppercase);padding-right:24px;padding-left:24px;position:relative;display:flex;flex:1 0 auto;justify-content:center;box-sizing:border-box;margin:0;padding-top:0;padding-bottom:0;border:none;outline:none;background:none;text-align:center;white-space:nowrap;cursor:pointer;-webkit-appearance:none;z-index:1}.mdc-tab .mdc-tab__text-label{color:rgba(0,0,0,.6)}.mdc-tab .mdc-tab__icon{color:rgba(0,0,0,.54);fill:currentColor}.mdc-tab::-moz-focus-inner{padding:0;border:0}.mdc-tab--min-width{flex:0 1 auto}.mdc-tab__content{position:relative;display:flex;align-items:center;justify-content:center;height:inherit;pointer-events:none}.mdc-tab__text-label{transition:150ms color linear;display:inline-block;line-height:1;z-index:2}.mdc-tab__icon{transition:150ms color linear;width:24px;height:24px;font-size:24px;z-index:2}.mdc-tab--stacked .mdc-tab__content{flex-direction:column;align-items:center;justify-content:center}.mdc-tab--stacked .mdc-tab__text-label{padding-top:6px;padding-bottom:4px}.mdc-tab--active .mdc-tab__text-label{color:#6200ee;color:var(--mdc-theme-primary, #6200ee)}.mdc-tab--active .mdc-tab__icon{color:#6200ee;color:var(--mdc-theme-primary, #6200ee);fill:currentColor}.mdc-tab--active .mdc-tab__text-label,.mdc-tab--active .mdc-tab__icon{transition-delay:100ms}.mdc-tab:not(.mdc-tab--stacked) .mdc-tab__icon+.mdc-tab__text-label{padding-left:8px;padding-right:0}[dir=rtl] .mdc-tab:not(.mdc-tab--stacked) .mdc-tab__icon+.mdc-tab__text-label,.mdc-tab:not(.mdc-tab--stacked) .mdc-tab__icon+.mdc-tab__text-label[dir=rtl]{padding-left:0;padding-right:8px}.mdc-tab__ripple{--mdc-ripple-fg-size: 0;--mdc-ripple-left: 0;--mdc-ripple-top: 0;--mdc-ripple-fg-scale: 1;--mdc-ripple-fg-translate-end: 0;--mdc-ripple-fg-translate-start: 0;-webkit-tap-highlight-color:rgba(0,0,0,0);position:absolute;top:0;left:0;width:100%;height:100%;overflow:hidden}.mdc-tab__ripple::before,.mdc-tab__ripple::after{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:""}.mdc-tab__ripple::before{transition:opacity 15ms linear,background-color 15ms linear;z-index:1}.mdc-tab__ripple.mdc-ripple-upgraded::before{-webkit-transform:scale(var(--mdc-ripple-fg-scale, 1));transform:scale(var(--mdc-ripple-fg-scale, 1))}.mdc-tab__ripple.mdc-ripple-upgraded::after{top:0;left:0;-webkit-transform:scale(0);transform:scale(0);-webkit-transform-origin:center center;transform-origin:center center}.mdc-tab__ripple.mdc-ripple-upgraded--unbounded::after{top:var(--mdc-ripple-top, 0);left:var(--mdc-ripple-left, 0)}.mdc-tab__ripple.mdc-ripple-upgraded--foreground-activation::after{-webkit-animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards;animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards}.mdc-tab__ripple.mdc-ripple-upgraded--foreground-deactivation::after{-webkit-animation:mdc-ripple-fg-opacity-out 150ms;animation:mdc-ripple-fg-opacity-out 150ms;-webkit-transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1));transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}.mdc-tab__ripple::before,.mdc-tab__ripple::after{top:calc(50% - 100%);left:calc(50% - 100%);width:200%;height:200%}.mdc-tab__ripple.mdc-ripple-upgraded::after{width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}.mdc-tab__ripple::before,.mdc-tab__ripple::after{background-color:#6200ee;background-color:var(--mdc-theme-primary, #6200ee)}.mdc-tab__ripple:hover::before{opacity:.04}.mdc-tab__ripple.mdc-ripple-upgraded--background-focused::before,.mdc-tab__ripple:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:.12}.mdc-tab__ripple:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-tab__ripple:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:.12}.mdc-tab__ripple.mdc-ripple-upgraded{--mdc-ripple-fg-opacity: 0.12}.mdc-tab-bar{width:100%}.mdc-tab{height:48px}.mdc-tab--stacked{height:72px}.mdc-tab-indicator{display:flex;position:absolute;top:0;left:0;justify-content:center;width:100%;height:100%;pointer-events:none;z-index:1}.mdc-tab-indicator .mdc-tab-indicator__content--underline{border-color:#6200ee;border-color:var(--mdc-theme-primary, #6200ee)}.mdc-tab-indicator .mdc-tab-indicator__content--icon{color:#018786;color:var(--mdc-theme-secondary, #018786)}.mdc-tab-indicator .mdc-tab-indicator__content--underline{border-top-width:2px}.mdc-tab-indicator .mdc-tab-indicator__content--icon{height:34px;font-size:34px}.mdc-tab-indicator__content{-webkit-transform-origin:left;transform-origin:left;opacity:0}.mdc-tab-indicator__content--underline{align-self:flex-end;box-sizing:border-box;width:100%;border-top-style:solid}.mdc-tab-indicator__content--icon{align-self:center;margin:0 auto}.mdc-tab-indicator--active .mdc-tab-indicator__content{opacity:1}.mdc-tab-indicator .mdc-tab-indicator__content{transition:250ms -webkit-transform cubic-bezier(0.4, 0, 0.2, 1);transition:250ms transform cubic-bezier(0.4, 0, 0.2, 1);transition:250ms transform cubic-bezier(0.4, 0, 0.2, 1), 250ms -webkit-transform cubic-bezier(0.4, 0, 0.2, 1)}.mdc-tab-indicator--no-transition .mdc-tab-indicator__content{transition:none}.mdc-tab-indicator--fade .mdc-tab-indicator__content{transition:150ms opacity linear}.mdc-tab-indicator--active.mdc-tab-indicator--fade .mdc-tab-indicator__content{transition-delay:100ms}.mdc-tab-scroller{overflow-y:hidden}.mdc-tab-scroller.mdc-tab-scroller--animating .mdc-tab-scroller__scroll-content{transition:250ms -webkit-transform cubic-bezier(0.4, 0, 0.2, 1);transition:250ms transform cubic-bezier(0.4, 0, 0.2, 1);transition:250ms transform cubic-bezier(0.4, 0, 0.2, 1), 250ms -webkit-transform cubic-bezier(0.4, 0, 0.2, 1)}.mdc-tab-scroller__test{position:absolute;top:-9999px;width:100px;height:100px;overflow-x:scroll}.mdc-tab-scroller__scroll-area{-webkit-overflow-scrolling:touch;display:flex;overflow-x:hidden}.mdc-tab-scroller__scroll-area::-webkit-scrollbar,.mdc-tab-scroller__test::-webkit-scrollbar{display:none}.mdc-tab-scroller__scroll-area--scroll{overflow-x:scroll}.mdc-tab-scroller__scroll-content{position:relative;display:flex;flex:1 0 auto;-webkit-transform:none;transform:none;will-change:transform}.mdc-tab-scroller--align-start .mdc-tab-scroller__scroll-content{justify-content:flex-start}.mdc-tab-scroller--align-end .mdc-tab-scroller__scroll-content{justify-content:flex-end}.mdc-tab-scroller--align-center .mdc-tab-scroller__scroll-content{justify-content:center}.mdc-tab-scroller--animating .mdc-tab-scroller__scroll-area{-webkit-overflow-scrolling:auto}.mdc-text-field--filled{--mdc-ripple-fg-size: 0;--mdc-ripple-left: 0;--mdc-ripple-top: 0;--mdc-ripple-fg-scale: 1;--mdc-ripple-fg-translate-end: 0;--mdc-ripple-fg-translate-start: 0;-webkit-tap-highlight-color:rgba(0,0,0,0)}.mdc-text-field--filled .mdc-text-field__ripple::before,.mdc-text-field--filled .mdc-text-field__ripple::after{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:""}.mdc-text-field--filled .mdc-text-field__ripple::before{transition:opacity 15ms linear,background-color 15ms linear;z-index:1}.mdc-text-field--filled.mdc-ripple-upgraded .mdc-text-field__ripple::before{-webkit-transform:scale(var(--mdc-ripple-fg-scale, 1));transform:scale(var(--mdc-ripple-fg-scale, 1))}.mdc-text-field--filled.mdc-ripple-upgraded .mdc-text-field__ripple::after{top:0;left:0;-webkit-transform:scale(0);transform:scale(0);-webkit-transform-origin:center center;transform-origin:center center}.mdc-text-field--filled.mdc-ripple-upgraded--unbounded .mdc-text-field__ripple::after{top:var(--mdc-ripple-top, 0);left:var(--mdc-ripple-left, 0)}.mdc-text-field--filled.mdc-ripple-upgraded--foreground-activation .mdc-text-field__ripple::after{-webkit-animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards;animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards}.mdc-text-field--filled.mdc-ripple-upgraded--foreground-deactivation .mdc-text-field__ripple::after{-webkit-animation:mdc-ripple-fg-opacity-out 150ms;animation:mdc-ripple-fg-opacity-out 150ms;-webkit-transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1));transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}.mdc-text-field--filled .mdc-text-field__ripple::before,.mdc-text-field--filled .mdc-text-field__ripple::after{top:calc(50% - 100%);left:calc(50% - 100%);width:200%;height:200%}.mdc-text-field--filled.mdc-ripple-upgraded .mdc-text-field__ripple::after{width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}.mdc-text-field__ripple{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none}.mdc-text-field{border-top-left-radius:4px;border-top-right-radius:4px;border-bottom-right-radius:0;border-bottom-left-radius:0;padding:0 16px;display:inline-flex;align-items:baseline;position:relative;box-sizing:border-box;overflow:hidden;will-change:opacity,transform,color}.mdc-text-field:not(.mdc-text-field--disabled) .mdc-floating-label{color:rgba(0,0,0,.6)}.mdc-text-field:not(.mdc-text-field--disabled) .mdc-text-field__input{color:rgba(0,0,0,.87)}@media all{.mdc-text-field:not(.mdc-text-field--disabled) .mdc-text-field__input::-webkit-input-placeholder{color:rgba(0,0,0,.54)}.mdc-text-field:not(.mdc-text-field--disabled) .mdc-text-field__input:-ms-input-placeholder{color:rgba(0,0,0,.54)}.mdc-text-field:not(.mdc-text-field--disabled) .mdc-text-field__input::-ms-input-placeholder{color:rgba(0,0,0,.54)}.mdc-text-field:not(.mdc-text-field--disabled) .mdc-text-field__input::placeholder{color:rgba(0,0,0,.54)}}@media all{.mdc-text-field:not(.mdc-text-field--disabled) .mdc-text-field__input:-ms-input-placeholder{color:rgba(0,0,0,.54)}}.mdc-text-field .mdc-text-field__input{caret-color:#6200ee;caret-color:var(--mdc-theme-primary, #6200ee)}.mdc-text-field:not(.mdc-text-field--disabled)+.mdc-text-field-helper-line .mdc-text-field-helper-text{color:rgba(0,0,0,.6)}.mdc-text-field:not(.mdc-text-field--disabled) .mdc-text-field-character-counter,.mdc-text-field:not(.mdc-text-field--disabled)+.mdc-text-field-helper-line .mdc-text-field-character-counter{color:rgba(0,0,0,.6)}.mdc-text-field:not(.mdc-text-field--disabled) .mdc-text-field__icon--leading{color:rgba(0,0,0,.54)}.mdc-text-field:not(.mdc-text-field--disabled) .mdc-text-field__icon--trailing{color:rgba(0,0,0,.54)}.mdc-text-field:not(.mdc-text-field--disabled) .mdc-text-field__affix--prefix{color:rgba(0,0,0,.6)}.mdc-text-field:not(.mdc-text-field--disabled) .mdc-text-field__affix--suffix{color:rgba(0,0,0,.6)}.mdc-text-field .mdc-floating-label{top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);pointer-events:none}.mdc-text-field.mdc-text-field--with-leading-icon{padding-left:0;padding-right:16px}[dir=rtl] .mdc-text-field.mdc-text-field--with-leading-icon,.mdc-text-field.mdc-text-field--with-leading-icon[dir=rtl]{padding-left:16px;padding-right:0}.mdc-text-field.mdc-text-field--with-trailing-icon{padding-left:16px;padding-right:0}[dir=rtl] .mdc-text-field.mdc-text-field--with-trailing-icon,.mdc-text-field.mdc-text-field--with-trailing-icon[dir=rtl]{padding-left:0;padding-right:16px}.mdc-text-field.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon{padding-left:0;padding-right:0}[dir=rtl] .mdc-text-field.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon,.mdc-text-field.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon[dir=rtl]{padding-left:0;padding-right:0}.mdc-text-field__input{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:PingFang SC,Microsoft YaHei, sans-serif;font-family:var(--mdc-typography-subtitle1-font-family, var(--mdc-typography-font-family, PingFang SC, Microsoft YaHei, sans-serif));font-size:1rem;font-size:var(--mdc-typography-subtitle1-font-size, 1rem);font-weight:400;font-weight:var(--mdc-typography-subtitle1-font-weight, 400);letter-spacing:0.009375em;letter-spacing:var(--mdc-typography-subtitle1-letter-spacing, 0.009375em);text-decoration:inherit;-webkit-text-decoration:var(--mdc-typography-subtitle1-text-decoration, inherit);text-decoration:var(--mdc-typography-subtitle1-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-subtitle1-text-transform, inherit);height:28px;transition:opacity 150ms cubic-bezier(0.4, 0, 0.2, 1);width:100%;min-width:0;border:none;border-radius:0;background:none;-webkit-appearance:none;-moz-appearance:none;appearance:none;padding:0}.mdc-text-field__input::-ms-clear{display:none}.mdc-text-field__input:focus{outline:none}.mdc-text-field__input:invalid{box-shadow:none}.mdc-text-field__input:-webkit-autofill{z-index:auto !important}@media all{.mdc-text-field__input::-webkit-input-placeholder{transition:opacity 67ms cubic-bezier(0.4, 0, 0.2, 1);opacity:0}.mdc-text-field__input:-ms-input-placeholder{transition:opacity 67ms cubic-bezier(0.4, 0, 0.2, 1);opacity:0}.mdc-text-field__input::-ms-input-placeholder{transition:opacity 67ms cubic-bezier(0.4, 0, 0.2, 1);opacity:0}.mdc-text-field__input::placeholder{transition:opacity 67ms cubic-bezier(0.4, 0, 0.2, 1);opacity:0}}@media all{.mdc-text-field__input:-ms-input-placeholder{transition:opacity 67ms cubic-bezier(0.4, 0, 0.2, 1);opacity:0}}@media all{.mdc-text-field--fullwidth .mdc-text-field__input::-webkit-input-placeholder,.mdc-text-field--no-label .mdc-text-field__input::-webkit-input-placeholder,.mdc-text-field--focused .mdc-text-field__input::-webkit-input-placeholder{transition-delay:40ms;transition-duration:110ms;opacity:1}.mdc-text-field--fullwidth .mdc-text-field__input:-ms-input-placeholder,.mdc-text-field--no-label .mdc-text-field__input:-ms-input-placeholder,.mdc-text-field--focused .mdc-text-field__input:-ms-input-placeholder{transition-delay:40ms;transition-duration:110ms;opacity:1}.mdc-text-field--fullwidth .mdc-text-field__input::-ms-input-placeholder,.mdc-text-field--no-label .mdc-text-field__input::-ms-input-placeholder,.mdc-text-field--focused .mdc-text-field__input::-ms-input-placeholder{transition-delay:40ms;transition-duration:110ms;opacity:1}.mdc-text-field--fullwidth .mdc-text-field__input::placeholder,.mdc-text-field--no-label .mdc-text-field__input::placeholder,.mdc-text-field--focused .mdc-text-field__input::placeholder{transition-delay:40ms;transition-duration:110ms;opacity:1}}@media all{.mdc-text-field--fullwidth .mdc-text-field__input:-ms-input-placeholder,.mdc-text-field--no-label .mdc-text-field__input:-ms-input-placeholder,.mdc-text-field--focused .mdc-text-field__input:-ms-input-placeholder{transition-delay:40ms;transition-duration:110ms;opacity:1}}.mdc-text-field__affix{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:PingFang SC,Microsoft YaHei, sans-serif;font-family:var(--mdc-typography-subtitle1-font-family, var(--mdc-typography-font-family, PingFang SC, Microsoft YaHei, sans-serif));font-size:1rem;font-size:var(--mdc-typography-subtitle1-font-size, 1rem);font-weight:400;font-weight:var(--mdc-typography-subtitle1-font-weight, 400);letter-spacing:0.009375em;letter-spacing:var(--mdc-typography-subtitle1-letter-spacing, 0.009375em);text-decoration:inherit;-webkit-text-decoration:var(--mdc-typography-subtitle1-text-decoration, inherit);text-decoration:var(--mdc-typography-subtitle1-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-subtitle1-text-transform, inherit);height:28px;transition:opacity 150ms cubic-bezier(0.4, 0, 0.2, 1);opacity:0;white-space:nowrap}.mdc-text-field--label-floating .mdc-text-field__affix,.mdc-text-field--no-label .mdc-text-field__affix{opacity:1}.mdc-text-field__affix--prefix{padding-left:0;padding-right:2px}[dir=rtl] .mdc-text-field__affix--prefix,.mdc-text-field__affix--prefix[dir=rtl]{padding-left:2px;padding-right:0}.mdc-text-field--end-aligned .mdc-text-field__affix--prefix{padding-left:0;padding-right:12px}[dir=rtl] .mdc-text-field--end-aligned .mdc-text-field__affix--prefix,.mdc-text-field--end-aligned .mdc-text-field__affix--prefix[dir=rtl]{padding-left:12px;padding-right:0}.mdc-text-field__affix--suffix{padding-left:12px;padding-right:0}[dir=rtl] .mdc-text-field__affix--suffix,.mdc-text-field__affix--suffix[dir=rtl]{padding-left:0;padding-right:12px}.mdc-text-field--end-aligned .mdc-text-field__affix--suffix{padding-left:2px;padding-right:0}[dir=rtl] .mdc-text-field--end-aligned .mdc-text-field__affix--suffix,.mdc-text-field--end-aligned .mdc-text-field__affix--suffix[dir=rtl]{padding-left:0;padding-right:2px}.mdc-text-field__input:-webkit-autofill+.mdc-floating-label{-webkit-transform:translateY(-50%) scale(0.75);transform:translateY(-50%) scale(0.75);cursor:auto}.mdc-text-field--filled{height:56px}.mdc-text-field--filled .mdc-text-field__ripple::before,.mdc-text-field--filled .mdc-text-field__ripple::after{background-color:rgba(0,0,0,.87)}.mdc-text-field--filled:hover .mdc-text-field__ripple::before{opacity:.04}.mdc-text-field--filled.mdc-ripple-upgraded--background-focused .mdc-text-field__ripple::before,.mdc-text-field--filled:not(.mdc-ripple-upgraded):focus .mdc-text-field__ripple::before{transition-duration:75ms;opacity:.12}.mdc-text-field--filled::before{display:inline-block;width:0;height:40px;content:"";vertical-align:0}.mdc-text-field--filled:not(.mdc-text-field--disabled){background-color:#f5f5f5}.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-line-ripple::before{border-bottom-color:rgba(0,0,0,.42)}.mdc-text-field--filled:not(.mdc-text-field--disabled):hover .mdc-line-ripple::before{border-bottom-color:rgba(0,0,0,.87)}.mdc-text-field--filled .mdc-line-ripple::after{border-bottom-color:#6200ee;border-bottom-color:var(--mdc-theme-primary, #6200ee)}.mdc-text-field--filled .mdc-floating-label{left:16px;right:initial}[dir=rtl] .mdc-text-field--filled .mdc-floating-label,.mdc-text-field--filled .mdc-floating-label[dir=rtl]{left:initial;right:16px}.mdc-text-field--filled .mdc-floating-label--float-above{-webkit-transform:translateY(-106%) scale(0.75);transform:translateY(-106%) scale(0.75)}.mdc-text-field--filled.mdc-text-field--no-label .mdc-text-field__input{height:100%}.mdc-text-field--filled.mdc-text-field--no-label .mdc-floating-label{display:none}.mdc-text-field--filled.mdc-text-field--no-label::before{display:none}.mdc-text-field--outlined{height:56px;overflow:visible}.mdc-text-field--outlined .mdc-floating-label--float-above{-webkit-transform:translateY(-37.25px) scale(1);transform:translateY(-37.25px) scale(1)}.mdc-text-field--outlined .mdc-floating-label--float-above{font-size:.75rem}.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{-webkit-transform:translateY(-34.75px) scale(0.75);transform:translateY(-34.75px) scale(0.75)}.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{font-size:1rem}.mdc-text-field--outlined .mdc-floating-label--shake{-webkit-animation:mdc-floating-label-shake-float-above-text-field-outlined 250ms 1;animation:mdc-floating-label-shake-float-above-text-field-outlined 250ms 1}@-webkit-keyframes mdc-floating-label-shake-float-above-text-field-outlined{0%{-webkit-transform:translateX(calc(0 - 0%)) translateY(-34.75px) scale(0.75);transform:translateX(calc(0 - 0%)) translateY(-34.75px) scale(0.75)}33%{-webkit-animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);-webkit-transform:translateX(calc(4% - 0%)) translateY(-34.75px) scale(0.75);transform:translateX(calc(4% - 0%)) translateY(-34.75px) scale(0.75)}66%{-webkit-animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);-webkit-transform:translateX(calc(-4% - 0%)) translateY(-34.75px) scale(0.75);transform:translateX(calc(-4% - 0%)) translateY(-34.75px) scale(0.75)}100%{-webkit-transform:translateX(calc(0 - 0%)) translateY(-34.75px) scale(0.75);transform:translateX(calc(0 - 0%)) translateY(-34.75px) scale(0.75)}}@keyframes mdc-floating-label-shake-float-above-text-field-outlined{0%{-webkit-transform:translateX(calc(0 - 0%)) translateY(-34.75px) scale(0.75);transform:translateX(calc(0 - 0%)) translateY(-34.75px) scale(0.75)}33%{-webkit-animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);-webkit-transform:translateX(calc(4% - 0%)) translateY(-34.75px) scale(0.75);transform:translateX(calc(4% - 0%)) translateY(-34.75px) scale(0.75)}66%{-webkit-animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);-webkit-transform:translateX(calc(-4% - 0%)) translateY(-34.75px) scale(0.75);transform:translateX(calc(-4% - 0%)) translateY(-34.75px) scale(0.75)}100%{-webkit-transform:translateX(calc(0 - 0%)) translateY(-34.75px) scale(0.75);transform:translateX(calc(0 - 0%)) translateY(-34.75px) scale(0.75)}}.mdc-text-field--outlined .mdc-text-field__input{height:100%}.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-notched-outline__leading,.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-notched-outline__notch,.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-notched-outline__trailing{border-color:rgba(0,0,0,.38)}.mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-notched-outline .mdc-notched-outline__leading,.mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-notched-outline .mdc-notched-outline__notch,.mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-notched-outline .mdc-notched-outline__trailing{border-color:rgba(0,0,0,.87)}.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline__leading,.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline__notch,.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline__trailing{border-color:#6200ee;border-color:var(--mdc-theme-primary, #6200ee)}.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading{border-top-left-radius:4px;border-top-right-radius:0;border-bottom-right-radius:0;border-bottom-left-radius:4px}[dir=rtl] .mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading,.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading[dir=rtl]{border-top-left-radius:0;border-top-right-radius:4px;border-bottom-right-radius:4px;border-bottom-left-radius:0}.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__trailing{border-top-left-radius:0;border-top-right-radius:4px;border-bottom-right-radius:4px;border-bottom-left-radius:0}[dir=rtl] .mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__trailing,.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__trailing[dir=rtl]{border-top-left-radius:4px;border-top-right-radius:0;border-bottom-right-radius:0;border-bottom-left-radius:4px}.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch{padding-top:1px}.mdc-text-field--outlined .mdc-text-field__ripple::before,.mdc-text-field--outlined .mdc-text-field__ripple::after{content:none}.mdc-text-field--outlined .mdc-floating-label{left:4px;right:initial}[dir=rtl] .mdc-text-field--outlined .mdc-floating-label,.mdc-text-field--outlined .mdc-floating-label[dir=rtl]{left:initial;right:4px}.mdc-text-field--outlined .mdc-text-field__input{display:flex;border:none !important;background-color:transparent}.mdc-text-field--textarea{flex-direction:column;align-items:center;width:auto;height:auto;padding:0;transition:none}.mdc-text-field--textarea .mdc-floating-label{top:19px}.mdc-text-field--textarea .mdc-floating-label:not(.mdc-floating-label--float-above){-webkit-transform:none;transform:none}.mdc-text-field--textarea .mdc-text-field__input{flex-grow:1;height:auto;min-height:1.5rem;overflow-x:hidden;overflow-y:auto;box-sizing:border-box;resize:none;padding:0 16px;line-height:1.5rem}.mdc-text-field--textarea.mdc-text-field--filled::before{display:none}.mdc-text-field--textarea.mdc-text-field--filled .mdc-floating-label--float-above{-webkit-transform:translateY(-10.25px) scale(0.75);transform:translateY(-10.25px) scale(0.75)}.mdc-text-field--textarea.mdc-text-field--filled .mdc-floating-label--shake{-webkit-animation:mdc-floating-label-shake-float-above-textarea-filled 250ms 1;animation:mdc-floating-label-shake-float-above-textarea-filled 250ms 1}@-webkit-keyframes mdc-floating-label-shake-float-above-textarea-filled{0%{-webkit-transform:translateX(calc(0 - 0%)) translateY(-10.25px) scale(0.75);transform:translateX(calc(0 - 0%)) translateY(-10.25px) scale(0.75)}33%{-webkit-animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);-webkit-transform:translateX(calc(4% - 0%)) translateY(-10.25px) scale(0.75);transform:translateX(calc(4% - 0%)) translateY(-10.25px) scale(0.75)}66%{-webkit-animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);-webkit-transform:translateX(calc(-4% - 0%)) translateY(-10.25px) scale(0.75);transform:translateX(calc(-4% - 0%)) translateY(-10.25px) scale(0.75)}100%{-webkit-transform:translateX(calc(0 - 0%)) translateY(-10.25px) scale(0.75);transform:translateX(calc(0 - 0%)) translateY(-10.25px) scale(0.75)}}@keyframes mdc-floating-label-shake-float-above-textarea-filled{0%{-webkit-transform:translateX(calc(0 - 0%)) translateY(-10.25px) scale(0.75);transform:translateX(calc(0 - 0%)) translateY(-10.25px) scale(0.75)}33%{-webkit-animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);-webkit-transform:translateX(calc(4% - 0%)) translateY(-10.25px) scale(0.75);transform:translateX(calc(4% - 0%)) translateY(-10.25px) scale(0.75)}66%{-webkit-animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);-webkit-transform:translateX(calc(-4% - 0%)) translateY(-10.25px) scale(0.75);transform:translateX(calc(-4% - 0%)) translateY(-10.25px) scale(0.75)}100%{-webkit-transform:translateX(calc(0 - 0%)) translateY(-10.25px) scale(0.75);transform:translateX(calc(0 - 0%)) translateY(-10.25px) scale(0.75)}}.mdc-text-field--textarea.mdc-text-field--filled .mdc-text-field__input{margin-top:23px;margin-bottom:9px}.mdc-text-field--textarea.mdc-text-field--filled.mdc-text-field--no-label .mdc-text-field__input{margin-top:16px;margin-bottom:16px}.mdc-text-field--textarea.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch{padding-top:0}.mdc-text-field--textarea.mdc-text-field--outlined .mdc-floating-label--float-above{-webkit-transform:translateY(-27.25px) scale(1);transform:translateY(-27.25px) scale(1)}.mdc-text-field--textarea.mdc-text-field--outlined .mdc-floating-label--float-above{font-size:.75rem}.mdc-text-field--textarea.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--textarea.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{-webkit-transform:translateY(-24.75px) scale(0.75);transform:translateY(-24.75px) scale(0.75)}.mdc-text-field--textarea.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--textarea.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{font-size:1rem}.mdc-text-field--textarea.mdc-text-field--outlined .mdc-floating-label--shake{-webkit-animation:mdc-floating-label-shake-float-above-textarea-outlined 250ms 1;animation:mdc-floating-label-shake-float-above-textarea-outlined 250ms 1}@-webkit-keyframes mdc-floating-label-shake-float-above-textarea-outlined{0%{-webkit-transform:translateX(calc(0 - 0%)) translateY(-24.75px) scale(0.75);transform:translateX(calc(0 - 0%)) translateY(-24.75px) scale(0.75)}33%{-webkit-animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);-webkit-transform:translateX(calc(4% - 0%)) translateY(-24.75px) scale(0.75);transform:translateX(calc(4% - 0%)) translateY(-24.75px) scale(0.75)}66%{-webkit-animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);-webkit-transform:translateX(calc(-4% - 0%)) translateY(-24.75px) scale(0.75);transform:translateX(calc(-4% - 0%)) translateY(-24.75px) scale(0.75)}100%{-webkit-transform:translateX(calc(0 - 0%)) translateY(-24.75px) scale(0.75);transform:translateX(calc(0 - 0%)) translateY(-24.75px) scale(0.75)}}@keyframes mdc-floating-label-shake-float-above-textarea-outlined{0%{-webkit-transform:translateX(calc(0 - 0%)) translateY(-24.75px) scale(0.75);transform:translateX(calc(0 - 0%)) translateY(-24.75px) scale(0.75)}33%{-webkit-animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);-webkit-transform:translateX(calc(4% - 0%)) translateY(-24.75px) scale(0.75);transform:translateX(calc(4% - 0%)) translateY(-24.75px) scale(0.75)}66%{-webkit-animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);-webkit-transform:translateX(calc(-4% - 0%)) translateY(-24.75px) scale(0.75);transform:translateX(calc(-4% - 0%)) translateY(-24.75px) scale(0.75)}100%{-webkit-transform:translateX(calc(0 - 0%)) translateY(-24.75px) scale(0.75);transform:translateX(calc(0 - 0%)) translateY(-24.75px) scale(0.75)}}.mdc-text-field--textarea.mdc-text-field--outlined .mdc-text-field__input{margin-top:16px;margin-bottom:16px}.mdc-text-field--textarea.mdc-text-field--outlined .mdc-floating-label{top:18px}.mdc-text-field--textarea.mdc-text-field--with-internal-counter .mdc-text-field__input{margin-bottom:2px}.mdc-text-field--textarea.mdc-text-field--with-internal-counter .mdc-text-field-character-counter{align-self:flex-end;padding:0 16px}.mdc-text-field--textarea.mdc-text-field--with-internal-counter .mdc-text-field-character-counter::after{display:inline-block;width:0;height:16px;content:"";vertical-align:-16px}.mdc-text-field--textarea.mdc-text-field--with-internal-counter .mdc-text-field-character-counter::before{display:none}.mdc-text-field__resizer{align-self:stretch;display:inline-flex;flex-direction:column;flex-grow:1;max-height:100%;max-width:100%;min-height:56px;min-width:-webkit-fit-content;min-width:-moz-fit-content;min-width:fit-content;min-width:-moz-available;min-width:-webkit-fill-available;overflow:hidden;resize:both}.mdc-text-field--filled .mdc-text-field__resizer{-webkit-transform:translateY(-1px);transform:translateY(-1px)}.mdc-text-field--filled .mdc-text-field__resizer .mdc-text-field__input,.mdc-text-field--filled .mdc-text-field__resizer .mdc-text-field-character-counter{-webkit-transform:translateY(1px);transform:translateY(1px)}.mdc-text-field--outlined .mdc-text-field__resizer{-webkit-transform:translateX(-1px) translateY(-1px);transform:translateX(-1px) translateY(-1px)}[dir=rtl] .mdc-text-field--outlined .mdc-text-field__resizer,.mdc-text-field--outlined .mdc-text-field__resizer[dir=rtl]{-webkit-transform:translateX(1px) translateY(-1px);transform:translateX(1px) translateY(-1px)}.mdc-text-field--outlined .mdc-text-field__resizer .mdc-text-field__input,.mdc-text-field--outlined .mdc-text-field__resizer .mdc-text-field-character-counter{-webkit-transform:translateX(1px) translateY(1px);transform:translateX(1px) translateY(1px)}[dir=rtl] .mdc-text-field--outlined .mdc-text-field__resizer .mdc-text-field__input,.mdc-text-field--outlined .mdc-text-field__resizer .mdc-text-field__input[dir=rtl],[dir=rtl] .mdc-text-field--outlined .mdc-text-field__resizer .mdc-text-field-character-counter,.mdc-text-field--outlined .mdc-text-field__resizer .mdc-text-field-character-counter[dir=rtl]{-webkit-transform:translateX(-1px) translateY(1px);transform:translateX(-1px) translateY(1px)}.mdc-text-field--fullwidth{padding:0;width:100%}.mdc-text-field--fullwidth:not(.mdc-text-field--disabled) .mdc-line-ripple::before{border-bottom-color:rgba(0,0,0,.42)}.mdc-text-field--fullwidth.mdc-text-field--disabled .mdc-line-ripple::before{border-bottom-color:rgba(0,0,0,.42)}.mdc-text-field--fullwidth:not(.mdc-text-field--textarea){display:flex}.mdc-text-field--fullwidth:not(.mdc-text-field--textarea) .mdc-text-field__input{height:100%}.mdc-text-field--fullwidth:not(.mdc-text-field--textarea) .mdc-floating-label{display:none}.mdc-text-field--fullwidth:not(.mdc-text-field--textarea)::before{display:none}.mdc-text-field--fullwidth:not(.mdc-text-field--textarea) .mdc-text-field__ripple::before,.mdc-text-field--fullwidth:not(.mdc-text-field--textarea) .mdc-text-field__ripple::after{content:none}.mdc-text-field--fullwidth:not(.mdc-text-field--textarea):not(.mdc-text-field--disabled){background-color:transparent}.mdc-text-field--fullwidth.mdc-text-field--textarea .mdc-text-field__resizer{resize:vertical}.mdc-text-field--with-leading-icon.mdc-text-field--filled .mdc-floating-label{max-width:calc(100% - 48px);left:48px;right:initial}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--filled .mdc-floating-label,.mdc-text-field--with-leading-icon.mdc-text-field--filled .mdc-floating-label[dir=rtl]{left:initial;right:48px}.mdc-text-field--with-leading-icon.mdc-text-field--filled .mdc-floating-label--float-above{max-width:calc(100% / 0.75 - 64px / 0.75)}.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label{left:36px;right:initial}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label,.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label[dir=rtl]{left:initial;right:36px}.mdc-text-field--with-leading-icon.mdc-text-field--outlined :not(.mdc-notched-outline--notched) .mdc-notched-outline__notch{max-width:calc(100% - 60px)}.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--float-above{-webkit-transform:translateY(-37.25px) translateX(-32px) scale(1);transform:translateY(-37.25px) translateX(-32px) scale(1)}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--float-above,.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--float-above[dir=rtl]{-webkit-transform:translateY(-37.25px) translateX(32px) scale(1);transform:translateY(-37.25px) translateX(32px) scale(1)}.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--float-above{font-size:.75rem}.mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{-webkit-transform:translateY(-34.75px) translateX(-32px) scale(0.75);transform:translateY(-34.75px) translateX(-32px) scale(0.75)}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above[dir=rtl],[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above[dir=rtl]{-webkit-transform:translateY(-34.75px) translateX(32px) scale(0.75);transform:translateY(-34.75px) translateX(32px) scale(0.75)}.mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{font-size:1rem}.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--shake{-webkit-animation:mdc-floating-label-shake-float-above-text-field-outlined-leading-icon 250ms 1;animation:mdc-floating-label-shake-float-above-text-field-outlined-leading-icon 250ms 1}@-webkit-keyframes mdc-floating-label-shake-float-above-text-field-outlined-leading-icon{0%{-webkit-transform:translateX(calc(0 - 32px)) translateY(-34.75px) scale(0.75);transform:translateX(calc(0 - 32px)) translateY(-34.75px) scale(0.75)}33%{-webkit-animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);-webkit-transform:translateX(calc(4% - 32px)) translateY(-34.75px) scale(0.75);transform:translateX(calc(4% - 32px)) translateY(-34.75px) scale(0.75)}66%{-webkit-animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);-webkit-transform:translateX(calc(-4% - 32px)) translateY(-34.75px) scale(0.75);transform:translateX(calc(-4% - 32px)) translateY(-34.75px) scale(0.75)}100%{-webkit-transform:translateX(calc(0 - 32px)) translateY(-34.75px) scale(0.75);transform:translateX(calc(0 - 32px)) translateY(-34.75px) scale(0.75)}}@keyframes mdc-floating-label-shake-float-above-text-field-outlined-leading-icon{0%{-webkit-transform:translateX(calc(0 - 32px)) translateY(-34.75px) scale(0.75);transform:translateX(calc(0 - 32px)) translateY(-34.75px) scale(0.75)}33%{-webkit-animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);-webkit-transform:translateX(calc(4% - 32px)) translateY(-34.75px) scale(0.75);transform:translateX(calc(4% - 32px)) translateY(-34.75px) scale(0.75)}66%{-webkit-animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);-webkit-transform:translateX(calc(-4% - 32px)) translateY(-34.75px) scale(0.75);transform:translateX(calc(-4% - 32px)) translateY(-34.75px) scale(0.75)}100%{-webkit-transform:translateX(calc(0 - 32px)) translateY(-34.75px) scale(0.75);transform:translateX(calc(0 - 32px)) translateY(-34.75px) scale(0.75)}}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--shake,.mdc-text-field--with-leading-icon.mdc-text-field--outlined[dir=rtl] .mdc-floating-label--shake{-webkit-animation:mdc-floating-label-shake-float-above-text-field-outlined-leading-icon 250ms 1;animation:mdc-floating-label-shake-float-above-text-field-outlined-leading-icon 250ms 1}@-webkit-keyframes mdc-floating-label-shake-float-above-text-field-outlined-leading-icon-rtl{0%{-webkit-transform:translateX(calc(0 - -32px)) translateY(-34.75px) scale(0.75);transform:translateX(calc(0 - -32px)) translateY(-34.75px) scale(0.75)}33%{-webkit-animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);-webkit-transform:translateX(calc(4% - -32px)) translateY(-34.75px) scale(0.75);transform:translateX(calc(4% - -32px)) translateY(-34.75px) scale(0.75)}66%{-webkit-animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);-webkit-transform:translateX(calc(-4% - -32px)) translateY(-34.75px) scale(0.75);transform:translateX(calc(-4% - -32px)) translateY(-34.75px) scale(0.75)}100%{-webkit-transform:translateX(calc(0 - -32px)) translateY(-34.75px) scale(0.75);transform:translateX(calc(0 - -32px)) translateY(-34.75px) scale(0.75)}}@keyframes mdc-floating-label-shake-float-above-text-field-outlined-leading-icon-rtl{0%{-webkit-transform:translateX(calc(0 - -32px)) translateY(-34.75px) scale(0.75);transform:translateX(calc(0 - -32px)) translateY(-34.75px) scale(0.75)}33%{-webkit-animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);-webkit-transform:translateX(calc(4% - -32px)) translateY(-34.75px) scale(0.75);transform:translateX(calc(4% - -32px)) translateY(-34.75px) scale(0.75)}66%{-webkit-animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);-webkit-transform:translateX(calc(-4% - -32px)) translateY(-34.75px) scale(0.75);transform:translateX(calc(-4% - -32px)) translateY(-34.75px) scale(0.75)}100%{-webkit-transform:translateX(calc(0 - -32px)) translateY(-34.75px) scale(0.75);transform:translateX(calc(0 - -32px)) translateY(-34.75px) scale(0.75)}}.mdc-text-field--with-trailing-icon.mdc-text-field--filled .mdc-floating-label{max-width:calc(100% - 64px)}.mdc-text-field--with-trailing-icon.mdc-text-field--filled .mdc-floating-label--float-above{max-width:calc(100% / 0.75 - 64px / 0.75)}.mdc-text-field--with-trailing-icon.mdc-text-field--outlined :not(.mdc-notched-outline--notched) .mdc-notched-outline__notch{max-width:calc(100% - 60px)}.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon.mdc-text-field--filled .mdc-floating-label{max-width:calc(100% - 96px)}.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon.mdc-text-field--filled .mdc-floating-label--float-above{max-width:calc(100% / 0.75 - 96px / 0.75)}.mdc-text-field-helper-line{display:flex;justify-content:space-between;box-sizing:border-box}.mdc-text-field+.mdc-text-field-helper-line{padding-right:16px;padding-left:16px}.mdc-form-field>.mdc-text-field+label{align-self:flex-start}.mdc-text-field--focused:not(.mdc-text-field--disabled) .mdc-floating-label{color:rgba(98,0,238,.87)}.mdc-text-field--focused .mdc-notched-outline__leading,.mdc-text-field--focused .mdc-notched-outline__notch,.mdc-text-field--focused .mdc-notched-outline__trailing{border-width:2px}.mdc-text-field--focused+.mdc-text-field-helper-line .mdc-text-field-helper-text:not(.mdc-text-field-helper-text--validation-msg){opacity:1}.mdc-text-field--focused.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch{padding-top:2px}.mdc-text-field--focused.mdc-text-field--outlined.mdc-text-field--textarea .mdc-notched-outline--notched .mdc-notched-outline__notch{padding-top:0}.mdc-text-field--invalid:not(.mdc-text-field--disabled):hover .mdc-line-ripple::before{border-bottom-color:#b00020;border-bottom-color:var(--mdc-theme-error, #b00020)}.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-line-ripple::after{border-bottom-color:#b00020;border-bottom-color:var(--mdc-theme-error, #b00020)}.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-floating-label{color:#b00020;color:var(--mdc-theme-error, #b00020)}.mdc-text-field--invalid:not(.mdc-text-field--disabled).mdc-text-field--invalid+.mdc-text-field-helper-line .mdc-text-field-helper-text--validation-msg{color:#b00020;color:var(--mdc-theme-error, #b00020)}.mdc-text-field--invalid .mdc-text-field__input{caret-color:#b00020;caret-color:var(--mdc-theme-error, #b00020)}.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-text-field__icon--trailing{color:#b00020;color:var(--mdc-theme-error, #b00020)}.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-line-ripple::before{border-bottom-color:#b00020;border-bottom-color:var(--mdc-theme-error, #b00020)}.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-notched-outline__leading,.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-notched-outline__notch,.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-notched-outline__trailing{border-color:#b00020;border-color:var(--mdc-theme-error, #b00020)}.mdc-text-field--invalid:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-notched-outline .mdc-notched-outline__leading,.mdc-text-field--invalid:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-notched-outline .mdc-notched-outline__notch,.mdc-text-field--invalid:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-notched-outline .mdc-notched-outline__trailing{border-color:#b00020;border-color:var(--mdc-theme-error, #b00020)}.mdc-text-field--invalid:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline__leading,.mdc-text-field--invalid:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline__notch,.mdc-text-field--invalid:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline__trailing{border-color:#b00020;border-color:var(--mdc-theme-error, #b00020)}.mdc-text-field--invalid+.mdc-text-field-helper-line .mdc-text-field-helper-text--validation-msg{opacity:1}.mdc-text-field--disabled{pointer-events:none}.mdc-text-field--disabled .mdc-text-field__input{color:rgba(0,0,0,.38)}@media all{.mdc-text-field--disabled .mdc-text-field__input::-webkit-input-placeholder{color:rgba(0,0,0,.38)}.mdc-text-field--disabled .mdc-text-field__input:-ms-input-placeholder{color:rgba(0,0,0,.38)}.mdc-text-field--disabled .mdc-text-field__input::-ms-input-placeholder{color:rgba(0,0,0,.38)}.mdc-text-field--disabled .mdc-text-field__input::placeholder{color:rgba(0,0,0,.38)}}@media all{.mdc-text-field--disabled .mdc-text-field__input:-ms-input-placeholder{color:rgba(0,0,0,.38)}}.mdc-text-field--disabled .mdc-floating-label{color:rgba(0,0,0,.38)}.mdc-text-field--disabled+.mdc-text-field-helper-line .mdc-text-field-helper-text{color:rgba(0,0,0,.38)}.mdc-text-field--disabled .mdc-text-field-character-counter,.mdc-text-field--disabled+.mdc-text-field-helper-line .mdc-text-field-character-counter{color:rgba(0,0,0,.38)}.mdc-text-field--disabled .mdc-text-field__icon--leading{color:rgba(0,0,0,.3)}.mdc-text-field--disabled .mdc-text-field__icon--trailing{color:rgba(0,0,0,.3)}.mdc-text-field--disabled .mdc-text-field__affix--prefix{color:rgba(0,0,0,.38)}.mdc-text-field--disabled .mdc-text-field__affix--suffix{color:rgba(0,0,0,.38)}.mdc-text-field--disabled .mdc-line-ripple::before{border-bottom-color:rgba(0,0,0,.06)}.mdc-text-field--disabled .mdc-notched-outline__leading,.mdc-text-field--disabled .mdc-notched-outline__notch,.mdc-text-field--disabled .mdc-notched-outline__trailing{border-color:rgba(0,0,0,.06)}@media screen and (-ms-high-contrast: active){.mdc-text-field--disabled .mdc-text-field__input::-webkit-input-placeholder{color:GrayText}.mdc-text-field--disabled .mdc-text-field__input:-ms-input-placeholder{color:GrayText}.mdc-text-field--disabled .mdc-text-field__input::-ms-input-placeholder{color:GrayText}.mdc-text-field--disabled .mdc-text-field__input::placeholder{color:GrayText}}@media screen and (-ms-high-contrast: active){.mdc-text-field--disabled .mdc-text-field__input:-ms-input-placeholder{color:GrayText}}@media screen and (-ms-high-contrast: active){.mdc-text-field--disabled .mdc-floating-label{color:GrayText}}@media screen and (-ms-high-contrast: active){.mdc-text-field--disabled+.mdc-text-field-helper-line .mdc-text-field-helper-text{color:GrayText}}@media screen and (-ms-high-contrast: active){.mdc-text-field--disabled .mdc-text-field-character-counter,.mdc-text-field--disabled+.mdc-text-field-helper-line .mdc-text-field-character-counter{color:GrayText}}@media screen and (-ms-high-contrast: active){.mdc-text-field--disabled .mdc-text-field__icon--leading{color:GrayText}}@media screen and (-ms-high-contrast: active){.mdc-text-field--disabled .mdc-text-field__icon--trailing{color:GrayText}}@media screen and (-ms-high-contrast: active){.mdc-text-field--disabled .mdc-text-field__affix--prefix{color:GrayText}}@media screen and (-ms-high-contrast: active){.mdc-text-field--disabled .mdc-text-field__affix--suffix{color:GrayText}}@media screen and (-ms-high-contrast: active){.mdc-text-field--disabled .mdc-line-ripple::before{border-bottom-color:GrayText}}@media screen and (-ms-high-contrast: active){.mdc-text-field--disabled .mdc-notched-outline__leading,.mdc-text-field--disabled .mdc-notched-outline__notch,.mdc-text-field--disabled .mdc-notched-outline__trailing{border-color:GrayText}}.mdc-text-field--disabled .mdc-floating-label{cursor:default}.mdc-text-field--disabled.mdc-text-field--filled{background-color:#fafafa}.mdc-text-field--disabled.mdc-text-field--filled .mdc-text-field__ripple{display:none}.mdc-text-field--disabled .mdc-text-field__input{pointer-events:auto}.mdc-text-field--end-aligned .mdc-text-field__input{text-align:right}[dir=rtl] .mdc-text-field--end-aligned .mdc-text-field__input,.mdc-text-field--end-aligned .mdc-text-field__input[dir=rtl]{text-align:left}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__input,[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__affix,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__input,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__affix{direction:ltr}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__affix--prefix,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__affix--prefix{padding-left:0;padding-right:2px}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__affix--suffix,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__affix--suffix{padding-left:12px;padding-right:0}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__icon--leading,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__icon--leading{order:1}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__affix--suffix,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__affix--suffix{order:2}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__input,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__input{order:3}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__affix--prefix,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__affix--prefix{order:4}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__icon--trailing,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__icon--trailing{order:5}[dir=rtl] .mdc-text-field--ltr-text.mdc-text-field--end-aligned .mdc-text-field__input,.mdc-text-field--ltr-text.mdc-text-field--end-aligned[dir=rtl] .mdc-text-field__input{text-align:right}[dir=rtl] .mdc-text-field--ltr-text.mdc-text-field--end-aligned .mdc-text-field__affix--prefix,.mdc-text-field--ltr-text.mdc-text-field--end-aligned[dir=rtl] .mdc-text-field__affix--prefix{padding-right:12px}[dir=rtl] .mdc-text-field--ltr-text.mdc-text-field--end-aligned .mdc-text-field__affix--suffix,.mdc-text-field--ltr-text.mdc-text-field--end-aligned[dir=rtl] .mdc-text-field__affix--suffix{padding-left:2px}.mdc-text-field-helper-text{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:PingFang SC,Microsoft YaHei, sans-serif;font-family:var(--mdc-typography-caption-font-family, var(--mdc-typography-font-family, PingFang SC, Microsoft YaHei, sans-serif));font-size:0.75rem;font-size:var(--mdc-typography-caption-font-size, 0.75rem);line-height:1.25rem;line-height:var(--mdc-typography-caption-line-height, 1.25rem);font-weight:400;font-weight:var(--mdc-typography-caption-font-weight, 400);letter-spacing:0.0333333333em;letter-spacing:var(--mdc-typography-caption-letter-spacing, 0.0333333333em);text-decoration:inherit;-webkit-text-decoration:var(--mdc-typography-caption-text-decoration, inherit);text-decoration:var(--mdc-typography-caption-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-caption-text-transform, inherit);display:block;margin-top:0;line-height:normal;margin:0;opacity:0;will-change:opacity;transition:opacity 150ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-text-field-helper-text::before{display:inline-block;width:0;height:16px;content:"";vertical-align:0}.mdc-text-field-helper-text--persistent{transition:none;opacity:1;will-change:initial}.mdc-text-field-character-counter{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:PingFang SC,Microsoft YaHei, sans-serif;font-family:var(--mdc-typography-caption-font-family, var(--mdc-typography-font-family, PingFang SC, Microsoft YaHei, sans-serif));font-size:0.75rem;font-size:var(--mdc-typography-caption-font-size, 0.75rem);line-height:1.25rem;line-height:var(--mdc-typography-caption-line-height, 1.25rem);font-weight:400;font-weight:var(--mdc-typography-caption-font-weight, 400);letter-spacing:0.0333333333em;letter-spacing:var(--mdc-typography-caption-letter-spacing, 0.0333333333em);text-decoration:inherit;-webkit-text-decoration:var(--mdc-typography-caption-text-decoration, inherit);text-decoration:var(--mdc-typography-caption-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-caption-text-transform, inherit);display:block;margin-top:0;line-height:normal;margin-left:auto;margin-right:0;padding-left:16px;padding-right:0;white-space:nowrap}.mdc-text-field-character-counter::before{display:inline-block;width:0;height:16px;content:"";vertical-align:0}[dir=rtl] .mdc-text-field-character-counter,.mdc-text-field-character-counter[dir=rtl]{margin-left:0;margin-right:auto}[dir=rtl] .mdc-text-field-character-counter,.mdc-text-field-character-counter[dir=rtl]{padding-left:0;padding-right:16px}.mdc-text-field__icon{align-self:center;cursor:pointer}.mdc-text-field__icon:not([tabindex]),.mdc-text-field__icon[tabindex="-1"]{cursor:default;pointer-events:none}.mdc-text-field__icon svg{display:block}.mdc-text-field__icon--leading{margin-left:16px;margin-right:8px}[dir=rtl] .mdc-text-field__icon--leading,.mdc-text-field__icon--leading[dir=rtl]{margin-left:8px;margin-right:16px}.mdc-text-field__icon--trailing{margin-left:12px;margin-right:12px}[dir=rtl] .mdc-text-field__icon--trailing,.mdc-text-field__icon--trailing[dir=rtl]{margin-left:12px;margin-right:12px}:root{--mdc-theme-primary: #6200ee;--mdc-theme-secondary: #018786;--mdc-theme-background: #fff;--mdc-theme-surface: #fff;--mdc-theme-error: #b00020;--mdc-theme-on-primary: #fff;--mdc-theme-on-secondary: #fff;--mdc-theme-on-surface: #000;--mdc-theme-on-error: #fff;--mdc-theme-text-primary-on-background: rgba(0, 0, 0, 0.87);--mdc-theme-text-secondary-on-background: rgba(0, 0, 0, 0.54);--mdc-theme-text-hint-on-background: rgba(0, 0, 0, 0.38);--mdc-theme-text-disabled-on-background: rgba(0, 0, 0, 0.38);--mdc-theme-text-icon-on-background: rgba(0, 0, 0, 0.38);--mdc-theme-text-primary-on-light: rgba(0, 0, 0, 0.87);--mdc-theme-text-secondary-on-light: rgba(0, 0, 0, 0.54);--mdc-theme-text-hint-on-light: rgba(0, 0, 0, 0.38);--mdc-theme-text-disabled-on-light: rgba(0, 0, 0, 0.38);--mdc-theme-text-icon-on-light: rgba(0, 0, 0, 0.38);--mdc-theme-text-primary-on-dark: white;--mdc-theme-text-secondary-on-dark: rgba(255, 255, 255, 0.7);--mdc-theme-text-hint-on-dark: rgba(255, 255, 255, 0.5);--mdc-theme-text-disabled-on-dark: rgba(255, 255, 255, 0.5);--mdc-theme-text-icon-on-dark: rgba(255, 255, 255, 0.5)}.mdc-theme--primary{color:#6200ee !important;color:var(--mdc-theme-primary, #6200ee) !important}.mdc-theme--secondary{color:#018786 !important;color:var(--mdc-theme-secondary, #018786) !important}.mdc-theme--background{background-color:#fff;background-color:var(--mdc-theme-background, #fff)}.mdc-theme--surface{background-color:#fff;background-color:var(--mdc-theme-surface, #fff)}.mdc-theme--error{color:#b00020 !important;color:var(--mdc-theme-error, #b00020) !important}.mdc-theme--on-primary{color:#fff !important;color:var(--mdc-theme-on-primary, #fff) !important}.mdc-theme--on-secondary{color:#fff !important;color:var(--mdc-theme-on-secondary, #fff) !important}.mdc-theme--on-surface{color:#000 !important;color:var(--mdc-theme-on-surface, #000) !important}.mdc-theme--on-error{color:#fff !important;color:var(--mdc-theme-on-error, #fff) !important}.mdc-theme--text-primary-on-background{color:rgba(0,0,0,.87) !important;color:var(--mdc-theme-text-primary-on-background, rgba(0, 0, 0, 0.87)) !important}.mdc-theme--text-secondary-on-background{color:rgba(0,0,0,.54) !important;color:var(--mdc-theme-text-secondary-on-background, rgba(0, 0, 0, 0.54)) !important}.mdc-theme--text-hint-on-background{color:rgba(0,0,0,.38) !important;color:var(--mdc-theme-text-hint-on-background, rgba(0, 0, 0, 0.38)) !important}.mdc-theme--text-disabled-on-background{color:rgba(0,0,0,.38) !important;color:var(--mdc-theme-text-disabled-on-background, rgba(0, 0, 0, 0.38)) !important}.mdc-theme--text-icon-on-background{color:rgba(0,0,0,.38) !important;color:var(--mdc-theme-text-icon-on-background, rgba(0, 0, 0, 0.38)) !important}.mdc-theme--text-primary-on-light{color:rgba(0,0,0,.87) !important;color:var(--mdc-theme-text-primary-on-light, rgba(0, 0, 0, 0.87)) !important}.mdc-theme--text-secondary-on-light{color:rgba(0,0,0,.54) !important;color:var(--mdc-theme-text-secondary-on-light, rgba(0, 0, 0, 0.54)) !important}.mdc-theme--text-hint-on-light{color:rgba(0,0,0,.38) !important;color:var(--mdc-theme-text-hint-on-light, rgba(0, 0, 0, 0.38)) !important}.mdc-theme--text-disabled-on-light{color:rgba(0,0,0,.38) !important;color:var(--mdc-theme-text-disabled-on-light, rgba(0, 0, 0, 0.38)) !important}.mdc-theme--text-icon-on-light{color:rgba(0,0,0,.38) !important;color:var(--mdc-theme-text-icon-on-light, rgba(0, 0, 0, 0.38)) !important}.mdc-theme--text-primary-on-dark{color:#fff !important;color:var(--mdc-theme-text-primary-on-dark, white) !important}.mdc-theme--text-secondary-on-dark{color:rgba(255,255,255,.7) !important;color:var(--mdc-theme-text-secondary-on-dark, rgba(255, 255, 255, 0.7)) !important}.mdc-theme--text-hint-on-dark{color:rgba(255,255,255,.5) !important;color:var(--mdc-theme-text-hint-on-dark, rgba(255, 255, 255, 0.5)) !important}.mdc-theme--text-disabled-on-dark{color:rgba(255,255,255,.5) !important;color:var(--mdc-theme-text-disabled-on-dark, rgba(255, 255, 255, 0.5)) !important}.mdc-theme--text-icon-on-dark{color:rgba(255,255,255,.5) !important;color:var(--mdc-theme-text-icon-on-dark, rgba(255, 255, 255, 0.5)) !important}.mdc-theme--primary-bg{background-color:#6200ee !important;background-color:var(--mdc-theme-primary, #6200ee) !important}.mdc-theme--secondary-bg{background-color:#018786 !important;background-color:var(--mdc-theme-secondary, #018786) !important}.mdc-top-app-bar{background-color:#6200ee;background-color:var(--mdc-theme-primary, #6200ee);color:#fff;display:flex;position:fixed;flex-direction:column;justify-content:space-between;box-sizing:border-box;width:100%;z-index:4}.mdc-top-app-bar .mdc-top-app-bar__action-item,.mdc-top-app-bar .mdc-top-app-bar__navigation-icon{color:#fff;color:var(--mdc-theme-on-primary, #fff)}.mdc-top-app-bar .mdc-top-app-bar__action-item::before,.mdc-top-app-bar .mdc-top-app-bar__action-item::after,.mdc-top-app-bar .mdc-top-app-bar__navigation-icon::before,.mdc-top-app-bar .mdc-top-app-bar__navigation-icon::after{background-color:#fff;background-color:var(--mdc-theme-on-primary, #fff)}.mdc-top-app-bar .mdc-top-app-bar__action-item:hover::before,.mdc-top-app-bar .mdc-top-app-bar__navigation-icon:hover::before{opacity:.08}.mdc-top-app-bar .mdc-top-app-bar__action-item.mdc-ripple-upgraded--background-focused::before,.mdc-top-app-bar .mdc-top-app-bar__action-item:not(.mdc-ripple-upgraded):focus::before,.mdc-top-app-bar .mdc-top-app-bar__navigation-icon.mdc-ripple-upgraded--background-focused::before,.mdc-top-app-bar .mdc-top-app-bar__navigation-icon:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:.24}.mdc-top-app-bar .mdc-top-app-bar__action-item:not(.mdc-ripple-upgraded)::after,.mdc-top-app-bar .mdc-top-app-bar__navigation-icon:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-top-app-bar .mdc-top-app-bar__action-item:not(.mdc-ripple-upgraded):active::after,.mdc-top-app-bar .mdc-top-app-bar__navigation-icon:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:.24}.mdc-top-app-bar .mdc-top-app-bar__action-item.mdc-ripple-upgraded,.mdc-top-app-bar .mdc-top-app-bar__navigation-icon.mdc-ripple-upgraded{--mdc-ripple-fg-opacity: 0.24}.mdc-top-app-bar__row{display:flex;position:relative;box-sizing:border-box;width:100%;height:64px}.mdc-top-app-bar__section{display:inline-flex;flex:1 1 auto;align-items:center;min-width:0;padding:8px 12px;z-index:1}.mdc-top-app-bar__section--align-start{justify-content:flex-start;order:-1}.mdc-top-app-bar__section--align-end{justify-content:flex-end;order:1}.mdc-top-app-bar__title{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:PingFang SC,Microsoft YaHei, sans-serif;font-family:var(--mdc-typography-headline6-font-family, var(--mdc-typography-font-family, PingFang SC, Microsoft YaHei, sans-serif));font-size:1.25rem;font-size:var(--mdc-typography-headline6-font-size, 1.25rem);line-height:2rem;line-height:var(--mdc-typography-headline6-line-height, 2rem);font-weight:500;font-weight:var(--mdc-typography-headline6-font-weight, 500);letter-spacing:0.0125em;letter-spacing:var(--mdc-typography-headline6-letter-spacing, 0.0125em);text-decoration:inherit;-webkit-text-decoration:var(--mdc-typography-headline6-text-decoration, inherit);text-decoration:var(--mdc-typography-headline6-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-headline6-text-transform, inherit);padding-left:20px;padding-right:0;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;z-index:1}[dir=rtl] .mdc-top-app-bar__title,.mdc-top-app-bar__title[dir=rtl]{padding-left:0;padding-right:20px}.mdc-top-app-bar--short-collapsed{border-top-left-radius:0;border-top-right-radius:0;border-bottom-right-radius:24px;border-bottom-left-radius:0}[dir=rtl] .mdc-top-app-bar--short-collapsed,.mdc-top-app-bar--short-collapsed[dir=rtl]{border-top-left-radius:0;border-top-right-radius:0;border-bottom-right-radius:0;border-bottom-left-radius:24px}.mdc-top-app-bar--short{top:0;right:auto;left:0;width:100%;transition:width 250ms cubic-bezier(0.4, 0, 0.2, 1)}[dir=rtl] .mdc-top-app-bar--short,.mdc-top-app-bar--short[dir=rtl]{right:0;left:auto}.mdc-top-app-bar--short .mdc-top-app-bar__row{height:56px}.mdc-top-app-bar--short .mdc-top-app-bar__section{padding:4px}.mdc-top-app-bar--short .mdc-top-app-bar__title{transition:opacity 200ms cubic-bezier(0.4, 0, 0.2, 1);opacity:1}.mdc-top-app-bar--short-collapsed{box-shadow:0px 2px 4px -1px rgba(0, 0, 0, 0.2),0px 4px 5px 0px rgba(0, 0, 0, 0.14),0px 1px 10px 0px rgba(0,0,0,.12);width:56px;transition:width 300ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-top-app-bar--short-collapsed .mdc-top-app-bar__title{display:none}.mdc-top-app-bar--short-collapsed .mdc-top-app-bar__action-item{transition:padding 150ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-top-app-bar--short-collapsed.mdc-top-app-bar--short-has-action-item{width:112px}.mdc-top-app-bar--short-collapsed.mdc-top-app-bar--short-has-action-item .mdc-top-app-bar__section--align-end{padding-left:0;padding-right:12px}[dir=rtl] .mdc-top-app-bar--short-collapsed.mdc-top-app-bar--short-has-action-item .mdc-top-app-bar__section--align-end,.mdc-top-app-bar--short-collapsed.mdc-top-app-bar--short-has-action-item .mdc-top-app-bar__section--align-end[dir=rtl]{padding-left:12px;padding-right:0}.mdc-top-app-bar--dense .mdc-top-app-bar__row{height:48px}.mdc-top-app-bar--dense .mdc-top-app-bar__section{padding:0 4px}.mdc-top-app-bar--dense .mdc-top-app-bar__title{padding-left:12px;padding-right:0}[dir=rtl] .mdc-top-app-bar--dense .mdc-top-app-bar__title,.mdc-top-app-bar--dense .mdc-top-app-bar__title[dir=rtl]{padding-left:0;padding-right:12px}.mdc-top-app-bar--prominent .mdc-top-app-bar__row{height:128px}.mdc-top-app-bar--prominent .mdc-top-app-bar__title{align-self:flex-end;padding-bottom:2px}.mdc-top-app-bar--prominent .mdc-top-app-bar__action-item,.mdc-top-app-bar--prominent .mdc-top-app-bar__navigation-icon{align-self:flex-start}.mdc-top-app-bar--fixed{transition:box-shadow 200ms linear}.mdc-top-app-bar--fixed-scrolled{box-shadow:0px 2px 4px -1px rgba(0, 0, 0, 0.2),0px 4px 5px 0px rgba(0, 0, 0, 0.14),0px 1px 10px 0px rgba(0,0,0,.12);transition:box-shadow 200ms linear}.mdc-top-app-bar--dense.mdc-top-app-bar--prominent .mdc-top-app-bar__row{height:96px}.mdc-top-app-bar--dense.mdc-top-app-bar--prominent .mdc-top-app-bar__section{padding:0 12px}.mdc-top-app-bar--dense.mdc-top-app-bar--prominent .mdc-top-app-bar__title{padding-left:20px;padding-right:0;padding-bottom:9px}[dir=rtl] .mdc-top-app-bar--dense.mdc-top-app-bar--prominent .mdc-top-app-bar__title,.mdc-top-app-bar--dense.mdc-top-app-bar--prominent .mdc-top-app-bar__title[dir=rtl]{padding-left:0;padding-right:20px}.mdc-top-app-bar--fixed-adjust{padding-top:64px}.mdc-top-app-bar--dense-fixed-adjust{padding-top:48px}.mdc-top-app-bar--short-fixed-adjust{padding-top:56px}.mdc-top-app-bar--prominent-fixed-adjust{padding-top:128px}.mdc-top-app-bar--dense-prominent-fixed-adjust{padding-top:96px}@media(max-width: 599px){.mdc-top-app-bar__row{height:56px}.mdc-top-app-bar__section{padding:4px}.mdc-top-app-bar--short{transition:width 200ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-top-app-bar--short-collapsed{transition:width 250ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-top-app-bar--short-collapsed .mdc-top-app-bar__section--align-end{padding-left:0;padding-right:12px}[dir=rtl] .mdc-top-app-bar--short-collapsed .mdc-top-app-bar__section--align-end,.mdc-top-app-bar--short-collapsed .mdc-top-app-bar__section--align-end[dir=rtl]{padding-left:12px;padding-right:0}.mdc-top-app-bar--prominent .mdc-top-app-bar__title{padding-bottom:6px}.mdc-top-app-bar--fixed-adjust{padding-top:56px}}.mdc-typography{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:PingFang SC,Microsoft YaHei, sans-serif;font-family:var(--mdc-typography-font-family, PingFang SC, Microsoft YaHei, sans-serif)}.mdc-typography--headline1{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:PingFang SC,Microsoft YaHei, sans-serif;font-family:var(--mdc-typography-headline1-font-family, var(--mdc-typography-font-family, PingFang SC, Microsoft YaHei, sans-serif));font-size:6rem;font-size:var(--mdc-typography-headline1-font-size, 6rem);line-height:6rem;line-height:var(--mdc-typography-headline1-line-height, 6rem);font-weight:300;font-weight:var(--mdc-typography-headline1-font-weight, 300);letter-spacing:-0.015625em;letter-spacing:var(--mdc-typography-headline1-letter-spacing, -0.015625em);text-decoration:inherit;-webkit-text-decoration:var(--mdc-typography-headline1-text-decoration, inherit);text-decoration:var(--mdc-typography-headline1-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-headline1-text-transform, inherit)}.mdc-typography--headline2{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:PingFang SC,Microsoft YaHei, sans-serif;font-family:var(--mdc-typography-headline2-font-family, var(--mdc-typography-font-family, PingFang SC, Microsoft YaHei, sans-serif));font-size:3.75rem;font-size:var(--mdc-typography-headline2-font-size, 3.75rem);line-height:3.75rem;line-height:var(--mdc-typography-headline2-line-height, 3.75rem);font-weight:300;font-weight:var(--mdc-typography-headline2-font-weight, 300);letter-spacing:-0.0083333333em;letter-spacing:var(--mdc-typography-headline2-letter-spacing, -0.0083333333em);text-decoration:inherit;-webkit-text-decoration:var(--mdc-typography-headline2-text-decoration, inherit);text-decoration:var(--mdc-typography-headline2-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-headline2-text-transform, inherit)}.mdc-typography--headline3{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:PingFang SC,Microsoft YaHei, sans-serif;font-family:var(--mdc-typography-headline3-font-family, var(--mdc-typography-font-family, PingFang SC, Microsoft YaHei, sans-serif));font-size:3rem;font-size:var(--mdc-typography-headline3-font-size, 3rem);line-height:3.125rem;line-height:var(--mdc-typography-headline3-line-height, 3.125rem);font-weight:400;font-weight:var(--mdc-typography-headline3-font-weight, 400);letter-spacing:normal;letter-spacing:var(--mdc-typography-headline3-letter-spacing, normal);text-decoration:inherit;-webkit-text-decoration:var(--mdc-typography-headline3-text-decoration, inherit);text-decoration:var(--mdc-typography-headline3-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-headline3-text-transform, inherit)}.mdc-typography--headline4{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:PingFang SC,Microsoft YaHei, sans-serif;font-family:var(--mdc-typography-headline4-font-family, var(--mdc-typography-font-family, PingFang SC, Microsoft YaHei, sans-serif));font-size:2.125rem;font-size:var(--mdc-typography-headline4-font-size, 2.125rem);line-height:2.5rem;line-height:var(--mdc-typography-headline4-line-height, 2.5rem);font-weight:400;font-weight:var(--mdc-typography-headline4-font-weight, 400);letter-spacing:0.0073529412em;letter-spacing:var(--mdc-typography-headline4-letter-spacing, 0.0073529412em);text-decoration:inherit;-webkit-text-decoration:var(--mdc-typography-headline4-text-decoration, inherit);text-decoration:var(--mdc-typography-headline4-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-headline4-text-transform, inherit)}.mdc-typography--headline5{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:PingFang SC,Microsoft YaHei, sans-serif;font-family:var(--mdc-typography-headline5-font-family, var(--mdc-typography-font-family, PingFang SC, Microsoft YaHei, sans-serif));font-size:1.5rem;font-size:var(--mdc-typography-headline5-font-size, 1.5rem);line-height:2rem;line-height:var(--mdc-typography-headline5-line-height, 2rem);font-weight:400;font-weight:var(--mdc-typography-headline5-font-weight, 400);letter-spacing:normal;letter-spacing:var(--mdc-typography-headline5-letter-spacing, normal);text-decoration:inherit;-webkit-text-decoration:var(--mdc-typography-headline5-text-decoration, inherit);text-decoration:var(--mdc-typography-headline5-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-headline5-text-transform, inherit)}.mdc-typography--headline6{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:PingFang SC,Microsoft YaHei, sans-serif;font-family:var(--mdc-typography-headline6-font-family, var(--mdc-typography-font-family, PingFang SC, Microsoft YaHei, sans-serif));font-size:1.25rem;font-size:var(--mdc-typography-headline6-font-size, 1.25rem);line-height:2rem;line-height:var(--mdc-typography-headline6-line-height, 2rem);font-weight:500;font-weight:var(--mdc-typography-headline6-font-weight, 500);letter-spacing:0.0125em;letter-spacing:var(--mdc-typography-headline6-letter-spacing, 0.0125em);text-decoration:inherit;-webkit-text-decoration:var(--mdc-typography-headline6-text-decoration, inherit);text-decoration:var(--mdc-typography-headline6-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-headline6-text-transform, inherit)}.mdc-typography--subtitle1{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:PingFang SC,Microsoft YaHei, sans-serif;font-family:var(--mdc-typography-subtitle1-font-family, var(--mdc-typography-font-family, PingFang SC, Microsoft YaHei, sans-serif));font-size:1rem;font-size:var(--mdc-typography-subtitle1-font-size, 1rem);line-height:1.75rem;line-height:var(--mdc-typography-subtitle1-line-height, 1.75rem);font-weight:400;font-weight:var(--mdc-typography-subtitle1-font-weight, 400);letter-spacing:0.009375em;letter-spacing:var(--mdc-typography-subtitle1-letter-spacing, 0.009375em);text-decoration:inherit;-webkit-text-decoration:var(--mdc-typography-subtitle1-text-decoration, inherit);text-decoration:var(--mdc-typography-subtitle1-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-subtitle1-text-transform, inherit)}.mdc-typography--subtitle2{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:PingFang SC,Microsoft YaHei, sans-serif;font-family:var(--mdc-typography-subtitle2-font-family, var(--mdc-typography-font-family, PingFang SC, Microsoft YaHei, sans-serif));font-size:0.875rem;font-size:var(--mdc-typography-subtitle2-font-size, 0.875rem);line-height:1.375rem;line-height:var(--mdc-typography-subtitle2-line-height, 1.375rem);font-weight:500;font-weight:var(--mdc-typography-subtitle2-font-weight, 500);letter-spacing:0.0071428571em;letter-spacing:var(--mdc-typography-subtitle2-letter-spacing, 0.0071428571em);text-decoration:inherit;-webkit-text-decoration:var(--mdc-typography-subtitle2-text-decoration, inherit);text-decoration:var(--mdc-typography-subtitle2-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-subtitle2-text-transform, inherit)}.mdc-typography--body1{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:PingFang SC,Microsoft YaHei, sans-serif;font-family:var(--mdc-typography-body1-font-family, var(--mdc-typography-font-family, PingFang SC, Microsoft YaHei, sans-serif));font-size:1rem;font-size:var(--mdc-typography-body1-font-size, 1rem);line-height:1.5rem;line-height:var(--mdc-typography-body1-line-height, 1.5rem);font-weight:400;font-weight:var(--mdc-typography-body1-font-weight, 400);letter-spacing:0.03125em;letter-spacing:var(--mdc-typography-body1-letter-spacing, 0.03125em);text-decoration:inherit;-webkit-text-decoration:var(--mdc-typography-body1-text-decoration, inherit);text-decoration:var(--mdc-typography-body1-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-body1-text-transform, inherit)}.mdc-typography--body2{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:PingFang SC,Microsoft YaHei, sans-serif;font-family:var(--mdc-typography-body2-font-family, var(--mdc-typography-font-family, PingFang SC, Microsoft YaHei, sans-serif));font-size:0.875rem;font-size:var(--mdc-typography-body2-font-size, 0.875rem);line-height:1.25rem;line-height:var(--mdc-typography-body2-line-height, 1.25rem);font-weight:400;font-weight:var(--mdc-typography-body2-font-weight, 400);letter-spacing:0.0178571429em;letter-spacing:var(--mdc-typography-body2-letter-spacing, 0.0178571429em);text-decoration:inherit;-webkit-text-decoration:var(--mdc-typography-body2-text-decoration, inherit);text-decoration:var(--mdc-typography-body2-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-body2-text-transform, inherit)}.mdc-typography--caption{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:PingFang SC,Microsoft YaHei, sans-serif;font-family:var(--mdc-typography-caption-font-family, var(--mdc-typography-font-family, PingFang SC, Microsoft YaHei, sans-serif));font-size:0.75rem;font-size:var(--mdc-typography-caption-font-size, 0.75rem);line-height:1.25rem;line-height:var(--mdc-typography-caption-line-height, 1.25rem);font-weight:400;font-weight:var(--mdc-typography-caption-font-weight, 400);letter-spacing:0.0333333333em;letter-spacing:var(--mdc-typography-caption-letter-spacing, 0.0333333333em);text-decoration:inherit;-webkit-text-decoration:var(--mdc-typography-caption-text-decoration, inherit);text-decoration:var(--mdc-typography-caption-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-caption-text-transform, inherit)}.mdc-typography--button{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:PingFang SC,Microsoft YaHei, sans-serif;font-family:var(--mdc-typography-button-font-family, var(--mdc-typography-font-family, PingFang SC, Microsoft YaHei, sans-serif));font-size:0.875rem;font-size:var(--mdc-typography-button-font-size, 0.875rem);line-height:2.25rem;line-height:var(--mdc-typography-button-line-height, 2.25rem);font-weight:500;font-weight:var(--mdc-typography-button-font-weight, 500);letter-spacing:0.0892857143em;letter-spacing:var(--mdc-typography-button-letter-spacing, 0.0892857143em);text-decoration:none;-webkit-text-decoration:var(--mdc-typography-button-text-decoration, none);text-decoration:var(--mdc-typography-button-text-decoration, none);text-transform:uppercase;text-transform:var(--mdc-typography-button-text-transform, uppercase)}.mdc-typography--overline{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:PingFang SC,Microsoft YaHei, sans-serif;font-family:var(--mdc-typography-overline-font-family, var(--mdc-typography-font-family, PingFang SC, Microsoft YaHei, sans-serif));font-size:0.75rem;font-size:var(--mdc-typography-overline-font-size, 0.75rem);line-height:2rem;line-height:var(--mdc-typography-overline-line-height, 2rem);font-weight:500;font-weight:var(--mdc-typography-overline-font-weight, 500);letter-spacing:0.1666666667em;letter-spacing:var(--mdc-typography-overline-letter-spacing, 0.1666666667em);text-decoration:none;-webkit-text-decoration:var(--mdc-typography-overline-text-decoration, none);text-decoration:var(--mdc-typography-overline-text-decoration, none);text-transform:uppercase;text-transform:var(--mdc-typography-overline-text-transform, uppercase)}

/*# sourceMappingURL=material-components-web.min.css.map*/`);

/* css/pjw.css */
injectStyleFromString(`#pjw-toolbar {
  font-size: 13px;
  position: fixed;
  left: 5%;
  bottom: 20px;
  width: 90%;
  height: auto;
  background-color: #63065f;
  border-radius: 18px;
  color: white;
  padding: 7px 7px 7px 7px;
  opacity: 0.8;
  transition: left .3s ease-out, opacity .3s ease-out;
}
#pjw-toolbar-content {
  margin-left: 53px;
}
.about-proj {
  margin-top: 3px;
  font-size: 12px;
  color: #c1c1c1;
  clear: both;
}

.pjw-mini-button {
  font-size: 14px; font-weight: bold;
  border: 0; border-radius: 7px;
  background-color: white; color: #63065f;
  user-select: none; cursor: pointer;
  padding: 1px 7px;
  margin: 2px 5px;
  transition: all .1s ease-in;
}
.pjw-mini-button:hover {
  color: rgba(255, 155, 25, 1);
  border-radius: 10px;
  padding: 1px 10px;
  margin: 2px;
}
.pjw-mini-button:active {
  color: #c1c1c1;
  background-color: rgba(255, 255, 255, .8);
}
#pjw-toolbar-collapse-bg {
  position: absolute;
  left: -1px;
  top: 0;
  height: 100%;
  width: 50px;
  margin: 0;
  padding: 0;
  background-color: #63065f;
  border-radius: 18px 0 0 18px;
  transition: background-color .2s ease-out;
  cursor: pointer;
}
#pjw-toolbar-collapse-bg:hover {
  background-color: rgba(255, 255, 255, .6);
}
#pjw-toolbar-collapse {
  background-color: white;
  cursor: pointer;
  border: 2px solid #63065f;
  position: absolute;
  margin: 0 10px;
  width: 30px;
  height: 30px;
  left: 0;
  top: calc(50% - 17px);
  border-radius: 50%;
  padding: 0;
  transition: transform .3s ease-out, left .2s ease-out, bottom .2s ease-out;
}

@font-face {
  font-family: 'Material Icons Round';
  font-style: normal;
  font-weight: 400;
  src: 
    url("chrome-extension://__MSG_@@extension_id__/fonts/Material Icons Round.woff2") format('woff2'),
    url("https://fonts.gstatic.com/s/materialiconsround/v26/LDItaoyNOAY6Uewc665JcIzCKsKc_M9flwmPq_HTTw.woff2") format('woff2'),
    url("https://cubiccm.github.io/Material%20Icons%20Round.woff2") format('woff2');
}

.material-icons-round {
  font-family: 'Material Icons Round' !important;
  font-weight: normal;
  font-style: normal;
  font-size: 24px;
  display: inline-block;
  line-height: 1;
  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  direction: ltr;

  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  -moz-osx-font-smoothing: grayscale;
  font-feature-settings: 'liga';
}

:root {
  --white: rgba(255, 255, 255, .9);
  --black: rgba(0, 0, 0, .9);
  --gray: rgba(255, 255, 255, .5);
}

body {
  font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif !important;
  display: block !important;
  background: rgba(0, 0, 0, .05) !important;
}

body * {
  font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

#courseList {
  height: auto !important;
  overflow: hidden !important;
}

#UserInfo {
  color: var(--white) !important;
}

#Header {
  background: linear-gradient(50deg, rgba(99, 6, 95, 0.9) 0%, rgba(93, 42, 175, 0.9) 60%, rgba(255, 71, 71, 0.9) 100%) !important;

  height: auto !important;
}

#Nav {
  position: static !important;
  margin-top: 10px !important;
}

#Nav > ul {
  display: flex;
}

#Nav > ul > li {
  border-radius: 18px 18px 0 0;
  background: none !important;
  display: block;
}

#Nav > ul > li:hover {
  border-color: var(--gray);
  background: rgba(255, 255, 255, .3) !important;
}

#Nav > ul > li:active {
  background: rgba(255, 255, 255, .6) !important;
}

#Nav > ul > li > a {
  color: rgba(255, 255, 255, .65) !important;
  transition: all .1s ease-out;
  font-weight: normal !important;
  font-size: 105%;
}

#Nav > ul > li > a:hover {
  color: var(--white) !important;
  font-size: 125%;
  font-weight: bold !important;
  background: none !important;
}

#Nav > ul > li > a:active {
  color: rgba(0, 0, 0, .3) !important;
  font-size: 115%;
}

#Header > #Logo {
  position: relative;
  left: 5px; top: 5px;
  opacity: 0.9;
}

#Header > #Logo > a {
  content: url("https://www.nju.edu.cn/_upload/tpl/01/36/310/template310/images/logo.png");
  height: 50px;
}

#Header > #Logo:after {
  content: "教务系统 Educational Administration System";
  color: var(--white);
  font-size: 16px;
  position: relative;
  top: -8px;
  left: -5px;
  font-style: italic;
}

#TopLink > a {
  /*color: var(--white) !important;*/
  font-weight: normal !important;
}

#pjw-user-info {
  display: flex;
  padding: 4px 8px;
  margin-top: 10px;
  background-color: rgba(255, 255, 255, .2);
  font-size: 14px;
  border-radius: 12px;
  transition: all .1s ease-out;
  cursor: pointer;
  user-select: none;
}

#pjw-user-info:hover {
  color: rgba(0, 0, 0, .5);
  background-color: rgba(255, 255, 255, .9);
}

#pjw-user-type {
  background-color: rgba(30, 107, 235, 1);
  font-size: 11px;
  border-radius: 7px;
  padding: 1px 3px;
  vertical-align: middle;
  text-align: center;
  margin: 2px 3px;
  color: var(--white) !important;
}

.Line {
  opacity: 0;
}

#pjw-welcome {
  width: 90%;
  max-width: 600px;
  margin: 20px 5%;
  background: linear-gradient(-70deg, #ff6390, #9995ef);
  border-radius: 30px;
  color: rgba(255, 255, 255, .82) !important;
  padding: 12px 24px;
}

#pjw-welcome > * {
  margin: 6px 0;
}

#pjw-welcome heading {
  margin: 10px 0;
  font-weight: bold;
  font-size: 24px;
  color: rgba(255, 255, 255, .9) !important;
}

#pjw-welcome p {
  margin: 4px 0;
  font-size: 15px;
  color: rgba(255, 255, 255, .82) !important;
}

#pjw-welcome note {
  margin: 2px 0;
  display: block;
  font-size: 12px;
  color: rgba(255, 255, 255, .75) !important;
}

#pjw-welcome a {
  margin-right: 15px;
  font-size: 12px;
  text-decoration: none;
  color: rgba(255, 255, 255, .75) !important;
  transition: color .1s ease-out;
}

#pjw-welcome a:hover {
  color: rgba(255, 255, 255, 1) !important;
}


#potatojw_mask {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000000;
  opacity: 0.5;
  z-index: 9000;
}
#potatojw_filter_setting_frame {
  display: none;
  position: fixed;
  left: 15%;
  top: 15%;
  bottom: 5px;
  width: 70%;
  height: auto;
  z-index: 9001;
  background-color: #63065f;
  border-radius: 8px;
  padding: 15px;
  color: white;
  overflow: auto;
}
.filter_section {
  display: none;
}
#filter-control-bar {
  user-select: none;
}
#filter-control-bar > section {
  float: left;
  margin-right: 25px;
  margin-bottom: 5px;
}
#pjw-toolbar-collapse-bg {
  position: absolute;
  left: -1px;
  top: 0;
  height: 100%;
  width: 50px;
  margin: 0;
  padding: 0;
  background-color: #63065f;
  border-radius: 18px 0 0 18px;
  transition: background-color .2s ease-out;
  cursor: pointer;
}
#pjw-toolbar-collapse-bg:hover {
  background-color: rgba(255, 255, 255, .6);
}
#pjw-toolbar-collapse {
  background-color: white;
  cursor: pointer;
  border: 2px solid #63065f;
  position: absolute;
  margin: 0 10px;
  width: 30px;
  height: 30px;
  left: 0;
  top: calc(50% - 17px);
  border-radius: 50%;
  padding: 0;
  transition: transform .3s ease-out, left .2s ease-out, bottom .2s ease-out;
}`);

/* css/pjw-classlist.css */
injectStyleFromString(`/* PJW ClassList */

.pjw-classlist {
  text-align: left;
  margin-bottom: 50px;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  --pjw-dark-background: rgba(54, 79, 125, 1);
}

/* Heading */

.pjw-classlist-heading {
  margin: 12px 5%;
  width: 90%;
}

.pjw-classlist-selectors {
  float: left;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin: 6px 20px;
  flex-wrap: wrap;
}

.pjw-classlist-selectors > div {
  margin: 5px 6px;
}

.mdc-select__anchor {
  display: flex;
  width: 100%;
}

#pjw-select-academyList {
  min-width: 300px;
}

#pjw-select-academySelect {
  min-width: 350px;
}

#pjw-select-specialitySelect {
  min-width: 300px;
}

#pjw-select-termList {
  min-width: 300px;
}

.pjw-classlist-controls {
  float: right;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
}

.pjw-classlist-controls > section {
  margin: 0 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

#autoreload-control-section {
  flex-shrink: 0;
}

#filter-control-section {
  flex-shrink: 0;
}

.pjw-classlist-heading-button {
  background: linear-gradient(220deg, rgba(215, 10, 132), rgba(81, 18, 127));
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 60px;
  padding: 5px 25px;
  border-radius: 30px 0 0 30px;
  margin: 0;
}

.pjw-classlist-heading-button > .mdc-button__ripple {
  border-radius: 30px 0 0 30px;
}

.pjw-classlist-heading-switch-button {
  border-radius: 0 30px 30px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 60px;
  padding: 5px 25px;
  border-radius: 0 30px 30px 0;
  margin: 0;
  border-left: 2px solid white;
}

.pjw-classlist-heading-switch-button.on {
  background: linear-gradient(140deg, rgba(215, 10, 132), rgba(81, 18, 127));
}

.pjw-classlist-heading-switch-button.off {
  background: rgba(0, 0, 0, .7);
}

#pjw-classlist-search-field {
  min-width: 300px;
  margin-top: 10px;
  margin-bottom: 10px;
}

/* Body */

.pjw-classlist-body {
  margin: 0 5%;
  width: 90%;
  top: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  opacity: 0;
}

.pjw-class-container {
  padding: 10px 30px;
  border-radius: 20px;
  margin: 2px 0;
  width: 100%;
  position: relative;
  justify-content: space-between;
  align-items: stretch;
  flex-wrap: nowrap;
  flex-direction: row;
  order: 0;
  background: linear-gradient(200deg, rgba(99,6,95,.2) 0%, rgba(175,55,232,.2) 73%, rgba(255,71,152,.2) 100%);
  transition: background .2s ease-out;
}

.pjw-class-container--compressed {
  padding: 8px 24px;
  background: rgba(255, 255, 255, .2);
}

.pjw-class-container--compressed:hover {
  background: rgba(255, 255, 255, .9);
}

.pjw-class-sub {
  display: flex;
  flex-direction: row;
  user-select: none;
}

.pjw-class-sub > div {
  margin: 0 10px;
}

.pjw-class-container--compressed .pjw-class-sub {
  align-self: center;
}

/* Basic Class Info */

.pjw-class-info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: max(20%, 250px);
}

.pjw-class-container--compressed .pjw-class-info {
  max-width: 50%;
}

.pjw-class-container--compressed .pjw-class-info-additional {
  display: none;
}

.pjw-class-info-bottom {
  margin-top: 8px;
}

.pjw-class-info-bottom p {
  color: rgba(0, 0, 0, .6);
}

.pjw-class-container--compressed .pjw-class-info-bottom p {
  margin: 2px 0;
}

.pjw-class-course-number {
  cursor: pointer;
  transition: color .1s ease-out;
}

.pjw-class-course-number:hover {
  color: var(--black);
}


.pjw-class-title {
  font-size: 17px;
  font-weight: bold;
  color: rgba(0, 0, 0, .9);
}

.pjw-class-teacher {
  font-size: 14px;
  color: rgba(0, 0, 0, .75);
}

.pjw-class-info-top > p {
  margin: 0;
}

.pjw-class-name-initial {
  font-size: 15.5px;
}

/* Weekly Calendar */

.pjw-class-weekcal {
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  border-radius: 14px;
  background-color: rgba(0, 0, 0, .05);
  padding: 6px;
  justify-content: space-around;
  user-select: none;
}

.pjw-class-container--compressed .pjw-class-weekcal {
  background-color: transparent;
}

.pjw-class-weekcal-heading {
  border: 2px solid rgba(0, 0, 0, .3);
  border-radius: 18px;
  height: 34px;
  padding: 0 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
}

.pjw-class-container--compressed .pjw-class-weekcal-heading {
  margin: 10px 0;
  cursor: pointer;
}

.pjw-class-weekcal-heading-day {
  text-align: center;
  vertical-align: middle;
  font-size: 12px;
  line-height: 30px;
  font-weight: bold;
  height: 30px;
  width: 30px;
  margin: 0;
  border-radius: 15px;
}

.pjw-class-weekcal-heading-day.selected {
  color: white;
  background-color: var(--pjw-dark-background);
  margin: 0 2px;
}

.pjw-class-weekcal-calendar {
  display: flex;
  flex-direction: row;
  padding: 0 7px;
}

.pjw-class-container--compressed .pjw-class-weekcal-calendar {
  display: none;
}

.pjw-class-weekcal-calendar-day {
  display: flex;
  flex-direction: column;
  margin: 0;
}

.pjw-class-weekcal-calendar-day.selected {
  display: flex;
  margin: 0 2px;
}

.pjw-class-weekcal-calendar-day > span {
  color: rgba(0, 0, 0, .6);
  font-size: 11px;
  font-family: 'Helvetica Neue', 'Microsoft YaHei', sans-serif;
  width: 17px;
  height: 17px;
  line-height: 17px;
  text-align: center;
  vertical-align: middle;
  border: 1px solid rgba(0, 0, 0, .2);
  border-radius: 9px;
  margin: 2px 6px;
}

.pjw-classlist-body .pjw-class-weekcal-calendar-day > span.selected {
  border: 0;
  border-radius: 0;
  color: white;
  font-weight: bold;
  background-color: var(--pjw-dark-background);
  height: 23px;
  margin: 0 7px;
  white-space: nowrap;
}

.pjw-class-weekcal-calendar-day > span.selected.sel-start {
  border-top-left-radius: 9px;
  border-top-right-radius: 9px;
  height: 21px;
  margin-top: 2px;
}

.pjw-class-weekcal-calendar-day > span.selected.sel-end {
  border-bottom-left-radius: 9px;
  border-bottom-right-radius: 9px;
  height: 21px;
  margin-bottom: 2px;
}

.pjw-class-weekcal-calendar-day > span.selected.sel-odd-class::after {
  content: "单";
  vertical-align: sub;
  font-size: 8px;
}

.pjw-class-weekcal-calendar-day > span.selected.sel-even-class::after {
  content: "双";
  vertical-align: sub;
  font-size: 8px;
}

/* Class Info (Numbers Part) */

.pjw-class-sideinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
}

.pjw-class-time-detail {
  color: rgba(0, 0, 0, .6);
}

.pjw-class-container--compressed .pjw-class-time-detail {
  display: none;
}

.pjw-class-weeknum-bar {
  height: 16px;
  width: 200px;
  border: 1px solid rgba(0, 0, 0, .2);
  border-radius: 9px;
  position: relative;
  margin: 6px 0;
}

.pjw-class-container--compressed .pjw-class-weeknum-bar {
  width: 180px;
  cursor: pointer;
}

.pjw-class-weeknum-bar__fill {
  position: absolute;
  height: 16px;
  border-radius: 9px;
  background: linear-gradient(95deg, var(--pjw-dark-background), rgba(123, 11, 94, 1));
  color: white;
  text-align: center;
  vertical-align: middle;
  font-size: 11px;
  line-height: 16px;
}

.pjw-class-num-info {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}

.pjw-class-container--compressed .pjw-class-num-info {
  justify-content: center;
}

.pjw-class-bignum {
  padding: 0 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

.pjw-class-container--compressed .pjw-class-bignum {
  margin: 0 10px;
  flex-direction: row;
  align-items: flex-end;
  padding: 0;
  cursor: pointer;
  user-select: none;
}

.pjw-class-bignum > .num {
  font-size: 32px;
  font-weight: bold;
  color: black;
}

.pjw-class-container--compressed .pjw-class-bignum > .num {
  font-size: 24px;
  line-height: 24px;
  margin: 0 2px;
}

.pjw-class-bignum > .label {
  color: rgba(0, 0, 0, .6);
}

.pjw-class-container--compressed .pjw-class-bignum > .label {
  font-size: 12px;
  max-width: 60px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Class Operations */

.pjw-class-operation {
  display: flex;
  flex-direction: row;
  padding: 0 10px;
  justify-content: space-around;
  align-items: center;
}

.pjw-class-container--compressed .pjw-class-operation {
  flex-direction: row;
  padding: 0 10px;
}

.pjw-class-select-button {
  min-width: 120px;
  background: linear-gradient(114deg, rgba(81, 18, 127, .9) 0%, rgba(215, 10, 132, .9) 100%);
}

.pjw-class-select-button.deselect {
  background: darkred;
}

.pjw-class-select-button:disabled {
  color: rgba(0, 0, 0, .5);
  background: rgba(0, 0, 0, .3);
}

.pjw-class-comment-button {
  width: 50px;
  min-width: 50px;
  max-width: 50px;
  background: linear-gradient(-45deg, rgba(215, 10, 132, .9), rgba(248, 111, 100, .9));
  padding: 0;
}

.pjw-class-comment-icon {
  font-size: 24px;
}

.pjw-class-operation > button {
  border-radius: 25px;
  font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif !important;
  min-height: 50px;
  margin: 8px 5px;
}

.pjw-class-operation > button > .mdc-button__ripple {
  border-radius: 25px;
}

.pjw-class-select-button__container {
  margin-left: 20px;
}

.pjw-class-select-button__container > div {
  white-space: nowrap;
}

.pjw-class-select-button__label {
  font-size: 16px;
  font-weight: bold;
}

.pjw-class-select-button__status {
  font-size: 10px;
}

.pjw-class-comment-button__container {
  display: flex;
  flex-direction: column;
}

.pjw-class-comment-button__status {
  font-size: 9px;
  letter-spacing: 0;
}

/* PJW Console */
#pjw-console {
  position: fixed;
  margin: 10px 20%;
  bottom: -70px;
  opacity: 0;
  width: 60%;

  z-index: 100;
  border-radius: 20px;
  transition: all .4s ease-out;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  filter: drop-shadow(3px -4px 6px rgba(0, 0, 0, .2));
  background: rgba(255, 255, 255, .9);
}

.pjw-console-icon {
  margin: 5px 10px 5px 20px;
  font-size: 21px;
}

.pjw-console-icon.error {
  color: #ff3300;
}

.pjw-console-icon.warning {
  color: #ff8936;
}

.pjw-console-icon.info {
  color: blue;
}

.pjw-console-icon.code {
  color: rgba(0, 0, 0, .6);
}

.pjw-console-icon.done {
  color: limegreen;
}

.pjw-console-icon.alarm {
  color: #9eb314;
}

#pjw-console-history {
  width: 100%;
  max-height: 500px;
  overflow: auto;
  display: none;
  flex-direction: column;
  align-items: flex-start;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background: rgba(0, 0, 0, .1);
}

.pjw-console-item {
  min-height: 34px;
  padding: 3px 20px;
  display: flex;
  flex-direction: row;
  flex-shrink: 0;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
}

.pjw-console-text {
  overflow-wrap: anywhere;
  hyphens: "-";
}

.narrow-desktop .pjw-class-sub {
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.narrow-desktop .pjw-class-operation {
  flex-direction: column;
  padding: 20px 0;
}

.pjw-classlist-bottom {
  margin-top: 40px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.pjw-classlist-bottom > p {
  text-align: center;
  font-size: 11px;
  color: rgba(0, 0, 0, .5);
  margin-left: 6px;
}
`);

/* css/pjw-filter.css */
injectStyleFromString(`.pjw-filter-panel {
  color: rgba(0, 0, 0, .4);
  margin: 0 12%;
  border-radius: 20px;
  width: 76%;
  background: linear-gradient(-20deg, #b6dcff, #b9b6e5);
  --mdc-theme-secondary: rgb(16, 89, 223);
  transition: transform .2s ease-in, opacity .2s ease-in;

  pointer-events: none;
  transform: translate(-20px, -40px) scale(1.1, 1.1);
  opacity: 0;
  height: 0;
}

.pjw-filter-panel.shown {
  height: auto;
  opacity: 1;
  pointer-events: auto;
  transform: none;
}

.pjw-filter-panel__content {
  margin: 10px 0;
  display: flex;
  flex-direction: column;
}

.pjw-filter-panel__content > div {
  margin: 20px 0;
}

.pjw-filter-panel heading {
  display: block;
  color: rgba(0, 0, 0, .7);
  margin: 6px 0;
  font-size: 15px;
  display: flex;
  align-items: center;
}

.pjw-filter-panel .content {
  margin: 10px 16px;
}

.pjw-filter-panel heading > .material-icons-round {
  font-size: 26px;
  margin: 0 5px;
  color: rgba(0, 0, 0, .7);
}

.pjw-filter-panel__content {
  margin: 20px 24px;
}

.pjw-filter-panel .mdc-switch {
  margin: 5px 10px;
}

.pjw-switch-box {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin: 15px;
}

#pjw-hours-filter > .content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

#pjw-hours-filter .pjw-class-weekcal-heading-day {
  cursor: pointer;
  transition: color .1s ease-out;
}

#pjw-hours-filter .select-time > span {
  cursor: pointer;
  transition: color .1s ease-out;
}

#pjw-hours-filter .pjw-class-weekcal-heading-day:hover {
  color: var(--white);
}

#pjw-hours-filter .select-time > span:hover {
  color: var(--white);
}

#pjw-hours-filter .pjw-class-weekcal-calendar-day > span.selected {
  color: rgba(255, 255, 255, .7);
  text-decoration: line-through;
  background-color: rgba(0, 0, 0, .5);
}

#pjw-hours-filter .pjw-class-weekcal-calendar-day.select-time > span {
  font-weight: bold;
  border-color: transparent;
}

#pjw-hours-filter-control {
  display: flex;
  margin: 10px 0;
  opacity: 0.65;
  transition: opacity .1s ease-out;
}

#pjw-hours-filter-control:hover {
  display: flex;
  margin: 10px 0;
  opacity: 1;
}

#pjw-hours-filter-control > .pjw-mini-button {
  color: var(--pjw-dark-background);
}

#pjw-hours-filter-control > .pjw-mini-button:hover {
  color: rgb(208, 196, 16);
}

#frozen-quotes {
  font-size: 12px;
  color: rgba(0, 0, 0, .35);
}`);


/* js/jquery.min.js */
/*! jQuery v3.5.1 | (c) JS Foundation and other contributors | jquery.org/license */
!function(e,t){"use strict";"object"==typeof module&&"object"==typeof module.exports?module.exports=e.document?t(e,!0):function(e){if(!e.document)throw new Error("jQuery requires a window with a document");return t(e)}:t(e)}("undefined"!=typeof window?window:this,function(C,e){"use strict";var t=[],r=Object.getPrototypeOf,s=t.slice,g=t.flat?function(e){return t.flat.call(e)}:function(e){return t.concat.apply([],e)},u=t.push,i=t.indexOf,n={},o=n.toString,v=n.hasOwnProperty,a=v.toString,l=a.call(Object),y={},m=function(e){return"function"==typeof e&&"number"!=typeof e.nodeType},x=function(e){return null!=e&&e===e.window},E=C.document,c={type:!0,src:!0,nonce:!0,noModule:!0};function b(e,t,n){var r,i,o=(n=n||E).createElement("script");if(o.text=e,t)for(r in c)(i=t[r]||t.getAttribute&&t.getAttribute(r))&&o.setAttribute(r,i);n.head.appendChild(o).parentNode.removeChild(o)}function w(e){return null==e?e+"":"object"==typeof e||"function"==typeof e?n[o.call(e)]||"object":typeof e}var f="3.5.1",S=function(e,t){return new S.fn.init(e,t)};function p(e){var t=!!e&&"length"in e&&e.length,n=w(e);return!m(e)&&!x(e)&&("array"===n||0===t||"number"==typeof t&&0<t&&t-1 in e)}S.fn=S.prototype={jquery:f,constructor:S,length:0,toArray:function(){return s.call(this)},get:function(e){return null==e?s.call(this):e<0?this[e+this.length]:this[e]},pushStack:function(e){var t=S.merge(this.constructor(),e);return t.prevObject=this,t},each:function(e){return S.each(this,e)},map:function(n){return this.pushStack(S.map(this,function(e,t){return n.call(e,t,e)}))},slice:function(){return this.pushStack(s.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},even:function(){return this.pushStack(S.grep(this,function(e,t){return(t+1)%2}))},odd:function(){return this.pushStack(S.grep(this,function(e,t){return t%2}))},eq:function(e){var t=this.length,n=+e+(e<0?t:0);return this.pushStack(0<=n&&n<t?[this[n]]:[])},end:function(){return this.prevObject||this.constructor()},push:u,sort:t.sort,splice:t.splice},S.extend=S.fn.extend=function(){var e,t,n,r,i,o,a=arguments[0]||{},s=1,u=arguments.length,l=!1;for("boolean"==typeof a&&(l=a,a=arguments[s]||{},s++),"object"==typeof a||m(a)||(a={}),s===u&&(a=this,s--);s<u;s++)if(null!=(e=arguments[s]))for(t in e)r=e[t],"__proto__"!==t&&a!==r&&(l&&r&&(S.isPlainObject(r)||(i=Array.isArray(r)))?(n=a[t],o=i&&!Array.isArray(n)?[]:i||S.isPlainObject(n)?n:{},i=!1,a[t]=S.extend(l,o,r)):void 0!==r&&(a[t]=r));return a},S.extend({expando:"jQuery"+(f+Math.random()).replace(/\D/g,""),isReady:!0,error:function(e){throw new Error(e)},noop:function(){},isPlainObject:function(e){var t,n;return!(!e||"[object Object]"!==o.call(e))&&(!(t=r(e))||"function"==typeof(n=v.call(t,"constructor")&&t.constructor)&&a.call(n)===l)},isEmptyObject:function(e){var t;for(t in e)return!1;return!0},globalEval:function(e,t,n){b(e,{nonce:t&&t.nonce},n)},each:function(e,t){var n,r=0;if(p(e)){for(n=e.length;r<n;r++)if(!1===t.call(e[r],r,e[r]))break}else for(r in e)if(!1===t.call(e[r],r,e[r]))break;return e},makeArray:function(e,t){var n=t||[];return null!=e&&(p(Object(e))?S.merge(n,"string"==typeof e?[e]:e):u.call(n,e)),n},inArray:function(e,t,n){return null==t?-1:i.call(t,e,n)},merge:function(e,t){for(var n=+t.length,r=0,i=e.length;r<n;r++)e[i++]=t[r];return e.length=i,e},grep:function(e,t,n){for(var r=[],i=0,o=e.length,a=!n;i<o;i++)!t(e[i],i)!==a&&r.push(e[i]);return r},map:function(e,t,n){var r,i,o=0,a=[];if(p(e))for(r=e.length;o<r;o++)null!=(i=t(e[o],o,n))&&a.push(i);else for(o in e)null!=(i=t(e[o],o,n))&&a.push(i);return g(a)},guid:1,support:y}),"function"==typeof Symbol&&(S.fn[Symbol.iterator]=t[Symbol.iterator]),S.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),function(e,t){n["[object "+t+"]"]=t.toLowerCase()});var d=function(n){var e,d,b,o,i,h,f,g,w,u,l,T,C,a,E,v,s,c,y,S="sizzle"+1*new Date,p=n.document,k=0,r=0,m=ue(),x=ue(),A=ue(),N=ue(),D=function(e,t){return e===t&&(l=!0),0},j={}.hasOwnProperty,t=[],q=t.pop,L=t.push,H=t.push,O=t.slice,P=function(e,t){for(var n=0,r=e.length;n<r;n++)if(e[n]===t)return n;return-1},R="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",M="[\\x20\\t\\r\\n\\f]",I="(?:\\\\[\\da-fA-F]{1,6}"+M+"?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",W="\\["+M+"*("+I+")(?:"+M+"*([*^$|!~]?=)"+M+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+I+"))|)"+M+"*\\]",F=":("+I+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+W+")*)|.*)\\)|)",B=new RegExp(M+"+","g"),$=new RegExp("^"+M+"+|((?:^|[^\\\\])(?:\\\\.)*)"+M+"+$","g"),_=new RegExp("^"+M+"*,"+M+"*"),z=new RegExp("^"+M+"*([>+~]|"+M+")"+M+"*"),U=new RegExp(M+"|>"),X=new RegExp(F),V=new RegExp("^"+I+"$"),G={ID:new RegExp("^#("+I+")"),CLASS:new RegExp("^\\.("+I+")"),TAG:new RegExp("^("+I+"|[*])"),ATTR:new RegExp("^"+W),PSEUDO:new RegExp("^"+F),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+M+"*(even|odd|(([+-]|)(\\d*)n|)"+M+"*(?:([+-]|)"+M+"*(\\d+)|))"+M+"*\\)|)","i"),bool:new RegExp("^(?:"+R+")$","i"),needsContext:new RegExp("^"+M+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+M+"*((?:-\\d)?\\d*)"+M+"*\\)|)(?=[^-]|$)","i")},Y=/HTML$/i,Q=/^(?:input|select|textarea|button)$/i,J=/^h\d$/i,K=/^[^{]+\{\s*\[native \w/,Z=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,ee=/[+~]/,te=new RegExp("\\\\[\\da-fA-F]{1,6}"+M+"?|\\\\([^\\r\\n\\f])","g"),ne=function(e,t){var n="0x"+e.slice(1)-65536;return t||(n<0?String.fromCharCode(n+65536):String.fromCharCode(n>>10|55296,1023&n|56320))},re=/([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,ie=function(e,t){return t?"\0"===e?"\ufffd":e.slice(0,-1)+"\\"+e.charCodeAt(e.length-1).toString(16)+" ":"\\"+e},oe=function(){T()},ae=be(function(e){return!0===e.disabled&&"fieldset"===e.nodeName.toLowerCase()},{dir:"parentNode",next:"legend"});try{H.apply(t=O.call(p.childNodes),p.childNodes),t[p.childNodes.length].nodeType}catch(e){H={apply:t.length?function(e,t){L.apply(e,O.call(t))}:function(e,t){var n=e.length,r=0;while(e[n++]=t[r++]);e.length=n-1}}}function se(t,e,n,r){var i,o,a,s,u,l,c,f=e&&e.ownerDocument,p=e?e.nodeType:9;if(n=n||[],"string"!=typeof t||!t||1!==p&&9!==p&&11!==p)return n;if(!r&&(T(e),e=e||C,E)){if(11!==p&&(u=Z.exec(t)))if(i=u[1]){if(9===p){if(!(a=e.getElementById(i)))return n;if(a.id===i)return n.push(a),n}else if(f&&(a=f.getElementById(i))&&y(e,a)&&a.id===i)return n.push(a),n}else{if(u[2])return H.apply(n,e.getElementsByTagName(t)),n;if((i=u[3])&&d.getElementsByClassName&&e.getElementsByClassName)return H.apply(n,e.getElementsByClassName(i)),n}if(d.qsa&&!N[t+" "]&&(!v||!v.test(t))&&(1!==p||"object"!==e.nodeName.toLowerCase())){if(c=t,f=e,1===p&&(U.test(t)||z.test(t))){(f=ee.test(t)&&ye(e.parentNode)||e)===e&&d.scope||((s=e.getAttribute("id"))?s=s.replace(re,ie):e.setAttribute("id",s=S)),o=(l=h(t)).length;while(o--)l[o]=(s?"#"+s:":scope")+" "+xe(l[o]);c=l.join(",")}try{return H.apply(n,f.querySelectorAll(c)),n}catch(e){N(t,!0)}finally{s===S&&e.removeAttribute("id")}}}return g(t.replace($,"$1"),e,n,r)}function ue(){var r=[];return function e(t,n){return r.push(t+" ")>b.cacheLength&&delete e[r.shift()],e[t+" "]=n}}function le(e){return e[S]=!0,e}function ce(e){var t=C.createElement("fieldset");try{return!!e(t)}catch(e){return!1}finally{t.parentNode&&t.parentNode.removeChild(t),t=null}}function fe(e,t){var n=e.split("|"),r=n.length;while(r--)b.attrHandle[n[r]]=t}function pe(e,t){var n=t&&e,r=n&&1===e.nodeType&&1===t.nodeType&&e.sourceIndex-t.sourceIndex;if(r)return r;if(n)while(n=n.nextSibling)if(n===t)return-1;return e?1:-1}function de(t){return function(e){return"input"===e.nodeName.toLowerCase()&&e.type===t}}function he(n){return function(e){var t=e.nodeName.toLowerCase();return("input"===t||"button"===t)&&e.type===n}}function ge(t){return function(e){return"form"in e?e.parentNode&&!1===e.disabled?"label"in e?"label"in e.parentNode?e.parentNode.disabled===t:e.disabled===t:e.isDisabled===t||e.isDisabled!==!t&&ae(e)===t:e.disabled===t:"label"in e&&e.disabled===t}}function ve(a){return le(function(o){return o=+o,le(function(e,t){var n,r=a([],e.length,o),i=r.length;while(i--)e[n=r[i]]&&(e[n]=!(t[n]=e[n]))})})}function ye(e){return e&&"undefined"!=typeof e.getElementsByTagName&&e}for(e in d=se.support={},i=se.isXML=function(e){var t=e.namespaceURI,n=(e.ownerDocument||e).documentElement;return!Y.test(t||n&&n.nodeName||"HTML")},T=se.setDocument=function(e){var t,n,r=e?e.ownerDocument||e:p;return r!=C&&9===r.nodeType&&r.documentElement&&(a=(C=r).documentElement,E=!i(C),p!=C&&(n=C.defaultView)&&n.top!==n&&(n.addEventListener?n.addEventListener("unload",oe,!1):n.attachEvent&&n.attachEvent("onunload",oe)),d.scope=ce(function(e){return a.appendChild(e).appendChild(C.createElement("div")),"undefined"!=typeof e.querySelectorAll&&!e.querySelectorAll(":scope fieldset div").length}),d.attributes=ce(function(e){return e.className="i",!e.getAttribute("className")}),d.getElementsByTagName=ce(function(e){return e.appendChild(C.createComment("")),!e.getElementsByTagName("*").length}),d.getElementsByClassName=K.test(C.getElementsByClassName),d.getById=ce(function(e){return a.appendChild(e).id=S,!C.getElementsByName||!C.getElementsByName(S).length}),d.getById?(b.filter.ID=function(e){var t=e.replace(te,ne);return function(e){return e.getAttribute("id")===t}},b.find.ID=function(e,t){if("undefined"!=typeof t.getElementById&&E){var n=t.getElementById(e);return n?[n]:[]}}):(b.filter.ID=function(e){var n=e.replace(te,ne);return function(e){var t="undefined"!=typeof e.getAttributeNode&&e.getAttributeNode("id");return t&&t.value===n}},b.find.ID=function(e,t){if("undefined"!=typeof t.getElementById&&E){var n,r,i,o=t.getElementById(e);if(o){if((n=o.getAttributeNode("id"))&&n.value===e)return[o];i=t.getElementsByName(e),r=0;while(o=i[r++])if((n=o.getAttributeNode("id"))&&n.value===e)return[o]}return[]}}),b.find.TAG=d.getElementsByTagName?function(e,t){return"undefined"!=typeof t.getElementsByTagName?t.getElementsByTagName(e):d.qsa?t.querySelectorAll(e):void 0}:function(e,t){var n,r=[],i=0,o=t.getElementsByTagName(e);if("*"===e){while(n=o[i++])1===n.nodeType&&r.push(n);return r}return o},b.find.CLASS=d.getElementsByClassName&&function(e,t){if("undefined"!=typeof t.getElementsByClassName&&E)return t.getElementsByClassName(e)},s=[],v=[],(d.qsa=K.test(C.querySelectorAll))&&(ce(function(e){var t;a.appendChild(e).innerHTML="<a id='"+S+"'></a><select id='"+S+"-\r\\' msallowcapture=''><option selected=''></option></select>",e.querySelectorAll("[msallowcapture^='']").length&&v.push("[*^$]="+M+"*(?:''|\"\")"),e.querySelectorAll("[selected]").length||v.push("\\["+M+"*(?:value|"+R+")"),e.querySelectorAll("[id~="+S+"-]").length||v.push("~="),(t=C.createElement("input")).setAttribute("name",""),e.appendChild(t),e.querySelectorAll("[name='']").length||v.push("\\["+M+"*name"+M+"*="+M+"*(?:''|\"\")"),e.querySelectorAll(":checked").length||v.push(":checked"),e.querySelectorAll("a#"+S+"+*").length||v.push(".#.+[+~]"),e.querySelectorAll("\\\f"),v.push("[\\r\\n\\f]")}),ce(function(e){e.innerHTML="<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";var t=C.createElement("input");t.setAttribute("type","hidden"),e.appendChild(t).setAttribute("name","D"),e.querySelectorAll("[name=d]").length&&v.push("name"+M+"*[*^$|!~]?="),2!==e.querySelectorAll(":enabled").length&&v.push(":enabled",":disabled"),a.appendChild(e).disabled=!0,2!==e.querySelectorAll(":disabled").length&&v.push(":enabled",":disabled"),e.querySelectorAll("*,:x"),v.push(",.*:")})),(d.matchesSelector=K.test(c=a.matches||a.webkitMatchesSelector||a.mozMatchesSelector||a.oMatchesSelector||a.msMatchesSelector))&&ce(function(e){d.disconnectedMatch=c.call(e,"*"),c.call(e,"[s!='']:x"),s.push("!=",F)}),v=v.length&&new RegExp(v.join("|")),s=s.length&&new RegExp(s.join("|")),t=K.test(a.compareDocumentPosition),y=t||K.test(a.contains)?function(e,t){var n=9===e.nodeType?e.documentElement:e,r=t&&t.parentNode;return e===r||!(!r||1!==r.nodeType||!(n.contains?n.contains(r):e.compareDocumentPosition&&16&e.compareDocumentPosition(r)))}:function(e,t){if(t)while(t=t.parentNode)if(t===e)return!0;return!1},D=t?function(e,t){if(e===t)return l=!0,0;var n=!e.compareDocumentPosition-!t.compareDocumentPosition;return n||(1&(n=(e.ownerDocument||e)==(t.ownerDocument||t)?e.compareDocumentPosition(t):1)||!d.sortDetached&&t.compareDocumentPosition(e)===n?e==C||e.ownerDocument==p&&y(p,e)?-1:t==C||t.ownerDocument==p&&y(p,t)?1:u?P(u,e)-P(u,t):0:4&n?-1:1)}:function(e,t){if(e===t)return l=!0,0;var n,r=0,i=e.parentNode,o=t.parentNode,a=[e],s=[t];if(!i||!o)return e==C?-1:t==C?1:i?-1:o?1:u?P(u,e)-P(u,t):0;if(i===o)return pe(e,t);n=e;while(n=n.parentNode)a.unshift(n);n=t;while(n=n.parentNode)s.unshift(n);while(a[r]===s[r])r++;return r?pe(a[r],s[r]):a[r]==p?-1:s[r]==p?1:0}),C},se.matches=function(e,t){return se(e,null,null,t)},se.matchesSelector=function(e,t){if(T(e),d.matchesSelector&&E&&!N[t+" "]&&(!s||!s.test(t))&&(!v||!v.test(t)))try{var n=c.call(e,t);if(n||d.disconnectedMatch||e.document&&11!==e.document.nodeType)return n}catch(e){N(t,!0)}return 0<se(t,C,null,[e]).length},se.contains=function(e,t){return(e.ownerDocument||e)!=C&&T(e),y(e,t)},se.attr=function(e,t){(e.ownerDocument||e)!=C&&T(e);var n=b.attrHandle[t.toLowerCase()],r=n&&j.call(b.attrHandle,t.toLowerCase())?n(e,t,!E):void 0;return void 0!==r?r:d.attributes||!E?e.getAttribute(t):(r=e.getAttributeNode(t))&&r.specified?r.value:null},se.escape=function(e){return(e+"").replace(re,ie)},se.error=function(e){throw new Error("Syntax error, unrecognized expression: "+e)},se.uniqueSort=function(e){var t,n=[],r=0,i=0;if(l=!d.detectDuplicates,u=!d.sortStable&&e.slice(0),e.sort(D),l){while(t=e[i++])t===e[i]&&(r=n.push(i));while(r--)e.splice(n[r],1)}return u=null,e},o=se.getText=function(e){var t,n="",r=0,i=e.nodeType;if(i){if(1===i||9===i||11===i){if("string"==typeof e.textContent)return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)n+=o(e)}else if(3===i||4===i)return e.nodeValue}else while(t=e[r++])n+=o(t);return n},(b=se.selectors={cacheLength:50,createPseudo:le,match:G,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace(te,ne),e[3]=(e[3]||e[4]||e[5]||"").replace(te,ne),"~="===e[2]&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),"nth"===e[1].slice(0,3)?(e[3]||se.error(e[0]),e[4]=+(e[4]?e[5]+(e[6]||1):2*("even"===e[3]||"odd"===e[3])),e[5]=+(e[7]+e[8]||"odd"===e[3])):e[3]&&se.error(e[0]),e},PSEUDO:function(e){var t,n=!e[6]&&e[2];return G.CHILD.test(e[0])?null:(e[3]?e[2]=e[4]||e[5]||"":n&&X.test(n)&&(t=h(n,!0))&&(t=n.indexOf(")",n.length-t)-n.length)&&(e[0]=e[0].slice(0,t),e[2]=n.slice(0,t)),e.slice(0,3))}},filter:{TAG:function(e){var t=e.replace(te,ne).toLowerCase();return"*"===e?function(){return!0}:function(e){return e.nodeName&&e.nodeName.toLowerCase()===t}},CLASS:function(e){var t=m[e+" "];return t||(t=new RegExp("(^|"+M+")"+e+"("+M+"|$)"))&&m(e,function(e){return t.test("string"==typeof e.className&&e.className||"undefined"!=typeof e.getAttribute&&e.getAttribute("class")||"")})},ATTR:function(n,r,i){return function(e){var t=se.attr(e,n);return null==t?"!="===r:!r||(t+="","="===r?t===i:"!="===r?t!==i:"^="===r?i&&0===t.indexOf(i):"*="===r?i&&-1<t.indexOf(i):"$="===r?i&&t.slice(-i.length)===i:"~="===r?-1<(" "+t.replace(B," ")+" ").indexOf(i):"|="===r&&(t===i||t.slice(0,i.length+1)===i+"-"))}},CHILD:function(h,e,t,g,v){var y="nth"!==h.slice(0,3),m="last"!==h.slice(-4),x="of-type"===e;return 1===g&&0===v?function(e){return!!e.parentNode}:function(e,t,n){var r,i,o,a,s,u,l=y!==m?"nextSibling":"previousSibling",c=e.parentNode,f=x&&e.nodeName.toLowerCase(),p=!n&&!x,d=!1;if(c){if(y){while(l){a=e;while(a=a[l])if(x?a.nodeName.toLowerCase()===f:1===a.nodeType)return!1;u=l="only"===h&&!u&&"nextSibling"}return!0}if(u=[m?c.firstChild:c.lastChild],m&&p){d=(s=(r=(i=(o=(a=c)[S]||(a[S]={}))[a.uniqueID]||(o[a.uniqueID]={}))[h]||[])[0]===k&&r[1])&&r[2],a=s&&c.childNodes[s];while(a=++s&&a&&a[l]||(d=s=0)||u.pop())if(1===a.nodeType&&++d&&a===e){i[h]=[k,s,d];break}}else if(p&&(d=s=(r=(i=(o=(a=e)[S]||(a[S]={}))[a.uniqueID]||(o[a.uniqueID]={}))[h]||[])[0]===k&&r[1]),!1===d)while(a=++s&&a&&a[l]||(d=s=0)||u.pop())if((x?a.nodeName.toLowerCase()===f:1===a.nodeType)&&++d&&(p&&((i=(o=a[S]||(a[S]={}))[a.uniqueID]||(o[a.uniqueID]={}))[h]=[k,d]),a===e))break;return(d-=v)===g||d%g==0&&0<=d/g}}},PSEUDO:function(e,o){var t,a=b.pseudos[e]||b.setFilters[e.toLowerCase()]||se.error("unsupported pseudo: "+e);return a[S]?a(o):1<a.length?(t=[e,e,"",o],b.setFilters.hasOwnProperty(e.toLowerCase())?le(function(e,t){var n,r=a(e,o),i=r.length;while(i--)e[n=P(e,r[i])]=!(t[n]=r[i])}):function(e){return a(e,0,t)}):a}},pseudos:{not:le(function(e){var r=[],i=[],s=f(e.replace($,"$1"));return s[S]?le(function(e,t,n,r){var i,o=s(e,null,r,[]),a=e.length;while(a--)(i=o[a])&&(e[a]=!(t[a]=i))}):function(e,t,n){return r[0]=e,s(r,null,n,i),r[0]=null,!i.pop()}}),has:le(function(t){return function(e){return 0<se(t,e).length}}),contains:le(function(t){return t=t.replace(te,ne),function(e){return-1<(e.textContent||o(e)).indexOf(t)}}),lang:le(function(n){return V.test(n||"")||se.error("unsupported lang: "+n),n=n.replace(te,ne).toLowerCase(),function(e){var t;do{if(t=E?e.lang:e.getAttribute("xml:lang")||e.getAttribute("lang"))return(t=t.toLowerCase())===n||0===t.indexOf(n+"-")}while((e=e.parentNode)&&1===e.nodeType);return!1}}),target:function(e){var t=n.location&&n.location.hash;return t&&t.slice(1)===e.id},root:function(e){return e===a},focus:function(e){return e===C.activeElement&&(!C.hasFocus||C.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},enabled:ge(!1),disabled:ge(!0),checked:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&!!e.checked||"option"===t&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,!0===e.selected},empty:function(e){for(e=e.firstChild;e;e=e.nextSibling)if(e.nodeType<6)return!1;return!0},parent:function(e){return!b.pseudos.empty(e)},header:function(e){return J.test(e.nodeName)},input:function(e){return Q.test(e.nodeName)},button:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&"button"===e.type||"button"===t},text:function(e){var t;return"input"===e.nodeName.toLowerCase()&&"text"===e.type&&(null==(t=e.getAttribute("type"))||"text"===t.toLowerCase())},first:ve(function(){return[0]}),last:ve(function(e,t){return[t-1]}),eq:ve(function(e,t,n){return[n<0?n+t:n]}),even:ve(function(e,t){for(var n=0;n<t;n+=2)e.push(n);return e}),odd:ve(function(e,t){for(var n=1;n<t;n+=2)e.push(n);return e}),lt:ve(function(e,t,n){for(var r=n<0?n+t:t<n?t:n;0<=--r;)e.push(r);return e}),gt:ve(function(e,t,n){for(var r=n<0?n+t:n;++r<t;)e.push(r);return e})}}).pseudos.nth=b.pseudos.eq,{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})b.pseudos[e]=de(e);for(e in{submit:!0,reset:!0})b.pseudos[e]=he(e);function me(){}function xe(e){for(var t=0,n=e.length,r="";t<n;t++)r+=e[t].value;return r}function be(s,e,t){var u=e.dir,l=e.next,c=l||u,f=t&&"parentNode"===c,p=r++;return e.first?function(e,t,n){while(e=e[u])if(1===e.nodeType||f)return s(e,t,n);return!1}:function(e,t,n){var r,i,o,a=[k,p];if(n){while(e=e[u])if((1===e.nodeType||f)&&s(e,t,n))return!0}else while(e=e[u])if(1===e.nodeType||f)if(i=(o=e[S]||(e[S]={}))[e.uniqueID]||(o[e.uniqueID]={}),l&&l===e.nodeName.toLowerCase())e=e[u]||e;else{if((r=i[c])&&r[0]===k&&r[1]===p)return a[2]=r[2];if((i[c]=a)[2]=s(e,t,n))return!0}return!1}}function we(i){return 1<i.length?function(e,t,n){var r=i.length;while(r--)if(!i[r](e,t,n))return!1;return!0}:i[0]}function Te(e,t,n,r,i){for(var o,a=[],s=0,u=e.length,l=null!=t;s<u;s++)(o=e[s])&&(n&&!n(o,r,i)||(a.push(o),l&&t.push(s)));return a}function Ce(d,h,g,v,y,e){return v&&!v[S]&&(v=Ce(v)),y&&!y[S]&&(y=Ce(y,e)),le(function(e,t,n,r){var i,o,a,s=[],u=[],l=t.length,c=e||function(e,t,n){for(var r=0,i=t.length;r<i;r++)se(e,t[r],n);return n}(h||"*",n.nodeType?[n]:n,[]),f=!d||!e&&h?c:Te(c,s,d,n,r),p=g?y||(e?d:l||v)?[]:t:f;if(g&&g(f,p,n,r),v){i=Te(p,u),v(i,[],n,r),o=i.length;while(o--)(a=i[o])&&(p[u[o]]=!(f[u[o]]=a))}if(e){if(y||d){if(y){i=[],o=p.length;while(o--)(a=p[o])&&i.push(f[o]=a);y(null,p=[],i,r)}o=p.length;while(o--)(a=p[o])&&-1<(i=y?P(e,a):s[o])&&(e[i]=!(t[i]=a))}}else p=Te(p===t?p.splice(l,p.length):p),y?y(null,t,p,r):H.apply(t,p)})}function Ee(e){for(var i,t,n,r=e.length,o=b.relative[e[0].type],a=o||b.relative[" "],s=o?1:0,u=be(function(e){return e===i},a,!0),l=be(function(e){return-1<P(i,e)},a,!0),c=[function(e,t,n){var r=!o&&(n||t!==w)||((i=t).nodeType?u(e,t,n):l(e,t,n));return i=null,r}];s<r;s++)if(t=b.relative[e[s].type])c=[be(we(c),t)];else{if((t=b.filter[e[s].type].apply(null,e[s].matches))[S]){for(n=++s;n<r;n++)if(b.relative[e[n].type])break;return Ce(1<s&&we(c),1<s&&xe(e.slice(0,s-1).concat({value:" "===e[s-2].type?"*":""})).replace($,"$1"),t,s<n&&Ee(e.slice(s,n)),n<r&&Ee(e=e.slice(n)),n<r&&xe(e))}c.push(t)}return we(c)}return me.prototype=b.filters=b.pseudos,b.setFilters=new me,h=se.tokenize=function(e,t){var n,r,i,o,a,s,u,l=x[e+" "];if(l)return t?0:l.slice(0);a=e,s=[],u=b.preFilter;while(a){for(o in n&&!(r=_.exec(a))||(r&&(a=a.slice(r[0].length)||a),s.push(i=[])),n=!1,(r=z.exec(a))&&(n=r.shift(),i.push({value:n,type:r[0].replace($," ")}),a=a.slice(n.length)),b.filter)!(r=G[o].exec(a))||u[o]&&!(r=u[o](r))||(n=r.shift(),i.push({value:n,type:o,matches:r}),a=a.slice(n.length));if(!n)break}return t?a.length:a?se.error(e):x(e,s).slice(0)},f=se.compile=function(e,t){var n,v,y,m,x,r,i=[],o=[],a=A[e+" "];if(!a){t||(t=h(e)),n=t.length;while(n--)(a=Ee(t[n]))[S]?i.push(a):o.push(a);(a=A(e,(v=o,m=0<(y=i).length,x=0<v.length,r=function(e,t,n,r,i){var o,a,s,u=0,l="0",c=e&&[],f=[],p=w,d=e||x&&b.find.TAG("*",i),h=k+=null==p?1:Math.random()||.1,g=d.length;for(i&&(w=t==C||t||i);l!==g&&null!=(o=d[l]);l++){if(x&&o){a=0,t||o.ownerDocument==C||(T(o),n=!E);while(s=v[a++])if(s(o,t||C,n)){r.push(o);break}i&&(k=h)}m&&((o=!s&&o)&&u--,e&&c.push(o))}if(u+=l,m&&l!==u){a=0;while(s=y[a++])s(c,f,t,n);if(e){if(0<u)while(l--)c[l]||f[l]||(f[l]=q.call(r));f=Te(f)}H.apply(r,f),i&&!e&&0<f.length&&1<u+y.length&&se.uniqueSort(r)}return i&&(k=h,w=p),c},m?le(r):r))).selector=e}return a},g=se.select=function(e,t,n,r){var i,o,a,s,u,l="function"==typeof e&&e,c=!r&&h(e=l.selector||e);if(n=n||[],1===c.length){if(2<(o=c[0]=c[0].slice(0)).length&&"ID"===(a=o[0]).type&&9===t.nodeType&&E&&b.relative[o[1].type]){if(!(t=(b.find.ID(a.matches[0].replace(te,ne),t)||[])[0]))return n;l&&(t=t.parentNode),e=e.slice(o.shift().value.length)}i=G.needsContext.test(e)?0:o.length;while(i--){if(a=o[i],b.relative[s=a.type])break;if((u=b.find[s])&&(r=u(a.matches[0].replace(te,ne),ee.test(o[0].type)&&ye(t.parentNode)||t))){if(o.splice(i,1),!(e=r.length&&xe(o)))return H.apply(n,r),n;break}}}return(l||f(e,c))(r,t,!E,n,!t||ee.test(e)&&ye(t.parentNode)||t),n},d.sortStable=S.split("").sort(D).join("")===S,d.detectDuplicates=!!l,T(),d.sortDetached=ce(function(e){return 1&e.compareDocumentPosition(C.createElement("fieldset"))}),ce(function(e){return e.innerHTML="<a href='#'></a>","#"===e.firstChild.getAttribute("href")})||fe("type|href|height|width",function(e,t,n){if(!n)return e.getAttribute(t,"type"===t.toLowerCase()?1:2)}),d.attributes&&ce(function(e){return e.innerHTML="<input/>",e.firstChild.setAttribute("value",""),""===e.firstChild.getAttribute("value")})||fe("value",function(e,t,n){if(!n&&"input"===e.nodeName.toLowerCase())return e.defaultValue}),ce(function(e){return null==e.getAttribute("disabled")})||fe(R,function(e,t,n){var r;if(!n)return!0===e[t]?t.toLowerCase():(r=e.getAttributeNode(t))&&r.specified?r.value:null}),se}(C);S.find=d,S.expr=d.selectors,S.expr[":"]=S.expr.pseudos,S.uniqueSort=S.unique=d.uniqueSort,S.text=d.getText,S.isXMLDoc=d.isXML,S.contains=d.contains,S.escapeSelector=d.escape;var h=function(e,t,n){var r=[],i=void 0!==n;while((e=e[t])&&9!==e.nodeType)if(1===e.nodeType){if(i&&S(e).is(n))break;r.push(e)}return r},T=function(e,t){for(var n=[];e;e=e.nextSibling)1===e.nodeType&&e!==t&&n.push(e);return n},k=S.expr.match.needsContext;function A(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()}var N=/^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;function D(e,n,r){return m(n)?S.grep(e,function(e,t){return!!n.call(e,t,e)!==r}):n.nodeType?S.grep(e,function(e){return e===n!==r}):"string"!=typeof n?S.grep(e,function(e){return-1<i.call(n,e)!==r}):S.filter(n,e,r)}S.filter=function(e,t,n){var r=t[0];return n&&(e=":not("+e+")"),1===t.length&&1===r.nodeType?S.find.matchesSelector(r,e)?[r]:[]:S.find.matches(e,S.grep(t,function(e){return 1===e.nodeType}))},S.fn.extend({find:function(e){var t,n,r=this.length,i=this;if("string"!=typeof e)return this.pushStack(S(e).filter(function(){for(t=0;t<r;t++)if(S.contains(i[t],this))return!0}));for(n=this.pushStack([]),t=0;t<r;t++)S.find(e,i[t],n);return 1<r?S.uniqueSort(n):n},filter:function(e){return this.pushStack(D(this,e||[],!1))},not:function(e){return this.pushStack(D(this,e||[],!0))},is:function(e){return!!D(this,"string"==typeof e&&k.test(e)?S(e):e||[],!1).length}});var j,q=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;(S.fn.init=function(e,t,n){var r,i;if(!e)return this;if(n=n||j,"string"==typeof e){if(!(r="<"===e[0]&&">"===e[e.length-1]&&3<=e.length?[null,e,null]:q.exec(e))||!r[1]&&t)return!t||t.jquery?(t||n).find(e):this.constructor(t).find(e);if(r[1]){if(t=t instanceof S?t[0]:t,S.merge(this,S.parseHTML(r[1],t&&t.nodeType?t.ownerDocument||t:E,!0)),N.test(r[1])&&S.isPlainObject(t))for(r in t)m(this[r])?this[r](t[r]):this.attr(r,t[r]);return this}return(i=E.getElementById(r[2]))&&(this[0]=i,this.length=1),this}return e.nodeType?(this[0]=e,this.length=1,this):m(e)?void 0!==n.ready?n.ready(e):e(S):S.makeArray(e,this)}).prototype=S.fn,j=S(E);var L=/^(?:parents|prev(?:Until|All))/,H={children:!0,contents:!0,next:!0,prev:!0};function O(e,t){while((e=e[t])&&1!==e.nodeType);return e}S.fn.extend({has:function(e){var t=S(e,this),n=t.length;return this.filter(function(){for(var e=0;e<n;e++)if(S.contains(this,t[e]))return!0})},closest:function(e,t){var n,r=0,i=this.length,o=[],a="string"!=typeof e&&S(e);if(!k.test(e))for(;r<i;r++)for(n=this[r];n&&n!==t;n=n.parentNode)if(n.nodeType<11&&(a?-1<a.index(n):1===n.nodeType&&S.find.matchesSelector(n,e))){o.push(n);break}return this.pushStack(1<o.length?S.uniqueSort(o):o)},index:function(e){return e?"string"==typeof e?i.call(S(e),this[0]):i.call(this,e.jquery?e[0]:e):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(e,t){return this.pushStack(S.uniqueSort(S.merge(this.get(),S(e,t))))},addBack:function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}}),S.each({parent:function(e){var t=e.parentNode;return t&&11!==t.nodeType?t:null},parents:function(e){return h(e,"parentNode")},parentsUntil:function(e,t,n){return h(e,"parentNode",n)},next:function(e){return O(e,"nextSibling")},prev:function(e){return O(e,"previousSibling")},nextAll:function(e){return h(e,"nextSibling")},prevAll:function(e){return h(e,"previousSibling")},nextUntil:function(e,t,n){return h(e,"nextSibling",n)},prevUntil:function(e,t,n){return h(e,"previousSibling",n)},siblings:function(e){return T((e.parentNode||{}).firstChild,e)},children:function(e){return T(e.firstChild)},contents:function(e){return null!=e.contentDocument&&r(e.contentDocument)?e.contentDocument:(A(e,"template")&&(e=e.content||e),S.merge([],e.childNodes))}},function(r,i){S.fn[r]=function(e,t){var n=S.map(this,i,e);return"Until"!==r.slice(-5)&&(t=e),t&&"string"==typeof t&&(n=S.filter(t,n)),1<this.length&&(H[r]||S.uniqueSort(n),L.test(r)&&n.reverse()),this.pushStack(n)}});var P=/[^\x20\t\r\n\f]+/g;function R(e){return e}function M(e){throw e}function I(e,t,n,r){var i;try{e&&m(i=e.promise)?i.call(e).done(t).fail(n):e&&m(i=e.then)?i.call(e,t,n):t.apply(void 0,[e].slice(r))}catch(e){n.apply(void 0,[e])}}S.Callbacks=function(r){var e,n;r="string"==typeof r?(e=r,n={},S.each(e.match(P)||[],function(e,t){n[t]=!0}),n):S.extend({},r);var i,t,o,a,s=[],u=[],l=-1,c=function(){for(a=a||r.once,o=i=!0;u.length;l=-1){t=u.shift();while(++l<s.length)!1===s[l].apply(t[0],t[1])&&r.stopOnFalse&&(l=s.length,t=!1)}r.memory||(t=!1),i=!1,a&&(s=t?[]:"")},f={add:function(){return s&&(t&&!i&&(l=s.length-1,u.push(t)),function n(e){S.each(e,function(e,t){m(t)?r.unique&&f.has(t)||s.push(t):t&&t.length&&"string"!==w(t)&&n(t)})}(arguments),t&&!i&&c()),this},remove:function(){return S.each(arguments,function(e,t){var n;while(-1<(n=S.inArray(t,s,n)))s.splice(n,1),n<=l&&l--}),this},has:function(e){return e?-1<S.inArray(e,s):0<s.length},empty:function(){return s&&(s=[]),this},disable:function(){return a=u=[],s=t="",this},disabled:function(){return!s},lock:function(){return a=u=[],t||i||(s=t=""),this},locked:function(){return!!a},fireWith:function(e,t){return a||(t=[e,(t=t||[]).slice?t.slice():t],u.push(t),i||c()),this},fire:function(){return f.fireWith(this,arguments),this},fired:function(){return!!o}};return f},S.extend({Deferred:function(e){var o=[["notify","progress",S.Callbacks("memory"),S.Callbacks("memory"),2],["resolve","done",S.Callbacks("once memory"),S.Callbacks("once memory"),0,"resolved"],["reject","fail",S.Callbacks("once memory"),S.Callbacks("once memory"),1,"rejected"]],i="pending",a={state:function(){return i},always:function(){return s.done(arguments).fail(arguments),this},"catch":function(e){return a.then(null,e)},pipe:function(){var i=arguments;return S.Deferred(function(r){S.each(o,function(e,t){var n=m(i[t[4]])&&i[t[4]];s[t[1]](function(){var e=n&&n.apply(this,arguments);e&&m(e.promise)?e.promise().progress(r.notify).done(r.resolve).fail(r.reject):r[t[0]+"With"](this,n?[e]:arguments)})}),i=null}).promise()},then:function(t,n,r){var u=0;function l(i,o,a,s){return function(){var n=this,r=arguments,e=function(){var e,t;if(!(i<u)){if((e=a.apply(n,r))===o.promise())throw new TypeError("Thenable self-resolution");t=e&&("object"==typeof e||"function"==typeof e)&&e.then,m(t)?s?t.call(e,l(u,o,R,s),l(u,o,M,s)):(u++,t.call(e,l(u,o,R,s),l(u,o,M,s),l(u,o,R,o.notifyWith))):(a!==R&&(n=void 0,r=[e]),(s||o.resolveWith)(n,r))}},t=s?e:function(){try{e()}catch(e){S.Deferred.exceptionHook&&S.Deferred.exceptionHook(e,t.stackTrace),u<=i+1&&(a!==M&&(n=void 0,r=[e]),o.rejectWith(n,r))}};i?t():(S.Deferred.getStackHook&&(t.stackTrace=S.Deferred.getStackHook()),C.setTimeout(t))}}return S.Deferred(function(e){o[0][3].add(l(0,e,m(r)?r:R,e.notifyWith)),o[1][3].add(l(0,e,m(t)?t:R)),o[2][3].add(l(0,e,m(n)?n:M))}).promise()},promise:function(e){return null!=e?S.extend(e,a):a}},s={};return S.each(o,function(e,t){var n=t[2],r=t[5];a[t[1]]=n.add,r&&n.add(function(){i=r},o[3-e][2].disable,o[3-e][3].disable,o[0][2].lock,o[0][3].lock),n.add(t[3].fire),s[t[0]]=function(){return s[t[0]+"With"](this===s?void 0:this,arguments),this},s[t[0]+"With"]=n.fireWith}),a.promise(s),e&&e.call(s,s),s},when:function(e){var n=arguments.length,t=n,r=Array(t),i=s.call(arguments),o=S.Deferred(),a=function(t){return function(e){r[t]=this,i[t]=1<arguments.length?s.call(arguments):e,--n||o.resolveWith(r,i)}};if(n<=1&&(I(e,o.done(a(t)).resolve,o.reject,!n),"pending"===o.state()||m(i[t]&&i[t].then)))return o.then();while(t--)I(i[t],a(t),o.reject);return o.promise()}});var W=/^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;S.Deferred.exceptionHook=function(e,t){C.console&&C.console.warn&&e&&W.test(e.name)&&C.console.warn("jQuery.Deferred exception: "+e.message,e.stack,t)},S.readyException=function(e){C.setTimeout(function(){throw e})};var F=S.Deferred();function B(){E.removeEventListener("DOMContentLoaded",B),C.removeEventListener("load",B),S.ready()}S.fn.ready=function(e){return F.then(e)["catch"](function(e){S.readyException(e)}),this},S.extend({isReady:!1,readyWait:1,ready:function(e){(!0===e?--S.readyWait:S.isReady)||(S.isReady=!0)!==e&&0<--S.readyWait||F.resolveWith(E,[S])}}),S.ready.then=F.then,"complete"===E.readyState||"loading"!==E.readyState&&!E.documentElement.doScroll?C.setTimeout(S.ready):(E.addEventListener("DOMContentLoaded",B),C.addEventListener("load",B));var $=function(e,t,n,r,i,o,a){var s=0,u=e.length,l=null==n;if("object"===w(n))for(s in i=!0,n)$(e,t,s,n[s],!0,o,a);else if(void 0!==r&&(i=!0,m(r)||(a=!0),l&&(a?(t.call(e,r),t=null):(l=t,t=function(e,t,n){return l.call(S(e),n)})),t))for(;s<u;s++)t(e[s],n,a?r:r.call(e[s],s,t(e[s],n)));return i?e:l?t.call(e):u?t(e[0],n):o},_=/^-ms-/,z=/-([a-z])/g;function U(e,t){return t.toUpperCase()}function X(e){return e.replace(_,"ms-").replace(z,U)}var V=function(e){return 1===e.nodeType||9===e.nodeType||!+e.nodeType};function G(){this.expando=S.expando+G.uid++}G.uid=1,G.prototype={cache:function(e){var t=e[this.expando];return t||(t={},V(e)&&(e.nodeType?e[this.expando]=t:Object.defineProperty(e,this.expando,{value:t,configurable:!0}))),t},set:function(e,t,n){var r,i=this.cache(e);if("string"==typeof t)i[X(t)]=n;else for(r in t)i[X(r)]=t[r];return i},get:function(e,t){return void 0===t?this.cache(e):e[this.expando]&&e[this.expando][X(t)]},access:function(e,t,n){return void 0===t||t&&"string"==typeof t&&void 0===n?this.get(e,t):(this.set(e,t,n),void 0!==n?n:t)},remove:function(e,t){var n,r=e[this.expando];if(void 0!==r){if(void 0!==t){n=(t=Array.isArray(t)?t.map(X):(t=X(t))in r?[t]:t.match(P)||[]).length;while(n--)delete r[t[n]]}(void 0===t||S.isEmptyObject(r))&&(e.nodeType?e[this.expando]=void 0:delete e[this.expando])}},hasData:function(e){var t=e[this.expando];return void 0!==t&&!S.isEmptyObject(t)}};var Y=new G,Q=new G,J=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,K=/[A-Z]/g;function Z(e,t,n){var r,i;if(void 0===n&&1===e.nodeType)if(r="data-"+t.replace(K,"-$&").toLowerCase(),"string"==typeof(n=e.getAttribute(r))){try{n="true"===(i=n)||"false"!==i&&("null"===i?null:i===+i+""?+i:J.test(i)?JSON.parse(i):i)}catch(e){}Q.set(e,t,n)}else n=void 0;return n}S.extend({hasData:function(e){return Q.hasData(e)||Y.hasData(e)},data:function(e,t,n){return Q.access(e,t,n)},removeData:function(e,t){Q.remove(e,t)},_data:function(e,t,n){return Y.access(e,t,n)},_removeData:function(e,t){Y.remove(e,t)}}),S.fn.extend({data:function(n,e){var t,r,i,o=this[0],a=o&&o.attributes;if(void 0===n){if(this.length&&(i=Q.get(o),1===o.nodeType&&!Y.get(o,"hasDataAttrs"))){t=a.length;while(t--)a[t]&&0===(r=a[t].name).indexOf("data-")&&(r=X(r.slice(5)),Z(o,r,i[r]));Y.set(o,"hasDataAttrs",!0)}return i}return"object"==typeof n?this.each(function(){Q.set(this,n)}):$(this,function(e){var t;if(o&&void 0===e)return void 0!==(t=Q.get(o,n))?t:void 0!==(t=Z(o,n))?t:void 0;this.each(function(){Q.set(this,n,e)})},null,e,1<arguments.length,null,!0)},removeData:function(e){return this.each(function(){Q.remove(this,e)})}}),S.extend({queue:function(e,t,n){var r;if(e)return t=(t||"fx")+"queue",r=Y.get(e,t),n&&(!r||Array.isArray(n)?r=Y.access(e,t,S.makeArray(n)):r.push(n)),r||[]},dequeue:function(e,t){t=t||"fx";var n=S.queue(e,t),r=n.length,i=n.shift(),o=S._queueHooks(e,t);"inprogress"===i&&(i=n.shift(),r--),i&&("fx"===t&&n.unshift("inprogress"),delete o.stop,i.call(e,function(){S.dequeue(e,t)},o)),!r&&o&&o.empty.fire()},_queueHooks:function(e,t){var n=t+"queueHooks";return Y.get(e,n)||Y.access(e,n,{empty:S.Callbacks("once memory").add(function(){Y.remove(e,[t+"queue",n])})})}}),S.fn.extend({queue:function(t,n){var e=2;return"string"!=typeof t&&(n=t,t="fx",e--),arguments.length<e?S.queue(this[0],t):void 0===n?this:this.each(function(){var e=S.queue(this,t,n);S._queueHooks(this,t),"fx"===t&&"inprogress"!==e[0]&&S.dequeue(this,t)})},dequeue:function(e){return this.each(function(){S.dequeue(this,e)})},clearQueue:function(e){return this.queue(e||"fx",[])},promise:function(e,t){var n,r=1,i=S.Deferred(),o=this,a=this.length,s=function(){--r||i.resolveWith(o,[o])};"string"!=typeof e&&(t=e,e=void 0),e=e||"fx";while(a--)(n=Y.get(o[a],e+"queueHooks"))&&n.empty&&(r++,n.empty.add(s));return s(),i.promise(t)}});var ee=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,te=new RegExp("^(?:([+-])=|)("+ee+")([a-z%]*)$","i"),ne=["Top","Right","Bottom","Left"],re=E.documentElement,ie=function(e){return S.contains(e.ownerDocument,e)},oe={composed:!0};re.getRootNode&&(ie=function(e){return S.contains(e.ownerDocument,e)||e.getRootNode(oe)===e.ownerDocument});var ae=function(e,t){return"none"===(e=t||e).style.display||""===e.style.display&&ie(e)&&"none"===S.css(e,"display")};function se(e,t,n,r){var i,o,a=20,s=r?function(){return r.cur()}:function(){return S.css(e,t,"")},u=s(),l=n&&n[3]||(S.cssNumber[t]?"":"px"),c=e.nodeType&&(S.cssNumber[t]||"px"!==l&&+u)&&te.exec(S.css(e,t));if(c&&c[3]!==l){u/=2,l=l||c[3],c=+u||1;while(a--)S.style(e,t,c+l),(1-o)*(1-(o=s()/u||.5))<=0&&(a=0),c/=o;c*=2,S.style(e,t,c+l),n=n||[]}return n&&(c=+c||+u||0,i=n[1]?c+(n[1]+1)*n[2]:+n[2],r&&(r.unit=l,r.start=c,r.end=i)),i}var ue={};function le(e,t){for(var n,r,i,o,a,s,u,l=[],c=0,f=e.length;c<f;c++)(r=e[c]).style&&(n=r.style.display,t?("none"===n&&(l[c]=Y.get(r,"display")||null,l[c]||(r.style.display="")),""===r.style.display&&ae(r)&&(l[c]=(u=a=o=void 0,a=(i=r).ownerDocument,s=i.nodeName,(u=ue[s])||(o=a.body.appendChild(a.createElement(s)),u=S.css(o,"display"),o.parentNode.removeChild(o),"none"===u&&(u="block"),ue[s]=u)))):"none"!==n&&(l[c]="none",Y.set(r,"display",n)));for(c=0;c<f;c++)null!=l[c]&&(e[c].style.display=l[c]);return e}S.fn.extend({show:function(){return le(this,!0)},hide:function(){return le(this)},toggle:function(e){return"boolean"==typeof e?e?this.show():this.hide():this.each(function(){ae(this)?S(this).show():S(this).hide()})}});var ce,fe,pe=/^(?:checkbox|radio)$/i,de=/<([a-z][^\/\0>\x20\t\r\n\f]*)/i,he=/^$|^module$|\/(?:java|ecma)script/i;ce=E.createDocumentFragment().appendChild(E.createElement("div")),(fe=E.createElement("input")).setAttribute("type","radio"),fe.setAttribute("checked","checked"),fe.setAttribute("name","t"),ce.appendChild(fe),y.checkClone=ce.cloneNode(!0).cloneNode(!0).lastChild.checked,ce.innerHTML="<textarea>x</textarea>",y.noCloneChecked=!!ce.cloneNode(!0).lastChild.defaultValue,ce.innerHTML="<option></option>",y.option=!!ce.lastChild;var ge={thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};function ve(e,t){var n;return n="undefined"!=typeof e.getElementsByTagName?e.getElementsByTagName(t||"*"):"undefined"!=typeof e.querySelectorAll?e.querySelectorAll(t||"*"):[],void 0===t||t&&A(e,t)?S.merge([e],n):n}function ye(e,t){for(var n=0,r=e.length;n<r;n++)Y.set(e[n],"globalEval",!t||Y.get(t[n],"globalEval"))}ge.tbody=ge.tfoot=ge.colgroup=ge.caption=ge.thead,ge.th=ge.td,y.option||(ge.optgroup=ge.option=[1,"<select multiple='multiple'>","</select>"]);var me=/<|&#?\w+;/;function xe(e,t,n,r,i){for(var o,a,s,u,l,c,f=t.createDocumentFragment(),p=[],d=0,h=e.length;d<h;d++)if((o=e[d])||0===o)if("object"===w(o))S.merge(p,o.nodeType?[o]:o);else if(me.test(o)){a=a||f.appendChild(t.createElement("div")),s=(de.exec(o)||["",""])[1].toLowerCase(),u=ge[s]||ge._default,a.innerHTML=u[1]+S.htmlPrefilter(o)+u[2],c=u[0];while(c--)a=a.lastChild;S.merge(p,a.childNodes),(a=f.firstChild).textContent=""}else p.push(t.createTextNode(o));f.textContent="",d=0;while(o=p[d++])if(r&&-1<S.inArray(o,r))i&&i.push(o);else if(l=ie(o),a=ve(f.appendChild(o),"script"),l&&ye(a),n){c=0;while(o=a[c++])he.test(o.type||"")&&n.push(o)}return f}var be=/^key/,we=/^(?:mouse|pointer|contextmenu|drag|drop)|click/,Te=/^([^.]*)(?:\.(.+)|)/;function Ce(){return!0}function Ee(){return!1}function Se(e,t){return e===function(){try{return E.activeElement}catch(e){}}()==("focus"===t)}function ke(e,t,n,r,i,o){var a,s;if("object"==typeof t){for(s in"string"!=typeof n&&(r=r||n,n=void 0),t)ke(e,s,n,r,t[s],o);return e}if(null==r&&null==i?(i=n,r=n=void 0):null==i&&("string"==typeof n?(i=r,r=void 0):(i=r,r=n,n=void 0)),!1===i)i=Ee;else if(!i)return e;return 1===o&&(a=i,(i=function(e){return S().off(e),a.apply(this,arguments)}).guid=a.guid||(a.guid=S.guid++)),e.each(function(){S.event.add(this,t,i,r,n)})}function Ae(e,i,o){o?(Y.set(e,i,!1),S.event.add(e,i,{namespace:!1,handler:function(e){var t,n,r=Y.get(this,i);if(1&e.isTrigger&&this[i]){if(r.length)(S.event.special[i]||{}).delegateType&&e.stopPropagation();else if(r=s.call(arguments),Y.set(this,i,r),t=o(this,i),this[i](),r!==(n=Y.get(this,i))||t?Y.set(this,i,!1):n={},r!==n)return e.stopImmediatePropagation(),e.preventDefault(),n.value}else r.length&&(Y.set(this,i,{value:S.event.trigger(S.extend(r[0],S.Event.prototype),r.slice(1),this)}),e.stopImmediatePropagation())}})):void 0===Y.get(e,i)&&S.event.add(e,i,Ce)}S.event={global:{},add:function(t,e,n,r,i){var o,a,s,u,l,c,f,p,d,h,g,v=Y.get(t);if(V(t)){n.handler&&(n=(o=n).handler,i=o.selector),i&&S.find.matchesSelector(re,i),n.guid||(n.guid=S.guid++),(u=v.events)||(u=v.events=Object.create(null)),(a=v.handle)||(a=v.handle=function(e){return"undefined"!=typeof S&&S.event.triggered!==e.type?S.event.dispatch.apply(t,arguments):void 0}),l=(e=(e||"").match(P)||[""]).length;while(l--)d=g=(s=Te.exec(e[l])||[])[1],h=(s[2]||"").split(".").sort(),d&&(f=S.event.special[d]||{},d=(i?f.delegateType:f.bindType)||d,f=S.event.special[d]||{},c=S.extend({type:d,origType:g,data:r,handler:n,guid:n.guid,selector:i,needsContext:i&&S.expr.match.needsContext.test(i),namespace:h.join(".")},o),(p=u[d])||((p=u[d]=[]).delegateCount=0,f.setup&&!1!==f.setup.call(t,r,h,a)||t.addEventListener&&t.addEventListener(d,a)),f.add&&(f.add.call(t,c),c.handler.guid||(c.handler.guid=n.guid)),i?p.splice(p.delegateCount++,0,c):p.push(c),S.event.global[d]=!0)}},remove:function(e,t,n,r,i){var o,a,s,u,l,c,f,p,d,h,g,v=Y.hasData(e)&&Y.get(e);if(v&&(u=v.events)){l=(t=(t||"").match(P)||[""]).length;while(l--)if(d=g=(s=Te.exec(t[l])||[])[1],h=(s[2]||"").split(".").sort(),d){f=S.event.special[d]||{},p=u[d=(r?f.delegateType:f.bindType)||d]||[],s=s[2]&&new RegExp("(^|\\.)"+h.join("\\.(?:.*\\.|)")+"(\\.|$)"),a=o=p.length;while(o--)c=p[o],!i&&g!==c.origType||n&&n.guid!==c.guid||s&&!s.test(c.namespace)||r&&r!==c.selector&&("**"!==r||!c.selector)||(p.splice(o,1),c.selector&&p.delegateCount--,f.remove&&f.remove.call(e,c));a&&!p.length&&(f.teardown&&!1!==f.teardown.call(e,h,v.handle)||S.removeEvent(e,d,v.handle),delete u[d])}else for(d in u)S.event.remove(e,d+t[l],n,r,!0);S.isEmptyObject(u)&&Y.remove(e,"handle events")}},dispatch:function(e){var t,n,r,i,o,a,s=new Array(arguments.length),u=S.event.fix(e),l=(Y.get(this,"events")||Object.create(null))[u.type]||[],c=S.event.special[u.type]||{};for(s[0]=u,t=1;t<arguments.length;t++)s[t]=arguments[t];if(u.delegateTarget=this,!c.preDispatch||!1!==c.preDispatch.call(this,u)){a=S.event.handlers.call(this,u,l),t=0;while((i=a[t++])&&!u.isPropagationStopped()){u.currentTarget=i.elem,n=0;while((o=i.handlers[n++])&&!u.isImmediatePropagationStopped())u.rnamespace&&!1!==o.namespace&&!u.rnamespace.test(o.namespace)||(u.handleObj=o,u.data=o.data,void 0!==(r=((S.event.special[o.origType]||{}).handle||o.handler).apply(i.elem,s))&&!1===(u.result=r)&&(u.preventDefault(),u.stopPropagation()))}return c.postDispatch&&c.postDispatch.call(this,u),u.result}},handlers:function(e,t){var n,r,i,o,a,s=[],u=t.delegateCount,l=e.target;if(u&&l.nodeType&&!("click"===e.type&&1<=e.button))for(;l!==this;l=l.parentNode||this)if(1===l.nodeType&&("click"!==e.type||!0!==l.disabled)){for(o=[],a={},n=0;n<u;n++)void 0===a[i=(r=t[n]).selector+" "]&&(a[i]=r.needsContext?-1<S(i,this).index(l):S.find(i,this,null,[l]).length),a[i]&&o.push(r);o.length&&s.push({elem:l,handlers:o})}return l=this,u<t.length&&s.push({elem:l,handlers:t.slice(u)}),s},addProp:function(t,e){Object.defineProperty(S.Event.prototype,t,{enumerable:!0,configurable:!0,get:m(e)?function(){if(this.originalEvent)return e(this.originalEvent)}:function(){if(this.originalEvent)return this.originalEvent[t]},set:function(e){Object.defineProperty(this,t,{enumerable:!0,configurable:!0,writable:!0,value:e})}})},fix:function(e){return e[S.expando]?e:new S.Event(e)},special:{load:{noBubble:!0},click:{setup:function(e){var t=this||e;return pe.test(t.type)&&t.click&&A(t,"input")&&Ae(t,"click",Ce),!1},trigger:function(e){var t=this||e;return pe.test(t.type)&&t.click&&A(t,"input")&&Ae(t,"click"),!0},_default:function(e){var t=e.target;return pe.test(t.type)&&t.click&&A(t,"input")&&Y.get(t,"click")||A(t,"a")}},beforeunload:{postDispatch:function(e){void 0!==e.result&&e.originalEvent&&(e.originalEvent.returnValue=e.result)}}}},S.removeEvent=function(e,t,n){e.removeEventListener&&e.removeEventListener(t,n)},S.Event=function(e,t){if(!(this instanceof S.Event))return new S.Event(e,t);e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||void 0===e.defaultPrevented&&!1===e.returnValue?Ce:Ee,this.target=e.target&&3===e.target.nodeType?e.target.parentNode:e.target,this.currentTarget=e.currentTarget,this.relatedTarget=e.relatedTarget):this.type=e,t&&S.extend(this,t),this.timeStamp=e&&e.timeStamp||Date.now(),this[S.expando]=!0},S.Event.prototype={constructor:S.Event,isDefaultPrevented:Ee,isPropagationStopped:Ee,isImmediatePropagationStopped:Ee,isSimulated:!1,preventDefault:function(){var e=this.originalEvent;this.isDefaultPrevented=Ce,e&&!this.isSimulated&&e.preventDefault()},stopPropagation:function(){var e=this.originalEvent;this.isPropagationStopped=Ce,e&&!this.isSimulated&&e.stopPropagation()},stopImmediatePropagation:function(){var e=this.originalEvent;this.isImmediatePropagationStopped=Ce,e&&!this.isSimulated&&e.stopImmediatePropagation(),this.stopPropagation()}},S.each({altKey:!0,bubbles:!0,cancelable:!0,changedTouches:!0,ctrlKey:!0,detail:!0,eventPhase:!0,metaKey:!0,pageX:!0,pageY:!0,shiftKey:!0,view:!0,"char":!0,code:!0,charCode:!0,key:!0,keyCode:!0,button:!0,buttons:!0,clientX:!0,clientY:!0,offsetX:!0,offsetY:!0,pointerId:!0,pointerType:!0,screenX:!0,screenY:!0,targetTouches:!0,toElement:!0,touches:!0,which:function(e){var t=e.button;return null==e.which&&be.test(e.type)?null!=e.charCode?e.charCode:e.keyCode:!e.which&&void 0!==t&&we.test(e.type)?1&t?1:2&t?3:4&t?2:0:e.which}},S.event.addProp),S.each({focus:"focusin",blur:"focusout"},function(e,t){S.event.special[e]={setup:function(){return Ae(this,e,Se),!1},trigger:function(){return Ae(this,e),!0},delegateType:t}}),S.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(e,i){S.event.special[e]={delegateType:i,bindType:i,handle:function(e){var t,n=e.relatedTarget,r=e.handleObj;return n&&(n===this||S.contains(this,n))||(e.type=r.origType,t=r.handler.apply(this,arguments),e.type=i),t}}}),S.fn.extend({on:function(e,t,n,r){return ke(this,e,t,n,r)},one:function(e,t,n,r){return ke(this,e,t,n,r,1)},off:function(e,t,n){var r,i;if(e&&e.preventDefault&&e.handleObj)return r=e.handleObj,S(e.delegateTarget).off(r.namespace?r.origType+"."+r.namespace:r.origType,r.selector,r.handler),this;if("object"==typeof e){for(i in e)this.off(i,t,e[i]);return this}return!1!==t&&"function"!=typeof t||(n=t,t=void 0),!1===n&&(n=Ee),this.each(function(){S.event.remove(this,e,n,t)})}});var Ne=/<script|<style|<link/i,De=/checked\s*(?:[^=]|=\s*.checked.)/i,je=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;function qe(e,t){return A(e,"table")&&A(11!==t.nodeType?t:t.firstChild,"tr")&&S(e).children("tbody")[0]||e}function Le(e){return e.type=(null!==e.getAttribute("type"))+"/"+e.type,e}function He(e){return"true/"===(e.type||"").slice(0,5)?e.type=e.type.slice(5):e.removeAttribute("type"),e}function Oe(e,t){var n,r,i,o,a,s;if(1===t.nodeType){if(Y.hasData(e)&&(s=Y.get(e).events))for(i in Y.remove(t,"handle events"),s)for(n=0,r=s[i].length;n<r;n++)S.event.add(t,i,s[i][n]);Q.hasData(e)&&(o=Q.access(e),a=S.extend({},o),Q.set(t,a))}}function Pe(n,r,i,o){r=g(r);var e,t,a,s,u,l,c=0,f=n.length,p=f-1,d=r[0],h=m(d);if(h||1<f&&"string"==typeof d&&!y.checkClone&&De.test(d))return n.each(function(e){var t=n.eq(e);h&&(r[0]=d.call(this,e,t.html())),Pe(t,r,i,o)});if(f&&(t=(e=xe(r,n[0].ownerDocument,!1,n,o)).firstChild,1===e.childNodes.length&&(e=t),t||o)){for(s=(a=S.map(ve(e,"script"),Le)).length;c<f;c++)u=e,c!==p&&(u=S.clone(u,!0,!0),s&&S.merge(a,ve(u,"script"))),i.call(n[c],u,c);if(s)for(l=a[a.length-1].ownerDocument,S.map(a,He),c=0;c<s;c++)u=a[c],he.test(u.type||"")&&!Y.access(u,"globalEval")&&S.contains(l,u)&&(u.src&&"module"!==(u.type||"").toLowerCase()?S._evalUrl&&!u.noModule&&S._evalUrl(u.src,{nonce:u.nonce||u.getAttribute("nonce")},l):b(u.textContent.replace(je,""),u,l))}return n}function Re(e,t,n){for(var r,i=t?S.filter(t,e):e,o=0;null!=(r=i[o]);o++)n||1!==r.nodeType||S.cleanData(ve(r)),r.parentNode&&(n&&ie(r)&&ye(ve(r,"script")),r.parentNode.removeChild(r));return e}S.extend({htmlPrefilter:function(e){return e},clone:function(e,t,n){var r,i,o,a,s,u,l,c=e.cloneNode(!0),f=ie(e);if(!(y.noCloneChecked||1!==e.nodeType&&11!==e.nodeType||S.isXMLDoc(e)))for(a=ve(c),r=0,i=(o=ve(e)).length;r<i;r++)s=o[r],u=a[r],void 0,"input"===(l=u.nodeName.toLowerCase())&&pe.test(s.type)?u.checked=s.checked:"input"!==l&&"textarea"!==l||(u.defaultValue=s.defaultValue);if(t)if(n)for(o=o||ve(e),a=a||ve(c),r=0,i=o.length;r<i;r++)Oe(o[r],a[r]);else Oe(e,c);return 0<(a=ve(c,"script")).length&&ye(a,!f&&ve(e,"script")),c},cleanData:function(e){for(var t,n,r,i=S.event.special,o=0;void 0!==(n=e[o]);o++)if(V(n)){if(t=n[Y.expando]){if(t.events)for(r in t.events)i[r]?S.event.remove(n,r):S.removeEvent(n,r,t.handle);n[Y.expando]=void 0}n[Q.expando]&&(n[Q.expando]=void 0)}}}),S.fn.extend({detach:function(e){return Re(this,e,!0)},remove:function(e){return Re(this,e)},text:function(e){return $(this,function(e){return void 0===e?S.text(this):this.empty().each(function(){1!==this.nodeType&&11!==this.nodeType&&9!==this.nodeType||(this.textContent=e)})},null,e,arguments.length)},append:function(){return Pe(this,arguments,function(e){1!==this.nodeType&&11!==this.nodeType&&9!==this.nodeType||qe(this,e).appendChild(e)})},prepend:function(){return Pe(this,arguments,function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=qe(this,e);t.insertBefore(e,t.firstChild)}})},before:function(){return Pe(this,arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this)})},after:function(){return Pe(this,arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this.nextSibling)})},empty:function(){for(var e,t=0;null!=(e=this[t]);t++)1===e.nodeType&&(S.cleanData(ve(e,!1)),e.textContent="");return this},clone:function(e,t){return e=null!=e&&e,t=null==t?e:t,this.map(function(){return S.clone(this,e,t)})},html:function(e){return $(this,function(e){var t=this[0]||{},n=0,r=this.length;if(void 0===e&&1===t.nodeType)return t.innerHTML;if("string"==typeof e&&!Ne.test(e)&&!ge[(de.exec(e)||["",""])[1].toLowerCase()]){e=S.htmlPrefilter(e);try{for(;n<r;n++)1===(t=this[n]||{}).nodeType&&(S.cleanData(ve(t,!1)),t.innerHTML=e);t=0}catch(e){}}t&&this.empty().append(e)},null,e,arguments.length)},replaceWith:function(){var n=[];return Pe(this,arguments,function(e){var t=this.parentNode;S.inArray(this,n)<0&&(S.cleanData(ve(this)),t&&t.replaceChild(e,this))},n)}}),S.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(e,a){S.fn[e]=function(e){for(var t,n=[],r=S(e),i=r.length-1,o=0;o<=i;o++)t=o===i?this:this.clone(!0),S(r[o])[a](t),u.apply(n,t.get());return this.pushStack(n)}});var Me=new RegExp("^("+ee+")(?!px)[a-z%]+$","i"),Ie=function(e){var t=e.ownerDocument.defaultView;return t&&t.opener||(t=C),t.getComputedStyle(e)},We=function(e,t,n){var r,i,o={};for(i in t)o[i]=e.style[i],e.style[i]=t[i];for(i in r=n.call(e),t)e.style[i]=o[i];return r},Fe=new RegExp(ne.join("|"),"i");function Be(e,t,n){var r,i,o,a,s=e.style;return(n=n||Ie(e))&&(""!==(a=n.getPropertyValue(t)||n[t])||ie(e)||(a=S.style(e,t)),!y.pixelBoxStyles()&&Me.test(a)&&Fe.test(t)&&(r=s.width,i=s.minWidth,o=s.maxWidth,s.minWidth=s.maxWidth=s.width=a,a=n.width,s.width=r,s.minWidth=i,s.maxWidth=o)),void 0!==a?a+"":a}function $e(e,t){return{get:function(){if(!e())return(this.get=t).apply(this,arguments);delete this.get}}}!function(){function e(){if(l){u.style.cssText="position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0",l.style.cssText="position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%",re.appendChild(u).appendChild(l);var e=C.getComputedStyle(l);n="1%"!==e.top,s=12===t(e.marginLeft),l.style.right="60%",o=36===t(e.right),r=36===t(e.width),l.style.position="absolute",i=12===t(l.offsetWidth/3),re.removeChild(u),l=null}}function t(e){return Math.round(parseFloat(e))}var n,r,i,o,a,s,u=E.createElement("div"),l=E.createElement("div");l.style&&(l.style.backgroundClip="content-box",l.cloneNode(!0).style.backgroundClip="",y.clearCloneStyle="content-box"===l.style.backgroundClip,S.extend(y,{boxSizingReliable:function(){return e(),r},pixelBoxStyles:function(){return e(),o},pixelPosition:function(){return e(),n},reliableMarginLeft:function(){return e(),s},scrollboxSize:function(){return e(),i},reliableTrDimensions:function(){var e,t,n,r;return null==a&&(e=E.createElement("table"),t=E.createElement("tr"),n=E.createElement("div"),e.style.cssText="position:absolute;left:-11111px",t.style.height="1px",n.style.height="9px",re.appendChild(e).appendChild(t).appendChild(n),r=C.getComputedStyle(t),a=3<parseInt(r.height),re.removeChild(e)),a}}))}();var _e=["Webkit","Moz","ms"],ze=E.createElement("div").style,Ue={};function Xe(e){var t=S.cssProps[e]||Ue[e];return t||(e in ze?e:Ue[e]=function(e){var t=e[0].toUpperCase()+e.slice(1),n=_e.length;while(n--)if((e=_e[n]+t)in ze)return e}(e)||e)}var Ve=/^(none|table(?!-c[ea]).+)/,Ge=/^--/,Ye={position:"absolute",visibility:"hidden",display:"block"},Qe={letterSpacing:"0",fontWeight:"400"};function Je(e,t,n){var r=te.exec(t);return r?Math.max(0,r[2]-(n||0))+(r[3]||"px"):t}function Ke(e,t,n,r,i,o){var a="width"===t?1:0,s=0,u=0;if(n===(r?"border":"content"))return 0;for(;a<4;a+=2)"margin"===n&&(u+=S.css(e,n+ne[a],!0,i)),r?("content"===n&&(u-=S.css(e,"padding"+ne[a],!0,i)),"margin"!==n&&(u-=S.css(e,"border"+ne[a]+"Width",!0,i))):(u+=S.css(e,"padding"+ne[a],!0,i),"padding"!==n?u+=S.css(e,"border"+ne[a]+"Width",!0,i):s+=S.css(e,"border"+ne[a]+"Width",!0,i));return!r&&0<=o&&(u+=Math.max(0,Math.ceil(e["offset"+t[0].toUpperCase()+t.slice(1)]-o-u-s-.5))||0),u}function Ze(e,t,n){var r=Ie(e),i=(!y.boxSizingReliable()||n)&&"border-box"===S.css(e,"boxSizing",!1,r),o=i,a=Be(e,t,r),s="offset"+t[0].toUpperCase()+t.slice(1);if(Me.test(a)){if(!n)return a;a="auto"}return(!y.boxSizingReliable()&&i||!y.reliableTrDimensions()&&A(e,"tr")||"auto"===a||!parseFloat(a)&&"inline"===S.css(e,"display",!1,r))&&e.getClientRects().length&&(i="border-box"===S.css(e,"boxSizing",!1,r),(o=s in e)&&(a=e[s])),(a=parseFloat(a)||0)+Ke(e,t,n||(i?"border":"content"),o,r,a)+"px"}function et(e,t,n,r,i){return new et.prototype.init(e,t,n,r,i)}S.extend({cssHooks:{opacity:{get:function(e,t){if(t){var n=Be(e,"opacity");return""===n?"1":n}}}},cssNumber:{animationIterationCount:!0,columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,gridArea:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnStart:!0,gridRow:!0,gridRowEnd:!0,gridRowStart:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{},style:function(e,t,n,r){if(e&&3!==e.nodeType&&8!==e.nodeType&&e.style){var i,o,a,s=X(t),u=Ge.test(t),l=e.style;if(u||(t=Xe(s)),a=S.cssHooks[t]||S.cssHooks[s],void 0===n)return a&&"get"in a&&void 0!==(i=a.get(e,!1,r))?i:l[t];"string"===(o=typeof n)&&(i=te.exec(n))&&i[1]&&(n=se(e,t,i),o="number"),null!=n&&n==n&&("number"!==o||u||(n+=i&&i[3]||(S.cssNumber[s]?"":"px")),y.clearCloneStyle||""!==n||0!==t.indexOf("background")||(l[t]="inherit"),a&&"set"in a&&void 0===(n=a.set(e,n,r))||(u?l.setProperty(t,n):l[t]=n))}},css:function(e,t,n,r){var i,o,a,s=X(t);return Ge.test(t)||(t=Xe(s)),(a=S.cssHooks[t]||S.cssHooks[s])&&"get"in a&&(i=a.get(e,!0,n)),void 0===i&&(i=Be(e,t,r)),"normal"===i&&t in Qe&&(i=Qe[t]),""===n||n?(o=parseFloat(i),!0===n||isFinite(o)?o||0:i):i}}),S.each(["height","width"],function(e,u){S.cssHooks[u]={get:function(e,t,n){if(t)return!Ve.test(S.css(e,"display"))||e.getClientRects().length&&e.getBoundingClientRect().width?Ze(e,u,n):We(e,Ye,function(){return Ze(e,u,n)})},set:function(e,t,n){var r,i=Ie(e),o=!y.scrollboxSize()&&"absolute"===i.position,a=(o||n)&&"border-box"===S.css(e,"boxSizing",!1,i),s=n?Ke(e,u,n,a,i):0;return a&&o&&(s-=Math.ceil(e["offset"+u[0].toUpperCase()+u.slice(1)]-parseFloat(i[u])-Ke(e,u,"border",!1,i)-.5)),s&&(r=te.exec(t))&&"px"!==(r[3]||"px")&&(e.style[u]=t,t=S.css(e,u)),Je(0,t,s)}}}),S.cssHooks.marginLeft=$e(y.reliableMarginLeft,function(e,t){if(t)return(parseFloat(Be(e,"marginLeft"))||e.getBoundingClientRect().left-We(e,{marginLeft:0},function(){return e.getBoundingClientRect().left}))+"px"}),S.each({margin:"",padding:"",border:"Width"},function(i,o){S.cssHooks[i+o]={expand:function(e){for(var t=0,n={},r="string"==typeof e?e.split(" "):[e];t<4;t++)n[i+ne[t]+o]=r[t]||r[t-2]||r[0];return n}},"margin"!==i&&(S.cssHooks[i+o].set=Je)}),S.fn.extend({css:function(e,t){return $(this,function(e,t,n){var r,i,o={},a=0;if(Array.isArray(t)){for(r=Ie(e),i=t.length;a<i;a++)o[t[a]]=S.css(e,t[a],!1,r);return o}return void 0!==n?S.style(e,t,n):S.css(e,t)},e,t,1<arguments.length)}}),((S.Tween=et).prototype={constructor:et,init:function(e,t,n,r,i,o){this.elem=e,this.prop=n,this.easing=i||S.easing._default,this.options=t,this.start=this.now=this.cur(),this.end=r,this.unit=o||(S.cssNumber[n]?"":"px")},cur:function(){var e=et.propHooks[this.prop];return e&&e.get?e.get(this):et.propHooks._default.get(this)},run:function(e){var t,n=et.propHooks[this.prop];return this.options.duration?this.pos=t=S.easing[this.easing](e,this.options.duration*e,0,1,this.options.duration):this.pos=t=e,this.now=(this.end-this.start)*t+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):et.propHooks._default.set(this),this}}).init.prototype=et.prototype,(et.propHooks={_default:{get:function(e){var t;return 1!==e.elem.nodeType||null!=e.elem[e.prop]&&null==e.elem.style[e.prop]?e.elem[e.prop]:(t=S.css(e.elem,e.prop,""))&&"auto"!==t?t:0},set:function(e){S.fx.step[e.prop]?S.fx.step[e.prop](e):1!==e.elem.nodeType||!S.cssHooks[e.prop]&&null==e.elem.style[Xe(e.prop)]?e.elem[e.prop]=e.now:S.style(e.elem,e.prop,e.now+e.unit)}}}).scrollTop=et.propHooks.scrollLeft={set:function(e){e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now)}},S.easing={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2},_default:"swing"},S.fx=et.prototype.init,S.fx.step={};var tt,nt,rt,it,ot=/^(?:toggle|show|hide)$/,at=/queueHooks$/;function st(){nt&&(!1===E.hidden&&C.requestAnimationFrame?C.requestAnimationFrame(st):C.setTimeout(st,S.fx.interval),S.fx.tick())}function ut(){return C.setTimeout(function(){tt=void 0}),tt=Date.now()}function lt(e,t){var n,r=0,i={height:e};for(t=t?1:0;r<4;r+=2-t)i["margin"+(n=ne[r])]=i["padding"+n]=e;return t&&(i.opacity=i.width=e),i}function ct(e,t,n){for(var r,i=(ft.tweeners[t]||[]).concat(ft.tweeners["*"]),o=0,a=i.length;o<a;o++)if(r=i[o].call(n,t,e))return r}function ft(o,e,t){var n,a,r=0,i=ft.prefilters.length,s=S.Deferred().always(function(){delete u.elem}),u=function(){if(a)return!1;for(var e=tt||ut(),t=Math.max(0,l.startTime+l.duration-e),n=1-(t/l.duration||0),r=0,i=l.tweens.length;r<i;r++)l.tweens[r].run(n);return s.notifyWith(o,[l,n,t]),n<1&&i?t:(i||s.notifyWith(o,[l,1,0]),s.resolveWith(o,[l]),!1)},l=s.promise({elem:o,props:S.extend({},e),opts:S.extend(!0,{specialEasing:{},easing:S.easing._default},t),originalProperties:e,originalOptions:t,startTime:tt||ut(),duration:t.duration,tweens:[],createTween:function(e,t){var n=S.Tween(o,l.opts,e,t,l.opts.specialEasing[e]||l.opts.easing);return l.tweens.push(n),n},stop:function(e){var t=0,n=e?l.tweens.length:0;if(a)return this;for(a=!0;t<n;t++)l.tweens[t].run(1);return e?(s.notifyWith(o,[l,1,0]),s.resolveWith(o,[l,e])):s.rejectWith(o,[l,e]),this}}),c=l.props;for(!function(e,t){var n,r,i,o,a;for(n in e)if(i=t[r=X(n)],o=e[n],Array.isArray(o)&&(i=o[1],o=e[n]=o[0]),n!==r&&(e[r]=o,delete e[n]),(a=S.cssHooks[r])&&"expand"in a)for(n in o=a.expand(o),delete e[r],o)n in e||(e[n]=o[n],t[n]=i);else t[r]=i}(c,l.opts.specialEasing);r<i;r++)if(n=ft.prefilters[r].call(l,o,c,l.opts))return m(n.stop)&&(S._queueHooks(l.elem,l.opts.queue).stop=n.stop.bind(n)),n;return S.map(c,ct,l),m(l.opts.start)&&l.opts.start.call(o,l),l.progress(l.opts.progress).done(l.opts.done,l.opts.complete).fail(l.opts.fail).always(l.opts.always),S.fx.timer(S.extend(u,{elem:o,anim:l,queue:l.opts.queue})),l}S.Animation=S.extend(ft,{tweeners:{"*":[function(e,t){var n=this.createTween(e,t);return se(n.elem,e,te.exec(t),n),n}]},tweener:function(e,t){m(e)?(t=e,e=["*"]):e=e.match(P);for(var n,r=0,i=e.length;r<i;r++)n=e[r],ft.tweeners[n]=ft.tweeners[n]||[],ft.tweeners[n].unshift(t)},prefilters:[function(e,t,n){var r,i,o,a,s,u,l,c,f="width"in t||"height"in t,p=this,d={},h=e.style,g=e.nodeType&&ae(e),v=Y.get(e,"fxshow");for(r in n.queue||(null==(a=S._queueHooks(e,"fx")).unqueued&&(a.unqueued=0,s=a.empty.fire,a.empty.fire=function(){a.unqueued||s()}),a.unqueued++,p.always(function(){p.always(function(){a.unqueued--,S.queue(e,"fx").length||a.empty.fire()})})),t)if(i=t[r],ot.test(i)){if(delete t[r],o=o||"toggle"===i,i===(g?"hide":"show")){if("show"!==i||!v||void 0===v[r])continue;g=!0}d[r]=v&&v[r]||S.style(e,r)}if((u=!S.isEmptyObject(t))||!S.isEmptyObject(d))for(r in f&&1===e.nodeType&&(n.overflow=[h.overflow,h.overflowX,h.overflowY],null==(l=v&&v.display)&&(l=Y.get(e,"display")),"none"===(c=S.css(e,"display"))&&(l?c=l:(le([e],!0),l=e.style.display||l,c=S.css(e,"display"),le([e]))),("inline"===c||"inline-block"===c&&null!=l)&&"none"===S.css(e,"float")&&(u||(p.done(function(){h.display=l}),null==l&&(c=h.display,l="none"===c?"":c)),h.display="inline-block")),n.overflow&&(h.overflow="hidden",p.always(function(){h.overflow=n.overflow[0],h.overflowX=n.overflow[1],h.overflowY=n.overflow[2]})),u=!1,d)u||(v?"hidden"in v&&(g=v.hidden):v=Y.access(e,"fxshow",{display:l}),o&&(v.hidden=!g),g&&le([e],!0),p.done(function(){for(r in g||le([e]),Y.remove(e,"fxshow"),d)S.style(e,r,d[r])})),u=ct(g?v[r]:0,r,p),r in v||(v[r]=u.start,g&&(u.end=u.start,u.start=0))}],prefilter:function(e,t){t?ft.prefilters.unshift(e):ft.prefilters.push(e)}}),S.speed=function(e,t,n){var r=e&&"object"==typeof e?S.extend({},e):{complete:n||!n&&t||m(e)&&e,duration:e,easing:n&&t||t&&!m(t)&&t};return S.fx.off?r.duration=0:"number"!=typeof r.duration&&(r.duration in S.fx.speeds?r.duration=S.fx.speeds[r.duration]:r.duration=S.fx.speeds._default),null!=r.queue&&!0!==r.queue||(r.queue="fx"),r.old=r.complete,r.complete=function(){m(r.old)&&r.old.call(this),r.queue&&S.dequeue(this,r.queue)},r},S.fn.extend({fadeTo:function(e,t,n,r){return this.filter(ae).css("opacity",0).show().end().animate({opacity:t},e,n,r)},animate:function(t,e,n,r){var i=S.isEmptyObject(t),o=S.speed(e,n,r),a=function(){var e=ft(this,S.extend({},t),o);(i||Y.get(this,"finish"))&&e.stop(!0)};return a.finish=a,i||!1===o.queue?this.each(a):this.queue(o.queue,a)},stop:function(i,e,o){var a=function(e){var t=e.stop;delete e.stop,t(o)};return"string"!=typeof i&&(o=e,e=i,i=void 0),e&&this.queue(i||"fx",[]),this.each(function(){var e=!0,t=null!=i&&i+"queueHooks",n=S.timers,r=Y.get(this);if(t)r[t]&&r[t].stop&&a(r[t]);else for(t in r)r[t]&&r[t].stop&&at.test(t)&&a(r[t]);for(t=n.length;t--;)n[t].elem!==this||null!=i&&n[t].queue!==i||(n[t].anim.stop(o),e=!1,n.splice(t,1));!e&&o||S.dequeue(this,i)})},finish:function(a){return!1!==a&&(a=a||"fx"),this.each(function(){var e,t=Y.get(this),n=t[a+"queue"],r=t[a+"queueHooks"],i=S.timers,o=n?n.length:0;for(t.finish=!0,S.queue(this,a,[]),r&&r.stop&&r.stop.call(this,!0),e=i.length;e--;)i[e].elem===this&&i[e].queue===a&&(i[e].anim.stop(!0),i.splice(e,1));for(e=0;e<o;e++)n[e]&&n[e].finish&&n[e].finish.call(this);delete t.finish})}}),S.each(["toggle","show","hide"],function(e,r){var i=S.fn[r];S.fn[r]=function(e,t,n){return null==e||"boolean"==typeof e?i.apply(this,arguments):this.animate(lt(r,!0),e,t,n)}}),S.each({slideDown:lt("show"),slideUp:lt("hide"),slideToggle:lt("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(e,r){S.fn[e]=function(e,t,n){return this.animate(r,e,t,n)}}),S.timers=[],S.fx.tick=function(){var e,t=0,n=S.timers;for(tt=Date.now();t<n.length;t++)(e=n[t])()||n[t]!==e||n.splice(t--,1);n.length||S.fx.stop(),tt=void 0},S.fx.timer=function(e){S.timers.push(e),S.fx.start()},S.fx.interval=13,S.fx.start=function(){nt||(nt=!0,st())},S.fx.stop=function(){nt=null},S.fx.speeds={slow:600,fast:200,_default:400},S.fn.delay=function(r,e){return r=S.fx&&S.fx.speeds[r]||r,e=e||"fx",this.queue(e,function(e,t){var n=C.setTimeout(e,r);t.stop=function(){C.clearTimeout(n)}})},rt=E.createElement("input"),it=E.createElement("select").appendChild(E.createElement("option")),rt.type="checkbox",y.checkOn=""!==rt.value,y.optSelected=it.selected,(rt=E.createElement("input")).value="t",rt.type="radio",y.radioValue="t"===rt.value;var pt,dt=S.expr.attrHandle;S.fn.extend({attr:function(e,t){return $(this,S.attr,e,t,1<arguments.length)},removeAttr:function(e){return this.each(function(){S.removeAttr(this,e)})}}),S.extend({attr:function(e,t,n){var r,i,o=e.nodeType;if(3!==o&&8!==o&&2!==o)return"undefined"==typeof e.getAttribute?S.prop(e,t,n):(1===o&&S.isXMLDoc(e)||(i=S.attrHooks[t.toLowerCase()]||(S.expr.match.bool.test(t)?pt:void 0)),void 0!==n?null===n?void S.removeAttr(e,t):i&&"set"in i&&void 0!==(r=i.set(e,n,t))?r:(e.setAttribute(t,n+""),n):i&&"get"in i&&null!==(r=i.get(e,t))?r:null==(r=S.find.attr(e,t))?void 0:r)},attrHooks:{type:{set:function(e,t){if(!y.radioValue&&"radio"===t&&A(e,"input")){var n=e.value;return e.setAttribute("type",t),n&&(e.value=n),t}}}},removeAttr:function(e,t){var n,r=0,i=t&&t.match(P);if(i&&1===e.nodeType)while(n=i[r++])e.removeAttribute(n)}}),pt={set:function(e,t,n){return!1===t?S.removeAttr(e,n):e.setAttribute(n,n),n}},S.each(S.expr.match.bool.source.match(/\w+/g),function(e,t){var a=dt[t]||S.find.attr;dt[t]=function(e,t,n){var r,i,o=t.toLowerCase();return n||(i=dt[o],dt[o]=r,r=null!=a(e,t,n)?o:null,dt[o]=i),r}});var ht=/^(?:input|select|textarea|button)$/i,gt=/^(?:a|area)$/i;function vt(e){return(e.match(P)||[]).join(" ")}function yt(e){return e.getAttribute&&e.getAttribute("class")||""}function mt(e){return Array.isArray(e)?e:"string"==typeof e&&e.match(P)||[]}S.fn.extend({prop:function(e,t){return $(this,S.prop,e,t,1<arguments.length)},removeProp:function(e){return this.each(function(){delete this[S.propFix[e]||e]})}}),S.extend({prop:function(e,t,n){var r,i,o=e.nodeType;if(3!==o&&8!==o&&2!==o)return 1===o&&S.isXMLDoc(e)||(t=S.propFix[t]||t,i=S.propHooks[t]),void 0!==n?i&&"set"in i&&void 0!==(r=i.set(e,n,t))?r:e[t]=n:i&&"get"in i&&null!==(r=i.get(e,t))?r:e[t]},propHooks:{tabIndex:{get:function(e){var t=S.find.attr(e,"tabindex");return t?parseInt(t,10):ht.test(e.nodeName)||gt.test(e.nodeName)&&e.href?0:-1}}},propFix:{"for":"htmlFor","class":"className"}}),y.optSelected||(S.propHooks.selected={get:function(e){var t=e.parentNode;return t&&t.parentNode&&t.parentNode.selectedIndex,null},set:function(e){var t=e.parentNode;t&&(t.selectedIndex,t.parentNode&&t.parentNode.selectedIndex)}}),S.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){S.propFix[this.toLowerCase()]=this}),S.fn.extend({addClass:function(t){var e,n,r,i,o,a,s,u=0;if(m(t))return this.each(function(e){S(this).addClass(t.call(this,e,yt(this)))});if((e=mt(t)).length)while(n=this[u++])if(i=yt(n),r=1===n.nodeType&&" "+vt(i)+" "){a=0;while(o=e[a++])r.indexOf(" "+o+" ")<0&&(r+=o+" ");i!==(s=vt(r))&&n.setAttribute("class",s)}return this},removeClass:function(t){var e,n,r,i,o,a,s,u=0;if(m(t))return this.each(function(e){S(this).removeClass(t.call(this,e,yt(this)))});if(!arguments.length)return this.attr("class","");if((e=mt(t)).length)while(n=this[u++])if(i=yt(n),r=1===n.nodeType&&" "+vt(i)+" "){a=0;while(o=e[a++])while(-1<r.indexOf(" "+o+" "))r=r.replace(" "+o+" "," ");i!==(s=vt(r))&&n.setAttribute("class",s)}return this},toggleClass:function(i,t){var o=typeof i,a="string"===o||Array.isArray(i);return"boolean"==typeof t&&a?t?this.addClass(i):this.removeClass(i):m(i)?this.each(function(e){S(this).toggleClass(i.call(this,e,yt(this),t),t)}):this.each(function(){var e,t,n,r;if(a){t=0,n=S(this),r=mt(i);while(e=r[t++])n.hasClass(e)?n.removeClass(e):n.addClass(e)}else void 0!==i&&"boolean"!==o||((e=yt(this))&&Y.set(this,"__className__",e),this.setAttribute&&this.setAttribute("class",e||!1===i?"":Y.get(this,"__className__")||""))})},hasClass:function(e){var t,n,r=0;t=" "+e+" ";while(n=this[r++])if(1===n.nodeType&&-1<(" "+vt(yt(n))+" ").indexOf(t))return!0;return!1}});var xt=/\r/g;S.fn.extend({val:function(n){var r,e,i,t=this[0];return arguments.length?(i=m(n),this.each(function(e){var t;1===this.nodeType&&(null==(t=i?n.call(this,e,S(this).val()):n)?t="":"number"==typeof t?t+="":Array.isArray(t)&&(t=S.map(t,function(e){return null==e?"":e+""})),(r=S.valHooks[this.type]||S.valHooks[this.nodeName.toLowerCase()])&&"set"in r&&void 0!==r.set(this,t,"value")||(this.value=t))})):t?(r=S.valHooks[t.type]||S.valHooks[t.nodeName.toLowerCase()])&&"get"in r&&void 0!==(e=r.get(t,"value"))?e:"string"==typeof(e=t.value)?e.replace(xt,""):null==e?"":e:void 0}}),S.extend({valHooks:{option:{get:function(e){var t=S.find.attr(e,"value");return null!=t?t:vt(S.text(e))}},select:{get:function(e){var t,n,r,i=e.options,o=e.selectedIndex,a="select-one"===e.type,s=a?null:[],u=a?o+1:i.length;for(r=o<0?u:a?o:0;r<u;r++)if(((n=i[r]).selected||r===o)&&!n.disabled&&(!n.parentNode.disabled||!A(n.parentNode,"optgroup"))){if(t=S(n).val(),a)return t;s.push(t)}return s},set:function(e,t){var n,r,i=e.options,o=S.makeArray(t),a=i.length;while(a--)((r=i[a]).selected=-1<S.inArray(S.valHooks.option.get(r),o))&&(n=!0);return n||(e.selectedIndex=-1),o}}}}),S.each(["radio","checkbox"],function(){S.valHooks[this]={set:function(e,t){if(Array.isArray(t))return e.checked=-1<S.inArray(S(e).val(),t)}},y.checkOn||(S.valHooks[this].get=function(e){return null===e.getAttribute("value")?"on":e.value})}),y.focusin="onfocusin"in C;var bt=/^(?:focusinfocus|focusoutblur)$/,wt=function(e){e.stopPropagation()};S.extend(S.event,{trigger:function(e,t,n,r){var i,o,a,s,u,l,c,f,p=[n||E],d=v.call(e,"type")?e.type:e,h=v.call(e,"namespace")?e.namespace.split("."):[];if(o=f=a=n=n||E,3!==n.nodeType&&8!==n.nodeType&&!bt.test(d+S.event.triggered)&&(-1<d.indexOf(".")&&(d=(h=d.split(".")).shift(),h.sort()),u=d.indexOf(":")<0&&"on"+d,(e=e[S.expando]?e:new S.Event(d,"object"==typeof e&&e)).isTrigger=r?2:3,e.namespace=h.join("."),e.rnamespace=e.namespace?new RegExp("(^|\\.)"+h.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,e.result=void 0,e.target||(e.target=n),t=null==t?[e]:S.makeArray(t,[e]),c=S.event.special[d]||{},r||!c.trigger||!1!==c.trigger.apply(n,t))){if(!r&&!c.noBubble&&!x(n)){for(s=c.delegateType||d,bt.test(s+d)||(o=o.parentNode);o;o=o.parentNode)p.push(o),a=o;a===(n.ownerDocument||E)&&p.push(a.defaultView||a.parentWindow||C)}i=0;while((o=p[i++])&&!e.isPropagationStopped())f=o,e.type=1<i?s:c.bindType||d,(l=(Y.get(o,"events")||Object.create(null))[e.type]&&Y.get(o,"handle"))&&l.apply(o,t),(l=u&&o[u])&&l.apply&&V(o)&&(e.result=l.apply(o,t),!1===e.result&&e.preventDefault());return e.type=d,r||e.isDefaultPrevented()||c._default&&!1!==c._default.apply(p.pop(),t)||!V(n)||u&&m(n[d])&&!x(n)&&((a=n[u])&&(n[u]=null),S.event.triggered=d,e.isPropagationStopped()&&f.addEventListener(d,wt),n[d](),e.isPropagationStopped()&&f.removeEventListener(d,wt),S.event.triggered=void 0,a&&(n[u]=a)),e.result}},simulate:function(e,t,n){var r=S.extend(new S.Event,n,{type:e,isSimulated:!0});S.event.trigger(r,null,t)}}),S.fn.extend({trigger:function(e,t){return this.each(function(){S.event.trigger(e,t,this)})},triggerHandler:function(e,t){var n=this[0];if(n)return S.event.trigger(e,t,n,!0)}}),y.focusin||S.each({focus:"focusin",blur:"focusout"},function(n,r){var i=function(e){S.event.simulate(r,e.target,S.event.fix(e))};S.event.special[r]={setup:function(){var e=this.ownerDocument||this.document||this,t=Y.access(e,r);t||e.addEventListener(n,i,!0),Y.access(e,r,(t||0)+1)},teardown:function(){var e=this.ownerDocument||this.document||this,t=Y.access(e,r)-1;t?Y.access(e,r,t):(e.removeEventListener(n,i,!0),Y.remove(e,r))}}});var Tt=C.location,Ct={guid:Date.now()},Et=/\?/;S.parseXML=function(e){var t;if(!e||"string"!=typeof e)return null;try{t=(new C.DOMParser).parseFromString(e,"text/xml")}catch(e){t=void 0}return t&&!t.getElementsByTagName("parsererror").length||S.error("Invalid XML: "+e),t};var St=/\[\]$/,kt=/\r?\n/g,At=/^(?:submit|button|image|reset|file)$/i,Nt=/^(?:input|select|textarea|keygen)/i;function Dt(n,e,r,i){var t;if(Array.isArray(e))S.each(e,function(e,t){r||St.test(n)?i(n,t):Dt(n+"["+("object"==typeof t&&null!=t?e:"")+"]",t,r,i)});else if(r||"object"!==w(e))i(n,e);else for(t in e)Dt(n+"["+t+"]",e[t],r,i)}S.param=function(e,t){var n,r=[],i=function(e,t){var n=m(t)?t():t;r[r.length]=encodeURIComponent(e)+"="+encodeURIComponent(null==n?"":n)};if(null==e)return"";if(Array.isArray(e)||e.jquery&&!S.isPlainObject(e))S.each(e,function(){i(this.name,this.value)});else for(n in e)Dt(n,e[n],t,i);return r.join("&")},S.fn.extend({serialize:function(){return S.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var e=S.prop(this,"elements");return e?S.makeArray(e):this}).filter(function(){var e=this.type;return this.name&&!S(this).is(":disabled")&&Nt.test(this.nodeName)&&!At.test(e)&&(this.checked||!pe.test(e))}).map(function(e,t){var n=S(this).val();return null==n?null:Array.isArray(n)?S.map(n,function(e){return{name:t.name,value:e.replace(kt,"\r\n")}}):{name:t.name,value:n.replace(kt,"\r\n")}}).get()}});var jt=/%20/g,qt=/#.*$/,Lt=/([?&])_=[^&]*/,Ht=/^(.*?):[ \t]*([^\r\n]*)$/gm,Ot=/^(?:GET|HEAD)$/,Pt=/^\/\//,Rt={},Mt={},It="*/".concat("*"),Wt=E.createElement("a");function Ft(o){return function(e,t){"string"!=typeof e&&(t=e,e="*");var n,r=0,i=e.toLowerCase().match(P)||[];if(m(t))while(n=i[r++])"+"===n[0]?(n=n.slice(1)||"*",(o[n]=o[n]||[]).unshift(t)):(o[n]=o[n]||[]).push(t)}}function Bt(t,i,o,a){var s={},u=t===Mt;function l(e){var r;return s[e]=!0,S.each(t[e]||[],function(e,t){var n=t(i,o,a);return"string"!=typeof n||u||s[n]?u?!(r=n):void 0:(i.dataTypes.unshift(n),l(n),!1)}),r}return l(i.dataTypes[0])||!s["*"]&&l("*")}function $t(e,t){var n,r,i=S.ajaxSettings.flatOptions||{};for(n in t)void 0!==t[n]&&((i[n]?e:r||(r={}))[n]=t[n]);return r&&S.extend(!0,e,r),e}Wt.href=Tt.href,S.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:Tt.href,type:"GET",isLocal:/^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(Tt.protocol),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":It,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/\bxml\b/,html:/\bhtml/,json:/\bjson\b/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":JSON.parse,"text xml":S.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(e,t){return t?$t($t(e,S.ajaxSettings),t):$t(S.ajaxSettings,e)},ajaxPrefilter:Ft(Rt),ajaxTransport:Ft(Mt),ajax:function(e,t){"object"==typeof e&&(t=e,e=void 0),t=t||{};var c,f,p,n,d,r,h,g,i,o,v=S.ajaxSetup({},t),y=v.context||v,m=v.context&&(y.nodeType||y.jquery)?S(y):S.event,x=S.Deferred(),b=S.Callbacks("once memory"),w=v.statusCode||{},a={},s={},u="canceled",T={readyState:0,getResponseHeader:function(e){var t;if(h){if(!n){n={};while(t=Ht.exec(p))n[t[1].toLowerCase()+" "]=(n[t[1].toLowerCase()+" "]||[]).concat(t[2])}t=n[e.toLowerCase()+" "]}return null==t?null:t.join(", ")},getAllResponseHeaders:function(){return h?p:null},setRequestHeader:function(e,t){return null==h&&(e=s[e.toLowerCase()]=s[e.toLowerCase()]||e,a[e]=t),this},overrideMimeType:function(e){return null==h&&(v.mimeType=e),this},statusCode:function(e){var t;if(e)if(h)T.always(e[T.status]);else for(t in e)w[t]=[w[t],e[t]];return this},abort:function(e){var t=e||u;return c&&c.abort(t),l(0,t),this}};if(x.promise(T),v.url=((e||v.url||Tt.href)+"").replace(Pt,Tt.protocol+"//"),v.type=t.method||t.type||v.method||v.type,v.dataTypes=(v.dataType||"*").toLowerCase().match(P)||[""],null==v.crossDomain){r=E.createElement("a");try{r.href=v.url,r.href=r.href,v.crossDomain=Wt.protocol+"//"+Wt.host!=r.protocol+"//"+r.host}catch(e){v.crossDomain=!0}}if(v.data&&v.processData&&"string"!=typeof v.data&&(v.data=S.param(v.data,v.traditional)),Bt(Rt,v,t,T),h)return T;for(i in(g=S.event&&v.global)&&0==S.active++&&S.event.trigger("ajaxStart"),v.type=v.type.toUpperCase(),v.hasContent=!Ot.test(v.type),f=v.url.replace(qt,""),v.hasContent?v.data&&v.processData&&0===(v.contentType||"").indexOf("application/x-www-form-urlencoded")&&(v.data=v.data.replace(jt,"+")):(o=v.url.slice(f.length),v.data&&(v.processData||"string"==typeof v.data)&&(f+=(Et.test(f)?"&":"?")+v.data,delete v.data),!1===v.cache&&(f=f.replace(Lt,"$1"),o=(Et.test(f)?"&":"?")+"_="+Ct.guid+++o),v.url=f+o),v.ifModified&&(S.lastModified[f]&&T.setRequestHeader("If-Modified-Since",S.lastModified[f]),S.etag[f]&&T.setRequestHeader("If-None-Match",S.etag[f])),(v.data&&v.hasContent&&!1!==v.contentType||t.contentType)&&T.setRequestHeader("Content-Type",v.contentType),T.setRequestHeader("Accept",v.dataTypes[0]&&v.accepts[v.dataTypes[0]]?v.accepts[v.dataTypes[0]]+("*"!==v.dataTypes[0]?", "+It+"; q=0.01":""):v.accepts["*"]),v.headers)T.setRequestHeader(i,v.headers[i]);if(v.beforeSend&&(!1===v.beforeSend.call(y,T,v)||h))return T.abort();if(u="abort",b.add(v.complete),T.done(v.success),T.fail(v.error),c=Bt(Mt,v,t,T)){if(T.readyState=1,g&&m.trigger("ajaxSend",[T,v]),h)return T;v.async&&0<v.timeout&&(d=C.setTimeout(function(){T.abort("timeout")},v.timeout));try{h=!1,c.send(a,l)}catch(e){if(h)throw e;l(-1,e)}}else l(-1,"No Transport");function l(e,t,n,r){var i,o,a,s,u,l=t;h||(h=!0,d&&C.clearTimeout(d),c=void 0,p=r||"",T.readyState=0<e?4:0,i=200<=e&&e<300||304===e,n&&(s=function(e,t,n){var r,i,o,a,s=e.contents,u=e.dataTypes;while("*"===u[0])u.shift(),void 0===r&&(r=e.mimeType||t.getResponseHeader("Content-Type"));if(r)for(i in s)if(s[i]&&s[i].test(r)){u.unshift(i);break}if(u[0]in n)o=u[0];else{for(i in n){if(!u[0]||e.converters[i+" "+u[0]]){o=i;break}a||(a=i)}o=o||a}if(o)return o!==u[0]&&u.unshift(o),n[o]}(v,T,n)),!i&&-1<S.inArray("script",v.dataTypes)&&(v.converters["text script"]=function(){}),s=function(e,t,n,r){var i,o,a,s,u,l={},c=e.dataTypes.slice();if(c[1])for(a in e.converters)l[a.toLowerCase()]=e.converters[a];o=c.shift();while(o)if(e.responseFields[o]&&(n[e.responseFields[o]]=t),!u&&r&&e.dataFilter&&(t=e.dataFilter(t,e.dataType)),u=o,o=c.shift())if("*"===o)o=u;else if("*"!==u&&u!==o){if(!(a=l[u+" "+o]||l["* "+o]))for(i in l)if((s=i.split(" "))[1]===o&&(a=l[u+" "+s[0]]||l["* "+s[0]])){!0===a?a=l[i]:!0!==l[i]&&(o=s[0],c.unshift(s[1]));break}if(!0!==a)if(a&&e["throws"])t=a(t);else try{t=a(t)}catch(e){return{state:"parsererror",error:a?e:"No conversion from "+u+" to "+o}}}return{state:"success",data:t}}(v,s,T,i),i?(v.ifModified&&((u=T.getResponseHeader("Last-Modified"))&&(S.lastModified[f]=u),(u=T.getResponseHeader("etag"))&&(S.etag[f]=u)),204===e||"HEAD"===v.type?l="nocontent":304===e?l="notmodified":(l=s.state,o=s.data,i=!(a=s.error))):(a=l,!e&&l||(l="error",e<0&&(e=0))),T.status=e,T.statusText=(t||l)+"",i?x.resolveWith(y,[o,l,T]):x.rejectWith(y,[T,l,a]),T.statusCode(w),w=void 0,g&&m.trigger(i?"ajaxSuccess":"ajaxError",[T,v,i?o:a]),b.fireWith(y,[T,l]),g&&(m.trigger("ajaxComplete",[T,v]),--S.active||S.event.trigger("ajaxStop")))}return T},getJSON:function(e,t,n){return S.get(e,t,n,"json")},getScript:function(e,t){return S.get(e,void 0,t,"script")}}),S.each(["get","post"],function(e,i){S[i]=function(e,t,n,r){return m(t)&&(r=r||n,n=t,t=void 0),S.ajax(S.extend({url:e,type:i,dataType:r,data:t,success:n},S.isPlainObject(e)&&e))}}),S.ajaxPrefilter(function(e){var t;for(t in e.headers)"content-type"===t.toLowerCase()&&(e.contentType=e.headers[t]||"")}),S._evalUrl=function(e,t,n){return S.ajax({url:e,type:"GET",dataType:"script",cache:!0,async:!1,global:!1,converters:{"text script":function(){}},dataFilter:function(e){S.globalEval(e,t,n)}})},S.fn.extend({wrapAll:function(e){var t;return this[0]&&(m(e)&&(e=e.call(this[0])),t=S(e,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&t.insertBefore(this[0]),t.map(function(){var e=this;while(e.firstElementChild)e=e.firstElementChild;return e}).append(this)),this},wrapInner:function(n){return m(n)?this.each(function(e){S(this).wrapInner(n.call(this,e))}):this.each(function(){var e=S(this),t=e.contents();t.length?t.wrapAll(n):e.append(n)})},wrap:function(t){var n=m(t);return this.each(function(e){S(this).wrapAll(n?t.call(this,e):t)})},unwrap:function(e){return this.parent(e).not("body").each(function(){S(this).replaceWith(this.childNodes)}),this}}),S.expr.pseudos.hidden=function(e){return!S.expr.pseudos.visible(e)},S.expr.pseudos.visible=function(e){return!!(e.offsetWidth||e.offsetHeight||e.getClientRects().length)},S.ajaxSettings.xhr=function(){try{return new C.XMLHttpRequest}catch(e){}};var _t={0:200,1223:204},zt=S.ajaxSettings.xhr();y.cors=!!zt&&"withCredentials"in zt,y.ajax=zt=!!zt,S.ajaxTransport(function(i){var o,a;if(y.cors||zt&&!i.crossDomain)return{send:function(e,t){var n,r=i.xhr();if(r.open(i.type,i.url,i.async,i.username,i.password),i.xhrFields)for(n in i.xhrFields)r[n]=i.xhrFields[n];for(n in i.mimeType&&r.overrideMimeType&&r.overrideMimeType(i.mimeType),i.crossDomain||e["X-Requested-With"]||(e["X-Requested-With"]="XMLHttpRequest"),e)r.setRequestHeader(n,e[n]);o=function(e){return function(){o&&(o=a=r.onload=r.onerror=r.onabort=r.ontimeout=r.onreadystatechange=null,"abort"===e?r.abort():"error"===e?"number"!=typeof r.status?t(0,"error"):t(r.status,r.statusText):t(_t[r.status]||r.status,r.statusText,"text"!==(r.responseType||"text")||"string"!=typeof r.responseText?{binary:r.response}:{text:r.responseText},r.getAllResponseHeaders()))}},r.onload=o(),a=r.onerror=r.ontimeout=o("error"),void 0!==r.onabort?r.onabort=a:r.onreadystatechange=function(){4===r.readyState&&C.setTimeout(function(){o&&a()})},o=o("abort");try{r.send(i.hasContent&&i.data||null)}catch(e){if(o)throw e}},abort:function(){o&&o()}}}),S.ajaxPrefilter(function(e){e.crossDomain&&(e.contents.script=!1)}),S.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/\b(?:java|ecma)script\b/},converters:{"text script":function(e){return S.globalEval(e),e}}}),S.ajaxPrefilter("script",function(e){void 0===e.cache&&(e.cache=!1),e.crossDomain&&(e.type="GET")}),S.ajaxTransport("script",function(n){var r,i;if(n.crossDomain||n.scriptAttrs)return{send:function(e,t){r=S("<script>").attr(n.scriptAttrs||{}).prop({charset:n.scriptCharset,src:n.url}).on("load error",i=function(e){r.remove(),i=null,e&&t("error"===e.type?404:200,e.type)}),E.head.appendChild(r[0])},abort:function(){i&&i()}}});var Ut,Xt=[],Vt=/(=)\?(?=&|$)|\?\?/;S.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var e=Xt.pop()||S.expando+"_"+Ct.guid++;return this[e]=!0,e}}),S.ajaxPrefilter("json jsonp",function(e,t,n){var r,i,o,a=!1!==e.jsonp&&(Vt.test(e.url)?"url":"string"==typeof e.data&&0===(e.contentType||"").indexOf("application/x-www-form-urlencoded")&&Vt.test(e.data)&&"data");if(a||"jsonp"===e.dataTypes[0])return r=e.jsonpCallback=m(e.jsonpCallback)?e.jsonpCallback():e.jsonpCallback,a?e[a]=e[a].replace(Vt,"$1"+r):!1!==e.jsonp&&(e.url+=(Et.test(e.url)?"&":"?")+e.jsonp+"="+r),e.converters["script json"]=function(){return o||S.error(r+" was not called"),o[0]},e.dataTypes[0]="json",i=C[r],C[r]=function(){o=arguments},n.always(function(){void 0===i?S(C).removeProp(r):C[r]=i,e[r]&&(e.jsonpCallback=t.jsonpCallback,Xt.push(r)),o&&m(i)&&i(o[0]),o=i=void 0}),"script"}),y.createHTMLDocument=((Ut=E.implementation.createHTMLDocument("").body).innerHTML="<form></form><form></form>",2===Ut.childNodes.length),S.parseHTML=function(e,t,n){return"string"!=typeof e?[]:("boolean"==typeof t&&(n=t,t=!1),t||(y.createHTMLDocument?((r=(t=E.implementation.createHTMLDocument("")).createElement("base")).href=E.location.href,t.head.appendChild(r)):t=E),o=!n&&[],(i=N.exec(e))?[t.createElement(i[1])]:(i=xe([e],t,o),o&&o.length&&S(o).remove(),S.merge([],i.childNodes)));var r,i,o},S.fn.load=function(e,t,n){var r,i,o,a=this,s=e.indexOf(" ");return-1<s&&(r=vt(e.slice(s)),e=e.slice(0,s)),m(t)?(n=t,t=void 0):t&&"object"==typeof t&&(i="POST"),0<a.length&&S.ajax({url:e,type:i||"GET",dataType:"html",data:t}).done(function(e){o=arguments,a.html(r?S("<div>").append(S.parseHTML(e)).find(r):e)}).always(n&&function(e,t){a.each(function(){n.apply(this,o||[e.responseText,t,e])})}),this},S.expr.pseudos.animated=function(t){return S.grep(S.timers,function(e){return t===e.elem}).length},S.offset={setOffset:function(e,t,n){var r,i,o,a,s,u,l=S.css(e,"position"),c=S(e),f={};"static"===l&&(e.style.position="relative"),s=c.offset(),o=S.css(e,"top"),u=S.css(e,"left"),("absolute"===l||"fixed"===l)&&-1<(o+u).indexOf("auto")?(a=(r=c.position()).top,i=r.left):(a=parseFloat(o)||0,i=parseFloat(u)||0),m(t)&&(t=t.call(e,n,S.extend({},s))),null!=t.top&&(f.top=t.top-s.top+a),null!=t.left&&(f.left=t.left-s.left+i),"using"in t?t.using.call(e,f):("number"==typeof f.top&&(f.top+="px"),"number"==typeof f.left&&(f.left+="px"),c.css(f))}},S.fn.extend({offset:function(t){if(arguments.length)return void 0===t?this:this.each(function(e){S.offset.setOffset(this,t,e)});var e,n,r=this[0];return r?r.getClientRects().length?(e=r.getBoundingClientRect(),n=r.ownerDocument.defaultView,{top:e.top+n.pageYOffset,left:e.left+n.pageXOffset}):{top:0,left:0}:void 0},position:function(){if(this[0]){var e,t,n,r=this[0],i={top:0,left:0};if("fixed"===S.css(r,"position"))t=r.getBoundingClientRect();else{t=this.offset(),n=r.ownerDocument,e=r.offsetParent||n.documentElement;while(e&&(e===n.body||e===n.documentElement)&&"static"===S.css(e,"position"))e=e.parentNode;e&&e!==r&&1===e.nodeType&&((i=S(e).offset()).top+=S.css(e,"borderTopWidth",!0),i.left+=S.css(e,"borderLeftWidth",!0))}return{top:t.top-i.top-S.css(r,"marginTop",!0),left:t.left-i.left-S.css(r,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var e=this.offsetParent;while(e&&"static"===S.css(e,"position"))e=e.offsetParent;return e||re})}}),S.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(t,i){var o="pageYOffset"===i;S.fn[t]=function(e){return $(this,function(e,t,n){var r;if(x(e)?r=e:9===e.nodeType&&(r=e.defaultView),void 0===n)return r?r[i]:e[t];r?r.scrollTo(o?r.pageXOffset:n,o?n:r.pageYOffset):e[t]=n},t,e,arguments.length)}}),S.each(["top","left"],function(e,n){S.cssHooks[n]=$e(y.pixelPosition,function(e,t){if(t)return t=Be(e,n),Me.test(t)?S(e).position()[n]+"px":t})}),S.each({Height:"height",Width:"width"},function(a,s){S.each({padding:"inner"+a,content:s,"":"outer"+a},function(r,o){S.fn[o]=function(e,t){var n=arguments.length&&(r||"boolean"!=typeof e),i=r||(!0===e||!0===t?"margin":"border");return $(this,function(e,t,n){var r;return x(e)?0===o.indexOf("outer")?e["inner"+a]:e.document.documentElement["client"+a]:9===e.nodeType?(r=e.documentElement,Math.max(e.body["scroll"+a],r["scroll"+a],e.body["offset"+a],r["offset"+a],r["client"+a])):void 0===n?S.css(e,t,i):S.style(e,t,n,i)},s,n?e:void 0,n)}})}),S.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(e,t){S.fn[t]=function(e){return this.on(t,e)}}),S.fn.extend({bind:function(e,t,n){return this.on(e,null,t,n)},unbind:function(e,t){return this.off(e,null,t)},delegate:function(e,t,n,r){return this.on(t,e,n,r)},undelegate:function(e,t,n){return 1===arguments.length?this.off(e,"**"):this.off(t,e||"**",n)},hover:function(e,t){return this.mouseenter(e).mouseleave(t||e)}}),S.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "),function(e,n){S.fn[n]=function(e,t){return 0<arguments.length?this.on(n,null,e,t):this.trigger(n)}});var Gt=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;S.proxy=function(e,t){var n,r,i;if("string"==typeof t&&(n=e[t],t=e,e=n),m(e))return r=s.call(arguments,2),(i=function(){return e.apply(t||this,r.concat(s.call(arguments)))}).guid=e.guid=e.guid||S.guid++,i},S.holdReady=function(e){e?S.readyWait++:S.ready(!0)},S.isArray=Array.isArray,S.parseJSON=JSON.parse,S.nodeName=A,S.isFunction=m,S.isWindow=x,S.camelCase=X,S.type=w,S.now=Date.now,S.isNumeric=function(e){var t=S.type(e);return("number"===t||"string"===t)&&!isNaN(e-parseFloat(e))},S.trim=function(e){return null==e?"":(e+"").replace(Gt,"")},"function"==typeof define&&define.amd&&define("jquery",[],function(){return S});var Yt=C.jQuery,Qt=C.$;return S.noConflict=function(e){return C.$===S&&(C.$=Qt),e&&C.jQuery===S&&(C.jQuery=Yt),S},"undefined"==typeof e&&(C.jQuery=C.$=S),S});


/* js/store.min.js */
/* store.js - Copyright (c) 2010-2017 Marcus Westin */
!function(t){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var e;e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,e.store=t()}}(function(){var define,module,exports;return function t(e,n,r){function o(u,s){if(!n[u]){if(!e[u]){var a="function"==typeof require&&require;if(!s&&a)return a(u,!0);if(i)return i(u,!0);var c=new Error("Cannot find module '"+u+"'");throw c.code="MODULE_NOT_FOUND",c}var f=n[u]={exports:{}};e[u][0].call(f.exports,function(t){var n=e[u][1][t];return o(n?n:t)},f,f.exports,t,e,n,r)}return n[u].exports}for(var i="function"==typeof require&&require,u=0;u<r.length;u++)o(r[u]);return o}({1:[function(t,e,n){"use strict";var r=t("../src/store-engine"),o=t("../storages/all"),i=t("../plugins/all");e.exports=r.createStore(o,i)},{"../plugins/all":2,"../src/store-engine":15,"../storages/all":17}],2:[function(t,e,n){"use strict";e.exports=[t("./compression"),t("./defaults"),t("./dump"),t("./events"),t("./observe"),t("./expire"),t("./json2"),t("./operations"),t("./update"),t("./v1-backcompat")]},{"./compression":3,"./defaults":4,"./dump":5,"./events":6,"./expire":7,"./json2":8,"./observe":11,"./operations":12,"./update":13,"./v1-backcompat":14}],3:[function(t,e,n){"use strict";function r(){function t(t,e){var n=t(e);if(!n)return n;var r=o.decompress(n);return null==r?n:this._deserialize(r)}function e(t,e,n){var r=o.compress(this._serialize(n));t(e,r)}return{get:t,set:e}}var o=t("./lib/lz-string");e.exports=r},{"./lib/lz-string":10}],4:[function(t,e,n){"use strict";function r(){function t(t,e){n=e}function e(t,e){var r=t();return void 0!==r?r:n[e]}var n={};return{defaults:t,get:e}}e.exports=r},{}],5:[function(t,e,n){"use strict";function r(){function t(t){var e={};return this.each(function(t,n){e[n]=t}),e}return{dump:t}}e.exports=r},{}],6:[function(t,e,n){"use strict";function r(){function t(t,e,n){return c.on(e,u(this,n))}function e(t,e){c.off(e)}function n(t,e,n){c.once(e,u(this,n))}function r(t,e,n){var r=this.get(e);t(),c.fire(e,n,r)}function i(t,e){var n=this.get(e);t(),c.fire(e,void 0,n)}function a(t){var e={};this.each(function(t,n){e[n]=t}),t(),s(e,function(t,e){c.fire(e,void 0,t)})}var c=o();return{watch:t,unwatch:e,once:n,set:r,remove:i,clearAll:a}}function o(){return a(f,{_id:0,_subSignals:{},_subCallbacks:{}})}var i=t("../src/util"),u=i.bind,s=i.each,a=i.create,c=i.slice;e.exports=r;var f={_id:null,_subCallbacks:null,_subSignals:null,on:function(t,e){return this._subCallbacks[t]||(this._subCallbacks[t]={}),this._id+=1,this._subCallbacks[t][this._id]=e,this._subSignals[this._id]=t,this._id},off:function(t){var e=this._subSignals[t];delete this._subCallbacks[e][t],delete this._subSignals[t]},once:function(t,e){var n=this.on(t,u(this,function(){e.apply(this,arguments),this.off(n)}))},fire:function(t){var e=c(arguments,1);s(this._subCallbacks[t],function(t){t.apply(this,e)})}}},{"../src/util":16}],7:[function(t,e,n){"use strict";function r(){function t(t,e,n,r){return this.hasNamespace(o)||s.set(e,r),t()}function e(t,e){return this.hasNamespace(o)||u.call(this,e),t()}function n(t,e){return this.hasNamespace(o)||s.remove(e),t()}function r(t,e){return s.get(e)}function i(t){var e=[];this.each(function(t,n){e.push(n)});for(var n=0;n<e.length;n++)u.call(this,e[n])}function u(t){var e=s.get(t,Number.MAX_VALUE);e<=(new Date).getTime()&&(this.raw.remove(t),s.remove(t))}var s=this.createStore(this.storage,null,this._namespacePrefix+o);return{set:t,get:e,remove:n,getExpiration:r,removeExpiredKeys:i}}var o="expire_mixin";e.exports=r},{}],8:[function(t,e,n){"use strict";function r(){return t("./lib/json2"),{}}e.exports=r},{"./lib/json2":9}],9:[function(require,module,exports){"use strict";var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};"object"!==("undefined"==typeof JSON?"undefined":_typeof(JSON))&&(JSON={}),function(){function f(t){return t<10?"0"+t:t}function this_value(){return this.valueOf()}function quote(t){return rx_escapable.lastIndex=0,rx_escapable.test(t)?'"'+t.replace(rx_escapable,function(t){var e=meta[t];return"string"==typeof e?e:"\\u"+("0000"+t.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+t+'"'}function str(t,e){var n,r,o,i,u,s=gap,a=e[t];switch(a&&"object"===("undefined"==typeof a?"undefined":_typeof(a))&&"function"==typeof a.toJSON&&(a=a.toJSON(t)),"function"==typeof rep&&(a=rep.call(e,t,a)),"undefined"==typeof a?"undefined":_typeof(a)){case"string":return quote(a);case"number":return isFinite(a)?String(a):"null";case"boolean":case"null":return String(a);case"object":if(!a)return"null";if(gap+=indent,u=[],"[object Array]"===Object.prototype.toString.apply(a)){for(i=a.length,n=0;n<i;n+=1)u[n]=str(n,a)||"null";return o=0===u.length?"[]":gap?"[\n"+gap+u.join(",\n"+gap)+"\n"+s+"]":"["+u.join(",")+"]",gap=s,o}if(rep&&"object"===("undefined"==typeof rep?"undefined":_typeof(rep)))for(i=rep.length,n=0;n<i;n+=1)"string"==typeof rep[n]&&(r=rep[n],o=str(r,a),o&&u.push(quote(r)+(gap?": ":":")+o));else for(r in a)Object.prototype.hasOwnProperty.call(a,r)&&(o=str(r,a),o&&u.push(quote(r)+(gap?": ":":")+o));return o=0===u.length?"{}":gap?"{\n"+gap+u.join(",\n"+gap)+"\n"+s+"}":"{"+u.join(",")+"}",gap=s,o}}var rx_one=/^[\],:{}\s]*$/,rx_two=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,rx_three=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,rx_four=/(?:^|:|,)(?:\s*\[)+/g,rx_escapable=/[\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,rx_dangerous=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;"function"!=typeof Date.prototype.toJSON&&(Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null},Boolean.prototype.toJSON=this_value,Number.prototype.toJSON=this_value,String.prototype.toJSON=this_value);var gap,indent,meta,rep;"function"!=typeof JSON.stringify&&(meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},JSON.stringify=function(t,e,n){var r;if(gap="",indent="","number"==typeof n)for(r=0;r<n;r+=1)indent+=" ";else"string"==typeof n&&(indent=n);if(rep=e,e&&"function"!=typeof e&&("object"!==("undefined"==typeof e?"undefined":_typeof(e))||"number"!=typeof e.length))throw new Error("JSON.stringify");return str("",{"":t})}),"function"!=typeof JSON.parse&&(JSON.parse=function(text,reviver){function walk(t,e){var n,r,o=t[e];if(o&&"object"===("undefined"==typeof o?"undefined":_typeof(o)))for(n in o)Object.prototype.hasOwnProperty.call(o,n)&&(r=walk(o,n),void 0!==r?o[n]=r:delete o[n]);return reviver.call(t,e,o)}var j;if(text=String(text),rx_dangerous.lastIndex=0,rx_dangerous.test(text)&&(text=text.replace(rx_dangerous,function(t){return"\\u"+("0000"+t.charCodeAt(0).toString(16)).slice(-4)})),rx_one.test(text.replace(rx_two,"@").replace(rx_three,"]").replace(rx_four,"")))return j=eval("("+text+")"),"function"==typeof reviver?walk({"":j},""):j;throw new SyntaxError("JSON.parse")})}()},{}],10:[function(t,e,n){"use strict";var r=function(){function t(t,e){if(!o[t]){o[t]={};for(var n=0;n<t.length;n++)o[t][t.charAt(n)]=n}return o[t][e]}var e=String.fromCharCode,n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$",o={},i={compressToBase64:function(t){if(null==t)return"";var e=i._compress(t,6,function(t){return n.charAt(t)});switch(e.length%4){default:case 0:return e;case 1:return e+"===";case 2:return e+"==";case 3:return e+"="}},decompressFromBase64:function(e){return null==e?"":""==e?null:i._decompress(e.length,32,function(r){return t(n,e.charAt(r))})},compressToUTF16:function(t){return null==t?"":i._compress(t,15,function(t){return e(t+32)})+" "},decompressFromUTF16:function(t){return null==t?"":""==t?null:i._decompress(t.length,16384,function(e){return t.charCodeAt(e)-32})},compressToUint8Array:function(t){for(var e=i.compress(t),n=new Uint8Array(2*e.length),r=0,o=e.length;r<o;r++){var u=e.charCodeAt(r);n[2*r]=u>>>8,n[2*r+1]=u%256}return n},decompressFromUint8Array:function(t){if(null===t||void 0===t)return i.decompress(t);for(var n=new Array(t.length/2),r=0,o=n.length;r<o;r++)n[r]=256*t[2*r]+t[2*r+1];var u=[];return n.forEach(function(t){u.push(e(t))}),i.decompress(u.join(""))},compressToEncodedURIComponent:function(t){return null==t?"":i._compress(t,6,function(t){return r.charAt(t)})},decompressFromEncodedURIComponent:function(e){return null==e?"":""==e?null:(e=e.replace(/ /g,"+"),i._decompress(e.length,32,function(n){return t(r,e.charAt(n))}))},compress:function(t){return i._compress(t,16,function(t){return e(t)})},_compress:function(t,e,n){if(null==t)return"";var r,o,i,u={},s={},a="",c="",f="",l=2,p=3,h=2,d=[],g=0,v=0;for(i=0;i<t.length;i+=1)if(a=t.charAt(i),Object.prototype.hasOwnProperty.call(u,a)||(u[a]=p++,s[a]=!0),c=f+a,Object.prototype.hasOwnProperty.call(u,c))f=c;else{if(Object.prototype.hasOwnProperty.call(s,f)){if(f.charCodeAt(0)<256){for(r=0;r<h;r++)g<<=1,v==e-1?(v=0,d.push(n(g)),g=0):v++;for(o=f.charCodeAt(0),r=0;r<8;r++)g=g<<1|1&o,v==e-1?(v=0,d.push(n(g)),g=0):v++,o>>=1}else{for(o=1,r=0;r<h;r++)g=g<<1|o,v==e-1?(v=0,d.push(n(g)),g=0):v++,o=0;for(o=f.charCodeAt(0),r=0;r<16;r++)g=g<<1|1&o,v==e-1?(v=0,d.push(n(g)),g=0):v++,o>>=1}l--,0==l&&(l=Math.pow(2,h),h++),delete s[f]}else for(o=u[f],r=0;r<h;r++)g=g<<1|1&o,v==e-1?(v=0,d.push(n(g)),g=0):v++,o>>=1;l--,0==l&&(l=Math.pow(2,h),h++),u[c]=p++,f=String(a)}if(""!==f){if(Object.prototype.hasOwnProperty.call(s,f)){if(f.charCodeAt(0)<256){for(r=0;r<h;r++)g<<=1,v==e-1?(v=0,d.push(n(g)),g=0):v++;for(o=f.charCodeAt(0),r=0;r<8;r++)g=g<<1|1&o,v==e-1?(v=0,d.push(n(g)),g=0):v++,o>>=1}else{for(o=1,r=0;r<h;r++)g=g<<1|o,v==e-1?(v=0,d.push(n(g)),g=0):v++,o=0;for(o=f.charCodeAt(0),r=0;r<16;r++)g=g<<1|1&o,v==e-1?(v=0,d.push(n(g)),g=0):v++,o>>=1}l--,0==l&&(l=Math.pow(2,h),h++),delete s[f]}else for(o=u[f],r=0;r<h;r++)g=g<<1|1&o,v==e-1?(v=0,d.push(n(g)),g=0):v++,o>>=1;l--,0==l&&(l=Math.pow(2,h),h++)}for(o=2,r=0;r<h;r++)g=g<<1|1&o,v==e-1?(v=0,d.push(n(g)),g=0):v++,o>>=1;for(;;){if(g<<=1,v==e-1){d.push(n(g));break}v++}return d.join("")},decompress:function(t){return null==t?"":""==t?null:i._decompress(t.length,32768,function(e){return t.charCodeAt(e)})},_decompress:function(t,n,r){var o,i,u,s,a,c,f,l,p=[],h=4,d=4,g=3,v="",m=[],y={val:r(0),position:n,index:1};for(i=0;i<3;i+=1)p[i]=i;for(s=0,c=Math.pow(2,2),f=1;f!=c;)a=y.val&y.position,y.position>>=1,0==y.position&&(y.position=n,y.val=r(y.index++)),s|=(a>0?1:0)*f,f<<=1;switch(o=s){case 0:for(s=0,c=Math.pow(2,8),f=1;f!=c;)a=y.val&y.position,y.position>>=1,0==y.position&&(y.position=n,y.val=r(y.index++)),s|=(a>0?1:0)*f,f<<=1;l=e(s);break;case 1:for(s=0,c=Math.pow(2,16),f=1;f!=c;)a=y.val&y.position,y.position>>=1,0==y.position&&(y.position=n,y.val=r(y.index++)),s|=(a>0?1:0)*f,f<<=1;l=e(s);break;case 2:return""}for(p[3]=l,u=l,m.push(l);;){if(y.index>t)return"";for(s=0,c=Math.pow(2,g),f=1;f!=c;)a=y.val&y.position,y.position>>=1,0==y.position&&(y.position=n,y.val=r(y.index++)),s|=(a>0?1:0)*f,f<<=1;switch(l=s){case 0:for(s=0,c=Math.pow(2,8),f=1;f!=c;)a=y.val&y.position,y.position>>=1,0==y.position&&(y.position=n,y.val=r(y.index++)),s|=(a>0?1:0)*f,f<<=1;p[d++]=e(s),l=d-1,h--;break;case 1:for(s=0,c=Math.pow(2,16),f=1;f!=c;)a=y.val&y.position,y.position>>=1,0==y.position&&(y.position=n,y.val=r(y.index++)),s|=(a>0?1:0)*f,f<<=1;p[d++]=e(s),l=d-1,h--;break;case 2:return m.join("")}if(0==h&&(h=Math.pow(2,g),g++),p[l])v=p[l];else{if(l!==d)return null;v=u+u.charAt(0)}m.push(v),p[d++]=u+v.charAt(0),h--,u=v,0==h&&(h=Math.pow(2,g),g++)}}};return i}();"function"==typeof define&&define.amd?define(function(){return r}):"undefined"!=typeof e&&null!=e&&(e.exports=r)},{}],11:[function(t,e,n){"use strict";function r(){function t(t,e,n){var r=this.watch(e,n);return n(this.get(e)),r}function e(t,e){this.unwatch(e)}return{observe:t,unobserve:e}}var o=t("./events");e.exports=[o,r]},{"./events":6}],12:[function(t,e,n){"use strict";function r(){function t(t,e,n,r,o,i){return a.call(this,"push",arguments)}function e(t,e){return a.call(this,"pop",arguments)}function n(t,e){return a.call(this,"shift",arguments)}function r(t,e,n,r,o,i){return a.call(this,"unshift",arguments)}function i(t,e,n,r,i,a){var c=u(arguments,2);return this.update(e,{},function(t){if("object"!=("undefined"==typeof t?"undefined":o(t)))throw new Error('store.assign called for non-object value with key "'+e+'"');return c.unshift(t),s.apply(Object,c)})}function a(t,e){var n,r=e[1],o=u(e,2);return this.update(r,[],function(e){n=Array.prototype[t].apply(e,o)}),n}return{push:t,pop:e,shift:n,unshift:r,assign:i}}var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},i=t("../src/util"),u=i.slice,s=i.assign,a=t("./update");e.exports=[a,r]},{"../src/util":16,"./update":13}],13:[function(t,e,n){"use strict";function r(){function t(t,e,n,r){3==arguments.length&&(r=n,n=void 0);var o=this.get(e,n),i=r(o);this.set(e,void 0!=i?i:o)}return{update:t}}e.exports=r},{}],14:[function(t,e,n){"use strict";function r(){return this.disabled=!this.enabled,{has:o,transact:i,clear:u,forEach:s,getAll:a,serialize:c,deserialize:f}}function o(t,e){return void 0!==this.get(e)}function i(t,e,n,r){null==r&&(r=n,n=null),null==n&&(n={});var o=this.get(e,n),i=r(o);this.set(e,void 0===i?o:i)}function u(t){return this.clearAll.call(this)}function s(t,e){return this.each.call(this,function(t,n){e(n,t)})}function a(t){return this.dump.call(this)}function c(t,e){return JSON.stringify(e)}function f(t,e){if("string"==typeof e)try{return JSON.parse(e)}catch(n){return e||void 0}}var l=t("./dump"),p=t("./json2");e.exports=[l,p,r]},{"./dump":5,"./json2":8}],15:[function(t,e,n){"use strict";function r(){var t="undefined"==typeof console?null:console;if(t){var e=t.warn?t.warn:t.log;e.apply(t,arguments)}}function o(t,e,n){n||(n=""),t&&!l(t)&&(t=[t]),e&&!l(e)&&(e=[e]);var o=n?"__storejs_"+n+"_":"",i=n?new RegExp("^"+o):null,g=/^[a-zA-Z0-9_\-]*$/;if(!g.test(n))throw new Error("store.js namespaces can only have alphanumerics + underscores and dashes");var v={_namespacePrefix:o,_namespaceRegexp:i,_testStorage:function(t){try{var e="__storejs__test__";t.write(e,e);var n=t.read(e)===e;return t.remove(e),n}catch(r){return!1}},_assignPluginFnProp:function(t,e){var n=this[e];this[e]=function(){function e(){if(n)return a(arguments,function(t,e){r[e]=t}),n.apply(o,r)}var r=u(arguments,0),o=this,i=[e].concat(r);return t.apply(o,i)}},_serialize:function(t){return JSON.stringify(t)},_deserialize:function(t,e){if(!t)return e;var n="";try{n=JSON.parse(t)}catch(r){n=t}return void 0!==n?n:e},_addStorage:function(t){this.enabled||this._testStorage(t)&&(this.storage=t,this.enabled=!0)},_addPlugin:function(t){var e=this;if(l(t))return void a(t,function(t){e._addPlugin(t)});var n=s(this.plugins,function(e){return t===e});if(!n){if(this.plugins.push(t),!p(t))throw new Error("Plugins must be function values that return objects");var r=t.call(this);if(!h(r))throw new Error("Plugins must return an object of function properties");a(r,function(n,r){if(!p(n))throw new Error("Bad plugin property: "+r+" from plugin "+t.name+". Plugins should only return functions.");e._assignPluginFnProp(n,r)})}},addStorage:function(t){r("store.addStorage(storage) is deprecated. Use createStore([storages])"),this._addStorage(t)}},m=f(v,d,{plugins:[]});return m.raw={},a(m,function(t,e){p(t)&&(m.raw[e]=c(m,t))}),a(t,function(t){m._addStorage(t)}),a(e,function(t){m._addPlugin(t)}),m}var i=t("./util"),u=i.slice,s=i.pluck,a=i.each,c=i.bind,f=i.create,l=i.isList,p=i.isFunction,h=i.isObject;e.exports={createStore:o};var d={version:"2.0.12",enabled:!1,get:function(t,e){var n=this.storage.read(this._namespacePrefix+t);return this._deserialize(n,e)},set:function(t,e){return void 0===e?this.remove(t):(this.storage.write(this._namespacePrefix+t,this._serialize(e)),e)},remove:function(t){this.storage.remove(this._namespacePrefix+t)},each:function(t){var e=this;this.storage.each(function(n,r){t.call(e,e._deserialize(n),(r||"").replace(e._namespaceRegexp,""))})},clearAll:function(){this.storage.clearAll()},hasNamespace:function(t){return this._namespacePrefix=="__storejs_"+t+"_"},createStore:function(){return o.apply(this,arguments)},addPlugin:function(t){this._addPlugin(t)},namespace:function(t){return o(this.storage,this.plugins,t)}}},{"./util":16}],16:[function(t,e,n){(function(t){"use strict";function n(){return Object.assign?Object.assign:function(t,e,n,r){for(var o=1;o<arguments.length;o++)s(Object(arguments[o]),function(e,n){t[n]=e});return t}}function r(){if(Object.create)return function(t,e,n,r){var o=u(arguments,1);return h.apply(this,[Object.create(t)].concat(o))};var t=function(){};return function(e,n,r,o){var i=u(arguments,1);return t.prototype=e,h.apply(this,[new t].concat(i))}}function o(){return String.prototype.trim?function(t){return String.prototype.trim.call(t)}:function(t){return t.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"")}}function i(t,e){return function(){return e.apply(t,Array.prototype.slice.call(arguments,0))}}function u(t,e){return Array.prototype.slice.call(t,e||0)}function s(t,e){c(t,function(t,n){return e(t,n),!1})}function a(t,e){var n=f(t)?[]:{};return c(t,function(t,r){return n[r]=e(t,r),!1}),n}function c(t,e){if(f(t)){for(var n=0;n<t.length;n++)if(e(t[n],n))return t[n]}else for(var r in t)if(t.hasOwnProperty(r)&&e(t[r],r))return t[r]}function f(t){return null!=t&&"function"!=typeof t&&"number"==typeof t.length}function l(t){return t&&"[object Function]"==={}.toString.call(t)}function p(t){return t&&"[object Object]"==={}.toString.call(t)}var h=n(),d=r(),g=o(),v="undefined"!=typeof window?window:t;e.exports={assign:h,create:d,trim:g,bind:i,slice:u,each:s,map:a,pluck:c,isList:f,isFunction:l,isObject:p,Global:v}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],17:[function(t,e,n){"use strict";e.exports=[t("./localStorage"),t("./oldFF-globalStorage"),t("./oldIE-userDataStorage"),t("./cookieStorage"),t("./sessionStorage"),t("./memoryStorage")]},{"./cookieStorage":18,"./localStorage":19,"./memoryStorage":20,"./oldFF-globalStorage":21,"./oldIE-userDataStorage":22,"./sessionStorage":23}],18:[function(t,e,n){"use strict";function r(t){if(!t||!a(t))return null;var e="(?:^|.*;\\s*)"+escape(t).replace(/[\-\.\+\*]/g,"\\$&")+"\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*";return unescape(p.cookie.replace(new RegExp(e),"$1"))}function o(t){for(var e=p.cookie.split(/; ?/g),n=e.length-1;n>=0;n--)if(l(e[n])){var r=e[n].split("="),o=unescape(r[0]),i=unescape(r[1]);t(i,o)}}function i(t,e){t&&(p.cookie=escape(t)+"="+escape(e)+"; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/")}function u(t){t&&a(t)&&(p.cookie=escape(t)+"=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/")}function s(){o(function(t,e){u(e)})}function a(t){return new RegExp("(?:^|;\\s*)"+escape(t).replace(/[\-\.\+\*]/g,"\\$&")+"\\s*\\=").test(p.cookie)}var c=t("../src/util"),f=c.Global,l=c.trim;e.exports={name:"cookieStorage",read:r,write:i,each:o,remove:u,clearAll:s};var p=f.document},{"../src/util":16}],19:[function(t,e,n){"use strict";function r(){return f.localStorage}function o(t){return r().getItem(t)}function i(t,e){return r().setItem(t,e)}function u(t){for(var e=r().length-1;e>=0;e--){var n=r().key(e);t(o(n),n)}}function s(t){return r().removeItem(t)}function a(){return r().clear()}var c=t("../src/util"),f=c.Global;e.exports={name:"localStorage",read:o,write:i,each:u,remove:s,clearAll:a}},{"../src/util":16}],20:[function(t,e,n){"use strict";function r(t){return a[t]}function o(t,e){a[t]=e}function i(t){for(var e in a)a.hasOwnProperty(e)&&t(a[e],e)}function u(t){delete a[t]}function s(t){a={}}e.exports={name:"memoryStorage",read:r,write:o,each:i,remove:u,clearAll:s};var a={}},{}],21:[function(t,e,n){"use strict";function r(t){return f[t]}function o(t,e){f[t]=e}function i(t){for(var e=f.length-1;e>=0;e--){var n=f.key(e);t(f[n],n)}}function u(t){return f.removeItem(t)}function s(){i(function(t,e){delete f[t]})}var a=t("../src/util"),c=a.Global;e.exports={name:"oldFF-globalStorage",read:r,write:o,each:i,remove:u,clearAll:s};var f=c.globalStorage},{"../src/util":16}],22:[function(t,e,n){"use strict";function r(t,e){if(!g){var n=a(t);d(function(t){t.setAttribute(n,e),t.save(p)})}}function o(t){if(!g){var e=a(t),n=null;return d(function(t){n=t.getAttribute(e)}),n}}function i(t){d(function(e){for(var n=e.XMLDocument.documentElement.attributes,r=n.length-1;r>=0;r--){var o=n[r];t(e.getAttribute(o.name),o.name)}})}function u(t){var e=a(t);d(function(t){t.removeAttribute(e),t.save(p)})}function s(){d(function(t){var e=t.XMLDocument.documentElement.attributes;t.load(p);for(var n=e.length-1;n>=0;n--)t.removeAttribute(e[n].name);t.save(p)})}function a(t){return t.replace(/^\d/,"___$&").replace(v,"___")}function c(){if(!h||!h.documentElement||!h.documentElement.addBehavior)return null;var t,e,n,r="script";try{e=new ActiveXObject("htmlfile"),e.open(),e.write("<"+r+">document.w=window</"+r+'><iframe src="/favicon.ico"></iframe>'),e.close(),t=e.w.frames[0].document,n=t.createElement("div")}catch(o){n=h.createElement("div"),t=h.body}return function(e){var r=[].slice.call(arguments,0);r.unshift(n),t.appendChild(n),n.addBehavior("#default#userData"),n.load(p),e.apply(this,r),t.removeChild(n)}}var f=t("../src/util"),l=f.Global;e.exports={name:"oldIE-userDataStorage",write:r,read:o,each:i,remove:u,clearAll:s};var p="storejs",h=l.document,d=c(),g=(l.navigator?l.navigator.userAgent:"").match(/ (MSIE 8|MSIE 9|MSIE 10)\./),v=new RegExp("[!\"#$%&'()*+,/\\\\:;<=>?@[\\]^`{|}~]","g")},{"../src/util":16}],23:[function(t,e,n){"use strict";function r(){return f.sessionStorage}function o(t){return r().getItem(t)}function i(t,e){return r().setItem(t,e)}function u(t){for(var e=r().length-1;e>=0;e--){var n=r().key(e);t(o(n),n)}}function s(t){return r().removeItem(t)}function a(){return r().clear()}var c=t("../src/util"),f=c.Global;e.exports={name:"sessionStorage",read:o,write:i,each:u,remove:s,clearAll:a}},{"../src/util":16}]},{},[1])(1)});

/* js/material-components-web.min.js */
!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.mdc=e():t.mdc=e()}(this,function(){return i={},r.m=n=[function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=(Object.defineProperty(r,"cssClasses",{get:function(){return{}},enumerable:!0,configurable:!0}),Object.defineProperty(r,"strings",{get:function(){return{}},enumerable:!0,configurable:!0}),Object.defineProperty(r,"numbers",{get:function(){return{}},enumerable:!0,configurable:!0}),Object.defineProperty(r,"defaultAdapter",{get:function(){return{}},enumerable:!0,configurable:!0}),r.prototype.init=function(){},r.prototype.destroy=function(){},r);function r(t){void 0===t&&(t={}),this.adapter=t}e.MDCFoundation=i,e.default=i},function(t,e,n){"use strict";var i=this&&this.__read||function(t,e){var n="function"==typeof Symbol&&t[Symbol.iterator];if(!n)return t;var i,r,o=n.call(t),s=[];try{for(;(void 0===e||0<e--)&&!(i=o.next()).done;)s.push(i.value)}catch(t){r={error:t}}finally{try{i&&!i.done&&(n=o.return)&&n.call(o)}finally{if(r)throw r.error}}return s},r=this&&this.__spread||function(){for(var t=[],e=0;e<arguments.length;e++)t=t.concat(i(arguments[e]));return t};Object.defineProperty(e,"__esModule",{value:!0});var o=n(0),s=(a.attachTo=function(t){return new a(t,new o.MDCFoundation({}))},a.prototype.initialize=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e]},a.prototype.getDefaultFoundation=function(){throw new Error("Subclasses must override getDefaultFoundation to return a properly configured foundation class")},a.prototype.initialSyncWithDOM=function(){},a.prototype.destroy=function(){this.foundation.destroy()},a.prototype.listen=function(t,e,n){this.root.addEventListener(t,e,n)},a.prototype.unlisten=function(t,e,n){this.root.removeEventListener(t,e,n)},a.prototype.emit=function(t,e,n){var i;void 0===n&&(n=!1),"function"==typeof CustomEvent?i=new CustomEvent(t,{bubbles:n,detail:e}):(i=document.createEvent("CustomEvent")).initCustomEvent(t,n,!1,e),this.root.dispatchEvent(i)},a);function a(t,e){for(var n=[],i=2;i<arguments.length;i++)n[i-2]=arguments[i];this.root=t,this.initialize.apply(this,r(n)),this.foundation=void 0===e?this.getDefaultFoundation():e,this.foundation.init(),this.initialSyncWithDOM()}e.MDCComponent=s,e.default=s},function(t,e,n){"use strict";function i(t,e){return(t.matches||t.webkitMatchesSelector||t.msMatchesSelector).call(t,e)}Object.defineProperty(e,"__esModule",{value:!0}),e.closest=function(t,e){if(t.closest)return t.closest(e);for(var n=t;n;){if(i(n,e))return n;n=n.parentElement}return null},e.matches=i,e.estimateScrollWidth=function(t){var e=t;if(null!==e.offsetParent)return e.scrollWidth;var n=e.cloneNode(!0);n.style.setProperty("position","absolute"),n.style.setProperty("transform","translate(-9999px, -9999px)"),document.documentElement.appendChild(n);var i=n.scrollWidth;return document.documentElement.removeChild(n),i}},function(t,e,n){"use strict";var i,r=this&&this.__extends||(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),o=this&&this.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e};Object.defineProperty(e,"__esModule",{value:!0});var s,a=n(1),c=n(5),u=n(2),l=n(4),d=o(n(18)),p=(s=a.MDCComponent,r(f,s),f.attachTo=function(t,e){void 0===e&&(e={isUnbounded:void 0});var n=new f(t);return void 0!==e.isUnbounded&&(n.unbounded=e.isUnbounded),n},f.createAdapter=function(n){return{addClass:function(t){return n.root.classList.add(t)},browserSupportsCssVars:function(){return d.supportsCssVariables(window)},computeBoundingRect:function(){return n.root.getBoundingClientRect()},containsEventTarget:function(t){return n.root.contains(t)},deregisterDocumentInteractionHandler:function(t,e){return document.documentElement.removeEventListener(t,e,c.applyPassive())},deregisterInteractionHandler:function(t,e){return n.root.removeEventListener(t,e,c.applyPassive())},deregisterResizeHandler:function(t){return window.removeEventListener("resize",t)},getWindowPageOffset:function(){return{x:window.pageXOffset,y:window.pageYOffset}},isSurfaceActive:function(){return u.matches(n.root,":active")},isSurfaceDisabled:function(){return Boolean(n.disabled)},isUnbounded:function(){return Boolean(n.unbounded)},registerDocumentInteractionHandler:function(t,e){return document.documentElement.addEventListener(t,e,c.applyPassive())},registerInteractionHandler:function(t,e){return n.root.addEventListener(t,e,c.applyPassive())},registerResizeHandler:function(t){return window.addEventListener("resize",t)},removeClass:function(t){return n.root.classList.remove(t)},updateCssVariable:function(t,e){return n.root.style.setProperty(t,e)}}},Object.defineProperty(f.prototype,"unbounded",{get:function(){return Boolean(this.unbounded_)},set:function(t){this.unbounded_=Boolean(t),this.setUnbounded_()},enumerable:!0,configurable:!0}),f.prototype.activate=function(){this.foundation.activate()},f.prototype.deactivate=function(){this.foundation.deactivate()},f.prototype.layout=function(){this.foundation.layout()},f.prototype.getDefaultFoundation=function(){return new l.MDCRippleFoundation(f.createAdapter(this))},f.prototype.initialSyncWithDOM=function(){var t=this.root;this.unbounded="mdcRippleIsUnbounded"in t.dataset},f.prototype.setUnbounded_=function(){this.foundation.setUnbounded(Boolean(this.unbounded_))},f);function f(){var t=null!==s&&s.apply(this,arguments)||this;return t.disabled=!1,t}e.MDCRipple=p},function(t,e,n){"use strict";var i,r=this&&this.__extends||(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),o=this&&this.__assign||function(){return(o=Object.assign||function(t){for(var e,n=1,i=arguments.length;n<i;n++)for(var r in e=arguments[n])Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t}).apply(this,arguments)};Object.defineProperty(e,"__esModule",{value:!0});var s,a=n(0),c=n(41),u=n(18),l=["touchstart","pointerdown","mousedown","keydown"],d=["touchend","pointerup","mouseup","contextmenu"],p=[],f=(s=a.MDCFoundation,r(h,s),Object.defineProperty(h,"cssClasses",{get:function(){return c.cssClasses},enumerable:!0,configurable:!0}),Object.defineProperty(h,"strings",{get:function(){return c.strings},enumerable:!0,configurable:!0}),Object.defineProperty(h,"numbers",{get:function(){return c.numbers},enumerable:!0,configurable:!0}),Object.defineProperty(h,"defaultAdapter",{get:function(){return{addClass:function(){},browserSupportsCssVars:function(){return!0},computeBoundingRect:function(){return{top:0,right:0,bottom:0,left:0,width:0,height:0}},containsEventTarget:function(){return!0},deregisterDocumentInteractionHandler:function(){},deregisterInteractionHandler:function(){},deregisterResizeHandler:function(){},getWindowPageOffset:function(){return{x:0,y:0}},isSurfaceActive:function(){return!0},isSurfaceDisabled:function(){return!0},isUnbounded:function(){return!0},registerDocumentInteractionHandler:function(){},registerInteractionHandler:function(){},registerResizeHandler:function(){},removeClass:function(){},updateCssVariable:function(){}}},enumerable:!0,configurable:!0}),h.prototype.init=function(){var t=this,e=this.supportsPressRipple_();if(this.registerRootHandlers_(e),e){var n=h.cssClasses,i=n.ROOT,r=n.UNBOUNDED;requestAnimationFrame(function(){t.adapter.addClass(i),t.adapter.isUnbounded()&&(t.adapter.addClass(r),t.layoutInternal_())})}},h.prototype.destroy=function(){var t=this;if(this.supportsPressRipple_()){this.activationTimer_&&(clearTimeout(this.activationTimer_),this.activationTimer_=0,this.adapter.removeClass(h.cssClasses.FG_ACTIVATION)),this.fgDeactivationRemovalTimer_&&(clearTimeout(this.fgDeactivationRemovalTimer_),this.fgDeactivationRemovalTimer_=0,this.adapter.removeClass(h.cssClasses.FG_DEACTIVATION));var e=h.cssClasses,n=e.ROOT,i=e.UNBOUNDED;requestAnimationFrame(function(){t.adapter.removeClass(n),t.adapter.removeClass(i),t.removeCssVars_()})}this.deregisterRootHandlers_(),this.deregisterDeactivationHandlers_()},h.prototype.activate=function(t){this.activate_(t)},h.prototype.deactivate=function(){this.deactivate_()},h.prototype.layout=function(){var t=this;this.layoutFrame_&&cancelAnimationFrame(this.layoutFrame_),this.layoutFrame_=requestAnimationFrame(function(){t.layoutInternal_(),t.layoutFrame_=0})},h.prototype.setUnbounded=function(t){var e=h.cssClasses.UNBOUNDED;t?this.adapter.addClass(e):this.adapter.removeClass(e)},h.prototype.handleFocus=function(){var t=this;requestAnimationFrame(function(){return t.adapter.addClass(h.cssClasses.BG_FOCUSED)})},h.prototype.handleBlur=function(){var t=this;requestAnimationFrame(function(){return t.adapter.removeClass(h.cssClasses.BG_FOCUSED)})},h.prototype.supportsPressRipple_=function(){return this.adapter.browserSupportsCssVars()},h.prototype.defaultActivationState_=function(){return{activationEvent:void 0,hasDeactivationUXRun:!1,isActivated:!1,isProgrammatic:!1,wasActivatedByPointer:!1,wasElementMadeActive:!1}},h.prototype.registerRootHandlers_=function(t){var e=this;t&&(l.forEach(function(t){e.adapter.registerInteractionHandler(t,e.activateHandler_)}),this.adapter.isUnbounded()&&this.adapter.registerResizeHandler(this.resizeHandler_)),this.adapter.registerInteractionHandler("focus",this.focusHandler_),this.adapter.registerInteractionHandler("blur",this.blurHandler_)},h.prototype.registerDeactivationHandlers_=function(t){var e=this;"keydown"===t.type?this.adapter.registerInteractionHandler("keyup",this.deactivateHandler_):d.forEach(function(t){e.adapter.registerDocumentInteractionHandler(t,e.deactivateHandler_)})},h.prototype.deregisterRootHandlers_=function(){var e=this;l.forEach(function(t){e.adapter.deregisterInteractionHandler(t,e.activateHandler_)}),this.adapter.deregisterInteractionHandler("focus",this.focusHandler_),this.adapter.deregisterInteractionHandler("blur",this.blurHandler_),this.adapter.isUnbounded()&&this.adapter.deregisterResizeHandler(this.resizeHandler_)},h.prototype.deregisterDeactivationHandlers_=function(){var e=this;this.adapter.deregisterInteractionHandler("keyup",this.deactivateHandler_),d.forEach(function(t){e.adapter.deregisterDocumentInteractionHandler(t,e.deactivateHandler_)})},h.prototype.removeCssVars_=function(){var e=this,n=h.strings;Object.keys(n).forEach(function(t){0===t.indexOf("VAR_")&&e.adapter.updateCssVariable(n[t],null)})},h.prototype.activate_=function(t){var e=this;if(!this.adapter.isSurfaceDisabled()){var n=this.activationState_;if(!n.isActivated){var i=this.previousActivationEvent_;i&&void 0!==t&&i.type!==t.type||(n.isActivated=!0,n.isProgrammatic=void 0===t,n.activationEvent=t,n.wasActivatedByPointer=!n.isProgrammatic&&void 0!==t&&("mousedown"===t.type||"touchstart"===t.type||"pointerdown"===t.type),void 0!==t&&0<p.length&&p.some(function(t){return e.adapter.containsEventTarget(t)})?this.resetActivationState_():(void 0!==t&&(p.push(t.target),this.registerDeactivationHandlers_(t)),n.wasElementMadeActive=this.checkElementMadeActive_(t),n.wasElementMadeActive&&this.animateActivation_(),requestAnimationFrame(function(){p=[],n.wasElementMadeActive||void 0===t||" "!==t.key&&32!==t.keyCode||(n.wasElementMadeActive=e.checkElementMadeActive_(t),n.wasElementMadeActive&&e.animateActivation_()),n.wasElementMadeActive||(e.activationState_=e.defaultActivationState_())})))}}},h.prototype.checkElementMadeActive_=function(t){return void 0===t||"keydown"!==t.type||this.adapter.isSurfaceActive()},h.prototype.animateActivation_=function(){var t=this,e=h.strings,n=e.VAR_FG_TRANSLATE_START,i=e.VAR_FG_TRANSLATE_END,r=h.cssClasses,o=r.FG_DEACTIVATION,s=r.FG_ACTIVATION,a=h.numbers.DEACTIVATION_TIMEOUT_MS;this.layoutInternal_();var c="",u="";if(!this.adapter.isUnbounded()){var l=this.getFgTranslationCoordinates_(),d=l.startPoint,p=l.endPoint;c=d.x+"px, "+d.y+"px",u=p.x+"px, "+p.y+"px"}this.adapter.updateCssVariable(n,c),this.adapter.updateCssVariable(i,u),clearTimeout(this.activationTimer_),clearTimeout(this.fgDeactivationRemovalTimer_),this.rmBoundedActivationClasses_(),this.adapter.removeClass(o),this.adapter.computeBoundingRect(),this.adapter.addClass(s),this.activationTimer_=setTimeout(function(){return t.activationTimerCallback_()},a)},h.prototype.getFgTranslationCoordinates_=function(){var t,e=this.activationState_,n=e.activationEvent;return{startPoint:t={x:(t=e.wasActivatedByPointer?u.getNormalizedEventCoords(n,this.adapter.getWindowPageOffset(),this.adapter.computeBoundingRect()):{x:this.frame_.width/2,y:this.frame_.height/2}).x-this.initialSize_/2,y:t.y-this.initialSize_/2},endPoint:{x:this.frame_.width/2-this.initialSize_/2,y:this.frame_.height/2-this.initialSize_/2}}},h.prototype.runDeactivationUXLogicIfReady_=function(){var t=this,e=h.cssClasses.FG_DEACTIVATION,n=this.activationState_,i=n.hasDeactivationUXRun,r=n.isActivated;!i&&r||!this.activationAnimationHasEnded_||(this.rmBoundedActivationClasses_(),this.adapter.addClass(e),this.fgDeactivationRemovalTimer_=setTimeout(function(){t.adapter.removeClass(e)},c.numbers.FG_DEACTIVATION_MS))},h.prototype.rmBoundedActivationClasses_=function(){var t=h.cssClasses.FG_ACTIVATION;this.adapter.removeClass(t),this.activationAnimationHasEnded_=!1,this.adapter.computeBoundingRect()},h.prototype.resetActivationState_=function(){var t=this;this.previousActivationEvent_=this.activationState_.activationEvent,this.activationState_=this.defaultActivationState_(),setTimeout(function(){return t.previousActivationEvent_=void 0},h.numbers.TAP_DELAY_MS)},h.prototype.deactivate_=function(){var t=this,e=this.activationState_;if(e.isActivated){var n=o({},e);e.isProgrammatic?(requestAnimationFrame(function(){return t.animateDeactivation_(n)}),this.resetActivationState_()):(this.deregisterDeactivationHandlers_(),requestAnimationFrame(function(){t.activationState_.hasDeactivationUXRun=!0,t.animateDeactivation_(n),t.resetActivationState_()}))}},h.prototype.animateDeactivation_=function(t){var e=t.wasActivatedByPointer,n=t.wasElementMadeActive;(e||n)&&this.runDeactivationUXLogicIfReady_()},h.prototype.layoutInternal_=function(){var t=this;this.frame_=this.adapter.computeBoundingRect();var e=Math.max(this.frame_.height,this.frame_.width);this.maxRadius_=this.adapter.isUnbounded()?e:Math.sqrt(Math.pow(t.frame_.width,2)+Math.pow(t.frame_.height,2))+h.numbers.PADDING;var n=Math.floor(e*h.numbers.INITIAL_ORIGIN_SCALE);this.adapter.isUnbounded()&&n%2!=0?this.initialSize_=n-1:this.initialSize_=n,this.fgScale_=""+this.maxRadius_/this.initialSize_,this.updateLayoutCssVars_()},h.prototype.updateLayoutCssVars_=function(){var t=h.strings,e=t.VAR_FG_SIZE,n=t.VAR_LEFT,i=t.VAR_TOP,r=t.VAR_FG_SCALE;this.adapter.updateCssVariable(e,this.initialSize_+"px"),this.adapter.updateCssVariable(r,this.fgScale_),this.adapter.isUnbounded()&&(this.unboundedCoords_={left:Math.round(this.frame_.width/2-this.initialSize_/2),top:Math.round(this.frame_.height/2-this.initialSize_/2)},this.adapter.updateCssVariable(n,this.unboundedCoords_.left+"px"),this.adapter.updateCssVariable(i,this.unboundedCoords_.top+"px"))},h);function h(t){var e=s.call(this,o(o({},h.defaultAdapter),t))||this;return e.activationAnimationHasEnded_=!1,e.activationTimer_=0,e.fgDeactivationRemovalTimer_=0,e.fgScale_="0",e.frame_={width:0,height:0},e.initialSize_=0,e.layoutFrame_=0,e.maxRadius_=0,e.unboundedCoords_={left:0,top:0},e.activationState_=e.defaultActivationState_(),e.activationTimerCallback_=function(){e.activationAnimationHasEnded_=!0,e.runDeactivationUXLogicIfReady_()},e.activateHandler_=function(t){return e.activate_(t)},e.deactivateHandler_=function(){return e.deactivate_()},e.focusHandler_=function(){return e.handleFocus()},e.blurHandler_=function(){return e.handleBlur()},e.resizeHandler_=function(){return e.layout()},e}e.MDCRippleFoundation=f,e.default=f},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.applyPassive=function(t){return void 0===t&&(t=window),!!function(t){void 0===t&&(t=window);var e=!1;try{var n={get passive(){return!(e=!0)}},i=function(){};t.document.addEventListener("test",i,n),t.document.removeEventListener("test",i,n)}catch(t){e=!1}return e}(t)&&{passive:!0}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.cssClasses={ANCHOR:"mdc-menu-surface--anchor",ANIMATING_CLOSED:"mdc-menu-surface--animating-closed",ANIMATING_OPEN:"mdc-menu-surface--animating-open",FIXED:"mdc-menu-surface--fixed",IS_OPEN_BELOW:"mdc-menu-surface--is-open-below",OPEN:"mdc-menu-surface--open",ROOT:"mdc-menu-surface"};var i={CLOSED_EVENT:"MDCMenuSurface:closed",OPENED_EVENT:"MDCMenuSurface:opened",FOCUSABLE_ELEMENTS:["button:not(:disabled)",'[href]:not([aria-disabled="true"])',"input:not(:disabled)","select:not(:disabled)","textarea:not(:disabled)",'[tabindex]:not([tabindex="-1"]):not([aria-disabled="true"])'].join(", ")};e.strings=i;var r,o,s,a;e.numbers={TRANSITION_OPEN_DURATION:120,TRANSITION_CLOSE_DURATION:75,MARGIN_TO_EDGE:32,ANCHOR_TO_MENU_SURFACE_WIDTH_RATIO:.67},(o=r=r||{})[o.BOTTOM=1]="BOTTOM",o[o.CENTER=2]="CENTER",o[o.RIGHT=4]="RIGHT",o[o.FLIP_RTL=8]="FLIP_RTL",e.CornerBit=r,(a=s=s||{})[a.TOP_LEFT=0]="TOP_LEFT",a[a.TOP_RIGHT=4]="TOP_RIGHT",a[a.BOTTOM_LEFT=1]="BOTTOM_LEFT",a[a.BOTTOM_RIGHT=5]="BOTTOM_RIGHT",a[a.TOP_START=8]="TOP_START",a[a.TOP_END=12]="TOP_END",a[a.BOTTOM_START=9]="BOTTOM_START",a[a.BOTTOM_END=13]="BOTTOM_END",e.Corner=s},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.cssClasses={FIXED_CLASS:"mdc-top-app-bar--fixed",FIXED_SCROLLED_CLASS:"mdc-top-app-bar--fixed-scrolled",SHORT_CLASS:"mdc-top-app-bar--short",SHORT_COLLAPSED_CLASS:"mdc-top-app-bar--short-collapsed",SHORT_HAS_ACTION_ITEM_CLASS:"mdc-top-app-bar--short-has-action-item"};e.numbers={DEBOUNCE_THROTTLE_RESIZE_TIME_MS:100,MAX_TOP_APP_BAR_HEIGHT:128};e.strings={ACTION_ITEM_SELECTOR:".mdc-top-app-bar__action-item",NAVIGATION_EVENT:"MDCTopAppBar:nav",NAVIGATION_ICON_SELECTOR:".mdc-top-app-bar__navigation-icon",ROOT_SELECTOR:".mdc-top-app-bar",TITLE_SELECTOR:".mdc-top-app-bar__title"}},function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0}),i.KEY={UNKNOWN:"Unknown",BACKSPACE:"Backspace",ENTER:"Enter",SPACEBAR:"Spacebar",PAGE_UP:"PageUp",PAGE_DOWN:"PageDown",END:"End",HOME:"Home",ARROW_LEFT:"ArrowLeft",ARROW_UP:"ArrowUp",ARROW_RIGHT:"ArrowRight",ARROW_DOWN:"ArrowDown",DELETE:"Delete",ESCAPE:"Escape"};var r=new Set;r.add(i.KEY.BACKSPACE),r.add(i.KEY.ENTER),r.add(i.KEY.SPACEBAR),r.add(i.KEY.PAGE_UP),r.add(i.KEY.PAGE_DOWN),r.add(i.KEY.END),r.add(i.KEY.HOME),r.add(i.KEY.ARROW_LEFT),r.add(i.KEY.ARROW_UP),r.add(i.KEY.ARROW_RIGHT),r.add(i.KEY.ARROW_DOWN),r.add(i.KEY.DELETE),r.add(i.KEY.ESCAPE);var n=8,o=13,s=32,a=33,c=34,u=35,l=36,d=37,p=38,f=39,h=40,_=46,C=27,y=new Map;y.set(n,i.KEY.BACKSPACE),y.set(o,i.KEY.ENTER),y.set(s,i.KEY.SPACEBAR),y.set(a,i.KEY.PAGE_UP),y.set(c,i.KEY.PAGE_DOWN),y.set(u,i.KEY.END),y.set(l,i.KEY.HOME),y.set(d,i.KEY.ARROW_LEFT),y.set(p,i.KEY.ARROW_UP),y.set(f,i.KEY.ARROW_RIGHT),y.set(h,i.KEY.ARROW_DOWN),y.set(_,i.KEY.DELETE),y.set(C,i.KEY.ESCAPE);var E=new Set;function g(t){var e=t.key;if(r.has(e))return e;var n=y.get(t.keyCode);return n||i.KEY.UNKNOWN}E.add(i.KEY.PAGE_UP),E.add(i.KEY.PAGE_DOWN),E.add(i.KEY.END),E.add(i.KEY.HOME),E.add(i.KEY.ARROW_LEFT),E.add(i.KEY.ARROW_UP),E.add(i.KEY.ARROW_RIGHT),E.add(i.KEY.ARROW_DOWN),i.normalizeKey=g,i.isNavigationEvent=function(t){return E.has(g(t))}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i={LIST_ITEM_ACTIVATED_CLASS:"mdc-list-item--activated",LIST_ITEM_CLASS:"mdc-list-item",LIST_ITEM_DISABLED_CLASS:"mdc-list-item--disabled",LIST_ITEM_SELECTED_CLASS:"mdc-list-item--selected",LIST_ITEM_TEXT_CLASS:"mdc-list-item__text",LIST_ITEM_PRIMARY_TEXT_CLASS:"mdc-list-item__primary-text",ROOT:"mdc-list"},r={ACTION_EVENT:"MDCList:action",ARIA_CHECKED:"aria-checked",ARIA_CHECKED_CHECKBOX_SELECTOR:'[role="checkbox"][aria-checked="true"]',ARIA_CHECKED_RADIO_SELECTOR:'[role="radio"][aria-checked="true"]',ARIA_CURRENT:"aria-current",ARIA_DISABLED:"aria-disabled",ARIA_ORIENTATION:"aria-orientation",ARIA_ORIENTATION_HORIZONTAL:"horizontal",ARIA_ROLE_CHECKBOX_SELECTOR:'[role="checkbox"]',ARIA_SELECTED:"aria-selected",CHECKBOX_RADIO_SELECTOR:'input[type="checkbox"], input[type="radio"]',CHECKBOX_SELECTOR:'input[type="checkbox"]',CHILD_ELEMENTS_TO_TOGGLE_TABINDEX:"\n    ."+(e.cssClasses=i).LIST_ITEM_CLASS+" button:not(:disabled),\n    ."+i.LIST_ITEM_CLASS+" a\n  ",FOCUSABLE_CHILD_ELEMENTS:"\n    ."+i.LIST_ITEM_CLASS+" button:not(:disabled),\n    ."+i.LIST_ITEM_CLASS+" a,\n    ."+i.LIST_ITEM_CLASS+' input[type="radio"]:not(:disabled),\n    .'+i.LIST_ITEM_CLASS+' input[type="checkbox"]:not(:disabled)\n  ',RADIO_SELECTOR:'input[type="radio"]'};e.strings=r;e.numbers={UNSET_INDEX:-1,TYPEAHEAD_BUFFER_CLEAR_TIMEOUT_MS:300}},function(t,e,n){"use strict";var i;Object.defineProperty(e,"__esModule",{value:!0}),(i=e.InteractionTrigger||(e.InteractionTrigger={}))[i.UNSPECIFIED=0]="UNSPECIFIED",i[i.CLICK=1]="CLICK",i[i.BACKSPACE_KEY=2]="BACKSPACE_KEY",i[i.DELETE_KEY=3]="DELETE_KEY",i[i.SPACEBAR_KEY=4]="SPACEBAR_KEY",i[i.ENTER_KEY=5]="ENTER_KEY",e.strings={ARIA_HIDDEN:"aria-hidden",INTERACTION_EVENT:"MDCChipTrailingAction:interaction",NAVIGATION_EVENT:"MDCChipTrailingAction:navigation",TAB_INDEX:"tabindex"}},function(t,e,n){"use strict";var i,r;Object.defineProperty(e,"__esModule",{value:!0}),(i=e.Direction||(e.Direction={})).LEFT="left",i.RIGHT="right",(r=e.EventSource||(e.EventSource={})).PRIMARY="primary",r.TRAILING="trailing",r.NONE="none",e.strings={ADDED_ANNOUNCEMENT_ATTRIBUTE:"data-mdc-chip-added-announcement",ARIA_CHECKED:"aria-checked",ARROW_DOWN_KEY:"ArrowDown",ARROW_LEFT_KEY:"ArrowLeft",ARROW_RIGHT_KEY:"ArrowRight",ARROW_UP_KEY:"ArrowUp",BACKSPACE_KEY:"Backspace",CHECKMARK_SELECTOR:".mdc-chip__checkmark",DELETE_KEY:"Delete",END_KEY:"End",ENTER_KEY:"Enter",ENTRY_ANIMATION_NAME:"mdc-chip-entry",HOME_KEY:"Home",IE_ARROW_DOWN_KEY:"Down",IE_ARROW_LEFT_KEY:"Left",IE_ARROW_RIGHT_KEY:"Right",IE_ARROW_UP_KEY:"Up",IE_DELETE_KEY:"Del",INTERACTION_EVENT:"MDCChip:interaction",LEADING_ICON_SELECTOR:".mdc-chip__icon--leading",NAVIGATION_EVENT:"MDCChip:navigation",PRIMARY_ACTION_SELECTOR:".mdc-chip__primary-action",REMOVED_ANNOUNCEMENT_ATTRIBUTE:"data-mdc-chip-removed-announcement",REMOVAL_EVENT:"MDCChip:removal",SELECTION_EVENT:"MDCChip:selection",SPACEBAR_KEY:" ",TAB_INDEX:"tabindex",TRAILING_ACTION_SELECTOR:".mdc-chip-trailing-action",TRAILING_ICON_INTERACTION_EVENT:"MDCChip:trailingIconInteraction",TRAILING_ICON_SELECTOR:".mdc-chip__icon--trailing"},e.cssClasses={CHECKMARK:"mdc-chip__checkmark",CHIP_EXIT:"mdc-chip--exit",DELETABLE:"mdc-chip--deletable",EDITABLE:"mdc-chip--editable",EDITING:"mdc-chip--editing",HIDDEN_LEADING_ICON:"mdc-chip__icon--leading-hidden",LEADING_ICON:"mdc-chip__icon--leading",PRIMARY_ACTION:"mdc-chip__primary-action",PRIMARY_ACTION_FOCUSED:"mdc-chip--primary-action-focused",SELECTED:"mdc-chip--selected",TEXT:"mdc-chip__text",TRAILING_ACTION:"mdc-chip__trailing-action",TRAILING_ICON:"mdc-chip__icon--trailing"},e.navigationKeys=new Set,e.navigationKeys.add(e.strings.ARROW_LEFT_KEY),e.navigationKeys.add(e.strings.ARROW_RIGHT_KEY),e.navigationKeys.add(e.strings.ARROW_DOWN_KEY),e.navigationKeys.add(e.strings.ARROW_UP_KEY),e.navigationKeys.add(e.strings.END_KEY),e.navigationKeys.add(e.strings.HOME_KEY),e.navigationKeys.add(e.strings.IE_ARROW_LEFT_KEY),e.navigationKeys.add(e.strings.IE_ARROW_RIGHT_KEY),e.navigationKeys.add(e.strings.IE_ARROW_DOWN_KEY),e.navigationKeys.add(e.strings.IE_ARROW_UP_KEY),e.jumpChipKeys=new Set,e.jumpChipKeys.add(e.strings.ARROW_UP_KEY),e.jumpChipKeys.add(e.strings.ARROW_DOWN_KEY),e.jumpChipKeys.add(e.strings.HOME_KEY),e.jumpChipKeys.add(e.strings.END_KEY),e.jumpChipKeys.add(e.strings.IE_ARROW_UP_KEY),e.jumpChipKeys.add(e.strings.IE_ARROW_DOWN_KEY)},function(t,e,n){"use strict";var i,r=this&&this.__extends||(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),o=this&&this.__assign||function(){return(o=Object.assign||function(t){for(var e,n=1,i=arguments.length;n<i;n++)for(var r in e=arguments[n])Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t}).apply(this,arguments)},s=this&&this.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e};Object.defineProperty(e,"__esModule",{value:!0});var a=n(0),_=n(8),C=n(9),y=s(n(127)),E=n(55);var c,u=(c=a.MDCFoundation,r(l,c),Object.defineProperty(l,"strings",{get:function(){return C.strings},enumerable:!0,configurable:!0}),Object.defineProperty(l,"cssClasses",{get:function(){return C.cssClasses},enumerable:!0,configurable:!0}),Object.defineProperty(l,"numbers",{get:function(){return C.numbers},enumerable:!0,configurable:!0}),Object.defineProperty(l,"defaultAdapter",{get:function(){return{addClassForElementIndex:function(){},focusItemAtIndex:function(){},getAttributeForElementIndex:function(){return null},getFocusedElementIndex:function(){return 0},getListItemCount:function(){return 0},hasCheckboxAtIndex:function(){return!1},hasRadioAtIndex:function(){return!1},isCheckboxCheckedAtIndex:function(){return!1},isFocusInsideList:function(){return!1},isRootFocused:function(){return!1},listItemAtIndexHasClass:function(){return!1},notifyAction:function(){},removeClassForElementIndex:function(){},setAttributeForElementIndex:function(){},setCheckedCheckboxOrRadioAtIndex:function(){},setTabIndexForListItemChildren:function(){},getPrimaryTextAtIndex:function(){return""}}},enumerable:!0,configurable:!0}),l.prototype.layout=function(){0!==this.adapter.getListItemCount()&&(this.adapter.hasCheckboxAtIndex(0)?this.isCheckboxList_=!0:this.adapter.hasRadioAtIndex(0)&&(this.isRadioList_=!0),this.hasTypeahead&&(this.sortedIndexByFirstChar=this.typeaheadInitSortedIndex()))},l.prototype.setWrapFocus=function(t){this.wrapFocus_=t},l.prototype.setVerticalOrientation=function(t){this.isVertical_=t},l.prototype.setSingleSelection=function(t){this.isSingleSelectionList_=t},l.prototype.setHasTypeahead=function(t){(this.hasTypeahead=t)&&(this.sortedIndexByFirstChar=this.typeaheadInitSortedIndex())},l.prototype.isTypeaheadInProgress=function(){return this.hasTypeahead&&y.isTypingInProgress(this.typeaheadState)},l.prototype.setUseActivatedClass=function(t){this.useActivatedClass_=t},l.prototype.getSelectedIndex=function(){return this.selectedIndex_},l.prototype.setSelectedIndex=function(t){this.isIndexValid_(t)&&(this.isCheckboxList_?this.setCheckboxAtIndex_(t):this.isRadioList_?this.setRadioAtIndex_(t):this.setSingleSelectionAtIndex_(t))},l.prototype.handleFocusIn=function(t,e){0<=e&&(this.focusedItemIndex=e,this.adapter.setTabIndexForListItemChildren(e,"0"))},l.prototype.handleFocusOut=function(t,e){var n=this;0<=e&&this.adapter.setTabIndexForListItemChildren(e,"-1"),setTimeout(function(){n.adapter.isFocusInsideList()||n.setTabindexToFirstSelectedItem_()},0)},l.prototype.handleKeydown=function(t,e,n){var i=this,r="ArrowLeft"===_.normalizeKey(t),o="ArrowUp"===_.normalizeKey(t),s="ArrowRight"===_.normalizeKey(t),a="ArrowDown"===_.normalizeKey(t),c="Home"===_.normalizeKey(t),u="End"===_.normalizeKey(t),l="Enter"===_.normalizeKey(t),d="Spacebar"===_.normalizeKey(t);if(this.adapter.isRootFocused()){if(o||u?(t.preventDefault(),this.focusLastElement()):(a||c)&&(t.preventDefault(),this.focusFirstElement()),this.hasTypeahead){var p={event:t,focusItemAtIndex:function(t){i.focusItemAtIndex(t)},focusedItemIndex:-1,isTargetListItem:e,sortedIndexByFirstChar:this.sortedIndexByFirstChar,isItemAtIndexDisabled:function(t){return i.adapter.listItemAtIndexHasClass(t,C.cssClasses.LIST_ITEM_DISABLED_CLASS)}};y.handleKeydown(p,this.typeaheadState)}}else{var f=this.adapter.getFocusedElementIndex();if(!(-1===f&&(f=n)<0)){if(this.isVertical_&&a||!this.isVertical_&&s)E.preventDefaultEvent(t),this.focusNextElement(f);else if(this.isVertical_&&o||!this.isVertical_&&r)E.preventDefaultEvent(t),this.focusPrevElement(f);else if(c)E.preventDefaultEvent(t),this.focusFirstElement();else if(u)E.preventDefaultEvent(t),this.focusLastElement();else if((l||d)&&e){var h=t.target;if(h&&"A"===h.tagName&&l)return;if(E.preventDefaultEvent(t),this.adapter.listItemAtIndexHasClass(f,C.cssClasses.LIST_ITEM_DISABLED_CLASS))return;this.isTypeaheadInProgress()||(this.isSelectableList_()&&this.setSelectedIndexOnAction_(f),this.adapter.notifyAction(f))}this.hasTypeahead&&(p={event:t,focusItemAtIndex:function(t){i.focusItemAtIndex(t)},focusedItemIndex:this.focusedItemIndex,isTargetListItem:e,sortedIndexByFirstChar:this.sortedIndexByFirstChar,isItemAtIndexDisabled:function(t){return i.adapter.listItemAtIndexHasClass(t,C.cssClasses.LIST_ITEM_DISABLED_CLASS)}},y.handleKeydown(p,this.typeaheadState))}}},l.prototype.handleClick=function(t,e){t!==C.numbers.UNSET_INDEX&&(this.setTabindexAtIndex_(t),this.focusedItemIndex=t,this.adapter.listItemAtIndexHasClass(t,C.cssClasses.LIST_ITEM_DISABLED_CLASS)||(this.isSelectableList_()&&this.setSelectedIndexOnAction_(t,e),this.adapter.notifyAction(t)))},l.prototype.focusNextElement=function(t){var e=t+1;if(this.adapter.getListItemCount()<=e){if(!this.wrapFocus_)return t;e=0}return this.focusItemAtIndex(e),e},l.prototype.focusPrevElement=function(t){var e=t-1;if(e<0){if(!this.wrapFocus_)return t;e=this.adapter.getListItemCount()-1}return this.focusItemAtIndex(e),e},l.prototype.focusFirstElement=function(){return this.focusItemAtIndex(0),0},l.prototype.focusLastElement=function(){var t=this.adapter.getListItemCount()-1;return this.focusItemAtIndex(t),t},l.prototype.setEnabled=function(t,e){this.isIndexValid_(t)&&(e?(this.adapter.removeClassForElementIndex(t,C.cssClasses.LIST_ITEM_DISABLED_CLASS),this.adapter.setAttributeForElementIndex(t,C.strings.ARIA_DISABLED,"false")):(this.adapter.addClassForElementIndex(t,C.cssClasses.LIST_ITEM_DISABLED_CLASS),this.adapter.setAttributeForElementIndex(t,C.strings.ARIA_DISABLED,"true")))},l.prototype.setSingleSelectionAtIndex_=function(t){if(this.selectedIndex_!==t){var e=C.cssClasses.LIST_ITEM_SELECTED_CLASS;this.useActivatedClass_&&(e=C.cssClasses.LIST_ITEM_ACTIVATED_CLASS),this.selectedIndex_!==C.numbers.UNSET_INDEX&&this.adapter.removeClassForElementIndex(this.selectedIndex_,e),this.adapter.addClassForElementIndex(t,e),this.setAriaForSingleSelectionAtIndex_(t),this.selectedIndex_=t}},l.prototype.setAriaForSingleSelectionAtIndex_=function(t){this.selectedIndex_===C.numbers.UNSET_INDEX&&(this.ariaCurrentAttrValue_=this.adapter.getAttributeForElementIndex(t,C.strings.ARIA_CURRENT));var e=null!==this.ariaCurrentAttrValue_,n=e?C.strings.ARIA_CURRENT:C.strings.ARIA_SELECTED;this.selectedIndex_!==C.numbers.UNSET_INDEX&&this.adapter.setAttributeForElementIndex(this.selectedIndex_,n,"false");var i=e?this.ariaCurrentAttrValue_:"true";this.adapter.setAttributeForElementIndex(t,n,i)},l.prototype.setRadioAtIndex_=function(t){this.adapter.setCheckedCheckboxOrRadioAtIndex(t,!0),this.selectedIndex_!==C.numbers.UNSET_INDEX&&this.adapter.setAttributeForElementIndex(this.selectedIndex_,C.strings.ARIA_CHECKED,"false"),this.adapter.setAttributeForElementIndex(t,C.strings.ARIA_CHECKED,"true"),this.selectedIndex_=t},l.prototype.setCheckboxAtIndex_=function(t){for(var e=0;e<this.adapter.getListItemCount();e++){var n=!1;0<=t.indexOf(e)&&(n=!0),this.adapter.setCheckedCheckboxOrRadioAtIndex(e,n),this.adapter.setAttributeForElementIndex(e,C.strings.ARIA_CHECKED,n?"true":"false")}this.selectedIndex_=t},l.prototype.setTabindexAtIndex_=function(t){this.focusedItemIndex===C.numbers.UNSET_INDEX&&0!==t?this.adapter.setAttributeForElementIndex(0,"tabindex","-1"):0<=this.focusedItemIndex&&this.focusedItemIndex!==t&&this.adapter.setAttributeForElementIndex(this.focusedItemIndex,"tabindex","-1"),this.adapter.setAttributeForElementIndex(t,"tabindex","0")},l.prototype.isSelectableList_=function(){return this.isSingleSelectionList_||this.isCheckboxList_||this.isRadioList_},l.prototype.setTabindexToFirstSelectedItem_=function(){var t=0;this.isSelectableList_()&&("number"==typeof this.selectedIndex_&&this.selectedIndex_!==C.numbers.UNSET_INDEX?t=this.selectedIndex_:function(t){return t instanceof Array}(this.selectedIndex_)&&0<this.selectedIndex_.length&&(t=this.selectedIndex_.reduce(function(t,e){return Math.min(t,e)}))),this.setTabindexAtIndex_(t)},l.prototype.isIndexValid_=function(t){var e=this;if(t instanceof Array){if(!this.isCheckboxList_)throw new Error("MDCListFoundation: Array of index is only supported for checkbox based list");return 0===t.length||t.some(function(t){return e.isIndexInRange_(t)})}if("number"!=typeof t)return!1;if(this.isCheckboxList_)throw new Error("MDCListFoundation: Expected array of index for checkbox based list but got number: "+t);return this.isIndexInRange_(t)},l.prototype.isIndexInRange_=function(t){var e=this.adapter.getListItemCount();return 0<=t&&t<e},l.prototype.setSelectedIndexOnAction_=function(t,e){void 0===e&&(e=!0),this.isCheckboxList_?this.toggleCheckboxAtIndex_(t,e):this.setSelectedIndex(t)},l.prototype.toggleCheckboxAtIndex_=function(e,t){var n=this.adapter.isCheckboxCheckedAtIndex(e);t&&(n=!n,this.adapter.setCheckedCheckboxOrRadioAtIndex(e,n)),this.adapter.setAttributeForElementIndex(e,C.strings.ARIA_CHECKED,n?"true":"false");var i=this.selectedIndex_===C.numbers.UNSET_INDEX?[]:this.selectedIndex_.slice();n?i.push(e):i=i.filter(function(t){return t!==e}),this.selectedIndex_=i},l.prototype.focusItemAtIndex=function(t){this.setTabindexAtIndex_(t),this.adapter.focusItemAtIndex(t),this.focusedItemIndex=t},l.prototype.typeaheadMatchItem=function(t,e,n){var i=this;void 0===n&&(n=!1);var r={focusItemAtIndex:function(t){i.focusItemAtIndex(t)},focusedItemIndex:e||this.focusedItemIndex,nextChar:t,sortedIndexByFirstChar:this.sortedIndexByFirstChar,skipFocus:n,isItemAtIndexDisabled:function(t){return i.adapter.listItemAtIndexHasClass(t,C.cssClasses.LIST_ITEM_DISABLED_CLASS)}};return y.matchItem(r,this.typeaheadState)},l.prototype.typeaheadInitSortedIndex=function(){return y.initSortedIndex(this.adapter.getListItemCount(),this.adapter.getPrimaryTextAtIndex)},l.prototype.clearTypeaheadBuffer=function(){y.clearBuffer(this.typeaheadState)},l);function l(t){var e=c.call(this,o(o({},l.defaultAdapter),t))||this;return e.wrapFocus_=!1,e.isVertical_=!0,e.isSingleSelectionList_=!1,e.selectedIndex_=C.numbers.UNSET_INDEX,e.focusedItemIndex=C.numbers.UNSET_INDEX,e.useActivatedClass_=!1,e.ariaCurrentAttrValue_=null,e.isCheckboxList_=!1,e.isRadioList_=!1,e.hasTypeahead=!1,e.typeaheadState=y.initState(),e.sortedIndexByFirstChar=new Map,e}e.MDCListFoundation=u,e.default=u},function(t,e,n){"use strict";var i,r=this&&this.__extends||(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),o=this&&this.__assign||function(){return(o=Object.assign||function(t){for(var e,n=1,i=arguments.length;n<i;n++)for(var r in e=arguments[n])Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t}).apply(this,arguments)},d=this&&this.__values||function(t){var e="function"==typeof Symbol&&Symbol.iterator,n=e&&t[e],i=0;if(n)return n.call(t);if(t&&"number"==typeof t.length)return{next:function(){return t&&i>=t.length&&(t=void 0),{value:t&&t[i++],done:!t}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")};Object.defineProperty(e,"__esModule",{value:!0});var s,a=n(0),y=n(6),c=(s=a.MDCFoundation,r(E,s),Object.defineProperty(E,"cssClasses",{get:function(){return y.cssClasses},enumerable:!0,configurable:!0}),Object.defineProperty(E,"strings",{get:function(){return y.strings},enumerable:!0,configurable:!0}),Object.defineProperty(E,"numbers",{get:function(){return y.numbers},enumerable:!0,configurable:!0}),Object.defineProperty(E,"Corner",{get:function(){return y.Corner},enumerable:!0,configurable:!0}),Object.defineProperty(E,"defaultAdapter",{get:function(){return{addClass:function(){},removeClass:function(){},hasClass:function(){return!1},hasAnchor:function(){return!1},isElementInContainer:function(){return!1},isFocused:function(){return!1},isRtl:function(){return!1},getInnerDimensions:function(){return{height:0,width:0}},getAnchorDimensions:function(){return null},getWindowDimensions:function(){return{height:0,width:0}},getBodyDimensions:function(){return{height:0,width:0}},getWindowScroll:function(){return{x:0,y:0}},setPosition:function(){},setMaxHeight:function(){},setTransformOrigin:function(){},saveFocus:function(){},restoreFocus:function(){},notifyClose:function(){},notifyOpen:function(){}}},enumerable:!0,configurable:!0}),E.prototype.init=function(){var t=E.cssClasses,e=t.ROOT,n=t.OPEN;if(!this.adapter.hasClass(e))throw new Error(e+" class required in root element.");this.adapter.hasClass(n)&&(this.isSurfaceOpen=!0)},E.prototype.destroy=function(){clearTimeout(this.openAnimationEndTimerId),clearTimeout(this.closeAnimationEndTimerId),cancelAnimationFrame(this.animationRequestId)},E.prototype.setAnchorCorner=function(t){this.anchorCorner=t},E.prototype.flipCornerHorizontally=function(){this.originCorner=this.originCorner^y.CornerBit.RIGHT},E.prototype.setAnchorMargin=function(t){this.anchorMargin.top=t.top||0,this.anchorMargin.right=t.right||0,this.anchorMargin.bottom=t.bottom||0,this.anchorMargin.left=t.left||0},E.prototype.setIsHoisted=function(t){this.isHoistedElement=t},E.prototype.setFixedPosition=function(t){this.isFixedPosition=t},E.prototype.setAbsolutePosition=function(t,e){this.position.x=this.isFinite(t)?t:0,this.position.y=this.isFinite(e)?e:0},E.prototype.setQuickOpen=function(t){this.isQuickOpen=t},E.prototype.isOpen=function(){return this.isSurfaceOpen},E.prototype.open=function(){var t=this;this.isSurfaceOpen||(this.adapter.saveFocus(),this.isQuickOpen?(this.isSurfaceOpen=!0,this.adapter.addClass(E.cssClasses.OPEN),this.dimensions=this.adapter.getInnerDimensions(),this.autoposition(),this.adapter.notifyOpen()):(this.adapter.addClass(E.cssClasses.ANIMATING_OPEN),this.animationRequestId=requestAnimationFrame(function(){t.adapter.addClass(E.cssClasses.OPEN),t.dimensions=t.adapter.getInnerDimensions(),t.autoposition(),t.openAnimationEndTimerId=setTimeout(function(){t.openAnimationEndTimerId=0,t.adapter.removeClass(E.cssClasses.ANIMATING_OPEN),t.adapter.notifyOpen()},y.numbers.TRANSITION_OPEN_DURATION)}),this.isSurfaceOpen=!0))},E.prototype.close=function(t){var e=this;void 0===t&&(t=!1),this.isSurfaceOpen&&(this.isQuickOpen?(this.isSurfaceOpen=!1,t||this.maybeRestoreFocus(),this.adapter.removeClass(E.cssClasses.OPEN),this.adapter.removeClass(E.cssClasses.IS_OPEN_BELOW),this.adapter.notifyClose()):(this.adapter.addClass(E.cssClasses.ANIMATING_CLOSED),requestAnimationFrame(function(){e.adapter.removeClass(E.cssClasses.OPEN),e.adapter.removeClass(E.cssClasses.IS_OPEN_BELOW),e.closeAnimationEndTimerId=setTimeout(function(){e.closeAnimationEndTimerId=0,e.adapter.removeClass(E.cssClasses.ANIMATING_CLOSED),e.adapter.notifyClose()},y.numbers.TRANSITION_CLOSE_DURATION)}),this.isSurfaceOpen=!1,t||this.maybeRestoreFocus()))},E.prototype.handleBodyClick=function(t){var e=t.target;this.adapter.isElementInContainer(e)||this.close()},E.prototype.handleKeydown=function(t){var e=t.keyCode;"Escape"!==t.key&&27!==e||this.close()},E.prototype.autoposition=function(){var t;this.measurements=this.getAutoLayoutmeasurements();var e=this.getoriginCorner(),n=this.getMenuSurfaceMaxHeight(e),i=this.hasBit(e,y.CornerBit.BOTTOM)?"bottom":"top",r=this.hasBit(e,y.CornerBit.RIGHT)?"right":"left",o=this.getHorizontalOriginOffset(e),s=this.getVerticalOriginOffset(e),a=this.measurements,c=a.anchorSize,u=a.surfaceSize,l=((t={})[r]=o,t[i]=s,t);c.width/u.width>y.numbers.ANCHOR_TO_MENU_SURFACE_WIDTH_RATIO&&(r="center"),(this.isHoistedElement||this.isFixedPosition)&&this.adjustPositionForHoistedElement(l),this.adapter.setTransformOrigin(r+" "+i),this.adapter.setPosition(l),this.adapter.setMaxHeight(n?n+"px":""),this.hasBit(e,y.CornerBit.BOTTOM)||this.adapter.addClass(E.cssClasses.IS_OPEN_BELOW)},E.prototype.getAutoLayoutmeasurements=function(){var t=this.adapter.getAnchorDimensions(),e=this.adapter.getBodyDimensions(),n=this.adapter.getWindowDimensions(),i=this.adapter.getWindowScroll();return{anchorSize:t=t||{top:this.position.y,right:this.position.x,bottom:this.position.y,left:this.position.x,width:0,height:0},bodySize:e,surfaceSize:this.dimensions,viewportDistance:{top:t.top,right:n.width-t.right,bottom:n.height-t.bottom,left:t.left},viewportSize:n,windowScroll:i}},E.prototype.getoriginCorner=function(){var t,e,n=this.originCorner,i=this.measurements,r=i.viewportDistance,o=i.anchorSize,s=i.surfaceSize,a=E.numbers.MARGIN_TO_EDGE;!(0<(e=this.hasBit(this.anchorCorner,y.CornerBit.BOTTOM)?(t=r.top-a+o.height+this.anchorMargin.bottom,r.bottom-a-this.anchorMargin.bottom):(t=r.top-a+this.anchorMargin.top,r.bottom-a+o.height-this.anchorMargin.top))-s.height)&&e<=t&&(n=this.setBit(n,y.CornerBit.BOTTOM));var c,u,l=this.adapter.isRtl(),d=this.hasBit(this.anchorCorner,y.CornerBit.FLIP_RTL),p=this.hasBit(this.anchorCorner,y.CornerBit.RIGHT),f=!1;u=(f=l&&d?!p:p)?(c=r.left+o.width+this.anchorMargin.right,r.right-this.anchorMargin.right):(c=r.left+this.anchorMargin.left,r.right+o.width-this.anchorMargin.left);var h=0<c-s.width,_=0<u-s.width,C=this.hasBit(n,y.CornerBit.FLIP_RTL)&&this.hasBit(n,y.CornerBit.RIGHT);return _&&C&&l||!h&&C?n=this.unsetBit(n,y.CornerBit.RIGHT):(h&&f&&l||h&&!f&&p||!_&&u<=c)&&(n=this.setBit(n,y.CornerBit.RIGHT)),n},E.prototype.getMenuSurfaceMaxHeight=function(t){var e=this.measurements.viewportDistance,n=0,i=this.hasBit(t,y.CornerBit.BOTTOM),r=this.hasBit(this.anchorCorner,y.CornerBit.BOTTOM),o=E.numbers.MARGIN_TO_EDGE;return i?(n=e.top+this.anchorMargin.top-o,r||(n+=this.measurements.anchorSize.height)):(n=e.bottom-this.anchorMargin.bottom+this.measurements.anchorSize.height-o,r&&(n-=this.measurements.anchorSize.height)),n},E.prototype.getHorizontalOriginOffset=function(t){var e=this.measurements.anchorSize,n=this.hasBit(t,y.CornerBit.RIGHT),i=this.hasBit(this.anchorCorner,y.CornerBit.RIGHT);if(n){var r=i?e.width-this.anchorMargin.left:this.anchorMargin.right;return this.isHoistedElement||this.isFixedPosition?r-(this.measurements.viewportSize.width-this.measurements.bodySize.width):r}return i?e.width-this.anchorMargin.right:this.anchorMargin.left},E.prototype.getVerticalOriginOffset=function(t){var e=this.measurements.anchorSize,n=this.hasBit(t,y.CornerBit.BOTTOM),i=this.hasBit(this.anchorCorner,y.CornerBit.BOTTOM);return n?i?e.height-this.anchorMargin.top:-this.anchorMargin.bottom:i?e.height+this.anchorMargin.bottom:this.anchorMargin.top},E.prototype.adjustPositionForHoistedElement=function(t){var e,n,i=this.measurements,r=i.windowScroll,o=i.viewportDistance,s=Object.keys(t);try{for(var a=d(s),c=a.next();!c.done;c=a.next()){var u=c.value,l=t[u]||0;l+=o[u],this.isFixedPosition||("top"===u?l+=r.y:"bottom"===u?l-=r.y:"left"===u?l+=r.x:l-=r.x),t[u]=l}}catch(t){e={error:t}}finally{try{c&&!c.done&&(n=a.return)&&n.call(a)}finally{if(e)throw e.error}}},E.prototype.maybeRestoreFocus=function(){var t=this.adapter.isFocused(),e=document.activeElement&&this.adapter.isElementInContainer(document.activeElement);(t||e)&&this.adapter.restoreFocus()},E.prototype.hasBit=function(t,e){return Boolean(t&e)},E.prototype.setBit=function(t,e){return t|e},E.prototype.unsetBit=function(t,e){return t^e},E.prototype.isFinite=function(t){return"number"==typeof t&&isFinite(t)},E);function E(t){var e=s.call(this,o(o({},E.defaultAdapter),t))||this;return e.isSurfaceOpen=!1,e.isQuickOpen=!1,e.isHoistedElement=!1,e.isFixedPosition=!1,e.openAnimationEndTimerId=0,e.closeAnimationEndTimerId=0,e.animationRequestId=0,e.anchorCorner=y.Corner.TOP_START,e.originCorner=y.Corner.TOP_START,e.anchorMargin={top:0,right:0,bottom:0,left:0},e.position={x:0,y:0},e}e.MDCMenuSurfaceFoundation=c,e.default=c},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.cssClasses={MENU_SELECTED_LIST_ITEM:"mdc-menu-item--selected",MENU_SELECTION_GROUP:"mdc-menu__selection-group",ROOT:"mdc-menu"};e.strings={ARIA_CHECKED_ATTR:"aria-checked",ARIA_DISABLED_ATTR:"aria-disabled",CHECKBOX_SELECTOR:'input[type="checkbox"]',LIST_SELECTOR:".mdc-list",SELECTED_EVENT:"MDCMenu:selected"};var i,r;e.numbers={FOCUS_ROOT_INDEX:-1},(r=i=i||{})[r.NONE=0]="NONE",r[r.LIST_ROOT=1]="LIST_ROOT",r[r.FIRST_ITEM=2]="FIRST_ITEM",r[r.LAST_ITEM=3]="LAST_ITEM",e.DefaultFocusState=i},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.cssClasses={CLOSING:"mdc-snackbar--closing",OPEN:"mdc-snackbar--open",OPENING:"mdc-snackbar--opening"};e.strings={ACTION_SELECTOR:".mdc-snackbar__action",ARIA_LIVE_LABEL_TEXT_ATTR:"data-mdc-snackbar-label-text",CLOSED_EVENT:"MDCSnackbar:closed",CLOSING_EVENT:"MDCSnackbar:closing",DISMISS_SELECTOR:".mdc-snackbar__dismiss",LABEL_SELECTOR:".mdc-snackbar__label",OPENED_EVENT:"MDCSnackbar:opened",OPENING_EVENT:"MDCSnackbar:opening",REASON_ACTION:"action",REASON_DISMISS:"dismiss",SURFACE_SELECTOR:".mdc-snackbar__surface"};e.numbers={DEFAULT_AUTO_DISMISS_TIMEOUT_MS:5e3,INDETERMINATE:-1,MAX_AUTO_DISMISS_TIMEOUT_MS:1e4,MIN_AUTO_DISMISS_TIMEOUT_MS:4e3,SNACKBAR_ANIMATION_CLOSE_TIME_MS:75,SNACKBAR_ANIMATION_OPEN_TIME_MS:150,ARIA_LIVE_DELAY_MS:1e3}},function(t,e,n){"use strict";var i,r=this&&this.__extends||(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),o=this&&this.__assign||function(){return(o=Object.assign||function(t){for(var e,n=1,i=arguments.length;n<i;n++)for(var r in e=arguments[n])Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t}).apply(this,arguments)};Object.defineProperty(e,"__esModule",{value:!0});var s,a=n(0),c=n(92),u=(s=a.MDCFoundation,r(l,s),Object.defineProperty(l,"cssClasses",{get:function(){return c.cssClasses},enumerable:!0,configurable:!0}),Object.defineProperty(l,"strings",{get:function(){return c.strings},enumerable:!0,configurable:!0}),Object.defineProperty(l,"defaultAdapter",{get:function(){return{addClass:function(){},removeClass:function(){},computeContentClientRect:function(){return{top:0,right:0,bottom:0,left:0,width:0,height:0}},setContentStyleProperty:function(){}}},enumerable:!0,configurable:!0}),l.prototype.computeContentClientRect=function(){return this.adapter.computeContentClientRect()},l);function l(t){return s.call(this,o(o({},l.defaultAdapter),t))||this}e.MDCTabIndicatorFoundation=u,e.default=u},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s={animation:{prefixed:"-webkit-animation",standard:"animation"},transform:{prefixed:"-webkit-transform",standard:"transform"},transition:{prefixed:"-webkit-transition",standard:"transition"}},a={animationend:{cssProperty:"animation",prefixed:"webkitAnimationEnd",standard:"animationend"},animationiteration:{cssProperty:"animation",prefixed:"webkitAnimationIteration",standard:"animationiteration"},animationstart:{cssProperty:"animation",prefixed:"webkitAnimationStart",standard:"animationstart"},transitionend:{cssProperty:"transition",prefixed:"webkitTransitionEnd",standard:"transitionend"}};function c(t){return Boolean(t.document)&&"function"==typeof t.document.createElement}e.getCorrectPropertyName=function(t,e){if(c(t)&&e in s){var n=t.document.createElement("div"),i=s[e],r=i.standard,o=i.prefixed;return r in n.style?r:o}return e},e.getCorrectEventName=function(t,e){if(c(t)&&e in a){var n=t.document.createElement("div"),i=a[e],r=i.standard,o=i.prefixed;return i.cssProperty in n.style?r:o}return e}},function(t,e,n){"use strict";var s;Object.defineProperty(e,"__esModule",{value:!0}),e.supportsCssVariables=function(t,e){void 0===e&&(e=!1);var n,i=t.CSS;if("boolean"==typeof s&&!e)return s;if(!(i&&"function"==typeof i.supports))return!1;var r=i.supports("--css-vars","yes"),o=i.supports("(--css-vars: yes)")&&i.supports("color","#00000000");return n=r||o,e||(s=n),n},e.getNormalizedEventCoords=function(t,e,n){if(!t)return{x:0,y:0};var i,r,o=e.x,s=e.y,a=o+n.left,c=s+n.top;if("touchstart"===t.type){var u=t;i=u.changedTouches[0].pageX-a,r=u.changedTouches[0].pageY-c}else{var l=t;i=l.pageX-a,r=l.pageY-c}return{x:i,y:r}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.cssClasses={ANIM_CHECKED_INDETERMINATE:"mdc-checkbox--anim-checked-indeterminate",ANIM_CHECKED_UNCHECKED:"mdc-checkbox--anim-checked-unchecked",ANIM_INDETERMINATE_CHECKED:"mdc-checkbox--anim-indeterminate-checked",ANIM_INDETERMINATE_UNCHECKED:"mdc-checkbox--anim-indeterminate-unchecked",ANIM_UNCHECKED_CHECKED:"mdc-checkbox--anim-unchecked-checked",ANIM_UNCHECKED_INDETERMINATE:"mdc-checkbox--anim-unchecked-indeterminate",BACKGROUND:"mdc-checkbox__background",CHECKED:"mdc-checkbox--checked",CHECKMARK:"mdc-checkbox__checkmark",CHECKMARK_PATH:"mdc-checkbox__checkmark-path",DISABLED:"mdc-checkbox--disabled",INDETERMINATE:"mdc-checkbox--indeterminate",MIXEDMARK:"mdc-checkbox__mixedmark",NATIVE_CONTROL:"mdc-checkbox__native-control",ROOT:"mdc-checkbox",SELECTED:"mdc-checkbox--selected",UPGRADED:"mdc-checkbox--upgraded"},e.strings={ARIA_CHECKED_ATTR:"aria-checked",ARIA_CHECKED_INDETERMINATE_VALUE:"mixed",DATA_INDETERMINATE_ATTR:"data-indeterminate",NATIVE_CONTROL_SELECTOR:".mdc-checkbox__native-control",TRANSITION_STATE_CHECKED:"checked",TRANSITION_STATE_INDETERMINATE:"indeterminate",TRANSITION_STATE_INIT:"init",TRANSITION_STATE_UNCHECKED:"unchecked"},e.numbers={ANIM_END_LATCH_MS:250}},function(t,e,n){"use strict";var i,r=this&&this.__extends||(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),o=this&&this.__assign||function(){return(o=Object.assign||function(t){for(var e,n=1,i=arguments.length;n<i;n++)for(var r in e=arguments[n])Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t}).apply(this,arguments)};Object.defineProperty(e,"__esModule",{value:!0});var s,a,c=n(0),u=n(11),l={bottom:0,height:0,left:0,right:0,top:0,width:0};(a=s=s||{})[a.SHOULD_FOCUS=0]="SHOULD_FOCUS",a[a.SHOULD_NOT_FOCUS=1]="SHOULD_NOT_FOCUS";var d,p=(d=c.MDCFoundation,r(f,d),Object.defineProperty(f,"strings",{get:function(){return u.strings},enumerable:!0,configurable:!0}),Object.defineProperty(f,"cssClasses",{get:function(){return u.cssClasses},enumerable:!0,configurable:!0}),Object.defineProperty(f,"defaultAdapter",{get:function(){return{addClass:function(){},addClassToLeadingIcon:function(){},eventTargetHasClass:function(){return!1},focusPrimaryAction:function(){},focusTrailingAction:function(){},getAttribute:function(){return null},getCheckmarkBoundingClientRect:function(){return l},getComputedStyleValue:function(){return""},getRootBoundingClientRect:function(){return l},hasClass:function(){return!1},hasLeadingIcon:function(){return!1},isRTL:function(){return!1},isTrailingActionNavigable:function(){return!1},notifyEditFinish:function(){},notifyEditStart:function(){},notifyInteraction:function(){},notifyNavigation:function(){},notifyRemoval:function(){},notifySelection:function(){},notifyTrailingIconInteraction:function(){},removeClass:function(){},removeClassFromLeadingIcon:function(){},removeTrailingActionFocus:function(){},setPrimaryActionAttr:function(){},setStyleProperty:function(){}}},enumerable:!0,configurable:!0}),f.prototype.isSelected=function(){return this.adapter.hasClass(u.cssClasses.SELECTED)},f.prototype.isEditable=function(){return this.adapter.hasClass(u.cssClasses.EDITABLE)},f.prototype.isEditing=function(){return this.adapter.hasClass(u.cssClasses.EDITING)},f.prototype.setSelected=function(t){this.setSelected_(t),this.notifySelection_(t)},f.prototype.setSelectedFromChipSet=function(t,e){this.setSelected_(t),e&&this.notifyIgnoredSelection_(t)},f.prototype.getShouldRemoveOnTrailingIconClick=function(){return this.shouldRemoveOnTrailingIconClick_},f.prototype.setShouldRemoveOnTrailingIconClick=function(t){this.shouldRemoveOnTrailingIconClick_=t},f.prototype.setShouldFocusPrimaryActionOnClick=function(t){this.shouldFocusPrimaryActionOnClick_=t},f.prototype.getDimensions=function(){function t(){return e.adapter.getRootBoundingClientRect()}var e=this;if(!this.adapter.hasLeadingIcon()){var n=e.adapter.getCheckmarkBoundingClientRect();if(n){var i=t();return{bottom:i.bottom,height:i.height,left:i.left,right:i.right,top:i.top,width:i.width+n.height}}}return t()},f.prototype.beginExit=function(){this.adapter.addClass(u.cssClasses.CHIP_EXIT)},f.prototype.handleClick=function(){this.adapter.notifyInteraction(),this.setPrimaryActionFocusable_(this.getFocusBehavior_())},f.prototype.handleDoubleClick=function(){this.isEditable()&&this.startEditing()},f.prototype.handleTransitionEnd=function(t){var e=this,n=this.adapter.eventTargetHasClass(t.target,u.cssClasses.CHIP_EXIT),i="width"===t.propertyName,r="opacity"===t.propertyName;if(n&&r){var o=this.adapter.getComputedStyleValue("width");requestAnimationFrame(function(){e.adapter.setStyleProperty("width",o),e.adapter.setStyleProperty("padding","0"),e.adapter.setStyleProperty("margin","0"),requestAnimationFrame(function(){e.adapter.setStyleProperty("width","0")})})}else{if(n&&i){this.removeFocus();var s=this.adapter.getAttribute(u.strings.REMOVED_ANNOUNCEMENT_ATTRIBUTE);this.adapter.notifyRemoval(s)}if(r){var a=this.adapter.eventTargetHasClass(t.target,u.cssClasses.LEADING_ICON)&&this.adapter.hasClass(u.cssClasses.SELECTED),c=this.adapter.eventTargetHasClass(t.target,u.cssClasses.CHECKMARK)&&!this.adapter.hasClass(u.cssClasses.SELECTED);a?this.adapter.addClassToLeadingIcon(u.cssClasses.HIDDEN_LEADING_ICON):c&&this.adapter.removeClassFromLeadingIcon(u.cssClasses.HIDDEN_LEADING_ICON)}}},f.prototype.handleFocusIn=function(t){this.eventFromPrimaryAction_(t)&&this.adapter.addClass(u.cssClasses.PRIMARY_ACTION_FOCUSED)},f.prototype.handleFocusOut=function(t){this.eventFromPrimaryAction_(t)&&(this.isEditing()&&this.finishEditing(),this.adapter.removeClass(u.cssClasses.PRIMARY_ACTION_FOCUSED))},f.prototype.handleTrailingActionInteraction=function(){this.adapter.notifyTrailingIconInteraction(),this.removeChip_()},f.prototype.handleKeydown=function(t){if(!this.isEditing())return this.isEditable()&&this.shouldStartEditing(t)&&(t.preventDefault(),this.startEditing()),this.shouldNotifyInteraction_(t)?(this.adapter.notifyInteraction(),void this.setPrimaryActionFocusable_(this.getFocusBehavior_())):this.isDeleteAction_(t)?(t.preventDefault(),void this.removeChip_()):void(u.navigationKeys.has(t.key)&&(t.preventDefault(),this.focusNextAction_(t.key,u.EventSource.PRIMARY)));this.shouldFinishEditing(t)&&(t.preventDefault(),this.finishEditing())},f.prototype.handleTrailingActionNavigation=function(t){return this.focusNextAction_(t.detail.key,u.EventSource.TRAILING)},f.prototype.removeFocus=function(){this.adapter.setPrimaryActionAttr(u.strings.TAB_INDEX,"-1"),this.adapter.removeTrailingActionFocus()},f.prototype.focusPrimaryAction=function(){this.setPrimaryActionFocusable_(s.SHOULD_FOCUS)},f.prototype.focusTrailingAction=function(){if(this.adapter.isTrailingActionNavigable())return this.adapter.setPrimaryActionAttr(u.strings.TAB_INDEX,"-1"),void this.adapter.focusTrailingAction();this.focusPrimaryAction()},f.prototype.setPrimaryActionFocusable_=function(t){this.adapter.setPrimaryActionAttr(u.strings.TAB_INDEX,"0"),t===s.SHOULD_FOCUS&&this.adapter.focusPrimaryAction(),this.adapter.removeTrailingActionFocus()},f.prototype.getFocusBehavior_=function(){return this.shouldFocusPrimaryActionOnClick_?s.SHOULD_FOCUS:s.SHOULD_NOT_FOCUS},f.prototype.focusNextAction_=function(t,e){var n=this.adapter.isTrailingActionNavigable(),i=this.getDirection_(t);return u.jumpChipKeys.has(t)||!n?this.adapter.notifyNavigation(t,e):e===u.EventSource.PRIMARY&&i===u.Direction.RIGHT?this.focusTrailingAction():e===u.EventSource.TRAILING&&i===u.Direction.LEFT?this.focusPrimaryAction():void this.adapter.notifyNavigation(t,u.EventSource.NONE)},f.prototype.getDirection_=function(t){var e=this.adapter.isRTL(),n=t===u.strings.ARROW_LEFT_KEY||t===u.strings.IE_ARROW_LEFT_KEY,i=t===u.strings.ARROW_RIGHT_KEY||t===u.strings.IE_ARROW_RIGHT_KEY;return!e&&n||e&&i?u.Direction.LEFT:u.Direction.RIGHT},f.prototype.removeChip_=function(){this.shouldRemoveOnTrailingIconClick_&&this.beginExit()},f.prototype.shouldStartEditing=function(t){return this.eventFromPrimaryAction_(t)&&t.key===u.strings.ENTER_KEY},f.prototype.shouldFinishEditing=function(t){return t.key===u.strings.ENTER_KEY},f.prototype.shouldNotifyInteraction_=function(t){return t.key===u.strings.ENTER_KEY||t.key===u.strings.SPACEBAR_KEY},f.prototype.isDeleteAction_=function(t){return this.adapter.hasClass(u.cssClasses.DELETABLE)&&(t.key===u.strings.BACKSPACE_KEY||t.key===u.strings.DELETE_KEY||t.key===u.strings.IE_DELETE_KEY)},f.prototype.setSelected_=function(t){t?(this.adapter.addClass(u.cssClasses.SELECTED),this.adapter.setPrimaryActionAttr(u.strings.ARIA_CHECKED,"true")):(this.adapter.removeClass(u.cssClasses.SELECTED),this.adapter.setPrimaryActionAttr(u.strings.ARIA_CHECKED,"false"))},f.prototype.notifySelection_=function(t){this.adapter.notifySelection(t,!1)},f.prototype.notifyIgnoredSelection_=function(t){this.adapter.notifySelection(t,!0)},f.prototype.eventFromPrimaryAction_=function(t){return this.adapter.eventTargetHasClass(t.target,u.cssClasses.PRIMARY_ACTION)},f.prototype.startEditing=function(){this.adapter.addClass(u.cssClasses.EDITING),this.adapter.notifyEditStart()},f.prototype.finishEditing=function(){this.adapter.removeClass(u.cssClasses.EDITING),this.adapter.notifyEditFinish()},f);function f(t){var e=d.call(this,o(o({},f.defaultAdapter),t))||this;return e.shouldRemoveOnTrailingIconClick_=!0,e.shouldFocusPrimaryActionOnClick_=!0,e}e.MDCChipFoundation=p,e.default=p},function(t,e,n){"use strict";var i;Object.defineProperty(e,"__esModule",{value:!0}),e.cssClasses={CELL:"mdc-data-table__cell",CELL_NUMERIC:"mdc-data-table__cell--numeric",CONTENT:"mdc-data-table__content",HEADER_CELL:"mdc-data-table__header-cell",HEADER_CELL_LABEL:"mdc-data-table__header-cell-label",HEADER_CELL_SORTED:"mdc-data-table__header-cell--sorted",HEADER_CELL_SORTED_DESCENDING:"mdc-data-table__header-cell--sorted-descending",HEADER_CELL_WITH_SORT:"mdc-data-table__header-cell--with-sort",HEADER_CELL_WRAPPER:"mdc-data-table__header-cell-wrapper",HEADER_ROW:"mdc-data-table__header-row",HEADER_ROW_CHECKBOX:"mdc-data-table__header-row-checkbox",IN_PROGRESS:"mdc-data-table--in-progress",PROGRESS_INDICATOR:"mdc-data-table__progress-indicator",ROOT:"mdc-data-table",ROW:"mdc-data-table__row",ROW_CHECKBOX:"mdc-data-table__row-checkbox",ROW_SELECTED:"mdc-data-table__row--selected",SORT_ICON_BUTTON:"mdc-data-table__sort-icon-button",SORT_STATUS_LABEL:"mdc-data-table__sort-status-label",PAGINATION_ROWS_PER_PAGE_SELECT:"mdc-data-table__pagination-rows-per-page-select",PAGINATION_ROWS_PER_PAGE_LABEL:"mdc-data-table__pagination-rows-per-page-label"},e.attributes={ARIA_SELECTED:"aria-selected",ARIA_SORT:"aria-sort"},e.dataAttributes={COLUMN_ID:"data-column-id",ROW_ID:"data-row-id"},e.selectors={CONTENT:"."+e.cssClasses.CONTENT,HEADER_CELL:"."+e.cssClasses.HEADER_CELL,HEADER_CELL_WITH_SORT:"."+e.cssClasses.HEADER_CELL_WITH_SORT,HEADER_ROW:"."+e.cssClasses.HEADER_ROW,HEADER_ROW_CHECKBOX:"."+e.cssClasses.HEADER_ROW_CHECKBOX,PROGRESS_INDICATOR:"."+e.cssClasses.PROGRESS_INDICATOR,ROW:"."+e.cssClasses.ROW,ROW_CHECKBOX:"."+e.cssClasses.ROW_CHECKBOX,ROW_SELECTED:"."+e.cssClasses.ROW_SELECTED,SORT_ICON_BUTTON:"."+e.cssClasses.SORT_ICON_BUTTON,SORT_STATUS_LABEL:"."+e.cssClasses.SORT_STATUS_LABEL},e.messages={SORTED_IN_DESCENDING:"Sorted in descending order",SORTED_IN_ASCENDING:"Sorted in ascending order"},e.strings={ARIA_SELECTED:e.attributes.ARIA_SELECTED,ARIA_SORT:e.attributes.ARIA_SORT,DATA_ROW_ID_ATTR:e.dataAttributes.ROW_ID,HEADER_ROW_CHECKBOX_SELECTOR:e.selectors.HEADER_ROW_CHECKBOX,ROW_CHECKBOX_SELECTOR:e.selectors.ROW_CHECKBOX,ROW_SELECTED_SELECTOR:e.selectors.ROW_SELECTED,ROW_SELECTOR:e.selectors.ROW},(i=e.SortValue||(e.SortValue={})).ASCENDING="ascending",i.DESCENDING="descending",i.NONE="none",i.OTHER="other",e.events={ROW_SELECTION_CHANGED:"MDCDataTable:rowSelectionChanged",SELECTED_ALL:"MDCDataTable:selectedAll",UNSELECTED_ALL:"MDCDataTable:unselectedAll",SORTED:"MDCDataTable:sorted"}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o="mdc-dom-focus-sentinel",i=(r.prototype.trapFocus=function(){var t=this.getFocusableElements(this.root);if(0===t.length)throw new Error("FocusTrap: Element must have at least one focusable child.");this.elFocusedBeforeTrapFocus=document.activeElement instanceof HTMLElement?document.activeElement:null,this.wrapTabFocus(this.root,t),this.options.skipInitialFocus||this.focusInitialElement(t,this.options.initialFocusEl)},r.prototype.releaseFocus=function(){[].slice.call(this.root.querySelectorAll("."+o)).forEach(function(t){t.parentElement.removeChild(t)}),this.elFocusedBeforeTrapFocus&&this.elFocusedBeforeTrapFocus.focus()},r.prototype.wrapTabFocus=function(t,e){var n=this.createSentinel(),i=this.createSentinel();n.addEventListener("focus",function(){0<e.length&&e[e.length-1].focus()}),i.addEventListener("focus",function(){0<e.length&&e[0].focus()}),t.insertBefore(n,t.children[0]),t.appendChild(i)},r.prototype.focusInitialElement=function(t,e){var n=0;e&&(n=Math.max(t.indexOf(e),0)),t[n].focus()},r.prototype.getFocusableElements=function(t){return[].slice.call(t.querySelectorAll("[autofocus], [tabindex], a, input, textarea, select, button")).filter(function(t){var e="true"===t.getAttribute("aria-disabled")||null!=t.getAttribute("disabled")||null!=t.getAttribute("hidden")||"true"===t.getAttribute("aria-hidden"),n=0<=t.tabIndex&&0<t.getBoundingClientRect().width&&!t.classList.contains(o)&&!e,i=!1;if(n){var r=getComputedStyle(t);i="none"===r.display||"hidden"===r.visibility}return n&&!i})},r.prototype.createSentinel=function(){var t=document.createElement("div");return t.setAttribute("tabindex","0"),t.setAttribute("aria-hidden","true"),t.classList.add(o),t},r);function r(t,e){void 0===e&&(e={}),this.root=t,this.options=e,this.elFocusedBeforeTrapFocus=null}e.FocusTrap=i},function(t,e,n){"use strict";var i,r=this&&this.__extends||(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)});Object.defineProperty(e,"__esModule",{value:!0});var o,s=n(1),a=n(2),c=n(9),u=n(12),l=(o=s.MDCComponent,r(d,o),Object.defineProperty(d.prototype,"vertical",{set:function(t){this.foundation.setVerticalOrientation(t)},enumerable:!0,configurable:!0}),Object.defineProperty(d.prototype,"listElements",{get:function(){return[].slice.call(this.root.querySelectorAll("."+c.cssClasses.LIST_ITEM_CLASS))},enumerable:!0,configurable:!0}),Object.defineProperty(d.prototype,"wrapFocus",{set:function(t){this.foundation.setWrapFocus(t)},enumerable:!0,configurable:!0}),Object.defineProperty(d.prototype,"typeaheadInProgress",{get:function(){return this.foundation.isTypeaheadInProgress()},enumerable:!0,configurable:!0}),Object.defineProperty(d.prototype,"hasTypeahead",{set:function(t){this.foundation.setHasTypeahead(t)},enumerable:!0,configurable:!0}),Object.defineProperty(d.prototype,"singleSelection",{set:function(t){this.foundation.setSingleSelection(t)},enumerable:!0,configurable:!0}),Object.defineProperty(d.prototype,"selectedIndex",{get:function(){return this.foundation.getSelectedIndex()},set:function(t){this.foundation.setSelectedIndex(t)},enumerable:!0,configurable:!0}),d.attachTo=function(t){return new d(t)},d.prototype.initialSyncWithDOM=function(){this.handleClick_=this.handleClickEvent_.bind(this),this.handleKeydown_=this.handleKeydownEvent_.bind(this),this.focusInEventListener_=this.handleFocusInEvent_.bind(this),this.focusOutEventListener_=this.handleFocusOutEvent_.bind(this),this.listen("keydown",this.handleKeydown_),this.listen("click",this.handleClick_),this.listen("focusin",this.focusInEventListener_),this.listen("focusout",this.focusOutEventListener_),this.layout(),this.initializeListType()},d.prototype.destroy=function(){this.unlisten("keydown",this.handleKeydown_),this.unlisten("click",this.handleClick_),this.unlisten("focusin",this.focusInEventListener_),this.unlisten("focusout",this.focusOutEventListener_)},d.prototype.layout=function(){var t=this.root.getAttribute(c.strings.ARIA_ORIENTATION);this.vertical=t!==c.strings.ARIA_ORIENTATION_HORIZONTAL,[].slice.call(this.root.querySelectorAll(".mdc-list-item:not([tabindex])")).forEach(function(t){t.setAttribute("tabindex","-1")}),[].slice.call(this.root.querySelectorAll(c.strings.FOCUSABLE_CHILD_ELEMENTS)).forEach(function(t){return t.setAttribute("tabindex","-1")}),this.foundation.layout()},d.prototype.getPrimaryText=function(t){var e=t.querySelector("."+c.cssClasses.LIST_ITEM_PRIMARY_TEXT_CLASS);if(e)return e.textContent||"";var n=t.querySelector("."+c.cssClasses.LIST_ITEM_TEXT_CLASS);return n&&n.textContent||""},d.prototype.initializeListType=function(){var e=this,t=this.root.querySelectorAll(c.strings.ARIA_ROLE_CHECKBOX_SELECTOR),n=this.root.querySelector("\n      ."+c.cssClasses.LIST_ITEM_ACTIVATED_CLASS+",\n      ."+c.cssClasses.LIST_ITEM_SELECTED_CLASS+"\n    "),i=this.root.querySelector(c.strings.ARIA_CHECKED_RADIO_SELECTOR);if(t.length){var r=this.root.querySelectorAll(c.strings.ARIA_CHECKED_CHECKBOX_SELECTOR);this.selectedIndex=[].map.call(r,function(t){return e.listElements.indexOf(t)})}else n?(n.classList.contains(c.cssClasses.LIST_ITEM_ACTIVATED_CLASS)&&this.foundation.setUseActivatedClass(!0),this.singleSelection=!0,this.selectedIndex=this.listElements.indexOf(n)):i&&(this.selectedIndex=this.listElements.indexOf(i))},d.prototype.setEnabled=function(t,e){this.foundation.setEnabled(t,e)},d.prototype.typeaheadMatchItem=function(t,e){return this.foundation.typeaheadMatchItem(t,e,!0)},d.prototype.getDefaultFoundation=function(){var r=this,t={addClassForElementIndex:function(t,e){var n=r.listElements[t];n&&n.classList.add(e)},focusItemAtIndex:function(t){var e=r.listElements[t];e&&e.focus()},getAttributeForElementIndex:function(t,e){return r.listElements[t].getAttribute(e)},getFocusedElementIndex:function(){return r.listElements.indexOf(document.activeElement)},getListItemCount:function(){return r.listElements.length},getPrimaryTextAtIndex:function(t){return r.getPrimaryText(r.listElements[t])},hasCheckboxAtIndex:function(t){return!!r.listElements[t].querySelector(c.strings.CHECKBOX_SELECTOR)},hasRadioAtIndex:function(t){return!!r.listElements[t].querySelector(c.strings.RADIO_SELECTOR)},isCheckboxCheckedAtIndex:function(t){return r.listElements[t].querySelector(c.strings.CHECKBOX_SELECTOR).checked},isFocusInsideList:function(){return r.root.contains(document.activeElement)},isRootFocused:function(){return document.activeElement===r.root},listItemAtIndexHasClass:function(t,e){return r.listElements[t].classList.contains(e)},notifyAction:function(t){r.emit(c.strings.ACTION_EVENT,{index:t},!0)},removeClassForElementIndex:function(t,e){var n=r.listElements[t];n&&n.classList.remove(e)},setAttributeForElementIndex:function(t,e,n){var i=r.listElements[t];i&&i.setAttribute(e,n)},setCheckedCheckboxOrRadioAtIndex:function(t,e){var n=r.listElements[t].querySelector(c.strings.CHECKBOX_RADIO_SELECTOR);n.checked=e;var i=document.createEvent("Event");i.initEvent("change",!0,!0),n.dispatchEvent(i)},setTabIndexForListItemChildren:function(t,e){var n=r.listElements[t];[].slice.call(n.querySelectorAll(c.strings.CHILD_ELEMENTS_TO_TOGGLE_TABINDEX)).forEach(function(t){return t.setAttribute("tabindex",e)})}};return new u.MDCListFoundation(t)},d.prototype.getListItemIndex_=function(t){var e=t.target,n=a.closest(e,"."+c.cssClasses.LIST_ITEM_CLASS+", ."+c.cssClasses.ROOT);return n&&a.matches(n,"."+c.cssClasses.LIST_ITEM_CLASS)?this.listElements.indexOf(n):-1},d.prototype.handleFocusInEvent_=function(t){var e=this.getListItemIndex_(t);this.foundation.handleFocusIn(t,e)},d.prototype.handleFocusOutEvent_=function(t){var e=this.getListItemIndex_(t);this.foundation.handleFocusOut(t,e)},d.prototype.handleKeydownEvent_=function(t){var e=this.getListItemIndex_(t),n=t.target;this.foundation.handleKeydown(t,n.classList.contains(c.cssClasses.LIST_ITEM_CLASS),e)},d.prototype.handleClickEvent_=function(t){var e=this.getListItemIndex_(t),n=t.target,i=!a.matches(n,c.strings.CHECKBOX_RADIO_SELECTOR);this.foundation.handleClick(e,i)},d);function d(){return null!==o&&o.apply(this,arguments)||this}e.MDCList=l},function(t,e,n){"use strict";var i,r=this&&this.__extends||(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),o=this&&this.__assign||function(){return(o=Object.assign||function(t){for(var e,n=1,i=arguments.length;n<i;n++)for(var r in e=arguments[n])Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t}).apply(this,arguments)};Object.defineProperty(e,"__esModule",{value:!0});var s,a=n(0),c=n(56),u=(s=a.MDCFoundation,r(l,s),Object.defineProperty(l,"strings",{get:function(){return c.strings},enumerable:!0,configurable:!0}),Object.defineProperty(l,"cssClasses",{get:function(){return c.cssClasses},enumerable:!0,configurable:!0}),Object.defineProperty(l,"defaultAdapter",{get:function(){return{addClass:function(){},removeClass:function(){},hasClass:function(){return!1},elementHasClass:function(){return!1},notifyClose:function(){},notifyOpen:function(){},saveFocus:function(){},restoreFocus:function(){},focusActiveNavigationItem:function(){},trapFocus:function(){},releaseFocus:function(){}}},enumerable:!0,configurable:!0}),l.prototype.destroy=function(){this.animationFrame_&&cancelAnimationFrame(this.animationFrame_),this.animationTimer_&&clearTimeout(this.animationTimer_)},l.prototype.open=function(){var t=this;this.isOpen()||this.isOpening()||this.isClosing()||(this.adapter.addClass(c.cssClasses.OPEN),this.adapter.addClass(c.cssClasses.ANIMATE),this.runNextAnimationFrame_(function(){t.adapter.addClass(c.cssClasses.OPENING)}),this.adapter.saveFocus())},l.prototype.close=function(){!this.isOpen()||this.isOpening()||this.isClosing()||this.adapter.addClass(c.cssClasses.CLOSING)},l.prototype.isOpen=function(){return this.adapter.hasClass(c.cssClasses.OPEN)},l.prototype.isOpening=function(){return this.adapter.hasClass(c.cssClasses.OPENING)||this.adapter.hasClass(c.cssClasses.ANIMATE)},l.prototype.isClosing=function(){return this.adapter.hasClass(c.cssClasses.CLOSING)},l.prototype.handleKeydown=function(t){var e=t.keyCode;"Escape"!==t.key&&27!==e||this.close()},l.prototype.handleTransitionEnd=function(t){var e=c.cssClasses.OPENING,n=c.cssClasses.CLOSING,i=c.cssClasses.OPEN,r=c.cssClasses.ANIMATE,o=c.cssClasses.ROOT;this.isElement_(t.target)&&this.adapter.elementHasClass(t.target,o)&&(this.isClosing()?(this.adapter.removeClass(i),this.closed_(),this.adapter.restoreFocus(),this.adapter.notifyClose()):(this.adapter.focusActiveNavigationItem(),this.opened_(),this.adapter.notifyOpen()),this.adapter.removeClass(r),this.adapter.removeClass(e),this.adapter.removeClass(n))},l.prototype.opened_=function(){},l.prototype.closed_=function(){},l.prototype.runNextAnimationFrame_=function(t){var e=this;cancelAnimationFrame(this.animationFrame_),this.animationFrame_=requestAnimationFrame(function(){e.animationFrame_=0,clearTimeout(e.animationTimer_),e.animationTimer_=setTimeout(t,0)})},l.prototype.isElement_=function(t){return Boolean(t.classList)},l);function l(t){var e=s.call(this,o(o({},l.defaultAdapter),t))||this;return e.animationFrame_=0,e.animationTimer_=0,e}e.MDCDismissibleDrawerFoundation=u,e.default=u},function(t,e,n){"use strict";var i,r=this&&this.__extends||(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)});Object.defineProperty(e,"__esModule",{value:!0});var o,s=n(1),a=n(2),c=n(26),u=(o=s.MDCComponent,r(l,o),l.attachTo=function(t){return new l(t)},l.prototype.shake=function(t){this.foundation.shake(t)},l.prototype.float=function(t){this.foundation.float(t)},l.prototype.setRequired=function(t){this.foundation.setRequired(t)},l.prototype.getWidth=function(){return this.foundation.getWidth()},l.prototype.getDefaultFoundation=function(){var n=this,t={addClass:function(t){return n.root.classList.add(t)},removeClass:function(t){return n.root.classList.remove(t)},getWidth:function(){return a.estimateScrollWidth(n.root)},registerInteractionHandler:function(t,e){return n.listen(t,e)},deregisterInteractionHandler:function(t,e){return n.unlisten(t,e)}};return new c.MDCFloatingLabelFoundation(t)},l);function l(){return null!==o&&o.apply(this,arguments)||this}e.MDCFloatingLabel=u},function(t,e,n){"use strict";var i,r=this&&this.__extends||(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),o=this&&this.__assign||function(){return(o=Object.assign||function(t){for(var e,n=1,i=arguments.length;n<i;n++)for(var r in e=arguments[n])Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t}).apply(this,arguments)};Object.defineProperty(e,"__esModule",{value:!0});var s,a=n(0),c=n(58),u=(s=a.MDCFoundation,r(l,s),Object.defineProperty(l,"cssClasses",{get:function(){return c.cssClasses},enumerable:!0,configurable:!0}),Object.defineProperty(l,"defaultAdapter",{get:function(){return{addClass:function(){},removeClass:function(){},getWidth:function(){return 0},registerInteractionHandler:function(){},deregisterInteractionHandler:function(){}}},enumerable:!0,configurable:!0}),l.prototype.init=function(){this.adapter.registerInteractionHandler("animationend",this.shakeAnimationEndHandler_)},l.prototype.destroy=function(){this.adapter.deregisterInteractionHandler("animationend",this.shakeAnimationEndHandler_)},l.prototype.getWidth=function(){return this.adapter.getWidth()},l.prototype.shake=function(t){var e=l.cssClasses.LABEL_SHAKE;t?this.adapter.addClass(e):this.adapter.removeClass(e)},l.prototype.float=function(t){var e=l.cssClasses,n=e.LABEL_FLOAT_ABOVE,i=e.LABEL_SHAKE;t?this.adapter.addClass(n):(this.adapter.removeClass(n),this.adapter.removeClass(i))},l.prototype.setRequired=function(t){var e=l.cssClasses.LABEL_REQUIRED;t?this.adapter.addClass(e):this.adapter.removeClass(e)},l.prototype.handleShakeAnimationEnd_=function(){var t=l.cssClasses.LABEL_SHAKE;this.adapter.removeClass(t)},l);function l(t){var e=s.call(this,o(o({},l.defaultAdapter),t))||this;return e.shakeAnimationEndHandler_=function(){return e.handleShakeAnimationEnd_()},e}e.MDCFloatingLabelFoundation=u,e.default=u},function(t,e,n){"use strict";var i,r=this&&this.__extends||(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)});Object.defineProperty(e,"__esModule",{value:!0});var o,s=n(1),a=n(63),c=(o=s.MDCComponent,r(u,o),u.attachTo=function(t){return new u(t)},u.prototype.activate=function(){this.foundation.activate()},u.prototype.deactivate=function(){this.foundation.deactivate()},u.prototype.setRippleCenter=function(t){this.foundation.setRippleCenter(t)},u.prototype.getDefaultFoundation=function(){var n=this,t={addClass:function(t){return n.root.classList.add(t)},removeClass:function(t){return n.root.classList.remove(t)},hasClass:function(t){return n.root.classList.contains(t)},setStyle:function(t,e){return n.root.style.setProperty(t,e)},registerEventHandler:function(t,e){return n.listen(t,e)},deregisterEventHandler:function(t,e){return n.unlisten(t,e)}};return new a.MDCLineRippleFoundation(t)},u);function u(){return null!==o&&o.apply(this,arguments)||this}e.MDCLineRipple=c},function(t,e,n){"use strict";var i,r=this&&this.__extends||(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)});Object.defineProperty(e,"__esModule",{value:!0});var o,s=n(1),a=n(26),c=n(29),u=n(71),l=(o=s.MDCComponent,r(d,o),d.attachTo=function(t){return new d(t)},d.prototype.initialSyncWithDOM=function(){this.notchElement_=this.root.querySelector(c.strings.NOTCH_ELEMENT_SELECTOR);var t=this.root.querySelector("."+a.MDCFloatingLabelFoundation.cssClasses.ROOT);t?(t.style.transitionDuration="0s",this.root.classList.add(c.cssClasses.OUTLINE_UPGRADED),requestAnimationFrame(function(){t.style.transitionDuration=""})):this.root.classList.add(c.cssClasses.NO_LABEL)},d.prototype.notch=function(t){this.foundation.notch(t)},d.prototype.closeNotch=function(){this.foundation.closeNotch()},d.prototype.getDefaultFoundation=function(){var e=this,t={addClass:function(t){return e.root.classList.add(t)},removeClass:function(t){return e.root.classList.remove(t)},setNotchWidthProperty:function(t){return e.notchElement_.style.setProperty("width",t+"px")},removeNotchWidthProperty:function(){return e.notchElement_.style.removeProperty("width")}};return new u.MDCNotchedOutlineFoundation(t)},d);function d(){return null!==o&&o.apply(this,arguments)||this}e.MDCNotchedOutline=l},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.strings={NOTCH_ELEMENT_SELECTOR:".mdc-notched-outline__notch"};e.numbers={NOTCH_ELEMENT_PADDING:8};e.cssClasses={NO_LABEL:"mdc-notched-outline--no-label",OUTLINE_NOTCHED:"mdc-notched-outline--notched",OUTLINE_UPGRADED:"mdc-notched-outline--upgraded"}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i={ACTIVATED:"mdc-select--activated",DISABLED:"mdc-select--disabled",FOCUSED:"mdc-select--focused",INVALID:"mdc-select--invalid",MENU_INVALID:"mdc-select__menu--invalid",OUTLINED:"mdc-select--outlined",REQUIRED:"mdc-select--required",ROOT:"mdc-select",SELECTED_ITEM_CLASS:"mdc-list-item--selected",WITH_LEADING_ICON:"mdc-select--with-leading-icon"},r={ARIA_CONTROLS:"aria-controls",ARIA_SELECTED_ATTR:"aria-selected",CHANGE_EVENT:"MDCSelect:change",LABEL_SELECTOR:".mdc-floating-label",LEADING_ICON_SELECTOR:".mdc-select__icon",LINE_RIPPLE_SELECTOR:".mdc-line-ripple",MENU_SELECTOR:".mdc-select__menu",OUTLINE_SELECTOR:".mdc-notched-outline",SELECTED_ITEM_SELECTOR:"."+(e.cssClasses=i).SELECTED_ITEM_CLASS,SELECTED_TEXT_SELECTOR:".mdc-select__selected-text",SELECT_ANCHOR_SELECTOR:".mdc-select__anchor",VALUE_ATTR:"data-value"};e.strings=r;e.numbers={LABEL_SCALE:.75,UNSET_INDEX:-1}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.cssClasses={ACTIVE:"mdc-slider--active",DISABLED:"mdc-slider--disabled",DISCRETE:"mdc-slider--discrete",FOCUS:"mdc-slider--focus",HAS_TRACK_MARKER:"mdc-slider--display-markers",IN_TRANSIT:"mdc-slider--in-transit",IS_DISCRETE:"mdc-slider--discrete",DISABLE_TOUCH_ACTION:"mdc-slider--disable-touch-action"};e.strings={ARIA_DISABLED:"aria-disabled",ARIA_VALUEMAX:"aria-valuemax",ARIA_VALUEMIN:"aria-valuemin",ARIA_VALUENOW:"aria-valuenow",CHANGE_EVENT:"MDCSlider:change",INPUT_EVENT:"MDCSlider:input",PIN_VALUE_MARKER_SELECTOR:".mdc-slider__pin-value-marker",STEP_DATA_ATTR:"data-step",THUMB_CONTAINER_SELECTOR:".mdc-slider__thumb-container",TRACK_MARKER_CONTAINER_SELECTOR:".mdc-slider__track-marker-container",TRACK_SELECTOR:".mdc-slider__track"};e.numbers={PAGE_FACTOR:4}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.cssClasses={ANIMATING:"mdc-tab-scroller--animating",SCROLL_AREA_SCROLL:"mdc-tab-scroller__scroll-area--scroll",SCROLL_TEST:"mdc-tab-scroller__test"};e.strings={AREA_SELECTOR:".mdc-tab-scroller__scroll-area",CONTENT_SELECTOR:".mdc-tab-scroller__scroll-content"}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});function i(t){this.adapter=t}e.MDCTabScrollerRTL=i,e.default=i},function(t,e,n){"use strict";var i,r=this&&this.__extends||(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),o=this&&this.__assign||function(){return(o=Object.assign||function(t){for(var e,n=1,i=arguments.length;n<i;n++)for(var r in e=arguments[n])Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t}).apply(this,arguments)};Object.defineProperty(e,"__esModule",{value:!0});var s,a=n(0),c=n(94),u=(s=a.MDCFoundation,r(l,s),Object.defineProperty(l,"cssClasses",{get:function(){return c.cssClasses},enumerable:!0,configurable:!0}),Object.defineProperty(l,"strings",{get:function(){return c.strings},enumerable:!0,configurable:!0}),Object.defineProperty(l,"defaultAdapter",{get:function(){return{addClass:function(){},removeClass:function(){},hasClass:function(){return!1},setAttr:function(){},activateIndicator:function(){},deactivateIndicator:function(){},notifyInteracted:function(){},getOffsetLeft:function(){return 0},getOffsetWidth:function(){return 0},getContentOffsetLeft:function(){return 0},getContentOffsetWidth:function(){return 0},focus:function(){}}},enumerable:!0,configurable:!0}),l.prototype.handleClick=function(){this.adapter.notifyInteracted()},l.prototype.isActive=function(){return this.adapter.hasClass(c.cssClasses.ACTIVE)},l.prototype.setFocusOnActivate=function(t){this.focusOnActivate_=t},l.prototype.activate=function(t){this.adapter.addClass(c.cssClasses.ACTIVE),this.adapter.setAttr(c.strings.ARIA_SELECTED,"true"),this.adapter.setAttr(c.strings.TABINDEX,"0"),this.adapter.activateIndicator(t),this.focusOnActivate_&&this.adapter.focus()},l.prototype.deactivate=function(){this.isActive()&&(this.adapter.removeClass(c.cssClasses.ACTIVE),this.adapter.setAttr(c.strings.ARIA_SELECTED,"false"),this.adapter.setAttr(c.strings.TABINDEX,"-1"),this.adapter.deactivateIndicator())},l.prototype.computeDimensions=function(){var t=this.adapter.getOffsetWidth(),e=this.adapter.getOffsetLeft(),n=this.adapter.getContentOffsetWidth(),i=this.adapter.getContentOffsetLeft();return{contentLeft:e+i,contentRight:e+i+n,rootLeft:e,rootRight:e+t}},l);function l(t){var e=s.call(this,o(o({},l.defaultAdapter),t))||this;return e.focusOnActivate_=!0,e}e.MDCTabFoundation=u,e.default=u},function(t,e,n){"use strict";var i,r=this&&this.__extends||(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),o=this&&this.__assign||function(){return(o=Object.assign||function(t){for(var e,n=1,i=arguments.length;n<i;n++)for(var r in e=arguments[n])Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t}).apply(this,arguments)};Object.defineProperty(e,"__esModule",{value:!0});var s,a=n(0),c=n(98),u=(s=a.MDCFoundation,r(l,s),Object.defineProperty(l,"cssClasses",{get:function(){return c.cssClasses},enumerable:!0,configurable:!0}),Object.defineProperty(l,"strings",{get:function(){return c.strings},enumerable:!0,configurable:!0}),Object.defineProperty(l,"defaultAdapter",{get:function(){return{setContent:function(){}}},enumerable:!0,configurable:!0}),l.prototype.setCounterValue=function(t,e){t=Math.min(t,e),this.adapter.setContent(t+" / "+e)},l);function l(t){return s.call(this,o(o({},l.defaultAdapter),t))||this}e.MDCTextFieldCharacterCounterFoundation=u,e.default=u},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.strings={ARIA_CONTROLS:"aria-controls",INPUT_SELECTOR:".mdc-text-field__input",LABEL_SELECTOR:".mdc-floating-label",LEADING_ICON_SELECTOR:".mdc-text-field__icon--leading",LINE_RIPPLE_SELECTOR:".mdc-line-ripple",OUTLINE_SELECTOR:".mdc-notched-outline",PREFIX_SELECTOR:".mdc-text-field__affix--prefix",SUFFIX_SELECTOR:".mdc-text-field__affix--suffix",TRAILING_ICON_SELECTOR:".mdc-text-field__icon--trailing"};e.cssClasses={DISABLED:"mdc-text-field--disabled",FOCUSED:"mdc-text-field--focused",FULLWIDTH:"mdc-text-field--fullwidth",HELPER_LINE:"mdc-text-field-helper-line",INVALID:"mdc-text-field--invalid",LABEL_FLOATING:"mdc-text-field--label-floating",NO_LABEL:"mdc-text-field--no-label",OUTLINED:"mdc-text-field--outlined",ROOT:"mdc-text-field",TEXTAREA:"mdc-text-field--textarea",WITH_LEADING_ICON:"mdc-text-field--with-leading-icon",WITH_TRAILING_ICON:"mdc-text-field--with-trailing-icon"};e.numbers={LABEL_SCALE:.75};e.VALIDATION_ATTR_WHITELIST=["pattern","min","max","required","step","minlength","maxlength"];e.ALWAYS_FLOAT_TYPES=["color","date","datetime-local","month","range","time","week"]},function(t,e,n){"use strict";var i,r=this&&this.__extends||(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),o=this&&this.__assign||function(){return(o=Object.assign||function(t){for(var e,n=1,i=arguments.length;n<i;n++)for(var r in e=arguments[n])Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t}).apply(this,arguments)};Object.defineProperty(e,"__esModule",{value:!0});var s,a=n(0),c=n(101),u=(s=a.MDCFoundation,r(l,s),Object.defineProperty(l,"cssClasses",{get:function(){return c.cssClasses},enumerable:!0,configurable:!0}),Object.defineProperty(l,"strings",{get:function(){return c.strings},enumerable:!0,configurable:!0}),Object.defineProperty(l,"defaultAdapter",{get:function(){return{addClass:function(){},removeClass:function(){},hasClass:function(){return!1},setAttr:function(){},removeAttr:function(){},setContent:function(){}}},enumerable:!0,configurable:!0}),l.prototype.setContent=function(t){this.adapter.setContent(t)},l.prototype.setPersistent=function(t){t?this.adapter.addClass(c.cssClasses.HELPER_TEXT_PERSISTENT):this.adapter.removeClass(c.cssClasses.HELPER_TEXT_PERSISTENT)},l.prototype.setValidation=function(t){t?this.adapter.addClass(c.cssClasses.HELPER_TEXT_VALIDATION_MSG):this.adapter.removeClass(c.cssClasses.HELPER_TEXT_VALIDATION_MSG)},l.prototype.showToScreenReader=function(){this.adapter.removeAttr(c.strings.ARIA_HIDDEN)},l.prototype.setValidity=function(t){var e=this.adapter.hasClass(c.cssClasses.HELPER_TEXT_PERSISTENT),n=this.adapter.hasClass(c.cssClasses.HELPER_TEXT_VALIDATION_MSG)&&!t;n?this.adapter.setAttr(c.strings.ROLE,"alert"):this.adapter.removeAttr(c.strings.ROLE),e||n||this.hide_()},l.prototype.hide_=function(){this.adapter.setAttr(c.strings.ARIA_HIDDEN,"true")},l);function l(t){return s.call(this,o(o({},l.defaultAdapter),t))||this}e.MDCTextFieldHelperTextFoundation=u,e.default=u},function(t,e,n){"use strict";var i,r=this&&this.__extends||(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)});Object.defineProperty(e,"__esModule",{value:!0});var o,s=n(7),a=n(39),c=(o=a.MDCTopAppBarBaseFoundation,r(u,o),u.prototype.destroy=function(){o.prototype.destroy.call(this),this.adapter.setStyle("top","")},u.prototype.handleTargetScroll=function(){var t=Math.max(this.adapter.getViewportScrollY(),0),e=t-this.lastScrollPosition_;this.lastScrollPosition_=t,this.isCurrentlyBeingResized_||(this.currentAppBarOffsetTop_-=e,0<this.currentAppBarOffsetTop_?this.currentAppBarOffsetTop_=0:Math.abs(this.currentAppBarOffsetTop_)>this.topAppBarHeight_&&(this.currentAppBarOffsetTop_=-this.topAppBarHeight_),this.moveTopAppBar_())},u.prototype.handleWindowResize=function(){var t=this;this.resizeThrottleId_||(this.resizeThrottleId_=setTimeout(function(){t.resizeThrottleId_=0,t.throttledResizeHandler_()},s.numbers.DEBOUNCE_THROTTLE_RESIZE_TIME_MS)),this.isCurrentlyBeingResized_=!0,this.resizeDebounceId_&&clearTimeout(this.resizeDebounceId_),this.resizeDebounceId_=setTimeout(function(){t.handleTargetScroll(),t.isCurrentlyBeingResized_=!1,t.resizeDebounceId_=0},s.numbers.DEBOUNCE_THROTTLE_RESIZE_TIME_MS)},u.prototype.checkForUpdate_=function(){var t=-this.topAppBarHeight_,e=this.currentAppBarOffsetTop_<0,n=this.currentAppBarOffsetTop_>t,i=e&&n;if(i)this.wasDocked_=!1;else{if(!this.wasDocked_)return this.wasDocked_=!0;if(this.isDockedShowing_!==n)return this.isDockedShowing_=n,!0}return i},u.prototype.moveTopAppBar_=function(){if(this.checkForUpdate_()){var t=this.currentAppBarOffsetTop_;Math.abs(t)>=this.topAppBarHeight_&&(t=-s.numbers.MAX_TOP_APP_BAR_HEIGHT),this.adapter.setStyle("top",t+"px")}},u.prototype.throttledResizeHandler_=function(){var t=this.adapter.getTopAppBarHeight();this.topAppBarHeight_!==t&&(this.wasDocked_=!1,this.currentAppBarOffsetTop_-=this.topAppBarHeight_-t,this.topAppBarHeight_=t),this.handleTargetScroll()},u);function u(t){var e=o.call(this,t)||this;return e.wasDocked_=!0,e.isDockedShowing_=!0,e.currentAppBarOffsetTop_=0,e.isCurrentlyBeingResized_=!1,e.resizeThrottleId_=0,e.resizeDebounceId_=0,e.lastScrollPosition_=e.adapter.getViewportScrollY(),e.topAppBarHeight_=e.adapter.getTopAppBarHeight(),e}e.MDCTopAppBarFoundation=c,e.default=c},function(t,e,n){"use strict";var i,r=this&&this.__extends||(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),o=this&&this.__assign||function(){return(o=Object.assign||function(t){for(var e,n=1,i=arguments.length;n<i;n++)for(var r in e=arguments[n])Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t}).apply(this,arguments)};Object.defineProperty(e,"__esModule",{value:!0});var s,a=n(0),c=n(7),u=(s=a.MDCFoundation,r(l,s),Object.defineProperty(l,"strings",{get:function(){return c.strings},enumerable:!0,configurable:!0}),Object.defineProperty(l,"cssClasses",{get:function(){return c.cssClasses},enumerable:!0,configurable:!0}),Object.defineProperty(l,"numbers",{get:function(){return c.numbers},enumerable:!0,configurable:!0}),Object.defineProperty(l,"defaultAdapter",{get:function(){return{addClass:function(){},removeClass:function(){},hasClass:function(){return!1},setStyle:function(){},getTopAppBarHeight:function(){return 0},notifyNavigationIconClicked:function(){},getViewportScrollY:function(){return 0},getTotalActionItems:function(){return 0}}},enumerable:!0,configurable:!0}),l.prototype.handleTargetScroll=function(){},l.prototype.handleWindowResize=function(){},l.prototype.handleNavigationClick=function(){this.adapter.notifyNavigationIconClicked()},l);function l(t){return s.call(this,o(o({},l.defaultAdapter),t))||this}e.MDCTopAppBarBaseFoundation=u,e.default=u},function(t,e,n){"use strict";var i,r=this&&this.__extends||(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),o=this&&this.__assign||function(){return(o=Object.assign||function(t){for(var e,n=1,i=arguments.length;n<i;n++)for(var r in e=arguments[n])Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t}).apply(this,arguments)};Object.defineProperty(e,"__esModule",{value:!0});var s,a=n(17),c=n(1),u=n(5),l=n(2),d=n(3),p=n(4),f=n(19),h=n(42),_=["checked","indeterminate"],C=(s=c.MDCComponent,r(y,s),y.attachTo=function(t){return new y(t)},Object.defineProperty(y.prototype,"ripple",{get:function(){return this.ripple_},enumerable:!0,configurable:!0}),Object.defineProperty(y.prototype,"checked",{get:function(){return this.nativeControl_.checked},set:function(t){this.nativeControl_.checked=t},enumerable:!0,configurable:!0}),Object.defineProperty(y.prototype,"indeterminate",{get:function(){return this.nativeControl_.indeterminate},set:function(t){this.nativeControl_.indeterminate=t},enumerable:!0,configurable:!0}),Object.defineProperty(y.prototype,"disabled",{get:function(){return this.nativeControl_.disabled},set:function(t){this.foundation.setDisabled(t)},enumerable:!0,configurable:!0}),Object.defineProperty(y.prototype,"value",{get:function(){return this.nativeControl_.value},set:function(t){this.nativeControl_.value=t},enumerable:!0,configurable:!0}),y.prototype.initialize=function(){var t=f.strings.DATA_INDETERMINATE_ATTR;this.nativeControl_.indeterminate="true"===this.nativeControl_.getAttribute(t),this.nativeControl_.removeAttribute(t)},y.prototype.initialSyncWithDOM=function(){var t=this;this.handleChange_=function(){return t.foundation.handleChange()},this.handleAnimationEnd_=function(){return t.foundation.handleAnimationEnd()},this.nativeControl_.addEventListener("change",this.handleChange_),this.listen(a.getCorrectEventName(window,"animationend"),this.handleAnimationEnd_),this.installPropertyChangeHooks_()},y.prototype.destroy=function(){this.ripple_.destroy(),this.nativeControl_.removeEventListener("change",this.handleChange_),this.unlisten(a.getCorrectEventName(window,"animationend"),this.handleAnimationEnd_),this.uninstallPropertyChangeHooks_(),s.prototype.destroy.call(this)},y.prototype.getDefaultFoundation=function(){var n=this,t={addClass:function(t){return n.root.classList.add(t)},forceLayout:function(){return n.root.offsetWidth},hasNativeControl:function(){return!!n.nativeControl_},isAttachedToDOM:function(){return Boolean(n.root.parentNode)},isChecked:function(){return n.checked},isIndeterminate:function(){return n.indeterminate},removeClass:function(t){n.root.classList.remove(t)},removeNativeControlAttr:function(t){n.nativeControl_.removeAttribute(t)},setNativeControlAttr:function(t,e){n.nativeControl_.setAttribute(t,e)},setNativeControlDisabled:function(t){n.nativeControl_.disabled=t}};return new h.MDCCheckboxFoundation(t)},y.prototype.createRipple_=function(){var n=this,t=o(o({},d.MDCRipple.createAdapter(this)),{deregisterInteractionHandler:function(t,e){return n.nativeControl_.removeEventListener(t,e,u.applyPassive())},isSurfaceActive:function(){return l.matches(n.nativeControl_,":active")},isUnbounded:function(){return!0},registerInteractionHandler:function(t,e){return n.nativeControl_.addEventListener(t,e,u.applyPassive())}});return new d.MDCRipple(this.root,new p.MDCRippleFoundation(t))},y.prototype.installPropertyChangeHooks_=function(){var r=this,o=this.nativeControl_,s=Object.getPrototypeOf(o);_.forEach(function(t){var e=Object.getOwnPropertyDescriptor(s,t);if(E(e)){var n=e.get,i={configurable:e.configurable,enumerable:e.enumerable,get:n,set:function(t){e.set.call(o,t),r.foundation.handleChange()}};Object.defineProperty(o,t,i)}})},y.prototype.uninstallPropertyChangeHooks_=function(){var n=this.nativeControl_,i=Object.getPrototypeOf(n);_.forEach(function(t){var e=Object.getOwnPropertyDescriptor(i,t);E(e)&&Object.defineProperty(n,t,e)})},Object.defineProperty(y.prototype,"nativeControl_",{get:function(){var t=f.strings.NATIVE_CONTROL_SELECTOR,e=this.root.querySelector(t);if(!e)throw new Error("Checkbox component requires a "+t+" element");return e},enumerable:!0,configurable:!0}),y);function y(){var t=null!==s&&s.apply(this,arguments)||this;return t.ripple_=t.createRipple_(),t}function E(t){return!!t&&"function"==typeof t.set}e.MDCCheckbox=C},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.cssClasses={BG_FOCUSED:"mdc-ripple-upgraded--background-focused",FG_ACTIVATION:"mdc-ripple-upgraded--foreground-activation",FG_DEACTIVATION:"mdc-ripple-upgraded--foreground-deactivation",ROOT:"mdc-ripple-upgraded",UNBOUNDED:"mdc-ripple-upgraded--unbounded"},e.strings={VAR_FG_SCALE:"--mdc-ripple-fg-scale",VAR_FG_SIZE:"--mdc-ripple-fg-size",VAR_FG_TRANSLATE_END:"--mdc-ripple-fg-translate-end",VAR_FG_TRANSLATE_START:"--mdc-ripple-fg-translate-start",VAR_LEFT:"--mdc-ripple-left",VAR_TOP:"--mdc-ripple-top"},e.numbers={DEACTIVATION_TIMEOUT_MS:225,FG_DEACTIVATION_MS:150,INITIAL_ORIGIN_SCALE:.6,PADDING:10,TAP_DELAY_MS:300}},function(t,e,n){"use strict";var i,r=this&&this.__extends||(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),o=this&&this.__assign||function(){return(o=Object.assign||function(t){for(var e,n=1,i=arguments.length;n<i;n++)for(var r in e=arguments[n])Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t}).apply(this,arguments)};Object.defineProperty(e,"__esModule",{value:!0});var s,a=n(0),p=n(19),c=(s=a.MDCFoundation,r(f,s),Object.defineProperty(f,"cssClasses",{get:function(){return p.cssClasses},enumerable:!0,configurable:!0}),Object.defineProperty(f,"strings",{get:function(){return p.strings},enumerable:!0,configurable:!0}),Object.defineProperty(f,"numbers",{get:function(){return p.numbers},enumerable:!0,configurable:!0}),Object.defineProperty(f,"defaultAdapter",{get:function(){return{addClass:function(){},forceLayout:function(){},hasNativeControl:function(){return!1},isAttachedToDOM:function(){return!1},isChecked:function(){return!1},isIndeterminate:function(){return!1},removeClass:function(){},removeNativeControlAttr:function(){},setNativeControlAttr:function(){},setNativeControlDisabled:function(){}}},enumerable:!0,configurable:!0}),f.prototype.init=function(){this.currentCheckState_=this.determineCheckState_(),this.updateAriaChecked_(),this.adapter.addClass(p.cssClasses.UPGRADED)},f.prototype.destroy=function(){clearTimeout(this.animEndLatchTimer_)},f.prototype.setDisabled=function(t){this.adapter.setNativeControlDisabled(t),t?this.adapter.addClass(p.cssClasses.DISABLED):this.adapter.removeClass(p.cssClasses.DISABLED)},f.prototype.handleAnimationEnd=function(){var t=this;this.enableAnimationEndHandler_&&(clearTimeout(this.animEndLatchTimer_),this.animEndLatchTimer_=setTimeout(function(){t.adapter.removeClass(t.currentAnimationClass_),t.enableAnimationEndHandler_=!1},p.numbers.ANIM_END_LATCH_MS))},f.prototype.handleChange=function(){this.transitionCheckState_()},f.prototype.transitionCheckState_=function(){if(this.adapter.hasNativeControl()){var t=this.currentCheckState_,e=this.determineCheckState_();if(t!==e){this.updateAriaChecked_();var n=p.strings.TRANSITION_STATE_UNCHECKED,i=p.cssClasses.SELECTED;e===n?this.adapter.removeClass(i):this.adapter.addClass(i),0<this.currentAnimationClass_.length&&(clearTimeout(this.animEndLatchTimer_),this.adapter.forceLayout(),this.adapter.removeClass(this.currentAnimationClass_)),this.currentAnimationClass_=this.getTransitionAnimationClass_(t,e),this.currentCheckState_=e,this.adapter.isAttachedToDOM()&&0<this.currentAnimationClass_.length&&(this.adapter.addClass(this.currentAnimationClass_),this.enableAnimationEndHandler_=!0)}}},f.prototype.determineCheckState_=function(){var t=p.strings.TRANSITION_STATE_INDETERMINATE,e=p.strings.TRANSITION_STATE_CHECKED,n=p.strings.TRANSITION_STATE_UNCHECKED;return this.adapter.isIndeterminate()?t:this.adapter.isChecked()?e:n},f.prototype.getTransitionAnimationClass_=function(t,e){var n=p.strings.TRANSITION_STATE_INIT,i=p.strings.TRANSITION_STATE_CHECKED,r=p.strings.TRANSITION_STATE_UNCHECKED,o=f.cssClasses,s=o.ANIM_UNCHECKED_CHECKED,a=o.ANIM_UNCHECKED_INDETERMINATE,c=o.ANIM_CHECKED_UNCHECKED,u=o.ANIM_CHECKED_INDETERMINATE,l=o.ANIM_INDETERMINATE_CHECKED,d=o.ANIM_INDETERMINATE_UNCHECKED;switch(t){case n:return e===r?"":e===i?l:d;case r:return e===i?s:a;case i:return e===r?c:u;default:return e===i?l:d}},f.prototype.updateAriaChecked_=function(){this.adapter.isIndeterminate()?this.adapter.setNativeControlAttr(p.strings.ARIA_CHECKED_ATTR,p.strings.ARIA_CHECKED_INDETERMINATE_VALUE):this.adapter.removeNativeControlAttr(p.strings.ARIA_CHECKED_ATTR)},f);function f(t){var e=s.call(this,o(o({},f.defaultAdapter),t))||this;return e.currentCheckState_=p.strings.TRANSITION_STATE_INIT,e.currentAnimationClass_="",e.animEndLatchTimer_=0,e.enableAnimationEndHandler_=!1,e}e.MDCCheckboxFoundation=c,e.default=c},function(t,e,n){"use strict";var i,r=this&&this.__extends||(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)});Object.defineProperty(e,"__esModule",{value:!0});var o,s=n(1),a=n(3),c=n(4),u=n(10),l=n(44),d=(o=s.MDCComponent,r(p,o),Object.defineProperty(p.prototype,"ripple",{get:function(){return this.ripple_},enumerable:!0,configurable:!0}),p.attachTo=function(t){return new p(t)},p.prototype.initialize=function(t){void 0===t&&(t=function(t,e){return new a.MDCRipple(t,e)});var e=a.MDCRipple.createAdapter(this);this.ripple_=t(this.root,new c.MDCRippleFoundation(e))},p.prototype.initialSyncWithDOM=function(){var e=this;this.handleClick_=function(t){e.foundation.handleClick(t)},this.handleKeydown_=function(t){e.foundation.handleKeydown(t)},this.listen("click",this.handleClick_),this.listen("keydown",this.handleKeydown_)},p.prototype.destroy=function(){this.ripple_.destroy(),this.unlisten("click",this.handleClick_),this.unlisten("keydown",this.handleKeydown_),o.prototype.destroy.call(this)},p.prototype.getDefaultFoundation=function(){var n=this,t={focus:function(){n.root.focus()},getAttribute:function(t){return n.root.getAttribute(t)},notifyInteraction:function(t){return n.emit(u.strings.INTERACTION_EVENT,{trigger:t},!0)},notifyNavigation:function(t){n.emit(u.strings.NAVIGATION_EVENT,{key:t},!0)},setAttribute:function(t,e){n.root.setAttribute(t,e)}};return new l.MDCChipTrailingActionFoundation(t)},p.prototype.isNavigable=function(){return this.foundation.isNavigable()},p.prototype.focus=function(){this.foundation.focus()},p.prototype.removeFocus=function(){this.foundation.removeFocus()},p);function p(){return null!==o&&o.apply(this,arguments)||this}e.MDCChipTrailingAction=d},function(t,e,n){"use strict";var i,r=this&&this.__extends||(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),o=this&&this.__assign||function(){return(o=Object.assign||function(t){for(var e,n=1,i=arguments.length;n<i;n++)for(var r in e=arguments[n])Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t}).apply(this,arguments)};Object.defineProperty(e,"__esModule",{value:!0});var s,a=n(0),c=n(8),u=n(10),l=(s=a.MDCFoundation,r(d,s),Object.defineProperty(d,"strings",{get:function(){return u.strings},enumerable:!0,configurable:!0}),Object.defineProperty(d,"defaultAdapter",{get:function(){return{focus:function(){},getAttribute:function(){return null},setAttribute:function(){},notifyInteraction:function(){},notifyNavigation:function(){}}},enumerable:!0,configurable:!0}),d.prototype.handleClick=function(t){t.stopPropagation(),this.adapter.notifyInteraction(u.InteractionTrigger.CLICK)},d.prototype.handleKeydown=function(t){t.stopPropagation();var e=c.normalizeKey(t);if(this.shouldNotifyInteractionFromKey_(e)){var n=this.getTriggerFromKey_(e);this.adapter.notifyInteraction(n)}else c.isNavigationEvent(t)&&this.adapter.notifyNavigation(e)},d.prototype.removeFocus=function(){this.adapter.setAttribute(u.strings.TAB_INDEX,"-1")},d.prototype.focus=function(){this.adapter.setAttribute(u.strings.TAB_INDEX,"0"),this.adapter.focus()},d.prototype.isNavigable=function(){return"true"!==this.adapter.getAttribute(u.strings.ARIA_HIDDEN)},d.prototype.shouldNotifyInteractionFromKey_=function(t){var e=t===c.KEY.ENTER||t===c.KEY.SPACEBAR,n=t===c.KEY.BACKSPACE||t===c.KEY.DELETE;return e||n},d.prototype.getTriggerFromKey_=function(t){return t===c.KEY.SPACEBAR?u.InteractionTrigger.SPACEBAR_KEY:t===c.KEY.ENTER?u.InteractionTrigger.ENTER_KEY:t===c.KEY.DELETE?u.InteractionTrigger.DELETE_KEY:t===c.KEY.BACKSPACE?u.InteractionTrigger.BACKSPACE_KEY:u.InteractionTrigger.UNSPECIFIED},d);function d(t){return s.call(this,o(o({},d.defaultAdapter),t))||this}e.MDCChipTrailingActionFoundation=l,e.default=l},function(t,e,n){"use strict";var i,r=this&&this.__extends||(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),o=this&&this.__assign||function(){return(o=Object.assign||function(t){for(var e,n=1,i=arguments.length;n<i;n++)for(var r in e=arguments[n])Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t}).apply(this,arguments)};Object.defineProperty(e,"__esModule",{value:!0});var s,a=n(1),c=n(3),u=n(4),l=n(43),d=n(10),p=n(11),f=n(20),h=(s=a.MDCComponent,r(_,s),Object.defineProperty(_.prototype,"selected",{get:function(){return this.foundation.isSelected()},set:function(t){this.foundation.setSelected(t)},enumerable:!0,configurable:!0}),Object.defineProperty(_.prototype,"shouldRemoveOnTrailingIconClick",{get:function(){return this.foundation.getShouldRemoveOnTrailingIconClick()},set:function(t){this.foundation.setShouldRemoveOnTrailingIconClick(t)},enumerable:!0,configurable:!0}),Object.defineProperty(_.prototype,"setShouldFocusPrimaryActionOnClick",{set:function(t){this.foundation.setShouldFocusPrimaryActionOnClick(t)},enumerable:!0,configurable:!0}),Object.defineProperty(_.prototype,"ripple",{get:function(){return this.ripple_},enumerable:!0,configurable:!0}),Object.defineProperty(_.prototype,"id",{get:function(){return this.root.id},enumerable:!0,configurable:!0}),_.attachTo=function(t){return new _(t)},_.prototype.initialize=function(t,e){var n=this;void 0===t&&(t=function(t,e){return new c.MDCRipple(t,e)}),void 0===e&&(e=function(t){return new l.MDCChipTrailingAction(t)}),this.leadingIcon_=this.root.querySelector(p.strings.LEADING_ICON_SELECTOR),this.checkmark_=this.root.querySelector(p.strings.CHECKMARK_SELECTOR),this.primaryAction_=this.root.querySelector(p.strings.PRIMARY_ACTION_SELECTOR);var i=this.root.querySelector(p.strings.TRAILING_ACTION_SELECTOR);i&&(this.trailingAction_=e(i));var r=o(o({},c.MDCRipple.createAdapter(this)),{computeBoundingRect:function(){return n.foundation.getDimensions()}});this.ripple_=t(this.root,new u.MDCRippleFoundation(r))},_.prototype.initialSyncWithDOM=function(){var e=this;this.handleTrailingActionInteraction_=function(){e.foundation.handleTrailingActionInteraction()},this.handleTrailingActionNavigation_=function(t){e.foundation.handleTrailingActionNavigation(t)},this.handleClick_=function(){e.foundation.handleClick()},this.handleKeydown_=function(t){e.foundation.handleKeydown(t)},this.handleTransitionEnd_=function(t){e.foundation.handleTransitionEnd(t)},this.handleFocusIn_=function(t){e.foundation.handleFocusIn(t)},this.handleFocusOut_=function(t){e.foundation.handleFocusOut(t)},this.listen("transitionend",this.handleTransitionEnd_),this.listen("click",this.handleClick_),this.listen("keydown",this.handleKeydown_),this.listen("focusin",this.handleFocusIn_),this.listen("focusout",this.handleFocusOut_),this.trailingAction_&&(this.listen(d.strings.INTERACTION_EVENT,this.handleTrailingActionInteraction_),this.listen(d.strings.NAVIGATION_EVENT,this.handleTrailingActionNavigation_))},_.prototype.destroy=function(){this.ripple_.destroy(),this.unlisten("transitionend",this.handleTransitionEnd_),this.unlisten("keydown",this.handleKeydown_),this.unlisten("click",this.handleClick_),this.unlisten("focusin",this.handleFocusIn_),this.unlisten("focusout",this.handleFocusOut_),this.trailingAction_&&(this.unlisten(d.strings.INTERACTION_EVENT,this.handleTrailingActionInteraction_),this.unlisten(d.strings.NAVIGATION_EVENT,this.handleTrailingActionNavigation_)),s.prototype.destroy.call(this)},_.prototype.beginExit=function(){this.foundation.beginExit()},_.prototype.getDefaultFoundation=function(){var n=this,t={addClass:function(t){return n.root.classList.add(t)},addClassToLeadingIcon:function(t){n.leadingIcon_&&n.leadingIcon_.classList.add(t)},eventTargetHasClass:function(t,e){return!!t&&t.classList.contains(e)},focusPrimaryAction:function(){n.primaryAction_&&n.primaryAction_.focus()},focusTrailingAction:function(){n.trailingAction_&&n.trailingAction_.focus()},getAttribute:function(t){return n.root.getAttribute(t)},getCheckmarkBoundingClientRect:function(){return n.checkmark_?n.checkmark_.getBoundingClientRect():null},getComputedStyleValue:function(t){return window.getComputedStyle(n.root).getPropertyValue(t)},getRootBoundingClientRect:function(){return n.root.getBoundingClientRect()},hasClass:function(t){return n.root.classList.contains(t)},hasLeadingIcon:function(){return!!n.leadingIcon_},isRTL:function(){return"rtl"===window.getComputedStyle(n.root).getPropertyValue("direction")},isTrailingActionNavigable:function(){return!!n.trailingAction_&&n.trailingAction_.isNavigable()},notifyInteraction:function(){return n.emit(p.strings.INTERACTION_EVENT,{chipId:n.id},!0)},notifyNavigation:function(t,e){return n.emit(p.strings.NAVIGATION_EVENT,{chipId:n.id,key:t,source:e},!0)},notifyRemoval:function(t){n.emit(p.strings.REMOVAL_EVENT,{chipId:n.id,removedAnnouncement:t},!0)},notifySelection:function(t,e){return n.emit(p.strings.SELECTION_EVENT,{chipId:n.id,selected:t,shouldIgnore:e},!0)},notifyTrailingIconInteraction:function(){return n.emit(p.strings.TRAILING_ICON_INTERACTION_EVENT,{chipId:n.id},!0)},notifyEditStart:function(){},notifyEditFinish:function(){},removeClass:function(t){return n.root.classList.remove(t)},removeClassFromLeadingIcon:function(t){n.leadingIcon_&&n.leadingIcon_.classList.remove(t)},removeTrailingActionFocus:function(){n.trailingAction_&&n.trailingAction_.removeFocus()},setPrimaryActionAttr:function(t,e){n.primaryAction_&&n.primaryAction_.setAttribute(t,e)},setStyleProperty:function(t,e){return n.root.style.setProperty(t,e)}};return new f.MDCChipFoundation(t)},_.prototype.setSelectedFromChipSet=function(t,e){this.foundation.setSelectedFromChipSet(t,e)},_.prototype.focusPrimaryAction=function(){this.foundation.focusPrimaryAction()},_.prototype.focusTrailingAction=function(){this.foundation.focusTrailingAction()},_.prototype.removeFocus=function(){this.foundation.removeFocus()},_.prototype.remove=function(){var t=this.root.parentNode;null!==t&&t.removeChild(this.root)},_);function _(){return null!==s&&s.apply(this,arguments)||this}e.MDCChip=h},function(t,e,n){"use strict";var i,r=this&&this.__extends||(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),o=this&&this.__assign||function(){return(o=Object.assign||function(t){for(var e,n=1,i=arguments.length;n<i;n++)for(var r in e=arguments[n])Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t}).apply(this,arguments)};Object.defineProperty(e,"__esModule",{value:!0});var s,a=n(0),f=n(11),c=n(47),u=(s=a.MDCFoundation,r(l,s),Object.defineProperty(l,"strings",{get:function(){return c.strings},enumerable:!0,configurable:!0}),Object.defineProperty(l,"cssClasses",{get:function(){return c.cssClasses},enumerable:!0,configurable:!0}),Object.defineProperty(l,"defaultAdapter",{get:function(){return{announceMessage:function(){},focusChipPrimaryActionAtIndex:function(){},focusChipTrailingActionAtIndex:function(){},getChipListCount:function(){return-1},getIndexOfChipById:function(){return-1},hasClass:function(){return!1},isRTL:function(){return!1},removeChipAtIndex:function(){},removeFocusFromChipAtIndex:function(){},selectChipAtIndex:function(){}}},enumerable:!0,configurable:!0}),l.prototype.getSelectedChipIds=function(){return this.selectedChipIds_.slice()},l.prototype.select=function(t){this.select_(t,!1)},l.prototype.handleChipInteraction=function(t){var e=t.chipId,n=this.adapter.getIndexOfChipById(e);this.removeFocusFromChipsExcept_(n),(this.adapter.hasClass(c.cssClasses.CHOICE)||this.adapter.hasClass(c.cssClasses.FILTER))&&this.toggleSelect_(e)},l.prototype.handleChipSelection=function(t){var e=t.chipId,n=t.selected;if(!t.shouldIgnore){var i=0<=this.selectedChipIds_.indexOf(e);n&&!i?this.select(e):!n&&i&&this.deselect_(e)}},l.prototype.handleChipRemoval=function(t){var e=t.chipId,n=t.removedAnnouncement;n&&this.adapter.announceMessage(n);var i=this.adapter.getIndexOfChipById(e);this.deselectAndNotifyClients_(e),this.adapter.removeChipAtIndex(i);var r=this.adapter.getChipListCount()-1,o=Math.min(i,r);this.removeFocusFromChipsExcept_(o),this.adapter.focusChipTrailingActionAtIndex(o)},l.prototype.handleChipNavigation=function(t){var e=t.chipId,n=t.key,i=t.source,r=this.adapter.getChipListCount()-1,o=this.adapter.getIndexOfChipById(e);if(-1!==o&&f.navigationKeys.has(n)){var s=this.adapter.isRTL(),a=n===f.strings.ARROW_LEFT_KEY||n===f.strings.IE_ARROW_LEFT_KEY,c=n===f.strings.ARROW_RIGHT_KEY||n===f.strings.IE_ARROW_RIGHT_KEY,u=n===f.strings.ARROW_DOWN_KEY||n===f.strings.IE_ARROW_DOWN_KEY,l=!s&&c||s&&a||u,d=n===f.strings.HOME_KEY,p=n===f.strings.END_KEY;l?o++:d?o=0:p?o=r:o--,o<0||r<o||(this.removeFocusFromChipsExcept_(o),this.focusChipAction_(o,n,i))}},l.prototype.focusChipAction_=function(t,e,n){var i=f.jumpChipKeys.has(e);if(i&&n===f.EventSource.PRIMARY)return this.adapter.focusChipPrimaryActionAtIndex(t);if(i&&n===f.EventSource.TRAILING)return this.adapter.focusChipTrailingActionAtIndex(t);var r=this.getDirection_(e);return r===f.Direction.LEFT?this.adapter.focusChipTrailingActionAtIndex(t):r===f.Direction.RIGHT?this.adapter.focusChipPrimaryActionAtIndex(t):void 0},l.prototype.getDirection_=function(t){var e=this.adapter.isRTL(),n=t===f.strings.ARROW_LEFT_KEY||t===f.strings.IE_ARROW_LEFT_KEY,i=t===f.strings.ARROW_RIGHT_KEY||t===f.strings.IE_ARROW_RIGHT_KEY;return!e&&n||e&&i?f.Direction.LEFT:f.Direction.RIGHT},l.prototype.deselect_=function(t,e){void 0===e&&(e=!1);var n=this.selectedChipIds_.indexOf(t);if(0<=n){this.selectedChipIds_.splice(n,1);var i=this.adapter.getIndexOfChipById(t);this.adapter.selectChipAtIndex(i,!1,e)}},l.prototype.deselectAndNotifyClients_=function(t){this.deselect_(t,!0)},l.prototype.toggleSelect_=function(t){0<=this.selectedChipIds_.indexOf(t)?this.deselectAndNotifyClients_(t):this.selectAndNotifyClients_(t)},l.prototype.removeFocusFromChipsExcept_=function(t){for(var e=this.adapter.getChipListCount(),n=0;n<e;n++)n!==t&&this.adapter.removeFocusFromChipAtIndex(n)},l.prototype.selectAndNotifyClients_=function(t){this.select_(t,!0)},l.prototype.select_=function(t,e){if(!(0<=this.selectedChipIds_.indexOf(t))){if(this.adapter.hasClass(c.cssClasses.CHOICE)&&0<this.selectedChipIds_.length){var n=this.selectedChipIds_[0],i=this.adapter.getIndexOfChipById(n);this.selectedChipIds_=[],this.adapter.selectChipAtIndex(i,!1,e)}this.selectedChipIds_.push(t);var r=this.adapter.getIndexOfChipById(t);this.adapter.selectChipAtIndex(r,!0,e)}},l);function l(t){var e=s.call(this,o(o({},l.defaultAdapter),t))||this;return e.selectedChipIds_=[],e}e.MDCChipSetFoundation=u,e.default=u},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.strings={CHIP_SELECTOR:".mdc-chip"},e.cssClasses={CHOICE:"mdc-chip-set--choice",FILTER:"mdc-chip-set--filter"}},function(t,e,n){"use strict";var i,r=this&&this.__extends||(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),o=this&&this.__assign||function(){return(o=Object.assign||function(t){for(var e,n=1,i=arguments.length;n<i;n++)for(var r in e=arguments[n])Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t}).apply(this,arguments)};Object.defineProperty(e,"__esModule",{value:!0});var s,a=n(0),c=n(49),u=(s=a.MDCFoundation,r(l,s),Object.defineProperty(l,"cssClasses",{get:function(){return c.cssClasses},enumerable:!0,configurable:!0}),Object.defineProperty(l,"strings",{get:function(){return c.strings},enumerable:!0,configurable:!0}),Object.defineProperty(l,"defaultAdapter",{get:function(){return{addClass:function(){},getDeterminateCircleAttribute:function(){return null},hasClass:function(){return!1},removeClass:function(){},removeAttribute:function(){},setAttribute:function(){},setDeterminateCircleAttribute:function(){}}},enumerable:!0,configurable:!0}),l.prototype.init=function(){this.isClosed_=this.adapter.hasClass(c.cssClasses.CLOSED_CLASS),this.isDeterminate_=!this.adapter.hasClass(c.cssClasses.INDETERMINATE_CLASS),this.progress_=0,this.isDeterminate_&&this.adapter.setAttribute(c.strings.ARIA_VALUENOW,this.progress_.toString()),this.radius_=Number(this.adapter.getDeterminateCircleAttribute(c.strings.RADIUS))},l.prototype.isDeterminate=function(){return this.isDeterminate_},l.prototype.getProgress=function(){return this.progress_},l.prototype.isClosed=function(){return this.isClosed_},l.prototype.setDeterminate=function(t){this.isDeterminate_=t,this.isDeterminate_?(this.adapter.removeClass(c.cssClasses.INDETERMINATE_CLASS),this.setProgress(this.progress_)):(this.adapter.addClass(c.cssClasses.INDETERMINATE_CLASS),this.adapter.removeAttribute(c.strings.ARIA_VALUENOW))},l.prototype.setProgress=function(t){if(this.progress_=t,this.isDeterminate_){var e=(1-this.progress_)*(2*Math.PI*this.radius_);this.adapter.setDeterminateCircleAttribute(c.strings.STROKE_DASHOFFSET,""+e),this.adapter.setAttribute(c.strings.ARIA_VALUENOW,this.progress_.toString())}},l.prototype.open=function(){this.isClosed_=!1,this.adapter.removeClass(c.cssClasses.CLOSED_CLASS)},l.prototype.close=function(){this.isClosed_=!0,this.adapter.addClass(c.cssClasses.CLOSED_CLASS)},l);function l(t){return s.call(this,o(o({},l.defaultAdapter),t))||this}e.MDCCircularProgressFoundation=u,e.default=u},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.cssClasses={INDETERMINATE_CLASS:"mdc-circular-progress--indeterminate",CLOSED_CLASS:"mdc-circular-progress--closed"},e.strings={DETERMINATE_CIRCLE_SELECTOR:".mdc-circular-progress__determinate-circle",ARIA_VALUENOW:"aria-valuenow",RADIUS:"r",STROKE_DASHOFFSET:"stroke-dashoffset"}},function(t,e,n){"use strict";var i,r=this&&this.__extends||(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),o=this&&this.__assign||function(){return(o=Object.assign||function(t){for(var e,n=1,i=arguments.length;n<i;n++)for(var r in e=arguments[n])Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t}).apply(this,arguments)},s=this&&this.__awaiter||function(t,s,a,c){return new(a=a||Promise)(function(e,n){function i(t){try{o(c.next(t))}catch(t){n(t)}}function r(t){try{o(c.throw(t))}catch(t){n(t)}}function o(t){t.done?e(t.value):function(e){return e instanceof a?e:new a(function(t){t(e)})}(t.value).then(i,r)}o((c=c.apply(t,s||[])).next())})},a=this&&this.__generator||function(n,i){var r,o,s,t,a={label:0,sent:function(){if(1&s[0])throw s[1];return s[1]},trys:[],ops:[]};return t={next:e(0),throw:e(1),return:e(2)},"function"==typeof Symbol&&(t[Symbol.iterator]=function(){return this}),t;function e(e){return function(t){return function(e){if(r)throw new TypeError("Generator is already executing.");for(;a;)try{if(r=1,o&&(s=2&e[0]?o.return:e[0]?o.throw||((s=o.return)&&s.call(o),0):o.next)&&!(s=s.call(o,e[1])).done)return s;switch(o=0,s&&(e=[2&e[0],s.value]),e[0]){case 0:case 1:s=e;break;case 4:return a.label++,{value:e[1],done:!1};case 5:a.label++,o=e[1],e=[0];continue;case 7:e=a.ops.pop(),a.trys.pop();continue;default:if(!(s=0<(s=a.trys).length&&s[s.length-1])&&(6===e[0]||2===e[0])){a=0;continue}if(3===e[0]&&(!s||e[1]>s[0]&&e[1]<s[3])){a.label=e[1];break}if(6===e[0]&&a.label<s[1]){a.label=s[1],s=e;break}if(s&&a.label<s[2]){a.label=s[2],a.ops.push(e);break}s[2]&&a.ops.pop(),a.trys.pop();continue}e=i.call(n,a)}catch(t){e=[6,t],o=0}finally{r=s=0}if(5&e[0])throw e[1];return{value:e[0]?e[1]:void 0,done:!0}}([e,t])}}};Object.defineProperty(e,"__esModule",{value:!0});var c,u=n(0),l=n(21),d=(c=u.MDCFoundation,r(p,c),Object.defineProperty(p,"defaultAdapter",{get:function(){return{addClass:function(){},addClassAtRowIndex:function(){},getAttributeByHeaderCellIndex:function(){return""},getHeaderCellCount:function(){return 0},getHeaderCellElements:function(){return[]},getRowCount:function(){return 0},getRowElements:function(){return[]},getRowIdAtIndex:function(){return""},getRowIndexByChildElement:function(){return 0},getSelectedRowCount:function(){return 0},getTableBodyHeight:function(){return""},getTableHeaderHeight:function(){return""},isCheckboxAtRowIndexChecked:function(){return!1},isHeaderRowCheckboxChecked:function(){return!1},isRowsSelectable:function(){return!1},notifyRowSelectionChanged:function(){},notifySelectedAll:function(){},notifySortAction:function(){},notifyUnselectedAll:function(){},registerHeaderRowCheckbox:function(){},registerRowCheckboxes:function(){},removeClass:function(){},removeClassAtRowIndex:function(){},removeClassNameByHeaderCellIndex:function(){},setAttributeAtRowIndex:function(){},setAttributeByHeaderCellIndex:function(){},setClassNameByHeaderCellIndex:function(){},setHeaderRowCheckboxChecked:function(){},setHeaderRowCheckboxIndeterminate:function(){},setProgressIndicatorStyles:function(){},setRowCheckboxCheckedAtIndex:function(){},setSortStatusLabelByHeaderCellIndex:function(){}}},enumerable:!0,configurable:!0}),p.prototype.layout=function(){this.adapter.isRowsSelectable()&&(this.adapter.registerHeaderRowCheckbox(),this.adapter.registerRowCheckboxes(),this.setHeaderRowCheckboxState())},p.prototype.layoutAsync=function(){return s(this,void 0,void 0,function(){return a(this,function(t){switch(t.label){case 0:return this.adapter.isRowsSelectable()?[4,this.adapter.registerHeaderRowCheckbox()]:[3,3];case 1:return t.sent(),[4,this.adapter.registerRowCheckboxes()];case 2:t.sent(),this.setHeaderRowCheckboxState(),t.label=3;case 3:return[2]}})})},p.prototype.getRows=function(){return this.adapter.getRowElements()},p.prototype.getHeaderCells=function(){return this.adapter.getHeaderCellElements()},p.prototype.setSelectedRowIds=function(t){for(var e=0;e<this.adapter.getRowCount();e++){var n=this.adapter.getRowIdAtIndex(e),i=!1;n&&0<=t.indexOf(n)&&(i=!0),this.adapter.setRowCheckboxCheckedAtIndex(e,i),this.selectRowAtIndex(e,i)}this.setHeaderRowCheckboxState()},p.prototype.getRowIds=function(){for(var t=[],e=0;e<this.adapter.getRowCount();e++)t.push(this.adapter.getRowIdAtIndex(e));return t},p.prototype.getSelectedRowIds=function(){for(var t=[],e=0;e<this.adapter.getRowCount();e++)this.adapter.isCheckboxAtRowIndexChecked(e)&&t.push(this.adapter.getRowIdAtIndex(e));return t},p.prototype.handleHeaderRowCheckboxChange=function(){for(var t=this.adapter.isHeaderRowCheckboxChecked(),e=0;e<this.adapter.getRowCount();e++)this.adapter.setRowCheckboxCheckedAtIndex(e,t),this.selectRowAtIndex(e,t);t?this.adapter.notifySelectedAll():this.adapter.notifyUnselectedAll()},p.prototype.handleRowCheckboxChange=function(t){var e=this.adapter.getRowIndexByChildElement(t.target);if(-1!==e){var n=this.adapter.isCheckboxAtRowIndexChecked(e);this.selectRowAtIndex(e,n),this.setHeaderRowCheckboxState();var i=this.adapter.getRowIdAtIndex(e);this.adapter.notifyRowSelectionChanged({rowId:i,rowIndex:e,selected:n})}},p.prototype.handleSortAction=function(t){for(var e=t.columnId,n=t.columnIndex,i=t.headerCell,r=0;r<this.adapter.getHeaderCellCount();r++)r!==n&&(this.adapter.removeClassNameByHeaderCellIndex(r,l.cssClasses.HEADER_CELL_SORTED),this.adapter.removeClassNameByHeaderCellIndex(r,l.cssClasses.HEADER_CELL_SORTED_DESCENDING),this.adapter.setAttributeByHeaderCellIndex(r,l.strings.ARIA_SORT,l.SortValue.NONE),this.adapter.setSortStatusLabelByHeaderCellIndex(r,l.SortValue.NONE));this.adapter.setClassNameByHeaderCellIndex(n,l.cssClasses.HEADER_CELL_SORTED);var o=this.adapter.getAttributeByHeaderCellIndex(n,l.strings.ARIA_SORT),s=l.SortValue.NONE;s=o===l.SortValue.ASCENDING?(this.adapter.setClassNameByHeaderCellIndex(n,l.cssClasses.HEADER_CELL_SORTED_DESCENDING),this.adapter.setAttributeByHeaderCellIndex(n,l.strings.ARIA_SORT,l.SortValue.DESCENDING),l.SortValue.DESCENDING):(o===l.SortValue.DESCENDING&&this.adapter.removeClassNameByHeaderCellIndex(n,l.cssClasses.HEADER_CELL_SORTED_DESCENDING),this.adapter.setAttributeByHeaderCellIndex(n,l.strings.ARIA_SORT,l.SortValue.ASCENDING),l.SortValue.ASCENDING),this.adapter.setSortStatusLabelByHeaderCellIndex(n,s),this.adapter.notifySortAction({columnId:e,columnIndex:n,headerCell:i,sortValue:s})},p.prototype.showProgress=function(){var t=this.adapter.getTableBodyHeight(),e=this.adapter.getTableHeaderHeight();this.adapter.setProgressIndicatorStyles({height:t,top:e}),this.adapter.addClass(l.cssClasses.IN_PROGRESS)},p.prototype.hideProgress=function(){this.adapter.removeClass(l.cssClasses.IN_PROGRESS)},p.prototype.setHeaderRowCheckboxState=function(){this.adapter.getSelectedRowCount()===this.adapter.getRowCount()?(this.adapter.setHeaderRowCheckboxChecked(!0),this.adapter.setHeaderRowCheckboxIndeterminate(!1)):(0===this.adapter.getSelectedRowCount()?this.adapter.setHeaderRowCheckboxIndeterminate(!1):this.adapter.setHeaderRowCheckboxIndeterminate(!0),this.adapter.setHeaderRowCheckboxChecked(!1))},p.prototype.selectRowAtIndex=function(t,e){e?(this.adapter.addClassAtRowIndex(t,l.cssClasses.ROW_SELECTED),this.adapter.setAttributeAtRowIndex(t,l.strings.ARIA_SELECTED,"true")):(this.adapter.removeClassAtRowIndex(t,l.cssClasses.ROW_SELECTED),this.adapter.setAttributeAtRowIndex(t,l.strings.ARIA_SELECTED,"false"))},p);function p(t){return c.call(this,o(o({},p.defaultAdapter),t))||this}e.MDCDataTableFoundation=d},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.createFocusTrapInstance=function(t,e,n){return e(t,{initialFocusEl:n})},e.isScrollable=function(t){return!!t&&t.scrollHeight>t.offsetHeight},e.areTopsMisaligned=function(t){var e=new Set;return[].forEach.call(t,function(t){return e.add(t.offsetTop)}),1<e.size}},function(t,e,n){"use strict";var i,r=this&&this.__extends||(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),o=this&&this.__assign||function(){return(o=Object.assign||function(t){for(var e,n=1,i=arguments.length;n<i;n++)for(var r in e=arguments[n])Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t}).apply(this,arguments)};Object.defineProperty(e,"__esModule",{value:!0});var s,a=n(0),c=n(53),u=(s=a.MDCFoundation,r(l,s),Object.defineProperty(l,"cssClasses",{get:function(){return c.cssClasses},enumerable:!0,configurable:!0}),Object.defineProperty(l,"strings",{get:function(){return c.strings},enumerable:!0,configurable:!0}),Object.defineProperty(l,"numbers",{get:function(){return c.numbers},enumerable:!0,configurable:!0}),Object.defineProperty(l,"defaultAdapter",{get:function(){return{addBodyClass:function(){},addClass:function(){},areButtonsStacked:function(){return!1},clickDefaultButton:function(){},eventTargetMatches:function(){return!1},getActionFromEvent:function(){return""},getInitialFocusEl:function(){return null},hasClass:function(){return!1},isContentScrollable:function(){return!1},notifyClosed:function(){},notifyClosing:function(){},notifyOpened:function(){},notifyOpening:function(){},releaseFocus:function(){},removeBodyClass:function(){},removeClass:function(){},reverseButtons:function(){},trapFocus:function(){}}},enumerable:!0,configurable:!0}),l.prototype.init=function(){this.adapter.hasClass(c.cssClasses.STACKED)&&this.setAutoStackButtons(!1)},l.prototype.destroy=function(){this.isOpen_&&this.close(c.strings.DESTROY_ACTION),this.animationTimer_&&(clearTimeout(this.animationTimer_),this.handleAnimationTimerEnd_()),this.layoutFrame_&&(cancelAnimationFrame(this.layoutFrame_),this.layoutFrame_=0)},l.prototype.open=function(){var t=this;this.isOpen_=!0,this.adapter.notifyOpening(),this.adapter.addClass(c.cssClasses.OPENING),this.runNextAnimationFrame_(function(){t.adapter.addClass(c.cssClasses.OPEN),t.adapter.addBodyClass(c.cssClasses.SCROLL_LOCK),t.layout(),t.animationTimer_=setTimeout(function(){t.handleAnimationTimerEnd_(),t.adapter.trapFocus(t.adapter.getInitialFocusEl()),t.adapter.notifyOpened()},c.numbers.DIALOG_ANIMATION_OPEN_TIME_MS)})},l.prototype.close=function(t){var e=this;void 0===t&&(t=""),this.isOpen_&&(this.isOpen_=!1,this.adapter.notifyClosing(t),this.adapter.addClass(c.cssClasses.CLOSING),this.adapter.removeClass(c.cssClasses.OPEN),this.adapter.removeBodyClass(c.cssClasses.SCROLL_LOCK),cancelAnimationFrame(this.animationFrame_),this.animationFrame_=0,clearTimeout(this.animationTimer_),this.animationTimer_=setTimeout(function(){e.adapter.releaseFocus(),e.handleAnimationTimerEnd_(),e.adapter.notifyClosed(t)},c.numbers.DIALOG_ANIMATION_CLOSE_TIME_MS))},l.prototype.isOpen=function(){return this.isOpen_},l.prototype.getEscapeKeyAction=function(){return this.escapeKeyAction_},l.prototype.setEscapeKeyAction=function(t){this.escapeKeyAction_=t},l.prototype.getScrimClickAction=function(){return this.scrimClickAction_},l.prototype.setScrimClickAction=function(t){this.scrimClickAction_=t},l.prototype.getAutoStackButtons=function(){return this.autoStackButtons_},l.prototype.setAutoStackButtons=function(t){this.autoStackButtons_=t},l.prototype.layout=function(){var t=this;this.layoutFrame_&&cancelAnimationFrame(this.layoutFrame_),this.layoutFrame_=requestAnimationFrame(function(){t.layoutInternal_(),t.layoutFrame_=0})},l.prototype.handleClick=function(t){if(this.adapter.eventTargetMatches(t.target,c.strings.SCRIM_SELECTOR)&&""!==this.scrimClickAction_)this.close(this.scrimClickAction_);else{var e=this.adapter.getActionFromEvent(t);e&&this.close(e)}},l.prototype.handleKeydown=function(t){var e="Enter"===t.key||13===t.keyCode;if(e&&!this.adapter.getActionFromEvent(t)){var n=!this.adapter.eventTargetMatches(t.target,c.strings.SUPPRESS_DEFAULT_PRESS_SELECTOR);e&&n&&this.adapter.clickDefaultButton()}},l.prototype.handleDocumentKeydown=function(t){"Escape"!==t.key&&27!==t.keyCode||""===this.escapeKeyAction_||this.close(this.escapeKeyAction_)},l.prototype.layoutInternal_=function(){this.autoStackButtons_&&this.detectStackedButtons_(),this.detectScrollableContent_()},l.prototype.handleAnimationTimerEnd_=function(){this.animationTimer_=0,this.adapter.removeClass(c.cssClasses.OPENING),this.adapter.removeClass(c.cssClasses.CLOSING)},l.prototype.runNextAnimationFrame_=function(t){var e=this;cancelAnimationFrame(this.animationFrame_),this.animationFrame_=requestAnimationFrame(function(){e.animationFrame_=0,clearTimeout(e.animationTimer_),e.animationTimer_=setTimeout(t,0)})},l.prototype.detectStackedButtons_=function(){this.adapter.removeClass(c.cssClasses.STACKED);var t=this.adapter.areButtonsStacked();t&&this.adapter.addClass(c.cssClasses.STACKED),t!==this.areButtonsStacked_&&(this.adapter.reverseButtons(),this.areButtonsStacked_=t)},l.prototype.detectScrollableContent_=function(){this.adapter.removeClass(c.cssClasses.SCROLLABLE),this.adapter.isContentScrollable()&&this.adapter.addClass(c.cssClasses.SCROLLABLE)},l);function l(t){var e=s.call(this,o(o({},l.defaultAdapter),t))||this;return e.isOpen_=!1,e.animationFrame_=0,e.animationTimer_=0,e.layoutFrame_=0,e.escapeKeyAction_=c.strings.CLOSE_ACTION,e.scrimClickAction_=c.strings.CLOSE_ACTION,e.autoStackButtons_=!0,e.areButtonsStacked_=!1,e}e.MDCDialogFoundation=u,e.default=u},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.cssClasses={CLOSING:"mdc-dialog--closing",OPEN:"mdc-dialog--open",OPENING:"mdc-dialog--opening",SCROLLABLE:"mdc-dialog--scrollable",SCROLL_LOCK:"mdc-dialog-scroll-lock",STACKED:"mdc-dialog--stacked"},e.strings={ACTION_ATTRIBUTE:"data-mdc-dialog-action",BUTTON_DEFAULT_ATTRIBUTE:"data-mdc-dialog-button-default",BUTTON_SELECTOR:".mdc-dialog__button",CLOSED_EVENT:"MDCDialog:closed",CLOSE_ACTION:"close",CLOSING_EVENT:"MDCDialog:closing",CONTAINER_SELECTOR:".mdc-dialog__container",CONTENT_SELECTOR:".mdc-dialog__content",DESTROY_ACTION:"destroy",INITIAL_FOCUS_ATTRIBUTE:"data-mdc-dialog-initial-focus",OPENED_EVENT:"MDCDialog:opened",OPENING_EVENT:"MDCDialog:opening",SCRIM_SELECTOR:".mdc-dialog__scrim",SUPPRESS_DEFAULT_PRESS_SELECTOR:["textarea",".mdc-menu .mdc-list-item"].join(", "),SURFACE_SELECTOR:".mdc-dialog__surface"},e.numbers={DIALOG_ANIMATION_CLOSE_TIME_MS:75,DIALOG_ANIMATION_OPEN_TIME_MS:150}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.createFocusTrapInstance=function(t,e){return e(t,{skipInitialFocus:!0})}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=["input","button","textarea","select"];e.preventDefaultEvent=function(t){var e=t.target;if(e){var n=(""+e.tagName).toLowerCase();-1===i.indexOf(n)&&t.preventDefault()}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.cssClasses={ANIMATE:"mdc-drawer--animate",CLOSING:"mdc-drawer--closing",DISMISSIBLE:"mdc-drawer--dismissible",MODAL:"mdc-drawer--modal",OPEN:"mdc-drawer--open",OPENING:"mdc-drawer--opening",ROOT:"mdc-drawer"};e.strings={APP_CONTENT_SELECTOR:".mdc-drawer-app-content",CLOSE_EVENT:"MDCDrawer:closed",OPEN_EVENT:"MDCDrawer:opened",SCRIM_SELECTOR:".mdc-drawer-scrim"}},function(t,e,n){"use strict";var i,r=this&&this.__extends||(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)});Object.defineProperty(e,"__esModule",{value:!0});var o,s=n(24),a=(o=s.MDCDismissibleDrawerFoundation,r(c,o),c.prototype.handleScrimClick=function(){this.close()},c.prototype.opened_=function(){this.adapter.trapFocus()},c.prototype.closed_=function(){this.adapter.releaseFocus()},c);function c(){return null!==o&&o.apply(this,arguments)||this}e.MDCModalDrawerFoundation=a,e.default=a},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.cssClasses={LABEL_FLOAT_ABOVE:"mdc-floating-label--float-above",LABEL_REQUIRED:"mdc-floating-label--required",LABEL_SHAKE:"mdc-floating-label--shake",ROOT:"mdc-floating-label"}},function(t,e,n){"use strict";var i,r=this&&this.__extends||(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),o=this&&this.__assign||function(){return(o=Object.assign||function(t){for(var e,n=1,i=arguments.length;n<i;n++)for(var r in e=arguments[n])Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t}).apply(this,arguments)};Object.defineProperty(e,"__esModule",{value:!0});var s,a=n(0),c=n(60),u=(s=a.MDCFoundation,r(l,s),Object.defineProperty(l,"cssClasses",{get:function(){return c.cssClasses},enumerable:!0,configurable:!0}),Object.defineProperty(l,"strings",{get:function(){return c.strings},enumerable:!0,configurable:!0}),Object.defineProperty(l,"defaultAdapter",{get:function(){return{activateInputRipple:function(){},deactivateInputRipple:function(){},deregisterInteractionHandler:function(){},registerInteractionHandler:function(){}}},enumerable:!0,configurable:!0}),l.prototype.init=function(){this.adapter.registerInteractionHandler("click",this.click)},l.prototype.destroy=function(){this.adapter.deregisterInteractionHandler("click",this.click)},l.prototype.handleClick=function(){var t=this;this.adapter.activateInputRipple(),requestAnimationFrame(function(){t.adapter.deactivateInputRipple()})},l);function l(t){var e=s.call(this,o(o({},l.defaultAdapter),t))||this;return e.click=function(){e.handleClick()},e}e.MDCFormFieldFoundation=u,e.default=u},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.cssClasses={ROOT:"mdc-form-field"},e.strings={LABEL_SELECTOR:".mdc-form-field > label"}},function(t,e,n){"use strict";var i,r=this&&this.__extends||(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),o=this&&this.__assign||function(){return(o=Object.assign||function(t){for(var e,n=1,i=arguments.length;n<i;n++)for(var r in e=arguments[n])Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t}).apply(this,arguments)};Object.defineProperty(e,"__esModule",{value:!0});var s,a=n(0),c=n(62),u=(s=a.MDCFoundation,r(l,s),Object.defineProperty(l,"cssClasses",{get:function(){return c.cssClasses},enumerable:!0,configurable:!0}),Object.defineProperty(l,"strings",{get:function(){return c.strings},enumerable:!0,configurable:!0}),Object.defineProperty(l,"defaultAdapter",{get:function(){return{addClass:function(){},hasClass:function(){return!1},notifyChange:function(){},removeClass:function(){},getAttr:function(){return null},setAttr:function(){}}},enumerable:!0,configurable:!0}),l.prototype.init=function(){var t=this.adapter.getAttr(c.strings.DATA_ARIA_LABEL_ON),e=this.adapter.getAttr(c.strings.DATA_ARIA_LABEL_OFF);if(t&&e){if(null!==this.adapter.getAttr(c.strings.ARIA_PRESSED))throw new Error("MDCIconButtonToggleFoundation: Button should not set `aria-pressed` if it has a toggled aria label.");this.hasToggledAriaLabel=!0}else this.adapter.setAttr(c.strings.ARIA_PRESSED,String(this.isOn()))},l.prototype.handleClick=function(){this.toggle(),this.adapter.notifyChange({isOn:this.isOn()})},l.prototype.isOn=function(){return this.adapter.hasClass(c.cssClasses.ICON_BUTTON_ON)},l.prototype.toggle=function(t){if(void 0===t&&(t=!this.isOn()),t?this.adapter.addClass(c.cssClasses.ICON_BUTTON_ON):this.adapter.removeClass(c.cssClasses.ICON_BUTTON_ON),this.hasToggledAriaLabel){var e=t?this.adapter.getAttr(c.strings.DATA_ARIA_LABEL_ON):this.adapter.getAttr(c.strings.DATA_ARIA_LABEL_OFF);this.adapter.setAttr(c.strings.ARIA_LABEL,e||"")}else this.adapter.setAttr(c.strings.ARIA_PRESSED,""+t)},l);function l(t){var e=s.call(this,o(o({},l.defaultAdapter),t))||this;return e.hasToggledAriaLabel=!1,e}e.MDCIconButtonToggleFoundation=u,e.default=u},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.cssClasses={ICON_BUTTON_ON:"mdc-icon-button--on",ROOT:"mdc-icon-button"},e.strings={ARIA_LABEL:"aria-label",ARIA_PRESSED:"aria-pressed",DATA_ARIA_LABEL_OFF:"data-aria-label-off",DATA_ARIA_LABEL_ON:"data-aria-label-on",CHANGE_EVENT:"MDCIconButtonToggle:change"}},function(t,e,n){"use strict";var i,r=this&&this.__extends||(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),o=this&&this.__assign||function(){return(o=Object.assign||function(t){for(var e,n=1,i=arguments.length;n<i;n++)for(var r in e=arguments[n])Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t}).apply(this,arguments)};Object.defineProperty(e,"__esModule",{value:!0});var s,a=n(0),c=n(64),u=(s=a.MDCFoundation,r(l,s),Object.defineProperty(l,"cssClasses",{get:function(){return c.cssClasses},enumerable:!0,configurable:!0}),Object.defineProperty(l,"defaultAdapter",{get:function(){return{addClass:function(){},removeClass:function(){},hasClass:function(){return!1},setStyle:function(){},registerEventHandler:function(){},deregisterEventHandler:function(){}}},enumerable:!0,configurable:!0}),l.prototype.init=function(){this.adapter.registerEventHandler("transitionend",this.transitionEndHandler_)},l.prototype.destroy=function(){this.adapter.deregisterEventHandler("transitionend",this.transitionEndHandler_)},l.prototype.activate=function(){this.adapter.removeClass(c.cssClasses.LINE_RIPPLE_DEACTIVATING),this.adapter.addClass(c.cssClasses.LINE_RIPPLE_ACTIVE)},l.prototype.setRippleCenter=function(t){this.adapter.setStyle("transform-origin",t+"px center")},l.prototype.deactivate=function(){this.adapter.addClass(c.cssClasses.LINE_RIPPLE_DEACTIVATING)},l.prototype.handleTransitionEnd=function(t){var e=this.adapter.hasClass(c.cssClasses.LINE_RIPPLE_DEACTIVATING);"opacity"===t.propertyName&&e&&(this.adapter.removeClass(c.cssClasses.LINE_RIPPLE_ACTIVE),this.adapter.removeClass(c.cssClasses.LINE_RIPPLE_DEACTIVATING))},l);function l(t){var e=s.call(this,o(o({},l.defaultAdapter),t))||this;return e.transitionEndHandler_=function(t){return e.handleTransitionEnd(t)},e}e.MDCLineRippleFoundation=u,e.default=u},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.cssClasses={LINE_RIPPLE_ACTIVE:"mdc-line-ripple--active",LINE_RIPPLE_DEACTIVATING:"mdc-line-ripple--deactivating"}},function(t,e,n){"use strict";var i,r=this&&this.__extends||(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),o=this&&this.__assign||function(){return(o=Object.assign||function(t){for(var e,n=1,i=arguments.length;n<i;n++)for(var r in e=arguments[n])Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t}).apply(this,arguments)};Object.defineProperty(e,"__esModule",{value:!0});var s,a=n(17),c=n(0),u=n(66),l=(s=c.MDCFoundation,r(d,s),Object.defineProperty(d,"cssClasses",{get:function(){return u.cssClasses},enumerable:!0,configurable:!0}),Object.defineProperty(d,"strings",{get:function(){return u.strings},enumerable:!0,configurable:!0}),Object.defineProperty(d,"defaultAdapter",{get:function(){return{addClass:function(){},forceLayout:function(){},setBufferBarStyle:function(){return null},setPrimaryBarStyle:function(){return null},hasClass:function(){return!1},removeAttribute:function(){},removeClass:function(){},setAttribute:function(){}}},enumerable:!0,configurable:!0}),d.prototype.init=function(){this.isDeterminate=!this.adapter.hasClass(u.cssClasses.INDETERMINATE_CLASS),this.isReversed=this.adapter.hasClass(u.cssClasses.REVERSED_CLASS),this.progress=0,this.buffer=1},d.prototype.setDeterminate=function(t){if(this.isDeterminate=t,this.isDeterminate)return this.adapter.removeClass(u.cssClasses.INDETERMINATE_CLASS),this.adapter.setAttribute(u.strings.ARIA_VALUENOW,this.progress.toString()),this.setPrimaryBarProgress(this.progress),void this.setBufferBarProgress(this.buffer);this.isReversed&&(this.adapter.removeClass(u.cssClasses.REVERSED_CLASS),this.adapter.forceLayout(),this.adapter.addClass(u.cssClasses.REVERSED_CLASS)),this.adapter.addClass(u.cssClasses.INDETERMINATE_CLASS),this.adapter.removeAttribute(u.strings.ARIA_VALUENOW),this.setPrimaryBarProgress(1),this.setBufferBarProgress(1)},d.prototype.getDeterminate=function(){return this.isDeterminate},d.prototype.setProgress=function(t){this.progress=t,this.isDeterminate&&(this.setPrimaryBarProgress(t),this.adapter.setAttribute(u.strings.ARIA_VALUENOW,t.toString()))},d.prototype.getProgress=function(){return this.progress},d.prototype.setBuffer=function(t){this.buffer=t,this.isDeterminate&&this.setBufferBarProgress(t)},d.prototype.setReverse=function(t){this.isReversed=t,this.isDeterminate||(this.adapter.removeClass(u.cssClasses.INDETERMINATE_CLASS),this.adapter.forceLayout(),this.adapter.addClass(u.cssClasses.INDETERMINATE_CLASS)),this.isReversed?this.adapter.addClass(u.cssClasses.REVERSED_CLASS):this.adapter.removeClass(u.cssClasses.REVERSED_CLASS)},d.prototype.open=function(){this.adapter.removeClass(u.cssClasses.CLOSED_CLASS)},d.prototype.close=function(){this.adapter.addClass(u.cssClasses.CLOSED_CLASS)},d.prototype.setPrimaryBarProgress=function(t){var e="scaleX("+t+")",n="undefined"!=typeof window?a.getCorrectPropertyName(window,"transform"):"transform";this.adapter.setPrimaryBarStyle(n,e)},d.prototype.setBufferBarProgress=function(t){var e=100*t+"%";this.adapter.setBufferBarStyle(u.strings.FLEX_BASIS,e)},d);function d(t){return s.call(this,o(o({},d.defaultAdapter),t))||this}e.MDCLinearProgressFoundation=l,e.default=l},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.cssClasses={CLOSED_CLASS:"mdc-linear-progress--closed",INDETERMINATE_CLASS:"mdc-linear-progress--indeterminate",REVERSED_CLASS:"mdc-linear-progress--reversed"},e.strings={ARIA_VALUENOW:"aria-valuenow",BUFFER_BAR_SELECTOR:".mdc-linear-progress__buffer-bar",FLEX_BASIS:"flex-basis",PRIMARY_BAR_SELECTOR:".mdc-linear-progress__primary-bar"}},function(t,e,n){"use strict";var i;Object.defineProperty(e,"__esModule",{value:!0}),e.getTransformPropertyName=function(t,e){if(void 0===e&&(e=!1),void 0===i||e){var n=t.document.createElement("div");i="transform"in n.style?"transform":"webkitTransform"}return i}},function(t,e,n){"use strict";var i,r=this&&this.__extends||(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),o=this&&this.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e};Object.defineProperty(e,"__esModule",{value:!0});var s,a=n(1),c=n(6),u=n(13),l=o(n(67)),d=(s=a.MDCComponent,r(p,s),p.attachTo=function(t){return new p(t)},p.prototype.initialSyncWithDOM=function(){var e=this,t=this.root.parentElement;this.anchorElement=t&&t.classList.contains(c.cssClasses.ANCHOR)?t:null,this.root.classList.contains(c.cssClasses.FIXED)&&this.setFixedPosition(!0),this.handleKeydown=function(t){e.foundation.handleKeydown(t)},this.handleBodyClick=function(t){e.foundation.handleBodyClick(t)},this.registerBodyClickListener=function(){document.body.addEventListener("click",e.handleBodyClick,{capture:!0})},this.deregisterBodyClickListener=function(){document.body.removeEventListener("click",e.handleBodyClick)},this.listen("keydown",this.handleKeydown),this.listen(c.strings.OPENED_EVENT,this.registerBodyClickListener),this.listen(c.strings.CLOSED_EVENT,this.deregisterBodyClickListener)},p.prototype.destroy=function(){this.unlisten("keydown",this.handleKeydown),this.unlisten(c.strings.OPENED_EVENT,this.registerBodyClickListener),this.unlisten(c.strings.CLOSED_EVENT,this.deregisterBodyClickListener),s.prototype.destroy.call(this)},p.prototype.isOpen=function(){return this.foundation.isOpen()},p.prototype.open=function(){this.foundation.open()},p.prototype.close=function(t){void 0===t&&(t=!1),this.foundation.close(t)},Object.defineProperty(p.prototype,"quickOpen",{set:function(t){this.foundation.setQuickOpen(t)},enumerable:!0,configurable:!0}),p.prototype.setIsHoisted=function(t){this.foundation.setIsHoisted(t)},p.prototype.setMenuSurfaceAnchorElement=function(t){this.anchorElement=t},p.prototype.setFixedPosition=function(t){t?this.root.classList.add(c.cssClasses.FIXED):this.root.classList.remove(c.cssClasses.FIXED),this.foundation.setFixedPosition(t)},p.prototype.setAbsolutePosition=function(t,e){this.foundation.setAbsolutePosition(t,e),this.setIsHoisted(!0)},p.prototype.setAnchorCorner=function(t){this.foundation.setAnchorCorner(t)},p.prototype.setAnchorMargin=function(t){this.foundation.setAnchorMargin(t)},p.prototype.getDefaultFoundation=function(){var n=this,t={addClass:function(t){return n.root.classList.add(t)},removeClass:function(t){return n.root.classList.remove(t)},hasClass:function(t){return n.root.classList.contains(t)},hasAnchor:function(){return!!n.anchorElement},notifyClose:function(){return n.emit(u.MDCMenuSurfaceFoundation.strings.CLOSED_EVENT,{})},notifyOpen:function(){return n.emit(u.MDCMenuSurfaceFoundation.strings.OPENED_EVENT,{})},isElementInContainer:function(t){return n.root.contains(t)},isRtl:function(){return"rtl"===getComputedStyle(n.root).getPropertyValue("direction")},setTransformOrigin:function(t){var e=l.getTransformPropertyName(window)+"-origin";n.root.style.setProperty(e,t)},isFocused:function(){return document.activeElement===n.root},saveFocus:function(){n.previousFocus=document.activeElement},restoreFocus:function(){n.root.contains(document.activeElement)&&n.previousFocus&&n.previousFocus.focus&&n.previousFocus.focus()},getInnerDimensions:function(){return{width:n.root.offsetWidth,height:n.root.offsetHeight}},getAnchorDimensions:function(){return n.anchorElement?n.anchorElement.getBoundingClientRect():null},getWindowDimensions:function(){return{width:window.innerWidth,height:window.innerHeight}},getBodyDimensions:function(){return{width:document.body.clientWidth,height:document.body.clientHeight}},getWindowScroll:function(){return{x:window.pageXOffset,y:window.pageYOffset}},setPosition:function(t){var e=n.root;e.style.left="left"in t?t.left+"px":"",e.style.right="right"in t?t.right+"px":"",e.style.top="top"in t?t.top+"px":"",e.style.bottom="bottom"in t?t.bottom+"px":""},setMaxHeight:function(t){n.root.style.maxHeight=t}};return new u.MDCMenuSurfaceFoundation(t)},p);function p(){return null!==s&&s.apply(this,arguments)||this}e.MDCMenuSurface=d},function(t,e,n){"use strict";var i,r=this&&this.__extends||(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)});Object.defineProperty(e,"__esModule",{value:!0});var o,s=n(1),a=n(2),c=n(23),u=n(12),l=n(68),d=n(13),p=n(14),f=n(70),h=(o=s.MDCComponent,r(_,o),_.attachTo=function(t){return new _(t)},_.prototype.initialize=function(t,e){void 0===t&&(t=function(t){return new l.MDCMenuSurface(t)}),void 0===e&&(e=function(t){return new c.MDCList(t)}),this.menuSurfaceFactory_=t,this.listFactory_=e},_.prototype.initialSyncWithDOM=function(){var e=this;this.menuSurface_=this.menuSurfaceFactory_(this.root);var t=this.root.querySelector(p.strings.LIST_SELECTOR);t?(this.list_=this.listFactory_(t),this.list_.wrapFocus=!0):this.list_=null,this.handleKeydown_=function(t){return e.foundation.handleKeydown(t)},this.handleItemAction_=function(t){return e.foundation.handleItemAction(e.items[t.detail.index])},this.handleMenuSurfaceOpened_=function(){return e.foundation.handleMenuSurfaceOpened()},this.menuSurface_.listen(d.MDCMenuSurfaceFoundation.strings.OPENED_EVENT,this.handleMenuSurfaceOpened_),this.listen("keydown",this.handleKeydown_),this.listen(u.MDCListFoundation.strings.ACTION_EVENT,this.handleItemAction_)},_.prototype.destroy=function(){this.list_&&this.list_.destroy(),this.menuSurface_.destroy(),this.menuSurface_.unlisten(d.MDCMenuSurfaceFoundation.strings.OPENED_EVENT,this.handleMenuSurfaceOpened_),this.unlisten("keydown",this.handleKeydown_),this.unlisten(u.MDCListFoundation.strings.ACTION_EVENT,this.handleItemAction_),o.prototype.destroy.call(this)},Object.defineProperty(_.prototype,"open",{get:function(){return this.menuSurface_.isOpen()},set:function(t){t?this.menuSurface_.open():this.menuSurface_.close()},enumerable:!0,configurable:!0}),Object.defineProperty(_.prototype,"wrapFocus",{get:function(){return!!this.list_&&this.list_.wrapFocus},set:function(t){this.list_&&(this.list_.wrapFocus=t)},enumerable:!0,configurable:!0}),Object.defineProperty(_.prototype,"hasTypeahead",{set:function(t){this.list_&&(this.list_.hasTypeahead=t)},enumerable:!0,configurable:!0}),Object.defineProperty(_.prototype,"typeaheadInProgress",{get:function(){return!!this.list_&&this.list_.typeaheadInProgress},enumerable:!0,configurable:!0}),_.prototype.typeaheadMatchItem=function(t,e){return this.list_?this.list_.typeaheadMatchItem(t,e):-1},_.prototype.layout=function(){this.list_&&this.list_.layout()},Object.defineProperty(_.prototype,"items",{get:function(){return this.list_?this.list_.listElements:[]},enumerable:!0,configurable:!0}),Object.defineProperty(_.prototype,"quickOpen",{set:function(t){this.menuSurface_.quickOpen=t},enumerable:!0,configurable:!0}),_.prototype.setDefaultFocusState=function(t){this.foundation.setDefaultFocusState(t)},_.prototype.setAnchorCorner=function(t){this.menuSurface_.setAnchorCorner(t)},_.prototype.setAnchorMargin=function(t){this.menuSurface_.setAnchorMargin(t)},_.prototype.setSelectedIndex=function(t){this.foundation.setSelectedIndex(t)},_.prototype.setEnabled=function(t,e){this.foundation.setEnabled(t,e)},_.prototype.getOptionByIndex=function(t){return t<this.items.length?this.items[t]:null},_.prototype.getPrimaryTextAtIndex=function(t){var e=this.getOptionByIndex(t);return e&&this.list_&&this.list_.getPrimaryText(e)||""},_.prototype.setFixedPosition=function(t){this.menuSurface_.setFixedPosition(t)},_.prototype.setIsHoisted=function(t){this.menuSurface_.setIsHoisted(t)},_.prototype.setAbsolutePosition=function(t,e){this.menuSurface_.setAbsolutePosition(t,e)},_.prototype.setAnchorElement=function(t){this.menuSurface_.anchorElement=t},_.prototype.getDefaultFoundation=function(){var i=this,t={addClassToElementAtIndex:function(t,e){i.items[t].classList.add(e)},removeClassFromElementAtIndex:function(t,e){i.items[t].classList.remove(e)},addAttributeToElementAtIndex:function(t,e,n){i.items[t].setAttribute(e,n)},removeAttributeFromElementAtIndex:function(t,e){i.items[t].removeAttribute(e)},elementContainsClass:function(t,e){return t.classList.contains(e)},closeSurface:function(t){return i.menuSurface_.close(t)},getElementIndex:function(t){return i.items.indexOf(t)},notifySelected:function(t){return i.emit(p.strings.SELECTED_EVENT,{index:t.index,item:i.items[t.index]})},getMenuItemCount:function(){return i.items.length},focusItemAtIndex:function(t){return i.items[t].focus()},focusListRoot:function(){return i.root.querySelector(p.strings.LIST_SELECTOR).focus()},isSelectableItemAtIndex:function(t){return!!a.closest(i.items[t],"."+p.cssClasses.MENU_SELECTION_GROUP)},getSelectedSiblingOfItemAtIndex:function(t){var e=a.closest(i.items[t],"."+p.cssClasses.MENU_SELECTION_GROUP).querySelector("."+p.cssClasses.MENU_SELECTED_LIST_ITEM);return e?i.items.indexOf(e):-1}};return new f.MDCMenuFoundation(t)},_);function _(){return null!==o&&o.apply(this,arguments)||this}e.MDCMenu=h},function(t,e,n){"use strict";var i,r=this&&this.__extends||(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),o=this&&this.__assign||function(){return(o=Object.assign||function(t){for(var e,n=1,i=arguments.length;n<i;n++)for(var r in e=arguments[n])Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t}).apply(this,arguments)};Object.defineProperty(e,"__esModule",{value:!0});var s,a=n(0),c=n(9),u=n(13),l=n(14),d=(s=a.MDCFoundation,r(p,s),Object.defineProperty(p,"cssClasses",{get:function(){return l.cssClasses},enumerable:!0,configurable:!0}),Object.defineProperty(p,"strings",{get:function(){return l.strings},enumerable:!0,configurable:!0}),Object.defineProperty(p,"numbers",{get:function(){return l.numbers},enumerable:!0,configurable:!0}),Object.defineProperty(p,"defaultAdapter",{get:function(){return{addClassToElementAtIndex:function(){},removeClassFromElementAtIndex:function(){},addAttributeToElementAtIndex:function(){},removeAttributeFromElementAtIndex:function(){},elementContainsClass:function(){return!1},closeSurface:function(){},getElementIndex:function(){return-1},notifySelected:function(){},getMenuItemCount:function(){return 0},focusItemAtIndex:function(){},focusListRoot:function(){},getSelectedSiblingOfItemAtIndex:function(){return-1},isSelectableItemAtIndex:function(){return!1}}},enumerable:!0,configurable:!0}),p.prototype.destroy=function(){this.closeAnimationEndTimerId_&&clearTimeout(this.closeAnimationEndTimerId_),this.adapter.closeSurface()},p.prototype.handleKeydown=function(t){var e=t.key,n=t.keyCode;"Tab"!==e&&9!==n||this.adapter.closeSurface(!0)},p.prototype.handleItemAction=function(e){var n=this,t=this.adapter.getElementIndex(e);t<0||(this.adapter.notifySelected({index:t}),this.adapter.closeSurface(),this.closeAnimationEndTimerId_=setTimeout(function(){var t=n.adapter.getElementIndex(e);0<=t&&n.adapter.isSelectableItemAtIndex(t)&&n.setSelectedIndex(t)},u.MDCMenuSurfaceFoundation.numbers.TRANSITION_CLOSE_DURATION))},p.prototype.handleMenuSurfaceOpened=function(){switch(this.defaultFocusState_){case l.DefaultFocusState.FIRST_ITEM:this.adapter.focusItemAtIndex(0);break;case l.DefaultFocusState.LAST_ITEM:this.adapter.focusItemAtIndex(this.adapter.getMenuItemCount()-1);break;case l.DefaultFocusState.NONE:break;default:this.adapter.focusListRoot()}},p.prototype.setDefaultFocusState=function(t){this.defaultFocusState_=t},p.prototype.setSelectedIndex=function(t){if(this.validatedIndex_(t),!this.adapter.isSelectableItemAtIndex(t))throw new Error("MDCMenuFoundation: No selection group at specified index.");var e=this.adapter.getSelectedSiblingOfItemAtIndex(t);0<=e&&(this.adapter.removeAttributeFromElementAtIndex(e,l.strings.ARIA_CHECKED_ATTR),this.adapter.removeClassFromElementAtIndex(e,l.cssClasses.MENU_SELECTED_LIST_ITEM)),this.adapter.addClassToElementAtIndex(t,l.cssClasses.MENU_SELECTED_LIST_ITEM),this.adapter.addAttributeToElementAtIndex(t,l.strings.ARIA_CHECKED_ATTR,"true")},p.prototype.setEnabled=function(t,e){this.validatedIndex_(t),e?(this.adapter.removeClassFromElementAtIndex(t,c.cssClasses.LIST_ITEM_DISABLED_CLASS),this.adapter.addAttributeToElementAtIndex(t,l.strings.ARIA_DISABLED_ATTR,"false")):(this.adapter.addClassToElementAtIndex(t,c.cssClasses.LIST_ITEM_DISABLED_CLASS),this.adapter.addAttributeToElementAtIndex(t,l.strings.ARIA_DISABLED_ATTR,"true"))},p.prototype.validatedIndex_=function(t){var e=this.adapter.getMenuItemCount();if(!(0<=t&&t<e))throw new Error("MDCMenuFoundation: No list item at specified index.")},p);function p(t){var e=s.call(this,o(o({},p.defaultAdapter),t))||this;return e.closeAnimationEndTimerId_=0,e.defaultFocusState_=l.DefaultFocusState.LIST_ROOT,e}e.MDCMenuFoundation=d,e.default=d},function(t,e,n){"use strict";var i,r=this&&this.__extends||(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),o=this&&this.__assign||function(){return(o=Object.assign||function(t){for(var e,n=1,i=arguments.length;n<i;n++)for(var r in e=arguments[n])Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t}).apply(this,arguments)};Object.defineProperty(e,"__esModule",{value:!0});var s,a=n(0),c=n(29),u=(s=a.MDCFoundation,r(l,s),Object.defineProperty(l,"strings",{get:function(){return c.strings},enumerable:!0,configurable:!0}),Object.defineProperty(l,"cssClasses",{get:function(){return c.cssClasses},enumerable:!0,configurable:!0}),Object.defineProperty(l,"numbers",{get:function(){return c.numbers},enumerable:!0,configurable:!0}),Object.defineProperty(l,"defaultAdapter",{get:function(){return{addClass:function(){},removeClass:function(){},setNotchWidthProperty:function(){},removeNotchWidthProperty:function(){}}},enumerable:!0,configurable:!0}),l.prototype.notch=function(t){var e=l.cssClasses.OUTLINE_NOTCHED;0<t&&(t+=c.numbers.NOTCH_ELEMENT_PADDING),this.adapter.setNotchWidthProperty(t),this.adapter.addClass(e)},l.prototype.closeNotch=function(){var t=l.cssClasses.OUTLINE_NOTCHED;this.adapter.removeClass(t),this.adapter.removeNotchWidthProperty()},l);function l(t){return s.call(this,o(o({},l.defaultAdapter),t))||this}e.MDCNotchedOutlineFoundation=u,e.default=u},function(t,e,n){"use strict";var i,r=this&&this.__extends||(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),o=this&&this.__assign||function(){return(o=Object.assign||function(t){for(var e,n=1,i=arguments.length;n<i;n++)for(var r in e=arguments[n])Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t}).apply(this,arguments)};Object.defineProperty(e,"__esModule",{value:!0});var s,a=n(0),c=n(73),u=(s=a.MDCFoundation,r(l,s),Object.defineProperty(l,"cssClasses",{get:function(){return c.cssClasses},enumerable:!0,configurable:!0}),Object.defineProperty(l,"strings",{get:function(){return c.strings},enumerable:!0,configurable:!0}),Object.defineProperty(l,"defaultAdapter",{get:function(){return{addClass:function(){},removeClass:function(){},setNativeControlDisabled:function(){}}},enumerable:!0,configurable:!0}),l.prototype.setDisabled=function(t){var e=l.cssClasses.DISABLED;this.adapter.setNativeControlDisabled(t),t?this.adapter.addClass(e):this.adapter.removeClass(e)},l);function l(t){return s.call(this,o(o({},l.defaultAdapter),t))||this}e.MDCRadioFoundation=u,e.default=u},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.strings={NATIVE_CONTROL_SELECTOR:".mdc-radio__native-control"};e.cssClasses={DISABLED:"mdc-radio--disabled",ROOT:"mdc-radio"}},function(t,e,n){"use strict";var i,r=this&&this.__extends||(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),o=this&&this.__assign||function(){return(o=Object.assign||function(t){for(var e,n=1,i=arguments.length;n<i;n++)for(var r in e=arguments[n])Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t}).apply(this,arguments)};Object.defineProperty(e,"__esModule",{value:!0});var s,a=n(0),c=n(8),u=n(6),l=n(30),d=(s=a.MDCFoundation,r(p,s),Object.defineProperty(p,"cssClasses",{get:function(){return l.cssClasses},enumerable:!0,configurable:!0}),Object.defineProperty(p,"numbers",{get:function(){return l.numbers},enumerable:!0,configurable:!0}),Object.defineProperty(p,"strings",{get:function(){return l.strings},enumerable:!0,configurable:!0}),Object.defineProperty(p,"defaultAdapter",{get:function(){return{addClass:function(){},removeClass:function(){},hasClass:function(){return!1},activateBottomLine:function(){},deactivateBottomLine:function(){},getSelectedMenuItem:function(){return null},hasLabel:function(){return!1},floatLabel:function(){},getLabelWidth:function(){return 0},setLabelRequired:function(){},hasOutline:function(){return!1},notchOutline:function(){},closeOutline:function(){},setRippleCenter:function(){},notifyChange:function(){},setSelectedText:function(){},isSelectAnchorFocused:function(){return!1},getSelectAnchorAttr:function(){return""},setSelectAnchorAttr:function(){},removeSelectAnchorAttr:function(){},addMenuClass:function(){},removeMenuClass:function(){},openMenu:function(){},closeMenu:function(){},getAnchorElement:function(){return null},setMenuAnchorElement:function(){},setMenuAnchorCorner:function(){},setMenuWrapFocus:function(){},setAttributeAtIndex:function(){},focusMenuItemAtIndex:function(){},getMenuItemCount:function(){return 0},getMenuItemValues:function(){return[]},getMenuItemTextAtIndex:function(){return""},getMenuItemAttr:function(){return""},addClassAtIndex:function(){},removeClassAtIndex:function(){},isTypeaheadInProgress:function(){return!1},typeaheadMatchItem:function(){return-1}}},enumerable:!0,configurable:!0}),p.prototype.getSelectedIndex=function(){return this.selectedIndex},p.prototype.setSelectedIndex=function(t,e){void 0===e&&(e=!1),t>=this.adapter.getMenuItemCount()||(this.removeSelectionAtIndex(this.selectedIndex),this.setSelectionAtIndex(t),e&&this.adapter.closeMenu(),this.handleChange())},p.prototype.setValue=function(t){var e=this.menuItemValues.indexOf(t);this.setSelectedIndex(e)},p.prototype.getValue=function(){var t=this.adapter.getSelectedMenuItem();return t&&this.adapter.getMenuItemAttr(t,l.strings.VALUE_ATTR)||""},p.prototype.getDisabled=function(){return this.disabled},p.prototype.setDisabled=function(t){this.disabled=t,this.disabled?(this.adapter.addClass(l.cssClasses.DISABLED),this.adapter.closeMenu()):this.adapter.removeClass(l.cssClasses.DISABLED),this.leadingIcon&&this.leadingIcon.setDisabled(this.disabled),this.disabled?this.adapter.removeSelectAnchorAttr("tabindex"):this.adapter.setSelectAnchorAttr("tabindex","0"),this.adapter.setSelectAnchorAttr("aria-disabled",this.disabled.toString())},p.prototype.openMenu=function(){this.adapter.addClass(l.cssClasses.ACTIVATED),this.adapter.openMenu(),this.isMenuOpen=!0,this.adapter.setSelectAnchorAttr("aria-expanded","true")},p.prototype.setHelperTextContent=function(t){this.helperText&&this.helperText.setContent(t)},p.prototype.layout=function(){if(this.adapter.hasLabel()){var t=0<this.getValue().length,e=this.adapter.hasClass(l.cssClasses.FOCUSED),n=t||e,i=this.adapter.hasClass(l.cssClasses.REQUIRED);this.notchOutline(n),this.adapter.floatLabel(n),this.adapter.setLabelRequired(i)}},p.prototype.layoutOptions=function(){this.menuItemValues=this.adapter.getMenuItemValues();var t=this.menuItemValues.indexOf(this.getValue());this.setSelectionAtIndex(t)},p.prototype.handleMenuOpened=function(){if(0!==this.menuItemValues.length){var t=0<=this.selectedIndex?this.selectedIndex:0;this.adapter.focusMenuItemAtIndex(t)}},p.prototype.handleMenuClosed=function(){this.adapter.removeClass(l.cssClasses.ACTIVATED),this.isMenuOpen=!1,this.adapter.setSelectAnchorAttr("aria-expanded","false"),this.adapter.isSelectAnchorFocused()||this.blur()},p.prototype.handleChange=function(){this.layout(),this.adapter.notifyChange(this.getValue()),this.adapter.hasClass(l.cssClasses.REQUIRED)&&this.useDefaultValidation&&(this.setValid(this.isValid()),this.helperText&&this.helperText.setValidity(this.isValid()))},p.prototype.handleMenuItemAction=function(t){this.setSelectedIndex(t,!0)},p.prototype.handleFocus=function(){this.adapter.addClass(l.cssClasses.FOCUSED),this.layout(),this.adapter.activateBottomLine()},p.prototype.handleBlur=function(){this.isMenuOpen||this.blur()},p.prototype.handleClick=function(t){this.disabled||(this.isMenuOpen?this.adapter.closeMenu():(this.adapter.setRippleCenter(t),this.openMenu()))},p.prototype.handleKeydown=function(t){if(!this.isMenuOpen&&this.adapter.hasClass(l.cssClasses.FOCUSED)){var e=c.normalizeKey(t)===c.KEY.ENTER,n=c.normalizeKey(t)===c.KEY.SPACEBAR,i=c.normalizeKey(t)===c.KEY.ARROW_UP,r=c.normalizeKey(t)===c.KEY.ARROW_DOWN;if(!n&&t.key&&1===t.key.length||n&&this.adapter.isTypeaheadInProgress()){var o=n?" ":t.key,s=this.adapter.typeaheadMatchItem(o,this.selectedIndex);return 0<=s&&this.setSelectedIndex(s),void t.preventDefault()}(e||n||i||r)&&(i&&0<this.selectedIndex?this.setSelectedIndex(this.selectedIndex-1):r&&this.selectedIndex<this.adapter.getMenuItemCount()-1&&this.setSelectedIndex(this.selectedIndex+1),this.openMenu(),t.preventDefault())}},p.prototype.notchOutline=function(t){if(this.adapter.hasOutline()){var e=this.adapter.hasClass(l.cssClasses.FOCUSED);if(t){var n=l.numbers.LABEL_SCALE,i=this.adapter.getLabelWidth()*n;this.adapter.notchOutline(i)}else e||this.adapter.closeOutline()}},p.prototype.setLeadingIconAriaLabel=function(t){this.leadingIcon&&this.leadingIcon.setAriaLabel(t)},p.prototype.setLeadingIconContent=function(t){this.leadingIcon&&this.leadingIcon.setContent(t)},p.prototype.setUseDefaultValidation=function(t){this.useDefaultValidation=t},p.prototype.setValid=function(t){this.useDefaultValidation||(this.customValidity=t),this.adapter.setSelectAnchorAttr("aria-invalid",(!t).toString()),t?(this.adapter.removeClass(l.cssClasses.INVALID),this.adapter.removeMenuClass(l.cssClasses.MENU_INVALID)):(this.adapter.addClass(l.cssClasses.INVALID),this.adapter.addMenuClass(l.cssClasses.MENU_INVALID))},p.prototype.isValid=function(){return this.useDefaultValidation&&this.adapter.hasClass(l.cssClasses.REQUIRED)&&!this.adapter.hasClass(l.cssClasses.DISABLED)?this.selectedIndex!==l.numbers.UNSET_INDEX&&(0!==this.selectedIndex||Boolean(this.getValue())):this.customValidity},p.prototype.setRequired=function(t){t?this.adapter.addClass(l.cssClasses.REQUIRED):this.adapter.removeClass(l.cssClasses.REQUIRED),this.adapter.setSelectAnchorAttr("aria-required",t.toString()),this.adapter.setLabelRequired(t)},p.prototype.getRequired=function(){return"true"===this.adapter.getSelectAnchorAttr("aria-required")},p.prototype.init=function(){var t=this.adapter.getAnchorElement();t&&(this.adapter.setMenuAnchorElement(t),this.adapter.setMenuAnchorCorner(u.Corner.BOTTOM_START)),this.adapter.setMenuWrapFocus(!1),this.setDisabled(this.adapter.hasClass(l.cssClasses.DISABLED)),this.layoutOptions(),this.layout()},p.prototype.blur=function(){this.adapter.removeClass(l.cssClasses.FOCUSED),this.layout(),this.adapter.deactivateBottomLine(),this.adapter.hasClass(l.cssClasses.REQUIRED)&&this.useDefaultValidation&&(this.setValid(this.isValid()),this.helperText&&this.helperText.setValidity(this.isValid()))},p.prototype.setSelectionAtIndex=function(t){(this.selectedIndex=t)!==l.numbers.UNSET_INDEX?(this.adapter.setSelectedText(this.adapter.getMenuItemTextAtIndex(t).trim()),this.adapter.addClassAtIndex(t,l.cssClasses.SELECTED_ITEM_CLASS),this.adapter.setAttributeAtIndex(t,l.strings.ARIA_SELECTED_ATTR,"true")):this.adapter.setSelectedText("")},p.prototype.removeSelectionAtIndex=function(t){t!==l.numbers.UNSET_INDEX&&(this.adapter.removeClassAtIndex(t,l.cssClasses.SELECTED_ITEM_CLASS),this.adapter.setAttributeAtIndex(t,l.strings.ARIA_SELECTED_ATTR,"false"))},p);function p(t,e){void 0===e&&(e={});var n=s.call(this,o(o({},p.defaultAdapter),t))||this;return n.selectedIndex=l.numbers.UNSET_INDEX,n.menuItemValues=[],n.disabled=!1,n.isMenuOpen=!1,n.useDefaultValidation=!0,n.customValidity=!0,n.leadingIcon=e.leadingIcon,n.helperText=e.helperText,n}e.MDCSelectFoundation=d,e.default=d},function(t,e,n){"use strict";var i,r=this&&this.__extends||(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)});Object.defineProperty(e,"__esModule",{value:!0});var o,s=n(1),a=n(76),c=(o=s.MDCComponent,r(u,o),u.attachTo=function(t){return new u(t)},Object.defineProperty(u.prototype,"foundationForSelect",{get:function(){return this.foundation},enumerable:!0,configurable:!0}),u.prototype.getDefaultFoundation=function(){var n=this,t={addClass:function(t){return n.root.classList.add(t)},removeClass:function(t){return n.root.classList.remove(t)},hasClass:function(t){return n.root.classList.contains(t)},setAttr:function(t,e){return n.root.setAttribute(t,e)},removeAttr:function(t){return n.root.removeAttribute(t)},setContent:function(t){n.root.textContent=t}};return new a.MDCSelectHelperTextFoundation(t)},u);function u(){return null!==o&&o.apply(this,arguments)||this}e.MDCSelectHelperText=c},function(t,e,n){"use strict";var i,r=this&&this.__extends||(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),o=this&&this.__assign||function(){return(o=Object.assign||function(t){for(var e,n=1,i=arguments.length;n<i;n++)for(var r in e=arguments[n])Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t}).apply(this,arguments)};Object.defineProperty(e,"__esModule",{value:!0});var s,a=n(0),c=n(77),u=(s=a.MDCFoundation,r(l,s),Object.defineProperty(l,"cssClasses",{get:function(){return c.cssClasses},enumerable:!0,configurable:!0}),Object.defineProperty(l,"strings",{get:function(){return c.strings},enumerable:!0,configurable:!0}),Object.defineProperty(l,"defaultAdapter",{get:function(){return{addClass:function(){},removeClass:function(){},hasClass:function(){return!1},setAttr:function(){},removeAttr:function(){},setContent:function(){}}},enumerable:!0,configurable:!0}),l.prototype.setContent=function(t){this.adapter.setContent(t)},l.prototype.setValidation=function(t){t?this.adapter.addClass(c.cssClasses.HELPER_TEXT_VALIDATION_MSG):this.adapter.removeClass(c.cssClasses.HELPER_TEXT_VALIDATION_MSG)},l.prototype.setValidationMsgPersistent=function(t){t?this.adapter.addClass(c.cssClasses.HELPER_TEXT_VALIDATION_MSG_PERSISTENT):this.adapter.removeClass(c.cssClasses.HELPER_TEXT_VALIDATION_MSG_PERSISTENT)},l.prototype.showToScreenReader=function(){this.adapter.removeAttr(c.strings.ARIA_HIDDEN)},l.prototype.setValidity=function(t){if(this.adapter.hasClass(c.cssClasses.HELPER_TEXT_VALIDATION_MSG)){var e=this.adapter.hasClass(c.cssClasses.HELPER_TEXT_VALIDATION_MSG_PERSISTENT);if(!t||e)return this.showToScreenReader(),void(t?this.adapter.removeAttr(c.strings.ROLE):this.adapter.setAttr(c.strings.ROLE,"alert"));this.adapter.removeAttr(c.strings.ROLE),this.hide()}},l.prototype.hide=function(){this.adapter.setAttr(c.strings.ARIA_HIDDEN,"true")},l);function l(t){return s.call(this,o(o({},l.defaultAdapter),t))||this}e.MDCSelectHelperTextFoundation=u,e.default=u},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.strings={ARIA_HIDDEN:"aria-hidden",ROLE:"role"};e.cssClasses={HELPER_TEXT_VALIDATION_MSG:"mdc-select-helper-text--validation-msg",HELPER_TEXT_VALIDATION_MSG_PERSISTENT:"mdc-select-helper-text--validation-msg-persistent"}},function(t,e,n){"use strict";var i,r=this&&this.__extends||(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)});Object.defineProperty(e,"__esModule",{value:!0});var o,s=n(1),a=n(79),c=(o=s.MDCComponent,r(u,o),u.attachTo=function(t){return new u(t)},Object.defineProperty(u.prototype,"foundationForSelect",{get:function(){return this.foundation},enumerable:!0,configurable:!0}),u.prototype.getDefaultFoundation=function(){var n=this,t={getAttr:function(t){return n.root.getAttribute(t)},setAttr:function(t,e){return n.root.setAttribute(t,e)},removeAttr:function(t){return n.root.removeAttribute(t)},setContent:function(t){n.root.textContent=t},registerInteractionHandler:function(t,e){return n.listen(t,e)},deregisterInteractionHandler:function(t,e){return n.unlisten(t,e)},notifyIconAction:function(){return n.emit(a.MDCSelectIconFoundation.strings.ICON_EVENT,{},!0)}};return new a.MDCSelectIconFoundation(t)},u);function u(){return null!==o&&o.apply(this,arguments)||this}e.MDCSelectIcon=c},function(t,e,n){"use strict";var i,r=this&&this.__extends||(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),o=this&&this.__assign||function(){return(o=Object.assign||function(t){for(var e,n=1,i=arguments.length;n<i;n++)for(var r in e=arguments[n])Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t}).apply(this,arguments)};Object.defineProperty(e,"__esModule",{value:!0});var s,a=n(0),c=n(80),u=["click","keydown"],l=(s=a.MDCFoundation,r(d,s),Object.defineProperty(d,"strings",{get:function(){return c.strings},enumerable:!0,configurable:!0}),Object.defineProperty(d,"defaultAdapter",{get:function(){return{getAttr:function(){return null},setAttr:function(){},removeAttr:function(){},setContent:function(){},registerInteractionHandler:function(){},deregisterInteractionHandler:function(){},notifyIconAction:function(){}}},enumerable:!0,configurable:!0}),d.prototype.init=function(){var e=this;this.savedTabIndex_=this.adapter.getAttr("tabindex"),u.forEach(function(t){e.adapter.registerInteractionHandler(t,e.interactionHandler_)})},d.prototype.destroy=function(){var e=this;u.forEach(function(t){e.adapter.deregisterInteractionHandler(t,e.interactionHandler_)})},d.prototype.setDisabled=function(t){this.savedTabIndex_&&(t?(this.adapter.setAttr("tabindex","-1"),this.adapter.removeAttr("role")):(this.adapter.setAttr("tabindex",this.savedTabIndex_),this.adapter.setAttr("role",c.strings.ICON_ROLE)))},d.prototype.setAriaLabel=function(t){this.adapter.setAttr("aria-label",t)},d.prototype.setContent=function(t){this.adapter.setContent(t)},d.prototype.handleInteraction=function(t){var e="Enter"===t.key||13===t.keyCode;"click"!==t.type&&!e||this.adapter.notifyIconAction()},d);function d(t){var e=s.call(this,o(o({},d.defaultAdapter),t))||this;return e.savedTabIndex_=null,e.interactionHandler_=function(t){return e.handleInteraction(t)},e}e.MDCSelectIconFoundation=l,e.default=l},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.strings={ICON_EVENT:"MDCSelect:icon",ICON_ROLE:"button"}},function(t,e,n){"use strict";var i,r=this&&this.__extends||(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),o=this&&this.__assign||function(){return(o=Object.assign||function(t){for(var e,n=1,i=arguments.length;n<i;n++)for(var r in e=arguments[n])Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t}).apply(this,arguments)};Object.defineProperty(e,"__esModule",{value:!0});var s,a=n(17),c=n(0),u=n(31),l="undefined"!=typeof window,d=l&&!!window.PointerEvent,p=d?["pointerdown"]:["mousedown","touchstart"],f=d?["pointerup"]:["mouseup","touchend"],h={mousedown:"mousemove",pointerdown:"pointermove",touchstart:"touchmove"},_="ArrowDown",C="ArrowLeft",y="ArrowRight",E="ArrowUp",g="End",m="Home",A="PageDown",v="PageUp",b=(s=c.MDCFoundation,r(T,s),Object.defineProperty(T,"cssClasses",{get:function(){return u.cssClasses},enumerable:!0,configurable:!0}),Object.defineProperty(T,"strings",{get:function(){return u.strings},enumerable:!0,configurable:!0}),Object.defineProperty(T,"numbers",{get:function(){return u.numbers},enumerable:!0,configurable:!0}),Object.defineProperty(T,"defaultAdapter",{get:function(){return{hasClass:function(){return!1},addClass:function(){},removeClass:function(){},getAttribute:function(){return null},setAttribute:function(){},removeAttribute:function(){},computeBoundingRect:function(){return{top:0,right:0,bottom:0,left:0,width:0,height:0}},getTabIndex:function(){return 0},registerInteractionHandler:function(){},deregisterInteractionHandler:function(){},registerThumbContainerInteractionHandler:function(){},deregisterThumbContainerInteractionHandler:function(){},registerBodyInteractionHandler:function(){},deregisterBodyInteractionHandler:function(){},registerResizeHandler:function(){},deregisterResizeHandler:function(){},notifyInput:function(){},notifyChange:function(){},setThumbContainerStyleProperty:function(){},setTrackStyleProperty:function(){},setMarkerValue:function(){},setTrackMarkers:function(){},isRTL:function(){return!1}}},enumerable:!0,configurable:!0}),T.prototype.init=function(){var e=this;this.isDiscrete_=this.adapter.hasClass(u.cssClasses.IS_DISCRETE),this.hasTrackMarker_=this.adapter.hasClass(u.cssClasses.HAS_TRACK_MARKER),p.forEach(function(t){e.adapter.registerInteractionHandler(t,e.interactionStartHandler_),e.adapter.registerThumbContainerInteractionHandler(t,e.thumbContainerPointerHandler_)}),d&&this.adapter.addClass(u.cssClasses.DISABLE_TOUCH_ACTION),this.adapter.registerInteractionHandler("keydown",this.keydownHandler_),this.adapter.registerInteractionHandler("focus",this.focusHandler_),this.adapter.registerInteractionHandler("blur",this.blurHandler_),this.adapter.registerResizeHandler(this.resizeHandler_),this.layout(),this.isDiscrete_&&0===this.getStep()&&(this.step_=1)},T.prototype.destroy=function(){var e=this;p.forEach(function(t){e.adapter.deregisterInteractionHandler(t,e.interactionStartHandler_),e.adapter.deregisterThumbContainerInteractionHandler(t,e.thumbContainerPointerHandler_)}),this.adapter.deregisterInteractionHandler("keydown",this.keydownHandler_),this.adapter.deregisterInteractionHandler("focus",this.focusHandler_),this.adapter.deregisterInteractionHandler("blur",this.blurHandler_),this.adapter.deregisterResizeHandler(this.resizeHandler_)},T.prototype.setupTrackMarker=function(){this.isDiscrete_&&this.hasTrackMarker_&&0!==this.getStep()&&this.adapter.setTrackMarkers(this.getStep(),this.getMax(),this.getMin())},T.prototype.layout=function(){this.rect_=this.adapter.computeBoundingRect(),this.updateUIForCurrentValue_()},T.prototype.getValue=function(){return this.value_},T.prototype.setValue=function(t){this.setValue_(t,!1)},T.prototype.getMax=function(){return this.max_},T.prototype.setMax=function(t){if(t<this.min_)throw new Error("Cannot set max to be less than the slider's minimum value");this.max_=t,this.setValue_(this.value_,!1,!0),this.adapter.setAttribute(u.strings.ARIA_VALUEMAX,String(this.max_)),this.setupTrackMarker()},T.prototype.getMin=function(){return this.min_},T.prototype.setMin=function(t){if(t>this.max_)throw new Error("Cannot set min to be greater than the slider's maximum value");this.min_=t,this.setValue_(this.value_,!1,!0),this.adapter.setAttribute(u.strings.ARIA_VALUEMIN,String(this.min_)),this.setupTrackMarker()},T.prototype.getStep=function(){return this.step_},T.prototype.setStep=function(t){if(t<0)throw new Error("Step cannot be set to a negative number");this.isDiscrete_&&("number"!=typeof t||t<1)&&(t=1),this.step_=t,this.setValue_(this.value_,!1,!0),this.setupTrackMarker()},T.prototype.isDisabled=function(){return this.disabled_},T.prototype.setDisabled=function(t){this.disabled_=t,this.toggleClass_(u.cssClasses.DISABLED,this.disabled_),this.disabled_?(this.savedTabIndex_=this.adapter.getTabIndex(),this.adapter.setAttribute(u.strings.ARIA_DISABLED,"true"),this.adapter.removeAttribute("tabindex")):(this.adapter.removeAttribute(u.strings.ARIA_DISABLED),isNaN(this.savedTabIndex_)||this.adapter.setAttribute("tabindex",String(this.savedTabIndex_)))},T.prototype.handleDown_=function(t){var n=this;if(!this.disabled_){this.preventFocusState_=!0,this.setInTransit_(!this.handlingThumbTargetEvt_),this.handlingThumbTargetEvt_=!1,this.setActive_(!0);var i=function(t){n.handleMove_(t)},r=h[t.type],e=function e(){n.handleUp_(),n.adapter.deregisterBodyInteractionHandler(r,i),f.forEach(function(t){return n.adapter.deregisterBodyInteractionHandler(t,e)})};this.adapter.registerBodyInteractionHandler(r,i),f.forEach(function(t){return n.adapter.registerBodyInteractionHandler(t,e)}),this.setValueFromEvt_(t)}},T.prototype.handleMove_=function(t){t.preventDefault(),this.setValueFromEvt_(t)},T.prototype.handleUp_=function(){this.setActive_(!1),this.adapter.notifyChange()},T.prototype.getClientX_=function(t){return t.targetTouches&&0<t.targetTouches.length?t.targetTouches[0].clientX:t.clientX},T.prototype.setValueFromEvt_=function(t){var e=this.getClientX_(t),n=this.computeValueFromClientX_(e);this.setValue_(n,!0)},T.prototype.computeValueFromClientX_=function(t){var e=this.max_,n=this.min_,i=(t-this.rect_.left)/this.rect_.width;return this.adapter.isRTL()&&(i=1-i),n+i*(e-n)},T.prototype.handleKeydown_=function(t){var e=this.getKeyId_(t),n=this.getValueForKeyId_(e);isNaN(n)||(t.preventDefault(),this.adapter.addClass(u.cssClasses.FOCUS),this.setValue_(n,!0),this.adapter.notifyChange())},T.prototype.getKeyId_=function(t){return t.key===C||37===t.keyCode?C:t.key===y||39===t.keyCode?y:t.key===E||38===t.keyCode?E:t.key===_||40===t.keyCode?_:t.key===m||36===t.keyCode?m:t.key===g||35===t.keyCode?g:t.key===v||33===t.keyCode?v:t.key===A||34===t.keyCode?A:""},T.prototype.getValueForKeyId_=function(t){var e=this.max_,n=this.min_,i=this.step_||(e-n)/100;switch(!this.adapter.isRTL()||t!==C&&t!==y||(i=-i),t){case C:case _:return this.value_-i;case y:case E:return this.value_+i;case m:return this.min_;case g:return this.max_;case v:return this.value_+i*u.numbers.PAGE_FACTOR;case A:return this.value_-i*u.numbers.PAGE_FACTOR;default:return NaN}},T.prototype.handleFocus_=function(){this.preventFocusState_||this.adapter.addClass(u.cssClasses.FOCUS)},T.prototype.handleBlur_=function(){this.preventFocusState_=!1,this.adapter.removeClass(u.cssClasses.FOCUS)},T.prototype.setValue_=function(t,e,n){if(void 0===n&&(n=!1),t!==this.value_||n){var i=this.min_,r=this.max_,o=t===i||t===r;this.step_&&!o&&(t=this.quantize_(t)),t<i?t=i:r<t&&(t=r),t=t||0,this.value_=t,this.adapter.setAttribute(u.strings.ARIA_VALUENOW,String(this.value_)),this.updateUIForCurrentValue_(),e&&(this.adapter.notifyInput(),this.isDiscrete_&&this.adapter.setMarkerValue(t))}},T.prototype.quantize_=function(t){return Math.round(t/this.step_)*this.step_},T.prototype.updateUIForCurrentValue_=function(){var e=this,t=this.max_,n=this.min_,i=(this.value_-n)/(t-n),r=i*this.rect_.width;this.adapter.isRTL()&&(r=this.rect_.width-r);var o=l?a.getCorrectPropertyName(window,"transform"):"transform",s=l?a.getCorrectEventName(window,"transitionend"):"transitionend";this.inTransit_&&this.adapter.registerThumbContainerInteractionHandler(s,function t(){e.setInTransit_(!1),e.adapter.deregisterThumbContainerInteractionHandler(s,t)}),requestAnimationFrame(function(){e.adapter.setThumbContainerStyleProperty(o,"translateX("+r+"px) translateX(-50%)"),e.adapter.setTrackStyleProperty(o,"scaleX("+i+")")})},T.prototype.setActive_=function(t){this.active_=t,this.toggleClass_(u.cssClasses.ACTIVE,this.active_)},T.prototype.setInTransit_=function(t){this.inTransit_=t,this.toggleClass_(u.cssClasses.IN_TRANSIT,this.inTransit_)},T.prototype.toggleClass_=function(t,e){e?this.adapter.addClass(t):this.adapter.removeClass(t)},T);function T(t){var e=s.call(this,o(o({},T.defaultAdapter),t))||this;return e.savedTabIndex_=NaN,e.active_=!1,e.inTransit_=!1,e.isDiscrete_=!1,e.hasTrackMarker_=!1,e.handlingThumbTargetEvt_=!1,e.min_=0,e.max_=100,e.step_=0,e.value_=0,e.disabled_=!1,e.preventFocusState_=!1,e.thumbContainerPointerHandler_=function(){return e.handlingThumbTargetEvt_=!0},e.interactionStartHandler_=function(t){return e.handleDown_(t)},e.keydownHandler_=function(t){return e.handleKeydown_(t)},e.focusHandler_=function(){return e.handleFocus_()},e.blurHandler_=function(){return e.handleBlur_()},e.resizeHandler_=function(){return e.layout()},e}e.MDCSliderFoundation=b,e.default=b},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(15),r=i.numbers.ARIA_LIVE_DELAY_MS,o=i.strings.ARIA_LIVE_LABEL_TEXT_ATTR;e.announce=function(t,e){void 0===e&&(e=t);var n=t.getAttribute("aria-live"),i=e.textContent.trim();i&&n&&(t.setAttribute("aria-live","off"),e.textContent="",e.innerHTML='<span style="display: inline-block; width: 0; height: 1px;">&nbsp;</span>',e.setAttribute(o,i),setTimeout(function(){t.setAttribute("aria-live",n),e.removeAttribute(o),e.textContent=i},r))}},function(t,e,n){"use strict";var i,r=this&&this.__extends||(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),o=this&&this.__assign||function(){return(o=Object.assign||function(t){for(var e,n=1,i=arguments.length;n<i;n++)for(var r in e=arguments[n])Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t}).apply(this,arguments)};Object.defineProperty(e,"__esModule",{value:!0});var s,a=n(0),c=n(15),u=c.cssClasses.OPENING,l=c.cssClasses.OPEN,d=c.cssClasses.CLOSING,p=c.strings.REASON_ACTION,f=c.strings.REASON_DISMISS,h=(s=a.MDCFoundation,r(_,s),Object.defineProperty(_,"cssClasses",{get:function(){return c.cssClasses},enumerable:!0,configurable:!0}),Object.defineProperty(_,"strings",{get:function(){return c.strings},enumerable:!0,configurable:!0}),Object.defineProperty(_,"numbers",{get:function(){return c.numbers},enumerable:!0,configurable:!0}),Object.defineProperty(_,"defaultAdapter",{get:function(){return{addClass:function(){},announce:function(){},notifyClosed:function(){},notifyClosing:function(){},notifyOpened:function(){},notifyOpening:function(){},removeClass:function(){}}},enumerable:!0,configurable:!0}),_.prototype.destroy=function(){this.clearAutoDismissTimer_(),cancelAnimationFrame(this.animationFrame_),this.animationFrame_=0,clearTimeout(this.animationTimer_),this.animationTimer_=0,this.adapter.removeClass(u),this.adapter.removeClass(l),this.adapter.removeClass(d)},_.prototype.open=function(){var e=this;this.clearAutoDismissTimer_(),this.isOpen_=!0,this.adapter.notifyOpening(),this.adapter.removeClass(d),this.adapter.addClass(u),this.adapter.announce(),this.runNextAnimationFrame_(function(){e.adapter.addClass(l),e.animationTimer_=setTimeout(function(){var t=e.getTimeoutMs();e.handleAnimationTimerEnd_(),e.adapter.notifyOpened(),t!==c.numbers.INDETERMINATE&&(e.autoDismissTimer_=setTimeout(function(){e.close(f)},t))},c.numbers.SNACKBAR_ANIMATION_OPEN_TIME_MS)})},_.prototype.close=function(t){var e=this;void 0===t&&(t=""),this.isOpen_&&(cancelAnimationFrame(this.animationFrame_),this.animationFrame_=0,this.clearAutoDismissTimer_(),this.isOpen_=!1,this.adapter.notifyClosing(t),this.adapter.addClass(c.cssClasses.CLOSING),this.adapter.removeClass(c.cssClasses.OPEN),this.adapter.removeClass(c.cssClasses.OPENING),clearTimeout(this.animationTimer_),this.animationTimer_=setTimeout(function(){e.handleAnimationTimerEnd_(),e.adapter.notifyClosed(t)},c.numbers.SNACKBAR_ANIMATION_CLOSE_TIME_MS))},_.prototype.isOpen=function(){return this.isOpen_},_.prototype.getTimeoutMs=function(){return this.autoDismissTimeoutMs_},_.prototype.setTimeoutMs=function(t){var e=c.numbers.MIN_AUTO_DISMISS_TIMEOUT_MS,n=c.numbers.MAX_AUTO_DISMISS_TIMEOUT_MS,i=c.numbers.INDETERMINATE;if(!(t===c.numbers.INDETERMINATE||t<=n&&e<=t))throw new Error("\n        timeoutMs must be an integer in the range "+e+"–"+n+"\n        (or "+i+" to disable), but got '"+t+"'");this.autoDismissTimeoutMs_=t},_.prototype.getCloseOnEscape=function(){return this.closeOnEscape_},_.prototype.setCloseOnEscape=function(t){this.closeOnEscape_=t},_.prototype.handleKeyDown=function(t){"Escape"!==t.key&&27!==t.keyCode||!this.getCloseOnEscape()||this.close(f)},_.prototype.handleActionButtonClick=function(t){this.close(p)},_.prototype.handleActionIconClick=function(t){this.close(f)},_.prototype.clearAutoDismissTimer_=function(){clearTimeout(this.autoDismissTimer_),this.autoDismissTimer_=0},_.prototype.handleAnimationTimerEnd_=function(){this.animationTimer_=0,this.adapter.removeClass(c.cssClasses.OPENING),this.adapter.removeClass(c.cssClasses.CLOSING)},_.prototype.runNextAnimationFrame_=function(t){var e=this;cancelAnimationFrame(this.animationFrame_),this.animationFrame_=requestAnimationFrame(function(){e.animationFrame_=0,clearTimeout(e.animationTimer_),e.animationTimer_=setTimeout(t,0)})},_);function _(t){var e=s.call(this,o(o({},_.defaultAdapter),t))||this;return e.isOpen_=!1,e.animationFrame_=0,e.animationTimer_=0,e.autoDismissTimer_=0,e.autoDismissTimeoutMs_=c.numbers.DEFAULT_AUTO_DISMISS_TIMEOUT_MS,e.closeOnEscape_=!0,e}e.MDCSnackbarFoundation=h,e.default=h},function(t,e,n){"use strict";var i,r=this&&this.__extends||(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),o=this&&this.__assign||function(){return(o=Object.assign||function(t){for(var e,n=1,i=arguments.length;n<i;n++)for(var r in e=arguments[n])Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t}).apply(this,arguments)};Object.defineProperty(e,"__esModule",{value:!0});var s,a=n(0),c=n(85),u=(s=a.MDCFoundation,r(l,s),Object.defineProperty(l,"strings",{get:function(){return c.strings},enumerable:!0,configurable:!0}),Object.defineProperty(l,"cssClasses",{get:function(){return c.cssClasses},enumerable:!0,configurable:!0}),Object.defineProperty(l,"defaultAdapter",{get:function(){return{addClass:function(){},removeClass:function(){},setNativeControlChecked:function(){},setNativeControlDisabled:function(){},setNativeControlAttr:function(){}}},enumerable:!0,configurable:!0}),l.prototype.setChecked=function(t){this.adapter.setNativeControlChecked(t),this.updateAriaChecked_(t),this.updateCheckedStyling_(t)},l.prototype.setDisabled=function(t){this.adapter.setNativeControlDisabled(t),t?this.adapter.addClass(c.cssClasses.DISABLED):this.adapter.removeClass(c.cssClasses.DISABLED)},l.prototype.handleChange=function(t){var e=t.target;this.updateAriaChecked_(e.checked),this.updateCheckedStyling_(e.checked)},l.prototype.updateCheckedStyling_=function(t){t?this.adapter.addClass(c.cssClasses.CHECKED):this.adapter.removeClass(c.cssClasses.CHECKED)},l.prototype.updateAriaChecked_=function(t){this.adapter.setNativeControlAttr(c.strings.ARIA_CHECKED_ATTR,""+!!t)},l);function l(t){return s.call(this,o(o({},l.defaultAdapter),t))||this}e.MDCSwitchFoundation=u,e.default=u},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.cssClasses={CHECKED:"mdc-switch--checked",DISABLED:"mdc-switch--disabled"};e.strings={ARIA_CHECKED_ATTR:"aria-checked",NATIVE_CONTROL_SELECTOR:".mdc-switch__native-control",RIPPLE_SURFACE_SELECTOR:".mdc-switch__thumb-underlay"}},function(t,e,n){"use strict";var i,r=this&&this.__extends||(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),o=this&&this.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e};Object.defineProperty(e,"__esModule",{value:!0});var s,a=n(1),c=n(5),u=n(2),l=n(87),d=o(n(88)),p=(s=a.MDCComponent,r(f,s),f.attachTo=function(t){return new f(t)},f.prototype.initialize=function(){this.area_=this.root.querySelector(l.MDCTabScrollerFoundation.strings.AREA_SELECTOR),this.content_=this.root.querySelector(l.MDCTabScrollerFoundation.strings.CONTENT_SELECTOR)},f.prototype.initialSyncWithDOM=function(){var e=this;this.handleInteraction_=function(){return e.foundation.handleInteraction()},this.handleTransitionEnd_=function(t){return e.foundation.handleTransitionEnd(t)},this.area_.addEventListener("wheel",this.handleInteraction_,c.applyPassive()),this.area_.addEventListener("touchstart",this.handleInteraction_,c.applyPassive()),this.area_.addEventListener("pointerdown",this.handleInteraction_,c.applyPassive()),this.area_.addEventListener("mousedown",this.handleInteraction_,c.applyPassive()),this.area_.addEventListener("keydown",this.handleInteraction_,c.applyPassive()),this.content_.addEventListener("transitionend",this.handleTransitionEnd_)},f.prototype.destroy=function(){s.prototype.destroy.call(this),this.area_.removeEventListener("wheel",this.handleInteraction_,c.applyPassive()),this.area_.removeEventListener("touchstart",this.handleInteraction_,c.applyPassive()),this.area_.removeEventListener("pointerdown",this.handleInteraction_,c.applyPassive()),this.area_.removeEventListener("mousedown",this.handleInteraction_,c.applyPassive()),this.area_.removeEventListener("keydown",this.handleInteraction_,c.applyPassive()),this.content_.removeEventListener("transitionend",this.handleTransitionEnd_)},f.prototype.getDefaultFoundation=function(){var n=this,t={eventTargetMatchesSelector:function(t,e){return u.matches(t,e)},addClass:function(t){return n.root.classList.add(t)},removeClass:function(t){return n.root.classList.remove(t)},addScrollAreaClass:function(t){return n.area_.classList.add(t)},setScrollAreaStyleProperty:function(t,e){return n.area_.style.setProperty(t,e)},setScrollContentStyleProperty:function(t,e){return n.content_.style.setProperty(t,e)},getScrollContentStyleValue:function(t){return window.getComputedStyle(n.content_).getPropertyValue(t)},setScrollAreaScrollLeft:function(t){return n.area_.scrollLeft=t},getScrollAreaScrollLeft:function(){return n.area_.scrollLeft},getScrollContentOffsetWidth:function(){return n.content_.offsetWidth},getScrollAreaOffsetWidth:function(){return n.area_.offsetWidth},computeScrollAreaClientRect:function(){return n.area_.getBoundingClientRect()},computeScrollContentClientRect:function(){return n.content_.getBoundingClientRect()},computeHorizontalScrollbarHeight:function(){return d.computeHorizontalScrollbarHeight(document)}};return new l.MDCTabScrollerFoundation(t)},f.prototype.getScrollPosition=function(){return this.foundation.getScrollPosition()},f.prototype.getScrollContentWidth=function(){return this.content_.offsetWidth},f.prototype.incrementScroll=function(t){this.foundation.incrementScroll(t)},f.prototype.scrollTo=function(t){this.foundation.scrollTo(t)},f);function f(){return null!==s&&s.apply(this,arguments)||this}e.MDCTabScroller=p},function(t,e,n){"use strict";var i,r=this&&this.__extends||(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),o=this&&this.__assign||function(){return(o=Object.assign||function(t){for(var e,n=1,i=arguments.length;n<i;n++)for(var r in e=arguments[n])Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t}).apply(this,arguments)},s=this&&this.__read||function(t,e){var n="function"==typeof Symbol&&t[Symbol.iterator];if(!n)return t;var i,r,o=n.call(t),s=[];try{for(;(void 0===e||0<e--)&&!(i=o.next()).done;)s.push(i.value)}catch(t){r={error:t}}finally{try{i&&!i.done&&(n=o.return)&&n.call(o)}finally{if(r)throw r.error}}return s};Object.defineProperty(e,"__esModule",{value:!0});var a,c=n(0),u=n(32),l=n(155),d=n(156),p=n(157),f=(a=c.MDCFoundation,r(h,a),Object.defineProperty(h,"cssClasses",{get:function(){return u.cssClasses},enumerable:!0,configurable:!0}),Object.defineProperty(h,"strings",{get:function(){return u.strings},enumerable:!0,configurable:!0}),Object.defineProperty(h,"defaultAdapter",{get:function(){return{eventTargetMatchesSelector:function(){return!1},addClass:function(){},removeClass:function(){},addScrollAreaClass:function(){},setScrollAreaStyleProperty:function(){},setScrollContentStyleProperty:function(){},getScrollContentStyleValue:function(){return""},setScrollAreaScrollLeft:function(){},getScrollAreaScrollLeft:function(){return 0},getScrollContentOffsetWidth:function(){return 0},getScrollAreaOffsetWidth:function(){return 0},computeScrollAreaClientRect:function(){return{top:0,right:0,bottom:0,left:0,width:0,height:0}},computeScrollContentClientRect:function(){return{top:0,right:0,bottom:0,left:0,width:0,height:0}},computeHorizontalScrollbarHeight:function(){return 0}}},enumerable:!0,configurable:!0}),h.prototype.init=function(){var t=this.adapter.computeHorizontalScrollbarHeight();this.adapter.setScrollAreaStyleProperty("margin-bottom",-t+"px"),this.adapter.addScrollAreaClass(h.cssClasses.SCROLL_AREA_SCROLL)},h.prototype.getScrollPosition=function(){if(this.isRTL_())return this.computeCurrentScrollPositionRTL_();var t=this.calculateCurrentTranslateX_();return this.adapter.getScrollAreaScrollLeft()-t},h.prototype.handleInteraction=function(){this.isAnimating_&&this.stopScrollAnimation_()},h.prototype.handleTransitionEnd=function(t){var e=t.target;this.isAnimating_&&this.adapter.eventTargetMatchesSelector(e,h.strings.CONTENT_SELECTOR)&&(this.isAnimating_=!1,this.adapter.removeClass(h.cssClasses.ANIMATING))},h.prototype.incrementScroll=function(t){0!==t&&this.animate_(this.getIncrementScrollOperation_(t))},h.prototype.incrementScrollImmediate=function(t){if(0!==t){var e=this.getIncrementScrollOperation_(t);0!==e.scrollDelta&&(this.stopScrollAnimation_(),this.adapter.setScrollAreaScrollLeft(e.finalScrollPosition))}},h.prototype.scrollTo=function(t){if(this.isRTL_())return this.scrollToRTL_(t);this.scrollTo_(t)},h.prototype.getRTLScroller=function(){return this.rtlScrollerInstance_||(this.rtlScrollerInstance_=this.rtlScrollerFactory_()),this.rtlScrollerInstance_},h.prototype.calculateCurrentTranslateX_=function(){var t=this.adapter.getScrollContentStyleValue("transform");if("none"===t)return 0;var e=/\((.+?)\)/.exec(t);if(!e)return 0;var n=e[1],i=s(n.split(","),6),r=(i[0],i[1],i[2],i[3],i[4]);return i[5],parseFloat(r)},h.prototype.clampScrollValue_=function(t){var e=this.calculateScrollEdges_();return Math.min(Math.max(e.left,t),e.right)},h.prototype.computeCurrentScrollPositionRTL_=function(){var t=this.calculateCurrentTranslateX_();return this.getRTLScroller().getScrollPositionRTL(t)},h.prototype.calculateScrollEdges_=function(){return{left:0,right:this.adapter.getScrollContentOffsetWidth()-this.adapter.getScrollAreaOffsetWidth()}},h.prototype.scrollTo_=function(t){var e=this.getScrollPosition(),n=this.clampScrollValue_(t),i=n-e;this.animate_({finalScrollPosition:n,scrollDelta:i})},h.prototype.scrollToRTL_=function(t){var e=this.getRTLScroller().scrollToRTL(t);this.animate_(e)},h.prototype.getIncrementScrollOperation_=function(t){if(this.isRTL_())return this.getRTLScroller().incrementScrollRTL(t);var e=this.getScrollPosition(),n=t+e,i=this.clampScrollValue_(n);return{finalScrollPosition:i,scrollDelta:i-e}},h.prototype.animate_=function(t){var e=this;0!==t.scrollDelta&&(this.stopScrollAnimation_(),this.adapter.setScrollAreaScrollLeft(t.finalScrollPosition),this.adapter.setScrollContentStyleProperty("transform","translateX("+t.scrollDelta+"px)"),this.adapter.computeScrollAreaClientRect(),requestAnimationFrame(function(){e.adapter.addClass(h.cssClasses.ANIMATING),e.adapter.setScrollContentStyleProperty("transform","none")}),this.isAnimating_=!0)},h.prototype.stopScrollAnimation_=function(){this.isAnimating_=!1;var t=this.getAnimatingScrollPosition_();this.adapter.removeClass(h.cssClasses.ANIMATING),this.adapter.setScrollContentStyleProperty("transform","translateX(0px)"),this.adapter.setScrollAreaScrollLeft(t)},h.prototype.getAnimatingScrollPosition_=function(){var t=this.calculateCurrentTranslateX_(),e=this.adapter.getScrollAreaScrollLeft();return this.isRTL_()?this.getRTLScroller().getAnimatingScrollPosition(e,t):e-t},h.prototype.rtlScrollerFactory_=function(){var t=this.adapter.getScrollAreaScrollLeft();this.adapter.setScrollAreaScrollLeft(t-1);var e=this.adapter.getScrollAreaScrollLeft();if(e<0)return this.adapter.setScrollAreaScrollLeft(t),new d.MDCTabScrollerRTLNegative(this.adapter);var n=this.adapter.computeScrollAreaClientRect(),i=this.adapter.computeScrollContentClientRect(),r=Math.round(i.right-n.right);return this.adapter.setScrollAreaScrollLeft(t),r===e?new p.MDCTabScrollerRTLReverse(this.adapter):new l.MDCTabScrollerRTLDefault(this.adapter)},h.prototype.isRTL_=function(){return"rtl"===this.adapter.getScrollContentStyleValue("direction")},h);function h(t){var e=a.call(this,o(o({},h.defaultAdapter),t))||this;return e.isAnimating_=!1,e}e.MDCTabScrollerFoundation=f,e.default=f},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r,o=n(32);e.computeHorizontalScrollbarHeight=function(t,e){if(void 0===e&&(e=!0),e&&void 0!==r)return r;var n=t.createElement("div");n.classList.add(o.cssClasses.SCROLL_TEST),t.body.appendChild(n);var i=n.offsetHeight-n.clientHeight;return t.body.removeChild(n),e&&(r=i),i}},function(t,e,n){"use strict";var i,r=this&&this.__extends||(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),s=this&&this.__assign||function(){return(s=Object.assign||function(t){for(var e,n=1,i=arguments.length;n<i;n++)for(var r in e=arguments[n])Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t}).apply(this,arguments)};Object.defineProperty(e,"__esModule",{value:!0});var o,a=n(1),c=n(3),u=n(4),l=n(90),d=n(34),p=(o=a.MDCComponent,r(f,o),f.attachTo=function(t){return new f(t)},f.prototype.initialize=function(t,e){void 0===t&&(t=function(t,e){return new c.MDCRipple(t,e)}),void 0===e&&(e=function(t){return new l.MDCTabIndicator(t)}),this.id=this.root.id;var n=this.root.querySelector(d.MDCTabFoundation.strings.RIPPLE_SELECTOR),i=s(s({},c.MDCRipple.createAdapter(this)),{addClass:function(t){return n.classList.add(t)},removeClass:function(t){return n.classList.remove(t)},updateCssVariable:function(t,e){return n.style.setProperty(t,e)}}),r=new u.MDCRippleFoundation(i);this.ripple_=t(this.root,r);var o=this.root.querySelector(d.MDCTabFoundation.strings.TAB_INDICATOR_SELECTOR);this.tabIndicator_=e(o),this.content_=this.root.querySelector(d.MDCTabFoundation.strings.CONTENT_SELECTOR)},f.prototype.initialSyncWithDOM=function(){var t=this;this.handleClick_=function(){return t.foundation.handleClick()},this.listen("click",this.handleClick_)},f.prototype.destroy=function(){this.unlisten("click",this.handleClick_),this.ripple_.destroy(),o.prototype.destroy.call(this)},f.prototype.getDefaultFoundation=function(){var n=this,t={setAttr:function(t,e){return n.root.setAttribute(t,e)},addClass:function(t){return n.root.classList.add(t)},removeClass:function(t){return n.root.classList.remove(t)},hasClass:function(t){return n.root.classList.contains(t)},activateIndicator:function(t){return n.tabIndicator_.activate(t)},deactivateIndicator:function(){return n.tabIndicator_.deactivate()},notifyInteracted:function(){return n.emit(d.MDCTabFoundation.strings.INTERACTED_EVENT,{tabId:n.id},!0)},getOffsetLeft:function(){return n.root.offsetLeft},getOffsetWidth:function(){return n.root.offsetWidth},getContentOffsetLeft:function(){return n.content_.offsetLeft},getContentOffsetWidth:function(){return n.content_.offsetWidth},focus:function(){return n.root.focus()}};return new d.MDCTabFoundation(t)},Object.defineProperty(f.prototype,"active",{get:function(){return this.foundation.isActive()},enumerable:!0,configurable:!0}),Object.defineProperty(f.prototype,"focusOnActivate",{set:function(t){this.foundation.setFocusOnActivate(t)},enumerable:!0,configurable:!0}),f.prototype.activate=function(t){this.foundation.activate(t)},f.prototype.deactivate=function(){this.foundation.deactivate()},f.prototype.computeIndicatorClientRect=function(){return this.tabIndicator_.computeContentClientRect()},f.prototype.computeDimensions=function(){return this.foundation.computeDimensions()},f.prototype.focus=function(){this.root.focus()},f);function f(){return null!==o&&o.apply(this,arguments)||this}e.MDCTab=p},function(t,e,n){"use strict";var i,r=this&&this.__extends||(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)});Object.defineProperty(e,"__esModule",{value:!0});var o,s=n(1),a=n(91),c=n(16),u=n(93),l=(o=s.MDCComponent,r(d,o),d.attachTo=function(t){return new d(t)},d.prototype.initialize=function(){this.content_=this.root.querySelector(c.MDCTabIndicatorFoundation.strings.CONTENT_SELECTOR)},d.prototype.computeContentClientRect=function(){return this.foundation.computeContentClientRect()},d.prototype.getDefaultFoundation=function(){var n=this,t={addClass:function(t){return n.root.classList.add(t)},removeClass:function(t){return n.root.classList.remove(t)},computeContentClientRect:function(){return n.content_.getBoundingClientRect()},setContentStyleProperty:function(t,e){return n.content_.style.setProperty(t,e)}};return this.root.classList.contains(c.MDCTabIndicatorFoundation.cssClasses.FADE)?new a.MDCFadingTabIndicatorFoundation(t):new u.MDCSlidingTabIndicatorFoundation(t)},d.prototype.activate=function(t){this.foundation.activate(t)},d.prototype.deactivate=function(){this.foundation.deactivate()},d);function d(){return null!==o&&o.apply(this,arguments)||this}e.MDCTabIndicator=l},function(t,e,n){"use strict";var i,r=this&&this.__extends||(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)});Object.defineProperty(e,"__esModule",{value:!0});var o,s=n(16),a=(o=s.MDCTabIndicatorFoundation,r(c,o),c.prototype.activate=function(){this.adapter.addClass(s.MDCTabIndicatorFoundation.cssClasses.ACTIVE)},c.prototype.deactivate=function(){this.adapter.removeClass(s.MDCTabIndicatorFoundation.cssClasses.ACTIVE)},c);function c(){return null!==o&&o.apply(this,arguments)||this}e.MDCFadingTabIndicatorFoundation=a,e.default=a},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.cssClasses={ACTIVE:"mdc-tab-indicator--active",FADE:"mdc-tab-indicator--fade",NO_TRANSITION:"mdc-tab-indicator--no-transition"};e.strings={CONTENT_SELECTOR:".mdc-tab-indicator__content"}},function(t,e,n){"use strict";var i,r=this&&this.__extends||(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)});Object.defineProperty(e,"__esModule",{value:!0});var o,s=n(16),a=(o=s.MDCTabIndicatorFoundation,r(c,o),c.prototype.activate=function(t){if(t){var e=this.computeContentClientRect(),n=t.width/e.width,i=t.left-e.left;this.adapter.addClass(s.MDCTabIndicatorFoundation.cssClasses.NO_TRANSITION),this.adapter.setContentStyleProperty("transform","translateX("+i+"px) scaleX("+n+")"),this.computeContentClientRect(),this.adapter.removeClass(s.MDCTabIndicatorFoundation.cssClasses.NO_TRANSITION),this.adapter.addClass(s.MDCTabIndicatorFoundation.cssClasses.ACTIVE),this.adapter.setContentStyleProperty("transform","")}else this.adapter.addClass(s.MDCTabIndicatorFoundation.cssClasses.ACTIVE)},c.prototype.deactivate=function(){this.adapter.removeClass(s.MDCTabIndicatorFoundation.cssClasses.ACTIVE)},c);function c(){return null!==o&&o.apply(this,arguments)||this}e.MDCSlidingTabIndicatorFoundation=a,e.default=a},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.cssClasses={ACTIVE:"mdc-tab--active"};e.strings={ARIA_SELECTED:"aria-selected",CONTENT_SELECTOR:".mdc-tab__content",INTERACTED_EVENT:"MDCTab:interacted",RIPPLE_SELECTOR:".mdc-tab__ripple",TABINDEX:"tabIndex",TAB_INDICATOR_SELECTOR:".mdc-tab-indicator"}},function(t,e,n){"use strict";var i,r=this&&this.__extends||(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),o=this&&this.__assign||function(){return(o=Object.assign||function(t){for(var e,n=1,i=arguments.length;n<i;n++)for(var r in e=arguments[n])Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t}).apply(this,arguments)};Object.defineProperty(e,"__esModule",{value:!0});var s=n(0),u=n(96),a=new Set;a.add(u.strings.ARROW_LEFT_KEY),a.add(u.strings.ARROW_RIGHT_KEY),a.add(u.strings.END_KEY),a.add(u.strings.HOME_KEY),a.add(u.strings.ENTER_KEY),a.add(u.strings.SPACE_KEY);var c=new Map;c.set(u.numbers.ARROW_LEFT_KEYCODE,u.strings.ARROW_LEFT_KEY),c.set(u.numbers.ARROW_RIGHT_KEYCODE,u.strings.ARROW_RIGHT_KEY),c.set(u.numbers.END_KEYCODE,u.strings.END_KEY),c.set(u.numbers.HOME_KEYCODE,u.strings.HOME_KEY),c.set(u.numbers.ENTER_KEYCODE,u.strings.ENTER_KEY),c.set(u.numbers.SPACE_KEYCODE,u.strings.SPACE_KEY);var l,d=(l=s.MDCFoundation,r(p,l),Object.defineProperty(p,"strings",{get:function(){return u.strings},enumerable:!0,configurable:!0}),Object.defineProperty(p,"numbers",{get:function(){return u.numbers},enumerable:!0,configurable:!0}),Object.defineProperty(p,"defaultAdapter",{get:function(){return{scrollTo:function(){},incrementScroll:function(){},getScrollPosition:function(){return 0},getScrollContentWidth:function(){return 0},getOffsetWidth:function(){return 0},isRTL:function(){return!1},setActiveTab:function(){},activateTabAtIndex:function(){},deactivateTabAtIndex:function(){},focusTabAtIndex:function(){},getTabIndicatorClientRectAtIndex:function(){return{top:0,right:0,bottom:0,left:0,width:0,height:0}},getTabDimensionsAtIndex:function(){return{rootLeft:0,rootRight:0,contentLeft:0,contentRight:0}},getPreviousActiveTabIndex:function(){return-1},getFocusedTabIndex:function(){return-1},getIndexOfTabById:function(){return-1},getTabListLength:function(){return 0},notifyTabActivated:function(){}}},enumerable:!0,configurable:!0}),p.prototype.setUseAutomaticActivation=function(t){this.useAutomaticActivation_=t},p.prototype.activateTab=function(t){var e,n=this.adapter.getPreviousActiveTabIndex();this.indexIsInRange_(t)&&t!==n&&(-1!==n&&(this.adapter.deactivateTabAtIndex(n),e=this.adapter.getTabIndicatorClientRectAtIndex(n)),this.adapter.activateTabAtIndex(t,e),this.scrollIntoView(t),this.adapter.notifyTabActivated(t))},p.prototype.handleKeyDown=function(t){var e=this.getKeyFromEvent_(t);if(void 0!==e)if(this.isActivationKey_(e)||t.preventDefault(),this.useAutomaticActivation_){if(this.isActivationKey_(e))return;var n=this.determineTargetFromKey_(this.adapter.getPreviousActiveTabIndex(),e);this.adapter.setActiveTab(n),this.scrollIntoView(n)}else{var i=this.adapter.getFocusedTabIndex();this.isActivationKey_(e)?this.adapter.setActiveTab(i):(n=this.determineTargetFromKey_(i,e),this.adapter.focusTabAtIndex(n),this.scrollIntoView(n))}},p.prototype.handleTabInteraction=function(t){this.adapter.setActiveTab(this.adapter.getIndexOfTabById(t.detail.tabId))},p.prototype.scrollIntoView=function(t){if(this.indexIsInRange_(t))return 0===t?this.adapter.scrollTo(0):t===this.adapter.getTabListLength()-1?this.adapter.scrollTo(this.adapter.getScrollContentWidth()):this.isRTL_()?this.scrollIntoViewRTL_(t):void this.scrollIntoView_(t)},p.prototype.determineTargetFromKey_=function(t,e){var n=this.isRTL_(),i=this.adapter.getTabListLength()-1,r=e===u.strings.END_KEY,o=e===u.strings.ARROW_LEFT_KEY&&!n||e===u.strings.ARROW_RIGHT_KEY&&n,s=e===u.strings.ARROW_RIGHT_KEY&&!n||e===u.strings.ARROW_LEFT_KEY&&n,a=t;return r?a=i:o?a-=1:s?a+=1:a=0,a<0?a=i:i<a&&(a=0),a},p.prototype.calculateScrollIncrement_=function(t,e,n,i){var r=this.adapter.getTabDimensionsAtIndex(e),o=r.contentLeft-n-i,s=r.contentRight-n-u.numbers.EXTRA_SCROLL_AMOUNT,a=o+u.numbers.EXTRA_SCROLL_AMOUNT;return e<t?Math.min(s,0):Math.max(a,0)},p.prototype.calculateScrollIncrementRTL_=function(t,e,n,i,r){var o=this.adapter.getTabDimensionsAtIndex(e),s=r-o.contentLeft-n,a=r-o.contentRight-n-i+u.numbers.EXTRA_SCROLL_AMOUNT,c=s-u.numbers.EXTRA_SCROLL_AMOUNT;return t<e?Math.max(a,0):Math.min(c,0)},p.prototype.findAdjacentTabIndexClosestToEdge_=function(t,e,n,i){var r=e.rootLeft-n,o=e.rootRight-n-i,s=r+o;return r<0||s<0?t-1:0<o||0<s?t+1:-1},p.prototype.findAdjacentTabIndexClosestToEdgeRTL_=function(t,e,n,i,r){var o=r-e.rootLeft-i-n,s=r-e.rootRight-n,a=o+s;return 0<o||0<a?t+1:s<0||a<0?t-1:-1},p.prototype.getKeyFromEvent_=function(t){return a.has(t.key)?t.key:c.get(t.keyCode)},p.prototype.isActivationKey_=function(t){return t===u.strings.SPACE_KEY||t===u.strings.ENTER_KEY},p.prototype.indexIsInRange_=function(t){return 0<=t&&t<this.adapter.getTabListLength()},p.prototype.isRTL_=function(){return this.adapter.isRTL()},p.prototype.scrollIntoView_=function(t){var e=this.adapter.getScrollPosition(),n=this.adapter.getOffsetWidth(),i=this.adapter.getTabDimensionsAtIndex(t),r=this.findAdjacentTabIndexClosestToEdge_(t,i,e,n);if(this.indexIsInRange_(r)){var o=this.calculateScrollIncrement_(t,r,e,n);this.adapter.incrementScroll(o)}},p.prototype.scrollIntoViewRTL_=function(t){var e=this.adapter.getScrollPosition(),n=this.adapter.getOffsetWidth(),i=this.adapter.getTabDimensionsAtIndex(t),r=this.adapter.getScrollContentWidth(),o=this.findAdjacentTabIndexClosestToEdgeRTL_(t,i,e,n,r);if(this.indexIsInRange_(o)){var s=this.calculateScrollIncrementRTL_(t,o,e,n,r);this.adapter.incrementScroll(s)}},p);function p(t){var e=l.call(this,o(o({},p.defaultAdapter),t))||this;return e.useAutomaticActivation_=!1,e}e.MDCTabBarFoundation=d,e.default=d},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.strings={ARROW_LEFT_KEY:"ArrowLeft",ARROW_RIGHT_KEY:"ArrowRight",END_KEY:"End",ENTER_KEY:"Enter",HOME_KEY:"Home",SPACE_KEY:"Space",TAB_ACTIVATED_EVENT:"MDCTabBar:activated",TAB_SCROLLER_SELECTOR:".mdc-tab-scroller",TAB_SELECTOR:".mdc-tab"};e.numbers={ARROW_LEFT_KEYCODE:37,ARROW_RIGHT_KEYCODE:39,END_KEYCODE:35,ENTER_KEYCODE:13,EXTRA_SCROLL_AMOUNT:20,HOME_KEYCODE:36,SPACE_KEYCODE:32}},function(t,e,n){"use strict";var i,r=this&&this.__extends||(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)});Object.defineProperty(e,"__esModule",{value:!0});var o,s=n(1),a=n(35),c=(o=s.MDCComponent,r(u,o),u.attachTo=function(t){return new u(t)},Object.defineProperty(u.prototype,"foundationForTextField",{get:function(){return this.foundation},enumerable:!0,configurable:!0}),u.prototype.getDefaultFoundation=function(){var e=this,t={setContent:function(t){e.root.textContent=t}};return new a.MDCTextFieldCharacterCounterFoundation(t)},u);function u(){return null!==o&&o.apply(this,arguments)||this}e.MDCTextFieldCharacterCounter=c},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i={ROOT:"mdc-text-field-character-counter"},r={ROOT_SELECTOR:"."+(e.cssClasses=i).ROOT};e.strings=r},function(t,e,n){"use strict";var i,r=this&&this.__extends||(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),o=this&&this.__assign||function(){return(o=Object.assign||function(t){for(var e,n=1,i=arguments.length;n<i;n++)for(var r in e=arguments[n])Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t}).apply(this,arguments)};Object.defineProperty(e,"__esModule",{value:!0});var s,a=n(0),c=n(36),u=["mousedown","touchstart"],l=["click","keydown"],d=(s=a.MDCFoundation,r(p,s),Object.defineProperty(p,"cssClasses",{get:function(){return c.cssClasses},enumerable:!0,configurable:!0}),Object.defineProperty(p,"strings",{get:function(){return c.strings},enumerable:!0,configurable:!0}),Object.defineProperty(p,"numbers",{get:function(){return c.numbers},enumerable:!0,configurable:!0}),Object.defineProperty(p.prototype,"shouldAlwaysFloat_",{get:function(){var t=this.getNativeInput_().type;return 0<=c.ALWAYS_FLOAT_TYPES.indexOf(t)},enumerable:!0,configurable:!0}),Object.defineProperty(p.prototype,"shouldFloat",{get:function(){return this.shouldAlwaysFloat_||this.isFocused_||!!this.getValue()||this.isBadInput_()},enumerable:!0,configurable:!0}),Object.defineProperty(p.prototype,"shouldShake",{get:function(){return!this.isFocused_&&!this.isValid()&&!!this.getValue()},enumerable:!0,configurable:!0}),Object.defineProperty(p,"defaultAdapter",{get:function(){return{addClass:function(){},removeClass:function(){},hasClass:function(){return!0},registerTextFieldInteractionHandler:function(){},deregisterTextFieldInteractionHandler:function(){},registerInputInteractionHandler:function(){},deregisterInputInteractionHandler:function(){},registerValidationAttributeChangeHandler:function(){return new MutationObserver(function(){})},deregisterValidationAttributeChangeHandler:function(){},getNativeInput:function(){return null},isFocused:function(){return!1},activateLineRipple:function(){},deactivateLineRipple:function(){},setLineRippleTransformOrigin:function(){},shakeLabel:function(){},floatLabel:function(){},setLabelRequired:function(){},hasLabel:function(){return!1},getLabelWidth:function(){return 0},hasOutline:function(){return!1},notchOutline:function(){},closeOutline:function(){}}},enumerable:!0,configurable:!0}),p.prototype.init=function(){var e=this;this.adapter.hasLabel()&&this.getNativeInput_().required&&this.adapter.setLabelRequired(!0),this.adapter.isFocused()?this.inputFocusHandler_():this.adapter.hasLabel()&&this.shouldFloat&&(this.notchOutline(!0),this.adapter.floatLabel(!0),this.styleFloating_(!0)),this.adapter.registerInputInteractionHandler("focus",this.inputFocusHandler_),this.adapter.registerInputInteractionHandler("blur",this.inputBlurHandler_),this.adapter.registerInputInteractionHandler("input",this.inputInputHandler_),u.forEach(function(t){e.adapter.registerInputInteractionHandler(t,e.setPointerXOffset_)}),l.forEach(function(t){e.adapter.registerTextFieldInteractionHandler(t,e.textFieldInteractionHandler_)}),this.validationObserver_=this.adapter.registerValidationAttributeChangeHandler(this.validationAttributeChangeHandler_),this.setCharacterCounter_(this.getValue().length)},p.prototype.destroy=function(){var e=this;this.adapter.deregisterInputInteractionHandler("focus",this.inputFocusHandler_),this.adapter.deregisterInputInteractionHandler("blur",this.inputBlurHandler_),this.adapter.deregisterInputInteractionHandler("input",this.inputInputHandler_),u.forEach(function(t){e.adapter.deregisterInputInteractionHandler(t,e.setPointerXOffset_)}),l.forEach(function(t){e.adapter.deregisterTextFieldInteractionHandler(t,e.textFieldInteractionHandler_)}),this.adapter.deregisterValidationAttributeChangeHandler(this.validationObserver_)},p.prototype.handleTextFieldInteraction=function(){var t=this.adapter.getNativeInput();t&&t.disabled||(this.receivedUserInput_=!0)},p.prototype.handleValidationAttributeChange=function(t){var e=this;t.some(function(t){return-1<c.VALIDATION_ATTR_WHITELIST.indexOf(t)&&(e.styleValidity_(!0),e.adapter.setLabelRequired(e.getNativeInput_().required),!0)}),-1<t.indexOf("maxlength")&&this.setCharacterCounter_(this.getValue().length)},p.prototype.notchOutline=function(t){if(this.adapter.hasOutline())if(t){var e=this.adapter.getLabelWidth()*c.numbers.LABEL_SCALE;this.adapter.notchOutline(e)}else this.adapter.closeOutline()},p.prototype.activateFocus=function(){this.isFocused_=!0,this.styleFocused_(this.isFocused_),this.adapter.activateLineRipple(),this.adapter.hasLabel()&&(this.notchOutline(this.shouldFloat),this.adapter.floatLabel(this.shouldFloat),this.styleFloating_(this.shouldFloat),this.adapter.shakeLabel(this.shouldShake)),this.helperText_&&this.helperText_.showToScreenReader()},p.prototype.setTransformOrigin=function(t){if(!this.isDisabled()&&!this.adapter.hasOutline()){var e=t.touches,n=e?e[0]:t,i=n.target.getBoundingClientRect(),r=n.clientX-i.left;this.adapter.setLineRippleTransformOrigin(r)}},p.prototype.handleInput=function(){this.autoCompleteFocus(),this.setCharacterCounter_(this.getValue().length)},p.prototype.autoCompleteFocus=function(){this.receivedUserInput_||this.activateFocus()},p.prototype.deactivateFocus=function(){this.isFocused_=!1,this.adapter.deactivateLineRipple();var t=this.isValid();this.styleValidity_(t),this.styleFocused_(this.isFocused_),this.adapter.hasLabel()&&(this.notchOutline(this.shouldFloat),this.adapter.floatLabel(this.shouldFloat),this.styleFloating_(this.shouldFloat),this.adapter.shakeLabel(this.shouldShake)),this.shouldFloat||(this.receivedUserInput_=!1)},p.prototype.getValue=function(){return this.getNativeInput_().value},p.prototype.setValue=function(t){this.getValue()!==t&&(this.getNativeInput_().value=t),this.setCharacterCounter_(t.length);var e=this.isValid();this.styleValidity_(e),this.adapter.hasLabel()&&(this.notchOutline(this.shouldFloat),this.adapter.floatLabel(this.shouldFloat),this.styleFloating_(this.shouldFloat),this.adapter.shakeLabel(this.shouldShake))},p.prototype.isValid=function(){return this.useNativeValidation_?this.isNativeInputValid_():this.isValid_},p.prototype.setValid=function(t){this.isValid_=t,this.styleValidity_(t);var e=!t&&!this.isFocused_&&!!this.getValue();this.adapter.hasLabel()&&this.adapter.shakeLabel(e)},p.prototype.setUseNativeValidation=function(t){this.useNativeValidation_=t},p.prototype.isDisabled=function(){return this.getNativeInput_().disabled},p.prototype.setDisabled=function(t){this.getNativeInput_().disabled=t,this.styleDisabled_(t)},p.prototype.setHelperTextContent=function(t){this.helperText_&&this.helperText_.setContent(t)},p.prototype.setLeadingIconAriaLabel=function(t){this.leadingIcon_&&this.leadingIcon_.setAriaLabel(t)},p.prototype.setLeadingIconContent=function(t){this.leadingIcon_&&this.leadingIcon_.setContent(t)},p.prototype.setTrailingIconAriaLabel=function(t){this.trailingIcon_&&this.trailingIcon_.setAriaLabel(t)},p.prototype.setTrailingIconContent=function(t){this.trailingIcon_&&this.trailingIcon_.setContent(t)},p.prototype.setCharacterCounter_=function(t){if(this.characterCounter_){var e=this.getNativeInput_().maxLength;if(-1===e)throw new Error("MDCTextFieldFoundation: Expected maxlength html property on text input or textarea.");this.characterCounter_.setCounterValue(t,e)}},p.prototype.isBadInput_=function(){return this.getNativeInput_().validity.badInput||!1},p.prototype.isNativeInputValid_=function(){return this.getNativeInput_().validity.valid},p.prototype.styleValidity_=function(t){var e=p.cssClasses.INVALID;t?this.adapter.removeClass(e):this.adapter.addClass(e),this.helperText_&&this.helperText_.setValidity(t)},p.prototype.styleFocused_=function(t){var e=p.cssClasses.FOCUSED;t?this.adapter.addClass(e):this.adapter.removeClass(e)},p.prototype.styleDisabled_=function(t){var e=p.cssClasses,n=e.DISABLED,i=e.INVALID;t?(this.adapter.addClass(n),this.adapter.removeClass(i)):this.adapter.removeClass(n),this.leadingIcon_&&this.leadingIcon_.setDisabled(t),this.trailingIcon_&&this.trailingIcon_.setDisabled(t)},p.prototype.styleFloating_=function(t){var e=p.cssClasses.LABEL_FLOATING;t?this.adapter.addClass(e):this.adapter.removeClass(e)},p.prototype.getNativeInput_=function(){return(this.adapter?this.adapter.getNativeInput():null)||{disabled:!1,maxLength:-1,required:!1,type:"input",validity:{badInput:!1,valid:!0},value:""}},p);function p(t,e){void 0===e&&(e={});var n=s.call(this,o(o({},p.defaultAdapter),t))||this;return n.isFocused_=!1,n.receivedUserInput_=!1,n.isValid_=!0,n.useNativeValidation_=!0,n.helperText_=e.helperText,n.characterCounter_=e.characterCounter,n.leadingIcon_=e.leadingIcon,n.trailingIcon_=e.trailingIcon,n.inputFocusHandler_=function(){return n.activateFocus()},n.inputBlurHandler_=function(){return n.deactivateFocus()},n.inputInputHandler_=function(){return n.handleInput()},n.setPointerXOffset_=function(t){return n.setTransformOrigin(t)},n.textFieldInteractionHandler_=function(){return n.handleTextFieldInteraction()},n.validationAttributeChangeHandler_=function(t){return n.handleValidationAttributeChange(t)},n}e.MDCTextFieldFoundation=d,e.default=d},function(t,e,n){"use strict";var i,r=this&&this.__extends||(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)});Object.defineProperty(e,"__esModule",{value:!0});var o,s=n(1),a=n(37),c=(o=s.MDCComponent,r(u,o),u.attachTo=function(t){return new u(t)},Object.defineProperty(u.prototype,"foundationForTextField",{get:function(){return this.foundation},enumerable:!0,configurable:!0}),u.prototype.getDefaultFoundation=function(){var n=this,t={addClass:function(t){return n.root.classList.add(t)},removeClass:function(t){return n.root.classList.remove(t)},hasClass:function(t){return n.root.classList.contains(t)},setAttr:function(t,e){return n.root.setAttribute(t,e)},removeAttr:function(t){return n.root.removeAttribute(t)},setContent:function(t){n.root.textContent=t}};return new a.MDCTextFieldHelperTextFoundation(t)},u);function u(){return null!==o&&o.apply(this,arguments)||this}e.MDCTextFieldHelperText=c},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i={HELPER_TEXT_PERSISTENT:"mdc-text-field-helper-text--persistent",HELPER_TEXT_VALIDATION_MSG:"mdc-text-field-helper-text--validation-msg",ROOT:"mdc-text-field-helper-text"},r={ARIA_HIDDEN:"aria-hidden",ROLE:"role",ROOT_SELECTOR:"."+(e.cssClasses=i).ROOT};e.strings=r},function(t,e,n){"use strict";var i,r=this&&this.__extends||(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)});Object.defineProperty(e,"__esModule",{value:!0});var o,s=n(1),a=n(103),c=(o=s.MDCComponent,r(u,o),u.attachTo=function(t){return new u(t)},Object.defineProperty(u.prototype,"foundationForTextField",{get:function(){return this.foundation},enumerable:!0,configurable:!0}),u.prototype.getDefaultFoundation=function(){var n=this,t={getAttr:function(t){return n.root.getAttribute(t)},setAttr:function(t,e){return n.root.setAttribute(t,e)},removeAttr:function(t){return n.root.removeAttribute(t)},setContent:function(t){n.root.textContent=t},registerInteractionHandler:function(t,e){return n.listen(t,e)},deregisterInteractionHandler:function(t,e){return n.unlisten(t,e)},notifyIconAction:function(){return n.emit(a.MDCTextFieldIconFoundation.strings.ICON_EVENT,{},!0)}};return new a.MDCTextFieldIconFoundation(t)},u);function u(){return null!==o&&o.apply(this,arguments)||this}e.MDCTextFieldIcon=c},function(t,e,n){"use strict";var i,r=this&&this.__extends||(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),o=this&&this.__assign||function(){return(o=Object.assign||function(t){for(var e,n=1,i=arguments.length;n<i;n++)for(var r in e=arguments[n])Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t}).apply(this,arguments)};Object.defineProperty(e,"__esModule",{value:!0});var s,a=n(0),c=n(104),u=["click","keydown"],l=(s=a.MDCFoundation,r(d,s),Object.defineProperty(d,"strings",{get:function(){return c.strings},enumerable:!0,configurable:!0}),Object.defineProperty(d,"cssClasses",{get:function(){return c.cssClasses},enumerable:!0,configurable:!0}),Object.defineProperty(d,"defaultAdapter",{get:function(){return{getAttr:function(){return null},setAttr:function(){},removeAttr:function(){},setContent:function(){},registerInteractionHandler:function(){},deregisterInteractionHandler:function(){},notifyIconAction:function(){}}},enumerable:!0,configurable:!0}),d.prototype.init=function(){var e=this;this.savedTabIndex_=this.adapter.getAttr("tabindex"),u.forEach(function(t){e.adapter.registerInteractionHandler(t,e.interactionHandler_)})},d.prototype.destroy=function(){var e=this;u.forEach(function(t){e.adapter.deregisterInteractionHandler(t,e.interactionHandler_)})},d.prototype.setDisabled=function(t){this.savedTabIndex_&&(t?(this.adapter.setAttr("tabindex","-1"),this.adapter.removeAttr("role")):(this.adapter.setAttr("tabindex",this.savedTabIndex_),this.adapter.setAttr("role",c.strings.ICON_ROLE)))},d.prototype.setAriaLabel=function(t){this.adapter.setAttr("aria-label",t)},d.prototype.setContent=function(t){this.adapter.setContent(t)},d.prototype.handleInteraction=function(t){var e="Enter"===t.key||13===t.keyCode;"click"!==t.type&&!e||(t.preventDefault(),this.adapter.notifyIconAction())},d);function d(t){var e=s.call(this,o(o({},d.defaultAdapter),t))||this;return e.savedTabIndex_=null,e.interactionHandler_=function(t){return e.handleInteraction(t)},e}e.MDCTextFieldIconFoundation=l,e.default=l},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.strings={ICON_EVENT:"MDCTextField:icon",ICON_ROLE:"button"};e.cssClasses={ROOT:"mdc-text-field__icon"}},function(t,e,n){"use strict";var i,r=this&&this.__extends||(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)});Object.defineProperty(e,"__esModule",{value:!0});var o,s=n(7),a=n(38),c=(o=a.MDCTopAppBarFoundation,r(u,o),u.prototype.handleTargetScroll=function(){this.adapter.getViewportScrollY()<=0?this.wasScrolled_&&(this.adapter.removeClass(s.cssClasses.FIXED_SCROLLED_CLASS),this.wasScrolled_=!1):this.wasScrolled_||(this.adapter.addClass(s.cssClasses.FIXED_SCROLLED_CLASS),this.wasScrolled_=!0)},u);function u(){var t=null!==o&&o.apply(this,arguments)||this;return t.wasScrolled_=!1,t}e.MDCFixedTopAppBarFoundation=c,e.default=c},function(t,e,n){"use strict";var i,r=this&&this.__extends||(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)});Object.defineProperty(e,"__esModule",{value:!0});var o,s=n(7),a=n(39),c=(o=a.MDCTopAppBarBaseFoundation,r(u,o),Object.defineProperty(u.prototype,"isCollapsed",{get:function(){return this.isCollapsed_},enumerable:!0,configurable:!0}),u.prototype.init=function(){o.prototype.init.call(this),0<this.adapter.getTotalActionItems()&&this.adapter.addClass(s.cssClasses.SHORT_HAS_ACTION_ITEM_CLASS),this.setAlwaysCollapsed(this.adapter.hasClass(s.cssClasses.SHORT_COLLAPSED_CLASS))},u.prototype.setAlwaysCollapsed=function(t){this.isAlwaysCollapsed_=!!t,this.isAlwaysCollapsed_?this.collapse_():this.maybeCollapseBar_()},u.prototype.getAlwaysCollapsed=function(){return this.isAlwaysCollapsed_},u.prototype.handleTargetScroll=function(){this.maybeCollapseBar_()},u.prototype.maybeCollapseBar_=function(){this.isAlwaysCollapsed_||(this.adapter.getViewportScrollY()<=0?this.isCollapsed_&&this.uncollapse_():this.isCollapsed_||this.collapse_())},u.prototype.uncollapse_=function(){this.adapter.removeClass(s.cssClasses.SHORT_COLLAPSED_CLASS),this.isCollapsed_=!1},u.prototype.collapse_=function(){this.adapter.addClass(s.cssClasses.SHORT_COLLAPSED_CLASS),this.isCollapsed_=!0},u);function u(t){var e=o.call(this,t)||this;return e.isCollapsed_=!1,e.isAlwaysCollapsed_=!1,e}e.MDCShortTopAppBarFoundation=c,e.default=c},function(t,e,n){"use strict";var i=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}},r=this&&this.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e};Object.defineProperty(e,"__esModule",{value:!0});var o=i(n(108));e.autoInit=o.default;var s=r(n(110));e.base=s;var a=r(n(111));e.checkbox=a;var c=r(n(112));e.chips=c;var u=r(n(118));e.circularProgress=u;var l=r(n(120));e.dataTable=l;var d=r(n(122));e.dialog=d;var p=r(n(124));e.dom=p;var f=r(n(125));e.drawer=f;var h=r(n(128));e.floatingLabel=h;var _=r(n(129));e.formField=_;var C=r(n(131));e.iconButton=C;var y=r(n(133));e.lineRipple=y;var E=r(n(134));e.linearProgress=E;var g=r(n(136));e.list=g;var m=r(n(137));e.menuSurface=m;var A=r(n(138));e.menu=A;var v=r(n(139));e.notchedOutline=v;var b=r(n(140));e.radio=b;var T=r(n(142));e.ripple=T;var I=r(n(143));e.select=I;var O=r(n(147));e.slider=O;var S=r(n(149));e.snackbar=S;var R=r(n(151));e.switchControl=R;var L=r(n(153));e.tabBar=L;var D=r(n(158));e.tabIndicator=D;var P=r(n(159));e.tabScroller=P;var M=r(n(160));e.tab=M;var N=r(n(161));e.textField=N;var x=r(n(166));e.topAppBar=x,o.default.register("MDCCheckbox",a.MDCCheckbox),o.default.register("MDCChip",c.MDCChip),o.default.register("MDCChipSet",c.MDCChipSet),o.default.register("MDCCircularProgress",u.MDCCircularProgress),o.default.register("MDCDataTable",l.MDCDataTable),o.default.register("MDCDialog",d.MDCDialog),o.default.register("MDCDrawer",f.MDCDrawer),o.default.register("MDCFloatingLabel",h.MDCFloatingLabel),o.default.register("MDCFormField",_.MDCFormField),o.default.register("MDCIconButtonToggle",C.MDCIconButtonToggle),o.default.register("MDCLineRipple",y.MDCLineRipple),o.default.register("MDCLinearProgress",E.MDCLinearProgress),o.default.register("MDCList",g.MDCList),o.default.register("MDCMenu",A.MDCMenu),o.default.register("MDCMenuSurface",m.MDCMenuSurface),o.default.register("MDCNotchedOutline",v.MDCNotchedOutline),o.default.register("MDCRadio",b.MDCRadio),o.default.register("MDCRipple",T.MDCRipple),o.default.register("MDCSelect",I.MDCSelect),o.default.register("MDCSlider",O.MDCSlider),o.default.register("MDCSnackbar",S.MDCSnackbar),o.default.register("MDCSwitch",R.MDCSwitch),o.default.register("MDCTabBar",L.MDCTabBar),o.default.register("MDCTextField",N.MDCTextField),o.default.register("MDCTopAppBar",x.MDCTopAppBar)},function(t,e,n){"use strict";var d=this&&this.__values||function(t){var e="function"==typeof Symbol&&Symbol.iterator,n=e&&t[e],i=0;if(n)return n.call(t);if(t&&"number"==typeof t.length)return{next:function(){return t&&i>=t.length&&(t=void 0),{value:t&&t[i++],done:!t}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")};Object.defineProperty(e,"__esModule",{value:!0});var i=n(109),p=i.strings.AUTO_INIT_ATTR,f=i.strings.AUTO_INIT_STATE_ATTR,h=i.strings.INITIALIZED_STATE,_={},r=console.warn.bind(console);function o(t){var e,n;void 0===t&&(t=document);var i=[],r=[].slice.call(t.querySelectorAll("["+p+"]"));r=r.filter(function(t){return t.getAttribute(f)!==h});try{for(var o=d(r),s=o.next();!s.done;s=o.next()){var a=s.value,c=a.getAttribute(p);if(!c)throw new Error("(mdc-auto-init) Constructor name must be given.");var u=_[c];if("function"!=typeof u)throw new Error("(mdc-auto-init) Could not find constructor in registry for "+c);var l=u.attachTo(a);Object.defineProperty(a,c,{configurable:!0,enumerable:!1,value:l,writable:!1}),i.push(l),a.setAttribute(f,h)}}catch(t){e={error:t}}finally{try{s&&!s.done&&(n=o.return)&&n.call(o)}finally{if(e)throw e.error}}return function(t,e,n){var i;void 0===n&&(n=!1),"function"==typeof CustomEvent?i=new CustomEvent(t,{bubbles:n,detail:e}):(i=document.createEvent("CustomEvent")).initCustomEvent(t,n,!1,e),document.dispatchEvent(i)}("MDCAutoInit:End",{}),i}(e.mdcAutoInit=o).register=function(t,e,n){if(void 0===n&&(n=r),"function"!=typeof e)throw new Error("(mdc-auto-init) Invalid Constructor value: "+e+". Expected function.");var i=_[t];i&&n("(mdc-auto-init) Overriding registration for "+t+" with "+e+". Was: "+i),_[t]=e},o.deregister=function(t){delete _[t]},o.deregisterAll=function(){Object.keys(_).forEach(this.deregister,this)},e.default=o},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.strings={AUTO_INIT_ATTR:"data-mdc-auto-init",AUTO_INIT_STATE_ATTR:"data-mdc-auto-init-state",INITIALIZED_STATE:"initialized"}},function(t,n,e){"use strict";function i(t){for(var e in t)n.hasOwnProperty(e)||(n[e]=t[e])}Object.defineProperty(n,"__esModule",{value:!0}),i(e(1)),i(e(0))},function(t,n,e){"use strict";function i(t){for(var e in t)n.hasOwnProperty(e)||(n[e]=t[e])}Object.defineProperty(n,"__esModule",{value:!0}),i(e(40)),i(e(19)),i(e(42))},function(t,n,e){"use strict";function i(t){for(var e in t)n.hasOwnProperty(e)||(n[e]=t[e])}Object.defineProperty(n,"__esModule",{value:!0}),i(e(113)),i(e(114)),i(e(115))},function(t,n,e){"use strict";function i(t){for(var e in t)n.hasOwnProperty(e)||(n[e]=t[e])}Object.defineProperty(n,"__esModule",{value:!0}),i(e(43)),i(e(44));var r=e(10);n.trailingActionStrings=r.strings},function(t,n,e){"use strict";function i(t){for(var e in t)n.hasOwnProperty(e)||(n[e]=t[e])}Object.defineProperty(n,"__esModule",{value:!0}),i(e(45)),i(e(20));var r=e(11);n.chipCssClasses=r.cssClasses,n.chipStrings=r.strings},function(t,n,e){"use strict";function i(t){for(var e in t)n.hasOwnProperty(e)||(n[e]=t[e])}Object.defineProperty(n,"__esModule",{value:!0}),i(e(116)),i(e(46));var r=e(47);n.chipSetCssClasses=r.cssClasses,n.chipSetStrings=r.strings},function(t,e,n){"use strict";var i,r=this&&this.__extends||(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)});Object.defineProperty(e,"__esModule",{value:!0});var o,s=n(1),a=n(117),c=n(45),u=n(20),l=n(46),d=u.MDCChipFoundation.strings,p=d.INTERACTION_EVENT,f=d.SELECTION_EVENT,h=d.REMOVAL_EVENT,_=d.NAVIGATION_EVENT,C=l.MDCChipSetFoundation.strings.CHIP_SELECTOR,y=0,E=(o=s.MDCComponent,r(g,o),g.attachTo=function(t){return new g(t)},Object.defineProperty(g.prototype,"chips",{get:function(){return this.chips_.slice()},enumerable:!0,configurable:!0}),Object.defineProperty(g.prototype,"selectedChipIds",{get:function(){return this.foundation.getSelectedChipIds()},enumerable:!0,configurable:!0}),g.prototype.initialize=function(t){void 0===t&&(t=function(t){return new c.MDCChip(t)}),this.chipFactory_=t,this.chips_=this.instantiateChips_(this.chipFactory_)},g.prototype.initialSyncWithDOM=function(){var e=this;this.chips_.forEach(function(t){t.id&&t.selected&&e.foundation.select(t.id)}),this.handleChipInteraction_=function(t){return e.foundation.handleChipInteraction(t.detail)},this.handleChipSelection_=function(t){return e.foundation.handleChipSelection(t.detail)},this.handleChipRemoval_=function(t){return e.foundation.handleChipRemoval(t.detail)},this.handleChipNavigation_=function(t){return e.foundation.handleChipNavigation(t.detail)},this.listen(p,this.handleChipInteraction_),this.listen(f,this.handleChipSelection_),this.listen(h,this.handleChipRemoval_),this.listen(_,this.handleChipNavigation_)},g.prototype.destroy=function(){this.chips_.forEach(function(t){t.destroy()}),this.unlisten(p,this.handleChipInteraction_),this.unlisten(f,this.handleChipSelection_),this.unlisten(h,this.handleChipRemoval_),this.unlisten(_,this.handleChipNavigation_),o.prototype.destroy.call(this)},g.prototype.addChip=function(t){t.id=t.id||"mdc-chip-"+ ++y,this.chips_.push(this.chipFactory_(t))},g.prototype.getDefaultFoundation=function(){var i=this,t={announceMessage:function(t){a.announce(t)},focusChipPrimaryActionAtIndex:function(t){i.chips_[t].focusPrimaryAction()},focusChipTrailingActionAtIndex:function(t){i.chips_[t].focusTrailingAction()},getChipListCount:function(){return i.chips_.length},getIndexOfChipById:function(t){return i.findChipIndex_(t)},hasClass:function(t){return i.root.classList.contains(t)},isRTL:function(){return"rtl"===window.getComputedStyle(i.root).getPropertyValue("direction")},removeChipAtIndex:function(t){0<=t&&t<i.chips_.length&&(i.chips_[t].destroy(),i.chips_[t].remove(),i.chips_.splice(t,1))},removeFocusFromChipAtIndex:function(t){i.chips_[t].removeFocus()},selectChipAtIndex:function(t,e,n){0<=t&&t<i.chips_.length&&i.chips_[t].setSelectedFromChipSet(e,n)}};return new l.MDCChipSetFoundation(t)},g.prototype.instantiateChips_=function(e){return[].slice.call(this.root.querySelectorAll(C)).map(function(t){return t.id=t.id||"mdc-chip-"+ ++y,e(t)})},g.prototype.findChipIndex_=function(t){for(var e=0;e<this.chips_.length;e++)if(this.chips_[e].id===t)return e;return-1},g);function g(){return null!==o&&o.apply(this,arguments)||this}e.MDCChipSet=E},function(t,e,n){"use strict";var r,i;Object.defineProperty(e,"__esModule",{value:!0}),(i=r=e.AnnouncerPriority||(e.AnnouncerPriority={})).POLITE="polite",i.ASSERTIVE="assertive",e.announce=function(t,e){o.getInstance().say(t,e)};var o=(s.getInstance=function(){return s.instance||(s.instance=new s),s.instance},s.prototype.say=function(t,e){void 0===e&&(e=r.POLITE);var n=this.getLiveRegion(e);function i(){n.textContent="",document.removeEventListener("click",i)}n.textContent="",setTimeout(function(){n.textContent=t,document.addEventListener("click",i)},1)},s.prototype.getLiveRegion=function(t){var e=this.liveRegions.get(t);if(e&&document.body.contains(e))return e;var n=this.createLiveRegion(t);return this.liveRegions.set(t,n),n},s.prototype.createLiveRegion=function(t){var e=document.createElement("div");return e.style.position="absolute",e.style.top="-9999px",e.style.left="-9999px",e.style.height="1px",e.style.overflow="hidden",e.setAttribute("aria-atomic","true"),e.setAttribute("aria-live",t),document.body.appendChild(e),e},s);function s(){this.liveRegions=new Map}},function(t,n,e){"use strict";function i(t){for(var e in t)n.hasOwnProperty(e)||(n[e]=t[e])}Object.defineProperty(n,"__esModule",{value:!0}),i(e(119)),i(e(49)),i(e(48))},function(t,e,n){"use strict";var i,r=this&&this.__extends||(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)});Object.defineProperty(e,"__esModule",{value:!0});var o,s=n(1),a=n(48),c=(o=s.MDCComponent,r(u,o),u.prototype.initialize=function(){this.determinateCircle_=this.root.querySelector(a.MDCCircularProgressFoundation.strings.DETERMINATE_CIRCLE_SELECTOR)},u.attachTo=function(t){return new u(t)},Object.defineProperty(u.prototype,"determinate",{set:function(t){this.foundation.setDeterminate(t)},enumerable:!0,configurable:!0}),Object.defineProperty(u.prototype,"progress",{set:function(t){this.foundation.setProgress(t)},enumerable:!0,configurable:!0}),Object.defineProperty(u.prototype,"isClosed",{get:function(){return this.foundation.isClosed()},enumerable:!0,configurable:!0}),u.prototype.open=function(){this.foundation.open()},u.prototype.close=function(){this.foundation.close()},u.prototype.getDefaultFoundation=function(){var n=this,t={addClass:function(t){return n.root.classList.add(t)},getDeterminateCircleAttribute:function(t){return n.determinateCircle_.getAttribute(t)},hasClass:function(t){return n.root.classList.contains(t)},removeClass:function(t){return n.root.classList.remove(t)},removeAttribute:function(t){return n.root.removeAttribute(t)},setAttribute:function(t,e){return n.root.setAttribute(t,e)},setDeterminateCircleAttribute:function(t,e){return n.determinateCircle_.setAttribute(t,e)}};return new a.MDCCircularProgressFoundation(t)},u);function u(){return null!==o&&o.apply(this,arguments)||this}e.MDCCircularProgress=c},function(t,n,e){"use strict";function i(t){for(var e in t)n.hasOwnProperty(e)||(n[e]=t[e])}Object.defineProperty(n,"__esModule",{value:!0}),i(e(121)),i(e(50)),i(e(21))},function(t,e,n){"use strict";var i,r=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(t[i]=n[i])}return t},o=this&&this.__extends||(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)});Object.defineProperty(e,"__esModule",{value:!0});var s,a=n(1),c=n(40),u=n(2),l=n(21),d=n(50),p=(s=a.MDCComponent,o(f,s),f.attachTo=function(t){return new f(t)},f.prototype.initialize=function(t){void 0===t&&(t=function(t){return new c.MDCCheckbox(t)}),this.checkboxFactory=t},f.prototype.initialSyncWithDOM=function(){var e=this;this.headerRow=this.root.querySelector("."+l.cssClasses.HEADER_ROW),this.handleHeaderRowCheckboxChange=function(){return e.foundation.handleHeaderRowCheckboxChange()},this.headerRow.addEventListener("change",this.handleHeaderRowCheckboxChange),this.headerRowClickListener=function(t){e.handleHeaderRowClick(t)},this.headerRow.addEventListener("click",this.headerRowClickListener),this.content=this.root.querySelector("."+l.cssClasses.CONTENT),this.handleRowCheckboxChange=function(t){return e.foundation.handleRowCheckboxChange(t)},this.content.addEventListener("change",this.handleRowCheckboxChange),this.layout()},f.prototype.layout=function(){this.foundation.layout()},f.prototype.getHeaderCells=function(){return[].slice.call(this.root.querySelectorAll(l.selectors.HEADER_CELL))},f.prototype.getRows=function(){return this.foundation.getRows()},f.prototype.getSelectedRowIds=function(){return this.foundation.getSelectedRowIds()},f.prototype.setSelectedRowIds=function(t){this.foundation.setSelectedRowIds(t)},f.prototype.destroy=function(){this.headerRow.removeEventListener("change",this.handleHeaderRowCheckboxChange),this.headerRow.removeEventListener("click",this.headerRowClickListener),this.content.removeEventListener("change",this.handleRowCheckboxChange),this.headerRowCheckbox.destroy(),this.rowCheckboxList.forEach(function(t){t.destroy()})},f.prototype.getDefaultFoundation=function(){var i=this,t={addClass:function(t){i.root.classList.add(t)},removeClass:function(t){i.root.classList.remove(t)},getHeaderCellElements:function(){return i.getHeaderCells()},getHeaderCellCount:function(){return i.getHeaderCells().length},getAttributeByHeaderCellIndex:function(t,e){return i.getHeaderCells()[t].getAttribute(e)},setAttributeByHeaderCellIndex:function(t,e,n){i.getHeaderCells()[t].setAttribute(e,n)},setClassNameByHeaderCellIndex:function(t,e){i.getHeaderCells()[t].classList.add(e)},removeClassNameByHeaderCellIndex:function(t,e){i.getHeaderCells()[t].classList.remove(e)},notifySortAction:function(t){i.emit(l.events.SORTED,t,!0)},getTableBodyHeight:function(){var t=i.root.querySelector(l.selectors.CONTENT);if(!t)throw new Error("MDCDataTable: Table body element not found.");return t.getBoundingClientRect().height+"px"},getTableHeaderHeight:function(){var t=i.root.querySelector(l.selectors.HEADER_ROW);if(!t)throw new Error("MDCDataTable: Table header element not found.");return t.getBoundingClientRect().height+"px"},setProgressIndicatorStyles:function(t){var e=i.root.querySelector(l.selectors.PROGRESS_INDICATOR);if(!e)throw new Error("MDCDataTable: Progress indicator element not found.");r(e.style,t)},addClassAtRowIndex:function(t,e){i.getRows()[t].classList.add(e)},getRowCount:function(){return i.getRows().length},getRowElements:function(){return[].slice.call(i.root.querySelectorAll(l.selectors.ROW))},getRowIdAtIndex:function(t){return i.getRows()[t].getAttribute(l.dataAttributes.ROW_ID)},getRowIndexByChildElement:function(t){return i.getRows().indexOf(u.closest(t,l.selectors.ROW))},getSelectedRowCount:function(){return i.root.querySelectorAll(l.selectors.ROW_SELECTED).length},isCheckboxAtRowIndexChecked:function(t){return i.rowCheckboxList[t].checked},isHeaderRowCheckboxChecked:function(){return i.headerRowCheckbox.checked},isRowsSelectable:function(){return!!i.root.querySelector(l.selectors.ROW_CHECKBOX)},notifyRowSelectionChanged:function(t){i.emit(l.events.ROW_SELECTION_CHANGED,{row:i.getRowByIndex(t.rowIndex),rowId:i.getRowIdByIndex(t.rowIndex),rowIndex:t.rowIndex,selected:t.selected},!0)},notifySelectedAll:function(){i.emit(l.events.SELECTED_ALL,{},!0)},notifyUnselectedAll:function(){i.emit(l.events.UNSELECTED_ALL,{},!0)},registerHeaderRowCheckbox:function(){i.headerRowCheckbox&&i.headerRowCheckbox.destroy();var t=i.root.querySelector(l.selectors.HEADER_ROW_CHECKBOX);i.headerRowCheckbox=i.checkboxFactory(t)},registerRowCheckboxes:function(){i.rowCheckboxList&&i.rowCheckboxList.forEach(function(t){t.destroy()}),i.rowCheckboxList=[],i.getRows().forEach(function(t){var e=i.checkboxFactory(t.querySelector(l.selectors.ROW_CHECKBOX));i.rowCheckboxList.push(e)})},removeClassAtRowIndex:function(t,e){i.getRows()[t].classList.remove(e)},setAttributeAtRowIndex:function(t,e,n){i.getRows()[t].setAttribute(e,n)},setHeaderRowCheckboxChecked:function(t){i.headerRowCheckbox.checked=t},setHeaderRowCheckboxIndeterminate:function(t){i.headerRowCheckbox.indeterminate=t},setRowCheckboxCheckedAtIndex:function(t,e){i.rowCheckboxList[t].checked=e},setSortStatusLabelByHeaderCellIndex:function(t,e){var n=i.getHeaderCells()[t].querySelector(l.selectors.SORT_STATUS_LABEL);n&&(n.textContent=i.getSortStatusMessageBySortValue(e))}};return new d.MDCDataTableFoundation(t)},f.prototype.getRowByIndex=function(t){return this.getRows()[t]},f.prototype.getRowIdByIndex=function(t){return this.getRowByIndex(t).getAttribute(l.dataAttributes.ROW_ID)},f.prototype.handleHeaderRowClick=function(t){var e=u.closest(t.target,l.selectors.HEADER_CELL_WITH_SORT);if(e){var n=e.getAttribute(l.dataAttributes.COLUMN_ID),i=this.getHeaderCells().indexOf(e);-1!==i&&this.foundation.handleSortAction({columnId:n,columnIndex:i,headerCell:e})}},f.prototype.getSortStatusMessageBySortValue=function(t){switch(t){case l.SortValue.ASCENDING:return l.messages.SORTED_IN_ASCENDING;case l.SortValue.DESCENDING:return l.messages.SORTED_IN_DESCENDING;default:return""}},f);function f(){return null!==s&&s.apply(this,arguments)||this}e.MDCDataTable=p},function(t,n,e){"use strict";function i(t){for(var e in t)n.hasOwnProperty(e)||(n[e]=t[e])}var r=this&&this.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e};Object.defineProperty(n,"__esModule",{value:!0});var o=r(e(51));n.util=o,i(e(123)),i(e(53)),i(e(52))},function(t,e,n){"use strict";var i,r=this&&this.__extends||(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),a=this&&this.__values||function(t){var e="function"==typeof Symbol&&Symbol.iterator,n=e&&t[e],i=0;if(n)return n.call(t);if(t&&"number"==typeof t.length)return{next:function(){return t&&i>=t.length&&(t=void 0),{value:t&&t[i++],done:!t}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")},o=this&&this.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e};Object.defineProperty(e,"__esModule",{value:!0});var s,c=n(1),u=n(22),l=n(2),d=n(3),p=n(52),f=o(n(51)),h=p.MDCDialogFoundation.strings,_=(s=c.MDCComponent,r(C,s),Object.defineProperty(C.prototype,"isOpen",{get:function(){return this.foundation.isOpen()},enumerable:!0,configurable:!0}),Object.defineProperty(C.prototype,"escapeKeyAction",{get:function(){return this.foundation.getEscapeKeyAction()},set:function(t){this.foundation.setEscapeKeyAction(t)},enumerable:!0,configurable:!0}),Object.defineProperty(C.prototype,"scrimClickAction",{get:function(){return this.foundation.getScrimClickAction()},set:function(t){this.foundation.setScrimClickAction(t)},enumerable:!0,configurable:!0}),Object.defineProperty(C.prototype,"autoStackButtons",{get:function(){return this.foundation.getAutoStackButtons()},set:function(t){this.foundation.setAutoStackButtons(t)},enumerable:!0,configurable:!0}),C.attachTo=function(t){return new C(t)},C.prototype.initialize=function(t){var e,n;void 0===t&&(t=function(t,e){return new u.FocusTrap(t,e)});var i=this.root.querySelector(h.CONTAINER_SELECTOR);if(!i)throw new Error("Dialog component requires a "+h.CONTAINER_SELECTOR+" container element");this.container_=i,this.content_=this.root.querySelector(h.CONTENT_SELECTOR),this.buttons_=[].slice.call(this.root.querySelectorAll(h.BUTTON_SELECTOR)),this.defaultButton_=this.root.querySelector("["+h.BUTTON_DEFAULT_ATTRIBUTE+"]"),this.focusTrapFactory_=t,this.buttonRipples_=[];try{for(var r=a(this.buttons_),o=r.next();!o.done;o=r.next()){var s=o.value;this.buttonRipples_.push(new d.MDCRipple(s))}}catch(t){e={error:t}}finally{try{o&&!o.done&&(n=r.return)&&n.call(r)}finally{if(e)throw e.error}}},C.prototype.initialSyncWithDOM=function(){var e=this;this.focusTrap_=f.createFocusTrapInstance(this.container_,this.focusTrapFactory_,this.getInitialFocusEl_()||void 0),this.handleClick_=this.foundation.handleClick.bind(this.foundation),this.handleKeydown_=this.foundation.handleKeydown.bind(this.foundation),this.handleDocumentKeydown_=this.foundation.handleDocumentKeydown.bind(this.foundation),this.handleLayout_=this.layout.bind(this);var t=["resize","orientationchange"];this.handleOpening_=function(){t.forEach(function(t){return window.addEventListener(t,e.handleLayout_)}),document.addEventListener("keydown",e.handleDocumentKeydown_)},this.handleClosing_=function(){t.forEach(function(t){return window.removeEventListener(t,e.handleLayout_)}),document.removeEventListener("keydown",e.handleDocumentKeydown_)},this.listen("click",this.handleClick_),this.listen("keydown",this.handleKeydown_),this.listen(h.OPENING_EVENT,this.handleOpening_),this.listen(h.CLOSING_EVENT,this.handleClosing_)},C.prototype.destroy=function(){this.unlisten("click",this.handleClick_),this.unlisten("keydown",this.handleKeydown_),this.unlisten(h.OPENING_EVENT,this.handleOpening_),this.unlisten(h.CLOSING_EVENT,this.handleClosing_),this.handleClosing_(),this.buttonRipples_.forEach(function(t){return t.destroy()}),s.prototype.destroy.call(this)},C.prototype.layout=function(){this.foundation.layout()},C.prototype.open=function(){this.foundation.open()},C.prototype.close=function(t){void 0===t&&(t=""),this.foundation.close(t)},C.prototype.getDefaultFoundation=function(){var e=this,t={addBodyClass:function(t){return document.body.classList.add(t)},addClass:function(t){return e.root.classList.add(t)},areButtonsStacked:function(){return f.areTopsMisaligned(e.buttons_)},clickDefaultButton:function(){return e.defaultButton_&&e.defaultButton_.click()},eventTargetMatches:function(t,e){return!!t&&l.matches(t,e)},getActionFromEvent:function(t){if(!t.target)return"";var e=l.closest(t.target,"["+h.ACTION_ATTRIBUTE+"]");return e&&e.getAttribute(h.ACTION_ATTRIBUTE)},getInitialFocusEl:function(){return e.getInitialFocusEl_()},hasClass:function(t){return e.root.classList.contains(t)},isContentScrollable:function(){return f.isScrollable(e.content_)},notifyClosed:function(t){return e.emit(h.CLOSED_EVENT,t?{action:t}:{})},notifyClosing:function(t){return e.emit(h.CLOSING_EVENT,t?{action:t}:{})},notifyOpened:function(){return e.emit(h.OPENED_EVENT,{})},notifyOpening:function(){return e.emit(h.OPENING_EVENT,{})},releaseFocus:function(){return e.focusTrap_.releaseFocus()},removeBodyClass:function(t){return document.body.classList.remove(t)},removeClass:function(t){return e.root.classList.remove(t)},reverseButtons:function(){e.buttons_.reverse(),e.buttons_.forEach(function(t){t.parentElement.appendChild(t)})},trapFocus:function(){return e.focusTrap_.trapFocus()}};return new p.MDCDialogFoundation(t)},C.prototype.getInitialFocusEl_=function(){return document.querySelector("["+h.INITIAL_FOCUS_ATTRIBUTE+"]")},C);function C(){return null!==s&&s.apply(this,arguments)||this}e.MDCDialog=_},function(t,e,n){"use strict";var i=this&&this.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e};Object.defineProperty(e,"__esModule",{value:!0});var r=i(n(5));e.events=r;var o=i(n(22));e.focusTrap=o;var s=i(n(8));e.keyboard=s;var a=i(n(2));e.ponyfill=a},function(t,n,e){"use strict";function i(t){for(var e in t)n.hasOwnProperty(e)||(n[e]=t[e])}var r=this&&this.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e};Object.defineProperty(n,"__esModule",{value:!0});var o=r(e(54));n.util=o,i(e(126)),i(e(56)),i(e(24)),i(e(57))},function(t,e,n){"use strict";var i,r=this&&this.__extends||(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),o=this&&this.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e};Object.defineProperty(e,"__esModule",{value:!0});var s,a=n(1),c=n(22),u=n(23),l=n(12),d=n(24),p=n(57),f=o(n(54)),h=d.MDCDismissibleDrawerFoundation.cssClasses,_=d.MDCDismissibleDrawerFoundation.strings,C=(s=a.MDCComponent,r(y,s),y.attachTo=function(t){return new y(t)},Object.defineProperty(y.prototype,"open",{get:function(){return this.foundation.isOpen()},set:function(t){t?this.foundation.open():this.foundation.close()},enumerable:!0,configurable:!0}),Object.defineProperty(y.prototype,"list",{get:function(){return this.list_},enumerable:!0,configurable:!0}),y.prototype.initialize=function(t,e){void 0===t&&(t=function(t){return new c.FocusTrap(t)}),void 0===e&&(e=function(t){return new u.MDCList(t)});var n=this.root.querySelector("."+l.MDCListFoundation.cssClasses.ROOT);n&&(this.list_=e(n),this.list_.wrapFocus=!0),this.focusTrapFactory_=t},y.prototype.initialSyncWithDOM=function(){var e=this,t=h.MODAL,n=_.SCRIM_SELECTOR;this.scrim_=this.root.parentNode.querySelector(n),this.scrim_&&this.root.classList.contains(t)&&(this.handleScrimClick_=function(){return e.foundation.handleScrimClick()},this.scrim_.addEventListener("click",this.handleScrimClick_),this.focusTrap_=f.createFocusTrapInstance(this.root,this.focusTrapFactory_)),this.handleKeydown_=function(t){return e.foundation.handleKeydown(t)},this.handleTransitionEnd_=function(t){return e.foundation.handleTransitionEnd(t)},this.listen("keydown",this.handleKeydown_),this.listen("transitionend",this.handleTransitionEnd_)},y.prototype.destroy=function(){this.unlisten("keydown",this.handleKeydown_),this.unlisten("transitionend",this.handleTransitionEnd_),this.list_&&this.list_.destroy();var t=h.MODAL;this.scrim_&&this.handleScrimClick_&&this.root.classList.contains(t)&&(this.scrim_.removeEventListener("click",this.handleScrimClick_),this.open=!1)},y.prototype.getDefaultFoundation=function(){var e=this,t={addClass:function(t){return e.root.classList.add(t)},removeClass:function(t){return e.root.classList.remove(t)},hasClass:function(t){return e.root.classList.contains(t)},elementHasClass:function(t,e){return t.classList.contains(e)},saveFocus:function(){return e.previousFocus_=document.activeElement},restoreFocus:function(){var t=e.previousFocus_;t&&t.focus&&e.root.contains(document.activeElement)&&t.focus()},focusActiveNavigationItem:function(){var t=e.root.querySelector("."+l.MDCListFoundation.cssClasses.LIST_ITEM_ACTIVATED_CLASS);t&&t.focus()},notifyClose:function(){return e.emit(_.CLOSE_EVENT,{},!0)},notifyOpen:function(){return e.emit(_.OPEN_EVENT,{},!0)},trapFocus:function(){return e.focusTrap_.trapFocus()},releaseFocus:function(){return e.focusTrap_.releaseFocus()}},n=h.DISMISSIBLE,i=h.MODAL;if(this.root.classList.contains(n))return new d.MDCDismissibleDrawerFoundation(t);if(this.root.classList.contains(i))return new p.MDCModalDrawerFoundation(t);throw new Error("MDCDrawer: Failed to instantiate component. Supported variants are "+n+" and "+i+".")},y);function y(){return null!==s&&s.apply(this,arguments)||this}e.MDCDrawer=C},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var C=n(8),u=n(9),y=n(55);function E(t,e){var n,i=t.nextChar,r=t.focusItemAtIndex,o=t.sortedIndexByFirstChar,s=t.focusedItemIndex,a=t.skipFocus,c=t.isItemAtIndexDisabled;return clearTimeout(e.bufferClearTimeout),e.bufferClearTimeout=setTimeout(function(){l(e)},u.numbers.TYPEAHEAD_BUFFER_CLEAR_TIMEOUT_MS),e.typeaheadBuffer=e.typeaheadBuffer+i,-1===(n=1===e.typeaheadBuffer.length?function(t,e,n,i){var r=i.typeaheadBuffer[0],o=t.get(r);if(!o)return-1;if(r===i.currentFirstChar&&o[i.sortedIndexCursor].index===e){i.sortedIndexCursor=(i.sortedIndexCursor+1)%o.length;var s=o[i.sortedIndexCursor].index;if(!n(s))return s}i.currentFirstChar=r;var a,c=-1;for(a=0;a<o.length;a++)if(!n(o[a].index)){c=a;break}for(;a<o.length;a++)if(o[a].index>e&&!n(o[a].index)){c=a;break}return-1===c?-1:(i.sortedIndexCursor=c,o[i.sortedIndexCursor].index)}(o,s,c,e):function(t,e,n){var i=n.typeaheadBuffer[0],r=t.get(i);if(!r)return-1;var o=r[n.sortedIndexCursor];if(0===o.text.lastIndexOf(n.typeaheadBuffer,0)&&!e(o.index))return o.index;var s=(n.sortedIndexCursor+1)%r.length,a=-1;for(;s!==n.sortedIndexCursor;){var c=r[s],u=0===c.text.lastIndexOf(n.typeaheadBuffer,0),l=!e(c.index);if(u&&l){a=s;break}s=(s+1)%r.length}return-1===a?-1:(n.sortedIndexCursor=a,r[n.sortedIndexCursor].index)}(o,c,e))||a||r(n),n}function g(t){return 0<t.typeaheadBuffer.length}function l(t){t.typeaheadBuffer=""}e.initState=function(){return{bufferClearTimeout:0,currentFirstChar:"",sortedIndexCursor:0,typeaheadBuffer:""}},e.initSortedIndex=function(t,e){for(var n=new Map,i=0;i<t;i++){var r=e(i).trim();if(r){var o=r[0].toLowerCase();n.has(o)||n.set(o,[]),n.get(o).push({text:r.toLowerCase(),index:i})}}return n.forEach(function(t){t.sort(function(t,e){return t.index-e.index})}),n},e.matchItem=E,e.isTypingInProgress=g,e.clearBuffer=l,e.handleKeydown=function(t,e){var n=t.event,i=t.isTargetListItem,r=t.focusedItemIndex,o=t.focusItemAtIndex,s=t.sortedIndexByFirstChar,a=t.isItemAtIndexDisabled,c="ArrowLeft"===C.normalizeKey(n),u="ArrowUp"===C.normalizeKey(n),l="ArrowRight"===C.normalizeKey(n),d="ArrowDown"===C.normalizeKey(n),p="Home"===C.normalizeKey(n),f="End"===C.normalizeKey(n),h="Enter"===C.normalizeKey(n),_="Spacebar"===C.normalizeKey(n);return c||u||l||d||p||f||h?-1:_||1!==n.key.length?_?(i&&y.preventDefaultEvent(n),i&&g(e)?E({focusItemAtIndex:o,focusedItemIndex:r,nextChar:" ",sortedIndexByFirstChar:s,skipFocus:!1,isItemAtIndexDisabled:a},e):-1):-1:(y.preventDefaultEvent(n),E({focusItemAtIndex:o,focusedItemIndex:r,nextChar:n.key.toLowerCase(),sortedIndexByFirstChar:s,skipFocus:!1,isItemAtIndexDisabled:a},e))}},function(t,n,e){"use strict";function i(t){for(var e in t)n.hasOwnProperty(e)||(n[e]=t[e])}Object.defineProperty(n,"__esModule",{value:!0}),i(e(25)),i(e(58)),i(e(26))},function(t,n,e){"use strict";function i(t){for(var e in t)n.hasOwnProperty(e)||(n[e]=t[e])}Object.defineProperty(n,"__esModule",{value:!0}),i(e(130)),i(e(60)),i(e(59))},function(t,e,n){"use strict";var i,r=this&&this.__extends||(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)});Object.defineProperty(e,"__esModule",{value:!0});var o,s=n(1),a=n(59),c=(o=s.MDCComponent,r(u,o),u.attachTo=function(t){return new u(t)},u.prototype.labelEl=function(){var t=a.MDCFormFieldFoundation.strings.LABEL_SELECTOR;return this.root.querySelector(t)},u.prototype.getDefaultFoundation=function(){var i=this,t={activateInputRipple:function(){i.input&&i.input.ripple&&i.input.ripple.activate()},deactivateInputRipple:function(){i.input&&i.input.ripple&&i.input.ripple.deactivate()},deregisterInteractionHandler:function(t,e){var n=i.labelEl();n&&n.removeEventListener(t,e)},registerInteractionHandler:function(t,e){var n=i.labelEl();n&&n.addEventListener(t,e)}};return new a.MDCFormFieldFoundation(t)},u);function u(){return null!==o&&o.apply(this,arguments)||this}e.MDCFormField=c},function(t,n,e){"use strict";function i(t){for(var e in t)n.hasOwnProperty(e)||(n[e]=t[e])}Object.defineProperty(n,"__esModule",{value:!0}),i(e(132)),i(e(62)),i(e(61))},function(t,e,n){"use strict";var i,r=this&&this.__extends||(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)});Object.defineProperty(e,"__esModule",{value:!0});var o,s=n(1),a=n(3),c=n(61),u=c.MDCIconButtonToggleFoundation.strings,l=(o=s.MDCComponent,r(d,o),d.attachTo=function(t){return new d(t)},d.prototype.initialSyncWithDOM=function(){var t=this;this.handleClick=function(){t.foundation.handleClick()},this.listen("click",this.handleClick)},d.prototype.destroy=function(){this.unlisten("click",this.handleClick),this.ripple.destroy(),o.prototype.destroy.call(this)},d.prototype.getDefaultFoundation=function(){var n=this,t={addClass:function(t){return n.root.classList.add(t)},hasClass:function(t){return n.root.classList.contains(t)},notifyChange:function(t){n.emit(u.CHANGE_EVENT,t)},removeClass:function(t){return n.root.classList.remove(t)},getAttr:function(t){return n.root.getAttribute(t)},setAttr:function(t,e){return n.root.setAttribute(t,e)}};return new c.MDCIconButtonToggleFoundation(t)},Object.defineProperty(d.prototype,"ripple",{get:function(){return this.rippleComponent},enumerable:!0,configurable:!0}),Object.defineProperty(d.prototype,"on",{get:function(){return this.foundation.isOn()},set:function(t){this.foundation.toggle(t)},enumerable:!0,configurable:!0}),d.prototype.createRipple=function(){var t=new a.MDCRipple(this.root);return t.unbounded=!0,t},d);function d(){var t=null!==o&&o.apply(this,arguments)||this;return t.rippleComponent=t.createRipple(),t}e.MDCIconButtonToggle=l},function(t,n,e){"use strict";function i(t){for(var e in t)n.hasOwnProperty(e)||(n[e]=t[e])}Object.defineProperty(n,"__esModule",{value:!0}),i(e(27)),i(e(64)),i(e(63))},function(t,n,e){"use strict";function i(t){for(var e in t)n.hasOwnProperty(e)||(n[e]=t[e])}Object.defineProperty(n,"__esModule",{value:!0}),i(e(135)),i(e(66)),i(e(65))},function(t,e,n){"use strict";var i,r=this&&this.__extends||(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)});Object.defineProperty(e,"__esModule",{value:!0});var o,s=n(1),a=n(65),c=(o=s.MDCComponent,r(u,o),u.attachTo=function(t){return new u(t)},Object.defineProperty(u.prototype,"determinate",{set:function(t){this.foundation.setDeterminate(t)},enumerable:!0,configurable:!0}),Object.defineProperty(u.prototype,"progress",{set:function(t){this.foundation.setProgress(t)},enumerable:!0,configurable:!0}),Object.defineProperty(u.prototype,"buffer",{set:function(t){this.foundation.setBuffer(t)},enumerable:!0,configurable:!0}),Object.defineProperty(u.prototype,"reverse",{set:function(t){this.foundation.setReverse(t)},enumerable:!0,configurable:!0}),u.prototype.open=function(){this.foundation.open()},u.prototype.close=function(){this.foundation.close()},u.prototype.getDefaultFoundation=function(){var i=this,t={addClass:function(t){i.root.classList.add(t)},forceLayout:function(){i.root.getBoundingClientRect()},setBufferBarStyle:function(t,e){var n=i.root.querySelector(a.MDCLinearProgressFoundation.strings.BUFFER_BAR_SELECTOR);n&&n.style.setProperty(t,e)},setPrimaryBarStyle:function(t,e){var n=i.root.querySelector(a.MDCLinearProgressFoundation.strings.PRIMARY_BAR_SELECTOR);n&&n.style.setProperty(t,e)},hasClass:function(t){return i.root.classList.contains(t)},removeAttribute:function(t){i.root.removeAttribute(t)},removeClass:function(t){i.root.classList.remove(t)},setAttribute:function(t,e){i.root.setAttribute(t,e)}};return new a.MDCLinearProgressFoundation(t)},u);function u(){return null!==o&&o.apply(this,arguments)||this}e.MDCLinearProgress=c},function(t,n,e){"use strict";function i(t){for(var e in t)n.hasOwnProperty(e)||(n[e]=t[e])}Object.defineProperty(n,"__esModule",{value:!0}),i(e(23)),i(e(9)),i(e(12))},function(t,n,e){"use strict";function i(t){for(var e in t)n.hasOwnProperty(e)||(n[e]=t[e])}var r=this&&this.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e};Object.defineProperty(n,"__esModule",{value:!0});var o=r(e(67));n.util=o,i(e(68)),i(e(6)),i(e(13))},function(t,n,e){"use strict";function i(t){for(var e in t)n.hasOwnProperty(e)||(n[e]=t[e])}Object.defineProperty(n,"__esModule",{value:!0});var r=e(6);n.Corner=r.Corner,i(e(69)),i(e(14)),i(e(70))},function(t,n,e){"use strict";function i(t){for(var e in t)n.hasOwnProperty(e)||(n[e]=t[e])}Object.defineProperty(n,"__esModule",{value:!0}),i(e(28)),i(e(29)),i(e(71))},function(t,n,e){"use strict";function i(t){for(var e in t)n.hasOwnProperty(e)||(n[e]=t[e])}Object.defineProperty(n,"__esModule",{value:!0}),i(e(141)),i(e(73)),i(e(72))},function(t,e,n){"use strict";var i,r=this&&this.__extends||(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),o=this&&this.__assign||function(){return(o=Object.assign||function(t){for(var e,n=1,i=arguments.length;n<i;n++)for(var r in e=arguments[n])Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t}).apply(this,arguments)};Object.defineProperty(e,"__esModule",{value:!0});var s,a=n(1),c=n(5),u=n(3),l=n(4),d=n(72),p=(s=a.MDCComponent,r(f,s),f.attachTo=function(t){return new f(t)},Object.defineProperty(f.prototype,"checked",{get:function(){return this.nativeControl_.checked},set:function(t){this.nativeControl_.checked=t},enumerable:!0,configurable:!0}),Object.defineProperty(f.prototype,"disabled",{get:function(){return this.nativeControl_.disabled},set:function(t){this.foundation.setDisabled(t)},enumerable:!0,configurable:!0}),Object.defineProperty(f.prototype,"value",{get:function(){return this.nativeControl_.value},set:function(t){this.nativeControl_.value=t},enumerable:!0,configurable:!0}),Object.defineProperty(f.prototype,"ripple",{get:function(){return this.ripple_},enumerable:!0,configurable:!0}),f.prototype.destroy=function(){this.ripple_.destroy(),s.prototype.destroy.call(this)},f.prototype.getDefaultFoundation=function(){var e=this,t={addClass:function(t){return e.root.classList.add(t)},removeClass:function(t){return e.root.classList.remove(t)},setNativeControlDisabled:function(t){return e.nativeControl_.disabled=t}};return new d.MDCRadioFoundation(t)},f.prototype.createRipple_=function(){var n=this,t=o(o({},u.MDCRipple.createAdapter(this)),{registerInteractionHandler:function(t,e){return n.nativeControl_.addEventListener(t,e,c.applyPassive())},deregisterInteractionHandler:function(t,e){return n.nativeControl_.removeEventListener(t,e,c.applyPassive())},isSurfaceActive:function(){return!1},isUnbounded:function(){return!0}});return new u.MDCRipple(this.root,new l.MDCRippleFoundation(t))},Object.defineProperty(f.prototype,"nativeControl_",{get:function(){var t=d.MDCRadioFoundation.strings.NATIVE_CONTROL_SELECTOR,e=this.root.querySelector(t);if(!e)throw new Error("Radio component requires a "+t+" element");return e},enumerable:!0,configurable:!0}),f);function f(){var t=null!==s&&s.apply(this,arguments)||this;return t.ripple_=t.createRipple_(),t}e.MDCRadio=p},function(t,n,e){"use strict";function i(t){for(var e in t)n.hasOwnProperty(e)||(n[e]=t[e])}var r=this&&this.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e};Object.defineProperty(n,"__esModule",{value:!0});var o=r(e(18));n.util=o,i(e(3)),i(e(41)),i(e(4))},function(t,n,e){"use strict";function i(t){for(var e in t)n.hasOwnProperty(e)||(n[e]=t[e])}Object.defineProperty(n,"__esModule",{value:!0}),i(e(144)),i(e(30)),i(e(74)),i(e(145)),i(e(146))},function(t,e,n){"use strict";var i,r=this&&this.__extends||(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),o=this&&this.__assign||function(){return(o=Object.assign||function(t){for(var e,n=1,i=arguments.length;n<i;n++)for(var r in e=arguments[n])Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t}).apply(this,arguments)},s=this&&this.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e};Object.defineProperty(e,"__esModule",{value:!0});var a,c=n(1),d=n(25),p=n(27),u=s(n(6)),f=n(69),l=s(n(14)),h=n(28),_=n(3),C=n(4),y=n(30),E=n(74),g=n(75),m=n(78),A=(a=c.MDCComponent,r(v,a),v.attachTo=function(t){return new v(t)},v.prototype.initialize=function(t,e,n,i,r,o){if(void 0===t&&(t=function(t){return new d.MDCFloatingLabel(t)}),void 0===e&&(e=function(t){return new p.MDCLineRipple(t)}),void 0===n&&(n=function(t){return new h.MDCNotchedOutline(t)}),void 0===i&&(i=function(t){return new f.MDCMenu(t)}),void 0===r&&(r=function(t){return new m.MDCSelectIcon(t)}),void 0===o&&(o=function(t){return new g.MDCSelectHelperText(t)}),this.selectAnchor=this.root.querySelector(y.strings.SELECT_ANCHOR_SELECTOR),this.selectedText=this.root.querySelector(y.strings.SELECTED_TEXT_SELECTOR),!this.selectedText)throw new Error("MDCSelect: Missing required element: The following selector must be present: '"+y.strings.SELECTED_TEXT_SELECTOR+"'");if(this.selectAnchor.hasAttribute(y.strings.ARIA_CONTROLS)){var s=document.getElementById(this.selectAnchor.getAttribute(y.strings.ARIA_CONTROLS));s&&(this.helperText=o(s))}this.menuSetup(i);var a=this.root.querySelector(y.strings.LABEL_SELECTOR);this.label=a?t(a):null;var c=this.root.querySelector(y.strings.LINE_RIPPLE_SELECTOR);this.lineRipple=c?e(c):null;var u=this.root.querySelector(y.strings.OUTLINE_SELECTOR);this.outline=u?n(u):null;var l=this.root.querySelector(y.strings.LEADING_ICON_SELECTOR);l&&(this.leadingIcon=r(l)),this.root.classList.contains(y.cssClasses.OUTLINED)||(this.ripple=this.createRipple())},v.prototype.initialSyncWithDOM=function(){var e=this;this.handleChange=function(){e.foundation.handleChange()},this.handleFocus=function(){e.foundation.handleFocus()},this.handleBlur=function(){e.foundation.handleBlur()},this.handleClick=function(t){e.selectAnchor.focus(),e.foundation.handleClick(e.getNormalizedXCoordinate(t))},this.handleKeydown=function(t){e.foundation.handleKeydown(t)},this.handleMenuItemAction=function(t){e.foundation.handleMenuItemAction(t.detail.index)},this.handleMenuOpened=function(){e.foundation.handleMenuOpened()},this.handleMenuClosed=function(){e.foundation.handleMenuClosed()},this.selectAnchor.addEventListener("focus",this.handleFocus),this.selectAnchor.addEventListener("blur",this.handleBlur),this.selectAnchor.addEventListener("click",this.handleClick),this.selectAnchor.addEventListener("keydown",this.handleKeydown),this.menu.listen(u.strings.CLOSED_EVENT,this.handleMenuClosed),this.menu.listen(u.strings.OPENED_EVENT,this.handleMenuOpened),this.menu.listen(l.strings.SELECTED_EVENT,this.handleMenuItemAction)},v.prototype.destroy=function(){this.selectAnchor.removeEventListener("change",this.handleChange),this.selectAnchor.removeEventListener("focus",this.handleFocus),this.selectAnchor.removeEventListener("blur",this.handleBlur),this.selectAnchor.removeEventListener("keydown",this.handleKeydown),this.selectAnchor.removeEventListener("click",this.handleClick),this.menu.unlisten(u.strings.CLOSED_EVENT,this.handleMenuClosed),this.menu.unlisten(u.strings.OPENED_EVENT,this.handleMenuOpened),this.menu.unlisten(l.strings.SELECTED_EVENT,this.handleMenuItemAction),this.menu.destroy(),this.ripple&&this.ripple.destroy(),this.outline&&this.outline.destroy(),this.leadingIcon&&this.leadingIcon.destroy(),this.helperText&&this.helperText.destroy(),a.prototype.destroy.call(this)},Object.defineProperty(v.prototype,"value",{get:function(){return this.foundation.getValue()},set:function(t){this.foundation.setValue(t)},enumerable:!0,configurable:!0}),Object.defineProperty(v.prototype,"selectedIndex",{get:function(){return this.foundation.getSelectedIndex()},set:function(t){this.foundation.setSelectedIndex(t,!0)},enumerable:!0,configurable:!0}),Object.defineProperty(v.prototype,"disabled",{get:function(){return this.foundation.getDisabled()},set:function(t){this.foundation.setDisabled(t)},enumerable:!0,configurable:!0}),Object.defineProperty(v.prototype,"leadingIconAriaLabel",{set:function(t){this.foundation.setLeadingIconAriaLabel(t)},enumerable:!0,configurable:!0}),Object.defineProperty(v.prototype,"leadingIconContent",{set:function(t){this.foundation.setLeadingIconContent(t)},enumerable:!0,configurable:!0}),Object.defineProperty(v.prototype,"helperTextContent",{set:function(t){this.foundation.setHelperTextContent(t)},enumerable:!0,configurable:!0}),Object.defineProperty(v.prototype,"useDefaultValidation",{set:function(t){this.foundation.setUseDefaultValidation(t)},enumerable:!0,configurable:!0}),Object.defineProperty(v.prototype,"valid",{get:function(){return this.foundation.isValid()},set:function(t){this.foundation.setValid(t)},enumerable:!0,configurable:!0}),Object.defineProperty(v.prototype,"required",{get:function(){return this.foundation.getRequired()},set:function(t){this.foundation.setRequired(t)},enumerable:!0,configurable:!0}),v.prototype.layout=function(){this.foundation.layout()},v.prototype.layoutOptions=function(){this.foundation.layoutOptions(),this.menu.layout()},v.prototype.getDefaultFoundation=function(){var t=o(o(o(o({},this.getSelectAdapterMethods()),this.getCommonAdapterMethods()),this.getOutlineAdapterMethods()),this.getLabelAdapterMethods());return new E.MDCSelectFoundation(t,this.getFoundationMap())},v.prototype.menuSetup=function(t){this.menuElement=this.root.querySelector(y.strings.MENU_SELECTOR),this.menu=t(this.menuElement),this.menu.hasTypeahead=!0},v.prototype.createRipple=function(){var n=this,t=o(o({},_.MDCRipple.createAdapter({root:this.selectAnchor})),{registerInteractionHandler:function(t,e){n.selectAnchor.addEventListener(t,e)},deregisterInteractionHandler:function(t,e){n.selectAnchor.removeEventListener(t,e)}});return new _.MDCRipple(this.selectAnchor,new C.MDCRippleFoundation(t))},v.prototype.getSelectAdapterMethods=function(){var i=this;return{getSelectedMenuItem:function(){return i.menuElement.querySelector(y.strings.SELECTED_ITEM_SELECTOR)},getMenuItemAttr:function(t,e){return t.getAttribute(e)},setSelectedText:function(t){i.selectedText.textContent=t},isSelectAnchorFocused:function(){return document.activeElement===i.selectAnchor},getSelectAnchorAttr:function(t){return i.selectAnchor.getAttribute(t)},setSelectAnchorAttr:function(t,e){i.selectAnchor.setAttribute(t,e)},removeSelectAnchorAttr:function(t){i.selectAnchor.removeAttribute(t)},addMenuClass:function(t){i.menuElement.classList.add(t)},removeMenuClass:function(t){i.menuElement.classList.remove(t)},openMenu:function(){i.menu.open=!0},closeMenu:function(){i.menu.open=!1},getAnchorElement:function(){return i.root.querySelector(y.strings.SELECT_ANCHOR_SELECTOR)},setMenuAnchorElement:function(t){i.menu.setAnchorElement(t)},setMenuAnchorCorner:function(t){i.menu.setAnchorCorner(t)},setMenuWrapFocus:function(t){i.menu.wrapFocus=t},setAttributeAtIndex:function(t,e,n){i.menu.items[t].setAttribute(e,n)},removeAttributeAtIndex:function(t,e){i.menu.items[t].removeAttribute(e)},focusMenuItemAtIndex:function(t){i.menu.items[t].focus()},getMenuItemCount:function(){return i.menu.items.length},getMenuItemValues:function(){return i.menu.items.map(function(t){return t.getAttribute(y.strings.VALUE_ATTR)||""})},getMenuItemTextAtIndex:function(t){return i.menu.getPrimaryTextAtIndex(t)},addClassAtIndex:function(t,e){i.menu.items[t].classList.add(e)},removeClassAtIndex:function(t,e){i.menu.items[t].classList.remove(e)},isTypeaheadInProgress:function(){return i.menu.typeaheadInProgress},typeaheadMatchItem:function(t,e){return i.menu.typeaheadMatchItem(t,e)}}},v.prototype.getCommonAdapterMethods=function(){var n=this;return{addClass:function(t){n.root.classList.add(t)},removeClass:function(t){n.root.classList.remove(t)},hasClass:function(t){return n.root.classList.contains(t)},setRippleCenter:function(t){n.lineRipple&&n.lineRipple.setRippleCenter(t)},activateBottomLine:function(){n.lineRipple&&n.lineRipple.activate()},deactivateBottomLine:function(){n.lineRipple&&n.lineRipple.deactivate()},notifyChange:function(t){var e=n.selectedIndex;n.emit(y.strings.CHANGE_EVENT,{value:t,index:e},!0)}}},v.prototype.getOutlineAdapterMethods=function(){var e=this;return{hasOutline:function(){return Boolean(e.outline)},notchOutline:function(t){e.outline&&e.outline.notch(t)},closeOutline:function(){e.outline&&e.outline.closeNotch()}}},v.prototype.getLabelAdapterMethods=function(){var e=this;return{hasLabel:function(){return!!e.label},floatLabel:function(t){e.label&&e.label.float(t)},getLabelWidth:function(){return e.label?e.label.getWidth():0},setLabelRequired:function(t){e.label&&e.label.setRequired(t)}}},v.prototype.getNormalizedXCoordinate=function(t){var e=t.target.getBoundingClientRect();return(this.isTouchEvent(t)?t.touches[0].clientX:t.clientX)-e.left},v.prototype.isTouchEvent=function(t){return Boolean(t.touches)},v.prototype.getFoundationMap=function(){return{helperText:this.helperText?this.helperText.foundationForSelect:void 0,leadingIcon:this.leadingIcon?this.leadingIcon.foundationForSelect:void 0}},v);function v(){return null!==a&&a.apply(this,arguments)||this}e.MDCSelect=A},function(t,n,e){"use strict";function i(t){for(var e in t)n.hasOwnProperty(e)||(n[e]=t[e])}Object.defineProperty(n,"__esModule",{value:!0}),i(e(75)),i(e(76));var r=e(77);n.helperTextCssClasses=r.cssClasses,n.helperTextStrings=r.strings},function(t,n,e){"use strict";function i(t){for(var e in t)n.hasOwnProperty(e)||(n[e]=t[e])}Object.defineProperty(n,"__esModule",{value:!0}),i(e(78)),i(e(79));var r=e(80);n.iconStrings=r.strings},function(t,n,e){"use strict";function i(t){for(var e in t)n.hasOwnProperty(e)||(n[e]=t[e])}Object.defineProperty(n,"__esModule",{value:!0}),i(e(148)),i(e(31)),i(e(81))},function(t,e,n){"use strict";var i,r=this&&this.__extends||(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)});Object.defineProperty(e,"__esModule",{value:!0});var o,s=n(1),a=n(5),c=n(31),u=n(81),l=(o=s.MDCComponent,r(d,o),d.attachTo=function(t){return new d(t)},Object.defineProperty(d.prototype,"value",{get:function(){return this.foundation.getValue()},set:function(t){this.foundation.setValue(t)},enumerable:!0,configurable:!0}),Object.defineProperty(d.prototype,"min",{get:function(){return this.foundation.getMin()},set:function(t){this.foundation.setMin(t)},enumerable:!0,configurable:!0}),Object.defineProperty(d.prototype,"max",{get:function(){return this.foundation.getMax()},set:function(t){this.foundation.setMax(t)},enumerable:!0,configurable:!0}),Object.defineProperty(d.prototype,"step",{get:function(){return this.foundation.getStep()},set:function(t){this.foundation.setStep(t)},enumerable:!0,configurable:!0}),Object.defineProperty(d.prototype,"disabled",{get:function(){return this.foundation.isDisabled()},set:function(t){this.foundation.setDisabled(t)},enumerable:!0,configurable:!0}),d.prototype.initialize=function(){this.thumbContainer_=this.root.querySelector(c.strings.THUMB_CONTAINER_SELECTOR),this.track_=this.root.querySelector(c.strings.TRACK_SELECTOR),this.pinValueMarker_=this.root.querySelector(c.strings.PIN_VALUE_MARKER_SELECTOR),this.trackMarkerContainer_=this.root.querySelector(c.strings.TRACK_MARKER_CONTAINER_SELECTOR)},d.prototype.getDefaultFoundation=function(){var o=this,t={hasClass:function(t){return o.root.classList.contains(t)},addClass:function(t){return o.root.classList.add(t)},removeClass:function(t){return o.root.classList.remove(t)},getAttribute:function(t){return o.root.getAttribute(t)},setAttribute:function(t,e){return o.root.setAttribute(t,e)},removeAttribute:function(t){return o.root.removeAttribute(t)},computeBoundingRect:function(){return o.root.getBoundingClientRect()},getTabIndex:function(){return o.root.tabIndex},registerInteractionHandler:function(t,e){return o.listen(t,e,a.applyPassive())},deregisterInteractionHandler:function(t,e){return o.unlisten(t,e,a.applyPassive())},registerThumbContainerInteractionHandler:function(t,e){o.thumbContainer_.addEventListener(t,e,a.applyPassive())},deregisterThumbContainerInteractionHandler:function(t,e){o.thumbContainer_.removeEventListener(t,e,a.applyPassive())},registerBodyInteractionHandler:function(t,e){return document.body.addEventListener(t,e)},deregisterBodyInteractionHandler:function(t,e){return document.body.removeEventListener(t,e)},registerResizeHandler:function(t){return window.addEventListener("resize",t)},deregisterResizeHandler:function(t){return window.removeEventListener("resize",t)},notifyInput:function(){return o.emit(c.strings.INPUT_EVENT,o)},notifyChange:function(){return o.emit(c.strings.CHANGE_EVENT,o)},setThumbContainerStyleProperty:function(t,e){o.thumbContainer_.style.setProperty(t,e)},setTrackStyleProperty:function(t,e){return o.track_.style.setProperty(t,e)},setMarkerValue:function(t){return o.pinValueMarker_.innerText=t.toLocaleString()},setTrackMarkers:function(t,e,n){var i=t.toLocaleString(),r="linear-gradient(to right, currentColor 2px, transparent 0) 0 center / calc((100% - 2px) / (("+e.toLocaleString()+" - "+n.toLocaleString()+") / "+i+")) 100% repeat-x";o.trackMarkerContainer_.style.setProperty("background",r)},isRTL:function(){return"rtl"===getComputedStyle(o.root).direction}};return new u.MDCSliderFoundation(t)},d.prototype.initialSyncWithDOM=function(){var t=this.parseFloat_(this.root.getAttribute(c.strings.ARIA_VALUENOW),this.value),e=this.parseFloat_(this.root.getAttribute(c.strings.ARIA_VALUEMIN),this.min),n=this.parseFloat_(this.root.getAttribute(c.strings.ARIA_VALUEMAX),this.max);e>=this.max?(this.max=n,this.min=e):(this.min=e,this.max=n),this.step=this.parseFloat_(this.root.getAttribute(c.strings.STEP_DATA_ATTR),this.step),this.value=t,this.disabled=this.root.hasAttribute(c.strings.ARIA_DISABLED)&&"false"!==this.root.getAttribute(c.strings.ARIA_DISABLED),this.foundation.setupTrackMarker()},d.prototype.layout=function(){this.foundation.layout()},d.prototype.stepUp=function(t){void 0===t&&(t=this.step||1),this.value+=t},d.prototype.stepDown=function(t){void 0===t&&(t=this.step||1),this.value-=t},d.prototype.parseFloat_=function(t,e){var n=parseFloat(t);return"number"==typeof n&&isFinite(n)?n:e},d);function d(){return null!==o&&o.apply(this,arguments)||this}e.MDCSlider=l},function(t,n,e){"use strict";function i(t){for(var e in t)n.hasOwnProperty(e)||(n[e]=t[e])}var r=this&&this.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e};Object.defineProperty(n,"__esModule",{value:!0});var o=r(e(82));n.util=o,i(e(150)),i(e(15)),i(e(83))},function(t,e,n){"use strict";var i,r=this&&this.__extends||(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),o=this&&this.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e};Object.defineProperty(e,"__esModule",{value:!0});var s,a=n(1),c=n(2),u=n(15),l=n(83),d=o(n(82)),p=u.strings.SURFACE_SELECTOR,f=u.strings.LABEL_SELECTOR,h=u.strings.ACTION_SELECTOR,_=u.strings.DISMISS_SELECTOR,C=u.strings.OPENING_EVENT,y=u.strings.OPENED_EVENT,E=u.strings.CLOSING_EVENT,g=u.strings.CLOSED_EVENT,m=(s=a.MDCComponent,r(A,s),A.attachTo=function(t){return new A(t)},A.prototype.initialize=function(t){void 0===t&&(t=function(){return d.announce}),this.announce_=t()},A.prototype.initialSyncWithDOM=function(){var n=this;this.surfaceEl_=this.root.querySelector(p),this.labelEl_=this.root.querySelector(f),this.actionEl_=this.root.querySelector(h),this.handleKeyDown_=function(t){return n.foundation.handleKeyDown(t)},this.handleSurfaceClick_=function(t){var e=t.target;n.isActionButton_(e)?n.foundation.handleActionButtonClick(t):n.isActionIcon_(e)&&n.foundation.handleActionIconClick(t)},this.registerKeyDownHandler_(this.handleKeyDown_),this.registerSurfaceClickHandler_(this.handleSurfaceClick_)},A.prototype.destroy=function(){s.prototype.destroy.call(this),this.deregisterKeyDownHandler_(this.handleKeyDown_),this.deregisterSurfaceClickHandler_(this.handleSurfaceClick_)},A.prototype.open=function(){this.foundation.open()},A.prototype.close=function(t){void 0===t&&(t=""),this.foundation.close(t)},A.prototype.getDefaultFoundation=function(){var e=this,t={addClass:function(t){return e.root.classList.add(t)},announce:function(){return e.announce_(e.labelEl_)},notifyClosed:function(t){return e.emit(g,t?{reason:t}:{})},notifyClosing:function(t){return e.emit(E,t?{reason:t}:{})},notifyOpened:function(){return e.emit(y,{})},notifyOpening:function(){return e.emit(C,{})},removeClass:function(t){return e.root.classList.remove(t)}};return new l.MDCSnackbarFoundation(t)},Object.defineProperty(A.prototype,"timeoutMs",{get:function(){return this.foundation.getTimeoutMs()},set:function(t){this.foundation.setTimeoutMs(t)},enumerable:!0,configurable:!0}),Object.defineProperty(A.prototype,"closeOnEscape",{get:function(){return this.foundation.getCloseOnEscape()},set:function(t){this.foundation.setCloseOnEscape(t)},enumerable:!0,configurable:!0}),Object.defineProperty(A.prototype,"isOpen",{get:function(){return this.foundation.isOpen()},enumerable:!0,configurable:!0}),Object.defineProperty(A.prototype,"labelText",{get:function(){return this.labelEl_.textContent},set:function(t){this.labelEl_.textContent=t},enumerable:!0,configurable:!0}),Object.defineProperty(A.prototype,"actionButtonText",{get:function(){return this.actionEl_.textContent},set:function(t){this.actionEl_.textContent=t},enumerable:!0,configurable:!0}),A.prototype.registerKeyDownHandler_=function(t){this.listen("keydown",t)},A.prototype.deregisterKeyDownHandler_=function(t){this.unlisten("keydown",t)},A.prototype.registerSurfaceClickHandler_=function(t){this.surfaceEl_.addEventListener("click",t)},A.prototype.deregisterSurfaceClickHandler_=function(t){this.surfaceEl_.removeEventListener("click",t)},A.prototype.isActionButton_=function(t){return Boolean(c.closest(t,h))},A.prototype.isActionIcon_=function(t){return Boolean(c.closest(t,_))},A);function A(){return null!==s&&s.apply(this,arguments)||this}e.MDCSnackbar=m},function(t,n,e){"use strict";function i(t){for(var e in t)n.hasOwnProperty(e)||(n[e]=t[e])}Object.defineProperty(n,"__esModule",{value:!0}),i(e(152)),i(e(85)),i(e(84))},function(t,e,n){"use strict";var i,r=this&&this.__extends||(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),o=this&&this.__assign||function(){return(o=Object.assign||function(t){for(var e,n=1,i=arguments.length;n<i;n++)for(var r in e=arguments[n])Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t}).apply(this,arguments)},s=this&&this.__read||function(t,e){var n="function"==typeof Symbol&&t[Symbol.iterator];if(!n)return t;var i,r,o=n.call(t),s=[];try{for(;(void 0===e||0<e--)&&!(i=o.next()).done;)s.push(i.value)}catch(t){r={error:t}}finally{try{i&&!i.done&&(n=o.return)&&n.call(o)}finally{if(r)throw r.error}}return s},a=this&&this.__spread||function(){for(var t=[],e=0;e<arguments.length;e++)t=t.concat(s(arguments[e]));return t};Object.defineProperty(e,"__esModule",{value:!0});var c,u=n(1),l=n(5),d=n(2),p=n(3),f=n(4),h=n(84),_=(c=u.MDCComponent,r(C,c),C.attachTo=function(t){return new C(t)},C.prototype.destroy=function(){c.prototype.destroy.call(this),this.ripple_.destroy(),this.nativeControl_.removeEventListener("change",this.changeHandler_)},C.prototype.initialSyncWithDOM=function(){var i=this;this.changeHandler_=function(){for(var t,e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];return(t=i.foundation).handleChange.apply(t,a(e))},this.nativeControl_.addEventListener("change",this.changeHandler_),this.checked=this.checked},C.prototype.getDefaultFoundation=function(){var n=this,t={addClass:function(t){return n.root.classList.add(t)},removeClass:function(t){return n.root.classList.remove(t)},setNativeControlChecked:function(t){return n.nativeControl_.checked=t},setNativeControlDisabled:function(t){return n.nativeControl_.disabled=t},setNativeControlAttr:function(t,e){return n.nativeControl_.setAttribute(t,e)}};return new h.MDCSwitchFoundation(t)},Object.defineProperty(C.prototype,"ripple",{get:function(){return this.ripple_},enumerable:!0,configurable:!0}),Object.defineProperty(C.prototype,"checked",{get:function(){return this.nativeControl_.checked},set:function(t){this.foundation.setChecked(t)},enumerable:!0,configurable:!0}),Object.defineProperty(C.prototype,"disabled",{get:function(){return this.nativeControl_.disabled},set:function(t){this.foundation.setDisabled(t)},enumerable:!0,configurable:!0}),C.prototype.createRipple_=function(){var n=this,t=h.MDCSwitchFoundation.strings.RIPPLE_SURFACE_SELECTOR,i=this.root.querySelector(t),e=o(o({},p.MDCRipple.createAdapter(this)),{addClass:function(t){return i.classList.add(t)},computeBoundingRect:function(){return i.getBoundingClientRect()},deregisterInteractionHandler:function(t,e){n.nativeControl_.removeEventListener(t,e,l.applyPassive())},isSurfaceActive:function(){return d.matches(n.nativeControl_,":active")},isUnbounded:function(){return!0},registerInteractionHandler:function(t,e){n.nativeControl_.addEventListener(t,e,l.applyPassive())},removeClass:function(t){i.classList.remove(t)},updateCssVariable:function(t,e){i.style.setProperty(t,e)}});return new p.MDCRipple(this.root,new f.MDCRippleFoundation(e))},Object.defineProperty(C.prototype,"nativeControl_",{get:function(){var t=h.MDCSwitchFoundation.strings.NATIVE_CONTROL_SELECTOR;return this.root.querySelector(t)},enumerable:!0,configurable:!0}),C);function C(){var t=null!==c&&c.apply(this,arguments)||this;return t.ripple_=t.createRipple_(),t}e.MDCSwitch=_},function(t,n,e){"use strict";function i(t){for(var e in t)n.hasOwnProperty(e)||(n[e]=t[e])}Object.defineProperty(n,"__esModule",{value:!0}),i(e(154)),i(e(96)),i(e(95))},function(t,e,n){"use strict";var i,r=this&&this.__extends||(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)});Object.defineProperty(e,"__esModule",{value:!0});var o,s=n(1),a=n(86),c=n(89),u=n(34),l=n(95),d=l.MDCTabBarFoundation.strings,p=0,f=(o=s.MDCComponent,r(h,o),h.attachTo=function(t){return new h(t)},Object.defineProperty(h.prototype,"focusOnActivate",{set:function(e){this.tabList_.forEach(function(t){return t.focusOnActivate=e})},enumerable:!0,configurable:!0}),Object.defineProperty(h.prototype,"useAutomaticActivation",{set:function(t){this.foundation.setUseAutomaticActivation(t)},enumerable:!0,configurable:!0}),h.prototype.initialize=function(t,e){void 0===t&&(t=function(t){return new c.MDCTab(t)}),void 0===e&&(e=function(t){return new a.MDCTabScroller(t)}),this.tabList_=this.instantiateTabs_(t),this.tabScroller_=this.instantiateTabScroller_(e)},h.prototype.initialSyncWithDOM=function(){var e=this;this.handleTabInteraction_=function(t){return e.foundation.handleTabInteraction(t)},this.handleKeyDown_=function(t){return e.foundation.handleKeyDown(t)},this.listen(u.MDCTabFoundation.strings.INTERACTED_EVENT,this.handleTabInteraction_),this.listen("keydown",this.handleKeyDown_);for(var t=0;t<this.tabList_.length;t++)if(this.tabList_[t].active){this.scrollIntoView(t);break}},h.prototype.destroy=function(){o.prototype.destroy.call(this),this.unlisten(u.MDCTabFoundation.strings.INTERACTED_EVENT,this.handleTabInteraction_),this.unlisten("keydown",this.handleKeyDown_),this.tabList_.forEach(function(t){return t.destroy()}),this.tabScroller_&&this.tabScroller_.destroy()},h.prototype.getDefaultFoundation=function(){var n=this,t={scrollTo:function(t){return n.tabScroller_.scrollTo(t)},incrementScroll:function(t){return n.tabScroller_.incrementScroll(t)},getScrollPosition:function(){return n.tabScroller_.getScrollPosition()},getScrollContentWidth:function(){return n.tabScroller_.getScrollContentWidth()},getOffsetWidth:function(){return n.root.offsetWidth},isRTL:function(){return"rtl"===window.getComputedStyle(n.root).getPropertyValue("direction")},setActiveTab:function(t){return n.foundation.activateTab(t)},activateTabAtIndex:function(t,e){return n.tabList_[t].activate(e)},deactivateTabAtIndex:function(t){return n.tabList_[t].deactivate()},focusTabAtIndex:function(t){return n.tabList_[t].focus()},getTabIndicatorClientRectAtIndex:function(t){return n.tabList_[t].computeIndicatorClientRect()},getTabDimensionsAtIndex:function(t){return n.tabList_[t].computeDimensions()},getPreviousActiveTabIndex:function(){for(var t=0;t<n.tabList_.length;t++)if(n.tabList_[t].active)return t;return-1},getFocusedTabIndex:function(){var t=n.getTabElements_(),e=document.activeElement;return t.indexOf(e)},getIndexOfTabById:function(t){for(var e=0;e<n.tabList_.length;e++)if(n.tabList_[e].id===t)return e;return-1},getTabListLength:function(){return n.tabList_.length},notifyTabActivated:function(t){return n.emit(d.TAB_ACTIVATED_EVENT,{index:t},!0)}};return new l.MDCTabBarFoundation(t)},h.prototype.activateTab=function(t){this.foundation.activateTab(t)},h.prototype.scrollIntoView=function(t){this.foundation.scrollIntoView(t)},h.prototype.getTabElements_=function(){return[].slice.call(this.root.querySelectorAll(d.TAB_SELECTOR))},h.prototype.instantiateTabs_=function(e){return this.getTabElements_().map(function(t){return t.id=t.id||"mdc-tab-"+ ++p,e(t)})},h.prototype.instantiateTabScroller_=function(t){var e=this.root.querySelector(d.TAB_SCROLLER_SELECTOR);return e?t(e):null},h);function h(){return null!==o&&o.apply(this,arguments)||this}e.MDCTabBar=f},function(t,e,n){"use strict";var i,r=this&&this.__extends||(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)});Object.defineProperty(e,"__esModule",{value:!0});var o,s=n(33),a=(o=s.MDCTabScrollerRTL,r(c,o),c.prototype.getScrollPositionRTL=function(){var t=this.adapter.getScrollAreaScrollLeft(),e=this.calculateScrollEdges_().right;return Math.round(e-t)},c.prototype.scrollToRTL=function(t){var e=this.calculateScrollEdges_(),n=this.adapter.getScrollAreaScrollLeft(),i=this.clampScrollValue_(e.right-t);return{finalScrollPosition:i,scrollDelta:i-n}},c.prototype.incrementScrollRTL=function(t){var e=this.adapter.getScrollAreaScrollLeft(),n=this.clampScrollValue_(e-t);return{finalScrollPosition:n,scrollDelta:n-e}},c.prototype.getAnimatingScrollPosition=function(t){return t},c.prototype.calculateScrollEdges_=function(){return{left:0,right:this.adapter.getScrollContentOffsetWidth()-this.adapter.getScrollAreaOffsetWidth()}},c.prototype.clampScrollValue_=function(t){var e=this.calculateScrollEdges_();return Math.min(Math.max(e.left,t),e.right)},c);function c(){return null!==o&&o.apply(this,arguments)||this}e.MDCTabScrollerRTLDefault=a,e.default=a},function(t,e,n){"use strict";var i,r=this&&this.__extends||(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)});Object.defineProperty(e,"__esModule",{value:!0});var o,s=n(33),a=(o=s.MDCTabScrollerRTL,r(c,o),c.prototype.getScrollPositionRTL=function(t){var e=this.adapter.getScrollAreaScrollLeft();return Math.round(t-e)},c.prototype.scrollToRTL=function(t){var e=this.adapter.getScrollAreaScrollLeft(),n=this.clampScrollValue_(-t);return{finalScrollPosition:n,scrollDelta:n-e}},c.prototype.incrementScrollRTL=function(t){var e=this.adapter.getScrollAreaScrollLeft(),n=this.clampScrollValue_(e-t);return{finalScrollPosition:n,scrollDelta:n-e}},c.prototype.getAnimatingScrollPosition=function(t,e){return t-e},c.prototype.calculateScrollEdges_=function(){var t=this.adapter.getScrollContentOffsetWidth();return{left:this.adapter.getScrollAreaOffsetWidth()-t,right:0}},c.prototype.clampScrollValue_=function(t){var e=this.calculateScrollEdges_();return Math.max(Math.min(e.right,t),e.left)},c);function c(){return null!==o&&o.apply(this,arguments)||this}e.MDCTabScrollerRTLNegative=a,e.default=a},function(t,e,n){"use strict";var i,r=this&&this.__extends||(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)});Object.defineProperty(e,"__esModule",{value:!0});var o,s=n(33),a=(o=s.MDCTabScrollerRTL,r(c,o),c.prototype.getScrollPositionRTL=function(t){var e=this.adapter.getScrollAreaScrollLeft();return Math.round(e-t)},c.prototype.scrollToRTL=function(t){var e=this.adapter.getScrollAreaScrollLeft(),n=this.clampScrollValue_(t);return{finalScrollPosition:n,scrollDelta:e-n}},c.prototype.incrementScrollRTL=function(t){var e=this.adapter.getScrollAreaScrollLeft(),n=this.clampScrollValue_(e+t);return{finalScrollPosition:n,scrollDelta:e-n}},c.prototype.getAnimatingScrollPosition=function(t,e){return t+e},c.prototype.calculateScrollEdges_=function(){return{left:this.adapter.getScrollContentOffsetWidth()-this.adapter.getScrollAreaOffsetWidth(),right:0}},c.prototype.clampScrollValue_=function(t){var e=this.calculateScrollEdges_();return Math.min(Math.max(e.right,t),e.left)},c);function c(){return null!==o&&o.apply(this,arguments)||this}e.MDCTabScrollerRTLReverse=a,e.default=a},function(t,n,e){"use strict";function i(t){for(var e in t)n.hasOwnProperty(e)||(n[e]=t[e])}Object.defineProperty(n,"__esModule",{value:!0}),i(e(90)),i(e(92)),i(e(16)),i(e(91)),i(e(93))},function(t,n,e){"use strict";function i(t){for(var e in t)n.hasOwnProperty(e)||(n[e]=t[e])}var r=this&&this.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e};Object.defineProperty(n,"__esModule",{value:!0});var o=r(e(88));n.util=o,i(e(86)),i(e(32)),i(e(87))},function(t,n,e){"use strict";function i(t){for(var e in t)n.hasOwnProperty(e)||(n[e]=t[e])}Object.defineProperty(n,"__esModule",{value:!0}),i(e(89)),i(e(94)),i(e(34))},function(t,n,e){"use strict";function i(t){for(var e in t)n.hasOwnProperty(e)||(n[e]=t[e])}Object.defineProperty(n,"__esModule",{value:!0}),i(e(162)),i(e(36)),i(e(99)),i(e(163)),i(e(164)),i(e(165))},function(t,e,n){"use strict";var i,r=this&&this.__extends||(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),o=this&&this.__assign||function(){return(o=Object.assign||function(t){for(var e,n=1,i=arguments.length;n<i;n++)for(var r in e=arguments[n])Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t}).apply(this,arguments)},s=this&&this.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e};Object.defineProperty(e,"__esModule",{value:!0});var a,c=n(1),u=n(5),l=s(n(2)),E=n(25),g=n(27),m=n(28),A=n(3),d=n(4),v=n(97),b=n(35),T=n(36),p=n(99),I=n(100),O=n(37),S=n(102),f=(a=c.MDCComponent,r(h,a),h.attachTo=function(t){return new h(t)},h.prototype.initialize=function(t,e,n,i,r,o,s){void 0===t&&(t=function(t,e){return new A.MDCRipple(t,e)}),void 0===e&&(e=function(t){return new g.MDCLineRipple(t)}),void 0===n&&(n=function(t){return new I.MDCTextFieldHelperText(t)}),void 0===i&&(i=function(t){return new v.MDCTextFieldCharacterCounter(t)}),void 0===r&&(r=function(t){return new S.MDCTextFieldIcon(t)}),void 0===o&&(o=function(t){return new E.MDCFloatingLabel(t)}),void 0===s&&(s=function(t){return new m.MDCNotchedOutline(t)}),this.input_=this.root.querySelector(T.strings.INPUT_SELECTOR);var a=this.root.querySelector(T.strings.LABEL_SELECTOR);this.label_=a?o(a):null;var c=this.root.querySelector(T.strings.LINE_RIPPLE_SELECTOR);this.lineRipple_=c?e(c):null;var u=this.root.querySelector(T.strings.OUTLINE_SELECTOR);this.outline_=u?s(u):null;var l=O.MDCTextFieldHelperTextFoundation.strings,d=this.root.nextElementSibling,p=d&&d.classList.contains(T.cssClasses.HELPER_LINE),f=p&&d&&d.querySelector(l.ROOT_SELECTOR);this.helperText_=f?n(f):null;var h=b.MDCTextFieldCharacterCounterFoundation.strings,_=this.root.querySelector(h.ROOT_SELECTOR);!_&&p&&d&&(_=d.querySelector(h.ROOT_SELECTOR)),this.characterCounter_=_?i(_):null;var C=this.root.querySelector(T.strings.LEADING_ICON_SELECTOR);this.leadingIcon_=C?r(C):null;var y=this.root.querySelector(T.strings.TRAILING_ICON_SELECTOR);this.trailingIcon_=y?r(y):null,this.prefix_=this.root.querySelector(T.strings.PREFIX_SELECTOR),this.suffix_=this.root.querySelector(T.strings.SUFFIX_SELECTOR),this.ripple=this.createRipple_(t)},h.prototype.destroy=function(){this.ripple&&this.ripple.destroy(),this.lineRipple_&&this.lineRipple_.destroy(),this.helperText_&&this.helperText_.destroy(),this.characterCounter_&&this.characterCounter_.destroy(),this.leadingIcon_&&this.leadingIcon_.destroy(),this.trailingIcon_&&this.trailingIcon_.destroy(),this.label_&&this.label_.destroy(),this.outline_&&this.outline_.destroy(),a.prototype.destroy.call(this)},h.prototype.initialSyncWithDOM=function(){this.disabled=this.input_.disabled},Object.defineProperty(h.prototype,"value",{get:function(){return this.foundation.getValue()},set:function(t){this.foundation.setValue(t)},enumerable:!0,configurable:!0}),Object.defineProperty(h.prototype,"disabled",{get:function(){return this.foundation.isDisabled()},set:function(t){this.foundation.setDisabled(t)},enumerable:!0,configurable:!0}),Object.defineProperty(h.prototype,"valid",{get:function(){return this.foundation.isValid()},set:function(t){this.foundation.setValid(t)},enumerable:!0,configurable:!0}),Object.defineProperty(h.prototype,"required",{get:function(){return this.input_.required},set:function(t){this.input_.required=t},enumerable:!0,configurable:!0}),Object.defineProperty(h.prototype,"pattern",{get:function(){return this.input_.pattern},set:function(t){this.input_.pattern=t},enumerable:!0,configurable:!0}),Object.defineProperty(h.prototype,"minLength",{get:function(){return this.input_.minLength},set:function(t){this.input_.minLength=t},enumerable:!0,configurable:!0}),Object.defineProperty(h.prototype,"maxLength",{get:function(){return this.input_.maxLength},set:function(t){t<0?this.input_.removeAttribute("maxLength"):this.input_.maxLength=t},enumerable:!0,configurable:!0}),Object.defineProperty(h.prototype,"min",{get:function(){return this.input_.min},set:function(t){this.input_.min=t},enumerable:!0,configurable:!0}),Object.defineProperty(h.prototype,"max",{get:function(){return this.input_.max},set:function(t){this.input_.max=t},enumerable:!0,configurable:!0}),Object.defineProperty(h.prototype,"step",{get:function(){return this.input_.step},set:function(t){this.input_.step=t},enumerable:!0,configurable:!0}),Object.defineProperty(h.prototype,"helperTextContent",{set:function(t){this.foundation.setHelperTextContent(t)},enumerable:!0,configurable:!0}),Object.defineProperty(h.prototype,"leadingIconAriaLabel",{set:function(t){this.foundation.setLeadingIconAriaLabel(t)},enumerable:!0,configurable:!0}),Object.defineProperty(h.prototype,"leadingIconContent",{set:function(t){this.foundation.setLeadingIconContent(t)},enumerable:!0,configurable:!0}),Object.defineProperty(h.prototype,"trailingIconAriaLabel",{set:function(t){this.foundation.setTrailingIconAriaLabel(t)},enumerable:!0,configurable:!0}),Object.defineProperty(h.prototype,"trailingIconContent",{set:function(t){this.foundation.setTrailingIconContent(t)},enumerable:!0,configurable:!0}),Object.defineProperty(h.prototype,"useNativeValidation",{set:function(t){this.foundation.setUseNativeValidation(t)},enumerable:!0,configurable:!0}),Object.defineProperty(h.prototype,"prefixText",{get:function(){return this.prefix_?this.prefix_.textContent:null},set:function(t){this.prefix_&&(this.prefix_.textContent=t)},enumerable:!0,configurable:!0}),Object.defineProperty(h.prototype,"suffixText",{get:function(){return this.suffix_?this.suffix_.textContent:null},set:function(t){this.suffix_&&(this.suffix_.textContent=t)},enumerable:!0,configurable:!0}),h.prototype.focus=function(){this.input_.focus()},h.prototype.layout=function(){var t=this.foundation.shouldFloat;this.foundation.notchOutline(t)},h.prototype.getDefaultFoundation=function(){var t=o(o(o(o(o({},this.getRootAdapterMethods_()),this.getInputAdapterMethods_()),this.getLabelAdapterMethods_()),this.getLineRippleAdapterMethods_()),this.getOutlineAdapterMethods_());return new p.MDCTextFieldFoundation(t,this.getFoundationMap_())},h.prototype.getRootAdapterMethods_=function(){var n=this;return{addClass:function(t){return n.root.classList.add(t)},removeClass:function(t){return n.root.classList.remove(t)},hasClass:function(t){return n.root.classList.contains(t)},registerTextFieldInteractionHandler:function(t,e){return n.listen(t,e)},deregisterTextFieldInteractionHandler:function(t,e){return n.unlisten(t,e)},registerValidationAttributeChangeHandler:function(e){var t=new MutationObserver(function(t){return e(function(t){return t.map(function(t){return t.attributeName}).filter(function(t){return t})}(t))});return t.observe(n.input_,{attributes:!0}),t},deregisterValidationAttributeChangeHandler:function(t){return t.disconnect()}}},h.prototype.getInputAdapterMethods_=function(){var n=this;return{getNativeInput:function(){return n.input_},isFocused:function(){return document.activeElement===n.input_},registerInputInteractionHandler:function(t,e){return n.input_.addEventListener(t,e,u.applyPassive())},deregisterInputInteractionHandler:function(t,e){return n.input_.removeEventListener(t,e,u.applyPassive())}}},h.prototype.getLabelAdapterMethods_=function(){var e=this;return{floatLabel:function(t){return e.label_&&e.label_.float(t)},getLabelWidth:function(){return e.label_?e.label_.getWidth():0},hasLabel:function(){return Boolean(e.label_)},shakeLabel:function(t){return e.label_&&e.label_.shake(t)},setLabelRequired:function(t){return e.label_&&e.label_.setRequired(t)}}},h.prototype.getLineRippleAdapterMethods_=function(){var e=this;return{activateLineRipple:function(){e.lineRipple_&&e.lineRipple_.activate()},deactivateLineRipple:function(){e.lineRipple_&&e.lineRipple_.deactivate()},setLineRippleTransformOrigin:function(t){e.lineRipple_&&e.lineRipple_.setRippleCenter(t)}}},h.prototype.getOutlineAdapterMethods_=function(){var e=this;return{closeOutline:function(){return e.outline_&&e.outline_.closeNotch()},hasOutline:function(){return Boolean(e.outline_)},notchOutline:function(t){return e.outline_&&e.outline_.notch(t)}}},h.prototype.getFoundationMap_=function(){return{characterCounter:this.characterCounter_?this.characterCounter_.foundationForTextField:void 0,helperText:this.helperText_?this.helperText_.foundationForTextField:void 0,leadingIcon:this.leadingIcon_?this.leadingIcon_.foundationForTextField:void 0,trailingIcon:this.trailingIcon_?this.trailingIcon_.foundationForTextField:void 0}},h.prototype.createRipple_=function(t){var n=this,e=this.root.classList.contains(T.cssClasses.TEXTAREA),i=this.root.classList.contains(T.cssClasses.OUTLINED);if(e||i)return null;var r=o(o({},A.MDCRipple.createAdapter(this)),{isSurfaceActive:function(){return l.matches(n.input_,":active")},registerInteractionHandler:function(t,e){return n.input_.addEventListener(t,e,u.applyPassive())},deregisterInteractionHandler:function(t,e){return n.input_.removeEventListener(t,e,u.applyPassive())}});return t(this.root,new d.MDCRippleFoundation(r))},h);function h(){return null!==a&&a.apply(this,arguments)||this}e.MDCTextField=f},function(t,n,e){"use strict";function i(t){for(var e in t)n.hasOwnProperty(e)||(n[e]=t[e])}Object.defineProperty(n,"__esModule",{value:!0}),i(e(97)),i(e(35));var r=e(98);n.characterCountCssClasses=r.cssClasses,n.characterCountStrings=r.strings},function(t,n,e){"use strict";function i(t){for(var e in t)n.hasOwnProperty(e)||(n[e]=t[e])}Object.defineProperty(n,"__esModule",{value:!0}),i(e(100)),i(e(37));var r=e(101);n.helperTextCssClasses=r.cssClasses,n.helperTextStrings=r.strings},function(t,n,e){"use strict";function i(t){for(var e in t)n.hasOwnProperty(e)||(n[e]=t[e])}Object.defineProperty(n,"__esModule",{value:!0}),i(e(102)),i(e(103));var r=e(104);n.iconCssClasses=r.cssClasses,n.iconStrings=r.strings},function(t,n,e){"use strict";function i(t){for(var e in t)n.hasOwnProperty(e)||(n[e]=t[e])}Object.defineProperty(n,"__esModule",{value:!0}),i(e(167)),i(e(7)),i(e(39)),i(e(105)),i(e(106)),i(e(38))},function(t,e,n){"use strict";var i,r=this&&this.__extends||(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)});Object.defineProperty(e,"__esModule",{value:!0});var o,s=n(1),a=n(3),c=n(7),u=n(105),l=n(106),d=n(38),p=(o=s.MDCComponent,r(f,o),f.attachTo=function(t){return new f(t)},f.prototype.initialize=function(n){void 0===n&&(n=function(t){return a.MDCRipple.attachTo(t)}),this.navIcon_=this.root.querySelector(c.strings.NAVIGATION_ICON_SELECTOR);var t=[].slice.call(this.root.querySelectorAll(c.strings.ACTION_ITEM_SELECTOR));this.navIcon_&&t.push(this.navIcon_),this.iconRipples_=t.map(function(t){var e=n(t);return e.unbounded=!0,e}),this.scrollTarget_=window},f.prototype.initialSyncWithDOM=function(){this.handleNavigationClick_=this.foundation.handleNavigationClick.bind(this.foundation),this.handleWindowResize_=this.foundation.handleWindowResize.bind(this.foundation),this.handleTargetScroll_=this.foundation.handleTargetScroll.bind(this.foundation),this.scrollTarget_.addEventListener("scroll",this.handleTargetScroll_),this.navIcon_&&this.navIcon_.addEventListener("click",this.handleNavigationClick_);var t=this.root.classList.contains(c.cssClasses.FIXED_CLASS);this.root.classList.contains(c.cssClasses.SHORT_CLASS)||t||window.addEventListener("resize",this.handleWindowResize_)},f.prototype.destroy=function(){this.iconRipples_.forEach(function(t){return t.destroy()}),this.scrollTarget_.removeEventListener("scroll",this.handleTargetScroll_),this.navIcon_&&this.navIcon_.removeEventListener("click",this.handleNavigationClick_);var t=this.root.classList.contains(c.cssClasses.FIXED_CLASS);this.root.classList.contains(c.cssClasses.SHORT_CLASS)||t||window.removeEventListener("resize",this.handleWindowResize_),o.prototype.destroy.call(this)},f.prototype.setScrollTarget=function(t){this.scrollTarget_.removeEventListener("scroll",this.handleTargetScroll_),this.scrollTarget_=t,this.handleTargetScroll_=this.foundation.handleTargetScroll.bind(this.foundation),this.scrollTarget_.addEventListener("scroll",this.handleTargetScroll_)},f.prototype.getDefaultFoundation=function(){var n=this,t={hasClass:function(t){return n.root.classList.contains(t)},addClass:function(t){return n.root.classList.add(t)},removeClass:function(t){return n.root.classList.remove(t)},setStyle:function(t,e){return n.root.style.setProperty(t,e)},getTopAppBarHeight:function(){return n.root.clientHeight},notifyNavigationIconClicked:function(){return n.emit(c.strings.NAVIGATION_EVENT,{})},getViewportScrollY:function(){var t=n.scrollTarget_,e=n.scrollTarget_;return void 0!==t.pageYOffset?t.pageYOffset:e.scrollTop},getTotalActionItems:function(){return n.root.querySelectorAll(c.strings.ACTION_ITEM_SELECTOR).length}};return this.root.classList.contains(c.cssClasses.SHORT_CLASS)?new l.MDCShortTopAppBarFoundation(t):this.root.classList.contains(c.cssClasses.FIXED_CLASS)?new u.MDCFixedTopAppBarFoundation(t):new d.MDCTopAppBarFoundation(t)},f);function f(){return null!==o&&o.apply(this,arguments)||this}e.MDCTopAppBar=p}],r.c=i,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)r.d(n,i,function(t){return e[t]}.bind(null,i));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=107);function r(t){if(i[t])return i[t].exports;var e=i[t]={i:t,l:!1,exports:{}};return n[t].call(e.exports,e,e.exports,r),e.l=!0,e.exports}var n,i});

  injectScriptFromString(`
    var pjw_mode = "${pjw_mode}";
  `);
  if (pjw_mode == "grade_info") {
    injectStyleFromString(`table.TABLE_BODY{ display: none; }`);
  } else if (pjw_mode == "main_page") {
    injectScriptFromString(`alert = function(x) {window.alert_data = x;};`);
  }

  if (pjw_mode != "") {

/* js/tinypinyin.js */
!function(N,A){"object"==typeof exports&&"object"==typeof module?module.exports=A():"function"==typeof define&&define.amd?define([],A):"object"==typeof exports?exports.Pinyin=A():N.Pinyin=A()}(this,function(){return function(N){function A(I){if(t[I])return t[I].exports;var U=t[I]={i:I,l:!1,exports:{}};return N[I].call(U.exports,U,U.exports,A),U.l=!0,U.exports}var t={};return A.m=N,A.c=t,A.i=function(N){return N},A.d=function(N,t,I){A.o(N,t)||Object.defineProperty(N,t,{configurable:!1,enumerable:!0,get:I})},A.n=function(N){var t=N&&N.__esModule?function(){return N.default}:function(){return N};return A.d(t,"a",t),t},A.o=function(N,A){return Object.prototype.hasOwnProperty.call(N,A)},A.p="",A(A.s=3)}([function(N,A,t){"use strict";function I(N){N&&("function"==typeof N&&(N=[N]),N.forEach&&N.forEach(function(N){"function"==typeof N&&N(o)}))}function U(N){return N||null===i?("object"===("undefined"==typeof Intl?"undefined":n(Intl))&&Intl.Collator?(f=new Intl.Collator(["zh-Hans-CN","zh-CN"]),i=1===Intl.Collator.supportedLocalesOf(["zh-CN"]).length):i=!1,i):i}function e(N){var A=o.UNIHANS,t=o.PINYINS,I=o.EXCEPTIONS,U={source:N};if(N in I)return U.type=E,U.target=I[N],U;var e=-1,r=void 0;if(N.charCodeAt(0)<256)return U.type=H,U.target=N,U;if((r=f.compare(N,G))<0)return U.type=u,U.target=N,U;if(0===r)U.type=E,e=0;else{if((r=f.compare(N,O))>0)return U.type=u,U.target=N,U;0===r&&(U.type=E,e=A.length-1)}if(U.type=E,e<0)for(var n=0,i=A.length-1;n<=i;){e=~~((n+i)/2);var S=A[e];if(0===(r=f.compare(N,S)))break;r>0?n=e+1:i=e-1}return r<0&&e--,U.target=t[e],U.target||(U.type=u,U.target=U.source),U}function r(N){if("string"!=typeof N)throw new Error("argument should be string.");if(!U())throw new Error("not support Intl or zh-CN language.");return N.split("").map(function(N){return e(N)})}var n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(N){return typeof N}:function(N){return N&&"function"==typeof Symbol&&N.constructor===Symbol&&N!==Symbol.prototype?"symbol":typeof N},o=t(2),G="阿",O="鿿",H=1,E=2,u=3,i=null,f=void 0;N.exports={isSupported:U,parse:r,patchDict:I,genToken:e,convertToPinyin:function(N,A,t){return r(N).map(function(N){return t&&N.type===E?N.target.toLowerCase():N.target}).join(A||"")}}},function(N,A,t){"use strict";A=N.exports=function(N){N.EXCEPTIONS={"嗲":"DIA","碡":"ZHOU","聒":"GUO","炔":"QUE","蚵":"KE","砉":"HUA","嬷":"MO","蹊":"XI","丬":"PAN","霰":"XIAN","豉":"CHI","饧":"XING","帧":"ZHEN","芎":"XIONG","谁":"SHUI","钶":"KE"},N.UNIHANS[91]="伕",N.UNIHANS[347]="仚",N.UNIHANS[393]="诌",N.UNIHANS[39]="婤",N.UNIHANS[50]="腠",N.UNIHANS[369]="攸",N.UNIHANS[123]="乯",N.UNIHANS[171]="刕",N.UNIHANS[102]="佝",N.UNIHANS[126]="犿",N.UNIHANS[176]="列",N.UNIHANS[178]="刢",N.UNIHANS[252]="娝",N.UNIHANS[330]="偸"},A.shouldPatch=function(N){return"function"==typeof N&&("FOU"===N("伕").target&&"XIA"===N("仚").target&&"ZHONG"===N("诌").target&&"CHONG"===N("婤").target&&"CONG"===N("腠").target&&"YONG"===N("攸").target&&"HOU"===N("乯").target&&"LENG"===N("刕").target&&"GONG"===N("佝").target&&"HUAI"===N("犿").target&&"LIAO"===N("列").target&&"LIN"===N("刢").target&&"E"===N("钶").target)}},function(N,A,t){"use strict";var I=["阿","哎","安","肮","凹","八","挀","扳","邦","勹","陂","奔","伻","屄","边","灬","憋","汃","冫","癶","峬","嚓","偲","参","仓","撡","冊","嵾","曽","叉","芆","辿","伥","抄","车","抻","阷","吃","充","抽","出","欻","揣","巛","刅","吹","旾","逴","呲","匆","凑","粗","汆","崔","邨","搓","咑","呆","丹","当","刀","嘚","扥","灯","氐","甸","刁","爹","丁","丟","东","吺","厾","耑","垖","吨","多","妸","诶","奀","鞥","儿","发","帆","匚","飞","分","丰","覅","仏","紑","夫","旮","侅","甘","冈","皋","戈","给","根","刯","工","勾","估","瓜","乖","关","光","归","丨","呙","哈","咍","佄","夯","茠","诃","黒","拫","亨","噷","叿","齁","乎","花","怀","欢","巟","灰","昏","吙","丌","加","戋","江","艽","阶","巾","坕","冂","丩","凥","姢","噘","军","咔","开","刊","忼","尻","匼","肎","劥","空","抠","扝","夸","蒯","宽","匡","亏","坤","扩","垃","来","兰","啷","捞","肋","勒","崚","哩","俩","奁","良","撩","毟","拎","伶","溜","囖","龙","瞜","噜","驴","娈","掠","抡","罗","呣","妈","埋","嫚","牤","猫","么","呅","门","甿","咪","宀","喵","乜","民","名","谬","摸","哞","毪","嗯","拏","腉","囡","囔","孬","疒","娞","恁","能","妮","拈","娘","鸟","捏","囜","宁","妞","农","羺","奴","女","奻","疟","黁","挪","喔","讴","妑","拍","眅","乓","抛","呸","喷","匉","丕","囨","剽","氕","姘","乒","钋","剖","仆","七","掐","千","呛","悄","癿","亲","靑","卭","丘","区","峑","缺","夋","呥","穣","娆","惹","人","扔","日","茸","厹","邚","挼","堧","婑","瞤","捼","仨","毢","三","桒","掻","閪","森","僧","杀","筛","山","伤","弰","奢","申","升","尸","収","书","刷","衰","闩","双","脽","吮","说","厶","忪","捜","苏","狻","夊","孙","唆","他","囼","坍","汤","夲","忑","熥","剔","天","旫","帖","厅","囲","偷","凸","湍","推","吞","乇","穵","歪","弯","尣","危","昷","翁","挝","乌","夕","虲","仙","乡","灱","些","心","星","凶","休","吁","吅","削","坃","丫","恹","央","幺","倻","一","囙","应","哟","佣","优","扜","囦","曰","晕","帀","災","兂","匨","傮","则","贼","怎","増","扎","捚","沾","张","佋","蜇","贞","争","之","中","州","朱","抓","拽","专","妆","隹","宒","卓","乲","宗","邹","租","钻","厜","尊","昨","兙"],U=["A","AI","AN","ANG","AO","BA","BAI","BAN","BANG","BAO","BEI","BEN","BENG","BI","BIAN","BIAO","BIE","BIN","BING","BO","BU","CA","CAI","CAN","CANG","CAO","CE","CEN","CENG","CHA","CHAI","CHAN","CHANG","CHAO","CHE","CHEN","CHENG","CHI","CHONG","CHOU","CHU","CHUA","CHUAI","CHUAN","CHUANG","CHUI","CHUN","CHUO","CI","CONG","COU","CU","CUAN","CUI","CUN","CUO","DA","DAI","DAN","DANG","DAO","DE","DEN","DENG","DI","DIAN","DIAO","DIE","DING","DIU","DONG","DOU","DU","DUAN","DUI","DUN","DUO","E","EI","EN","ENG","ER","FA","FAN","FANG","FEI","FEN","FENG","FIAO","FO","FOU","FU","GA","GAI","GAN","GANG","GAO","GE","GEI","GEN","GENG","GONG","GOU","GU","GUA","GUAI","GUAN","GUANG","GUI","GUN","GUO","HA","HAI","HAN","HANG","HAO","HE","HEI","HEN","HENG","HM","HONG","HOU","HU","HUA","HUAI","HUAN","HUANG","HUI","HUN","HUO","JI","JIA","JIAN","JIANG","JIAO","JIE","JIN","JING","JIONG","JIU","JU","JUAN","JUE","JUN","KA","KAI","KAN","KANG","KAO","KE","KEN","KENG","KONG","KOU","KU","KUA","KUAI","KUAN","KUANG","KUI","KUN","KUO","LA","LAI","LAN","LANG","LAO","LE","LEI","LENG","LI","LIA","LIAN","LIANG","LIAO","LIE","LIN","LING","LIU","LO","LONG","LOU","LU","LV","LUAN","LVE","LUN","LUO","M","MA","MAI","MAN","MANG","MAO","ME","MEI","MEN","MENG","MI","MIAN","MIAO","MIE","MIN","MING","MIU","MO","MOU","MU","N","NA","NAI","NAN","NANG","NAO","NE","NEI","NEN","NENG","NI","NIAN","NIANG","NIAO","NIE","NIN","NING","NIU","NONG","NOU","NU","NV","NUAN","NVE","NUN","NUO","O","OU","PA","PAI","PAN","PANG","PAO","PEI","PEN","PENG","PI","PIAN","PIAO","PIE","PIN","PING","PO","POU","PU","QI","QIA","QIAN","QIANG","QIAO","QIE","QIN","QING","QIONG","QIU","QU","QUAN","QUE","QUN","RAN","RANG","RAO","RE","REN","RENG","RI","RONG","ROU","RU","RUA","RUAN","RUI","RUN","RUO","SA","SAI","SAN","SANG","SAO","SE","SEN","SENG","SHA","SHAI","SHAN","SHANG","SHAO","SHE","SHEN","SHENG","SHI","SHOU","SHU","SHUA","SHUAI","SHUAN","SHUANG","SHUI","SHUN","SHUO","SI","SONG","SOU","SU","SUAN","SUI","SUN","SUO","TA","TAI","TAN","TANG","TAO","TE","TENG","TI","TIAN","TIAO","TIE","TING","TONG","TOU","TU","TUAN","TUI","TUN","TUO","WA","WAI","WAN","WANG","WEI","WEN","WENG","WO","WU","XI","XIA","XIAN","XIANG","XIAO","XIE","XIN","XING","XIONG","XIU","XU","XUAN","XUE","XUN","YA","YAN","YANG","YAO","YE","YI","YIN","YING","YO","YONG","YOU","YU","YUAN","YUE","YUN","ZA","ZAI","ZAN","ZANG","ZAO","ZE","ZEI","ZEN","ZENG","ZHA","ZHAI","ZHAN","ZHANG","ZHAO","ZHE","ZHEN","ZHENG","ZHI","ZHONG","ZHOU","ZHU","ZHUA","ZHUAI","ZHUAN","ZHUANG","ZHUI","ZHUN","ZHUO","ZI","ZONG","ZOU","ZU","ZUAN","ZUI","ZUN","ZUO",""],e={"曾":"ZENG","沈":"SHEN","嗲":"DIA","碡":"ZHOU","聒":"GUO","炔":"QUE","蚵":"KE","砉":"HUA","嬤":"MO","嬷":"MO","蹒":"PAN","蹊":"XI","丬":"PAN","霰":"XIAN","莘":"XIN","豉":"CHI","饧":"XING","筠":"JUN","长":"CHANG","帧":"ZHEN","峙":"SHI","郍":"NA","芎":"XIONG","谁":"SHUI"};N.exports={PINYINS:U,UNIHANS:I,EXCEPTIONS:e}},function(N,A,t){"use strict";var I=t(0),U=t(1);I.isSupported()&&U.shouldPatch(I.genToken)&&I.patchDict(U),N.exports=I}])});

/* js/pjw-console.js */
window.PJWConsole = class {
  show(stay = false) {
    this.dom.css({
      "bottom": "10px",
      "opacity": "1"
    });
    if (typeof(this.stay_timeout) != "undefined")
      clearTimeout(this.stay_timeout);
    if (stay) this.mouse_stay = true;
    if (!this.mouse_stay)
      this.stay_timeout = setTimeout((target) => {
        target.hide();
      }, 2500, this);
  }

  hide() {
    this.collapse();
    this.dom.css({
      "bottom": "-70px",
      "opacity": "0"
    });
    this.setColor();
  }

  expand() {
    this.history.css("display", "flex");
    this.history[0].scrollTop = this.history[0].scrollHeight;
  }

  collapse() {
    this.history.css("display", "none");
  }

  setColor(color = "rgba(0, 0, 0, .2)") {
    this.dom.css("filter", `drop-shadow(0px 0px 6px ${color}`);
  }

  // type: error warning info done code
  log(text, channel = null, type = "info") {
    if (channel) {
      channel = `data-channel="${channel}"`;
      this.dom.find(`[${channel}]`).remove();
    }
    var html = `
      <div class="pjw-console-item" ${channel}>
        <div class="pjw-console-icon material-icons-round ${type}">${type}</div>
        <div class="pjw-console-text">${text}</div>
      </div>
    `;
    if (type == "code") {
      this.history.append(html);
      return;
    }

    this.dom.children(".pjw-console-item").appendTo(this.history);
    this.dom.append(html);

    var action = {
      error: [true, "#b4220a"],
      warning: [true, "#b74710"],
      done: [true, "limegreen"],
      info: [false],
      alarm: [true],
      code: [false]
    };
    
    this.setColor(action[type][1]);
    this.show(action[type][0]);
  }

  error(text, channel = null) {
    this.log(text, channel, "error");
  }

  success(text, channel = null) {
    this.log(text, channel, "done");
  }

  warn(text, channel = null) {
    this.log(text, channel, "warning");
  }

  debug(text, channel = null) {
    this.log(text, channel, "code");
  }

  info(text, channel = null) {
    this.log(text, channel, "info");
  }

  alert(text, channel = null) {
    this.log(text, channel, "alarm");
  }

  constructor() {
    var html = `
    <div id="pjw-console" class="mdc-card">
      <div id="pjw-console-history">
      </div>
      <div class="pjw-console-item">
        <div class="pjw-console-icon material-icons-round">emoji_people</div>
        <div class="pjw-console-text">PotatoPlus v${window.pjw_version}</div>
      </div>
    </div>`;

    this.dom = $$(html).appendTo("body");
    this.history = this.dom.children("#pjw-console-history");

    $$(document).on("mousemove", null, {
      target: this
    }, function(e) {
      if (e.clientY >= $$(window).height() - 60)
        e.data.target.show();
    });

    this.dom.on("click", null, {
      target: this
    }, function(e) {
      e.data.target.expand();
    });

    this.dom.on("mouseenter", null, {
      target: this
    }, function(e) {
      var target = e.data.target;
      target.mouse_stay = true;
      clearTimeout(target.stay_timeout);
    });

    this.dom.on("mouseleave", null, {
      target: this
    }, function(e) {
      var target = e.data.target;
      target.mouse_stay = false;
      target.stay_timeout = setTimeout((target) => {
        target.hide();
      }, 600, target);
    });
  }
}

/* js/pjw-lib.js */
var frozen_quotes = `
The snow glows white on the mountain tonight, not a footprint to be seen.
A kingdom of isolation, and it looks like I'm the queen.
The wind is howling like this swirling storm inside.
Don't let them in, don't let them see, be the good girl you always have to be
Conceal, don't feel, don't let them know
Let it go, let it go, can't hold it back anymore
Let it go, let it go, turn away and slam the door!
I don't care, what they're going to say, let the storm rage on
The cold never bothered me anyway!
It's funny how some distance, makes everything seem small, and the fears that once controlled me, can't get to me at all!
It's time to see what I can do, to test the limits and break through
No right, no wrong, no rules for me, I'm free!
Let it go, let it go, I am one with the wind and sky
Let it go, let it go, you'll never see me cry!
Here I stand, and here I'll stay
Let the storm rage on!
My power flurries through the air into the ground, my soul is spiraling in frozen fractals all around, and one thought crystallizes like an icy blast
I'm never going back, the past is in the past!
Let it go, let it go, and I'll rise like the break of dawn
Let it go, let it go, that perfect girl is gone!
Here I stand, in the light of day
Do you wanna build a snowman? Come on, let's go and play!
I never see you anymore, come out the door, it's like you've gone away
We used to be best buddies, and now we're not, I wish you would tell me why!
Do you wanna build a snowman? It doesn't have to be a snowman...
Do you wanna build a snowman? Or ride our bike around the halls?
I think some company is overdue, I've started talking to the pictures on the walls!
It gets a little lonely, all these empty rooms, just watching the hours tick by...
Elsa, please I know you're in there, people are asking where you've been
They say have courage, and I'm trying to, I'm right out here for you, just let me in
We only have each other, it's just you and me, what are we gonna do?
Do you wanna build a snowman?
All my life has been a series of doors in my face, and then suddenly I bump into you
I've been searching my whole life to find my own place, and maybe it's the party talking or the chocolate fondue?
And it's nothing like I've ever known before!
Love is an open door!
Love is an open door, with you, with you, with you, with you
Love can be so much more, with you, with you, with you, with you!
Our mental synchronization, can have but one explanation
You and I, were just meant to be!
Say goodbye, say goodbye, to the pain of the past, we don't have to feel it anymore!
Can I say something crazy? Will you marry me?
Can I say something even crazier? Yes!
Born of cold and winter air and mountain rain combining, this icy force both foul and fair has a frozen heart worth mining.
Beautiful! Powerful! Dangerous! Cold! Ice has a magic, can't be controlled.
Stronger than one! Stronger than ten! Stronger than a hundred men!
Cut through the heart, cold and clear! Strike for love and strike for fear!
There's beauty and there's danger here, split the ice apart! Beware the frozen heart...
The window is open so's that door, I didn't know they did that anymore, who knew we owned eight thousand salad plates?
For years I've roamed these empty halls, why have a ballroom with no balls? Finally, they're opening up the gates
There'll be actual, real, live people, it'll be totally strange, but wow am I so ready for this change!
'Cause for the first time in forever, there'll be music, there'll be light
For the first time in forever, I'll be dancing through the night
Don't know if I'm elated or gassy, but I'm somewhere in that zone
'Cause for the first time in forever, I won't be alone
Tonight imagine me gown and all, fetchingly draped against the wall, the picture of sophisticated grace
I suddenly see him standing there, a beautiful stranger tall and fair, I wanna stuff some chocolate in my face
But then we laugh and talk all evening, which is totally bizarre, nothing like the life I've led so far!
For the first time in forever, there'll be magic, there'll be fun
For the first time in forever, I could be noticed by someone
And I know it is totally crazy, to dream I'd find romance, but for the first time in forever, at least I've got a chance.
Don't let them in, don't let them see, be the good girl you always have to be
Conceal, don't feel, put on a show, make one wrong move and everyone will know
For the first time in forever, I'm getting what I'm dreaming of
A chance to change my lonely world, a chance to find true love
I know it all ends tomorrow, so it has to be today!
'Cause for the first time in forever, for the first time in forever, nothing's in my way!
Bees'll buzz, kids'll blow dandelion fuzz, and I'll be doing whatever snow does in summer.
A drink in my hand, my snow up against the burning sand, probably getting gorgeously tanned in summer.
I'll finally see a summer breeze, blow away a winter storm, and find out what happens to solid water when it gets warm!
And I can't wait to see, what my buddies all think of me, just imagine how much cooler I'll be in summer.
Dah dah, da doo, uh bah bah bah bah bah woo
The hot and the cold are both so intense, put 'em together it just makes sense!
Rrr Raht da daht dah dah dah dah dah do
Winter's a good time to stay in and cuddle, but put me in summer and I'll be a - happy snowman!
When life gets rough, I like to hold on to my dream, of relaxing in the summer sun, just lettin' off steam.
Oh the sky will be blue, and you guys will be there too.
When I finally do what frozen things do in summer!
Is it the clumpy way he walks? Or the grumpy way he talks? Or the pear-shaped, square-shaped weirdness of his feet?
And though we know he washes well, he always ends up sort of smelly, but you'll never meet a fellow who's as sensitive and sweet!
So he's a bit of a fixer-upper, but this we're certain of, you can fix this fixer-upper up with a little bit of love!
Are you holding back your fondness due to his unmanly blondness?
He's just a bit of a fixer-upper, he's got a couple of bugs, his isolation is confirmation of his desperation for human hugs!
The way to fix up this fixer-upper is to fix him up with you!
Her quote 'engagement' is a flex arrangement, and by the way I don't see no ring!
So she's a bit of a fixer-upper, her brain's a bit betwixt, get the fiancé out of the way and the whole thing will be fixed!
We're not sayin' you can change him, 'cause people don't really change, we're only saying that love's a force that's powerful and strange!
People make bad choices if they're mad, or scared, or stressed.
Throw a little love their way, and you'll bring out their best, true love brings out their best!
Everyone's a bit of a fixer-upper, that's what it's all about!
Father! Sister! Brother! We need each other, to raise us up and round us out!
Everyone's a bit of a fixer-upper, but when push comes to shove
The only fixer-upper fixer that can fix up a fixer-upper is True! true! True, true, true! Love (True love) Love, love, love, love, love Love! (True love!)
Do you, Anna, take Kristoff to be your troll-fully wedded...
Reindeers are better than people, Sven, don't you think that's true?
Yeah, people will beat you and curse you and cheat you, every one of them's bad except you!
But people smell better than reindeers, Sven, don't you think I'm right?
That's once again true, for all except you!
You got me, let's call it a night.
Good night. Don't let the frostbite bite.
Please don't shut me out again, please don't slam the door, you don't have to keep your distance anymore.
'Cause for the first time in forever, I finally understand
For the first time in forever, we can fix this hand in hand!
We can head down this mountain together, you don't have to live in fear!
'Cause for the first time in forever, I will be right here.
Arendelle's in deep, deep, deep, deep snow
Sure you can, I know you can!
'Cause for the first time in forever, you don't have to be afraid!
Oh I'm such a fool, I can't be free! No escape from the storm inside of me!
We can work this out together, we'll reverse the storm you've made!
Anna, please, you'll only make it worse!
Don't panic, we'll make the sun shine bright!
We can face this thing together, we can change this winter weather, and everything will be alright!
Yes, the wind blows a little bit colder, and we're all getting older, and the clouds are moving on with every autumn breeze
Yes, some things never change, like the feel of your hand in mine
Some things stay the same, like how we get along just fine
Like an old stone wall that'll never fall, some things are always true!
Some things never change, like how I'm holding on tight to you.
Yeah, some things never change, like the love that I feel for her
Some things stay the same, like how reindeers are easier
But if I commit and I go for it, I'll know what to say and do, right?
These days are precious, can't let them slip away
I can't freeze this moment, but I can still go out and seize this day!
The wind blows a little bit colder, and you all look a little bit older
It's time to count our blessings beneath an autumn sky
We'll always live in a kingdom of plenty, that stands for the good and the many!
Some things never change, turn around and the time has flown
Some things stay the same, though the future remains unknown
May our good luck last, may our past be past, time's moving fast, it's true!
Some things never change, and I'm holding on tight to you.
Where the north wind meets the sea, there's a river full of memory.
Sleep, my darling, safe and sound, for in this river all is found.
In her waters, deep and true, lie the answers and a path for you.
Dive down deep into her sound, but not too far or you'll be drowned.
Yes, she will sing to those who'll hear, and in her song, all magic flows
But can you brave what you most fear? Can you face what the river knows?
Where the north wind meets the sea, there's a mother full of memory.
Come, my darling, homeward bound, when all is lost, then all is found.
I can hear you, but I won't, some look for trouble, while others don't.
There's a thousand reasons I should go about my day, and ignore your whispers which I wish would go away.
You're not a voice, you're just a ringing in my ear, and if I heard you, which I don't, I'm spoken for I fear.
Everyone I've ever loved is here within these walls, I'm sorry, secret siren, but I'm blocking out your calls!
I've had my adventure, I don't need something new
I'm afraid of what I'm risking if I follow you, into the unknown, into the unknown, into the unknown!
What do you want? 'Cause you've been keeping me awake, are you here to distract me so I make a big mistake?
Or are you someone out there who's a little bit like me, who knows deep down I'm not where I'm meant to be?
Every day's a little harder, as I feel my power grow
Don't you know there's part of me that longs to go… Into the unknown?
Are you out there? Do you know me? Can you feel me? Can you show me?
Where are you going? Don't leave me alone! How do I, follow you, into the unknown?
Every inch of me is trembling, but not from the cold.
Something is familiar, like a dream I can reach but not quite hold.
I can sense you there, like a friend I've always known
I'm arriving, and it feels like I am home
I have always been a fortress, cold secrets deep inside
You have secrets, too, but you don't have to hide
Show yourself, I'm dying to meet you
Show yourself, It's your turn
Are you the one I've been looking for, all of my life?
Show yourself, I'm ready to learn
I've never felt so certain, all my life I've been torn
But I'm here for a reason, could it be the reason I was born?
I have always been so different, normal rules did not apply
Is this the day, are you the way, I finally find out why?
Show yourself, I'm no longer trembling
Here I am, I've come so far
You are the answer I've waited for, all of my life!
Oh, show yourself, let me see who you are
Come to me now, open your door, don't make me wait, one moment more!
I am found!
Show yourself, step into your power
Grow yourself, into something new
You are the one you've been waiting for, all of your life!
Oh, show yourself!
This will all make sense when I am older, someday I will see that this makes sense.
One day when I'm old and wise, I'll think back and realize, that these were all completely normal events!
I'll have all the answers when I'm older, like why we're in this dark enchanted wood
I know in a couple years, these will seem like childish fears
And so I know this isn't bad, it's good.
Growing up means adapting, puzzling at your world and your place
When I'm more mature, I'll feel totally secure, being watched by something with a creepy, creepy face
See, that will all make sense when I am older, so there's no need to be terrified or tense
I'll just dream about a time, when I'm in my aged prime!
'Cause when you're older, absolutely everything makes sense!
This is fine.
Again, you're gone, off on a different path than mine
I'm left behind, wondering if I should follow?
But is this what it feels like to be growing apart?
When did I become the one who's always chasing your heart?
Now I turn around and find, I am lost in the woods.
North is south, right is left, when you're gone!
I'm the one who sees you home, but now I'm lost in the woods
And I don't know what path you are on, I'm lost in the woods.
Up 'til now, the next step was a question of how, I never thought it was a question of whether
Who am I, if I'm not your guy? Where am I, if we're not together, forever?
Now I know you're my true north, 'cause I am lost in the woods
Up is down, day is night, when you're not there!
Oh, you're my only landmark, so I'm lost in the woods, wondering if you still care...
But I'll wait, for a sign, that I'm your path, 'cause you are mine!
Until then, I'm lost in the woods!
I've seen dark before, but not like this, this is cold, this is empty, this is numb.
The life I knew is over, the lights are out, hello darkness, I'm ready to succumb.
I follow you around, I always have, but you've gone to a place I cannot find.
This grief has a gravity, it pulls me down.
But a tiny voice, whispers in my mind
You are lost, hope is gone, but you must go on. And do the next right thing.
Can there be a day beyond this night? I don't know anymore what is true.
I can't find my direction, I'm all alone, the only star that guided me was you!
How to rise from the floor, when it's not you I'm rising for?
Just do the next right thing
Take a step, step again, it is all that I can to do, the next right thing.
I won't look too far ahead, it's too much for me to take.
But break it down to this next breath, this next step, this next choice is one that I can make!
So I'll walk through this night, stumbling blindly toward the light, and do the next right thing!
And with the dawn, what comes then? When it's clear that everything will never be the same again!
Then I'll make the choice, to hear that voice, and do, the next, right, thing.
`;

var lib = `
C.③;  下列情况中，不属于考试作弊而属于一般考试违纪的是:①在允许用的工具书上写有考试有关的内容或书中夹带有关的材料者(不论是否抄用) ;②在桌面、手上等处写有与考试课程有关内容者;③不配合监考教师履行检查学生证件等职责者;④抢夺、窃取他人试卷、答卷、草稿纸或者强拿他人答卷或草稿纸为自己抄袭提供方便者(不论是否抄用)。
B.①②③;  以下行为与违规认定、处分对应关系正确的是:①经监考老师提醒后，仍未在试卷、答卷、草稿纸上填写姓名、学号、考号等信息者。一严重违反考试纪律，严重警告处分。②在发放试卷时领取超过一.份试卷、答卷且未将多余试卷返还监考教师者;一一般违反考试纪律， 警告处分。③故意销毁试卷、答卷或者考试材料者。一考 试作弊，记过处分。④涂改他人试卷姓名占为已有者。一严 重违反考试纪律，严重警告处分。
D.①②③④; 下列做法中正确的是:①书包、书籍、讲义、笔记、草稿纸等物品必须存放在监考教师指定的位置;②具有通讯或存储功能的手机、智能手表、电子词典等电子设备须关机后放入书包内;③只有任课教师允许且考试必需使用时才可携带计算器、耳机等物品;④学生应隔位就座;⑤学校的期末考试不需要携带有效身份证件。
A.开学第一周的规定时间; 需要补考的学生，须在开学____在“教服平台”进行补考申请。
B.①②③④; 下列关于学生申诉的说法正确的是:①学生对同一处理或者处分决定的申诉，以一次为限。②在申诉期间，不停止原处理或者处分决定的执行。③学生在接到符合申诉处理办法的处理或者处分决定书之日起十日内，可向学校学生申诉处理委员会提出书面申诉。④申诉复查决定作出之前，申诉人可以书面撤回中请，申诉复查程序终止。
C.作弊 记过;  携带处于开机状态的手机或其它具有通讯或存储功能的电子设备(不论使用与否且不论是否为本人所有)，属于__行为，给予__处分。
D.③④; 下列说法中正确的是:①学生休学时间不计入修业年限;②学生保留学籍时间不计入修业年限;③学生体学时间计入修业年限;④学生保留学籍时间计入修业年限。
D.①②③④; 以下哪些情况，不得申请成绩更正。①未选课注册或未办重修手续;②缺课或缺交作业超过三分之一;③未按时参加考试或提交作业;④违反考试纪律。
A.零分 开除学籍;  考试作弊的学生，该次考试成绩以____计，视情节给予相应处分，对于第二次作弊的学生，给予____处分。
A.作弊 记过;  开考后，桌面、桌内、座位旁、文具盒或试卷下、衣物等学生可触及范围内，有与考试内容有关的书、笔记本、复习提纲、讲义，或其他提前写有考试相关内容的纸张等(不论看与否且不论是否是本人所有)，属于____行为，给予____处分。
C.第二学期 第二、三、四学期;  各学科大类完成学科分流时间原则上在_____结束时，?原则上专业准入完成时间分别在_____结束时。
B.作弊 记过;  在读书报告、文献综述、课程论文、学年论文、毕业论文(设计)等方式的考核中抄袭或剽窃书籍、网络资料、他人作品，被任课教师认定为情节极其严重者，属于_??行为，给予_??处分。
C.30 40;  "学生修完第二专业规定的全部课程(学科平台、专业核心课程)，成绩合格，可申请南京大学第二专业证书。未能修完第二专业规定的全部课程，但已取得该专业学科平台、专业核心课程  个学分及以上，并且与主修专业(含多个第二专业中的其它专业)课程差异达50%以上,成绩合格者，可申请南京大学辅修专业结业证书;学生跨学科取得某个专业的学科平台、专业核心课程____个学分及以上， 并且与主修专业(含多个第二专业中的其它专业)课程差异达50%以上，成绩合格者，可申请南京大学双学位证书。"
A.视为自动退学 不享受; 保留学籍学生须在保留学籍期满后及时到校办理复学手续。逾期不办理复学手续者。 保留学籍的学生__在校学生和体学学生待遇。
C.①②③④; 下列属于原则上不予补考的情况是:①无故未参加课程考核;②考核中有违纪行为者;③因缺课，课程成绩以零分记载的;④因缺交作业严重，课程成绩以零分记载的。
C.平时成绩（含期中）和补考卷面成绩综合 不得;  学生首次修读的课程成绩不及格，可以申请一次补考，课程补考成绩按_评定。重修者__参加补考
A.1;  学生通过单独组班学习获得的第二专业课程成绩及学分，可以记载入____ : 1. 第二专业课程成绩单; 2.主修专业成绩单。
D.①③; 以下说法正确的是___ : ①获得副修结业证书者，允许在毕业后学校规定的最长学习年限內，按结业后重修的选课、缴费方式，继续修读所缺课程，合格者可换发双学位证书、第二专业证书。②第二专业准出申请时间在第入学期(五年制在第十学期)开学后两周。③学生主修专业(第-专业)课程与第专业课程相同(同课程名、同学分、同内容)，  经教务处审核后，可将该课程成绩及学分记载入第二专业课程成绩单
C.在教务系统里自行 提交书面申请;  "在设置专业意向的情况下,如果跨专业(大类)课程和自己的必修课有冲突，可_____?申?请缓修。如果是其他原因(课业偏重、实习等)需要缓修某门必修课的，可_??申请缓修，经所在院系审核同意后备案并删除课程。"
B.两 ①②③④; 学生每学期申请“免修不免考’的课程原则上不超过____。不得申请“免修不免考 ’的课程有___。 ①思政类课程;②军事课程;③体育课程;④实践类课程
A.①②③④⑤;  下列行为中属于一般违反考试纪律，应给予警告处分的有:①考试中以上厕所为由，到其他场所逗留者;②未经监考教师允许借用他人的考试相关用品者;③书包、书籍、讲义、笔记本、草稿纸等物晶未放在指定的位置且不听监考教师劝告者;④考试期间携带手机等具有通讯或信息存储功能的电子设备但处于关机状态者;⑤未经监考教师允许，擅自使用自备草稿纸者。
B.不能; 未获得主修专业(第一专业)毕业证书的学生，___获得第二专业证书、副修证书或双学位证书。
A.①②③;  "以下关于缓考的相关说法正确的是:①《缓考申请表》  (附相关证明材料)在期未考试开始前一周的第1-2个工作日提交教务处复审;②办理级考手续需提供客观真实的相关证明材料，如有弄虚作假，-经查实，相关课程按零分记载并按相关管理规定给予纪律处分;③缓考时间为每学期开学初,和补考同时进行，使用B卷;④《级考申请表》无须任课教室、开课单位教学院长书面同意，院系审批同意即可。"
B.3个月;  对于____以上的长期交换培养项目，原则上每位学生在校期间只能参加一次。
D.①②③④; 关于退学、试读的说法正确的有:①未经批准连续两周未参加学校规定的教学活动者应了退学;②学期内I课累计达50学时者应予退学;③学生本人申请退学的，需递交书面退学申请，经学生所在院系、教务处审核同意后，报分管校长审批;④学生享有对退学处理的陈述和申辩的权利。
D.①②③④⑤;  《南京大学学生申诉处理办法》适用于学校给予具有南京大学学籍学生的下列处理或者处分:①已经入学报到予以学籍注册的学生，被取消入学资格;②警告、严重警告、记过、留校察看、开除学籍等纪律处分;③3退学处理;④已经取得学历证书、学位证书的学生，给予撤销学历证书、学位证书处理;⑤需要申诉的其他处理。
A.②③④;  以下说法正确的有:①只有参加学位英语考试，成绩在及格以上才能申请授予学上学位;②因违反学术诚信受到记过(含记过)以上处分者，处分后如在学业等方面有突出成就，处分解除后，在毕业当年至最长修业年限内的6月1日至15日，可提交授予学上学位的书面申请;③学位补授的时间在每年三月、九月;④结业后重修课程期间或毕业后回校参加学位英语考试期间，有考试作弊行为者，取消其学位授予资格。
D.①②③④⑤;  《南京大学全日制本科生考试管理办法》的适用范围包括____:①闭卷笔试、?开卷(半开卷)笔试;②读书报告、文献综述;③操作考试、口试、口笔试兼用;④网络考试;⑤课程论文、学年论文、毕业论文(设计)
A.三分之一 三分之一 零分; 缺课时间达到某门课程一学期上课时间的_，或缺交作业达到某门课程一学期作业量的___，?不得参加本课程考，课程成绩以_??记载。(1.25分)
A.①②③;  关于交流学习的课程认定和学分转换范围，以下说法正确的是____?:?①交换课程认定完成后，不得再次中请课程认定。②校内已修的课程，不得用校外交流的课程替代。③学生参加校际交换的学期，须于开学两周内登陆本科生教服平台完成交流项目备案，没有在本科生教服平台进行交流项目备案的学生，其交流成绩认定不予受理。
B.425;  申请学位需通过学校组织的学位英语考试，成绩在及格以上。学生参加本校组织的全国大学英语六级考试成绩达_分及以上，可免学位英语考试。
A.保留南京大学学籍不变 3; 境外交换生在境外学校学习期间，其学籍_____，在满足对方学校最低要求的基础?上返校后至少应申请认定____个学分。(1.25分)
C.①②③;  以下应作结业处理的是:①学生在标准学制期满时，修完教学计划规定的内容，但仍有课程未通过，未通过学分之和低于(含)?12个;②受处分的学生，毕业时未解除其处分者;③最长修业年限期满，仍达不到毕业条件且满足结业条件者。
B.①②③④; 下列行为中属于考试作弊，应给予记过处分的有:①在考场内以借计算器、工具书、文具等物品的方式传递、接收有关答题内容者;②在考试中利用.上厕所机会在考场外偷看有关教学内容和考试资料或与他人交谈有关考试内容或使用手机者;③因保管不善等原因造成试卷、答卷及草稿纸等物品，在考试过程中或交卷时被他人利用，视为双方作弊;④评卷过程中发现同一科目同一考场有两份及以上答卷答案雷同，视为共同作弊。
A.一次 重修成绩;  学生如对已获得学分的某门课程成绩不满意，最多可以申请该课程重修__次并缴纳学分学费。课程重修后，以___计入学分绩。(1.25分)
B.①②③④; "关于成绩更正的流程，以下说法正确的是:①成绩更正申请受理时间为每学期开学两周内，逾期申请不予受理。②成绩更正申请表由任课老师填写，并附证明材料,由开课单位教务人员审核，经开课单位教学院长批准后，交送教务处。③每学期第三周，教务处对成绩更正申请组织审查，审查通过且公示期内无异议的，将在教务管理系统予以成绩更正。④对审查结果有异议的，可在公示期内提交相关证明材料,申请复查。(1.25分)"
B.①②③④; 下列行为中属于考试作弊，应给了记过处分的有:①为他人提供偷看机会者或偷看他人的试卷、答卷、草稿纸等考试材料者;②经允许上厕所后回考场时，发现带有与考试有关的材料;③已传给、已接看了他人的考卷、答卷或写有答题内容的草稿纸、纸条的传递者和接收者;因有交头接耳行为经警告仍不改正者; (1.25分)
D.开学两周 前两周; 休学、复学、保留学籍申请的集中审核批复时间为每学期___时间内。?应届毕业生办理了体学、保留学籍的，须在标准学制结束_??内提交复学申请。(1.25分)
B.一 两;  每学期允许缓修的课程数量原则上不超过准入课程时间冲突的情况下，允许缓修__门，专业意向为“跨院系专业准入”的，并且本专业必修课与对方专业门。(1.25分)
C.①②③;  可以申请缓考的情况包括:①公务性事假，如参加学校组织的重要的出访、竞赛、学术会议等;②家庭有重大变故，如遭遇严重自然灾害、有直系亲属亡故(病危)窨;③学生本人突发严重疾病，需住院治疗(观察)。(1.25分)
C.开放选修课程; 学生通过开放选修获得的第二专业课程成绩及学分，可作为_____学分记入主修专业 成绩单。
B.一年 必须办理退学手续;  "因总学分或必修课程学分达不到每学年最低要求须退学者，可申请在校试读_____。?试读期满达到在校修读年限累计学分数要求者，可继续就读;试读不合格者,???。(1.25分)"
B.旷考 零分;  "学生未申请缓考或申请未获准，未按时参加课程期末考试者，视为_____，课程成绩以_____记录。(1.25分)"
C.①②皆是; "下列属于有效的学业成绩单的是: 0由院系教务员打印,加盖教务员签名章及院系公章的成绩单;②由教务处打印(或自助打印) ,加盖教务处成绩审核章的成绩单。(1.25分)"
B.开学一周; 如果学生对课程成绩有疑问，可以在学期_____之内向开课院系（单位）教务员提出书面查分申请。(1.25分)
C.二周 三到八周 八周后;  学生应及时在教务系统内核对本学期课程，如学生选课不当，可在规定时间内退选课程。在课程开课_??退选的，该课程不记载在成绩单;在课程开课_??内退选的，该课程记载在成绩单，无成绩，注明“退选”字样，课程开课_??不得退选。(1.25分)
A.20 40 60 80 100;  第一学年最低完成必修课程（通修、平台、核心）学分数为_____，第二学年累计为_____，第三学年累计为_____，第四学年累计为_____，第五学年累计为_____。(1.25分)
A.一学期 一学年 批准; 学生因故休学时间不得少于____，一般以____为期。休学开始时间从休学申请____之日开始计算。(1.25分)
B.50% 50%;  学生选择的第二专业，其课程设置与主修专业的课程设置差异应达_____以上。学生同时修读多个第二专业，各第二专业之间的课程设置差异应达 _____以上。(1.25分
D.①②③;  "下列关于成绩记载的说法正确的是:①课程原成绩和补考成绩分别记载在成绩单上,补考成绩注明“补考”字样，课程原成绩注明“无效”字样。②课程缓考成绩按平时成绩(含期中)和缓考卷面成绩综合评定后记入学业成绩单,注明“缓考”字样。③重修课程以实得成绩记入成绩单，注明“重修”字样,原成绩注明“无效’字样。(1.25分)"
A.①②③④; 申请成绩更正，需提交的材料对应正确的是:①[登分错误]一成绩更正申请表、 成绩登记表复印件、试卷或论文复印件;②[成绩漏登]一成绩更正申请表、 成绩登记表复印件、试卷或论文复印件、含考场记录的考试小结或考场记录表、考试签到表以及其他可证明学生按时参加考试、提交作业的材料;③1平时分错误1一能证明参与 课程学习的材料，如点名册复印件、平时作业等;④[评分错误]成绩更正申请表、成绩登记表复印件、试卷或论文复印件、评分依据。(1.25分)
C.14 ①②③; 学生修读通识教育类课程不得少于___个学分。?属于通识教育类课程的有:①通识教育课;②新生研讨课;③新生导学课(1.25分)
C.③;  以下说法错误的是____?:?①学校允许学生创业或参军入伍;②学生体学创业、参军入伍时间一~般不超过2年;③学生休学创业、参军人伍的时间计入修业年限;④凡参加交流项目学生的学生，未经学校批准延期在外不归者，作退学处理。
B.开学两周 院系教务员; 因课程缓修或休学、交换等原因，没能按时修读某些课程，可申请补修。补修办理在_??_内进行，其中，通修课程的补修可在教务系统自行选课，专业课程的补修露提交书面申请，由_??_审核入班。(1.25分)
C.①②; "以下关于“免修不免考“的说法正确的是:①开课两周内申请;②由本人提出书面申请经任课教师及所在学院审核同意,报教务处备案;③无须注册课程;④申请通过后可不随堂听课，也可不交作业，须参加期未考核。(1.25分)"
B.第一周 第三周;  学生应在需重修课程开课的学期_批通过后，须在重修申请学期开学____内在“教服平台”提交相应课程重修申请，由院系教务员审核。学生重修申请审规定的时间内缴纳重修课程学分学费，逾期未缴费的，视为放弃重修。(1.25分)
B.学科分流意向 第一学期期中考试后; 为保障学生从一年级大类培养阶段到学科、专业培养阶段的顺利过渡，学生在第一学期需设置自己学科、专业意愿，即“_____”设置时间一般为_  _之后。(1.25分
C.开放选修课程; 学生修读的课程分为通识通修课程、学科专业课程和___三大模块。
D.以上均不可;  下列情况中，可以申请跨院系专业准入的有:①定向生、国防生、外语类保送生、运动员班、艺术类专业学生。②招生时有特殊要求的提前批次录取本科学生。③未经全国统一高考招收的特殊录取类型学生。④休学(保留学籍)期间的学生。⑤低学历层次转高学历层次。(1.25分)
D.退学 4; 凡经注册的课程必须按时上课。学生不请假或请假未批准而缺席，视为旷课。累计旷课达50学时者给予____处理。 各类实习军训、社会调查期间，未经同意擅自离队，每天按_  学时计算。(1.25分)
A.退学 20 40 60 80 100; "学生每学年应完成修读课程最低学分要求,否则作_处理。第一学年最低完成总学分数为____,第二学年累计为_，第三学年累计为_  第四学年累计为_第五学年累计为_  (1.25分)"
C.一学年 两次; 学生在标准学制期满时，未能修完教学计划规定的内容，无法达到毕业条件，可申请延长学习年限，每次可申请延长____最多申请_  _。 须在新学年开学两周内办理手续。(1.25分)
D.自动退学; 未经请假、请假未获批准或获准后逾期两周不注册的按__处理。
C.六年 七年;  全日制本科各专业的标准学制为四年或五年。学生可申请提前毕业或延长学习年限，但四年制学生最长修业年限不得超过_??;五年制学生最长修业年限不得超过_??(1.25分)
A.跨专业选课专业意向 第一周;  学生如果在学习主修专业课程的同时，对其他某个专业课程感兴趣，则需设置该专业为“_____”?，专业意向用于计算跨专业选课的优先级，设置时间-?~般为入学后_??(1.25分)
A.八 二;  专业准出申请时间在第_____学期开学后_周。
A.已准入的专业; 所有普通全日制本科生，都应申请一个专业作为主修专业准出，准出专业必须是我校经教育部批准的本科专业。学生原则上应将_??作为主修专业，申请专业准出。(1.25分)
D.①②③④; 下列哪些情况，不能获得学士学位授予资格：①因违反学术诚信受到记过（含记过）以上处分者；②退学试读者；③未通过学校组织的学位英语考试者；④处于处分期者。(1.25分)
C.①③④;  以下说法正确的是____：①休学、保留学籍时间累积最长不得超过两年；②休学学生可继续享受在校学习学生待遇，参与教学活动；③因病休学的学生，须离校治疗、休养；④学生休学期间，如有违纪行为，按《南京大学学生违纪处分规定》处理。(1.25分)
B.①②⑥;  学生请假须提出书面申请，并附相关事假、病假证明，在向任课教师请假时需出示具有下述审批手续的请假单:一天以上一周以内由  _批准;一周以上六周以内由_  _批准;超过六周_  ①辅导员;②主管教学院长(主任) ;③教务处;④学工处;⑤报教务处、学工处备案;⑥须办理体学手续。(1.25分)
B.15分钟 15分钟;  学生应在开考前_??_进入考场，不得中途擅自离场。开考后，迟到者需得到监考教师的允许方可进入考场、参加考试;迟到_??_以上者，不得参加考试，视作旷考。(1.25分)
D.①②③;  学生在学业、学术、品性等方面的失信行为须记录在学籍档案中。对有赃重失信行为的，给予相应的处分，对违背学术诚信的，对其获得学位等作出限制。下列行为属于学术不诚信行为的是:①考试作弊;②论文抄袭;③帮助他人实施学术不诚信行为。(1.25分)
D.②③⑤;  关于学科分流、专业准人的说法正确的是:①不允许学科大类在学科分流时直接进行专业准入。②学生在第二学期结束时准入某专业学习后，如有重新选择专业学习的意慰，可在第四学期规定的时间内再次申请专业准入。③学生在学科大类内申请学科、专业准入时，可填报多个志感。④学生申请跨大类学科、专业准入时，可不必填写录取学科大类的学科、专业准，入志愿。⑤跨大类申请学科、专业准入的学生，一旦被录取，其在录取学科大类填报的学科、专业准入志愿作废。
B.2;  学生修读通识教育类课程应包含____个学?分的悦读经典课程。
B.一年; 学校原则上不允许交换培养项目延期，如确因学业.上的特殊情况需延期交流的，必须办理延期手续，且境外交流学习时间累计不得超过??__。?(1.25分)
B.①③④⑤; 下列情况中，属于严重违反考试纪律，应给予严重警告处分的有:①使用规定以外的笔、纸答题或者在试卷规定范围以外的地方书写姓名、考号或者以其它方式在答卷.上标记信息者;②在考场内外大声喧哗经制止无效者;③考试过程中未经监考教师允许擅自离开考场者;④擅自将试卷、答卷、草稿纸等考试用纸带出考场外者;⑤考试中，在厕所停留时间超过15分钟者。(1.25分)
C.按实得成绩计入 60分;  课程有效成绩、学分计入学分绩，不及格的课程在补考或重修通过之前____学分绩， 补考通过的课程按_计入学分绩，原不及格成绩不再计入学分绩。(1.25分)
B.20; 学分绩计算方法为：学分绩=[(课程考分/______*学分数)求和]/总学分数。(1.25分)
C.两 网络课程; 交换期间，一般不得办理本校选课注册手续，经任课教师、开课院系和所在院系同意后，交换期间每学期最多可申请___门免修不免考课程;除_  外，擅自听课、考试者，其考试成绩不予承认。(1.25分)
C.第一周 旷课; 每学期开学_____，学生必须办理报到注册手续;因故不能如期到校注册者，必须办理请假手续并提供必要的证明材料，否则以_论处。(1.25分)
`;




/* js/pjw-filter.js */
var pjw_filter = {
  /* avail module v1.0 */
  avail: {
    html: `
      <div id="pjw-avail-filter">
        <heading><span class="material-icons-round">add_task</span>空余课程</heading>
        <div class="content pjw-switch-box">
          <div class="mdc-switch" id="pjw-avail-switch">
            <div class="mdc-switch__track"></div>
            <div class="mdc-switch__thumb-underlay">
              <div class="mdc-switch__thumb"></div>
              <input type="checkbox" id="pjw-avail-switch-input" class="mdc-switch__native-control" role="switch" aria-checked="false">
            </div>
          </div>
          <label for="pjw-avail-switch-input">过滤不可选课程</label>
        </div>
      </div>
    `,
    intl: (space, list) => {
      space.dom = $$("#pjw-avail-filter");
      space.switch = new mdc.switchControl.MDCSwitch($$("#pjw-avail-switch")[0]);
      space.switch.checked = true;
      space.status = true;
      space.dom.find(".mdc-switch__native-control").on("change", null, {
        target: space,
        list: list
      }, (e) => {
        e.data.target.status = e.data.target.switch.checked;
        e.data.list.update();
      });
    },
    check: (space, data) => {
      if (!space.status) return 0;
      if ("select_button" in data && data.select_button.status !== false && data.select_button.status != "Select") {
        return false;
      }
      return 0;
    }
  }, 

  /* hours module v0.1 */
  hours: {
    html: `
      <div id="pjw-hours-filter">
        <heading><span class="material-icons-round">schedule</span>课程时间 *Beta</heading>
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
                <span>1&gt;</span><span>2&gt;</span><span>3&gt;</span><span>4&gt;</span><span>5&gt;</span><span>6&gt;</span><span>7&gt;</span><span>8&gt;</span><span>9&gt;</span><span>10&gt;</span><span>11&gt;</span>
              </div>
              <div class="pjw-class-weekcal-calendar-day">
                <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span><span>11</span>
              </div>
              <div class="pjw-class-weekcal-calendar-day">
                <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span><span>11</span>
              </div>
              <div class="pjw-class-weekcal-calendar-day">
                <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span><span>11</span>
              </div>
              <div class="pjw-class-weekcal-calendar-day">
                <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span><span>11</span>
              </div>
              <div class="pjw-class-weekcal-calendar-day">
                <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span><span>11</span>
              </div>
              <div class="pjw-class-weekcal-calendar-day">
                <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span><span>11</span>
              </div>
              <div class="pjw-class-weekcal-calendar-day">
                <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span><span>11</span>
              </div>
            </div>
          </div>
          <div id="pjw-hours-filter-control">
            <div id="clear-calendar" class="pjw-mini-button">清空</div>
            <div id="reset-calendar" class="pjw-mini-button">重置为空闲时间</div>
            <div id="reset-calendar-allow-all" class="pjw-mini-button">重置并允许单双周课程</div>
          </div>
        </div>
      </div>
    `,
    intl: (space, list) => {
      space.data = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
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
          for (var j = 1; j <= 11; j++)
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
            list.console.error("课程时间模块无法加载已有课程：" + res);
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

      $$("#reset-calendar-allow-all").on("click", null, {
        space: space,
        list: list
      }, (e) => {
        e.data.space.clear();
        e.data.space.loadMyClass(false).then(() => {e.data.list.update();});
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
      });

      space.dom.find("div.pjw-class-weekcal-heading-day:gt(0)").on("click", null, {
        space: space,
        list: list
      }, (e) => {
        var elem = $$(e.delegateTarget);
        var day = elem.index();
        var val = 0;
        for (var j = 1; j <= 11; j++)
          if (e.data.space.data[day][j] !== false) {
            val = false;
            break;
          }
        for (var j = 1; j <= 11; j++)
          e.data.space.setValue(day, j, val);
        e.data.list.update();
      });

      space.dom.find("div.pjw-class-weekcal-heading-day.select-all").on("click", null, {
        space: space,
        list: list
      }, (e) => {
        var val = 0;
        for (var i = 1; i <= 7; i++)
          for (var j = 1; j <= 11; j++)
            if (e.data.space.data[i][j] !== false) {
              val = false;
              break;
            }
        for (var i = 1; i <= 7; i++)
          for (var j = 1; j <= 11; j++)
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

  /* frozen module v1.0 */
  frozen: {
    html: `
      <div id="pjw-frozen-filter" style="order: 3;">
        <heading><span class="material-icons-round">ac_unit</span><span id="frozen-quotes"></span></heading>
      </div>
    `,
    intl: (space, list) => {
      space.target = $$("#frozen-quotes");
    },
    handleShow: (space, list) => {
      space.target.html(space.getRandomQuotes());
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

/*
if (!space.status) return 0;
if (data.select_button && data.select_button.action)
  if (data.select_button.status == "Select") {
    if (!space.continue_on_success)
      space.switch.checked = space.status = false;
    else {
      if ($$("#autorefresh-switch").hasClass("on"))
        $$("#autorefresh-switch").click();
    }

    var e = {data: {target: class_obj}};
    data.select_button.action(e).then(() => {
      class_obj.list.console.debug("Got a success from the potatoes module!");
    }).catch((res) => {
      class_obj.list.console.debug("Got an error from the potatoes module: " + res);
    });
  }
return 0;*/

/* js/pjw-classlist.js */
function ClassListPlugin() {
  const total_weeks = 17;

  /* 
    Class data format:
    data = {
      title: <String>,
      teachers: [<String>, ...],
      info: [{
        key: <String>,
        val: <String>,
        hidden: <Boolean>
      }, ...],
      num_info: [{
        num: <Integer>,
        label: <String>
      }, ...],
      lesson_time: [{
        start: <Integer>,
        end: <Integer>,
        type: <String>, // "normal", "odd", "even"
        weekday: <Integer>
      }, ...],
      class_weeknum: [{
        start: <Integer>,
        end: <Integer>
      }, ...],
      select_button: {
        status: <String>, // "Select", "Deselect", "Full", "Selected", false
        text: <String>,
        action: <Function>
      }
      comment_button: {
        status: <Boolean>, // true, false
        text: <String>,
        action: <Function>
      }
    };
  */

  window.PJWClass = class {
    show() {
      if (!this.initialized) this.intl();
      if (this.display == true) return;
      this.display = true;
      this.dom.css("display", "flex");
    }

    hide() {
      if (!this.initialized || this.display == false) return;
      this.display = false;
      this.dom.css("display", "none");
    }

    remove() {
      if (!this.initialized) return;
      this.dom.remove();
    }

    setPriority(priority = this.data.priority) {
      if (!this.initialized) return;
      if (priority === false || priority == -1) { this.hide(); return; }
      if (this.priority == priority) return;
      this.priority = priority;
      this.dom.css("order", -priority);
    }

    getHTML(data, attr, options = {}) {
      function getTitle(content) {
        return data.title;
      }

      function getTeachers(content) {
        var is_first = true; var accu = "";
        for (var str of content) {
          if (!is_first) accu += "，";
          is_first = false;
          accu += `<span class="pjw-class-name-initial">${str[0]}</span>` + str.slice(1);
        }
        return accu;
      }

      function getClassInfo(content) {
        var appear_accu = "", hidden_accu = "";
        for (var item of content) {
          if ("key" in item) {
            if (item.key == "课程编号") {
              item.val = `<span class="pjw-class-course-number" onclick="window.open('/jiaowu/student/elective/courseList.do?method=getCourseInfoM&courseNumber=${item.val}&classid=0');">${item.val}</span>`;
            }
            if (item.val == "") continue;
            if (!item.hidden)
              appear_accu += `<p>${item.key}：${item.val}</p>`;
            else
              hidden_accu += `<p>${item.key}：${item.val}</p>`;
          } else {
            appear_accu += `<p>${item}</p>`;
          }
        }
        return `<div class="pjw-class-info-important">${appear_accu}</div><div class="pjw-class-info-additional">${hidden_accu}</div>`;
      }

      function getNumInfo(content) {
        var accu = "";
        for (var item of content)
          accu += `<div class="pjw-class-bignum"><span class="num">${item.num}</span><span class="label">${item.label}</span></div>`;
        return accu;
      }

      function getWeekNum(data) {
        var accu = "";
        for (var item of data) {
          var style = `left: ${String((item.start - 1) / total_weeks * 100) + "%"}; width: ${String((item.end - item.start + 1) / total_weeks * 100) + "%"}`;
          if (item.start != item.end)
            accu += `<div class="pjw-class-weeknum-bar__fill" style="${style}">${item.start}-${item.end}${item.end - item.start > 2 ? "周" : ""}</div>`;
          else
            accu += `<div class="pjw-class-weeknum-bar__fill" style="${style}">${item.start}</div>`;
        }
        return accu;
      }

      function getLessonTime(data) {
        var heading_html = ``;
        var body_html = ``;

        var weekend_flag = false;
        var has_class = [false, false, false, false, false, false, false, false];
        var class_class = [
          ["", "", "", "", "", "", "", "", "", "", "", ""],
          ["", "", "", "", "", "", "", "", "", "", "", ""],
          ["", "", "", "", "", "", "", "", "", "", "", ""],
          ["", "", "", "", "", "", "", "", "", "", "", ""],
          ["", "", "", "", "", "", "", "", "", "", "", ""],
          ["", "", "", "", "", "", "", "", "", "", "", ""],
          ["", "", "", "", "", "", "", "", "", "", "", ""],
          ["", "", "", "", "", "", "", "", "", "", "", ""]
        ];

        for (var item of data) {
          if (item.weekday > 5 && weekend_flag == false)
            weekend_flag = true;

          has_class[item.weekday] = true;

          var cssclass = "selected";
          if (item.type == "odd") cssclass += " sel-odd-class";
          else if (item.type == "even") cssclass += " sel-even-class";
          for (var i = item.start; i <= item.end; i++)
            class_class[item.weekday][i] = cssclass;
          class_class[item.weekday][item.start] += " sel-start";
          class_class[item.weekday][item.end] += " sel-end";
        }

        const weekday_display_name = ["", "MO", "TU", "WE", "TH", "FR", "SA", "SU"];

        for (var i = 1; i <= 7; i++) {
          if (i > 5 && weekend_flag == false) break;

          heading_html += `<div class="pjw-class-weekcal-heading-day` + (has_class[i] ? " selected" : "") + `">${weekday_display_name[i]}</div>`;

          var body_html_span = "";
          
          for (var j = 1; j <= 11; j++) {
            if (class_class[i][j] != "")
              body_html_span += `<span class="${class_class[i][j]}">${j}</span>`;
            else
              body_html_span += `<span>${j}</span>`;
          }

          body_html += `<div class="pjw-class-weekcal-calendar-day` + (has_class[i] ? " selected" : "") + `">${body_html_span}</div>`;
        }

        return `<div class="pjw-class-weekcal-heading">${heading_html}</div><div class="pjw-class-weekcal-calendar">${body_html}</div>`;
      }

      function getSelectButton(data, get_inner = false) {
        if (!data.status) return "";
        var label_text = "选择";
        var icon_text = "add_task";
        var disabled = "";
        var extra_classes = "";

        if (data.status == "Deselect") {
          label_text = "退选";
          icon_text = "layers_clear";
          extra_classes = "deselect";
        } else if (data.status != "Select" && data.status !== true) {
          disabled = "disabled";
          icon_text = "block";
          if (data.status == "Full")
            label_text = "满员";
          else if (data.status == "Selected")
            label_text = "已选";
        }

        var info_text = "";
        if (data.text)
          info_text = `<div class="pjw-class-select-button__status">${data.text}</div>`;

        var inner_html = `<div class="mdc-button__ripple"></div><div class="material-icons-round">${icon_text}</div><div class="pjw-class-select-button__container"><div class="pjw-class-select-button__label" style="letter-spacing: 2px">${label_text}</div>${info_text}</div>`;
        if (get_inner === true)
          return {
            html: inner_html,
            disabled: (disabled == "disabled"),
            extra_classes: extra_classes
          };
        return `<button data-mdc-auto-init="MDCRipple" ${disabled} class="mdc-button mdc-button--raised pjw-class-select-button ${extra_classes}" data-extra-class="${extra_classes}">${inner_html}</button>`;
      }

      function getCommentButton(data, ID) {
        var text = ID;
        if (data.text) text = data.text;
        if (!data.status) return "";
        else return `<button data-mdc-auto-init="MDCRipple" class="mdc-button mdc-button--raised pjw-class-comment-button">
          <div class="mdc-button__ripple"></div><div class="pjw-class-comment-button__container"><div class="material-icons-round pjw-class-comment-icon">fingerprint</div><div class="mdc-button__label pjw-class-comment-button__status">${text}</div></div></button>`;
      }

      switch(attr) {
        case "title":
          if ("title" in data)
            return getTitle(data.title);
          else return "";

        case "teachers":
          if ("teachers" in data)
            return getTeachers(data.teachers);
          else return "";

        case "info":
          if ("info" in data)
            return getClassInfo(data.info);
          else return "";

        case "numinfo":
          if ("num_info" in data)
            return getNumInfo(data.num_info);
          else return "";

        case "weeknum":
          if ("class_weeknum" in data) {
            if (data.class_weeknum.length)
              return `<div class="pjw-class-weeknum-bar">${getWeekNum(data.class_weeknum)}</div>`
            else
              return `<div class="pjw-class-weeknum-bar" style="display: none;"></div>`;
          } else {
            return "";
          }

        case "lessontime":
          if ("lesson_time" in data && data.lesson_time.length > 0)
            return getLessonTime(data.lesson_time);
          else return `<div class="pjw-class-weekcal-heading">自由时间</div>`;

        case "timedetail":
          if ("time_detail" in data && data.time_detail.length > 0)
            return `<div class="pjw-class-time-detail">${data.time_detail}</div>`;
          else return "";

        case "selectbutton":
          if ("select_button" in data)
            return getSelectButton(data.select_button, options);
          else return "";

        case "commentbutton":
          if ("comment_button" in data)
            return getCommentButton(data.comment_button, data.classID);
          else return "";
      }
    }

    set(data) {
      var class_html = `
        <div class="pjw-class-info">
          <div class="pjw-class-info-top">
            <p class="pjw-class-title">${this.getHTML(data, "title")}</p>
            <p class="pjw-class-teacher">${this.getHTML(data, "teachers")}</p>
          </div>
          <div class="pjw-class-info-bottom">${this.getHTML(data, "info")}</div>
        </div>
        <div class="pjw-class-sub">
          <div class="pjw-class-weekcal">${this.getHTML(data, "lessontime")}</div>
          <div class="pjw-class-sideinfo">
            ${this.getHTML(data, "timedetail")}
            ${this.getHTML(data, "weeknum")}
            <div class="pjw-class-num-info">${this.getHTML(data, "numinfo")}</div>
          </div>
        </div>
        <div class="pjw-class-operation">
          ${this.getHTML(data, "selectbutton")}
          ${this.getHTML(data, "commentbutton")}
        </div>
      `;
      this.dom.html(class_html);
    }

    updateSelectButton(data) {
      if (!this.initialized) return;
      var button_res = this.getHTML({select_button: data}, "selectbutton", true);
      this.select_button.html(button_res.html);
      this.select_button.prop("disabled", button_res.disabled);

      if (this.select_button.attr("data-extra-class"))
        this.select_button.removeClass(this.select_button.attr("data-extra-class"));
      this.select_button.addClass(button_res.extra_classes);
      this.select_button.attr("data-extra-class", button_res.extra_classes);
    }

    updateNumInfo(data) {
      if (!this.initialized) return;
      if (this.sideinfo.children(".pjw-class-num-info").length)
        this.sideinfo.children(".pjw-class-num-info").html(this.getHTML(data, "numinfo"));
    }

    constructor(DOMparent, data, listparent) {
      var class_html = `<div class="mdc-card pjw-class-container pjw-class-container--compressed" style="display: none;"></div>`;
      this.dom = $$(class_html).appendTo(DOMparent);
      this.data = data;
      this.list = listparent;
      this.initialized = false;
    }

    intl() {
      if (this.initialized) return;
      this.initialized = true;
      this.set(this.data);

      this.info = this.dom.children(".pjw-class-info");
      this.sub = this.dom.children(".pjw-class-sub");
      this.weekcal = this.sub.children(".pjw-class-weekcal");
      this.sideinfo = this.sub.children(".pjw-class-sideinfo");
      this.operation = this.dom.children(".pjw-class-operation");
      this.select_button = this.operation.children(".pjw-class-select-button");
      this.comment_button = this.operation.children(".pjw-class-comment-button");

      var data = this.data;

      // Set select button onclick event
      this.select_button.click({
        target: this,
        button_target: this.select_button,
        action: ("action" in data.select_button ? data.select_button.action : () => {})
      }, (e) => {
        e.data.action(e);
      });

      // Initialize DOM trace variables
      this.display = false;
      this.priority = 0;

      // Set expand / collapse event of class container
      this.dom.on("mouseenter", null, {
        target: this
      }, (e) => {
        if (!e.data.target.list.move_to_expand) return;
        var t = jQuery(e.delegateTarget);
        t.removeClass("pjw-class-container--compressed");
      });

      this.dom.on("click", null, {
        target: this
      }, (e) => {
        if ($$(e.target).parent().hasClass("mdc-button")) return;
        if (!e.data.target.list.move_to_expand)
          e.data.target.list.move_to_expand = true;
        else
          e.data.target.list.move_to_expand = false;
        var t = jQuery(e.delegateTarget);
        if (t.hasClass("pjw-class-container--compressed"))
          t.removeClass("pjw-class-container--compressed");
        else
          t.addClass("pjw-class-container--compressed");
      });

      this.dom.on("mouseleave", (e) => {
        var t = jQuery(e.delegateTarget);
        if (t.hasClass("pjw-class-container--compressed")) return;
        var comp_height = t.height();
        t.css("opacity", "0");
        t.addClass("pjw-class-container--compressed");

        window.setTimeout( () => {
          comp_height = (comp_height - t.height()) / 2;
          t.css({ "margin-top": `${comp_height}px`, "margin-bottom": `${comp_height}px` });
          t.animate({ "margin-top": "2px", "margin-bottom": "2px" }, 100, (x) => {
            return 1 - Math.cos(x * Math.PI / 2);
          });
          t.css("opacity", "1");
        }, 5);
      });
    }
  };

  window.PJWClassList = class {
    // Adds class into list
    add(data) {
      if (!this.prepared_to_add) {
        this.intl();
        this.prepared_to_add = true;
      }

      function compareData(data1, data2) {
        if ("title" in data2 && data1.title == data2.title)
          if ("teachers" in data2 && data1.teachers.join() == data2.teachers.join()) {
            if (!("select_button" in data2) || data2.select_button.text == data1.select_button.text)
              return 2;
            return 1;
          }
        return false;
      }

      // Process Title
      if (data.title.trim() == "&nbsp;" || data.title.trim() == "") return;

      data.title = data.title.split("<br>");
      if (data.title.length > 1) {
        if (!("info" in data)) data["info"] = [];
        data["info"].push({
          key: "附加信息",
          val: "".concat(data.title.slice(1)),
          hidden: true
        });
      }
      data.title = data.title[0];

      // Check soft refresh
      var data_compare_res = false;
      if (this.soft_refresh && this.auto_inc < this.class_data.length)
        data_compare_res = compareData(data, this.class_data[this.auto_inc].data);

      if (!("classID" in data)) data.classID = "#" + this.auto_inc;

      if (data_compare_res) {
        // Conduct soft refresh
        this.class_data[this.auto_inc].data = data;
        var target = this.class_data[this.auto_inc].obj;
        target.data = data;
        if (data_compare_res !== false) { 
          target.updateSelectButton(data.select_button);
          if (data_compare_res == 1)
            target.updateNumInfo(data);
        }
      } else {
        // Conduct hard refresh
        this.soft_refresh = false;

        var item = {
          data: data,
          obj: new PJWClass(this.body, data, this),
          id: this.auto_inc
        };
        if (this.auto_inc < this.class_data.length) {
          this.class_data[this.auto_inc].obj.remove();
          this.class_data[this.auto_inc] = item;
        } else {
          this.class_data.push(item);
        }
      }
      this.auto_inc++;
    }

    // Resets classlist
    clear() {
      this.class_data = [];
      this.body.html("");
      this.auto_inc = 0;
      this.max_classes_loaded = this.class_load_size;
    }

    // Checks match of the search string ($pattern) in target string ($str)
    matchDegree(pattern, str) {
      function testString(keyword, str) {
        if (keyword.length != 1 && keyword[0] == "-") {
          if (testString(keyword.slice(1), str) !== 0)
            return false;
          else
            return 0;
        }

        if (keyword == "*") return 1;

        keyword = keyword.toUpperCase();
        str = str.toUpperCase();
        var pos = str.indexOf(keyword);

        // Generate Pinyin initials
        if (pos == -1 && /^[a-zA-Z]+$/.test(keyword)) {
          var initials = "";
          for (var char of str)
            initials += Pinyin.convertToPinyin(char)[0];
          str = initials;
          pos = str.indexOf(keyword);
        }

        if (pos == 0) {
          return 0.5 + (keyword.length / str.length) / 2;
        } else if (pos != -1) {
          return 0.3 + (keyword.length / str.length) / 2;
        } else if (keyword.length == 2) {
          if (str.indexOf(keyword[1]) > str.indexOf(keyword[0]) 
            && str.indexOf(keyword[0]) != -1) {
            if (str.indexOf(keyword[0]) == 0) return 0.5;
            else if (/^[a-zA-Z]+$/.test(keyword)) return 0.1;
            else return 0.3;
          }
        }
        return 0;
      }

      pattern = pattern.trim().split(" ");
      if (pattern[0] == "") return 0;
      var pattern_num = pattern.length;
      var total_matched_num = 0;

      for (var keyword of pattern) {
        var matched_num = 0;
        if (typeof(str) == "string") {
          var t = testString(keyword, str);
          if (t !== false) matched_num += t;
          else return false;
        } else if (typeof(str) == "object") {
          for (var substr of str) {
            var t = testString(keyword, substr);
            if (t !== false) matched_num += t;
            else return false;
          }
          if (str.length) matched_num /= str.length;
        }
        total_matched_num += matched_num;
      }
      return 100.0 * (total_matched_num / pattern_num);
    }

    // Searches search_str in data
    search(data, search_str) {
      if (typeof(search_str) == "undefined" || search_str == "") {
        return 0;
      }
      var priority = 0.0;
      var priority_map = [
        [data.title, 8], 
        [data.teachers, 6], 
        [data.info.map((item) => (item.val)), 3],
        [data.time_detail, 1]
      ];
      for (var item of priority_map) {
        var res = this.matchDegree(search_str, item[0]);
        if (res === false) return false;
        priority += item[1] * res;
      }
      if (priority == 0) {
        return false;
      } else {
        return priority;
      }
    }

    // Returns class priority
    // Returns false when the class do not match the filter
    checkFilter(data, class_obj) {
      var priority = 0.0;

      /* Search module */
      var search_priority = this.search(data, this.search_string);
      if (search_priority === false) {
        data.priority = -1;
        return false;
      }
      priority += search_priority;

      /* Filter modules */
      if (this.filter_enabled == true) {
        for (var name in this.filters) {
          if (typeof(this.filters[name]["check"]) != "function") continue;
          var res = this.filters[name].check(this.filters[name], data, class_obj);
          if (res === false) {
            data.priority = -1;
            return false;
          }
          priority += res;
        }
      }

      data.priority = priority;
      return priority;
    }

    // Initializes class data before adding first class
    intl() {
      this.addFilterHook("handleParseComplete");
      this.class_data.sort(function(a, b) {
        return a.id - b.id;
      });
      this.auto_inc = 0;
      this.soft_refresh = true;
    }

    // Rearranges classes
    // Call this function when class_data is updated
    update() {
      if (this.auto_inc < this.class_data.length) {
        for (var item of this.class_data.slice(this.auto_inc))
          item.obj.remove();
        this.class_data = this.class_data.slice(0, this.auto_inc);
      }

      for (var item of this.class_data)
        if (this.checkFilter(item.data, item.obj) === false)
          item.obj.hide();

      this.class_data.sort(function(a, b) {
        if (parseInt(b.data.priority) == parseInt(a.data.priority))
          return a.id - b.id;
        else if (b.data.priority > a.data.priority)
          return 1;
        else
          return -1;
      });

      for (var i = 0; i < this.class_data.length; i++) {
        if (i < this.max_classes_loaded && this.class_data[i].data.priority >= 0) {
          this.class_data[i].obj.intl();
          this.class_data[i].obj.show();
        }
        this.class_data[i].obj.setPriority(this.class_data.length - i);
      }
      this.prepared_to_add = false;
      window.mdc.autoInit();
    }

    getClassInfoForAlert(data) {
      if (data.teachers.length == 0)
        return `《${data.title}》`;
      return `《${data.title}》（${data.teachers.join("，")}）`;
    }

    parseTeacherNames(text) {
      if (text == "") return [];
      return text.split(/[,，]\s/g);
    }

    parseClassNumber(obj) {
      return obj.children("a").children("u").html();
    }

    // Converts class time string to friendly array
    /* Returns object {
      lesson_time: [{
        weekday: Integer,
        start: Integer,
        end: Integer,
        type: String ("normal", "odd", "even")
      }],
      ans_weeks: [{
        start: Integer,
        end: Integer
      }, ...]
    }*/
    parseClassTime(text) {
      var classes = text.split("<br>");
      const weekday_to_num = {"一": 1, "二": 2, "三": 3, "四": 4, "五": 5, "六": 6, "日": 7};

      var weeks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      var ans = [];

      for (var item of classes) {
        var words = item.split(/\s|\&nbsp;/g);
        var weekday = 0;
        var is_odd = false, is_even = false;
        var has_week_info = false;
        var has_lesson_time_info = false;

        for (var jtem of words) {
          if (jtem[0] == "周") {
            weekday = weekday_to_num[jtem[1]];
          } else if (jtem[jtem.length - 1] == "周") {
            has_week_info = true;
            if (jtem.search("单周") != -1) {
              for (var i = 1; i <= total_weeks; i += 2)
                weeks[i] = 1;
              ans[ans.length - 1].type = "odd";
            } else if (jtem.search("双周") != -1) {
              for (var i = 2; i <= total_weeks; i += 2)
                weeks[i] = 1;
              ans[ans.length - 1].type = "even";
            } else {
              var num_arr = jtem.match(/(\d+)+/g);
              if (num_arr.length == 1)
                weeks[parseInt(num_arr[0])] = 1;
              else if (num_arr.length == 2)
                for (var i = parseInt(num_arr[0]); i <= parseInt(num_arr[1]); i++)
                  weeks[i] = 1;
            }
          } else if (jtem.search(/从第(\d+)周开始/) != -1) {
            has_week_info = true;
            var start_week = parseInt(jtem.match(/(?:从第)(\d+)(?:周开始)/)[1]);
            if (jtem.search("单周") != -1) {
              for (var i = start_week; i <= total_weeks; i += 2)
                weeks[i] = 1;
              ans[ans.length - 1].type = "odd";
            } else if (jtem.search("双周") != -1) {
              for (var i = start_week; i <= total_weeks; i += 2)
                weeks[i] = 1;
              ans[ans.length - 1].type = "even";
            }
          } else if (jtem[jtem.length - 1] == "节") {
            var num_arr = jtem.match(/(\d+)+/g);
            if (num_arr.length == 1)
              num_arr.push(num_arr[0]);
            if (weekday != 0 && num_arr.length) {
              has_lesson_time_info = true;
              ans.push({
                weekday: weekday,
                start: parseInt(num_arr[0]),
                end: parseInt(num_arr[1]),
                type: "normal"
              });
            }
          }
        }

        if (has_week_info == false && has_lesson_time_info == true)
          for (var i = 1; i <= total_weeks; i++)
            weeks[i] = 1;
      }

      var ans_weeks = [];
      for (var i = 1; i <= total_weeks + 1; i++) {
        if (weeks[i] == 1 && weeks[i-1] == 0) {
          ans_weeks.push({
            start: i,
            end: i
          });
        } else if (weeks[i] == 0 && weeks[i-1] == 1) {
          ans_weeks[ans_weeks.length - 1].end = i-1;
        }
      }
      return {lesson_time: ans, class_weeknum: ans_weeks};
    }

    checkScroll() {
      if ("scroll_lock" in this && this.scroll_lock == true) return;
      this.scroll_lock = true;
      if (this.class_data.length > this.max_classes_loaded && $$(window).scrollTop() + $$(window).height() + 1600 >= $$(document).height()) {
        for (var i = this.max_classes_loaded; i < this.max_classes_loaded + this.class_load_size && i < this.class_data.length && this.class_data[i].data.priority >= 0; i++)
          this.class_data[i].obj.show();
        this.max_classes_loaded += this.class_load_size;
        window.mdc.autoInit();
        setTimeout((t) => {t.scroll_lock = false;}, 100, this);
      } else {
        this.scroll_lock = false;
      }
    }

    refresh(hard_load = false, disable_log = false) {
      if (hard_load) {
        this.clear();
        this.body.css("transition", "");
        this.body.css("opacity", "0");
      }
      return this.load().then(() => {
        this.addFilterHook("handleRefreshComplete");

        if (disable_log) return;
        if (this.class_data.length == 0)
          this.console.info("没有找到课程 : (");
        else
          this.console.debug(`已加载${this.class_data.length}门课程`);
        this.body.css("transition", "opacity .7s cubic-bezier(0.5, 0.5, 0, 1)");
        this.body.css("opacity", "1");
      }).catch((e) => {
        this.console.error("无法加载课程列表：" + e);
      });
    }

    addFilterHook(name) {
      for (var filter in this.filters)
        if (typeof(this.filters[filter][name]) == "function")
          this.filters[filter][name](this.filters[filter], this);
    }

    // Loads a filter module by name
    loadModule(name) {
      if (this.filter_modules.include(name)) return false;
      this.filter_modules.push(name);
      this.filter_panel.find(".pjw-classlist-bottom").before(pjw_filter[name].html);
      this.filters[name] = pjw_filter[name];
      this.filters[name].intl(this.filters[name], this);
      return this.filters[name];
    }

    // Increases refresh speed when pressing speed adjustment button
    speedUp() {
      if (!this.max_frequency)
        this.max_frequency = 8.0;
      if (this.auto_refresh_frequency <= 3.0)
        this.auto_refresh_frequency *= 1.06;
      else if (this.auto_refresh_frequency <= 6.0)
        this.auto_refresh_frequency += 0.2;
      else if (this.auto_refresh_frequency < this.max_frequency)
        this.auto_refresh_frequency += 0.1;
      else
        this.auto_refresh_frequency = this.max_frequency;

      // Updates button label to current speed
      $$("#autorefresh-label").html(this.auto_refresh_frequency.toFixed(1) + "x");
    }

    // Triggered by speed adjustment button
    autoRefreshButtonEvent(status) {
      if ($$("#autorefresh-switch").hasClass("off")) return;
      if (status) {
        if (typeof(this.show_refresh_level_timeout_id) != "undefined")
          clearInterval(this.show_refresh_level_timeout_id);
        this.toggleAutoRefresh(false);
        this.auto_refresh_frequency = 1.0;
        $$("#autorefresh-label").html("1.0x");
        this.refresh_button_interval_id = window.setInterval((target) => {
          target.speedUp();
        }, 50, this);
      } else {
        // Shows speed in natural language after releasing speed adjustment button
        var text = "";
        if (this.auto_refresh_frequency <= 3.0)
          text = "标准";
        else if (this.auto_refresh_frequency <= 6.0)
          text = "快";
        else if (this.auto_refresh_frequency < 8.0)
          text = "极速";
        else
          text = "封号退学";
        this.show_refresh_level_timeout_id = setTimeout( (text) => {
          $$("#autorefresh-label").html(text);
        }, 1000, text);
        this.toggleAutoRefresh(true);
        clearInterval(this.refresh_button_interval_id);
      }
    }

    // Toggle auto refresh
    toggleAutoRefresh(status) {
      if (status) {
        // Start Autorefresh
        this.console.debug("自动刷新已打开。")

        function randomNormalDistribution() {
          var u=0.0, v=0.0, w=0.0, c=0.0;
          do {
            u = Math.random()*2 - 1.0;
            v = Math.random()*2 - 1.0;
            w = u*u + v*v;
          } while (w == 0.0 || w >= 1.0)
          c = Math.sqrt((-2 * Math.log(w)) / w);
          return u * c;
        }

        function getNumberInNormalDistribution(mean, std_dev, lower_limit, upper_limit) {
          var res = Math.floor(mean + randomNormalDistribution() * std_dev);
          if (res >= upper_limit) return upper_limit;
          if (res >= mean) return res;
          res = mean - (mean-res) * 0.8;
          if (res < lower_limit) return lower_limit;
          return res;
        }

        $$("#autoreload-control-section").css("filter", "drop-shadow(2px 4px 6px rgb(16, 141, 255))");

        var auto_refresh_loss_rate = 0.2;

        auto_refresh_loss_rate = 0.1 + getNumberInNormalDistribution(10, 10, 0, 20) / 100;
        var auto_refresh_count = 1;
        var random_interval = (1.0 / this.auto_refresh_frequency) * getNumberInNormalDistribution(Math.floor(Math.random() * 300) + 1500, 600, 1000, 2500);

        this.auto_refresh_interval_id = window.setInterval(function(target) {
          // Random skip
          if (Math.random() < window.auto_refresh_loss_rate) return;

          window.setTimeout(function(target) {
            if ($$("#autorefresh-switch").hasClass("off")) return;

            $$("#autoreload-control-section").css("filter", "drop-shadow(2px 4px 6px rgb(255, 109, 75))");
            target.refresh(false, true).then(() => {
              if ($$("#autorefresh-switch").hasClass("on"))
                $$("#autoreload-control-section").css("filter", "drop-shadow(2px 4px 6px rgb(16, 141, 255))");
              target.console.debug("自动刷新计数：" + auto_refresh_count++, "auto-refresh-count");
            }).catch((e) => {
              target.console.error(e);
            });
          }, getNumberInNormalDistribution(random_interval * 0.3, random_interval * 0.3, 30, random_interval * 0.8), target);
        }, random_interval, this);
      } else {
        this.console.debug("自动刷新已关闭。")
        $$("#autoreload-control-section").css("filter", "");
        window.clearInterval(this.auto_refresh_interval_id);
      }
    }

    // Triggered by auto-refreshment and filter switch
    triggerSwitch(id) {
      var status = $$("#"+id).hasClass("on");
      if (id == "autorefresh-switch") {
        if (!status) {
          $$("#autorefresh-icon").html("autorenew");
          $$("#autorefresh-label").html("刷新");
          if (typeof(this.refresh_button_interval_id) != "undefined")
            window.clearInterval(this.refresh_button_interval_id);
          if (typeof(this.show_refresh_level_timeout_id) != "undefined")
            clearInterval(this.show_refresh_level_timeout_id);
        } else {
          $$("#autorefresh-icon").html("speed");
          $$("#autorefresh-label").html("标准");
        }
        this.auto_refresh_frequency = 1.0;
        this.toggleAutoRefresh(status);
      } else if (id == "filter-switch") {
        if (!this.filter_enabled)
          this.filter_enabled = true;
        else
          this.filter_enabled = false;
        this.update();
      }
    }

    // Triggered by filter button
    showFilter() {
      if (this.filter_panel.css("pointer-events") == "none") {
        this.addFilterHook("handleShow");
        this.filter_panel.addClass("shown");
      } else {
        this.filter_panel.removeClass("shown");
      }
    }

    handleResize() {
      var width = this.dom.width();
      if (width < 1050) this.dom.addClass("narrow-desktop");
      else this.dom.removeClass("narrow-desktop");
    }

    getClassID(obj) {
      if (obj.children("a").length == 0) return false;
      var str = obj.children("a").attr("href");
      if (str == "" || !str) return false;
      var res = str.match(/[0-9]+/);
      if (res.length >= 1)
        return res[0];
      return false;
    }

    getClassNameFromFuncStr(obj) {
      if (typeof(obj) == "string") {
        var str = obj;
      } else {
        if (obj.children("a").length == 0) return false;
        var str = obj.children("a").attr("href");
        if (str == "" || !str) return false;
      }

      var res = str.match(/(?:')(.*?)(?:')/);
      if (res.length >= 2)
        return res[1];
      return false;
    }

    constructor(parent, modules = ["avail", "hours", "frozen"]) {
      this.filter_modules = modules;

      // Deploy filter DOM
      var filter_modules = "";
      for (var item of this.filter_modules)
        filter_modules += pjw_filter[item].html;

      var list_html = `
      <div class="pjw-classlist">
        <div class="pjw-classlist-heading">
          <div class="pjw-classlist-selectors">
          </div>
          <div class="pjw-classlist-controls">
            <section id="autoreload-control-section">
              <button data-mdc-auto-init="MDCRipple" class="mdc-button mdc-button--raised pjw-classlist-heading-button">
                <div class="mdc-button__ripple"></div>
                <div class="material-icons-round" id="autorefresh-icon">autorenew</div>
                <div class="mdc-button__label pjw-classlist-heading-button__label" style="letter-spacing: 2px" id="autorefresh-label">刷新</div>
              </button>

              <button class="mdc-button mdc-button--raised pjw-classlist-heading-switch-button off" id="autorefresh-switch">
                <div class="material-icons-round">toggle_off</div>
                <div class="mdc-button__label pjw-classlist-heading-button__label" style="letter-spacing: 2px" data-off="手动" data-on="自动">手动</div>
              </button>
            </section>

            <section id="filter-control-section">
              <button data-mdc-auto-init="MDCRipple" class="mdc-button mdc-button--raised pjw-classlist-heading-button">
                <div class="mdc-button__ripple"></div>
                <div class="material-icons-round">filter_alt</div>
                <div class="mdc-button__label pjw-classlist-heading-button__label" style="letter-spacing: 2px">课程筛选</div>
              </button>

              <button class="mdc-button mdc-button--raised pjw-classlist-heading-switch-button off" id="filter-switch">
                <div class="material-icons-round">toggle_off</div>
                <div class="mdc-button__label pjw-classlist-heading-button__label" style="letter-spacing: 2px" data-off="关闭" data-on="开启">关闭</div>
              </button>
            </section>

            <section id="search-section">
              <label class="mdc-text-field mdc-text-field--outlined" id="pjw-classlist-search-field" data-mdc-auto-init="MDCTextField">
                <input type="text" class="mdc-text-field__input" aria-labelledby="pjw-class-search-input__label" id="pjw-class-search-input">
                <span class="mdc-notched-outline">
                  <span class="mdc-notched-outline__leading"></span>
                  <span class="mdc-notched-outline__notch">
                    <span class="mdc-floating-label" id="pjw-class-search-input__label"><span style="font-family:Material Icons Round;">search</span>搜索</span>
                  </span>
                  <span class="mdc-notched-outline__trailing"></span>
                </span>
              </label>
            </section>
          </div>
        </div>
        <div class="pjw-filter-panel">
          <div class="pjw-filter-panel__content">
            ${filter_modules}
            <div class="pjw-classlist-bottom" style="order: 10;">
              <span class="material-icons-round" style="font-size: 18px; color: rgba(0, 0, 0, .7);">hourglass_top</span><p>More filters coming soon...</p>
            </div>
          </div>
        </div>
        <div class="pjw-classlist-body"></div>
        <div class="pjw-classlist-bottom">
          <span class="material-icons-round" style="font-size: 18px; color: rgba(0, 0, 0, .7);">insights</span><p>PotatoPlus Class List</p>
        </div>
      </div>`;

      this.dom = $$(list_html).appendTo(parent);
      this.heading = this.dom.children(".pjw-classlist-heading");
      this.selectors = this.heading.children(".pjw-classlist-selectors");
      this.controls = this.heading.children(".pjw-classlist-controls");
      this.body = this.dom.children(".pjw-classlist-body");
      this.refresh_button = this.controls.children("#autoreload-control-section").children(".pjw-classlist-heading-button");
      this.filter_button = this.controls.children("#filter-control-section").children(".pjw-classlist-heading-button");
      this.heading_switch_button = this.controls.children("section").children(".pjw-classlist-heading-switch-button");
      this.search_input = this.controls.find("#pjw-class-search-input");
      this.filter_panel = this.dom.children(".pjw-filter-panel");
      this.filters = {};
      for (var name of this.filter_modules) {
        this.filters[name] = pjw_filter[name];
        if (typeof(this.filters[name]["intl"]) == "function")
          this.filters[name].intl(this.filters[name], this);
      }

      this.class_load_size = 30;

      this.search_input.on("input", null, {
        target: this
      }, (e) => {
        if (typeof(e.data.target.input_timeout_id) != "undefined")
          clearTimeout(e.data.target.input_timeout_id);
        if (e.data.target.class_data.length <= 200) {
          e.data.target.search_string = this.search_input.val();
          e.data.target.max_classes_loaded = this.class_load_size;
          e.data.target.update();
        } else {
          e.data.target.input_timeout_id = setTimeout( (e) => {
            e.data.target.search_string = this.search_input.val();
            e.data.target.max_classes_loaded = this.class_load_size;
            e.data.target.update();
          }, 150, e);
        }
      });
      if (modules != [] && store.has("privilege") && store.get("privilege") == "root") {this.loadModule("potatoes"); this.max_frequency = 15.0;}

      this.refresh_button.on("click", null, {
        target: this
      }, (e) => {
        if ($$("#autorefresh-switch").hasClass("off"))
          e.data.target.refresh(true);
      });

      this.filter_button.on("click", null, {
        target: this
      }, (e) => {
        e.data.target.showFilter();
      });

      this.refresh_button.on("mousedown", null, {
        target: this
      }, (e) => {
        e.data.target.autoRefreshButtonEvent(true);
      });

      this.refresh_button.on("mouseup", null, {
        target: this
      }, (e) => {
        e.data.target.autoRefreshButtonEvent(false);
      });

      this.heading_switch_button.on("click", null, {
        target: this
      }, (e) => {
        var t = $$(e.delegateTarget);
        if (t.hasClass("on")) {
          t.removeClass("on");
          t.addClass("off");
          t.children(":eq(0)").html("toggle_off");
          t.children(":eq(1)").html(t.children(":eq(1)").attr("data-off"));
        } else {
          t.removeClass("off");
          t.addClass("on");
          t.children(":eq(0)").html("toggle_on");
          t.children(":eq(1)").html(t.children(":eq(1)").attr("data-on"));
        }
        e.data.target.triggerSwitch(t.attr("id"));
      });

      $$(window).on("scroll", null, {
        target: this
      }, (e) => {
        e.data.target.checkScroll();
      });

      $$(window).on("resize", null, {
        target: this
      }, (e) => {
        e.data.target.handleResize();
      });

      this.clear();
      this.handleResize();
      window.mdc.autoInit();

      this.console = new PJWConsole();
    }
  };

  window.PJWSelect = class {
    val() {
      return this.obj.value;
    }

    text() {
      return this.obj.selectedText.innerHTML;
    }

    setByText(text) {
      var find_res = this.list.find(`[data-text=${text}]`);
      if (find_res.length)
        this.obj.selectedIndex = parseInt(find_res.attr("data-index"));
      else
        this.obj.selectedIndex = 0;
    }

    setByValue(val) {
      var find_res = this.list.find(`[data-value=${val}]`);
      if (find_res.length)
        this.obj.selectedIndex = parseInt(find_res.attr("data-index"));
      else
        this.obj.selectedIndex = 0;
    }

    onchange(func) {
      this.obj.listen('MDCSelect:change', func);
    }

    convert(item) {
      return `<li data-value="${item.value}" data-text="${item.innerHTML}" data-index="${this.count++}" class="mdc-list-item"><span class="mdc-list-item__ripple"></span><span class="mdc-list-item__text">${item.innerHTML}</span></li>`;
    }

    addItem(item) {
      this.list.append(this.convert(item));
    }

    clear() {
      this.obj.selectedIndex = -1;
      this.list.html("");
      this.count = 0;
    }

    constructor(id, name, target, start = 1, select_index = 0) {
      var list;
      if (typeof(id) == "string") {
        list = $$(`#${id}`)[0].options;
        $$(`#${id}`).hide();
      } else {
        id.hide();
        list = id[0].options;
        id = id.attr("id");
      }
      var list_html = "";
      this.count = 0;
      for (var item of list) {
        if (start-- > 0) continue;
        list_html += this.convert(item);
      }

      var html = `<div class="mdc-select mdc-select--outlined" id="pjw-select-${id}">
        <div class="mdc-select__anchor" aria-labelledby="pjw-select-${id}-outlined-label">
          <span id="pjw-select-${id}-selected-text" class="mdc-select__selected-text"></span>
          <span class="mdc-select__dropdown-icon">
            <svg
                class="mdc-select__dropdown-icon-graphic"
                viewBox="7 10 10 5" focusable="false">
              <polygon
                  class="mdc-select__dropdown-icon-inactive"
                  stroke="none"
                  fill-rule="evenodd"
                  points="7 10 12 15 17 10">
              </polygon>
              <polygon
                  class="mdc-select__dropdown-icon-active"
                  stroke="none"
                  fill-rule="evenodd"
                  points="7 15 12 10 17 15">
              </polygon>
            </svg>
          </span>   
          <div class="mdc-notched-outline mdc-notched-outline--upgraded">
            <div class="mdc-notched-outline__leading"></div>
            <div class="mdc-notched-outline__notch" style="">
              <label id="pjw-select-${id}-outlined-label" class="mdc-floating-label" style="">${name}</label>
            </div>
            <div class="mdc-notched-outline__trailing"></div>
          </div>
        </div>
        <div class="mdc-select__menu mdc-menu mdc-menu-surface mdc-menu-surface--fullwidth" role="listbox">
          <ul class="mdc-list pjw-select-list" role="option">${list_html}</ul>
        </div>
      </div>`;

      this.id = id;
      this.dom = $$(html).appendTo(target);
      this.obj = new mdc.select.MDCSelect(this.dom[0]);
      this.list = this.dom.children(".mdc-menu-surface").children(".pjw-select-list");
      this.obj.selectedIndex = select_index;
    }
  }
}
  }
  if (pjw_mode == "login_page") {

/* js/pjw-captcha.js */
/*
  CAPTCHA Identification
  Reference: https://github.com/leonof/imgRecJs
*/

// import { lib, numkeys } from './lib.js';

function CAPTCHAPlugin() {
  var source_img;
  var img_width;
  var img_height;
  window.learned_data = new Array();

  var logArea = document.getElementById("logArea");

  var lastWidth = 18;
  var lastHeight = 18;
  var parts_array;
  var ctx_original, ctx_binary, ctx_color;

  var reasonable_part_count;

  // Image binaryzation
  function imageBinaryzation(img) {
    var fromPixelData = img.data;
    var greyAve = 0;
    for (var j = 0; j < img_width * img_height; j++){
      var r = fromPixelData[4*j];
      var g = fromPixelData[4*j+1];
      var b = fromPixelData[4*j+2];
      greyAve += r*0.3 + g*0.59 + b*0.11;
    }
    // Calculate average grayscale
    greyAve /= img_width * img_height;
    greyAve *= 0.65;
    for (var j = 0; j < img_width * img_height; j++){
      r = fromPixelData[4*j];
      g = fromPixelData[4*j+1];
      b = fromPixelData[4*j+2];
      var grey = r*0.333 + g*0.333 + b*0.333;
      if(grey > greyAve)
        grey = 255;
      else
        grey = 0;
      fromPixelData[4*j] = grey;
      fromPixelData[4*j+1] = grey;
      fromPixelData[4*j+2] = grey;
    }
    return img;
  }

  // Image binaryzation with color data preserved
  function imageBinaryzationWithColor(img){
    var fromPixelData = img.data;
    var greyAve = 0;
    for (var j = 0; j < img_width * img_height; j++){
      var r = fromPixelData[4*j];
      var g = fromPixelData[4*j+1];
      var b = fromPixelData[4*j+2];
      greyAve += r*0.3 + g*0.59 + b*0.11;
    }
    greyAve /= img_width * img_height;
    greyAve *= 0.65;
    for (var j = 0; j < img_width * img_height; j++){
      r = fromPixelData[4*j];
      g = fromPixelData[4*j+1];
      b = fromPixelData[4*j+2];
      var grey = (r + g + b) / 3;
      if (grey > greyAve) {
        fromPixelData[4*j] = 255;
        fromPixelData[4*j+1] = 255;
        fromPixelData[4*j+2] = 255;
      }
    }
    return img;
  }

  // Simple corrosion
  function corrode(img) {
    for (var j = 1; j < img.length - 1; j++)
      for (var k = 1; k < img[j].length - 1; k++)
        if (img[j][k] == 1 &&
            img[j-1][k]+img[j+1][k]+img[j][k-1]+img[j][k+1]+
            img[j-1][k-1]+img[j-1][k+1]+img[j+1][k-1]+img[j+1][k+1] == 0)
          img[j][k] = 0;
    return img;
  }

  // Simple expansion
  function expand(img) {
    for (var j = 1; j < img.length - 1; j++)
      for (var k = 1; k < img[j].length - 1; k++)
        if (img[j][k] == 0 && img[j-1][k]+img[j+1][k]+img[j][k-1]+img[j][k+1] == 4)
          img[j][k] = 1;
    return img;
  }

  // Get a column from 2D array
  function sliceColumn(arr, start, end) {
    var ans = new Array();
    for (var row in arr) {
      ans.push(arr[row].slice(start, end));
    }
    return ans;
  }

  const min_partial_weight = 10;
  const split_count = 4;
  const part_adj_max_mul = 1.8;
  var resonable_part_count = 0;

  // Split image to parts
  function split(img, color_avg) {
    var split_array = new Array();
    var part_info = new Array();
    var status = false, split_index = 0, partial_weight = 0;
    // Traverse image by pixel
    for (var k = 0; k < img[0].length && split_index < split_count; k++) {
      var column_sum = 0;
      for (var j = 0; j < img.length; j++)
        column_sum += img[j][k]; // Add up column weight
      if (column_sum == 0 && status !== false) { // Part ends
        if (partial_weight >= min_partial_weight) {
          split_array.push(sliceColumn(img, status, k));
          part_info.push(new Array(k - status, split_index, status, k));
          split_index++;
        }
        status = false;
        partial_weight = 0;
      } else if (status !== false) { // Part continues
        for (var j = 0; j < img.length; j++)
          partial_weight += img[j][k];
      } else if (column_sum != 0) { // Part begins
        status = k;
      }
    }
    reasonable_part_count = split_index;
    if (split_index == split_count) {
      return split_array;
    } else if (split_index == split_count - 1) {
      part_info.sort(function (a, b) { return b[0] - a[0]; });
      var split_list = splitPartsBasedOnColor(part_info[0][2],
          color_avg.slice(part_info[0][2], part_info[0][3]), 2);
    } else if (split_index == split_count - 2) {
      part_info.sort(function (a, b) { return b[0] - a[0]; });
      if (part_info[0][0] / part_info[1][0] <= part_adj_max_mul) {
        var split_list = splitPartsBasedOnColor(part_info[0][2],
            color_avg.slice(part_info[0][2], part_info[0][3]), 2);
        split_list = split_list.concat(splitPartsBasedOnColor(part_info[1][2],
            color_avg.slice(part_info[1][2], part_info[1][3]), 2));
      } else {
        var split_list = splitPartsBasedOnColor(part_info[0][2],
            color_avg.slice(part_info[0][2], part_info[0][3]), 3);
      }
    } else {
      var split_list = splitPartsBasedOnColor(part_info[0][2],
            color_avg.slice(part_info[0][2], part_info[0][3]), 4);
    }
    part_info.sort(function (a, b) { return a[2] - b[2]; });
    var splitted_parts = 0;
    for (var i = 0; i < split_index && split_list.length > 0; i++) {
      for (var j = 0; split_list.length > 0 && j < split_list.length; j++)
        if (part_info[i][3] >= split_list[j] && part_info[i][2] < split_list[j]) {
          var current_id = part_info[i][1] + (splitted_parts++);
          var orig = split_array[current_id];
          split_array = split_array.slice(0, current_id)
              .concat([sliceColumn(orig, 0, split_list[j] - part_info[i][2]), sliceColumn(orig, split_list[j] - part_info[i][2], orig[0].length)])
              .concat(split_array.slice(current_id + 1, split_array.length));
          part_info[i][2] = split_list[j];
          split_list.splice(j, 1);
          j--;
        }
    }
    return split_array;
  }

  function cubicDistribution(x, peak) {
    if (peak == 2) return 1.0 - 8 * Math.pow(Math.abs(x - 0.5), 3);
    else if (peak == 3) return 1.0 - 27 * Math.pow(Math.min(Math.abs(x - 2/3), Math.abs(x - 1/3)), 3);
    else if (peak == 4) return 1.0 - 64 * Math.pow(Math.min(Math.abs(x - 0.5), Math.abs(x - 0.25), Math.abs(x - 0.75)), 3);
  }

  function squareDistribution(x, peak) {
    if (peak == 2) return 1.0 - 4 * Math.pow(Math.abs(x - 0.5), 2);
    else if (peak == 3) return 1.0 - 9 * Math.pow(Math.min(Math.abs(x - 2/3), Math.abs(x - 1/3)), 2);
    else if (peak == 4) return 1.0 - 16 * Math.pow(Math.min(Math.abs(x - 0.5), Math.abs(x - 0.25), Math.abs(x - 0.75)), 2);
  }

  function easeDistribution(x, peak) {
    if (peak == 2) return Math.sin(2 * Math.PI * (x - 0.25)) + 1;
    else if (peak == 3) return Math.sin(2 * Math.PI * Math.min((x - 1/3), (x - 1/6))) + 1;
    else if (peak == 4) return Math.sin(2 * Math.PI * Math.min((x - 1/8), (x - 1/4), (x - 3/8)));
  }

  function splitPartsBasedOnColor(start_pos, color_avg, split_part_count) {
    var part_split_array = new Array();
    var sorted_color_avg = new Array();
    var part_width = color_avg.length;
    for (var i = 0; i < part_width; i++) {
      if (color_avg[i] > 0)
        color_avg[i] *= squareDistribution(i / part_width, split_part_count);
      sorted_color_avg.push(new Array(color_avg[i], i));
    }
    for (var i = 0; i < split_part_count - 1; i++) {
      sorted_color_avg.sort(function (a, b) { return b[0] - a[0]; });
      part_split_array.push(start_pos + sorted_color_avg[0][1]);
      for (var j = 1; j < sorted_color_avg.length; j++) { // Reevaluate Weight
        var distance = Math.abs(sorted_color_avg[j][1] - sorted_color_avg[0][1]);
        if (distance <= 10)
          sorted_color_avg[j][0] *= Math.pow(distance, 2) / 100;
      }
      sorted_color_avg.splice(0, 1);
    }
    part_split_array.sort(function (a, b) { return a - b; });
    return part_split_array;
  }


  function trimUpDown(img) {
    var h = img.length;
    for (var j = 0; j < h; j++) {
      var sumUp = 0;
      for (var k = 0; k < img[j].length-1; k++) {
        sumUp += img[j][k];
      }
      if (sumUp === 0) { // Clear
        img = removeFromArray(img,j);
        h--;
        break;
      }
    }
    for (var j = h - 1; j >= 0; j--) {
      var sumUp = 0;
      for (var k = 0; k < img[j].length-1; k++) {
        sumUp += img[j][k];
      }
      if (sumUp === 0) { // Clear
        img = removeFromArray(img,j);
        h--;
        break;
      }
    }
    return img;
  } // Remove top & bottom margin

  function zoomToFit(img){
    var imgD = fromXY(img);
    var w = lastWidth;
    var h = lastHeight;
    var tempc1 = document.createElement("canvas");
    var tempc2 = document.createElement("canvas");
    if(!img[0]){
      return false;
    }
    tempc1.width = img[0].length;
    tempc1.height = img.length;
    tempc2.width = w;
    tempc2.height = h;
    var tempt1 = tempc1.getContext("2d");
    var tempt2 = tempc2.getContext("2d");
    tempt1.putImageData(imgD,0,0,0,0,tempc1.width,tempc1.height);
    tempt2.drawImage(tempc1,0,0,w,h);
    var returnImageD = tempt2.getImageData(0,0,img_width,img_height);
    img = toXY(returnImageD);
    img.length = h;
    for(var i=0;i<h;i++){
      img[i].length = w;
    }
    return img;
  } // 尺寸归一化

  function getCode(img) {
    var result = '';
    for (var j = 0; j < img.length; j++) {
      for (var k = 0; k < img[j].length; k++)
        result += String(img[j][k]);
      result += ';';
    }
    return result;
  } // 生成特征码

  function drawThis(toCtx,img) {
    toCtx.drawImage(img, 1, 1, img.width-2, img.height-2,
        0, 0, img.width-2, img.height-2);
  }

  function drawArray(toCtx,img) {
    var fromImageData = fromXY(img);
    toCtx.putImageData(fromImageData,0,0,0,0,img_width,img_height);
  }

  function drawColorArray(toCtx,img) {
    var fromImageData = fromColorXY(img);
    toCtx.putImageData(fromImageData,0,0,0,0,img_width,img_height);
  }

  function logXY(img) {
    logArea.innerHTML = '';
    for (var k = 0; k < img.length; k++) {
      for (var j = 0; j < img[k].length; j++) {
        var str = '';
        if (img[k][j] === 0) {
          str = '&nbsp;'
        } else if (img[k][j] === 1) {
          str = '.'
        } else if (img[k][j] === -1) {
          str = ','
        }
        logArea.innerHTML += str;
      }
      logArea.innerHTML += '<br>';
    }
  }

  function getData() {
    var code = '';
    var diff = 0, min_diff = Infinity;
    for (var i = 0; i < 4; i++) {
      var res = readNum(parts_array[i]);
      code += res[0];
      diff += Math.log(res[1]);
      min_diff = Math.min(min_diff, Math.log(res[1]));
    }
    if (code.length != split_count)
      throw "ERROR: " + code.length + " character(s) solved, while " + split_count + " character(s) required";
    return {
      code: code,
      min_diff: min_diff,
      diff: diff
    };
  } // 根据特征码识别

  function removeFromArray(img, obj) {
    for(var i = 0; i < img.length; i++) {
      var temp = img[i];
      if (!isNaN(obj))
        temp = i;
      if (temp == obj) {
        for (var j = i; j < img.length; j++)
          img[j] = img[j+1];
        img.length--;
      }
    }
    return img;
  } // 移除数组中元素

  function toXY(img) {
    var result = new Array(img_height);
    var source_pixel = img.data;
    for(var j=0;j<img_height;j++) {
      result[j] = new Array(img_width);
      for(var k=0;k<img_width;k++) {
        var r = source_pixel[4 * (j*img_width+k)];
        var g = source_pixel[4 * (j*img_width+k) + 1];
        var b = source_pixel[4 * (j*img_width+k) + 2];
        result[j][k] = (r+g+b) > 500 ? 0 : 1; // 赋值0、1给内部数组
      }
    }
    return result;
  } // 图像转数组

  function toColorXY(img) {
    var result = new Array(img_height);
    var source_pixel = img.data;
    for (var j = 0; j < img_height; j++) {
      result[j] = new Array(img_width);
      for (var k = 0; k < img_width; k++) {
        var r = source_pixel[4 * (j*img_width+k)];
        var g = source_pixel[4 * (j*img_width+k) + 1];
        var b = source_pixel[4 * (j*img_width+k) + 2];

        result[j][k] = new Array(r, g, b);
      }
    }
    return result;
  } // 图像转数组

  function fromXY(source_array) {
    var img = ctx_original.createImageData(img_width,img_height);
    var source_pixel = img.data;
    for (var j = 0; j < source_array.length; j++) {
      for (var k = 0; k < source_array[j].length; k++) {
        var innergrey = (source_array[j][k]==1?0:255);
        source_pixel[4 * (j*img_width+k)] = innergrey;
        source_pixel[4 * (j*img_width+k) + 1] = innergrey;
        source_pixel[4 * (j*img_width+k) + 2] = innergrey;
        source_pixel[4 * (j*img_width+k) + 3] = 255;
      }
    }
    return img;
  } // 数组转图像

  function fromColorXY(source_array) {
    var img = ctx_original.createImageData(img_width,img_height);
    var source_pixel = img.data;
    for (var j=0;j<source_array.length;j++) {
      for (var k=0;k<source_array[j].length;k++) {
        source_pixel[4 * (j*img_width+k)] = source_array[j][k][0];
        source_pixel[4 * (j*img_width+k) + 1] = source_array[j][k][1];
        source_pixel[4 * (j*img_width+k) + 2] = source_array[j][k][2];
        source_pixel[4 * (j*img_width+k) + 3] = 255;
      }
    }
    return img;
  } // 数组转图像（带颜色）

  function transformSingleChar(img) {
    var ctx3 = newCanvas(img[0].length, img.length);
    var ctx4 = newCanvas(lastWidth, lastHeight);

    img = trimUpDown(img); // 去上下空白
    drawArray(ctx3, img); // 画出单一图像

    img = zoomToFit(img);
    if (img === false) return false;
    img = corrode(img); // 腐蚀
    img = expand(img); // 膨胀
    img = trimUpDown(img); // 去上下空白
    drawArray(ctx4, img); // 画出缩放图像
    return getCode(img); // 生成特征码
  }

  const min_similarity_required = 50;
  const dominance_check_interval = 200;
  const max_dom_list_hold = 50;
  const min_check_index = 2300;
  const start_diff_required = 20;
  var trainlib_char_sum = {};

  function getRevLogDistribution(i, l) {
    return 1 - Math.log(i) / Math.log(l);
  }

  function getDominanceRankWeight(rank) {
    return getRevLogDistribution(rank + 1, max_dom_list_hold);
  }

  function checkDominance(list) {
    if (list.length == 0) return {dom: '', diff: 0};
    if (list.length == 1) return {dom: list[0], diff: 1};
    list.sort((a, b) => b[0] - a[0]);
    list = list.slice(0, max_dom_list_hold);
    var res = {};
    list.forEach(function (x, i) {
      if (x[1] in res) {
        res[x[1]] += getDominanceRankWeight(i) * x[0] / trainlib_char_sum[x[1]];
      } else {
        res[x[1]] = getDominanceRankWeight(i) * x[0] / trainlib_char_sum[x[1]];
      }
    });
    var sortable = [];
    for (var dominance in res)
      sortable.push([dominance, res[dominance]]);
    sortable.sort((a, b) => b[1] - a[1]);
    return {
      dom: sortable[0][0],
      diff: (sortable.length > 1 ? sortable[0][1] / sortable[1][1] : 1),
      sorted_list: sortable
    };
  }

  function readNum(code) {
    var total_trainlib_length = numkeys.length;
    var check_cnt = 0;
    var similarity_list = [];
    for (var i = 0; i < numkeys.length; i++) {
      var current_code = numkeys[i][1];
      var current_char = numkeys[i][0];
      var current_similarity = 0;
      for (var j = 0; j < current_code.length; j++)
        if (current_code[j] == code[j])
          current_similarity++;

      if (current_similarity >= min_similarity_required)
        similarity_list.push(new Array(current_similarity, current_char));
      if (++check_cnt % dominance_check_interval == 0 && check_cnt >= min_check_index) {
        var ans = checkDominance(similarity_list);
        if (ans.diff >= start_diff_required * getRevLogDistribution(check_cnt, total_trainlib_length) + 1) {
          // console.log(ans.sorted_list);
          return [ans.dom, ans.diff];
        }
      }
    }
    checkDominance(similarity_list);
    // console.log(ans.sorted_list);
    return [ans.dom, ans.diff];
  }

  function getDiff(a, b) {
    var ans = 0;
    for (var i = 0; i < 3; i++)
      ans += (b[i] - a[i]) * (b[i] - a[i]);
    return ans;
  }

  function calcAvgColor(pixel) {
    var avg = new Array();
    avg.push(0);
    for (var i = 0; i < pixel[0].length; i++) {
      var avg_r, avg_g, avg_b, cnt = 0;
      for (var j = 0; j < pixel.length; j++) {
        if (pixel[j][i][0] + pixel[j][i][1] + pixel[j][i][2] >= 760) continue;
        cnt++;
        avg_r += pixel[j][i][0];
        avg_g += pixel[j][i][1];
        avg_b += pixel[j][i][2];
      }
      if (cnt) {
        avg_r /= cnt, avg_g /= cnt, avg_b /= cnt;
        var ratio = 170.0 / Math.max(avg_r, avg_g, avg_b);
        avg_r *= ratio, avg_g *= ratio, avg_b *= ratio;
      } else {
        avg_r = avg_g = avg_b = 255;
      }
      pixel[0][i] = new Array(avg_r, avg_g, avg_b);
      // for (var j = 0; j < pixel.length; j++)
      //   pixel[j][i] = new Array(avg_r, avg_g, avg_b);
      if (i == 0) continue;
      var grey = getDiff(pixel[0][i-1], pixel[0][i]);
      avg.push(grey);
    }
    var max_grey = Math.max.apply(null, avg);
    for (var i = 0; i < avg.length; i++)
      avg[i] = (Math.log(1.0 / max_grey * avg[i]) + 10) / 10;
    for (var i = 0; i < pixel[0].length; i++)
      for (var j = 0; j < pixel.length * avg[i] ; j++)
        pixel[j][i] = new Array(0, 0, 0);
    return new Array(pixel, avg);
  }

  function newCanvas(w = img_width, h = img_height) {
    var canvas6 = document.createElement("canvas");
    canvas6.style.backgroundColor = "cornsilk";
    // document.getElementsByTagName("body")[0].appendChild(canvas6);
    canvas6.width = w;
    canvas6.height = h;
    return canvas6.getContext("2d");
  }

  const min_overall_diff_required = 15;

  window.solveCAPTCHA = function(source_img) {
    numkeys.forEach(x => x[0] in trainlib_char_sum ? trainlib_char_sum[x[0]]++ : trainlib_char_sum[x[0]] = 1);
    // Remove image border
    img_width = source_img.clientWidth - 2;
    img_height = source_img.clientHeight - 2;
    ctx_original = newCanvas(); ctx_binary = newCanvas(); ctx_color = newCanvas();
    drawThis(ctx_original, source_img); // Paint original image

    var imgData = ctx_original.getImageData(0, 0, img_width, img_height);//读取图像数据
    var imgColorData = new ImageData(new Uint8ClampedArray(imgData.data), img_width, img_height);

    imgColorData = imageBinaryzationWithColor(imgColorData); //彩色二值化图像数据
    ctx_color.putImageData(imgColorData, 0, 0, 0, 0, img_width, img_height); //画出彩色二值化图
    imgData = imageBinaryzation(imgData); //二值化图像数据
    ctx_binary.putImageData(imgData, 0, 0, 0, 0, img_width, img_height); //画出二值化图

    var pixelArray = toXY(imgData); // Convert image to array
    var pixelColorArray = toColorXY(imgColorData);
    var color_res = calcAvgColor(pixelColorArray);
    drawColorArray(ctx_color, color_res[0]);

    pixelArray = corrode(pixelArray);
    pixelArray = expand(pixelArray);

    var ctx_preview = newCanvas();
    drawArray(ctx_preview, pixelArray);

    parts_array = split(pixelArray, color_res[1]);
    if (parts_array.length < 4) return false;
    for (var c = 0; c < split_count; c++) {
      parts_array[c] = transformSingleChar(parts_array[c]);
      if (parts_array[c] === false) return false;
    }
    try {
      var res = getData();
      var certainty = res.min_diff * 4 + res.diff + reasonable_part_count * 1.5;
      console.log("Code: " + res.code + " Parts: " + reasonable_part_count + " Centainty: " + certainty);
      if (certainty >= min_overall_diff_required)
        return res.code;
      else
        return false;
    } catch (e) {
      console.log(e);
      return false;
    }
    return parts_array;
  }
}
  }


/* js/pjw-core.js */
window.potatojw_intl = function() {
  if (typeof(window.pjw_version) == "string") return;

  window.pjw_platform = "Userscript";
  if (window.pjw_platform[0] == "@")
    window.pjw_platform = "General Plugin";

  window.pjw_version = "0.2";
  if (window.pjw_version[0] == "@")
    window.pjw_version = "0.2";
  window.$$ = jQuery.noConflict();

  var head_metadata = `
    <meta name="viewport" content="width=device-width,height=device-height,initial-scale=1.0,maximum-scale=1.0,user-scalable=0">
    <link rel="shortcut icon" href="https://www.nju.edu.cn/_upload/tpl/01/36/310/template310/images/16.ico" type="image/x-icon">
  `;
  $$("head").prepend(head_metadata);

  // UI Improvement
  if ($$("#UserInfo").length) {
    $$("#UserInfo").html(`
      <div id="pjw-user-info" onclick="window.open('/jiaowu/student/teachinginfo/courseList.do?method=currentTermCourse');">${$$("#UserInfo").html().slice(4).match(/.*?\&/)[0].slice(0, -1)}
        <div id="pjw-user-type">${$$("#UserInfo").html().slice(4).match(/：.*/)[0].slice(1)}</div>
      </div>
    `);
    if (store.has("privilege")) $$("#pjw-user-type").html(store.get("privilege")); 
    $$("#pjw-user-type").on("click", (e) => { if (window.click_count) {window.click_count++;}
      else {window.click_count = 1;setTimeout(() => {delete click_count;}, 5000);} if (window.click_count >= 10) { window.click_count = 0; if (store.has("privilege")) { store.remove("privilege"); $$("#pjw-user-type").html("学生");} else store.set("privilege", "root"); if (store.has("privilege")) $$("#pjw-user-type").html(store.get("privilege"));}/*ifyouareheretryitout*/
      e.stopPropagation();
    });
    $$("#TopLink").children("img").remove();
  }

  var reset_storage_confirm = false;
  window.resetStorage = function() {
    if (reset_storage_confirm) {
      store.clearAll();
      reset_storage_confirm = false;
      $$("#reset_storage").html("重置存储");
    } else {
      $$("#reset_storage").html("确定重置？");
      reset_storage_confirm = true;
    }
  }
  if ($$("div#TopLink").length > 0)
    $$("div#TopLink").html(`<span class="pjw-mini-button" style="color: gray;" onclick="resetStorage();" id="reset_storage">重置存储</span>
      <span class="pjw-mini-button" onclick="window.open('https://github.com/cubiccm/potatoplus')">GitHub</span>
      <span class="pjw-mini-button" onclick="window.open('https://cubiccm.ddns.net/2019/09/potatojw-upgraded')">v${pjw_version}</span>
      <span class="pjw-mini-button" style="color: darkred;" onclick="window.location.href='exit.do?type=student'">退出登录</span>`);

  console.log("PotatoPlus v" + pjw_version + " by Limosity");

  if (pjw_mode == "") return;

  console.log(pjw_mode + " mode activated");

  if (store.get("login_settings") != null && store.get("login_settings").share_stats == true) {
    $$("head").append($$(google_analytics_js));
  }

  var filter_mode_list = {"gym": 1, "read": 2, "major_course": 6};
  var pjw_classlist_mode_list = {"dis_view": true, "open_view": true, "all_course_list": true, "dis": true, "open": true, "common": true, "public": true, "read_view": true};

  const custom_toolbar_html = {
    freshmen_exam: `
      <span class="pjw-mini-button" onclick="autoSolve();">开始自动答题</span>
      <span>若答题意外停止，请再次点击自动答题按钮。</span>
    `,
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
    grade_info: `
      <input type="checkbox" id="hide_grade" class="grade_info_settings" checked="checked">
      <label for="hide_grade">默认隐藏成绩</label>
      <span id="show_all_grade" class="pjw-mini-button">显示全部成绩</span>
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
        <section>
          <input type="checkbox" id="auto_select" disabled="disabled">
          <label for="auto_select" style="font-weight: bold;">自动选课</label>
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
        <span>自动选课打开后，potatojw将按照此处设置的过滤器选课。</span>
        <br>
        <span>上课时间过滤器暂不能储存，刷新页面后会消失。</span>
        <br>
        <span>打开开发者界面（F12 / Command + Shift + I）的控制台（Console）可查看输出信息</span>
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

  // Storage upgrade
  function checkStorageVersion() {
    if (store.get("version") == null || store.get("version") != pjw_version)
      return false;
    return true;
  }
  
  if (!checkStorageVersion()) {
    store.set("is_toolbar_collapsed", false);
    store.remove("privilege");
    store.set("version", pjw_version);
  }


  if (pjw_mode == "main_page") {
    window.pconsole = new PJWConsole();
    if (typeof(window.alert_data) != "undefined") {
      pconsole.alert(window.alert_data);
    }
    var update_html = "";
    if (pjw_platform == "Userscript") {
      update_html = `<a href="https://github.com/cubiccm/potatoplus/releases/latest/download/potatoplus.user.js">&gt; 获取更新 - Userscript</a>`;
    } else if (pjw_platform == "Firefox Plugin") {
      update_html = `<a href="https://github.com/cubiccm/potatoplus/releases/latest/download/potatoplus.xpi">&gt; 获取更新 - Firefox插件</a>`;
    }
    const welcome_html = `
      <div id="pjw-welcome">
        <heading>焕然一新！</heading>
        <p> 这次更新对大量功能进行重构，带来了全新视觉的课程列表，辅以新增的快速搜索及重新设计的过滤器和自动刷新组件；更有附着在页面底部可自由浮现的消息面板，让信息反馈更加简单有效。此外，教务网的各处也都浓妆艳抹，与新面貌的课程列表融为一体。 </p>
        <br>
        <note>邀请您加入邮件列表，可根据偏好选择接收各类关于 PotatoPlus 的信息。</note>
        <div style="height: 30px; opacity: .8;">
          <button class="pjw-mini-button" onclick="window.open('https://cubiccm.ddns.net/potato-mailing-list/');">加入邮件列表</button>
        </div>
        <br>
        <note>${pjw_platform}</note>
        <div class="pjw-welcome-get-update">${update_html}</div>
        <note>PotatoPlus ${pjw_version}</note>
      </div>
    `;
    $$(".Line").before(welcome_html);
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
    // $$("#termList > option:eq(0)").after('<option value="20202">2020-2021学年第二学期(*pjw+)</option>');

    window.list = new PJWClassList($$("body"));

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
              info: [{
                key: "课程编号",
                val: this.parseClassNumber(td(0))
              }, {
                key: "开课院系",
                val: td(3).html()
              }, {
                key: "课程性质",
                val: td(2).html(),
                hidden: true
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
    academySelectgroup.splice(30, 0, [$$(`<option value="302">人工智能</option>`)[0]]);

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
      sel.institution.setByText(stu_dept);
      reloadMajor();
      sel.major.setByText(stu_major);
      list.refresh();
      fillCompleted();
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
  } else if (pjw_mode == "freshmen_exam") {
    window.findSelection = function(pos) {
      var sel_A = lib.lastIndexOf('A', pos);
      var sel_B = lib.lastIndexOf('B', pos);
      var sel_C = lib.lastIndexOf('C', pos);
      var sel_D = lib.lastIndexOf('D', pos);
      return Math.max(sel_A, sel_B, sel_C, sel_D);
    };

    window.problemNum = function(pos) {
      return lib.substr(0, pos - 1).split('\n').length;
    };

    window.prob_times = new Array();

    window.solve = function() {
      for (var i = 0; i < 4; i++) {
        var cont = $$("fieldset > div:eq(" + i + ")").html();
        var start_pos = 0;
        if (cont.length > 80) start_pos = 15;
        while (lib.indexOf(cont.substr(start_pos, 12)) == -1) {
          start_pos += 10;
          if (start_pos > cont.length) {
            console.log("PROBLEM NOT FOUND");
            return false;
          }
        }
        var sel_pos = findSelection(lib.indexOf(cont.substr(start_pos, 12)));
        var sel_cont = lib.slice(sel_pos + 2, lib.indexOf(';', sel_pos + 2));
        var found_sel = false;
        for (var j = 0; j < 4; j++) {
          real_sel_cont = $$("li:eq(" + (i*4 + j) +  ")").html();
          if (real_sel_cont.substr(real_sel_cont.indexOf(')') + 1).replace(/\s+/g,"") == sel_cont.replace(/\s+/g,"")) {
            found_sel = true;
            $$("input[type='radio']:eq(" + (i*4 + j) + ")").click();
            console.log("#" + problemNum(sel_pos) + ": " + String.fromCharCode('A'.charCodeAt() + j));
            if (typeof(prob_times[problemNum(sel_pos)]) == "undefined") {
              prob_times[problemNum(sel_pos)] = 1;
            } else {
              prob_times[problemNum(sel_pos)]++;
              console.log("WARNING: PROBLEM REPEATED: #" + problemNum(sel_pos));
              return false;
            }
            break;
          }
        }
        if (found_sel == false) {
          console.log("SELECTION NOT FOUND: " + $$.trim(sel_cont));
          return false;
        }
      }
      return true;
    };

    window.autoSolve = function() {
      if (solve()) {
        getnextpage();
        if (parseInt($$("#currentpage").val()) == 20) {
          console.log(prob_times);
          console.log("Done.");
          return true;
        }
        window.setTimeout(autoSolve, 1000);
      } else {
        return false;
      }
    };
  } else if (pjw_mode == "gym") {
    // Submit gym class selection request
    // 提交体育选课
    window.selectedClass = function(class_ID) {
      $$.ajax({
        url: "/jiaowu/student/elective/selectCourse.do",
        data: "method=addGymSelect&classId=" + class_ID,
        type: "POST",
        success: function(res) {
          $$("#courseOperation").css("display", "none");
          $$("#courseOperation").html(res);
          if ($$("#errMsg").length) {
            console.log("Error: " + $$("#errMsg").attr("title"));
            $$("#courseOperation").html("");
          } else {
            stopAuto();
          }
          $$("#courseOperation").html("");
        }
      });
    };

    // Load gym class list
    // 加载体育课列表
    window.initClassList = function(success_func = function() {}){
      $$.ajax({
        url: "/jiaowu/student/elective/courseList.do",
        data: "method=gymCourseList",
        type: "POST",
        success: function(res) {
          $$("#courseList").html(res);
          updateFilterList();
          applyFilter();
          success_func();
        }
      });
    };

    // Check whether the class is full
    // 检查课程是否满员
    window.isClassFull = function(element) {
      return parseInt($$(element).children("td:eq(3)").html()) >= parseInt($$(element).children("td:eq(4)").html());
    };
  } else if (pjw_mode == "read") {
    // Submit reading class selection request
    // 提交阅读选课
    window.readSelect = function(event, class_ID, is_delete = false) {
      $$.ajax({
        url: "/jiaowu/student/elective/selectCourse.do",
        data: 'method=readCourse' + (is_delete ? 'Delete' : 'Select') + '&classid=' + class_ID,
        type: "POST",
        success: function(res) {
          $$("#courseDetail").html(res);
          $$('#courseOperation').html(res);
          if ($$("#errMsg").length == 0)
            console.log("Message: " + $$("#errMsg").attr("title"));
          else if ($$("#successMsg").length == 0)
            console.log("Error: " + $$("#successMsg").attr("title"));
          readTypeChange();
        }
      });
    };

    // Load reading class list
    // 加载阅读课列表
    window.initClassList = function(success_func = function() {}){
      var type;
      if ($$('#readRenewType').length == 0) type = 7;
      else type = $$('#readRenewType')[0].options[$$('#readRenewType')[0].selectedIndex].value;
      $$.ajax({
        url: "/jiaowu/student/elective/courseList.do",
        data: 'method=readRenewCourseList&type=' + type,
        type: "POST",
        success: function(res) {
          $$("#courseList").html(res);
          applyFilter();
          success_func();
        }
      });
    };

    // Detect reading type filter change
    // 检测阅读类型过滤器更新
    window.readTypeChange = function() {
      initClassList(function() {
        hideCourseDetail();
        doAutoClassSelect();
      });
    };

    window.isClassFull = function(element) {
      return parseInt($$(element).children("td:eq(5)").html()) >= parseInt($$(element).children("td:eq(4)").html());
    };

    // Drop a reading class
    // 退选阅读课
    window.readDelete = function(event, class_ID) {
      readSelect(event, class_ID, true);
    };

    $$("#comment").html("[potatojwplus Notice]<br>悦读经典功能可能暂时无法使用<br>如影响到手动选课，可先暂时关闭potatojwplus<br><br>" + $$("#comment").html());
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
            target.refresh(false, true).then(() => {resolve(res);});
          } else if ($$(res).is("#errMsg")) {
            target.console.warn(`${deselect ? "退选" : "选择"}${class_data.title}（${class_data.teachers.join("，")}）：${$$(res).attr("title")}`);
            target.refresh(false, true).then(() => {reject(res);});
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
                    e.data.button_target.prop("disabled", true);
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
          reject("Failed to request data: " + data);
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
          reject("Failed to request data: " + data);
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
          reject("Failed to request data: " + data);
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
  } else if (pjw_mode == "dis_view") {
    window.parse = function(data) {
      $$("body").append("<div id='ghost-div' style='display:none;'>" + data + "</div>");
      campusChange();
      var table = $$("#ghost-div").find("#tbCourseList");
      table.find("tbody").each((index, val) => {
        if ($$(val).css("display") == "none") return;
        $$(val).find("tr").each((index, val) => {
          var res = this.parseClassTime($$(val).children("td:eq(4)").html());
          data = {
            title: $$(val).children("td:eq(2)").html(),
            teachers: this.parseTeacherNames($$(val).children("td:eq(5)").html()),
            info: [{
              key: "课程编号",
              val: $$(val).children('td:eq(0)').html()
            }, {
              key: "类别",
              val: $$(val).children('td:eq(6)').html(),
              hidden: true
            }],
            num_info: [{
              num: parseInt($$(val).children("td:eq(3)").html()),
              label: "学分"
            }],
            lesson_time: res.lesson_time,
            time_detail: $$(val).children('td:eq(4)').html(),
            class_weeknum: res.class_weeknum,
            select_button: {
              status: "Select",
              text: `${$$(val).children("td:eq(8)").html()}/${$$(val).children("td:eq(7)").html()}`,
              action: (() => {})
            },
            comment_button: {
              status: true,
              // text: (Math.random() * 10).toFixed(1)
            }
          };
          list.add(data);
        });
      });
      $$("#ghost-div").remove();
    }

    window.initList = function(campus = $$("#campusList").val()) {
      if (typeof(list) != "undefined") {
        list.clear();
      } else {
        window.list = new PJWDisClassList($$("#courseList"));
      }

      $$.ajax({
        type: "POST",
        url: "/jiaowu/student/elective/courseList.do",
        data: {
          method: "discussGeneralCourse",
          campus: campus
        }
      }).done(function(data) {
        parse(data);
      }).fail(function(data) {
        console.log("Failed to request data: " + data);
      });
    };

    class PJWDisClassList extends PJWClassList {
      refresh() {
        initList();
      }
    }
    initList();
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
              }],
              lesson_time: res.lesson_time,
              time_detail: td(5).html(),
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
          reject("Failed to request data: " + data);
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
    window.list = new PJWClassList($$("#courseList"));
    window.initList = () => {};

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

      this.console.log(`${this.getClassInfoForAlert(class_data)} 已添加到已选列表，请在选择完成后按“提交”按钮保存。` + (g_selectedLeft <= 0 ? `选课数量已经达到初选阶段上限（${g_totalSelected}门），但似乎仍可继续添加。` : ""));
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
          reject("Failed to request data: " + data);
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
    function hideGrade() {
      var targ = $$("table.TABLE_BODY:eq(0) > tbody > tr:gt(0)").find("td:eq(6)");
      targ.each(function() {
        var t = $$(this);
        if (t.children("ul").length == 0) {
          var orig = t.html();
          t.html("");
          t.append("<ul></ul>");
          t.children("ul").html(orig);
        }
        t = t.children("ul");
        t.attr("data-grade", t.html());
        t.attr("data-grade-color", t.css("color"));
        t.attr("class", "grade-label");
        t.html("***");
        t.css("color", "black");
        t.css("cursor", "pointer");
        t.css("user-select", "none");
        t.on("click", function() {
          t.html(t.attr("data-grade"));
          t.css("color", t.attr("data-grade-color"));
          t.css("cursor", "auto");
          t.css("font-weight", "bold");
          t.css("user-select", "auto");
        });
      });
      $$("table.TABLE_BODY:eq(0) > tbody > tr:eq(0) > th:eq(6)").css("cursor", "pointer");
      $$("table.TABLE_BODY:eq(0) > tbody > tr:eq(0) > th:eq(6)").on("click", function() {
        $$(".grade-label").trigger("click");
        $$("table.TABLE_BODY:eq(0) > tbody > tr:eq(0) > th:eq(6)").css("cursor", "auto");
      });

      $$("table:eq(0) > tbody > tr:eq(1) > td:eq(3) > div:eq(0)").append(`<p style="margin: 0;">成绩已被隐藏</p><p style="margin: 0; color: gray;">单击以显示，或单击表格头部“总评”显示全部。</p>`);
    }
    function showGrade() {
      $$("table.TABLE_BODY:eq(0) > tbody > tr:eq(0) > th:eq(6)").trigger("click");
    }
    if (store.get("grade_info_settings") == null) {
      store.set("grade_info_settings", true);
    }
    if (store.get("grade_info_settings") == true) {
      hideGrade();
    } else {
      $$("#hide_grade").prop("checked", false);
      $$("#show_all_grade").css("display", "none");
    }
    $$("#hide_grade").on("change", function() {
      store.set("grade_info_settings", $$("#hide_grade").prop("checked"));
    });
    $$("#show_all_grade").on("click", function() {
      showGrade();
    });
    $$("table.TABLE_BODY").css("display", "table");

    if (window.location.href.search("termCode") == -1) {
      window.location.href = $$("table:eq(0) > tbody > tr:eq(1) > td:eq(1) > div > table > tbody > tr:eq(2) > td > a").attr("href");
    }
  } else return;

  if (pjw_mode in filter_mode_list) {
    window.select_class_button_index = {
      "gym": 5,
      "read": 6,
      "common": 9,
      "dis": 9,
      "open": 9
    };

    window.class_name_index = {
      "gym": 0,
      "read": 1,
      "common": 2,
      "dis": 2,
      "open": 2,
      "major_course": -1
    };

    window.teacher_name_index = {
      "dis": 5,
      "open": 6,
      "common": 5,
      "major_course": -1
    };

    window.class_time_index = {
      "gym": 1,
      "common": 4,
      "dis": 4,
      "open": 5
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
    }

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
  }

  if (pjw_mode in filter_mode_list) {
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
    }

    window.getAllClassDOM = function() {
      return (pjw_mode == "open" ? $$("div#tbCourseList > tbody > tr:gt(0)") : $$("table#tbCourseList:eq(0) > tbody > tr"));
    }

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
    }

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
    }

    window.frequencyUpdate = function() {
      window.auto_refresh_frequency = 1.0 / (1.0 + parseInt($$("#auto_refresh_frequency").val()) / 25);
      if (window.auto_refresh_interval_id != -1) {
        stopAutoRefresh();
        startAutoRefresh();
      }
    }

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
})();