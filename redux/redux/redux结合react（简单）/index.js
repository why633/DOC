import React from 'react'
import ReactDom from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import App from './App'
import { counter, add, cut, addAsync } from './index.redux'
 
// 生成store
const store = createStore(counter, applyMiddleware(thunk))

function render () {
  ReactDom.render(<App store={ store } add={add} cut={cut} addAsync={addAsync}></App>, document.querySelector('#root '))
}

render()

// 监听
store.subscribe(render)