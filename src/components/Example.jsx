import {useContext, useEffect, useState, useRef} from 'react'
import React from 'react'
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import BasicCard from "./BasicCard.jsx";

function Example(props) {



    return (
        <>
            <div className="example-holder">
                <div className="user-input">
                    <Input placeholder={'search..'} color={"neutral"} size="sm" variant={"soft"} width={'100'}
                           style={{maxWidth: '10rem'}}/>
                    <Button onClick={function () {
                    }} variant="outlined" color={"neutral"} style={{margin:'0 1rem'}}>Search</Button>
                </div>
                <div className="card-container">
                <BasicCard/>

                </div>
            </div>
        </>
    )
}

export {Example}
