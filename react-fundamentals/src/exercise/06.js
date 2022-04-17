// Basic Forms
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
import {useRef, useState} from "react";

function UsernameForm({onSubmitUsername}) {
    // 🐨 add a submit event handler here (`handleSubmit`).
    // 💰 Make sure to accept the `event` as an argument and call
    // `event.preventDefault()` to prevent the default behavior of form submit
    // events (which refreshes the page).
    // 📜 https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault

    // const handleSubmit = (event) => {
    //     event.preventDefault()
    //     onSubmitUsername(event.target.elements.username.value)
    // }

    // const usernameRef = useRef()
    // const handleSubmit = (event) => {
    //     event.preventDefault()
    //     onSubmitUsername(usernameRef.current.value)
    // }
    //
    // const [error, setError] = useState()
    // const handleChange = (event) => {
    //     event.preventDefault()
    //     const value = event.target.value
    //     const isValid = value === value.toLowerCase()
    //     console.log(value)
    //     setError(isValid ? null : 'Username must be lower case')
    // }

    const [username, setUsername] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
        onSubmitUsername(username)
    }

    const handleChange = (event) => {
        event.preventDefault()
        setUsername(event.target.value.toLowerCase())
    }

    // 🐨 get the value from the username input (using whichever method
    // you prefer from the options mentioned in the instructions)
    // 💰 For example: event.target.elements[0].value
    // 🐨 Call `onSubmitUsername` with the value of the input

    // 🐨 add the onSubmit handler to the <form> below

    // 🐨 make sure to associate the label to the input.
    // to do so, set the value of 'htmlFor' prop of the label to the id of input
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username">Username:</label>
                {/*<input name="username" type="text"/>*/}
                {/*<input name="username" type="text" ref={usernameRef}/>*/}

                {/*<input disabled={error} name="username" type="text" ref={usernameRef} onChange={handleChange}/>*/}
                {/*{error && <div role="alert">{error}</div>}*/}

                <input name="username" type="text" onChange={handleChange} value={username}/>
            </div>
            <button type="submit">Submit</button>
        </form>
    )
}

function App() {
    const onSubmitUsername = username => alert(`You entered: ${username}`)
    return <UsernameForm onSubmitUsername={onSubmitUsername}/>
}

export default App
