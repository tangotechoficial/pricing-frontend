.PHONY: all help start stop build bash clean logs
.DEFAULT_GOAL := all

ANGULAR=ng
CURR_DIR := $(shell pwd)
DIST_DIR := $(CURR_DIR)/dist
PROJECT='martins-project'

all:
	@echo "Hello $(LOGNAME), nothing to do by default"
	@echo "Try 'make help'"

# target: help - Display callable targets.
help:
	@egrep "^#" [Mm]akefile | cut -d' ' -f3,4,5- | sed 's/^Usage:/\tUsage:/'

# target: start - Starts angular dev server
start:
	$(ANGULAR) serve --open
# target: build - Build application with development configuration settings

build:
	$(ANGULAR) build
	$(MAKE) pack ENV="testing"

# target: staging - Build application with staging configurations
staging:
	$(ANGULAR) build --configuration=staging
	$(MAKE) pack ENV="staging"

# target: prod - Build application with production settings
prod:
	$(ANGULAR) build --prod
	$(MAKE) pack ENV="prod"

# target: pack - Package the application bundle to deploy to aws. Usage: make pack ENV=["testing"|"staging"|"prod"]
pack:
		cd $(DIST_DIR) &&	tar -czvf $(PROJECT)-$(ENV).tar.gz $(PROJECT) && cd $(CURR_DIR)

# target: pack_deploy - Copy local packaged application bundle to remote server
pack_deploy:
	cd $(DIST_DIR) && scp $(PROJECT)-$(ENV).tar.gz tango@backend2.tangotechapp.com:/home/tango/workspace

# target: token - Get authorization token
token:
	curl -X POST -d"username=$(username)&password=$(password)" $(url)
