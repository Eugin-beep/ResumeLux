import { ResumeData } from '@/types/resume';

export const DEMO_RESUME_DATA: ResumeData = {
  personal: {
    fullName: 'Alexander Vance',
    title: 'Principal Software Architect & Full-Stack Engineer',
    email: 'alexander.vance@resumelux.io',
    phone: '+1 (555) 789-0123',
    location: 'San Francisco, CA',
    website: 'https://alexandervance.dev',
    linkedin: 'linkedin.com/in/alexandervance',
    github: 'github.com/alexvance',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
    customFields: [
      { id: '1', label: 'Portfolio', value: 'resumelux.io/alex' },
      { id: '2', label: 'Clearance', value: 'US Citizen / Public Trust' }
    ]
  },
  summary:
    'Distinguished Software Architect with 10+ years of expertise in designing hyper-scalable distributed cloud systems, modern web platforms, and mission-critical microservices. Proven leadership driving cross-functional engineering squads, reducing infrastructure latencies by 42%, and delivering high-impact SaaS products generating $40M+ in ARR.',
  experience: [
    {
      id: 'exp-1',
      jobTitle: 'Principal Systems Architect',
      company: 'Aether Cloud Technologies',
      location: 'San Francisco, CA',
      startDate: '2022',
      endDate: 'Present',
      current: true,
      description:
        '• Spearheaded architectural migration from monolithic legacy stack to event-driven Kubernetes microservices handling 2.5B+ monthly API calls.\n• Architected real-time vector search and caching fabric using Redis and PostgreSQL, slashing p99 latency from 450ms to 38ms.\n• Mentored 18 senior and staff engineers across 3 distributed engineering pods.'
    },
    {
      id: 'exp-2',
      jobTitle: 'Senior Full Stack Lead',
      company: 'Vanguard FinTech Labs',
      location: 'New York, NY',
      startDate: '2019',
      endDate: '2022',
      current: false,
      description:
        '• Designed and built high-frequency crypto asset reporting dashboard using Next.js, WebSockets, and Go backend.\n• Implemented bank-grade zero-trust authentication and end-to-end audit compliance for SOC 2 Type II certification.\n• Scaled engineering velocity by 60% through unified design systems and automated CI/CD pipelines.'
    },
    {
      id: 'exp-3',
      jobTitle: 'Software Engineer II',
      company: 'Helios Data Systems',
      location: 'Austin, TX',
      startDate: '2016',
      endDate: '2019',
      current: false,
      description:
        '• Developed core data ingestion pipelines processing 8TB+ daily telemetry data using Apache Kafka and Apache Spark.\n• Authored reusable TypeScript component libraries adopted by 8 internal platform engineering teams.'
    }
  ],
  education: [
    {
      id: 'edu-1',
      degree: 'Master of Science in Computer Science',
      institution: 'Stanford University',
      location: 'Stanford, CA',
      startDate: '2014',
      endDate: '2016',
      score: 'GPA: 3.94 / 4.0',
      description: 'Specialization in Distributed Systems and Artificial Intelligence. Graduate Research Fellow.'
    },
    {
      id: 'edu-2',
      degree: 'Bachelor of Science in Computer Engineering',
      institution: 'University of California, Berkeley',
      location: 'Berkeley, CA',
      startDate: '2010',
      endDate: '2014',
      score: 'Summa Cum Laude (GPA: 3.91 / 4.0)',
      description: 'Dean’s Honors List (all quarters). President of Computer Science Honor Society (Eta Kappa Nu).'
    }
  ],
  skills: [
    {
      id: 'skill-cat-1',
      category: 'Architecture & Backend',
      skills: ['Distributed Systems', 'Go', 'Node.js', 'PostgreSQL', 'Redis', 'Kafka', 'GraphQL', 'gRPC']
    },
    {
      id: 'skill-cat-2',
      category: 'Cloud & DevOps',
      skills: ['AWS', 'Google Cloud', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD Pipelines', 'Linux']
    },
    {
      id: 'skill-cat-3',
      category: 'Frontend & UI',
      skills: ['TypeScript', 'Next.js', 'React', 'Tailwind CSS', 'WebSockets', 'Design Systems', 'Performance Tuning']
    },
    {
      id: 'skill-cat-4',
      category: 'Leadership & Methodologies',
      skills: ['System Design', 'Agile / Scrum', 'Technical Strategy', 'Cross-functional Leadership', 'Mentorship']
    }
  ],
  projects: [
    {
      id: 'proj-1',
      title: 'KubeStream — Event Streaming Mesh',
      description:
        'High-throughput distributed event broker built in Go and Rust for low-latency edge messaging. Featured on Hacker News #1 with 4,200+ GitHub stars.',
      technologies: ['Go', 'Rust', 'Raft Consensus', 'Docker'],
      url: 'https://kubestream.dev',
      github: 'https://github.com/alexvance/kubestream'
    },
    {
      id: 'proj-2',
      title: 'LuxUI — Luxury React Component Engine',
      description:
        'Accessible, zero-runtime overhead component library featuring dark mode elegance, fluid typography, and micro-interactions.',
      technologies: ['TypeScript', 'React', 'Tailwind CSS'],
      url: 'https://luxui.resumelux.io',
      github: 'https://github.com/alexvance/lux-ui'
    }
  ],
  certifications: [
    {
      id: 'cert-1',
      name: 'AWS Certified Solutions Architect – Professional',
      issuer: 'Amazon Web Services',
      date: '2023',
      credentialId: 'AWS-SAP-892401',
      credentialUrl: 'https://aws.amazon.com/verification'
    },
    {
      id: 'cert-2',
      name: 'Certified Kubernetes Administrator (CKA)',
      issuer: 'Cloud Native Computing Foundation (CNCF)',
      date: '2022',
      credentialId: 'CKA-901844',
      credentialUrl: 'https://www.cncf.io/certification'
    }
  ],
  achievements: [
    {
      id: 'ach-1',
      title: 'Top 1% Global Engineering Award 2024',
      description: 'Recognized by Aether Cloud for breakthrough innovations in distributed vector database clustering.',
      date: '2024'
    },
    {
      id: 'ach-2',
      title: 'US Patent Granted: US11082914B2',
      description: 'Method and apparatus for adaptive memory allocation in real-time distributed stream compute nodes.',
      date: '2023'
    }
  ],
  languages: [
    { id: 'lang-1', language: 'English', proficiency: 'Native' },
    { id: 'lang-2', language: 'German', proficiency: 'Professional' },
    { id: 'lang-3', language: 'French', proficiency: 'Intermediate' }
  ],
  customSections: [
    {
      id: 'custom-1',
      title: 'Publications & Keynotes',
      items: [
        {
          id: 'pub-1',
          title: 'Scaling Distributed State Machines Beyond 1M TPS',
          subtitle: 'ACM SIGOPS Operating Systems Review',
          date: '2023',
          description: 'Authored peer-reviewed paper detailing multi-region Raft state replication optimizations.'
        },
        {
          id: 'pub-2',
          title: 'Keynote Speaker: QCon Global Software Conference',
          subtitle: 'San Francisco, CA',
          date: '2024',
          description: 'Delivered keynote address on "Resilient Microservices in the Era of High-Frequency SaaS".'
        }
      ]
    }
  ],
  formatting: {
    primaryColor: '#D4AF37',
    fontFamily: 'sans',
    fontSize: 'base',
    margins: 'normal'
  }
};

export const BLANK_RESUME_DATA: ResumeData = {
  personal: {
    fullName: '',
    title: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedin: '',
    github: '',
    customFields: []
  },
  summary: '',
  experience: [],
  education: [],
  skills: [],
  projects: [],
  certifications: [],
  achievements: [],
  languages: [],
  customSections: [],
  formatting: {
    primaryColor: '#D4AF37',
    fontFamily: 'sans',
    fontSize: 'base',
    margins: 'normal'
  }
};
