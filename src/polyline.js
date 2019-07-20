import React from 'react'
import G2 from '@antv/g2'

class PolyLine extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chart: null
        }
    }

    componentDidMount() {
        const chart = new G2.Chart({
            container: 'polyline',
            forceFit: true,
            height: 450,
            padding: [50, 0, 60, 90]
        })
        chart.source(this.props.data)
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

    componentWillUpdate(nextProps, nextState, nextContext) {
        if (this.state.chart)
            this.state.chart.changeData(nextProps.data)
    }

    render() {
        return (
            <>
                <div id={'polyline'} style={{background: '#fff'}}></div>
            </>
        )
    }

}

export default PolyLine