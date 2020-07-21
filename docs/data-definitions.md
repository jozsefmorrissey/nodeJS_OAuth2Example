<table>
  <caption>Data Definitions</caption>
  <tr>
    <th>name</th>
    <th>type</th>
    <th>format</th>
  </tr>
  <tr>
    <td>name</td>
    <td>string</td>
    <td>/^[A-Za-z0-9-_]{1,64}$/</td>
  </tr>
  <tr>
    <td>fullName</td>
    <td>string</td>
    <td>/^([A-Z][a-z]*( |)){2,}$/</td>
  </tr>
  <tr>
    <td>json</td>
    <td>Any Valid Json Object</td>
    <td>{}</td>
  </tr>
  <tr>
    <td>loginId</td>
    <td>string</td>
    <td>/^[A-Za-z0-9-_]{8,64}$/</td>
  </tr>
  <tr>
    <td>password</td>
    <td>string</td>
    <td>/^[A-Za-z0-9-_]{8,64}$/</td>
  </tr>
  <tr>
    <td>email</td>
    <td>string</td>
    <td>/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/</td>
  </tr>
  <tr>
    <td>profiles</td>
    <td>Json Object</td>
    <td><pre>
      {
        profileName1: {},
        profileName2: {},
              .
              .
              .
      }
      </pre></td>
  </tr>
</table>

Note: Email regex taken from [stack overflow](https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript?page=1&tab=votes#tab-top)


Jozsef Morrissey
Fred Dude Spinach Axel
