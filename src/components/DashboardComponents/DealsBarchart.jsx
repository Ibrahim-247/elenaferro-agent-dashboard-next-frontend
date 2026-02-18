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
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Monthly Deal */}
      <div className="lg:col-span-8 xl:col-span-9 py-6 lg:py-8 bg-white rounded-2xl border border-gray-100">
        <div className="px-4 lg:px-8">
          <h4 className="text-lg font-bold">Monthly Transaction Closed</h4>
          <p className="text-sm lg:text-base font-normal text-gray-500">
            Performance in the past 12 months
          </p>
        </div>
        <div className="pr-4 lg:pr-8 overflow-x-auto">
          <ChartContainer
            config={chartConfig}
            className="w-full min-w-150 lg:min-w-0 h-75 lg:h-110 mt-6 lg:mt-10"
          >
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
      <div className="bg-white rounded-2xl p-6 lg:col-span-4 xl:col-span-3 border border-gray-100">
        <h4 className="text-xl lg:text-2xl font-semibold">My Tasks</h4>
        <div className="mt-5 space-y-3 lg:max-h-120 overflow-auto custom_scroll">
          {isPending ? (
            <div className="h-40 lg:h-full text-center text-base flex flex-col items-center justify-center">
              <div className="flex items-center justify-center gap-2">
                <Spinner /> Loading...
              </div>
            </div>
          ) : taskList?.length > 0 ? (
            taskList?.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 justify-between pb-3 border-b border-gray-50 last:border-0"
              >
                <div className="space-y-1 min-w-0">
                  <h3 className="text-base lg:text-lg font-medium truncate">
                    {item?.title}
                  </h3>
                  <p className="text-xs lg:text-sm font-normal text-gray-500">
                    {new Date(item?.due_date).toLocaleDateString("en-US", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div
                  className={`py-1 px-2.5 rounded-full capitalize text-[10px] lg:text-xs font-medium shrink-0 ${
                    statusStyles[item?.status]
                  }`}
                >
                  {item?.status}
                </div>
              </div>
            ))
          ) : (
            <div className="h-full lg:h-40 flex flex-col justify-center text-center text-base">
              <div className="flex flex-col items-center justify-center gap-2">
                <Inbox className="text-gray-300 size-10 lg:size-13" />
                <p className="text-gray-500">No tasks found</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
