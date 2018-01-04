import React, { Component } from 'react'
import styles from '@/assets/css/view.scss'
import Link from 'react-router-dom/Link'
import intlGet from '@/intl'

export default class Index extends Component {
  render() {
    return (
      <div className={styles.indexWrap}>
        <div className={styles.ballScaleMultiple}>
          <div />
          <div />
          <div />
        </div>
        <div className={styles.indexTitle}>
          <div>{intlGet.getWelcomeTitle()}</div>
          <div className={styles.p2}>{intlGet.getP2Title()}</div>
        </div>
      </div>
    )
  }
  componentDidMount() {
    setTimeout(() => {
      this.props.history.push('player')
    }, 3000)
  }
}
