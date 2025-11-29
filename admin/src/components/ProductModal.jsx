export default function ProductModal({ product, onSave, onClose }) {
  const isEdit = !!product

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const newProduct = {
      id: product?.id || Date.now(),
      name: formData.get('name'),
      price: parseFloat(formData.get('price')),
      category: formData.get('category'),
      image: formData.get('image') || 'https://via.placeholder.com/400x300/ffebee/333?text=Flower',
      description: formData.get('description')
    }
    onSave(newProduct)
    onClose()
  }

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ background: 'rgba(0,0,0,0.7)' }}>
      <div className="modal-dialog modal-lg">
        <form onSubmit={handleSubmit}>
          <div className="modal-content border-0 shadow-lg">
            <div className="modal-header bg-success text-white">
              <h5 className="modal-title">
                <i className="bi bi-plus-circle me-2"></i>
                {isEdit ? 'Edit Product' : 'Add New Flower'}
              </h5>
              <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label fw-bold">Flower Name</label>
                    <input name="name" type="text" className="form-control form-control-lg" defaultValue={product?.name} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Price ($)</label>
                    <input name="price" type="number" step="0.01" className="form-control form-control-lg" defaultValue={product?.price} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Category</label>
                    <select name="category" className="form-select form-select-lg" defaultValue={product?.category || 'Rose'}>
                      <option>Rose</option>
                      <option>Tulip</option>
                      <option>Lily</option>
                      <option>Sunflower</option>
                      <option>Orchid</option>
                      <option>Mixed Bouquet</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label fw-bold">Image URL (or leave for placeholder)</label>
                    <input name="image" type="url" className="form-control" defaultValue={product?.image} placeholder="https://example.com/rose.jpg" />
                    {product?.image && (
                      <img src={product.image} alt="preview" className="mt-2 rounded shadow" style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
                    )}
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label fw-bold">Description</label>
                <textarea name="description" rows="3" className="form-control" defaultValue={product?.description}></textarea>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary btn-lg" onClick={onClose}>Cancel</button>
              <button type="submit" className="btn btn-success btn-lg px-4">
                {isEdit ? 'Update' : 'Add Product'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}