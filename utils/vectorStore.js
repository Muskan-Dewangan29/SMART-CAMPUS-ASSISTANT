import { ChromaClient } from "chromadb";
import fs from "fs";
import ollama from "ollama";

const client = new ChromaClient();
const collectionName = "college-data";

export async function initVectorDB() {
  const collection = await client.getOrCreateCollection({
    name: collectionName,
  });

  const data = fs.readFileSync("./data/college-info.md", "utf8");

  const chunks = data
    .split("\n")
    .map(l => l.trim())
    .filter(l => l.length > 0);

  for (let i = 0; i < chunks.length; i++) {
    const embedding = await ollama.embeddings({
      model: "nomic-embed-text",
      prompt: chunks[i],
    });

    await collection.add({
      ids: [`chunk-${i}`],
      embeddings: [embedding.embedding],
      documents: [chunks[i]],
    });
  }

  console.log("✅ Vector DB initialized");
}

export async function searchVectorDB(query) {
  const collection = await client.getOrCreateCollection({
  name: collectionName,
  embeddingFunction: null,
});


  const embedding = await ollama.embeddings({
    model: "nomic-embed-text",
    prompt: query,
  });

  const results = await collection.query({
    queryEmbeddings: [embedding.embedding],
    nResults: 5,
  });

  return results.documents.flat().join("\n");
}
