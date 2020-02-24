# SSL

Struggling to get SSL to work on Google Cloud.

The issue is my application runs on port 80 and I need a certificate. On my server I run letsencrypt which works well, but requires manual setup.

## Signing the certificate on Google Cloud

I could create a Google load balancer but that seems a bit overkill? I might need to pay for a proper certificate.

What I need:

- this application running on port 3000
- NGINX running on 80/443 as a reverse proxy to the app
- something to run LetsEncrypt

Google Compute Engine only really supports running one Docker container, not Docker Compose directly. I have 2 options:

- use Kubernetes
- create one Docker file based off of `docker/compose` which runs all of the requires services ([guide](https://cloud.google.com/community/tutorials/docker-compose-on-container-optimized-os), [stackoverflow](https://stackoverflow.com/a/40114717), [Nginx and Let’s Encrypt with Docker in Less Than 5 Minutes](https://medium.com/@pentacent/nginx-and-lets-encrypt-with-docker-in-less-than-5-minutes-b4b8a60d3a71))

## Use Cloudflare?

Cloudflare can sign certificates too.

However, my server has SSL certificates (allowing for an SSL connection from Cloudflare to my server), but Google Cloud does not.
