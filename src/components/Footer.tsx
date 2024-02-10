import '../index.css'

const Footer: React.FC = () => {
  const openLinkInNewTab = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <footer>
      <p>
        <span
          className='footer-link'
          onClick={() => openLinkInNewTab('https://seanfinch.com')}
        >
          seanfinch.com
        </span>{' '}
        • Website coded with help from{' '}
        <span
          className='footer-link'
          onClick={() => openLinkInNewTab('https://asahoo.dev')}
        >
          asahoo.dev
        </span>
      </p>
      <p>
        <a className='footer-link' href='mailto:hello@seanfinch.com'>
          hello@seanfinch.com
        </a>
      </p>
    </footer>
  );
};

export default Footer;
