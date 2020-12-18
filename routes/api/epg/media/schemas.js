

const media = {
    title: 'Media',
    $id: 'Media',
    type: 'object',
    properties: {
        id: {type: 'string'},
        backdrop_path: {type: 'string'},
        poster_path: {type: 'string'},
        imdb_id: { type: ['string', 'null'] },//MOVIE
        adult: {type: ['boolean', 'null']},//MOVIE
        title: {type: ['string', 'null']},//MOVIE
        original_title: {type: ['string', 'null']},//MOVIE
        name: {type: ['string', 'null']}, //TV
        original_name: {type: ['string', 'null']}, //TV
        overview: {type: ['string', 'null']},
        genres: {
            type: 'array',
            items: {
                properties: {
                    id: {type: 'string'},
                    name: {type: 'string'}
                }
            }
        },
        production_companies: {
            type: ['array', 'null'],
            items: {
                properties: {
                    id: {type: 'string'},
                    logo_path: {type: 'string'}, 
                    name: {type: 'string'}, 
                    origin_country: {type: 'string'}
                }
            }
        },
        seasons: { //TV
            type: ['array', 'null'],
            items: {
                properties: {
                    air_date: {type: 'string'}, 
                    episode_count: {type: 'string'}, 
                    id: {type: 'string'}, 
                    name: {type: 'string'}, 
                    overview: {type: 'string'}, 
                    poster_path: {type: 'string'}, 
                    season_number: {type: 'string'}
                }
            }
        },
        release_date: {type: ['string', 'null']}, //MOVIE
        first_air_date: {type: ['string', 'null']}, //TV
        last_air_date: {type: ['string', 'null']}, //TV
        number_of_episodes: {type: ['number', 'null']},//TV
        number_of_seasons: {type: ['number', 'null']},//TV
        created_by: {
            type: ['array', 'null'],
            items:{
                properties: {
                    id: {type: 'string'},
                    credit_id: {type: 'string'},
                    name: {type: 'string'},
                    gender: {type: 'string'},
                    profile_path: {type: 'string'}
                }
            }
        },
        networks: {//TV
            type: ['array','null'],
            items: {
                properties: {
                    name: {type: 'string'},
                    id: {type: 'string'},
                    logo_path: {type: 'string'},
                    origin_country: {type: 'string'}
                }
            }
        },
        vote_average: {type: 'string'},
        imdb_rating: {type: ['number', 'null']},
        media_type: {type: 'string'},
        runtime: {type: ['number','null']},//MOVIE
        episode_run_time: {type: ['array', 'null']},//TV
    }
}

const medias = {
    title: 'Medias',
    $id: 'Medias',
    type: 'array',
    items: {
        $ref: 'Media#'
    }
}

//-------------------------
const geMedias = {
    schema: {
        200: {
            $ref: 'Medias#'
        }
    }
}
const savenewMediaSchema = {
    schema: {
        body: {
            type: 'object',
            properties: {
                id: { type: 'string' },
                media_type: { type: 'string', enum: ['tv', 'movie'] }
            },
            required:['id','media_type']
        },
        response: {
            200:{
                $ref: 'Media#'
            }
        }
    }
}

module.exports = {
    media,
    medias,
    geMedias,
    savenewMediaSchema
}