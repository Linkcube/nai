import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
import ServerHeader from './ServerHeader';
import BottomAppBar from './BottomBar';
import MainPageCenterPanel from './MainPageCenterPanel';

const graphql_endpoint = "http://localhost:4000/graphql";
const client = new ApolloClient({
    uri: graphql_endpoint,
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <ServerHeader />
        <MainPageCenterPanel />
        <BottomAppBar />
    </ApolloProvider>,
    document.getElementById('root'),
);

//ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
