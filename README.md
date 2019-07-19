# Atlanters Anonymous

> A completely anonymous feedback form written in javascript.

## How does it work?

User feedback is sent to the backend server which routes the message to an e-mail. Absolutely no information is being stored about the user.

# Develop using docker compose

You can use docker compose to spin up your local environment. Execute (in root):
```
docker-compose up --build
``` 
`--build` will ensure that any changes you made locally are propagated inside the app container running in docker compose.

Simply put, this will build the frontend, copy the build folder to the backend and will run 'npm start' in the backend root.
Then, in your browser:
```
localhost:3000
```

# Develop both ends seperately

- Install nodejs
```
sudo apt install nodejs
```
- Install npm
```
sudo apt install npm
```
If you want to setup your local environment manually or develop backend or frontend seperately, follow the specific setup guides:

- Setup [backend](backend/README.md)
- Setup [frontend](frontend/README.md)


# Deployment

To deploy to Kubernetes using Helm with the default values, run the following:  
```
helm install ops/helm
```
To modify the default values, take look at [ops/helm/values.yaml](ops/helm/values.yaml)

# Contributing

1. Fork it (https://github.com/ATLANTBH/atlanters-anonymous)
2. Checkout to develop branch
   `git checkout develop`
3. Create your branch
   `git checkout -b myBranch`
4. Commit your changes
   `git commit -m 'Add some beautiful code'`
5. Push to the branch
   `git push origin myBranch`
6. Create a new Pull Request
