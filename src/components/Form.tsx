import React from "react"
import type { formProps } from "../App"

function Form(props: formProps) {
    
    const { formInput, setFormInput } = props

    const [ popUp, setPopUp ] = React.useState(false)
    const [closing, setClosing] = React.useState(false)

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {    
        const { name, value } = event.target
        
        setFormInput(prev => ({
            ...prev,
            [name]: value
        }))

        if (name === "name" && value.length === 30) { 
            setPopUp(true) 
            setTimeout(() => setClosing(true), 4000)
        }
    }

    function handleAnimationEnd() {
        if (closing) { 
            setPopUp(false)
            setClosing(false)
        }
    }
    
    return (
        <section>
            {popUp && <div className={`popup-window ${closing ? "popup-window-out" : "popup-window-in"}`} 
                           onAnimationEnd={handleAnimationEnd}>
                            Your project's name is way too long. This's the reason your project failed.
                      </div>}
                      
          <h1 className="headline">Give your abandoned project the funeral it deserves.</h1>

          <form className="form-card" action="#" method="get">
            <div className="field">
              <label htmlFor="name">Startup name</label>
              <div className="input-wrap">
                <input
                  id="name"
                  name="name"
                  type="text"
                  maxLength={30}
                  value={formInput.name}
                  onChange={handleChange}
                />
                <span className="counter">{formInput.name.length}/30</span>
              </div>
            </div>

            <div className="field field-row">
              <div>
                <label htmlFor="dob">Year of birth</label>
                <input
                  id="dob"
                  name="dob"
                  type="text"
                  inputMode="numeric"
                  maxLength={4}
                  value={formInput.dob}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="dod">Year of death</label>
                <input
                  id="dod"
                  name="dod"
                  type="text"
                  inputMode="numeric"
                  maxLength={4}
                  value={formInput.dod}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="field">
              <label htmlFor="cause">Cause of death</label>
              <div className="input-wrap">
                <input
                  id="cause"
                  name="cause"
                  type="text"
                  maxLength={100}
                  value={formInput.cause}
                  onChange={handleChange}
                />
                <span className="counter">{formInput.cause.length}/100</span>
              </div>
            </div>

            <button className="bury" type="submit">🕯️
              Bury startup
            </button>
          </form>
        </section>
    )
}

export default Form