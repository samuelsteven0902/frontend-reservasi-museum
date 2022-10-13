import React from 'react'
import "flowbite"

function CardMasterTiket() {

  return (
  <div className='container px-24 relative flex flex-col min-w-0 break-words w-full mb-6  rounded '>
    
    <div class="flex flex-col " >
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div class="overflow-hidden shadow-lg rounded-xl m-2">
                <table class="min-w-full ">
                <thead class="border-b bg-white ">
                    <tr className=''>
                    <th scope="col" class="text-xl font-medium text-[#A70B0B] px-6 py-4 text-center ">
                        No
                    </th>
                    <th scope="col" class="text-xl font-medium text-[#A70B0B] px-6 py-4 text-center">
                        Kategori
                    </th>
                    <th scope="col" class="text-xl font-medium text-[#A70B0B] px-6 py-4 text-center">
                        Harga Hari Biasa
                    </th>
                    <th scope="col" class="text-xl font-medium text-[#A70B0B] px-6 py-4 text-center">
                        Harga Hari Libur
                    </th>
                    <th scope="col" class="text-xl font-medium text-[#A70B0B] px-6 py-4 text-center">
                        Aksi
                    </th>
                    </tr>
                </thead>
                <tbody className=''>
                <tr class="bg-white border-b">
                    <td class=" text-gray-900 px-6 py-4 whitespace-nowrap">
                        1
                    </td>
                    <td class=" text-gray-900  px-6 py-4 whitespace-nowrap">
                        Umum
                    </td>
                    <td class=" text-gray-900  px-6 py-4 whitespace-nowrap">
                        Rp. 7.500,-
                    </td>
                    <td class=" text-gray-900  px-6 py-4 whitespace-nowrap">
                        Rp. 10.000,-
                    </td>
                    <td class=" text-gray-900 px-6 py-4 whitespace-nowrap ">
                     
                    <button class="block text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200  font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-gray-700 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button" data-modal-toggle="authentication-modal">
                        Ubah
                    </button>

                    <div id="authentication-modal" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full">
                        <div class="relative p-4 w-full max-w-md h-full md:h-auto">
                            <div class="relative bg-white rounded-lg shadow dark:bg-gray-600 ">
                                <button type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-left dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="authentication-modal">
                                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                    <span class="sr-only">Close modal</span>
                                </button>
                                <div class="py-6 px-6 lg:px-8">
                                    <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Ubah Harga</h3>
                                    <form class="space-y-6" action="#">
                                        <div>
                                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Kategori</label>
                                            <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
                                        </div>
                                        <div>
                                            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Harga Hari Biasa</label>
                                            <input type="password" name="password" id="password" placeholder="15000" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                                        </div>
                                        <div>
                                            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Harga Hari Libur</label>
                                            <input type="password" name="password" id="password" placeholder="17000" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                                        </div>
                                        
                                        
                                        <button type="submit" class="w-full text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Ubah</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div> 
                    <button type="button" class="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Hapus</button>
                    
                    </td>
                    </tr>
                    <tr class="bg-white border-b">
                    <td class=" text-gray-900 px-6 py-4 whitespace-nowrap">
                        2
                    </td>
                    <td class=" text-gray-900  px-6 py-4 whitespace-nowrap">
                        Mahasiswa
                    </td>
                    <td class=" text-gray-900  px-6 py-4 whitespace-nowrap">
                        Rp. 5.000,-
                    </td>
                    <td class=" text-gray-900  px-6 py-4 whitespace-nowrap">
                        Rp. 7.500,-
                    </td>
                    <td class=" text-gray-900 px-6 py-4 whitespace-nowrap ">
                     
                    <button class="block text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200  font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-gray-700 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button" data-modal-toggle="authentication-modal">
                        Ubah
                    </button>

                    <div id="authentication-modal" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full">
                        <div class="relative p-4 w-full max-w-md h-full md:h-auto">
                            <div class="relative bg-white rounded-lg shadow dark:bg-gray-600 ">
                                <button type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-left dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="authentication-modal">
                                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                    <span class="sr-only">Close modal</span>
                                </button>
                                <div class="py-6 px-6 lg:px-8">
                                    <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Ubah Harga</h3>
                                    <form class="space-y-6" action="#">
                                        <div>
                                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Kategori</label>
                                            <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
                                        </div>
                                        <div>
                                            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Harga Hari Biasa</label>
                                            <input type="password" name="password" id="password" placeholder="15000" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                                        </div>
                                        <div>
                                            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Harga Hari Libur</label>
                                            <input type="password" name="password" id="password" placeholder="17000" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                                        </div>
                                        
                                        
                                        <button type="submit" class="w-full text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Ubah</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div> 
                    <button type="button" class="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Hapus</button>
                    
                    </td>
                    </tr>
                    <tr class="bg-white border-b">
                    <td class=" text-gray-900 px-6 py-4 whitespace-nowrap">
                        3
                    </td>
                    <td class=" text-gray-900  px-6 py-4 whitespace-nowrap">
                    Pelajar
                    </td>
                    <td class=" text-gray-900  px-6 py-4 whitespace-nowrap">
                        Rp. 4.000,-
                    </td>
                    <td class=" text-gray-900  px-6 py-4 whitespace-nowrap">
                        Rp. 5.000,-
                    </td>
                    <td class=" text-gray-900 px-6 py-4 whitespace-nowrap ">
                     
                    <button class="block text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200  font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-gray-700 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button" data-modal-toggle="authentication-modal">
                        Ubah
                    </button>

                    <div id="authentication-modal" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full">
                        <div class="relative p-4 w-full max-w-md h-full md:h-auto">
                            <div class="relative bg-white rounded-lg shadow dark:bg-gray-600 ">
                                <button type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-left dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="authentication-modal">
                                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                    <span class="sr-only">Close modal</span>
                                </button>
                                <div class="py-6 px-6 lg:px-8">
                                    <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Ubah Harga</h3>
                                    <form class="space-y-6" action="#">
                                        <div>
                                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Kategori</label>
                                            <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
                                        </div>
                                        <div>
                                            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Harga Hari Biasa</label>
                                            <input type="password" name="password" id="password" placeholder="15000" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                                        </div>
                                        <div>
                                            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Harga Hari Libur</label>
                                            <input type="password" name="password" id="password" placeholder="17000" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                                        </div>
                                        
                                        
                                        <button type="submit" class="w-full text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Ubah</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div> 
                    <button type="button" class="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Hapus</button>
                    
                    </td>
                    </tr>
                    <tr class="bg-white border-b">
                    <td class=" text-gray-900 px-6 py-4 whitespace-nowrap">
                        4
                    </td>
                    <td class=" text-gray-900  px-6 py-4 whitespace-nowrap">
                    Rombongan Umum min.50 orang
                    </td>
                    <td class=" text-gray-900  px-6 py-4 whitespace-nowrap">
                        Rp. 5.000,-
                    </td>
                    <td class=" text-gray-900  px-6 py-4 whitespace-nowrap">
                        Rp. 7.500,-
                    </td>
                    <td class=" text-gray-900 px-6 py-4 whitespace-nowrap ">
                     
                    <button class="block text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200  font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-gray-700 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button" data-modal-toggle="authentication-modal">
                        Ubah
                    </button>

                    <div id="authentication-modal" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full">
                        <div class="relative p-4 w-full max-w-md h-full md:h-auto">
                            <div class="relative bg-white rounded-lg shadow dark:bg-gray-600 ">
                                <button type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-left dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="authentication-modal">
                                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                    <span class="sr-only">Close modal</span>
                                </button>
                                <div class="py-6 px-6 lg:px-8">
                                    <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Ubah Harga</h3>
                                    <form class="space-y-6" action="#">
                                        <div>
                                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Kategori</label>
                                            <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
                                        </div>
                                        <div>
                                            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Harga Hari Biasa</label>
                                            <input type="password" name="password" id="password" placeholder="15000" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                                        </div>
                                        <div>
                                            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Harga Hari Libur</label>
                                            <input type="password" name="password" id="password" placeholder="17000" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                                        </div>
                                        
                                        
                                        <button type="submit" class="w-full text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Ubah</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div> 
                    <button type="button" class="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Hapus</button>
                    
                    </td>
                    </tr>
                    <tr class="bg-white border-b">
                    <td class=" text-gray-900 px-6 py-4 whitespace-nowrap">
                        5
                    </td>
                    <td class=" text-gray-900  px-6 py-4 whitespace-nowrap">
                    Rombongan Pelajar min.50 orang
                    </td>
                    <td class=" text-gray-900  px-6 py-4 whitespace-nowrap">
                        Rp. 4.000,-
                    </td>
                    <td class=" text-gray-900  px-6 py-4 whitespace-nowrap">
                        Rp. 5.000,-
                    </td>
                    <td class=" text-gray-900 px-6 py-4 whitespace-nowrap ">
                     
                    <button class="block text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200  font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-gray-700 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button" data-modal-toggle="authentication-modal">
                        Ubah
                    </button>

                    <div id="authentication-modal" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full">
                        <div class="relative p-4 w-full max-w-md h-full md:h-auto">
                            <div class="relative bg-white rounded-lg shadow dark:bg-gray-600 ">
                                <button type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-left dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="authentication-modal">
                                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                    <span class="sr-only">Close modal</span>
                                </button>
                                <div class="py-6 px-6 lg:px-8">
                                    <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Ubah Harga</h3>
                                    <form class="space-y-6" action="#">
                                        <div>
                                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Kategori</label>
                                            <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
                                        </div>
                                        <div>
                                            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Harga Hari Biasa</label>
                                            <input type="password" name="password" id="password" placeholder="15000" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                                        </div>
                                        <div>
                                            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Harga Hari Libur</label>
                                            <input type="password" name="password" id="password" placeholder="17000" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                                        </div>
                                        
                                        
                                        <button type="submit" class="w-full text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Ubah</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div> 
                    <button type="button" class="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Hapus</button>
                    
                    </td>
                    </tr>
                    <tr class="bg-white border-b">
                    <td class=" text-gray-900 px-6 py-4 whitespace-nowrap">
                        6
                    </td>
                    <td class=" text-gray-900  px-6 py-4 whitespace-nowrap">
                        Wisatawan Asing
                    </td>
                    <td class=" text-gray-900  px-6 py-4 whitespace-nowrap">
                        Rp. 15.000,-
                    </td>
                    <td class=" text-gray-900  px-6 py-4 whitespace-nowrap">
                        Rp. 20.000,-
                    </td>
                    <td class=" text-gray-900 px-6 py-4 whitespace-nowrap ">
                     
                    <button class="block text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200  font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-gray-700 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button" data-modal-toggle="authentication-modal">
                        Ubah
                    </button>

                    <div id="authentication-modal" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full">
                        <div class="relative p-4 w-full max-w-md h-full md:h-auto">
                            <div class="relative bg-white rounded-lg shadow dark:bg-gray-600 ">
                                <button type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-left dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="authentication-modal">
                                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                    <span class="sr-only">Close modal</span>
                                </button>
                                <div class="py-6 px-6 lg:px-8">
                                    <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Ubah Harga</h3>
                                    <form class="space-y-6" action="#">
                                        <div>
                                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Kategori</label>
                                            <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
                                        </div>
                                        <div>
                                            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Harga Hari Biasa</label>
                                            <input type="password" name="password" id="password" placeholder="15000" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                                        </div>
                                        <div>
                                            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Harga Hari Libur</label>
                                            <input type="password" name="password" id="password" placeholder="17000" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                                        </div>
                                        
                                        
                                        <button type="submit" class="w-full text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Ubah</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div> 
                    <button type="button" class="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Hapus</button>
                    
                    </td>
                    </tr>
                </tbody>
                </table>
            </div>
            </div>
        </div>
    </div>
  </div>
  )
}

export default CardMasterTiket