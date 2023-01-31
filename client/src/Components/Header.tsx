import '../Styles/Header.css';


export default function Header(){

    function myFunction(x: any): any {
        x.classList.toggle("change");
        console.log(x.classList)
      }

    return (
        <header className='Header'>
            <img src={require('../Images/Header/BOFA-logo-colored.png')} alt='bank of america logo' />
            
            <nav>
                <div className="container" onClick={(event) => myFunction(event)}>
                    <div className="bar1"></div>
                    <div className="bar2"></div>
                    <div className="bar3"></div>
                </div>
                <ul>
                    <a href='#'><li>Resources</li></a>
                    <a href='#'><li>Mentor</li></a>
                    <a href='#'><li>About Us</li></a>
                </ul>

                <section className='icon-container'>
                    <img src={require('../Images/Header/search-icon.png')} alt='search icon' />
                    <img src={require('../Images/Header/profile-icon.png')} alt='profile icon'/>
                </section>
            </nav>
            
        </header>
        
    );
}