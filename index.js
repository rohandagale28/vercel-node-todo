const dotenv = require('dotenv')
const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors({
    origin: "https://glittery-cucurucho-bd93f8.netlify.app",
    method: ["GET", "PUT", "DELETE", "POST"]
}))

dotenv.config({ path: './config.env' })  //dotenv
const PORT = process.env.PORT

require('./connection')  //mongoDB connetion
const User = require('./userSchema')  //mongoDB task schema
app.use(express.json())

app.post("/", async (req, res) => {
    try {
        const { check, task } = req.body
        if (!task) {
            return res.status(400).json({ message: "Invalid credentials" })
        } else {
            const user = new User({ check, task })
            await user.save()
            res.status(200).json({ user, message: "task added successfully" })
        }
    } catch (err) {
        console.log(err)
    }
})


app.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id
        const user = await User.deleteOne({ _id: id })
        res.send("Deleted")
    } catch (err) {
        console.log(err)
    }
})

app.delete("/", async (req, res) => {
    try {
        const user = await User.deleteMany({ check: true })
        res.send("All Deleted")
    } catch (err) {
        console.log(err)
    }
})

// app.put("/", async (req, res) => {
//     try {
//         const id = req.body.id
//         console.log(id)
//         if (!id) {
//             return res.status(400).json({ message: "Invalid credentials" })
//         } else  {
//             const user = await User.findOne({ _id: id })
//             await User.updateOne({
//                 _id: id
//             }, {
//                 $set: {
//                     check: true
//                 }
//             })
//             res.status(200).json({ user, message: "task added successfully" })
//             console.log(user)
//         }
//     } catch (err) {
//         console.log(err)
//     }
// })


app.put("/", async (req, res) => {
    try {
        const { id, check } = req.body
        console.log(id, check)
        if (!id || !check) {
            return res.status(400).json({ message: "Invalid credentials" })
        } else {
            if (check === true) {
                const user = await User.findOne({ _id: id })
                await User.updateOne({
                    _id: id
                }, {
                    $set: {
                        check: true
                    }
                })
                res.status(200).json({ user, message: "task added successfully" })
                console.log(user)
            } else {
                const user = await User.findOne({ _id: id })
                await User.updateOne({
                    _id: id
                }, {
                    $set: {
                        check: false
                    }
                })
                res.status(200).json({ user, message: "task added successfully" })
            }
        }
    } catch (err) {
        console.log(err)
    }
})

app.get("/vercel", async (req, res) => {
    res.send({ message: 'server running fineon vercel' })
})


app.get('/', async (req, res, next) => {
    try {
        const alluser = await User.find({})
        res.send({ status: 'ok', data: alluser.reverse() })
    } catch {
        res.status(404).send("data not found")
    }
})

//server listener
app.listen(PORT, (req, res) => {
    console.log(`server is running on port ${PORT}`)
})