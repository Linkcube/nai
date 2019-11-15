import React, { Fragment } from 'react';
import DjPanel from './DjPanel';
import PastRecordings from './PastRecordings';
import ControlPanel from './ControlPanel';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import LastPlayedList from './LastPlayedList';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        <Box p={3}>{children}</Box>
      </Typography>
    );
}

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function MainPageCenterPanel() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    function handleChange(event, newValue) {
        setValue(newValue);
    }

    return(
        <Fragment>
            <Box mt={10} />
            <div className={classes.root}>
                <Tabs value={value} onChange={handleChange} aria-label="recording selection">
                    <Tab label="Active Recording" {...a11yProps(0)} />
                    <Tab label="Past Recordings" {...a11yProps(1)} />
                </Tabs>
            </div>
            <TabPanel value={value} index={0}>
                <Container maxWidth="sm">
                    <DjPanel />
                    <ControlPanel />
                </Container>
                <Container maxWidth="md">
                    <LastPlayedList />
                </Container>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Box mt={10} />
                <Container maxWidth="md">
                    <PastRecordings />
                </Container>
            </TabPanel>
            <Box mt={10} />
        </Fragment>
    );
}