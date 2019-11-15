import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Typography } from '@material-ui/core';
import './DjPanel.css'

const radio_query = gql`
query {
    misc {
        dj_image_link,
    }
    api {
        dj_name,
    }
}`;

const styles = {
    img: {
        marginTop: 10,
        marginBottom: 10,
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    }
}

const DjPanel = () => (
    <Query
      query={radio_query}
      pollInterval={5000}
    >
      {({ loading, error, data, startPolling, stopPolling}) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p />; 
        if (Object.entries(data).length === 0) return <div/>
        const misc = data.misc;
        const api = data.api;
        return (
            <div style={styles.container}>
                <img src={misc.dj_image_link} alt="dj_pic" style={styles.img} class="dj-pic" />
                <Typography gutterBottom variant="h4" component="h2" align="center">
                    Current DJ: {api.dj_name}
                </Typography>
            </div>
        );
    }}
    </Query>
);

export default DjPanel
