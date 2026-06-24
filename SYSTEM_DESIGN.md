# SYSTEM_DESIGN.md

# Overview

MathLogic is a knowledge-centric educational platform designed to help learners understand mathematical problem-solving methods rather than memorize solutions.

The system focuses on representing:

* Concepts
* Methods
* Procedural Steps
* Examples
* Learning Paths
* Progress Tracking

The objective is to create a structured educational knowledge system capable of supporting thousands of learners while maintaining clear separation between educational content, learning workflows, and platform infrastructure.

---

# Problem Statement

Traditional learning platforms suffer from several limitations:

### Content-Centric Learning

Most platforms store:

* PDFs
* Videos
* Notes
* Question Banks

but do not explicitly model:

* Problem-solving procedures
* Learning dependencies
* Method relationships

---

### Knowledge Duplication

The same concept often appears:

```text
Chapter
↓
Notes
↓
Examples
↓
Assignments
↓
Exams
```

with duplicated explanations.

---

### Weak Progress Tracking

Most systems measure:

```text
Video Watched
```

rather than:

```text
Method Understood
```

---

# System Goals

The platform should:

### Functional Goals

* Store educational knowledge
* Organize methods
* Organize procedural steps
* Track learner progress
* Support curriculum mapping
* Support reusable content structures

---

### Non-Functional Goals

* High Read Performance
* Maintainability
* Extensibility
* Scalability
* Reliability

---

# High-Level System Architecture

```text
                User
                  │
                  ▼
         React Frontend
                  │
                  ▼
            API Layer
                  │
        ┌─────────┴─────────┐
        ▼                   ▼
 PostgreSQL           Auth Service
 Knowledge Store       Supabase
```

The system follows a layered architecture.

Each layer has a single responsibility.

---

# Component Breakdown

## Frontend Layer

Technology:

* React
* Vite

Responsibilities:

* User Interface
* Progress Visualization
* Learning Navigation
* Content Rendering

The frontend should remain stateless wherever possible.

Business logic should not be tightly coupled to UI components.

---

# API Layer

Purpose:

Acts as the communication boundary between frontend and backend.

Responsibilities:

* Data Retrieval
* Progress Updates
* Search
* Recommendations

Future implementations may use:

* Spring Boot
* Node.js
* Supabase Edge Functions

---

# Knowledge Store

Technology:

* PostgreSQL

Responsibilities:

* Store educational entities
* Store relationships
* Store progress data

The database acts as the source of truth.

---

# Authentication Layer

Technology:

* Supabase Auth

Responsibilities:

* User Identity
* Session Management
* Access Control

Authentication remains independent of educational content.

---

# Core Domain Model

The system models knowledge as structured relationships.

```text
Regulation
    ↓
Subject
    ↓
Unit
    ↓
Topic
    ↓
Method
    ↓
Step
    ↓
Example
```

This hierarchy becomes the foundation of all educational workflows.

---

# User Flow

## Explore Subject

```text
User
↓
Select Subject
↓
View Units
↓
View Topics
↓
View Methods
↓
Start Learning
```

---

# Method Learning Flow

```text
Topic
↓
Method
↓
Step 1
↓
Step 2
↓
Step 3
↓
Example
↓
Completion
```

This transforms learning into a measurable sequence.

---

# Progress Tracking Flow

```text
User
↓
Complete Step
↓
Update Progress
↓
Recalculate Method Completion
↓
Recalculate Topic Completion
↓
Update Dashboard
```

Progress propagates upward through the hierarchy.

---

# Read Traffic Analysis

Expected usage pattern:

```text
Read Operations
≈ 95%

Write Operations
≈ 5%
```

Examples:

Read:

* Open Topic
* Open Method
* Open Example

Write:

* Update Progress
* Create Content

This heavily influences system design decisions.

---

# Scalability Strategy

## Phase 1

Expected Users:

```text
0 → 1,000
```

Architecture:

```text
React
↓
Supabase
↓
PostgreSQL
```

Single database is sufficient.

---

## Phase 2

Expected Users:

```text
1,000 → 50,000
```

Introduce:

* Query Optimization
* Indexing
* API Caching

---

## Phase 3

Expected Users:

```text
50,000+
```

Introduce:

* CDN
* Search Engine
* Materialized Views
* Read Replicas

---

# Database Optimization

Most common query:

```sql
Get Methods For Topic
```

Index:

```sql
topic_id
```

---

Common query:

```sql
Get Progress For User
```

Index:

```sql
user_id
```

---

Common query:

```sql
Get Topics For Subject
```

Index:

```sql
subject_id
```

---

# Caching Strategy

## Why Caching?

Educational content changes infrequently.

Example:

```text
Laplace Transform Method
```

may remain unchanged for months.

Repeated database reads become wasteful.

---

# Cache Candidates

Highly Cacheable:

* Topics
* Methods
* Examples
* Learning Paths

Less Cacheable:

* User Progress
* Recommendations

---

# Search System

Future search functionality.

## Search Inputs

```text
Topic Name

Method Name

Keyword

Concept
```

---

# Search Flow

```text
User Query
↓
Search Service
↓
Knowledge Retrieval
↓
Rank Results
↓
Display Results
```

Future implementation may use:

* PostgreSQL Full Text Search
* Elasticsearch
* Vector Search

---

# Recommendation Engine

Future feature.

Purpose:

Help learners determine:

```text
What should I learn next?
```

---

# Recommendation Flow

```text
User Progress
↓
Completed Topics
↓
Dependency Analysis
↓
Generate Recommendations
↓
Display Learning Path
```

---

# Learning Dependency Graph

Example:

```text
Matrices
↓
Determinants
↓
Eigenvalues
↓
Eigenvectors
```

The graph allows the system to generate progression recommendations.

---

# Analytics System

Future analytics include:

* Topic Completion Rate
* Method Completion Rate
* Average Learning Time
* Most Difficult Topics
* Most Effective Methods

---

# Reliability Considerations

The system must ensure:

### Data Integrity

Progress updates must never be partially applied.

Use transactions.

---

### Authentication Reliability

User progress must always belong to the correct user.

Use secure identity management.

---

### Content Reliability

Methods and examples should remain version-controlled.

Future versions may introduce content versioning.

---

# Security Considerations

## Authentication

Supabase Auth

---

## Authorization

Users may:

* Read Public Content
* Modify Only Their Progress

---

## Data Protection

Never expose:

* Internal identifiers
* Administrative controls
* Direct database access

---

# Future Evolution

## Version 1

Knowledge Repository

---

## Version 2

Progress Tracking

---

## Version 3

Recommendation Engine

---

## Version 4

Adaptive Learning

---

## Version 5

Cross-Domain Learning Network

Potential domains:

* Mathematics
* Physics
* Programming
* Control Systems
* Algorithms

---

# Tradeoffs

## Why Relational Database?

Chosen because:

```text
Topic → Method

Method → Step

User → Progress
```

are relationship-heavy structures.

A relational model provides:

* Integrity
* Query Flexibility
* Consistency

---

## Why Method-Centric Design?

Because educational success often depends on:

```text
Knowing the Procedure
```

rather than:

```text
Knowing the Definition
```

The architecture therefore elevates methods into primary system entities.

---

# Conclusion

MathLogic is designed as a structured knowledge platform rather than a traditional content platform.

Its system design prioritizes:

* Knowledge Representation
* Procedural Learning
* Relationship Modeling
* Progress Measurement
* Scalable Educational Workflows

The long-term vision is to transform educational content into a navigable knowledge network that helps learners understand not only what a concept is, but how it is applied, when it should be used, and what should be learned next.
