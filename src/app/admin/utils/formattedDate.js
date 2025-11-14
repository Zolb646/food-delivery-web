export const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-CA").replace(/-/g, "/");
};
