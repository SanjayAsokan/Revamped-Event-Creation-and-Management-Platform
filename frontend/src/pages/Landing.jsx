import { Link } from "react-router-dom";
import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";
import { motion } from "framer-motion"; // For animations

export default function Landing() {
  const fadeInLeft = { hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.8 } } };
  const fadeInRight = { hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.8 } } };
  const fadeInUp = { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } };

  return (
    <div className="relative flex flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 sm:px-10 lg:px-20 min-h-screen overflow-hidden">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute -top-20 -left-20 w-72 h-72 bg-blue-600 rounded-full opacity-20 blur-3xl animate-pulse-slow"
        />
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-600 rounded-full opacity-20 blur-3xl animate-pulse-slow"
        />
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white mb-6"
        >
          Create & Manage Events Effortlessly 🎉
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl"
        >
          Organize your events, track RSVPs, manage timelines, and engage participants seamlessly — all in one platform.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6"
        >
          <Link
            to="/register"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 font-medium shadow-lg"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="bg-gray-200 text-gray-800 px-8 py-3 rounded-lg hover:bg-gray-300 transition-all duration-300 font-medium shadow-md"
          >
            Login
          </Link>
        </motion.div>
      </section>

      {/* Section 1: About Platform */}
      <section className="py-24 px-6 sm:px-10 lg:px-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInLeft}
          className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10"
        >
          <div className="md:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80"
              alt="Event Planning"
              className="rounded-2xl shadow-2xl w-full hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-4xl font-bold text-white mb-4">About Our Platform</h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              Our Event Platform simplifies creating and managing events of any scale. Plan, schedule, and track every detail in one intuitive interface, from RSVP management to timeline visualization and analytics.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Section 2: Features */}
      <section className="py-24 px-6 sm:px-10 lg:px-20 bg-gray-800">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInRight}
          className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10"
        >
          <div className="md:w-1/2 order-2 md:order-1 text-center md:text-left">
            <h2 className="text-4xl font-bold text-white mb-4">Key Features</h2>
            <ul className="text-gray-300 text-lg space-y-4 list-disc list-inside">
              <li>Plan events with detailed descriptions and schedules</li>
              <li>Manage RSVPs and attendee engagement</li>
              <li>Analyze timelines, stats, and event performance</li>
              <li>Collaborate with co-organizers easily</li>
            </ul>
          </div>
          <div className="md:w-1/2 order-1 md:order-2">
            <img
              src="https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=800&q=80"
              alt="Features Illustration"
              className="rounded-2xl shadow-2xl w-full hover:scale-105 transition-transform duration-500"
            />
          </div>
        </motion.div>
      </section>

      {/* Section 3: Why Choose Us */}
      <section className="py-24 px-6 sm:px-10 lg:px-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInLeft}
          className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10"
        >
          <div className="md:w-1/2">
            <img
  src="https://images.unsplash.com/photo-1605902711622-cfb43c4438f5?auto=format&fit=crop&w=800&q=80"
  alt="Why Choose Us"
  className="rounded-2xl shadow-2xl w-full hover:scale-105 transition-transform duration-500"
/>

          </div>
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-4xl font-bold text-white mb-4">Why Choose Us</h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-4">
              We provide a reliable, secure, and easy-to-use platform that makes event management seamless. Our tools ensure every event is organized, trackable, and memorable for both organizers and attendees.
            </p>
            <ul className="text-gray-300 text-lg space-y-3 list-disc list-inside">
              <li>Easy Event Creation</li>
              <li>Comprehensive Analytics</li>
              <li>Collaborate with Teams</li>
              <li>Secure & Reliable</li>
            </ul>
          </div>
        </motion.div>
      </section>

      {/* Section 4: Stats / Testimonials */}
      <section className="py-24 px-6 sm:px-10 lg:px-20 bg-gray-800">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="max-w-6xl mx-auto text-center"
        >
          <h2 className="text-4xl font-bold text-white mb-12">Trusted By Hundreds of Event Organizers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-gray-700 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow">
              <p className="text-gray-300 mb-4">"This platform made our conference seamless and effortless!"</p>
              <h4 className="text-white font-bold">— Sanjay A</h4>
            </div>
            <div className="bg-gray-700 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow">
              <p className="text-gray-300 mb-4">"We saved hours of work managing RSVPs and schedules."</p>
              <h4 className="text-white font-bold">— Hemavathi k</h4>
            </div>
            <div className="bg-gray-700 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow">
              <p className="text-gray-300 mb-4">"Beautiful design and easy collaboration for our team."</p>
              <h4 className="text-white font-bold">— Sahe...</h4>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
