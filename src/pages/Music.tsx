import { useEffect } from "react";
import { useTheme } from "../contexts/themeContext";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

interface SocialMediaButtonProps {
  url: string;
  children: React.ReactNode;
  className?: string;
}

const SocialMediaButton: React.FC<SocialMediaButtonProps> = ({
  url,
  children,
  className = "",
}) => {
  const { theme } = useTheme();
  const buttonClass = `flex justify-center mx-2 my-1 px-4 py-2 text-base font-jost font-medium border border-transparent rounded-lg hover:border-indigo-600 cursor-pointer transition-colors duration-200 ${
    theme === "light"
      ? "bg-ultra-light-mode text-ultra-dark-mode"
      : "bg-ultra-dark-mode text-light-mode"
  } ${className}`;

  const openLinkInNewTab = () => {
    window.open(url, "_blank");
  };

  return (
    <button className={buttonClass} onClick={openLinkInNewTab}>
      {children}
    </button>
  );
};

function Music() {
  const { theme } = useTheme();

  useEffect(() => {
    document.title = "Music - Sean Finch • SoCal";
  }, []);

  return (
    <div
      className={`flex justify-center ${theme === "light" ? "bg-light-mode text-ultra-dark-mode" : "bg-dark-mode text-light-mode"}`}
    >
      <div className="w-full mx-4 md:mx-0">
        <div className="flex flex-col items-center text-center mt-16">
          <h1 className="text-4xl font-bold mb-8 font-jost">Music</h1>
          <div className="flex justify-center flex-wrap">
            <SocialMediaButton url="/music_resume.pdf" className="mb-4 md:mb-0">
              Music Resume
            </SocialMediaButton>
            <SocialMediaButton
              url="https://youtube.com/playlist?list=PLTjk61hZ9AMUzHDoTL2T4h7XOAIqFlX-4&si=jZlKp-LkJ1imQTnK"
              className="mb-4 md:mb-0"
            >
              Video Gallery
            </SocialMediaButton>
          </div>
          <div className="p-4 flex flex-col md:flex-row justify-center items-center md:space-x-8 md:items-center">
            <img
              src="/SeanAcademyPoster.jpg"
              alt="Sean Finch Academy of the Arts Poster"
              className="w-3/4 md:w-96 h-full md:h-120 object-cover mb-8 md:mb-0 rounded-xl"
            />
            <div
              className={`w-full md:w-1/2 mb-8 p-4 border-${theme === "light" ? "border-ultra-light-mode" : "border-ultra-dark-mode"} border-2 rounded-lg text-${theme === "light" ? "text-ultra-light-mode" : "text-ultra-dark-mode"} m-4 font-raleway shadow-lg`}
            >
              <p className="mb-4">
                My name is Sean Finch, and I'm currently a third-year
                Cybersecurity major and Music minor at Northeastern University.
              </p>
              <p className="mb-4">
                Music has been central to my life since childhood. I began
                playing piano in first grade and discovered my passion for
                singing as I grew older. Joining choir in eighth grade marked
                the beginning of my vocal journey, one that continues to bring
                me immense joy as I develop my craft.
              </p>
              <p className="mb-4">
                Throughout high school at Fullerton Union High School, I
                immersed myself in various ensembles: Bass Chorus, Vocal
                Ensemble (three years), and the FUHS Fullertones. I served as
                tenor section lead in Vocal Ensemble for two years and president
                of the Fullertones. Beyond my school, I sang in the SCVA
                Southern California Regional Honor Choir for three years and the
                CASMEC California All-State Honor Choir for two years.
              </p>
              <p className="mb-4">
                During my first year at Northeastern, I expanded my musical
                horizons by singing in St. Mary's College of California Glee and
                Chamber Singers as a visiting student, and as a member of the UC
                Berkeley University Chorus.
              </p>
              <p className="mb-4">
                Currently, I'm singing in Northeastern University's Chorus and
                Chamber Ensemble under the direction of Dr. Katherine Chan. I
                also serve as Vice President (Spring 2025) and President (Fall
                2025 - Spring 2026) of the Northeastern University Choral
                Society.
              </p>
              <p className="mb-4">
                Additional accomplishments include serving as Historian for the
                Tri-M Music Honor Society Chapter #7054, earning the Music
                Teachers' Association of California Certificate of Merit Level 5
                in Piano, receiving a nomination for Orange County Artist of the
                Year in Piano (2023), completing the Fullerton Union High School
                Academy of the Arts Choral/Vocal Track, and receiving a voice
                scholarship from Northeastern University's Music Department.
              </p>
            </div>
          </div>
        </div>
        <div className="w-full p-4 justify-center">
          <Carousel>
            <div className="w-full h-full flex flex-col justify-center items-center">
              <img
                src="/music_image_10.jpg"
                className="object-cover h-full rounded-lg"
                style={{ maxHeight: "400px", width: "auto" }}
              />
              <p className="legend">Music Portrait</p>
            </div>
            <div className="w-full h-full flex flex-col justify-center items-center">
              <img
                src="/music_image_9.jpg"
                className="object-cover h-full rounded-lg"
                style={{ maxHeight: "400px", width: "auto" }}
              />
              <p className="legend">CASMEC Honor Choir Concert 2023</p>
            </div>
            <div className="w-full h-full flex flex-col justify-center items-center">
              <img
                src="/music_image_8.jpg"
                className="object-cover h-full rounded-lg"
                style={{ maxHeight: "400px", width: "auto" }}
              />
              <p className="legend">Winter Concert 2022</p>
            </div>
            <div className="w-full h-full flex flex-col justify-center items-center">
              <img
                src="/music_image_7.jpg"
                className="object-cover h-full rounded-lg"
                style={{ maxHeight: "400px", width: "auto" }}
              />
              <p className="legend">SCVA Honor Choir Concert 2022</p>
            </div>
            <div className="w-full h-full flex flex-col justify-center items-center">
              <img
                src="/music_image_6.jpg"
                className="object-cover h-full rounded-lg"
                style={{ maxHeight: "400px", width: "auto" }}
              />
              <p className="legend">Spring Concert 2022</p>
            </div>
            <div className="w-full h-full flex flex-col justify-center items-center">
              <img
                src="/music_image_5.jpg"
                className="object-cover h-full rounded-lg"
                style={{ maxHeight: "400px", width: "auto" }}
              />
              <p className="legend">Spring Concert 2022 Poster</p>
            </div>
            <div className="w-full h-full flex flex-col justify-center items-center">
              <img
                src="/music_image_4.jpg"
                className="object-cover h-full rounded-lg"
                style={{ maxHeight: "400px", width: "auto" }}
              />
              <p className="legend">CASMEC Honor Choir Concert 2022</p>
            </div>
            <div className="w-full h-full flex flex-col justify-center items-center">
              <img
                src="/music_image_3.jpg"
                className="object-cover h-full rounded-lg"
                style={{ maxHeight: "400px", width: "auto" }}
              />
              <p className="legend">SCVA Honor Choir Concert 2021</p>
            </div>
            <div className="w-full h-full flex flex-col justify-center items-center">
              <img
                src="/music_image_2.jpg"
                className="object-cover h-full rounded-lg"
                style={{ maxHeight: "400px", width: "auto" }}
              />
              <p className="legend">Winter Concert 2019</p>
            </div>
            <div className="w-full h-full flex flex-col justify-center items-center">
              <img
                src="/music_image_1.jpg"
                className="object-cover h-full rounded-lg"
                style={{ maxHeight: "400px", width: "auto" }}
              />
              <p className="legend">Fall Concert 2019</p>
            </div>
          </Carousel>
        </div>
      </div>
    </div>
  );
}

export default Music;
