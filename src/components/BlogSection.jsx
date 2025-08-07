import React, { useState } from "react";
import { FaExternalLinkAlt, FaMedium } from "react-icons/fa";

const blogs = [
  {
    title: "Roadmap to Generative AI — 2024",
    description: "This blog series serves as a reference for learning and achieving Generative AI mastery in 2024.",
    link: "https://technotronic.medium.com/roadmap-to-generative-ai-2024-1c8a1e87bc14",
    tags: ["Generative AI", "Roadmap", "AI", "NLP"],
    image: process.env.PUBLIC_URL + "/blogs/generative_ai.jpeg"
  },
  {
    title: "Transforming Software Development with AI: Top Applications You Need to Know — Part 1",
    description: "Explore how AI is transforming the landscape of software development with key applications and examples.",
    link: "https://technotronic.medium.com/transforming-software-development-with-ai-top-applications-you-need-to-know-part-1-e9933e514d88",
    tags: ["AI", "Software Engineering", "Machine Learning"],
    image: process.env.PUBLIC_URL + "/blogs/ai_software.jpeg"
  },
  {
    title: "JavaScript — Behind the Scenes",
    description: "Demystifying the components of JavaScript runtime and how it works under the hood.",
    link: "https://medium.com/dsc-sastra-deemed-to-be-university/javascript-behind-the-scenes-f693c5401c47",
    tags: ["JavaScript", "Web Development", "Front End"],
    image: process.env.PUBLIC_URL + "/blogs/javascript.png"
  },
  {
    title: "CSS Positioning: A walkthrough",
    description: "A deep dive into how CSS positioning works with real-world navbar examples.",
    link: "https://medium.com/weekly-webtips/css-positioning-a-walkthrough-20b8f762b6e5",
    tags: ["CSS", "Positioning", "Frontend"],
    image: process.env.PUBLIC_URL + "/blogs/css_positioning.png"
  },
  {
    title: "Playing through CSS Flexbox",
    description: "The ultimate beginner guide to mastering layout with Flexbox in CSS.",
    link: "https://technotronic.medium.com/playing-through-css-flexbox-718b3d91f605",
    tags: ["CSS", "Flexbox", "Responsive Design"],
    image: process.env.PUBLIC_URL + "/blogs/flexbox.png"
  }
];

export default function BlogSection() {
  const [showAll, setShowAll] = useState(false);
  const displayedBlogs = showAll ? blogs : blogs.slice(0, 3);

  return (
    <section className="py-5 bg-light" id="blogs">
      <div className="container">
        <h2 className="text-center fw-bold mb-4">Blog Highlights</h2>
        <p className="text-center mb-5 text-muted fs-6">
          Some of my recent writing on AI, software development, and front-end technologies.
        </p>
        <div className="row g-4">
          {displayedBlogs.map((blog, index) => (
            <div className="col-md-6 col-lg-4" key={index}>
              <div className="card h-100 shadow-sm border-0 blog-card">
                <img
                  src={blog.image}
                  className="card-img-top"
                  alt={blog.title}
                  style={{ height: "180px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title d-flex align-items-center gap-2">
                    <FaMedium className="text-dark" />
                    <a
                      href={blog.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-decoration-none text-dark"
                    >
                      {blog.title}
                    </a>
                  </h5>
                  <p className="card-text small mb-2">{blog.description}</p>
                  <div className="mb-3 d-flex flex-wrap gap-2">
                    {blog.tags.map((tag, i) => (
                      <span key={i} className="badge bg-dark-subtle border text-dark">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-auto">
                    <a
                      href={blog.link}
                      className="btn btn-primary btn-sm"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Read More <FaExternalLinkAlt className="ms-1" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Toggle Button */}
        <div className="text-center mt-4">
          <button
            className="btn btn-outline-primary btn-sm"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "Show Less" : "See More Blogs"}
          </button>
        </div>
      </div>

      <style>{`
        .blog-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border-radius: 8px;
        }
        .blog-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
        }
      `}</style>
    </section>
  );
}
