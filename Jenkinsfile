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
        sh 'npm run lint -- --format=json --output-file=eslint-report.json || true'
        script {
          def errorCount=sh(script: "cat eslint-report.json | jq '.[].errorCount'", returnStdout: true).trim()
          if (errorCount == "0") {
          sh 'rm eslint-report.json'
          }
        }
      }
    }
    stage('JIRA') {
      when {
        expression { fileExists('eslint-report.json') }
      }
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
          jiraUploadAttachment idOrKey: response.data.key,
            site: 'leewayjira',
            file: 'eslint-report.json'

        }
      }
    }
  }
  post {
    always {
      script {
        if (fileExists('eslint-report.json')) {
          emailext body: 'Static analysis report attached.',
            attachmentsPattern: 'eslint-report.*',
            subject: 'Static Analysis Report',
            to: 'rogelio.stracke@ethereal.email'
        }
      }
    }
  }
}
