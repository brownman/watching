file_import=db/my_db.sql
db_name=watching
container_name=my-own-mysql
cmd="cat $file_import | docker exec -i $container_name mysql -uroot -pmypass123 "
echo $cmd
while true 
do
	eval "$cmd" 2>&1 | grep 'ERROR' && echo waiting for the db server to become ready && sleep 1 || { echo 'Done!' && break ; }
done
