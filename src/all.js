import React from 'react'
import {Row, Col, Select, Button} from 'antd'
import axios from 'axios'
import './views/all/all.css'

const {Option} = Select

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            industry: 'IT',
            choice: 0,
            data: []
        }
    }

    componentDidMount() {
        axios.get('/map', {
            params: {
                industry: this.state.industry,
                choice: this.state.choice
            }
        }).then(resp => {
            this.setState({
                data: resp.data
            })
        })
    }



    render() {

    }
}

export default App