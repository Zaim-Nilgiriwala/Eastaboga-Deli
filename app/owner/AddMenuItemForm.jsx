"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddMenuItemForm() {
    
    // refreshes the OwnerPage so that new menu items appear immediately
    const router = useRouter();

    // form state
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [category, setCategory] = useState("");

    // UI state
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // form submission handler
    async function handleSubmit(e) {

        //prevents browser full page reload
        e.preventDefault();
        setError("");
        setSuccess("");

        // validation
        if (!name || !price || !category) {
            setError("Name, price, and category are required.")
            return ;
        }

        setIsSubmitting(true);

        try {
            //sends form data to API route
            const res = await fetch("/api/menu", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    price: Number(price), // ensure price is a number
                    image: image || null, // store null if no image provided
                    category,
                }),
            });

            // if backend returns an error
            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(errorText || "Failed to add menu item.");
            }

            //success path
            setSuccess("Menu item added successfully!");

            // reset form fields
            setName("");
            setPrice("");
            setImage("");
            setCategory("");

            // refresh the owner page to show the new item
            router.refresh();

        } catch (err) {
            // error path
            console.error(err);
            setError(err.message || "An unexpected error occurred.");
        } finally {
            setIsSubmitting(false); // turn off submitting state
        }
    }

    // render form
    return (
        <form
      onSubmit={handleSubmit}
      className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900/70 p-4 text-xs md:text-sm"
    >
      <h3 className="text-sm font-semibold text-slate-100">
        Add Menu Item
      </h3>
      
      {/* Error message */}
      {error && (
        <p className="text-xs text-red-400">
          {error}
        </p>
      )}

      {/* Success message */}
      {success && (
        <p className="text-xs text-emerald-400">
          {success}
        </p>
      )}

      {/* Name input */}
      <div className="space-y-1">
        <label className="block text-slate-300">Name</label>
        <input
          className="w-full rounded-md border border-slate-700 bg-slate-900 px-2 py-1 text-slate-100
                     focus:outline-none focus:ring focus:ring-emerald-500/50"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Pepperoni Pizza"
        />
      </div>

      {/* Price input */}
      <div className="space-y-1">
        <label className="block text-slate-300">Price</label>
        <input
          type="number"
          step="0.01"
          className="w-full rounded-md border border-slate-700 bg-slate-900 px-2 py-1 text-slate-100
                     focus:outline-none focus:ring focus:ring-emerald-500/50"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="12.99"
        />
      </div>

      {/* Category input */}
      <div className="space-y-1">
        <label className="block text-slate-300">Category</label>
        <input
          className="w-full rounded-md border border-slate-700 bg-slate-900 px-2 py-1 text-slate-100
                     focus:outline-none focus:ring focus:ring-emerald-500/50"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Pizza / Sides / Drinks"
        />
      </div>

      {/* Image URL input */}
      <div className="space-y-1">
        <label className="block text-slate-300">Image URL (optional)</label>
        <input
          className="w-full rounded-md border border-slate-700 bg-slate-900 px-2 py-1 text-slate-100
                     focus:outline-none focus:ring focus:ring-emerald-500/50"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="https://example.com/image.jpg"
        />
      </div>

      {/* Submit button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-md bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-emerald-950 
                   hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Adding..." : "Add Item"}
      </button>
    </form>
  );
}