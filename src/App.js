import React, { Component } from 'react'

import { TodoItem } from './models/TodoItem'
import Utils from './utils/Utils'
import { DATE_TIME_FORMAT } from './utils/Contants'
import { Paper } from '@material-ui/core'

import './App.css'
var moment = require('moment');



class App extends Component {

    state = {
        clicked: false,
        itemList: [],

    }

    constructor() {
        super();
        this.utils = new Utils();

    }

    toggleCompletion = () => {

    }

    deleteTodo =(id) =>{
        this.utils.deleteItem(id).then(updatedList=>{
            if(updatedList!==null){
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

        this.renderListItems()
    }

    renderListItems = () => {

        var list = this.utils.filterTodos(false);

        this.setState(
            { itemList: list }
        )

    }

    listView(data) {

        return (

            data.map(todoItem =>
                <div key={todoItem.id}>
                    <Paper className="item" elevation={3}>
                        <input type="checkbox" id="item" name="item" value="todoItem" />
                        <label >{todoItem.topic}</label>
                    </Paper>


                </div>

            )
        );
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
            console.log("save todo inside" + JSON.stringify(res));
        }, err => {
            console.log(JSON.stringify(err))
        })

    }


    // var [topic, setTopic] = useState('');
    render() {
        return (
            <>
                <div className="container">
                    <h1>todos</h1>
                    <input type="text" placeholder="What needs to be done?" name="topic" ref={(c) => this.topic = c} ></input>
                    <button type="button" onClick={() => this.saveTodo()}>Save Item</button>
                    <button type="button" onClick={() => this.renderListItems()}>Get Item</button>

                    <section>

                        {this.listView(this.state.itemList)}
                    </section>

                    <section>

                    </section>
                </div>
            </>
        )
    }
}

export default App;