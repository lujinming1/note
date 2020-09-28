# git commit message 格式规范

&emsp;&emsp;在工作中，我们肯定会与git打交道。那么当你提交代码后如何让别人很快了解到你此次提交代码的改动点是哪些。此时就需要一个提交信息来描述此次提交修改的内容。没有格式的提交信息，会使提交记录杂乱无章，不能很快的定位哪些提交涉及代码修改，哪些只是配置修改等等。而好的提交信息能使提交历史更容易阅读，找到你想要的信息。这篇文章将整理 Angular 代码仓库制定的提交规范。

&emsp;&emsp;在该格式中，提交消息由三部分构成 `header`，`body`，`footer`。

```java
  <header>
  <BLANK LINE>
  <body>
  <BLANK LINE>
  <footer>
```

在日常工作中一般只用 `header`，`body` 与 `footer` 一般不会使用，但是当你需要提 PR 到别人库时会被要求写这两部分。以下是各部分职责以及格式。

## header 格式

```java
<type>(<scope>): <short summary>
  │       │             │
  │       │             └─⫸ Summary in present tense. Not capitalized. No period at the end.
  │       │
  │       └─⫸ Commit Scope: common|core|packaging|service|page|component|config
  │
  └─⫸ Commit Type: build|ci|docs|feat|fix|perf|refactor|style|test|deps
```

其中， `type` 和 `short summary` 是必须要有的，`scope` 为可选字段。

### type 类型

&emsp;&emsp;`type` 用于标记此次提交的类型。

- feat：新增功能
- fix：bug修复
- docs：文档相关改动
- style：对代码的格式化改动，代码逻辑并未产生任何变化
- refactor：重构代码或者其他优化举措，理论上不影响现有功能
- perf：提升性能
- test：新增或者修改测试用例
- build：项目工程化方面的改动，代码逻辑并未产生任何变化。（包括但不限于文档，代码生成等）
- ci：CI配置文件和脚本的更改
- deps：升级依赖

### scope

&emsp;&emsp;`scope` 用于标记此次修改文件的范围。这个范围可以对应某个功能或者文件夹都可以。

### short summary

&emsp;&emsp;`short summary` 用于描述此次提交的内容，应言简意赅。

- 使用祈使句、现在时：如应该使用 `change` 而不是 `changed` 或者 `changes`
- 不要大写第一个字母
- 句末没有句号

## body

&emsp;&emsp;补充 `short summary`，适当增加原因，目的等相关因素，用于说明更改的动机。也可以将此次提交与现有功能（或代码）比较说明更改的影响。

## footer

&emsp;&emsp;`footer` 可以包含一些重大的更改信息，比如非兼容性修改之类的信息需要在此描述清楚。也可以引用相关的 issue，或者其他 PR 等。

## 🌰

如 Angular 代码库的 PR 记录：[https://github.com/angular/angular/pulls](https://github.com/angular/angular/pulls)

传送门：
[Angular Commit Message Format (https://github.com/angular/angular/blob/master/CONTRIBUTING.md)](https://github.com/angular/angular/blob/master/CONTRIBUTING.md)
