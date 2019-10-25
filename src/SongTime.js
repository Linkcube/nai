import React, { Fragment} from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

function format_seconds(seconds) {
    var measuredTime = new Date(null);
    measuredTime.setSeconds(seconds);
    return measuredTime.toISOString().substr(11, 8);
}

const query_current_time = gql`
query {
  api {
    current_time,
    start_time,
    end_time
  }
}`;

const CurrentTime = () => (
  <Query query={query_current_time} pollInterval={5000}>
    {({loading, error, data, startPolling, stopPolling}) => {
      if (loading) return <p>--:--:--</p>;
      if (error) return <p>--:--:--</p>
      const api = data.api;
      return (
        <Fragment>
          {format_seconds(api.current_time - api.start_time)} /  {format_seconds(api.end_time - api.start_time)}
        </Fragment>
      );
    }}
  </Query>
)

const query_total_time = gql`
query {
    api {
        current_time
    }
    misc {
        rec_start
    }
}`;

const TotalRecordingTime = () => (
  <Query query={query_total_time} pollInterval={5000}>
    {({loading, error, data, startPolling, stopPolling}) => {
      if (loading) return <p>--:--:--</p>;
      if (error) return <p>--:--:--</p>
      const misc = data.misc;
      const api = data.api;
      var total_time = misc.rec_start;
      if (total_time == null) {
          total_time = "Not recording";
      } else {
          total_time = `Recorded: ${format_seconds(api.current_time - total_time)}`;
      }
      return (
        <Fragment>
          {total_time}
        </Fragment>
      );
    }}
  </Query>
)

const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      maxWidth: 360,
//backgroundColor: theme.palette.background.paper,
    },
  }));

export default function SongTime() {
    const classes = useStyles();

    return (
        <div>
            <List className={classes.root}>
                <ListItem>
                    <CurrentTime />
                </ListItem>
                <ListItem>
                    <TotalRecordingTime />
                </ListItem>
            </List>
        </div>
    )
}
