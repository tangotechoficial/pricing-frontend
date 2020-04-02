<<<<<<< HEAD
# MartinsProject

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.21.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
=======

# pricing-frontend


## Colaborando

Utilizamos o GIT para controle de versões, então, antes de mais nada, certifique-se de ter o `git` instalado em sua máquina.

Caso não possua o `git` ainda, [consulte o git book sobre como instalar em seu sistema operacional](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git). Precisamos do `git` para os próximos passos.


### Criando branches

Por padrão as branches serão criadas usando as iniciais do nome do repositório: PF - Pricing Frontend - e o número da issue no repositorio, por exemplo: `git checkout -b PF-8` para criar o branch *PF-8*.

### Pull requests
Os pull requests devem apontar para o branch development.


## Desenvolvimento

0 (opcional): Instale o gerenciador de dependências *Yarn classic* seguindo os passos em [Install yarn](https://classic.yarnpkg.com/en/docs/install#debian-stable)


1 - Clone o repositório:

```
  git clone git@github.com:cloudcodebr/pricing-frontend.git
```

2 - Entre no diretório da aplicação e execute a instalação das dependências:

```
dev@host ~:$ cd martins-project
dev@host ~/martins-project:$ yarn install
```



## Makefile
Usando o comando ``` make help ``` você poderá visualizar as opções disponíveis:
- ``` help``` - Display callable targets.
- ``` start ``` - Starts angular dev server
      Usage: make start
- ``` clean ``` - Remove old builds
      Usage: make clean
- ``` docker-build ``` - Build docker container
      Usage: make docker-build
- ```  docker-start ``` - Start container. Binds to port 80
      Usage: make docker-start
- ```  build ``` - Build application with development configuration settings
      Usage: make build
- ```  staging ``` - Build application with staging configurations
      Usage: make staging
- ```  prod ``` - Build application with production settings
      Usage: make prod
- ```  pack ``` - Package the application bundle to deploy to aws.
      Usage: make pack ENV=["testing"|"staging"|"prod"]
- ```  pack_deploy ``` - Copy local packaged application bundle to remote server. It doesn't install application, just uploads the pack to the ec2 instance through scp
      Usage: make pack_deploy

- ```  token ``` - Get authorization token
      Usage: make token

## Rodando a aplicação em modo dev

Para rodar a aplicação em modo de desenvolvimento, use o comando `make start`.
Caso a utilidade `make` não esteja disponível, use `ng serve`.


## Docker

Usando o `make` temos 2 opções para construir (`make build-docker`) e iniciar (`make start-docker`) o aplicativo.
Usar essa abordagem permite iniciar o container já no modo detached (destacado). Para inspecionar os logs, você pode usar diretamente o `docker-compose`:

```
dev@host ~/martins-project:$ docker-compose logs app
```
>>>>>>> c5d698bad176927ff24820c9c3e51cc4fe5bc1b9
