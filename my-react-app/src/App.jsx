
import { Routes, Route, Navigate} from 'react-router-dom';
import Navbar from './components/Navbar';
import Careers from "./pages/Careers";
import JobDetail from "./pages/JobDetail";
import './index.css';
import ApplicationForm from './components/ApplicationForm';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/careers" replace />} />
        <Route path = '/careers' element = {<Careers />} />
        <Route path = "/careers/:jobId" element = {<JobDetail />} />
        <Route path = "/careers/:jobId/apply" element = {<ApplicationForm />} />
        <Route path = "*" element = {<h2>Page not found</h2>} />

      </Routes>
    </>
  )
}

export default App
