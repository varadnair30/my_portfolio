import React from "react";

const certifications = [
  {
    name: "Microsoft Certified: Bing Ads Fundamentals",
    issuer: "Microsoft",
    badge: process.env.PUBLIC_URL + "/certs/microsoft.png",
    link: "https://drive.google.com/file/d/1LikUf4tcicgIpy86kEd2bI1x8gXp-WAP/view?usp=sharing",
  },
  {
    name: "Kubernetes for Developers: Core Concepts",
    issuer: "Linkedin Learning",
    badge: process.env.PUBLIC_URL + "/certs/kubernetes.png",
    link: "https://www.linkedin.com/learning/certificates/85bd9fed3f3f77e21cd57b8c61b68c78c8c6388c36eee0eb23170110c5bb2e24",
  },
  {
    name: "Software Engineer Certification",
    issuer: "HackerRank",
    badge: process.env.PUBLIC_URL + "/certs/hackerrank.jpg",
    link: "https://www.hackerrank.com/certificates/386367939bae",
  }
];

export default function CertificationsSection() {
  return (
    <section className="py-5 bg-light" id="certifications">
      <div className="container">
        <h2 className="text-center fw-bold mb-5">Certifications</h2>
        <div className="row g-4 justify-content-center">
          {certifications.map((cert, index) => (
            <div key={index} className="col-md-4 col-sm-6">
              <div className="card h-100 shadow-sm border-0 text-center p-4">
                <div className="d-flex justify-content-center align-items-center mb-4" style={{ minHeight: "100px" }}>
                  <img
                    src={cert.badge}
                    alt={cert.name}
                    style={{
                      height: "80px",
                      width: "auto",
                      maxWidth: "180px",
                      objectFit: "contain",
                      transition: "transform 0.3s ease",
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
                    onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                  />
                </div>
                <h6 className="fw-semibold">{cert.name}</h6>
                <small className="text-muted">{cert.issuer}</small>
                <div className="mt-3">
                  <a
                    href={cert.link}
                    className="btn btn-sm btn-outline-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Certificate
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
