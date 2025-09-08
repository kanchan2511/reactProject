
import JobCard from "../components/JobCard";
import JOBS from "../data/jobs";
import './Careers.css';
import useDebounce from "../hooks/useDebounce"
import { useState } from "react";
import logo from "../assets/logo.png";
function Careers() {
  //search state
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  //filter state
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [levelFilter, setLevelFilter] = useState("");
  
  //filtered jobs based on search 
  const filteredJobs = JOBS.filter(job => {
    const matchesSearch =
      job.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      job.tags.some(tag => tag.toLowerCase().includes(debouncedSearch.toLowerCase()));
    const matchesDept = departmentFilter ? job.department === departmentFilter : true;
    const matchesLocation = locationFilter ? job.location === locationFilter : true;
    const matchesLevel = levelFilter ? job.level === levelFilter : true;
    return matchesSearch && matchesDept && matchesLocation && matchesLevel;
  });
  return (
    <div className="container">
      <div className="header">
        <img src={logo} alt="Barabari logo" className="logo" />
        <div className="title">
          <h1>Join Barabari</h1>
         
          <p>We're a Tech & Design partner. Build products that matter.</p>
      </div>
       </div>
      {/*  search bar */}
      <div className="search-filter">
        <input type="text" placeholder="Search roles" value={search} onChange={(e) => setSearch(e.target.value)}
        />
        {search && (<button className="clear-btn" onClick={() => setSearch("")}>Clear</button>)}
      </div>

      {/* Filters */}
      <div className="filters">
        <select value={departmentFilter} onChange={(e) => setDepartmentFilter(e.target.value)}>
          <option value="">All Departments</option>
          <option value="Engineering">Engineering</option>
          <option value="Design">Design</option>
          <option value="Product">Product</option>
          <option value="Operations">Operations</option>
        </select>

        <select value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)}>
          <option value="">All Locations</option>
          <option value="Hyderabad (IN)">Hyderabad (IN)</option>
          <option value="Remote (IN)">Remote (IN)</option>
        </select>

        <select value={levelFilter} onChange={(e) => setLevelFilter(e.target.value)}>
          <option value="">All Levels</option>
          <option value="Intern">Intern</option>
          <option value="Junior">Junior</option>
          <option value="Mid">Mid</option>
          <option value="Senior">Senior</option>
        </select>
        {(departmentFilter || locationFilter || levelFilter) && (
          <button className="reset-btn" onClick={() => {
            setDepartmentFilter("");
            setLocationFilter("");
            setLevelFilter("");
          }}>
            Reset Filters
          </button>
        )}
      </div>
      <main>
        {filteredJobs.length > 0 ? (
          filteredJobs.map(job => <JobCard key={job.id} job={job} />)
        ) : (
          <p className="para">No roles match your search. Try clearing filters.</p>
        )}
      </main>
    </div>
  );
}

export default Careers;
