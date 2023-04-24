import React from 'react';
import { HashRouter as Router } from 'react-router-dom'; // import Router
import { createRoot } from "react-dom/client";
import App from './App';


createRoot(document.getElementById("root")).render(<Router>
  <App />
</Router>,);

