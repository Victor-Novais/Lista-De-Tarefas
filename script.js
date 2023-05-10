
const form = document.getElementById('form-tarefa');
const input = document.getElementById('input-tarefa');
const listaTarefas = document.getElementById('tarefas');


let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];


function renderizarTarefas() {
    listaTarefas.innerHTML = '';
    tarefas.forEach(function (tarefa, indice) {
        const li = document.createElement('li');
        li.innerHTML = `
      <span>${tarefa}</span>
      <button class="editar" data-indice="${indice}">Editar</button>
      <button class="excluir" data-indice="${indice}">Excluir</button>
    `;
        listaTarefas.appendChild(li);
    });
}


function adicionarTarefa(event) {
    event.preventDefault();
    const tarefa = input.value.trim();
    if (tarefa) {
        tarefas.push(tarefa);
        input.value = '';
        salvarTarefas();
        renderizarTarefas();
    }
}


function excluirTarefa(indice) {
    tarefas.splice(indice, 1);
    salvarTarefas();
    renderizarTarefas();
}


function editarTarefa(indice) {
    const tarefa = prompt('Digite a nova descrição da tarefa:', tarefas[indice]);
    if (tarefa) {
        tarefas[indice] = tarefa;
        salvarTarefas();
        renderizarTarefas();
    }
}


function salvarTarefas() {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}


function adicionarListeners() {
    listaTarefas.addEventListener('click', function (event) {
        const elemento = event.target;
        if (elemento.classList.contains('excluir')) {
            excluirTarefa(elemento.dataset.indice);
        } else if (elemento.classList.contains('editar')) {
            editarTarefa(elemento.dataset.indice);
        }
    });
};
const toggleThemeBtn = document.getElementById('toggle-theme-btn');
const body = document.body;


const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    body.classList.add(currentTheme);
}


toggleThemeBtn.addEventListener('click', function () {

    const theme = body.classList.contains('dark') ? 'light' : 'dark';


    body.classList.remove('light', 'dark');
    body.classList.add(theme);


    localStorage.setItem('theme', theme);
});


renderizarTarefas();
adicionarListeners();


form.addEventListener('submit', adicionarTarefa);

