import React, { Fragment} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import RefreshIcon from '@material-ui/icons/Refresh';
import IconButton from '@material-ui/core/IconButton';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { Typography } from '@material-ui/core';



function Controls() {

    const useStyles = makeStyles(theme => ({
        controls: {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          paddingLeft: theme.spacing(1),
          paddingBottom: theme.spacing(1),
        },
        playIcon: {
          margin: theme.spacing(1),
        },
        input: {
            display: 'none',
          },
          margin: {
            margin: theme.spacing(1),
          },
    }));

    const classes = useStyles();

    const { enqueueSnackbar } = useSnackbar();

    var post_request = (action) => {
        fetch(`http://localhost:8080/${action.url}`, {
            method: 'GET',
        })
        enqueueSnackbar(action.message, {variant: action.variant, autoHideDuration: 2000,});
        // enqueueSnackbar("Network", {variant: action_mapping.stop.variant, autoHideDuration: 2000,});
    }

    const action_mapping = {
        stop: {
            url: "stop",
            message: "Force stopped the stream.",
            variant: "error"
        },
        start: {
            url: "start",
            message: "Started the stream.",
            variant: "success"
        },
        refresh: {
            url: "refresh",
            message: "The stream has been refreshed.",
            variant: "info"
        }
    }

    return (
        <Fragment>
            <Typography variant="h6" component="h2" align="center">
                Recording Controls
            </Typography>
            <div className={classes.controls}>
                <IconButton id="force_stop" title="Force Stop" onClick={() => {post_request(action_mapping.stop)}}>
                    <NotInterestedIcon className={classes.playIcon} />
                </IconButton>
                <IconButton id="play" title="Start Stream"  onClick={() => {post_request(action_mapping.start)}}>
                    <PlayArrowIcon className={classes.playIcon} />
                </IconButton>
                <IconButton id="refresh" title="Refresh"  onClick={() => {post_request(action_mapping.refresh)}}>
                    <RefreshIcon className={classes.playIcon} />
                </IconButton>
            </div>
        </Fragment>
    )
}

export default function ControlPanel() {
    return(
        <SnackbarProvider maxSnack={3}>
            <Controls />
        </SnackbarProvider>
    )
}
