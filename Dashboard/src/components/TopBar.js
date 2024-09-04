import React from "react";




export default function TopBar() {
    return (
      <div className="top">
            <i className="uil uil-bars sidebar-toggle"></i>

            <div className="search-box">
                <i className="uil uil-search"></i>
                <input type="text" placeholder="Search here..."/>
            </div>
            Welcome, Admin
            <img src="https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/man-user-circle-icon.png" alt=""/>
        </div>
    )
}