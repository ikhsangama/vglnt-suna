
# VGLNT-Suna Project Documentation

## Project Overview
VGLNT-Suna is a project that build in top of SunaAI

## System Architecture

### Frontend
The frontend is built using Next.js with the App Router architecture:

- **App Structure**:
  - `/app`: Contains application routes
    - `/auth`: Authentication pages (login, signup, password reset)
    - `/(dashboard)`: Dashboard and authenticated user routes
    - `/invitation`: Team invitation acceptance page

- **Components**:
  - `/components`: Reusable UI components
    - `/basejump`: Team management components
    - `/billing`: Billing usage components
    - `/file-renderers`: Response rendering components (markdown, code, PDF)
    - `/home`: Home page components
    - `/thread`: Conversation thread components
    - `/ui`: Basic UI components (buttons, cards, etc.)
    - `/maintenance`: Maintenance page
    - `/payment`: Payment dialog

- **State Management and Utilities**:
  - `/hooks`: Custom React hooks
  - `/lib`: Utility functions and services
  - `/contexts`: React context providers
  - `/providers`: Application providers (Auth, React Query, etc.)

### Backend
The backend is built using FastAPI, handles AI agent execution, tool integration, and service management:

- **Agent System**:
  - `/agent`: Core AI agent implementation
    - `/sample_responses`: Reference AI responses for training
    - `/tools`: Agent capabilities
      - `/data_providers`: Service integrations via RapidAPI

- **Core Services**:
  - `/agentpress`: Manages AI agent interactions and execution
  - `/sandbox`: Docker-based virtual environments for agent task execution, running in Daytona
  - `/services`: Infrastructure services (LLM, Supabase, Redis, billing, Langfuse)
  - `/utils`: Authentication, file handling, logging, S3 upload, configuration

### Database Schema
The system uses Supabase with the following data model:

- **Tables and Relations**:
  - `projects`: Top-level container for conversations
    - Fields: `project_id`, `name`, `description`, `account_id`, `sandbox`, `is_public`
  - `threads`: Conversation threads within projects
    - Fields: `thread_id`, `account_id`, `project_id`, `is_public`
  - `messages`: Individual messages within threads
    - Fields: `message_id`, `thread_id`, `type`, `is_llm_message`, `content`, `metadata`
  - `agents`: Execution instances of AI agents
    - Fields: `id`, `thread_id`, `status`, `started_at`, `completed_at`, `responses`, `error`

- **Relationships**:
  - Account → Project (1:N)
  - Project → Threads (1:N)
  - Thread → Messages (1:N)
  - Project → Agent Runs (1:N)
  - Thread → Agent Runs (1:N)

## Key Concepts

### Conversation Model
- **Project**: Top-level container for related conversations
- **Thread**: A series of related messages within a project
- **Message**: Individual message / chat within threads
- **Agent**: An AI instance that processes and responds to messages in a thread

### Agent Tools
The system includes various tools that extend agent capabilities:

- **Data Provider Tools**: Integration with various APIs via RapidAPI
- **Web Search Tools**: 
  - TavilyAPI for web searches
  - FireCrawlAPI for text extraction from web pages
- **Sandbox Browser Tools**: Browser automation for web interaction
- **Vision Tools**: Image processing capabilities
- **File Management Tools**: File system operations
- **Shell Tools**: Command execution in the sandbox environment
- **Computer Use Tools**: General computer operations
- **Deployment Tools**: Site deployment via CloudFlare API
- **Messaging Tools**: Communication capabilities

## API Endpoints

### Public endpoint
`GET /api/health`: Healthcheck endpoint

### Agent Management endpoint (with `/api` prefix)
- `POST /thread/{thread_id}/agent/start`: Start an agent for a specific thread
- `POST /agent-run/{agent_run_id}/stop`: Stop a running agent
- `GET /thread/{thread_id}/agent-runs`: Get all agent runs for a thread
- `GET /agent-run/{agent_run_id}`: Get details of a specific agent run
- `GET /agent-run/{agent_run_id}/stream`: Stream real-time responses from an agent
- `POST /agent/initiate`: Create a new agent

## Required Services
- **Supabase**: Database and authentication
- **Redis**: Caching and message queuing (via Upstash or local instance)
- **Daytona**: Agent execution environment
- **Anthropic API**: Claude AI integration
- **Additional APIs**: Tavily (search), Firecrawl (web extraction)

## Features
- User authentication and account management
- Team collaboration
- Conversational AI agents
- File upload and management
- Web search integration
- Custom tool data provider integration (e.g: twitter, weather, etc)
- Sandbox environments for agent task execution

## Development Setup
1. Set up Python 3.11, Node.js, Docker, and Docker Compose
2. One-for-all setup 
  ```bash
  python setup.py
  ```
3. Configure service accounts (Supabase, Redis, Daytona, Anthropic)
4. Start services
```bash
# Automate run all with python script
python start.py
```
```bash
# Or, run independently
# first terminal, core service support
cd backend
docker compose up redis rabbitmq

# second terminal, main service
cd backend
poetry run python3.11 api.py

# third terminal, AI agent
cd backend
poetry run python3.11 -m dramatiq run_agent_background

# forth terminal
cd frontend
npm run dev
```
5. Access the application at localhost:3000