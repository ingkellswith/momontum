const toDoForm=document.querySelector(".js-toDoForm");
const toDoInput=toDoForm.querySelector("input");
const toDoList=document.querySelector(".js-toDoList");
const TODOS_LS="toDos";
let toDos=[];

function paintToDo(text){
    const li=document.createElement("li");
    const delBtn=document.createElement("button");
    const span=document.createElement("span");
    delBtn.innerText="❌";
    delBtn.addEventListener("click",deleteToDo);
    const newId=toDos.length+1;
    
    //아래는 html에 li를 추가하기 위해 쓴 코드
    span.innerText=text;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id=newId;//li에 id추가하는 법
    toDoList.appendChild(li);

    //아래는localStorage에 저장하기 위해 쓴 코드
    const toDoObj={
        text:text,//첫번째 text는 새로 생성한 변수고 두 번째 text는 파라미터
        id:newId
    };
    toDos.push(toDoObj);
    saveToDos();
}

function deleteToDo(event){
    const btn=event.target;
    const li=btn.parentNode;//parentNode같이 object의 key를 모르겠으면 console.dir이용
    //btn.parentNode는 li를 의미하는데 li는 id를 가지고 있으므로 li를 구별 가능
    console.log(li);
    toDoList.removeChild(li);
    const cleanToDos=toDos.filter(function(toDo){//toDos는 배열
        //return toDo.id!==li.id; 숫자형,문자형 구별잘해야함 자료형 모르겠으면 console.log사용
        console.log(toDo.id,li.id);
        console.log("and");
        return toDo.id!==parseInt(li.id);//parseInt는 string을 숫자로 바꿈
    });//filter는 true값만 선택해서 받은 다음 array로 리턴함
    toDos=cleanToDos;//이것 때문에 toDos는 const자료형이 될 수 없음
    //배열 안의 요소는 변경가능하지만 배열 자체를 다른 배열로 변경할 수는 없기 때문
    saveToDos();//toDos업데이트
 
}

function saveToDos(){
    localStorage.setItem(TODOS_LS,JSON.stringify(toDos));
    //LocalStorage는 string만 인식하므로 json을 string으로 바꿔준 것
}

function handleSubmit(event){
    event.preventDefault();//이거 안하면 페이지 새로고침됨
    const currentValue=toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value="";
}



function loadToDos(){
    const loadedtoDos=localStorage.getItem(TODOS_LS);
    if(loadedtoDos!==null){
        const parsedToDos=JSON.parse(loadedtoDos);
        //loadedtoDos는 그냥 배열인 반면
        //parse한 parsedToDos는 object로 변경된다.
        //console.log띄워보면 앎
        parsedToDos.forEach(function(toDo){
            paintToDo(toDo.text);
        });//parsedToDos는 Object


    }
}

function init(){
    loadToDos();
    toDoForm.addEventListener("submit",handleSubmit);
}

init();