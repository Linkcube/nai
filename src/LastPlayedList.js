import React, { Fragment } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Typography } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const query_lp = gql`
query {
  api {
    current_time,
    lp {
        meta,
        time,
        type,
        timestamp
}
  }
}`;

function format_seconds(seconds) {
    var measuredTime = new Date(null);
    measuredTime.setSeconds(seconds);
    return measuredTime.toISOString().substr(11, 5);
}
// ${format_seconds(ct - data.timestamp)} ago.
const Song = ({data, index, ct}) => 
    <ListItem key={index} alignItems="flex-start">
        <ListItemText
            primary={`${index + 1}. ${data.meta} `}
            secondary={`${format_seconds(ct - data.timestamp)} minutes ago.`}
        />
    </ListItem>


const LastPlayed = () => (
    <Query query={query_lp} pollInterval={5000}>
      {({loading, error, data, startPolling, stopPolling}) => {
        if (loading) return <p>...</p>;
        if (error) return <p/>;
        const api = data.api;
        if (api.lp === null) return <div />;
        const list = api.lp.map( (lp, index) => <Song data={lp} index={index} ct={api.current_time} key={index} />);
        return (
          <Fragment>
            { list }
          </Fragment>
        );
      }}
    </Query>
  )

export default function LastPlayedList() {
    return (
        <div>
            <Typography  variant="h6" component="h2" align="left">
                Last Played
            </Typography>
            <LastPlayed />
        </div>
    )
}