import React from "react"
import Form from "./components/Form"
import Tombstone from "./components/Tombstone"
import './App.css'

export type Data = {
  name: string
  dob: string
  dod: string
  cause: string
}

export type formProps = {
  formInput: Data
  setFormInput: React.Dispatch<React.SetStateAction<Data>>
  setBlackout: React.Dispatch<React.SetStateAction<boolean>>
  blackout: boolean
}

function App() {

  const [ formInput, setFormInput ] = React.useState<Data>({
    name: "Sora",
    dob: "2024",
    dod: "2026",
    cause: "High computational costs. Lack of a sustainable business model. Declining user engagement."
  })

  const [ blackout, setBlackout ] = React.useState(false)

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
  
  return (
    <>
    <div className={`${blackout ? "blackout blackout-on" : "blackout"}`}></div>
    <div className={`${blackout ? "page shake" : "page"}`}>
    <div className={`${blackout ? "dirt-fall-block blackout-on" : "dirt-fall-block"}`}>
      <div className={`earth-fill${blackout ? " earth-fill-on" : ""}`}>
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
          <li><a href="#">About</a></li>
          <li><a href="#">Gallery</a></li>
          <li><a href="#">Share</a></li>
        </ul>
      </header>

      <main className="hero">
        <Form 
          formInput={formInput} 
          setFormInput={setFormInput}
          blackout={blackout} 
          setBlackout={setBlackout} 
        />
        <Tombstone formInput={formInput} />
      </main>

      <footer className="foot">
        <p><strong>FAILWELL</strong> · Failed ideas. Better stories.</p>
        <p>Built with <span className="heart">♥</span> for all founders.</p>
      </footer>
    </div>
    </>
  )
}

export default App