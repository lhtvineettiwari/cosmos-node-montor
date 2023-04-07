pipeline {
  agent any

  stages {
    stage('Static Analysis') {
      steps {
        sh 'npm install'
        sh 'npm run lint -- --format=html --output-file=eslint-report.html'
        script {
          def errorCount = sh(script: "grep -c 'error' eslint-report.html", returnStdout: true).trim()
          if (errorCount.toInteger() > 0) {
            def testIssue = [ fields: [ project: [key: 'MIL'],
                            summary: 'New JIRA Created from Jenkins for ESLint errors',
                            description: 'ESLint test found ' + errorCount + ' errors. Please fix the errors in the code.',
                            issuetype: [id: '10004']
                        ]
                    ]
            def response = jiraNewIssue issue: testIssue, site: 'leewayjira'
            echo 'JIRA issue created: ' + response.data.key
          } else {
            echo 'No ESLint errors found'
          }
          junit 'eslint-report.xml'
        }
      }
    }
     stage('JIRA') {
            steps {
                script {
                    def testIssue = [ fields: [ project: [key: 'MIL'],
                            summary: 'Bug report from Jenkins.',
                            description: 'Bugs from deployed project.',
                            issuetype: [id: '10004']
                        ]
                    ]
                    def response = jiraNewIssue issue: testIssue, site: 'leewayjira'
                    echo 'JIRA issue created: ' + response.data.key
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
