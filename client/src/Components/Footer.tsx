import '../Styles/Footer.css';

export default function Footer(){
    return (
        <footer className='Footer'>
            
            <img src={require('../Images/Footer/BOFA-logo-white.png')} alt='bank of america logo' className='boa-logo'/>

            <nav>
                <ul>
                    <li>Resources</li>
                    <li>Mentorships</li>
                    <li>About Us</li>
                </ul>
            </nav>

            <div className='socials-container'>
                <img src={require('../Images/Footer/facebook-icon.png')} alt="facebook logo" />
                <img src={require('../Images/Footer/instagram-icon.png')} alt="instagram logo" />
                <img src={require('../Images/Footer/linkedin-icon.png')} alt="linkedin logo" />
                <img src={require('../Images/Footer/twitter-icon.png')} alt="twitter logo" />
                <img src={require('../Images/Footer/youtube-icon.png')} alt="youtube logo" />
            </div>

            <div className='fdic-copyright-container'>
                <p>Bank of America, N.A. Member FDIC. Equal Housing Lender</p>
                <p> &copy; 2023 Bank of America Corporation. All rights reserved.</p>
            </div>
        </footer>
    );
}