import React, { Component } from 'react'
import axios from 'axios'

export class TodoList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            todos: [],
        }
    }

    componentDidMount() {
        console.log("did mount")
        axios.get("http://localhost:8000/todos").then(
            res => {
                console.log(res.data)
                this.setState({
                    todos: res.data
                })
            }
        ).catch(
            /*Cualquier respuesta no satisfactoria irá aqui*/
            err => console.error(err)
        )
    }

    addingTodo = () => {
        const newTodoObject = {
            todo: this.state.newTodo,
            author: " Rosana ",
            done: false
        };
        axios
            .post("http://localhost:8000/todos", newTodoObject)
            .then(
                res => this.setState({
                    todos: [...this.state.todos, res.data],
                })
            )
            .catch(console.error);
    };
   
    onChangeInput = (e) => {
        this.setState({
            newTodo: e.target.value.toUpperCase(),
        })
    }

    deleteElement = (id) => {
        axios.delete(`http://localhost:8000/todos/${id}`).then(
            this.setState({
                todos: this.state.todos.filter(i => i.id !== id)
            
            })
        )
    }

    finish = id => {
        console.log("finish")
        console.log(id);
        //Recupero el puntero
        const todo = this.state.todos.filter(i => i.id== id);
        todo[0].done=true;
        console.log(todo);
        axios.put(`http://localhost:8000/todos/${id}`, todo[0])
            .then(this.setState({
                todos: this.state.todos
            
            }))
            .catch(res => console.error(res));
    }



    render() {
        console.log("render")
        //Así ahorramos código
        const { todos } = this.state;
        //const todos= this.props.todos || [];
        return (
            <div className="todo-list">
                <h3>Lista de tareas</h3>
                <ul>
                    {todos.map((i) => (
                        <li key={i.id}> 
                            {i.todo}

                            {i.done ? " Hecho " : " Pendiente "}
                            <button class="ui button active" onClick={() => this.deleteElement(i.id)}>Borrar</button>
                         
                            {!i.done && <button onClick={() => this.finish(i.id)} class="ui button active"> Terminar </button>}
                        </li>

                    ))}
                </ul>
                <input type="text"  class="ui button active" onChange={(e) => this.onChangeInput(e)} value={this.state.newTodo}>
                </input>
                <button class="ui button active" onClick={this.addingTodo}>Guarda </button>

            </div>
        )
    }
}

export default TodoList
