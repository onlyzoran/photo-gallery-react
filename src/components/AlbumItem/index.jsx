import React from "react";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import {NavLink} from "react-router-dom";

const AlbumItem = ({id, title, background, photosCount}) => {
    return (
        <Card style={{maxWidth: '345px'}}>
            <CardMedia
                component="img"
                style={{height: '140px'}}
                image={background}
                title={title}
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {title}
                </Typography>
            </CardContent>
            <CardActions>
                <NavLink to={`/photos/${id}`}>
                    <Button size="small" color="primary">
                        {photosCount} photos
                    </Button>
                </NavLink>
            </CardActions>
        </Card>
    );
}

export default AlbumItem;