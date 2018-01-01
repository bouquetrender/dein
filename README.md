# Introduction

无

# Directory Layout

```
├── src
│   ├── actions
│   │   └── player.jsx
│   ├── app.jsx
│   ├── assets
│   │   ├── css
│   │   └── images
│   ├── component                  # 组件
│   │   ├── musicplayer                 # 播放器控件
│   │   └── siriwave                    # 波浪线条组件
│   ├── entry.jsx
│   ├── intl.js
│   ├── locales
│   │   ├── en-US.json
│   │   ├── ja-JP.json
│   │   └── zh-CN.json
│   ├── normalize.scss
│   ├── reducers
│   │   └── index.jsx
│   ├── routers.jsx
│   ├── template
│   │   └── index.html
│   ├── utils
│   │   ├── hex2rgb.js
│   │   ├── immutable-pure-render-decorator.jsx
│   │   └── randomColor.js
│   └── views                      # 页面
│       ├── plashscreen.jsx             # 启动页
│       └── playerview.jsx              # 播放器界面
├── index.html                     # devServer index
├── package-lock.json              # package lock
├── package.json                   # package
├── postcss.config.js              # postCSS 配置文件
├── webpack.config.js              # Webpack 基本配置
├── webpack.dev.config.js          # Webpack 开发环境配置
└── webpack.prod.config.js         # Webpack 部署环境配置
```

# Run
`npm run start` 开发环境启动

`npm run build` App打包

`npm run lint` 代码检测
