import { Http } from "./Http";

// Get Products Search
export const getProductsSearch = (config) => Http.get("/Search", config);
//Get Categories
export const getCategories = (config) => Http.get("/categories", config);
// Get Category
export const getCategory = (id, config) =>
  Http.get(`/categories/${id}`, config);
// Get Products By Category ID
export const getProductsCategory = (id, config) =>
  Http.get(`/categories/${id}/products`, config);
//Get product detail
export const getProduct = (id, config) => Http.get(`/products/${id}`);
//Get comments product
export const getCommentsProduct = (id, config) =>
  Http.get(`/products/${id}/comments`, config);
//Post new comment product
export const createCommentProduct = (id, data) =>
  Http.post(`/products/${id}/comments`, data);
// Order products
export const order = (data, config) => Http.post(`/orders`, data, config);
//Get Images Slider
export const getSliders = (config) => Http.get("/sliders", config);
//Get Images Sidebar
export const getSidebar = (config) => Http.get("/banners", config);
//Register
export const register = (data) => Http.post("/customers/register", data);
//Login
export const login = (data) => Http.post("/customers/login", data);
//Update customer info
export const loginFacebook = () => Http.get("/auth/facebook");
//Update customer info
export const updateCustomerInfo = (customer_id, data) =>
  Http.post(`/customers/${customer_id}/update`, data);
// Order List
export const orderList = (customer_id, config) =>
  Http.get(`/customers/${customer_id}/orders`, config);
//Order Detail
export const orderDetail = (order_id) => Http.get(`/orders/${order_id}`);
//Cancel Order
export const orderCancel = (order_id) =>
  Http.get(`/orders/${order_id}/cancelled`);
//Log out
export const logoutCustomer = (id) => Http.post(`/customers/logout`,{id});
//Refresh token
export const refreshToken = () => Http.get("/auth/refreshtoken");

// ADMIN
// Login Admin
export const loginAdmin = (data) => Http.post("/admin/login", data);
//Update customer info
export const dashboard = () => Http.get("/admin/dashboard");

// PRODUCT
// Delete Product
export const deleteProduct = (id, config) =>
  Http.get(`admin/products/${id}/delete`);
// Create Product
export const createProduct = (formData) =>
  Http.post("/admin/products/create", formData, {
    headers: {
      "Content-Type": "multipart/form-data", // Dùng multipart/form-data để gửi file
    },
  });
// Update Product
export const updateProduct = (id, formData) =>
  Http.post(`/admin/products/${id}/update`, formData, {
    headers: {
      "Content-Type": "multipart/form-data", // Dùng multipart/form-data để gửi file
    },
  });
//Product Detail
export const productDetail = (id, config) => Http.get(`/admin/products/${id}`);
// Get Products
export const getProducts = (config) => Http.get("/products", config);

// USER
// user list
export const usersList = (config) => Http.get("/admin/users", config);
//user update
export const updateUser = (id, data) =>
  Http.post(`/admin/users/${id}/update`, data);
//user detail
export const userDetail = (id) => Http.get(`/admin/users/${id}`);
//users create
export const createUser = (data) => Http.post(`/admin/users/create`, data);
//user delete
export const deleteUser = (id) => Http.post(`/admin/users/${id}/delete`);

// CATEGORY
// user list
export const categoriesList = (config) => Http.get("/admin/categories", config);
//user update
export const updateCategory = (id, data) =>
  Http.post(`/admin/categories/${id}/update`, data);
//user detail
export const categoryDetail = (id) => Http.get(`/admin/categories/${id}`);
//users create
export const createCategory = (data) =>
  Http.post(`/admin/categories/create`, data);
//user delete
export const deleteCategory = (id) =>
  Http.post(`/admin/categories/${id}/delete`);
