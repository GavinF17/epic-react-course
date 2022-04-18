// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
import {useEffect, useState} from 'react'
// 🐨 you'll want the following additional things from '../pokemon':
// fetchPokemon: the function we call to get the pokemon info
// PokemonInfoFallback: the thing we show while we're loading the pokemon info
// PokemonDataView: the stuff we use to display the pokemon info
import {fetchPokemon, PokemonDataView, PokemonForm, PokemonInfoFallback} from '../pokemon'
import {ErrorBoundary} from 'react-error-boundary'

function PokemonInfo({pokemonName}) {
  // const [pokemon, setPokemon] = useState(null)
  // const [error, setError] = useState(null)
  // const [status, setStatus] = useState('idle')
  //
  // useEffect(() => {
  //   if (!pokemonName) return
  //
  //   setPokemon(null)
  //   setError(null)
  //   setStatus('pending')
  //   fetchPokemon(pokemonName)
  //     .then(data => {
  //       setPokemon(data)
  //       setStatus('resolved')
  //     })
  //     .catch(err => {
  //       setError(err)
  //       setStatus('rejected')
  //     })
  // }, [pokemonName])

  const [{status, pokemon, error}, setState] = useState({status: 'idle'})

  useEffect(() => {
    if (!pokemonName) return

    setState({status: 'pending'})
    fetchPokemon(pokemonName)
      .then(data => {
        setState({status: 'resolved', pokemon: data})
      })
      .catch(err => {
        setState({status: 'rejected', error: err})
      })
  }, [pokemonName])


  switch (status) {
    case 'idle':
      return 'Submit a pokemon'
    case 'pending':
      return <PokemonInfoFallback name={pokemonName} />
    case 'resolved':
      return <PokemonDataView pokemon={pokemon} />
    case 'rejected':
      throw error
    // return (
    //   <div role='alert'>
    //     There was an error: <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
    //   </div>
    // )
    default:
      return <></>
  }
}

// class ErrorBoundary extends React.Component {
//   constructor(props) {
//     super(props)
//
//     this.state = {hasError: false}
//   }
//
//   static getDerivedStateFromError(error) {
//     return {hasError: true}
//   }
//
//   componentDidCatch(error, errorInfo) {
//     console.error(error, errorInfo)
//   }
//
//   render() {
//     return this.state.hasError
//       ? <h1>An error has occurred</h1>
//       : this.props.children
//   }
// }

const Fallback = ({resetErrorBoundary}) => (
  <h1>
    An error has occurred
    <button onClick={resetErrorBoundary}>Retry</button>
  </h1>
)

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className='pokemon-info-app'>
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className='pokemon-info'>
        {/*<ErrorBoundary FallbackComponent={Fallback} onReset={() => setPokemonName('')}>*/}
        <ErrorBoundary resetKeys={[pokemonName]} fallback={<Fallback />} onReset={() => setPokemonName('')}>
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default App
