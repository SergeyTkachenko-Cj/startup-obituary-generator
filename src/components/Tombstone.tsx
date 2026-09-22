import type { Data } from "../App"
import tombstoneImg from '../assets/tombstone.png'

function Tombstone(props: {formInput: Data}) {
    
    const { name, dob, dod, cause } = props.formInput
    
    return (
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
                <h2 className="startup-name">{name}</h2>
                <p className="years">{dob} – {dod}</p>
                <div className="flourish" aria-hidden="true" />
                <p className="cause">{cause}</p>
              </div>
            </div>
          </div>
        </section>
    )
}

export default Tombstone