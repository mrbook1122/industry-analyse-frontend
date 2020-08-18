import React, {useState} from 'react'
import {Link, useLocation} from 'react-router-dom'

import styles from './Nav.module.css'

let pathToKey = {
    '/': 0,
    '/all': 1,
    '/list': 2
}

const Nav = () => {
    let location = useLocation()
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
                    <li className="inline-block p-5 cursor-pointer" style={{margin: '0 15px'}} onMouseLeave={mouseOut}
                        onMouseEnter={() => mouseEnter(0)}>
                        <Link to={'/'}>地区</Link>
                    </li>
                    <li className="inline-block p-5 cursor-pointer" style={{margin: '0 15px'}} onMouseLeave={mouseOut}
                        onMouseEnter={() => mouseEnter(1)}>
                        <Link to={'/all'}>全国</Link>
                    </li>
                    <li className="inline-block p-5 cursor-pointer" style={{margin: '0 15px'}} onMouseLeave={mouseOut}
                        onMouseEnter={() => mouseEnter(2)}>
                        <Link to={'/list'}>列表</Link>
                    </li>
                </ul>
                <div id="mr-slide" className="bg-black h-1 absolute bottom-0 transition-all duration-200 ease-in"
                     style={{width: '88px', left: leftOffset}}/>
            </div>
        </div>
    )
}

export default Nav