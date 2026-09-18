const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const API_ORIGIN = API_URL.replace(/\/api\/?$/, "");

export function assetUrl(url) {
  if (!url || /^(https?:)?\/\//.test(url) || url.startsWith("/assets/")) return url;
  return `${API_ORIGIN}${url.startsWith("/") ? url : `/${url}`}`;
}

function authHeader() {
  const token = localStorage.getItem("cms_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function login(username, password) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message || "Login failed");
  }
  return res.json();
}

export async function getHomepage() {
  const res = await fetch(`${API_URL}/homepage`);
  if (!res.ok) throw new Error("Failed to load homepage content");
  return res.json();
}

export async function saveHomepage(payload) {
  const res = await fetch(`${API_URL}/homepage`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message || "Save failed");
  }
  return res.json();
}

export async function getDepartment(slug) {
  const res = await fetch(`${API_URL}/departments/${slug}`);
  if (!res.ok) throw new Error("Failed to load department content");
  return res.json();
}

export async function getDepartments() {
  const res = await fetch(`${API_URL}/departments`);
  if (!res.ok) throw new Error("Failed to load departments");
  return res.json();
}

export async function getReports(slug) {
  const res = await fetch(`${API_URL}/departments/${slug}/reports`);
  if (!res.ok) throw new Error("Failed to load reports");
  return res.json();
}

export async function getReport(slug, reportId) {
  const res = await fetch(`${API_URL}/departments/${encodeURIComponent(slug)}/reports/${encodeURIComponent(reportId)}`);
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message || "Failed to load report");
  }
  return res.json();
}

export async function saveDepartment(slug, payload) {
  const res = await fetch(`${API_URL}/departments/${slug}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message || "Save failed");
  }
  return res.json();
}

export async function uploadDepartmentFiles(slug, files, kind) {
  const form = new FormData();
  Array.from(files).forEach((file) => form.append(kind, file));
  const res = await fetch(`${API_URL}/departments/${slug}/uploads`, {
    method: "POST",
    headers: authHeader(),
    body: form,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message || "Upload failed");
  }
  return res.json();
}
