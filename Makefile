build:
	yarn install && yarn run build

clean:
	rm -rf site

.PHONY: build clean
