## Nextjs-Antd-GithubIssues-Blog

### 关于这个项目

⚠️ **注意，不支持 IE 浏览器**

点这里看一下：[hexh's blog](https://blog.hexuhua.vercel.app/)

### 这个项目有什么特别之处

1. 利用 GitHub Issues 和 search 相关的接口进行博客文章的后台管理
2. 以 [vercel.app](https://vercel.app) 作为后端部署。而且 vercel.app 还能像 GitHub Page 那样送域名，还不错
3. 前端基于 Next + antd 进行开发，目标是利用 Nextjs 服务端渲染的优点实现 SSR 同构，让我的博客既能有相当不错的客户端体验，也能进行 SEO 优化

### 用了哪些库和接口

1. 前端脚手架 [next-antd-scaffold](https://github.com/luffyZh/next-antd-scaffold)
2. [GitHub Api Issues](https://docs.github.com/en/free-pro-team@latest/rest/reference/issues) 和 [GitHub Api Search](https://docs.github.com/en/free-pro-team@latest/rest/reference/search)

### Usage

#### development

```shell
git clone https://github.com/luffyZh/next-antd-scafflod.git
yarn install
yarn start
```

> http://localhost:3006

#### production

```shell
yarn build
yarn prod
```

> http://localhost:5999

#### 写博客

![pic](https://user-images.githubusercontent.com/26080416/96369861-9c492680-118e-11eb-88e6-eb0ff695bf0d.png)

模板如上图所示，也可以看[这里](https://github.com/hexh250786313/nextjs-antd-githubIssues-blog/issues/12)

| 标签           | 作用                                                                                         |
| -------------- | -------------------------------------------------------------------------------------------- |
| \<header-img\> | 放入一张图片链接，用于改变每个文章的顶部的标题处的背景图                                     |
| \<desc\>       | 正文开头的文案，出现在文章的开头；同时会出现在列表页的文章标题的下方，支持空白符             |
| \<image\>      | 支持多张图片链接，显示在 `<desc>` 文案的下方，文章的上方；同时会出现在列表页的文章标题的下方 |

这些标签都是可选的，不填的话不会对 markdown 格式的正文有任何影响

### 部署

[vercel.app](https://vercel.com/home)

### Todo

- [x] 搜索功能
- [x] header 图片的标签
- [x] Google Search SEO 优化
- [x] 悬浮回到顶部按钮
- [ ] 文章详情前后页按钮
