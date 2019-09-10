const ADD = '加'
const CUT = '减'

// reducer

export function counter (state = 0, action) {
  switch (action.type) {
    case ADD:
      return ++state
    case CUT:
      return --state
    default:
      return 10    
  }
}

// action

export function add () {
  return { type: ADD }
}

export function cut () {
  return { type: CUT }
}

// action（异步）

export function addAsync () {
  return dispatch => {
    setTimeout(() => {
      dispatch({ type: ADD })
    }, 2000)
  }
}