const resetbtn=document.querySelector(".resetbtn");


function deleteName(){
    if(localStorage.getItem("currentUser") !== null){
    localStorage.removeItem("currentUser");
window.location.reload()}
}

resetbtn.addEventListener("click",deleteName);

