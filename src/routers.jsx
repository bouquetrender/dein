import React, { Component } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import styles from '@/assets/css/view.scss'

// Transtion
import { TransitionGroup, CSSTransition } from 'react-transition-group'

// Router
import Player from './container/playerView'
import plashscreen from './container/plashscreen'
import NoMatch from './container/404'

@withRouter
export default class Routers extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { location } = this.props
    const currentKey = location.pathname.split('/')[1] || '/'
    const timeout = { enter: 300, exit: 200 }

    return (
      <div className={styles.view}>
        {/*
        <div className={styles.toparea}>
          <Navigation />
        </div>
        */}
        {/* Component */}
        <TransitionGroup>
          <CSSTransition
            appear
            key={currentKey}
            timeout={timeout}
            classNames={{
              enter: styles.fadeEnter,
              enterActive: styles.fadeEnterActive,
              exit: styles.fadeExit,
              exitActive: styles.fadeExitActive
            }}
          >
            <div className={styles.bottomarea}>
              <Switch location={location}>
                <Route
                  key={location.key}
                  location={location}
                  component={plashscreen}
                  exact
                  path="/"
                />
                <Route
                  key={location.key}
                  location={location}
                  component={Player}
                  path="/player"
                />
                <Route
                  key={location.key}
                  location={location}
                  component={NoMatch}
                />
              </Switch>
            </div>
          </CSSTransition>
        </TransitionGroup>
      </div>
    )
  }
}
