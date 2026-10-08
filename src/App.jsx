import React, { useEffect, useState } from 'react'
import axios from 'axios'; 

const App = () => {

  const [more, setMore] = useState(18);

  const [page, setPage] = useState(1);
  if(page.length>0){
    const pageAdd=()=>{
      setPage(+1)
    }
  }

  const [userdata, setuserData] = useState([])
  async function getData(){
    const response = await axios.get(`https://picsum.photos/v2/list?page=${page}&limit=${more}`)
    setuserData(response.data);
  }


  let printUserData='Loading.....';
  if(userdata.length>0){
    printUserData = userdata.map(function(elem,idx){
      return <a href={elem.url}key={idx} ><div className='w-80 h-60 p-2 '>
        <img className='w-full h-[80%] object-cover mb-2' src={elem.download_url} alt="" />
        <h1 className='text-center font-bold '>{elem.author}</h1>
        </div></a>
    })
  }
  useEffect(function(){
    getData();
  },[page])


  return (
    <div>
      <div className='w-screen p-5 min-h-screen bg-black'>
        <button className='py-2 px-4 active:scale-95  text-white'></button>
        <div className='flex justify-center items-center' >
          <h1 className='text-gray-400 font-bold text-2xl min-h-200 items-center flex flex-wrap gap-2'>{printUserData}</h1>
        </div>
        <div className='w-full flex justify-center gap-4'>
          <button onClick={()=>{
            setPage(page-1);
            setuserData([]);
          }} className='px-6 py-3 rounded-xl bg-red-300 text-black font-bold'>prev</button>
          <h1 className='text-white p-5 text-2xl font-bold'>Page{page}</h1>
          <button onClick={()=>{
            setPage(page+1);
            setuserData([]);
            console.log("next click")
          }} className='px-6 py-3 rounded-xl bg-red-300 text-black font-bold'>next</button>
        </div>
      </div>
    </div>
  )
}

export default App