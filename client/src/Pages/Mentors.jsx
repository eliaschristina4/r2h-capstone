import { useEffect, useState } from 'react';
import '../Styles/Mentors.css';

const image = require(`../Images/silhouette-pfp.png`);

export default function App () {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterTerm, setFilterTerm] = useState('');

  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from MySQL database and set it to 'data' state
    fetch('/mentor-interests')
      .then(response => response.json())
      .then(data => {
        setData(data);
        setLoading(false);
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

  const handleChange = event => {
    setFilterTerm(event.target.value);
  };

  if (loading) return <h1>Loading mentors...</h1>;
  if (error) return <h1>Error loading mentors</h1>

  return (
    <div className='Mentors'>

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

        {filteredData.map(mentor => (
          <div className='mentor-outer-container' key={mentor.user_id}>
            <img src={image} alt='mentor profile' className='mentor-pfp' />
            <div className='mentor-text-container'>
              <h3>{mentor.fullname} </h3>
              <ol>
                <li>Profession: {mentor.profession}</li>
                <li>Description: {mentor.description}</li>
                <li>Email address: {mentor.email}</li>
                <li>Area of interest: {mentor.interest.charAt(0).toUpperCase() + mentor.interest.slice(1)}</li>
              </ol>
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