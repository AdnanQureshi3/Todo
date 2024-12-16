const input = document.getElementById("inp");
const addtask = document.getElementById("btn");
const list = document.getElementById("list");

let tasks = JSON.parse(localStorage.getItem("Tasks")) || [];

tasks.forEach((task )=> render(task));

input.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        console.log("entered")
      addtask.click(); // Simulate button click
    }
  });

addtask.addEventListener('click' , () =>{
    const Tasktext = input.value.trim();
    if(Tasktext === "") return;

    const newTask = {
        id: Date.now(), 
        text: Tasktext,
        completed: false,
    };
    tasks.push(newTask);
    input.value = ""; // its clear input
    console.log(tasks);
    save();
    render(newTask)

})

function save(){
    /*Its has key and value, should be string so, we need to convert it into string*/
    // JSON.stringify(tasks) its convert the into string
    localStorage.setItem('Tasks' , JSON.stringify(tasks));

}

function render(task){
    console.log(task);
    const li = document.createElement('li');
    // if(task.completed) li.classList.add("comp");
    li.innerHTML = ` <input type="checkbox" name="" id="box">  <span>  ${task.text}</span>
    <button> delete</button>`;
    

    li.addEventListener('click' , (e) =>{
        if(e.target.tagName === 'BUTTON'){
            tasks = tasks.filter(t => t.id !== task.id)
            li.remove();
            save();
        }
        else if(e.target.id === "box"){

            console.log("clicked");
            task.completed = !task.completed;
            li.classList.toggle('comp');
            save();
        }
    })
    list.appendChild(li);
}