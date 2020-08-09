_site: clean
	yarn install && yarn run build

clean:
	rm -rf _site

.PHONY: clean
