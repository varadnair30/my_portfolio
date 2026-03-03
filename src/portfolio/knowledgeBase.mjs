// Single source for portfolio data. ESM for Node (rag:build); CRA resolves .mjs for the app.
// process.env.PUBLIC_URL is replaced at build time by CRA so images work on GitHub Pages (homepage subpath).
export const portfolioOwner = {
  name: "Varad Nair",
  email: "vnairusa30@gmail.com",
  links: {
    github: "https://github.com/varadnair30",
    linkedin: "https://linkedin.com/in/nvarad",
    leetcode: "https://leetcode.com/u/vnvarad_30/",
    resume:
      "https://drive.google.com/file/d/1B3PuUgo_4a-mY19BmWLu7sAnretus1Z6/view",
  },
};

export const about = {
  lead:
    "Software Engineer with 4+ years of experience building scalable backend systems and full-stack applications, specializing in AI integrations, cloud-native infrastructure, and DevOps automation. Proven collaborator known for delivering high-impact, user-centric software products with strong technical depth and a passion for optimization.",
  paragraphs: [
    "I'm Varad Nair, recently completed my Masters in Computer Science at the University of Texas, Arlington on May 2025. I have experience working across both frontend and backend systems, and I focus on building solutions that are both efficient and impactful.",
    "At Mavenir Systems, I pioneered backend network infrastructure and monitoring solutions using Python and Kubernetes, streamlining processes and improving scalability. I collaborated with 5+ cross-functional teams to optimize cloud infrastructure, enhance CI/CD workflows, and automate operational tasks using Bash scripting, leading to a 40% reduction in manual errors and deployment times.",
    "During my time at Tata Consultancy Services, I spearheaded data-driven projects analyzing terabytes of business data using Python, SQL, and Azure DevOps to identify process inefficiencies. I developed backend services for customer-facing applications, optimized data warehousing processes by 50%, and resolved over 30 production issues while working in agile teams, ensuring high-quality software delivery.",
    "I enjoy solving practical problems with AI and automation. Notable projects include Smart Spend, an AI-powered finance manager with predictive analytics built using Django and React, and Secure Phone Book, a role-based API platform ensuring secure access to sensitive contact information. I've also developed machine learning pipelines using TensorFlow and PyTorch for sentiment analysis tasks.",
    "Outside of work, I'm passionate about continuous learning, DevOps practices, and breaking down complex systems into simple, maintainable components that drive impactful solutions. When I'm not coding, you'll probably find me at table tennis clubs, unwinding at cafés, or gaming my way through the evenings.",
  ],
};

