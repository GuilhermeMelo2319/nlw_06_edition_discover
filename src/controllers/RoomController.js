const Database = require("../db/config")

module.exports = {
    async create(req, res){
        const db = await Database()
        const pass = req.body.password
        let roomId = ''
        let isRoom = true

        while(isRoom){

            for(var i = 0; i<6; i++){
                roomId += Math.floor(Math.random() * 10).toString()
            }
            
            const roomsIds = await db.all(`SELECT id FROM rooms`)
            
            isRoom = roomsIds.some(roomsIds => roomsIds == roomId)
            
            if(!isRoom){
                await db.run(`
                INSERT INTO rooms (
                        id,
                        pass
                    ) VALUES (
                        ${parseInt(roomId)},
                        ${pass}
                    )
                `)
            }
        }
        await db.close()
        res.redirect(`/room/${roomId}`)
    },

    async open(req, res){
        const db = await Database()
        const roomId = req.params.room;
        const questions = await db.all(`SELECT * FROM questions WHERE room = ${roomId} AND read = 0`)
        const questionsRead = await db.all(`SELECT * FROM questions WHERE room = ${roomId} AND read = 1`)
        let noQuestion = false

        if((questions.length == 0) && (questionsRead.length == 0)){
            noQuestion = true
        }

        res.render("room", {roomId: roomId, questions: questions, questionsRead: questionsRead, noQuestion: noQuestion})
    },

    async enter(req, res){
        const roomId = req.body.roomId
        res.redirect(`/room/${roomId}`)
    }
}