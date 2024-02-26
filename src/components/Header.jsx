import styles from './Header.module.scss'
import logo from '../assets/images/cookchef.png'
import { useState } from 'react'
import HeaderMenu from './HeaderMenu';

function Header() {
  const [showMenu, setShowMenu] = useState(false);

    return (
      <header className={` ${styles.header} d-flex flex-row align-items`}>
        <div className="flex-fill">
            <img src={logo} alt="Logo Cookchef"/>
        </div>
        <ul className={styles.headerList}>
            <button className="mr-5 btn btn-reverse-primary">
                <i className="fa-solid fa-heart mr-5"></i>
                <span>Wishlist</span>
            </button>
            <button className="btn btn-primary">Connexion</button>
        </ul>
        <i onClick={ () => setShowMenu(true) } className={` ${styles.headerXS} fa-solid fa-bars`}></i>
        { showMenu && 
          <>
            <div onClick={ () => setShowMenu(false) }className="calc"></div>
            <HeaderMenu/>
          </> }
      </header>
    )
  }
  
  export default Header