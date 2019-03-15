import "./login.css";
import loginHTML from "./login.html";

export function login(ConfigurationObject,callback) {

    document.body.innerHTML = loginHTML;
    let FistName = document.getElementById("FirstName");
    let LastName = document.getElementById("LastName");
    let register = document.getElementById("register");
    register.addEventListener("click",  () => {
        ConfigurationObject.FirstName=FirstName.value;
        ConfigurationObject.LastName=LastName.value;
        callback();
    });
}


export async function writeInDatabse(ConfigurationObject,callback) {
    let {FirstName,LastName,Score}=ConfigurationObject;
    await fetch("https://burachoh.herokuapp.com/burachok", {
        method: 'POST', body: JSON.stringify({
            FirstName,
            LastName,
            Score,
        }), headers: { 'content-type': 'application/json' }
    }).then(console.log)
    callback();
};

