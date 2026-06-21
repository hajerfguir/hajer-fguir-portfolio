"use client"

import React, { createContext, useContext, useEffect, useState } from "react"

type Locale = "en" | "fr"

interface LanguageContextValue {
  locale: Locale
  setLocale: (l: Locale) => void
  t: (key: string) => any
}

const translations: Record<Locale, any> = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      experience: "Experience",
      projects: "Projects",
      skills: "Skills",
      education: "Education",
      contact: "Contact",
    },
    hero: {
      name: "Hajer Fguir",
      role: "Software Developer",
      description:
        "Building secure, scalable, and impactful technology. Passionate about creating reliable software solutions and exploring how cybersecurity, AI, and automation can improve the way systems are built and protected.",
      cta: {
        viewProjects: "View Projects",
        contact: "Contact Me",
        github: "GitHub",
      },
      scroll: "Scroll",
    },
    cta: {
      contact: "Contact Me",
    },
    footer: {
      quickLinks: "Quick Links",
      connect: "Connect",
      builtWith: "Built with",
      using: "using Next.js & Tailwind CSS",
      rights: "All rights reserved.",
      email: "hajerfguir@gmail.com",
    },
    brand: {
      title: "HF",
      description:
        "Software Developer passionate about building secure, scalable, and impactful technology solutions.",
    },
    about: {
      label: "About Me",
      title: "Where secure engineering meets purposeful innovation",
      subtitle: "",
      bio1:
        "Welcome to my digital space. I'm Hajer Fguir, a Computer Engineering graduate and Software Developer at the University of Ottawa. I'm passionate about building technology that is not only functional, but secure, thoughtful, and meaningful.",
      bio2:
        "My journey has taken me through government, private industry, university IT, entrepreneurship, and teaching. Along the way, I've learned to embrace complexity, ask better questions, and turn ideas into solutions that create real value.",
      stats: {
        years: "Years Experience",
        projects: "Projects",
        orgs: "Organizations",
      },
      highlights: {
        cybersecurity: "Cybersecurity",
        software: "Software Development",
        devops: "DevOps & Automation",
        ai: "AI & Machine Learning",
      },
    },
    experience: {
      label: "Experience",
      title: "My professional journey",
      subtitle: "Building expertise through diverse roles and impactful projects",
      items: {
        uottawa_it: {
          role: "Software Developer",
          type: "Full-time",
          period: "Jan 2026 – Present",
          location: "Ottawa, ON, Canada",
          description: [
            "Implementing functional, regression, load, end-to-end and security tests for university platforms including uoZone and Experiential Learning",
            "Developing authentication and security test scenarios for SAML2/SSO flows, including session handling, token validation and high-load authentication scenarios",
            "Supporting SSDLC initiatives by improving secure testing practices, validating security requirements and contributing to QA documentation",
            "Collaborating with developers, QA analysts and stakeholders to resolve issues, validate system behaviour and improve application reliability",
          ],
        },
        uottawa: {
          role: "IT Systems Developer",
          type: "Intern",
          period: "May 2025 – Dec 2025",
          location: "Ottawa, ON, Canada",
          description: [
            "Executing load tests and API validation for the Experiential Learning platform",
            "Developing automation scripts and JSON output validations to support data integrity and reliable backend integrations",
            "Building and maintaining RESTful APIs using JavaScript, Node.js, Docker, Redis and CI/CD workflows",
            "Performing end-to-end validations and performance testing to support high-volume user traffic and ensure system reliability",
          ],
        },
        uottawa_faculty: {
          role: "Teaching Assistant",
          type: "Part-time",
          period: "Jan 2025 – Dec 2025",
          location: "Ottawa, ON, Canada",
          description: [
            "Supporting undergraduate students in ITI1520 and SEG2911 through labs, feedback and academic mentoring",
            "Grading assignments and providing detailed feedback to help students improve technical and problem-solving skills",
            "Running lab sessions and offering one-on-one programming support in Python, software engineering concepts and foundational computing topics",
            "Strengthening communication, mentorship and leadership skills while working with diverse student backgrounds",
          ],
        },
        novasoft: {
          role: "Co-founder & Software Developer",
          type: "Entrepreneurship",
          period: "Dec 2024 – Dec 2025",
          location: "Laval, QC, Canada",
          description: [
            "Co-founded a tech startup focused on building software solutions and exploring digital product ideas",
            "Developed secure data processing and validation tools in Python and AVL Concerto",
            "Defined technical requirements and contributed to full-stack development applying secure coding practices",
            "Worked across product and technical responsibilities, improving autonomy, adaptability and problem-solving",
          ],
        },
        dana_tm4: {
          role: "V&V Project Management Intern",
          type: "Intern",
          period: "Sep 2024 – Dec 2024",
          location: "Boucherville, QC, Canada",
          description: [
            "Supported verification and validation activities by contributing to internal tools, automation workflows and data-focused reports",
            "Built Python solutions to support verification processes and improve access to test-related information",
            "Created internal web tools in JavaScript to standardize database outputs and improve technical visibility",
            "Contributed to secure data flows and authentication integrations including SAML2 SSO with Microsoft Azure AD",
          ],
        },
        canada_post: {
          role: "Performance Data Analyst Intern",
          type: "Intern",
          period: "Jan 2024 – Apr 2024",
          location: "Ottawa, ON, Canada",
          description: [
            "Built automation scripts in Python and data analysis workflows to support operational performance monitoring",
            "Worked with Power BI and internal databases to transform technical and operational data into useful insights",
            "Supported KPI analysis, reporting improvements and data-driven decision making in an enterprise environment",
            "Gained experience collaborating with business stakeholders, technical systems and large-scale data",
          ],
        },
      },
    },
    projects: {
      label: "Projects",
      title: "Featured work",
      subtitle:
        "A selection of projects showcasing my work across AI, embedded systems, cybersecurity, software development, and automation.",
      previous: "Previous projects",
      next: "Next projects",
      featured: "Featured",
      code: "Code",
      explore: "Explore",
      viewAll: "View All Projects on GitHub",
      items: {
        drivesense: {
          title: "DriveSense™",
          subtitle: "Capstone Project · LockedIn LTD",
          description:
            "An intelligent driver alert system designed to monitor driver attentiveness in real time using sensors, computer vision, and machine-learning-based detection.",
          highlights: [
            "Detects signs of drowsiness, fatigue, or distress",
            "Provides real-time driver alerts for unsafe behavior",
            "Logs events to a cloud platform to support road safety",
          ],
        },
        smart_home: {
          title: "Smart Home Automation System",
          subtitle: "Embedded Systems Project",
          description:
            "A real-time smart home automation system that enables touchless control of lights, fans, and temperature using hand gestures and a locally hosted web interface.",
          highlights: [
            "Gesture-based control using APDS-9960 sensor",
            "Real-time sensor processing with ESP32 and FreeRTOS",
            "Local web interface for remote monitoring and control",
          ],
        },
        nutricoach: {
          title: "AI-Powered NutriCoach Chatbot",
          subtitle: "AI Chatbot Project",
          description:
            "An AI-powered chatbot that provides personalized nutrition guidance based on user goals and input through an interactive Gradio interface.",
          highlights: [
            "Personalized nutrition recommendations based on user input",
            "User-friendly interface hosted on Hugging Face Spaces",
            "Voice interaction support using gTTS",
          ],
        },
        portfolio: {
          title: "Personal Portfolio Website",
          subtitle: "Frontend Portfolio Project",
          description:
            "A modern personal portfolio website designed to showcase my background, experience, projects, skills, and professional journey in a clean and interactive way.",
          highlights: [
            "Built with a responsive and professional user interface",
            "Includes interactive project navigation and smooth animations",
            "Prepared for future deployment with a custom domain",
          ],
        },
        mglam: {
          title: "M.Glam Beauty Salon Website",
          subtitle: "Web Development Project",
          description:
            "A modern beauty salon website designed to showcase services, support appointment booking, and provide a clean and elegant user experience.",
          highlights: [
            "Responsive and elegant salon website interface",
            "Service showcase and appointment-focused design",
            "Hosted live using GitHub Pages",
          ],
        },
        uart: {
          title: "UART Communication System",
          subtitle: "Digital Systems Project",
          description:
            "A UART communication system designed in VHDL with transmitter, receiver, and programmable baud rate generator for serial communication.",
          highlights: [
            "Designed transmitter, receiver, and baud rate generator",
            "Performed loopback testing with MAX232",
            "Integrated UART with a traffic light controller for debugging",
          ],
        },
        mips: {
          title: "MIPS Pipelined RISC Processor",
          subtitle: "VHDL / FPGA Design",
          description:
            "A 5-stage pipelined RISC processor designed in VHDL, integrating control and datapaths with pipeline registers on an Altera DE2 FPGA.",
          highlights: [
            "Implemented IF, ID, EX, MEM, and WB pipeline stages",
            "Designed hazard detection and data forwarding units",
            "Validated timing, clock frequency, and execution cycles",
          ],
        },
      },
    },
    skills: {
      label: "Skills",
      title: "Technical expertise",
      subtitle: "A comprehensive toolkit spanning multiple domains of software engineering.",
      completeSet: "Complete Skill Set",
      categories: {
        languages: "Languages",
        frameworks: "Frameworks & Libraries",
        cloud: "Cloud & DevOps",
        security: "Security & Testing",
        embedded: "Embedded Systems",
      },
    },
    education: {
      label: "Education",
      title: "Academic background",
      certifications: "Certifications",
      scholarships: "Scholarships & Awards",
      relevantCoursework: "Relevant Coursework",
      moreInfo:
        "Continuously expanding my knowledge through online learning in artificial intelligence, machine learning, data engineering, version control, and modern development practices.",
    },
    contact: {
      label: "Get In Touch",
      title: "Let's Start a Conversation",
      subtitle: "Have a project in mind or want to discuss opportunities? I'd love to hear from you.",
      newMessage: "New Message",
      to: "To:",
      from: "From:",
      subject: "Subject:",
      draft: "Draft",
      characters: "characters",
      linkedIn: "LinkedIn",
      github: "GitHub",
      email: "Email",
      location: "Location",
      sendForm: {
        title: "Send Me a Message",
        helper: "Fill out the form and I'll get back to you within 24 hours.",
        greeting: "Hi, my name is",
        detailsPlaceholder: "[Your project details will appear here...]",
        signature: "Best regards,",
        signaturePlaceholder: "[your name]",
        name: "Your Name",
        namePlaceholder: "John Doe",
        email: "Email Address",
        emailPlaceholder: "john@example.com",
        subject: "Subject",
        subjectPlaceholder: "Project Collaboration",
        messageLabel: "Tell Me About Your Project",
        messagePlaceholder: "I'm looking for help with...",
        sendButton: "Send Message",
        sending: "Sending...",
        sentTitle: "Message Sent!",
        sentBody: "Thank you for reaching out. I'll review your message and get back to you soon.",
        sendAnother: "Send Another Message",
        respondTime: "I typically respond within 24–48 hours",
        error: "Sorry, something went wrong. Please try again or email me directly.",
      },
    },
    ai: {
      initialMessage:
        "Hi! I'm Hajer's AI Portfolio Assistant. Ask me about her experience, skills, cybersecurity work, projects, education, community involvement, or how to reach her.",
      introTitle: "AI Portfolio Assistant",
      introBody:
        "Hi! I can answer questions about Hajer's experience, projects, technical skills, cybersecurity work, community involvement, and contact details.",
      askButton: "Ask me anything",
      placeholder: "Ask about Hajer's background...",
      tryAsking: "Try asking:",
      quickQuestions: [
        "What is Hajer's experience?",
        "What are her technical skills?",
        "What cybersecurity experience does she have?",
        "What projects has she worked on?",
        "How can I contact her?",
      ],
      greetingResponse:
        "Hello! I'm Hajer's AI Portfolio Assistant. You can ask me about her experience, technical skills, cybersecurity work, projects, education, community involvement, or how to get in touch.",
      thanksResponse:
        "You're welcome! Feel free to ask anything else about Hajer's background, skills, projects, cybersecurity work, community involvement, or how to contact her.",
      intents: {
        experience: {
          answer:
            "Hajer is a Computer Engineering graduate and Software Developer with 3+ years of hands-on experience across 5+ organizations. Her journey includes university IT, private industry, entrepreneurship, government-related work, performance/data analysis, teaching, QA, API testing, and secure software development. She currently works at the University of Ottawa IT, where she contributes to software development, API testing, QA, performance testing, and SSDLC/security-related initiatives.",
        },
        security: {
          answer:
            "Cybersecurity is one of Hajer's main areas of interest. She works with secure development practices, SSDLC activities, API security considerations, authentication and authorization testing, SSO/SAML concepts, and security-aware QA. She is especially interested in building systems that are not only functional, but secure, thoughtful, and reliable.",
        },
        skills: {
          answer:
            "Hajer's technical skills include:\n• Languages: Python, Java, JavaScript, TypeScript, C/C++, SQL\n• Web & Software: React, Next.js, Node.js, .NET, REST APIs\n• QA & Testing: Postman, JMeter, API testing, performance testing, regression testing\n• DevOps: Git, GitHub, GitLab, CI/CD, Docker, Linux\n• Security: SSDLC, API security, authentication, authorization, SSO/SAML concepts\n• AI/ML: OpenAI, PyTorch, OpenCV, intelligent automation",
        },
        projects: {
          answer:
            "Hajer has worked on 10+ projects across software development, cybersecurity, AI, automation, and web technologies. Some highlighted projects include:\n• DriveSense — a driver drowsiness detection system using PyTorch, OpenCV, and React/TypeScript.\n• AI-Powered NutriCoach — a chatbot experience using AI to support nutrition guidance.\n• Smart Home Automation — an IoT-based automation project using ESP32 and web technologies.\n• Personal Portfolio Website — a modern portfolio built with Next.js, TypeScript, Tailwind CSS, GitHub, and Vercel.",
        },
        contact: {
          answer:
            "You can reach Hajer through her portfolio contact form, email her at hajerfguir@gmail.com, connect with her on LinkedIn at linkedin.com/in/hajer-fguir, or view her work on GitHub at github.com/hajerfguir.",
        },
        education: {
          answer:
            "Hajer holds a BASc in Computer Engineering from the University of Ottawa. Her academic background includes cybersecurity, artificial intelligence, data structures and algorithms, operating systems, embedded systems, computer architecture, and software engineering.",
        },
        availability: {
          answer:
            "Hajer is open to meaningful opportunities in software development, cybersecurity, QA automation, API testing, AI, and secure software engineering. The best way to reach her is through the contact form on this portfolio or by email at hajerfguir@gmail.com.",
        },
        ai: {
          answer:
            "Hajer is interested in the intersection of AI, automation, and secure software. Her experience includes AI-powered projects, PyTorch/OpenCV work, chatbot-style applications, and exploring how AI can improve development, testing, and user experiences.",
        },
        devops: {
          answer:
            "Hajer has experience with DevOps and automation concepts, including Git, GitHub, GitLab, CI/CD workflows, Docker, Linux, deployment practices, and testing automation. She is especially interested in how DevOps and SSDLC practices can make software delivery more secure and reliable.",
        },
        about: {
          answer:
            "Hajer Fguir is a Software Developer and Computer Engineering graduate passionate about cybersecurity, AI, automation, and community-driven impact. She enjoys turning ideas into secure, scalable, and intelligent digital experiences.",
        },
        community: {
          answer:
            "Community involvement is an important part of Hajer's journey. Her experience spans 5+ organizations and includes teaching, mentoring, entrepreneurship, university IT, and building technology with real-world impact. She values work that supports people, communities, and meaningful innovation.",
        },
        certification: {
          answer:
            "Hajer has academic recognition and technical certifications related to software development, AI, machine learning, Git/GitHub, and front-end development. She is continuously learning and expanding her skills in cybersecurity, AI, and secure software engineering.",
        },
      },
    },
  },
  fr: {
    nav: {
      home: "Accueil",
      about: "À propos",
      experience: "Expérience",
      projects: "Projets",
      skills: "Compétences",
      education: "Éducation",
      contact: "Contact",
    },
    hero: {
      name: "Hajer Fguir",
      role: "Développeuse logiciel",
      description:
        "Construire des technologies sécurisées, évolutives et impactantes. Passionnée par la création de solutions logicielles fiables et l'exploration de la façon dont la cybersécurité, l'IA et l'automatisation peuvent améliorer la façon dont les systèmes sont conçus et protégés.",
      cta: {
        viewProjects: "Voir les projets",
        contact: "Contactez-moi",
        github: "GitHub",
      },
      scroll: "Faire défiler",
    },
    cta: {
      contact: "Contactez-moi",
    },
    footer: {
      quickLinks: "Liens rapides",
      connect: "Connecter",
      builtWith: "Conçu avec",
      using: "avec Next.js & Tailwind CSS",
      rights: "Tous droits réservés.",
      email: "hajerfguir@gmail.com",
    },
    brand: {
      title: "HF",
      description:
        "Développeuse logiciel passionnée par la création de solutions technologiques sécurisées, évolutives et impactantes.",
    },
    about: {
      label: "À propos",
      title: "L'ingénierie sécurisée rencontre l'innovation de sens",
      subtitle: "",
      bio1:
        "Bienvenue dans mon espace numérique. Je suis Hajer Fguir, diplômée en génie informatique et développeuse logicielle à l'Université d'Ottawa. Je suis passionnée par la création de technologies qui ne sont pas seulement fonctionnelles, mais sécurisées, réfléchies et significatives.",
      bio2:
        "Mon parcours m'a amené à travailler au gouvernement, dans l'industrie privée, dans l'informatique universitaire, dans l'entrepreneuriat et l'enseignement. Au fil du temps, j'ai appris à embrasser la complexité, à poser de meilleures questions et à transformer des idées en solutions qui créent une réelle valeur.",
      stats: {
        years: "Années d'expérience",
        projects: "Projets",
        orgs: "Organisations",
      },
      highlights: {
        cybersecurity: "Cybersécurité",
        software: "Développement logiciel",
        devops: "DevOps & automatisation",
        ai: "IA & apprentissage automatique",
      },
    },
    experience: {
      label: "Expérience",
      title: "Mon parcours professionnel",
      subtitle: "Acquérir de l'expertise grâce à des rôles divers et des projets impactants",
      items: {
        uottawa_it: {
          role: "Développeuse logiciel",
          type: "Temps plein",
          period: "Jan 2026 – Présent",
          location: "Ottawa, ON, Canada",
          description: [
            "Réalisation de tests fonctionnels, de régression, de charge, de bout en bout et de sécurité pour les plateformes universitaires, y compris uoZone et Experiential Learning",
            "Développement de scénarios de tests d'authentification et de sécurité pour les flux SAML2/SSO, y compris la gestion des sessions, la validation des jetons et les scénarios d'authentification à forte charge",
            "Soutien aux initiatives SSDLC en améliorant les pratiques de tests sécurisés, en validant les exigences de sécurité et en contribuant à la documentation d'assurance qualité",
            "Collaboration avec les développeurs, les analystes QA et les parties prenantes pour résoudre les problèmes, valider le comportement du système et améliorer la fiabilité des applications",
          ],
        },
        uottawa: {
          role: "Développeuse systèmes TI",
          type: "Stagiaire",
          period: "Mai 2025 – Déc 2025",
          location: "Ottawa, ON, Canada",
          description: [
            "Exécution de tests de charge et de validation d'API pour la plateforme Experiential Learning",
            "Développement de scripts d'automatisation et de validations de sortie JSON pour soutenir l'intégrité des données et des intégrations backend fiables",
            "Développement et maintenance d'APIs RESTful en JavaScript, Node.js, Docker, Redis et workflows CI/CD",
            "Réalisation de validations de bout en bout et de tests de performance pour supporter un trafic utilisateur à volume élevé et assurer la fiabilité du système",
          ],
        },
        uottawa_faculty: {
          role: "Assistant d'enseignement",
          type: "Temps partiel",
          period: "Jan 2025 – Déc 2025",
          location: "Ottawa, ON, Canada",
          description: [
            "Soutien aux étudiants de premier cycle dans ITI1520 et SEG2911 via des labs, retours et encadrement académique",
            "Correction des travaux et fourniture de retours détaillés pour aider les étudiants à améliorer leurs compétences techniques et de résolution de problèmes",
            "Animation de séances de laboratoire et soutien individuel en programmation Python, concepts de génie logiciel et notions informatiques fondamentales",
            "Renforcement des compétences en communication, mentorat et leadership en travaillant avec des étudiants de profils variés",
          ],
        },
        novasoft: {
          role: "Co-fondatrice & Développeuse logiciel",
          type: "Entrepreneuriat",
          period: "Déc 2024 – Déc 2025",
          location: "Laval, QC, Canada",
          description: [
            "Co-fondation d'une start-up technologique concentrée sur la création de solutions logicielles et l'exploration de produits numériques innovants",
            "Développement d'outils sécurisés de traitement et de validation des données en Python et AVL Concerto",
            "Définition des exigences techniques et contribution au développement full-stack en appliquant des pratiques de codage sécurisées",
            "Travail transversal sur les aspects techniques, produit et entrepreneuriaux, renforçant l'autonomie, l'adaptabilité et la résolution de problèmes",
          ],
        },
        dana_tm4: {
          role: "Stagiaire en gestion de projet V&V",
          type: "Stagiaire",
          period: "Sep 2024 – Déc 2024",
          location: "Boucherville, QC, Canada",
          description: [
            "Soutien aux activités de vérification et validation en contribuant aux outils internes, workflows d'automatisation et rapports axés sur les données",
            "Développement de solutions Python pour soutenir les processus de vérification et améliorer l'accès aux informations liées aux tests",
            "Création d'outils web internes en JavaScript pour standardiser les sorties de bases de données et améliorer la visibilité technique",
            "Contribution aux flux de données sécurisés et aux intégrations d'authentification, y compris SAML2 SSO avec Microsoft Azure AD",
          ],
        },
        canada_post: {
          role: "Stagiaire analyste de données de performance",
          type: "Stagiaire",
          period: "Jan 2024 – Avr 2024",
          location: "Ottawa, ON, Canada",
          description: [
            "Création de scripts d'automatisation en Python et de workflows d'analyse de données pour soutenir la surveillance de la performance opérationnelle",
            "Travail avec Power BI et bases de données internes pour transformer des données techniques et opérationnelles en insights utiles",
            "Soutien à l'analyse des KPI, amélioration des rapports et prise de décision basée sur les données dans un environnement d'entreprise",
            "Acquisition d'expérience en collaboration avec des parties prenantes métier, systèmes techniques et données à grande échelle",
          ],
        },
      },
    },
    projects: {
      label: "Projets",
      title: "Travaux présentés",
      subtitle:
        "Une sélection de projets présentant mon travail dans l'IA, les systèmes embarqués, la cybersécurité, le développement logiciel et l'automatisation.",
      previous: "Projets précédents",
      next: "Projets suivants",
      featured: "En vedette",
      code: "Code",
      explore: "Explorer",
      viewAll: "Voir tous les projets sur GitHub",
      items: {
        drivesense: {
          title: "DriveSense™",
          subtitle: "Projet de fin d'études · LockedIn LTD",
          description: "Un système d'alerte conducteur intelligent conçu pour surveiller l'attention du conducteur en temps réel en utilisant des capteurs, la vision par ordinateur et des modèles d'apprentissage automatique.",
          highlights: [
            "Détecte les signes de somnolence, fatigue ou détresse",
            "Fournit des alertes en temps réel pour comportements dangereux",
            "Enregistre les événements sur une plateforme cloud pour soutenir la sécurité routière",
          ],
        },
        smart_home: {
          title: "Système domotique intelligent",
          subtitle: "Projet systèmes embarqués",
          description: "Système domotique en temps réel permettant le contrôle sans contact des lumières, ventilateurs et température via des gestes de la main et une interface web locale.",
          highlights: [
            "Contrôle par gestes utilisant le capteur APDS-9960",
            "Traitement temps réel des capteurs avec ESP32 et FreeRTOS",
            "Interface web locale pour surveillance et contrôle à distance",
          ],
        },
        nutricoach: {
          title: "NutriCoach — Chatbot IA",
          subtitle: "Projet chatbot IA",
          description: "Un chatbot IA fournissant des conseils nutritionnels personnalisés selon les objectifs et les entrées de l'utilisateur via une interface Gradio interactive.",
          highlights: [
            "Recommandations nutritionnelles personnalisées selon les entrées utilisateur",
            "Interface conviviale hébergée sur Hugging Face Spaces",
            "Prise en charge de l'interaction vocale via gTTS",
          ],
        },
        portfolio: {
          title: "Site portfolio personnel",
          subtitle: "Projet frontend",
          description: "Un portfolio moderne conçu pour présenter mon parcours, mes projets, compétences et expérience de manière claire et interactive.",
          highlights: [
            "Conçu avec une interface réactive et professionnelle",
            "Inclut une navigation interactive des projets et animations fluides",
            "Prêt pour un déploiement futur avec un domaine personnalisé",
          ],
        },
        mglam: {
          title: "Site salon de beauté M.Glam",
          subtitle: "Projet web",
          description: "Un site moderne pour salon de beauté présentant les services, la prise de rendez-vous et une expérience utilisateur élégante.",
          highlights: [
            "Interface salon responsive et élégante",
            "Présentation des services et design axé prise de rendez-vous",
            "Hébergement en direct via GitHub Pages",
          ],
        },
        uart: {
          title: "Système de communication UART",
          subtitle: "Projet systèmes numériques",
          description: "Un système de communication UART conçu en VHDL avec émetteur, récepteur et générateur de débit binaire programmable pour la communication série.",
          highlights: [
            "Conception de l'émetteur, du récepteur et du générateur de débit",
            "Tests en boucle avec MAX232",
            "Intégration de l'UART avec un contrôleur de feux de circulation pour le débogage",
          ],
        },
        mips: {
          title: "Processeur RISC pipeline MIPS",
          subtitle: "Conception VHDL / FPGA",
          description: "Processeur RISC pipeline 5 étapes conçu en VHDL, intégrant contrôle et datapaths avec registres de pipeline sur une FPGA Altera DE2.",
          highlights: [
            "Implémentation des étapes IF, ID, EX, MEM et WB",
            "Conception de la détection des hazards et de l'unité de forwarding",
            "Validation du timing, de la fréquence d'horloge et des cycles d'exécution",
          ],
        },
      },
    },
    skills: {
      label: "Compétences",
      title: "Expertise technique",
      subtitle: "Une boîte à outils complète couvrant plusieurs domaines du génie logiciel.",
      completeSet: "Ensemble de compétences complet",
      categories: {
        languages: "Langages",
        frameworks: "Frameworks & Bibliothèques",
        cloud: "Cloud & DevOps",
        security: "Sécurité & Tests",
        embedded: "Systèmes embarqués",
      },
    },
    education: {
      label: "Éducation",
      title: "Parcours académique",
      certifications: "Certifications",
      scholarships: "Bourses et prix",
      relevantCoursework: "Cours pertinents",
      moreInfo:
        "Je développe continuellement mes connaissances grâce à des cours en ligne en intelligence artificielle, apprentissage automatique, ingénierie des données, contrôle de version et pratiques de développement modernes.",
    },
    contact: {
      label: "Entrer en contact",
      title: "Commençons une conversation",
      subtitle: "Vous avez un projet en tête ou souhaitez discuter d'opportunités ? J'aimerais avoir de vos nouvelles.",
      newMessage: "Nouveau message",
      to: "À :",
      from: "De :",
      subject: "Objet :",
      draft: "Brouillon",
      characters: "caractères",
      linkedIn: "LinkedIn",
      github: "GitHub",
      email: "Email",
      location: "Emplacement",
      sendForm: {
        title: "Envoyez-moi un message",
        helper: "Remplissez le formulaire et je vous répondrai dans les 24 heures.",
        greeting: "Bonjour, je m'appelle",
        detailsPlaceholder: "[Les détails de votre projet apparaîtront ici...]",
        signature: "Cordialement,",
        signaturePlaceholder: "[votre nom]",
        name: "Votre nom",
        namePlaceholder: "John Doe",
        email: "Adresse e-mail",
        emailPlaceholder: "john@example.com",
        subject: "Objet",
        subjectPlaceholder: "Collaboration de projet",
        messageLabel: "Parlez-moi de votre projet",
        messagePlaceholder: "Je cherche de l'aide pour...",
        sendButton: "Envoyer le message",
        sending: "Envoi...",
        sentTitle: "Message envoyé !",
        sentBody: "Merci de m'avoir contacté. J'examinerai votre message et vous répondrai bientôt.",
        sendAnother: "Envoyer un autre message",
        respondTime: "Je réponds généralement sous 24 à 48 heures",
        error: "Désolé, une erreur est survenue. Veuillez réessayer ou m'envoyer un e-mail directement.",
      },
    },
    ai: {
      initialMessage:
        "Salut ! Je suis l'assistante IA du portfolio de Hajer. Demandez-moi des informations sur son expérience, ses compétences, son travail en cybersécurité, ses projets, sa formation, son implication communautaire ou comment la contacter.",
      introTitle: "Assistant IA Portfolio",
      introBody:
        "Bonjour ! Je peux répondre aux questions sur l'expérience de Hajer, ses projets, ses compétences techniques, son travail en cybersécurité, son implication communautaire et ses coordonnées.",
      askButton: "Posez-moi une question",
      placeholder: "Demandez le parcours de Hajer...",
      tryAsking: "Essayez de demander :",
      quickQuestions: [
        "Quelle est l'expérience de Hajer ?",
        "Quelles sont ses compétences techniques ?",
        "Quelle expérience en cybersécurité a-t-elle ?",
        "Sur quels projets a-t-elle travaillé ?",
        "Comment puis-je la contacter ?",
      ],
      greetingResponse:
        "Bonjour ! Je suis l'assistante IA du portfolio de Hajer. Vous pouvez me poser des questions sur son expérience, ses compétences techniques, son travail en cybersécurité, ses projets, sa formation, son implication communautaire ou comment la contacter.",
      thanksResponse:
        "De rien ! N'hésitez pas à poser d'autres questions sur le parcours, les compétences, les projets, la cybersécurité ou comment contacter Hajer.",
      intents: {
        experience: {
          answer:
            "Hajer est diplômée en génie informatique et développeuse logiciel avec plus de 3 ans d'expérience pratique au sein de plus de 5 organisations. Son parcours inclut l'informatique universitaire, l'industrie privée, l'entrepreneuriat, des travaux liés au gouvernement, l'analyse de performance/données, l'enseignement, la QA, les tests d'API et le développement logiciel sécurisé. Elle travaille actuellement au service TI de l'Université d'Ottawa, contribuant au développement logiciel, aux tests d'API, à la QA, aux tests de performance et aux initiatives SSDLC/sécurité.",
        },
        security: {
          answer:
            "La cybersécurité est l'un des domaines d'intérêt principaux de Hajer. Elle travaille avec des pratiques de développement sécurisé, des activités SSDLC, des considérations de sécurité API, des tests d'authentification et d'autorisation, des concepts SSO/SAML et une QA axée sur la sécurité. Elle s'intéresse particulièrement à la construction de systèmes à la fois fonctionnels, sécurisés et fiables.",
        },
        skills: {
          answer:
            "Les compétences techniques de Hajer incluent :\n• Langages : Python, Java, JavaScript, TypeScript, C/C++, SQL\n• Web & Logiciel : React, Next.js, Node.js, .NET, REST APIs\n• QA & Tests : Postman, JMeter, tests d'API, tests de performance, tests de régression\n• DevOps : Git, GitHub, GitLab, CI/CD, Docker, Linux\n• Sécurité : SSDLC, sécurité des API, authentification, autorisation, concepts SSO/SAML\n• IA/ML : OpenAI, PyTorch, OpenCV, automatisation intelligente",
        },
        projects: {
          answer:
            "Hajer a travaillé sur plus de 10 projets en développement logiciel, cybersécurité, IA, automatisation et technologies web. Parmi les projets mis en avant :\n• DriveSense — système de détection de somnolence du conducteur utilisant PyTorch, OpenCV et React/TypeScript.\n• NutriCoach — chatbot IA pour conseils nutritionnels.\n• Smart Home Automation — projet IoT avec ESP32 et technologies web.\n• Portfolio personnel — site moderne construit avec Next.js, TypeScript, Tailwind CSS, GitHub et Vercel.",
        },
        contact: {
          answer:
            "Vous pouvez contacter Hajer via le formulaire de contact du portfolio, par email à hajerfguir@gmail.com, la contacter sur LinkedIn à linkedin.com/in/hajer-fguir, ou consulter son travail sur GitHub à github.com/hajerfguir.",
        },
        education: {
          answer:
            "Hajer est titulaire d'un baccalauréat en génie informatique de l'Université d'Ottawa. Son parcours académique couvre la cybersécurité, l'intelligence artificielle, les structures de données et algorithmes, les systèmes d'exploitation, les systèmes embarqués, l'architecture des ordinateurs et le génie logiciel.",
        },
        availability: {
          answer:
            "Hajer est ouverte à des opportunités significatives en développement logiciel, cybersécurité, automatisation QA, tests d'API, IA et ingénierie logicielle sécurisée. Le meilleur moyen de la joindre est via le formulaire de contact du portfolio ou par email à hajerfguir@gmail.com.",
        },
        ai: {
          answer:
            "Hajer s'intéresse à l'intersection de l'IA, de l'automatisation et du logiciel sécurisé. Son expérience inclut des projets IA, du travail avec PyTorch/OpenCV, des applications type chatbot et l'exploration de l'IA pour améliorer le développement, les tests et l'expérience utilisateur.",
        },
        devops: {
          answer:
            "Hajer possède de l'expérience en DevOps et automatisation, incluant Git, GitHub, GitLab, workflows CI/CD, Docker, Linux, pratiques de déploiement et automatisation des tests. Elle s'intéresse à la façon dont DevOps et SSDLC rendent la livraison logicielle plus sûre et fiable.",
        },
        about: {
          answer:
            "Hajer Fguir est développeuse logiciel et diplômée en génie informatique, passionnée par la cybersécurité, l'IA, l'automatisation et l'impact communautaire. Elle aime transformer des idées en expériences numériques sécurisées, évolutives et intelligentes.",
        },
        community: {
          answer:
            "L'implication communautaire fait partie intégrante du parcours de Hajer. Son expérience couvre plus de 5 organisations et inclut l'enseignement, le mentorat, l'entrepreneuriat, l'informatique universitaire et la construction de technologies à impact réel.",
        },
        certification: {
          answer:
            "Hajer a des reconnaissances académiques et des certifications techniques liées au développement logiciel, à l'IA, à l'apprentissage automatique, à Git/GitHub et au développement front-end. Elle continue d'apprendre et d'élargir ses compétences en cybersécurité, en IA et en ingénierie logicielle sécurisée.",
        },
      },
    },
  },
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en")

  useEffect(() => {
    try {
      const stored = localStorage.getItem("hf_locale")
      if (stored === "en" || stored === "fr") setLocale(stored)
    } catch (e) {
      // ignore
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem("hf_locale", locale)
    } catch (e) {
      // ignore
    }
  }, [locale])

  const t = (key: string) => {
    const parts = key.split(".")
    let cur: any = translations[locale]
    for (const p of parts) {
      if (cur && p in cur) cur = cur[p]
      else return key
    }
    return cur
  }

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useTranslation() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error("useTranslation must be used within LanguageProvider")
  return ctx
}

export default LanguageProvider
