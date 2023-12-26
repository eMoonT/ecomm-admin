"use clinet";

import SizeClient from "./components/client";
import prisma from "@/lib/prisma";
import { SizeColumn } from "./components/columns";
import { format } from "date-fns";

const SizesPage = async ({ params }: { params: { storeId: string } }) => {
  const size = await prisma.size.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createAt: "desc",
    },
  });
  const formatSizeColumn: SizeColumn[] = size.map((item) => {
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
        <SizeClient data={formatSizeColumn} />
      </div>
    </div>
  );
};

export default SizesPage;
