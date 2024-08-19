import app from "./src/app";
import dotenv from 'dotenv';

// For env File 
dotenv.config();

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});