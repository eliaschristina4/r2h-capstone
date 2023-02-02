import { useEffect, useState } from 'react';
import '../Styles/Mentors.css';

const image = require(`../Images/silhouette-pfp.png`);

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
    fetch('/mentor-interests')
      .then(response => response.json())
      .then(data => {
        // sorting the data alphabetically by first name
        const sortedData = data.sort(function (a, b) {
          if (a.fullname < b.fullname) {
            return -1;
          }
          if (a.fullname > b.fullname) {
            return 1;
          }
          return 0;
        });
        setData(sortedData);
        // setting loading state variable to false so that the loading message goes away and the data shows
        setLoading(false);
        // console.log(sortedData);
      })
      .catch(err => {
        setError(err);
        console.error(err);
      });
  }, []);

  useEffect(() => {
    // filtering the data by the current filterTerm state variable
    setFilteredData(
      data.filter(item => {
        return item.interest.toLowerCase().includes(filterTerm.toLowerCase());
      })
    );
  }, [data, filterTerm]);

  // when any of the radio buttons change, trigger this function that sets the filterTerm state variable to their value, which is then filtered again above
  const handleChange = event => {
    setFilterTerm(event.target.value);
  };

  // so that the page doesn't show blank in case the data is still being fetched OR the fetch encounters an error
  if (loading) return <h1>Loading mentors...</h1>;
  if (error) return <h1>Error loading mentors</h1>

  return (
    <div className='Mentors'>

      <h1>Meet Our Mentors</h1>
      <p>Our volunteers come from a variety of sectors and backgrounds, and bring a wealth of experience they are willing to share with small businesses and startups. Browse possible future mentors below by their field of interest. </p>

      {/* RADIO BUTTONS: onChange triggers the handleChange function above */}
      <div className='radio-btn-container'>
        <input type="radio" id='all' value='' onChange={handleChange} name='interest' /> 
          <label htmlFor='all'>All</label>
        <input type="radio" id='technology' value='technology' onChange={handleChange} name='interest' /> 
          <label htmlFor='technology'>Technology</label>
        <input type="radio" id='education' value='education' onChange={handleChange} name='interest' /> 
          <label htmlFor='education'>Education</label>
        <input type="radio" id='retail' value='retail' onChange={handleChange} name='interest' /> 
          <label htmlFor='retail'>Retail</label>  
        <input type="radio" id='restaurant' value='restaurant' onChange={handleChange} name='interest' /> 
          <label htmlFor='restaurant'>Restaurant</label> 
        <input type="radio" id='logistics' value='logistics' onChange={handleChange} name='interest' /> 
          <label htmlFor='logistics'>Logistics</label>  
        <input type="radio" id='health' value='health' onChange={handleChange} name='interest' /> 
          <label htmlFor='health'>Health</label> 
      </div>


      <div className='grid-container'>
        {/* taking the filtered data, mapping through it, and plugging into the template below */}
        {filteredData.map(mentor => (
          <div className='mentor-outer-container' key={mentor.user_id}>
            <img src={image} alt='mentor profile' className='mentor-pfp' />
            <div className='mentor-text-container'>
              <h3>{mentor.fullname} </h3>
              <ol>
                <li>Profession: {mentor.profession}</li>
                <li>Description: {mentor.description}</li>
                <li>Email address: {mentor.email}</li>
                  {/* the .charAt().toUpperCase() on mentor.interest below makes it so the interest doesn't render in all lower case, since that's how it is in the db. should probably add this to all the imported data? */}
                <li>Area of interest: {mentor.interest.charAt(0).toUpperCase() + mentor.interest.slice(1)}</li>
                  {/* ^^^ may change this to just mentor.interest.toUpperCase() depending on styling ^^^ */}
              </ol>
            </div> 
          </div>
        ))}

      </div>

    </div>
  );
};