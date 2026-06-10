pipeline {
	agent any
	environment {
		BRANCH_NAME = "master"
		REPO_DIR = "${WORKSPACE}/Jenkins"
		REPO_URL = "https://github.com/jagadeeshwars/pipeline-jenkins.git"
		RUN_TESTS = "true"
		PYTHON_VERSION = "python3"
	}
	stages {
		stage('Checkout Branch') {
			steps {
				script {
					echo "Checkout branch to ${BRANCH_NAME}"
					sh """
						if [ -d "REPO_DIR" ]; then
							cd ${REPO_DIR}
							git reset --hard
							git checkout ${BRANCH_NAME}
							git pull origin ${BRANCH_NAME}
						else
							git clone --branch "${BRANCH_NAME}" "${REPO_URL}" "${REPO_DIR}"
						fi
					"""
				}
			}
		}
		stage('Install Dependencies') {
			steps {
				script {
					echo "Insatll dependencies..."
					dir("${REPO_DIR}") {
						sh """
							set -e
							${PYTHON_VERSION} -m venv venv
							. venv/bin/activate
							pip install --upgrade pip
							pip install -r requirements.txt
						"""
					}			

				}
			}
		}
		stage('Run Tests') {
			when {
				expression { return env.RUN_TESTS == "true" }
			}
			steps {
				script {
					echo "Running tests..."
					dir("${REPO_DIR}") {
						sh """
							set -e
							. venv/bin/activate
							pytest --junitxml=reports/test-results.xml
						"""
					}
				}
			}
		}
		stage('Run Application') {
			steps {
				script {
					echo "Starting Flask Application..."
					dir("${REPO_DIR}") {
						sh """
							set -e
							. venv/bin/activate
							echo "Flask app will run for 60s..."
							timeout 60s python app.py || echo "App terminated"
						"""
					}
				}
			}
		}

	}
	post {
		success {
			echo "Pipeline executed successfully!"
		}
		failure {
			echo "Pipeline failed!"
		}
	}
}