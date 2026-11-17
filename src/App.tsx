import React from "react"
import Form from "./components/Form"
import Tombstone from "./components/Tombstone"
import SMCard from "./components/SMCard"
import StartScreen from "./components/StartScreen"
import './App.css'
import svg from "./assets/unicorn.svg" 

// TypeScript -----------------------------------------------------------

export type Data = {
  name: string
  dob: string
  dod: string
  cause: string
}

export type Dynamic = {
  word: string
  tagline: string
}

export type Anim = "burying" | "off" | "done" 

export type formProps = {
  formInput: Data
  setFormInput: React.Dispatch<React.SetStateAction<Data>>
  setAnim: React.Dispatch<React.SetStateAction<Anim>>
  anim: Anim
  start: boolean
  dynamicText: Dynamic
}

// -----------------------------------------------------------------------

function App() {
  const [ formInput, setFormInput ] = React.useState<Data>({
    name: "iPod",
    dob: "2001",
    dod: "2022",
    cause: "The iPhone killed it. Apple then sold the murder weapon for a thousand dollars.",
  })

  const [ anim, setAnim ] = React.useState<Anim>("off")
  const [ start, setStart ] = React.useState<boolean>(true)
  const [ url, setUrl ] = React.useState<string>("")

  const words = ["startup", "project", "SaaS", "business", "company"]
  const taglines = [
      "They promised to change the world. They couldn't afford the hosting.",
      "Every failed startup has a story. Most of them are embarrassing.",
      "Someone had to give these startups a proper funeral.",
      "Founder insists it was a pivot.",
      "Investors declined to comment.",
      "Three users are devastated.",
      "The founder described the company's death as an exciting new chapter.",
      "Where unicorns go to die.",
      "The only exit strategy you'll ever need."
    ];

  const [dynamicText, setDynamicText] = React.useState({ word: words[Math.floor(Math.random() * words.length)], tagline: taglines[Math.floor(Math.random() * taglines.length)] })

  const dirtPieces = React.useMemo(
    () =>
      Array.from({ length: 180 }, (_, i) => {
        // More pieces late: random^2 clusters delays toward the end
        const delay = Math.pow(Math.random(), 2) * 6 // 0 → ~6s ramp
        return {
          id: i,
          left: Math.random() * 100,
          size: 8 + Math.random() * 22,
          delay,
          duration: 1.4 + Math.random() * 1.2, // 1.4–2.6s fall
          rotate: Math.random() * 360,
          color: ["#2a2420", "#3d3530", "#524840", "#2a2420", "#3d3530"][
            i % 5
          ],
        }
      }),
    []
  )

  function clearAnimShowCard(event: React.AnimationEvent<HTMLDivElement>) {
    if (event.animationName === "darkness") {
      setAnim("done")
      setDynamicText(prev => {
        const filteredTaglines = taglines.filter(tag => tag !== prev.tagline)
        return {...prev, tagline: filteredTaglines[Math.floor(Math.random() * filteredTaglines.length)]}
      })
    }
  }

  return (
    <>
    {start && <StartScreen setstart={setStart} />}
    <div style={{display: start ? "none" : "block"}}>
    <div onAnimationEnd={clearAnimShowCard} className={`${anim !== "off" ? "blackout blackout-on" : "blackout"}`}>
      {anim === "done" && <SMCard formInput={formInput} pngUrl={url} dynamicText={dynamicText} />}
    </div>
    <div className={`${anim === "done" && "display-none"}`}>
    <div className={`${anim === "burying" && url !== "" ? "page shake" : "page"}`}>
    <div className={`${anim === "burying" ? "dirt-fall-block blackout-on" : "dirt-fall-block"}`}>
      <div className={`earth-fill${anim === "burying" ? " earth-fill-on" : ""}`}>
        <div className="earth-cap" aria-hidden="true" />
      </div>
      {dirtPieces.map((piece) => (
        <span
          key={piece.id}
          className="dirt-piece"
          style={{
            left: `${piece.left}%`,
            width: `${piece.size}px`,
            height: `${piece.size}px`,
            animationDelay: `${piece.delay}s`,
            animationDuration: `${piece.duration}s`,
            background: piece.color,
          }}
        />
      ))}
    </div>
      <header className="top">
        <a className="brand" href="#">
          <span className="brand-mark" aria-hidden="true">
            <img src={svg} alt="logo" />
          </span>
          FAILWELL
        </a>
      </header>

      <main className="hero">
        <Form 
          formInput={formInput} 
          setFormInput={setFormInput}
          anim={anim} 
          setAnim={setAnim} 
          start={start}
          dynamicText={dynamicText}
        />
        <Tombstone 
          formInput={formInput} 
          anim={anim} 
          setUrl={setUrl}
          />
      </main>

      <footer className="foot">
        <p><strong>FAILWELL</strong> - {dynamicText.tagline}</p>
        <ul className="nav">
          <li><a href="#">other memorial projects</a></li>
        </ul>
      </footer>
    </div>
    </div>
    </div>
    </>
  )
}

export default App