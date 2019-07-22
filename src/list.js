import React from 'react'
import {Table, Pagination, LocaleProvider, Row, Col, Select, Button} from 'antd'
import zh_CN from 'antd/lib/locale-provider/zh_CN'
import axios from 'axios'

const {Column} = Table
const {Option} = Select

const url = 'http://localhost:8080'

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            pages: 1,
            records: [],
            industry: 'IT',
            job: '',
            province: '四川',
            city: '成都',
            salary: '',
            provinceList: [],
            cityList: []
        }
    }

    componentDidMount() {
        axios.all([
            axios.get(url + '/city'),
            axios.get(url + '/list', {
                params: {
                    page: this.state.page
                }
            })
        ]).then(axios.spread((city, list) => {
            let cityList = []
            for (let i = 0; i < city.data.length; i++) {
                if (city.data[i].province === this.state.province) {
                    cityList = city.data[i].cities
                }
            }
            this.setState({
                provinceList: city.data,
                pages: list.data.pages,
                records: list.data.records,
                cityList: cityList
            })
        }))
    }

    changePage = page => {
        axios.get(url + '/list', {
            params: {
                page: page
            }
        }).then(resp => {
            this.setState({
                page: page,
                pages: resp.data.pages,
                records: resp.data.records
            })
        })
    }

    selectProvince = value => {
        let cityList = []
        for (let i = 0; i < this.state.provinceList.length; i++) {
            if (this.state.provinceList[i].province === value) {
                cityList = this.state.provinceList[i].cities
            }
        }
        this.setState({
            province: value,
            cityList: cityList,
            city: cityList[0]
        })
    }

    selectCity = value => {
        this.setState({
            city: value
        })
    }

    render() {
        const industries = ["IT", "金融", "贸易", "医疗", "广告媒体", "房地产",
            "教育", "服务业", "物流", "能源材料", "其他"]
        const IndustryOptions = industries.map(item => (
            <Option value={item} key={item}>{item}</Option>
        ))
        return (
            <>
                <div style={{background: '#fff', marginRight: '20px'}}>
                    <Row type={'flex'} align={'middle'} gutter={20} style={{
                        marginLeft: '15px', paddingTop: '20px', paddingBottom: '20px'
                    }}>
                        <Col>行业</Col>
                        <Col>
                            <Select defaultValue={this.state.industry} style={{width: '100px'}}>
                                {IndustryOptions}
                            </Select>
                        </Col>
                        <Col>省份</Col>
                        <Col>
                            <Select defaultValue={this.state.province}
                                    style={{width: '100px'}}
                                    onChange={this.selectProvince}>
                                {this.state.provinceList.map(item => (
                                    <Option key={item.province}>{item.province}</Option>
                                ))}
                            </Select>
                        </Col>
                        <Col>城市</Col>
                        <Col>
                            <Select value={this.state.city}
                                    style={{width: '100px'}}
                                    onChange={this.selectCity}>
                                {this.state.cityList.map(item => (
                                    <Option key={item}>{item}</Option>
                                ))}
                            </Select>
                        </Col>
                        <Col>
                            <Button type={'primary'}>查询</Button>
                        </Col>
                    </Row>
                    <Table dataSource={this.state.records} pagination={false}>
                        <Column align={'center'} title={'序号'} dataIndex={'key'} key={'key'}/>
                        <Column align={'center'} title={'行业'} dataIndex={'industry'}/>
                        <Column align={'center'} title={'职业'} dataIndex={'job'}/>
                        <Column align={'center'} title={'省份'} dataIndex={'province'}/>
                        <Column align={'center'} title={'城市'} dataIndex={'city'}/>
                        <Column align={'center'} title={'薪资(月)'} dataIndex={'salary'}/>
                    </Table>
                    <LocaleProvider locale={zh_CN}>
                        <Pagination showQuickJumper defaultCurrent={this.state.page}
                                    total={this.state.pages * 10} onChange={this.changePage}
                                    style={{
                                        textAlign: 'right', marginRight: '15px',
                                        marginTop: '20px', paddingBottom: '20px'
                                    }}/>
                    </LocaleProvider>
                </div>
            </>
        )
    }
}

export default App