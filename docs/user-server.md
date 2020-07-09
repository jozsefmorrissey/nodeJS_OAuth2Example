# User Server Requirements

## Data
<table>
  <caption>Profile</caption>
  <tr>
    <th>name</th>
    <th>format</th>
  </tr>
  <tr>
    <td>name</td>
    <td>/^[A-Za-z0-9-\_]{1,64}$/</td>
  </tr>
  <tr>
    <td>json</td>
    <td>Valid Json Object String</td>
  </tr>
</table>

<table>
  <caption>User</caption>
  <tr>
    <th>name</th>
    <th>format</th>
  </tr>
  <tr>
    <td>loginId</td>
    <td>/^[A-Za-z0-9-_]{8,64}$/</td>
  </tr>
  <tr>
    <td>password</td>
    <td>/^[A-Za-z0-9-_]{8,64}$/</td>
  </tr>
  <tr>
    <td>email</td>
    <td>/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/</td>
  </tr>
  <tr>
    <td>Profiles</td>
    <td>[profile1, profile2,... ]</td>
  </tr>
</table>

Note: Email regex found on [stack overflow](https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript?page=1&tab=votes#tab-top)

## Api
### /enter
- Call
  - Content-Type: application/json
  - Cache-Control: no-store
  - Pragma: no-cache
  - Authorization: Bearer [access_token]
    - Note: token must be admin

- Response
  - Success (200)
    - Content-Type: application/json
    - Cache-Control: no-store
    - Pragma: no-cache
    - body
      <pre>
                    {
                      "[attribute1]" : ???,
                      "[attribute2]" : ???,
                            .        : ???,
                            .        : ???,
                            .        : ???,
                    }
      </pre>
- Failure - error message indicating the following
  - Invalid Token (400)

### /code
- Call
  - Parameters
    - response_type=code
    - scope=[exposure1]:[attribute1] [exposure2]:[attribute2]...
    - client_id=[client id]
    - client_secret=[client secret]
    - state(optional)=[[client validation value](https://tools.ietf.org/html/rfc6749#section-10.12)]

- Response
  - Success (200)
    - Parameters
      - code=[authorizationCode]
      - state=[clientState]
  - Failure - error message indicating the following
    - Invalid Credentails (400)
    - Invalid scope Format (400)
    - response_type Not Supported (400)

### /token
- Call
  - Content-Type: application/x-www-form-urlencoded
  - Parameters
    - grant_type=authorization_code
    - code=[authorizationCode]
    - redirect_uri=[Must Match Registered Uri]

- Response
  -Success (200)
    - Content-Type: application/json
    - Cache-Control: no-store
    - Pragma: no-cache
    - body
    <pre>
              {
                "access_token" : "SlAV32hkKG",
                "token_type"   : "Bearer",
                "expires_in"   : 3600,
                "scope"        : "[exposure1]:[attribute1] [exposure2]:[attribute2]..."
              }
    </pre>
    - Failure - error message indicating the following
      - grant_type Not Supported (400)
      - Invalid code (400)
      - Invalid redirect_uri (400)

### /register
- Call
  - Content-Type: application/x-www-form-urlencoded
  - Authorization: Bearer [access_token]
    - Note: token must be admin
  - Parameters
    - loginId=[unique: recommend not using identifiable values]
    - password=[length >= 12: recommend using diceware atleast 5 words]
    - email=[email]

- Response
  - Success (200)
  - Failure - error message indicating the following
    - Invalid loginId (400)
    - Invalid password (400)
    - Invalid email (400)

### /transfer
-Call
  - Content-Type: application/json
  - Cache-Control: no-store
  - Pragma: no-cache
  - body
    <pre>
                  {
                    "loginId" : ???,
                    "email" : ???,
                    "profiles" : {
                      'name1' : {},
                      'name2' : {},
                         .
                         .
                         .  
                    },
                    clientProfileMap : {
                      'clientId1' : 'profileName1'
                      'clientId2' : 'profileName2'
                            .
                            .
                            .  
                    }
                  }
    </pre>

### /transfer/request
- Call
  - Content-Type: application/x-www-form-urlencoded
  - Authorization: Bearer [access_token]
    - Note: token must be admin
  - Parameters
    - newHost=[A valid and registered user host]

- Response
  - Success (200)
  - Failure - error message indicating the following
    - Invalid newHost (400)

### /transfer/approved
- Call
- Response
  - Success (200)

### /transfer/denied
- Call

- Response
  - Success (200)
