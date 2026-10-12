import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

function Categories() {
  const location = useLocation()
  return <Navigate to={`/products${location.search}`} replace />
}

export default Categories