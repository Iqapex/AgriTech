const io = require('socket.io')(8900, {
    cors: {
        origin: "http://localhost:5000",
    },
});

let users = [];

const addUser = (userId, socketId) => {
    !users.some(user => user.userId === userId) && users.push({ userId, socketId });
}

const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId);
}

const getUser = (userId) => {
    return users.find(user => user.userId === userId);
}
io.on("connection", (socket) => {
    // connect a user
    console.log("A user connected");
    socket.on("addUser", userId => {
        addUser(userId, socket.id);
        io.emit("getUsers", users);
    })

    //sent or recieve a message
    socket.on("sendMessage", ({ senderId, recieverIds, text, conversationId }) => {
        recieverIds.map((recieverId) => {
            const user = getUser(recieverId);
            if (user) {
                io.to(user.socketId).emit("getMessage", {
                    senderId,
                    text,
                    conversationId,
                })
            }
        })
    })

    //disconnect a user
    socket.on("disconnect", () => {
        console.log("a user disconnected.");
        removeUser(socket.id);
        io.emit("getUsers", users);
    })
})