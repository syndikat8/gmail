const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors")
const bodyParser = require("body-parser")

const app = express();

app.use(cors())

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

let smtp_login = process.env.SMTP_LOGIN || "----"
let smtp_password = process.env.SMTP_PASSWORD || "----"

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: smtp_login, // generated ethereal user
    pass: smtp_password, // generated ethereal password
  },
});


app.get('/', function (req, res) {
  res.send("Hello World!");
});

app.post("/sendMessage", async function (req, res) {

  let {name, contacts, title, messages} = req.body

  let info = await transporter.sendMail({
    from: "HR WANTS ME",
    to: "k.syndikat@gmail.com",
    subject: "HR WANTS ME ✔",
    html: `<b>Сообщение с Вашего Портфолио</b>
<div>
Заголовок: ${title}
</div>
<div>
Имя: ${name}
</div>
<div>
Контакты: ${contacts}
</div>
<div>
${messages}
</div>`, // html body
  });
  res.send("Сообщение отправлено");
});

let port = process.env.PORT || 3005

app.listen(port, function () {
  console.log("Example app listening on port 3000!");
});
