# redux

1. 基本使用

```
import { createStore } from 'redux'

function counter (state = 0, action) {
  switch (action.type) {
    case '加':
      return ++state
    case '减':
      return --state
    default:
      return 10    
  }
}

const store = createStore(counter)

function listener () {
  const init = store.getState()
  console.log(init)
}

store.subscribe(listener)

store.dispatch({ type: '加' })
```

2. 异步借助“redux-thunk”

```
import { createStore, applyMiddleware }
import { counter, add, cut, addAsync } from './index.redux'

// 生成store
const store = createStore(counter, applyMiddleware(thunk))
```

```
// action

export function add () {
  return { type: ADD }
}

// action（异步）

export function addAsync () {
  return dispatch => {
    setTimeout(() => {
      dispatch({ type: ADD })
    }, 2000)
  }
}
```

并且subscribe就不需要了，直接渲染即可

3. 浏览器插件（Redux DevTools）

```
// 配合redux使用
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { counter, add, cut, addAsync } from './index.redux'

const reduxDevTools = window.devToolsExtension ? window.devToolsExtension() : () => {}
 
// 生成store
const store = createStore(counter, compose(
  applyMiddleware(thunk),
  reduxDevTools
))
```

4. react-redux

	Provider、connect、修饰器
	
	修饰器借助：babel-plugin-transform-decorators-legacy
	
	babel7已经内置，所以不需要安装，使用以下配置即可
	```
	{
  		"plugins": [
    		["@babel/plugin-proposal-decorators", { "legacy": true }],
  		]
	}
	```
	
	```
	// 原来这么些的地方
	App = connect(
	  	// 你需要那些状态
	  	(state) => {
	    	return { num: state }
	  	},
	  	// 你需要那些方法
	  { add, cut, addAsync }
	)(App)

	// 现在可以提到前面去
	@connect(
	  // 你需要那些状态
	  state => {
	    return { num: state }
	  },
	  // 你需要那些方法
	  { add, cut, addAsync }
	)
	```

5. reducer合并

```
import { combineReducers } from 'redux'

import { counter } from './index.redux'
import { loger } from './Auth.redux'

export default combineReducers({ counter, loger })
```