import frenchFlagUrl from '../assets/fr-flag.png'
import spanishFlagUrl from '../assets/sp-flag.png'
import japaneseFlagUrl from '../assets/jpn-flag.png'

export default function Main() {

  return (
    <div className="main-container">
      <div className="main-content-container">
        <div className='translate-container'>
          <span className="content-label">Text to translate 👇</span>
          <textarea id="text-to-translate" className="content-text" rows="3"></textarea>
        </div>
        <div className='languages-container'>
          <span className="content-label">Select language 👇</span>
          <div className='languages'>
            <div className='language-container'>
              <input type="radio" id="french" name="language" value="french" checked />
              <label className="content-text" htmlFor="french">French<img className="flag" src={frenchFlagUrl}></img></label>
            </div>
            <div className='language-container'>
              <input type="radio" id="spanish" name="language" value="spanish" />
              <label className="content-text" htmlFor="french">Spanish<img className="flag" src={spanishFlagUrl}></img></label>
            </div>
            <div className='language-container'>
              <input type="radio" id="japanese" name="language" value="japanese" />
              <label className="content-text" htmlFor="japanese">Japanese<img className="flag" src={japaneseFlagUrl}></img></label>
            </div>
          </div>
          <button>Translate</button>
        </div>
        {/* <div className='result-container'>
          <span className="content-label">Your translation 👇</span>
          <textarea id="translation" className="content-text" rows="3" readOnly></textarea>
          <button>Start Over</button>
        </div> */}
      </div>
    </div >
  )
}