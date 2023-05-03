import React, { useEffect } from 'react';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import { useAuthContext } from '../../contexts/auth/AuthContext';
import { TrashIcon } from '@heroicons/react/24/outline';
import Alert from '../../components/Alert';
import { useFeatureContext } from '../../contexts/feature/FeatureContext';

const AdminUsers = () => {
  const { showAlert } = useFeatureContext();
  const { adminUsers, getAllUsersAdmin, adminDeleteUser } = useAuthContext();
  useEffect(() => {
    getAllUsersAdmin();
  }, []);
  return (
    <>
      <NavBar />
      {showAlert ? <Alert /> : null}
      <div className='flex flex-col my-[6rem]'>
        <h1 className=' self-center text-[3.2rem] font-clash600'>All Users</h1>
        <table className='w-full text-[1.6rem] sm:text-[1.2rem] text-left text-font5 mt-[8rem]'>
          <thead className='text-[1.8rem] text-font5 uppercase bg-font4 '>
            <tr className=' sm:text-[1.2rem]'>
              <th scope='col' className='px-6 py-3 sm:px-1  sm:py-1'>
                Serial Id
              </th>
              <th scope='col' className='px-6 py-3 sm:px-1  sm:py-1'>
                User Name
              </th>
              <th scope='col' className='px-6 py-3 sm:px-1  sm:py-1 '>
                User Email
              </th>
              <th scope='col' className='px-6 py-3 sm:px-1  sm:py-1 '>
                User Role
              </th>
              <th scope='col' className='px-6 py-3 sm:px-1  sm:py-1'>
                Created At
              </th>
              <th scope='col' className='px-6 py-3 sm:px-1  sm:py-1'>
                Delete User
              </th>
            </tr>
          </thead>
          {adminUsers?.map((user, index) => {
            return (
              <tbody key={index}>
                <tr className=' bg-green3 border-b hover:bg-green4'>
                  <th
                    scope='row'
                    className='px-6 py-4 font-medium whitespace-nowrap'
                  >
                    {index + 1}
                  </th>
                  <td className='px-6 py-4'>{user.name}</td>
                  <td className='px-6 py-4 '>{user.email}</td>
                  <td className='px-6 py-4 '>{user.roles}</td>
                  <td className='px-6 py-4 '>{user.createdAt.slice(0, 10)}</td>
                  <td className='px-6 py-4 '>
                    <button
                      onClick={() => {
                        adminDeleteUser(user._id);
                      }}
                      className=' w-[80%] flex justify-center items-center'
                    >
                      <TrashIcon width={24} color='red' />
                    </button>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
      <Footer />
    </>
  );
};

export default AdminUsers;