export const projects = [
  {
    title: "ReachCraft: AI-powered job application automation",
    description:
      "Free tool to generate cover emails and FREE alternative for (Hunter.io, Apollo.io,etc.) to get unlimited emails for cold emailing. Job seekers send 200+ applications before landing an offer, with cold applications having only a 0.1-2% success rate. The challenge? Personalizing hundreds of cold emails is impossible while job search stress.",
    tech: ["Python", "FastAPI", "Supabase", "GitHub", "Render", "REST API"],
    image: (process.env.PUBLIC_URL || "") + "/projects/ReachCraft.png",
    github: "https://github.com/varadnair30/ReachCraft",
    demo: "https://reachcraft-frontend.onrender.com/",
  },
  {
    title: "Sandboxing: API Executor with NsJail",
    description:
      "Built a secure Python code execution API with NsJail isolation on Google Cloud Run. Solved Cloud Run compatibility challenges by implementing read-only bind mounts for filesystem isolation, achieving production-ready sandboxing without elevated privileges.",
    tech: [
      "Python",
      "Flask",
      "NsJail",
      "Docker",
      "Google Cloud Run",
      "REST API",
      "Security",
    ],
    image: (process.env.PUBLIC_URL || "") + "/projects/sandboxing.png",
    github: "https://github.com/varadnair30/python-executor",
    demo: "https://python-executor-wddqxxteba-uc.a.run.app",
  },
  {
    title: "Smart Spend – AI-Powered Finance Manager",
    description:
      "Built a scalable full-stack finance app with Django REST, React, Docker, OCR receipt scanning, and predictive analytics (85% accuracy).",
    tech: ["Django REST Framework", "React", "Docker", "OCR", "PostgreSQL", "CI/CD"],
    image: (process.env.PUBLIC_URL || "") + "/projects/smart-spend.jpeg",
    github: "https://github.com/varadnair30/SmartSpend-AI-Expensetracker",
    demo: "",
  },
  {
    title: "Hotel Guest Prediction",
    description:
      "Developed an ML pipeline using XGBoost achieving 91.4% accuracy in predicting hotel guest cancellations to improve booking retention insights.",
    tech: ["Python", "XGBoost", "Machine Learning", "Data Science"],
    image: (process.env.PUBLIC_URL || "") + "/projects/hotel-guest-prediction.png",
    github: "https://github.com/varadnair30/Hotel_Guest_Prediction",
    demo: "",
  },
  {
    title: "Secure Phone Book API",
    description:
      "Developed a secure Phone Book REST API with FastAPI & Flask implementations featuring input validation, authentication, authorization, and logging.",
    tech: ["Python", "FastAPI", "Flask", "Docker", "REST API", "Authentication"],
    image: (process.env.PUBLIC_URL || "") + "/projects/P1.jpg",
    github: "https://github.com/varadnair30/secure-phonebook-api",
    demo: "",
  },
  {
    title: "Twitter Sentiment Analysis with CNN and BERT",
    description:
      "Applied TensorFlow and PyTorch to build NLP models using CNN & BERT architectures, achieving 80%+ accuracy for real-time sentiment analysis.",
    tech: [
      "Python",
      "TensorFlow",
      "PyTorch",
      "NLP",
      "CNN",
      "BERT",
      "Deep Learning",
    ],
    image: (process.env.PUBLIC_URL || "") + "/projects/P2.PNG",
    github:
      "https://github.com/varadnair30/Twitter-Sentiment-Analysis-with-CNN-and-BERT-using-Deep-Learning",
    demo: "",
  },
  {
    title: "Cloud Based College Notes and Assignment Sharing System",
    description:
      "Built a web platform for notes and assignments sharing, increasing resource accessibility by 60%, using Django backend and PostgreSQL with HTML5 and CSS frontend.",
    tech: ["Django", "Python", "PostgreSQL", "HTML5", "CSS", "JavaScript"],
    image:
      (process.env.PUBLIC_URL || "") +
      "/projects/team-young-college-students-working-600nw-2111421299.webp",
    github:
      "https://github.com/varadnair30/Notes-Assignment-Sharing-System-using-Django-and-PostgreSQL",
    demo: "",
  },
  {
    title: "TF-IDF Based Toy Search Engine",
    description:
      "Designed a search engine prototype processing multiple documents with 90% precision using TF-IDF vectorization and NLP techniques including tokenization and stemming.",
    tech: ["Python", "Jupyter", "NLP", "TF-IDF", "Tokenization", "Stemming"],
    image: (process.env.PUBLIC_URL || "") + "/projects/tf idf.webp",
    github:
      "https://github.com/varadnair30/TF-IDF-Based-Toy-Search-Engine-Implementation",
    demo: "",
  },
  {
    title: "Book Barter Mobile App",
    description:
      "Engineered a full-stack Android app using Java and Firebase Cloud Firestore for book enthusiasts to find, exchange, and explore books easily.",
    tech: ["Java", "Firebase", "Android Studio", "OOP", "UML"],
    image: (process.env.PUBLIC_URL || "") + "/projects/book barter.PNG",
    github: "https://github.com/varadnair30/Book-Barter-Android-App",
    demo: "",
  },
  {
    title: "Servigo - Full Stack Service Booking Platform",
    description:
      "Developed a full-stack platform using Angular, Spring Boot, and MySQL with Spring Security and JWT authentication for secure and scalable service bookings.",
    tech: ["Java", "Spring Boot", "Angular", "MySQL", "JWT", "Maven"],
    image: (process.env.PUBLIC_URL || "") + "/projects/servigo.webp",
    github: "https://github.com/varadnair30/Servigo",
    demo: "",
  },
  {
    title: "Multi-Threaded RPC File and Computational Server",
    description:
      "Created a multi-threaded file and computation server with synchronous and asynchronous RPC using Python libraries like xmlrpc, rpyc, and filecmp.",
    tech: ["Python", "RPC", "Multi-threading", "xmlrpc", "rpyc"],
    image: (process.env.PUBLIC_URL || "") + "/projects/RPC.jpg",
    github:
      "https://github.com/varadnair30/Multi-Threaded-RPC-File-and-Computational-Server-Development",
    demo: "",
  },
  {
    title: "2 Phase Commit Protocol",
    description:
      "Implemented a distributed transaction concurrency control protocol improving fault tolerance and reducing overhead using Python socket programming and RPC.",
    tech: ["Python", "Socket Programming", "RPC", "Distributed Systems", "Timeout Mechanism"],
    image: (process.env.PUBLIC_URL || "") + "/projects/2pc.png",
    github: "https://github.com/varadnair30/2-Phase-Commit",
    demo: "",
  },
  {
    title: "AccessVault - Role Based Security Management",
    description:
      "Designed a relational database system for managing discretionary access control, focusing on EER schema design, SQL implementation, and transaction management.",
    tech: ["Python", "MySQL", "Oracle", "EER", "Transaction Management"],
    image: (process.env.PUBLIC_URL || "") + "/projects/accessvault.webp",
    github: "https://github.com/varadnair30/AccessVault",
    demo: "",
  },
  {
    title: "kNN Algorithm Comparative Analysis",
    description:
      "Performed comparative analysis of k-Nearest Neighbors on UCI datasets, optimizing distance metrics and improving runtime by 20%.",
    tech: ["Python", "kNN", "Data Analysis", "Matplotlib"],
    image: (process.env.PUBLIC_URL || "") + "/projects/knn-comparative.png",
    github: "https://github.com/varadnair30/kNN-Algorithm-Comparative-Analysis-Across-Datasets",
    demo: "",
  },
];

