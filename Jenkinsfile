
pipeline {
  agent any
    
  stages {
     
    stage('Dependencies') {
      steps {
        sh 'npm install'
      }
    }      
    stage('Analyzer') {
      steps {
        sh 'npm run lint -- --format=html --output-file=eslint-report.html || true'
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
          