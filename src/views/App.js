import React, {useEffect} from 'react'
import 'antd/dist/antd.min.css'
import '../assets/main.css'
import 'fullpage.js/dist/fullpage.min.css'

// import './examples.css'
import fullpage from 'fullpage.js'

import Introduce from "./Introduce";
import Histogram from "./Histogram";

const App = () => {

    useEffect(() => {
        new fullpage('#fullpage', {
            // dragAndMove: true
        });
    }, [])

    return (
        <div>
            <div id="fullpage">
                <div className="section">
                    <Introduce/>
                </div>
                <div className="section">
                    <Histogram/>

                </div>
                <div className="section" id="section2">
                    <div className="intro">
                        <h1>Great User Experience!</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App