// import React from "react"
import type { Data } from "../App"
import tombstoneImg from '../assets/tombstone.png'
import theranosImg from "../assets/black-theranos-social-media-dark.png"

const SHARE_TEXT = 'Let the world know what a wonderful project you had. Post it on social media. Your startup deserves a good funeral.'

function SMCard(props: {formInput: Data}) {
    const { name, dob, dod, cause, icon } = props.formInput
    const encoded = encodeURIComponent(SHARE_TEXT)

    function handleSaveImage() {
        // Next: capture #sm-card-canvas with html-to-image / similar
    }

    return (
        <section className="sm-stage" aria-label="Share memorial card">
          <div className="sm-shell">
            <article className="sm-card" id="sm-card-canvas">
              <header className="sm-card-top">
                <p className="sm-brand-mark">🕯️ FAILWELL</p>
                <h1 className="sm-heading">Last Words</h1>
              </header>
              <div className="sm-grave">
                <div className="tombstone">
                <img
                    className="tombstone-img"
                    src={theranosImg}
                    alt={`social media post example for ${name}`}
                  />
                </div>

                {/* <div className="tombstone">
                  <img
                    className="tombstone-img"
                    src={tombstoneImg}
                    alt={`Tombstone for ${name}`}
                  />
                  <div className="epitaph-block sm-epitaph">
                    <p className="rip">R.I.P.</p>
                    <h2 className="startup-name">{name}</h2>
                    <p className="years">
                      {dob} – {dod}
                    </p>
                    <div className="flourish" aria-hidden="true" />
                    <p className="cause">{cause}</p>
                    {icon && <img src={icon} className="icon" alt="" />}
                  </div>
                </div> */}
              </div>
              <p className="sm-caption">{SHARE_TEXT}</p>
              {/* <p className="sm-card-foot">Failed ideas. Better stories.</p> */}
              <div className="sm-actions">
              <a
                className="sm-btn"
                href={`https://twitter.com/intent/tweet?text=${encoded}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Post to X
              </a>
              <a
                className="sm-btn"
                href={`https://bsky.app/intent/compose?text=${encoded}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Post to Bluesky
              </a>
              <button className="sm-btn sm-btn-solid" type="button" onClick={handleSaveImage}>
                Save Image
              </button>
            </div>
            </article>
          </div>
        </section>
    )    
}

export default SMCard