import { useEffect } from "react"
import * as htmlToImage from 'html-to-image'
import type { Data } from "../App"
import type { Anim } from "../App"
import tombstoneImg from '../assets/tombstone.png'

function Tombstone(props: 
                  {formInput: Data, 
                   anim: Anim, 
                   setUrl: React.Dispatch<React.SetStateAction<string>>
                  }) {
    
    const { name, dob, dod, cause, icon } = props.formInput

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
    
    return (
        <section className="stage" aria-label="Tombstone preview">
          <div className="memorial">
            <div className="tombstone" id="tombstone">
              <img
                className="tombstone-img"
                src={tombstoneImg}
                alt="Tombstone"
              />
              <div className="epitaph-block">
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