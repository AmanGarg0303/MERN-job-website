import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", Total: 1500 },
  { name: "Feb", Total: 2100 },
  { name: "Mar", Total: 1100 },
  { name: "Apr", Total: 1800 },
  { name: "May", Total: 900 },
  { name: "Jun", Total: 1900 },
  { name: "Jul", Total: 700 },
  { name: "Aug", Total: 4000 },
  { name: "Sep", Total: 1900 },
  { name: "Oct", Total: 2800 },
  { name: "Nov", Total: 3650 },
  { name: "Dec", Total: 1900 },
];

const Chart = ({ title, aspect, chartData }) => {
  return (
    <div className="w-full text-gray-300">
      <div className="mb-2">{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart
          width={730}
          height={250}
          data={chartData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="gray" />
          <YAxis dataKey="Total" stroke="gray" />
          <CartesianGrid
            strokeDasharray="3 3"
            style={{ stroke: "rgb(228, 225, 225)" }}
          />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Total"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#total)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
