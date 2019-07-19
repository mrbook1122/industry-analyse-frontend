import React from 'react'
import {Cascader, Row, Col, Select, Radio} from 'antd'

import axios from 'axios'

// import Histogram from './histogram'

const Histogram = React.lazy(() => import('./histogram'))
const Donut = React.lazy(() => import('./donut'))
const PolyLine = React.lazy(() => import('./polyline'))

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
            data: [],
            donutData: [],
            polyData: [],
            currentIndustry: '互联网'
        }
        this.changeCity = this.changeCity.bind(this)
    }

    changeCity(value) {
        axios.get(url + '/industry/num', {
            params: {
                city: value[1]
            }
        }).then((resp) => {
            var total = 0
            for (let i = 0; i < resp.data.length; i++)
                total += resp.data[i].num
            var newData = resp.data.map(function (item) {
                let a = (item.num / total * 100).toFixed(1) + '%'
                item.percent = a
                return item
            })
            this.setState({
                data: resp.data,
                currentCity: value[1],
                donutData: newData
            })
        })
    }

    componentWillMount() {
        axios.get(url + '/industry/num', {
            params: {
                city: this.state.currentCity
            }
        }).then((resp) => {
            var total = 0
            for (let i = 0; i < resp.data.length; i++)
                total += resp.data[i].num
            var newData = resp.data.map(function (item) {
                let a = (item.num / total * 100).toFixed(1) + '%'
                item.percent = a
                return item
            })
            this.setState({
                data: resp.data,
                donutData: newData
            })
        })
        axios.get(url + '/industry/time', {
            params: {
                city: this.state.currentCity,
                industry: this.state.currentIndustry
            }
        }).then((resp) => {
            this.setState({
                polyData: resp.data
            })
        })
    }


    render() {
        const industrySelect = this.state.data.map((item, index) => (
            <Radio.Button value={item.industry} key={index}>{item.industry}</Radio.Button>
        ))
        return (
            <div>
                <div style={{marginLeft: '20px', marginRight: '20px'}}>
                    <Cascader defaultValue={['四川', '成都']}
                              options={cityList} onChange={this.changeCity}/>

                    <div style={{marginLeft: '15px', display: 'inline-block', fontSize: '18px'}}>
                        当前城市: {this.state.currentCity}
                    </div>
                    <Row gutter={20}>
                        <Col span={12}>
                            <React.Suspense fallback={null}>
                                <Histogram city={this.state.currentCity} data={this.state.data}/>
                            </React.Suspense>
                        </Col>
                        <Col span={12}>
                            <React.Suspense fallback={null}>
                                <Donut city={this.state.currentCity} data={this.state.donutData}/>
                            </React.Suspense>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div style={{height: '560px', marginTop: '20px'}}>
                                <div style={{background: '#fff'}}>
                                    <div style={{
                                        padding: '20px 20px 0 40px', fontSize: '25px'
                                    }}>
                                        {this.state.currentCity}市{this.state.currentIndustry}行业需求量变化折线图
                                    </div>
                                    <div style={{float: 'right', marginTop: '-30px', marginRight: '20px'}}>
                                        <Radio.Group>
                                            {industrySelect}
                                        </Radio.Group>
                                    </div>
                                </div>
                                <React.Suspense fallback={null}>
                                    <PolyLine city={this.state.currentCity} data={this.state.polyData}/>
                                </React.Suspense>

                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}

export default Area