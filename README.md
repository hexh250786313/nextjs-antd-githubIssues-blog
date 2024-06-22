## Nextjs-Antd-GithubIssues-Blog

### 关于这个项目

⚠️ **注意，不支持 IE 浏览器**

点这里看一下：[hexh's blog](https://blog.hexh.xyz)

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

### 部署

[vercel.app](https://vercel.com/home)
