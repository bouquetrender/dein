import { AppContainer as HotReloader } from 'react-hot-loader'
import React from 'react'
import ReactDOM from 'react-dom'
import normalize from './normalize.scss'
import * as OfflinePluginRuntime from 'offline-plugin/runtime'
import App from './app'
import 'babel-polyfill'

// offline plugin 自行选择是否开启
if (process.env.NODE_ENV === 'production') {
  OfflinePluginRuntime.install()
}
// 注销serviceWorker方案
// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.getRegistration().then((registration) => {
//     registration && registration.unregister().then((boolean) => {
//       boolean ? alert('注销成功') : alert('注销失败')
//     });
//   })
// }

// hashrouter包含history属性会出现控制台警告，建议使用browserHistory
// import createHistory from "history/createHashHistory";
// const hashhistory = createHistory();
// <HashRouter history={hashhistory}></HashRouter>

// render
const rootEle = document.getElementById('root')
const render = () => {
  ReactDOM.render(
    <HotReloader>
      <App />
    </HotReloader>,
    rootEle
  )
}
render()

// hotReplace
if (module.hot) {
  module.hot.accept('./routers.jsx', render)
}
