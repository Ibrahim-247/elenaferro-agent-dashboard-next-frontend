"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useTasklist } from "@/hooks/dashboard.api";
import { Spinner } from "../ui/spinner";
import { Inbox } from "lucide-react";

export default function DealsBarchart({ analytics }) {
  const chartData = analytics?.map((item) => ({
    month: item.month,
    Transaction: item.close_transaction || 0,
  }));

  const chartConfig = {
    desktop: {
      label: "Transaction",
      color: "var(--chart-1)",
    },
  };

  const statusStyles = {
    in_progress: "bg-blue-100 text-blue-600",
    blocked: "bg-red-100 text-red-600",
    done: "bg-green-100 text-green-600",
  };

  // my task list
  const { data, isPending } = useTasklist();
  const taskList = data?.data?.data;

  return (
    <div className="grid grid-cols-12 gap-6">
      {/* Monthly Deal */}
      <div className="col-span-9 py-8 bg-white rounded-2xl">
        <div className="px-8">
          <h4 className="text-lg font-bold">Monthly Transaction Closed</h4>
          <p className="text-base font-normal">
            Performance in the past 12 months
          </p>
        </div>
        <div className="pr-8">
          <ChartContainer config={chartConfig} className="w-full h-110 mt-10">
            <BarChart
              accessibilityLayer
              data={chartData}
              barCategoryGap={24} // space between bars
              barGap={6} // space if multiple bars
            >
              {/* Gradient Definition */}
              <defs>
                <linearGradient
                  id="desktopGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
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
                dataKey="Transaction"
                fill="url(#desktopGradient)"
                radius={[8, 8, 0, 0]}
                barSize={70}
              />
            </BarChart>
          </ChartContainer>
        </div>
      </div>
      {/* Tasks */}
      <div className="bg-white rounded-2xl p-6 pr-0 col-span-3">
        <h4 className="text-2xl font-semibold">My Tasks</h4>
        <div className="mt-5 space-y-3 h-120 overflow-auto pr-6 custom_scroll">
          {isPending ? (
            <div className="h-full text-center text-base flex flex-col items-center justify-center">
              <div className="flex items-center justify-center gap-2">
                <Spinner /> Loading...
              </div>
            </div>
          ) : taskList?.length > 0 ? (
            taskList?.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-9 justify-between pb-3 border-b"
              >
                <div className="space-y-1.5">
                  <h3 className="text-lg font-medium line-clamp-2">
                    {item?.title}
                  </h3>
                  <p className="text-sm font-normal">
                    {new Date(item?.due_date).toLocaleDateString("en-US", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div
                  className={`py-1 px-2 rounded-full capitalize text-xs font-normal ${
                    statusStyles[item?.status]
                  }`}
                >
                  {item?.status}
                </div>
              </div>
            ))
          ) : (
            <div className="h-full flex flex-col justify-center text-center text-base">
              <div className="flex flex-col items-center justify-center gap-2">
                <Inbox className="text-gray-400 size-13" /> No data found
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
