import React, { useEffect, useState } from 'react';
import './Candidate.css';
import CandidateService from '../../services/CandidateService';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import UpdateCandidate from '../updateCandidate/UpdateCandidate';

export default function CandidateList() {

    const [candidates, setCandidates] = useState([]);
    const [editCandidate, setEditCandidate] = useState(null);
    const [selectedOption, setSelectedOption] = useState('');
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        fetchCandidates();
    }, []);

    const fetchCandidates = async () => {
        try {
            const data = await CandidateService.getAllCandidates();
            setCandidates(data);
        } catch (error) {
            console.error('Error fetching candidates:', error);
        }
    };

    const handleDelete = async (id) => {
        let result = window.confirm("Are you sure you want to delete ?");
        if (result) {
            await CandidateService.deleteCandidate(id);
            fetchCandidates();
        }
    };

    const handleEdit = async (id) => {
        const data = await CandidateService.getCandidateById(id);
        setEditCandidate(data);
        const openUpdateModal = document.getElementById('openCandidateUpdateModal');
        openUpdateModal.click();
    };

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleInput = (event) => {
        setSearchValue(event.target.value);
    };

    const searchData = async (event) => {
        event.preventDefault();
        try {
            const data = await CandidateService.searchCandidates(selectedOption, searchValue)
            setCandidates(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    if (candidates.length === 0) {
        return (
            <div className="container bg-light pt-5 maincontent h-100">
                <div className="row">
                    <div className="col-md-12 text-center">
                        <h2>No Candidates Yet</h2>
                    </div>
                </div>
                
                <div className="row mt-3 mb-3">
                    <div className="offset-md-6 col-md-6">
                        <form onSubmit={searchData} className="d-flex align-items-end">
                            <div className="me-2 flex-grow-1">
                                <label htmlFor="filterDropdown" className="form-label visually-hidden">Select Filter:</label>
                                <select id="filterDropdown" className="form-select" onChange={handleChange} value={selectedOption}>
                                    <option value="" disabled>Categorize</option>
                                    <option value="name">Name</option>
                                    <option value="email">Email</option>
                                    <option value="phone">Application Status</option>
                                    <option value="phone">Job Title</option>
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
                <UpdateCandidate fetchCandidates={fetchCandidates} editCandidate={editCandidate} />
            </div>
        );
    }

    return (
        <div className="container bg-light pt-5 maincontent">
            <div className="row">
                <div className="col-md-12">
                    <h2 className="text-center mb-4">Candidates</h2>
                </div>
            </div>
            <div className="row mt-3 mb-3">
                <div className=" offset-md-7 col-md-5">
                    <form onSubmit={searchData} className="d-flex align-items-end">
                        <div className="me-2 flex-grow-1">
                            <label htmlFor="filterDropdown" className="form-label visually-hidden">Select Filter:</label>
                            <select id="filterDropdown" className="form-select" onChange={handleChange} value={selectedOption}>
                                <option value="" disabled>Categorize</option>
                                <option value="name">Name</option>
                                <option value="email">Email</option>
                                <option value="phone">Phone</option>
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
                {candidates.map(candidate => (
                    <div key={'candidate_' + candidate.id} className="card mb-4">
                        <div className="card-body">
                            <h5 className="card-title">{candidate.name}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">{candidate.email} - {candidate.phone}</h6>
                            <p className="card-text"><strong>Application Status:</strong> {candidate.application_status}</p>
                            <p className="card-text"><strong>Interview Scheduled:</strong> {candidate.interview_scheduled ? 'Yes' : 'No'}</p>
                            <div>
                                <a href={candidate.resume_link} className="btn btn-dark" download>Download Resume</a>
                                <a href={candidate.documents_link} className="btn btn-dark ms-2" download>Download Documents</a>
                                <span data-bs-toggle="modal" data-bs-target="#updateCandidate" id='openCandidateUpdateModal'></span>
                                <button type='button' onClick={() => handleEdit(candidate.id)} className="btn btn-dark ms-2"><FaEdit size={20} /> &nbsp;&nbsp; Edit</button>
                                <button type='button' onClick={() => handleDelete(candidate.id)} className="btn btn-dark ms-2"><MdDelete size={20} />&nbsp;&nbsp; Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <UpdateCandidate fetchCandidates={fetchCandidates} editCandidate={editCandidate} />
        </div>
    )
}
