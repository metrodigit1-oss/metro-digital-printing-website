import React from "react";

export default function CreateItem() {
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Create Item</h1>
      <form className="flex flex-col sm:flex-row">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Name"
            className="border p-3 rounded-lg"
            id="name"
            maxLength="64"
            required
          />
          <input
            type="text"
            placeholder="Category"
            className="border p-3 rounded-lg mt-4"
            id="category"
            maxLength="64"
            required
          />
          <input
            type="text"
            placeholder="Available Sizes"
            className="border p-3 rounded-lg mt-4"
            id="size"
            maxLength="64"
          />
          <input
            type="number"
            placeholder="Price for each size"
            className="border p-3 rounded-lg mt-4"
            id="price"
            step="0.01"
          />
          <input
            type="text"
            placeholder="Description"
            className="border p-3 rounded-lg mt-4"
            id="description"
          />
          <input
            type="text"
            placeholder="Image URL"
            className="border p-3 rounded-lg mt-4"
            id="imageUrl"
          />
        </div>
      </form>
    </main>
  );
}
