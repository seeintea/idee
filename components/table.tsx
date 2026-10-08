import type { Key, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type TableRow = { id: Key } & Record<string, ReactNode>;

export type TableColumn<Row extends TableRow> = {
  key: Extract<keyof Row, string>;
  title: ReactNode;
  align?: "left" | "center" | "right";
  className?: string;
};

const ALIGN_CLASS_NAME = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

export function Table<Row extends TableRow>({
  columns,
  dataSource,
  className,
}: {
  columns: readonly TableColumn<Row>[];
  dataSource: readonly Row[];
  className?: string;
}) {
  return (
    <div className={twMerge("not-prose my-6 overflow-x-auto", className)}>
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="text-secondary border-b border-border">
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className={twMerge("px-3 py-2 font-medium", ALIGN_CLASS_NAME[column.align ?? "left"])}
              >
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataSource.map((row) => (
            <tr key={row.id} className="border-b border-border last:border-b-0">
              {columns.map((column) => (
                <td
                  key={column.key}
                  className={twMerge(
                    "px-3 py-2 text-primary",
                    ALIGN_CLASS_NAME[column.align ?? "left"],
                    column.className,
                  )}
                >
                  {row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
