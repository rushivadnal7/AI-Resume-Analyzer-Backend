import fs from "fs";
import pdf from "pdf-parse-fixed";

export async function extractTextFromPDF(filePath) {
  const buffer = fs.readFileSync(filePath);
  const data = await pdf(buffer);
  return data.text;
}
