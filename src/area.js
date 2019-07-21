import React from 'react'
import {Cascader, Row, Col, Select, Radio, Skeleton} from 'antd'

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
            currentCity: '成都'
        }
        this.changeCity = this.changeCity.bind(this)
    }

    selectIndustry = e => {
        const industry = e.target.value
        axios.get(url + '/industry/time', {
            params: {
                city: this.state.currentCity,
                industry: industry
            }
        }).then((resp) => {

            this.setState({
                currentIndustry: industry,
                polyData: resp.data
            })
        })
    }

    changeCity(value) {
        this.setState({
            currentCity: value[1]
        })
    }


    render() {
        // const industrySelect = this.state.data.map((item, index) => (
        //     <Radio.Button value={item.industry} key={index}>{item.industry}</Radio.Button>
        // ))
        // let defaultSelect = ''
        // if (this.state.data[0])
        //     defaultSelect = this.state.data[0].industry
        return (
            <div>
                <div style={{marginLeft: '20px', marginRight: '20px'}}>
                    <Cascader defaultValue={['四川', '成都']}
                              options={cityList} onChange={this.changeCity}/>

                    <div style={{marginLeft: '15px', display: 'inline-block', fontSize: '18px'}}>
                        当前城市: {this.state.currentCity}
                    </div>
                    <Row gutter={20} type={'flex'} align={'middle'}>
                        <Col span={12}>
                            <React.Suspense fallback={<Skeleton active/>}>
                                <Histogram city={this.state.currentCity} data={this.state.data}/>
                            </React.Suspense>
                        </Col>
                        <Col span={12}>
                            <React.Suspense fallback={<Skeleton active/>}>
                                <Donut city={this.state.currentCity} data={this.state.donutData}/>
                            </React.Suspense>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                                <React.Suspense fallback={<Skeleton active/>}>
                                    <PolyLine city={this.state.currentCity}/>
                                </React.Suspense>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}

export default Area