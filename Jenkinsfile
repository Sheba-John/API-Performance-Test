pipeline {
    agent any

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Sheba-John/API-Performance-Test.git'
            }
        }

        stage('Verify k6 Installation') {
            steps {
                sh 'k6 version'
            }
        }

        stage('Run k6 CRUD Performance Test') {
    steps {
        sh '''
        mkdir -p reports

        k6 run \
          -e VUS=${VUS} \
          -e RAMP_UP=${RAMP_UP} \
          -e STEADY=${STEADY} \
          -e RAMP_DOWN=${RAMP_DOWN} \
          tests/crud_load_test.js \
          --summary-export=reports/summary.json
        '''
    }
}

stage('Generate HTML Report') {
    steps {
        sh '''
        k6-html-reporter reports/summary.json \
          --output reports/k6-report.html
        '''
    }
}
    }

    post {
        always {
        archiveArtifacts artifacts: 'reports/*', fingerprint: true
        }
        success {
            echo '✅ k6 performance tests passed'
        }
        failure {
            echo '❌ k6 performance tests failed'
        }
    }
}
