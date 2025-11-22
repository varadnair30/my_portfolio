import React from "react";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import HighlightSection from "./components/HighlightSection";
import SkillsSection from "./components/SkillsSection";
import ExperienceSection from "./components/ExperienceSection";
import ProjectsSection from "./components/ProjectsSection";
import TestimonialsSection from "./components/TestimonialsSection";
import CertificationsSection from "./components/CertificationsSection";
import ContactSection from "./components/ContactSection";
import SideNav from "./components/SideNav";
import LeadershipSection from './components/LeadershipSection';


export default function App() {
  return (
    <>
      <SideNav />
      <main>
        <HeroSection />
        <AboutSection />
        <HighlightSection />
        <LeadershipSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <TestimonialsSection />
        <CertificationsSection />
        <ContactSection />
        
      </main>
    </>
  );
}
