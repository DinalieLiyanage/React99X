
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


    // deletes a todo item
    deleteItem = (id) => {
        return new Promise((resolve, reject) => {

            this.findItemById(id).then(deletingItem => {

                if (deletingItem.value !== null) {

                    var list = this.filterTodos();

                    list.splice(deletingItem.i, 1)

                    localStorage.setItem('todoList', list)

                    resolve(list)
                }

                reject(null)
            })
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

        alert("filter todos");
        return JSON.parse(localStorage.getItem("todoList"))

        // 


    }

    saveTodoItem = (item) => {
        alert("Save to do service");
        return new Promise((resolve, reject) => {
            if (item) {
                var list = this.filterTodos();
                list.push(item)
                localStorage.setItem("todoList", JSON.stringify(list))
                resolve(list);
            } else {
                reject("Cannot save the item")
            }
        })
    }




}

export default Utils

