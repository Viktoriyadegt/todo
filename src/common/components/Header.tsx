import React from 'react';
import {AppBar, IconButton, Switch, Toolbar} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {MenuButton} from "./MenuButton";
import {usAppDispatch, usAppSelector} from "../../app/hooks";
import {getTheme} from "../theme/getTheme";
import {selectThemeMode} from "../../features/todolists/model/app-selector";
import {changeThemeModeAC} from "../../features/todolists/model/app-reducer";

export const Header = () => {

    const dispatch = usAppDispatch()
    const themeMode = usAppSelector(selectThemeMode)

    const theme = getTheme(themeMode)

    const changeModeHandler = () => {
        dispatch(changeThemeModeAC(themeMode == 'light' ? 'dark' : 'light'))
    }

    return (
        <AppBar position={'static'} sx={{mb: '30px'}}>
            <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
                <IconButton color="inherit">
                    <Menu/>
                </IconButton>
                <div>
                    <MenuButton>Login</MenuButton>
                    <MenuButton>Logout</MenuButton>
                    <MenuButton background={theme.palette.primary.dark}>Faq</MenuButton>
                    <Switch color={'default'} onChange={changeModeHandler}/>
                </div>
            </Toolbar>
        </AppBar>
    );
};

