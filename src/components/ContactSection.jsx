import React from "react";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
} from "react-icons/fa";

export default function FooterSection() {
  return (
    <footer className="py-5 bg-dark text-light text-center" id="contact">
      <div className="container">
        <h4 className="fw-bold mb-4">Varad Nair</h4>

        <div className="mb-4">
          <a
            href="https://github.com/varadnair30"
            target="_blank"
            rel="noopener noreferrer"
            className="text-light mx-3 fs-4"
          >
            <FaGithub />
          </a>
          <a
            href="https://linkedin.com/in/nvarad/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-light mx-3 fs-4"
          >
            <FaLinkedin />
          </a>
          
          <a
            href="mailto:vnairusa30@gmail.com"
            className="text-light mx-3 fs-4"
          >
            <FaEnvelope />
          </a>
        </div>

        <p className="fs-6 mb-0">
          © {new Date().getFullYear()} Varad Nair. Built with Love & React ;) 
        </p>
      </div>
    </footer>
  );
}
