import React from 'react'
import { MdAdd } from 'react-icons/md'
import { MdClose } from 'react-icons/md';

const TagInput = ({tags, setTags}) => {

    const[inputValue, setInputValue] = React.useState('');
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    }
    const addNewTag = () => {
        setTags([...tags, inputValue.trim()]);
        setInputValue('');
    }
    
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            addNewTag();
        }
        };

    const handleRemoveTag = (tagToRemove) => {
        setTags(tags.filter((tags) => tag != tagToRemove));
    };
  return (
    <div>
        {tags.length> 0 && (<div className="flex items-center gap-2 flex-wrap mt-2">
            {tags.map((tag, index) => (
                <span key={index} className='flex items-center gap-2 text-sm text-slate-900 bg-slate-100 px-3 py-1 rounded'>
                    #{tag}
                    <button onClick={() => {
                        handleRemoveTag(tag);
                    }} > 
                        <MdClose/>
                    </button>
                </span>
            ))}
        </div>)}


        <div className="flex items-center gap-4 mt-3">
            <input type="text" 
            value={inputValue}
            className="text-sm bg-transparent text-white border px-3 py-2 rounded outline-none" placeholder='Add tags'
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            />

            <button className="w-8 h-8 flex items-center justify-center rounded border border-blue-700 hover:bg-blue-700">
                <MdAdd className = "text-2xl text-blue-700 hover:text-white"
                
                onClick={() => {addNewTag()}}
                />
            </button>
        </div>
    </div>
  )
}

export default TagInput