export const experiences = [
  {
    title: "Research Software Engineer",
    company:
      "Sustainable and Efficient Allocation of Resources Lab (SEAR), University of Texas at Arlington",
    logo: "/companies/uta.png",
    duration: "Jan 2025 – Present",
    location: "Arlington, TX",
    bullets: [
      "Built production-ready RAG AI assistant reducing hallucinations by 40%, using BM25 + FAISS hybrid retrieval",
      "Engineered real-time AI panel transcription system with multi-speaker diarization processing live audio via WebSocket → Whisper STT → Phi → Stable Diffusion for automated visual generation within 1-2 seconds",
      "Designed FastAPI microservices coordinating speech-to-text (AssemblyAI), LLM summarization (Ollama), and text-to-image pipelines (SD, Pollinations.ai), enabling seamless multi-modal AI workflows",
      "Transitioned from cloud APIs to offline architecture with Ollama + Gemma 2B for low-latency and privacy-focused applications",
      "Automated CI/CD workflows with GitHub Actions, ensuring reliable deployments on AWS and Docker containerization for scalable infrastructure",
    ],
    tech: [
      "Python",
      "RAG",
      "LangChain",
      "FAISS",
      "Whisper",
      "Stable Diffusion",
      "Ollama",
      "Gemma 2B",
      "BM25",
      "AWS",
      "FastAPI",
      "Docker",
      "AssemblyAI",
      "WebSocket",
      "Streamlit",
      "Pandas",
    ],
  },
  {
    title: "Software Engineer Intern",
    company: "Mavenir Systems",
    logo: "/companies/mavenir.png",
    duration: "May 2024 – Aug 2024",
    location: "Richardson, TX",
    bullets: [
      "Pioneered backend network infrastructure and monitoring solutions using Python and Kubernetes, improving scalability and streamlining processes.",
      "Collaborated with 5+ cross-functional teams to optimize infrastructure, develop features, and integrate innovative services in a fast-paced environment.",
      "Contributed to a CI/CD environment by pushing code updates, conducting thorough testing, and debugging to ensure reliability, reducing downtime by 20%.",
      "Automated 2 key operational workflows using Bash scripting on Unix/Linux systems, reducing manual errors by 40%.",
    ],
    tech: ["Python", "Kubernetes", "Bash", "CI/CD", "Unix/Linux", "Automation"],
  },
  {
    title: "Software Engineer",
    company: "Tata Consultancy Services",
    logo: "/companies/tcs.webp",
    duration: "Aug 2021 – Jun 2023",
    location: "Pune, India",
    bullets: [
      "Spearheaded data-driven projects using Azure DevOps, Python, and SQL, executing large-scale analysis on 2-3 TB datasets in COSMOS to identify process inefficiencies.",
      "Developed backend services for customer-facing applications ensuring seamless integration with frontend systems.",
      "Optimized data warehousing processes by 50% through campaign analysis using Adobe Analytics, Python, SQL, and Power BI.",
      "Diagnosed and resolved over 30 production issues within tight deadlines, collaborating closely with QA, IT, and Operations teams to enhance system performance.",
    ],
    tech: ["Python", "NoSQL", "Azure DevOps", "Adobe Analytics", "Power BI", "COSMOS DB"],
  },
  {
    title: "Freelance Full-Stack Developer",
    company: "Self-Employed / Remote",
    logo: "/companies/freelancer.jpeg",
    duration: "Jul 2020 – Dec 2022",
    location: "Remote",
    bullets: [
      "Delivered 10+ full-stack web applications using Django REST, Spring Boot, React, Angular, and PostgreSQL, improving client operational efficiency by 40–60%",
      "Built data-driven dashboards and analytics tools with Python, Pandas, Flask/Django, providing actionable insights to 200+ end-users",
      "Deployed applications to AWS cloud using Docker and CI/CD pipelines, reducing deployment time by 50% and server downtime by 30%",
      "Delivered 15+ secure REST APIs with authentication and access control, preventing potential data breaches and enhancing system reliability",
    ],
    tech: [
      "Django REST",
      "Spring Boot",
      "React",
      "Angular",
      "PostgreSQL",
      "Python",
      "Flask",
      "Pandas",
      "Docker",
      "AWS",
      "CI/CD",
      "APIs",
      "Authentication",
    ],
  },
];

