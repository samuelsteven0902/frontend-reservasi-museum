import axios from 'axios'
import React from 'react'
import { useState } from 'react'

function InfoPanduan() {

  const [file,setFile] = useState()

const handleChange = (e)=>{
  setFile(e.target.files[0])
}

const sumbitHandler = (e) =>
{
  e.preventDefault();
  const data = new FormData()
  data.append('file', file)
console.log(data);
  // axios.post("http://localhost:8000/api/files", data).then(res=>console.log(res))

}


  return (
  <div className='container px-24 relative flex flex-col min-w-0 break-words w-full'>
    

    <h3 class="font-bold text-5xl text-white">Panduan</h3>
    <div class="flex flex-col " >
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div class="overflow-hidden shadow-lg rounded-xl m-2">
                <table class="min-w-full ">
              <thead class="border-b bg-white ">
                <tr className=''>
                    <p scope="col" class="text-xl font-medium text-[#A70B0B] px-6 py-4 text-left ">
                        1. Lorem Ipsum is simply dummy text of the printing 
                    </p>
                    
                    </tr>
              </thead>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div class="flex space-x-2 justify-left">
  <div>
  <button class="block text-gray-200 bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-200  font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-gray-700 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button" data-modal-toggle="authentication-modal">
                        Ubah
                    </button>
                                    <input
                                      type="file"
                                      name="image"                      
                                      onChange={handleChange}
                                      className="form-control"
                                    />
                                    <button onClick={sumbitHandler}>submit</button>

                    <div id="authentication-modal" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full">
                        <div class="relative p-4 w-full max-w-md h-full md:h-auto">
                            <div class="relative bg-white rounded-lg shadow dark:bg-gray-600 ">
                                <button type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-left dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="authentication-modal">
                                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                    <span class="sr-only">Close modal</span>
                                </button>
                                <div class="py-6 px-6 lg:px-8">

                                    <form class="space-y-6" action="#">
                                    
                                        <div>
                                            <label for="large-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Ubah Panduan</label>
                                            <textarea type="email" rows="4" name="email" id="large-input" class="block p-4 w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="blablabla" required />
                                        </div>
                                        
                                        <button type="submit" class="w-full text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Submit</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div> 
  
  </div>
</div>
    

  </div>
  )
}

export default InfoPanduan