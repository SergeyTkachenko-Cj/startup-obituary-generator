import type { Data } from "../App"
import theranosImg from "../assets/black-theranos-social-media-dark.png"

function SMCard(props: { formInput: Data; pngUrl: string }) {
  const { name, dob, dod, cause } = props.formInput
  const POST_TEXT = `The company ${name}, which was with us from ${dob} until ${dod}, has sadly passed away today after losing its battle with a serious condition known as ${cause}`
  const encoded = encodeURIComponent(POST_TEXT)
  const canSave = props.pngUrl.startsWith("data:image/png;base64")

  function handleSaveImage() {
    if (!canSave) return
    const link = document.createElement("a")
    link.download = "tombstone.png"
    link.href = props.pngUrl
    link.click()
  }

  return (
    <section className="sm-stage" aria-label="Share memorial">
      <div className="sm-page">
        <header className="sm-top">
          <a className="sm-brand" href="#">
            <span className="sm-brand-mark" aria-hidden="true">🕯️</span>
            FAILWELL
          </a>
          <a className="sm-nav" href="#">other memorial projects</a>
        </header>

        <main className="sm-hero">
          <div className="sm-copy">
            <h1 className="sm-heading">Last Words</h1>
            <p className="sm-caption">
              Let the world know what a wonderful project you had. Post it on
              social media. Your startup deserves a good funeral.
            </p>
            <div className="sm-actions">
              <a
                className="sm-btn"
                href={`https://x.com/intent/tweet?text=${encoded}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 798 798" style={{display: "block", background: "#000000", border: 0, outline: 0, margin: 0, padding: 0}} overflow="hidden">
                  <title>White X logo on black</title>
                  <path fill="#FFFFFF" fillRule="evenodd" transform="translate(0 34)" d="M61 30H267L441 264L657 30H718L469 301L750 678H545L354 424L120 678H60L327 387ZM150 74L567 633H661L244 74Z"/>
                </svg>
                Post to X
              </a>
              <a
                className="sm-btn"
                href={`https://bsky.app/intent/compose?text=${encoded}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="1.4em" height="1.4em" viewBox="0 0 1174 1174" style={{display: "block", background: "#000", border: 0, outline: 0, margin: 0, padding: 0}}>
                  <title>White Bluesky butterfly on black</title>
                  <path fill="#FFFFFF" stroke="none" transform="translate(0 80)" d="
                    M 162,205 C 162,148 183,119 232,127 C 338,144 477,282 572,473 C 576,481 580,482 585,474 C 683,303 816,154 924,135 C 979,126 1002,154 1002,208
                    C 1003,252 991,383 982,438 C 967,539 895,589 769,584 C 755,583 755,588 769,592 C 842,614 902,646 905,702 C 909,756 864,808 811,845
                    C 765,877 726,881 692,860 C 640,830 609,762 586,696 C 580,679 575,678 569,696 C 549,758 515,827 466,857 C 429,881 388,865 357,848
                    C 306,819 257,768 251,721 C 240,657 287,614 390,587 C 403,583 403,580 389,581 C 267,585 190,534 178,435 C 170,377 165,282 162,228 C 162,219 162,212 162,205 Z"/>
                </svg>
                Post to Bluesky
              </a>
              <button
                className="sm-btn sm-btn-solid"
                type="button"
                onClick={handleSaveImage}
                disabled={!canSave}
              >
                <svg width="1.5em" height="1.5em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M4 6C4 4.89543 4.89543 4 6 4H12H14.1716C14.702 4 15.2107 4.21071 15.5858 4.58579L19.4142 8.41421C19.7893 8.78929 20 9.29799 20 9.82843V12V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V6Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 4H13V7C13 7.55228 12.5523 8 12 8H9C8.44772 8 8 7.55228 8 7V4Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M7 15C7 13.8954 7.89543 13 9 13H15C16.1046 13 17 13.8954 17 15V20H7V15Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Save Image
              </button>
            </div>
          </div>

          <div className="sm-preview">
            <div className="sm-preview-frame">
              <div className="x-top-bar"></div>
              <div className="text-block">
                Today I did the responsible founder thing: stopped pretending {name} was “temporarily paused” and gave it a proper funeral. 🪦
              <span className="text-block-hash">#failwell #startup #buildinpublic</span>
              </div>
              {/* <img
                className="sm-preview-bg"
                src={theranosImg}
                alt={`Social post preview for ${name}`}
              /> */}
              {canSave && (
                <div className="shot-tomb-img">
                  <img src={props.pngUrl} alt="" />
                </div>
              )}
              <div className="text-block-footer"></div>
            </div>
          </div>
        </main>

        <footer className="sm-foot">
          <p>
            <strong>FAILWELL</strong> · Failed ideas. Better stories.
          </p>
          <p>
            Built with <span className="heart">♥</span> for all founders.
          </p>
        </footer>
      </div>
    </section>
  )
}

export default SMCard