const resumeData = {
  main: {
    name: "Zoltan Zsolt Ortutay",
    occupation: "Cloud-oriented Software Engineer",
    description: "Excelling in app, network and platform troubleshooting",
    image: "profilepic.jpg",
    contactmessage: "Get in touch with me",
    email: "ortutay.zoltan@gmail.com",
    phone: "+46 76 001 3367",
    linkedin: "linkedin.com/in/zoltanortutay",
    address: {
      city: "Sweden"
    }
  },
  resume: {
    skillmessage: "Key technical and professional competencies",
    education: [
      {
        school: "Budapest University of Technology and Economics",
        degree: "MSc, Electrical and Electronics Engineering",
        graduated: "",
        description: ""
      }
    ],
    work: [
      {
        company: "Ericsson",
        title: "vIMS & Cloud Support Engineer",
        location: "Sweden",
        years: "Aug 2018 - Present",
        description: [
          "Resolving 300+ complex technical issues, analysing large, semi-structured datasets from telecom operators",
          "Handling 100+ customer escalations and emergencies effectively",
          "Facilitating customer deployments and test procedures, optimizing configurations to enhance system performance",
          "Proficiently managing and documenting issues across multiple platforms including JIRA, Salesforce and MHWeb",
          "Participated in diverse cross-team projects, performing various deployments and documentation validation",
          "Improved efficiency by developing Python/Bash scripts and fostering team learning through knowledge base development"
        ]
      },
      {
        company: "Ericsson",
        title: "System tester, integrator",
        location: "Hungary",
        years: "Nov 2009 - Jul 2018",
        description: [
          "Verifying software packages in wire-line solutions, creating new test setups for automated and regression tests",
          "Developing custom scripts, tools, and plugins to optimize workflow efficiency",
          "Taking part in 24/7 on-call duty (handling emergencies)",
          "Participating in on-site activities worldwide including software deployments, FOA, and troubleshooting",
          "Locations: Amman, Cairo, Dublin, Gothenburg, Katrineholm, Kista, Malmo, Madrid, Paris, Split"
        ]
      },
      {
        company: "FlexiTon Kft",
        title: "Software tester",
        location: "Hungary",
        years: "May 2007 - Nov 2009",
        description: [
          "Performing functional and system testing of a telecom network designer software"
        ]
      }
    ],
    skills: [
      {
        name: "Cloud & Infrastructure",
        level: "85%",
        skills: ["OpenStack", "Kubernetes", "VMware"]
      },
      {
        name: "Programming & Tools",
        level: "80%",
        skills: ["Python", "Erlang", "Git/GitHub", "SQL"]
      },
      {
        name: "Monitoring & Logging",
        level: "75%",
        skills: ["ELK Stack", "Troubleshooting"]
      },
      {
        name: "Protocols & Platforms",
        level: "85%",
        skills: ["SIP", "H.248", "Diameter", "Linux"]
      },
      {
        name: "Project Tools",
        level: "80%",
        skills: ["JIRA", "Salesforce"]
      }
    ],
    courses: [
      {
        title: "Elasticsearch, Kibana, Logstash, Beats, APM: ELK Stack",
        provider: "Udemy",
        year: "2024"
      },
      {
        title: "The Git & Github Bootcamp",
        provider: "Udemy",
        year: "2024"
      },
      {
        title: "The Complete SQL Bootcamp",
        provider: "Udemy",
        year: "2023"
      },
      {
        title: "The Complete Python Bootcamp",
        provider: "Udemy",
        year: "2020"
      }
    ]
  },
  languages: [
    {
      name: "English",
      level: "Fluent"
    },
    {
      name: "Swedish",
      level: "Intermediate"
    },
    {
      name: "Hungarian",
      level: "Native"
    }
  ]
};

export default resumeData;