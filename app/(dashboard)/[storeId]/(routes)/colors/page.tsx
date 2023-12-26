"use clinet";

import ColorClient from "./components/client";
import prisma from "@/lib/prisma";
import { ColorColumn } from "./components/columns";
import { format } from "date-fns";

const ColorsPage = async ({ params }: { params: { storeId: string } }) => {
  const color = await prisma.color.findMany({
    where: {
      storeId: params.storeId
    },
    orderBy: {
      createAt: "desc",
    },
  });
  const formatColorColumn: ColorColumn[] = color.map((item) => {
    return {
      id: item.id,
      name: item.name,
      value: item.value,
      createAt: format(item.createAt, "yyyy-MM-dd"),
    };
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorClient data={formatColorColumn} />
      </div>
    </div>
  );
};

export default ColorsPage;
