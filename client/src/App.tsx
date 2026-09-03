import { useState } from 'react';

import ProductsPage from './pages/ProductsPage';
import OrderPage from './pages/OrderPage';

function App() {
  const [page, setPage] = useState<'products' | 'order'>(
    'products'
  );

  return (
    <>
      {page === 'products' && (
        <ProductsPage
          onContinue={() => setPage('order')}
        />
      )}

      {page === 'order' && (
        <OrderPage
          onBack={() => setPage('products')}
        />
      )}
    </>
  );
}

export default App;