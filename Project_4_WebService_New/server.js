const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

const videos = [
  {
    id: 1,
    title: "HTML Full Course",
    category: "Multimedia",
    description: "Learn HTML basics for multimedia websites.",
    level: "Beginner",
    duration: "2 Hours",
    instructor: "freeCodeCamp",
    embed: "https://www.youtube.com/embed/pQN-pnXPaVg"
  },
  {
    id: 2,
    title: "CSS Responsive Design",
    category: "Mobile",
    description: "Learn responsive design with CSS.",
    level: "Beginner",
    duration: "1 Hour",
    instructor: "Traversy Media",
    embed: "https://www.youtube.com/embed/yfoY53QXEnI"
  },
  {
    id: 3,
    title: "JavaScript Tutorial",
    category: "Multimedia",
    description: "Learn JavaScript for interactive websites.",
    level: "Beginner",
    duration: "1 Hour",
    instructor: "Programming with Mosh",
    embed: "https://www.youtube.com/embed/W6NZfCO5SIk"
  },
  {
    id: 4,
    title: "ASP.NET Web Forms Introduction",
    category: "Mobile",
    description: "Introduction to responsive web apps with ASP.NET.",
    level: "Intermediate",
    duration: "2 Hours",
    instructor: "Tutorial Source",
    embed: "https://www.youtube.com/embed/0cTblXvo8Pg"
  },
  {
    id: 5,
    title: "Selenium IDE Tutorial",
    category: "Testing",
    description: "Learn browser automation basics.",
    level: "Beginner",
    duration: "25 Minutes",
    instructor: "Coders Arcade",
    embed: "https://www.youtube.com/embed/khVvjhZISqQ"
  },
  {
    id: 6,
    title: "JMeter Tutorial",
    category: "Testing",
    description: "Learn performance testing basics.",
    level: "Intermediate",
    duration: "40 Minutes",
    instructor: "Automation Step by Step",
    embed: "https://www.youtube.com/embed/SoW2pBak1_Q"
  }
];

app.use(express.static(path.join(__dirname, "public")));

app.get("/api/videos", (req, res) => {
  res.json(videos);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});