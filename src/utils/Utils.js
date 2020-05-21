import { DATE_TIME_FORMAT} from './Contants'
var moment = require('moment');

class Utils {

    // creates todo item
    saveTodoItem = (item) => {


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

    // updates any change of a todo item
    updateTodoItem = (position, item) => {
        item.lastUpdateDate =  new Date() !== null ? moment(new Date(), DATE_TIME_FORMAT) : null;
        return new Promise((resolve, reject) => {

            var list = this.filterTodos()

            if (list !== null) {

                list.splice(position, 1, item)

                console.log("updated list" + JSON.stringify(list))

                localStorage.setItem('todoList',JSON.stringify(list))

                resolve(list)

            }

        })

    }

    //filter todo items
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




    }


    // footer : number of items pluralizing
    remainingItemsFinder = () =>{
        var nonCompletedList = this.filterTodos(false);

        console.log("Length of the non completed"+nonCompletedList.length)

    }





}

export default Utils

