/*
 * Displays a progress bar with the current time / end time of the api
 */
import React, { Fragment } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const BorderLinearProgress = withStyles({
    root: {
      height: 10,
      backgroundColor: '#dff3ff',
    },
    bar: {
      borderRadius: 20,
      backgroundColor: '#3c8bff',
    },
})(LinearProgress);

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    margin: {
      margin: theme.spacing(1),
    },
}));

const query_np = gql`
query {
    api {
        start_time,
        end_time,
        current_time
    }
}`;


const SongProgressQuery = ()  => {
    const classes = useStyles();
    return (
        <Fragment>
            <Query query={query_np} pollInterval={5000}>
                {({loading, error, data, startPolling, stopPolling}) => {
                    if (loading) return (
                        <div className={classes.root}>
                            <BorderLinearProgress
                                className={classes.margin}
                                variant="determinate"
                                color="secondary"
                                value={0}
                            />
                        </div>
                    );
                    if (error) return (
                        <div className={classes.root}>
                            <BorderLinearProgress
                                className={classes.margin}
                                variant="determinate"
                                color="secondary"
                                value={0}
                            />
                        </div>
                    );
                    const api = data.api;
                    const current = api.current_time - api.start_time;
                    const end = api.end_time - api.start_time;
                    var prog = Math.min(Math.max(current / end * 100, 0), 100);
                    if (end === 0 || current > end) {
                        prog = 99.5;
                    }
                    return (
                        <div className={classes.root}>
                            <BorderLinearProgress
                                className={classes.margin}
                                variant="determinate"
                                color="secondary"
                                value={prog}
                            />
                        </div>
                    )
                }}
            </Query>
        </Fragment>
    )
}

export default SongProgressQuery
