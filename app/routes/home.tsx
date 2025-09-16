import { Dashboard } from "@/features/BatteryDashboard";

export function meta() {
  return [
    { title: "Energy Storage Dashboard | Sonnen" },
    {
      name: "description",
      content: "Real-time battery charging level monitoring and analytics",
    },
  ];
}

export default function Home() {
  return <Dashboard />;
}
