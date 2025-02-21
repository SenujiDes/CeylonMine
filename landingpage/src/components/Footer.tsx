export default function Footer() {
  return (
    <footer className="bg-gray-50 py-12 px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Ceylon Mine</h3>
            <p className="text-gray-600">
              Revolutionizing the mining industry through innovative technology solutions.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#features" className="text-gray-600 hover:text-blue-600">Features</a></li>
              <li><a href="#timeline" className="text-gray-600 hover:text-blue-600">Timeline</a></li>
              <li><a href="#team" className="text-gray-600 hover:text-blue-600">Team</a></li>
              <li><a href="#contact" className="text-gray-600 hover:text-blue-600">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-600">
              <li>Email: info@ceylonmine.com</li>
              <li>Phone: +94 XX XXX XXXX</li>
              <li>Address: Colombo, Sri Lanka</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              {/* Add social media icons/links here */}
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} Ceylon Mine. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
} 