# Day 1: Environment Setup and Basic Configuration

## Morning (4 hours)

### 1. Prerequisites Setup (1.5 hours)
- [x] Set up development environment with Python 3.11 and Node.js
- [x] Install Docker and Docker Compose
- [x] Request access for accounts to the required services:
  - Supabase (database and authentication)
  - Upstash or local Redis instance
  - Daytona (agent execution environment)
  - Anthropic API (for Claude integration)

### 2. Repository Setup (1 hour)
- [x] Fork the Suna repository to your GitHub account
- [x] Clone the repository locally
- [x] Examine the project structure and documentation
- Frontend
  - **`/app`**: Contains the application routes using Next.js App Router
    - **`/auth`**: Authentication-related pages (login, signup, reset password)
    - **`/(dashboard)`**: Dashboard and authenticated user routes
      - **`/dashboard`**: Main dashboard page
      - **`/agents`**: Agent management pages
      - **`/(teamAccount)/[accountSlug]`**: Team-specific pages
    - **`/invitation`**: Team invitation acceptance page

  - **`/components`**: Reusable UI components
    - **`/basejump`**: Team management components
    - **`/thread`**: Conversation thread components
    - **`/ui`**: Basic UI components (buttons, cards, etc.)

  - **`/hooks`**: Custom React hooks
    - **`/react-query`**: Data fetching hooks organized by feature

  - **`/lib`**: Utility functions and services
    - **`/actions`**: Server actions for form submissions
    - **`/supabase`**: Supabase client configuration

  - **`/contexts`**: React context providers
  - **`/providers`**: Application providers (Auth, React Query, etc.)
- Backend
  - **`/agent`**: Core AI agent implementation
    - **`/sample_responses`**: Teach AI with sample response as reference
    - **`/tools`**: Various tools
      - **`/data_providers`**: For different services with API calls from RapidAPI
  - **`/agentpress`**: Manage AI agent interactions and execution, like how to handle context and thread
  - **`/docs`**: Document files
  - **`/logs`**: Generated logs by agentpress system
  - **`/sandbox`**: To create a Docker-based virtual environment (host in Daytona) that agents use as their own computer to execute tasks, access the web, and manipulate files
  - **`/services`**: Core infrastructure service (llm, supabase, redis, billing, langfuse)
  - **`/supabase`**: Migration files, supabase config, etc
  - **`/utils`**: Authentication, file handling, logger, S3 upload, config managements
- [x] Read through the README.md and understand the architecture

### 3. Service Configuration (1.5 hours)
- [x] Create and configure Supabase project
- [x] Set up Redis instance (via Upstash or Docker)
- [x] Configure Daytona workspace
- [x] Obtain necessary API keys (Anthropic, Tavily, Firecrawl)

## Afternoon (4 hours)

### 4. Environment Configuration (2 hours)
- [x] Configure backend .env file with all required credentials
- [x] Configure frontend .env.local file
- [x] Set up Supabase database schema using migrations
- [x] Verify all service connections

### 5. Initial Deployment (2 hours)
- [x] Install backend dependencies (pip install -r requirements.txt)
- [x] Install frontend dependencies (npm install)
- [x] Start services using Docker Compose
- [x] Verify application is running on localhost:3000
- [x] Test basic authentication flow

# Day 2: Feature Development and Integration

## 6. Core Functionality Testing (2 hours)
- [x] Create user account and test authentication
![img.png](img.png)
- [x] Test basic chat functionality
![img_1.png](img_1.png)
- [x] Verify agent execution environment is working
  - Daytona is spin up and working
![img_5.png](img_5.png)
![img_4.png](img_4.png)
- [x] Test file management capabilities
  - Can do upload file
![img_6.png](img_6.png)
- [x] Test web search integration
  - Firecrawl is working
![img_2.png](img_2.png)
![img_3.png](img_3.png)

