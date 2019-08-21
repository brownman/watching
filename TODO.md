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
- npm install
- follow installation for the 2 dockers: mysql+phpmyadmin
- import db scheme to mysql using phpmyadmin interface (Port:8081, User:root,Password:mypass123)
- ./start.sh

