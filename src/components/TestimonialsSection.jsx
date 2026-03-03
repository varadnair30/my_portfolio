import React, { useState } from "react";
import { FaLinkedin } from "react-icons/fa";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { testimonials } from "../portfolio/knowledgeBase";

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
