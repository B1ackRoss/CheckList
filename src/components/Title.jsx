import './Title.css'
import '@fontsource/pacifico'
import Logo from '../images/confirm-icon.svg'

const Title = () => {
    return <div className='header'>
        <div className='title'>
        <img className='logo' src={Logo}/>
        <h1>CheckList</h1>
        </div>
      
    </div>
}

export default Title;