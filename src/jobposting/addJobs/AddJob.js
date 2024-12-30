import React, { useRef } from 'react';
import JobPostingService from '../../services/JobPostingService';

export default function AddJob({fetchJobPosts}) {
    const titleRef = useRef(null);
    const departmentRef = useRef(null);
    const locationRef = useRef(null);
    const jobTypeRef = useRef(null);
    const descriptionRef = useRef(null);
    const applicationDeadlineRef = useRef(null);
    const handleSubmit = async (event) => {
        event.preventDefault();

        const jobPostingData = {
             title : titleRef.current.value,
             department : departmentRef.current.value,
             location : locationRef.current.value,
             job_type : jobTypeRef.current.value,
             description : descriptionRef.current.value,
             application_deadline : applicationDeadlineRef.current.value
        };
        await JobPostingService.addJobPosting(jobPostingData);
         await fetchJobPosts()
        const exitButton = document.getElementById('exitButton');
        exitButton.click();
    }

  return (
    <div className="modal fade" id="postNewJob" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content modalcolour">
        <form onSubmit={handleSubmit} >
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Add Job Detail</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
            <div className="mb-3">
                    <input type="text" className="form-control" placeholder="Enter Title" ref={titleRef} />
                </div>
                <div className="mb-3">
                    <input type="text" className="form-control" placeholder="Enter Department" ref={departmentRef} />
                </div>
                <div className="mb-3">
                    <input type="text" className="form-control" placeholder="Enter Location" ref={locationRef} />
                </div>
                <div className="mb-3">
                    <input type="text" className="form-control" placeholder="Enter Job Type" ref={jobTypeRef} />
                </div>
                <div className="mb-3">
                    <textarea className="form-control" placeholder="Enter Description" ref={descriptionRef} rows="4"></textarea>
                </div>
                <div className="mb-3">
                    <input type="date" className="form-control" placeholder="Enter Application Deadline" ref={applicationDeadlineRef} />
                </div>
            </div>
            <div className="modal-footer">
                <button type="button" id='exitButton' className="btn btn-dark text-white px-4 py-2" data-bs-dismiss="modal">Exit</button>
                <button type="submit" className="btn btn-success connectbtn text-white  px-4 py-2">Post Job </button>
            </div>
            </form>
        </div>
    </div>

</div>
  )
}
