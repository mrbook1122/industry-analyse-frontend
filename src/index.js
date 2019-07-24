import React from 'react'
import ReactDom from 'react-dom'
import {HashRouter as Router, Route, Link} from 'react-router-dom'
import {createHashHistory} from 'history'
import {Layout, Icon, Menu, Button} from 'antd'

import Area from './area'
import All from './all'
import ResultList from './list'

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
            <div>
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
                                    <Icon type="pie-chart" />
                                    <span>地区</span>
                                    <Link to={'/'}/>
                                </Menu.Item>
                                <Menu.Item key={'/all'}>
                                    <Icon type="dot-chart" />
                                    <span>全国</span>
                                    <Link to={'/all'}/>
                                </Menu.Item>
                                <Menu.Item key={'/list'}>
                                    <Icon type="unordered-list" />
                                    <span>列表</span>
                                    <Link to={'/list'}/>
                                </Menu.Item>
                            </Menu>
                        </Sider>
                        <Layout>
                            <Header style={{background: '#fff', padding: '0'}}>
                                <Icon
                                    style={{
                                        fontSize: '18px', lineHeight: '64px', padding: '0 24px',
                                        transition: 'color 0.3s'
                                    }}
                                    type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                                    onClick={this.toggle}
                                />
                                <div style={{float: 'right'}}>
                                    <Button type={"link"} size={"large"} onBlur={this.blurSearch}
                                            onClick={this.clickSearch}>
                                        <Icon type="search" style={{color: '#000'}}/>
                                    </Button>
                                    <input style={{
                                        height: '22px', border: '0',
                                        borderBottom: '1px solid #d9d9d9', paddingBottom: '2px',
                                        display: this.state.displaySearch
                                    }} placeholder={'搜索'}/>
                                </div>
                            </Header>
                            <Content>
                                <div style={{marginLeft: '20px', marginTop: '20px'}}>
                                    <Route path={'/'} exact component={Area}/>
                                    <Route path={'/all'} component={All}/>
                                    <Route path={'/list'} component={ResultList}/>
                                </div>
                            </Content>
                        </Layout>
                    </Layout>
                </Router>
            </div>
        )
    }
}

ReactDom.render(
    <App/>,
    document.getElementById('root')
)