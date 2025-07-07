import React from 'react';
import './ProgressBar.css';

const ProgressBar = ({ current, total, label }) => {
  // Always show at least 18% fill for the first step
  const rawPercent = (current / total) * 100;
  const percentage = current === 1 ? 18 : rawPercent;
  const progressLabel = label === 'Your Journey'
    ? `Your Journey: Step ${current} of ${total}`
    : `Step ${current} of ${total}`;

  // Create milestones array
  const milestones = Array.from({ length: total }, (_, index) => ({
    id: index + 1,
    isCompleted: index + 1 < current,
    isActive: index + 1 === current
  }));

  return (
    <div className="progress-container">
      <div className="progress-content">
        <div className="progress-text">
          {progressLabel}
        </div>
        
        <div className="progress-bar-wrapper">
          <div 
            className="progress-bar"
            style={{ width: `${percentage}%` }}
          />
        </div>
        
        <div className="progress-milestones">
          {milestones.map((milestone) => (
            <div
              key={milestone.id}
              className={`milestone ${
                milestone.isCompleted ? 'completed' : 
                milestone.isActive ? 'active' : ''
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;