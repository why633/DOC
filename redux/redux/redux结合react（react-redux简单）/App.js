import React, { Component } from 'react'
import { connect } from 'react-redux'
import { add, cut, addAsync } from './index.redux'

class App extends Component {
  addFun () {
    
  }

  render () {
    const { num, add, cut, addAsync } = this.props

    return (
      <div>
        <div>{`数值为${num}`}</div>
        <button onClick={() => add()}>增加</button>
        <button onClick={() => cut()}>减少</button>
        <button onClick={() => addAsync()}>延迟2s增加</button>
      </div> 
    )
  }
}

App = connect(
  // 你需要那些状态
  (state) => {
    return { num: state }
  },
  // 你需要那些方法
  { add, cut, addAsync }
)(App)

export default App