# PotatoPlus

potato **overgrow**
NJU土豆改善工程

## 介绍 Introduction

为教务网化上妆容，面貌焕然一新！

精心设计的课程列表让重要信息一览无余，并提供了丰富的搜索与过滤功能；更有自动刷新等多个增强模块融合交织，将体验提升到前所未有的高度。

差点忘了，它还只是一个插件。

## 安装 Installation

### 通过插件安装

#### Chrome

访问[Chrome网上应用店页面](https://chrome.google.com/webstore/detail/potatoplus/mokphlegfcilcbnjmhgfikjgnbnconba)，再点击“添加至Chrome”即可。

_如果您无法访问Chrome网上应用店，可以尝试下面的手动安装流程（无法自动更新）：_

首先下载项目源代码并解压，点击Chrome右上方的“插件”按钮并选择“管理插件”，或直接访问`chrome://extensions/`；

打开右上角的“开发者模式”开关，并选择左上方按钮“加载未打包的扩展”，选择刚刚下载的源代码文件夹即可。

#### Edge

访问Microsoft Store中的页面（将于稍后上线），再安装即可。

亦可在Chrome网上应用店下载或手动安装。

#### Firefox

在Firefox中访问下面链接，并点击“添加”即可。

[获取 Firefox Add-on](https://github.com/cubiccm/potatoplus/releases/latest/download/potatoplus.xpi)

### 通过Userscript安装

Userscript安装较为方便、更新速度快，但在很多体验上不如插件，建议优先以插件方式安装。

请先在浏览器中安装[Tampermonkey](https://tampermonkey.net)等可以执行Userscript的插件，之后访问下面的链接获取脚本。

[获取 Userscript](https://github.com/cubiccm/potatoplus/releases/latest/download/potatoplus.user.js)

要及时获得最新的功能和错误修复，您可以调快插件的自动更新频率，或加入[邮件列表](https://cubiccm.ddns.net/potato-mailing-list/)接收最新动态。

## 功能 Features

- 整体用户界面改进
  - 部分采用渐变化和圆角风格
  - 部分采用 Google Material Design 设计
  - 改进反馈动画效果
  - 导航栏
    - 更新标志及背景设计
    - 重新整理的登录信息和功能按钮
    - 各标签栏的界面优化和点击反馈
  - 字体
- 课程列表
  - 课程过滤器
    - 基于事件的可扩展模块式设计
    - 空余课程模块（avail）
    - 课程时间模块（hours）
      - “空闲时间”可以帮助自动勾掉已有课程的时间
    - 土豆模块（potatoes）
      - 测试模块
      - 可配置的成功 / 失败后行为
    - Frozen Quotes模块（frozen）
  - 增强搜索
    - 使用多个关键字搜索课程信息
    - 用"-"过滤掉希望排除的课程，用"*"匹配所有课程
    - 使用拼音首字母快速搜索
  - 刷新
    - 可调节速度的自动刷新功能
    - 自动“软刷新”模式，提高性能及减少渲染量
  - 课程周历
    - 以可视化形式呈现上课时间
  - 改进的选择框
    - 减少点击操作，自动刷新列表
  - 改进的课程编号与课程指纹
  - 已应用在以下页面
    - 全校课程
    - 课程补选 / 导学、研讨、通识课补选
    - 课程补选 / 跨专业补选
    - 课程补选 / 通修课补选
    - 课程补选 / 公选课补选
    - 课程初选 / 跨院系选课
    - 课程初选 / 经典导读读书班
- 浮动通知栏
  - 在页面下方自由浮动，轻点即可查看历史
  - 重要信息会停留直至光标划过
  - 消除提示框的烦扰
- 登录体验优化
  - 登录信息存储功能
  - 自动验证码识别
- 页面辅助功能
  - 首页
    - 将提示框转为浮动通知栏的通知
  - 全校课程
    - 自动获取及选择专业
    - 增加缺失的“人工智能学院”
    - 列出“全部院系”
  - 成绩查看
    - 可选择默认隐藏成绩
    - 自动跳转至最新学期
  -  课程评估
    - 自动评估模式
  - 新生测试
    - 自动答题（准确率约95%）
- 其余细节更新
  - 为网站添加icon
  - 修复一些教务网的错误
  - 还有更多...
- 可折叠工具栏 (Legacy)
  - 已应用在以下页面
    - 课程补选 / 体育课补选
    - 课程补选 / 经典导读读书班补选
    - 专业选课
    - 除课程列表外其它含有功能的页面
    
## 测试功能 Beta Features
  
截至目前，部分功能仍在测试，相关源码已经存在于项目中，但默认不启用。
如需临时启用某个过滤器模块，请在控制台执行
```javascript
list.loadModule("potatoes");
```
并将potatoes改为相应的模块名称。
    
## 更多信息 More Info

[项目更新日志](https://cubiccm.ddns.net/2019/09/potatojw-upgraded/)
