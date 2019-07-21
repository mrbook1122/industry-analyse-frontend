import React from 'react'
import G2 from '@antv/g2'
import axios from 'axios'

const url = 'http://localhost:8080'

class PolyLine extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chart: null,
            currentIndustry: 'a'
        }
    }

    componentDidMount() {
        axios.get(url + '/industry/time', {
            params: {
                industry: this.state.currentIndustry,
                city: this.props.city
            }
        }).then((resp) => {
            const chart = new G2.Chart({
                container: 'polyline',
                forceFit: true,
                height: 450,
                padding: [50, 0, 60, 90]
            })
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
        })

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('a')
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
        return (
            <>
                <div style={{height: '560px', marginTop: '20px'}}>
                    <div style={{background: '#fff'}}>
                        <div style={{
                            padding: '20px 20px 0 40px', fontSize: '25px'
                        }}>
                            {this.props.city}市{this.state.currentIndustry}行业需求量变化折线图
                        </div>
                        <div style={{float: 'right', marginTop: '-30px', marginRight: '20px'}}>
                            {/*<Radio.Group value={this.state.currentIndustry} onChange={this.selectIndustry}>*/}
                            {/*    {industrySelect}*/}
                            {/*</Radio.Group>*/}
                        </div>
                    </div>
                    <div id={'polyline'} style={{background: '#fff'}}></div>

                </div>
            </>
        )
    }

}

export default PolyLine