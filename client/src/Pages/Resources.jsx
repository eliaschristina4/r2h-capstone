// IMPORTS
import { useEffect, useState } from 'react';

// CSS
import '../Styles/Resources.css';


export default function App () {
  // used to store all the data, the filtered data, and the term used to filter the data
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterTerm, setFilterTerm] = useState('');

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

  // so that the page doesn't show blank in case the data is still being fetched OR the fetch encounters an error
  if (loading) return <h1>Loading resources...</h1>;
  if (error) return <h1>Error loading resources</h1>

  return (
    <div className='Mentors'>

      <h1>Resources</h1>
      <p>Our volunteers come from a variety of sectors and backgrounds, and bring a wealth of experience they are willing to share with small businesses and startups. Browse possible future mentors below by their field of interest. </p>

      {/* RADIO BUTTONS: onClick triggers the handleChange function above */}
      <div className='btn-container'>
        <button className='btns' id='all' value='' onClick={() => setFilterTerm('')}>All</button>
        <button className='btns' id='technology' value='technology' onClick={() => setFilterTerm('technology')}>Technology</button>
        <button className='btns' id='education' value='education' onClick={() => setFilterTerm('education')}>Education</button>
        <button className='btns' id='retail' value='retail' onClick={() => setFilterTerm('retail')}>Retail</button>
        <button className='btns' id='restaurant' value='restaurant' onClick={() => setFilterTerm('restaurant')}>Restaurant</button>
        <button className='btns' id='logistics' value='logistics' onClick={() => setFilterTerm('logistics')}>Logistics</button>
        <button className='btns' id='health' value='health' onClick={() => setFilterTerm('health')}>Health</button>
      </div>

      <div className='grid-container'>
        {/* taking the filtered data, mapping through it, and plugging into the template below */}
        {filteredData.map(resource => (
          <div className='mentor-outer-container' key={resource.id}>
            <img src={require(`../Images/BOA-icon/${resource.interest}-icon.png`)} alt={resource.interest} />
            <div className='resource-text-container'>
              <h3>{resource.title} </h3>
              <ol>
                <li>State/Region/County: {resource.description}</li>
                  {/* the .charAt().toUpperCase() on resource.interest below makes it so the interest doesn't render in all lower case, since that's how it is in the db. should probably add this to all the imported data? */}
                <li>Area of interest: {resource.interest.charAt(0).toUpperCase() + resource.interest.slice(1)}</li>
                  {/* ^^^ may change this to just mentor.interest.toUpperCase() depending on styling ^^^ */}
              </ol>
            </div> 
          </div>
        ))};
      </div>

    </div>
  );
};