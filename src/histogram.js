import React from 'react'
import G2 from '@antv/g2'

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
        return (
            <div style={{background: '#fff',height:'500px' ,width: '100%', marginTop: '20px'}}>
                <div style={{marginLeft: '20px', padding: '20px', fontSize: '25px'}}>
                    {this.props.city}市各行业需求量柱状图
                </div>
                <div id={'histogram'}>

                </div>
            </div>

        )
    }

    componentDidMount() {
        const chart = new G2.Chart({
            container: 'histogram',
            forceFit: true,
            height: 400,
            padding: [20, 20, 95, 80]
        });
        chart.source(this.props.data);
        chart.scale('num', {
        });
        chart.interval().position('industry*num').color('industry');
        chart.render();
        this.setState({
            chart: chart
        })
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        if (this.state.chart)
            this.state.chart.changeData(nextProps.data)
    }
}

export default Histogram

