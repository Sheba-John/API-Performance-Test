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
        sh """
        mkdir -p reports
        cd tests
        VUS=${params.VUS} \
        RAMP_UP=${params.RAMP_UP} \
        STEADY=${params.STEADY} \
        RAMP_DOWN=${params.RAMP_DOWN} \
        k6 run crud_load_test.js \
        --summary-export=../reports/summary.json
        """
    }
}
    }

    post {
        always {
        archiveArtifacts artifacts: 'reports/*.json', fingerprint: true
        }
        success {
            echo '✅ k6 performance tests passed'
        }
        failure {
            echo '❌ k6 performance tests failed'
        }
    }
}
