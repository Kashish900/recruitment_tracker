import React, { useRef } from 'react';
import CandidateService from '../../services/CandidateService';

export default function AddCandidateModal({ appliedpostID }) {
    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const phoneRef = useRef(null);
    const resumeRef = useRef(null);
    const documentsRef = useRef(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const candidateData = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            phone: phoneRef.current.value,
        };
    
        const resumeFile = resumeRef.current.files[0];
        const documentFiles = Array.from(documentsRef.current.files);
    
        const formData = new FormData();
        formData.append('name', candidateData.name); // Ensure 'name' key matches Django's expected key
        formData.append('email', candidateData.email); // Ensure 'email' key matches Django's expected key
        formData.append('phone', candidateData.phone);
        formData.append('job_posting_id', appliedpostID); // Ensure 'phone' key matches Django's expected key
        formData.append('resume', resumeFile);
        documentFiles.forEach((file, index) => {
            formData.append(`documents`, file);
        });
    
        try {
            await CandidateService.addCandidate(formData);    
            const exitButton = document.getElementById('closeAddStudent');
            exitButton.click();
        } catch (error) {
            console.error('Error while adding candidate:', error);
            // Handle error as needed
        }
    }
    

    return (
        <div className="modal fade" id="addNewCandidate" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content modalcolour">
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Add Candidate Detail</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="nameInput" className="form-label">Name</label>
                                <input type="text" className="form-control" id="nameInput" placeholder="Enter Name" ref={nameRef} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="emailInput" className="form-label">Email</label>
                                <input type="email" className="form-control" id="emailInput" placeholder="Enter Email" ref={emailRef} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="phoneInput" className="form-label">Phone</label>
                                <input type="text" className="form-control" id="phoneInput" placeholder="Enter Phone" ref={phoneRef} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="resumeInput" className="form-label">Resume</label>
                                <input type="file" className="form-control" id="resumeInput" placeholder="Upload Resume" ref={resumeRef} accept=".pdf,.doc,.docx" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="documentsInput" className="form-label">Documents</label>
                                <input type="file" className="form-control" id="documentsInput" placeholder="Upload Documents" ref={documentsRef} accept=".pdf,.doc,.docx,.jpg,.png" multiple />
                            </div>

                        </div>
                        <div className="modal-footer">
                            <button type="button" id='closeAddStudent' className="btn btn-dark text-white px-4 py-2" data-bs-dismiss="modal">Exit</button>
                            <button type="submit" className="btn btn-success connectbtn text-white  px-4 py-2">Add Candidate</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
