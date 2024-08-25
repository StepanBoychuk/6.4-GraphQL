This is my GraphQL server for user managment

# Getting Started
To run this project, copy it from github and then run

```
docker-compose up
```

# Usage
To interact with API use a GraphQL client such as GraphQL Playground or use Postman

# Schema Overview
## Types
### User

Represents a user in the system.

    id: String! - Unique identifier for the user.
    username: String! - Username of the user.
    firstName: String - First name of the user.
    lastName: String - Last name of the user.
    avatarUrl: String - URL of the user's avatar.
    rating: Int! - User's rating.
    role: String! - Role of the user (e.g., admin, user).
    deletedAt: DateTime - Timestamp of when the user was deleted (if applicable).

###  SignInResponse

Represents the response received after a successful sign-in.

    access_token: String! - JWT access token for the user.
    user: User! - The signed-in user's information.

### Vote

Represents a vote made by a user on another user.

    id: String! - Unique identifier for the vote.
    user: String! - ID of the user who made the vote.
    targetUser: String! - ID of the user who received the vote.
    voteType: Int! - Type of the vote (e.g., upvote, downvote).

### AvatarUploadResponse

Represents the response after requesting an avatar upload URL.

    urlForUpload: String! - Pre-signed URL for uploading the avatar.


## Queries
### findAll: [User!]!

Fetches all users in the system.
### findOne(id: String!): User!

Fetches a single user by their ID.
## Mutations
### updateUser(id: String!, updateUserInput: UpdateUserInput!): User!

Updates the details of an existing user.
### deleteUser(id: String!): User!

Marks a user as deleted.
### signin(signInInput: SignInInput!): SignInResponse!

Authenticates a user and returns an access token and user information.
###  signup(signUpInput: SignUpInput!): User!

Registers a new user in the system.
### vote(voteInput: VoteInput!): Vote!

Records a vote by a user on another user.
### avatarUpload(avatarUploadInput: AvatarUploadInput!): AvatarUploadResponse!

Generates a pre-signed URL for uploading a user's avatar.
## Input Types
### UpdateUserInput

    username: String - Updated username.
    password: String - Updated password.
    firstName: String - Updated first name.
    lastName: String - Updated last name.

### SignInInput

    username: String! - Username of the user.
    password: String! - Password of the user.

### SignUpInput

    username: String! - Username for the new user.
    password: String! - Password for the new user.
    firstName: String - First name of the new user.
    lastName: String - Last name of the new user.

### VoteInput

    targetUser: String! - ID of the user to be voted on.
    voteType: Int! - Type of the vote (e.g., upvote, downvote).

### AvatarUploadInput

    avatarName: String! - Name of the avatar file to be uploaded.