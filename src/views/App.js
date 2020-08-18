import React from 'react'
import 'antd/dist/antd.min.css'
import '../assets/main.css'
import 'fullpage.js/dist/fullpage.min.css'

import {HashRouter as Router, Route, Switch} from "react-router-dom";
import './index.css'

import Nav from "./Nav";
import CityPage from "./city";
import All from "./all";
import ListPage from "./list";

const App = () => {

    return (
        <Router>
            <Nav/>
            <Switch>
                <Route path={'/list'}>
                    <ListPage/>
                </Route>
                <Route path={'/all'}>
                    <All/>
                </Route>
                <Route path="/">
                    <CityPage/>
                </Route>
            </Switch>
        </Router>
    )
}

export default App