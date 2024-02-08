import { createSignal, onMount } from "solid-js";
import { supabase } from "./supabaseClient";

function ProductForm() {
  const [name, setName] = createSignal("");
  const [price, setPrice] = createSignal("");
  const [imageUrl, setImageUrl] = createSignal("");
  const [products, setProducts] = createSignal([]);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase.from("products").select("*");
      if (error) {
        throw error;
      }
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error.message);
    }
  };

  onMount(fetchProducts);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase
        .from("products")
        .insert([{ name: name(), price: price(), image_url: imageUrl() }]);
      if (error) {
        throw error;
      }
      console.log("Product added successfully:", data);
      setName("");
      setPrice("");
      setImageUrl("");
      fetchProducts();
    } catch (error) {
      console.error("Error adding product:", error.message);
    }
  };

  return (
    // <div class="phone">
    //   <form onSubmit={handleSubmit}>
    //     <label>Name: </label>
    //     <input
    //       type="text"
    //       value={name()}
    //       onInput={(e) => setName(e.target.value)}
    //     />
    //     <label>Price: </label>
    //     <input
    //       type="number"
    //       value={price()}
    //       onInput={(e) => setPrice(parseFloat(e.target.value))}
    //     />
    //     <label>Image URL: </label>
    //     <input
    //       type="text"
    //       value={imageUrl()}
    //       onInput={(e) => setImageUrl(e.target.value)}
    //     />
    //     <button type="submit">Add Product</button>
    //   </form>
    //   <h2>Products:</h2>
    //   <ul>
    //     {products().map((product) => (
    //       <li key={product.id}>
    //         <strong>{product.name}</strong> - ${product.price}
    //         <br />
    //         {product.image_url && (
    //           <img
    //             src={product.image_url}
    //             alt={product.name}
    //             style={{ maxWidth: "50px", maxHeight: "50px" }}
    //           />
    //         )}
    //       </li>
    //     ))}
    //   </ul>
    // </div>
    <div class="phone">
      <form class="product-form" onSubmit={handleSubmit}>
        <label for="name">Name: </label>
        <input
          type="text"
          id="name"
          class="input-field"
          value={name()}
          onInput={(e) => setName(e.target.value)}
        />
        <label for="price">Price: </label>
        <input
          type="number"
          id="price"
          class="input-field"
          value={price()}
          onInput={(e) => setPrice(parseFloat(e.target.value))}
        />
        <label for="imageUrl">Image URL: </label>
        <input
          type="text"
          id="imageUrl"
          class="input-field"
          value={imageUrl()}
          onInput={(e) => setImageUrl(e.target.value)}
        />
        <button type="submit" class="submit-button">
          Add Product
        </button>
      </form>
      <h2>Products:</h2>
      <ul class="product-list">
        {products().map((product) => (
          <li key={product.id} class="product-item">
            <strong>{product.name}</strong> - ${product.price}
            <br />
            {product.image_url && (
              <img
                src={product.image_url}
                alt={product.name}
                class="product-image"
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductForm;
