import client from "@/lib/contentfulManagement";

async function createToolEntry() {
  const space = await client.getSpace(process.env.CONTENTFUL_SPACE_ID || "");
  const environment = await space.getEnvironment("master");

  try {
    const entry = await environment.createEntry("tool", {
      fields: {
        name: {
          "en-US": "React",
        },
        url: {
          "en-US": "https://reactjs.org/",
        },
      },
    });
    await entry.publish();

    console.log("Tool entry created and published successfully!");
  } catch (error) {
    console.error("Error creating Tool entry:", error);
  }
}

export { createToolEntry };
