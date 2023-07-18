import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useState } from 'react';
import swal from 'sweetalert';

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setErrorMessage('');
    const { name, value } = e.target;
    if (name === 'current_password') {
      setCurrentPassword(value);
    } else if (name === 'new_password') {
      setNewPassword(value);
    } else if (name === 'confirm_password') {
      setConfirmPassword(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Kirim permintaan ke backend untuk mengubah password
    // Pastikan untuk melakukan validasi di sisi server juga

    if (newPassword !== confirmPassword) {
      setErrorMessage('Password baru tidak cocok dengan konfirmasi password.');
      return;
    }

    // Kirim data ke backend, misalnya menggunakan Axios
    axios.post(`${process.env.REACT_APP_API_ENDPOINT}/api/change-password`, {
      current_password: currentPassword,
      new_password: newPassword,
      new_password_confirmation: confirmPassword,
    }, {
        headers : {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          Authorization: `Bearer ${Cookies.get('token')}`,
        }})
      .then((res) => {
        if(res.data.status === 200){
          setCurrentPassword('')
          setNewPassword('')
          setConfirmPassword('')
          swal("Success",res.data.message,"success")
      }
      else if(res.data.status === 401){
          swal("Error",res.data.message,"error")
      }
      else if(res.data.status === 400){
          swal("Error","Error","error");
      }
        // Tampilkan pesan sukses atau lakukan tindakan lain
      })
      .catch((error) => {
        console.error(error.response.data);
        // Tampilkan pesan error atau lakukan tindakan lain
        setErrorMessage(error.response.data.message);
      });
  };

  return (
    <div className='w-2/3'>
  <h2 className="text-xl font-bold mb-4">Ganti Password</h2>
  <form onSubmit={handleSubmit} className="space-y-4">
    <div>
      <label htmlFor="current_password" className="block font-semibold mb-1">Password Saat ini:</label>
      <input
        type="password"
        id="current_password"
        name="current_password"
        value={currentPassword}
        onChange={handleChange}
        className="border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-blue-500 w-full"
      />
    </div>
    <div>
      <label htmlFor="new_password" className="block font-semibold mb-1">Password Baru:</label>
      <input
        type="password"
        id="new_password"
        name="new_password"
        value={newPassword}
        onChange={handleChange}
        className="border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-blue-500 w-full"
      />
    </div>
    <div>
      <label htmlFor="confirm_password" className="block font-semibold mb-1">Konfirmasi Password Baru :</label>
      <input
        type="password"
        id="confirm_password"
        name="confirm_password"
        value={confirmPassword}
        onChange={handleChange}
        className="border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-blue-500 w-full"
      />
    </div>
    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
      Change Password
    </button>
  </form>
  {errorMessage && <p className="text-red-500">{errorMessage}</p>}
</div>

  );
};

export default ChangePassword;
