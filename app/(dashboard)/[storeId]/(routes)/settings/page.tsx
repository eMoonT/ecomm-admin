import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import prisma from "@/lib/prisma";
import SettingsForm from "./components/settings-form";

interface SettingsPageProps {
  params: { storeId: string };
}

const SettingsPage: React.FC<SettingsPageProps> = async ({ params }) => {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const store = await prisma.store.findFirst({
    where: {
      id: params.storeId,
      userId,
    },
  });
  if (!store) {
    redirect("/");
  }

  return (
    <div>
      <div className="flex-col">
        <div className="flex-1 p-8 pt-6 space-6-4">
          <SettingsForm initialData={store}/>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
