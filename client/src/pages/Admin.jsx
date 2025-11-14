import React from 'react'
import { Link } from 'react-router-dom'
export default function Admin() {
  return (
    <main>
        <h1>ADMIN</h1>
        <ul>
            <Link to="/admin/24863971/create-item">
            <li>Create Item</li>
            </Link>
            
        </ul>
    </main>
  )
}
