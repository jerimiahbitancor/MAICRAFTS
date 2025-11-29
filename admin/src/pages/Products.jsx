import { useState, useEffect } from 'react'
import ProductModal from '../components/ProductModal'

export default function Products() {
  const [products, setProducts] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)

  useEffect(() => {
    const saved = localStorage.getItem('flowerProducts')
    if (saved) {
      setProducts(JSON.parse(saved))
    } else {
      // Default flowers
      const defaults = [
        { id: 1, name: "Red Rose Bouquet", price: 59.99, category: "Rose", image: "https://images.unsplash.com/photo-1561185483-b4a2e0340d1e?w=500", description: "Classic romantic red roses" },
        { id: 2, name: "Pink Tulips", price: 39.99, category: "Tulip", image: "https://images.unsplash.com/photo-1581251397930-8d8eb5a2bc7b?w=500", description: "Fresh spring tulips" },
        { id: 3, name: "White Lily Arrangement", price: 79.99, category: "Lily", image: "https://images.unsplash.com/photo-1606041004028-879ce0e7e7ed?w=500", description: "Elegant white lilies" }
      ]
      setProducts(defaults)
      localStorage.setItem('flowerProducts', JSON.stringify(defaults))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('flowerProducts', JSON.stringify(products))
  }, [products])

  const handleSave = (product) => {
    if (editingProduct) {
      setProducts(products.map(p => p.id === product.id ? product : p))
    } else {
      setProducts([...products, product])
    }
    setEditingProduct(null)
  }

  const handleDelete = (id) => {
    if (window.confirm("Delete this flower permanently?")) {
      setProducts(products.filter(p => p.id !== id))
    }
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-5">
        <div>
          <h1 className="text-success fw-bold">
            <i className="bi bi-flower1"></i> Manage Flowers
          </h1>
          <p className="text-muted">Add, edit or remove products from your shop</p>
        </div>
        <button className="btn btn-success btn-lg shadow" onClick={() => { setEditingProduct(null); setShowModal(true) }}>
          <i className="bi bi-plus-circle"></i> Add New Flower
        </button>
      </div>

      <div className="row g-4">
        {products.map(product => (
          <div key={product.id} className="col-md-6 col-lg-4">
            <div className="card h-100 shadow-lg border-0 overflow-hidden hover-shadow">
              <img src={product.image} className="card-img-top" alt={product.name} style={{ height: '250px', objectFit: 'cover' }} />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title text-success fw-bold">{product.name}</h5>
                <span className="badge bg-primary mb-2">{product.category}</span>
                <p className="text-muted flex-grow-1">{product.description}</p>
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <h4 className="text-success fw-bold">${product.price}</h4>
                  <div>
                    <button onClick={() => { setEditingProduct(product); setShowModal(true) }} className="btn btn-warning btn-sm me-2">
                      <i className="bi bi-pencil"></i>
                    </button>
                    <button onClick={() => handleDelete(product.id)} className="btn btn-danger btn-sm">
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <ProductModal
          product={editingProduct}
          onSave={handleSave}
          onClose={() => { setShowModal(false); setEditingProduct(null) }}
        />
      )}
    </>
  )
}