export const skillCategories = [
  {
    category: "Frontend & Web",
    skills: [
      { name: "React.js", level: 90 },
      { name: "Next.js", level: 85 },
      { name: "Redux", level: 80 },
      { name: "HTML5", level: 95 },
      { name: "CSS3", level: 90 },
      { name: "TypeScript", level: 85 },
    ],
  },
  {
    category: "Backend & API",
    skills: [
      { name: "Spring Boot", level: 90 },
      { name: "Node.js", level: 85 },
      { name: "Express.js", level: 85 },
      { name: "Django", level: 88 },
      { name: "FastAPI", level: 87 },
      { name: "REST APIs", level: 92 },
    ],
  },
  {
    category: "Languages",
    skills: [
      { name: "Python", level: 92 },
      { name: "Java", level: 88 },
      { name: "C", level: 82 },
      { name: "JavaScript", level: 90 },
      { name: "SQL", level: 90 },
      { name: "C#", level: 85 },
    ],
  },
  {
    category: "Databases",
    skills: [
      { name: "PostgreSQL", level: 90 },
      { name: "MySQL", level: 88 },
      { name: "MongoDB", level: 85 },
      { name: "Firebase", level: 82 },
      { name: "Neo4j", level: 80 },
    ],
  },
  {
    category: "Cloud & DevOps",
    skills: [
      { name: "AWS", level: 85 },
      { name: "Docker", level: 88 },
      { name: "Kubernetes", level: 82 },
      { name: "CI/CD", level: 87 },
      { name: "Azure", level: 80 },
      { name: "GCP", level: 76 },
      { name: "Git", level: 92 },
    ],
  },
  {
    category: "AI / Machine Learning",
    skills: [
      { name: "TensorFlow", level: 85 },
      { name: "PyTorch", level: 85 },
      { name: "scikit-learn", level: 88 },
      { name: "NLP", level: 80 },
      { name: "Data Analysis", level: 87 },
      { name: "Pandas", level: 90 },
    ],
  },
];

export const leadership = {
  achievements: [
    {
      title: "Featured Campus Ambassador",
      organization: "United Group of Institutions",
      description:
        "Selected as the face of first-year student experience at United Group of Institutions, representing 3,000+ students. Led orientation initiatives and served as a bridge between administration and incoming students.",
      image: (process.env.PUBLIC_URL || "") + "/leadership/MyUGIposter.jpeg",
      tags: ["Leadership", "Student Advocacy", "Public Relations"],
      impact: "Represented institution across 5+ promotional campaigns",
      imagePosition: "left center",
    },
    {
      title: "Technical Speaker & Presenter",
      organization: "TEDx-Style Tech Events",
      description:
        "Delivered technical presentations on emerging technologies and software engineering best practices to audiences of 200+ students and faculty. Specialized in making complex AI/ML and cloud architecture topics accessible.",
      image: (process.env.PUBLIC_URL || "") + "/leadership/MyStage.JPG",
      tags: ["Public Speaking", "Technical Communication", "Mentorship"],
      impact: "Conducted 10+ technical talks reaching 500+ students",
      imagePosition: "center center",
    },
  ],
  competencies: [
    { icon: "🎤", name: "Public Speaking" },
    { icon: "👥", name: "Team Leadership" },
    { icon: "📢", name: "Technical Communication" },
    { icon: "🎯", name: "Student Advocacy" },
  ],
};

