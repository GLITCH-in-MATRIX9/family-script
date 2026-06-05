# Family Script - Database Entity Design

## Purpose

This document defines all database entities, relationships, constraints, and business rules before implementation in Prisma.

Stack:

* Next.js
* BetterAuth
* Prisma
* Neon PostgreSQL

---

# Domain Overview

## Authentication Domain

* User
* Account
* Session
* Verification
* PasswordReset

---

## Tree Domain

* Tree
* TreeMember
* FamilyNode
* TreeRelationship
* Invitation

---

## Story Domain

* Story
* StoryVersion
* StoryMedia
* StoryPrompt
* StoryTag

---

## Communication Domain

* Conversation
* ConversationMember
* Message
* MessageAttachment
* Meeting

---

## Publishing Domain

* PublishedStory
* Book
* BookOrder

---

## System Domain

* Notification
* AuditLog

---

# Entity Definitions

---

# User

## Purpose

Represents a registered user of Family Script.

## Fields

* id
* name
* username
* email
* passwordHash
* emailVerifiedAt
* image
* phone
* bio
* status
* createdAt
* updatedAt

## Relationships

User
├── Account (1:M)
├── Session (1:M)
├── TreeMember (1:M)
├── Story (1:M)
├── Message (1:M)
├── Invitation (1:M)
├── Notification (1:M)
└── AuditLog (1:M)

---

# Account

## Purpose

OAuth provider accounts linked to a user.

Examples:

* Google
* Microsoft
* GitHub

## Fields

* id
* userId
* provider
* providerAccountId
* accessToken
* refreshToken
* expiresAt

---

# Session

## Purpose

Active login sessions.

## Fields

* id
* userId
* token
* expiresAt
* ipAddress
* userAgent
* createdAt

---

# Verification

## Purpose

Email verification tokens.

## Fields

* id
* identifier
* token
* expiresAt

---

# PasswordReset

## Purpose

Password reset requests.

## Fields

* id
* userId
* token
* expiresAt
* usedAt

---

# Tree

## Purpose

Represents a Family Tree, Organization Tree, or Tribe Tree.

## Types

* FAMILY
* ORGANIZATION
* TRIBE

## Fields

* id
* name
* description
* type
* ownerId
* createdAt
* updatedAt

## Relationships

Tree
├── TreeMember (1:M)
├── FamilyNode (1:M)
├── Invitation (1:M)
└── Story (1:M)

---

# TreeMember

## Purpose

Membership of a user within a tree.

## Roles

* OWNER
* EDITOR
* CONTRIBUTOR
* VIEWER

## Fields

* id
* treeId
* userId
* role
* joinedAt

---

# FamilyNode

## Purpose

A visual node inside a tree.

Represents:

* Person
* Employee
* Friend

## Fields

* id
* treeId
* userId (nullable)
* name
* photo
* dateOfBirth
* dateOfMarriage
* dateOfDemise
* occupation
* bloodGroup
* healthNotes
* location
* createdAt

---

# TreeRelationship

## Purpose

Connects two nodes.

Examples:

* Parent
* Child
* Spouse
* Sibling
* Friend
* Manager

## Fields

* id
* sourceNodeId
* targetNodeId
* relationshipType

---

# Invitation

## Purpose

Invite a user to join a tree.

## Fields

* id
* treeId
* email
* role
* token
* invitedById
* acceptedAt
* expiresAt

---

# Story

## Purpose

User-created story.

Can originate from:

* Family Tree
* Organization Tree
* Tribe Tree

## Fields

* id
* treeId
* authorId
* title
* content
* status
* createdAt
* updatedAt

## Status

* DRAFT
* REVIEW
* PUBLISHED
* ARCHIVED

---

# StoryVersion

## Purpose

Version history of stories.

## Fields

* id
* storyId
* content
* versionNumber
* createdAt

---

# StoryMedia

## Purpose

Media attached to stories.

## Types

* IMAGE
* VIDEO
* AUDIO
* DOCUMENT

## Fields

* id
* storyId
* mediaType
* url
* createdAt

---

# StoryPrompt

## Purpose

Prompt used to generate story content.

## Fields

* id
* storyId
* prompt
* response

---

# StoryTag

## Purpose

Categorization and search.

## Fields

* id
* name

---

# Conversation

## Purpose

Chat room associated with a tree.

## Fields

* id
* treeId
* title
* createdAt

---

# ConversationMember

## Purpose

Participants inside conversations.

## Fields

* id
* conversationId
* userId

---

# Message

## Purpose

Messages inside conversations.

## Fields

* id
* conversationId
* senderId
* content
* createdAt
* editedAt

---

# MessageAttachment

## Purpose

Files attached to messages.

## Fields

* id
* messageId
* url
* fileType

---

# Meeting

## Purpose

Scheduled video meetings.

## Fields

* id
* treeId
* title
* scheduledAt
* meetingUrl
* createdBy

---

# PublishedStory

## Purpose

Publicly visible published stories.

## Fields

* id
* storyId
* publishedAt
* visibility

---

# Book

## Purpose

Compiled book generated from stories.

## Fields

* id
* userId
* title
* coverImage
* pdfUrl
* createdAt

---

# BookOrder

## Purpose

Physical book orders.

## Fields

* id
* bookId
* userId
* quantity
* shippingAddress
* status

---

# Notification

## Purpose

System notifications.

## Fields

* id
* userId
* title
* message
* readAt
* createdAt

---

# AuditLog

## Purpose

Track important system actions.

## Fields

* id
* userId
* action
* entityType
* entityId
* metadata
* createdAt

Examples:

* LOGIN
* LOGOUT
* INVITE_MEMBER
* REMOVE_MEMBER
* PUBLISH_STORY
* DELETE_TREE
