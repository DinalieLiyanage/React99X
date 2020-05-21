export class TodoItem {
    constructor(id, topic, createDate, completed, lastUpdateDate) {
        this.id = id;
        this.topic = topic;
        this.createDate = createDate;
        this.completed = completed;
        this.lastUpdateDate = lastUpdateDate;
    }

    generateId =() =>{
        var date = new Date()
        var moment = date.getTime().toString()+date.getDate().toString();
        var min = Math.ceil(1);
        var max = Math.floor(10000);
        var random =  Math.floor(Math.random() * (max - min + 1)) + min;
        var uuid = moment.toString()+random.toString()
        return uuid;
    }
}
