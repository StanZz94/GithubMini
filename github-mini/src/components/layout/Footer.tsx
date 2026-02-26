export default function Footer() {
  return (
    <footer className="border-t-2 bg-stone-800 mt-10">
      <div className="max-w-6xl mx-auto px-6 py-6 text-base text-gray-400 text-center">
        © {new Date().getFullYear()} Github-Mini. Built with React & GitHub API.
      </div>
    </footer>
  );
}
