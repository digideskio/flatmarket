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
	make style-theme-bananas
	make style-ui

style-client:
	./node_modules/crispy/node_modules/.bin/eslint ./packages/flatmarket-client/ \
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
	make test-ui

test-client:
	./node_modules/.bin/karma start ./packages/flatmarket-client/karma.config.js

test-ui:
	./node_modules/.bin/karma start ./packages/flatmarket-ui/karma.config.js
