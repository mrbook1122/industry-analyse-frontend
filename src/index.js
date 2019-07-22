import React from 'react'
import ReactDom from 'react-dom'
import {HashRouter as Router, Route, Link} from 'react-router-dom'
import {createHashHistory} from 'history'
import {Layout, Icon, Menu} from 'antd'

import Area from './area'
import All from './all'
import ResultList from './list'

const {Header, Sider, Content} = Layout
const history = createHashHistory()

const CitySVG = () => (
    <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill={'currentColor'}>
        <path
            d="M511.743662 869.681332c-5.697769 0-11.139711-2.362814-15.026228-6.526647-12.138458-12.974499-297.224402-319.763744-297.224402-487.031329 0-172.185594 140.070152-312.27212 312.248583-312.27212s312.25677 140.086525 312.25677 312.27212c0 167.267585-285.09106 474.057853-297.226448 487.030305C522.88235 867.319541 517.441431 869.681332 511.743662 869.681332zM511.743662 105.002472c-149.480476 0-271.096325 121.617895-271.096325 271.119861 0 130.844024 212.120119 376.60124 271.096325 442.391642 58.975183-65.806775 271.105534-311.626413 271.105534-442.391642C782.849196 226.618321 661.225161 105.002472 511.743662 105.002472zM936.999019 960.980711l-850.520947 0c-7.330966 0-14.107299-3.903913-17.785062-10.238179-3.689019-6.335289-3.724835-14.161534-0.090051-20.527522l130.513496-228.989321c5.634324-9.870812 18.205641-13.295817 28.065196-7.68503 9.872858 5.624091 13.31219 18.193361 7.682983 28.064172l-112.975051 198.22669 779.070638 0-116.955712-197.952444c-5.783727-9.78997-2.536776-22.390963 7.234775-28.178783 9.740852-5.785773 22.39301-2.538823 28.195156 7.248078l135.280056 228.993414c3.761674 6.363941 3.823072 14.240329 0.157589 20.656459C951.209672 957.024609 944.393429 960.980711 936.999019 960.980711zM511.743662 508.478803c-66.200748 0-120.066563-53.862745-120.066563-120.072703 0-66.228377 53.865815-120.090099 120.066563-120.090099 66.208934 0 120.073726 53.864792 120.073726 120.090099C631.816365 454.616058 577.953619 508.478803 511.743662 508.478803zM511.743662 309.465191c-43.512003 0-78.915327 35.407418-78.915327 78.94091 0 43.51098 35.403325 78.923514 78.915327 78.923514 43.518143 0 78.922491-35.412534 78.922491-78.923514C590.666152 344.872608 555.262828 309.465191 511.743662 309.465191z">
        </path>
    </svg>
)

const CityIcon = props => <Icon component={CitySVG} {...props}/>


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false
        }
        this.toggle = this.toggle.bind(this)
    }

    toggle() {
        this.setState({
            collapsed: !this.state.collapsed,
        });
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
                                    <CityIcon style={{color: '#fff'}}/>
                                    <span>地区</span>
                                    <Link to={'/'}/>
                                </Menu.Item>
                                <Menu.Item key={'/all'}>
                                    <Icon type="user"/>
                                    <span>nav 1</span>
                                    <Link to={'/all'}/>
                                </Menu.Item>
                                <Menu.Item key={'/list'}>
                                    <Icon type={'user'}/>
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