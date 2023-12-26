"use clinet";

import BillboardClient from "./components/BillboardClient";
import prisma from "@/lib/prisma";
import { BillboardColumn } from "./components/columns";
import { format } from "date-fns";

const BillboardsPage = async ({ params }: { params: { storeId: string } }) => {
  const billboards = await prisma.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createAt: "desc",
    },
  });
  const formatBillboardColumn: BillboardColumn[] = billboards.map((item) => {
    return {
      id: item.id,
      label: item.label,
      createAt: format(item.createAt, "yyyy-MM-dd"),
    };
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={formatBillboardColumn} />
      </div>
    </div>
  );
};

export default BillboardsPage;
