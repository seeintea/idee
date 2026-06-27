import type { BenchmarkRow } from "./types";

export function BenchmarkTable({ dataSource }: { dataSource: BenchmarkRow[] }) {
  return (
    <div className="mt-4 overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="text-left text-secondary border-b border-border">
            <th className="px-3 py-2 font-medium">项目</th>
            <th className="px-3 py-2 font-medium text-right">耗时（ms）</th>
            <th className="px-3 py-2 font-medium text-right">吞吐（MiB/s）</th>
          </tr>
        </thead>
        <tbody>
          {dataSource.map((row) => (
            <tr key={row.id} className="border-b border-border last:border-b-0">
              <td className="px-3 py-2 text-primary">{row.item}</td>
              <td className="px-3 py-2 text-primary font-ioskeley tabular-nums text-right">{row.ms}</td>
              <td className="px-3 py-2 text-primary font-ioskeley tabular-nums text-right">{row.throughput}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
