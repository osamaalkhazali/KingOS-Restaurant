import React, { useState } from "react";
import { useEffect } from 'react';
import { Link} from 'react-router-dom';
import { useAuth } from "../context/authContext";



export default function AdminNavBar() {
  
  const { isAuthenticated , user } = useAuth();

  const [userOptions, setUserOptions] = useState('')
  const [mangersTables, setMangersTables] = useState('')

    const handleLogout = () => {
      localStorage.removeItem('accessToken')
      window.location.reload();
    }

  useEffect(() => {
    const validUser = localStorage.getItem('accessToken');
    if (validUser && isAuthenticated) {
      setUserOptions(<>
                      <Link  >
                        <i className="uil uil-user"></i>
                      <span className="link-name">{user.username ?? 'Loading...'}</span>
                        </Link>
                      <Link to="/">
                        <i className="uil uil-signout"></i>
                        <span className="link-name" onClick={handleLogout} >Logout</span>
                      </Link>
                      
                      </>)
    } 
  }, [user , isAuthenticated])
  
  useEffect(() => {
    const validUser = localStorage.getItem('accessToken');
    if (validUser && user.position === "Manger") {
      setMangersTables(<>
                        <li>
                          <Link to="/workers">
                            <i className="uil uil-users-alt"></i>
                            <span className="link-name">Workers</span>
                          </Link>
                        </li>
                      
                      </>)
    } 
  }, [user , isAuthenticated])
  
  
  useEffect(() => {
    const body = document.querySelector("body");
    const modeToggle = document.querySelector(".mode-toggle");
    const sidebar = document.querySelector("nav");
    const sidebarToggle = document.querySelector(".sidebar-toggle");

    let getMode = localStorage.getItem("mode");
    if (getMode && getMode === "dark") {
      body.classList.add("dark");
    }

    let getStatus = localStorage.getItem("status");
    if (getStatus && getStatus === "close") {
      sidebar.classList.add("close");
    }

    const handleModeToggle = () => {
      body.classList.toggle("dark");
      if (body.classList.contains("dark")) {
        localStorage.setItem("mode", "dark");
      } else {
        localStorage.setItem("mode", "light");
      }
    };

    const handleSidebarToggle = () => {
      sidebar.classList.toggle("close");
      if (sidebar.classList.contains("close")) {
        localStorage.setItem("status", "close");
      } else {
        localStorage.setItem("status", "open");
      }
    };

    modeToggle.addEventListener("click", handleModeToggle);
    sidebarToggle.addEventListener("click", handleSidebarToggle);

    // Cleanup event listeners on component unmount
    return () => {
      modeToggle.removeEventListener("click", handleModeToggle);
      sidebarToggle.removeEventListener("click", handleSidebarToggle);
    };
  }, []);
  
    return (

      <nav>
        <div className="logo-name">
            <div className="logo-image"><img src="https://cdn1.iconfinder.com/data/icons/hospital-wayfinding-icostory/64/button-administrative_department-administration-administrator-chief-512.png" alt=""/>
            </div>
            <span className="logo_name">KingOS Restaurant</span>
        </div>

        <div className="menu-items">
      <ul className="nav-links">
        <li>
          <Link to="/">
            <i className="uil uil-estate"></i>
            <span className="link-name">Dashboard</span>
          </Link>
        </li>
        <li>
          <Link to="/FoodMenu">
            <i className="uil uil-files-landscapes"></i>
            <span className="link-name">Food Menu</span>
          </Link>
        </li>
        <li>
          <Link to="/Tables">
            <i className="uil uil-chart"></i>
            <span className="link-name">Tables</span>
          </Link>
        </li>
        <li>
          <Link to="/orders">
            <i className="uil uil-thumbs-up"></i>
            <span className="link-name">Orders</span>
          </Link>
        </li>
        {mangersTables}
      </ul>

      <ul className="logout-mode">
        <li>
          {userOptions}
        </li>
        
        <li>
          <Link to="http://localhost:3001">
            <i className="uil uil-signout"></i>
            <span className="link-name">Main Site</span>
          </Link>
        </li>

        <li className="mode">
          <Link >
            <i className="uil uil-moon"></i>
            <span className="link-name">Dark Mode</span>
          </Link>

          <div className="mode-toggle">
            <span className="switch"></span>
          </div>
        </li>
      </ul>
    </div>
    </nav>
    )
}