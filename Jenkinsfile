pipeline {
  agent any

  stages {
    stage('Static Analysis') {
      steps {
        script {
          try {
            sh 'npm install'
            sh 'npm run lint -- --format=html --output-file=eslint-report.html'
            junit 'eslint-report.xml'
          } catch (error) {
            currentBuild.result = 'UNSTABLE'
            error("Static Analysis failed")
          }
        }
      }
    }
  }
}
