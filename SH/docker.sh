docker run --name my-own-mysql -e MYSQL_ROOT_PASSWORD=mypass123 -p 3306:3306 -d mysql:8.0.1
docker run --name my-own-phpmyadmin -d --link my-own-mysql:db -p 8081:80 phpmyadmin/phpmyadmin
docker ps
