// import package
const express= require('express');
const mongoose=require('mongoose');

// mongo connection
mongoose.connect("mongodb://localhost:27017/moviesdb")
.then(()=>{
    console.log("mongo connection successful!")
})
.catch((err)=>{
    console.log(err);
})

// movie collection schema & model :
// schema with validation
const moviesSchema= new mongoose.Schema({

    name:{type:String,required:true},
    releasedate:{type:Date,required:true},
    genre:{type:String,required:true},
    boxoffice:{type:Number,required:true},
    rating:{type:Number,required:true},
    director:{type:String,required:true},
    poster:{type:String,required:true},
    production_studio:{type:String,required:true}

},{timestamps:true});

// model
const moviesModel= new mongoose.model('movies',moviesSchema);



// actor collection schema & model 
// schema
const actorSchema= new mongoose.Schema({

    name:{type:String,required:true},
    age:{type:Number,required:true},
    profile:{type:String,required:true}

})

// model
const actorModel= new mongoose.model('actors',actorSchema);


// schema & model for movies_actors collection
// schema
const movieActorSchema= new mongoose.Schema({

    movie_id:{type:mongoose.Schema.Types.ObjectId,ref:"movies"},
    actor_id:{type:mongoose.Schema.Types.ObjectId,ref:"actors"}

})

// model
const movieActorModel= new mongoose.model('movies_actors',movieActorSchema);




// express object 
const app=express();


// middleware function
app.use(express.json());


// to connect movies & actors
// POST request
app.post("/moviesactors",(req,res)=>{

    let movieActor=req.body;
    // model object 
    movieActorOBJ= new movieActorModel(movieActor);
    
    movieActorOBJ.save()
    .then(()=>{
        res.send({message:"Actor created for a movie"})
    })
    .catch((err)=>{
        console.log(err);
        res.send({message:"some problem"})
    })

})


// to fetch movies with actors 
app.get("/moviesactors",(req,res)=>{

    movieActorModel.find({movie_id:"61a274d47a7c568833cd99f6"}).populate('movie_id').populate('actor_id')
    .then((movies)=>{
        res.send( movies)
    })
    .catch((err)=>{
        console.log(err);
        res.send({message:"some problem"})
    })
})






// movies endpoints
// to create a movie

app.post("/movies",(req,res)=>{

    let movie= req.body;
    

    // model object
    let movieOBJ= new moviesModel(movie);

    movieOBJ.save()
    .then(()=>{
        res.send({message:"movie created"})
    })
    .catch((err)=>{
        console.log(err);
        res.send({message:"some problem creating the movie"})
    })


})


// to fetch all movies(GET request)
app.get("/movies",(req,res)=>{


    moviesModel.find()
    .then((movies)=>{
        res.send(movies);

    })
    .catch((err)=>{
        console.log(err);
        res.send({message:"some problem while fetching the movies"})
    })

})


// to fetch a single movie
app.get("/movies/:id",(req,res)=>{

    let id= req.params.id;

    moviesModel.findOne({_id:id})
    .then((movies)=>{
        res.send(movies);

    })
    .catch((err)=>{
        console.log(err);
        res.send({message:"some problem while fetching the movies"})
    })

})

// to delete a movie
app.delete("/movies/:id",(req,res)=>{

    let id=req.params.id;

    moviesModel.deleteOne({_id:id})
    .then(()=>{
        res.send({message:"movie deleted"});

    })
    .catch((err)=>{
        console.log(err);
        res.send({message:"some problem while deleting the movies"})
    })


})

// to update a movie
app.put("/movies/:id",(req,res)=>{

    let id=req.params.id;

    let movieUpdate=req.body;

    moviesModel.updateOne({_id:id},movieUpdate)
    .then(()=>{
        res.send({message:"movie Updated"});

    })
    .catch((err)=>{
        console.log(err);
        res.send({message:"some problem while upating the movies"})
    })


})


// actors endpoints

// to create a actor 
app.post("/actors",(req,res)=>{

    let actor=req.body;

    // model object 
    let actorOBJ= new actorModel(actor);

    actorOBJ.save()
    .then(()=>{
        res.send({message:"actor created"})
    })
    .catch((err)=>{
        console.log(err);
        res.send({message:"some problem creating the actor"})
    })


})


// to fetch the actors
app.get("/actors",(req,res)=>{

    actorModel.find()
    .then((actors)=>{
        res.send(actors)
    })
    .catch((err)=>{
        console.log(err);
        res.send({message:"some problem fetching the actors"})
    })

})

// to fetch a single actor
app.get("/actors/:id",(req,res)=>{

    let id=req.params.id;

    actorModel.findOne({_id:id})
    .then((actors)=>{
        res.send(actors)
    })
    .catch((err)=>{
        console.log(err);
        res.send({message:"some problem fetching the actor"})
    })

})

// to delete a actor 
app.delete("/actors/:id",(req,res)=>{

    let id=req.params.id;

    actorModel.deleteOne()
    .then(()=>{
        res.send({message:"actor deleted"})
    })
    .catch((err)=>{
        console.log(err);
        res.send({message:"some problem deleting the actor"})
    })

})


// to update a actor 
app.put("/actors/:id",(req,res)=>{

    let id=req.params.id;

    let actorUpdate=req.body;


    actorModel.updateOne({_id:id},actorUpdate)
    .then(()=>{
        res.send({message:"actor updated"})
    })
    .catch((err)=>{
        console.log(err);
        res.send({message:"some problem updating the actor"})
    })

})



// server
app.listen(8000,()=>{console.log("server is running!")});