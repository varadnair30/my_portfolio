import React, { useEffect, useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import {
  FaHome,
  FaUser,
  FaCode,
  FaProjectDiagram,
  FaStar,
  FaEnvelope,
  FaBriefcase,
  FaBars,
  FaTimes,
  FaTrophy
} from "react-icons/fa";

const sections = [
  { id: "home", icon: <FaHome />, label: "Home" },
  { id: "about", icon: <FaUser />, label: "About" },
  { id: "leadership", icon: <FaTrophy />, label: "Leadership" },
  { id: "skills", icon: <FaCode />, label: "Skills" },
  { id: "experience", icon: <FaBriefcase />, label: "Experience" },
  { id: "projects", icon: <FaProjectDiagram />, label: "Projects" },
  { id: "testimonials", icon: <FaStar />, label: "Testimonials" },
  { id: "contact", icon: <FaEnvelope />, label: "Contact" }
];

export default function SideNav() {
  const [activeId, setActiveId] = useState("home");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const sectionElements = sections.map(({ id }) =>
      document.getElementById(id)
    );

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visibleSections.length > 0) {
          const topMost = visibleSections[0];
          setActiveId(topMost.target.id);
        } else {
          setActiveId("home");
        }
      },
      {
        threshold: [0.25, 0.5, 0.75]
      }
    );

    sectionElements.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Toggle button for small screens */}
      <button
        className="btn btn-primary d-md-none position-fixed top-0 start-0 m-3 z-3"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle navigation"
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* SideNav (visible on md and up OR toggle open) */}
      <div
        className={`position-fixed top-50 start-0 translate-middle-y d-flex flex-column gap-3 ps-2 z-3 ${
          isOpen ? "d-flex" : "d-none d-md-flex"
        }`}
      >
        {sections.map((s, idx) => (
          <OverlayTrigger
            key={idx}
            placement="right"
            overlay={<Tooltip>{s.label}</Tooltip>}
          >
            <a
              href={`#${s.id}`}
              onClick={() => setIsOpen(false)} // close on click
              className={`btn rounded-circle shadow-sm d-flex align-items-center justify-content-center ${
                activeId === s.id ? "btn-primary text-white" : "btn-light"
              }`}
              style={{ width: 45, height: 45 }}
            >
              {s.icon}
            </a>
          </OverlayTrigger>
        ))}
      </div>
    </>
  );
}
