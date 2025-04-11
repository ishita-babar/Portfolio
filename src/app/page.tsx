import Navbar from "../components/Navbar";
import CursorSpotlight from "../components/Cursor";
import Experience from "./experience/page";
import Projects from "./projects/page";
import Skills from "./skills/page";
import Contacts from "./contact/page";

export default function Home() {
  return (
    <>
      <CursorSpotlight />
      <div
        className="relative h-screen text-black font-vietnam bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: "url('https://i.ibb.co/dwL20gp5/Landing-page-bg-1.png')" }}
      >
        <Navbar />
        <div className="w-full h-full flex items-center justify-center px-6 mix-blend-normal">
          <div className="text-center max-w-3xl text-5xl font-semibold">
            <h1>I’m Ishita Babar</h1>
            <p className="text-lg mt-4">
              With 1 year of experience with web development, I like to create magical websites
            </p>
            <p className="text-xl mt-6 font-semibold">A Web Developer</p>
          </div>
        </div>
      </div>
      <Projects/>
      <Experience/>
      <Skills/>
      <Contacts/>
    </>
  );
}
