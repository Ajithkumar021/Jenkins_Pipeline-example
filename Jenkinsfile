
pipeline {
    agent {
        label 'Agent1'
    }

    environment {
        DOCKER_CREDS = credentials('dockerhub-creds')
        DOCKER_REPO = 'ajivir021/jenkins'
    }

    stages {

        // 1. Checkout source code
        stage('Checkout') {
            steps {
                echo '**** Checking Out Source Code ****'

                retry(count: 2, conditions: [nonresumable()]) {
                    git branch: 'main',
                        url: 'https://github.com/Ajithkumar021/Jenkins_Pipeline-example.git'
                }
            }
        }

        // 2. SonarQube Analysis
        stage('SonarQube Analysis') {
            steps {
                echo '**** Running SonarQube Analysis ****'

                script {
                    def scannerHome = tool 'SonarScanner'

                    withSonarQubeEnv('SonarQube') {
                        sh """
                            ${scannerHome}/bin/sonar-scanner \
                            -Dsonar.projectKey=Jenkins-Pipeline-Example \
                            -Dsonar.projectName=Jenkins-Pipeline-Example \
                            -Dsonar.sources=. \
                            -Dsonar.exclusions=**/node_modules/**,**/coverage/**,**/dist/**,**/build/**
                        """
                    }
                }
            }
        }

        // 3. Quality Gate
        stage('Quality Gate') {
            steps {
                echo '**** Checking SonarQube Quality Gate ****'

                timeout(time: 10, unit: 'MINUTES') {
                    script {
                        def qg = waitForQualityGate()

                        echo "Quality Gate Status: ${qg.status}"

                        if (qg.status != 'OK') {
                            error 'Pipeline stopped because Quality Gate failed!'
                        }
                    }
                }
            }
        }

        // 4. Docker Build
        stage('DockerBuild') {
            steps {
                echo '**** Building the Docker Image ****'

                sh 'docker build -t "$DOCKER_REPO:$BUILD_NUMBER" .'

                echo '**** Listing Docker Images ****'

                sh 'docker images'
            }
        }

        // 5. Docker Login
        stage('Docker Login') {
            steps {
                echo '**** Docker Login ****'

                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-creds',
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

        // 6. Docker Push
        stage('Docker Push') {
            steps {
                echo '**** Pushing Docker Image ****'

                sh 'docker push "$DOCKER_REPO:$BUILD_NUMBER"'
            }
        }
    }

    post {
        success {
            echo 'Docker image pushed successfully!'
            echo "Image: ${DOCKER_REPO}:${BUILD_NUMBER}"
        }

        failure {
            echo 'Pipeline failed. Check console output.'
        }

        always {
            sh 'docker logout || true'
        }
    }
}

