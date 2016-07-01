reset:
	rm -rf ./node_modules/
	rm -rf ./packages/**/node_modules/
	npm install
	./node_modules/.bin/lerna bootstrap

coverage-client:
	./node_modules/.bin/karma start ./packages/flatmarket-client/karma.config.js --mode coverage

coverage-ui:
	./node_modules/.bin/karma start ./packages/flatmarket-ui/karma.config.js --mode coverage

dev-client:
	./node_modules/.bin/karma start ./packages/flatmarket-client/karma.config.js --mode dev

dev-ui:
	./node_modules/.bin/karma start ./packages/flatmarket-ui/karma.config.js --mode dev

style:
	make style-client
	make style-schema
	make style-server
	make style-theme-bananas
	make style-ui

style-client:
	./node_modules/crispy/node_modules/.bin/eslint ./packages/flatmarket-client/ \
		-c ./node_modules/crispy/.eslintrc \
		--ext '.js,.jsx' \
		--ignore-pattern '**/+(coverage|fixtures|node_modules)/**'

style-schema:
	./node_modules/crispy/node_modules/.bin/eslint ./packages/flatmarket-schema/ \
		-c ./node_modules/crispy/.eslintrc \
		--ext '.js,.jsx' \
		--ignore-pattern '**/+(coverage|fixtures|node_modules)/**'

style-server:
	./node_modules/crispy/node_modules/.bin/eslint ./packages/flatmarket-server/ \
		-c ./node_modules/crispy/.eslintrc \
		--ext '.js,.jsx' \
		--ignore-pattern '**/+(coverage|fixtures|node_modules)/**'

style-ui:
	./node_modules/crispy/node_modules/.bin/eslint ./packages/flatmarket-ui/ \
		-c ./node_modules/crispy/.eslintrc \
		--ext '.js,.jsx' \
		--ignore-pattern '**/+(coverage|fixtures|node_modules)/**'

style-theme-bananas:
	./node_modules/crispy/node_modules/.bin/eslint ./packages/flatmarket-theme-bananas/ \
		-c ./node_modules/crispy/.eslintrc \
		--ext '.js,.jsx' \
		--ignore-pattern '**/+(coverage|fixtures|node_modules)/**'

test:
	make test-client
	make test-schema
	make test-server
	make test-ui

test-client:
	./node_modules/.bin/karma start ./packages/flatmarket-client/karma.config.js

test-schema:
	./node_modules/.bin/mocha ./packages/flatmarket-schema/__test__/**/* \
		--reporter spec

test-server:
	./node_modules/.bin/mocha ./packages/flatmarket-server/__test__/**/* \
		--reporter spec

test-ui:
	./node_modules/.bin/karma start ./packages/flatmarket-ui/karma.config.js
