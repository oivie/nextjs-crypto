export default function Footer() {
    return (
      <footer className="bg-blue-200 text-gray-800 py-6 mt-auto"> {/* Changed bg color to light blue */}
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm md:text-base text-center md:text-left mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Crypto Dashboard. All rights reserved.
            </p>
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
              <a
                href="/privacy-policy"
                className="text-indigo-600 hover:underline"
              >
                Privacy Policy
              </a>
              <a
                href="/terms-of-service"
                className="text-indigo-600 hover:underline"
              >
                Terms of Service
              </a>
              <a
                href="/contact"
                className="text-indigo-600 hover:underline"
              >
                Contact Us
              </a>
            </div>
          </div>
          <div className="mt-4 text-center md:text-left">
            <p className="text-sm">
              Follow us on: 
              <a href="#" className="mx-2 text-indigo-600 hover:underline">Twitter</a> |
              <a href="#" className="mx-2 text-indigo-600 hover:underline">Facebook</a> |
              <a href="#" className="mx-2 text-indigo-600 hover:underline">LinkedIn</a>
            </p>
          </div>
        </div>
      </footer>
    );
  }
  