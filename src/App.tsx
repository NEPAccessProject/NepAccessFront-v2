import { BrowserRouter } from 'react-router-dom';
import { Button, CssBaseline } from '@mui/material';
import Routing from './routes/Routing';
import React from 'react';
import {Paper,Box,Typography} from '@mui/material';

enum ROLE {
    ADMIN = 'ADMIN',
    EDITOR = 'EDITOR',
    OTHER = 'OTHER'
}

type UserType = {
    username: string;
    password: string;
    role: ROLE;
    loggedIn: boolean;
}
export type UserContextType = {
    user: UserType
}
 

const UserContext = React.createContext<UserContextType>({
    user: {
        username: '',
        password: '',
        role: ROLE.OTHER,
        loggedIn: false
    }
});

const value = {
    user: {
        username: 'admin',
        password: 'admin',
        role: ROLE.ADMIN,
        loggedIn: true
    }
}

const App = () => {
  return (
          <BrowserRouter>
            <CssBaseline />
            <UserContext.Provider value={value}><Routing /></UserContext.Provider>
          </BrowserRouter>
  );
};

export default App;
