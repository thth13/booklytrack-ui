const BookAiPracticle = () => {
  return (
    <section id="ai-practice" className="bg-white rounded-xl p-8 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">AI Practice Sessions</h2>
          <p className="text-gray-600 mt-1">Test your understanding of the book with AI-generated questions</p>
        </div>
        <button className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Start New Session</button>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="p-6 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-semibold text-gray-800">Last Session</span>
            <span className="text-2xl font-bold text-green-600">85%</span>
          </div>
          <p className="text-gray-600 mb-3">Focused on Chapters 1-3</p>
          <button className="text-blue-600 hover:text-blue-700">View Details</button>
        </div>

        <div className="p-6 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-semibold text-gray-800">Progress</span>
            <span className="text-gray-600">4 Sessions Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '65%' }}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookAiPracticle;
