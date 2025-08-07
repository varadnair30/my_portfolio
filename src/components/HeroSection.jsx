import React from "react";
import Tilt from "react-parallax-tilt";
import { motion, useAnimation } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaFilePdf,
} from "react-icons/fa";
import { useEffect, useState } from "react";

const roles = [
  "Graduate Research Assistant @ UTA",
  "Full-Stack Engineer | 3+ YOE",
  "AI, Cloud & Full Stack Systems Specialist",
];

export default function HeroSection() {
  const [index, setIndex] = useState(0);
  const controls = useAnimation();

  useEffect(() => {
    controls.start({ opacity: 1, y: 0 });
    const interval = setInterval(() => {
      controls.start({ opacity: 0, y: 20 }).then(() => {
        setIndex((prev) => (prev + 1) % roles.length);
        controls.start({ opacity: 1, y: 0 });
      });
    }, 2500);
    return () => clearInterval(interval);
  }, [controls]);

  return (
    <section
      id="hero"
      className="min-vh-100 d-flex align-items-center text-white"
      style={{
        background: "linear-gradient(90deg, #0f0f0f 0%, #1a1a1a 100%)",
        overflow: "hidden",
      }}
    >
      <div className="container">
        <div className="row align-items-center">
          {/* Left: Parallax Image */}
          <div className="col-md-6 text-center mb-4 mb-md-0">
            <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} glareEnable={true} glareMaxOpacity={0.2}>
              <img
                src={process.env.PUBLIC_URL + "/hero.jpg"}
                alt="Varad Hero"
                className="img-fluid rounded-4 shadow-lg"
                style={{
                  maxHeight: "500px",
                  width: "100%",
                  objectFit: "contain",
                }}
              />
            </Tilt>
          </div>

          {/* Right: Text Content */}
          <div className="col-md-6 text-center text-md-start fade-in">
            <h1 className="display-4 fw-bold mb-2">Varad Nair</h1>
            <motion.h5
              className="mb-4 text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={controls}
              transition={{ duration: 0.6 }}
            >
              {roles[index]}
            </motion.h5>
            <p className="lead mb-4 text-light">
              Crafting scalable AI-driven applications and backend systems, with a passion for automation, cloud-native solutions, and performance optimization.
            </p>
            <div className="d-flex justify-content-center justify-content-md-start gap-4 fs-4 flex-wrap mb-3">
              {[
                {
                  icon: <FaGithub />,
                  link: "https://github.com/varadnair30",
                },
                {
                  icon: <FaLinkedin />,
                  link: "https://linkedin.com/in/varad-nair",
                },
                {
                  icon: (
                    <img
                      src={process.env.PUBLIC_URL + "/logos/leetcode.png"}
                      alt="LeetCode"
                      style={{
                        width: "24px",
                        height: "24px",
                        objectFit: "contain",
                        filter: "invert(1)",
                      }}
                    />
                  ),
                  link: "https://leetcode.com/u/vnvarad_30/",
                },
                {
                  icon: <FaEnvelope />,
                  link: "mailto:vnairusa30@gmail.com",
                },
                {
                  icon: <FaFilePdf />,
                  link: "https://drive.google.com/file/d/1B3PuUgo_4a-mY19BmWLu7sAnretus1Z6/view",
                },
              ].map(({ icon, link }, i) => (
                <motion.a
                  key={i}
                  href={link}
                  className="text-white"
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.2, rotate: 2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {icon}
                </motion.a>
              ))}
            </div>
            <a href="#contact" className="btn btn-outline-light btn-sm px-4">
              Let’s Connect
            </a>
          </div>
        </div>
      </div>

      {/* Additional Styling */}
      <style>{`
        .fade-in {
          animation: fadeInUp 1s ease-out;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
