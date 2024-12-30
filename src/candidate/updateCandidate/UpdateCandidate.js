import React, { useRef, useEffect } from 'react';
import CandidateService from '../../services/CandidateService';

export default function UpdateCandidate({ fetchCandidates, editCandidate }) {
    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const phoneRef = useRef(null);
    const resumeRef = useRef(null);
    const documentsRef = useRef(null);

    useEffect(() => {
        // Initialize input fields with candidateData when it changes
        if (editCandidate) {
            nameRef.current.value = editCandidate.name || '';
            emailRef.current.value = editCandidate.email || '';
            phoneRef.current.value = editCandidate.phone || '';
        }
    }, [editCandidate]);

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
        formData.append('candidateData', JSON.stringify(candidateData));
        if (resumeFile) formData.append('resume', resumeFile);
        documentFiles.forEach((file, index) => {
            formData.append(`documents[${index}]`, file);
        });

        await CandidateService.updateCandidate(editCandidate.id, formData);
        await fetchCandidates();

        const exitButton = document.getElementById('updateCandidateExitButton');
        exitButton.click();
    }

    return (
        <div className="modal fade" id="updateCandidate" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content modalcolour">
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Update Candidate Detail</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <input type="text" className="form-control" placeholder="Enter Name" ref={nameRef} />
                            </div>
                            <div className="mb-3">
                                <input type="email" className="form-control" placeholder="Enter Email" ref={emailRef} />
                            </div>
                            <div className="mb-3">
                                <input type="text" className="form-control" placeholder="Enter Phone" ref={phoneRef} />
                            </div>
                            <div className="mb-3">
                                <input type="file" className="form-control" placeholder="Upload Resume" ref={resumeRef} accept=".pdf,.doc,.docx" />
                            </div>
                            <div className="mb-3">
                                <input type="file" className="form-control" placeholder="Upload Documents" ref={documentsRef} accept=".pdf,.doc,.docx,.jpg,.png" multiple />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" id='updateCandidateExitButton' className="btn btn-dark text-white px-4 py-2" data-bs-dismiss="modal">Exit</button>
                            <button type="submit" className="btn btn-success connectbtn text-white px-4 py-2">Update Candidate</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
