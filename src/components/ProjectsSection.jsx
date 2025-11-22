import React, { useState } from "react";

const projects = [
  {
    title: "Smart Spend – AI-Powered Finance Manager",
    description: "Built a scalable full-stack finance app with Django REST, React, Docker, OCR receipt scanning, and predictive analytics (85% accuracy).",
    tech: ["Django REST Framework", "React", "Docker", "OCR", "PostgreSQL", "CI/CD"],
    image: process.env.PUBLIC_URL + "/projects/smart-spend.jpeg",
    github: "https://github.com/varadnair30/SmartSpend-AI-Expensetracker",
    demo: ""
  },
  {
    title: "Hotel Guest Prediction",
    description: "Developed an ML pipeline using XGBoost achieving 91.4% accuracy in predicting hotel guest cancellations to improve booking retention insights.",
    tech: ["Python", "XGBoost", "Machine Learning", "Data Science"],
    image: process.env.PUBLIC_URL + "/projects/hotel-guest-prediction.png",
    github: "https://github.com/varadnair30/Hotel_Guest_Prediction",
    demo: ""
  }
  ,{
    title: "Secure Phone Book API",
    description: "Developed a secure Phone Book REST API with FastAPI & Flask implementations featuring input validation, authentication, authorization, and logging.",
    tech: ["Python", "FastAPI", "Flask", "Docker", "REST API", "Authentication"],
    image: process.env.PUBLIC_URL + "/projects/P1.jpg",
    github: "https://github.com/varadnair30/secure-phonebook-api",
    demo: ""
  },
  {
    title: "Twitter Sentiment Analysis with CNN and BERT",
    description: "Applied TensorFlow and PyTorch to build NLP models using CNN & BERT architectures, achieving 80%+ accuracy for real-time sentiment analysis.",
    tech: ["Python", "TensorFlow", "PyTorch", "NLP", "CNN", "BERT", "Deep Learning"],
    image: process.env.PUBLIC_URL + "/projects/P2.PNG",
    github: "https://github.com/varadnair30/Twitter-Sentiment-Analysis-with-CNN-and-BERT-using-Deep-Learning",
    demo: ""
  },
  {
    title: "Cloud Based College Notes and Assignment Sharing System",
    description: "Built a web platform for notes and assignments sharing, increasing resource accessibility by 60%, using Django backend and PostgreSQL with HTML5 and CSS frontend.",
    tech: ["Django", "Python", "PostgreSQL", "HTML5", "CSS", "JavaScript"],
    image: process.env.PUBLIC_URL + "/projects/team-young-college-students-working-600nw-2111421299.webp",
    github: "https://github.com/varadnair30/Notes-Assignment-Sharing-System-using-Django-and-PostgreSQL",
    demo: ""
  },
  {
    title: "TF-IDF Based Toy Search Engine",
    description: "Designed a search engine prototype processing multiple documents with 90% precision using TF-IDF vectorization and NLP techniques including tokenization and stemming.",
    tech: ["Python", "Jupyter", "NLP", "TF-IDF", "Tokenization", "Stemming"],
    image: process.env.PUBLIC_URL + "/projects/tf idf.webp",
    github: "https://github.com/varadnair30/TF-IDF-Based-Toy-Search-Engine-Implementation",
    demo: ""
  },
  {
    title: "Book Barter Mobile App",
    description: "Engineered a full-stack Android app using Java and Firebase Cloud Firestore for book enthusiasts to find, exchange, and explore books easily.",
    tech: ["Java", "Firebase", "Android Studio", "OOP", "UML"],
    image: process.env.PUBLIC_URL + "/projects/book barter.PNG",
    github: "https://github.com/varadnair30/Book-Barter-Android-App",
    demo: ""
  },
  {
    title: "Servigo - Full Stack Service Booking Platform",
    description: "Developed a full-stack platform using Angular, Spring Boot, and MySQL with Spring Security and JWT authentication for secure and scalable service bookings.",
    tech: ["Java", "Spring Boot", "Angular", "MySQL", "JWT", "Maven"],
    image: process.env.PUBLIC_URL + "/projects/servigo.webp",
    github: "https://github.com/varadnair30/Servigo",
    demo: ""
  },
  {
    title: "Multi-Threaded RPC File and Computational Server",
    description: "Created a multi-threaded file and computation server with synchronous and asynchronous RPC using Python libraries like xmlrpc, rpyc, and filecmp.",
    tech: ["Python", "RPC", "Multi-threading", "xmlrpc", "rpyc"],
    image: process.env.PUBLIC_URL + "/projects/RPC.jpg",
    github: "https://github.com/varadnair30/Multi-Threaded-RPC-File-and-Computational-Server-Development",
    demo: ""
  },
  {
    title: "2 Phase Commit Protocol",
    description: "Implemented a distributed transaction concurrency control protocol improving fault tolerance and reducing overhead using Python socket programming and RPC.",
    tech: ["Python", "Socket Programming", "RPC", "Distributed Systems", "Timeout Mechanism"],
    image: process.env.PUBLIC_URL + "/projects/2pc.png",
    github: "https://github.com/varadnair30/2-Phase-Commit",
    demo: ""
  },
  {
    title: "AccessVault - Role Based Security Management",
    description: "Designed a relational database system for managing discretionary access control, focusing on EER schema design, SQL implementation, and transaction management.",
    tech: ["Python", "MySQL", "Oracle", "EER", "Transaction Management"],
    image: process.env.PUBLIC_URL + "/projects/accessvault.webp",
    github: "https://github.com/varadnair30/AccessVault",
    demo: ""
  },
  {
    title: "kNN Algorithm Comparative Analysis",
    description: "Performed comparative analysis of k-Nearest Neighbors on UCI datasets, optimizing distance metrics and improving runtime by 20%.",
    tech: ["Python", "kNN", "Data Analysis", "Matplotlib"],
    image: process.env.PUBLIC_URL + "/projects/knn-comparative.png",
    github: "https://github.com/varadnair30/kNN-Algorithm-Comparative-Analysis-Across-Datasets",
    demo: ""
  }
];

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