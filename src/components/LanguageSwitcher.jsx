const LanguageSwitcher = () => {
  const changeLanguage = (lang) => {
    const translateElement = document.querySelector('.goog-te-combo');
    if (translateElement) {
      translateElement.value = lang;
      const event = new Event('change');
      translateElement.dispatchEvent(event);
    }
    
  };

  return (
    <div>
      <button className='bg-red-500' onClick={() => changeLanguage('en')}>English</button>
      <button onClick={() => changeLanguage('es')}>Español</button>
    </div>
  );
};

export default LanguageSwitcher;
