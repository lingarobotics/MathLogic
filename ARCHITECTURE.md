# ARCHITECTURE.md

## Overview

MathLogic is a knowledge-centric educational platform designed to teach procedural mathematical understanding through structured methods rather than answer memorization.

Unlike conventional educational systems that focus primarily on content delivery, MathLogic focuses on knowledge organization, method representation, learning pathways, and measurable learning progression.

The architecture is intentionally designed around a central principle:

> Educational value comes from organizing knowledge effectively, not merely storing information.

The platform therefore treats methods, steps, learning paths, and educational relationships as first-class architectural entities.

---

# Architectural Philosophy

Most educational platforms follow a content-centric architecture.

Typical structure:

```text
Content
↓
Storage
↓
Display
↓
Student
```

Examples include:

* Notes
* PDFs
* Videos
* Question Banks
* Solved Examples

The assumption is that learners will independently discover the reasoning process connecting a problem to its solution.

MathLogic challenges this assumption.

Instead, the platform adopts a knowledge-centric architecture.

```text
Concept
↓
Method
↓
Steps
↓
Examples
↓
Progress
```

The platform is designed to explicitly model the reasoning process itself.

---

# Core Architectural Principles

## Principle 1 — Knowledge Over Content

The system prioritizes:

* Concepts
* Methods
* Learning Paths
* Dependencies
* Progress

rather than documents and static learning materials.

---

## Principle 2 — Methods Are First-Class Entities

Most educational systems organize information around topics.

MathLogic organizes information around methods.

Students often understand:

* Concepts
* Formulae
* Definitions

but fail to solve problems because they cannot determine:

> What should I do next?

Methods become the primary learning unit.

---

## Principle 3 — Relationships Represent Knowledge

The system stores educational relationships explicitly.

Example:

```text
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

Knowledge emerges from these relationships.

---

## Principle 4 — Learning Must Be Measurable

The platform is designed to track:

* Topic Completion
* Method Completion
* Step Completion
* Learning Path Progress

Learning should be observable rather than assumed.

---

## Principle 5 — Content and Logic Must Remain Separate

Educational content changes frequently.

Application behavior changes less frequently.

Keeping them independent improves:

* Maintainability
* Scalability
* Extensibility

---

# High-Level Architecture

```text
User
↓
React Frontend
↓
Supabase Services
↓
PostgreSQL Database
```

The architecture intentionally remains simple.

Complexity is concentrated inside the knowledge model rather than infrastructure.

---

# System Components

## Frontend Layer

Technology:

* React
* Vite
* TypeScript (future)
* Component-Based UI

Purpose:

* Knowledge exploration
* Learning workflows
* Progress visualization
* Method navigation

Responsibilities:

* User interaction
* Content presentation
* Learning progression
* State management

The frontend acts as the learner-facing interface.

---

## Backend Services Layer

Technology:

* Supabase
* Edge Functions (Future)

Purpose:

* Authentication
* Data retrieval
* Progress persistence
* Recommendation processing

The backend focuses on educational workflow support rather than heavy business processing.

---

## Data Layer

Technology:

* PostgreSQL

Purpose:

* Knowledge persistence
* Relationship modeling
* Learning structure storage

The database acts as the educational backbone of the platform.

---

# Knowledge Architecture

The educational model follows a structured hierarchy.

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

Every learning object exists independently.

This enables:

* Reuse
* Traceability
* Scalability
* Learning analytics

---

# Subject Architecture

Subjects represent curriculum-level learning domains.

Examples:

```text
Engineering Mathematics I

Engineering Mathematics II

Probability and Statistics
```

Responsibilities:

* Academic organization
* Curriculum mapping
* Learning boundaries

---

# Topic Architecture

Topics represent conceptual learning units.

Examples:

```text
Matrices

Eigenvalues

Laplace Transform
```

Topics define:

* What is being learned

They do not define:

* How problems are solved

---

# Method Architecture

Methods represent reusable problem-solving procedures.

Example:

```text
Topic:
Eigenvalues

