import { useEffect, useState, useRef } from "react"
import * as htmlToImage from 'html-to-image'
import type { Data } from "../App"
import type { Anim } from "../App"
import tombstoneImg from '../assets/cartoon-tombstone-pale-green.png'
import tombstoneImgCropped from "../assets/cartoon-tombstone-cropped-foundation.png"

function Tombstone(props: 
                  {formInput: Data, 
                   anim: Anim, 
                   setUrl: React.Dispatch<React.SetStateAction<string>>
                  }) {
    
    const { name, dob, dod, cause, icon } = props.formInput

    const [parentWidth, setParentWidth] = useState(0)
    const parentRef = useRef<HTMLDivElement>(null)
    const textRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
      const tomb = document.querySelector("#tombstone")
      let cancelled = false
      
      if (props.anim === "burying" && tomb instanceof HTMLElement) {
        htmlToImage.toPng(tomb)
        .then(dataUrl => {if (!cancelled) props.setUrl(dataUrl)})
        .catch(err => {
          console.error('oops, something went wrong!', err);
          if (!cancelled) props.setUrl("")
        });
      return () => { cancelled = true }
      }
    }, [props.anim])

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
      const DESIGN_WIDTH = 480 // same as .memorial max
      const BASE_FONT = 17.6   // ≈ 1.1rem at 480px — tune to taste
      if (!parentRef.current || !textRef.current || parentWidth === 0) return
      textRef.current.style.fontSize = `${BASE_FONT * (parentWidth / DESIGN_WIDTH)}px`
  }, [parentWidth])
    
    return (
        <section className="stage" aria-label="Tombstone preview">
          <div className="memorial">
            <div className="tombstone" id="tombstone" ref={parentRef}>
              <img
                className="tombstone-img"
                src={tombstoneImg}
                alt="Tombstone"
              />
              <img 
                className="tombstone-img-cropped"
                src={tombstoneImgCropped}
                alt="Tombstone"
              />
              <div className="epitaph-block" ref={textRef}>
                <p className="rip">R.I.P.</p>
                <h2 className="startup-name">{name}
                </h2>
                <p className="years">{dob} – {dod}</p>
                <div className="flourish" aria-hidden="true" />
                <p className="cause">{cause}</p>
                {icon && <img src={icon} className="icon" />}
              </div>
            </div>
          </div>
        </section>
    )
}

export default Tombstone