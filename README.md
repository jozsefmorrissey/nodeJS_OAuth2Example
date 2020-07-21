# nodeJS_OAuth2Example

# Mission
## Problem
Personal user information is scattered all over the internet and abused through legal and illegal means.

## Solution
A Gated community of distributed user servers that will become the single source of truth for identification information.

## Goals
- Simple universal user interface.
- Privacy and anonymity restored to the internet.
- Prevention of monopolistic providers.
- Dis-incentification of large scale attacks.
- Standardization of common user data types.
- Reduction of user identification information stored by most applications to an inconsequential id, if read by a third party.


### Simple universal user interface
Creation of a single sign on feature with the simplicity of Googles and Facebook. With an emphasis on privacy like DuckDuckGo.

## Privacy and anonymity restored to the internet
There are two primary ways by which we hope to accomplish this.
- Independent User Server Registration - With our system, users will be able to create their own server, deploy it where ever they wish, and register it to become a part of our network. Its address will be protected by a network of mapping servers to prevent security breaches in our public facing system from compromising their location.

- Creation of garbage profiles for untrusted or superficial applications - The user will be able to create a fake identity to give to the requesting application. An email forwarding service will be provided so that the application is un-aware of the users real email. Generation services will also be provided for any identifying properties.

## Prevention of monopolistic providers.
Only servers that conform to our strict documentation will be allowed to join. This includes all of the transfer endpoints, which allow users to move to another provider if they so wish. We will prosecute anyone who maliciously modifies their program. The free migration of individuals will ensure that any abuse of data will easily be retaliated against and corrected.

## Dis-incentification of large scale attacks
We have to assume that a malicious attacker is only weighing to factors, effort and reward. Risk isn't really a factor in cyber crime, since potential attackers are located all over the world, and for some this risk is virtually 0. So we have to make things more difficult for them. With a network of user servers, an attacker will have to locate a server first. Which will either have to be done one by one by guessing loginIds loginIds. with no grantee on the number of clients on a server. Also no real way to even locate the server in the first place. Since you will either have to find them one by one with loginId manually.  need to hack at least three separate layers of security. In a tree structure that has thousands or even millions of leafs.

## Standardization of common user data types.
One of our other goals is to standardize the format that applications use to express user data. As our client connections grow we will thoughtfully define the data necessary for the connection. While attempting to adequately plan for future data needs.

## Reduction of user identification information stored by most applications to an inconsequential id if read by a third party.
This is by far our most ambitious goal. We hope that other applications can be persuaded to stop storing user information locally. Checking with our service to view the values. This will place limitations on the applications that comply. There will always be some interfaces that required local storage of some data. We ask only that they be transparent and store as little information as possible, for their purposes.

There are two reasons that we should push the internet in this direction.
- Security - reduce the number of places your information can be found.
- Updates - creating a single source of truth for users would drastically improve their digital experience. This can help create user mobility and freedom between like applications. allowing users to own the data they enter, while simultaneously freeing up applications from building their own database and validation logic.



# Terms
- exposure - how available the users data will be within the requesting client application.
  - public - everyone can view.
  - connected - only those with a direct connection to you can view.
  - private - only the identified user can view.
- attribute - name of the value/property.
- scope - the names of the attributes of the user the requesting client application wishes to access. Along with the level of exposure:
<pre>             scope=[exposure1]:[attribute1] [exposure2]:[attribute2] [exposure3]:[attribute3]...</pre>

## api
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

### /register/client
- Call
  - Content-Type: application/x-www-form-urlencoded
  - Authorization: Bearer [access_token]
    - Note: token must be admin
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
