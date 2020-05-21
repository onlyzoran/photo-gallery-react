import React, {useState, useEffect} from "react";
import AlbumItem from "../AlbumItem";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {NavLink} from "react-router-dom";
import {fetching} from '../../functions/fetching';
import CircularProgress from "@material-ui/core/CircularProgress";

const AlbumsList = (props) => {
    const userId = parseInt(props.match.params.userId, 10);

    const [albums, setAlbums] = useState([]);
    const [photos, setPhotos] = useState([]);

    const [loadingAlbums, setLoadingAlbums] = useState(true);

    useEffect(() => {
        fetching('photos').then(photos => {
            setPhotos(photos);
        })
    }, []);

    useEffect(() => {
        fetching('albums').then(albums => {
            setAlbums(albums);
            setLoadingAlbums(false);
        })
    }, []);

    const albumsElements = albums.filter(album => album.userId === userId).map(album => {
        const albumPhotos = photos.filter(photo => photo.albumId === album.id);
        let cardBackground = albumPhotos[0];

        if (cardBackground) {
            cardBackground = cardBackground.url;
        }

        return (
            <Grid key={album.id} item xs={12} sm={4}>
                <AlbumItem
                    id={album.id}
                    title={album.title}
                    background={cardBackground}
                    photosCount={albumPhotos.length}
                />
            </Grid>
        )
    });

    return (
        <>
            <NavLink to={`/users`}>
                <Button variant="contained" startIcon={<ArrowBackIcon/>} style={{marginTop: '10px'}}>Users</Button>
            </NavLink>
            <h1>Albums</h1>
            {loadingAlbums
                ? <CircularProgress/>
                : <Grid container spacing={3}>
                    {albumsElements}
                </Grid>
            }
        </>
    );
}

export default AlbumsList;
