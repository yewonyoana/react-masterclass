const API_KEY = "52bba8d4fd8dc008530dfa04aa6f1514";
const BASE_PATH = "https://api.themoviedb.org/3";
export const LIST_TYPE = [
	"nowPlaying",
	"upcomingMovies",
	"popularMovies",
	"popularTVs",
	"trendingTVs",
];

//MOVIES
interface IMovie {
	id: number;
	backdrop_path: string;
	poster_path: string;
	title: string;
	overview: string;
}

//nowPlaying
export interface IGetMoviesResult {
	dates: {
		maximum: string;
		minimum: string;
	};
	page: number;
	results: IMovie[];
	total_pages: number;
	total_results: number;
}

//nowPlaying
export function getMovies() {
	return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then(
		(response) => response.json()
	);
}

//popularMovies
export function getPopularMovies() {
	return fetch(`${BASE_PATH}/movie/popular?api_key=${API_KEY}`).then(
		(response) => response.json()
	);
}

//upcomingMovies
export function getUpcomingMovies() {
	return fetch(`${BASE_PATH}/movie/upcoming?api_key=${API_KEY}`).then(
		(response) => response.json()
	);
}

//TV SHOWS
interface ITv {
	id: number;
	backdrop_path: string;
	poster_path: string;
	name: string;
	overview: string;
}

//nowPlaying
export interface IGetTvResult {
	dates: {
		maximum: string;
		minimum: string;
	};
	page: number;
	results: ITv[];
	total_pages: number;
	total_results: number;
}
//popularTVShows
export function getPopularTvShows() {
	return fetch(`${BASE_PATH}/tv/popular?api_key=${API_KEY}`).then((response) =>
		response.json()
	);
}

//topRatedTVShows
export function getTopRatedTvShows() {
	return fetch(`${BASE_PATH}/tv/top_rated?api_key=${API_KEY}`).then(
		(response) => response.json()
	);
}

//search
export interface IGetSearchResult {
	dates: {
		maximum: string;
		minimum: string;
	};
	page: number;
	results: ISearch[];
	total_pages: number;
	total_results: number;
}

interface ISearch {
	id: number;
	backdrop_path: string;
	poster_path: string;
	title: string;
	overview: string;
}

export function searchData(keyword: string) {
	return fetch(`${BASE_PATH}/search/multi?api_key=${API_KEY}&query=${keyword}`)
		.then((response) => response.json())
		.catch((err) => err);
}
