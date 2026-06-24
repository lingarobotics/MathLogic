# DATABASE.md

## Overview

MathLogic is a knowledge-centric educational platform designed to teach procedural mathematical understanding rather than answer memorization.

Unlike traditional learning systems that primarily store notes, PDFs, videos, and solved examples, MathLogic models educational knowledge as structured, reusable relationships.

The database serves as the central representation of educational knowledge and is responsible for storing:

* Academic regulations
* Subjects
* Units
* Topics
* Methods
* Procedural steps
* Examples
* Learning paths
* User progress

The primary objective of the database is not content storage.

The primary objective is knowledge representation.

---

# Database Philosophy

Most educational systems store information in documents.

Example:

```text
PDF
↓
Chapter
↓
Student Reads
```

MathLogic stores educational knowledge as structured entities.

Example:

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

This structure enables:

* Knowledge reuse
* Progress tracking
* Method-centric learning
* Explicit prerequisite relationships
* Adaptive learning workflows

---

# Why PostgreSQL?

MathLogic relies heavily on relationships.

Examples include:

```text
Subject → Unit

Unit → Topic

Topic → Method

Method → Step

Method → Example

User → Progress
```

These relationships naturally align with relational database systems.

PostgreSQL was selected because it provides:

* Strong relational modeling
* Referential integrity
* Transaction support
* Scalability
* Mature ecosystem
* Supabase integration

---

# Core Entity Hierarchy

The educational model follows a strict hierarchy.

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

Each layer exists independently and can evolve without affecting unrelated entities.

---

# Entity Definitions

## Regulations

Represents an academic regulation or curriculum version.

Examples:

* Anna University R2021
* Anna University R2025
* Autonomous Curriculum

### Purpose

A regulation determines:

* Available subjects
* Subject structure
* Learning coverage

### Table

regulations

| Field       | Type      |
| ----------- | --------- |
| id          | UUID      |
| code        | TEXT      |
| name        | TEXT      |
| description | TEXT      |
| created_at  | TIMESTAMP |

---

## Subjects

Represents a complete academic subject.

Examples:

* Engineering Mathematics I
* Engineering Mathematics II
* Probability and Statistics

### Purpose

Subjects organize educational content into curriculum-level learning units.

### Table

subjects

| Field         | Type      |
| ------------- | --------- |
| id            | UUID      |
| regulation_id | UUID      |
| code          | TEXT      |
| name          | TEXT      |
| description   | TEXT      |
| created_at    | TIMESTAMP |

### Relationships

```text
Regulation
    ↓
Subjects
```

One regulation can contain many subjects.

---

## Units

Represents subdivisions within subjects.

Examples:

* Matrices
* Differential Equations
* Probability

### Table

units

| Field       | Type |
| ----------- | ---- |
| id          | UUID |
| subject_id  | UUID |
| title       | TEXT |
| description | TEXT |

### Relationships

```text
Subject
    ↓
Units
```

One subject contains multiple units.

---

## Topics

Represents individual concepts.

Examples:

* Eigenvalues
* Eigenvectors
* Laplace Transform

### Purpose

Topics define conceptual learning boundaries.

A topic does not describe how a problem is solved.

A topic only defines what is being studied.

### Table

topics

| Field       | Type |
| ----------- | ---- |
| id          | UUID |
| unit_id     | UUID |
| title       | TEXT |
| description | TEXT |

---

# Methods

Methods are the most important entity within MathLogic.

A method represents a reusable problem-solving procedure.

Examples:

* Characteristic Equation Method
* Matrix Reduction Method
* Partial Fraction Method

### Why Methods Exist

Traditional learning systems focus on topics.

MathLogic focuses on methods.

Students frequently know the topic but cannot solve the problem.

The missing element is often the method.

### Table

methods

| Field            | Type    |
| ---------------- | ------- |
| id               | UUID    |
| topic_id         | UUID    |
| title            | TEXT    |
| description      | TEXT    |
| difficulty_level | INTEGER |

### Relationships

```text
Topic
    ↓
Methods
```

A topic may contain multiple methods.

---

# Steps

A step represents the smallest reusable learning action.

