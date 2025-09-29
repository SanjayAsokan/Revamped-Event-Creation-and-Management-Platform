import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-200 mt-20">
      <div className="max-w-7xl mx-auto py-12 px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* About */}
        <div>
          <h3 className="font-bold text-xl mb-4">Event Platform</h3>
          <p className="text-gray-400 text-sm">
            Organize, manage, and share events effortlessly. Track RSVPs, timelines, and more!
          </p>
        </div>

        {/* Contact & Social */}
        <div>
          <h3 className="font-bold text-xl mb-4">Contact Us</h3>
          <p className="text-gray-400 text-sm">support@eventplatform.com</p>
          <p className="text-gray-400 text-sm">+91 9876543210</p>
          <div className="flex space-x-4 mt-3">
            <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
              <FaFacebookF size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
              <FaTwitter size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-pink-500 transition-colors">
              <FaInstagram size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
              <FaLinkedinIn size={20} />
            </a>
          </div>
        </div>

        {/* Location */}
        <div>
          <h3 className="font-bold text-xl mb-4">Our Location</h3>
          <iframe
            title="map"
            className="w-full h-40 rounded-lg border-0"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.053217655058!2d78.40785137478809!3d17.446521888144746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb937b8e6c3f8d%3A0xf5bcbf318f93356b!2sYour%20Event%20Location!5e0!3m2!1sen!2sin!4v1699999999999!5m2!1sen!2sin"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </div>

      <div className="text-center py-4 border-t border-gray-700 text-gray-500 text-sm">
        © {new Date().getFullYear()} Event Platform. All rights reserved.
      </div>
    </footer>
  );
}
