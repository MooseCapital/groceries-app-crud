import {useContext, useEffect, useState, useRef} from 'react'
import React from 'react'
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import BasicCard from "./BasicCard.jsx";
import Typography from "@mui/joy/Typography";
import {persistAxiosData} from "./persistAxiosData.jsx";

function Example(props) {

const {persistComp, setPersistComp, updateData} = persistAxiosData('/groceries/getall')
    console.log(persistComp.fetchData
    )
    //remember we must set our data locally first, we do this by mapping over setPersistComp or update function
        //check if the id matches the one from the BasicCard we click, if they do, then do our update code
    function updateAddStock(div) {
        console.log(div)
        setPersistComp(prevState => ({
            ...prevState,
            fetchRan: false,
            loading:true,
            fetchData: prevState.fetchData.map((item,index) => {
            //update call api, since we have item id right here
                if (item?.id === div.id) {
                    
                }
                return div.id === item?.id ? {...item, stock: item.stock += 1 
                    //where items id matches, we update the code.
                } : false
            })
        }))
    }



    function GroceryCards() {
        return (
            <>
                {persistComp?.fetchData?.map((item,index) => {
                   return <BasicCard id={item?.id} name={item?.name} price={item?.price}
                    stock={item?.stock} category_id={item?.category_id}
                    image_url={item?.image_url} date_time={item?.date_time} key={item?.id} />
                })}
            </>
        )
    }

    return (
        <>
            <div className="example-holder">
                <div className="user-input">
                    <Typography fontSize="lg" fontWeight="lg">
                        Search for groceries:
                    </Typography>
                    <Input placeholder={'search..'} color={"neutral"} size="sm" variant={"soft"} width={'100'}
                           style={{maxWidth: '10rem', margin:'0 1rem'}}/>
                    <Button onClick={function () {
                    }} variant="outlined" color={"neutral"} style={{marginRight: '1rem'}}>Search</Button>
                </div>
                <div className="card-container">
                   <GroceryCards/>

                </div>
            </div>
        </>
    )
}

export {Example}
