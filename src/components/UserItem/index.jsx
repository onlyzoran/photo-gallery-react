import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import {NavLink} from "react-router-dom";

const UserItem = ({id, name, username, albumsCount}) => {
    return (
        <NavLink key={id} to={`/albums/${id}`}>
            <ListItem>
                <ListItemAvatar>
                    <Avatar>{username.charAt(0)}</Avatar>
                </ListItemAvatar>
                <ListItemText primary={username} secondary={`Full name: ${name} | Albums: ${albumsCount}`} />
            </ListItem>
        </NavLink>
    );
}

export default UserItem;