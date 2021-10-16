# mini-youtube-project
course -> mini youtube project
## Instrucciones

Please download the project by 
```
git clone https://github.com/luiscarvil/mini-youtube-project.git
```
BACKEND
the backend contains all the code made in express
```
cd backend
npm i
```


FRONTEND
frontend contains the code made in react
```
cd frontend
npm i
```
## IMPORTANT
--------------------------------------------
# the database in mongodb server is configured in the ``` .env``` file, as well as the necessary credentials for the connection with the s3 bucket and user registration credentials in cognito

- paste the ``` .env ``` file in the ```./backend``` / folder
 
-----------------------------------------------------------------
# the file ``` generate-keys.sh ``` is needed to be able to use jwt (necessary for the verification of users in the routes)
- paste the ```generate-keys ``` file in the ```./backend/src/keys ``` / folder
generate-keys.sh needs to be run in that folder (./keys)
run with:
```
./generate-keys.sh
```



## the backend is divided by
- routes: contains the connection points for the front, controllers: function logic and services call 
-  services: contains the queries that were used in mongoose
- model: schematics and models of the tables created
- validators: basic validations for endpoints
## INSTALLATION
- with npm install the 2 applications independently, the frontend already has the routes configured on the localhost to be able to make the requests to the back
```
npm i
```
## the front

the frontend does not need additional configurations ... all files are on the front



**Free Software, Hell Yeah!**

# LUIS ALEJANDRO CARVAJAL VILLA
luiscarvajal05@gmail.com