import React, { Component } from 'react'

import { TodoItem } from './models/TodoItem'
import Utils from './utils/Utils'
import { DATE_TIME_FORMAT } from './utils/Contants'
import { Paper, IconButton, TextField, Checkbox, Button } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';
import UpdateIcon from '@material-ui/icons/Update';
import './App.css'
var moment = require('moment');



class App extends Component {

    state = {

        itemList: [],
        checked: false,
        editItem: null
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

    renderListItems = (filter) => {

        var list = this.utils.filterTodos(filter);

        this.setState(
            { itemList: list }
        )

    }

    toggleCompletion = (id, isCompleted) => {
        this.utils.findItemById(id).then(res => {
            if (res !== null) {
                res.value.completed = !isCompleted;

                this.updateTodo(res.i, res.value);


            }
        })

        // alert("Called" + this.isChecked)
    }

    updateTodo = (index, item) => {
        this.utils.updateTodoItem(index, item).then(res => {
            console.log("Comes here after update")
            this.setState(
                {
                    itemList: res,
                    editItem: null
                }
            )

            this.topic.value = null;
            // this.topicEdit.value = null;
        })
    }


    editTodo = (item) => {

        console.log("editing" + JSON.stringify(item))
        this.setState(
            {
                editItem: item
            }
        )

        this.editTopic = item.topic




    }





    saveTodo = () => {
        // alert("saving")




        if (this.state.editItem === null) {
            var item = new TodoItem()
            item.id = item.generateId();
            item.completed = false;
            item.topic = this.topic.value

            item.lastUpdateDate = new Date() !== null ? moment(new Date(), DATE_TIME_FORMAT) : null;
            item.createDate = new Date() !== null ? moment(new Date(), DATE_TIME_FORMAT) : null;
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
        } else {
            this.utils.findItemById(this.state.editItem.id).then(
                res => {
                    if (res !== null) {

                        res.value.topic = this.topicEdit.value;
                        res.value.lastUpdateDate = new Date() !== null ? moment(new Date(), DATE_TIME_FORMAT) : null;
                        // console.log(res.i)
                        this.updateTodo(res.i, res.value)
                    }
                }
            )
        }




    }

    footerItem = () => {
        return (
            <>
                <Button onClick={() => this.renderListItems()} style={{ marginLeft: "6px" }} variant="outlined" color="secondary">
                    All
                </Button>
                <Button onClick={() => this.renderListItems(false)} style={{ marginLeft: "6px" }} variant="outlined" color="secondary">
                    Active
                </Button>
                <Button onClick={() => this.renderListItems(true)} style={{ marginLeft: "6px" }} variant="outlined" color="secondary">
                    Completed
                </Button>
            </>
        )
    }

    listView(data) {
        if (data !== null) {
            return (

                data.map(todoItem =>
                    <div key={todoItem.id}>
                        <Paper onDoubleClick={() => this.editTodo(todoItem)} className="item" elevation={2}>
                            {this.state.editItem !== null ? (

                                this.state.editItem.id === todoItem.id ?
                                    (
                                        <TextField
                                            name="topicEdit"
                                            // value={this.topicEdit}
                                            className="todo"
                                            variant="outlined"
                                            // placeholder="What needs to be done?"
                                            inputRef={(d) => this.topicEdit = d}
                                        />
                                    ) : (
                                        <Checkbox
                                            checked={todoItem.completed}
                                            inputRef={(c) => this.isChecked = c}
                                            inputProps={{ 'aria-label': 'primary checkbox' }}
                                            onClick={() => this.toggleCompletion(todoItem.id, todoItem.completed)}
                                        />
                                    )) : (
                                    <Checkbox
                                        checked={todoItem.completed}
                                        inputRef={(c) => this.isChecked = c}
                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                        onClick={() => this.toggleCompletion(todoItem.id, todoItem.completed)}
                                    />
                                )}

                            {this.state.editItem === null || (this.state.editItem !== null && this.state.editItem.id !== todoItem.id) ? (
                                todoItem.completed ? (
                                    <>
                                        <label className="stroked">{todoItem.topic}</label>

                                    </>
                                ) : (
                                        <>
                                            <label >{todoItem.topic}</label>

                                        </>
                                    )
                            ) : null




                            }

                            {
                                this.state.editItem === null || (this.state.editItem !== null && this.state.editItem.id !== todoItem.id) ? (
                                    <>
                                        {/* < IconButton onClick={() => this.editTodo(todoItem)} aria-label="delete">
                                            <UpdateIcon className="deleteIcon" />
                                        </IconButton> */}
                                        <IconButton onClick={() => this.deleteTodo(todoItem.id)} aria-label="delete">
                                            <CloseIcon className="deleteIcon" />
                                        </IconButton>
                                    </>
                                ) : null
                            }



                        </Paper>


                    </div >

                )
            );
        }

        return null

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

                <Button type="button" onClick={() => this.saveTodo()} variant="contained">Save Todo</Button>
                {/* <button >Save Item</button> */}
                {/* <button type="button" onClick={() => this.renderListItems()}>Get Item</button> */}

                <section>

                    {this.listView(this.state.itemList)}
                </section>


                {/* <section className="footer">
                    
                </section> */}

            </>
        )
    }


    // var [topic, setTopic] = useState('');
    render() {
        return (
            <>
                <div className="container">
                    <h1 className="topic">todos</h1>
                    <Paper className="manipulator" elevation={2}>
                        {this.mainElements()}
                    </Paper>
                    <section className="footer">
                        {this.footerItem()}
                    </section>

                    <section className="guides">
                        <p>Double click to edit a todo</p>
                        <p>Created by Dinalie Fernando</p>
                    </section>
                </div>
            </>

        )
    }
}

export default App;