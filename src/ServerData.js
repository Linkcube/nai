import React, { Fragment} from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const query_server_title = gql`
query {
  server {
    server_name,
    server_description
  }
}`;

const ServerTitle = () => (
  <Query query={query_server_title}>
    {({loading, error, data}) => {
      if (loading) return <Fragment>Server</Fragment>;
      if (error) return <Fragment>Server</Fragment>
      const server = data.server;
      return (
        <Fragment>
          {server.server_name} - {server.server_description}
        </Fragment>
      );
    }}
  </Query>
)

const query_audio_spec = gql`
query {
  server {
    bitrate,
    sample_rate,
    audio_format,
  }
}`;

const AudioSpec = () => (
  <Query query={query_audio_spec}>
    {({loading, error, data}) => {
      if (loading) return <p/>;
      if (error) return <p/>
      const server = data.server;
      return (
        <Fragment>
          {server.audio_format} | {server.bitrate}kb/s | {server.sample_rate}Hz
        </Fragment>
      );
    }}
  </Query>
)

const query_listeners = gql`
query {
  api {
    listeners
  }
}`;

const Listeners = () => (
  <Query query={query_listeners} pollInterval={5000}>
    {({loading, error, data, startPolling, stopPolling}) => {
      if (loading) return <p>Listeners: --</p>;
      if (error) return <p>Listeners: --</p>
      const api = data.api;
      return (
        <Fragment>
          Listeners: {api.listeners}
        </Fragment>
      )
    }}
  </Query>
)


export {ServerTitle, AudioSpec, Listeners}
