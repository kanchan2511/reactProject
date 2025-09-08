import React from 'react';
import {Link} from 'react-router-dom';
import './JobCard.css'
const JobCard = ({job}) => {
    const {id,title,location,level,tags = [],summary} = job;
    return (
        <div className='job-card'>
            <h3>{title}</h3>
            <p><strong>Location:</strong>{location}</p>
             <p><strong>Level:</strong> {level}</p>
      <p><strong>Tags:</strong> {tags.join(', ')}</p>
      <p>{summary}</p>
      <Link to={`/careers/${id}`}>View / Apply</Link>
        </div>
    )
}
export default JobCard;