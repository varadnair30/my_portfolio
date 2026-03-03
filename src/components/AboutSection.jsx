import React from "react";
import { about } from "../portfolio/knowledgeBase";

export default function AboutSection() {
  return (
    <section className="py-5 bg-white" id="about">
      <div className="container">
        <h2 className="text-center fw-bold mb-4">About Me</h2>
        <p className="lead text-muted text-center mb-4">
          {about.lead}
        </p>
        {about.paragraphs.map((p, idx) => (
          <p key={idx}>{p}</p>
        ))}
      </div>
    </section>
  );
}
