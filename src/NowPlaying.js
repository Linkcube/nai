/*
 * Fetches the NP data from the API
 */

import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Box from '@material-ui/core/Box';

const query_np = gql`
query {
    api {
        np
    }
}`;

const NowPlaying = () => (
  <Query query={query_np} pollInterval={5000}>
    {({loading, error, data, startPolling, stopPolling}) => {
        if (loading) return <p>...</p>;
        if (error) return <p />
        const api = data.api;
        return (
            <Box component="div" textOverflow="ellipsis">
                {api.np}
            </Box>
        );
    }}
  </Query>
)

export default NowPlaying
