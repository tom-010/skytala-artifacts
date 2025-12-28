import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import { parse as parseToml } from "smol-toml";
import { marked } from "marked";
import type { Product } from "./types";

const PRODUCTS_DIR = join(process.cwd(), "products");

export async function loadProducts(): Promise<Product[]> {
  const files = await readdir(PRODUCTS_DIR);
  const mdFiles = files.filter((f) => f.endsWith(".md"));

  const products: Product[] = [];

  for (const filename of mdFiles) {
    const filePath = join(PRODUCTS_DIR, filename);
    const content = await readFile(filePath, "utf-8");

    const match = content.match(/^\+\+\+\r?\n([\s\S]+?)\r?\n\+\+\+\r?\n([\s\S]*)$/);

    if (match) {
      const frontMatterRaw = match[1];
      const markdownRaw = match[2];

      try {
        const data = parseToml(frontMatterRaw) as Record<string, unknown>;
        const htmlDescription = await marked(markdownRaw);

        products.push({
          ...data,
          description: htmlDescription,
        } as Product);
      } catch (e) {
        console.error(`Error parsing file ${filename}:`, e);
      }
    }
  }

  products.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return products;
}

export async function loadProduct(id: string): Promise<Product | null> {
  const products = await loadProducts();
  return products.find((p) => p.id === id) ?? null;
}
