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
        console.log(sortedData);
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
      <p id='page-description'>Our volunteers come from a variety of sectors and backgrounds, and bring a wealth of experience they are willing to share with small businesses and startups. Browse possible future mentors below by their field of interest. </p>

      {/* RADIO BUTTONS: onChange triggers the handleChange function above */}
      <div className='radio-btn-container'>
        <div> {/* another set of divs around each input/label pair to help on smaller screens with keep btn and label together on same line*/}
          <input type="radio" id='all' value='' onChange={handleChange} name='interest' /> 
            <label htmlFor='all'>All</label>
            </div><div>
          <input type="radio" id='technology' value='technology' onChange={handleChange} name='interest' /> 
            <label htmlFor='technology'>Technology</label>
            </div><div>
          <input type="radio" id='education' value='education' onChange={handleChange} name='interest' /> 
            <label htmlFor='education'>Education</label>
            </div><div>
          <input type="radio" id='retail' value='retail' onChange={handleChange} name='interest' /> 
            <label htmlFor='retail'>Retail</label>  
            </div><div>
          <input type="radio" id='restaurant' value='restaurant' onChange={handleChange} name='interest' /> 
            <label htmlFor='restaurant'>Restaurant</label> 
            </div><div>
          <input type="radio" id='logistics' value='logistics' onChange={handleChange} name='interest' /> 
            <label htmlFor='logistics'>Logistics</label>  
            </div><div>
          <input type="radio" id='health' value='health' onChange={handleChange} name='interest' /> 
            <label htmlFor='health'>Health</label> 
            </div>
      </div>


      <div className='grid-container'>
        {/* taking the filtered data, mapping through it, and plugging into the template below */}
        {filteredData.map(mentor => (
          <div className='mentor-outer-container' key={mentor.user_id}>
            <img src={image} alt='mentor profile' className='mentor-pfp' />
            <div className='mentor-text-container'>
              <h3>{mentor.fullname} </h3>
              <ol>
                <li id='profession'>PROFESSION: {mentor.profession.toUpperCase()}</li>
                <br></br>
                <li>{mentor.description}</li>
                <br></br>
                {/* <li>Website: {mentor.website}</li> */}
                  {/* the .charAt().toUpperCase() on mentor.interest below makes it so the interest doesn't render in all lower case, since that's how it is in the db. should probably add this to all the imported data? */}
                <li className='bottom-li'>AREA OF INTEREST: {mentor.interest.toUpperCase()}</li>
                {/* {mentor.interest.charAt(0).toUpperCase() + mentor.interest.slice(1)} */}
                  {/* ^^^ may change this to just mentor.interest.toUpperCase() depending on styling ^^^ */}
              </ol>
              <a target="_blank" href="#" id="mentor-btn">Connect with {mentor.fullname}</a>
            </div> 
          </div>
        ))}

      </div>

    </div>
  );
};




// ATTEMPT 2

// export default function Mentors() {
//   const [data, setData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [filterTerm, setFilterTerm] = useState('*');

//   // const [error, setError] = useState();
//   // const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // fetch data from mysql database and set it to 'data' state
//     fetch('/mentor-interests')
//       .then(response => response.json())
//       .then(data => {
//           setFilteredData(data);
//           setData(data);
//           // setLoading(false);
//           console.log(data);
//         })
//       .catch(err => {
//         // setError(err);
//         console.log(err);
//       });
//   }, []);

//   useEffect(() => {
//     setFilteredData(
//       data.filter(item => {
//         return item.interest.toLowerCase().includes(filterTerm.toLowerCase());
//       })
//     );
//   }, [data, filterTerm]);

//   // const handleFilterTermChange = event => {
//   //   setFilterTerm(event.target.value);
//   //   console.log(filterTerm);
//   // };

//   const handleChange = (event) => {
//     // setFilterTerm(event.target.value);
//     //   console.log(filterTerm);

//     if (event.target.value === '') {
//       setFilterTerm('')
//       // event.target.checked = true;
//     } else {
//       setFilterTerm(event.target.value);
//       // event.target.checked = true;
//       console.log(event.target.value);
//     }
//   }

//   // if (loading) return <h1>Loading mentors...</h1>;
//   // if (error) return <h1>Error loading mentors</h1>

//   return (
//     <div className='Mentors'>

//       <div className='radio-btn-container'>
//         {/* <input type="text" placeholder="Filter mentors by interest" value={filterTerm} onChange={handleFilterTermChange} /> */}
//         <input type="radio" id='all' value='' onChange={handleChange} name='interest' /> 
//           <label htmlFor='all'>All</label>
//         <input type="radio" id='technology' value='technology' onChange={handleChange} name='interest' /> 
//           <label htmlFor='technology'>Technology</label>
//         <input type="radio" id='education' value='education' onChange={handleChange} name='interest' /> 
//           <label htmlFor='education'>Education</label>
//         <input type="radio" id='retail' value='retail' onChange={handleChange} name='interest' /> 
//           <label htmlFor='retail'>Retail</label>  
//         <input type="radio" id='restaurant' value='restaurant' onChange={handleChange} name='interest' /> 
//           <label htmlFor='restaurant'>Restaurant</label> 
//         <input type="radio" id='logistics' value='logistics' onChange={handleChange} name='interest' /> 
//           <label htmlFor='logistics'>Logistics</label>  
//         <input type="radio" id='health' value='health' onChange={handleChange} name='interest' /> 
//           <label htmlFor='health'>Health</label> 
//       </div>


//       <div className='grid-container'>

//         {filteredData.map(mentor => (
//             <div className='mentor-outer-container' key={mentor.user_id}>
//               <img src={image} alt='mentor profile' className='mentor-pfp' />
//               <div className='mentor-text-container'>
//                 <h3>{mentor.fullname} </h3>
//                 <ol>
//                   <li>Profession: {mentor.profession}</li>
//                   <li>Description: {mentor.description}</li>
//                   <li>Email address: {mentor.email}</li>
//                   <li>Area of interest: {mentor.interest.charAt(0).toUpperCase() + mentor.interest.slice(1)}</li>
//                 </ol>
//               </div> 
//             </div>
//         ))}

//       </div>

//     </div>
//   );
// };

/* VERSION 1 */
// import SearchFilter from '../Components/SearchFilter';

// export default function Mentors() {
//     const [mentorList, setMentorList] = useState<any[]>([])
//     const [error, setError] = useState<any>();
//     const [loading, setLoading] = useState<boolean>(true);

//     useEffect(() => {
//         fetchMentors();
//     }, [])

//     function fetchMentors() {
//         fetch('/mentors')
//             .then( (response) => response.json() )
//             .then( (data) => {
//                 setMentorList(data);
//                 setLoading(false);

//                 console.log(data);
//             })
//             .catch( err => setError(err) );
//     }

//     // if (mentorList === undefined) return <h1>Loading mentors...</h1>;
//         // with this ^^ can get rid of [loading, setLoading] 
//     if (loading) return <h1>Loading mentors...</h1>;

//     if (error) return <h1>Error loading mentors</h1>

//     return (
//         <div className='Mentors'>
//             <h1>Mentors</h1>

//             {/* <SearchFilter /> */}

//             {mentorList.map(mentor => (
//                 <div key={mentor.id}>
//                     <img src='#' alt='mentor profile picture' className='mentor-pfp' />
//                     <h3>{mentor.fullname} </h3>
//                     <ol>
//                         <li>Profession: {mentor.profession}</li>
//                         <li>Email address: {mentor.contact_email}</li>
//                         <li>Description: {mentor.description}</li>
//                     </ol> 
//                 </div>
//             ))}
//         </div>
//     );
// }