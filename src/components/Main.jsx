
import OpenAI from 'openai'

import frenchFlagUrl from '../assets/fr-flag.png'
import spanishFlagUrl from '../assets/sp-flag.png'
import japaneseFlagUrl from '../assets/jpn-flag.png'
import loadingUrl from '../assets/loading.gif'

import { useState } from 'react'

export default function Main() {

  const [showLanguages, setShowLanguages] = useState(true)
  const [translating, setTranslating] = useState(false)
  const [textToTranslate, setTextToTranslate] = useState('')
  const [translation, setTranslation] = useState('')
  const [language, setLanguage] = useState('french')

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
    const openai = new OpenAI({
      apiKey: import.meta.env.VITE_OPENAI_API_KEY,
      dangerouslyAllowBrowser: true
    })
    const result = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: messages
    })
    setTranslating(false)
    setTranslation(result.choices[0].message.content)
  }

  return (
    <div className="main-container">
      <div className="main-content-container">
        <div className='translate-container'>
          <span className="content-label">Text to translate 👇</span>
          <textarea id="text-to-translate" className="content-text" rows="2" value={textToTranslate} onChange={(e) => setTextToTranslate(e.target.value)}></textarea>
        </div>
        { showLanguages && <div className='languages-container'>
          <span className="content-label">Select language 👇</span>
          <div className='languages'>
            <div className='language-container'>
              <input type="radio" id="french" name="language" value="french" checked={language === 'french'} onChange={(e) => setLanguage(e.target.value)}/>
              <label className="content-text" htmlFor="french">French<img className="flag" src={frenchFlagUrl}></img></label>
            </div>
            <div className='language-container'>
              <input type="radio" id="spanish" name="language" value="spanish" checked={language === 'spanish'} onChange={(e) => setLanguage(e.target.value)}/>
              <label className="content-text" htmlFor="spanish">Spanish<img className="flag" src={spanishFlagUrl}></img></label>
            </div>
            <div className='language-container'>
              <input type="radio" id="japanese" name="language" value="japanese" checked={language === 'japanese'} onChange={(e) => setLanguage(e.target.value)}/>
              <label className="content-text" htmlFor="japanese">Japanese<img className="flag" src={japaneseFlagUrl}></img></label>
            </div>
          </div>
          <button onClick={handleTranslate}>Translate</button>
        </div> }
        {translating && 
          <div className='loading-img-container'>
            <img className='loading-img' src={loadingUrl}/>
          </div>
          }
        {!showLanguages && !translating && <div className='result-container'>
          <span className="content-label">Your translation 👇</span>
          <textarea id="translation" className="content-text" rows="2" readOnly value={translation}></textarea>
          <button onClick={() => {setShowLanguages(true); setTextToTranslate('');}}>Start Over</button>
        </div> }
      </div>
    </div >
  )
}