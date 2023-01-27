#  lint:
#  	npx eslint .

#  install:
#  	npm ci

#  test-coverage:
#  	npm test -- --coverage --coverageProvider=v8

#  test:
#  	NODE_OPTIONS=--experimental-vm-modules npx jest

.DEFAULT_GOAL := build-run

clean:
	make -C app clean

build:
	make -C app build

install:
	make -C app install

run-dist:
	make -C run-dist

run:
	make -C app run

test:
	make -C app test

report:
	make -C app report

lint:
	make -C app lint

update-deps:
	make -C app update-deps


build-run: build run

.PHONY: build
