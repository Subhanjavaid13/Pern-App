import { useEffect } from "react";
import { AlertCircleIcon, PackageOpenIcon, PlusIcon, RefreshCwIcon } from "lucide-react";
import toast from "react-hot-toast";

import AddProductModal from "../components/AddProductModal";
import ProductCard from "../components/ProductCard";
import { ADD_PRODUCT_MODAL_ID } from "../constants";
import { useProductStore } from "../store/useProductStore";

const SKELETON_COUNT = 8;

const HomePage = () => {
  const { products, loading, error, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // A refresh usually returns identical data, so confirm the outcome explicitly
  // either way -- otherwise a failed retry looks like nothing happened.
  // fetchProducts records its own outcome, so read that back instead of
  // duplicating the error handling here.
  const handleRefresh = async () => {
    await fetchProducts();
    const { error: refreshError } = useProductStore.getState();

    if (refreshError) toast.error(refreshError);
    else toast.success("Products updated");
  };

  const renderContent = () => {
    // Checked before `error` so a retry visibly resets to skeletons instead of
    // leaving the previous error on screen.
    if (loading) {
      return (
        <div className="grid grid-cols-2 gap-5 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
            <div key={index} className="skeleton h-72 w-full rounded-2xl" />
          ))}
        </div>
      );
    }

    if (error) {
      return (
        <div role="alert" className="alert alert-error">
          <AlertCircleIcon className="size-5 shrink-0" />
          <span className="flex-1 font-medium">{error}</span>
          <button onClick={handleRefresh} className="btn btn-sm">
            Try again
          </button>
        </div>
      );
    }

    if (products.length === 0) {
      return (
        <div className="flex flex-col items-center gap-3 py-24 text-center">
          <PackageOpenIcon className="size-12 text-base-content/25" />
          <p className="text-lg font-medium">No products yet</p>
          <p className="max-w-sm text-sm text-base-content/60">
            Products you add will show up here.
          </p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-2 gap-5 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    );
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">Products</h1>

        <div className="flex items-center gap-2">
          <button onClick={handleRefresh} disabled={loading} className="btn btn-ghost btn-sm gap-2">
            <RefreshCwIcon className="size-4" />
            Refresh
          </button>

          <button
            onClick={() => document.getElementById(ADD_PRODUCT_MODAL_ID).showModal()}
            className="btn btn-primary btn-sm gap-2"
          >
            <PlusIcon className="size-4" />
            Add Product
          </button>
        </div>
      </div>

      {renderContent()}

      <AddProductModal />
    </main>
  );
};

export default HomePage;
