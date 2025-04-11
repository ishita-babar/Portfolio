import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-[#FAF9F6] py-4 border-b-2 border-black z-50 text-black">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 font-vietnam">
        <h1 className="text-xl font-semibold">Ishita Babar</h1>
        <div className="flex gap-8 text-lg font-medium font-vietnam">
          <Link href="/projects" className="hover:underline">Projects</Link>
          <Link href="/experience" className="hover:underline">Experience</Link>
          <Link href="/skills" className="hover:underline">Skills</Link>
          <Link href="/contact" className="hover:underline">Contact</Link>
        </div>
      </div>
    </nav>
  );
}
