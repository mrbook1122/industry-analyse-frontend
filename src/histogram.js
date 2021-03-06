import React from 'react'
import {Chart} from '@antv/g2'
import axios from 'axios'

const url = ''


class Histogram extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chart: null
        }
    }

    render() {
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
            let chart = null
            if (document.getElementById('histogram'))
                chart = new Chart({
                    container: 'histogram',
                    forceFit: true,
                    height: 300,
                    padding: [20, 20, 95, 80]
                });
            if (chart) {
                chart.source(resp.data);
                chart.scale('num', {});
                chart.interval().position('industry*num').color('industry');
                chart.render();
                this.setState({
                    chart: chart
                })
            }
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

