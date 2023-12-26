"use clinet";

import CategoryClient from "./components/client";
import prisma from "@/lib/prisma";
import { CategoryColumn } from "./components/columns";
import { format } from "date-fns";

const CategoriesPage = async ({ params }: { params: { storeId: string } }) => {
  const categories = await prisma.category.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      billboard: true
    },
    orderBy: {
      createAt: "desc",
    },
  });
  const formatCategoriesColumn: CategoryColumn[] = categories.map((item) => {
    return {
      id: item.id,
      name: item.name,
      billboardLable: item.billboard.label,
      createAt: format(item.createAt, "yyyy-MM-dd"),
    };
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryClient data={formatCategoriesColumn} />
      </div>
    </div>
  );
};

export default CategoriesPage;
