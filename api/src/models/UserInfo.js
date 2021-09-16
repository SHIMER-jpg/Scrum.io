const mongoose = require("mongoose");
const { Schema } = mongoose;

const userInfoSchema = new mongoose.Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  role: { type: String },
  languageOne: { type: String },
  languageTwo: { type: String },
  languageThree: { type: String },
  description: { type: String },
  softSkills: [{ type: String }],
  location: { type: String },
  //como hacemos el localtime?
  localTime: { type: String }, //deberia ser algo como gtm-3 y de ahi parsear en el front
  quote: { type: String },
  rating: { type: Number, Min: 0 },
  projectsWorked: { type: Number, Min: 0 },
  background: { type: String }, //por ahora
  socials: [{ name: String, url: String }],
});

/*
const demo = UserInfo.model.create({
  userId: mongoose.Types.ObjectId("613272203412af28ea6a5ecb"),
  role: "Front end developer",
  languageOne: "JavaScript",
  languageTwo: "CSS",
  languageThree: "HTML",
  description:
    "Lorem ipsum etc etcetc etcetc etcetc etcetc etcetc etcetc etcetc etcetc etc",
  softSkills: ["Leadership", "Team Work", "Design"],
  location: "Buenos Aires, Argentina",
  quote: "Si tuviera mas tiempo...",
  rating: 10,
  projectsWorked: 10,
  background:
    "<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 800 800'><rect fill='#000000' width='800' height='800'/><g fill-opacity='1'><circle fill='#000000'  cx='400' cy='400' r='600'/><circle fill='#230046'  cx='400' cy='400' r='500'/><circle fill='#2f0052'  cx='400' cy='400' r='400'/><circle fill='#3b075e'  cx='400' cy='400' r='300'/><circle fill='#48156a'  cx='400' cy='400' r='200'/><circle fill='#552277'  cx='400' cy='400' r='100'/></g></svg>",
  socials: [
    { name: "Linked In", url: "https://www.linkedin.com/in/lucero-amaolo/" },
    { name: "GitHub", url: "https://github.com/lamaolo" },
  ],
});
 */

module.exports = {
  schema: userInfoSchema,
  model: new mongoose.model("UserInfo", userInfoSchema),
};
