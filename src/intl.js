import intl from 'react-intl-universal'
import en_US from './locales/en-US.json'
import zh_CN from './locales/zh-CN.json'
import ja_JP from './locales/ja-JP.json'

export const locales = {
  'en-US': en_US,
  'zh-CN': zh_CN,
  'ja-JP': ja_JP
}

export default {
  getWelcomeTitle() {
    return intl.get('WELCOME_TITLE')
  },
  getP2Title() {
    return intl.get('P2_TITLE')
  }
}
