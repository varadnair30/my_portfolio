import React, { useState } from "react";
import Slider from "react-slick";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { highlights } from "../portfolio/knowledgeBase";

export default function LifeOutsideCodeSection() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const { images, title } = highlights.lifeOutsideCode;

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    pauseOnHover: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } }
    ]
  };

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <section className="py-5 bg-white" id="life-outside-code">
      <div className="container">
        <h2 className="text-center fw-bold mb-5">
          {title}
        </h2>

        <Slider {...settings}>
          {images.map(({ src, caption }, i) => (
            <div key={i} className="px-2">
              <div
                className="life-card shadow-sm border border-light-subtle overflow-hidden"
                onClick={() => openLightbox(i)}
                style={{ cursor: 'pointer' }}
              >
                <div className="ratio ratio-4x3 position-relative">
                  <img
                    src={process.env.PUBLIC_URL + src}
                    alt={caption}
                    className="w-100 h-100 object-fit-cover"
                    loading="lazy"
                  />
                  <div className="lightbox-overlay">
                    <span className="zoom-icon">🔍</span>
                  </div>
                </div>
                <div className="card-body text-center py-3">
                  <p className="mb-0 fw-medium small text-muted">{caption}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>

        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          index={lightboxIndex}
          slides={images.map(img => ({
            src: process.env.PUBLIC_URL + img.src,
            title: img.caption
          }))}
        />
      </div>

      <style>{`
        .life-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border-radius: 8px;
          background: white;
        }
        .life-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 0 20px rgba(0,0,0,0.12) !important;
        }
        .lightbox-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .life-card:hover .lightbox-overlay {
          opacity: 1;
        }
        .zoom-icon {
          font-size: 2.5rem;
          color: white;
          animation: pulse 1.5s ease-in-out infinite;
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        .object-fit-cover {
          object-fit: cover;
        }

        .slick-dots {
          bottom: -35px;
        }
        .slick-dots li button:before {
          font-size: 10px;
          color: #6c757d;
          opacity: 0.5;
        }
        .slick-dots li.slick-active button:before {
          color: var(--primary-color, #0d6efd);
          opacity: 1;
        }
        .slick-prev,
        .slick-next {
          width: 40px;
          height: 40px;
          z-index: 1;
        }
        .slick-prev {
          left: -45px;
        }
        .slick-next {
          right: -45px;
        }
        .slick-prev:before,
        .slick-next:before {
          font-size: 32px;
          color: var(--primary-color, #0d6efd);
          opacity: 0.7;
        }
        .slick-prev:hover:before,
        .slick-next:hover:before {
          opacity: 1;
        }

        @media (max-width: 768px) {
          .slick-prev {
            left: -25px;
          }
          .slick-next {
            right: -25px;
          }
          .slick-prev:before,
          .slick-next:before {
            font-size: 24px;
          }
        }
      `}</style>
    </section>
  );
}
