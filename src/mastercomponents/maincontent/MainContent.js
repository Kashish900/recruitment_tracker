import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './MainContent.css';
import AddJob from '../../jobposting/addJobs/AddJob';
import UpdateJob from '../../jobposting/updatejob/UpdateJob';
import JobPostingService from '../../services/JobPostingService';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import AddCandidateModal from '../../candidate/addcandidate/AddCandidateModal';

export default function MainContent() {

    const [jobPostings, setJobPostings] = useState([]);
    const [editJobPost, setJobPost] = useState(null);
    const [selectedOption, setSelectedOption] = useState('');
    const [searchValue, setsearchValue] = useState('');
    const [appliedpostID, setappliedpostID] = useState('');

    useEffect(() => {
        fetchJobPosts();
    }, []);



    const fetchJobPosts = async () => {
        try {
            const data2 = await JobPostingService.updateVisibilityStatus();
            console.log(data2);
            const data = await JobPostingService.getAllJobPostings();
            setJobPostings(data);
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };

    const handleDelete = async (id) => {
        let result = window.confirm("Are you sure you want to delete ?")
        if (result) {
            await JobPostingService.deleteJobPosting(id);
            fetchJobPosts();
        }
    };

    const handleEdit = async (id) => {
        const data = await JobPostingService.getJobPostingById(id);
        setJobPost(data);
        const openUpdateModal = document.getElementById('openupdatemodal');
        openUpdateModal.click();
    };

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleInput = (event) => {
        setsearchValue(event.target.value);
    };

    const searchData = async (event) => {
        event.preventDefault();
        try {
            const data = await JobPostingService.searchJobPostings(selectedOption, searchValue)
            setJobPostings(data);  
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const appliedJobPostId = async (id) => {
        setappliedpostID(id);
        const exitButton = document.getElementById('applyButton');
        exitButton.click();
    };


    // Conditional rendering if no job postings are available
    if (jobPostings.length === 0) {
        return (
            <div className="container bg-light pt-5 maincontent h-100">
                <div className="row">
                    <div className="col-md-12 text-center">
                        <h2>No Job Posts Yet</h2>
                        <Link to="/add-job" className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#postNewJob">Post New Job</Link>
                    </div>
                </div>
                
            <div className="row mt-3 mb-3">
                <div className=" offset-md-6 col-md-6">
                    <form onSubmit={searchData} className="d-flex align-items-end">
                        <div className="me-2 flex-grow-1">
                            <label htmlFor="filterDropdown" className="form-label visually-hidden">Select Filter:</label>
                            <select id="filterDropdown" className="form-select" onChange={handleChange} value={selectedOption}>
                                <option value="" disabled>Categorize</option>
                                <option value="department">Department</option>
                                <option value="location">Location</option>
                                <option value="job_type">Job Type</option>
                            </select>
                        </div>
                        <div className="me-2">
                            <label htmlFor="inputField" className="form-label visually-hidden">Enter:</label>
                            <input type="text" className="form-control" id="inputField" placeholder='Enter' value={searchValue} onChange={handleInput} />
                        </div>
                        <button type="submit" className="btn btn-dark">Search</button>
                    </form>
                </div>
            </div>
                <AddJob fetchJobPosts={fetchJobPosts} />
                <UpdateJob fetchJobPosts={fetchJobPosts} editJobPost={editJobPost} />
            </div>
        );
    }


    // Render job postings if there are any
    return (
        <div className="container bg-light pt-5 maincontent">
            <div className="row">
                <div className="col-md-10">
                    <h2 className="text-center mb-4">Job Postings</h2>
                </div>
                <div className="col-md-2 text-right">
                    <Link to="/add-job" className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#postNewJob">Post New Job</Link>
                </div>
            </div>
            <div className="row mt-3 mb-3">
                <div className=" offset-md-7 col-md-5">
                    <form onSubmit={searchData} className="d-flex align-items-end">
                        <div className="me-2 flex-grow-1">
                            <label htmlFor="filterDropdown" className="form-label visually-hidden">Select Filter:</label>
                            <select id="filterDropdown" className="form-select" onChange={handleChange} value={selectedOption}>
                                <option value="" disabled>Categorize</option>
                                <option value="department">Department</option>
                                <option value="location">Location</option>
                                <option value="job_type">Job Type</option>
                            </select>
                        </div>
                        <div className="me-2">
                            <label htmlFor="inputField" className="form-label visually-hidden">Enter:</label>
                            <input type="text" className="form-control" id="inputField" placeholder='Enter' value={searchValue} onChange={handleInput} />
                        </div>
                        <button type="submit" className="btn btn-dark">Search</button>
                    </form>
                </div>
            </div>

            <div className="card-deck mycarddeck">
                {jobPostings.map(job => (
                    <div key={'jobPost_' + job.id} className="card mb-4">
                        <div className="card-body">
                            <h5 className="card-title">{job.title}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">{job.department} - {job.location}</h6>
                            <p className="card-text">{job.description}</p>
                            <p className="card-text"><strong>Type:</strong> {job.job_type}</p>
                            <p className="card-text"><strong>Application Deadline:</strong> {job.application_deadline}</p>
                            <div>
                                <button type='button' id='applyButton' onClick={() => appliedJobPostId(job.id)}  data-bs-toggle="modal"  data-bs-target="#addNewCandidate"  disabled={!job.visibility_status} className="btn btn-dark">Apply</button>
                                <span data-bs-toggle="modal" data-bs-target="#updatePost" id='openupdatemodal'></span>
                                <button type='button' onClick={() => handleEdit(job.id)} className="btn btn-dark ms-2"><FaEdit size={20} /> &nbsp;&nbsp; Edit Post</button>
                                <button type='button' onClick={() => handleDelete(job.id)} className="btn btn-dark ms-2"><MdDelete size={20} />&nbsp;&nbsp; Delete Post</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <AddJob fetchJobPosts={fetchJobPosts} />
            <UpdateJob fetchJobPosts={fetchJobPosts} editJobPost={editJobPost} />
            <AddCandidateModal appliedpostID = {appliedpostID} />
        </div>
    )
}
