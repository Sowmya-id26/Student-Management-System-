import express from "express";
import fs from "fs";

const server = express();
const PORT = 3000;

server.use(express.json());

const DATABASE_FILE = "db.json";


function loadStudents() {
  const fileContent = fs.readFileSync(DATABASE_FILE, "utf-8");
  return JSON.parse(fileContent);
}

// Save students to file
function saveStudents(studentList) {
  fs.writeFileSync(DATABASE_FILE, JSON.stringify(studentList, null, 2));
}


server.get("/students", (req, res) => {

  const studentData = loadStudents();

  res.status(200).json(studentData);

});


server.post("/students", (req, res) => {

  const studentList = loadStudents();
  const studentInfo = req.body;

  if (
    !studentInfo.id ||
    !studentInfo.name ||
    !studentInfo.course ||
    !studentInfo.year
  ) {
    return res.status(400).json({
      error: "Student details are incomplete"
    });
  }

  studentList.push(studentInfo);

  saveStudents(studentList);

  res.status(201).json({
    success: "Student record created",
    data: studentInfo
  });

});


server.put("/students/:id", (req, res) => {

  const studentList = loadStudents();
  const studentId = Number(req.params.id);

  let found = false;

  const updatedList = studentList.map(student => {

    if (student.id === studentId) {
      found = true;
      return { ...student, ...req.body };
    }

    return student;
  });

  if (!found) {
    return res.status(404).json({
      error: "Student ID does not exist"
    });
  }

  saveStudents(updatedList);

  res.json({
    success: "Student details updated"
  });

});



server.delete("/students/:id", (req, res) => {

  const studentList = loadStudents();
  const studentId = Number(req.params.id);

  const remainingStudents = studentList.filter(
    student => student.id !== studentId
  );

  if (studentList.length === remainingStudents.length) {
    return res.status(404).json({
      error: "Student not found"
    });
  }

  saveStudents(remainingStudents);

  res.json({
    success: "Student record removed"
  });

});




server.listen(PORT, () => {
  console.log("Server started successfully on port", PORT);
});
