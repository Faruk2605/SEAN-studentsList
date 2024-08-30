const express = require("express");
const supabase = require("@supabase/supabase-js");
require("dotenv").config();

const PORT = 3221 || process.env.PORT;

const app = express();
app.use(express.json());

const supabaseUrl = "https://faeeltlmgcakmjpchnmz.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY;

const db = supabase.createClient(supabaseUrl, supabaseKey);

app.get("/", async (request, response) => {
  const getStudentList = await db.from("students_list").select();
  response.send({ getStudentList });
});

app.post("/", async (request, response) => {
  const { nama, umur, alamat, kelas } = request.body;
  const createPost = await db
    .from("students_list")
    .insert({ nama, umur, alamat, kelas });
  console.log(`~🚀 app.post created: ${createPost}`);
  response.send({ createPost });
});

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
