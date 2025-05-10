import React from 'react';
import { useState } from 'react';
import axios from "axios"
const CreatePost = ({ setNewPost }) => {

    const [Form, setForm] = useState({
        text: "",
        file: null
    })

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()

            const form = new FormData()
            form.append("image", Form.file)
            form.append("text", Form.text)
            form.append("author", "Abdullah han")
            const { data } = await axios.post("http://localhost:5000/api/posts/CreatePost", form, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            setNewPost((PostList) => {
                return [
                    {
                        url: data.url,
                        text: data.text,
                        author: data.author
                    }
                    ,
                    ...PostList
                ]
            })
        } catch (error) {
            console.log("from handleSubmit:", error);
        }


    }



    return (
        <form onSubmit={handleSubmit} className='p-2 flex justify-center items-center gap-2'>
            <input type="text" className='border-2 border-green-300 outline-none p-2 rounded-lg' value={Form.text} onChange={(e) => setForm({ ...Form, text: e.target.value })} />
            <input type="file" accept='.png,.jpeg,.jpg' className='w-20 rounded-lg ' onChange={(e) => {
                const file = e.target.files[0]

                setForm({ ...Form, file: file })
            }} />
            <button type='submit' className='p-2 text-white border-2 border-green-300 rounded-lg'>submit</button>
        </form>
    );
}

export default CreatePost;
