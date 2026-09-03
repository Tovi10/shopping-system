import type { Product } from '../types/catalog.types';

interface ProductCardProps {
  product: Product;
  quantity: number;
  onAdd: (product: Product) => void;
}

export default function ProductCard({
  product,
  quantity,
  onAdd,
}: ProductCardProps) {
    
  return (
    <div className="col">
      <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
        <div className="card-body p-4 d-flex flex-column">
          <div className="mb-3">
            <span className="badge bg-primary-subtle text-primary">
              {product.categoryName}
            </span>
          </div>

          <h3 className="h5 fw-bold mb-2">
            {product.name}
          </h3>

          <p className="text-secondary small flex-grow-1">
            מוצר איכותי מתוך קטלוג החנות
          </p>

          <div className="d-flex justify-content-between align-items-center mt-3">
            <div>
              <div className="small text-secondary">
                מחיר
              </div>

              <div className="fs-4 fw-bold text-primary">
                ₪{product.price.toLocaleString()}
              </div>
            </div>

            <button
              type="button"
              className="btn btn-primary px-3"
              onClick={() => onAdd(product)}
            >
              + הוסף
            </button>
          </div>

          {quantity > 0 && (
            <div className="mt-3 pt-3 border-top text-center">
              <span className="text-success fw-semibold">
                ✓ בעגלה · {quantity}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}