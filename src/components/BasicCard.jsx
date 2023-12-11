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
import {LazyLoadImage} from 'react-lazy-load-image-component';
// import 'react-lazy-load-image-component/src/effects/blur.css';
// import BookmarkAdd from '@mui/icons-material/BookmarkAddOutlined';

export const BasicCard = React.memo( function BasicCard(props) {

    // const [localStock, setLocalStock] = useState(props?.stock)


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
                        {props?.stock} in stock
                    </Skeleton>
                </Typography>
                {/* <Divider orientation="vertical" /> */}
            </CardContent>

            <AspectRatio minHeight="120px" maxHeight="200px" variant={'plain'} objectFit={'contain'}>

                {props?.loading
                    ? <Skeleton variant="rectangular" width="100%" height="100%"/>
                    // : <img src={props?.image_url} alt="" loading="lazy"/>
                    : <LazyLoadImage src={props?.image_url} alt=""  />
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
                    onClick={props?.removeStock}
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
                    onClick={props?.addStock}
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
})
