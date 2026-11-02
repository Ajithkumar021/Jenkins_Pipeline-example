
pipeline {
    agent any

    environment {
        DOCKER_REPO = 'ajivir021/newrepo'
    }

    options {
        timeout(time: 30, unit: 'MINUTES')
        timestamps()
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Ajithkumar021/Jenkins_Pipeline-example.git'
            }
        }

        stage('Docker Build') {
            steps {
                echo 'Building Docker image...'

                sh 'docker version'

                sh """
                    docker build --pull \
                    -t ${DOCKER_REPO}:${BUILD_NUMBER} .
                """
            }
        }

        stage('Docker Login') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'my_dockerhub_creds',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASS'
                    )
                ]) {
                    sh '''
                        echo "$DOCKER_PASS" | docker login \
                        -u "$DOCKER_USER" \
                        --password-stdin
                    '''
                }
            }
        }

        stage('Docker Push') {
            steps {
                echo 'Pushing Docker image to Docker Hub...'

                sh """
                    docker push ${DOCKER_REPO}:${BUILD_NUMBER}
                """
            }
        }
    }

    post {
        success {
            echo "Docker image pushed successfully: ${DOCKER_REPO}:${BUILD_NUMBER}"
        }

        failure {
            echo 'Pipeline failed. Check the Jenkins console output.'
        }

        always {
            sh 'docker logout || true'
            echo 'Pipeline execution completed.'
        }
    }
}
