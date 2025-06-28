import { useState, useEffect, useCallback, useMemo } from 'react';

const CountdownTimer = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState(null);
  const [isExpired, setIsExpired] = useState(false);
  const [error, setError] = useState(null);

  // Calculate time remaining
  const calculateTimeLeft = useCallback(() => {
    try {
      const now = new Date().getTime();
      const target = new Date(targetDate).getTime();
      
      if (isNaN(target)) {
        throw new Error('Invalid target date');
      }
      
      const difference = target - now;
      
      if (difference <= 0) {
        setIsExpired(true);
        return null;
      }
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      return { days, hours, minutes, seconds };
    } catch (err) {
      setError(err.message);
      return null;
    }
  }, [targetDate]);

  // Update countdown every second
  useEffect(() => {
    if (!targetDate) return;

    // Initial calculation
    const initialTime = calculateTimeLeft();
    setTimeLeft(initialTime);

    // Set up interval
    const interval = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);
    }, 1000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, [targetDate, calculateTimeLeft]);

  // Memoized time units for performance
  const timeUnits = useMemo(() => {
    if (!timeLeft) return [];
    
    return [
      { label: 'Days', value: timeLeft.days, color: 'bg-blue-500' },
      { label: 'Hours', value: timeLeft.hours, color: 'bg-green-500' },
      { label: 'Minutes', value: timeLeft.minutes, color: 'bg-yellow-500' },
      { label: 'Seconds', value: timeLeft.seconds, color: 'bg-red-500' },
    ];
  }, [timeLeft]);

  // Error state
  if (error) {
    return (
      <div className="text-center p-8 bg-red-50 rounded-lg border border-red-200">
        <div className="text-red-600 mb-2">⚠️ Timer Error</div>
        <p className="text-red-500 text-sm">{error}</p>
      </div>
    );
  }

  // Expired state
  if (isExpired) {
    return (
      <div className="text-center p-8 bg-green-50 rounded-lg border border-green-200">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-3xl font-bold text-green-700 mb-2">
          Hackweek Has Started!
        </h2>
        <p className="text-green-600">
          The event is now live. Join us for an amazing experience!
        </p>
      </div>
    );
  }

  // Loading state
  if (!timeLeft) {
    return (
      <div className="text-center p-8">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-gray-500">Calculating time remaining...</p>
      </div>
    );
  }

  return (
    <div className="countdown-container" role="timer" aria-live="polite" aria-atomic="true">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
        {timeUnits.map((unit, index) => (
          <div
            key={unit.label}
            className="countdown-unit bg-white rounded-lg shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-200"
          >
            <div
              className={`${unit.color} text-white rounded-lg p-4 mb-3 shadow-md`}
              aria-label={`${unit.value} ${unit.label.toLowerCase()}`}
            >
              <div className="text-3xl md:text-4xl font-bold font-mono">
                {unit.value.toString().padStart(2, '0')}
              </div>
            </div>
            <div className="text-gray-700 font-semibold text-sm md:text-base uppercase tracking-wide">
              {unit.label}
            </div>
          </div>
        ))}
      </div>
      
      {/* Additional info */}
      <div className="text-center mt-6 text-gray-600">
        <p className="text-sm">
          Target Date: {new Date(targetDate).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            timeZoneName: 'short'
          })}
        </p>
      </div>
    </div>
  );
};

export default CountdownTimer;
