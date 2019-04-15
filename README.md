# SNH48-李佳恩 集资相关汇总网站（纯前端）
[TOC]
# 简介
出发点是自己学习VUE极相关库的网站（仅有手机端），技术还不成熟，见谅。  
作者：[-青春的小尾巴-](https://weibo.com/amber0401)
# 文件夹介绍

```
只介绍src文件夹下内容，其他文件夹并没有做什么改变
```
- **/assets**

    ```
    用于盛放静态资源文件夹，包括 /js，/css，/img 三大主要静态资源
    ```
    - js/api.js 各种请求都在这个文件里
    - js/filters.js 项目中所用到的过滤器都在这个文件里
    - css/global.scss 所有初始化的css样式，包括size的计算，配置颜色等
- **/components**

    所有组件的结构都肥肠简单，其中 `UserItem.vue` 通过对 `$route.params.id` 的判断来显示不同的内容和对应内容的弹窗
- **/lib**
    ```
    用于盛放静态数据的文件夹，没有数据接口时会使用静态数据
    ```
- **/router**
    ```
    在 /router/index.js 配置路由
    ```
    - `meta.index` 页面的级别，数字越小级别越高，0为一级页面，用于在触发路由切换滑动效果时的判断
    - `meta.title` 当前页面的标题
    - 2019/03/15更新 路由配置改为懒加载配置
    
- **/stroe**
    ```
    vuex（全局状态管理）内容的文件夹
    ```
    `state.AllDetail` 为用户发起的所以集资集资项目的缓存
    ```
    用户：比如我是做的李佳恩的汇总，用户就是李佳恩应援会，通过修改/assets/js/api下的getAllDetail的参数改变内容
    ```
- **/views**
    ```
    所有显示页面的文件夹，Home为首页，其他均为二级三级页面
    ```
- **main.js**

    按需注册了iview的组件，注册了$Modal弹窗方法
    
# 自行使用的配置方法

- 这是基于node和vue的前端页面，请确保安装了node和vue
- 自行搜索自己的 `to_user_id` 并替换到 `/assets/js/api` 下的 `getAllDetail` 的参数上即可
- 若你没有自行整理的静态数据，则删除 `Home.vue` 下的导航栏，再删除 `router/index.js` 里的关于`more.vue`的路由信息,删除`more.vue`文件

```
到这里基本修改好了，至于图片自己找找链接换掉就可以了
```
