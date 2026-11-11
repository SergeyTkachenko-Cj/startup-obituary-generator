import React, { useEffect } from "react"
import type { formProps } from "../App"

function Form(props: formProps) {
    const { formInput, setFormInput, setAnim, anim, start, dynamicText } = props
    const [ popUp, setPopUp ] = React.useState(false)
    const [ closing, setClosing ] = React.useState(false)
    const [ valid, setValid ] = React.useState({
      name: true,
      cause: true,
      dob: true,
      dod: true,
      order: true
    })
    const timerRef = React.useRef<number | null>(null)
    const drumRefOne = React.useRef<HTMLDivElement>(null)
    const drumRefTwo = React.useRef<HTMLDivElement>(null)

    const datesDrum = Array.from({length: new Date().getFullYear() - 1799}, 
                                (_ , i) => ({
                                  id: i,
                                  date: new Date().getFullYear() - i
                                }))
    const dobIndex = datesDrum.findIndex(d => String(d.date) === formInput.dob)
    const dodIndex = datesDrum.findIndex(d => String(d.date) === formInput.dod)

    function getCenteredIndex(el: HTMLDivElement) {
      const items = el.querySelectorAll(".drum-item")
      if (!items.length) return 0
      const mid = el.getBoundingClientRect().top + el.clientHeight / 2
      let best = 0
      let bestDist = Infinity
      items.forEach((node, i) => {
        const rect = node.getBoundingClientRect()
        const dist = Math.abs(rect.top + rect.height / 2 - mid)
        if (dist < bestDist) {
          bestDist = dist
          best = i
        }
      })
      return best
    }

    function scrollDrumToYear(el: HTMLDivElement | null, year: string) {
      if (!el) return
      const item = el.querySelector(".drum-item")
      if (!(item instanceof HTMLElement)) return
      const index = datesDrum.findIndex(d => String(d.date) === year)
      if (index < 0) return
      el.scrollTop = index * item.offsetHeight
    }

    useEffect(() => {
      if (start) return
      scrollDrumToYear(drumRefOne.current, formInput.dob)
      scrollDrumToYear(drumRefTwo.current, formInput.dod)
      const id = requestAnimationFrame(() => {
        scrollDrumToYear(drumRefOne.current, formInput.dob)
        scrollDrumToYear(drumRefTwo.current, formInput.dod)
      })
      return () => cancelAnimationFrame(id)
    }, [start])

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {    
        const { name, value } = event.target
        
        setValid(prev => ({...prev, order: true, [name]: true}))

        setFormInput(prev => ({
            ...prev,
            [name]: value
        }))

        if (name === "name" && value.length === 30) { 
            setPopUp(true) 
            if (timerRef.current !== null) clearTimeout(timerRef.current)
            setClosing(false)
            timerRef.current = setTimeout(() => setClosing(true), 4000)
        }
    }

    function drumItemClass(index: number, activeIndex: number) {
      const dist = Math.abs(index - activeIndex)
      if (dist === 0) return "drum-item is-active"
      if (dist === 1) return "drum-item is-near"
      return "drum-item"
    }

    function onScroll(event: React.UIEvent<HTMLDivElement>) {
      const trgt = event.currentTarget.getAttribute("data-name")
      const el = event.currentTarget
      const index = getCenteredIndex(el)
      const year = datesDrum[index]?.date  
      if (year == null || (trgt !== "dob" && trgt !== "dod")) return

      setFormInput(prev => {
        if (trgt === "dob") {
          return prev.dob === String(year) ? prev : { ...prev, dob: String(year) }
        }
        return prev.dod === String(year) ? prev : { ...prev, dod: String(year) }
      })
      setValid(prev => ({ ...prev, order: true, [trgt]: true }))
    }

    function handleAnimationEnd() {
        if (closing) { 
            setPopUp(false)
            setClosing(false)
        }
    }

    function datesCheck(strng: string): boolean {
      const strngNum = Number(strng)
      return strngNum <= new Date().getFullYear() && strngNum >= 1800
    }

    function stringsCheck(strng: string): boolean {
      return Boolean(strng.trim())
    }

    function blackoutShow(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault()
        const { name, dob, dod, cause } = props.formInput

        const next = { 
          name: stringsCheck(name), 
          dob: datesCheck(dob), 
          dod: datesCheck(dod), 
          cause: stringsCheck(cause), 
          order: Number(dob) <= Number(dod)
        }
      
        setValid(next)
      
        if (next.cause && next.dob && next.dod && next.name && next.order) setAnim("burying")
    }
    
    return (
        <section>
            {popUp && <div className={`popup-window ${closing ? "popup-window-out" : "popup-window-in"}`} 
                           onAnimationEnd={handleAnimationEnd}>
                            The name is way too long. This's the reason your project failed.
                      </div>}
          <h1 className="headline">Give your failed {dynamicText.word} the funeral it deserves</h1>

          <form className="form-card" action="#" method="get" onSubmit={blackoutShow}>
            <div className="field">
              <label htmlFor="name">Startup name</label>
              <div className="input-wrap">
                <input
                  id="name"
                  name="name"
                  type="text"
                  maxLength={30}
                  value={formInput.name}
                  className={valid.name ? "" : "input-error"}
                  onChange={handleChange}
                />
                <span className="counter">{formInput.name.length}/30</span>
              </div>
            </div>

            <div className="field field-row">
              <div>
                <label htmlFor="dob">Year of birth</label>
                {/* <input
                  id="dob"
                  name="dob"
                  type="text"
                  inputMode="numeric"
                  value={formInput.dob}
                  maxLength={4}
                  className={valid.dob && valid.order ? "" : "input-error"}
                  onChange={handleChange}
                /> */}
                <div className="cylinder-frame">
                <div className={`drum-shell${valid.dob && valid.order ? "" : " input-error"}`}>
                  <div className="drum" ref={drumRefOne} onScroll={onScroll} data-name="dob">
                    {datesDrum.map((dt, i) => (
                      <div
                        key={dt.id}
                        className={drumItemClass(i, dobIndex)}
                        data-year={dt.date}
                      >
                        {dt.date}
                      </div>
                    ))}
                  </div>
                </div>
                </div>
              </div>
              <div>
                <label htmlFor="dod">Year of death</label>
                {/* <input
                  id="dod"
                  name="dod"
                  type="text"
                  inputMode="numeric"
                  value={formInput.dod}
                  maxLength={4}
                  className={valid.dod && valid.order ? "" : "input-error"}
                  onChange={handleChange}
                /> */}
                <div className="cylinder-frame">
                <div className={`drum-shell${valid.dod && valid.order ? "" : " input-error"}`}>
                  <div className="drum" ref={drumRefTwo} onScroll={onScroll} data-name="dod">
                    {datesDrum.map((dt, i) => (
                      <div
                        key={dt.id}
                        className={drumItemClass(i, dodIndex)}
                        data-year={dt.date}
                      >
                        {dt.date}
                      </div>
                    ))}
                  </div>
                </div>
                </div>
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
                  className={valid.cause ? "" : "input-error"}
                  onChange={handleChange}
                />
                <span className="counter">{formInput.cause.length}/100</span>
              </div>
            </div>

            <button className="bury" type="submit" disabled={anim === "burying"}>🕯️
              Bury startup
            </button>
          </form>
        </section>
    )
}

export default Form