"use client";

import { useStoreModel } from "@/hooks/use-store-model";
import { useEffect } from "react";

export default function Home() {
  const isOpen = useStoreModel((state) => state.isOpen);
  const onOpen = useStoreModel((state) => state.onOpen);

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  return <div className="p-4">Root Page</div>;
}
