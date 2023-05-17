const ButtonGreen = ({ text, onClick, width, height }) => {
  return (
    <button
      onClick={onClick}
      className={`rounded-[8px] bg-green2 px-[1.6rem] py-[1.2rem] sm:py-[1rem] text-font2 font-clash700 text-[1.6rem] sm:text-[1.2rem] leading-[21px] sm:w-[10rem] sm:h-auto w-[${width}] h-[${height}]`}
    >
      {text}
    </button>
  );
};

export default ButtonGreen;
