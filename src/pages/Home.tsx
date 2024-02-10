import '../index.css'
import {
  FaGithub,
  FaInstagram,
  FaReddit,
  FaLinkedin,
  FaSpotify,
  FaYoutube,
} from 'react-icons/fa';

function Home() {
  const openLinkInNewTab = (url: string) => {
    window.open(url, '_blank');
  };
  return (
    <div>
      <div>
        <h1>Sean Finch</h1>
        <h5>the one and only</h5>
        <h3>Computer Science @ Northeastern University c/o 2027</h3>
        <h4>Student, Homelabber, Musician, and more</h4>
      </div>
      <div className='social-buttons'>
        <div className='button-group'>
          <button
            onClick={() => openLinkInNewTab('https://github.com/seanfinchg')}
          >
            <FaGithub size={30} />
          </button>
          <button
            onClick={() =>
              openLinkInNewTab('https://www.instagram.com/straight.up.sean/')
            }
          >
            <FaInstagram size={30} />
          </button>
          <button
            onClick={() =>
              openLinkInNewTab('https://www.reddit.com/user/mk7sean')
            }
          >
            <FaReddit size={30} />
          </button>
          <button
            onClick={() =>
              openLinkInNewTab(
                'https://www.linkedin.com/in/sean-finch-21803927b/',
              )
            }
          >
            <FaLinkedin size={30} />
          </button>
          <button
            onClick={() =>
              openLinkInNewTab(
                'https://open.spotify.com/user/31zrqevhky5vln3wuz3uuixspku4',
              )
            }
          >
            <FaSpotify size={30} />
          </button>
          <button
            onClick={() =>
              openLinkInNewTab(
                'https://www.youtube.com/channel/UC-0Oz_dgX4-MzMO_KNH7XuA',
              )
            }
          >
            <FaYoutube size={30} />
          </button>
        </div>
        <div className='button-group'>
          <button
            onClick={() =>
              openLinkInNewTab('https://300021720.wixsite.com/aotaportfolio')
            }
          >
            Music Portfolio
          </button>
          <button
            onClick={() =>
              openLinkInNewTab(
                'https://docs.google.com/document/d/19Yhwee36co-cGrTDsVJUwNw30nKb_iQjcCVFIlCAKtg/edit?usp=sharing',
              )
            }
          >
            Resume
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
