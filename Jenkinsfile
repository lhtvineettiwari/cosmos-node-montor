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
     stage('JIRA') {
            steps {
                script {
                    def testIssue = [ fields: [ project: [key: 'DP'],
                            summary: 'New JIRA Created from Jenkins.',
                            description: 'New JIRA Created from Jenkins.',
                            issuetype: [id: '11301']
                        ]
                    ]
                    def response = jiraNewIssue issue: testIssue, site: 'leewayjira'
                    echo response.successful.toString()
                    echo response.data.toString()
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