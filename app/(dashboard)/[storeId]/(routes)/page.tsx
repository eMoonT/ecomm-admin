import prisma from "@/lib/prisma";

interface DashboardProps {
  params: { storeId: string };
}

const DashboardPage: React.FC<DashboardProps> = async ({ params }) => {
  const store = await prisma.store.findFirst({
    where: {
      id: params.storeId,
    },
  });
  return (
    <>
      <div>Active Store: {store?.name}</div>
    </>
  );
};

export default DashboardPage;
