import React, {useState, useEffect} from "react";
import UserItem from "../UserItem";
import {fetching} from '../../functions/fetching';

const UsersList = () => {
    const [users, setUsers] = useState([]);
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        fetching('users').then(users => {
            setUsers(users);
        })
    }, []);

    useEffect(() => {
        fetching('albums').then(albums => {
            setAlbums(albums);
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
            {usersElements}
        </>
    );
}

export default UsersList;