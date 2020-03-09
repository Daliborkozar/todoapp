
//Elements
const clear = document.querySelector(".clear")
const dateElement = document.getElementById("date")
const list = document.getElementById("list")
const input = document.getElementById("input")

//Variables and array for local storage
let LIST , id

//local storage update - every part of code where the list is updated
//localStorage.setItem("todo", JSON.stringify(LIST))



//CSS classes

const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

let data=localStorage.getItem("todo")

if(data){
    LIST = JSON.parse(data)
    id = LIST.length
    loadList(LIST)
}else {
    LIST =[]
    id =0
}

//function that Load LIST in the user interface from localStorage
function loadList(array){
    array.forEach(function(item){
        addToDo(item.name,item.id,item.done,item.trash)
    });
}


//Show todays date
const options = {weekday: 'long', month: 'long', day:'numeric'}
const today = new Date()

dateElement.innerHTML = today.toLocaleDateString("en-US", options);

function addToDo(toDo, id, done, trash){

    if(trash){return} /// stops if trash

    const DONE = done ? CHECK : UNCHECK
    const LINE = done ? LINE_THROUGH : " "

    const item = `<li class="item">
        <i class="fa ${DONE} co" job="complete" id="${id}"></i>
        <p class="text ${LINE}">${toDo}</p>
        <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
        </li>
    `
    
    list.insertAdjacentHTML('beforeend',item)
}



document.addEventListener("keyup", function(e){
    if(e.keyCode == 13){
        const toDo = input.value
            if(toDo){
                addToDo(toDo,id,false,false)

                LIST.push({
                    name: toDo,
                    id: id,
                    done: false,
                    trash: false
                })
                //local storage update - every part of code where the list is updated
                localStorage.setItem("todo", JSON.stringify(LIST))
                id++
            }
            input.value=""
    }
})


// toggle the check uncheck and line through
function completeToDo(element){
    element.classList.toggle(CHECK)
    element.classList.toggle(UNCHECK)
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH)

    // update the list for done or not
    LIST[element.id].done = LIST[element.id].done ? false : true

    

}
    //remove element and update list to trash
function removeTodo(element){
    element.parentNode.parentNode.removeChild(element.parentNode)

    LIST[element.id].trash = true
    

}

//click listener that will mark completed todo and removeToDo
//if clicked on element with icon switch icon
//if clicked on element trash remove whole child element

list.addEventListener('click', function(e){
    const element = e.target
    const elementJob = element.attributes.job.value
        if(elementJob == "complete"){
            completeToDo(element)
        }else if(elementJob == "delete"){
            removeTodo(element)
        }
        //local storage update - every part of code where the list is updated
        localStorage.setItem("todo", JSON.stringify(LIST))
})

