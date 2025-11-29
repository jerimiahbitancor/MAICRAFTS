import { useEffect, useState } from 'react'

export default function Dashboard() {
  const [stats, setStats] = useState({ count: 0, revenue: 0, categories: 0 })

  useEffect(() => {
    const saved = localStorage.getItem('flowerProducts')
    const products = saved ? JSON.parse(saved) : []
    const revenue = products.reduce((sum, p) => sum + p.price, 0).toFixed(2)
    const categories = new Set(products.map(p => p.category)).size

    setStats({ count: products.length, revenue, categories })
  }, [])

  return (
    <>
      <h1 className="text-success fw-bold mb-5">
        <i className="bi bi-speedometer2"></i> Dashboard
      </h1>

      <div className="row g-4 mb-5">
        <div className="col-md-4">
          <div className="card text-white bg-success shadow-lg">
            <div className="card-body text-center">
              <i className="bi bi-flower1 fs-1"></i>
              <h2 className="mt-3">{stats.count}</h2>
              <p className="fs-5">Total Flowers</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-white bg-primary shadow-lg">
            <div className="card-body text-center">
              <i className="bi bi-currency-dollar fs-1"></i>
              <h2 className="mt-3">${stats.revenue}</h2>
              <p className="fs-5">Total Value</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-white bg-warning shadow-lg">
            <div className="card-body text-center">
              <i className="bi bi-grid-3x3-gap fs-1"></i>
              <h2 className="mt-3">{stats.categories}</h2>
              <p className="fs-5">Categories</p>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center">
        <img src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1200" className="img-fluid rounded-4 shadow-lg" alt="Flower Shop" />
      </div>
    </>
  )
}