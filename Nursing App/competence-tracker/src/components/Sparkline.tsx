interface Props {
  values: number[]    // each in [0,1]
  width?: number
  height?: number
  stroke?: string
  className?: string
}

export function Sparkline({
  values,
  width = 96,
  height = 28,
  stroke = 'currentColor',
  className,
}: Props) {
  if (values.length === 0) {
    return (
      <svg width={width} height={height} className={className} aria-hidden="true">
        <line
          x1="0" y1={height / 2} x2={width} y2={height / 2}
          stroke="var(--color-border)" strokeWidth="1" strokeDasharray="3 3"
        />
      </svg>
    )
  }

  if (values.length === 1) {
    const cx = width / 2
    const cy = height - values[0] * (height - 4) - 2
    return (
      <svg width={width} height={height} className={className} aria-hidden="true">
        <circle cx={cx} cy={cy} r="3" fill={stroke} />
      </svg>
    )
  }

  const stepX = width / (values.length - 1)
  const points = values.map((v, i) => {
    const x = i * stepX
    const y = height - v * (height - 4) - 2
    return `${x.toFixed(1)},${y.toFixed(1)}`
  })

  return (
    <svg width={width} height={height} className={className} aria-hidden="true">
      <polyline
        points={points.join(' ')}
        fill="none"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
