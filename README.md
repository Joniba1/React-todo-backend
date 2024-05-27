# TodoList Backend API

This repository contains the backend API for the TodoList application. The API facilitates the management of tasks, allowing users to create, update, delete, and retrieve tasks for their todo lists.

## Getting Started

To run the repository for the first time, follow these steps:

1. Ensure that Docker and Docker Compose are installed on your system.
2. Clone this repository to your local machine.
3. Navigate to the root directory of the cloned repository.
4. Run the following command to build and start the application:

```bash
docker-compose up --build
```

After the initial setup, you can simply use the following command to start the application:

```bash
docker-compose up
```

## Usage

Once the application is running, you can interact with the API using your preferred HTTP client (e.g., Postman, cURL) or integrate it into your frontend application.

### Endpoints

- **GET /tasks**: Retrieve all tasks.
- **GET /tasks/{id}**: Retrieve a specific task by its ID.
- **POST /tasks**: Create a new task.
- **PUT /tasks/{id}**: Update an existing task.
- **DELETE /tasks/{id}**: Delete a task.

For detailed information on request and response formats, please refer to the API documentation.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
