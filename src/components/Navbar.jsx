import React from "react";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top shadow-sm">
      <div className="container">
        <a className="navbar-brand fw-bold" href="#hero">Varad</a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            {[
              ["About", "#about"],
              ["Skills", "#skills"],
              ["Projects", "#projects"],
              ["Blog", "#blog"],
              ["Testimonials", "#testimonials"],
              ["Certifications", "#certifications"],
              ["Contact", "#contact"],
            ].map(([name, href], idx) => (
              <li key={idx} className="nav-item">
                <a className="nav-link" href={href}>{name}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
