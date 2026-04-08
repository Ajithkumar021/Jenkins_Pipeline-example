pipeline{
	agent any
		
	environment{
		DOCKER_CREDS = credentials('my_dockerhub_creds')
		DOCKER_REPO = "ajivir021/newrepo"
	}
	
	
	stages{
		stage(DockerBuild){
			steps{
				echo "****Building the docker Image"
				sh "docker build -t ${DOCKER_REPO}:$GIT_COMMIT ."
				echo "***listing the docker images"
				sh "docker images"
				echo "***Docker login***"
				sh "docker login -u ${DOCKER_CREDS_USR} -p ${DOCKER_CREDS_PSW}"
				sh "docker push ${DOCKER_REPO}:$GIT_COMMIT"
				
				}
		}
	}


}
