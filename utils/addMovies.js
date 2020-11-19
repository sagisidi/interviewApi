const https = require('https');
const Movie = require('../models/Movies');
const mongoose = require('mongoose');
const mongo =`mongodb+srv://sagicd:a37qQJeHtBn7xMhF@cluster0.s4bdp.mongodb.net/interview?retryWrites=true&w=majority`


class Movies {
	constructor(url){
		this.url = url
	}
	
	callMoviesApi() {
		https.get(this.url, (resp) => {
			let data = '';

			// A chunk of data has been recieved.
			resp.on('data', (chunk) => {
			data += chunk;
			});

			// The whole response has been received. Print out the result.
			resp.on('end', () => {
				data = JSON.parse(data);
				const entries = data.feed.entry;
				entries.forEach(entry => {
					this.addMoviesToDb(entry);
				})

			});

		})
		.on("error", (err) => {
			console.log(err);
		});

	}
	async addMoviesToDb(entry){
		const link = entry.link[0].attributes.href;
		const title = entry['im:name'].label;
		const images = entry['im:image'].map(item => item.label) ;
		const rating = await this.getRating(link);
		
		//Add movie info to DB;
		Movie.create({title,imagesUrl:images,rating:rating})
     	.then(result => {
     	   console.log("add movie successfully")
     	})
     	.catch(err => {
           console.log(err);
     	})

	}

	async getRating(url){

		const rp = require('request-promise');
		const $ = require('cheerio');
		const html = await rp(url);
		const ratingString = await $('figcaption', html).text();
		return ratingString.split(" ")[0]

	}
  
  }


mongoose.connect(mongo, {
    useNewUrlParser: true,
    useUnifiedTopology:true
})
    .then(data => {
        console.log('connected');
        const movie = new Movies('https://itunes.apple.com/us/rss/topmovies/limit=25/json');
        movie.callMoviesApi();
    })
    .catch(err => {
        console.log(err);
})




module.exports = Movies;
