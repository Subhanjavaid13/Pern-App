import { useState } from "react";
import { ImageOffIcon } from "lucide-react";

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

      <div className="card-body gap-1 p-4">
        <h2 className="line-clamp-2 text-base font-semibold" title={product.name}>
          {product.name}
        </h2>
        <p className="text-lg font-bold text-primary">{formatPrice(product.price)}</p>
      </div>
    </article>
  );
};

export default ProductCard;
