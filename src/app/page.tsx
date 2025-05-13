import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen, faPenToSquare, faRobot } from '@fortawesome/free-solid-svg-icons';

export default function Home() {
  return (
    <>
      <nav id="header" className="fixed w-full bg-white shadow-sm z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-blue-700">BooklyTrack</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <Link href="#features" className="text-gray-700 hover:text-blue-600 cursor-pointer">
                Features
              </Link>
              <Link href="#how-it-works" className="text-gray-700 hover:text-blue-600 cursor-pointer">
                How it Works
              </Link>
              <Link href="#cta" className="text-gray-700 hover:text-blue-600 cursor-pointer">
                Start Your Reading
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/auth/login" className="px-6 py-2 text-blue-600 hover:text-blue-700">
                Log in
              </Link>
              <Link href="/auth/register" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <section className="bg-gradient-to-b from-blue-50 to-white pt-28 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <h1 className="text-5xl font-bold mb-6 leading-tight">Track, Learn, and Grow with BooklyTrack</h1>
              <p className="text-xl text-gray-600 mb-8">
                Organize your books, create smart summaries, and enhance your understanding through AI-guided
                discussions. Transform your reading into active learning.
              </p>
              <div className="flex gap-4">
                <Link
                  href="/auth/register"
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-medium"
                >
                  Get Started
                </Link>
                {/* <button className="bg-white text-blue-600 px-8 py-3 rounded-lg border-2 border-blue-600 hover:bg-blue-50 font-medium">
                  Log in
                </button> */}
              </div>
            </div>
            <div className="lg:w-1/2">
              <img
                className="w-full h-auto rounded-lg shadow-xl"
                src="https://storage.googleapis.com/uxpilot-auth.appspot.com/fc34c1fd78-8444127672bb1820d1b1.png"
                alt="3D illustration of books floating with AI particles and digital elements, modern minimal style"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Everything You Need for Smarter Reading</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div id="feature-1" className="p-6 rounded-xl bg-blue-50">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <FontAwesomeIcon icon={faBookOpen} className="text-white text-xl" />
              </div>
              <h3 className="text-xl font-bold mb-3">Reading Tracker</h3>
              <p className="text-gray-600">
                Keep track of your reading progress, manage your book lists, and set reading goals.
              </p>
            </div>
            <div id="feature-2" className="p-6 rounded-xl bg-green-50">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                <FontAwesomeIcon icon={faPenToSquare} className="text-white text-xl" />
              </div>
              <h3 className="text-xl font-bold mb-3">Smart Notes</h3>
              <p className="text-gray-600">
                Create detailed summaries and organize your thoughts with our intuitive note-taking system.
              </p>
            </div>
            <div id="feature-3" className="p-6 rounded-xl bg-amber-50">
              <div className="w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center mb-4">
                <FontAwesomeIcon icon={faRobot} className="text-white text-xl" />
              </div>
              <h3 className="text-xl font-bold mb-3">AI Discussion</h3>
              <p className="text-gray-600">
                Engage in meaningful conversations with AI to deepen your understanding of the material.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">How BooklyTrack Works</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div id="step-1" className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl font-bold">1</span>
              </div>
              <h3 className="text-lg font-bold mb-2">Add Books</h3>
              <p className="text-gray-600">Create your reading lists and track your progress</p>
            </div>
            <div id="step-2" className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl font-bold">2</span>
              </div>
              <h3 className="text-lg font-bold mb-2">Take Notes</h3>
              <p className="text-gray-600">Write summaries and capture key insights</p>
            </div>
            <div id="step-3" className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl font-bold">3</span>
              </div>
              <h3 className="text-lg font-bold mb-2">Review with AI</h3>
              <p className="text-gray-600">Get questioned by AI to reinforce learning</p>
            </div>
            <div id="step-4" className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl font-bold">4</span>
              </div>
              <h3 className="text-lg font-bold mb-2">Track Progress</h3>
              <p className="text-gray-600">Monitor your reading books</p>
            </div>
          </div>
        </div>
      </section>

      {/* <section id="testimonials" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">What Our Readers Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div id="testimonial-1" className="p-6 rounded-xl bg-gray-50">
              <div className="flex items-center mb-4">
                <img
                  src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg"
                  alt="User"
                  className="w-12 h-12 rounded-full"
                />
                <div className="ml-4">
                  <h4 className="font-bold">Sarah Johnson</h4>
                  <p className="text-gray-600">Book Lover</p>
                </div>
              </div>
              <p className="text-gray-600">
                "BooklyTrack has transformed how I retain information from books. The AI discussions are like having a
                study partner available 24/7."
              </p>
            </div>
            <div id="testimonial-2" className="p-6 rounded-xl bg-gray-50">
              <div className="flex items-center mb-4">
                <img
                  src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg"
                  alt="User"
                  className="w-12 h-12 rounded-full"
                />
                <div className="ml-4">
                  <h4 className="font-bold">Michael Chen</h4>
                  <p className="text-gray-600">Student</p>
                </div>
              </div>
              <p className="text-gray-600">
                "The note-taking system is intuitive, and the AI questioning helps me ensure I've truly understood the
                material."
              </p>
            </div>
            <div id="testimonial-3" className="p-6 rounded-xl bg-gray-50">
              <div className="flex items-center mb-4">
                <img
                  src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-6.jpg"
                  alt="User"
                  className="w-12 h-12 rounded-full"
                />
                <div className="ml-4">
                  <h4 className="font-bold">Emma Davis</h4>
                  <p className="text-gray-600">Professional</p>
                </div>
              </div>
              <p className="text-gray-600">
                "Finally found a platform that combines reading tracking with active learning. The AI discussions are
                incredibly helpful."
              </p>
            </div>
          </div>
        </div>
      </section> */}

      <section id="cta" className="py-20 bg-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Start Your Reading Journey Today</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of readers who are transforming their reading experience
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 font-medium">
            Get Started
          </button>
        </div>
      </section>

      <footer id="footer" className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center text-gray-400">
            <p>© 2025 BooklyTrack. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
