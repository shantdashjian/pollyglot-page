import { useEffect, useRef, useState } from 'react'

import germanFlagUrl from '../assets/de-flag.png'
import japaneseFlagUrl from '../assets/jpn-flag.png'
import frenchFlagUrl from '../assets/fr-flag.png'
import loadingUrl from '../assets/loading.gif'

export default function Main() {
  const [showLanguages, setShowLanguages] = useState(true)
  const [translating, setTranslating] = useState(false)
  const [textToTranslate, setTextToTranslate] = useState('')
  const [language, setLanguage] = useState('german')
  const [translation, setTranslation] = useState('')
  const inputRef = useRef(null)

  const workerUrl = "https://pollyglot-worker.shant.workers.dev/"

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  function handleInput(e) {
    setTextToTranslate(e.target.value)
  }

  function handleCheckLanguage(e) {
    setLanguage(e.target.value)
  }

  async function handleTranslate() {
    setShowLanguages(false)
    setTranslating(true)
    const messages = [
      {
        role: 'system',
        content: `You are a translator from any language to ${language}. Translate the following to ${language}.`
      },
      {
        role: 'user',
        content: textToTranslate
      }
    ]
    
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messages),
    }

    const response = await fetch(workerUrl, options);
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.error);
    }
    setTranslating(false)
    setTranslation(result)
  }

  function handleStartOver() {
    setShowLanguages(true)
    setTextToTranslate('')
    inputRef.current.focus()
  }

  return (
    <div className="main-container">
      <div className="main-content-container">
        <div className='translate-container'>
          <span className="content-label">Text to translate 👇</span>
          <textarea id="text-to-translate" className="content-text" rows="2" value={textToTranslate} onChange={handleInput} ref={inputRef}></textarea>
        </div>
        {showLanguages && <div className='languages-container'>
          <span className="content-label">Select language 👇</span>
          <div className='languages'>
            <div className='language-container'>
              <input type="radio" id="german" name="language" value="german" checked={language === 'german'} onChange={handleCheckLanguage} />
              <label className="content-text" htmlFor="spanish">German<img className="flag" src={germanFlagUrl}></img></label>
            </div>
            <div className='language-container'>
              <input type="radio" id="japanese" name="language" value="japanese" checked={language === 'japanese'} onChange={(e) => setLanguage(e.target.value)} />
              <label className="content-text" htmlFor="japanese">Japanese<img className="flag" src={japaneseFlagUrl}></img></label>
            </div>
            <div className='language-container'>
              <input type="radio" id="french" name="language" value="french" checked={language === 'french'} onChange={handleCheckLanguage} />
              <label className="content-text" htmlFor="french">French<img className="flag" src={frenchFlagUrl}></img></label>
            </div>
          </div>
          <button onClick={handleTranslate}>Translate</button>
        </div>}
        {translating &&
          <div className='loading-img-container'>
            <img className='loading-img' src={loadingUrl} />
          </div>
        }
        {!showLanguages && !translating && <div className='result-container'>
          <span className="content-label">Your translation 👇</span>
          <textarea id="translation" className="content-text" rows="2" readOnly value={translation}></textarea>
          <button onClick={handleStartOver}>Start Over</button>
        </div>}
      </div>
    </div >
  )
}