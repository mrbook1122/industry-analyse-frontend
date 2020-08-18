import React, {useEffect, useState} from 'react'

import fullpage from "fullpage.js";
import Introduce from "../Introduce";
import Histogram from "../Histogram";
import Polyline from "../Polyline";

const CityPage = () => {
    const [fullPage, setFullPage] = useState(null)

    useEffect(() => {
        let fullPage = new fullpage('#fullpage', {
            // dragAndMove: true
        });
        // fullPage.setAllowScrolling(false)
        setFullPage(fullPage)
        return () => {
            fullPage.destroy('all')
        }
    }, [])
    return (
        <div id="fullpage">
            <div className="section">
                <Introduce/>
            </div>
            <div className="section">
                <Histogram fullPage={fullPage}/>
            </div>
            <div className="section">
                <Polyline fullPage={fullPage}/>
            </div>
        </div>
    )
}

export default CityPage