import React from 'react';
import PhotoList from './components/PhotoList'
import {BrowserRouter, Route} from 'react-router-dom';
import AlbumsList from "./components/AlbumsList";
import Container from '@material-ui/core/Container';
import UsersList from './components/UsersList';

function App() {
    return (
        <Container>
            <BrowserRouter>
                <Route path='/users' component={UsersList}/>
                <Route path='/albums/:userId?' component={AlbumsList} />
                <Route path='/photos/:albumId?' component={PhotoList} />
            </BrowserRouter>
        </Container>
    );
}

export default App;
