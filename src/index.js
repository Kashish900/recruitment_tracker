import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Home from './mastercomponents/home/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CandidateList from './candidate/candidatelist/CandidateList';
import MainContent from './mastercomponents/maincontent/MainContent';
import About from './mastercomponents/about/About';
import HomePage from './mastercomponents/homepage/HomePage';
import Graph from './graph/Graph';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='' element={<Home />}>
        <Route path='' element={<MainContent />}></Route>
          <Route path='/candidate' element={<CandidateList />}></Route>
          <Route path='/about' element={<About />}></Route>
          <Route path='/homepage' element={<HomePage />}></Route>
          <Route path='/graphs' element={<Graph />}></Route>
       
        </Route>
      

      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

