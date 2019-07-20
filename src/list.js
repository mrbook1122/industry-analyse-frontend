import React from 'react'
import {Table} from 'antd'

class App extends React.Component {
    render() {
        const dataSource = [
            {
                name: '胡彦斌',
                age: 32,
                address: '西湖区湖底公园1号',
            },
            {
                name: '胡彦祖',
                age: 42,
                address: '西湖区湖底公园1号',
            },
        ];

        const columns = [
            {
                title: '姓名',
                dataIndex: 'name',
            },
            {
                title: '年龄',
                dataIndex: 'age',
            },
            {
                title: '住址',
                dataIndex: 'address',
            },
        ];

        return (
            <>
                <Table dataSource={dataSource} columns={columns}/>
            </>
        )
    }
}

export default App