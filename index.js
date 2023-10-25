document.addEventListener('DOMContentLoaded', function () {
  const button = document.getElementById('get_todos');
  const checkbox = document.getElementById('checkbox2');

  // Add event listener
  if (button) {
    // Check if button is not null
    button.addEventListener('click', handleClick);
  }

  if (checkbox) {
    checkbox.addEventListener('change', handleCheckboxChange);
  }
  // Event handler function
  

  function handleCheckboxChange() {
    console.log('Checked', this.checked);
  }
});

// 1. Get real users list from https://jsonplaceholder.typicode.com/
// 2. When setting user ID get this user ToDos
// 3. When checking a todo, set it's status to done and send the "completed" value to server using PUT


// FETCH 

const getUsers = async ()=>{
  const usersResponse = await fetch('https://jsonplaceholder.typicode.com/users');
  users= await usersResponse.json();

  const ul = document.createElement('ul');
  ul.classList.add('user-list');
  const usersWrapper = document.getElementById('users')

users.forEach((users)=>{
  const li = document.createElement('li')

    const spanName=document.createElement('span')
    spanName.classList.add('user-name')
    spanName.textContent=users.name;


    const spanId= document.createElement('span')
    spanId.classList.add('user-id')
    spanId.textContent=users.id

  
    li.appendChild(spanId);
    li.appendChild(spanName);
    ul.appendChild(li);

})

  usersWrapper.appendChild(ul);
}

getUsers();



const button = document.getElementById('get_todos')
 

function handleClick(){


  let errorMessage = document.getElementById('error-message');
  let userId = document.getElementById('user-id-input').value;

  if(userId<=10&&userId>0){
    errorMessage.textContent=`Correct ID ${userId}`
  } 
  else {
    errorMessage.textContent=`Incorrect ID ${userId}`
    errorMessage.style.color= 'red';
  }

  fetch(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`)  
    .then((response)=>response.json())
    .then((todos)=> generateTodos(todos))
    .catch((error)=>console.log(error))

   

    function generateTodos(todos){

      const todosWrap= document.getElementById('todos-wrapper'); 

      const ul = document.createElement('ul')
      ul.classList.add('todos-list')

      const currentUl = todosWrap.querySelector('ul');
      if (currentUl) todosWrap.removeChild(currentUl);


      todos.forEach((todo)=>{
        const li = document.createElement('li')
        li.classList.add('todo-li')


        const checkbox= document.createElement('input')
        checkbox.type = 'checkbox';
        checkbox.classList.add('checkbox')


        const spanTitle=document.createElement('span')
        spanTitle.classList.add('todo-title')
        spanTitle.textContent=todo.title;


        const spanCompleted= document.createElement('span')
        spanCompleted.classList.add('todo-completed')
        checkbox.checked = todo.completed;
        spanCompleted.textContent=todo.completed ? 'Done' : 'Not done';

        checkbox.addEventListener('change', function () {
          spanCompleted.textContent = checkbox.checked ? 'Done' : 'Not done';
        });


        li.appendChild(checkbox);
        li.appendChild(spanTitle);
        li.appendChild(spanCompleted);
        
        ul.appendChild(li);
      })
      todosWrap.appendChild(ul);
    }



}



























