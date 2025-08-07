import React from "react";
import {
  SiPython, SiJavascript, SiTypescript, SiReact, SiRedux, SiNodedotjs, SiFlask,
  SiMongodb, SiPostgresql, SiDocker, SiGit, SiCplusplus, SiMysql,
  SiFastapi, SiTensorflow, SiJirasoftware, SiPostman, SiJsonwebtokens,
  SiTestinglibrary, SiNextdotjs, SiExpress, SiDjango, SiHtml5, SiCss3,
  SiSpringboot,
  SiOracle,
  SiAmazondynamodb,
  SiKubernetes
} from "react-icons/si";

const groupedSkills = [
  {
    title: "Frontend & Web",
    skills: [
      { name: "React.js", icon: <SiReact /> },
      { name: "Next.js", icon: <SiNextdotjs /> },
      { name: "Redux", icon: <SiRedux /> },
      { name: "JavaScript", icon: <SiJavascript /> },
      { name: "TypeScript", icon: <SiTypescript /> },
      { name: "HTML5", icon: <SiHtml5 /> },
      { name: "CSS3", icon: <SiCss3 /> },
    ],
  },
  {
    title: "Backend & API",
    skills: [
      { name: "Spring Boot", icon: <SiSpringboot /> },
      { name: "Node.js", icon: <SiNodedotjs /> },
      { name: "Express.js", icon: <SiExpress /> },
      { name: "Flask", icon: <SiFlask /> },
      { name: "FastAPI", icon: <SiFastapi /> },
      { name: "Django", icon: <SiDjango /> },
      { name: "REST APIs", icon: "text" },
    ],
  },
  {
    title: "Languages",
    skills: [
      { name: "Python", icon: <SiPython /> },
      { name: "Java", icon: "text" },
      { name: "C", icon: "text" },
      { name: "C#", icon: "text" },
      { name: "C++", icon: <SiCplusplus /> },
      { name: "SQL", icon: "text" },
    ],
  },
  {
    title: "Databases",
    skills: [
      { name: "DynamoDB", icon: <SiAmazondynamodb /> },
      { name: "Oracle DB", icon: <SiOracle /> },
      { name: "PostgreSQL", icon: <SiPostgresql /> },
      { name: "MongoDB", icon: <SiMongodb /> },
      { name: "NoSQL", icon: "text" },
      { name: "MySQL", icon: <SiMysql /> },
    ],
  },
  {
    title: "Cloud & DevOps",
    skills: [
      {
        name: "Azure",
        icon: (
          <img
            src={process.env.PUBLIC_URL + "/azure.png"}
            alt="Azure"
            style={{ width: "32px", height: "32px", objectFit: "contain" }}
          />
        ),
      },
      {
        name: "Azure DevOps",
        icon: (
          <img
            src={process.env.PUBLIC_URL + "/azure.png"}
            alt="Azure DevOps"
            style={{ width: "32px", height: "32px", objectFit: "contain" }}
          />
        ),
      },
      { name: "Docker", icon: <SiDocker /> },
      { name: "Kubernetes", icon: <SiKubernetes /> },
      { name: "CI/CD", icon: "text" },
      { name: "Git", icon: <SiGit /> },
    ],
  },
  {
    title: "AI / Machine Learning",
    skills: [
      { name: "TensorFlow", icon: <SiTensorflow /> },
      { name: "NLP", icon: "text" },
      { name: "LLMs", icon: "text" },
      { name: "Data Analytics", icon: "text" },
    ],
  },
  {
    title: "Testing & Tools",
    skills: [
      { name: "JWT", icon: <SiJsonwebtokens /> },
      { name: "TDD", icon: <SiTestinglibrary /> },
      { name: "Postman", icon: <SiPostman /> },
      { name: "Jira", icon: <SiJirasoftware /> },
      { name: "CLI", icon: "text" },
      { name: "Linux", icon: "text" },
      // { name: "Debugger", icon: "text" },
    ],
  },
];

export default function SkillsSection() {
  return (
    <section className="py-5 bg-light" id="skills">
      <div className="container">
        <h2 className="text-center fw-bold mb-4">Technical Skills</h2>
        <p className="text-center mb-5 fs-6">
          Tools and technologies I’ve used across full-stack development, cloud infrastructure, and AI workflows
        </p>

        <div className="row g-4">
          {groupedSkills.map((group, i) => (
            <div key={i} className="col-12 col-md-6 col-lg-4">
              <div className="p-4 border rounded shadow-sm bg-white h-100">
                <h6 className="fw-semibold text-primary mb-3">{group.title}</h6>
                <div className="d-flex flex-wrap gap-4">
                  {group.skills.map((skill, j) => (
                    <div
                      key={j}
                      className="text-center skill-icon"
                      style={{ width: "80px", cursor: "default" }}
                    >
                      <div className="mb-1">
                        {skill.icon === "text" ? (
                          <div
                            className="rounded-circle bg-secondary text-white d-flex justify-content-center align-items-center mx-auto"
                            style={{ width: "32px", height: "32px", fontSize: "12px" }}
                          >
                            {skill.name[0]}
                          </div>
                        ) : typeof skill.icon === "string" ? (
                          <img
                            src={skill.icon}
                            alt={skill.name}
                            style={{ width: "32px", height: "32px", objectFit: "contain" }}
                          />
                        ) : (
                          React.cloneElement(skill.icon, { size: 32 })
                        )}
                      </div>
                      <small className="fw-medium">{skill.name}</small>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .skill-icon {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .skill-icon:hover {
          transform: translateY(-4px) scale(1.05);
          box-shadow: 0 0 12px rgba(0, 123, 255, 0.2);
          background-color: #f8f9fa;
          border-radius: 8px;
        }
      `}</style>
    </section>
  );
}
