import React, {useState} from 'react'
import {Link, useLocation, useHistory} from 'react-router-dom'

import styles from './Nav.module.css'

let pathToKey = {
    '/': 0,
    '/all': 1,
    '/list': 2
}

const Nav = () => {
    let location = useLocation()
    let history = useHistory()
    let select = pathToKey[location.pathname]
    let leftOffset = 15 + (select * 118) + 'px'

    const mouseEnter = key => {
        let slide = document.getElementById('mr-slide')
        slide.style.left = 15 + (key * 118) + 'px'
    }
    const mouseOut = () => {
        let slide = document.getElementById('mr-slide')
        slide.style.left = leftOffset
    }

    return (
        <div className={styles.nav + ' fixed top-0 z-10 bg-white'}>
            <div className="relative">
                <ul className="sm:text-2xl hover:text-black">
                    <li className="inline-block p-5 cursor-pointer"
                        onClick={() => history.push('/')}
                        style={{margin: '0 15px'}} onMouseLeave={mouseOut}
                        onMouseEnter={() => mouseEnter(0)}>
                        地区
                    </li>
                    <li className="inline-block p-5 cursor-pointer"
                        onClick={() => history.push('/all')}
                        style={{margin: '0 15px'}} onMouseLeave={mouseOut}
                        onMouseEnter={() => mouseEnter(1)}>
                        全国
                    </li>
                    <li className="inline-block p-5 cursor-pointer"
                        onClick={() => history.push('/list')}
                        style={{margin: '0 15px'}} onMouseLeave={mouseOut}
                        onMouseEnter={() => mouseEnter(2)}>
                        列表
                    </li>
                </ul>
                <div id="mr-slide" className="bg-black h-1 absolute bottom-0 transition-all duration-200 ease-in"
                     style={{width: '88px', left: leftOffset}}/>
            </div>
        </div>
    )
}

export default Nav