import React from 'react'
import ReactDom from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import App from './App'
import { counter, add, cut, addAsync } from './index.redux'

const reduxDevTools = window.devToolsExtension ? window.devToolsExtension() : () => {}
 
// 生成store
const store = createStore(counter, compose(
  applyMiddleware(thunk),
  reduxDevTools
))

function render () {
  ReactDom.render(<App store={ store } add={add} cut={cut} addAsync={addAsync}></App>, document.querySelector('#root '))
}

render()

// 监听
store.subscribe(render)