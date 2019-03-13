build-dev:
	docker-compose --file=docker-compose.dev.yml up --build

run-dev:
	docker-compose --file=docker-compose.dev.yml up

build-prod:
	docker-compose up --build

run-prod:
	docker-compose up
