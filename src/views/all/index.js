import React, {useState, useEffect} from 'react'
import {Button, Col, Row, Select} from "antd";

import './all.css'
import axios from "axios";
import Spinner from "../../components/Spinner";

const All = () => {
    const [data, setData] = useState([])
    const [industry, setIndustry] = useState('IT')
    // 1表示薪资
    const [choice, setChoice] = useState(0)
    const [loading, setLoading] = useState(true)
    let circles = null
    if (choice === 1) {
        circles = data.map((item, index) => {
            let radius = 0
            let color = ''
            if (item.num < 3) {
                color = 'rgba(186, 231, 255, 0.35)'
                radius = item.num
            } else if (item.num < 5) {
                color = 'rgba(105, 192, 255, 0.35)'
                radius = item.num
            } else if (item.num < 10) {
                color = 'rgba(24, 144, 255, 0.35)'
                radius = item.num
            } else if (item.num < 25) {
                color = 'rgba(0, 80, 179, 0.35)'
                radius = item.num
            } else {
                color = 'rgba(0, 80, 179, 0.35)'
                radius = 25
            }
            let left = `calc(${item.x}%-${radius}px)`
            let top = `calc(${item.y}%-${radius}px)`
            return (
                <div style={{
                    position: 'absolute', left, top,
                    background: color, width: radius * 2 + 'px', height: radius * 2 + 'px',
                    borderRadius: radius, border: '1.3px solid ' + color
                }} key={index} className={'animated zoomIn'}/>
            )
        })
    } else {
        circles = data.map((item, index) => {
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
            let left = `calc(${item.x}% - ${radius}px)`
            let top = `calc(${item.y}% - ${radius}px)`
            return (
                <div style={{
                    position: 'absolute', left, top: top,
                    background: color, width: radius * 2 + 'px', height: radius * 2 + 'px',
                    borderRadius: radius, border: '1.3px solid ' + color
                }} key={index} className={'animated zoomIn'}/>
            )
        })
    }

    const selectIndustry = value => {
        setIndustry(value)
    }

    useEffect(() => {
        setLoading(true)
        axios.get('/map', {
            params: {
                industry,
                choice
            }
        }).then(resp => {
            // this.setState({
            //     data: resp.data
            // })
            setData(resp.data)
            setLoading(false)
        })
    }, [industry, choice])

    const selectChoice = value => {
        // this.setState({
        //     choice: value === '薪资' ? 1 : 0
        // })
        setChoice(value === '薪资' ? 1 : 0)
    }

    const industries = ["IT", "金融", "贸易", "医疗", "广告媒体", "房地产",
        "教育", "服务业", "物流", "能源材料", "其他"]
    const IndustryOptions = industries.map(item => (
        <Select.Option value={item} key={item}>{item}</Select.Option>
    ))
    return (
        <div className="mx-auto pt-32" style={{width: '100%', maxWidth: '750px'}}>
            {/*地图*/}
            <Row style={{marginLeft: '20px', paddingTop: '20px'}} type={'flex'}
                 align={'middle'} gutter={8}>
                <Col>行业</Col>
                <Col>
                    <Select defaultValue={'IT'} style={{width: '100px'}}
                            onChange={selectIndustry}>
                        {IndustryOptions}
                    </Select>
                </Col>
                <Col>
                    <Select defaultValue={'需求量'} style={{width: '100px'}}
                            onChange={selectChoice}>
                        <Select.Option value={'需求量'}>需求量</Select.Option>
                        <Select.Option value={'薪资'}>薪资</Select.Option>
                    </Select>
                </Col>
                <Col>
                    <Button type={'primary'}>查询</Button>
                </Col>
            </Row>
            {loading ? <Spinner/> : null}
            <div className={'map-bg' + (loading ? ' hidden': '')} style={{
                height: '550px', position: 'relative', width: '750px'
            }}>
                {circles}
            </div>
        </div>
    )
}

export default All