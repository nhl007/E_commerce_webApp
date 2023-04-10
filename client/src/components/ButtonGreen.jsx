const ButtonGreen = ({ text, onClick, width, height }) => {
  return (
    <button
      onClick={onClick}
      className={`rounded-[8px] bg-green2 px-[16px] py-[11.5px] text-font2 font-clash700 text-[16px] leading-[21px] w-[${width}] h-[${height}]`}
    >
      {text}
    </button>
  );
};

export default ButtonGreen;
