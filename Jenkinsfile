
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
    stage('JIRA') {
      steps {
          script {
          def testIssue = [fields: [project: [key: 'MIL'],
            summary: 'Bug report Created from for project '+ env.JOB_NAME,
            description: 'Bug report Created from Jenkins for project ' + env.JOB_NAME + ', Please find the attached static analysis report.\n\n',
            issuetype: [id: '10004']
          ]]

          response = jiraNewIssue issue: testIssue, site: 'leewayjira'

          echo response.successful.toString()
          echo response.data.toString()
          def attachmentFile = new File('eslint-report.html')
          jiraUploadAttachment idOrKey: response.data.key,
                           site: 'leewayjira',
                           attachmentFile: attachmentFile,
                           attachmentFileName: 'eslint-report.html'

        }
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
          