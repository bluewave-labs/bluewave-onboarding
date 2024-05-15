import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import ProgressSteps from './components/ProgressSteps';
import Announcements from './components/Announcements';
import Settings from './components/Settings';
import FileUpload from './components/FileUpload';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <FileUpload />
    </BrowserRouter>
  </React.StrictMode>
);

