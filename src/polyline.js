import React from 'react'
import G2 from '@antv/g2'
import {Radio} from 'antd'
import axios from 'axios'

const url = ''

class PolyLine extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chart: null,
            industries: ["IT", "金融", "贸易", "医疗", "广告媒体", "房地产",
                "教育", "服务业", "物流", "能源材料", "其他"],
            currentIndustry: "IT"
        }
    }

    selectIndustry = e => {
        const industry = e.target.value
        axios.get(url + '/industry/time', {
            params: {
                city: this.props.city,
                industry: industry
            }
        }).then((resp) => {
            this.state.chart.changeData(resp.data)
            this.setState({
                currentIndustry: industry
            })
        })
    }

    componentDidMount() {
        axios.get(url + '/industry/time', {
            params: {
                industry: this.state.currentIndustry,
                city: this.props.city
            }
        }).then((resp) => {
            let chart = null
            if (document.getElementById('polyline'))
                chart = new G2.Chart({
                    container: 'polyline',
                    forceFit: true,
                    height: 450,
                    padding: [50, 0, 60, 90]
                })
            if (chart) {
                chart.source(resp.data)
                chart.scale('num', {
                    alias: '需求量'
                });
                chart.scale('year', {
                    range: [0, 1]
                });
                chart.tooltip({
                    crosshairs: {
                        type: 'line'
                    }
                })
                chart.line().position('time*num')
                chart.point().position('time*num').size(4).shape('circle').style({
                    stroke: '#fff',
                    lineWidth: 1
                })
                chart.render()
                this.setState({
                    chart: chart
                })
            }
        })

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.city !== this.props.city) {
            axios.get(url + '/industry/time', {
                params: {
                    industry: this.state.currentIndustry,
                    city: this.props.city
                }
            }).then((resp) => {
                this.state.chart.changeData(resp.data)
            })
        }
    }

    render() {
        const industrySelect = this.state.industries.map((item, index) => (
            <Radio.Button value={item} key={index}>{item}</Radio.Button>
        ))
        return (
            <>
                <div style={{marginTop: '20px'}}>
                    <div style={{background: '#fff'}}>
                        <div style={{
                            padding: '20px 20px 0 40px', fontSize: '25px'
                        }}>
                            {this.props.city}{this.state.currentIndustry}行业需求量变化折线图
                        </div>
                        <div style={{float: 'right', marginTop: '-30px', marginRight: '20px'}}>
                            <Radio.Group value={this.state.currentIndustry} onChange={this.selectIndustry}>
                                {industrySelect}
                            </Radio.Group>
                        </div>
                    </div>
                    <div id={'polyline'} style={{background: '#fff', height: '485px'}}></div>

                </div>
            </>
        )
    }

}

export default PolyLine