import React, { useState } from "react";
import { FaLinkedin } from "react-icons/fa";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const testimonials = [
  {
    name: "Amit Kumar Singhai",
    title: "Senior Associate Consultant",
    linkedIn: "https://www.linkedin.com/in/amit-kumar-singhai/",
    image: process.env.PUBLIC_URL + "/testimonials/amit-singhai.jpeg",
    text: `I had the pleasure of working with Varad at Tata Consultancy Services, where he consistently demonstrated strong problem-solving abilities and a collaborative spirit. In his role, Varad handled complex data-driven deliverables with precision, using his analytical thinking to identify and address inefficiencies, which led to measurable operational improvements. His critical thinking was especially evident when resolving high-priority production issues, where he worked seamlessly with cross-functional teams to ensure optimal system performance. Varad’s commitment to delivering quality solutions and his proactive approach made him a reliable and highly valued team player. I’m confident he’ll continue to excel in any future endeavor`,
    color: "hsl(124, 70%, 85%)",
  },
  {
    name: "Ashwinkumar S Padale",
    title: "Senior Systems Integration Engineer",
    linkedIn: "https://www.linkedin.com/in/ashwwin24/",
    image: process.env.PUBLIC_URL + "/testimonials/ashwin.jpeg",
    text: `I had the pleasure of working closely with Varad during his Summer 2024 internship at Mavenir. As his senior colleague, I was consistently impressed by his proactive approach, technical aptitude, and ability to collaborate effectively with cross-functional teams. Varad played a key role in optimizing our infrastructure, significantly improving performance and reducing manual errors through automation. His contributions to our CI/CD environment and back-end development were invaluable, and his dedication to ensuring scalability and reliability made a noticeable impact on our projects. I highly recommend Varad for any role that requires strong problem-solving skills and a solid technical foundation.`,
    color: "hsla(184, 71%, 85%, 1.00)",
  },
  {
    name: "Owen Turnbull",
    title: "Technical Project/Program Manager",
    linkedIn: "https://www.linkedin.com/in/owen-turnbull/",
    image: process.env.PUBLIC_URL + "/testimonials/owen.jpeg",
    text: `For anyone seeking a dedicated and highly capable Engineering Intern, Varad is the person you need. During our time working together at Mavenir, I was consistently impressed by his professionalism, clarity of thought, and methodical problem-solving abilities. One particular instance that stands out was when Varad assisted me in troubleshooting a complex Python-based automation script. His structured approach to debugging, combined with his ability to break down the problem and communicate solutions clearly, showcased his strong technical foundation and maturity beyond his experience level.

    Varad’s passion for engineering and his proactive attitude make him a standout team player. He doesn’t just solve problems — he ensures long-term solutions by understanding the root cause and improving processes wherever possible. I have no doubt that Varad will excel in his future endeavors and grow into a top-tier engineer in any organization he joins`,
    color: "hsla(67, 71%, 85%, 1.00)",
  },
];

function getInitials(name) {
  const parts = name.trim().split(" ");
  return (parts[0][0] + (parts[1]?.[0] || "")).toUpperCase();
}

export default function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [isFading, setIsFading] = useState(false);

  const changeSlide = (newIndex) => {
    setIsFading(true);
    setExpanded(false);
    setTimeout(() => {
      setCurrentIndex(newIndex);
      setIsFading(false);
    }, 400); // duration matches CSS transition
  };

  const prevSlide = () => {
    const newIndex = currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1;
    changeSlide(newIndex);
  };

  const nextSlide = () => {
    const newIndex = currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1;
    changeSlide(newIndex);
  };

  const current = testimonials[currentIndex];
  const isLongText = current.text.length > 350;
  const displayedText = expanded || !isLongText ? current.text : current.text.slice(0, 350) + "...";

  return (
    <section className="py-5 bg-white" id="testimonials">
      <div className="container">
        <h2 className="text-center fw-bold mb-4">What Others Say</h2>
        <p className="text-center mb-5 text-muted fs-6">
          Recommendations and reflections shared by mentors, managers, and peers.
        </p>
        <div className="position-relative">
          <div
            className={`card mx-auto testimonial-card shadow-sm p-4 text-center ${isFading ? "fade-out" : ""}`}
          >
            <div className="d-flex justify-content-center mb-3">
              {current.image ? (
                <img
                  src={current.image}
                  alt={current.name}
                  className="rounded-circle"
                  style={{
                    width: "64px",
                    height: "64px",
                    objectFit: "cover",
                    border: `2px solid ${current.color}`,
                  }}
                />
              ) : (
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center"
                  style={{
                    width: "64px",
                    height: "64px",
                    backgroundColor: current.color,
                    fontWeight: 600,
                    color: "#333",
                    fontSize: "1.5rem",
                  }}
                >
                  {getInitials(current.name)}
                </div>
              )}
            </div>
            <h5>
              {current.linkedIn ? (
                <a
                  href={current.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-decoration-none"
                >
                  {current.name}
                </a>
              ) : (
                current.name
              )}
              {current.linkedIn && (
                <a
                  href={current.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ms-2 text-primary"
                >
                  <FaLinkedin size={18} />
                </a>
              )}
            </h5>
            <div className="text-muted small mb-3">{current.title}</div>
            <p className="testimonial-text">{displayedText}</p>
            {isLongText && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="btn btn-sm btn-link ps-0"
              >
                {expanded ? "Read less" : "Read more"}
              </button>
            )}
          </div>

          <button
            className="carousel-control-prev"
            onClick={prevSlide}
            style={{ left: 0 }}
            aria-label="Previous testimonial"
          >
            <FiChevronLeft size={32} />
          </button>

          <button
            className="carousel-control-next"
            onClick={nextSlide}
            style={{ right: 0 }}
            aria-label="Next testimonial"
          >
            <FiChevronRight size={32} />
          </button>
        </div>
      </div>

      <style>{`
        .testimonial-card {
          max-width: 600px;
          border-radius: 16px;
          transition: opacity 0.4s ease;
          opacity: 1;
        }
        .testimonial-card.fade-out {
          opacity: 0;
        }
        .testimonial-text {
          font-size: 0.9rem;
          color: #444;
          line-height: 1.5;
        }
        .carousel-control-prev,
        .carousel-control-next {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: #333;
          z-index: 2;
          cursor: pointer;
        }
        .carousel-control-prev:hover,
        .carousel-control-next:hover {
          color: #007bff;
        }
        .btn-link {
          text-decoration: none;
          color: #0d6efd;
          cursor: pointer;
          font-weight: 500;
        }
        .btn-link:hover {
          text-decoration: underline;
        }
        @media (max-width: 576px) {
          .testimonial-card {
            max-width: 90vw;
            padding: 1rem;
          }
        }
      `}</style>
    </section>
  );
}
