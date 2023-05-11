import React, { useRef, useState } from 'react';
import { NavBar, Footer } from '../components';
import { headphone } from '../assets';
import { useAuthContext } from '../contexts/auth/AuthContext';
import { PencilIcon } from '@heroicons/react/24/outline';

const ProfilePage = () => {
  const { user, updateProfile } = useAuthContext();
  const nameRef = useRef(null);
  const emailRef = useRef(null);

  const [isEditing, setIsEditing] = useState(false);

  const onEditProfile = async () => {
    if (!isEditing) {
      setIsEditing((prev) => !prev);
      nameRef.current.disabled = false;
      emailRef.current.disabled = false;
      nameRef.current.focus();
      console.log('1');
      return;
    } else {
      await updateProfile('me', {
        name: nameRef.current.value,
        email: emailRef.current.value,
      });
      setIsEditing((prev) => !prev);
      nameRef.current.disabled = true;
      emailRef.current.disabled = true;
      console.log('2');
    }
  };
  const onEditPassword = async () => {
    if (!isEditing) {
      setIsEditing((prev) => !prev);
      nameRef.current.disabled = false;
      emailRef.current.disabled = false;
      nameRef.current.placeholder = 'Enter old password';
      nameRef.current.value = '';
      emailRef.current.placeholder = 'Enter new password';
      emailRef.current.value = '';
      nameRef.current.focus();
      return;
    } else {
      await updateProfile('password', {
        oldPassword: nameRef.current.value,
        password: emailRef.current.value,
      });
      setIsEditing((prev) => !prev);
      nameRef.current.disabled = true;
      emailRef.current.disabled = true;
      nameRef.current.value = user.name;
      emailRef.current.value = user.email;
    }
  };

  return (
    <div>
      <NavBar />
      <h1>Profile</h1>
      <div className=' flex mt-[6rem]'>
        <div className='w-[200px] h-[auto]'>
          <img src={headphone} />
        </div>
        <div className='flex flex-col ml-[5rem] justify-end gap-[1.6rem]'>
          <input ref={nameRef} defaultValue={user.name} disabled={true} />
          <input ref={emailRef} defaultValue={user.email} disabled={true} />
          <div className='flex gap-[1rem] '>
            <button onClick={onEditProfile}>
              <PencilIcon width={24} />
            </button>
            <button
              onClick={onEditPassword}
              className='bg-font5 px-[1.6rem] py-[1rem] rounded-md'
            >
              Reset Password
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;
