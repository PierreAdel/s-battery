"use client";

import { use, useMemo, useState } from "react";
import {
  Activity,
  Battery,
  Clock,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import type { ChargingState } from "@/types";

export function BatteryAnalytics({
  batteryPromise,
}: {
  batteryPromise: Promise<ChargingState[]>;
}) {
  const chargingData = use(batteryPromise);
  const [viewMode, setViewMode] = useState<"line" | "area">("area");

  const chartData = useMemo(() => {
    return chargingData.map((item: ChargingState) => ({
      ...item,
      time: new Date(item.date).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
      day: new Date(item.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
    }));
  }, [chargingData]);

  // Calculate statistics
  const stats = useMemo(() => {
    const levels = chargingData.map((d) => d.chargingLevel);
    const current = levels[levels.length - 1];
    const previous = levels[levels.length - 2];
    const max = Math.max(...levels);
    const min = Math.min(...levels);
    const avg = Math.round(levels.reduce((a, b) => a + b, 0) / levels.length);
    const trend =
      current > previous ? "up" : current < previous ? "down" : "stable";

    return { current, max, min, avg, trend };
  }, [chargingData]);

  const getBatteryColor = (level: number) => {
    if (level >= 70) return "text-green-600";
    if (level >= 40) return "text-yellow-600";
    return "text-red-600";
  };

  const getBatteryBgColor = (level: number) => {
    if (level >= 70) return "bg-green-100";
    if (level >= 40) return "bg-yellow-100";
    return "bg-red-100";
  };

  if (!chargingData || chargingData.length === 0) {
    return (
      <p className="mt-4 text-center text-gray-600">
        No events yet, please check back later.
      </p>
    );
  }
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Level</CardTitle>
            <Battery className={`h-4 w-4 ${getBatteryColor(stats.current)}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.current}%</div>
            <div className="text-muted-foreground flex items-center space-x-1 text-xs">
              {stats.trend === "up" && (
                <TrendingUp className="h-3 w-3 text-green-600" />
              )}
              {stats.trend === "down" && (
                <TrendingDown className="h-3 w-3 text-red-600" />
              )}
              {stats.trend === "stable" && (
                <Activity className="h-3 w-3 text-gray-600" />
              )}
              <span className="capitalize">{stats.trend}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Peak Level</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.max}%</div>
            <p className="text-muted-foreground text-xs">Maximum recorded</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Level</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.min}%</div>
            <p className="text-muted-foreground text-xs">Minimum recorded</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average</CardTitle>
            <Activity className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.avg}%</div>
            <p className="text-muted-foreground text-xs">24-hour average</p>
          </CardContent>
        </Card>
      </div>

      {/* Chart */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Charging Level Over Time</CardTitle>
              <CardDescription>
                Battery charging levels from September 2-3, 2024
              </CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button
                variant={viewMode === "line" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("line")}
              >
                Line
              </Button>
              <Button
                variant={viewMode === "area" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("area")}
              >
                Area
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              {viewMode === "line" ? (
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="time"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    domain={[30, 80]}
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <Tooltip
                    formatter={(value: number) => [
                      `${value}%`,
                      "Charging Level",
                    ]}
                    labelFormatter={(label) => `Time: ${label}`}
                  />
                  <Line
                    type="monotone"
                    dataKey="chargingLevel"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              ) : (
                <AreaChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="time"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    domain={[30, 80]}
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <Tooltip
                    formatter={(value: number) => [
                      `${value}%`,
                      "Charging Level",
                    ]}
                    labelFormatter={(label) => `Time: ${label}`}
                  />
                  <Area
                    type="monotone"
                    dataKey="chargingLevel"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    fillOpacity={0.2}
                    strokeWidth={2}
                  />
                </AreaChart>
              )}
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Recent Events */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="h-5 w-5" />
            <span>Recent Events</span>
          </CardTitle>
          <CardDescription>Latest charging state updates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {chartData
              .slice(-5)
              .reverse()
              .map((item) => (
                <div
                  key={item.internalEventId}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`h-3 w-3 rounded-full ${getBatteryBgColor(item.chargingLevel)}`}
                    >
                      <div
                        className={`h-full w-full rounded-full ${getBatteryColor(item.chargingLevel)} opacity-60`}
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{item.time}</p>
                      <p className="text-muted-foreground text-xs">
                        Event ID: {item.internalEventId}
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant={
                      item.chargingLevel >= 70
                        ? "default"
                        : item.chargingLevel >= 40
                          ? "secondary"
                          : "destructive"
                    }
                  >
                    {item.chargingLevel}%
                  </Badge>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
