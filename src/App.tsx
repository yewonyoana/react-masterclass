import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Components/Header";
import NowPlaying from "./Routes/NowPlaying";
import Search from "./Routes/Search";
import Tv from "./Routes/Tv";
import PopularMovies from "./Routes/PopularMovies";
import UpcomingMovies from "./Routes/UpcomingMovies";
import TvTrending from "./Routes/TvTrending";

function App() {
	return (
		<Router>
			<Header />
			<Switch>
				<Route path={["/tv", "/tv/:tvId"]}>
					<Tv />
				</Route>
				<Route path={["/tv-trending", "/tv-trending/:tvId"]}>
					<TvTrending />
				</Route>
				<Route path="/search">
					<Search />
				</Route>
				<Route path={["/popular-movies", "/popular-movies/:movieId"]}>
					<PopularMovies />
				</Route>
				<Route path={["/coming-soon-movies", "/coming-soon-movies/:movieId"]}>
					<UpcomingMovies />
				</Route>
				<Route path={["/", "/movies/:movieId"]}>
					<NowPlaying />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
