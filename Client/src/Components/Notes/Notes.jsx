import React from 'react'
import { useNavigate } from 'react-router-dom';

function Todos() {
    const [todos, setTodos] = React.useState([])
    const [input, setInput] = React.useState('')
    const [status, setstatus] = React.useState('')
    const [tag, settag] = React.useState('')
    const token = localStorage.getItem('token');
    const [update, setUpdate] = React.useState(false);
    const [newinput, setnewInput] = React.useState('')
    const [newStatus, setNewStatus] = React.useState('')
    const [newTag,setNewTag] = React.useState('')
    const navigate = useNavigate();

    const handleAdd = async () => {
        const body = {
            title: input,
            status,
            tag
        }
        console.log(body)
        try {
            await fetch('http://localhost:8080/createTodo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'token': token
                },
                body: JSON.stringify(body)
            });            // console.log(response)
            setInput('');
            setstatus('');
            settag('');
            getAllTodos();
            // setNotes(response)
        } catch (error) {
            console.log(error)
        }
    }

    const getAllTodos = async () => {
        try {
            let data = await fetch('http://localhost:8080/getAllTodos', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'token': token
                }
            });
            let response = await data.json();
            console.log(response);
            // setNotes(response)
            if (typeof response === 'object') {
                setTodos(response)
            }
            else {
                navigate("/")
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleDelete = async (id) => {
        try {
            let data = await fetch('http://localhost:8080/deleteTodo', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'token': token
                },
                body: JSON.stringify({
                    id: id
                })
            });
            let res = await data.json();
            alert(res.message);
            getAllTodos();
        } catch (error) {
            console.log(error)
        }
    }

    const handleUpdate = async (id) => {
        try {
            let data = await fetch('http://localhost:8080/updateTodo', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'token': token
                },
                body: JSON.stringify({
                    id: id,
                    title: newinput,
                    status: newStatus,
                    tag: newTag
                })
            });
            let res = await data.json();
            alert("todo updated");
            setnewInput('');
            setNewStatus('');
        setNewTag('');
            getAllTodos();
        } catch (error) {
            console.log(error)
        }
    }


    React.useEffect(() => {
        getAllTodos();
    }
        , []);


    return (
        <div>
            <div style={{display:"flex"}}>
            <p>Title : </p>
                <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
                <p>status : </p>
                <input type="text" value={status} onChange={(e) => setstatus(e.target.value)} />
                <p>Tag : </p>
                <input type="text" value={tag} onChange={(e) => settag(e.target.value)} />
                <button onClick={handleAdd}>ADD</button>
            </div>
            <div>
                {todos?.map((todos, index) => {
                    return <div key={index}>
                        <p>Title : {todos.title}</p>
                        <p>Note : {todos.status}</p>
                        <p>Label : {todos.tag}</p>
                        <button onClick={() => { handleDelete(todos._id) }}>DELETE</button>
                        <button onClick={() => { setUpdate(true) }}>UPDATE</button>
                        <div>
                            {
                                update ?
                                    <div style={{display:"flex"}}>
                                        <p>Title : </p>
                                        <input type="text" value={newinput} onChange={(e) => setnewInput(e.target.value)} />
                                        <p>Status : </p>
                                        <input type="text" value={newStatus} onChange={(e) => setNewStatus(e.target.value)} />
                                        <p>Tag : </p>
                                        <input type="text" value={newTag} onChange={(e) =>setNewTag(e.target.value)} />
                                        <button onClick={() => { setUpdate(false); getAllTodos() }}>CANCEL</button>
                                        <button onClick={() => { handleUpdate(todos._id); setUpdate(false); getAllTodos() }}>UPDATE</button>
                                    </div>
                                    :
                                    null
                            }
                        </div>
                    </div>
                })}
            </div>
        </div>
    )
}

export default Todos