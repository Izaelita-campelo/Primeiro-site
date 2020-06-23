const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const videos = require("./data")

server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true
    
})


server.get("/", function(req, res){
    const about= {
        avatar_url:"https://instagram.ffor1-2.fna.fbcdn.net/v/t51.2885-19/s150x150/103367696_1228104791135342_2854209682364567012_n.jpg?_nc_ht=instagram.ffor1-2.fna.fbcdn.net&_nc_ohc=tkIFJVCgIs8AX9l8cxy&oh=de487858fed73d45b41fea394dd8a590&oe=5F0C7EA7",
        name:"Izaélita Campelo",
        role:'Estudante - <a href="https://rocketseat.com.br" target="_blank">Rocketseat</a>',
        description: "Aprendendo a programar com muito esforço para maiores consquistas!",
         
        links: [
            { name:"Instagram", url:"https://www.instagram.com/izaelitacampelo/"},
            { name:"Facebook", url:"https://www.facebook.com/izaelitasilva.gomes/"}
        ]
    }
    return res.render("about",{about})
})

server.get("/portfolio", function(req, res){

    return res.render("portfolio", {items: videos})
})

server.get("/video", function( req, res){
   const id = req.query.id;

   const video = videos.find(function(video){
        return video.id == id
    })

        if (!video){
        return res.send(" video not found!")
        }

        return res.render("video", {item: video})
})


server.listen (4000, function(){
    console.log('server is running')
})