.PHONY: all help start stop build bash clean logs
.DEFAULT_GOAL := build

ANGULAR=ng

all:
	@echo "Hello $(LOGNAME), nothing to do by default"
	@echo "Try 'make help'"

# target: help - Display callable targets.
help:
	@egrep "^#" [Mm]akefile | cut -d' ' -f3,4,5- | sed 's/^Usage:/\tUsage:/'

# target: start - Starts dev server with db, api and frontend
start:
	$(ANGULAR) serve --open
# target: build - Build application with production configuration settings
build:
	$(ANGULAR) build --prod

# Get token
token:
	curl -X POST -d"username=$(username)&password=$(password)" $(url)
