"use server";

import { BASE_URL } from "../api/base-url";
import { getTokenClient } from "../core/getTokenClient";
import { getAuthHeaders } from "../server/auth-headers";

function normalizeUser(user) {
  return {
    ...user,
    banned: Boolean(user.banned || user.isBlocked),
  };
}

export async function getAllUsers({ searchValue = "", role = "all" } = {}) {
  const response = await fetch(`${BASE_URL}/admin/users`, {
    headers: await getAuthHeaders(),
    cache: "no-store",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch users");
  }

  let users = Array.isArray(data) ? data.map(normalizeUser) : [];

  if (role && role !== "all") {
    users = users.filter((user) => user.role === role);
  }

  const term = String(searchValue || "").trim().toLowerCase();

  if (term) {
    users = users.filter(
      (user) =>
        String(user.name || "").toLowerCase().includes(term) ||
        String(user.email || "").toLowerCase().includes(term),
    );
  }

  return { users };
}

// Block User
export async function blockUser(userId) {
  const response = await fetch(`${BASE_URL}/admin/users/${userId}/block`, {
    method: "PATCH",
    headers: await getAuthHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to block user");
  }

  return data;
}

// Unblock User
export async function unblockUser(userId) {
  const response = await fetch(`${BASE_URL}/admin/users/${userId}/unblock`, {
    method: "PATCH",
    headers: await getAuthHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to unblock user");
  }

  return data;
}
