import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeftIcon, ImageOffIcon, SaveIcon, Trash2Icon } from "lucide-react";

import { useProductStore } from "../store/useProductStore";

const EMPTY_FORM = { name: "", price: "", image: "" };

const ProductPage = () => {
  const { id } = useParams();
  const { products, loading, fetchProducts } = useProductStore();

  // null means "untouched", so the form follows the product until the user
  // types. Deriving it during render avoids syncing props into state.
  const [edits, setEdits] = useState(null);
  const [failedSrc, setFailedSrc] = useState(null);

  // Route params are strings, product ids are numbers.
  const product = products.find((item) => String(item.id) === id);

  // The list is only in memory, so a direct visit or reload arrives with none.
  useEffect(() => {
    if (products.length === 0) fetchProducts();
  }, [products.length, fetchProducts]);

  const form =
    edits ?? (product ? { name: product.name, price: product.price, image: product.image } : EMPTY_FORM);

  const updateField = (field) => (event) => setEdits({ ...form, [field]: event.target.value });

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <Link to="/" className="btn btn-ghost btn-sm mb-8 gap-2">
        <ArrowLeftIcon className="size-4" />
        Back to Products
      </Link>

      {loading && !product ? (
        <div className="grid gap-8 md:grid-cols-2">
          <div className="skeleton aspect-square w-full rounded-2xl" />
          <div className="skeleton h-96 w-full rounded-2xl" />
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2">
          <figure className="aspect-square overflow-hidden rounded-2xl bg-base-100">
            {form.image && failedSrc !== form.image ? (
              <img
                src={form.image}
                alt={form.name}
                onError={() => setFailedSrc(form.image)}
                className="size-full object-cover"
              />
            ) : (
              <div className="flex size-full items-center justify-center">
                <ImageOffIcon className="size-12 text-base-content/25" />
              </div>
            )}
          </figure>

          <div className="card bg-base-100">
            <div className="card-body gap-4">
              <h1 className="text-2xl font-bold">Edit Product</h1>

              <label className="form-control">
                <div className="label">
                  <span className="label-text font-medium">Product Name</span>
                </div>
                <input
                  type="text"
                  value={form.name}
                  onChange={updateField("name")}
                  placeholder="Enter product name"
                  className="input input-bordered w-full"
                />
              </label>

              <label className="form-control">
                <div className="label">
                  <span className="label-text font-medium">Price</span>
                </div>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={form.price}
                  onChange={updateField("price")}
                  placeholder="0.00"
                  className="input input-bordered w-full"
                />
              </label>

              <label className="form-control">
                <div className="label">
                  <span className="label-text font-medium">Image URL</span>
                </div>
                <input
                  type="url"
                  value={form.image}
                  onChange={updateField("image")}
                  placeholder="https://example.com/image.jpg"
                  className="input input-bordered w-full"
                />
              </label>

              <div className="card-actions mt-2 justify-between">
                {/* TODO: delete the product, then navigate back to the list. */}
                <button type="button" className="btn btn-error gap-2">
                  <Trash2Icon className="size-4" />
                  Delete Product
                </button>

                {/* TODO: save the edits once an update action exists. */}
                <button type="button" className="btn btn-success gap-2">
                  <SaveIcon className="size-4" />
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default ProductPage;
