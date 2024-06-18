import React, { useState } from "react";
import { Button, Input, Box } from "@mui/material";
import { GoogleGenerativeAI } from "@google/generative-ai";

const ComponenteIA = ({ prompt, onPeliculaObtenida }) => {
  const genAI = new GoogleGenerativeAI("AIzaSyDAbWk_WzOlLusrx01ZJ-vYVSfzuheOL_Q");

  const [loading, setLoading] = useState(false);

  async function fetchData() {
    setLoading(true);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const response = (await model.generateContent(prompt)).response;
      const text = response.text;
      setLoading(false);
      onPeliculaObtenida(text);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
      setLoading(false);
    }
  }

  const handleClick = () => {
    fetchData();
  };

};

export default ComponenteIA;
