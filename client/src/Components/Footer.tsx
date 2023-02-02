import '../Styles/Footer.css';

export default function Footer(){
    return (
        <footer className='Footer'>
            
            <img src={require('../Images/Footer/BOFA-logo-white.png')} alt='bank of america logo' id='footer-logo'/>

            <nav>
                <ul>
                    <a href='/' id='right-footer-link'><li>Home</li></a>
                    <a href='/resources' id='middle-footer-link'><li>Resources</li></a>
                    <a href='/mentors'><li>Mentorships</li></a>
                </ul>
            </nav>

            <div className='socials-container'>
            <a href='https://www.facebook.com' ><img src={require('../Images/Footer/facebook-icon.png')} alt="facebook logo" /></a>
            <a href='https://www.instagram.com' ><img src={require('../Images/Footer/instagram-icon.png')} alt="instagram logo" /></a>
            <a href='https://www.linkedin.com' ><img src={require('../Images/Footer/linkedin-icon.png')} alt="linkedin logo" /></a>
            <a href='https://www.twitter.com' ><img src={require('../Images/Footer/twitter-icon.png')} alt="twitter logo" /></a>
            <a href='https://www.youtube.com' ><img src={require('../Images/Footer/youtube-icon.png')} alt="youtube logo" /></a>
            </div>

            <div className='fdic-copyright-container'>
                <p>Bank of America, N.A. Member FDIC. Equal Housing Lender</p>
                <p> &copy; 2023 Bank of America Corporation. All rights reserved.</p>
            </div>
        </footer>
    );
}