import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from '@mui/joy/Divider';
import {useState} from "react";
import axios from "axios";
import {Skeleton} from "@mui/joy";
import {toast} from "react-toastify";

// import BookmarkAdd from '@mui/icons-material/BookmarkAddOutlined';

export default function BasicCard(props) {

    const [localStock, setLocalStock] = useState(props?.stock)

    async function addStock(cardId) {

        try {
            let res = await axios.put(`${import.meta.env.VITE_API_LINK}/groceries/addstock/${props?.id}`);
            console.log(res.data[0])
            setLocalStock((prevState) => prevState + 1)

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
    }

    async function removeStock(cardId) {
        try {
            let res = await axios.put(`${import.meta.env.VITE_API_LINK}/groceries/removestock/${props?.id}`);
            console.log(res.data[0])
            setLocalStock((prevState) => prevState - 1)
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
    }

    return (
        <Card sx={{maxWidth: 350}}>
            <CardContent orientation="horizontal">

                <Typography level="title-lg">
                    <Skeleton loading={props?.loading}>
                        {props?.name}
                    </Skeleton>
                </Typography>
                <Typography level="body-xs" fontWeight="md" textColor="text.secondary"
                            style={{alignSelf: 'center', marginLeft: 'auto'}}>
                    <Skeleton loading={props?.loading}>
                        {localStock} in stock
                    </Skeleton>
                </Typography>
                {/* <Divider orientation="vertical" /> */}
            </CardContent>

            <AspectRatio minHeight="120px" maxHeight="200px" variant={'plain'} objectFit={'contain'}>
                {/* <Skeleton loading={props?.loading}>
                    { !props?.loading && <img
                        // src="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286"
                        src={`${props?.image_url}`}
                        loading={`${props?.loading}`}
                        alt=""
                    />}
                </Skeleton> */}
                {props?.loading
                    ? <Skeleton variant="rectangular" width="100%" height="100%"/>
                    : <img src={props?.image_url} alt="" loading="lazy"/>
                }
            </AspectRatio>
            <CardContent orientation="horizontal">
                <div>
                    <Typography level="body-xs">
                        <Skeleton loading={props?.loading}>
                            price:
                        </Skeleton>
                    </Typography>
                    <Typography fontSize="lg" fontWeight="lg">
                        <Skeleton loading={props?.loading}>
                            ${props?.price}
                        </Skeleton>
                    </Typography>
                </div>
                <Button
                    onClick={removeStock}
                    variant="soft"
                    size="md"
                    color="primary"
                    aria-label="Explore Bahamas Islands"
                    sx={{ml: 'auto', alignSelf: 'center', fontWeight: 600}}
                    loading={false}
                >
                    <Skeleton loading={props?.loading}>
                        Remove
                    </Skeleton>
                </Button>
                <Button
                    onClick={addStock}
                    variant="soft"
                    size="md"
                    color="primary"
                    aria-label="Explore Bahamas Islands"
                    sx={{ml: 'auto', alignSelf: 'center', fontWeight: 600}}
                    loading={false}
                >
                    <Skeleton loading={props?.loading}>
                        Add
                    </Skeleton>
                </Button>
            </CardContent>
        </Card>
    );
}
