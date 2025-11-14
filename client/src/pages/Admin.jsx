import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Trash, Edit } from "lucide-react"; // Using icons for a cleaner look

export default function Admin() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
  }, []); // Empty dependency array means this runs once on mount

  // Handle the delete item functionality
  const handleDeleteItem = async (itemId) => {
    // Show a confirmation dialog before deleting
    if (!window.confirm('Are you sure you want to delete this item?')) {
      return;
    }

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

      // If delete is successful, update the state to remove the item
      setItems((prevItems) => prevItems.filter((item) => item._id !== itemId));

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main className="p-4 sm:p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          Admin Dashboard
        </h1>
        <Link
          to="/admin/24863971/create-item"
          className="p-3 bg-indigo-600 text-white rounded-lg uppercase font-semibold shadow-md hover:bg-indigo-700 transition-all duration-300"
        >
          Create New Item
        </Link>
      </div>

      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Manage Items</h2>

      {/* --- Loading State --- */}
      {loading && (
        <p className="text-center text-gray-600">Loading items...</p>
      )}

      {/* --- Error State --- */}
      {error && (
        <p className="text-center text-red-600">Error: {error}</p>
      )}

      {/* --- Item List --- */}
      {!loading && !error && items.length === 0 && (
        <p className="text-center text-gray-500">No items found in the database.</p>
      )}

      {!loading && items.length > 0 && (
        <div className="overflow-x-auto bg-white rounded-xl shadow-xl">
          <table className="min-w-full divide-y divide-gray-200">
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
              {items.map((item) => (
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
                      to={`/update-item/${item._id}`} // Placeholder for update page
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