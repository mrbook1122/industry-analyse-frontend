import React from 'react'
import {Chart, Geom, Axis, Tooltip, Legend, Coord} from 'bizcharts'

// 定义度量
const cols = {
    industry: {alias: '行业'},
    num: {alias: '需求量'}
};


class Histogram extends React.Component {

    componentWillMount() {
    }

    render() {
        return (
            <>
                <div style={{
                    marginTop: '20px', background: '#fff', width: '650px',
                    paddingTop: '30px'
                }}>
                    <div style={{marginLeft: '50px', paddingBottom: '30px', fontSize: '22px'}}>
                        {this.props.city}市各行业需求量
                    </div>
                    <Chart width={600} height={400} data={this.props.data} scale={cols}>
                        <Axis name="industry" title/>
                        <Axis name="num" title/>
                        <Legend position="top" dy={-20}/>
                        <Tooltip/>
                        <Geom type="interval" position="industry*num" color="industry"/>
                    </Chart>
                </div>
            </>
        )
    }
}

export default Histogram

