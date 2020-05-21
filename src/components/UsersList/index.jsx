import React, {useState, useEffect} from 'react';
import UserItem from '../UserItem';
import {fetching} from '../../functions/fetching';
import CircularProgress from '@material-ui/core/CircularProgress';

const UsersList = () => {
    const [users, setUsers] = useState([]);
    const [albums, setAlbums] = useState([]);

    const [loadingUsers, setLoadingUsers] = useState(true);
    const [loadingAlbums, setLoadingAlbums] = useState(true);

    useEffect(() => {
        fetching('users').then(users => {
            setUsers(users);
            setLoadingUsers(false);
        })
    }, []);

    useEffect(() => {
        fetching('albums').then(albums => {
            setAlbums(albums);
            setLoadingAlbums(false);
        })
    }, []);

    const usersElements = users.map(user => {
        const albumsCount = albums.filter(album => album.userId === user.id).length;
        return (
            <UserItem key={user.id} id={user.id} name={user.name} username={user.username} albumsCount={albumsCount}/>
        )
    });

    return (
        <>
            <h1>Users</h1>
            {(loadingUsers || loadingAlbums)
                ? <CircularProgress />
                : usersElements
            }
        </>
    );
}

export default UsersList;
