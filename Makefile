build:
	docker build -t tgbot .

run:
	docker run -d -p 5144:5144 --name tgbot --rm tgbot