import { useEffect, useState } from 'react';
import '../Styles/Resources.css';

export default function App () {
  // used to store all the data, the filtered data, and the term used to filter the data
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterTerm, setFilterTerm] = useState('');
  const [selectedButton, setSelectedButton] = useState('all');

  // state variables used below to indicate in the DOM whether the fetch is still loading or encountered an error in retrieving the data from the db
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from MySQL database and set it to 'data' state
    fetch('/resource')
      .then(response => response.json())
      .then(data => {
        setData(data);
        // setting loading state variable to false so that the loading message goes away and the data shows
        setLoading(false);
        console.log(data);
      })
      .catch(err => {
        setError(err);
        console.error(err);
      });
  }, []);

  useEffect(() => {
    setFilteredData(
      data.filter(item => {
        return item.interest.toLowerCase().includes(filterTerm.toLowerCase());
      })
    );
  }, [data, filterTerm]);

  const handleButtonClick = (id) => {
    setSelectedButton(id);
    setFilterTerm(id);
  };
  
const buttons = document.querySelectorAll(".btn-container button");

for (let button of buttons) {
  button.addEventListener("click", function() {
    for (let btn of buttons) {
      btn.classList.remove("selected");
    }
    this.classList.add("selected");
  });
};

  // so that the page doesn't show blank in case the data is still being fetched OR the fetch encounters an error
  if (loading) return <h1>Loading resources...</h1>;
  if (error) return <h1>Error loading resources</h1>

  return (
    <div className='Resources'>

      <h1>Resources</h1>
      <p className='intro' >Our resources are derived from a combination of trust funds, grants, and foundations, each offering a wealth of knowledge and experience to be shared with mentors. 
        These funding sources bring a diverse range of expertise to the table, making them valuable assets to those they support.
      </p>
        {/* To make it easier for mentors to find the resources that align with their field of interest, the latest resources are categorized below by subject matter. */}

      {/* RADIO BUTTONS: onClick triggers the handleButtonClick function above */}
      <div className='btn-container'>
        <button className={`btns ${selectedButton === 'all' ? 'selected' : ''}`} id='all' value='' onClick={() => handleButtonClick('')}>All</button>
        <button className={`btns ${selectedButton === 'technology' ? 'selected' : ''}`} id='technology' value='technology' onClick={() => handleButtonClick('technology')}>Technology</button>
        <button className={`btns ${selectedButton === 'education' ? 'selected' : ''}`} id='education' value='education' onClick={() => handleButtonClick('education')}>Education</button>
        <button className={`btns ${selectedButton === 'retail' ? 'selected' : ''}`} id='retail' value='retail' onClick={() => handleButtonClick('retail')}>Retail</button>
        <button className={`btns ${selectedButton === 'restaurant' ? 'selected' : ''}`} id='restaurant' value='restaurant' onClick={() => handleButtonClick('restaurant')}>Restaurant</button>
        <button className={`btns ${selectedButton === 'logistics' ? 'selected' : ''}`} id='logistics' value='logistics' onClick={() => handleButtonClick('logistics')}>Logistics</button>
        <button className={`btns ${selectedButton === 'health' ? 'selected' : ''}`} id='health' value='health' onClick={() => handleButtonClick('health')}>Health</button>
      </div>

      <div className='r-grid-container'>
        {/* taking the filtered data, mapping through it, and plugging into the template below */}
        {filteredData.map(resource => (
          <div className='resource-outer-container' key={resource.id}>
            <img className='grid-img' src={require(`../Images/BOA-icon/${resource.interest}-icon.png`)} alt={resource.interest} width={200} height={200} />
            <div className='resource-text-container'>
              <h3>{resource.title} </h3>
              <ol>
                <li>State/Region/County: {resource.description}</li>
                  {/* the .charAt().toUpperCase() on resource.interest below makes it so the interest doesn't render in all lower case, since that's how it is in the db. should probably add this to all the imported data? */}
                <li>Area of interest: {resource.interest.charAt(0).toUpperCase() + resource.interest.slice(1)}</li>
                  {/* ^^^ may change this to just resource.interest.toUpperCase() depending on styling ^^^ */}
              </ol>
            </div> 
          </div>
        ))};
      </div>

    </div>
  );
};