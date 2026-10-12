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
              <button
                className="sm-btn sm-btn-solid"
                type="button"
                onClick={handleSaveImage}
                disabled={!canSave}
              >
                Save Image
              </button>
            </div>
          </div>

          <div className="sm-preview">
            <div className="sm-preview-frame">
              <img
                className="sm-preview-bg"
                src={theranosImg}
                alt={`Social post preview for ${name}`}
              />
              {canSave && (
                <div className="shot-tomb-img">
                  <img src={props.pngUrl} alt="" />
                </div>
              )}
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