# Microservices-based Quote API


This project is a simple example of a CRUD-based microservices application. It demonstrates how to handle basic operations in a distributed architecture using various technologies. The application requires user authentication, and access to the API endpoints is secured via JWT tokens.

## Features

-   User authentication with JWT (JSON Web Token)
-   Microservices-based architecture with Elasticsearch, MongoDB, and RabbitMQ for handling different aspects of the application
-   CRUD operations for managing data

## Technologies Used

-   **Elasticsearch**: For advanced search capabilities
-   **MongoDB**: As the primary database for storing user and other application data
-   **RabbitMQ**: For message brokering and asynchronous communication between microservices

## Deployment

You can run this application using either **Docker** or **Kubernetes**:

-   **Docker**: A `docker-compose.yml` file is provided in the repository. Please adjust the values in the file to match your requirements before running the application.
-   **Kubernetes (K8s)**: For guidance on running the application in a Kubernetes cluster, refer to the following [link](https://github.com/masterj3y/qter/blob/main/k8s/qter/README.md).

Additionally, the process of building Docker images and pushing them to Docker Hub is automated using GitHub Actions. This ensures that a Docker image in sync with the current source code is always available. You can easily pull the latest version of the Docker image from Docker Hub and deploy it in your environment.
