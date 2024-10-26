# Microservices-based Quote API


This project is a simple example of a CRUD-based microservices application. It demonstrates how to handle basic operations in a distributed architecture using various technologies. The application requires user authentication, and access to the API endpoints is secured via JWT tokens.

## Features
This application consists of three microservices:

1. **Authentication** - Handles user authentication using JWT and stores user information in a MongoDB database.
2. **Search** - Allows for searching quotes using Elasticsearch.
3. **Quotes** - Manages CRUD operations for quotes, storing them in MongoDB.

## Technologies Used

-   **Elasticsearch**: For advanced search capabilities
-   **MongoDB**: As the primary database for storing user and other application data
-   **RabbitMQ**: For message brokering and asynchronous communication between microservices

## Service Communication

- **Authentication Flow**:  
  To access the `Search` and `Quotes` services, users must authenticate via the `Authentication` service to receive a JWT. This JWT is included in the headers of each request to access these services. When a request reaches the `Search` or `Quotes` services, they first validate the JWT by sending it to the `Authentication` service via an `auth` queue in RabbitMQ. Only if authentication is successful will the request proceed; otherwise, access is denied.

- **Data Synchronization**:  
  When the `Quotes` service stores a quote in the database, it also sends the quote to the `Search` service through a `search` queue in RabbitMQ, allowing it to be indexed in Elasticsearch for efficient searching.

## Deployment

You can run this application using either **Docker** or **Kubernetes**:

-   **Docker**: A `docker-compose.yml` file is provided in the repository, an NGINX service will function as the API gateway for the application. Please adjust the values in the file to match your requirements before running the application.
-   **Kubernetes (K8s)**: For guidance on running the application in a Kubernetes cluster, refer to the following [link](https://github.com/masterj3y/qter/blob/main/k8s/qter/README.md), all services will be placed behind an Ingress controller, acting as an API gateway.

Additionally, the process of building Docker images and pushing them to Docker Hub is automated using GitHub Actions. This ensures that a Docker image in sync with the current source code is always available. You can easily pull the latest version of the Docker image from Docker Hub and deploy it in your environment.
