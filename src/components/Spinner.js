import React from 'react'

import './Spinner.css'

/**
 * 加载动画
 */
const Spinner = () => {
    return (
        <div className="mr-spinner-container">
            <div className="mr-spinner">
                <div className="mr-rect1"/>
                <div className="mr-rect2"/>
                <div className="mr-rect3"/>
                <div className="mr-rect4"/>
                <div className="mr-rect5"/>
            </div>
        </div>
    )
}

export default Spinner