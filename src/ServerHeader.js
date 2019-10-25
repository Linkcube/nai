/*
 * Stays at the top of the page and displays the server's name, as well as several other stats
 */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { ServerTitle, AudioSpec, Listeners} from './ServerData';
import { Typography } from '@material-ui/core';
import ServerSettingsDialogue from './ServerSettingsDialogue';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    position: 'fixed',
    width: '100%',
    top: 0,
  },
  menuButton: {
    marginRight: theme.spacing(0),
  },
  title: {
      flex: 1,
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
  },
  audioSpec: {
      flex: 1,
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
  },
  listeners: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
  }

}));


export default function ServerHeader() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense">
            <Typography
                variant="h6"
                color="inherit"
                className={classes.title}
            >
                <ServerTitle />
            </Typography>
            <Typography
                variant="h6"
                color="inherit"
                className={classes.audioSpec}
            >
                <AudioSpec />
            </Typography>
            <Typography
                variant="h6"
                color="inherit"
                className={classes.listeners}
            >
                <Listeners />
            </Typography>
            <ServerSettingsDialogue />
        </Toolbar>
        {/* {renderMenu} */}
      </AppBar>
    </div>
  );
}