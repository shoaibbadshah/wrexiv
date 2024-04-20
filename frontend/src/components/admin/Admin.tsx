"use server";

import { createToolEntry } from "@/contentful/management/tool";
import { revalidatePath } from "next/cache";

export async function createTestAction() {
  try {
    const entry = await createToolEntry();
    console.log("Created entry:", entry);
    revalidatePath("/admin");
    return entry;
  } catch (error) {
    console.error("Error creating entry:", error);
    throw error;
  }
}

async function Admin() {
  return (
    <div>
      <form action={createTestAction}>
        <button type="submit">Create Test</button>
      </form>
      {/* @ts-ignore */}
      {createTestAction.isLoading && <div>Creating...</div>}
      {/* @ts-ignore */}
      {createTestAction.data && (
        <div>
          <h2>Created Entry:</h2>
          {/* <p>ID: {createTestAction.data.sys.id}</p>
          <p>Name: {createTestAction.data.fields.name["en-US"]}</p>
          <p>URL: {createTestAction.data.fields.url["en-US"]}</p> */}
        </div>
      )}
    </div>
  );
}

export default Admin;
