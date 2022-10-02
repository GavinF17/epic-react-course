// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import * as React from 'react'
import {useEffect, useState} from 'react'

const emptySquares = Array(9).fill(null)

const useLocalStorage = (key, initial) => {
  const [state, setState] = useState(() => JSON.parse(localStorage.getItem(key)) || initial)

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state))
  })

  return [state, setState]
}

function Board({squares, setSquare}) {
  const winner = calculateWinner(squares)
  const next = calculateNextValue(squares)
  const status = calculateStatus(winner, squares, next)

  function selectSquare(square) {
    if (winner || squares[square]) return

    setSquare(square, next)
  }

  function renderSquare(i) {
    return (
      <button className='square' onClick={() => selectSquare(i)}>
        {squares[i]}
      </button>
    )
  }

  return (
    <div>
      <div className='status'>{status}</div>
      <div className='board-row'>
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className='board-row'>
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className='board-row'>
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  )
}

function Game() {
  const [current, setCurrent] = useState(0)
  const [history, setHistory] = useLocalStorage('history', [emptySquares])

  function restart() {
    setCurrent(0)
    setHistory([emptySquares])
  }

  const setSquare = (square, next) => {
    const toUpdate = history[current]
    setHistory(prev => [...prev.slice(0, current + 1), toUpdate.map((c,i) => i === square ? next : c)])
    setCurrent(prevState => prevState + 1)
  }

  const goToHistory = (i) => {
    setCurrent(i)
  }

  return (
    <div className='game'>
      <div className='game-board'>
        <Board squares={history[current]} setSquare={setSquare} />
        <button className='restart' onClick={restart}>
          restart
        </button>
      </div>
      <div className='game-info'>
        {history.map((c, i) => (
          <div key={i}>
            <label>{i + 1}. </label>
            <button disabled={i === current} onClick={() => goToHistory(i)}>
              Go to {i === 0 ? 'game start' : `move #${i}`} {i === current ? '(current)' : ''}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
      ? `Scratch: Cat's game`
      : `Next player: ${nextValue}`
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O'
}

// eslint-disable-next-line no-unused-vars
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

function App() {
  return <Game />
}

export default App
