import React from 'react'
import {Row, Col, Select, Button} from 'antd'
import axios from 'axios'
import './all.css'

const {Option} = Select

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            industry: 'IT',
            choice: 0,
            data: []
        }
    }

    componentDidMount() {
        axios.get('/map', {
            params: {
                industry: this.state.industry,
                choice: this.state.choice
            }
        }).then(resp => {
            this.setState({
                data: resp.data
            })
        })
    }

    selectIndustry = value => {
        this.setState({
            industry: value
        })
    }

    submit = e => {
        axios.get('/map', {
            params: {
                industry: this.state.industry,
                choice: this.state.choice
            }
        }).then(resp => {
            this.setState({
                data: resp.data
            })
        })
    }

    selectChoice = value => {
        this.setState({
            choice: value === '薪资' ?  1 : 0
        })
    }

    render() {
        const circles = this.state.data.map((item, index) => {
            let radius = 0
            let color = ''
            if (item.num / 1000 < 3) {
                color = 'rgba(186, 231, 255, 0.35)'
                radius = item.num / 100
            } else if (item.num / 1000 < 5) {
                color = 'rgba(105, 192, 255, 0.35)'
                radius = item.num / 250
            } else if (item.num / 2000 < 10) {
                color = 'rgba(24, 144, 255, 0.35)'
                radius = item.num / 500
            } else if (item.num / 4000 < 25) {
                color = 'rgba(0, 80, 179, 0.35)'
                radius = item.num / 1200
            } else {
                color = 'rgba(0, 80, 179, 0.35)'
                radius = 25
            }

            return (
                <div style={{
                    position: 'absolute', left: item.x + '%', top: item.y + '%',
                    background: color, width: radius * 2 + 'px', height: radius * 2 + 'px',
                    borderRadius: radius, border: '1.3px solid ' + color
                }} key={index}></div>
            )
        })

        const industries = ["IT", "金融", "贸易", "医疗", "广告媒体", "房地产",
            "教育", "服务业", "物流", "能源材料", "其他"]
        const IndustryOptions = industries.map(item => (
            <Option value={item} key={item}>{item}</Option>
        ))
        return (
            <>
                <div style={{backgroundColor: '#fff', width: '680px'}}>
                    {/*地图*/}
                    <Row style={{marginLeft: '20px', paddingTop: '20px'}} type={'flex'}
                         align={'middle'} gutter={8}>
                        <Col>行业</Col>
                        <Col>
                            <Select defaultValue={'IT'} style={{width: '100px'}}
                                    onChange={this.selectIndustry}>
                                {IndustryOptions}
                            </Select>
                        </Col>
                        <Col>
                            <Select defaultValue={'需求量'} style={{width: '100px'}}
                                    onChange={this.selectChoice}>
                                <Option value={'需求量'}>需求量</Option>
                                <Option value={'薪资'}>薪资</Option>
                            </Select>
                        </Col>
                        <Col>
                            <Button type={'primary'} onClick={this.submit}>查询</Button>
                        </Col>
                    </Row>
                    <div className={'map-bg'} style={{
                        width: '680px', height: '560px', position: 'relative'
                    }}>
                        {circles}
                    </div>
                </div>
            </>
        )
    }
}

export default App