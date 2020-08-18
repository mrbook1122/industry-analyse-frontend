import React from 'react'
import {Button, Col, Pagination, Row, Select, Table} from 'antd'
import axios from 'axios'

const {Column} = Table
const {Option} = Select

class ListPage extends React.Component {

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
            cityList: [],
            loading: true
        }
    }

    componentDidMount() {
        axios.all([
            axios.get('/city', {
                params: {
                    choice: 1
                }
            }),
            axios.get('/list', {
                params: {
                    page: this.state.page,
                    industry: this.state.industry,
                    city: this.state.city
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
                cityList: cityList,
                loading: false
            })
        }))
    }

    changePage = page => {
        this.setState({
            loading: true,
            page
        })
        axios.get('/list', {
            params: {
                page: page,
                industry: this.state.industry,
                city: this.state.city
            }
        }).then(resp => {
            this.setState({
                loading: false,
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

    selectIndustry = value => {
        this.setState({
            industry: value
        })
    }

    submit = e => {
        this.setState({
            loading: true
        })
        axios.get('/list', {
            params: {
                page: 1,
                industry: this.state.industry,
                city: this.state.city
            }
        }).then(resp => {
            this.setState({
                page: 1,
                pages: resp.data.pages,
                records: resp.data.records,
                loading: false
            })
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
                <div className="xl:mx-64 pt-24">
                    <Row type={'flex'} align={'middle'} gutter={20} style={{
                        marginLeft: '15px', paddingTop: '20px', paddingBottom: '20px'
                    }}>
                        <Col>行业</Col>
                        <Col>
                            <Select defaultValue={this.state.industry} style={{width: '100px'}}
                                    onChange={this.selectIndustry}>
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
                            <Button type={'primary'} onClick={this.submit}>查询</Button>
                        </Col>
                    </Row>
                    <Table dataSource={this.state.records} pagination={false} loading={this.state.loading}>
                        <Column align={'center'} title={'序号'} dataIndex={'key'} key={'key'}/>
                        <Column align={'center'} title={'行业'} dataIndex={'industry'}/>
                        <Column align={'center'} title={'职业'} dataIndex={'job'}/>
                        <Column align={'center'} title={'省份'} dataIndex={'province'}/>
                        <Column align={'center'} title={'城市'} dataIndex={'city'}/>
                        <Column align={'center'} title={'薪资(月)'} dataIndex={'salary'}/>
                    </Table>
                    <Pagination showQuickJumper current={this.state.page}
                                total={this.state.pages * 10} onChange={this.changePage}
                                style={{
                                    textAlign: 'right', marginRight: '15px',
                                    marginTop: '20px', paddingBottom: '20px'
                                }}/>
                </div>
            </>
        )
    }
}

export default ListPage