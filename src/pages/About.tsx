import { useEffect } from "react";
import { useTheme } from "../contexts/themeContext";

function About() {
  const { theme } = useTheme();

  useEffect(() => {
    document.title = "About - Sean Finch • SoCal";
  }, []);

  return (
    <div
      className={`flex justify-center ${theme === "light" ? "bg-light-mode text-ultra-dark-mode" : "bg-dark-mode text-light-mode"}`}
    >
      <div className="w-full mx-4 md:mx-0">
        <div className="flex flex-col items-center text-center mt-16">
          <h1 className="text-4xl font-bold mb-8 font-jost">About Me</h1>
          <div className="flex flex-col md:flex-row justify-center items-center md:space-x-8 md:items-center">
            <img
              src="/SeanPortrait.jpg"
              alt="Sean Finch Portrait"
              className="w-3/4 md:w-96 h-full md:h-120 object-cover mb-8 md:mb-0 rounded-xl"
            />
            <div
              className={`w-full md:w-1/2 mb-8 p-4 border-${theme === "light" ? "border-ultra-light-mode" : "border-ultra-dark-mode"} border-2 rounded-lg text-${theme === "light" ? "text-ultra-light-mode" : "text-ultra-dark-mode"} m-4 font-raleway shadow-lg`}
            >
              <p className="mb-4">
                Hey there! I'm Sean Finch, hailing from Orange County,
                California. Currently, I'm pursuing a Bachelor of Science in
                Cybersecurity with a Minor in Music at Northeastern University.
              </p>
              <p className="mb-4">
                At the Reuse Depot in Northeastern University Oakland, I've
                honed my skills as an Eco-Representative, implementing efficient
                data tracking systems and enhancing customer flow. My experience
                as a Political Canvasser in Fullerton equipped me with the
                ability to navigate complex conversations with professionalism.
              </p>
              <p className="mb-4">
                In Summer 2024, I was a Cybersecurity Intern at CENIC. CENIC's
                CalREN Network is country's largest statewide research and
                education network, which now serves more than 20 million users.
                During my internship, I performed vulnerability management,
                analysis of DDoS attacks, and measured KPIs of the Information
                Security Office's ongoing efforts to bolster security.
              </p>
              <p className="mb-4">
                Proficient in HTML, CSS, JavaScript, React.js, and more, coupled
                with strong organizational abilities and public speaking
                prowess, I'm dedicated to making a positive impact in both my
                academic and professional pursuits.
              </p>
              <p className="mb-4">
                Recognized for excellence with awards such as the Fullerton
                Union High School Academy of the Arts Completer and the Jadwin
                Global Affairs Scholarship, I'm excited to continue learning and
                growing on this journey.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
