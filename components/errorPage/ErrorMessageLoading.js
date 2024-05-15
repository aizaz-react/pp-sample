const ErrorMessageLoading = () => {
    return (
      <div
        className='skeleton d-flex flex-column align-center gap-1'
        style={{
          border: `1px solid rgba(130, 130, 130, 0.2)`,
          padding: '40px',
          width: '100%',
          borderRadius: '30px'
        }}
      >
        <div
          className='line'
          style={{ width: '5rem', height: '5rem', marginBottom: '2rem' }}
        />
        <div
          className='line'
          style={{ width: '70%', height: '5rem', marginBottom: '2rem' }}
        />
        <div className='line' style={{ width: '100%', height: '2.5rem' }} />
        <div className='line' style={{ width: '100%', height: '2.5rem' }} />
        <div className='d-flex justify-between w-100'>
          <div className='line' style={{ width: '30%', height: '1rem' }} />
          <div className='line' style={{ width: '30%', height: '1rem' }} />
        </div>
        <div
          className='line'
          style={{
            width: '100%',
            height: '2.5rem',
            borderRadius: '2rem',
            marginTop: '2rem'
          }}
        />
      </div>
    );
  };
  
  export default ErrorMessageLoading;
  