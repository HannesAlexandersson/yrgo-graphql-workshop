up:
	docker-compose -f server/docker/docker-compose.yml up -d

build:
	docker-compose -f server/docker/docker-compose.yml up -d --build

down: 
	docker-compose -f server/docker/docker-compose.yml down

nuke:
	docker-compose -f server/docker/docker-compose.yml down
	docker volume rm docker_db_data