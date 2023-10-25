

const taskList = document.getElementById('taskList');
let searchText = document.getElementById('searchText');
const addButton = document.getElementById('zapiszButton');
const inputTask = document.getElementById('inputAddRow');
let date = document.getElementById("dateItem");
let todayDate = new Date();

let taskTab = [];



function addItem() {
    if (inputTask.value === '') {
        alert("Wpisz zadanie do wykonania!");
    } else if (inputTask.value.length < 3 || inputTask.value > 255) {
        alert("Zadanie musi mieć od 3 do 255 znaków!");
    } else if (date.value < todayDate.toISOString().slice(0, 10)) {
        alert("Data nie może być późniejsza niż dzisiaj!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputTask.value;
        taskList.appendChild(li);

        let dateSpan = document.createElement("span");
        dateSpan.innerHTML = date.value;
        dateSpan.addEventListener('dblclick', enableDateEditing);
        li.appendChild(dateSpan);

        let img = document.createElement("img");
        img.src = "remove.png";
        img.className = "taskImg";
        dateSpan.appendChild(img);

        taskTab.push({
            content: li.innerHTML,
            imgSrc: "remove.png"
        });
    }
    inputTask.value = "";
    store();
}

function updateRow(event) {
    let target = event.target;
    if (target.tagName === "LI") {
        if (target.classList.value === "tick") {
            target.classList.value = "";
            store();
        } else {
            target.classList.value = "tick";
            store();
        }
    } else if (target.tagName === "IMG") {
        event.target.parentElement.parentElement.remove();
        store();
    }
}
function store(){
    localStorage.setItem("dataList", taskList.innerHTML);
}
function restore(){
    taskList.innerHTML = localStorage.getItem("dataList");

}
function filter(){

    searchText = document.getElementById('searchText');
    let filter = searchText.value.trim().toLowerCase();

    let liList = taskList.getElementsByTagName("li");
    if(filter.length>=2 ) {

        for (let i = 0; i < liList.length; i++) {
            liList[i].classList.remove("highlighted");

            if (liList[i].innerText.toString().toLowerCase().includes(filter)) {
                liList[i].classList.toggle("highlighted");
                console.log(liList[i]);

               // const mark = document.createElement("mark");
               // mark.textContent = filter;
                //liList[i].innerHTML = liList[i].innerText.toLowerCase().replace(filter, mark.outerHTML);

            } else {
                liList[i].classList.remove("highlighted");

                //restore();
            }
        }

    }
    else {
        for (let i = 0 ; i < liList.length; i++ ){
            liList[i].classList.remove("highlighted");

            //restore();
        }
    }

}

function enableDateEditing(event) {
    const target = event.target;
    if (target.tagName === "SPAN") {
        const currentText = target.innerText;
        const input = document.createElement("input");
        input.type = "date";
        input.value = currentText;

        input.addEventListener("blur", () => {
            const newDate = input.value;
            target.innerText = newDate;
            input.replaceWith(target);
            store();
        });

        target.replaceWith(input);
        input.focus();
    }
}


taskList.addEventListener('click', updateRow);
addButton.addEventListener('click',addItem);
searchText.addEventListener('keyup', filter);
taskList.addEventListener('dblclick', enableDateEditing);

restore();




