const Footer = () => (
  <footer id="footer" className="bg-white border-t border-gray-200">
    <div className="container mx-auto px-6 py-4">
      <div className="flex justify-between items-center">
        <span className="text-gray-600">© 2025 BookMind. All rights reserved.</span>
        <div className="flex space-x-6">
          <i className="fa-brands fa-twitter text-gray-600 hover:text-blue-600 cursor-pointer"></i>
          <i className="fa-brands fa-instagram text-gray-600 hover:text-blue-600 cursor-pointer"></i>
          <i className="fa-brands fa-github text-gray-600 hover:text-blue-600 cursor-pointer"></i>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
