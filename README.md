# potatojw_upgraded

土豆改善工程

## Features

* 课程过滤器
* 自动刷新与选课
* 快速登录（登录信息存储、验证码识别）
* 课程评估快速评价
* 新生测试自动答题
* 课程查询、成绩查询等体验优化

## Installation

请先在浏览器中安装[Tampermonkey](https://tampermonkey.net)等可以执行Userscript的插件，之后从下面链接获取脚本。

[获取pjw+](https://github.com/cubiccm/potatojw_upgraded/raw/master/potatojw_upgraded.user.js)

[获取测试版pjw+](https://github.com/cubiccm/potatojw_upgraded/raw/beta/potatojw_upgraded.user.js)

安装后，脚本会依照插件的设定自动更新，您可以在插件的菜单中配置自动更新。

## More Info

[更多信息](https://cubiccm.ddns.net/2019/09/potatojw-upgraded/)

<br><br>
_以下列表截至v0.1.4.3_
<br>
## 目前已知Bug
手动或自动刷新课程列表时，上课时间筛选器会更新，原有筛选被清除

体育选课抽签（非补选）时影响正常功能

经典悦读课程选课函数名重载错误

## 目前已知体验问题
更改筛选器条件时，自动选课不会被关闭，可能导致误选

自动刷新频率调节范围过小

跨院系选课选中无提示

长时间自动刷新会产生大量内存垃圾

## 短期更新计划
筛选器更新（继续完善本地存储筛选器信息；引入优先级概念，排布自定义规则（可同时加入多规则）；上课时间选择优化，采用日历UI，按照星期和节数等选择；支持更多筛选项，如年级、学分；选到课时按照优先级决定是否继续选课）

输出面板更新（将console中内容输出到前端界面，并将各部分信息优化输出）

课程ID更新（可获取课程ID，开始选课时直接向最后一层POST信息，减少请求数）

## 远期更新计划
_注：以下远期更新计划均很可能取消_

课程评价（可给课程及老师留言、打分；选课时直接看，方便直接；问题是需要服务器...）

教务网界面整体美化（美化界面，同时使操作更便捷、体验更流畅）
