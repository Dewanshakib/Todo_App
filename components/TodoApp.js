import { db } from "@/firebase/firebaseConfig";
import { addDoc, collection,deleteDoc,doc,getDocs, updateDoc} from "firebase/firestore";
import React, { useEffect, useState } from "react";


const TodoApp = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [data, setData] = useState([]);
  const [id,setId] = useState('')
  const [show,setShow] = useState(false)

  const value = collection(db,"Todos")

  // Adding Data 
  const AddData = async () => {
    await addDoc(value,{
      taskName:title,
      taskDetail:description,
      created:Date.now()
    })
    setTitle("")
    setDescription("")
  }


  const handleDelete = async (id) => {
    const delVal = doc(value,id)
    await deleteDoc(delVal)
    setShow(false)
  }

  const handleEdit = async (id,taskName,taskDetail) => {
    setId(id)
    setTitle(taskName)
    setDescription(taskDetail)
    setShow(true)
  }

  const handleUpdate = async () => {
    const updateVal = doc(db,"Todos",id)
    await updateDoc(updateVal,{taskName:title,taskDetail:description})
    setTitle('')
    setDescription('')
    setShow(false)
  }

  useEffect(() => {
    const getData = async () => {
      const todoDb = await getDocs(value)
      setData(todoDb.docs.map((doc) => ({...doc.data(),id:doc.id})))
    }
    getData()
  })


 

  return (
    <div className="flex flex-col gap-y-4 p-6 lg:p-20 ">
      <h2 className="text-4xl font-bold">Todo App....</h2>
      <div className="flex flex-col gap-y-4">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border py-2 pl-5"
          type="text"
          placeholder="Enter title"
        />
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border py-2 pl-5"
          type="text"
          placeholder="Enter Description"
        />
        {!show ? <button
          onClick={AddData}
          className="w-fit bg-gray-900 text-green-50 hover:bg-gray-600 px-4 py-1.5"
        >
          Add Task
        </button>
        :
        <button
          onClick={handleUpdate}
          className="w-fit bg-gray-900 text-green-50 hover:bg-gray-600 px-4 py-1.5"
        >
          Update
        </button>}

       {
        data.map((t) => {
          return (
            <div key={t.id} className="flex justify-between items-center border border-gray-700 p-2">
              <div className="">
                <h2 className="font-bold">{t.taskName}</h2>
                <p className="text-sm">{t.taskDetail}</p>
              </div>
              <div className="flex flex-row gap-x-2">
                <button onClick={() => handleDelete(t.id)} className="bg-gray-900 p-2 text-xs text-gray-100 font-medium">Delete</button>
                <button onClick={() => handleEdit(t.id,t.taskName,t.taskDetail)} className="bg-gray-900 p-2 text-xs text-gray-100 font-medium">Edit</button>
                
              </div>
            </div>
          )
        })
       }
      </div>
    </div>
  );
};


export const metadata = {
  title: 'Todo App',
  description: 'Todo app for better productivity',
}


export default TodoApp;
