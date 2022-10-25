const Loading = () => {
  return (
    <div className=' z-[999] spinner opacity-75 fixed'>
      {/* <div className='loader'></div> */}
      <lottie-player
        src='https://assets8.lottiefiles.com/packages/lf20_gSMVZV7ZdZ.json'
        background='transparent'
        speed='1'
        style={{ width: '100px', height: '100px' }}
        loop
        autoplay
      ></lottie-player>
      <p className=' font-aulire text-lg  text-emerald-300'>
        Loading... Please Wait...
      </p>
    </div>
  );
};

export default Loading;