## 7. Code Analysis and Understanding (2 hours)
- [x] Analyze the agent execution flow in backend/agent/
  - Entry points at `api.py` and API endpoints defined in `/agent/api.py` with `/api` prefix
  - Definition: Everytime a user creates a new conversation (series of related chat), it is considered as a new project,
  - A new project then will create a new thread (refer to: `@router.post("/agent/initiate"`)
  - Each new chat in a thread, it will trigger a new agent
  - Thread can have multiple agents, but a project can only have a new thread (but the DB actually supports 1 to many relations to thread)
- [x] Understand the tool system architecture
  - `data_providers_tool.py`
    - Registry for all providers to collect data
    - Providers located in `/agent/tools/data_providers`
    - Providers inherits from `RapidDataProviderBase`
    - Providers are some APIs that are listed in RapidAPI
    - To make new providers recognized, need to update the system prompt as well in `/agent/prompt.py` section `2.2.7 DATA PROVIDERS`
  - `web_search_tool.py`
    - Perform web searches using TavilyAPI
    - Perform extract text context from web pages using FireCrawlAPI
  - `sb_browser_tool.py`
    - Browser automation for web interaction (click button by element, take screenshot)
  - `sb_vision_tool.py`
    - Read images files from the file system
  - `sb_files_tool.py`
    - File operations in the sandbox
  - `sb_shell_tool.py`
    - Shell command execution
  - `computer_use_tool.py`
    - General computer operations
  - `sb_deploy_tool.py`
    - Site deployment operation using CloudFlareAPI
  - `sb_expose_tool.py`
    - Exposing services from the sandbox
  - `message_tool.py`
    - Messaging capabilities, web-browser take over
- [ ] Examine the frontend components and API integration
  - Frontend
    - #TODO
  - Backend
    - Agent API endpoints:
      - **`POST /thread/{thread_id}/agent/start`**: Start an agent for a specific thread in background
      - **`POST /agent-run/{agent_run_id}/stop`**: Stop running agent
      - **`GET /thread/{thread_id}/agent-runs`**: Get all agents runs for a specific thread
      - **`GET /agent-run/{agent_run_id}`**: Get details of specific agent run
      - **`GET /agent-run/{agent_run_id}/stream`**: Stream real-time responses from an agent run
      - **`POST /agent/initiate`**: Create a new agent
- [ ] Study the database schema and data models (I try to focus on project / agent capabilities)
  - Tables
    - `projects`
      - Schema: Top level container for conversations
      - Fields: `project_id`, `name`, `description`, `account_id`, `sandbox`, `is_public`
    - `threads`
      - Schema: Conversation threads within projects
      - Fields: `thread_id`, `account_id`, `project_id`, `is_public`
    - `messages`
      - Individual messages within threads
      - Fields: `message_id`, `thread_id`, `type`, `is_llm_message`, `content`, `metadata`
      - Content is stored as JSONB for flexibility (#TODO)
    - `agents`
      - Execution instances of AI agents
      - Fields: `id`, `thread_id`, `status`, `started_at`, `completed_at`, `responses`, `error`
  - Table Relations
    - Account -> Project (1:N)
    - Project -> Threads (1:N)
    - Thread -> Messages (1:N)
    - Project -> Agent Runs (1:N)
    - Thread -> Agent Runs (1:N)

## 8. Custom Feature Implementation (4 hours)

Choose ONE of the following features to implement:

### Option A: Custom Tool Integration
- [x] Create a new tool in backend/agent/tools/
- [x] Implement a weather API integration tool
- [x] Add the tool to the agent's toolkit
- [x] Test the tool functionality through chat interfaces
- Weather api functionality is working
![img_8.png](img_8.png)

### Option B: Frontend Enhancement
- [ ] Add a new dashboard component for conversation analytics
- [ ] Implement conversation export functionality (JSON/PDF)
- [ ] Add dark/light theme toggle
- [ ] Enhance the chat interface with message reactions