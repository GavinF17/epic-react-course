// useContext: simple Counter
// http://localhost:3000/isolated/exercise/03.js

import * as React from 'react'
import {useContext, useState} from 'react'

// 🐨 create your CountContext here with React.createContext

const CountContext = React.createContext()

// 🐨 create a CountProvider component here that does this:
//   🐨 get the count state and setCount updater with React.useState
//   🐨 create a `value` array with count and setCount
//   🐨 return your context provider with the value assigned to that array and forward all the other props
//   💰 more specifically, we need the children prop forwarded to the context provider

function CountProvider({initialCount, children}) {
  const [count, setCount] = useState(initialCount || 0)
  const value = [count, setCount]

  return (
    <CountContext.Provider value={value}>
      {children}
    </CountContext.Provider>
  )
}

const useCount = () => {
  const context = useContext(CountContext)
  if (!context) {
    throw new Error('useCount must be wrapped in CountProvider')
  }
  return context
}

function CountDisplay() {
  const [count] = useCount()
  return <div>{`The current count is ${count}`}</div>
}

function Counter() {
  // 🐨 get the setCount from useContext with the CountContext
  const [, setCount] = useCount()
  const increment = () => setCount(c => c + 1)
  return <button onClick={increment}>Increment count</button>
}

function App() {
  return (
    <CountProvider>
      {/*
        🐨 wrap these two components in the CountProvider so they can access
        the CountContext value
      */}
      <CountDisplay />
      <Counter />
    </CountProvider>
  )
}

export default App
