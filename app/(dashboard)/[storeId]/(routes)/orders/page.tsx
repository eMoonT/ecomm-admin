"use clinet";

import OrderClient from "./components/client";
import prisma from "@/lib/prisma";
import { OrderColumn } from "./components/columns";
import { format } from "date-fns";
import { formatted } from "@/lib/utils";

const OrdersPage = async ({ params }: { params: { storeId: string } }) => {
  const orders = await prisma.order.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createAt: "desc",
    },
  });
  const formatOrderColumn: OrderColumn[] = orders.map((item) => {
    return {
      id: item.id,
      phone: item.phone,
      address: item.address,
      isPaid: item.isPaid,
      products: item.orderItems.map((orderItem) => orderItem.product.name).join(', '),
      totalPrice: formatted.format(
        item.orderItems.reduce(
          (total, item) => (total + Number(item.product.price)),
          0
        )
      ),
      createAt: format(item.createAt, "yyyy-MM-dd"),
    };
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrderClient data={formatOrderColumn} />
      </div>
    </div>
  );
};

export default OrdersPage;
