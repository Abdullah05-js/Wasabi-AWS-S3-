import React from 'react';

const Post = ({ img, content, index, author }) => {
    return (
        <div className='rounded-lg gap-2 p-2 border-white border-2 shadow-2xl duration-500 hover:translate-x-3  hover:shadow-orange-200 flex flex-col justify-center items-center'>
            <div>
                <h1 className='text-left font-bold text-green-300'>{author}</h1>
                <p className='text-xl font-bold text-white text-wrap'>
                    {content}
                </p>
            </div>
            <img src={img} className='rounded-xl shadow-slate-400' alt={index} />
        </div>
    );
}

export default Post;
