import '../Styles/Home.css';

export default function Home () {
  return (
    <div className='Home'>
      <main>
        <div className='hero-img'>
          <img src={require('../Images/Homepage/hand-holding-coin.png')} alt='hand holding dollar sign' />
        </div>
        <div className='hero-text'>
          <h1>Empowering Small Businesses</h1>
          <p>At Bank of America, we provide small businesses with the resources and support they need to succeed, from funding option to expert advice.</p>
          <a target='_blank' href='#'>Explore Resources</a>
        </div>
      </main>

      <section className='explore-container'>
        <div className='financial-assistance'>
          <img src={require('../Images/Homepage/scholarship-icon.png')} alt='dollar sign icon' className='explore-icons' />
          <h3>Unlock Financial Assistance</h3>
          <p>Our scholarship program is designed to provide financial assistance and opportunities to small business owners and entrepeneurs.</p>
          <ul>
            <li id='annoying-li'>Help cover the costs of business expenses such as equipment, inventory, marketing, and more</li>
            <li>Access to education resources and training programs that will help you develop skills and knowledge for a successful business</li>
          </ul>

          <a target='_blank' href='#' id='explore-btn'>Explore Scholarships</a>
        </div>

        <div className='fund-growth'>
          <img src={require('../Images/Homepage/grants-icon.png')} alt='dollar sign icon' className='explore-icons' />
          <h3>Fund Your Business Growth</h3>
          <p>Our grant program is designed to provide financial assistance that will help small bsinesses that are looking to expand their operations, invest in new equipment or hire additional staff.</p>
          <ul>
            <li>Opportunities to connect with industry experts and additional resources to help take your business to the next level</li>
          </ul>
          <a target='_blank' href='#'>Explore Grants</a>
        </div>

        <div className='maximize-potential'>
          <img src={require('../Images/Homepage/opportunities-icon.png')} alt='light-bulb icon' className='explore-icons' />
          <h3>Maximize Your Small Business Potential</h3>
          <p>Our programs are designed to provide access to resources, networking events, mentorship, programs, and more for small business owners.</p>
          <a target='_blank' href='#'>Explore Programs</a>
        </div>
      </section>

      <section className='investing-container'>
        <div className='bottom-img'>
          <img src={require('../Images/Homepage/hand-shaking.png')} alt='hands shaking'/>
        </div>

        <div className='bottom-text'>
          <h2>Investing In The Future Of Small Businesses</h2>
          <p>We believe in the power of small businesses to drive economic growth. From finding options to expert advice and mentorship, we're committed to providing the resources and support small business owners need to succeed.</p>
          <a target='_blank' href='#'>Learn More</a>
        </div>
      </section>
    </div>
  );
};
