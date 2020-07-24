<pre style="max-height:none;"><code>

                                      -/////:
                                      +ysysss
                                      +sossss
                           `yssssyssssyyyyyys            .o/`
                           `yyyyyysssssysyyys            soos:
                      `----:hyyyyyssssyyyyyyy-----      .y+++s:``
                      :yysysyssssysyyyysssssyysysh      `y+++oyssssso`
                      :yysysysssyysyyyyssyssyysyyh       /y+ooooosss/
                  ////+yysysyssssysyysysssssyysysy/////+oooossoo+/-`
              .`  hssooooooooooooooooooooooooooooooooo++oooss`` `.
           `.:oo/:ysssyyysooooossyyyysoooossyyyssoooossyyyys:--/os:.`
                 `+yyyssssssssssssssssssssssssssssssyyyyyy+`
                  `syysssssssssso+osssssssssssssssyyyyyys-
                   .syyyysssssssoosssssssssssssyyyyyyys/`
                    `/o+/::::--+ssssssssssyyyyyyyyyso-`
                      `:+/:--..-/osyyyyyyyyyyyyss+:.
                         .-////:::/oyyysssso+/-.
                             `...-----...`
                   .o-                      -o.
              ```` -h/    ````       `````  /h:  ``    ````        ``
            :ossssooh/ `/osssso:   .+sssss- /h:.+s/ `:osssso:`  `/oss:
           oh+.  `:yh/`yy:`  ./h+ :ho.  `.` /hsys-  sh:`  -sh+ .yy-`
          `hs      :h//h:      sh`sh`       /hh/   -ho  .+ys-  +h-
           sy-    `sh-.hs`    -yy /h/`      /hhy/` `yy:oy+-`   oh.
           `+ys++oys-  -syo++oy+`  /yyo+os: :h::sy: .oyhs+os`  +h.
             `--:-`      .-:--`      .-:-.  `-`  -.   `--:-`   .-

</code></pre>

## Contents

- Intro
- Developing with Docker Compose
- Why use Docker and Docker Compose?

## Intro

This guide is for getting developers started with using Docker Compose for development. It's targeted at devs who have experience with Docker but are sick of writing out one liners into their terminal to start a container.

You will see:

- how to run a service with Docker Compose
- how to use Traefik as a reverse proxy (makes accessing services from your browser way easier)
- using `lazydocker` to start containers after initial setup
- the benefits of using Docker vs traditional installation of services

## Developing with Docker Compose

You will need to have [Docker and Docker Compose](https://docs.docker.com/get-docker/) installed before you get started.

In this example, I will be using [PostgreSQL](https://www.postgresql.org/) (a database similar to MySQL/MSSQL).

### Running PostgreSQL with Docker Compose instead of Docker

You could write a one liner into your terminal to run your service:

```
$ docker run -p "5432:5432" --name postgres -e POSTGRES_USER=username -e POSTGRES_PASSWORD=password postgres:10.8-alpine
```

This is equal to using this `docker-compose.yaml` file:

```
version: '3'

services:

  postgres:
    image: postgres:10.8-alpine
    environment:
      POSTGRES_USER: "username"
      POSTGRES_PASSWORD: "password"
    ports:
      - "5432:5432"
```

Just run:

```
$ docker-compose up postgres
```

With either approach, any application can access Postgres over http://localhost:5432

We can see what containers we have running by running:

```
$ docker container ls
```

You can see that the name of the container has been set to `postgres-` and the name of the folder that the `docker-compose.yaml` file is in.

### Adding pgAdmin

PgAdmin is a web UI for managing Postgres.

You could go and download the executable and run it, or you could use a container to run it. This is possible because the management UI is just a website.

```
version: '3'

services:

  postgres:
    image: postgres:10.8-alpine
    environment:
      POSTGRES_USER: "username"
      POSTGRES_PASSWORD: "password"
    ports:
      - "5432:5432"

  pgadmin:
    image: dpage/pgadmin4:4.11
    ports:
      - "1111:1111"
    environment:
      PGADMIN_LISTEN_PORT: "1111"
      PGADMIN_DEFAULT_EMAIL: "pgadmin@example.com"
      PGADMIN_DEFAULT_PASSWORD: "password"
    depends_on:
      - postgres
```

Now run:

```
$ docker-compose up pgadmin
```

Because `pgadmin` depends on `postgres`, Docker Compose will run the `postgres` first.

Now you can access pgAdmin via your web browser with http://localhost:1111

### Using Traefik

[Traefik](https://docs.traefik.io/) is a reverse proxy gateway server. For developing, it can allow you to have easily accessible URLs on your local dev environment.

Here's an example `docker-compose.yml` that uses Postgres, with pgAdmin, with Traefik for the reverse proxy:

```
version: '3'
services:

  traefik:
    image: traefik:2.2
    command:
      - --providers.docker.defaultRule=Host(`{{ normalize .Name }}.docker.localhost`)
      - --api.insecure=true
    ports:
      - "80:80"
      - "8080:8080"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro

  postgres:
    image: postgres:10.8-alpine
    environment:
      POSTGRES_USER: "username"
      POSTGRES_PASSWORD: "password"
    expose:
      - "5432"
    labels:
      traefik.http.services.postgres.loadbalancer.server.port: 5432
    depends_on:
      - traefik

  pgadmin:
    image: dpage/pgadmin4:4.11
    expose:
      - "1111"
    environment:
      PGADMIN_LISTEN_PORT: "1111"
      PGADMIN_DEFAULT_EMAIL: "pgadmin@example.com"
      PGADMIN_DEFAULT_PASSWORD: "password"
    labels:
      traefik.http.services.pgadmin.loadbalancer.server.port: 1111
    depends_on:
      - traefik
      - postgres
```

Run:

```
$ docker-compose up traefik
```

Navigate to http://localhost:8080 to see the Traefik dashboard.

![Traefik](/media/blog/docker/traefik.png)

Navigate to http://pgadmin-{folder-name}.docker.localhost to access pgAdmin, make sure to replace `{folder-name}` with the name of the folder which your `docker-compose.yml` is stored in!

## Lazydocker

```
lazydocker
```

## Why use Docker and Docker Compose?

The traditional way of installing a service (such as database server) is to:

- download an executable and install it
- run through the setup wizard

This mean dealing with these problems:

- sharing the setup process with a coworker is difficult
- the service (often) runs on startup
- the service keeps running in the background even when not developing
- running parallel versions is difficult
- deleting the service from file system leaves artifacts behind
- each service ties up a port, causing conflicts if 2 services try to use the same one

Docker solves these issues. Docker itself can cause some overhead when running services, but everything inside it is encapsulated. If a service is no longer needed, only the container needs to be deleted, and it's like it was never on the computer. If a service misbehaves, it can be quickly binned and recreated to resolve any issues.

Docker Compose streamlines the installation of installing a service. There's no need for an installation wizard to guide the process, instead just a single config file defines everything. The config files can be shared with other people, or saved into the code repository so anyone can see an applications requirements.

## Resources

- https://docs.traefik.io/
- https://hub.docker.com/_/traefik/
- https://blog.thesparktree.com/traefik-advanced-config
- https://docs.docker.com/compose/compose-file
