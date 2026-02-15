'use client';

import React, { createContext, useContext, useState } from 'react';
import { Chart } from '@repo/ui';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  RadialLinearScale,
} from 'chart.js';
import { Line, Bar, Pie, Doughnut, Radar, PolarArea } from 'react-chartjs-2';
import * as styles from './chart.demo.css';

interface ChartControlsContextType {
  injectStyles: boolean;
  setInjectStyles: (value: boolean) => void;
}

const ChartControlsContext = createContext<ChartControlsContextType | null>(
  null,
);

export function DemoChartBasicProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [injectStyles, setInjectStyles] = useState(true);
  return (
    <ChartControlsContext.Provider value={{ injectStyles, setInjectStyles }}>
      {children}
    </ChartControlsContext.Provider>
  );
}

export function DemoChartBasicWithControls() {
  const ctx = useContext(ChartControlsContext);
  if (!ctx) return <div>컨트롤러를 사용하려면 Provider로 감싸야 합니다.</div>;
  return <DemoChartBasic />;
}

export function DemoChartBasicControls() {
  const ctx = useContext(ChartControlsContext);
  if (!ctx) return <div>컨트롤러를 사용하려면 Provider로 감싸야 합니다.</div>;

  const { injectStyles, setInjectStyles } = ctx;
  return (
    <label style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <input
        type="checkbox"
        checked={injectStyles}
        onChange={(e) => setInjectStyles(e.target.checked)}
      />
      <span
        style={{
          fontSize: 'var(--font-size-sm)',
          color: 'var(--color-text-secondary)',
        }}
      >
        Inject Styles
      </span>
    </label>
  );
}

function useInjectStyles() {
  return useContext(ChartControlsContext)?.injectStyles ?? true;
}

// Chart.js 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  RadialLinearScale,
);

// 공통 데이터
const commonLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
const commonData = [12, 19, 3, 5, 2, 3];
const commonData2 = [2, 3, 20, 5, 1, 4];

// Line Chart 데이터
const lineData = {
  labels: commonLabels,
  datasets: [
    {
      label: 'Sales',
      data: commonData,
      borderColor: 'oklch(74.3% 0.104 195.2)',
      backgroundColor: 'oklch(74.3% 0.104 195.2 / 0.2)',
      tension: 0.1,
    },
    {
      label: 'Revenue',
      data: commonData2,
      borderColor: 'oklch(70.7% 0.191 10.5)',
      backgroundColor: 'oklch(70.7% 0.191 10.5 / 0.2)',
      tension: 0.1,
    },
  ],
};

// Bar Chart 데이터
const barData = {
  labels: commonLabels,
  datasets: [
    {
      label: 'Sales',
      data: commonData,
      backgroundColor: 'oklch(74.3% 0.104 195.2 / 0.6)',
      borderColor: 'oklch(74.3% 0.104 195.2)',
      borderWidth: 1,
    },
    {
      label: 'Revenue',
      data: commonData2,
      backgroundColor: 'oklch(70.7% 0.191 10.5 / 0.6)',
      borderColor: 'oklch(70.7% 0.191 10.5)',
      borderWidth: 1,
    },
  ],
};

// Pie Chart 데이터
const pieData = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
  datasets: [
    {
      label: 'Dataset 1',
      data: [12, 19, 3, 5, 2],
      backgroundColor: [
        'oklch(70.7% 0.191 10.5 / 0.6)',
        'oklch(68.5% 0.144 243.1 / 0.6)',
        'oklch(87.3% 0.145 86.5 / 0.6)',
        'oklch(74.3% 0.104 195.2 / 0.6)',
        'oklch(64.0% 0.217 294.9 / 0.6)',
      ],
      borderColor: [
        'oklch(70.7% 0.191 10.5)',
        'oklch(68.5% 0.144 243.1)',
        'oklch(87.3% 0.145 86.5)',
        'oklch(74.3% 0.104 195.2)',
        'oklch(64.0% 0.217 294.9)',
      ],
      borderWidth: 1,
    },
  ],
};

// Doughnut Chart 데이터
const doughnutData = {
  labels: ['Desktop', 'Mobile', 'Tablet'],
  datasets: [
    {
      label: 'Users',
      data: [60, 30, 10],
      backgroundColor: [
        'oklch(74.3% 0.104 195.2 / 0.6)',
        'oklch(70.7% 0.191 10.5 / 0.6)',
        'oklch(87.3% 0.145 86.5 / 0.6)',
      ],
      borderColor: [
        'oklch(74.3% 0.104 195.2)',
        'oklch(70.7% 0.191 10.5)',
        'oklch(87.3% 0.145 86.5)',
      ],
      borderWidth: 1,
    },
  ],
};

// Radar Chart 데이터
const radarData = {
  labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling'],
  datasets: [
    {
      label: 'My First Dataset',
      data: [65, 59, 90, 81, 56, 55],
      backgroundColor: 'oklch(74.3% 0.104 195.2 / 0.2)',
      borderColor: 'oklch(74.3% 0.104 195.2)',
      borderWidth: 1,
    },
    {
      label: 'My Second Dataset',
      data: [28, 48, 40, 19, 96, 27],
      backgroundColor: 'oklch(70.7% 0.191 10.5 / 0.2)',
      borderColor: 'oklch(70.7% 0.191 10.5)',
      borderWidth: 1,
    },
  ],
};

