import React, { Fragment } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Typography } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { FixedSizeList } from 'react-window';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      height: 400,
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  }));

const query_pr = gql`
query {
    past_recordings {
        recordings {
            folder,
            songs
        }
    }
}`;

function get_date(seconds) {
    var measuredTime = new Date(null);
    measuredTime.setSeconds(seconds);
    return measuredTime.toString();
}

function clamp_height(song_count) {
    return Math.min(song_count * 46, 400);
}

const Song = ({rec, index, classes, Row}) => 
    <ListItem key={index} alignItems="flex-start">
        <ListItemText
            primary={`${index + 1}. ${rec.folder.split(' ')[1]} `}
            secondary={`Recorded ${get_date(rec.folder.split(' ')[0])}.`}
        />
        <FixedSizeList height={clamp_height(rec.songs.length)} width={1500} itemSize={46} itemCount={rec.songs.length} itemData={{ songs: rec.songs }}>
            { Row }
        </FixedSizeList>
    </ListItem>


const LastPlayed = ({ classes, Row }) => (
    <Query query={query_pr} pollInterval={5000}>
      {({loading, error, data, startPolling, stopPolling}) => {
        if (loading) return <p>...</p>;
        if (error) return <p/>;
        if (Object.entries(data).length === 0) return <div/>
        const past_recordings = data.past_recordings;
        const list = past_recordings.recordings.map((recording, index) => 
            <Song rec={recording} index={index} classes={classes} Row={Row} key={index} />
        );
        return (
          <Fragment>
            { list }
          </Fragment>
        );
      }}
    </Query>
  )

export default function PastRecordings() {
    const classes = useStyles();

    function Row(props) {
        const { data, index, style } = props;
        
        return (
            <ListItem button style={style} key={index}>
                <ListItemText primary={`${data.songs[index]}`} />
            </ListItem>
        );
    }
    Row.propTypes = {
        index: PropTypes.number.isRequired,
        style: PropTypes.object.isRequired,
    };

    return (
        <div>
            <Typography  variant="h6" component="h2" align="left">
                Past Recordings
            </Typography>
            <LastPlayed classes={classes} Row={Row} />
        </div>
    )
}
