import React from "react";

const experiences = [
  {
    title: "Research Software Engineer",
    company: "Science & Engineering Innovation & Research Labs, University of Texas at Arlington",
    logo: "/companies/uta.png",
    duration: "Jan 2025 – Present",
    location: "Arlington, TX",
    bullets: [
      "Developed AI-driven applications integrating Gemini LLMs (1.5-Flash & 1.5-Pro) with LangChain and FAISS, optimizing document-grounded Q&A pipelines and reducing hallucination errors by 40%",
      "Engineered Python-based ML pipelines (TF-IDF + Logistic Regression) to classify warehouse management commands with 75%+ accuracy",
      "Automated document retrieval workflows and improved API security, reducing manual intervention by 60% and ensuring compliance with GenAI best practices"
    ],
    tech: ["Python", "Retrieval-Augmented Generation (RAG)","LangChain", "FAISS", "Gemini LLMs","BM25","Ollama","Gemma 2B", "TF-IDF", "Logistic Regression", "APIs", "Streamlit", "Pandas"],
  },
  {
    title: "Software Engineer Intern",
  company: "Mavenir Systems",
  logo: "/companies/mavenir.png",
  duration: "May 2024 – Aug 2024",
  location: "Richardson, TX",
  bullets: [
    "Pioneered backend network infrastructure and monitoring solutions using Python and Kubernetes, improving scalability and streamlining processes.",
    "Collaborated with 5+ cross-functional teams to optimize infrastructure, develop features, and integrate innovative services in a fast-paced environment.",
    "Contributed to a CI/CD environment by pushing code updates, conducting thorough testing, and debugging to ensure reliability, reducing downtime by 20%.",
    "Automated 2 key operational workflows using Bash scripting on Unix/Linux systems, reducing manual errors by 40%."
  ],
  tech: ["Python", "Kubernetes", "Bash", "CI/CD", "Unix/Linux", "Automation"],
  },
  {
  title: "Software Engineer",
  company: "Tata Consultancy Services",
  logo: "/companies/tcs.webp",
  duration: "Aug 2021 – Jun 2023",
  location: "Pune, India",
  bullets: [
    "Spearheaded data-driven projects using Azure DevOps, Python, and SQL, executing large-scale analysis on 2-3 TB datasets in COSMOS to identify process inefficiencies.",
    "Developed backend services for customer-facing applications ensuring seamless integration with frontend systems.",
    "Optimized data warehousing processes by 50% through campaign analysis using Adobe Analytics, Python, SQL, and Power BI.",
    "Diagnosed and resolved over 30 production issues within tight deadlines, collaborating closely with QA, IT, and Operations teams to enhance system performance."
  ],
  tech: ["Python", "NoSQL", "Azure DevOps", "Adobe Analytics", "Power BI", "COSMOS DB"],
  },
  {
    title: "Freelance Full-Stack Developer",
    company: "Self-Employed / Remote",
    logo: "/companies/freelancer.jpeg",
    duration: "Jul 2020 – Dec 2022",
    location: "Remote",
    bullets: [
      "Delivered 10+ full-stack web applications using Django REST, Spring Boot, React, Angular, and PostgreSQL, improving client operational efficiency by 40–60%",
      "Built data-driven dashboards and analytics tools with Python, Pandas, Flask/Django, providing actionable insights to 200+ end-users",
      "Deployed applications to AWS cloud using Docker and CI/CD pipelines, reducing deployment time by 50% and server downtime by 30%",
      "Delivered 15+ secure REST APIs with authentication and access control, preventing potential data breaches and enhancing system reliability"
    ],
    tech: ["Django REST", "Spring Boot", "React", "Angular", "PostgreSQL", "Python", "Flask", "Pandas", "Docker", "AWS", "CI/CD", "APIs", "Authentication"],
  },
  
];

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
