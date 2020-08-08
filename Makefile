site: clean
	yarn install && yarn run build

clean:
	rm -rf site

.PHONY: clean
