import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';
import { Link, NavLink } from 'react-router-dom';
const Paste = () => {
  const pastes = useSelector((state) => state.paste?.pastes || []);
  //                                         slice  name
   const dispatch = useDispatch();
  const [searchTerm, setSearchTerm]  = useState('');
  const filteredData = pastes.filter((paste) => paste.title.toLowerCase().includes(searchTerm.toLowerCase()));
  function handleDelete(pasteId){
    dispatch(removeFromPastes(pasteId));
  }
  function handleShare(pasteId){
    const shareUrl = 'http://localhost:5173/pastes/${pasteId}';
    if(navigator.share){
      navigator.share({
        title: "Click out this paste",
        text : "Here's a paste I wanted to share with you:",
        url: shareUrl,
      })
      .then(() => toast.success("Shared Successfully"))
      .catch((error) => toast.error("Error in Sharing", error));

    }
    else{
      alert('Copy this link to share: ${shareUrl}');
    }
  };
  return (
    <div>
      <input
        className='p-2 rounded-2xl min-w-[600px] mt-5'
        type ='search'
        placeholder='search here'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    <div className= 'flex flex-col gap-5 mt-5'>
      {
        filteredData.length > 0 && 
        filteredData.map(
          (paste) => {
            return(
            <div className='border'  key={paste._id}>
              <div>{paste.title}</div>
              <div>{paste.content}</div>
              <div className='flex flex-row gap-4 place-content-evenly'>

              <button> <Link to={`/?pasteId=${paste?._id}`}>Edit</Link></button>

              <button onClick={() => handleShare(paste?._id)}>Share</button>

              <button><Link to={`/pastes/${paste?._id}`}>View</Link></button>

              <button onClick={() => {navigator.clipboard.writeText(paste?.content)
                                      toast.success("Copied to Clipboard")
              }}>Copy</button>

              <button onClick={() => handleDelete(paste?._id)}>Delete</button>
              </div>
              <div>{paste.createdAt}</div>
            </div>
            )
          }
        )
      }
    </div>  
    </div>
  )
}

export default Paste