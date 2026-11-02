pipeline{
	agent any
		
	environment {
        DOCKER_CREDS = credentials('my_dockerhub_creds')
        DOCKER_REPO  = 'ajivir021/newrepo'
    }
	
	stage('Checkout') {
    steps {
        git branch: 'main',
            url: 'https://github.com/Ajithkumar021/Jenkins_Pipeline-example.git'
    }
}

	stages {

        stage('Docker Build') {
            steps {
                echo 'Building Docker Image'

                sh "docker build -t ${DOCKER_REPO}:${BUILD_NUMBER} ."

                sh "docker images"
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
