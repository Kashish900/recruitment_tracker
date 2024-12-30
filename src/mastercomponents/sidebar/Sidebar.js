import React from 'react'
import { Link } from 'react-router-dom';
import './Sidebar.css';

export default function Sidebar() {
  return (
    <nav id="sidebar" className="bg-light border-right sidebar">
    <ul className="list-unstyled components ">
      
      <li>
       <Link to="/homepage">Home</Link>
      </li>
      <li>
       <Link to="">Job Postings</Link>
      </li>
      <li>
       <Link to="/candidate">Candidates</Link>
      </li>
      <li>
       <Link to="/graphs">Visualize Graphs</Link>
      </li>
    </ul>
  </nav>
  )
}
