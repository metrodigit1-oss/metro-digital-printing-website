import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Trash, Edit, Search } from "lucide-react"; // 1. Import Search icon

export default function Admin() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // 2. Add state for the search term

  // Fetch all items when the component mounts
  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/item/get');
        const data = await res.json();

        if (!res.ok) {
          setError(data.message || 'Failed to fetch items');
          setLoading(false);
          return;
        }

        setItems(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  // Handle the delete item functionality
  const handleDeleteItem = async (itemId) => {
    if (!window.confirm('Are you sure you want to delete this item?')) {
      return;
    }
    // ... (rest of your delete logic) ...
    try {
      setError(null);
      const res = await fetch(`/api/item/delete/${itemId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'Failed to delete item');
        return;
      }
      setItems((prevItems) => prevItems.filter((item) => item._id !== itemId));
    } catch (err) {
      setError(err.message);
    }
  };

  // 3. Create a filtered list based on the search term
  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="p-4 sm:p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          Admin Dashboard
        </h1>
        <Link
          to="/create-item"
          className="p-3 bg-indigo-600 text-white rounded-lg uppercase font-semibold shadow-md hover:bg-indigo-700 transition-all duration-300"
        >
          Create New Item
        </Link>
      </div>

      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Manage Items</h2>

      {/* --- 4. Add the Search Input Bar --- */}
      <div className="mb-4 relative">
        <input
          type="text"
          placeholder="Search items by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 pl-10 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-300"
        />
        <Search className="h-5 w-5 text-gray-400 absolute top-3.5 left-3" />
      </div>

      {/* --- Loading State --- */}
      {loading && (
        <p className="text-center text-gray-600">Loading items...</p>
      )}

      {/* --- Error State --- */}
      {error && (
        <p className="text-center text-red-600">Error: {error}</p>
      )}

      {/* --- Item List --- */}
      {!loading && !error && filteredItems.length === 0 && (
        <p className="text-center text-gray-500">
          {items.length === 0 ? "No items found in the database." : "No items match your search."}
        </p>
      )}

      {!loading && filteredItems.length > 0 && (
        <div className="overflow-x-auto bg-white rounded-xl shadow-xl">
          <table className="min-w-full divide-y divide-gray-200">
            {/* ... (table head <thead> is unchanged) ... */}
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Image
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Category
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {/* 5. Map over filteredItems instead of items */}
              {filteredItems.map((item) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="h-12 w-12 object-cover rounded-md"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {item.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link
                      to={`/update-item/${item._id}`}
                      className="text-indigo-600 hover:text-indigo-900 inline-block mr-4"
                      title="Update"
                    >
                      <Edit className="h-5 w-5" />
                    </Link>
                    <button
                      onClick={() => handleDeleteItem(item._id)}
                      className="text-red-600 hover:text-red-900 inline-block"
                      title="Delete"
                    >
                      <Trash className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}