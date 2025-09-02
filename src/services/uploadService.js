import api from "./api";

export async function uploadPhoto(file) {
  const fd = new FormData();
  fd.append("photo", file);
  const res = await api.post("/api/uploads", fd, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  if (res.status !== 201 || res.data?.status !== "success") {
    throw new Error(res.data?.message || "Upload failed");
  }
  return res.data.data.url; // URL file
}
