import prisma from "@/lib/prisma";
import ProductForm from "./components/product-form";
interface ProductPageProps {
  params: { productId: string; storeId: string };
}
const ProductPage: React.FC<ProductPageProps> = async ({ params }) => {
  const product = await prisma?.product.findUnique({
    where: {
      id: params.productId,
    },
    include: {
      images: true,
    },
  });

  const categories = await prisma.category.findMany({
    where: {
      storeId: params.storeId,
    },
  });
  const colors = await prisma?.color.findMany({
    where: {
      storeId: params.storeId,
    },
  });
  const sizes = await prisma?.size.findMany({
    where: {
      storeId: params.storeId,
    },
  });
  return (
    <>
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <ProductForm categories={categories} sizes={sizes} colors={colors} initialData={product} />
        </div>
      </div>
    </>
  );
};

export default ProductPage;
