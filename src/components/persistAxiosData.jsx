import {useContext, useEffect, useState, useRef} from 'react'
import React from 'react'
import axios from "axios";

function persistAxiosData(apiLink) {

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

    //we would make fetchRan false, to fetch the database again, which makes no sense, because when we update our data
    //from initial fetch data, we updated the state and sessionStorage, there's no need to call the database after initial call!
    //if we don't trust the user has sessionStorage enabled, we fetch each time with cache, and on refresh, state management
    //like react-query persist it between refresh and comp unmounts
    function updateData(dataArg) {
        console.log(dataArg)
        setPersistComp(prevState => ({
            ...prevState,
            fetchRan: false,
            fetchData: dataArg,
        }))
    }

    useEffect(() => {
        const abortController = new AbortController()
        try {
            if (!persistComp.fetchRan) {

                async function getAxiosData() {
                    let res = await axios.get(`${import.meta.env.VITE_API_LINK}${apiLink}`, {
                        signal: abortController.signal
                    });
                    let data = await res.data;
                    if (data === undefined) {
                        return
                    }
                    console.log(data)
                    // console.log(typeof data[0]?.price)
                    setPersistComp(prevState => ({
                        ...prevState,
                        loading: false,
                        fetchData: data
                    }))
                }

                getAxiosData()
                setPersistComp(prevState => ({...prevState, fetchRan: true}))
            }
        }
        catch (e) {
            console.log(e)
        }
        return () => {
            console.log("clean up function")
            abortController.abort()
        }
    }, [])

    axios.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.code === "ERR_CANCELED") {
                console.error('request canceled')
                return Promise.resolve({status: 499})
            }
            return Promise.reject((error.response && error.response.data) || 'Error')
        }
    );

    return {persistComp, setPersistComp, updateData}
}

export {persistAxiosData}