export const certifications = [
  {
    name: "Microsoft Certified: Bing Ads Fundamentals",
    issuer: "Microsoft",
    badge: (process.env.PUBLIC_URL || "") + "/certs/microsoft.png",
    link: "https://drive.google.com/file/d/1LikUf4tcicgIpy86kEd2bI1x8gXp-WAP/view?usp=sharing",
  },
  {
    name: "Kubernetes for Developers: Core Concepts",
    issuer: "Linkedin Learning",
    badge: (process.env.PUBLIC_URL || "") + "/certs/kubernetes.png",
    link: "https://www.linkedin.com/learning/certificates/85bd9fed3f3f77e21cd57b8c61b68c78c8c6388c36eee0eb23170110c5bb2e24",
  },
  {
    name: "Software Engineer Certification",
    issuer: "HackerRank",
    badge: (process.env.PUBLIC_URL || "") + "/certs/hackerrank.jpg",
    link: "https://www.hackerrank.com/certificates/386367939bae",
  },
];

export const testimonials = [
  {
    name: "Amit Kumar Singhai",
    title: "Senior Associate Consultant",
    linkedIn: "https://www.linkedin.com/in/amit-kumar-singhai/",
    image: (process.env.PUBLIC_URL || "") + "/testimonials/amit-singhai.jpeg",
    text: "I had the pleasure of working with Varad at Tata Consultancy Services, where he consistently demonstrated strong problem-solving abilities and a collaborative spirit. In his role, Varad handled complex data-driven deliverables with precision, using his analytical thinking to identify and address inefficiencies, which led to measurable operational improvements. His critical thinking was especially evident when resolving high-priority production issues, where he worked seamlessly with cross-functional teams to ensure optimal system performance. Varad's commitment to delivering quality solutions and his proactive approach made him a reliable and highly valued team player. I'm confident he'll continue to excel in any future endeavor",
    color: "hsl(124, 70%, 85%)",
  },
  {
    name: "Ashwinkumar S Padale",
    title: "Senior Systems Integration Engineer",
    linkedIn: "https://www.linkedin.com/in/ashwwin24/",
    image: (process.env.PUBLIC_URL || "") + "/testimonials/ashwin.jpeg",
    text: "I had the pleasure of working closely with Varad during his Summer 2024 internship at Mavenir. As his senior colleague, I was consistently impressed by his proactive approach, technical aptitude, and ability to collaborate effectively with cross-functional teams. Varad played a key role in optimizing our infrastructure, significantly improving performance and reducing manual errors through automation. His contributions to our CI/CD environment and back-end development were invaluable, and his dedication to ensuring scalability and reliability made a noticeable impact on our projects. I highly recommend Varad for any role that requires strong problem-solving skills and a solid technical foundation.",
    color: "hsla(184, 71%, 85%, 1.00)",
  },
  {
    name: "Owen Turnbull",
    title: "Technical Project/Program Manager",
    linkedIn: "https://www.linkedin.com/in/owen-turnbull/",
    image: (process.env.PUBLIC_URL || "") + "/testimonials/owen.jpeg",
    text: "For anyone seeking a dedicated and highly capable Engineer, Varad is the person you need. During our time working together at Mavenir, I was consistently impressed by his professionalism, clarity of thought, and methodical problem-solving abilities. One particular instance that stands out was when Varad assisted me in troubleshooting a complex Python-based automation script. His structured approach to debugging, combined with his ability to break down the problem and communicate solutions clearly, showcased his strong technical foundation and maturity beyond his experience level.\n\nVarad's passion for engineering and his proactive attitude make him a standout team player. He doesn't just solve problems — he ensures long-term solutions by understanding the root cause and improving processes wherever possible. I have no doubt that Varad will excel in his future endeavors and grow into a top-tier engineer in any organization he joins",
    color: "hsla(67, 71%, 85%, 1.00)",
  },
];

export const highlights = {
  aitInternship: {
    title: "🌏 AIT Summer Research Internship, Thailand (2019)",
    subtitle:
      "Selected as 1 of 72 out of 3,000 students for an international education camp at Asian Institute of Technology.",
    description:
      "The experience offered invaluable exposure to global perspectives in technology, collaborative research, and personal growth.",
    images: [
      { src: "/images/SafariWorld.jpg", caption: "Safari World outing" },
      { src: "/images/YogaDay.jpg", caption: "Outdoor yoga with group" },
      { src: "/images/AITgroup.jpg", caption: "Group award ceremony" },
      { src: "/images/SCIPark.jpg", caption: "Thailand Scientific Park" },
      { src: "/images/AITnight.jpg", caption: "AIT Entrance" },
      { src: "/images/AITCampus.jpg", caption: "Beautiful AIT campus views" },
      { src: "/images/WorldLeaders.jpg", caption: "AIT Faculty & Leaders" },
    ],
  },
};
