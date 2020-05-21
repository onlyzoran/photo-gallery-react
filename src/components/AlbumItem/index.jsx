import React, {useState} from "react";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import {NavLink} from "react-router-dom";
import LinearProgress from "@material-ui/core/LinearProgress";

const AlbumItem = ({id, title, background, photosCount}) => {
    const [loading, setLoading] = useState(true);

    const img = new Image();
    img.src = background;
    img.onload = () => {
        setLoading(false);
    }

    return (
        <Card style={{maxWidth: '345px'}}>
            {loading
                ? <LinearProgress variant="query" />
                : <CardMedia
                    component="img"
                    style={{height: '140px'}}
                    image={background}
                    title={title}
                />
            }
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
