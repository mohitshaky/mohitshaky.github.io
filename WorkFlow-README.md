# WorkFlow — Configurable Approval & Workflow Backend

> A production-ready, configurable workflow backend built with **Spring Boot 3**, **PostgreSQL**, **Redis**, and **OAuth2**. Supports multi-step approval processes, email notifications, Docker & Kubernetes deployment.

---

## ✨ Features

- 🔄 **Configurable multi-step workflows** — define approval chains dynamically
- 🔐 **OAuth2 / Spring Security** — secure API with resource server & JWT
- 📧 **Email notifications** — notify users at each workflow step via Spring Mail
- ⚡ **Redis caching** — fast state lookups and session management
- 🗄️ **PostgreSQL + Flyway** — versioned schema migrations, production-safe
- 📖 **Swagger / OpenAPI** — auto-generated API docs at `/swagger-ui/index.html`
- 🐳 **Docker Compose** — one-command local setup
- ☸️ **Kubernetes** — K8s manifests included for cloud deployment
- 🧪 **Testcontainers** — integration tests with real DB instances

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Language | Java 21 |
| Framework | Spring Boot 3.5 |
| Security | Spring Security + OAuth2 Resource Server |
| Database | PostgreSQL + Flyway migrations |
| Cache | Redis |
| Messaging | Spring Mail (SMTP) |
| API Docs | SpringDoc OpenAPI (Swagger UI) |
| Mapping | MapStruct |
| Observability | Micrometer + Zipkin tracing |
| Testing | JUnit 5 + Testcontainers |
| Deployment | Docker Compose + Kubernetes |

---

## 🚀 Quick Start (Docker Compose)

```bash
git clone https://github.com/mohitshaky/WorkFlow.git
cd WorkFlow
docker compose up --build
```

- **API:** http://localhost:8080
- **Swagger UI:** http://localhost:8080/swagger-ui/index.html
- **PostgreSQL:** `localhost:5432` (db: `workflow`, user: `wf`, password: `wf`)

---

## 🔧 Local Development

1. Start only the database:
```bash
docker compose up -d db
```

2. Copy environment config:
```bash
cp .env.example .env
# Edit .env with your local settings
```

3. Run the app:
```bash
./mvnw spring-boot:run
```

---

## 📡 API Endpoints

### Start a Workflow
```http
POST /api/workflows/start
Content-Type: application/json

{
  "workflowId": 1,
  "initiator": "alice"
}
```

### Complete a Task
```http
POST /api/workflows/tasks/complete
Content-Type: application/json

{
  "taskId": 1,
  "user": "alice"
}
```

Full API reference available at `/swagger-ui/index.html` when running locally.

---

## ☸️ Kubernetes Deployment

```bash
kubectl apply -f k8s/
```

K8s manifests are located in the `/k8s` directory.

---

## 🧪 Running Tests

```bash
./mvnw test
```

Integration tests use **Testcontainers** to spin up a real PostgreSQL instance — no mocking.

---

## 📁 Project Structure

```
WorkFlow/
├── workflow-backend-service/   # Main Spring Boot application
│   ├── src/
│   │   ├── main/java/          # Application source code
│   │   └── test/               # Integration tests
│   ├── pom.xml
│   └── Dockerfile
├── k8s/                        # Kubernetes manifests
├── docker-compose.yml          # Local dev setup
├── docker-compose.prod.yml     # Production setup
├── deploy.sh                   # Deployment script
└── .env.example                # Environment variable template
```

---

## 📄 License

MIT License — feel free to use this as a reference or starting point for your own projects.

---

> 👨‍💻 Built by [Mohit Shakya](https://www.linkedin.com/in/mohit-shakya-9ab944110/) — Backend Developer with 6+ years in Java, Spring Boot & Microservices.
