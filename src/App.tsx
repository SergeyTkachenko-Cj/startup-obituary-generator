import React, { useEffect } from "react"
import Form from "./components/Form"
import Tombstone from "./components/Tombstone"
import SMCard from "./components/SMCard"
import './App.css'

export type Data = {
  name: string
  dob: string
  dod: string
  cause: string
  icon: string
  url: string
}

type Anim = "burying" | "off" | "done" 

export type formProps = {
  formInput: Data
  setFormInput: React.Dispatch<React.SetStateAction<Data>>
  setAnim: React.Dispatch<React.SetStateAction<Anim>>
  anim: Anim
}

function App() {

  const [ formInput, setFormInput ] = React.useState<Data>({
    name: "Theranos",
    dob: "2003",
    dod: "2018",
    cause: "Died after discovering that vibes, black turtlenecks and fraud are not FDA-approved blood tests IRL",
    icon: "",
    url: ""
  })

  const [ anim, setAnim ] = React.useState<Anim>("off")

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

  useEffect(() => {
    const q = encodeURIComponent("flower palette=false")
    fetch(`https://api.iconify.design/search?query=${q}&limit=10`)
    .then(res => res.json())
    .then(res => {
      const rand = Math.floor(Math.random() * res.icons.length)
      if (!res.icons[rand]) return
      const id = res.icons[rand] 
      const [prefix, name] = id.split(":")
      const svgUrl = `https://api.iconify.design/${prefix}/${name}.svg?color=%232c2e33` // #2c2e33
      
      setFormInput(prev => ({...prev, icon: svgUrl}))
    })
  }, [])

  function clearAnimShowCard(event: React.AnimationEvent<HTMLDivElement>) {
    if (event.animationName === "darkness") {
      setAnim("done")
    }
  }

  return (
    <>
    <div onAnimationEnd={clearAnimShowCard} className={`${anim !== "off" ? "blackout blackout-on" : "blackout"}`}>
      {anim === "done" && <SMCard formInput={formInput} />}
    </div>
    <div className={`${anim === "done" && "display-none"}`}>
    <div className={`${anim === "burying" ? "page shake" : "page"}`}>
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
          <span className="brand-mark" aria-hidden="true">🕯️</span>
          FAILWELL
        </a>
        <ul className="nav">
          <li><a href="#">other memorial projects</a></li>
        </ul>
      </header>

      <main className="hero">
        <Form 
          formInput={formInput} 
          setFormInput={setFormInput}
          anim={anim} 
          setAnim={setAnim} 
        />
        <Tombstone formInput={formInput} anim={anim} setFormInput={setFormInput} />
      </main>

      <footer className="foot">
        <p><strong>FAILWELL</strong> · Failed ideas. Better stories.</p>
        <p>Built with <span className="heart">♥</span> for all founders.</p>
      </footer>
    </div>
    </div>
    </>
  )
}

export default App