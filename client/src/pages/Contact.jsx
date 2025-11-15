import {
  IoLocationOutline,
  IoCallOutline,
  IoMailOutline,
} from "react-icons/io5";
import { FaInstagram } from "react-icons/fa";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-linear-to-r from-gray-800 to-gray-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 lg:px-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Get In Touch</h1>
          <p className="text-lg text-gray-300">
            We'd love to hear from you. Reach out for any inquiries or custom
            printing needs.
          </p>
        </div>
      </div>

      {/* Contact Content */}
      <div className="max-w-6xl mx-auto px-4 lg:px-16 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information Cards */}
          <div className="space-y-6 ">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">
              Contact Information
            </h2>

            {/* Address Card */}
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-start">
                <div className="bg-red-500 rounded-full p-3 mr-4">
                  <IoLocationOutline className="text-white text-2xl" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Our Location
                  </h3>
                  <p className="text-gray-600">
                    Building No.: VIII/387/8, Keezhillam
                    <br />
                    Perumbavoor, Ernakulam
                    <br />
                    Kerala 683541
                  </p>
                </div>
              </div>
            </div>

            {/* Phone Card */}
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-start">
                <div className="bg-red-500 rounded-full p-3 mr-4">
                  <IoCallOutline className="text-white text-2xl" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Call Us
                  </h3>
                  <p className="text-gray-600">
                    <a
                      href="tel:7025361333"
                      className="hover:text-red-500 transition-colors"
                    >
                      7025361333
                    </a>
                    <br />
                    <a
                      href="tel:9446576362"
                      className="hover:text-red-500 transition-colors"
                    >
                      9446576362
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Email Card */}
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-start">
                <div className="bg-red-500 rounded-full p-3 mr-4">
                  <IoMailOutline className="text-white text-2xl" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Email Us
                  </h3>
                  <p className="text-gray-600">
                    <a
                      href="mailto:metrodigital362@gmail.com"
                      className="hover:text-red-500 transition-colors"
                    >
                      metrodigital362@gmail.com
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Social Media Card */}
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-start">
                <div className="bg-red-500 rounded-full p-3 mr-4">
                  <FaInstagram className="text-white text-2xl" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Follow Us
                  </h3>
                  <a
                    href="https://www.instagram.com/metro_digital_printing/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-red-500 transition-colors inline-flex items-center"
                  >
                    @metro_digital_printing
                  </a>
                </div>
              </div>
            </div>
          </div>
          {/* Map Section */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              Find Us Here
            </h2>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.8!2d76.475!3d10.1!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDA2JzAwLjAiTiA3NsKwMjgnMzAuMCJF!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
