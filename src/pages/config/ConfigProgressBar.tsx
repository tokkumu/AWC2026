import './ConfigProgressBar.css';

type ConfigProgressBarProps = {
  progress: number;
};

const ConfigProgressBar = ({ progress }: ConfigProgressBarProps) => {
  const levels = [
    { value: 15, label: 'Level 1', color: '#916247' },
    { value: 30, label: 'Level 2', color: '#CA5C2B' },
    { value: 45, label: 'Level 3', color: '#943126' },
    { value: 60, label: 'Level 4', color: '#5B2C6F' },
    { value: 75, label: 'Level 5', color: '#3B6C4C' },
  ];
  const MAX_VALUE = 75;

  const calcPercent = (v: number) => (100 * v) / MAX_VALUE;

  return (
    <div className="config-progress-bar-container">
      <div className="config-progress-bar-background">
        {levels.map((level, index) => {
          const previousValue = index === 0 ? 0 : levels[index - 1].value;
          let width = 0;
          if (progress >= level.value) {
            width = level.value - previousValue;
          } else if (progress > previousValue) {
            width = progress - previousValue;
          } else {
            width = 0;
          }

          return (
            <div
              key={level.value}
              className="config-progress-bar-section"
              style={{
                left: `${calcPercent(previousValue)}%`,
                width: `${calcPercent(width)}%`,
                backgroundColor: level.color,
              }}
            />
          );
        })}
      </div>

      <div className="config-progress-labels">
        {levels.map((level) => (
          <div
            key={level.value}
            className={`config-level-label ${progress >= level.value ? 'active' : ''}`}
            style={{
              left: `calc(${calcPercent(level.value)}% - 30px)`,
              color: level.color,
            }}
          >
            <span>{level.label}</span>
            <span>{level.value} Items</span>
          </div>
        ))}
      </div>

      <div className="config-progress-lines">
        {levels.map((level) => (
          <div
            key={level.value}
            className="config-progress-line"
            style={{ left: `${calcPercent(level.value)}%` }}
          />
        ))}
      </div>
    </div>
  );
};

export default ConfigProgressBar;
