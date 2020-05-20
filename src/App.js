import React, { Component } from 'react'

import { TodoItem } from './models/TodoItem'
import Utils from './utils/Utils'
import { DATE_TIME_FORMAT } from './utils/Contants'
import { Paper, IconButton, TextField, Checkbox } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';
import './App.css'
var moment = require('moment');



class App extends Component {

    state = {

        itemList: [],
        checked: false

    }

    constructor() {
        super();
        this.utils = new Utils();

    }



    deleteTodo = (id) => {
        this.utils.deleteItem(id).then(updatedList => {
            if (updatedList !== null) {
                this.setState(
                    {
                        itemList: updatedList
                    }
                )

                return;
            }

            alert("Todo does not exist")
        })
    }

    componentDidMount = () => {
        // localStorage.clear();
        this.renderListItems()
    }

    renderListItems = () => {

        var list = this.utils.filterTodos(false);

        this.setState(
            { itemList: list }
        )

    }

    toggleCompletion = (id, isCompleted) => {
        this.utils.findItemById(id).then(res => {
            if (res !== null) {
                res.value.completed = !isCompleted;

                this.updateTodo(res.value.i,res.value);


            }
        })

        // alert("Called" + this.isChecked)
    }

    updateTodo = (index, item) => {
        this.utils.updateTodoItem(index, item).then(res => {
            this.setState(
                { itemList: res }
            )
        })
    }

    listView(data) {
        if (data !== null) {
            return (

                data.map(todoItem =>
                    <div key={todoItem.id}>
                        <Paper className="item" elevation={2}>
                           
                            <Checkbox
                                checked={todoItem.completed}
                                inputRef={(c) => this.isChecked = c}
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                                onClick={() => this.toggleCompletion(todoItem.id, todoItem.completed)}
                            />
                            <label >{todoItem.topic}</label>
                            <IconButton onClick={() => this.deleteTodo(todoItem.id)} aria-label="delete">
                                <CloseIcon className="deleteIcon" />
                            </IconButton>
                        </Paper>


                    </div>

                )
            );
        }

        return null

    }





    saveTodo = () => {
        alert("saving")

        var item = new TodoItem()

        item.id = item.generateId();
        item.topic = this.topic.value
        item.completed = false;
        item.createDate = new Date() !== null ? moment(new Date(), DATE_TIME_FORMAT) : null;
        item.lastUpdateDate = new Date() !== null ? moment(new Date(), DATE_TIME_FORMAT) : null;

        this.utils.saveTodoItem(item).then(res => {
            // console.log("save todo inside" + JSON.stringify(res));
            this.setState(
                {
                    itemList: res
                }
            )
            this.topic.value = null;
        }, err => {
            console.log("error in saving" + JSON.stringify(err))
        })

    }

    mainElements = () => {
        return (
            <>


                <TextField
                    name="topic"

                    className="todo"
                    variant="outlined"
                    placeholder="What needs to be done?"
                    inputRef={(c) => this.topic = c}
                />

                <button type="button" onClick={() => this.saveTodo()}>Save Item</button>
                {/* <button type="button" onClick={() => this.renderListItems()}>Get Item</button> */}

                <section>

                    {this.listView(this.state.itemList)}
                </section>

                <section className="footer">

                </section>

            </>
        )
    }


    // var [topic, setTopic] = useState('');
    render() {
        return (
            <>
                <div className="container">
                    <h1 className="topic">todos</h1>
                    <Paper className="manipulator" elevation={3}>
                        {this.mainElements()}
                    </Paper>

                </div>
            </>

        )
    }
}

export default App;