import React from 'react'
import G2 from '@antv/g2'
import axios from 'axios'

const url = 'http://localhost:8080'

// 定义度量
const cols = {
    industry: {alias: '行业'},
    num: {alias: '需求量'}
};


class Histogram extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chart: null
        }
    }

    render() {
        // const his = this.props.data.length > 0 ? <div id={'histogram'} style={{marginTop: '30px'}}>
        //
        // </div> : null
        return (
            <div style={{background: '#fff', height: '450px', width: '100%', marginTop: '20px'}}>
                <div style={{marginLeft: '20px', padding: '20px', fontSize: '25px'}}>
                    {this.props.city}市各行业需求量柱状图
                </div>
                <div id={'histogram'} style={{marginTop: '30px'}}>

                </div>
            </div>

        )
    }

    componentDidMount() {
        axios.get(url + '/industry/num', {
            params: {
                city: this.props.city
            }
        }).then((resp) => {
            const chart = new G2.Chart({
                container: 'histogram',
                forceFit: true,
                height: 300,
                padding: [20, 20, 95, 80]
            });
            chart.source(resp.data);
            chart.scale('num', {});
            chart.interval().position('industry*num').color('industry');
            chart.render();
            this.setState({
                chart: chart
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
                this.state.chart.changeData(resp.data)
            })
        }
    }

}

export default Histogram

