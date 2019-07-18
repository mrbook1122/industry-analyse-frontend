import React from 'react'
import {Cascader, Row, Col} from 'antd'
import Donut from './donut'

import axios from 'axios'

const Histogram = React.lazy(() => import('./histogram'))

const url = 'http://localhost:8080'

const cityList = [
    {
        value: '四川',
        label: '四川',
        children: [
            {value: '成都', label: '成都'},
            {value: '南充', label: '南充'},
        ]
    },
    {
        value: '广东',
        label: '广东',
        children: [
            {value: '广州', label: '广州'},
            {value: '深圳', label: '深圳'},
        ]
    },
]

class Area extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentCity: '成都',
            data: []
        }
        this.changeCity = this.changeCity.bind(this)
    }

    changeCity(value) {
        axios.get(url + '/industry/num', {
            params: {
                city: value[1]
            }
        }).then((resp) => {
            this.setState({
                data: resp.data,
                currentCity: value[1]
            })
        })
    }

    componentWillMount() {
        axios.get(url + '/industry/num', {
            params: {
                city: this.state.currentCity
            }
        }).then((resp) => {
            this.setState({
                data: resp.data
            })
        })
    }


    render() {
        return (
            <div>
                <div style={{marginLeft: '20px'}}>
                    <Cascader defaultValue={['四川', '成都']}
                              options={cityList} onChange={this.changeCity}/>

                            <div style={{marginLeft: '15px', display: 'inline-block', fontSize: '18px'}}>
                                当前城市: {this.state.currentCity}
                            </div>
                    <Row>
                        <Col span={14}>
                            <React.Suspense fallback={null}>
                                <Histogram city={this.state.currentCity} data={this.state.data}/>
                            </React.Suspense>
                        </Col>
                        <Col span={10}>
                            <div>
                                <Donut/>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}

export default Area