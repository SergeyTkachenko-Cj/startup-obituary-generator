import React, { useEffect } from "react"
import svg from "../assets/dead unicorn_Final square320.svg" 

function StartScreen({setstart}: {setstart: React.Dispatch<React.SetStateAction<boolean>>}) {
    
    // useEffect(() => {
    //     const timer = setTimeout(() => {setstart(false)}, 2000)

    //     return () => clearTimeout(timer)
    // }, [])

    return (
        <div className="full-viewport-block">
            <div className="img-cover">
                <img src={svg} alt="logo" />
            </div>
            <span>FAILWELL</span>
        </div>
    )
}

export default StartScreen