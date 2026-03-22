angular.module('resumeApp', [])
.controller('MainController', function($scope) {
    $scope.name = 'Zoltan Zsolt Ortutay';
    $scope.title = 'Cloud-oriented Software Engineer';
    $scope.summary = 'I\'m a software engineer who loves diving deep into complex technical problems, especially in cloud and telecom environments. Working with large datasets and finding patterns in them is something I genuinely enjoy - it\'s like solving a puzzle, but with real impact. Over the years at Ericsson, I\'ve handled hundreds of technical issues and customer escalations, and each one has taught me something new. While Python is my go-to for scripting and data analysis, I\'m particularly fond of Erlang and its approach to functional programming. What really gets me excited is not just fixing problems, but understanding why they happened and making sure they don\'t come back. I believe in sharing knowledge - actually, I\'ve put together quite a comprehensive knowledge base for my team. It\'s great seeing how sharing what we\'ve learned helps everyone grow and makes our work more efficient. I\'m always keeping an eye on new technologies and tools, especially in cloud computing - there\'s always something new to learn in this field.';
    
    $scope.experience = [
        {
            position: 'vIMS & Cloud Support Engineer',
            company: 'Ericsson',
            location: 'Sweden',
            years: 'Aug 2018 - Present',
            description: 'Resolving 300+ complex technical issues, analysing large, semi-structured datasets from telecom operators. Handling 100+ customer escalations and emergencies effectively. Facilitating customer deployments and test procedures, optimizing configurations to enhance system performance. Proficiently managing and documenting issues across multiple platforms including JIRA, Salesforce and MHWeb. Participated in diverse cross-team projects, performing various deployments and documentation validation. Improved efficiency by developing Python/Bash scripts and fostering team learning through knowledge base development.'
        },
        {
            position: 'System tester, integrator',
            company: 'Ericsson',
            location: 'Hungary',
            years: 'Nov 2009 - Jul 2018',
            description: 'Verifying software packages in wire-line solutions, creating new test setups for automated and regression tests. Developing custom scripts, tools, and plugins to optimize workflow efficiency. Taking part in 24/7 on-call duty (handling emergencies). Participating in on-site activities worldwide including software deployments, FOA, and troubleshooting in locations including: Amman, Cairo, Dublin, Gothenburg, Katrineholm, Kista, Malmo, Madrid, Paris, Split.'
        },
        {
            position: 'Software tester',
            company: 'FlexiTon Kft',
            location: 'Hungary',
            years: 'May 2007 - Nov 2009',
            description: 'Performing functional and system testing of a telecom network designer software.'
        }
    ];

    $scope.skills = [
        {
            category: 'Cloud & Infrastructure',
            items: ['OpenStack', 'Kubernetes', 'VMware']
        },
        {
            category: 'Programming & Tools',
            items: ['Python', 'Erlang', 'Git/GitHub', 'SQL']
        },
        {
            category: 'Monitoring & Logging',
            items: ['ELK Stack', 'Troubleshooting']
        },
        {
            category: 'Protocols & Platforms',
            items: ['SIP', 'H.248', 'Diameter', 'Linux']
        },
        {
            category: 'Project Tools',
            items: ['JIRA', 'Salesforce']
        }
    ];

    $scope.education = {
        school: 'Budapest University of Technology and Economics',
        degree: 'MSc, Electrical and Electronics Engineering'
    };

    $scope.courses = [
        {
            title: 'Elasticsearch, Kibana, Logstash, Beats, APM: ELK Stack',
            provider: 'Udemy',
            year: '2024'
        },
        {
            title: 'The Git & Github Bootcamp',
            provider: 'Udemy',
            year: '2024'
        },
        {
            title: 'The Complete SQL Bootcamp',
            provider: 'Udemy',
            year: '2023'
        },
        {
            title: 'The Complete Python Bootcamp',
            provider: 'Udemy',
            year: '2020'
        }
    ];

    $scope.contact = {
        phone: '+46 76 001 3367',
        email: 'ortutay.zoltan@gmail.com',
        linkedin: 'https://www.linkedin.com/in/zoltanortutay'
    };

    $scope.languages = [
        { name: 'English', level: 'Fluent' },
        { name: 'Swedish', level: 'Intermediate' },
        { name: 'Hungarian', level: 'Native' }
    ];

    $scope.currentSection = '';

    $scope.viewSection = function(section) {
        $scope.currentSection = section;
    };
});