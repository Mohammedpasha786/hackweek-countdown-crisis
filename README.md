# hackweek-countdown-crisis
Hackweek Countdown Crisis - Fixed Version
Overview
This repository contains the fixed version of the NextJS Hackweek Countdown application that displays COSC information and a live countdown timer until Hackweek ends.
Issues Identified and Fixed
1. Hydration Mismatch Errors
Problem: The countdown timer was causing hydration mismatches because the server-side rendered time didn't match the client-side time.
Solution:

Implemented proper client-side hydration check using useEffect and useState
Added a mounted state to prevent rendering time-sensitive content on the server
Used dynamic imports with ssr: false for countdown components

2. Memory Leaks from setInterval
Problem: The countdown timer wasn't properly cleaning up intervals, causing memory leaks.
Solution:

Properly implemented cleanup in useEffect return function
Clear intervals when component unmounts
Added proper dependency arrays to prevent unnecessary re-renders

3. Race Conditions in Data Fetching
Problem: JSON data loading wasn't handled properly, causing undefined errors.
Solution:

Added proper loading states
Implemented error boundaries
Added null checks and fallback values

4. Time Zone Issues
Problem: Countdown was not accounting for different time zones properly.
Solution:

Used UTC time calculations
Properly formatted dates using toISOString() and date libraries
Added timezone awareness for consistent countdown across regions

5. Performance Issues
Problem: Component was re-rendering too frequently due to countdown updates.
Solution:

Implemented useMemo and useCallback for expensive calculations
Optimized re-render frequency (updating every second instead of every millisecond)
Used proper React performance optimization techniques

6. SEO and Accessibility Issues
Problem: Missing meta tags, improper heading structure, no accessibility features.
Solution:

Added proper SEO meta tags
Implemented proper heading hierarchy
Added ARIA labels and accessibility features
Added loading states with proper announcements

7. Error Handling
Problem: No proper error handling for failed data loads or invalid dates.
Solution:

Implemented comprehensive error boundaries
Added fallback UI components
Proper error logging and user feedback

Technical Implementation
Key Features:

Real-time countdown with proper cleanup
COSC information display from local JSON
Responsive design with Tailwind CSS
Error boundaries for graceful error handling
SEO optimization with Next.js Head component
Accessibility features with proper ARIA labels

Dependencies:
json{
  "next": "^14.0.0",
  "react": "^18.0.0",
  "react-dom": "^18.0.0",
  "tailwindcss": "^3.0.0"
}
Setup Instructions

Clone the repository:
bashgit clone <your-repo-url>
cd hackweek-countdown-crisis

Install dependencies:
bashnpm install

Configure the countdown end date:

Update data/config.json with the actual Hackweek end date
Ensure the date is in ISO format for consistency


Run development server:
bashnpm run dev

Build for production:
bashnpm run build
npm start


Deployment
The application is deployed on Vercel at: [Your Deployment URL]
Deployment Steps:

Push code to GitHub repository
Connect repository to Vercel
Configure environment variables if needed
Deploy with automatic builds on push

File Structure
├── components/
│   ├── CountdownTimer.js
│   ├── COSCInfo.js
│   └── ErrorBoundary.js
├── data/
│   ├── cosc-info.json
│   └── config.json
├── pages/
│   ├── _app.js
│   ├── _document.js
│   └── index.js
├── styles/
│   └── globals.css
└── public/
    └── favicon.ico
Configuration
Update data/config.json with your event details:
json{
  "hackweekEndDate": "2025-07-15T23:59:59.000Z",
  "eventName": "COSC Hackweek 2025",
  "eventDescription": "CBIT Open Source Community Hackweek"
}
Browser Support

Chrome 60+
Firefox 60+
Safari 12+
Edge 79+

Contributing

Fork the repository
Create a feature branch
Make your changes
Add tests if applicable
Submit a pull request
