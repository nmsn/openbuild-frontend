[English](./en.md) | 简体中文

# 开发规范

为保证项目质量和可维护性，需严格遵守。

## 目录结构

虽说该项目是基于 Next.js 进行开发，但在文件组织上尽可能地不去使用其默认推荐的目录结构，也不同于其他前端项目常见的目录结构。

取而代之，采用的是以领域驱动设计思想为指引的「模块化」目录结构划分模式，以此为基础根据 Next.js 的限制进行些许兼容适配：

```
project/src
   ├── app
   │   └── ...
   ├── domain
   │   └── [domain-specific-module]
   │       ├── views
   │       │   ├── [detail-view]
   │       │   │   ├── [DetailViewComponent].js
   │       │   │   ├── ...
   │       │   │   └── index.js
   │       │   ├── [form-view]
   │       │   │   ├── [FormViewComponent].js
   │       │   │   ├── ...
   │       │   │   └── index.js
   │       │   └── [list-view]
   │       │       ├── [ListViewComponent].js
   │       │       ├── ...
   │       │       └── index.js
   │       ├── widgets
   │       │   └── [domain-specific-widget]
   │       │       └── ...
   │       ├── helper.js
   │       ├── index.js
   │       ├── model.js
   │       ├── repository.js
   │       └── ...
   ├── entry
   │   └── ...
   ├── shared
   │   └── ...
   └── ...
```

这样一来，大幅削弱了 [`app`](https://nextjs.org/docs/app) 的重要性，使其「退化」成较为单纯的 URL 与视图路由，而其他文件夹的职责为：

- `shared`——具体业务、页面无关的脚本、样式、图片等，基本是全局可复用的；
- `domain`——具体业务相关的脚本、样式、图片等，专注业务逻辑处理与关联数据的渲染，按业务域进行拆分；
- `entry`——具体页面相关的脚本、样式、图片等，专注纯页面层面的渲染与交互。

由于整个项目的目录结构还在重构调整中，在 `src` 文件夹中会看到上面没列出的文件夹；在做新功能时，要尽量避免在遗留代码中新增内容，而应当是在上述目录结构中。

**在正式开始提交代码前，请先仔细查看了解上述目录结构。**

## 文件引用

为避免依赖关系混乱和循环依赖，在文件引用层面有所限制，基本规则是：

1. `src/*` 文件夹，`*` 部分相同时使用相对路径；
2. 相异时，`shared` 文件夹的用 `@/*`，其他用 `#/*`；
3. `public` 文件夹下的用 `public/*`；
4. `src/*` 文件夹「纯净度」排序为 `shared` > `domain` > `entry` > `app`，「纯净度」高的禁止引用低的。

`src/*` 文件夹（不含遗留目录结构）的详细引用规则如下——

### `shared` 文件夹

| 可引用文件夹 | 引用方式 |
| --- | --- |
| `public` | `public/*` |
| `shared` | 相对路径 |

### `domain` 文件夹

| 可引用文件夹 | 引用方式 |
| --- | --- |
| `public` | `public/*` |
| `shared` | `@/*` |
| `domain` | 相对路径 |
| 其他非 `entry` 和 `app` | `#/*` |

### `entry` 文件夹

| 可引用文件夹 | 引用方式 |
| --- | --- |
| `public` | `public/*` |
| `shared` | `@/*` |
| `entry` | 相对路径 |
| 其他非 `app` | `#/*` |

### `app` 文件夹

| 可引用文件夹 | 引用方式 |
| --- | --- |
| `public` | `public/*` |
| `shared` | `@/*` |
| `app` | 相对路径 |
| 其他 | `#/*` |

## 编码风格

初始阶段，暂无硬性要求，但需与已有代码尽量保持一致。

## 扩展阅读

- [聊聊中后台前端应用：目录结构划分模式](https://ourai.ws/posts/patterns-of-directory-structure-in-frontend-projects/)
- [「反混沌」前端工程](https://ntks.ourai.ws/)