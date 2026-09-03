import { useState } from 'react';

import {
  useGetCategoriesQuery,
  useGetProductsQuery,
} from '../features/catalog/api/catalogApi';

import type { Product } from '../features/catalog/types/catalog.types';

import ProductCard from '../features/catalog/components/ProductCard';

import CartSummary from '../features/cart/components/CartSummary';

import { addToCart } from '../features/cart/cartSlice';

import {
  useAppDispatch,
  useAppSelector,
} from '../app/hooks';

interface ProductsPageProps {
  onContinue: () => void;
}

export default function ProductsPage({
  onContinue,
}: ProductsPageProps) {
  const dispatch = useAppDispatch();

  const [selectedCategoryId, setSelectedCategoryId] =
    useState<number | undefined>();

  const [selectedProductId, setSelectedProductId] =
    useState<number | undefined>();

  const cartItems = useAppSelector(
    (state) => state.cart.items
  );

  const {
    data: categories = [],
    isLoading: categoriesLoading,
    isError: categoriesError,
  } = useGetCategoriesQuery();

  const {
    data: products = [],
    isLoading: productsLoading,
    isError: productsError,
  } = useGetProductsQuery(
    selectedCategoryId
  );

  const handleAddToCart = (
    product: Product
  ) => {
    dispatch(addToCart(product));
  };

  const getCartQuantity = (
    productId: number
  ) => {
    return (
      cartItems.find(
        (item) => item.id === productId
      )?.quantity ?? 0
    );
  };

  if (categoriesLoading || productsLoading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
        <div className="text-center">
          <div
            className="spinner-border text-primary mb-3"
            role="status"
          />

          <div className="text-secondary">
            טוען מוצרים...
          </div>
        </div>
      </div>
    );
  }

  if (categoriesError || productsError) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
        <div className="alert alert-danger shadow-sm">
          אירעה שגיאה בטעינת הנתונים
        </div>
      </div>
    );
  }

  const displayedProducts = selectedProductId
    ? products.filter((p) => p.id === selectedProductId)
    : products;

  return (
    <div
      className="min-vh-100 min-vw-100 bg-light"
      dir="rtl"
    >
      <header className="bg-white border-bottom shadow-sm">
        <div className="container py-4">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 className="h3 fw-bold text-primary mb-1">
                🛍️ Shopping System
              </h1>

              <div className="text-secondary small">
                קטלוג המוצרים שלנו
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="p-5">
        <div className="row g-4">
          <div className="col-lg-2">
            <div className="bg-white p-4 rounded-4 shadow-sm">
              <div className="mb-3">
                <label className="form-label fw-bold text-primary mb-2">
                  בחר קטגוריה
                </label>
                <select
                  className="form-select"
                  value={selectedCategoryId ?? ''}
                  onChange={(e) => {
                    setSelectedCategoryId(
                      e.target.value === '' ? undefined : Number(e.target.value)
                    );
                    setSelectedProductId(undefined);
                  }}
                >
                  <option value="">כל הקטגוריות</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="form-label fw-bold text-primary mb-2">
                  בחר מוצר
                </label>
                <select
                  className="form-select"
                  value={selectedProductId ?? ''}
                  onChange={(e) =>
                    setSelectedProductId(
                      e.target.value === '' ? undefined : Number(e.target.value)
                    )
                  }
                >
                  <option value="">כל המוצרים בקטגוריה</option>
                  {products.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="mb-4">
              <h2 className="fw-bold mb-1">
                המוצרים שלנו
              </h2>

              <p className="text-secondary mb-0">
                בחרי קטגוריה והוסיפי מוצרים לעגלה
              </p>
            </div>

            {displayedProducts.length === 0 ? (
              <div className="text-center py-5 bg-white rounded-4 shadow-sm">
                <div className="fs-1 mb-3">
                  📦
                </div>

                <h4 className="fw-bold">
                  אין מוצרים
                </h4>

                <p className="text-secondary mb-0">
                  לא נמצאו מוצרים תואמים לבחירה
                </p>
              </div>
            ) : (
              <div className="row g-3">
                {displayedProducts.map((product) => (
                  <div className="col-md-6" key={product.id}>
                    <ProductCard
                      product={product}
                      quantity={getCartQuantity(
                        product.id
                      )}
                      onAdd={handleAddToCart}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="col-lg-4">
            <div className="mt-5">
              <CartSummary
                onContinue={onContinue}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}