import { useState } from "react";
import data from "./assets/data.json";
import Navbar from "./components/Navbar.jsx";
import Sidebar from "./components/Sidebar.jsx";
import ProductList from "./components/ProductList.jsx";
import ProductDetails from "./components/ProductDetail.jsx";

function App() {
  // null: trang Home (hiển thị tất cả sản phẩm)
  const [activeCategory, setActiveCategory] = useState(null);

  // null: màn hình danh sách; có id: màn hình chi tiết sản phẩm
  const [selectedProductId, setSelectedProductId] = useState(null);

  const products = data.products.map((product) => ({
    ...product,
    category: data.categories.find((cat) => cat.id === product.category_id)?.title,
  }));
  const categories = data.categories.map((cat) => cat.title).sort((a, b) =>
    a.localeCompare(b)
  );

  const filteredProducts = !activeCategory
    ? products
    : products.filter((p) => p.category === activeCategory);

  const selectedProduct =
    selectedProductId == null
      ? null
      : products.find((p) => p.id === selectedProductId) || null;

  // xử lý khi quay về trang Home
  const goHome = () => {
    setActiveCategory(null);
    setSelectedProductId(null);
  };

  // xử lý khi chọn danh mục
  const pickCategory = (cat) => {
    setActiveCategory(cat);
    setSelectedProductId(null);
  };

  // xử lý khi xem chi tiết sản phẩm
  const goToDetails = (id) => setSelectedProductId(id);

  // xử lý khi quay lại danh sách
  const backToList = () => setSelectedProductId(null);
  return (
    <div className="min-h-dvh bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-6xl px-3 py-3">
        <Navbar handleGoToHome={goHome} />

        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-12">
          <aside className="sm:col-span-3">
            <Sidebar
              categories={categories}
              activeCategory={activeCategory}
              handlePickCategory={pickCategory}
            />
          </aside>

          <main className="sm:col-span-9">
            {selectedProduct ? (
              <ProductDetails
                product={selectedProduct}
                handleGoToBack={backToList}
              />
            ) : (
              <ProductList
                title={
                  activeCategory
                    ? `Category: ${activeCategory}`
                    : "Tất cả sản phẩm"
                }
                products={filteredProducts}
                handleGoToDetails={goToDetails}
              />
            )}
          </main>
        </div>

        <footer className="mt-3 rounded-xl bg-slate-200/60 px-4 py-4 text-center text-sm text-slate-700">
          Footer content goes here
        </footer>
      </div>
    </div>
  );
}


export default App;
