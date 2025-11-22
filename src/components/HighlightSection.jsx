import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function InternshipHighlight() {
  const images = [
    { src: "/images/SafariWorld.jpg", caption: "Safari World outing" },
    { src: "/images/YogaDay.jpg", caption: "Outdoor yoga with group" },
    { src: "/images/AITgroup.jpg", caption: "Group award ceremony" },
    { src: "/images/SCIPark.jpg", caption: "Thailand Scientific Park" },
    { src: "/images/AITnight.jpg", caption: "AIT Entrance" },
    { src: "/images/AITCampus.jpg", caption: "Beautiful AIT campus views" },
    { src: "/images/WorldLeaders.jpg", caption: "AIT Faculty & Leaders" }
  ];

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

  return (
    <section className="py-5 bg-white" id="ait-internship">
      <div className="container">
        <h2 className="text-center fw-bold mb-3">
          🌏 AIT Summer Research Internship, Thailand (2019)
        </h2>
        <p className="text-center mb-2 text-muted fs-6">
          Selected as <strong>1 of 72</strong> out of <strong>3,000</strong> students for an international education camp at Asian Institute of Technology.
        </p>
        <p className="text-center mb-5 text-muted fs-6">
          The experience offered invaluable exposure to global perspectives in technology, collaborative research, and personal growth.
        </p>

        <Slider {...settings}>
          {images.map(({ src, caption }, i) => (
            <div key={i} className="px-2">
              <div className="internship-card shadow-sm border border-light-subtle overflow-hidden">
                <div className="ratio ratio-4x3">
                  <img
                    src={process.env.PUBLIC_URL + src}
                    alt={caption}
                    className="w-100 h-100 object-fit-cover"
                    loading="lazy"
                  />
                </div>
                <div className="card-body text-center py-3">
                  <p className="mb-0 fw-medium small text-muted">{caption}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      <style>{`
        .internship-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border-radius: 8px;
          background: white;
        }
        .internship-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 0 20px rgba(0,0,0,0.12) !important;
        }
        .object-fit-cover {
          object-fit: cover;
        }
        
        /* Slick carousel custom styling to match your portfolio */
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
        
        /* Mobile responsiveness */
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
