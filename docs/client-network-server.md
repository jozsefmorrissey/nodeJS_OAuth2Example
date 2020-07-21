# Client Network Server

## Api

### /login
- Call
  - GET
  - parameters
    - loginId
- Response
  - Redirect to correct MapServer

### /registered/servers
- Call
  - GET
- Response
  - Content-Type: text/html
  - Links to public registered providers

### /un/claimed
- Call
  - GET
  - parameters
    - loginId
- Response
  - Success (200)
  - Failure
    - loginIdHasBeenTaken (400)
    - loginIdFormatIsInvalid (400)

### /register
- Call
  - POST
  - body
    <pre>
      {
        "host": ???,
        "email": ???,
        "phoneNumber": ???
      }
    </pre>
- Response
  - Content-Type: text/plain
  - Success (201)
  - Failure
    - invalidEmail (400)
    - invalidHost (400)
    - invalidPhoneNumber (400)

### /validate
- Call
  - parameters
    - loginId
- Response
  - Redirect to mapped url
