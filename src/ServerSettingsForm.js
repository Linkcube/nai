import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const CssTextField = withStyles({
    root: {
      '& label.Mui-focused': {
        color: 'green',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: 'green',
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: 'gray',
        },
        '&:hover fieldset': {
          borderColor: 'yellow',
        },
        '&.Mui-focused fieldset': {
          borderColor: 'green',
        },
      },
    },
  })(TextField);

const useStyles = makeStyles(theme => ({
  textField: {
    margin: theme.spacing(1),
  },
}));

const ServerSettingsForm = ({ values, handleChange}) => {
  const classes = useStyles();

  // const handleChange = name => event => {
  //   console.log(event.target.value);
  //   setValues({ ...values, [name]: event.target.value });
  //   console.log(values[name]);
  // };

  return (
    <form className={classes.container} noValidate autoComplete="off">
      <CssTextField
        required
        id="api_uri"
        label="API URI"
        multiline
        rowsMax="4"
        defaultValue={values.api_uri}
        onChange={handleChange('api_uri')}
        className={classes.textField}
        margin="normal"
        variant="outlined"
      />
      <CssTextField
        required
        id="server_uri"
        label="Server URI"
        multiline
        rowsMax="4"
        defaultValue={values.server_uri}
        onChange={handleChange('server_uri')}
        className={classes.textField}
        margin="normal"
        variant="outlined"
      />
      <CssTextField
        required
        id="stream_uri"
        label="Stream URI"
        multiline
        rowsMax="4"
        defaultValue={values.stream_uri}
        onChange={handleChange('stream_uri')}
        className={classes.textField}
        margin="normal"
        variant="outlined"
      />
      <CssTextField
        required
        id="poll_interval"
        label="Poll Interval"
        multiline
        rowsMax="4"
        defaultValue={values.poll_interval}
        onChange={handleChange('poll_interval')}
        className={classes.textField}
        margin="normal"
        variant="outlined"
      />
      <CssTextField
        id="excluded_djs"
        label="Excluded DJs"
        multiline
        rowsMax="4"
        defaultValue={JSON.stringify(values.excluded_djs)}
        onChange={handleChange('excluded_djs')}
        className={classes.textField}
        margin="normal"
        helperText="JSON array of strings"
        variant="outlined"
      />
      <CssTextField
        id="export_folder"
        label="Export Folder"
        multiline
        rowsMax="4"
        defaultValue={values.export_folder}
        onChange={handleChange('export_folder')}
        className={classes.textField}
        margin="normal"
        helperText="Leave empty for same directory as file"
        variant="outlined"
      />
    </form>
  );
}

export default ServerSettingsForm
