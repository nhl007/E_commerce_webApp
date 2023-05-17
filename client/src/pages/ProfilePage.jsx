import React, { useRef, useState } from 'react';
import { NavBar, Footer, Alert } from '../components';
import { useAuthContext } from '../contexts/auth/AuthContext';
import { PencilIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useFeatureContext } from '../contexts/feature/FeatureContext';

const ProfilePage = () => {
  const { user, updateProfile } = useAuthContext();
  const { showAlert } = useFeatureContext();
  const nameRef = useRef(null);
  const emailRef = useRef(null);

  const [isEditing, setIsEditing] = useState(false);
  const [updatingProfile, setUpdatingProfile] = useState(true);

  const onEditProfile = async () => {
    setUpdatingProfile(true);
    if (!isEditing) {
      setIsEditing((prev) => !prev);
      nameRef.current.disabled = false;
      emailRef.current.disabled = false;
      nameRef.current.focus();
      return;
    } else {
      await updateProfile('me', {
        name: nameRef.current.value,
        email: emailRef.current.value,
      });
      setIsEditing((prev) => !prev);
      nameRef.current.disabled = true;
      emailRef.current.disabled = true;
      // console.log('2');
    }
  };

  const onEditPassword = async () => {
    setUpdatingProfile(false);
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

  const clearAndReset = () => {
    nameRef.current.disabled = true;
    emailRef.current.disabled = true;
    nameRef.current.value = user.name;
    emailRef.current.value = user.email;
    setIsEditing((prev) => !prev);
  };

  return (
    <div>
      <NavBar />
      {showAlert && <Alert />}
      <h1 className='text-[3.2rem] leading-[4rem] text-font1 font-clash600 mt-[3.2rem] sm:text-center mb-2'>
        Profile
      </h1>
      <div className=' h-[1px] w-full bg-font5 mb-8' />
      <div className=' flex'>
        <div className='w-[150px] max-h-[14rem] flex rounded-[50%] text-[4.8rem] bg-green3 justify-center items-center'>
          {/* <img src={} /> */}
          {user.name.charAt(0).toUpperCase()}
        </div>
        <div className='flex flex-col ml-[5rem] sm:ml-[3rem] justify-end gap-[2.4rem] sm:gap-[1.6rem]'>
          <input ref={nameRef} defaultValue={user.name} disabled={true} />
          <input ref={emailRef} defaultValue={user.email} disabled={true} />
          <div className='flex gap-[1rem] '>
            {isEditing && (
              <button onClick={clearAndReset}>
                <XMarkIcon width={30} color='red' />
              </button>
            )}
            <button onClick={onEditProfile}>
              {!isEditing ? (
                <PencilIcon width={30} />
              ) : (
                <CheckIcon
                  className={`${!updatingProfile && 'hidden'}`}
                  color='green'
                  width={30}
                />
              )}
            </button>
            <button
              onClick={onEditPassword}
              className={`${
                isEditing ? 'bg-none' : 'bg-font5'
              } px-[1rem] py-[1rem] rounded-md`}
            >
              {!isEditing ? (
                'Change Password'
              ) : (
                <CheckIcon
                  className={`${updatingProfile && 'hidden'}`}
                  color='green'
                  width={30}
                />
              )}
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;
