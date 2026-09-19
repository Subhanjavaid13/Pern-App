import { useState } from "react";
import { ImageOffIcon, SquarePenIcon, Trash2Icon } from "lucide-react";

// Postgres returns DECIMAL as a string, so coerce before formatting.
const formatPrice = (price) =>
  Number(price).toLocaleString("en-US", { style: "currency", currency: "USD" });

const ProductCard = ({ product }) => {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <article className="card overflow-hidden bg-base-100 shadow-sm transition-shadow hover:shadow-lg">
      <figure className="aspect-square bg-base-200">
        {imageFailed ? (
          <ImageOffIcon className="size-10 text-base-content/25" />
        ) : (
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            onError={() => setImageFailed(true)}
            className="size-full object-cover"
          />
        )}
      </figure>

      <div className="card-body gap-2 p-4">
        <h2 className="line-clamp-2 text-base font-semibold" title={product.name}>
          {product.name}
        </h2>

        <div className="card-actions items-center justify-between">
          <p className="text-lg font-bold text-primary">{formatPrice(product.price)}</p>

          <div className="flex gap-1">
            {/* TODO: open the edit form once it exists. */}
            <button
              className="btn btn-square btn-ghost btn-sm"
              aria-label={`Edit ${product.name}`}
            >
              <SquarePenIcon className="size-4" />
            </button>

            {/* TODO: delete the product once the store action exists. */}
            <button
              className="btn btn-square btn-ghost btn-sm text-error"
              aria-label={`Delete ${product.name}`}
            >
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
