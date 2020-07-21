# Client Server

### /login
- Call
  - GET
  - parameters
    - loginId
- Response
  - Content-Type: text/html
  - Login page

### /register
- Call
  - GET
- Response
  - Content-Type: text/html
  - Registration page

### /validate
- Call
  - GET
  - Authorization: Bearer [access_token]
  - parameters
    - loginId
- Response
  - Success (200)
  - Failure
    - expiredToken (400)
    - invalidToken (400)
    - loginIdDoesNotMatchToken (400)
