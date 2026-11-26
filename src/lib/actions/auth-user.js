"use server";

import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";

export async function getAllUsers({
  searchValue = "",
  searchField = "name",
  role = "all",
  limit = 20,
  offset = 0,
}) {
  const query = {
    limit,
    offset,

    sortBy: "createdAt",
    sortDirection: "desc",

    ...(searchValue && {
      searchValue,
      searchField,
      searchOperator: "contains",
    }),

    ...(role !== "all" && {
      filterField: "role",
      filterValue: role,
      filterOperator: "eq",
    }),
  };

  const result = await auth.api.listUsers({
    query,

    headers: await headers(),
  });

  return result;
}

// Block User
export async function blockUser(userId) {
  try {
    const result = await auth.api.banUser({
      body: {
        userId,
      },

      headers: await headers(),
    });

    return result;
  } catch (error) {
    console.log("Block user error:", error);

    throw new Error(error.message || "Failed to block user");
  }
}

// Unblock User
export async function unblockUser(userId) {
  try {
    const result = await auth.api.unbanUser({
      body: {
        userId,
      },

      headers: await headers(),
    });

    return result;
  } catch (error) {
    console.log("Unblock user error:", error);

    throw new Error(error.message || "Failed to unblock user");
  }
}
