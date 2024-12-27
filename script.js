let form = document.querySelector('form');
let input = document.getElementById('todo-input');
let todoul = document.getElementById('todo-list');
let alertText = document.getElementById('alert-text');
let alert = document.querySelector(".alert-container");
let ok = document.querySelector(".ok-button");
let no = document.querySelector(".no-button");
let currentIndex = null;

let allTodo = getTodo();    
updateTodoList();


form.addEventListener('submit', (e) => {
    e.preventDefault();
    addTodo();
})

function addTodo() {
    const text = input.value.trim();
    if (text.length > 0) {
        const todoObject = {
            text: text,
            complete: false,
        }
        allTodo.push(todoObject);
        updateTodoList();
        saveTodo();
        input.value = '';
    }
    else {
        no.style.display = 'none';
        alertText.textContent = "Please enter somthing in the input field !";
        ok.textContent = 'OK';
        alert.classList.remove("hide-show");
        // console.log('hi');
        ok.addEventListener("click", () => {
            alert.classList.add("hide-show");
            // console.log('hi');
            alertText.textContent = "";

        })
    }
}

function updateTodoList() {
    todoul.innerHTML = '';
    allTodo.forEach((text, index) => {
        todoItme = createTodoItem(text, index);
        todoul.append(todoItme);
    })
}

function createTodoItem(text, index) {
    let name = 'todo-' + index;
    let todoli = document.createElement('li');
    let todoText = text.text;
    todoli.className = 'todo';
    todoli.innerHTML = `
     <input type="checkbox" id="${name}">
                <label class="custom-checkbox" for="${name}">
                    <svg fill="transparent" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
                </label>
                <label for="${name}" class="todo-text">
                   ${todoText}
                </label>
                <button class="todo-delete" >
                    <svg fill="var(--secondary-color)" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                </button>
    `;

    let checkBox = todoli.querySelector('input');
    checkBox.checked = text.complete;
    checkBox.addEventListener('change', () => {
        allTodo[index].complete = checkBox.checked;
        saveTodo();
    })

    let todoDelete = todoli.querySelector('.todo-delete');
    todoDelete.addEventListener('click', () => {
        currentIndex = index;
        alertText.textContent = 'Want to delete the todo item?';
        no.style.display = 'block';
        ok.textContent = 'YES';
        no.textContent='NO';
        alert.classList.remove("hide-show");
    });
    return todoli;
}

no.addEventListener("click", () => {
    alert.classList.add("hide-show");
    alertText.textContent = "";
    currentIndex = null;
});

ok.addEventListener("click", () => {
    if (currentIndex !== null) {
        deleteTodo(currentIndex);
        currentIndex = null;
    }
    alert.classList.add("hide-show");
    alertText.textContent = "";
});
function deleteTodo(index) {
    allTodo = allTodo.filter((_, i) => {
        return i !== index;
    });
    saveTodo();
    updateTodoList();
}

function saveTodo() {
    let todoJson = JSON.stringify(allTodo);
    localStorage.setItem("StoredTodo", todoJson);
}

function getTodo() {
    const todoJson = localStorage.getItem("StoredTodo") || '[]';
    return JSON.parse(todoJson);
}













let root = document.querySelector(":root");
// saveColor();
function Color() {

    let color = document.getElementById("color").value;
    let newColor = `hsl(${color}, 89%, 56%)`;
    // localStorage.setItem('color',newColor);
    // localStorage.setItem('value',color);
    root.style.setProperty('--accent-color', newColor);
}
// function saveColor(){
//     let color = localStorage.getItem('color') ;
//     let newvalue = localStorage.getItem('value');
//     document.getElementById("color").value=newvalue;
//     return root.style.setProperty('--accent-color',color);
// }



let openColorBox = document.querySelector('.color-slider svg:first-child');
let closeColorBox = document.querySelector('.color-slider svg:nth-child(2)');
let colorBox = document.getElementById('color-slider');

openColorBox.addEventListener("click", () => {
    colorBox.classList.remove('tweak');
})
closeColorBox.addEventListener("click", () => {
    colorBox.classList.add('tweak');
})