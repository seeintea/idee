import { Table, type TableColumn } from "@/components/table";
import type { BenchmarkRow } from "./types";

const columns = [
  { key: "item", title: "项目" },
  { key: "ms", title: "耗时（ms）", align: "right", className: "font-ioskeley tabular-nums" },
  { key: "throughput", title: "吞吐（MiB/s）", align: "right", className: "font-ioskeley tabular-nums" },
] satisfies TableColumn<BenchmarkRow>[];

export function BenchmarkTable({ dataSource }: { dataSource: BenchmarkRow[] }) {
  return <Table columns={columns} dataSource={dataSource} className="mt-4 mb-0" />;
}
