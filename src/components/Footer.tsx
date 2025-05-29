export default function Footer() {
  return (
    <footer className="bg-dark text-white py-4 mt-5">
      <div className="container text-center">
        <p className="mb-0">
          &copy; {new Date().getFullYear()} Greenwood University Lost & Found
        </p>
      </div>
    </footer>
  );
}