// Polar Area Chart 데이터
const polarAreaData = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
  datasets: [
    {
      label: 'Dataset 1',
      data: [11, 16, 7, 3, 14],
      backgroundColor: [
        'oklch(70.7% 0.191 10.5 / 0.6)',
        'oklch(68.5% 0.144 243.1 / 0.6)',
        'oklch(87.3% 0.145 86.5 / 0.6)',
        'oklch(74.3% 0.104 195.2 / 0.6)',
        'oklch(64.0% 0.217 294.9 / 0.6)',
      ],
      borderColor: [
        'oklch(70.7% 0.191 10.5)',
        'oklch(68.5% 0.144 243.1)',
        'oklch(87.3% 0.145 86.5)',
        'oklch(74.3% 0.104 195.2)',
        'oklch(64.0% 0.217 294.9)',
      ],
      borderWidth: 1,
    },
  ],
};

// 공통 옵션
const commonOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    tooltip: {
      enabled: true,
    },
  },
};

// Chart 타입 정의
type ChartType = 'line' | 'bar' | 'pie' | 'doughnut' | 'radar' | 'polarArea';

// 차트 타입별 컴포넌트
function ChartRenderer({ type }: { type: ChartType }) {
  switch (type) {
    case 'line':
      return <Line data={lineData} options={commonOptions} />;
    case 'bar':
      return <Bar data={barData} options={commonOptions} />;
    case 'pie':
      return <Pie data={pieData} options={commonOptions} />;
    case 'doughnut':
      return <Doughnut data={doughnutData} options={commonOptions} />;
    case 'radar':
      return <Radar data={radarData} options={commonOptions} />;
    case 'polarArea':
      return <PolarArea data={polarAreaData} options={commonOptions} />;
    default:
      return null;
  }
}

// 차트 타입 선택 UI가 있는 기본 예제
export function DemoChartBasic() {
  const injectStyles = useInjectStyles();
  const [chartType, setChartType] = useState<ChartType>('line');

  const chartTypes: { value: ChartType; label: string }[] = [
    { value: 'line', label: 'Line' },
    { value: 'bar', label: 'Bar' },
    { value: 'pie', label: 'Pie' },
    { value: 'doughnut', label: 'Doughnut' },
    { value: 'radar', label: 'Radar' },
    { value: 'polarArea', label: 'Polar Area' },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.chartSelector}>
        {chartTypes.map((type) => (
          <button
            key={type.value}
            className={`${styles.chartButton} ${
              chartType === type.value ? styles.chartButtonActive : ''
            }`}
            onClick={() => setChartType(type.value)}
          >
            {type.label}
          </button>
        ))}
      </div>
      <div
        className={`${styles.chartWrapper} ${!injectStyles ? styles.chartWrapperClass : ''}`}
      >
        <Chart
          injectStyles={injectStyles}
          className={injectStyles ? undefined : styles.chart}
        >
          <ChartRenderer type={chartType} />
        </Chart>
      </div>
    </div>
  );
}

// Line Chart 예제
export function DemoChartLine() {
  const injectStyles = useInjectStyles();
  return (
    <div className={styles.container}>
      <div className={styles.chartWrapper}>
        <Chart
          injectStyles={injectStyles}
          className={injectStyles ? undefined : styles.chart}
        >
          <Line data={lineData} options={commonOptions} />
        </Chart>
      </div>
    </div>
  );
}

// Bar Chart 예제
export function DemoChartBar() {
  const injectStyles = useInjectStyles();
  return (
    <div className={styles.container}>
      <div className={styles.chartWrapper}>
        <Chart
          injectStyles={injectStyles}
          className={injectStyles ? undefined : styles.chart}
        >
          <Bar data={barData} options={commonOptions} />
        </Chart>
      </div>
    </div>
  );
}

// Pie Chart 예제
export function DemoChartPie() {
  const injectStyles = useInjectStyles();
  return (
    <div className={styles.container}>
      <div className={styles.chartWrapper}>
        <Chart
          injectStyles={injectStyles}
          className={injectStyles ? undefined : styles.chart}
        >
          <Pie data={pieData} options={commonOptions} />
        </Chart>
      </div>
    </div>
  );
}

// Doughnut Chart 예제
export function DemoChartDoughnut() {
  const injectStyles = useInjectStyles();
  return (
    <div className={styles.container}>
      <div className={styles.chartWrapper}>
        <Chart
          injectStyles={injectStyles}
          className={injectStyles ? undefined : styles.chart}
        >
          <Doughnut data={doughnutData} options={commonOptions} />
        </Chart>
      </div>
    </div>
  );
}

// Radar Chart 예제
export function DemoChartRadar() {
  const injectStyles = useInjectStyles();
  return (
    <div className={styles.container}>
      <div className={styles.chartWrapper}>
        <Chart
          injectStyles={injectStyles}
          className={injectStyles ? undefined : styles.chart}
        >
          <Radar data={radarData} options={commonOptions} />
        </Chart>
      </div>
    </div>
  );
}

// Polar Area Chart 예제
export function DemoChartPolarArea() {
  const injectStyles = useInjectStyles();
  return (
    <div className={styles.container}>
      <div className={styles.chartWrapper}>
        <Chart
          injectStyles={injectStyles}
          className={injectStyles ? undefined : styles.chart}
        >
          <PolarArea data={polarAreaData} options={commonOptions} />
        </Chart>
      </div>
    </div>
  );
}
