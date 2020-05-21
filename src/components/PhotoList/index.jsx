import React, {useState, useEffect} from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {NavLink} from 'react-router-dom';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ClearIcon from '@material-ui/icons/Clear';
import CircularProgress from '@material-ui/core/CircularProgress';
import {fetching} from '../../functions/fetching';

const PhotoList = (props) => {
    const albumId = parseInt(props.match.params.albumId, 10);

    const [userId, setUserId] = useState(null);
    const [albums, setAlbums] = useState([]);
    const [photos, setPhotos] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectPhoto, setSelectPhoto] = useState(0);

    const [loadingAlbums, setLoadingAlbums] = useState(true);
    const [loadingPhotos, setLoadingPhotos] = useState(true);

    useEffect(() => {
        fetching(`albums/${albumId}/photos`).then(photos => {
            setPhotos(photos);
            setLoadingPhotos(false);
        })
    }, [albumId]);

    useEffect(() => {
        fetching(`albums/${albumId}`).then(albums => {
            setAlbums(albums);
            setLoadingAlbums(false);
            if (albums) {
                setUserId(albums.userId);
            }
        })
    }, [albumId]);

    const changeSelectPhoto = (changer) => {
        setSelectPhoto(selectPhoto + changer);
    }

    const photosElements = photos.map((photo, index) => (
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
    ))

    return (
        <>
            <NavLink to={`/albums/${userId}`}>
                <Button variant="contained" startIcon={<ArrowBackIcon/>} style={{marginTop: '10px'}}>Albums</Button>
            </NavLink>
            <h1>Photos</h1>
            {(loadingAlbums || loadingPhotos)
                ? <CircularProgress/>
                : <GridList cellHeight={180}>
                    {photosElements}
                </GridList>
            }
            {open &&
            <div className="modal">
                <div className="modal-body">
                    <img src={photos[selectPhoto].url} style={{maxWidth: '100%', maxHeight: '75vh'}} alt=""/>
                    <p>{photos[selectPhoto].title}</p>
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
                                disabled={selectPhoto >= (photos.length - 1)}
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
