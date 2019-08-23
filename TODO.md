install docker
--
- https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-18-04


install node.js
--
- https://github.com/nodesource/distributions/blob/master/README.md


install dockers for: mysql, phpmyadmin 
------
```bash
docker run --name my-own-mysql -e MYSQL_ROOT_PASSWORD=mypass123 -p 3306:3306 -d mysql:8.0.1
docker run --name my-own-phpmyadmin -d --link my-own-mysql:db -p 8081:80 phpmyadmin/phpmyadmin
```
- https://medium.com/@migueldoctor/run-mysql-phpmyadmin-locally-in-3-steps-using-docker-74eb735fa1fc


SETUP
-----
```bash
npm install 
./SH/docker.sh 	#pull and run (pull images if not exist) of mysql+phpmyadmin
sleep 5 	# wait for container ready state
./SH/migrate.sh # import db scheme(db/my_db.sql) to mysql container 

npm test 	#run unit tests
npm start	#run the web server, serves the API

		#play with the database using phpmyadmin interface (Port:8081, User:root,Password:mypass123)
```

SQL:
----
- fetch episodes with join
- fetch episodes without join: (using stored-procedure)
- add user data
- get user data

API
---
- web server 
- api serves those queries

