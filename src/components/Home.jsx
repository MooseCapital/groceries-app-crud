import {useContext, useEffect, useState, useRef} from 'react'
import React from 'react'
import {AppContext} from "./AppContextProvider.jsx";
import {persistAxiosData} from "./persistAxiosData.jsx";
import Button from "@mui/joy/Button";

function Home(props) {

    // const {persistComp, setPersistComp, updateData} = persistAxiosData('/groceries/getall')

    const context = useContext(AppContext)
    return (
        <>
            <div className={'text-3xl font-bold underline'}>Home page</div>
            <Button onClick={() => context.setColorMode(prevState => 'dark-mode')}
                variant="soft"
                size="md"
                color="primary"
                aria-label="Explore Bahamas Islands"
                sx={{ml: 'auto', alignSelf: 'center', fontWeight: 600}}
            >make mode dark</Button>
            <Button onClick={() => context.setColorMode(prevState => 'light-mode')}
          variant="soft"
          size="md"
          color="primary"
          aria-label="Explore Bahamas Islands"
          sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600 }}
        >make mode light</Button>
                <p>{`current state: ${context.colorMode}`}</p>
            </>
            )
            }

            export default Home
