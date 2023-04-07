pipeline {
  stages {
    stage('Static Analysis') {
      steps {
        script {
          // Install dependencies
          sh 'npm install'

          // Run ESLint
          sh 'npm run lint -- --format=html --output-file=eslint-report.html'
        }
      }
    }
  }
}
