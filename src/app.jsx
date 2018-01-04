import React, { Component } from 'react';
import Routers from './routers.jsx';
import HashRouter from 'react-router-dom/HashRouter';
import { Provider } from 'react-redux';
import IndexReducers from './reducers/index';
import { createStore, combineReducers, applyMiddleware } from 'redux';

import intl from 'react-intl-universal';
import { locales } from './intl';

// 自定义中间件
const myMiddleware = store => next => action => {
  // some code ...
  let result = next(action);
  return result;
};

// store
const combine = combineReducers({ IndexReducers });
const store = createStore(combine, applyMiddleware(myMiddleware));

export default class App extends Component {
  state = {
    initDone: false
  };

  loadLocales() {
    let currentLocale = intl.determineLocale({
      urlLocaleKey: 'lang',
      cookieLocaleKey: 'lang'
    });
    intl
      .init({
        currentLocale,
        locales: {
          [currentLocale]: locales[currentLocale]
        }
      })
      .then(() => {
        this.setState(prevState => {
          return {
            initDone: !prevState.initDone
          };
        });
      });
  }
  render() {
    return (
      this.state.initDone && (
        <Provider store={store}>
          <HashRouter>
            <Routers />
          </HashRouter>
        </Provider>
      )
    );
  }
  componentDidMount() {
    this.loadLocales();
  }
}
