const path = require("path")
const express = require("express")
const hbs = require("hbs")
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

const app = express()
const port = process.env.PORT || 3000

// console.log(__dirname)
// console.log(__filename)
console.log(path.join(__dirname, "../public"))

//define paths for express config
const viewsPath = path.join(__dirname, "../templates/views")
const publicDirectoryPath = path.join(__dirname, "../public")
const partialsPath = path.join(__dirname, "../templates/partials")

//setup handlebars engines and views location
app.set("view engine", "hbs")
app.set("views", viewsPath)  //by default it is views directory... but if we rename it , then we have to specify it
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))        //this will be my root page

app.get("", (req, res) => {
    res.render("index", {
        title: "weather app",
        name: "jayesh"
    })        //render allows us to render one of our views,, second argument is object being passed to template engine
})

app.get("/about", (req, res) => {
    res.render("about", {
        title: "about page",
        name: "jayesh"
    })
})

app.get("/help", (req, res) => {
    res.render("help", {
        title: "help page",
        name: "jayesh",
        helpText: "This is help page for some confused person"
    })
})

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "you must provide an address"
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {     //getting destructrued data        (error,response)
        //assigning to default empty object because if we get first argument(error) passed then destructured value will throw error,,, but in this case it will be assigned as undefined
        if (error) {
            return res.send({error:error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error:error})
            }
            // console.log(location)
            // console.log(forecastData)
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
        })
    })
    
})

app.get("/products", (req, res) => {
    if (!req.query.search) {  //search is a key value in query 
        return res.send({
            error: "You must provide a search term"
        })
    }
    console.log(req.query.search)       //req.query prints all the queries passed as key value pair
    res.send({
        products: []
    })
})

app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "404",
        name: "Jayesh",
        errorMessage: "Help article not found"
    })
})

app.get("*", (req, res) => {        //* is wildcard character,,,,this will run for all matches,,if no match is found above.. this should always be at the bottom.
    res.render("404", {
        title: "404",
        name: "jayesh",
        errorMessage: "page not found"
    })
})

app.listen(port, () => {
    console.log(`server is up on port ${port}. Click on link:: http://localhost:${port}`)
})