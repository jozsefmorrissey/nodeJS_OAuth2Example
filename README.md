# nodeJS_OAuth2Example

# Terms
- exposure - how available the users data will be within your application.
  - public - everyone can view.
  - connected - only those with a direct connection to you can view.
  - private - only the identified user can view/edit.
- attribute - name of the value/property.
- scope - the names of the attributes of the user you wish to access. Along with the level of exposure:
<pre>             scope=[exposure1]:[attribute1] [exposure2]:[attribute2] [exposure3]:[attribute3]...</pre>

## api
### /data
- Call
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

### /login
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
  - Authorization: Basic czZCaGRSa3F0MzpnWDFmQmF0M2JW
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

### /register/user
- Call
  - Content-Type: application/x-www-form-urlencoded
  - Authorization: Basic czZCaGRSa3F0MzpnWDFmQmF0M2JW
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

### /register/client
- Call
  - Content-Type: application/x-www-form-urlencoded
  - Authorization: Basic czZCaGRSa3F0MzpnWDFmQmF0M2JW
  - Parameters
    - loginId=[unique: recommend not using identifiable values]
    - password=[length >= 12: recommend using diceware atleast 5 words]
    - email=[email]
    - redirectUri=[redirect uri]

- Response
  - Success (200)
  - Failure - error message indicating the following
    - Invalid loginId (400)
    - Invalid password (400)
    - Invalid email (400)

### /diceware/password/:count
- Call
  - Content-Type: text/plain

-Response
  -body
    <pre>             [password]</pre>
