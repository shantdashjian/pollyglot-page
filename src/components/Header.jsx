import parrotUrl from '../assets/parrot.png'

export default function Header() {

  return (
    <div className='header-container'>
      <img className="parrot-img" src={parrotUrl} alt="parrot" />
      <div className='header-text-container'>
        <span className='header-text-title'>PollyGlot</span>
        <span className='header-text-description'>Perfect Translation Every Time</span>
      </div>
    </div>
  )
}