import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import ServerSettingsForm from './ServerSettingsForm';
import gql from 'graphql-tag';
import { Query, graphql } from 'react-apollo';
import { withStyles } from '@material-ui/core/styles';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const ColorButton = withStyles({
  root: {
    color: 'white',
    borderColor: 'white'
  }
})(Button);

export default function ServerSettingsDialogue() {
  const [open, setOpen] = React.useState(false);
  const INITIAL_STATE = {
    api_uri: "Api URI",
    server_uri: "Server URI",
    stream_uri: "Stream URI",
    poll_interval: "Polling Interval",
    excluded_djs: "Excluded DJs",
    export_folder: "Export Folder",
  }
  var form_values = INITIAL_STATE;

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  const query_server_settings = gql`
  query {
    config {
      api_uri
      server_uri
      stream_uri
      poll_interval
      excluded_djs
      export_folder
    }
  }`;

  const mutate_server_settings = gql`
 mutation ($config: new_config) {
  updateConfig (config: $config)
}`

const SubmitConfig = ({ mutate }) => {
  var excluded_json;
  const handleClick = () => {
    try {
      excluded_json = JSON.parse(form_values.excluded_djs);
    } catch {
      excluded_json = form_values.excluded_djs;
    }
    if (!Array.isArray(excluded_json)){
      excluded_json = [excluded_json];
    }
    mutate({ variables: {config: {
      api_uri: form_values.api_uri,
      server_uri: form_values.server_uri,
      stream_uri: form_values.stream_uri,
      poll_interval: parseInt(form_values.poll_interval),
      excluded_djs: excluded_json,
      export_folder: form_values.export_folder
    }}});
    handleClose();
  }

  return(
    <Button onClick={handleClick} color="primary">
      Apply
    </Button>
  )
}

const SubmitConfigWithMutation = graphql(mutate_server_settings)(SubmitConfig);

const handleChange = name => event => {
  form_values[name] = event.target.value;
};


  return (
    <Fragment>
      <Query query={query_server_settings}>
        {({loading, error, data, refetch}) => {
          if (loading) return (
            <ColorButton variant="outlined" color='default'>
                Server Settings
            </ColorButton>
          );
          if (error) return (
            <div>
              <ColorButton variant="outlined" color='default'>
                Server Settings
              </ColorButton>
            </div>
          )
          const config = data.config;
          form_values = config;
          return (
            <div>
              <ColorButton variant="outlined" color='default' onClick={() => {handleClickOpen(); refetch()}}>
                Server Settings
              </ColorButton>
              <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
              >
                <DialogTitle id="alert-dialog-slide-title">{"Change your server settings"}</DialogTitle>
                <DialogContent>
                <ServerSettingsForm values={config} handleChange={handleChange} />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} color="secondary">
                    Cancel
                  </Button>
                  <SubmitConfigWithMutation />
                </DialogActions>
              </Dialog>
            </div>
          );
        }}
      </Query>
    </Fragment>
  );
}