Example:

```text
Step 1:
Construct characteristic equation

Step 2:
Expand determinant

Step 3:
Solve polynomial
```

### Purpose

Steps allow:

* Fine-grained progress tracking
* Procedural learning
* Step-by-step guidance

### Table

method_steps

| Field       | Type    |
| ----------- | ------- |
| id          | UUID    |
| method_id   | UUID    |
| step_order  | INTEGER |
| title       | TEXT    |
| explanation | TEXT    |

### Relationships

```text
Method
    ↓
Steps
```

One method contains many ordered steps.

---

# Examples

Examples demonstrate method application.

Examples remain separate from methods.

This prevents duplication.

### Example

```text
Characteristic Equation Method
    ↓
Example A

Characteristic Equation Method
    ↓
Example B
```

### Table

examples

| Field             | Type |
| ----------------- | ---- |
| id                | UUID |
| method_id         | UUID |
| title             | TEXT |
| problem_statement | TEXT |
| solution          | TEXT |

---

# Learning Paths

Learning paths define educational progression.

Example:

```text
Matrices
↓
Determinants
↓
Eigenvalues
↓
Eigenvectors
↓
Applications
```

### Purpose

Answer:

"What should I learn next?"

### Table

learning_paths

| Field       | Type |
| ----------- | ---- |
| id          | UUID |
| title       | TEXT |
| description | TEXT |

learning_path_topics

| Field            | Type    |
| ---------------- | ------- |
| id               | UUID    |
| learning_path_id | UUID    |
| topic_id         | UUID    |
| sequence_order   | INTEGER |

---

# User Progress

Progress tracking transforms static content into personalized learning.

### Progress Levels

```text
Subject Progress

Topic Progress

Method Progress

Step Progress
```

### Table

user_progress

| Field                 | Type    |
| --------------------- | ------- |
| id                    | UUID    |
| user_id               | UUID    |
| topic_id              | UUID    |
| method_id             | UUID    |
| completed_steps       | INTEGER |
| total_steps           | INTEGER |
| completion_percentage | DECIMAL |

---

# Authentication

Authentication is managed through Supabase Auth.

MathLogic stores only user references.

### User Table

Managed by Supabase.

Additional profile information may be stored in:

profiles

| Field        | Type      |
| ------------ | --------- |
| user_id      | UUID      |
| display_name | TEXT      |
| created_at   | TIMESTAMP |

---

# Future Database Extensions

Future versions may introduce:

## Recommendations

```text
Completed Topics
↓
Analysis
↓
Recommended Topic
```

Tables:

* recommendations
* recommendation_history

---

## Learning Analytics

Track:

* Learning time
* Completion rate
* Method mastery
* Learning velocity

Tables:

* learning_sessions
* analytics_events

---

## Cross-Domain Knowledge

Future domains:

* Physics
* Mechanics
* Control Systems
* Programming
* Algorithms

Potential schema:

```text
Domain
↓
Subject
↓
Topic
↓
Method
```

---

# Scalability Considerations

MathLogic is primarily read-heavy.

Typical operations:

* View topic
* View method
* View example
* Track progress

Rare operations:

* Content creation
* Method modification

Optimization strategies:

* Query indexing
* Supabase caching
* Materialized views
* CDN delivery
* Precomputed learning structures

---

# Database Design Principles

The database follows five principles.

## 1. Knowledge Over Content

Store relationships, not documents.

## 2. Methods Are First-Class Entities

Methods are more important than solutions.

## 3. Progress Must Be Measurable

Every learning action should be trackable.

## 4. Structure Must Be Reusable

Topics, methods, and examples should remain independent.

## 5. Learning Must Be Navigable

The database should answer:

"What should I learn next?"

not merely:

"What information exists?"

---

# Conclusion

MathLogic's database is designed to represent procedural knowledge rather than educational content.

By modeling regulations, subjects, topics, methods, steps, examples, learning paths, and user progress as explicit relational entities, the system transforms mathematics from a collection of documents into a structured knowledge network.

The database therefore acts as the educational foundation of MathLogic, enabling method-centric learning, measurable progress, and scalable knowledge organization.
