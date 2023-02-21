lint:
	npx eslint .

install:
	npm ci

test-coverage:
	npm test -- --coverage --coverageProvider=v8

test:
	npm test
