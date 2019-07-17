def label = "jenkins-worker-${UUID.randomUUID().toString()}"

podTemplate(label: label,
    serviceAccount: 'jenkins',
    containers: [
        containerTemplate(name: 'docker', image: 'docker', command: 'cat', ttyEnabled: true),
        //containerTemplate(name: 'helm', image: 'lachlanevenson/k8s-helm:v2.13.0', command: 'cat', ttyEnabled: true),
        containerTemplate(name: 'kubectl', image: 'lachlanevenson/k8s-kubectl:v1.11.10', command: 'cat', ttyEnabled: true)
    ],
    //imagePullSecrets: ['placelab-registry-tls'],
    volumes: [
        hostPathVolume(mountPath: '/var/run/docker.sock', hostPath: '/var/run/docker.sock')
    ]) {
    node(label) {
        script {
            stage('Pull') {
                sh 'echo "**** Deploying ${ENVIRONMENT} with branch ${BRANCH}"'
                checkout scm
            }
            stage('Build') {
                container('docker') {
                    docker.withRegistry('https://hub.docker.com', 'abhdocker') {
                        def image = docker.build("atlantbh/atlanters-anonymous", "--network=host .")
                        //base.push(env.BUILD_NUMBER)
                        image.push(env.BRANCH)
                    }
                }
            }
        }
    }
}