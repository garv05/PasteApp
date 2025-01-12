import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';
const Home = () => {
    const [title, setTitle] = useState('');
    const [value, setValue] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const pasteId = searchParams.get("pasteId");
    const dispatch = useDispatch();
    const allPastes = useSelector((state) => state.paste.pastes);

    useEffect(() => {
        if (pasteId) {
            const paste = allPastes.find((p) => p._id === pasteId); // Use pasteId to find the specific paste
            if (paste) { // Make sure the paste exists before trying to set its values
                setTitle(paste.title);
                setValue(paste.content);
            }
        }
    }, [pasteId, allPastes]); // Depend on both pasteId and allPastes
    
    function createPaste(){
        const paste = {
            title:title,
            content:value,
            _id: pasteId || Date.now().toString(36),
            createdAt: new Date().toISOString(), 
        }
        if(pasteId){
            // edit
            dispatch(updateToPastes(paste));
        }
        else{
            dispatch(addToPastes(paste))
        }
        setTitle('');
        setValue('');
        setSearchParams({});
    }

    return (
    <div>
        <div className='flex flex-row gap-7 place-content-between'>
            <input
                className='p-1 rounded-2xl mt2 w-[66%] pl-5'
                type='text'
                placeholder='Enter title here'
                value = {title}
                onChange={(e) => setTitle(e.target.value)}
                />

            <button onClick={createPaste}
             className="p-2 mt-2 rounded-2xl">
                {
                    pasteId ? "Update Paste" : "Create My Paste" 
                }   
            </button>
        </div>
        <div className="mt-8">
            <textarea 
                placeholder='Enter content here'
                className='rounded-2xl mt-4 min-w-[500px] p-4'
                value={value}
                onChange={(e) => setValue(e.target.value)}
                rows={20}
            />
        </div>
    </div>
  )
}

export default Home 