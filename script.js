let input_todo = document.getElementById("create");

let lista = document.getElementById("lista");

function start() {

    if (localStorage.getItem("id_todo") == null) {
        localStorage.setItem("id_todo", -1);
        console.log()
    }

    if (localStorage.getItem("todo") == null) {
        localStorage.setItem("todo", "[]");
    }

}

function showToDos() {

    all_todos = getToDos();
    let todos = "";
    if (all_todos.length == 0) {
        lista.innerHTML = `<h4 id="empty">Nada para fazer.</h4>`
    }
    for (let i = 0; i < all_todos.length; i++) {

        let checked = "";
        if (all_todos[i].status == true) {
            checked = "checked";
        }

        todos += `
        <li id="${all_todos[i].id}">
        <input type="checkbox" class="cbx" onclick="editStatus(${all_todos[i].id}), refreshCSS(); editStyle(${all_todos[i].id})" ${checked}>
        <input type="text" class="input-item" oninput="editMessage(${all_todos[i].id})" value="${all_todos[i].message}">
        <button class="del" onclick="removeToDo(${all_todos[i].id}); showToDos()">-</button>
        </li>
        `

        lista.innerHTML = todos;
    }
}

function createToDo() {

    let id_todo = localStorage.getItem("id_todo");
    id_todo = parseInt(id_todo) + 1;
    localStorage.setItem("id_todo", id_todo);

    let todo = JSON.parse(localStorage.getItem("todo"));
    todo[todo.length] = {
        "id": id_todo,
        "status": false,
        "message": input_todo.value,
    }

    localStorage.setItem("todo", JSON.stringify(todo));
}

function getToDos() {
    return JSON.parse(localStorage.getItem("todo"));
}

function editStatus(id) {

    let toDos = getToDos();

    let father = document.getElementById(id);
    let child = father.querySelector("input[type=checkbox]");

    let editIndex = toDos.map(todo => todo.id).indexOf(id);
    toDos[editIndex].status = child.checked;

    localStorage.setItem("todo", JSON.stringify(toDos));

}

function editMessage(id) {
    let toDos = getToDos();
    let father = document.getElementById(id);
    let child = father.querySelector("input[type=text]");

    let editIndex = toDos.map(todo => todo.id).indexOf(id);
    toDos[editIndex].message = child.value;

    localStorage.setItem("todo", JSON.stringify(toDos));

}

function removeToDo(id) {
    let toDos = getToDos();

    let removeIndex = toDos.map(todo => todo.id).indexOf(id);
    toDos.splice(removeIndex, 1);

    localStorage.setItem("todo", JSON.stringify(toDos));

    let element = document.getElementById(id)
    element.parentNode.removeChild(element);
}

function editStyle(id) {
    let toDos = getToDos();
    let editIndex = toDos.map(todo => todo.id).indexOf(id);
    let statusId = toDos[editIndex].status;

    let father = document.getElementById(id);
    let inputText = father.querySelector("input[type=text]");
    let inputCheckbox = father.querySelector("input[type=checkbox]");

    if (statusId == true) {
        inputText.setAttribute("class", "input-item checked")
    } else {
        inputText.setAttribute("class", "input-item")
    }

}

refreshCSS = () => {
    let links = document.getElementsByTagName('link');
    for (let i = 0; i < links.length; i++) {
        if (links[i].getAttribute('rel') == 'stylesheet') {
            let href = links[i].getAttribute('href')
                .split('?')[0];

            let newHref = href + '?version=' +
                new Date().getMilliseconds();

            links[i].setAttribute('href', newHref);
        }
    }
}