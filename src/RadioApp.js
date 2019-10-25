import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

/*
const RadioApp = () => {
  <Query 
    query={gql`
      {
        server_obj {
          bitrate
          sample_rate
          audio_format
          server_name
          server_description
        }
      }
    `}
    >
      {
        ({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :</p>;

          return (
            <div>
              <p>{`${data.server_obj.server_description}`}</p>
            </div>
          )
        }
      }
    </Query>
}
*/

const radio_query = gql`
query {
  server {
    bitrate,
    sample_rate,
    audio_format,
    server_name,
    server_description
  }
  api {
    np,
    listeners,
    dj_name,
    dj_pic,
    start_time,
    end_time,
    current_time
  }
}`;


const RadioApp = () => (
  <Query
    query={radio_query}
    pollInterval={500}
  >
    {({ loading, error, data, startPolling, stopPolling}) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>{`${error}`}</p>; 
      const server = data.server;
      const api = data.api;
      //console.log(data);
      return (
        <div>
          <p>Server:</p>
          <ul className="Server">
            <li>{server.server_name}</li>
            <li>{server.server_description}</li>
            <li>{server.audio_format}</li>
            <li>{server.sample_rate}</li>
            <li>{server.bitrate}</li>
          </ul>
          <p>Api:</p>
          <ul className="Api">
            <li>{api.np}</li>
            <li>{api.listeners}</li>
            <li>{api.dj_name}</li>
            <li>{api.dj_pic}</li>
            <li>{api.start_time}</li>
            <li>{api.end_time}</li>
            <li>{api.current_time}</li>
            <li>{parseInt(Date.now() / 1000)}</li>
          </ul>
        </div>
      );
    }}
  </Query>
);


export default RadioApp
