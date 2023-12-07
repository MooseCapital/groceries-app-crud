import {useContext, useEffect, useState, useRef} from 'react'
import React from 'react'
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import BasicCard from "./BasicCard.jsx";
import Typography from "@mui/joy/Typography";
import {persistAxiosData} from "./persistAxiosData.jsx";
import axios from "axios";
import {nanoid} from "nanoid";

function Example(props) {

    const {persistComp, setPersistComp, updateData} = persistAxiosData('/groceries/getall')


    async function addStockUpdate(cardId) {
        // setAddBtnLoad((prev) => true)
        setPersistComp(prevState => ({
            ...prevState,
            fetchData: prevState.fetchData.map(async (item, index) => {
                if (item?.id === cardId) {
                    let res = await axios.put(`${import.meta.env.VITE_API_LINK}/groceries/addstock/${item?.id}`);
                    console.log(res.data[0])
                    // setAddBtnLoad((prev) => false)
                    // console.log(addBtnLoad)
                    return res?.data[0]
                }
                return {...item}
            })
        }))
    }

    async function addStock(cardId) {
        const updatedItems = await Promise.all(
            persistComp.fetchData.map(async (item) => {
                if (item?.id === cardId) {
                    let res = await axios.put(`${import.meta.env.VITE_API_LINK}/groceries/addstock/${item?.id}`);
                    console.log(res.data[0]);
                    return res?.data[0];
                }
                return {...item}
            })
        );
        setPersistComp(prevState => ({
            ...prevState,
            fetchData: updatedItems
        }));
    }

    async function removeStock(cardId) {
        const updatedItems = await Promise.all(
            persistComp.fetchData.map(async (item) => {
                if (item?.id === cardId) {
                    let res = await axios.put(`${import.meta.env.VITE_API_LINK}/groceries/removestock/${item?.id}`);
                    console.log(res.data[0]);
                    return res?.data[0];
                }
                return {...item}
            })
        );
        setPersistComp(prevState => ({
            ...prevState,
            fetchData: updatedItems
        }));
    }



    function GroceryCards() {
        return (
            <>
                {persistComp?.fetchData?.map((item, index) => {
                    return <BasicCard id={item?.id} name={item?.name} price={item?.price}
                                      stock={item?.stock} category_id={item?.category_id}
                                      image_url={item?.image_url} date_time={item?.date_time} key={index}
                                      addStock={() => addStock(item?.id)}
                                      removeStock={() => removeStock(item?.id)} loading={persistComp.loading}
                    />
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
                           style={{maxWidth: '10rem', margin: '0 1rem'}}/>
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