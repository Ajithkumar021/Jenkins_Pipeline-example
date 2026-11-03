pipeline {
    agent any

    environment {
        DOCKER_CREDS = credentials('dockerhub-creds')
        DOCKER_REPO = 'ajivir021/jenkins'
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
                echo "**** Building the Docker Image ****"

                sh 'docker build -t "$DOCKER_REPO:$BUILD_NUMBER" .'

                echo "*** Listing Docker Images ***"

                sh 'docker images'
            }
        }

        stage('Docker Login') {
            steps {
                echo "*** Docker Login ***"

                sh '''
                    set +x
                    echo "$DOCKER_CREDS_PSW" | docker login \
                        -u "$DOCKER_CREDS_USR" \
                        --password-stdin
                '''
            }
        }

        stage('Docker Push') {
            steps {
                echo "*** Pushing Docker Image ***"

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
