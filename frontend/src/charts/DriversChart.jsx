import React from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

const data01 = [
  { name: 'Confirmed Drivers', value: 400 },
  { name: 'Pending Drivers', value: 300 },
];
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const PureComponent = () => {
  const COLORS = ["#55C42E", '#FFD700'];
  const light = {
    border: "#d1d1d1",
    frame: "#f0f0f0",
    title: "#403e57",
    text: "#5e5d72",
    bg: "#ffffff",
  };
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={400} height={400}>
        <Pie
          dataKey="value"
          isAnimationActive={true}
          data={data01}
          cx="50%"
          cy="50%"
          outerRadius={120}
          fill="#ff0000"
          labelLine={false}
          label={renderCustomizedLabel}
        >
          {data01.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          cursor={false}
          contentStyle={{
            background: `${light.bg}`,
            borderRadius: "8px",
            padding: "7px 12px 8px",
            border: `1px solid ${light.frame
              }`,
            boxShadow: "0px 12px 25px 0px rgb(0 0 0 / 12%)",
          }}
          itemStyle={{
            fontSize: "14px",
            fontWeight: "500",
            padding: "2px 0px",
            color: `${light.text}`,
            textTransform: "capitalize",
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default PureComponent