import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

const ActionAreaCard = ({ chars }) => {
  return (
    <Card sx={{ maxWidth: 300, minHeight: 250 }} title="Click to know more">
      <CardActionArea>
        <CardMedia
          component="img"
          height="180"
          image={chars.image}
          alt={chars.name}
        />
        <CardContent>
          <Typography gutterBottom fontSize="18px" component="div">
            {chars.name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ActionAreaCard;
