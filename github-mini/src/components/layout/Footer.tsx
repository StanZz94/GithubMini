export default function Footer() {
  return (
    <footer className="border-t-2 bg-stone-800 mt-6 md:mt-10">
      <div className="max-w-6xl mx-auto px-6 py-3 md:py-6 text-sm md:text-base text-gray-400 text-center">
        © {new Date().getFullYear()} Github Developer Analytics. Built with ReactJS & GitHub API.
      </div>
    </footer>
  );
}
