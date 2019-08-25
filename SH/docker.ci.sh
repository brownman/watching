docker ps | grep my-own-mysql && { \
docker stop my-own-mysql
docker rm my-own-mysql
}

docker run --name my-own-mysql -e MYSQL_ROOT_PASSWORD=mypass123 -p 3306:3306 -d mariadb
docker ps
