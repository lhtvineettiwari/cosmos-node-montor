pipeline {
    agent any

    stages {
        stage('Static Analysis') {
            steps {
                sh 'npm install'
                sh 'npm run lint -- --format=html --output-file=eslint-report.html'
                junit 'eslint-report.xml'
            }
        }
    }
    post {
        always {
            emailext body: 'Static analysis report attached.', 
                attachmentsPattern: 'eslint-report.*', 
                subject: 'Static Analysis Report', 
                to: 'rogelio.stracke@ethereal.email'
        }
    }
}