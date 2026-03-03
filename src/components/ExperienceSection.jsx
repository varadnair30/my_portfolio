import React from "react";
import { experiences } from "../portfolio/knowledgeBase";

export default function ExperienceSection() {
  return (
    <section className="py-5 bg-white" id="experience">
      <div className="container">
        <h2 className="text-center fw-bold mb-4">Experience</h2>
        <div className="row g-4">
          {experiences.map((exp, i) => (
            <div key={i} className="col-md-6">
              <div className="border rounded p-3 h-100 shadow-sm experience-card">
                <div className="d-flex align-items-center mb-2">
                  <img
                    src={process.env.PUBLIC_URL + exp.logo}
                    alt={exp.company}
                    style={{ width: "40px", height: "40px", objectFit: "contain", marginRight: "12px" }}
                  />
                  <div>
                    <h6 className="mb-0 fw-bold">{exp.title}</h6>
                    <small className="text-muted">{exp.company}</small>
                  </div>
                </div>
                <div className="text-muted small mb-2">
                  {exp.duration} · {exp.location}
                </div>
                <ul className="small text-muted ps-3 mb-2">
                  {exp.bullets.map((b, j) => (
                    <li key={j}>{b}</li>
                  ))}
                </ul>
                <div className="d-flex flex-wrap gap-2">
                  {exp.tech.map((tech, k) => (
                    <span key={k} className="badge bg-light text-dark border">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <style>{`
          .experience-card {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .experience-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 0 15px rgba(0,0,0,0.05);
          }
        `}</style>
      </div>
    </section>
  );
}
