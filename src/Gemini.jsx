import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI("AIzaSyDAbWk_WzOlLusrx01ZJ-vYVSfzuheOL_Q");

async function fetchData({prompt}) {
try {
const model = genAI.getGenerativeModel({ model: "gemini-pro" });
const response = (await model.generateContent(prompt)).response;
const text = response.text;
console.log(text);
return text;
} catch (error) {
console.error("Error al obtener los datos:", error);
}
}

export {fetchData};