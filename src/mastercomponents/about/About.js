import React from 'react'
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="container-fluid bg-light h-100  p-5">
    <div className="container">
        <div className="row">
            <div className="col-md-8">
                <h1 className="mb-4">About Recruitment Tracker</h1>
                <p>
                    Recruitment Tracker is dedicated to revolutionizing the hiring process by providing a
                    centralized platform for managing job postings, tracking candidate progress, and ensuring a
                    seamless recruitment experience.
                </p>
                <p>
                    Our mission is to empower HR departments and recruiters with efficient tools to attract,
                    screen, and hire top talent. By leveraging modern technology and best practices, we aim to
                    streamline the recruitment journey, saving time and enhancing organizational efficiency.
                </p>
            </div>
            <div className="col-md-4">
                <aside className="bg-light  p-3">
                    <h4 className="mb-3">Quick Links</h4>
                    <ul className="list-unstyled">
                        <li><Link to="#" className="text-dark">Job Postings</Link></li>
                        <li><Link to="#" className="text-dark">Candidate Applications</Link></li>
                        <li><Link to="#" className="text-dark">Interview Schedules</Link></li>
                        <li><Link to="#" className="text-dark">Data Security</Link></li>
                    </ul>
                    <p className="mt-4">
                        Contact us at <Link to="mailto:info@recruitmenttracker.com" className="text-dark">info@recruitmenttracker.com</Link> for more information.
                    </p>
                </aside>
            </div>
        </div>
    </div>
</div>
  )
}
