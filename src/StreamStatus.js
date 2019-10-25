import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import Tooltip from '@material-ui/core/Tooltip';
//import IconButton from '@material-ui/core/IconButton';

const radio_query = gql`
query {
    valid {
        valid_dj,
        force_stop
    }
}`;

const StreamStatus = () => (
    <Query
      query={radio_query}
      pollInterval={5000}
    >
      {({ loading, error, data, startPolling, stopPolling}) => {
        if (loading) return (
          <Tooltip title="Loading stream data.">
            <PauseIcon />
          </Tooltip>
        );
        if (error) return (
          <Tooltip title="Error connecting to stream.">
            <NotInterestedIcon />
          </Tooltip>
        );
        const valid = data.valid;
        if (valid.force_stop) {
          return (
            <Tooltip title="Stream has been force stopped.">
              <NotInterestedIcon />
            </Tooltip>
          )
        }
        if (valid.valid_dj) {
          return (
            <Tooltip title="Recording stream.">
              <PlayArrowIcon />
            </Tooltip>
          )
        }
        return (
          <Tooltip title="Current DJ is excluded from recording.">
            <PauseIcon />
          </Tooltip>
        )
    }}
    </Query>
);

export default StreamStatus
