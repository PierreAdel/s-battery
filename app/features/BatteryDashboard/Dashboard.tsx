import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { fetchBatteryTimeline } from "@/lib/battery";

import { BatteryAnalytics } from "./BatteryAnalytics";

export function Dashboard() {
  const batteryPromise = fetchBatteryTimeline();

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 text-center">
          <h1 className="mb-2 text-4xl font-bold text-gray-900">
            Sonnen Energy Storage Dashboard
          </h1>
          <p className="text-gray-600">
            Real-time battery charging level monitoring and analytics
          </p>
        </header>
        <ErrorBoundary
          fallback={
            <p className="mt-4 text-center text-gray-600">
              ⚠️ Something went wrong, please refresh the page.
            </p>
          }
        >
          <Suspense
            fallback={
              <p className="mt-4 text-center text-gray-600">
                Waiting for battery data...
              </p>
            }
          >
            <BatteryAnalytics batteryPromise={batteryPromise} />
          </Suspense>
        </ErrorBoundary>
      </div>
    </main>
  );
}
