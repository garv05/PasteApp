import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const ViewPaste = () => {
  const {id} = useParams();
  const allPastes = useSelector((state) => state.paste?.pastes || []);
  const paste = allPastes.filter((p) => p._id === id)[0];
  console.log(paste)
  // console.
  return (
    <div>
      <div className='flex flex-row gap-7 place-content-between'>
            <input
                className='p-1 rounded-2xl mt2 w-[66%] pl-5'
                type='text'
                placeholder='Enter title here'
                value = {paste.title}
                disabled
                onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <br></br>
        <div className="mt-8">
            <textarea 
                placeholder='Enter content here'
                className='rounded-2xl mt-4 min-w-[500px] p-4'
                value={paste.content}
                disabled
                onChange={(e) => setValue(e.target.value)}
                rows={20}
            />
        </div>
    </div>
  )
}

export default ViewPaste