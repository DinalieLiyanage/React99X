export class TodoItem {
    constructor(id, topic, createDate, completed, lastUpdateDate) {
        this.id = id;
        this.topic = topic;
        this.createDate = createDate;
        this.completed = completed;
        this.lastUpdateDate = lastUpdateDate;
    }

    generateId =() =>{
        var moment = Date.now();
        var random = Math.floor(Math.random())
        var uuid = moment.toString()+random.toString()
        return uuid;
    }
}
