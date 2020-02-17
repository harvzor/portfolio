# Building

> Use drone.io to build.

You'll need to install the Drone CLI:

https://docs.drone.io/cli/install/

I'm using drone version 1.2.1.

## Send image to Docker Hub

Create a `secrets.yml` in the root:

```
docker_password: "00000000-0000-0000-0000-000000000000 "
```

Run Drone Docker image build:

```
drone exec --pipeline docker --secret-file secrets.yml
```
