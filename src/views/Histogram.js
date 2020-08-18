import React, {useEffect, useState} from 'react'
import {Chart} from "@antv/g2";
import axios from 'axios'
import {Cascader, Tabs} from "antd";

import styles from './Histogram.module.css'

function convert(resp) {
    let total = 0
    for (let i = 0; i < resp.data.length; i++) {
        total += resp.data[i].num
    }
    return resp.data.map(item => {
        item.percent = Number.parseFloat((item.num / total).toFixed(2))
        return item
    })
}

// 柱状图和饼状图
const Histogram = ({fullPage}) => {

    const [chart, setChart] = useState({
        histogram: null,
        donut: null
    })
    // 初始化图表
    useEffect(() => {
        let donut = new Chart({
            container: 'donut',
            autoFit: true
        })
        donut.coordinate('theta', {
            radius: 0.75,
            innerRadius: 0.7
        });
        donut.tooltip({
            showTitle: false,
            showMarkers: false,
            itemTpl: '<li class="g2-tooltip-list-item"><span style="background-color:{color};" class="g2-tooltip-marker"/>{name}: {value}</li>',
        });
        donut.interval().adjust('stack').position('percent').color('industry')
            .label('percent', (percent) => {
                return {
                    content: data => {
                        return `${data.industry}: ${(percent * 100).toFixed(1)}%`;
                    }
                }
            })
            .tooltip('industry*percent', (item, percent) => {
                percent = percent * 100 + '%';
                return {
                    name: item,
                    value: percent,
                }
            })
        donut.interaction('element-active');

        let chart = new Chart({
            container: 'histogram',
            autoFit: true
        });
        chart.scale('num', {});
        chart.interval().position('industry*num').color('industry');
        setChart({
            histogram: chart,
            donut,
        })
    }, [])

    const [city, setCity] = useState('成都')
    const [cityList, setCityList] = useState([])
    const changeCity = (value) => {
        fullPage.setAllowScrolling(true)
        setCity(value[1])
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

    // ajax获取数据
    useEffect(() => {
        if (chart.histogram !== null) {
            axios.get('/industry/num', {
                params: {
                    city
                }
            }).then(resp => {
                chart.histogram.data(resp.data)
                chart.histogram.render()
                let data = convert(resp)
                chart.donut.data(data)
                chart.donut.render()
            })
        }
    }, [chart, city])

    // 饼状图与柱状图切换, true为饼状图
    const [select, setSelect] = useState(false)
    const onTabClick = (key) => {
        setSelect(key === '2')
        setTimeout(() => {
            chart.histogram.render()
            chart.donut.render()
        }, 500)
    }

    return (
        <div className="h-full">
            <div className="xl:text-5xl lg:text-3xl md:text-2xl text-xl mt-40 text-center">
                <span className="text-red-300">{city}市</span>各行业需求量数据报告
            </div>
            <div
                className="flex sm:justify-between justify-around xl:w-1/3 md:w-1/2 mx-auto my-5 items-center sm:flex-no-wrap flex-wrap">
                <div className="flex items-center">
                    <div className="text-xl">城市选择：</div>
                    <Cascader defaultValue={['四川', '成都']} onChange={changeCity}
                              onClick={() => fullPage.setAllowScrolling(false)}
                              onBlur={() => fullPage.setAllowScrolling(true)}
                              options={cityList}/>
                </div>
                <div>
                    <Tabs defaultActiveKey="1" size={'large'} onTabClick={onTabClick}>
                        <Tabs.TabPane tab="柱状图" key="1"/>
                        <Tabs.TabPane tab="饼状图" key="2"/>
                    </Tabs>
                </div>
            </div>
            <div className="p-5">
                <div className="mx-auto overflow-hidden" style={{width: '100%', maxWidth: '750px'}}>
                    <div className={select ? styles.transform : styles.container}>
                        <div id={'histogram'} className={styles.histogram}/>
                        <div id={'donut'} className={styles.histogram}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Histogram