import { v4 } from "uuid";
import "toastify-js/src/toastify.css"
import Toastify from 'toastify-js'

import './style.css'

// Generic
const taskForm = document.querySelector<HTMLFormElement>("#taskForm");
const tasksList = document.querySelector<HTMLDivElement>('#tasksList');

interface Task {
  id: string;
  title: String;
  description: String;
}

let tasks: Task[] = []

taskForm?.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = taskForm["title"] as unknown as HTMLInputElement;
  const description = taskForm["description"] as unknown as HTMLTextAreaElement;

  tasks.push({
    title: title.value,
    description: description.value,
    id: v4()
  })

  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTask(tasks);

  taskForm.reset();
  title.focus();

  Toastify({
    text: "Task added",
    duration: 3000,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: 'right', // `left`, `center` or `right`
    backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
    stopOnFocus: true // Prevents dismissing of toast on hover
  }).showToast();


})

document.addEventListener('DOMContentLoaded', () => {
  tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
  renderTask(tasks);
})

function renderTask(tasks: Task[]) {

  tasksList!.innerHTML = '';

  tasks.forEach((task) => {
    const taskElemet = document.createElement('div');
    taskElemet.className = 'bg-zinc-800 mb-1 p-4 rounded-lg hover:bg-zinc-700 hover:cursor-pointer';

    const header = document.createElement('header');
    header.className = 'flex justify-between';

    const title = document.createElement('span');
    title.innerHTML = `${task.title}`;
    header.append(title);

    const btnDelete = document.createElement('button');
    btnDelete.className = 'bg-red-500 px-2 py-1 rounded-md';
    btnDelete.innerText = 'Delete';
    header.append(btnDelete);

    btnDelete.addEventListener('click', () => {
      const index = tasks.findIndex((t) => t.id === task.id);
      tasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      renderTask(tasks)
    });

    taskElemet?.append(header);

    const id = document.createElement('p');
    id.className = 'text-gray-400 text-xs';
    id.innerText = task.id;
    taskElemet?.append(id);

    let description = document.createElement('p');
    description.innerHTML = `${task.description}`;
    taskElemet.append(description);
    tasksList?.append(taskElemet)
  })
}