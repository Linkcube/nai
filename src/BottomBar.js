/*
 * Base component for the bar on the bottom of the screen, that will contain a progress bar
 * as well as some of the api data.
 */

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import NowPlaying from './NowPlaying'
import SongProgressQuery from './SongProgressBar';
import StreamStatus from './StreamStatus';
import SongTime from './SongTime';
import { Typography } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
    appBar: {
      top: 'auto',
      bottom: 0,
    },
}));


  
export default function BottomAppBar() {
    const classes = useStyles();

    return (
        <React.Fragment>
            <AppBar position="fixed" color="primary" className={classes.appBar}>
                <Toolbar>
                    <Typography
                        variant="h6"
                        color="inherit"
                    >
                        <NowPlaying />
                    </Typography>
                    <SongProgressQuery />
                    <SongTime />
                    <StreamStatus />
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
}
