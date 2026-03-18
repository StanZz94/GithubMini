interface CustomTooltipProps {
  active?: boolean;
  // eslint-disable-next-line
  payload?: any;
  label?: string;
  coordinate?: { x: number; y: number };
}

export default function CustomTooltip({ active, payload, label, coordinate }: CustomTooltipProps) {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div
      className="bg-white border p-2 rounded shadow text-sm"
      style={{
        position: "absolute",
        left: coordinate?.x,
        top: coordinate?.y,
        pointerEvents: "none",
        transform: "translate(-50%, -100%)",
        whiteSpace: "nowrap",
        zIndex: 1000,
      }}
    >
      <p className="font-semibold">{label}</p>
      {/* eslint-disable-next-line */}
      {payload.map((item: any) => (
        
        <p key={item.dataKey} className="text-gray-700">
          {item.name}: {item.value}
        </p>
      ))}
    </div>
  );
}