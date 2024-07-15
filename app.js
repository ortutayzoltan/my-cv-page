angular.module('resumeApp', [])
.controller('MainController', function($scope) {
    $scope.name = 'Zoltan Zsolt Ortutay';
    $scope.title = 'vIMS & Cloud Support Engineer';
    $scope.summary = 'Software engineer with a strong background of troubleshooting application, network and platform issues on multiple cloud computing platforms. Committed to cultivating an environment of continuous learning within my team, through the development of a comprehensive knowledge base. Have an interest in data analysis and visualization, scripting (python/perl/bash) and concurrent functional programming (erlang).';
    
    $scope.experience = [
        {
            position: 'vIMS & Cloud Support Engineer',
            company: 'Ericsson',
            description: 'Providing support for intricate technical issues through the analysis of large, semi-structured datasets originating from telecom operators worldwide. Handling emergencies and customer escalations. Supporting customer deployments, test activities and configuration fine tuning. Writing python and bash scripts to ease daily work. Cultivating an environment of continuous learning within my team, through the development of a comprehensive knowledge base.'
        },
        {
            position: 'Tester, Integrator, Emergency handler',
            company: 'Ericsson',
            description: 'Verifying software packages in wire-line solutions. Creating new test setups, for automated and regression tests. Registering and solving 100+ software issues. Writing numerous improvement ideas, scripts, tools and plug-ins for specific cases or simply for making daily work more efficient. Beside testing, taking part in 24/7 on-call duty (handling emergencies). Taking part in several kind of on-site activities around the world: Amman, Cairo, Dublin, Gothenburg, Madrid, Paris, Split.'
        },
        {
            position: 'Software tester',
            company: 'FlexiTon Kft',
            description: 'Verifying software packages in wire-line solutions. Creating new test setups, for automated and regression tests.'
        }
    ];

    $scope.contact = {
        phone: '0760013367',
        email: 'ortutay.zoltan@gmail.com',
        linkedin: 'https://www.linkedin.com/in/zoltanortutay'
    };

    $scope.currentSection = '';

    $scope.viewSection = function(section) {
        $scope.currentSection = section;
    };
});

