pipeline {
  agent any

  stages {
    stage('Static Analysis') {
      steps {
        script {
            sh 'npm install'
            sh 'npm run lint -- --format=html --output-file=eslint-report.html'
            junit 'eslint-report.xml'
        }
      }
    }
  }
}
