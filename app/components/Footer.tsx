export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 text-gray-700 py-8 shadow-inner mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm md:text-base text-center md:text-left mb-4 md:mb-0 font-semibold">
            &copy; {new Date().getFullYear()} Crypto Dashboard. All rights reserved.
          </p>
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
            <a
              href="#"
              className="text-gray-700 hover:text-indigo-600 transition duration-300 ease-in-out"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-indigo-600 transition duration-300 ease-in-out"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-indigo-600 transition duration-300 ease-in-out"
            >
              Contact Us
            </a>
          </div>
        </div>
        <div className="mt-6 text-center md:text-left">
          <p className="text-sm font-medium">
            Follow us on: 
            <a href="#" className="mx-2 text-gray-700 hover:text-indigo-600 transition duration-300 ease-in-out">Twitter</a> | 
            <a href="#" className="mx-2 text-gray-700 hover:text-indigo-600 transition duration-300 ease-in-out">Facebook</a> | 
            <a href="#" className="mx-2 text-gray-700 hover:text-indigo-600 transition duration-300 ease-in-out">LinkedIn</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
