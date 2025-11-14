import React, { useState, useEffect } from "react"; // Import useEffect

export default function CreateItem() {
  // --- STATE ---
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    size: '',
    price: 0,
    description: '',
    imageUrl: '',
  });
  
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

  // --- EFFECT for auto-dismissing success message ---
  useEffect(() => {
    let timer;
    if (successMessage) {
      timer = setTimeout(() => {
        setSuccessMessage(null);
      }, 5000); // 5 seconds
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [successMessage]);

  // --- HANDLERS ---
  const handleChange = (e) => {
    const { id, value, type } = e.target;
    setFormData({
      ...formData,
      [id]: type === 'number' ? Number(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      setSuccessMessage(null);

      const res = await fetch('/api/item/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        setError(data.message || 'An error occurred.');
        return;
      }

      setSuccessMessage(data.message || 'Item created successfully!');
      setFormData({ // Clear the form
        name: '',
        category: '',
        size: '',
        price: 0,
        description: '',
        imageUrl: '',
      });

    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  // --- RENDER ---
  return (
    <main className="p-4 sm:p-8 max-w-4xl mx-auto bg-white rounded-xl shadow-xl my-10">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-8">
        Create New Item
      </h1>
      
      <form onSubmit={handleSubmit}>
        {/* --- Grid Layout for Inputs --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
          
          {/* Name */}
          <div className="md:col-span-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Item Name
            </label>
            <input
              type="text"
              placeholder="e.g., Premium Glossy Poster"
              className="w-full border border-gray-300 p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-300 ease-in-out"
              id="name"
              maxLength="64"
              required
              onChange={handleChange}
              value={formData.name}
            />
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <input
              type="text"
              placeholder="e.g., Apparel"
              className="w-full border border-gray-300 p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-300 ease-in-out"
              id="category"
              maxLength="64"
              required
              onChange={handleChange}
              value={formData.category}
            />
          </div>

          {/* Size */}
          <div>
            <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-1">
              Available Sizes
            </label>
            <input
              type="text"
              placeholder="e.g., A4, A3, A2"
              className="w-full border border-gray-300 p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-300 ease-in-out"
              id="size"
              maxLength="64"
              required
              onChange={handleChange}
              value={formData.size}
            />
          </div>

          {/* Price */}
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
              Price (Start at)
            </label>
            <input
              type="number"
              placeholder="e.g., 25.99"
              className="w-full border border-gray-300 p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-300 ease-in-out"
              id="price"
              step="0.01"
              min="0"
              required
              onChange={handleChange}
              value={formData.price}
            />
          </div>

          {/* Image URL */}
          <div>
            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">
              Image URL
            </label>
            <input
              type="text"
              placeholder="https://example.com/image.png"
              className="w-full border border-gray-300 p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-300 ease-in-out"
              id="imageUrl"
              required
              onChange={handleChange}
              value={formData.imageUrl}
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              placeholder="Detailed description of the item..."
              className="w-full border border-gray-300 p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-300 ease-in-out"
              id="description"
              rows="4"
              required
              onChange={handleChange}
              value={formData.description}
            />
          </div>
        </div>

        {/* --- Submit Button --- */}
        <div className="mt-8">
          <button
            disabled={loading}
            className="w-full p-3 bg-indigo-600 text-white rounded-lg uppercase font-semibold shadow-md hover:bg-indigo-700 disabled:opacity-70 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 ease-in-out"
          >
            {loading ? 'Creating...' : 'Create Item'}
          </button>
        </div>

        {/* --- Notifications Container (to prevent layout shift) --- */}
        <div className="mt-6 h-16">
          {/* Success Pop-up */}
          {successMessage && (
            <div
              className="p-4 bg-green-100 border-l-4 border-green-500 text-green-700 rounded-md shadow-md relative transition-all duration-500 ease-in-out"
              role="alert"
            >
              <span className="font-medium">Success!</span> {successMessage}
              <button
                type="button"
                onClick={() => setSuccessMessage(null)}
                className="absolute top-0 bottom-0 right-0 px-4 py-3"
                aria-label="Close"
              >
                <span className="font-bold text-lg">&times;</span>
              </button>
            </div>
          )}

          {/* Error Pop-up */}
          {error && (
            <div
              className="p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-md shadow-md relative transition-all duration-500 ease-in-out"
              role="alert"
            >
              <span className="font-medium">Error!</span> {error}
              <button
                type="button"
                onClick={() => setError(null)}
                className="absolute top-0 bottom-0 right-0 px-4 py-3"
                aria-label="Close"
              >
                <span className="font-bold text-lg">&times;</span>
              </button>
            </div>
          )}
        </div>
      </form>
    </main>
  );
}