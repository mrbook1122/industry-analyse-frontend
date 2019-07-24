import React from 'react'
import {Cascader, Row, Col, Skeleton} from 'antd'
import axios from 'axios'

const Histogram = React.lazy(() => import('./histogram'))
const Donut = React.lazy(() => import('./donut'))
const PolyLine = React.lazy(() => import('./polyline'))

const url = ''

class Area extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentCity: '成都',
            cityList: []
        }
        this.changeCity = this.changeCity.bind(this)
    }

    changeCity(value) {
        this.setState({
            currentCity: value[1]
        })
    }

    componentDidMount() {
        axios.get(url + '/city')
            .then(resp => {
                let cityList = resp.data.map(item => {
                    let city = {}
                    city.value = item.province
                    city.label = item.province
                    if (item.cities.length === 0) {
                        city.children = [{value: item.province, label: item.province}]
                    } else {
                        city.children = item.cities.map(i => {
                            return {
                                value: i,
                                label: i
                            }
                        })
                    }
                    return city
                })
                this.setState({
                    cityList: cityList
                })
            })
    }

    render() {
        return (
            <div>
                <div style={{marginLeft: '20px', marginRight: '20px'}}>
                    <Cascader defaultValue={['四川', '成都']}
                              options={this.state.cityList} onChange={this.changeCity}/>

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