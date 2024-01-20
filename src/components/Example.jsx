import {useContext, useEffect, useState, useRef} from 'react'
import React from 'react'
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import BasicCard from "./BasicCard.jsx";
import Typography from "@mui/joy/Typography";
import {persistAxiosData} from "./persistAxiosData.jsx";
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function Example(props) {

    const [persistComp, setPersistComp] = useState(JSON.parse(sessionStorage.getItem("PersistComp")) || {
        fetchData: null,
        loading: true,
        fetchRan: false,
    });

    useEffect(() => {
        sessionStorage.setItem("PersistComp", JSON.stringify(persistComp))
        return () => {
        }
    }, [persistComp.fetchData])


    const [inputValue, setInputValue] = useState('');
    const [timer, setTimer] = useState(null);

    const handleChange = async (event) => {
        clearTimeout(timer); // clear the timer if it's running
        setPersistComp(prevState => {
            return {...prevState, loading: true}
        })
        setInputValue(prevState => event.target.value);

    };

    useEffect(() => {

        async function getAllGroceries() {
            let res = await axios.get(`${import.meta.env.VITE_API_LINK}/api/groceries/`)
            console.log(res)
            setPersistComp(prevState => {
                return {
                    ...prevState,
                    loading: false,
                    fetchRan: true,
                    fetchData: res.data
                }
            })
            return;
        }

        if (inputValue === '') {
            getAllGroceries()
        } //set card state to default
        if (inputValue !== '' && persistComp.fetchRan) {
            const delayDebounceFn = setTimeout(async () => {
                try {
                    console.log(inputValue);
                    let res = await axios.get(`${import.meta.env.VITE_API_LINK}/api/groceries/?filter[name]=${inputValue}`);
                    console.log(res)

                    setPersistComp(prevState => {

                        return {
                            ...prevState,
                            loading: false,
                            fetchData: res.data
                        }

                    })
                }
                catch (e) {
                    console.log(e);  // Cold catch, prints whatever error is

                    if (e?.response?.status === 429) { // 429 status code received
                        console.log('429 error test')

                        toast.error('You are doing that too much, wait a minute and try again', {
                            position: "top-right",
                            autoClose: 7000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                    }
                }
            }, 500) // Will execute after a 2 seconds delay if no new input occurs
        setTimer(delayDebounceFn);
        }


        // Cleanup function: if the user types something new, we clear the timer
        return () => clearTimeout(timer);
    }, [inputValue])

    function GroceryCards() {
        return (
            <>
                {persistComp?.fetchData?.map((item, index) => {
                    return <BasicCard id={item?.id} name={item?.name} price={item?.price}
                                      stock={item?.stock} category_id={item?.category_id}
                                      image_url={item?.image_url} date_time={item?.date_time} key={index}
                                      loading={persistComp.loading}
                    />
                })}
                <ToastContainer/>
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
                           style={{maxWidth: '10rem', margin: '0 1rem'}}
                           onChange={handleChange} value={inputValue}
                    />
                    {/* <Button onClick={() => console.log(typeof inputValue)} variant="outlined" color={"neutral"} */}
                    {/*         style={{marginRight: '1rem'}}>Search</Button> */}
                </div>
                <div className="card-container">
                    <GroceryCards/>

                </div>
            </div>
        </>
    )
}

export {Example}
