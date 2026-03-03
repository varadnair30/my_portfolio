import React, { useState } from "react";
import { projects } from "../portfolio/knowledgeBase";

export default function ProjectsSection() {
  const [showAll, setShowAll] = useState(false);
  const visibleProjects = showAll ? projects : projects.slice(0, 6);

  return (
    <section className="py-5 bg-white" id="projects">
      <div className="container">
        <h2 className="text-center fw-bold mb-4">Projects</h2>
        <p className="text-center mb-5 text-muted fs-6">
          Some of my projects that highlight my experience across software engineering and AI/ML workflows.
        </p>
        <div className="row g-4">
          {visibleProjects.map((project, index) => (
            <div className="col-md-6 col-lg-4" key={index}>
              <div className="card h-100 shadow-sm border border-light-subtle project-card position-relative overflow-hidden">
                <div className="ratio ratio-16x9 project-image-wrapper">
                  <img
                    src={project.image}
                    className="w-100 h-100 object-fit-cover"
                    alt={project.title}
                    loading="lazy"
                  />
                  <div className="project-hover d-flex flex-column justify-content-center align-items-center text-center">
                    {project.github && (
                      <a
                        href={project.github}
                        className="text-white fw-bold mb-2"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`GitHub for ${project.title}`}
                      >
                        🔗 GitHub
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        className="text-white fw-bold"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Demo for ${project.title}`}
                      >
                        🚀 Demo
                      </a>
                    )}
                  </div>
                </div>
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title fw-semibold">{project.title}</h5>
                  <p className="text-muted small">{project.description}</p>
                  <div className="mb-2 d-flex flex-wrap gap-2">
                    {project.tech.map((tech, i) => (
                      <span key={i} className="badge bg-light text-dark border">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="mt-auto d-flex gap-2">
                    {project.github && (
                      <a
                        href={project.github}
                        className="btn btn-outline-dark btn-sm"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`GitHub link for ${project.title}`}
                      >
                        GitHub
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        className="btn btn-primary btn-sm"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Demo link for ${project.title}`}
                      >
                        Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {!showAll && (
          <div className="text-center mt-4">
            <button
              className="btn btn-outline-primary btn-sm"
              onClick={() => setShowAll(true)}
            >
              See More Projects
            </button>
          </div>
        )}
      </div>
      

      <style>{`
        .project-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border-radius: 8px;
        }
        .project-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 0 20px rgba(0,0,0,0.08);
        }
        .object-fit-cover {
          object-fit: cover;
        }
        .project-hover {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.6);
          opacity: 0;
          transition: opacity 0.3s ease-in-out;
          z-index: 2;
        }
        .project-card:hover .project-hover {
          opacity: 1;
        }
        .project-hover a {
          text-decoration: none;
          font-size: 1rem;
        }
        .project-image-wrapper {
          border-bottom: 1px solid #f1f1f1;
        }
      `}</style>
    </section>
  );
}