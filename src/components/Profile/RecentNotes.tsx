const RecentNotes = () => (
  <section id="reading-notes" className="bg-white rounded-lg p-6 shadow-sm mb-8">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-xl font-medium text-gray-800">Recent Notes</h2>
      <button className="text-blue-600 hover:text-blue-700">View All</button>
    </div>
    <div className="space-y-4">
      <div className="p-5 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium text-gray-800">The Power of Atomic Changes</h3>
          <span className="text-sm text-blue-600">Chapter 3</span>
        </div>
        <p className="text-gray-600">Small improvements accumulate into remarkable results...</p>
        <div className="flex items-center mt-3 text-sm text-gray-500">
          <i className="fa-regular fa-clock mr-2"></i>
          <span>2 hours ago</span>
        </div>
      </div>
      <div className="p-5 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium text-gray-800">Identity-Based Habits</h3>
          <span className="text-sm text-blue-600">Chapter 2</span>
        </div>
        <p className="text-gray-600">Focus on who you wish to become rather than what you want to achieve...</p>
        <div className="flex items-center mt-3 text-sm text-gray-500">
          <i className="fa-regular fa-clock mr-2"></i>
          <span>Yesterday</span>
        </div>
      </div>
    </div>
  </section>
);

export default RecentNotes;
