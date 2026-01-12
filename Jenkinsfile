pipeline {
    agent any

    parameters {
        string(name: 'VUS', defaultValue: '10', description: 'Virtual Users')
        string(name: 'DURATION', defaultValue: '30s', description: 'Test duration')
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Sheba-John/API-Performance-Test.git'
            }
        }

        stage('Run k6 Test (Docker)') {
            steps {
                sh '''
                mkdir -p reports

                docker run --rm \
                  -v "$PWD:/scripts" \
                  grafana/k6 run \
                  /scripts/tests/crud_load_test.js \
                  -e VUS=$VUS \
                  -e DURATION=$DURATION \
                  --summary-export=/scripts/reports/summary.json
                '''
            }
        }

        stage('Generate HTML Report') {
            steps {
                sh '''
                docker run --rm \
                  -v "$PWD:/reports" \
                  ghcr.io/benc-uk/k6-reporter:latest \
                  /reports/summary.json \
                  --output /reports/k6-report.html
                '''
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'reports/*', fingerprint: true
        }
        success {
            echo '✅ Performance tests completed successfully'
        }
        failure {
            echo '❌ Performance tests failed'
        }
    }
}
