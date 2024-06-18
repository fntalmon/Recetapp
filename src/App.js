import * as React from "react";
import {
  Button,
  Grid,
  Paper,
  Box,
  Typography,
  Container,
  CircularProgress,
} from "@mui/material";
import { fetchData } from "./Gemini";
import "./styles.css";
import { useState, useRef } from "react";
import Campo from "./Campo";
import ReactMarkdown from "react-markdown";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

export default function App() {
  const [inputs, setInputs] = useState([]);
  const [id, setId] = useState(1);
  const [showCard, setShowCard] = useState(false);
  const [aiResponse, setAiResponse] = useState("");
  const camposRefs = useRef([]);
  const [loading, setLoading] = useState(false);

  const handleAddInput = () => {
    setInputs([...inputs, { id }]);
    camposRefs.current.push(React.createRef());
    setId(id + 1);
  };

  const deleteAll = () => {
    setInputs([]);
    camposRefs.current = [];
    setId(1);
    setShowCard(false);
  };

  const handleRemoveCampo = (idToRemove) => {
    setInputs(
      inputs.filter((input, index) => {
        if (input.id !== idToRemove) return true;
        camposRefs.current.splice(index, 1);
        return false;
      })
    );
  };

  const handleBuscar = async () => {
    setShowCard(true);
    setLoading(true);
    const valores = camposRefs.current.map((ref) => ref.current.getValues());
    const filteredValores = JSON.stringify(
      valores.filter((valor) => valor.ingrediente && valor.cantidad)
    );
    const generatedPrompt = `Necesito que para esta lista ${filteredValores}, me digas alguna receta que pueda cocinar. No importa si es una respuesta larga, explayate lo que sea necesario, pero necesito que la respuesta sea solo el texto de la receta, ya que la voy a usar para mostrarla en mi pagina web. Intenta darle un formato a la respuesta, no agregues caracteres especiales porque no quedan bien formateados.
    Tampoco hace falta que uses todos los ingredientes, no mezcles cosas que no son necesarias solo por usar todos.`;
    try {
      const response = await fetchData({ prompt: generatedPrompt });
      setLoading(false);
      setAiResponse(response);
      setShowCard(true);
    } catch (error) {
      setLoading(false);
      console.error("Error al obtener los datos:", error);
      setAiResponse(
        "Lo siento, hubo un error al obtener la receta. Por favor, intenta nuevamente."
      );
      setShowCard(true);
    }
  };

  const style = {
    background: "linear-gradient(to right, #ff7e5f, #feb47b)",
    minHeight: "100vh",
    padding: 0,
    margin: 0,
  };

  return (
    <Box style={style}>
      <Container maxWidth="xl">
        <Box sx={{ textAlign: "center", marginBottom: "2rem" }}>
          <Typography variant="h2" sx={{ fontFamily: "Roboto, sans-serif" }}>
            RECETAPP
          </Typography>
          <Typography variant="h6" sx={{ fontFamily: "Roboto, sans-serif" }}>
            Usa esta app para buscar una receta que te permita cocinar con lo
            que tengas a mano en tu casa. Solamente tenes que agregar los
            ingredientes que quieras y usando Gemini, la IA de Google, obtendras
            una receta, asi de sencillo.
          </Typography>
        </Box>
        <Grid container >
          <Grid item xs={12} md={4}>
            <Box sx={{ marginBottom: "1rem" }}>
              <Button
                sx={{
                  borderRadius: "10px",
                  margin: "0.5rem",
                  backgroundColor: "black",
                  color: "white",
                  ":hover": {
                    opacity: "0.8",
                    color: "black",
                    borderColor: "black",
                  },
                }}
                size="small"
                variant="outlined"
                onClick={handleAddInput}
              >
                Nuevo Ingrediente
              </Button>
              <Button
                sx={{
                  borderRadius: "10px",
                  margin: "0.5rem",
                  backgroundColor: "black",
                  color: "white",
                  ":hover": {
                    opacity: "0.8",
                    color: "black",
                    borderColor: "black",
                  },
                }}
                size="small"
                variant="outlined"
                onClick={deleteAll}
              >
                Limpiar
              </Button>
            </Box>
            <div>
              {inputs.map((input, index) => (
                <Campo
                  key={input.id}
                  id={input.id}
                  ref={camposRefs.current[index]}
                  onRemove={handleRemoveCampo}
                />
              ))}
            </div>
            <Button
              sx={{
                borderRadius: "10px",
                margin: "0.5rem",
                backgroundColor: "black",
                color: "white",
                ":hover": {
                  opacity: "0.8",
                  color: "black",
                  borderColor: "black",
                },
              }}
              variant="outlined"
              onClick={handleBuscar}
            >
              Buscar
            </Button>
          </Grid>
          <Grid item xs={12} md={8}>
            <Box sx={{ padding: "20px" }}>
              {showCard && (
                <Paper
                  variant="outlined"
                  elevation={5}
                  sx={{
                    width: "100%",
                    backgroundColor: "transparent",
                    margin: "auto",
                    borderWidth: "2px",
                    borderColor: "black",
                    padding: "1rem",
                    borderRadius: "15px",
                  }}
                >
                  {loading ? (
                    <CircularProgress />
                  ) : (
                    <ReactMarkdown
                      components={{
                        p: ({ node, ...props }) => (
                          <Typography
                            variant="body1"
                            {...props}
                            sx={{ fontFamily: "Roboto, sans-serif" }}
                          />
                        ),
                        h1: ({ node, ...props }) => (
                          <Typography
                            variant="h4"
                            {...props}
                            sx={{ fontFamily: "Roboto, sans-serif" }}
                          />
                        ),
                        h2: ({ node, ...props }) => (
                          <Typography
                            variant="h5"
                            {...props}
                            sx={{ fontFamily: "Roboto, sans-serif" }}
                          />
                        ),
                        // Add more mappings as needed
                      }}
                    >
                      {aiResponse}
                    </ReactMarkdown>
                  )}
                </Paper>
              )}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
