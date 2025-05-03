const CurrentlyReading = () => (
  <section id="current-book" className="bg-white rounded-lg p-6 shadow-sm">
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-lg font-medium text-gray-800">Currently Reading</h3>
      <div className="flex gap-2">
        <button id="prev-book" className="p-2 rounded-full hover:bg-gray-100 text-gray-600">
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <button id="next-book" className="p-2 rounded-full hover:bg-gray-100 text-gray-600">
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      </div>
    </div>
    <div id="books-carousel" className="relative overflow-hidden">
      <div className="relative">
        <img
          className="w-full h-48 object-cover rounded-lg"
          src="https://storage.googleapis.com/uxpilot-auth.appspot.com/de264b66b2-5bf912f61015a66d1d4c.png"
          alt="book cover"
        />
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent rounded-b-lg">
          <h4 className="text-white font-medium">Atomic Habits</h4>
          <p className="text-white/80 text-sm">James Clear</p>
          <div className="mt-2 bg-white/20 rounded-full h-1">
            <div className="bg-blue-500 w-3/4 h-1 rounded-full"></div>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Add a quick note..."
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <i className="fa-solid fa-plus"></i>
          </button>
        </div>
      </div>
    </div>
  </section>
);

export default CurrentlyReading;
