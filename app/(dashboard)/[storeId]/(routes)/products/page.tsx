"use clinet";

import ProductClient from "./components/client";
import prisma from "@/lib/prisma";
import { ProductColumn } from "./components/columns";
import { format } from "date-fns";
import { foarmatted } from "@/lib/utils";

const ProductsPage = async ({ params }: { params: { storeId: string } }) => {
  const products = await prisma.product.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      category: true,
      size: true,
      color: true
    },
    orderBy: {
      createAt: "desc",
    },
  });
  const formatProductColumn: ProductColumn[] = products.map((item) => {
    return {
      id: item.id,
      name: item.name,
      isFeatured: item.isFeatured,
      isArchived: item.isArchived,
      price: foarmatted.format(item.price.toNumber()),
      category: item.category.name,
      size: item.size.value,
      color: item.color.value,
      createAt: format(item.createAt, "yyyy-MM-dd"),
    };
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductClient data={formatProductColumn} />
      </div>
    </div>
  );
};

export default ProductsPage;
