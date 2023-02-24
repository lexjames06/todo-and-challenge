import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter as Router } from "react-router-dom";
import './index.css';
import App from './App';
import { Store } from "./store";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Store>
    <Router>
      <App />
    </Router>
  </Store>
);
