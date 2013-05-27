css:
	compass compile public/ --force

install:
	bundle install ; npm install -d


setup:
	cp config.example.json config.json

