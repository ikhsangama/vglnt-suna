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
- [ ] Examine the project structure and documentation
- [ ] Read through the README.md and understand the architecture

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
- [ ] Test web search integration
  - Firecrawl is working
![img_2.png](img_2.png)
![img_3.png](img_3.png)

## 7. Code Analysis and Understanding (2 hours)
- [ ] Analyze the agent execution flow in backend/agent/
- [ ] Understand the tool system architecture
- [ ] Examine the frontend components and API integration
- [ ] Study the database schema and data models

## 8. Custom Feature Implementation (4 hours)

Choose ONE of the following features to implement:

### Option A: Custom Tool Integration
- [ ] Create a new tool in backend/agent/tools/
- [ ] Implement a weather API integration tool
- [ ] Add the tool to the agent's toolkit
- [ ] Test the tool functionality through chat interface

### Option B: Frontend Enhancement
- [ ] Add a new dashboard component for conversation analytics
- [ ] Implement conversation export functionality (JSON/PDF)
- [ ] Add dark/light theme toggle
- [ ] Enhance the chat interface with message reactions