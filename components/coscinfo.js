import { useState } from 'react';

const COSCInfo = ({ data }) => {
  const [activeTab, setActiveTab] = useState('about');

  // Fallback data in case JSON loading fails
  const fallbackData = {
    about: {
      title: "CBIT Open Source Community",
      description: "COSC is an open source community based in CBIT and is managed by its students and staff. We promote open source culture and provide a platform for students to learn and contribute to open source projects.",
      established: "2020",
      mission: "To foster innovation, collaboration, and learning through open source technologies."
    },
    events: [
      {
        name: "Hackweek 2025",
        description: "A week-long event featuring workshops, coding challenges, and project presentations.",
        date: "July 2025"
      },
      {
        name: "Hacktoberfest",
        description: "Annual celebration of open source software with global participation.",
        date: "October"
      }
    ],
    technologies: [
      "JavaScript", "Python", "React", "Node.js", "Git", "Docker", "Linux", "MongoDB"
    ],
    achievements: [
      "500+ Community Members",
      "50+ Open Source Projects",
      "100+ Successful Events",
      "Multiple Hackathon Winners"
    ]
  };

  const displayData = data || fallbackData;

  const tabs = [
    { id: 'about', label: 'About', icon: '🏛️' },
    { id: 'events', label: 'Events', icon: '📅' },
    { id: 'technologies', label: 'Tech Stack', icon: '💻' },
    { id: 'achievements', label: 'Achievements', icon: '🏆' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'about':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                {displayData.about?.title || 'About COSC'}
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                {displayData.about?.description || 'COSC is an open source community based in CBIT.'}
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Established</h4>
                  <p className="text-blue-600">{displayData.about?.established || '2020'}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">Mission</h4>
                  <p className="text-green-600 text-sm">
                    {displayData.about?.mission || 'Promoting open source culture'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'events':
        return (
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Upcoming Events</h3>
            {displayData.events?.length > 0 ? (
              displayData.events.map((event, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="text-xl font-semibold text-gray-800">{event.name}</h4>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      {event.date}
                    </span>
                  </div>
                  <p className="text-gray-600">{event.description}</p>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>No events data available</p>
              </div>
            )}
          </div>
        );

      case 'technologies':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Technology Stack</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {displayData.technologies?.length > 0 ? (
                displayData.technologies.map((tech, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-4 text-center hover:shadow-md transition-shadow"
                  >
                    <div className="text-2xl mb-2">💻</div>
                    <span className="font-medium text-gray-700">{tech}</span>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-8 text-gray-500">
                  <p>No technology data available</p>
                </div>
              )}
            </div>
          </div>
        );

      case 'achievements':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Our Achievements</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {displayData.achievements?.length > 0 ? (
                displayData.achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-6 flex items-center space-x-4"
                  >
                    <div className="text-3xl">🏆</div>
                    <div>
                      <span className="font-semibold text-gray-800">{achievement}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-8 text-gray-500">
                  <p>No achievements data available</p>
                </div>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          About COSC
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Learn more about our community, events, and initiatives
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap justify-center mb-8 bg-white rounded-lg shadow-sm p-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors duration-200 ${
              activeTab === tab.id
                ? 'bg-blue-500 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            aria-selected={activeTab === tab.id}
            role="tab"
          >
            <span>{tab.icon}</span>
            <span className="font-medium">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div 
        className="bg-white rounded-lg shadow-lg p-8 min-h-[400px]"
        role="tabpanel"
        aria-labelledby={`tab-${activeTab}`}
      >
        {renderContent()}
      </div>
    </div>
  );
};

export default COSCInfo;
