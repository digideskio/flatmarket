style:
	make style-theme-bananas
	make style-ui

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

coverage-ui:
	./node_modules/.bin/karma start ./packages/flatmarket-ui/karma.config.js --mode coverage

test:
	make test-ui

test-ui:
	./node_modules/.bin/karma start ./packages/flatmarket-ui/karma.config.js

test-ui-dev:
	./node_modules/.bin/karma start ./packages/flatmarket-ui/karma.config.js --mode dev
