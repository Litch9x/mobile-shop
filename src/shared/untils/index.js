import { BASE_URL } from "../constant/App";
// Get Image Product
export const getImageProduct = (imageName) => {
  return `${BASE_URL}/uploads/products/${imageName}`;
};
//Get Image Slider
export const getImageSlider = (imageName) => {
  return `${BASE_URL}/uploads/sliders/${imageName}`;
};
//Get Image Sidebar
export const getImageSidebar = (imageName) => {
  return `${BASE_URL}/uploads/banners/${imageName}`;
};
//Format Style For Price
export const formatPrice = (price) => {
  return Number(price).toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
};
//Check Valid PhoneNumber
export const isValidVNPhoneNumber = (phoneNumber) => {
  const vietnamPhoneRegex =
    /^(?:\+84|0)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-5]|9[0-9])\d{7}$/;
  return vietnamPhoneRegex.test(phoneNumber);
};
//Check Valid Email
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
