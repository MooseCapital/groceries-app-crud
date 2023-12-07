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

// import BookmarkAdd from '@mui/icons-material/BookmarkAddOutlined';

export default function BasicCard(props) {

    const [addBtnLoad, setAddBtnLoad] = useState(false)
    const [removeBtnLoad, setRemoveBtnLoad] = useState(false)
    const [localStock, setLocalStock] = useState(props?.stock)

    async function addStock(cardId) {
        setAddBtnLoad((prevState) => true)
        let res = await axios.put(`${import.meta.env.VITE_API_LINK}/groceries/addstock/${props?.id}`);
        console.log(res.data[0])
        setLocalStock((prevState) => prevState + 1)
        setAddBtnLoad((prevState) => false)
    }

    async function removeStock(cardId) {
        setRemoveBtnLoad(prevState => true)
        let res = await axios.put(`${import.meta.env.VITE_API_LINK}/groceries/removestock/${props?.id}`);
        console.log(res.data[0])
        setLocalStock((prevState) => prevState - 1)
        setRemoveBtnLoad(prevState => false)
    }

    return (
        <Card sx={{maxWidth: 350}}>
            <CardContent orientation="horizontal">

                <Typography level="title-lg">
                <Skeleton loading={props?.loading} >
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
                <Skeleton loading={props?.loading}>
                    <img
                        // src="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286"
                        src={`${props?.image_url}`}
                        loading={`${props?.loading}`}
                        alt=""
                    />
                </Skeleton>
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
                    loading={removeBtnLoad}
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
                    loading={addBtnLoad}
                >
                    <Skeleton loading={props?.loading}>
                        Add
                    </Skeleton>
                </Button>
            </CardContent>
        </Card>
    );
}
