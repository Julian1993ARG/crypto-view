const Spinner = () => {
  return (
    <div className='w-full h-full flex justify-center items-center'>
      <div className='w-8 h-8 border-4 border-cyan rounded-full border-b-gray-200 animate-spin ' role='status' />
      <span className='ml-2'>Searching...</span>
    </div>
  );
};

export default Spinner;
