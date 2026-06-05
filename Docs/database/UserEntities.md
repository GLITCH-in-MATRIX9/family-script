# User Entity

## Purpose

Represents a registered Family Script user.

A user can:

* Create Family Trees
* Join Family Trees
* Create Stories
* Publish Stories
* Upload Media
* Send Messages
* Participate in Meetings
* Receive Invitations
* Own Multiple Trees
* Belong to Multiple Trees

This entity stores only account-level information.

Tree-specific information such as relationships, family details, health records, and membership roles are stored in separate entities.

---

# Fields

| Field           | Type     | Required | Description                          |
| --------------- | -------- | -------- | ------------------------------------ |
| id              | String   | Yes      | Primary Key                          |
| name            | String   | Yes      | User display name                    |
| username        | String   | No       | Unique public username               |
| email           | String   | Yes      | Login email                          |
| passwordHash    | String   | No       | Hashed password for credential login |
| emailVerifiedAt | DateTime | No       | Timestamp of email verification      |
| image           | String   | No       | Profile image URL                    |
| status          | Enum     | Yes      | Current account status               |
| createdAt       | DateTime | Yes      | Account creation timestamp           |
| updatedAt       | DateTime | Yes      | Last update timestamp                |

---

# User Status

```text
ACTIVE
SUSPENDED
DELETED
```

### ACTIVE

User can access all permitted features.

### SUSPENDED

User account is temporarily disabled.

### DELETED

Soft-deleted account retained for audit purposes.

---

# Constraints

## Email

Must be unique.

```text
UNIQUE(email)
```

Examples:

```text
anjali@gmail.com
rahul@gmail.com
```

Not allowed:

```text
anjali@gmail.com
anjali@gmail.com
```

---

## Username

Must be unique if present.

```text
UNIQUE(username)
```

Allowed:

```text
@anjali
@rahul
```

Not allowed:

```text
@anjali
@anjali
```

---

# Indexes

## Email Index

Used for:

* Login
* Verification
* Invitations
* Password Reset

```text
INDEX(email)
```

---

## Username Index

Used for:

* Search
* Profile URLs
* Mentions

```text
INDEX(username)
```

---

## Status Index

Used for:

* Moderation
* Admin Dashboard
* User Filtering

```text
INDEX(status)
```

---

# Relationships

```text
User
│
├── Account (1:M)
├── Session (1:M)
├── Verification (1:M)
├── PasswordReset (1:M)
│
├── TreeMember (1:M)
├── Story (1:M)
├── Message (1:M)
├── Meeting (1:M)
│
├── Invitation (1:M)
├── Notification (1:M)
└── AuditLog (1:M)
```

---

# Business Rules

### Rule 1

Every user must have a unique email address.

---

### Rule 2

A user may register using:

* Email + Password
* Google OAuth
* Microsoft OAuth

---

### Rule 3

A user may belong to multiple trees simultaneously.

Example:

```text
Family Tree A -> OWNER

Organization Tree B -> CONTRIBUTOR

Friend Tribe C -> VIEWER
```

Roles are not stored in the User entity.

They belong to TreeMember.

---

### Rule 4

Deleting a user should not physically remove records.

Use soft deletion through status.

---

# Future Enhancements

* Two Factor Authentication (2FA)
* Phone Verification
* Social Login Expansion
* Profile Customization
* Public User Profiles

---

# Notes

The User entity stores only authentication and profile information.

Family information, relationships, health details, tree hierarchy, and story content are handled by dedicated entities.
