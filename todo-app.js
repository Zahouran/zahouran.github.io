const todos = [{
    text:'Wake Up',
    completed: true
}, {
    text:'Coffee',
    completed: true
}, {
    text:'Breakfast',
    completed: true
}, {
    text:'Empty Dishwasher',
    completed: false
}, {
    text:'Start Working',
    completed: false
}]

const filters = {
    searchText:'',
    hideCompleted: false
}

const todosLeft = document.createElement('p')
let incompletedTodos = 0

const renderTodos = function(todos, filters){
    const filteredTodos = todos.filter(function(todo){
        return todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
    })

    document.querySelector('#todo-list').innerHTML = ''
    document.querySelector('#todo-left').innerHTML = ''
    incompletedTodos = 0

    filteredTodos.forEach(function (todo){
        const filteredTodo = document.createElement('li')
    
        filteredTodo.textContent = todo.text

        if(!filters.hideCompleted || !todo.completed){
            document.querySelector('#todo-list').appendChild(filteredTodo)
        }
        
        if(!todo.completed){
            incompletedTodos ++
        } 
    })
    todosLeft.textContent = `You have ${incompletedTodos} todos left to do.`
    document.querySelector('#todo-left').appendChild(todosLeft)
}

renderTodos(todos, filters)

document.querySelector('#search-todo').addEventListener('input', function(e){
    filters.searchText = e.target.value
    renderTodos(todos, filters)
})

document.querySelector('#new-todo').addEventListener('submit', function(e){
    e.preventDefault()
    if(e.target.elements.newTodo.value){
        todos.push({
            text: e.target.elements.newTodo.value, 
            completed: false
        })
        renderTodos(todos, filters)
        e.target.elements.newTodo.value = ''
    }
})

document.querySelector('#hide-completed').addEventListener('change', function(e){
    filters.hideCompleted = e.target.checked
    renderTodos(todos,filters)
})