import '../Styles/Header.css';

export default function Header(){
    return (
        <header className='Header'>
            <img src={require('../Images/Header/BOFA-logo-colored.png')} alt='bank of america logo' />

            <nav>
                <ul>
                    <li>Resources</li>
                    <li>Mentor</li>
                    <li>About Us</li>
                </ul>

                <section className='icon-container'>
                    <img src={require('../Images/Header/search-icon.png')} alt='search icon' />
                    <img src={require('../Images/Header/profile-icon.png')} alt='profile icon'/>
                </section>
            </nav>
            
        </header>
    );
}