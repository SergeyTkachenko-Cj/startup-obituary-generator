import React, { useEffect, useRef } from "react"
import Logo from "../assets/unicorn.svg?react"

function StartScreen({setstart}: {setstart: React.Dispatch<React.SetStateAction<boolean>>}) {

    const [parentWidth, setParentWidth] = React.useState(0)
    const parentRef = useRef<HTMLDivElement>(null)
    const textRef = useRef<HTMLDivElement>(null)
    let font = useRef<number>(55)

    useEffect(() => {
        const timer = setTimeout(() => {setstart(false)}, 2000)
        return () => clearTimeout(timer)
    }, [])

    useEffect(() => {
        const parent = parentRef.current
        if (!parent) return
        const ro = new ResizeObserver(([entry]) => {
          setParentWidth(entry.contentRect.width)
        })
        ro.observe(parent)    
        return () => ro.disconnect()
    }, [])

    useEffect(() => {
        if (!parentRef.current || !textRef.current || parentWidth === 0) return
        font.current = 55
        textRef.current.style.fontSize = `${font.current}px`
        while (
            textRef.current.scrollWidth > parentRef.current.clientWidth &&
            font.current > 8
        ) {
            font.current -= 1
            textRef.current.style.fontSize = `${font.current}px`
        }
    }, [parentWidth])

    return (
        <div className="full-viewport-block" ref={parentRef}>
            <div className="bg-opacity-screen"></div>
            <div className="img-cover">
                <Logo className="unicorn" />
            </div>
            <span ref={textRef} className="failwell">FAILWELL</span>
        </div>
    )
}

export default StartScreen