import { useEffect, useState } from 'react';

export default function Mentors() {

    const [mentorList, setMentorList] = useState<any[]>([])
    const [error, setError] = useState<any>();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetchMentors();
    }, [])

    function fetchMentors() {
        fetch('/mentors')
            .then( (response) => response.json() )
            .then( (data) => {
                setMentorList(data);
                setLoading(false);

                console.log(data);
            })
            .catch( err => setError(err) );
    }

    // if (mentorList === undefined) return <h1>Loading mentors...</h1>;
        // with this ^^ can get rid of [loading, setLoading] 
    if (loading) return <h1>Loading mentors...</h1>;

    if (error) return <h1>Error loading mentors</h1>

    return (
        <div className='Mentors'>
            <h1>Mentors</h1>
            {mentorList.map(mentor => (
                <div key={mentor.id}>
                    <img src='#' alt='mentor profile picture' className='mentor-pfp' />
                    <h3>{mentor.fullname} </h3>
                    <ol>
                        <li>Profession: {mentor.profession}</li>
                        <li>Email address: {mentor.contact_email}</li>
                        <li>Description: {mentor.description}</li>
                        {/* <ul>
                            <li>Interest1:</li>
                            <li>Interest2:</li>
                            <li>Interest3:</li>
                        </ul>  */}
                    </ol> 
                </div>
            ))}
        </div>
    );
}