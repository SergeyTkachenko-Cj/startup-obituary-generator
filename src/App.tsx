import './App.css'
import tombstoneImg from './assets/tombstone.png'

function App() {
  return (
    <div className="page">
      <header className="top">
        <a className="brand" href="#">
          <span className="brand-mark" aria-hidden="true">🕯️
            {/* <svg viewBox="0 0 24 24">
              <path d="M7 21V9.5C7 8.1 8.1 7 9.5 7h5C15.9 7 17 8.1 17 9.5V21H7zm2-2h6v-9.5c0-.3-.2-.5-.5-.5h-5c-.3 0-.5.2-.5.5V19zM6 21h12v2H6v-2zM12 3l1.2 2.4L16 6l-2.2 1.2L12 10l-1.2-2.8L8 6l2.8-.6L12 3z" />
            </svg> */}
          </span>
          REST IN PIVOT
        </a>
        <ul className="nav">
          <li><a href="#">About</a></li>
          <li><a href="#">Gallery</a></li>
          <li><a href="#">Share</a></li>
        </ul>
      </header>

      <main className="hero">
        <section>
          {/* <p className="eyebrow">Startup Obituary Generator</p> */}
          <h1 className="headline">Give your abandoned startup the funeral it deserves.</h1>
          {/* <p className="lede">Great ideas don’t always make it. But they can still rest in peace.</p> */}

          <form className="form-card" action="#" method="get">
            <div className="field">
              <label htmlFor="name">Startup name</label>
              <div className="input-wrap">
                <input
                  id="name"
                  name="name"
                  type="text"
                  maxLength={30}
                  defaultValue="Sora"
                />
                <span className="counter">9/30</span>
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
                  defaultValue="2024"
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
                  defaultValue="2026"
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
                  maxLength={60}
                  defaultValue='High operational costs. Lack of a sustainable business model.'
                />
                <span className="counter">20/60</span>
              </div>
            </div>

            <button className="bury" type="submit">🕯️
              {/* <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8 21V10c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2v11H8zm-1 0H6v2h12v-2h-1V10c0-1.66-1.34-3-3-3h-4C8.34 7 7 8.34 7 10v11zM12 2l.9 1.8L15 4.5l-1.7.9L12 7.5l-.9-2.1L9.4 4.5l2.1-.7L12 2z" />
              </svg> */}
              Bury startup
            </button>
          </form>
        </section>

        <section className="stage" aria-label="Tombstone preview">
          <div className="memorial">
            <div className="tombstone">
              <img
                className="tombstone-img"
                src={tombstoneImg}
                alt="Tombstone"
              />
              <div className="epitaph-block">
                <p className="rip">R.I.P.</p>
                <h2 className="startup-name">Sora</h2>
                <p className="years">2024 – 2026</p>
                <div className="flourish" aria-hidden="true" />
                <p className="cause">“High operational costs. Lack of a sustainable business model. Legal risks. Competition.”</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="foot">
        <p><strong>RIP.MVP</strong> · Failed ideas. Better stories.</p>
        <p>Built with <span className="heart">♥</span> for all founders.</p>
      </footer>
    </div>
  )
}

export default App