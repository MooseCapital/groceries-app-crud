import {useContext, useEffect, useState, useRef} from 'react'
import React from 'react'
import {AppContext} from "./AppContextProvider.jsx";
function Home(props) {

const context = useContext(AppContext)
    return (
        <>
            <div  className={'text-3xl font-bold underline'}>Home page</div>
            <button className={"test-btn"} onClick={() => context.setColorMode(prevState => 'light-mode')}>make mode light </button>
            <button className={"test-btn"} onClick={() => context.setColorMode(prevState => 'dark-mode')}>make mode dark</button>
            <p>{`current state: ${context.colorMode}`}</p>
        </>
    )
}

export default Home
