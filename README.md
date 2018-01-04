## 说明

一个基于 Electron 构建, React 框架的音乐播放器

## 目录

```
├── src
│   ├── actions                    # redux actions
│   │   └── player.jsx
│   ├── app.jsx                    # 组件入口
│   ├── assets
│   │   ├── css
│   │   └── images
│   ├── component                  # 组件
│   │   ├── musicplayer                 # 播放器控件
│   │   └── siriwave                    # 波浪线条组件
│   ├── entry.jsx                  # 入口
│   ├── intl.js                    # i18n
│   ├── locales                    # 国际化
│   │   ├── en-US.json
│   │   ├── ja-JP.json
│   │   └── zh-CN.json
│   ├── normalize.scss             # normalize
│   ├── reducers                   # redux reducers
│   │   └── index.jsx
│   ├── routers.jsx                # 路由
│   ├── template                   # HTML模板
│   │   └── index.html
│   ├── utils                      # utils
│   │   ├── hex2rgb.js
│   │   ├── immutable-pure-render-decorator.jsx
│   │   └── randomColor.js
│   └── views                      # 页面
│       ├── plashscreen.jsx             # 启动页
│       └── playerview.jsx              # 播放器界面
├── main.js                        # electron 入口文件
├── index.html                     # devServer index
├── package-lock.json              # package lock
├── package.json                   # package
├── postcss.config.js              # postCSS 配置文件
├── webpack.config.js              # Webpack 基本配置
├── webpack.dev.config.js          # Webpack 开发环境配置
└── webpack.prod.config.js         # Webpack 部署环境配置
```

## 命令

`npm run start` 开发环境启动

`npm run build` 项目打包 App 启动预览

`npm run lint` 代码检测

`electron-packager [input src] [name] --out [output src]` App 打包
