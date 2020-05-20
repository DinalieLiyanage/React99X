
class Utils {


    // finds user by ID
    findItemById = (id) => {

        return new Promise((resolve, reject) => {

            var list = JSON.parse(localStorage.getItem('todoList'));

            for (const [i, value] of list.entries()) {

                if (value.id === id) {

                    resolve({ i, value })
                }
            }
            reject(null)
        })
    }


    // delete a todo item   
    deleteItem = (id) => {
        return new Promise((resolve, reject) => {

            this.findItemById(id).then(deletingItem => {

                if (deletingItem.value !== null) {

                    var list = this.filterTodos();

                    list.splice(deletingItem.i, 1)

                    localStorage.setItem('todoList', JSON.stringify(list))

                    resolve(list)
                }

                reject(null)
            })
        })




    }

    updateTodoItem = (position, item) => {

        return new Promise((resolve, reject) => {

            var list = this.filterTodos()

            if (list !== null) {

                list.splice(position, 1, item)

                console.log("updated list" + JSON.stringify(list))

                resolve(list)

            }

        })
        
    }


    filterTodos = (filter) => {
        console.log(filter)
        var filteredTodos = []
        if (filter !== undefined) {

            var todos = JSON.parse(localStorage.getItem("todoList"))
            if (todos !== null) {
                todos.forEach(todo => {
                    if (todo.completed === filter) {

                        filteredTodos.push(todo)
                    }
                })
            }


            return filteredTodos;
        }


        return JSON.parse(localStorage.getItem("todoList"))

        // 


    }

    saveTodoItem = (item) => {

        // alert("Save to do service");
        return new Promise((resolve, reject) => {
            if (item !== null) {
                console.log("In here")
                var list = this.filterTodos();

                list.push(item)
                console.log("listing" + JSON.stringify(list))

                localStorage.setItem("todoList", JSON.stringify(list))
                resolve(list);
            }
        })
    }




}

export default Utils

