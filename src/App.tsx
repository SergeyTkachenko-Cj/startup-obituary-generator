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
}

function App() {

  const [ formInput, setFormInput ] = React.useState<Data>({
    name: "Sora",
    dob: "2024",
    dod: "2026",
    cause: "High computational costs. Lack of a sustainable business model. Declining user engagement."
  })
  
  return (
    <div className="page">
      <header className="top">
        <a className="brand" href="#">
          <span className="brand-mark" aria-hidden="true">🕯️</span>
          REST IN PIVOT
        </a>
        <ul className="nav">
          <li><a href="#">About</a></li>
          <li><a href="#">Gallery</a></li>
          <li><a href="#">Share</a></li>
        </ul>
      </header>

      <main className="hero">
        <Form formInput={formInput} setFormInput={setFormInput} />
        <Tombstone formInput={formInput} />
      </main>

      <footer className="foot">
        <p><strong>REST IN PIVOT</strong> · Failed ideas. Better stories.</p>
        <p>Built with <span className="heart">♥</span> for all founders.</p>
      </footer>
    </div>
  )
}

export default App