Methods:
- Characteristic Equation Method
- Matrix Reduction Method
```

This separation provides:

* Educational flexibility
* Multiple solution approaches
* Method-centric learning

Methods become central entities within the platform.

---

# Step Architecture

Each method consists of ordered procedural steps.

Example:

```text
Step 1:
Construct Characteristic Equation

Step 2:
Expand Determinant

Step 3:
Solve Polynomial

Step 4:
Verify Roots
```

Benefits:

* Procedural clarity
* Progress tracking
* Reduced cognitive load

Steps represent the smallest reusable learning action.

---

# Example Architecture

Examples remain separate from methods.

Structure:

```text
Method
↓
Example A

Method
↓
Example B

Method
↓
Example C
```

Benefits:

* Avoid duplication
* Improve maintainability
* Support multiple problem variations

Methods remain stable while examples evolve.

---

# Learning Path Architecture

Learning paths represent educational progression.

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

Purpose:

Answer:

> What should I learn next?

rather than:

> What content exists?

---

# User Progress Architecture

The system tracks learning at multiple levels.

```text
User
↓
Subject Progress
↓
Topic Progress
↓
Method Progress
↓
Step Progress
```

This enables:

* Granular analytics
* Personalized learning
* Completion tracking

---

# Progress Calculation Model

Example:

Method:

```text
Characteristic Equation Method
```

Contains:

```text
4 Steps
```

Completed:

```text
3 Steps
```

Progress:

```text
75%
```

The system measures procedural mastery rather than content consumption.

---

# Authentication Architecture

Technology:

* Supabase Auth

Responsibilities:

* User identity
* Session management
* Progress ownership
* Personalization

Authentication exists primarily to support learning continuity.

---

# Search Architecture

Future versions will support structured knowledge retrieval.

Search Categories:

```text
Concept Search

Method Search

Topic Search

Learning Path Search
```

Objective:

Knowledge retrieval rather than document retrieval.

---

# Recommendation Architecture

Future recommendation engine:

```text
Completed Topics
↓
Progress Analysis
↓
Recommended Topics
↓
Learning Path Update
```

Purpose:

* Personalized progression
* Reduced decision fatigue
* Adaptive learning

---

# Analytics Architecture

Future analytics may track:

* Topic mastery
* Method mastery
* Learning time
* Completion rates
* Progress velocity

The objective is measuring learning effectiveness.

---

# Scalability Strategy

MathLogic is primarily a read-heavy system.

Typical operations:

```text
Read Topic
Read Method
Read Example
Update Progress
```

Content updates occur relatively infrequently.

Future optimization strategies:

* Query caching
* CDN delivery
* Materialized views
* Precomputed learning graphs
* Search indexing

---

# Architectural Decisions

## Why React?

Supports:

* Interactive learning
* Progressive disclosure
* Dynamic workflows
* Component reuse

---

## Why Vite?

Provides:

* Fast startup
* Fast rebuilds
* Modern development workflow

---

## Why Supabase?

Provides:

* Authentication
* PostgreSQL
* Security policies
* Reduced infrastructure complexity

---

## Why PostgreSQL?

The system is fundamentally relationship-driven.

Examples:

```text
Topic → Method

Method → Step

Method → Example

User → Progress
```

Relational databases naturally model these structures.

---

# Future Architecture Evolution

## Version 1

Focus:

Knowledge Modeling

---

## Version 2

Focus:

Progress Tracking

---

## Version 3

Focus:

Adaptive Learning

---

## Version 4

Focus:

Recommendation Systems

---

## Version 5

Focus:

Cross-Domain Knowledge Networks

Potential domains:

* Physics
* Mechanics
* Programming
* Algorithms
* Control Systems

---

# Architectural Summary

MathLogic is not designed as a content delivery platform.

It is designed as a procedural knowledge system.

The architecture prioritizes:

* Knowledge Representation
* Method Modeling
* Learning Progression
* Relationship Mapping
* Educational Analytics

By treating methods, steps, learning paths, and educational relationships as first-class entities, the platform transforms educational information into structured, navigable, reusable knowledge.

The architecture ultimately supports a single objective:

To help learners acquire methods of thinking rather than memorize solutions.
