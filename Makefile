lint:
	npx eslint .

install:
	npm ci

test-coverage:
	npm test -- --coverage --coverageProvider=v8

test:
	NODE_OPTIONS=--experimental-vm-modules npx jest
