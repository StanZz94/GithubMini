export default function Footer() {
  return (
    <footer className="border-t bg-white mt-10">
      <div className="max-w-6xl mx-auto px-6 py-6 text-sm text-gray-500 text-center">
        © {new Date().getFullYear()} Github-Mini. Built with React & GitHub API.
      </div>
    </footer>
  );
}
