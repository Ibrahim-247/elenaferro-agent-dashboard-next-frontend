"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useTasklist } from "@/hooks/dashboard.api";

export default function DealsBarchart() {
  const chartData = [
    { month: "January", desktop: 186 },
    { month: "February", desktop: 200 },
    { month: "March", desktop: 237 },
    { month: "April", desktop: 73 },
    { month: "May", desktop: 209 },
    { month: "June", desktop: 214 },
  ];
  const chartConfig = {
    desktop: {
      label: "desktop",
      color: "var(--chart-1)",
    },
  };

  // my task list
  const { data } = useTasklist();
  console.log(data);

  return (
    <div className="grid grid-cols-12 gap-6">
      {/* Monthly Deal */}
      <div className="col-span-9 p-8 bg-white rounded-2xl">
        <h4 className="text-lg font-bold">Monthly Deals Closed</h4>
        <p className="text-base font-normal">
          Performance in the past 6 months
        </p>
        <ChartContainer config={chartConfig} className="w-full h-110 mt-10">
          <BarChart
            accessibilityLayer
            data={chartData}
            barCategoryGap={24} // space between bars
            barGap={6} // space if multiple bars
          >
            {/* Gradient Definition */}
            <defs>
              <linearGradient id="desktopGradient" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={1}
                />
                <stop
                  offset="100%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.3}
                />
              </linearGradient>
            </defs>

            <CartesianGrid vertical={false} />

            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis tickLine={false} axisLine={false} allowDecimals={false} />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />

            <Bar
              dataKey="desktop"
              fill="url(#desktopGradient)"
              radius={[8, 8, 0, 0]}
              barSize={70}
            />
          </BarChart>
        </ChartContainer>
      </div>
      {/* Tasks */}
      <div className="bg-white rounded-2xl p-6 pr-0 col-span-3">
        <h4 className="text-2xl font-semibold">My Tasks</h4>
        <div className="mt-5 space-y-3 h-120 overflow-auto pr-6 custom_scroll">
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className="flex items-center gap-9 justify-between pb-3 border-b"
            >
              <div className="space-y-1.5">
                <h3 className="text-xl font-medium line-clamp-2">
                  Call client for appraisal
                </h3>
                <p className="text-sm font-normal">Today</p>
              </div>
              <div className="py-1 px-2 rounded-full bg-red-200 text-red-500 text-xs font-normal">
                Urgent
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
