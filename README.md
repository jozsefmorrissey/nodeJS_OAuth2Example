# nodeJS_OAuth2Example

# Terms
- scope - the names of the attributes/properties of the user you wish to access.
- exposure - how available the users data will be within your application.
    - public - everyone can view.
    - connected - only those with a direct connection to you can view.
    - private - only the identified user can view/edit.

## api
### /login
#### Parameters
- response_type=code
- scope=[list of attributes]
- client_id=[client_id]
- client_secret=[client_secret]
- state(optional)=[[clientValidationValue](https://tools.ietf.org/html/rfc6749#section-10.12)]
- exposure=(public|connected|private)
