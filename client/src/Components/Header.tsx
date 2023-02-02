import '../Styles/Header.css';
import { useState } from 'react'

export default function Header(){

    // state variable for function below – mobile hamburger menu
    const [ menuClass, setMenuID ] = useState('')
    const [ listClass, setListID ] = useState('hidden')

    // this function handles click event for mobile hamburger menu – drop down
    const menuClickHandler = () => {
        if (menuClass === '') {
            setMenuID('changed');
            setListID('showing')
             
            // console.log('the menu icon should be an x and the options should show')
        } else {
            setMenuID('')
            setListID('hidden')
             
            // console.log('the menu should be a hamburger and the options should be hidden')
        }
    }

    return (
        <header className='Header'>

            <img src={require('../Images/Header/BOFA-logo-colored.png')} alt='bank of america logo' id='header-logo' />
           
            
            <nav>
                {/* hamburger menu / nav links that only appear on smaller screens */}
                <div id="mobile-menu-container" className={menuClass} onClick={menuClickHandler}>
                        <div className="bar1"></div>
                        <div className="bar2"></div>
                        <div className="bar3"></div>
                </div>

                {/* large screen nav links */}
                <ul id='static-ul'>
                    <a href='/'><li>Home</li></a>
                    <a href='/resources'><li>Resources</li></a>
                    <a href='/mentors'><li>Mentors</li></a>
                </ul>

                <section className='icon-container'>
                    <img src={require('../Images/Header/search-icon.png')} alt='search icon' />
                    <img src={require('../Images/Header/profile-icon.png')} alt='profile icon'/>
                </section>
            </nav>

            <div className='drop-down-container' id={listClass} > {/* drop down menu that is hidden until toggled */}
                <ul id='drop-down-ul' >
                    <a href='/'><li>Home</li></a>
                    <a href='/resources'><li>Resources</li></a>
                    <a href='/mentors'><li>Mentor</li></a>
                </ul>
            </div>
            
        </header>
        
    );
}