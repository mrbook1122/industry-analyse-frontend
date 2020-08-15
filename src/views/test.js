import React from 'react'
import ReactDom from 'react-dom'
import {HashRouter as Router, Link, Route} from 'react-router-dom'
import {createHashHistory} from 'history'
import {Avatar, Button, Col, ConfigProvider, Layout, Menu, Row} from 'antd'
import zhCN from 'antd/es/locale/zh_CN'

import 'antd/dist/antd.min.css'

import {
    AreaChartOutlined,
    MenuFoldOutlined,
    PieChartOutlined,
    SearchOutlined,
    UnorderedListOutlined
} from '@ant-design/icons'

import Area from './area'
import All from './all'
import ResultList from './list'
import avatar from './assets/a.png'

const {Header, Sider, Content} = Layout
const history = createHashHistory()

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            displaySearch: "none"
        }
        this.toggle = this.toggle.bind(this)
    }

    toggle() {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    clickSearch = e => {
        this.setState({
            displaySearch: 'true'
        })
        console.log("aaaaa")
    }

    blurSearch = e => {
        this.setState({
            displaySearch: 'none'
        })
    }

    render() {
        return (
            <ConfigProvider locale={zhCN}>
                <Router>
                    <Layout style={{minHeight: '100vh'}}>
                        <Sider collapsible trigger={null} collapsed={this.state.collapsed}>
                            {/*logo*/}
                            <div style={{
                                height: '32px', background: 'rgba(255, 255, 255, 0.2)',
                                margin: '16px'
                            }}>
                            </div>
                            {/*menu*/}
                            <Menu theme={'dark'} defaultSelectedKeys={[history.location.pathname]}>

                                <Menu.Item key={'/'}>
                                    <PieChartOutlined/>
                                    <span>地区</span>
                                    <Link to={'/'}/>
                                </Menu.Item>
                                <Menu.Item key={'/all'}>
                                    <AreaChartOutlined/>
                                    <span>全国</span>
                                    <Link to={'/all'}/>
                                </Menu.Item>
                                <Menu.Item key={'/list'}>
                                    <UnorderedListOutlined/>
                                    <span>列表</span>
                                    <Link to={'/list'}/>
                                </Menu.Item>
                            </Menu>
                        </Sider>
                        <Layout>
                            <Header style={{background: '#fff', padding: '0'}}>
                                <MenuFoldOutlined/>
                                <div style={{float: 'right', lineHeight: '64px'}}>
                                    <Row type={'flex'} align={'middle'} gutter={12}>
                                        <Col span={12}>
                                            <Button type={"link"} style={{fontSize: '25px', marginTop: '10px'}}
                                                    onBlur={this.blurSearch}
                                                    onClick={this.clickSearch}>
                                                <SearchOutlined/>
                                            </Button>
                                        </Col>
                                        {/*<input style={{*/}
                                        {/*    height: '22px', border: '0',*/}
                                        {/*    borderBottom: '1px solid #d9d9d9', paddingBottom: '2px',*/}
                                        {/*    display: this.state.displaySearch*/}
                                        {/*}} placeholder={'搜索'}/>*/}
                                        <Col span={12}>
                                            <Avatar src={avatar} style={{clear: 'both', marginTop: '-8px'}}/>
                                        </Col>
                                    </Row>
                                </div>
                            </Header>
                            <Content>
                                <div style={{marginLeft: '20px', marginTop: '20px'}}>
                                    <Route path={'/'} exact component={Area}/>
                                    {/*<Route path={'/all'} component={All}/>*/}
                                    {/*<Route path={'/list'} component={ResultList}/>*/}
                                </div>
                            </Content>
                        </Layout>
                    </Layout>
                </Router>
            </ConfigProvider>
        )
    }
}

ReactDom.render(
    <App/>,
    document.getElementById('root')
)