// client/src/pages/Search.jsx

import { useState, useEffect, use } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ItemCard from "../components/ItemCard.jsx";

export default function Search() {
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  const [categories, setCategories] = useState([]);
  const [categoryError, setCategoryError] = useState(null);
  const [lamination, setLamination] = useState([]);
  const [laminationError, setLaminationError] = useState(null);
  const [thickness, setThickness] = useState([]);
  const [thicknessError, setThicknessError] = useState(null);
  const [side, setSide] = useState([]);
  const [sideError, setSideError] = useState(null);
  const [size, setSize] = useState([]);
  const [sizeError, setSizeError] = useState(null);

  const [sidebarData, setSidebarData] = useState({
    searchTerm: "",
    sort: "createdAt",
    order: "desc",
    category: "all",
    lamination: "all",
    thickness: "all",
    side: "all",
    size: "all",
  });

  // --- 2. ADD A NEW useEffect TO FETCH CATEGORIES ON MOUNT ---
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setCategoryError(null);
        const res = await fetch("/api/item/categories");
        const data = await res.json();
        if (data.message) {
          setCategoryError(data.message);
        } else {
          setCategories(data);
        }
      } catch (err) {
        setCategoryError(err.message);
      }
    };
    fetchCategories();
  }, []); // Empty dependency array means this runs once on mount

  useEffect(() => {
    const fetchLaminations = async () => {
      try {
        setLaminationError(null);
        const res = await fetch("/api/item/laminations");
        const data = await res.json();
        if (data.message) {
          setLaminationError(data.message);
        } else {
          setLamination(data);
        }
      } catch (err) {
        setLaminationError(err.message);
      }
    };
    fetchLaminations();
  }, []); // Empty dependency array means this runs once on mount

  useEffect(() => {
    const fetchThicknesses = async () => {
      try {
        setThicknessError(null);
        const res = await fetch("/api/item/thicknesses");
        const data = await res.json();
        if (data.message) {
          setThicknessError(data.message);
        } else {
          setThickness(data);
        }
      } catch (err) {
        setThicknessError(err.message);
      }
    };
    fetchThicknesses();
  }, []); // Empty dependency array means this runs once on mount

  useEffect(() => {
    const fetchSides = async () => {
      try {
        setSideError(null);
        const res = await fetch("/api/item/sides");
        const data = await res.json();
        if (data.message) {
          setSideError(data.message);
        } else {
          setSide(data);
        }
      } catch (err) {
        setSideError(err.message);
      }
    };
    fetchSides();
  }, []); // Empty dependency array means this runs once on mount

  useEffect(() => {
    const fetchSizes = async () => {
      try {
        setSizeError(null);
        const res = await fetch("/api/item/sizes");
        const data = await res.json();
        if (data.message) {
          setSizeError(data.message);
        } else {
          setSize(data);
        }
      } catch (err) {
        setSizeError(err.message);
      }
    };
    fetchSizes();
  }, []); // Empty dependency array means this runs once on mount

  // This effect fetches items when the search query (URL) changes
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");
    const categoryFromUrl = urlParams.get("category");
    const laminationFromUrl = urlParams.get("lamination");
    const thicknessFromUrl = urlParams.get("thickness");
    const sideFromUrl = urlParams.get("side");
    const sizeFromUrl = urlParams.get("size");

    if (
      searchTermFromUrl ||
      sortFromUrl ||
      orderFromUrl ||
      categoryFromUrl ||
      laminationFromUrl ||
      thicknessFromUrl ||
      sideFromUrl ||
      sizeFromUrl
    ) {
      setSidebarData({
        searchTerm: searchTermFromUrl || "",
        sort: sortFromUrl || "createdAt",
        order: orderFromUrl || "desc",
        category: categoryFromUrl || "all",
        lamination: laminationFromUrl || "all",
        thickness: thicknessFromUrl || "all",
        side: sideFromUrl || "all",
        size: sizeFromUrl || "all",
      });
    }

    const fetchItems = async () => {
      setLoading(true);
      setError(null);
      const searchQuery = urlParams.toString();
      try {
        const res = await fetch(`/api/item/get?${searchQuery}`);
        const data = await res.json();
        if (data.message) {
          setError(data.message);
          setItems([]);
        } else {
          setItems(data);
        }
      } catch (err) {
        setError(err.message);
        setItems([]);
      }
      setLoading(false);
    };

    fetchItems();
  }, [location.search]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setSidebarData({ ...sidebarData, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sidebarData.searchTerm);
    urlParams.set("sort", sidebarData.sort);
    urlParams.set("order", sidebarData.order);
    urlParams.set("category", sidebarData.category);
    urlParams.set("lamination", sidebarData.lamination);
    urlParams.set("thickness", sidebarData.thickness);
    urlParams.set("side", sidebarData.side);
    urlParams.set("size", sidebarData.size);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  return (
    <div className="flex flex-col md:flex-row mb-10">
      <div className="w-full md:w-80 p-6 bg-slate-50 md:min-h-screen border-b-2 md:border-r-2  mb-10">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="searchTerm" className="font-semibold text-gray-700">
              Search Term:
            </label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Search..."
              className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-red-400 transition-all duration-300"
              value={sidebarData.searchTerm}
              onChange={handleChange}
            />
          </div>

          {/* --- 3. MODIFY THE CATEGORY SELECT --- */}
          <div className="flex flex-col gap-2">
            <label htmlFor="category" className="font-semibold text-gray-700">
              Category:
            </label>
            <select
              id="category"
              className="border rounded-lg p-3 w-full bg-white focus:outline-none focus:ring-2 focus:ring-red-400 transition-all duration-300"
              onChange={handleChange}
              value={sidebarData.category}
              disabled={categories.length === 0 && !categoryError} // Disable while loading
            >
              <option value="all">All</option>
              {categoryError ? (
                <option value="all" disabled>
                  Could not load categories
                </option>
              ) : (
                categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))
              )}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="lamination" className="font-semibold text-gray-700">
              Lamination:
            </label>
            <select
              id="lamination"
              className="border rounded-lg p-3 w-full bg-white focus:outline-none focus:ring-2 focus:ring-red-400 transition-all duration-300"
              onChange={handleChange}
              value={sidebarData.lamination}
              disabled={lamination.length === 0 && !laminationError} // Disable while loading
            >
              <option value="all">All</option>
              {laminationError ? (
                <option value="all" disabled>
                  Could not load laminations
                </option>
              ) : (
                lamination.map((lamination) => (
                  <option key={lamination} value={lamination}>
                    {lamination}
                  </option>
                ))
              )}
            </select>
          </div>

          <div>
            <label htmlFor="thickness" className="font-semibold text-gray-700">
              Thickness:
            </label>
            <select
              id="thickness"
              className="border rounded-lg p-3 w-full bg-white focus:outline-none focus:ring-2 focus:ring-red-400 transition-all duration-300"
              onChange={handleChange}
              value={sidebarData.thickness}
              disabled={thickness.length === 0 && !thicknessError} // Disable while loading
            >
              <option value="all">All</option>
              {thicknessError ? (
                <option value="all" disabled>
                  Could not load thicknesses
                </option>
              ) : (
                thickness.map((thickness) => (
                  <option key={thickness} value={thickness}>
                    {thickness}
                  </option>
                ))
              )}
            </select>
          </div>

          <div>
            <label htmlFor="side" className="font-semibold text-gray-700">
              Side:
            </label>
            <select
              id="side"
              className="border rounded-lg p-3 w-full bg-white focus:outline-none focus:ring-2 focus:ring-red-400 transition-all duration-300"
              onChange={handleChange}
              value={sidebarData.side}
              disabled={side.length === 0 && !sideError} // Disable while loading
            >
              <option value="all">All</option>
              {sideError ? (
                <option value="all" disabled>
                  Could not load sides
                </option>
              ) : (
                side.map((side) => (
                  <option key={side} value={side}>
                    {side}
                  </option>
                ))
              )}
            </select>
          </div>

          <div>
            <label htmlFor="size" className="font-semibold text-gray-700">
              Size:
            </label>
            <select
              id="size"
              className="border rounded-lg p-3 w-full bg-white focus:outline-none focus:ring-2 focus:ring-red-400 transition-all duration-300"
              onChange={handleChange}
              value={sidebarData.size}
              disabled={size.length === 0 && !sizeError} // Disable while loading
            >
              <option value="all">All</option>
              {sizeError ? (
                <option value="all" disabled>
                  Could not load sizes
                </option>
              ) : (
                size.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))
              )}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            {/* ... (Sort dropdowns - no changes) ... */}
            <label className="font-semibold text-gray-700">Sort:</label>
            <div className="flex gap-2">
              <select
                id="sort"
                className="border rounded-lg p-3 w-full bg-white focus:outline-none focus:ring-2 focus:ring-red-400 transition-all duration-300"
                onChange={handleChange}
                value={sidebarData.sort}
              >
                <option value="createdAt">Newest</option>
                <option value="name">Name (A-Z)</option>
              </select>
              <select
                id="order"
                className="border rounded-lg p-3 w-full bg-white focus:outline-none focus:ring-2 focus:ring-red-400 transition-all duration-300"
                onChange={handleChange}
                value={sidebarData.order}
              >
                <option value="desc">Descending</option>
                <option value="asc">Ascending</option>
              </select>
            </div>
          </div>

          <button
            disabled={loading}
            className="bg-red-600 text-white p-3 rounded-lg uppercase font-semibold hover:opacity-95 disabled:opacity-80 focus:outline-none focus:ring-2 focus:ring-red-400 transition-all duration-300"
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </form>
      </div>

      {/* --- RESULTS AREA (No changes) --- */}
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-semibold text-gray-700 mb-6">
          Product Results
        </h1>
        <div
          className={`transition-opacity duration-500 ease-in-out ${
            loading ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {!loading && items.length === 0 && !error && (
              <p className="text-xl text-slate-700 col-span-full text-center">
                No items found!
              </p>
            )}

            {loading && (
              <p className="text-xl text-slate-700 col-span-full text-center">
                Loading...
              </p>
            )}

            {error && (
              <p className="text-xl text-red-700 col-span-full text-center">
                {error}
              </p>
            )}

            {!loading &&
              items.length > 0 &&
              items.map((item) => <ItemCard key={item._id} item={item} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
