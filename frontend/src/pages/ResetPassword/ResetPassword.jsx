import React, { useState } from "react";
import { useContext } from "react";
import { RecoveryContext } from "../../App";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";


export default function Reset() {
    const navigate=useNavigate()
  const { email} = useContext(RecoveryContext);
  const location=useLocation()
  const [values,setvalues]=useState({
    email:location.state.email,
    password:''
})
  function changePassword() {
    axios.post('http://localhost:8801/changepassword',values)
    .then(res=>{
      if(res.data.Status=='Success'){
        navigate('/')
      }
    })
  }

  return (
    <div>
      <section className="bg-gray-50 w-screen bg-white-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
            <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-white">
              Change Password
            </h2>
            <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5">
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 text-white"
                >
                  New Password
                </label>
                <input
                  type="text"
                  name="password"
                  id="password"
                  onChange={e=>setvalues({...values,password:e.target.value})}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-black text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-white-700 border-black-900 placeholder-gray-400 text-black focus:ring-blue-500 focus:border-blue-500"
                  required=""
                ></input>
              </div>
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block mb-2 text-sm font-medium text-gray-900 text-white"
                >
                  Confirm password
                </label>
                <input
                  type="password"
                  name="confirm-password"
                  id="confirm-password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-black text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-white-700 border-black-900 placeholder-gray-400 text-black focus:ring-blue-500 focus:border-blue-500"
                  required=""
                ></input>
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="newsletter"
                    aria-describedby="newsletter"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    required=""
                  ></input>
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="newsletter"
                    className="font-light text-white"
                  >
                    I accept the{" "}
                    <a
                      className="font-medium  hover:underline "
                      href="#"
                    >
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              </div>
            </form>
            <button
              onClick={() => changePassword()}
              className="w-full text-white bg-dark-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-6 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Reset passwod
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
