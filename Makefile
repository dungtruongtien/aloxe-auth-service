.PHONY: run-migrate
run-migrate:
	npx prisma migrate dev --name $(filter-out $@,$(MAKECMDGOALS))

.PHONY: run-dev
run-dev:
	npm run dev