
pipeline {
  agent any
    
  tools {nodejs "node"}
    
  stages {
     
    stage('Dependencies') {
      steps {
        sh 'npm install'
      }
    }  
    
            
    stage('Analyzer') {
      steps {
        sh 'npm run lint -- --format=html --output-file=eslint-report.html'
      }
    }
  }
}
          