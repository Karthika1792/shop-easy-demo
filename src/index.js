export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // API: Get all products
    if (url.pathname === "/api/products" && request.method === "GET") {
      const products = [
        {
          id: 1,
          name: "Smartphone Pro",
          price: 49999,
          category: "Electronics",
          rating: 4.8
        },
        {
          id: 2,
          name: "Laptop Air",
          price: 74999,
          category: "Electronics",
          rating: 4.7
        },
        {
          id: 3,
          name: "Running Shoes",
          price: 3499,
          category: "Fashion",
          rating: 4.5
        },
        {
          id: 4,
          name: "Classic Handbag",
          price: 2999,
          category: "Fashion",
          rating: 4.6
        },
        {
          id: 5,
          name: "Coffee Maker",
          price: 4999,
          category: "Home & Living",
          rating: 4.4
        },
        {
          id: 6,
          name: "Modern Sofa",
          price: 29999,
          category: "Home & Living",
          rating: 4.6
        },
        {
          id: 7,
          name: "Wireless Headphones",
          price: 5999,
          category: "Electronics",
          rating: 4.7
        },
        {
          id: 8,
          name: "Smart Watch",
          price: 7999,
          category: "Electronics",
          rating: 4.5
        }
      ];

      return Response.json({
        success: true,
        count: products.length,
        products
      });
    }

    // API: Get a product by ID
    if (url.pathname.startsWith("/api/products/") && request.method === "GET") {
      const id = Number(url.pathname.split("/").pop());

      const products = [
        { id: 1, name: "Smartphone Pro", price: 49999, category: "Electronics", rating: 4.8 },
        { id: 2, name: "Laptop Air", price: 74999, category: "Electronics", rating: 4.7 },
        { id: 3, name: "Running Shoes", price: 3499, category: "Fashion", rating: 4.5 },
        { id: 4, name: "Classic Handbag", price: 2999, category: "Fashion", rating: 4.6 },
        { id: 5, name: "Coffee Maker", price: 4999, category: "Home & Living", rating: 4.4 },
        { id: 6, name: "Modern Sofa", price: 29999, category: "Home & Living", rating: 4.6 },
        { id: 7, name: "Wireless Headphones", price: 5999, category: "Electronics", rating: 4.7 },
        { id: 8, name: "Smart Watch", price: 7999, category: "Electronics", rating: 4.5 }
      ];

      const product = products.find(item => item.id === id);

      if (!product) {
        return Response.json(
          {
            success: false,
            message: "Product not found"
          },
          { status: 404 }
        );
      }

      return Response.json({
        success: true,
        product
      });
    }

    // All other requests are served from the public folder
    return env.ASSETS.fetch(request);
  }
};
