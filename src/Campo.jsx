import { Button, Input, Select, MenuItem } from "@mui/material";
import { useState, forwardRef, useImperativeHandle } from "react";

const Campo = forwardRef(({ id, onRemove }, ref) => {
  const [state, setState] = useState({
    ingrediente: '',
    cantidad: '',
    unidad: 'Unidades'
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const newState = { ...state, [name]: value };
    setState(newState);
  };

  useImperativeHandle(ref, () => ({
    getValues: () => state
  }));

  return (
    <div>
      <Input
        name="ingrediente"
        sx={{
          height: "2rem",
          width: "10rem",
          marginBottom: "1rem",
          border: 2,
          marginInline: "0.2rem",
          borderColor: "black"
        }}
        placeholder="Agrega un Ingrediente"
        value={state.ingrediente}
        onChange={handleInputChange}
      />
      <Input
        name="cantidad"
        type="number"
        sx={{
          height: "2rem",
          width: "60px",
          marginBottom: "1rem",
          border: 2,
          marginInline: "0.2rem",
          borderColor: "black"
        }}
        placeholder="Cant"
        value={state.cantidad}
        onChange={handleInputChange}
      />
      <Select
        name="unidad"
        sx={{
          height: "2rem",
          width: "5rem",
          marginBottom: "1rem",
          border: 1,
          marginInline: "1rem",
          borderRadius: "25px",
          borderColor: "black"
        }}
        value={state.unidad}
        onChange={handleInputChange}
      >
        <MenuItem value={"Unidades"}>Un</MenuItem>
        <MenuItem value={"Gramos"}>Gr</MenuItem>
        <MenuItem value={"Kilogramos"}>Kg</MenuItem>
      </Select>
      <Button
              sx={{
                borderRadius: "10px",
                margin: "0.5rem",
                backgroundColor: "black",
                color: "white",
                ":hover": { opacity: "0.8" , color: "black", borderColor: "black"},
              }}
        size="small"
        variant="outlined"
        onClick={() => onRemove(id)}
      >
        Quitar
      </Button>
    </div>
  );
});

export default Campo;
