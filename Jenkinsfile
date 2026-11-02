pipeline {
    agent any

    environment {
        DOCKER_CREDS = credentials('my_dockerhub_creds')
        DOCKER_REPO  = 'ajivir021/newrepo'
    }

    stages {

        stage('Checkout') {
            steps {
                git url: 'https://github.com/<your-github-user>/<your-repo>.git',
                    branch: 'main'
            }
        }

        stage('Docker Build') {
            steps {
                sh 'ls -la'
                sh "docker build -t ${DOCKER_REPO}:${BUILD_NUMBER} ."
            }
        }

        stage('Docker Login') {
            steps {
                sh '''
                echo "$DOCKER_CREDS_PSW" | docker login \
                  -u "$DOCKER_CREDS_USR" \
                  --password-stdin
                '''
            }
        }

        stage('Docker Push') {
            steps {
                sh "docker push ${DOCKER_REPO}:${BUILD_NUMBER}"
            }
        }
    }
}
