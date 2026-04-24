// components/ui/chart-bar-stacked.tsx
import { Bar, BarChart, CartesianGrid, YAxis, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

interface SubCategoryAvailability {
  sub_category_name: string;
  available: number;
  unavailable: number;
}

interface ChartBarStackedProps {
  chartData: SubCategoryAvailability[];
  title: string;
  description: string;
}

const chartConfig = {
  available: {
    label: "Available",
    color: "#7c3aed",
  },
  unavailable: {
    label: "Unavailable",
    color: "#e9d5ff",
  },
};

const ROW_HEIGHT = 40;

export function ChartBarStacked({ chartData, title, description }: ChartBarStackedProps) {
  const data = chartData ?? [];
  const chartHeight = Math.max(data.length * ROW_HEIGHT, 200);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>

      <CardContent className="px-2">
        <div className="overflow-y-auto max-h-[400px]">
          <ChartContainer
            config={chartConfig}
            style={{ width: "100%", height: chartHeight }}
          >
            <BarChart
              layout="vertical"
              data={data}
              margin={{ top: 4, right: 16, left: 8, bottom: 4 }}
            >
              <CartesianGrid horizontal={false} />
              <YAxis
                dataKey="sub_category_name"
                type="category"
                tickLine={false}
                axisLine={false}
                width={110}
                tick={{ fontSize: 11 }}
                tickFormatter={(v) =>
                  v.length > 14 ? `${v.slice(0, 14)}…` : v
                }
              />
              <XAxis type="number" hide />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar
                dataKey="available"
                stackId="a"
                fill={chartConfig.available.color}
                radius={[0, 0, 0, 0]}
              />
              <Bar
                dataKey="unavailable"
                stackId="a"
                fill={chartConfig.unavailable.color}
                radius={[0, 6, 6, 0]}
              />
            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>

      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="text-muted-foreground leading-none">{description}</div>
      </CardFooter>
    </Card>
  );
}