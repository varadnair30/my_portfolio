import React from "react";
//check commit

export default function LeadershipSection() {
  const achievements = [
    {
      title: "Featured Campus Ambassador",
      organization: "United Group of Institutions",
      description: "Selected as the face of first-year student experience at United Group of Institutions, representing 3,000+ students. Led orientation initiatives and served as a bridge between administration and incoming students.",
      image: process.env.PUBLIC_URL + "/leadership/MyUGIposter.jpeg",
      tags: ["Leadership", "Student Advocacy", "Public Relations"],
      impact: "Represented institution across 5+ promotional campaigns",
      imagePosition: "left center" // Focus on left side with text
    },
    {
      title: "Technical Speaker & Presenter",
      organization: "TEDx-Style Tech Events",
      description: "Delivered technical presentations on emerging technologies and software engineering best practices to audiences of 200+ students and faculty. Specialized in making complex AI/ML and cloud architecture topics accessible.",
      image: process.env.PUBLIC_URL + "/leadership/MyStage.JPG",
      tags: ["Public Speaking", "Technical Communication", "Mentorship"],
      impact: "Conducted 10+ technical talks reaching 500+ students",
      imagePosition: "center center"
    }
  ];

  return (
    <section className="py-5 bg-white" id="leadership">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="fw-bold mb-3">Leadership & Recognition</h2>
          <p className="text-muted">
            Bridging technical expertise with effective communication and student leadership
          </p>
        </div>

        <div className="row g-4">
          {achievements.map((achievement, index) => (
            <div className="col-lg-6" key={index}>
              <div className="leadership-card">
                <div className="image-wrapper">
                  <img
                    src={achievement.image}
                    alt={achievement.title}
                    className="achievement-image"
                    style={{ objectPosition: achievement.imagePosition }}
                    loading="lazy"
                  />
                  <div className="image-overlay"></div>
                </div>
                <div className="card-content">
                  <div className="organization-badge mb-2">
                    {achievement.organization}
                  </div>
                  <h4 className="achievement-title mb-3">{achievement.title}</h4>
                  <p className="achievement-description mb-3">
                    {achievement.description}
                  </p>
                  <div className="impact-stat mb-3">
                    <span className="impact-icon">📊</span>
                    <span className="impact-text">{achievement.impact}</span>
                  </div>
                  <div className="tags-container">
                    {achievement.tags.map((tag, i) => (
                      <span key={i} className="achievement-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Key Competencies Bar */}
        <div className="competencies-section mt-5">
          <h5 className="text-center fw-bold mb-4">Core Leadership Competencies</h5>
          <div className="row g-3">
            <div className="col-md-3 col-6">
              <div className="competency-card">
                <div className="competency-icon">🎤</div>
                <div className="competency-name">Public Speaking</div>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="competency-card">
                <div className="competency-icon">👥</div>
                <div className="competency-name">Team Leadership</div>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="competency-card">
                <div className="competency-icon">📢</div>
                <div className="competency-name">Technical Communication</div>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="competency-card">
                <div className="competency-icon">🎯</div>
                <div className="competency-name">Student Advocacy</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .leadership-card {
          background: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .leadership-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12);
        }

        .image-wrapper {
          position: relative;
          width: 100%;
          height: 380px;
          overflow: hidden;
        }

        .achievement-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .leadership-card:hover .achievement-image {
          transform: scale(1.05);
        }

        .image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 40%);
          pointer-events: none;
        }

        .card-content {
          padding: 2rem;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .organization-badge {
          display: inline-block;
          background: #0d6efd;
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          width: fit-content;
        }

        .achievement-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1f2937;
          line-height: 1.3;
        }

        .achievement-description {
          color: #6b7280;
          line-height: 1.7;
          font-size: 0.95rem;
        }

        .impact-stat {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem;
          background: #f3f4f6;
          border-radius: 8px;
          border-left: 3px solid #0d6efd;
        }

        .impact-icon {
          font-size: 1.25rem;
        }

        .impact-text {
          font-size: 0.9rem;
          font-weight: 600;
          color: #374151;
        }

        .tags-container {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-top: auto;
        }

        .achievement-tag {
          background: #e5e7eb;
          color: #374151;
          padding: 0.375rem 0.75rem;
          border-radius: 6px;
          font-size: 0.8rem;
          font-weight: 500;
        }

        /* Competencies Section */
        .competencies-section {
          padding: 2rem;
          background: #f9fafb;
          border-radius: 12px;
        }

        .competency-card {
          background: white;
          padding: 1.5rem;
          border-radius: 12px;
          text-align: center;
          transition: all 0.3s ease;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
        }

        .competency-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
        }

        .competency-icon {
          font-size: 2rem;
          margin-bottom: 0.5rem;
        }

        .competency-name {
          font-size: 0.9rem;
          font-weight: 600;
          color: #374151;
        }

        /* Mobile Responsiveness */
        @media (max-width: 768px) {
          .image-wrapper {
            height: 280px;
          }

          .card-content {
            padding: 1.5rem;
          }

          .achievement-title {
            font-size: 1.25rem;
          }

          .achievement-description {
            font-size: 0.9rem;
          }

          .competency-card {
            padding: 1rem;
          }

          .competency-icon {
            font-size: 1.5rem;
          }

          .competency-name {
            font-size: 0.85rem;
          }
        }

        @media (max-width: 576px) {
          .image-wrapper {
            height: 240px;
          }

          .card-content {
            padding: 1rem;
          }

          .competencies-section {
            padding: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
}
