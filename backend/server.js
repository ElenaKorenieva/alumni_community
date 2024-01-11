const mongoose = require("mongoose");
const app = require("./app");
const { PORT = 2000, DB_HOST } = process.env;
// console.log(process.env);

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful");
    // Socket.io logic
    //  io.on('connection', (socket) => {
    //   console.log('A user connected');

    //   socket.on('disconnect', () => {
    //     console.log('User disconnected');
    //   });

    //   socket.on('comment', (data) => {
    //     console.log('New comment:', data);
    //     io.emit('newComment', data);
    //   });
    // });
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
