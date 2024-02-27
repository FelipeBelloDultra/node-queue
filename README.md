# NodeJS Queue

Backend application built with NodeJS to study queues and asynchronous communication

## How does it work?

Make a http request with POST method to this route:

`[POST]: http://localhost:3333/api/email`

With this body:

`{ "to": "email.to@example.com", "content": "email content" }`

This will add an email trigger to the queue that will run when available.

## How to run locally?

- Clone this repository
- Run the command `cp .env.example .env`
- Run `docker composer up -d`
  - It will create 3 containers:
    - Redis
    - Mailpit (for fake mailboxes)
    - PM2 instance with Queue Worker and API Rest

### Technologies used:

- Redis
- BullMQ
- Typescript
- Docker / Docker compose
- NodeJS
- PM2
