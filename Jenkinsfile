pipeline {
    agent any
        
    environment {
        DOCKER_CREDS = credentials('my_dockerhub_creds')
        DOCKER_REPO = "pand/s7"
    }
    
    stages {
        stage('DockerBuild') {
            steps {
                echo "****Building the docker Image"
                sh "docker build -t ${DOCKER_REPO}:$GIT_COMMIT ."

                echo "***listing the docker images"
                sh "docker images"

                echo "***Docker login***"
                sh "echo ${DOCKER_CREDS_PSW} | docker login -u ${DOCKER_CREDS_USR} --password-stdin"

                sh "docker push ${DOCKER_REPO}:$GIT_COMMIT"
            }
        }
    }
}
