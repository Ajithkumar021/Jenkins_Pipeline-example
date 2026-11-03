
pipeline {
    agent any

    environment {
        DOCKER_CREDS = credentials('my_docker_creds')
        DOCKER_REPO = 'ajivir021/newrepo'
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Ajithkumar021/Jenkins_Pipeline-example.git'
            }
        }

        stage('DockerBuild') {
            steps {
                echo "****Building the docker Image"

                sh 'docker build -t "$DOCKER_REPO:$BUILD_NUMBER" .'

                echo "***listing the docker images"

                sh 'docker images'

                echo "***Docker login***"

                sh '''
                    set +x
                    echo "$DOCKER_CREDS_PSW" | docker login \
                        -u "$DOCKER_CREDS_USR" \
                        --password-stdin
                '''

                echo "***Docker push***"

                sh 'docker push "$DOCKER_REPO:$BUILD_NUMBER"'
            }
        }
    }

    post {
        success {
            echo "Docker image pushed successfully!"
            echo "Image: ${DOCKER_REPO}:${BUILD_NUMBER}"
        }

        failure {
            echo "Pipeline failed. Check console output."
        }

        always {
            sh 'docker logout || true'
        }
    }
}
