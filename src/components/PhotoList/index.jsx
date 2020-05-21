import React, {useState, useEffect} from "react";
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Button from "@material-ui/core/Button";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import {NavLink} from "react-router-dom";
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ClearIcon from '@material-ui/icons/Clear';
import CircularProgress from "@material-ui/core/CircularProgress";
import Skeleton from '@material-ui/lab/Skeleton';

const PhotoList = (props) => {
    const albumId = parseInt(props.match.params.albumId, 10);

    const [albums, setAlbums] = useState([]);
    const [photos, setPhotos] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectPhoto, setSelectPhoto] = useState(0);

    const [loadingAlbums, setLoadingAlbums] = useState(true);
    const [loadingPhotos, setLoadingPhotos] = useState(true);
    const [loadingModalPhotos, setLoadingModalPhotos] = useState(false);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/photos')
            .then(response => response.json())
            .then(photos => {
                setPhotos(photos);
                setLoadingPhotos(false);
            })
    }, []);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/albums')
            .then(response => response.json())
            .then(albums => {
                setAlbums(albums);
                setLoadingAlbums(false);
            })
    }, []);

    let userId = albums[albumId - 1];

    if (userId) {
        userId = albums[albumId - 1].userId;
    }

    const albumPhotos = photos.filter(photo => photo.albumId === albumId);

    const changeSelectPhoto = (changer) => {
        setLoadingModalPhotos(true);
        setSelectPhoto(selectPhoto + changer);
        const img = new Image();
        img.src = albumPhotos[selectPhoto].url;
        img.onload = () => {
            setLoadingModalPhotos(false);
        }
    }

    return (
        <>
            <NavLink to={`/albums/${userId}`}>
                <Button variant="contained" startIcon={<ArrowBackIcon/>} style={{marginTop: '10px'}}>Albums</Button>
            </NavLink>
            <h1>Photos</h1>
            {(loadingAlbums || loadingPhotos) && <CircularProgress />}
            <GridList cellHeight={180}>
                {albumPhotos.map((photo, index) => (
                    <GridListTile
                        key={photo.id}
                        style={{boxSizing: 'content-box', width: '150px', height: '150px', cursor: 'pointer'}}
                        onClick={() => {
                            setOpen(true);
                            setSelectPhoto(index);
                        }}
                    >
                        <img src={photo.thumbnailUrl} alt={photo.title}/>
                        <GridListTileBar
                            title={photo.title}
                        />
                    </GridListTile>
                ))}
            </GridList>
            {open &&
            <div className="modal">
                <div className="modal-body">
                    {loadingModalPhotos
                        ? <Skeleton variant="rect" style={{height: '100%', width: '100%'}} />
                        : <img src={albumPhotos[selectPhoto].url} style={{maxWidth: '100%', maxHeight: '75vh'}} alt=""/>
                    }
                    <p>{albumPhotos[selectPhoto].title}</p>
                    <div className="modal-footer">
                        <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                            <Button
                                startIcon={<ArrowBackIosIcon/>}
                                disabled={selectPhoto < 1}
                                onClick={() => changeSelectPhoto( -1)}
                            >
                                Prev
                            </Button>
                            <Button
                                endIcon={<ArrowForwardIosIcon/>}
                                disabled={selectPhoto >= (albumPhotos.length - 1)}
                                onClick={() => changeSelectPhoto(1)}
                            >
                                Next
                            </Button>
                        </ButtonGroup>
                        <Button
                            variant="contained"
                            color="secondary"
                            startIcon={<ClearIcon/>}
                            onClick={() => setOpen(false)}
                        >
                            Close
                        </Button>
                    </div>
                </div>
            </div>
            }
        </>
    );
}

export default PhotoList;
