import "dotenv/config";
import app from "./src/app.js";

const PORT = 3000;

app.listen(PORT, () => {
  console.log("Servidor escutando em http://localhost:3000");
});

//env file
//mongodb+srv://admin:<pwd>@cluster0.xkz6rva.mongodb.net/livraria?retryWrites=true&w=majority
