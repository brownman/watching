docker ps | grep my-own-mysql && { \
docker stop my-own-mysql
docker rm my-own-mysql
docker stop my-own-phpmyadmin
docker rm my-own-phpmyadmin
}

docker run --name my-own-mysql -e MYSQL_ROOT_PASSWORD=mypass123 -p 3306:3306 -d mariadb
docker run --name my-own-phpmyadmin -d --link my-own-mysql:db -p 8081:80 phpmyadmin/phpmyadmin
docker ps
