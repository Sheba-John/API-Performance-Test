pipeline {
    agent any

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Sheba-John/API-Performance-Test.git'
            }
        }

        stage('Run k6 CRUD Test (Docker)') {
            steps {
                sh '''
                mkdir -p reports

                docker run --rm \
                  -v $PWD:/work \
                  -w /work \
                  grafana/k6 run \
                  tests/crud_load_test.js \
                  --summary-export=reports/summary.json
                '''
            }
        }

        stage('Generate HTML Report (Docker)') {
            steps {
                sh '''
                docker run --rm \
                  -v $PWD:/work \
                  -w /work \
                  ghcr.io/benc-uk/k6-reporter:latest \
                  reports/summary.json \
                  --output reports/k6-report.html
                '''
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'reports/*', fingerprint: true
        }
    }
}
