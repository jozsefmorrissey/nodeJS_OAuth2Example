const vars
vars.host = 'https://localhost:8000';
vars.redirectUri = 'https%253A%252F%252Fclient.example.org%252Fcb';
vars.scope = 'public:username private:email';
vars.clientSecret = 'aAj87YXi7EYJfWApIwsyuKUZvyyzNksNcUQmQhvsyRcCivNjFYOH5czkSpNPKLXt&state=af0ifjsldkj';
vars.clientId = 'x9CSeK9CnVA5TbsoZeUR2eeDw9QiySwMQKT1PdIVtaBm5yZ5Q3V9vYy62UMmPw1u';
vars.loginId = 'tAndJ';
vars.passord = 'qqqq';

function buildFormData() {
  const varKeys = Object.keys(vars);
  const dataStr = ''
  for (let index = 0; index < arguments.length; index += 1) {
    const arg = arguments[index];
    if (keys.indexOf(arg) > -1) {
        dataStr += `${arg}=${vars[arg]}&`;
    } else {
      dataStr += `${arg}&`
    }
  }
  return dataStr.substr(0, dataStr.length - 1);
}

function buildParams() {
  return `?${buildFormData.apply(null, arguments)}`;
}

function callLogin() {
  let data = buildFormData("response_type=code",
              `client_id`
              `scope`
              'state'
              `redirect_uri`];

  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.addEventListener("readystatechange", function() {
    if(this.readyState === 4) {
      console.log(this.responseText);
    }
  });

  xhr.open("POST", `${host}/auth/login?grant_type=authorization_code&response_type=code&scope=${scope}&client_id=${clientId}&client_secret=${clientSecret}&redirect_uri=${redirectUri}`);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  xhr.send(data);
}



function login() {

}
