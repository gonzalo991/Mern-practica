import React, { Component } from 'react';

class App extends React.Component {

    constructor() {
        super();
        this.state = { title: '', description: '', tasks: [], _id: '' };
        this.addTask = this.addTask.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    addTask(ev) {
        // console.log(this.state);
        //Si eexiste el id se pedira una actualización, sino solamente cargará la página
        if (this.state._id) {
            fetch(`/api/tasks/${this.state._id}`, {
                method: 'PUT',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res = res.json())
                .then(data => {
                    console.log(data);
                    M.toast({ html: 'Task Updated' }); //para este mensaje tengo que importar materialize
                    this.setState({
                        title: '',
                        description: '',
                        _id: ''
                    });
                    this.fetchTasks();
                })
        } else {
            //Envío la petición a la url sin localhost ya que la aplicación react también está en el puerto 3000
            //entonces toma a localhost:3000 por defecto
            fetch('/api/tasks', {
                //puedo agregar reglas al método fetch, le indico que esta es una petición POST
                method: 'POST',
                //Indicó que enviaré un body en formato json convertido a string y le paso el estado
                body: JSON.stringify(this.state),
                //Tambié envío las cabeceras especificando que estooy enviando datos en formato json
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                //Al enviarlo quiero ver la respuesta del objeto enviado
                .then(res => res.json())

                //Luego me mostrará el estádo de la petición por consola
                .then(data => {
                    //console.log(data)
                    //Con materialize puedo agregar un mensaje por pantalla cuando guarda los datos con éxito
                    M.toast({ html: 'Tarea Guardada' });
                    //Luego de todo el proceso vuelvo a cambiar el estado de las variables a un valor vacío
                    this.setState({ title: '', description: '' });
                    //Por último luego de limpiar el formulario vuelve a pedir los datos de la lista
                    this.fetchTasks();
                })

                //En caso de haber algún error me lo mostrará en consola
                .catch(err => console.error(err));
        }
        //Con prevent default evito que la página se recargue cada vez que envío una tarea con el boton submit
        ev.preventDefault();
    }

    //Método para solicitar todos los datos de la lista de tareas
    fetchTasks() {
        //Hago una petición con fetch y no le pongo reglas ya que por defecto la petición será GET
        fetch('/api/tasks')
            .then(res => res.json())
            .then(data => {
                //console.log(data);
                this.setState({ tasks: data });
                //  console.log(this.state.tasks)
            });
    }

    //Funcion para eliminar una tarea, recibe como parámetro el id desde el evento en el boton
    deleteTask(id) {
        if (confirm('Are you sure you want to delete it?')) {
            fetch(`/api/tasks/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    //console.log(data);
                    M.toast({ html: 'Tarea Eliminada' });
                    this.fetchTasks();
                });
        }

        //console.log('Eliminando', id);
    }

    //Metodo para editar una tarea, también recibe el id mediante el evento en el botón
    editTask(id) {
        fetch(`/api/tasks/${id}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.setState({
                    title: data.title,
                    description: data.description,
                    _id: data._id
                })
            });
    }

    //Con éste evento manejo el cambio de estado de los valores en el constructor
    handleChange(ev) {
        //Desestructuro el evento
        const { name, value } = ev.target;
        //Cambio el estado de las variables
        this.setState({
            [name]: value
        })
    }

    //Al terminar de cargar la página el método cargará todos los datos de la lista
    componentDidMount() {
        this.fetchTasks();
    }

    render() {
        return (<div>
            {/*Navigation*/}
            <nav className='light-blue darken-4'>
                <div className='container'>
                    <a className='band-logo' href='/'>Mern Stack</a>
                </div>
            </nav>

            <div className='container'>
                <div className='row'>
                    <div className='col s5'>
                        <div className='card'>
                            <div className='card-content'>
                                <form onSubmit={this.addTask}>
                                    <div className='row'>
                                        <div className='input-field col s12'>
                                            <input name='title' onChange={this.handleChange} type="text" placeholder="Task Title" value={this.state.title}></input>
                                        </div>
                                        <div className='input-field col s12'>
                                            <textarea name='description' onChange={this.handleChange} placeholder='Task Description' className='materialize-textarea' value={this.state.description}></textarea>                                        </div>
                                    </div>
                                    <button type='submit' className='btn light-blue darken-4'>
                                        Send
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className='col s7'>
                        <table>
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.tasks.map(task => {
                                        return (
                                            <tr key={task._id}>
                                                <td>
                                                    {task.title}
                                                </td>
                                                <td>
                                                    {task.description}
                                                </td>
                                                <td>
                                                    <button className='btn light-blue darken-4' onClick={() => this.editTask(task._id)}><i className='material-icons'>edit</i></button>
                                                    <button className='btn light-blue darken-4' style={{ margin: '4px' }}><i className='material-icons' onClick={() => this.deleteTask(task._id)}>delete</i></button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}


export default App;