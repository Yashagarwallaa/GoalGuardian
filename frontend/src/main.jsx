import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Home } from './components/Home.jsx';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import Dashboard from './components/Dashboard.jsx';
import { RouterProvider, Route } from 'react-router-dom';
import { createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import About from './components/About.jsx';
import Calculator from './components/Calculator.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="signup" element={<Signup />} />
      <Route path="about" element={<About />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="login" element={<Login />} />
      <Route path="calculator" element={<Calculator />} />

    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
);
