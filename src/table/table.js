import "./table.css";
import tableHTML from"./table.html";
export default async function table(){
    document.body.innerHTML=tableHTML;
    let table = document.getElementById("table-body");
    await fetch("https://burachoh.herokuapp.com/burachok").then (async (obj)=>{
        obj=  JSON.parse(await obj.text());
       obj.forEach((user,i)=>{
            table.children[i].children[0].innerHTML = i;
            table.children[i].children[1].innerHTML = user.LastName;
            table.children[i].children[2].innerHTML = user.FirstName;
            table.children[i].children[3].innerHTML = user.Score
       } )
    });
}