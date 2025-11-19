'use client'

import { useState } from 'react'

interface ChartComponentProps {
  data?: number[]
  title?: string
}

export default function ChartComponent({ data = [], title = "Price Chart" }: ChartComponentProps) {
  const [timeRange, setTimeRange] = useState('24h')

  // Mock chart data
  const mockData = [100, 120, 110, 140, 130, 150, 160, 155, 170, 165, 180, 190, 200]
  const chartData = data.length > 0 ? data : mockData
  const maxValue = Math.max(...chartData)
  const minValue = Math.min(...chartData)
  const range = maxValue - minValue

  return (
    <div className="card-base p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold">{title}</h3>
        <div className="flex gap-2">
          {['1h', '24h', '1w', '1m'].map(r => (
            <button
              key={r}
              onClick={() => setTimeRange(r)}
              className="px-3 py-1 rounded text-sm transition-colors"
              style={{
                backgroundColor: timeRange === r ? 'var(--color-primary)' : 'transparent',
                color: timeRange === r ? 'white' : 'var(--color-text-secondary)',
              }}
              onMouseEnter={(e) => {
                if (timeRange !== r) e.currentTarget.style.color = 'var(--color-text-primary)';
              }}
              onMouseLeave={(e) => {
                if (timeRange !== r) e.currentTarget.style.color = 'var(--color-text-secondary)';
              }}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Simple SVG chart */}
      <svg className="w-full h-48 rounded-lg p-4" viewBox="0 0 400 150" style={{ borderColor: 'var(--color-border)', borderWidth: '1px' }}>
        {/* Grid lines */}
        {[0, 1, 2, 3, 4].map(i => (
          <line
            key={`grid-${i}`}
            x1="0"
            y1={i * 30}
            x2="400"
            y2={i * 30}
            stroke="var(--color-border)"
            strokeDasharray="4"
            opacity="0.3"
          />
        ))}

        {/* Line chart */}
        <polyline
          points={chartData
            .map((value, idx) => {
              const x = (idx / (chartData.length - 1)) * 400
              const y = 150 - ((value - minValue) / range) * 150
              return `${x},${y}`
            })
            .join(' ')}
          fill="none"
          stroke="url(#gradient)"
          strokeWidth="2"
        />

        {/* Gradient definition */}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--color-primary)" />
            <stop offset="100%" stopColor="var(--color-accent)" />
          </linearGradient>
        </defs>

        {/* Area under curve */}
        <path
          d={`M ${chartData
            .map((value, idx) => {
              const x = (idx / (chartData.length - 1)) * 400
              const y = 150 - ((value - minValue) / range) * 150
              return `${x},${y}`
            })
            .join(' ')} L 400,150 L 0,150`}
          fill="url(#gradient)"
          opacity="0.2"
        />
      </svg>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 text-center text-sm">
        <div>
          <div style={{ color: 'var(--color-text-tertiary)' }}>High</div>
          <div className="font-bold">${maxValue}</div>
        </div>
        <div>
          <div style={{ color: 'var(--color-text-tertiary)' }}>Low</div>
          <div className="font-bold">${minValue}</div>
        </div>
        <div>
          <div style={{ color: 'var(--color-text-tertiary)' }}>Avg</div>
          <div className="font-bold">${((maxValue + minValue) / 2).toFixed(0)}</div>
        </div>
      </div>
    </div>
  )
}
