import React, { useState } from 'react';
import { ForecastPoint } from '../types';

interface ForecastChartsProps {
  data: ForecastPoint[];
}

export const ForecastCharts: React.FC<ForecastChartsProps> = ({ data }) => {
  const [hoveredArrivalIndex, setHoveredArrivalIndex] = useState<number | null>(null);
  const [hoveredQueueIndex, setHoveredQueueIndex] = useState<number | null>(null);

  // SVG dimensions
  const width = 500;
  const height = 180;
  const padding = { top: 20, right: 25, bottom: 30, left: 35 };
  const innerWidth = width - padding.left - padding.right;
  const innerHeight = height - padding.top - padding.bottom;

  // Arrival scale: max approx 200
  const maxArrival = 200;
  const getArrivalY = (val: number) => innerHeight - (val / maxArrival) * innerHeight + padding.top;
  const getX = (index: number) => (index / (data.length - 1)) * innerWidth + padding.left;

  // Queue pressure scale: max 100
  const maxQueue = 100;
  const getQueueY = (val: number) => innerHeight - (val / maxQueue) * innerHeight + padding.top;

  // Generate path strings for Arrivals
  const actualPoints = data
    .map((d, i) => (d.currentActual !== undefined ? `${getX(i)},${getArrivalY(d.currentActual)}` : null))
    .filter(Boolean) as string[];
  const actualPath = actualPoints.length > 1 ? `M ${actualPoints.join(' L ')}` : '';

  const predictedArrivalPoints = data.map((d, i) => `${getX(i)},${getArrivalY(d.predictedArrivals)}`);
  const predictedArrivalPath = `M ${predictedArrivalPoints.join(' L ')}`;

  // Area under predicted arrival curve
  const predictedArrivalArea = `M ${getX(0)},${getArrivalY(0)} L ${predictedArrivalPoints.join(' L ')} L ${getX(data.length - 1)},${getArrivalY(0)} Z`;

  // Queue path
  const queuePoints = data.map((d, i) => `${getX(i)},${getQueueY(d.queuePressure)}`);
  const queuePath = `M ${queuePoints.join(' L ')}`;
  const queueArea = `M ${getX(0)},${getQueueY(0)} L ${queuePoints.join(' L ')} L ${getX(data.length - 1)},${getQueueY(0)} Z`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Chart 1: Patient Arrival Forecast */}
      <div className="bg-white rounded-2xl p-6 border border-[#E5E7EB] shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-[#252336]">
              Patient Arrival Forecast
            </h3>
            <p className="text-xs text-[#6B6878] mt-0.5">
              Current arrivals vs AI projected intake curve
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1.5 text-[#252336] font-medium">
              <span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6]" /> Actual
            </span>
            <span className="flex items-center gap-1.5 text-[#7C3AED] font-medium">
              <span className="w-2.5 h-0.5 bg-[#8B7CF6] border-t-2 border-dashed border-[#8B7CF6]" /> Forecast
            </span>
            <span className="flex items-center gap-1.5 text-rose-500 font-medium">
              <span className="w-2.5 h-0.5 bg-rose-400 border-t border-rose-400" /> Threshold (160)
            </span>
          </div>
        </div>

        <div className="relative w-full aspect-[2.8/1] min-h-[170px]">
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
            <defs>
              <linearGradient id="arrivalGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#8B7CF6" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#8B7CF6" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Grid horizontal lines */}
            {[0, 50, 100, 150, 200].map((tick) => {
              const y = getArrivalY(tick);
              return (
                <g key={tick}>
                  <line
                    x1={padding.left}
                    y1={y}
                    x2={width - padding.right}
                    y2={y}
                    stroke="#F0EDF6"
                    strokeWidth="1"
                  />
                  <text
                    x={padding.left - 8}
                    y={y + 3.5}
                    fontSize="10"
                    fill="#9A96A8"
                    textAnchor="end"
                    className="font-mono tabular-nums"
                  >
                    {tick}
                  </text>
                </g>
              );
            })}

            {/* Capacity threshold line (160) */}
            <line
              x1={padding.left}
              y1={getArrivalY(160)}
              x2={width - padding.right}
              y2={getArrivalY(160)}
              stroke="#F43F5E"
              strokeWidth="1.2"
              strokeDasharray="4 3"
            />

            {/* Shaded Area for Forecast */}
            <path d={predictedArrivalArea} fill="url(#arrivalGradient)" />

            {/* Forecast dashed line */}
            <path
              d={predictedArrivalPath}
              fill="none"
              stroke="#8B7CF6"
              strokeWidth="2.2"
              strokeDasharray="4 3"
            />

            {/* Actual solid line */}
            {actualPath && (
              <path
                d={actualPath}
                fill="none"
                stroke="#3B82F6"
                strokeWidth="2.5"
              />
            )}

            {/* Points and hover triggers */}
            {data.map((d, i) => {
              const x = getX(i);
              const yPred = getArrivalY(d.predictedArrivals);
              const isHovered = hoveredArrivalIndex === i;

              return (
                <g
                  key={i}
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredArrivalIndex(i)}
                  onMouseLeave={() => setHoveredArrivalIndex(null)}
                >
                  {/* Transparent hover catcher */}
                  <rect
                    x={x - 15}
                    y={padding.top}
                    width={30}
                    height={innerHeight}
                    fill="transparent"
                  />

                  {/* Indicator circles */}
                  <circle
                    cx={x}
                    cy={yPred}
                    r={isHovered ? 4.5 : 3}
                    fill="#FFFFFF"
                    stroke="#8B7CF6"
                    strokeWidth="2"
                  />

                  {d.currentActual !== undefined && (
                    <circle
                      cx={x}
                      cy={getArrivalY(d.currentActual)}
                      r={isHovered ? 5 : 3.5}
                      fill="#3B82F6"
                    />
                  )}

                  {/* X Axis Time Labels */}
                  <text
                    x={x}
                    y={height - 8}
                    fontSize="10"
                    fill="#6B6878"
                    textAnchor="middle"
                    className="font-medium"
                  >
                    {d.time}
                  </text>

                  {/* Hover tooltip */}
                  {isHovered && (
                    <g>
                      <rect
                        x={Math.min(x - 45, width - padding.right - 90)}
                        y={Math.max(yPred - 38, padding.top)}
                        width="90"
                        height="30"
                        rx="6"
                        fill="#252336"
                        className="shadow-md"
                      />
                      <text
                        x={Math.min(x, width - padding.right - 45)}
                        y={Math.max(yPred - 20, padding.top + 18)}
                        fontSize="10.5"
                        fontWeight="600"
                        fill="#FFFFFF"
                        textAnchor="middle"
                        className="font-mono tabular-nums"
                      >
                        {d.currentActual ? `Act: ${d.currentActual} | ` : ''}
                        Pred: {d.predictedArrivals}/h
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Chart 2: Queue Pressure Forecast */}
      <div className="bg-white rounded-2xl p-6 border border-[#E5E7EB] shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-[#252336]">
              Queue Pressure Forecast
            </h3>
            <p className="text-xs text-[#6B6878] mt-0.5">
              Predicted intake load ratio vs nominal ceiling
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1.5 text-amber-600 font-medium">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Queue Pressure
            </span>
            <span className="flex items-center gap-1.5 text-slate-500 font-medium">
              <span className="w-2.5 h-0.5 bg-slate-400 border-t border-slate-400" /> Target (50)
            </span>
            <span className="flex items-center gap-1.5 text-rose-500 font-medium">
              <span className="w-2.5 h-0.5 bg-rose-400 border-t border-rose-400" /> Critical (80)
            </span>
          </div>
        </div>

        <div className="relative w-full aspect-[2.8/1] min-h-[170px]">
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
            <defs>
              <linearGradient id="queueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Grid horizontal lines */}
            {[0, 25, 50, 75, 100].map((tick) => {
              const y = getQueueY(tick);
              return (
                <g key={tick}>
                  <line
                    x1={padding.left}
                    y1={y}
                    x2={width - padding.right}
                    y2={y}
                    stroke="#F0EDF6"
                    strokeWidth="1"
                  />
                  <text
                    x={padding.left - 8}
                    y={y + 3.5}
                    fontSize="10"
                    fill="#9A96A8"
                    textAnchor="end"
                    className="font-mono tabular-nums"
                  >
                    {tick}
                  </text>
                </g>
              );
            })}

            {/* Target line (50) & Critical threshold line (80) */}
            <line
              x1={padding.left}
              y1={getQueueY(50)}
              x2={width - padding.right}
              y2={getQueueY(50)}
              stroke="#94A3B8"
              strokeWidth="1"
              strokeDasharray="3 3"
            />
            <line
              x1={padding.left}
              y1={getQueueY(80)}
              x2={width - padding.right}
              y2={getQueueY(80)}
              stroke="#F43F5E"
              strokeWidth="1.2"
              strokeDasharray="4 3"
            />

            {/* Shaded Area for Queue */}
            <path d={queueArea} fill="url(#queueGradient)" />

            {/* Queue Pressure line */}
            <path
              d={queuePath}
              fill="none"
              stroke="#F59E0B"
              strokeWidth="2.5"
            />

            {/* Points and hover triggers */}
            {data.map((d, i) => {
              const x = getX(i);
              const yQueue = getQueueY(d.queuePressure);
              const isHovered = hoveredQueueIndex === i;

              return (
                <g
                  key={i}
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredQueueIndex(i)}
                  onMouseLeave={() => setHoveredQueueIndex(null)}
                >
                  <rect
                    x={x - 15}
                    y={padding.top}
                    width={30}
                    height={innerHeight}
                    fill="transparent"
                  />

                  <circle
                    cx={x}
                    cy={yQueue}
                    r={isHovered ? 5 : 3.5}
                    fill={d.queuePressure >= 80 ? '#EF4444' : '#F59E0B'}
                    stroke="#FFFFFF"
                    strokeWidth="1.5"
                  />

                  {/* X Axis Time Labels */}
                  <text
                    x={x}
                    y={height - 8}
                    fontSize="10"
                    fill="#6B6878"
                    textAnchor="middle"
                    className="font-medium"
                  >
                    {d.time}
                  </text>

                  {/* Hover tooltip */}
                  {isHovered && (
                    <g>
                      <rect
                        x={Math.min(x - 40, width - padding.right - 80)}
                        y={Math.max(yQueue - 36, padding.top)}
                        width="80"
                        height="28"
                        rx="6"
                        fill="#252336"
                        className="shadow-md"
                      />
                      <text
                        x={Math.min(x, width - padding.right - 40)}
                        y={Math.max(yQueue - 18, padding.top + 18)}
                        fontSize="10.5"
                        fontWeight="600"
                        fill="#FFFFFF"
                        textAnchor="middle"
                        className="font-mono tabular-nums"
                      >
                        Pressure: {d.queuePressure}/100
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </div>
  );
};
