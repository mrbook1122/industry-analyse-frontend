import React, {useEffect, useState} from 'react'
import {Cascader, Select} from "antd";
import axios from "axios";
import {Chart} from "@antv/g2";

import Spinner from "../components/Spinner";

// 折线图
const Polyline = ({fullPage}) => {

    const closeScroll = () => {
        fullPage.setAllowScrolling(false)
    }
    const openScroll = () => {
        fullPage.setAllowScrolling(true)
    }

    const [chart, setChart] = useState(null)
    // 初始化图表
    useEffect(() => {
        let chart = new Chart({
            container: 'polyline',
            autoFit: true
        })
        chart.scale({
            time: {range: [0, 1]},
            num: {min: 0, nice: true, alias: '需求量'}
        })
        chart.tooltip({
            showCrosshairs: true, // 展示 Tooltip 辅助线
            shared: true,
        });
        chart.line().position('time*num').label('num');
        chart.point().position('time*num');
        setChart(chart)
    }, [])

    const [city, setCity] = useState('成都')
    const [cityList, setCityList] = useState([])
    const changeCity = (value) => {
        setCity(value[1])
        openScroll()
    }
    // 获取城市列表
    useEffect(() => {
        axios.get('/city', {
            params: {
                choice: 0
            }
        }).then(resp => {
            let cityList = resp.data.map(item => {
                let city = {}
                city.value = item.province
                city.label = item.province
                if (item.cities.length === 0) {
                    city.children = [{value: item.province, label: item.province}]
                } else {
                    city.children = item.cities.map(i => {
                        return {
                            value: i,
                            label: i
                        }
                    })
                }
                return city
            })
            setCityList(cityList)
        })
    }, [])

    // 行业选择
    let industries = ["IT", "金融", "贸易", "医疗", "广告媒体", "房地产",
        "教育", "服务业", "物流", "能源材料", "其他"]
    const [industry, setIndustry] = useState(industries[0])
    const changeIndustry = (value) => {
        setIndustry(value)
        openScroll()
    }

    const [loading, setLoading] = useState(true)
    // ajax获取数据
    useEffect(() => {
        if (chart !== null) {
            setLoading(true)
            chart.changeVisible(false)
            axios.get('/industry/time', {
                params: {
                    industry,
                    city
                }
            }).then((resp) => {
                setLoading(false)
                chart.changeVisible(true)
                chart.data(resp.data)
                chart.render()
            })
        }
    }, [chart, city, industry])

    return (
        <div className="h-full">
            <div className="xl:text-5xl lg:text-3xl md:text-2xl text-xl mt-40 text-center">
                <span className="text-red-300">{city}市</span>各行业需求量趋势报告
            </div>
            <div
                style={{width: '100%', maxWidth: '700px'}}
                className="flex justify-between mx-auto my-5 items-center">
                <div className="flex items-center">
                    <div className="text-xl">城市选择：</div>
                    <Cascader defaultValue={['四川', '成都']} onChange={changeCity}
                              onClick={closeScroll}
                              onBlur={openScroll}
                              options={cityList}/>
                </div>
                <div className="flex items-center">
                    <div className="text-xl">行业选择：</div>
                    <Select value={industry} style={{width: '120px'}}
                            onSelect={changeIndustry}
                            onBlur={openScroll}
                            onFocus={closeScroll}>
                        {industries.map(item => <Select.Option value={item} key={item}>{item}</Select.Option>)}
                    </Select>
                </div>
            </div>
            <div className="p-5">
                {loading ? <Spinner/> : null}
                <div className="mx-auto overflow-hidden" style={{width: '100%', maxWidth: '750px', height: '400px'}}>
                    <div id={'polyline'} className={'w-full h-full'}/>
                </div>
            </div>
        </div>
    )
}

export default Polyline