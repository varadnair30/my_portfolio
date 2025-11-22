import React, { useEffect, useRef, useState } from "react";

export default function SkillsSection() {
  const [animated, setAnimated] = useState(false);
  const sectionRef = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    // Small delay to ensure proper initialization
    const timer = setTimeout(() => {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !animated) {
              setTimeout(() => setAnimated(true), 200);
            }
          });
        },
        { 
          threshold: 0.2,
          rootMargin: "-50px"
        }
      );

      if (sectionRef.current) {
        observerRef.current.observe(sectionRef.current);
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      if (observerRef.current && sectionRef.current) {
        observerRef.current.unobserve(sectionRef.current);
      }
    };
  }, []);

  const skillCategories = [
    {
      category: "Frontend & Web",
      skills: [
        { name: "React.js", level: 90 },
        { name: "Next.js", level: 85 },
        { name: "Redux", level: 80 },
        { name: "HTML5", level: 95 },
        { name: "CSS3", level: 90 },
        { name: "TypeScript", level: 85 },
      ],
    },
    {
      category: "Backend & API",
      skills: [
        { name: "Spring Boot", level: 90 },
        { name: "Node.js", level: 85 },
        { name: "Express.js", level: 85 },
        { name: "Django", level: 88 },
        { name: "FastAPI", level: 87 },
        { name: "REST APIs", level: 92 },
      ],
    },
    {
      category: "Languages",
      skills: [
        { name: "Python", level: 92 },
        { name: "Java", level: 88 },
        { name: "C", level: 82 },
        { name: "JavaScript", level: 90 },
        { name: "SQL", level: 90 },
        { name: "C#", level: 85 },
      ],
    },
    {
      category: "Databases",
      skills: [
        { name: "PostgreSQL", level: 90 },
        { name: "MySQL", level: 88 },
        { name: "MongoDB", level: 85 },
        { name: "Firebase", level: 82 },
        { name: "Neo4j", level: 80 },
      ],
    },
    {
      category: "Cloud & DevOps",
      skills: [
        { name: "AWS", level: 85 },
        { name: "Docker", level: 88 },
        { name: "Kubernetes", level: 82 },
        { name: "CI/CD", level: 87 },
        { name: "Azure", level: 80 },
        { name: "Git", level: 92 },
      ],
    },
    {
      category: "AI / Machine Learning",
      skills: [
        { name: "TensorFlow", level: 85 },
        { name: "PyTorch", level: 85 },
        { name: "scikit-learn", level: 88 },
        { name: "NLP", level: 80 },
        { name: "Data Analysis", level: 87 },
        { name: "Pandas", level: 90 },
      ],
    },
  ];

  return (
    <section className="py-5 bg-light" id="skills" ref={sectionRef}>
      <div className="container">
        <h2 className="text-center fw-bold mb-5">Technical Skills</h2>
        <p className="text-center mb-5 text-muted">
          Tools and technologies I've used across full-stack development, cloud infrastructure, and AI workflows
        </p>

        <div className="row g-4">
          {skillCategories.map((category, idx) => (
            <div className="col-md-6 col-lg-4" key={idx}>
              <div className="skills-card">
                <h5 className="fw-bold mb-4" style={{ color: "#0d6efd" }}>
                  {category.category}
                </h5>
                {category.skills.map((skill, i) => (
                  <div key={i} className="skill-item mb-3">
                    <div className="d-flex justify-content-between mb-2">
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-level fw-bold">
                        {animated ? `${skill.level}%` : "0%"}
                      </span>
                    </div>
                    <div className="progress-container">
                      <div
                        className="progress-bar-custom"
                        style={{
                          width: animated ? `${skill.level}%` : "0%",
                          transitionDelay: animated ? `${i * 0.1}s` : "0s",
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .skills-card {
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          transition: box-shadow 0.3s ease, transform 0.3s ease;
          height: 100%;
        }

        .skills-card:hover {
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
          transform: translateY(-5px);
        }

        .skill-item {
          opacity: 1;
        }

        .progress-container {
          background-color: #e9ecef;
          border-radius: 10px;
          overflow: hidden;
          height: 8px;
          width: 100%;
        }

        .progress-bar-custom {
          background: linear-gradient(90deg, #0d6efd 0%, #0b5ed7 100%);
          height: 100%;
          border-radius: 10px;
          transition: width 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .skill-name {
          font-size: 0.95rem;
          color: #495057;
          font-weight: 500;
        }

        .skill-level {
          color: #0d6efd;
          font-size: 0.9rem;
        }

        @media (max-width: 768px) {
          .skills-card {
            padding: 1rem;
          }

          .skill-name {
            font-size: 0.85rem;
          }

          .skill-level {
            font-size: 0.8rem;
          }

          .col-md-6 {
            margin-bottom: 1rem;
          }
        }

        @media (max-width: 576px) {
          .skills-card {
            padding: 1rem;
          }

          h5 {
            font-size: 1.1rem;
            margin-bottom: 1rem !important;
          }

          .skill-item {
            margin-bottom: 1.5rem !important;
          }

          .progress-container {
            height: 6px;
          }
        }
      `}</style>
    </section>
  );
}
