pipeline {
  agent {
    node {
      label 'my-node-with-npm'
    }
  }

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
