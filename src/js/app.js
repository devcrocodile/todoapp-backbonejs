
var localStorage = require('backbone.localstorage')
var LocalStorage = localStorage.LocalStorage

var app = {}

app.Todo = Backbone.Model.extend({
  defaults: {
    title: '',
    viewid: '',
    id: null,
    completed: false
  }
})


app.TodoList = Backbone.Collection.extend({
  model: app.Todo,
  localStorage: new LocalStorage("list-of-todos")
});
// instance of the Collection
app.todoList = new app.TodoList()


app.TodoView = Backbone.View.extend({
  tagName: 'li',
  template: _.template($('#item-template').html()),
  render: function(){
    this.$el.html(this.template(this.model.toJSON()))
    return this; // enable chained calls
  }
});





// renders the full list of todo items calling TodoView for each one.
app.AppView = Backbone.View.extend({
  el: '#todoapp',
  initialize: function () {
    this.input = this.$('#new-todo')
    this.todolist = this.$('#todo-list')
    this.input.focus()
    
    // when new elements are added to the collection render then with addOne
    app.todoList.on('add', this.addOne, this)
    app.todoList.on('reset', this.addAll, this)
    var tmp = app.todoList.fetch() // Loads list from local storage

    // remove first li if localStorage not empty
    if (tmp.done){
      if(app.todoList.length > 0){
        this.todolist.find("li:first").detach()
      }
    }
    
  },
  events: {
    'keypress #new-todo': 'createTodoOnEnter',
    'click #btn-new-todo': 'createTodoOnClick',
    'click #todo-list li': 'itemClick',
    'click #btn-delete-list': 'removeListClick',
  },
  createTodoOnEnter: function(e){
    if ( e.which !== 13 || !this.input.val().trim() ) { // ENTER_KEY = 13
      return;
    }
    this.create()
  },
  createTodoOnClick: function (){
    this.create()
  },
  create: function(){
    if(app.todoList.length < 1){
      this.todolist.find("li:first").detach()
    }
    app.todoList.create(this.newAttributes())
    this.input.val(''); // clean input box
  },
  itemClick: function(){
    let viewid = $(this).find("div").attr("data-id")
    console.log(viewid)
    console.log($(this))

    // let s = window.localStorage.getItem('list-of-todos').split(',')
    // let idList = s.filter(id => {
    //   return id !== element.attributes.id
    // })
    // idList = JSON.stringify(idList).replace("[","").replace("]","")
    // console.log(idList)

    app.todoList.forEach(element => {


      //window.localStorage.removeItem('list-of-todos-' + element.id)
      //window.localStorage.setItem('list-of-todos', JSON.stringify(idList).replace("[","").replace("]",""))
      
      

      // s.forEach(key => {
      //   if (s !== element.id){
      //     idList += s + ","
      //   } else {
      //     window.localStorage.removeItem('list-of-todos-' + s)
      //     this.todolist.find("li [data-id='" + s + "']").detach()
      //   }
      //   window.localStorage.setItem('list-of-todos', idList)
      // })
      
    });
  },
  removeListClick: function (){
    // HomeBrew!!
    console.log("remove list")
    app.todoList.forEach(element => {
      this.todolist.find("div[data-id='" + element.attributes.viewid + "']").parent().detach()
      window.localStorage.removeItem('list-of-todos-' + element.attributes.viewid)
    });
    window.localStorage.removeItem('list-of-todos')
  },
  addOne: function(todo){
    var view = new app.TodoView({model: todo})
    this.todolist.append(view.render().el)
  },
  addAll: function(){
    this.todolist.html(""); // clean the todo list
    app.todoList.each(this.addOne, this);
  },
  newAttributes: function(){
    return {
      title: this.input.val().trim(),
      viewid: _.uniqueId(),
      id: this.viewid,
      completed: false
    }
  }
})

//--------------
// Initializers
//--------------
app.appView = new app.AppView()

