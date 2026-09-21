import { DollarSignIcon, ImageIcon, PackageIcon, PlusCircleIcon, XIcon } from "lucide-react";

import { ADD_PRODUCT_MODAL_ID } from "../constants";
import { useProductStore } from "../store/useProductStore";

const AddProductModal = () => {
  const { formData, setFormData, addProduct, loading } = useProductStore();

  const closeModal = () => document.getElementById(ADD_PRODUCT_MODAL_ID).close();

  // Guard the submit as well as the API, so the button reads as unavailable
  // before the user has filled anything in.
  const isIncomplete = !formData.name.trim() || !formData.price || !formData.image.trim();

  return (
    <dialog id={ADD_PRODUCT_MODAL_ID} className="modal">
      <div className="modal-box">
        <button
          type="button"
          onClick={closeModal}
          className="btn btn-circle btn-ghost btn-sm absolute right-3 top-3"
          aria-label="Close"
        >
          <XIcon className="size-4" />
        </button>

        <h3 className="mb-6 text-xl font-bold">Add New Product</h3>

        <form onSubmit={addProduct} className="space-y-4">
          <label className="form-control">
            <div className="label">
              <span className="label-text font-medium">Product Name</span>
            </div>
            <div className="relative">
              <PackageIcon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-base-content/40" />
              <input
                type="text"
                value={formData.name}
                onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                placeholder="Enter product name"
                className="input input-bordered w-full pl-10"
                required
              />
            </div>
          </label>

          <label className="form-control">
            <div className="label">
              <span className="label-text font-medium">Price</span>
            </div>
            <div className="relative">
              <DollarSignIcon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-base-content/40" />
              <input
                type="number"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={(event) => setFormData({ ...formData, price: event.target.value })}
                placeholder="0.00"
                className="input input-bordered w-full pl-10"
                required
              />
            </div>
          </label>

          <label className="form-control">
            <div className="label">
              <span className="label-text font-medium">Image URL</span>
            </div>
            <div className="relative">
              <ImageIcon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-base-content/40" />
              <input
                type="url"
                value={formData.image}
                onChange={(event) => setFormData({ ...formData, image: event.target.value })}
                placeholder="https://example.com/image.jpg"
                className="input input-bordered w-full pl-10"
                required
              />
            </div>
          </label>

          <div className="modal-action">
            <button type="button" onClick={closeModal} className="btn btn-ghost">
              Cancel
            </button>

            <button type="submit" disabled={isIncomplete || loading} className="btn btn-primary gap-2">
              {loading ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                <PlusCircleIcon className="size-4" />
              )}
              Add Product
            </button>
          </div>
        </form>
      </div>

      {/* Clicking the backdrop closes the dialog. */}
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default AddProductModal;
