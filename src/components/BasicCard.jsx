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

// import BookmarkAdd from '@mui/icons-material/BookmarkAddOutlined';

export default function BasicCard(props) {

    const [addBtnLoad, setAddBtnLoad] = useState(false);
    const [removeBtnLoad, setRemoveBtnLoad] = useState(false)

  return (
    <Card sx={{ maxWidth: 350 }}>

        <CardContent orientation="horizontal">
        <Typography level="title-lg"  >{props?.name}</Typography>
          <Typography level="body-xs" fontWeight="md" textColor="text.secondary" style={{alignSelf:'center', marginLeft:'auto'}}>
              {props?.stock} in stock
          </Typography >
          {/* <Divider orientation="vertical" /> */}
        </CardContent>

      <AspectRatio minHeight="120px" maxHeight="200px" variant={'plain'}  objectFit={'contain'}>
        <img
          // src="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286"
          src={`${props?.image_url}`}
          loading="lazy"
          alt=""
        />
      </AspectRatio>
      <CardContent orientation="horizontal">
        <div>
          <Typography level="body-xs">price:</Typography>
          <Typography fontSize="lg" fontWeight="lg">
            ${props?.price}
          </Typography>
        </div>
        <Button
          variant="soft"
          size="md"
          color="primary"
          aria-label="Explore Bahamas Islands"
          sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600 }}
          loading={removeBtnLoad}
        >
          Remove
        </Button>
        <Button
          variant="soft"
          size="md"
          color="primary"
          aria-label="Explore Bahamas Islands"
          sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600 }}
            loading={addBtnLoad}
        >
          Add
        </Button>
      </CardContent>

    </Card>
  );
}
