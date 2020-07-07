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
### /login
  - Call
    - Parameters
      - response_type=code
      - scope=[exposure attribute list]
      - client_id=[client id]
      - client_secret=[client secret]
      - state(optional)=[[client validation value](https://tools.ietf.org/html/rfc6749#section-10.12)]

  - Response
    - Parameters
      - code=[authorizationCode]
      - state=[clientState]

### /token
- Call
  - Content-Type: application/x-www-form-urlencoded<br>
  - Authorization: Basic czZCaGRSa3F0MzpnWDFmQmF0M2JW
  - Parameters
    - grant_type=authorization_code
    - code=[authorizationCode]
    - redirect_uri=[Must Match Registered Uri]

- Response
  - Content-Type: application/json<br>
  - Cache-Control: no-store<br>
  - Pragma: no-cache
  - body
<pre>
      {
        "access_token" : "SlAV32hkKG",
        "token_type"   : "Bearer",
        "expires_in"   : 3600,
        "scope"        : "myapi-read myapi-write"
      }
</pre>
