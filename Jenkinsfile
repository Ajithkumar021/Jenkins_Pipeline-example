
pipeline {
    agent any

    environment {
        DOCKER_REPO = 'ajivir021/newrepo'
    }

    options {
        timestamps()
        timeout(time: 30, unit: 'MINUTES')
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

                sh '''
                    docker build -t "$DOCKER_REPO:$BUILD_NUMBER" .
                '''
            }
        }

        stage('Docker Login') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'my_docker_creds',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASS'
                    )
                ]) {
                    sh '''
                        set +x
                        echo "$DOCKER_PASS" | docker login \
                            -u "$DOCKER_USER" \
                            --password-stdin
                    '''
                }
            }
        }

        stage('Docker Push') {
            steps {
                echo 'Pushing image to Docker Hub...'

                sh '''
                    docker push "$DOCKER_REPO:$BUILD_NUMBER"
                '''
            }
        }
    }

    post {
        success {
            echo "SUCCESS: Docker image pushed!"
            echo "Image: ${DOCKER_REPO}:${BUILD_NUMBER}"
        }

        failure {
            echo 'Pipeline failed. Check the console output.'
        }

        always {
            sh 'docker logout || true'
        }
    }
}
