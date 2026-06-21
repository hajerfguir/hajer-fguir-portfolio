"use client"

import React, { createContext, useContext, useEffect, useState } from "react"

type Locale = "en" | "fr"

interface LanguageContextValue {
  locale: Locale
  setLocale: (l: Locale) => void
  t: (key: string) => string
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
          description: "An intelligent driver alert system designed to monitor driver attentiveness in real time using sensors, computer vision, and machine-learning-based detection.",
          highlights: [
            "Detects signs of drowsiness, fatigue, or distress",
            "Provides real-time driver alerts for unsafe behavior",
            "Logs events to a cloud platform to support road safety",
          ],
        },
        smart_home: {
          title: "Smart Home Automation System",
          subtitle: "Embedded Systems Project",
          description: "A real-time smart home automation system that enables touchless control of lights, fans, and temperature using hand gestures and a locally hosted web interface.",
          highlights: [
            "Gesture-based control using APDS-9960 sensor",
            "Real-time sensor processing with ESP32 and FreeRTOS",
            "Local web interface for remote monitoring and control",
          ],
        },
        nutricoach: {
          title: "AI-Powered NutriCoach Chatbot",
          subtitle: "AI Chatbot Project",
          description: "An AI-powered chatbot that provides personalized nutrition guidance based on user goals and input through an interactive Gradio interface.",
          highlights: [
            "Personalized nutrition recommendations based on user input",
            "User-friendly interface hosted on Hugging Face Spaces",
            "Voice interaction support using gTTS",
          ],
        },
        portfolio: {
          title: "Personal Portfolio Website",
          subtitle: "Frontend Portfolio Project",
          description: "A modern personal portfolio website designed to showcase my background, experience, projects, skills, and professional journey in a clean and interactive way.",
          highlights: [
            "Built with a responsive and professional user interface",
            "Includes interactive project navigation and smooth animations",
            "Prepared for future deployment with a custom domain",
          ],
        },
        mglam: {
          title: "M.Glam Beauty Salon Website",
          subtitle: "Web Development Project",
          description: "A modern beauty salon website designed to showcase services, support appointment booking, and provide a clean and elegant user experience.",
          highlights: [
            "Responsive and elegant salon website interface",
            "Service showcase and appointment-focused design",
            "Hosted live using GitHub Pages",
          ],
        },
        uart: {
          title: "UART Communication System",
          subtitle: "Digital Systems Project",
          description: "A UART communication system designed in VHDL with transmitter, receiver, and programmable baud rate generator for serial communication.",
          highlights: [
            "Designed transmitter, receiver, and baud rate generator",
            "Performed loopback testing with MAX232",
            "Integrated UART with a traffic light controller for debugging",
          ],
        },
        mips: {
          title: "MIPS Pipelined RISC Processor",
          subtitle: "VHDL / FPGA Design",
          description: "A 5-stage pipelined RISC processor designed in VHDL, integrating control and datapaths with pipeline registers on an Altera DE2 FPGA.",
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
