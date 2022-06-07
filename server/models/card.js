const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  // name — имя карточки, строка от 2 до 30 символов, обязательное поле;
  // link — ссылка на картинку, строка, обязательно поле.
  // owner — ссылка на модель автора карточки, тип ObjectId, обязательное поле;
  // likes — список лайкнувших пост пользователей, массив ObjectId, по умолчанию — пустой массив (поле default);
  // createdAt — дата создания, тип Date, значение по умолчанию Date.now.
  name: {
    type: String, // имя — это строка
    required: true, // оно должно быть у каждого пользователя, так что имя — обязательное поле
    minlength: 2, // минимальная длина имени — 2 символа
    maxlength: 30, // а максимальная — 30 символов
  },
  link: {
    type: String,
    required: true,
  },
  owner: {
    type: ObjectId,
    required: true,
  },
  likes: [
    {
      type: ObjectId,
      required: true,
      default: [],
    },
  ],
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});
