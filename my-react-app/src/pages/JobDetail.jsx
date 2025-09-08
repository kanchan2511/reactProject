
import { useParams, Link } from "react-router-dom";
import JOBS from "../data/jobs";
import './JobDetail.css';
import ApplicationForm from "../components/ApplicationForm";
import { useState } from "react";

export default function JobDetail() {
  const { jobId } = useParams();
  const job = JOBS.find((j) => j.id === jobId);

  if (!job) {
    return <h2>Job not found</h2>;
  }

  return (
    <div className="container">
      <Link to = "/careers" className="link">Back to Careers</Link>
      <h1>{job.title}</h1>
      <p className="meta">{job.location} . {job.level} </p>
      <section className="job">
        <h3>About the Role</h3>
        <p>{job.description}</p>
        <h4>Responsibilities</h4>
        <ul>
          <li>Ship high-quality features in React</li>
          <li>Collaborate with designers and product</li>
        </ul>
        <h4>What You'll Need</h4>
        <ul>
          <li>Strong JavaScript and React fundamentals</li>
          <li>Good understanding of component design</li>
        </ul>
        <h4>About Barabari</h4>
        <p>Making quality Tech and Design employment opportunities accessible to all. </p>
      </section>
      <section className="application-form">
        <Link to = {`/careers/${jobId}/apply`}>
        <button className="button">Apply for this role</button></Link>
      </section>
    </div>
  );
}
