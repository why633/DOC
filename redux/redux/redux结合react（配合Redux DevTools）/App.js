import React, { Component } from 'react'

class App extends Component {
  addFun () {
    
  }

  render () {
    const { store, add, cut, addAsync } = this.props
    const num = store.getState()

    return (
      <div>
        <div>{`数值为${num}`}</div>
        <button onClick={() => store.dispatch(add())}>增加</button>
        <button onClick={() => store.dispatch(cut())}>减少</button>
        <button onClick={() => store.dispatch(addAsync())}>延迟2s增加</button>
      </div> 
    )
  }
}

export default App