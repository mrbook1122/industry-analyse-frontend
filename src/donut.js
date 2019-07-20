import React from 'react'
import G2 from '@antv/g2'
import {Row, Col} from 'antd'
import axios from 'axios'
import './donut.css'

const url = 'http://localhost:8080/'

class Donut extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chart: null,
            data: []
        }
    }


    componentDidMount() {
        axios.get(url + '/industry/num', {
            params: {
                city: this.props.city
            }
        }).then((resp) => {
            const chart = new G2.Chart({
                container: 'donut',
                forceFit: true,
                height: 350,
                padding: [0, 0, 0, 0]
            });
            chart.source(resp.data);
            chart.coord('theta', {
                radius: 0.75,
                innerRadius: 0.7
            });
            chart.tooltip({
                showTitle: false,
                itemTpl: '<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
            });
            const city = this.props.city
            chart.guide().html({
                position: ['50%', '50%'],
                htmlContent: '<div style="width: 100px;height: 50px;vertical-align: middle ;' +
                    'text-align: center ;line-height: 0.2;">' +
                    '<p style="font-size: 22px;color: #8c8c8c;font-weight: 300;">' +
                    '地区</p><p style="font-size: 32px;color: #000;font-weight: bold;">' + city + '</p></div>'
            })
            chart.legend(false)
            chart.intervalStack().position('num').color('industry').tooltip('industry*percent', function (item, percent) {
                return {
                    name: item,
                    value: percent
                }
            }).style({
                lineWidth: '3',
                stroke: '#fff'
            })
            chart.render();
            this.setState({
                chart: chart,
                data: resp.data
            })
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.city !== this.props.city) {
            axios.get(url + '/industry/num', {
                params: {
                    city: this.props.city
                }
            }).then((resp) => {
                this.state.chart.clear()
                const city = this.props.city
                this.state.chart.guide().html({
                    position: ['50%', '50%'],
                    htmlContent: '<div style="width: 100px;height: 50px;vertical-align: middle ;' +
                        'text-align: center ;line-height: 0.2;">' +
                        '<p style="font-size: 22px;color: #8c8c8c;font-weight: 300;">' +
                        '地区</p><p style="font-size: 32px;color: #000;font-weight: bold;">' + city + '</p></div>'
                })
                // this.state.chart.legend(false)
                this.state.chart.intervalStack().position('num').color('industry').tooltip('industry*percent', function (item, percent) {
                    return {
                        name: item,
                        value: percent
                    }
                }).style({
                    lineWidth: '3',
                    stroke: '#fff'
                })
                this.state.chart.changeData(resp.data)
                this.setState({
                    data: resp.data
                })
            })
        }
    }

    render() {
        const list = this.state.data.map((item, index) => (
            <div className="item" key={index}>
                <span className={'dot ' + 'dot_' + (index + 1)}></span>
                <span className="describe">{item.industry}</span>
                <span className="percent">{item.percent}</span>
                <span className="price">{item.num}</span>
            </div>
        ))
        return (
            <div style={{background: 'white', marginTop: '20px', paddingRight: '30px', height: '450px', width: '100%'}}>
                <Row>
                    <div>
                        <div style={{marginLeft: '20px', padding: '20px', fontSize: '25px'}}>
                            {this.props.city}市各行业需求量占比
                        </div>
                    </div>
                </Row>
                <Row style={{marginTop: '10px'}} type={'flex'} align={'middle'}>
                    <Col span={14}>
                        <div id={'donut'} style={{marginLeft: '10px'}}>
                        </div>
                    </Col>

                    <Col span={10}>
                        {list}
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Donut