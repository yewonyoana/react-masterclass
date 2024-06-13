import { useQuery } from "react-query";
import styled from "styled-components";
import { motion, AnimatePresence, useViewportScroll } from "framer-motion";
import {
	IGetTvResult,
	getPopularTvShows,
	getTopRatedTvShows,
	LIST_TYPE,
} from "../api";
import { makeImagePath } from "../utils";
import { useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";

const Wrapper = styled.div`
	background: black;
	padding-bottom: 200px;
`;

const Loader = styled.div`
	height: 20vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Banner = styled.div<{ bgPhoto: string }>`
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 60px;
	background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
		url(${(props) => props.bgPhoto});
	background-size: cover;
`;

const Title = styled.h2`
	font-size: 68px;
	font-weight: 600;
	margin-bottom: 20px;
`;

const SubTitle = styled.h3`
	font-size: 30px;
	font-weight: 600;
	text-transform: uppercase;
	margin-bottom: 20px;
`;

const Overview = styled.p`
	font-size: 23px;
	width: 50%;
`;

const Slider = styled.div`
	position: relative;
	top: -100px;
`;

const Row = styled(motion.div)`
	display: grid;
	gap: 5px;
	grid-template-columns: repeat(6, 1fr);
	position: absolute;
	width: 100%;
`;

const Box = styled(motion.div)<{ bgPhoto: string }>`
	background-color: white;
	background-image: url(${(props) => props.bgPhoto});
	background-size: cover;
	background-position: center center;
	height: 200px;
	font-size: 66px;
	cursor: pointer;
	&:first-child {
		transform-origin: center left;
	}
	&:last-child {
		transform-origin: center right;
	}
`;

const Info = styled(motion.div)`
	padding: 10px;
	opacity: 0;
	position: absolute;
	width: 100%;
	top: 0;
	h4 {
		font-size: 18px;
		font-weight: 600;
		text-shadow: 1px 1px 2px black;
	}
`;

const Overlay = styled(motion.div)`
	position: fixed;
	top: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	opacity: 0;
`;

const BigMovie = styled(motion.div)`
	position: absolute;
	width: 50vw;
	height: max-content;
	left: 0;
	right: 0;
	margin: 0 auto;
	border-radius: 15px;
	overflow: hidden;
	background-color: black;
`;

const BigCover = styled.div`
	width: 100%;
	background-size: cover;
	background-position: center center;
	height: 400px;
`;

const BigTitle = styled.h3`
	color: ${(props) => props.theme.white.lighter};
	padding: 20px;
	font-size: 46px;
	font-weight: 600;
	position: relative;
	top: -80px;
`;

const BigOverview = styled.p`
	padding: 20px;
	position: relative;
	top: -80px;
	color: ${(props) => props.theme.white.lighter};
`;

const rowVariants = {
	hidden: {
		x: window.outerWidth + 5,
	},
	visible: {
		x: 0,
	},
	exit: {
		x: -window.outerWidth - 5,
	},
};

const boxVariants = {
	normal: {
		scale: 1,
	},
	hover: {
		scale: 1.3,
		y: -80,
		transition: {
			delay: 0.5,
			duration: 0.1,
			type: "tween",
		},
	},
};

const infoVariants = {
	hover: {
		opacity: 1,
		transition: {
			delay: 0.5,
			duration: 0.1,
			type: "tween",
		},
	},
};

const offset = 6;

function Tvs() {
	const history = useHistory();
	const bigTVMatch = useRouteMatch<{ tvId: string }>("/tv/:tvId");
	const { scrollY } = useViewportScroll();
	const { data, isLoading } = useQuery<IGetTvResult>(
		[LIST_TYPE[3], "popularTVs"],
		getPopularTvShows
	);
	const [index, setIndex] = useState(0);
	const [leaving, setLeaving] = useState(false);
	const increaseIndex = () => {
		if (data) {
			if (leaving) return;
			toggleLeaving();
			const totalTvShows = data.results.length - 1;
			const maxIndex = Math.floor(totalTvShows / offset) - 1;
			setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
		}
	};
	const toggleLeaving = () => setLeaving((prev) => !prev);
	const onBoxClicked = (tvId: number) => {
		history.push(`/tv/${tvId}`);
	};
	const onOverlayClick = () => history.push("/tv");
	const clickedTV =
		bigTVMatch?.params.tvId &&
		data?.results.find((tv) => tv.id === +bigTVMatch.params.tvId);
	console.log(clickedTV);
	return (
		<Wrapper>
			{isLoading ? (
				<Loader>Loading...</Loader>
			) : (
				<>
					<Banner
						onClick={increaseIndex}
						bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}>
						<Title>{data?.results[0].name}</Title>
						<Overview>{data?.results[0].overview}</Overview>
					</Banner>
					<Slider>
						<AnimatePresence initial={false} onExitComplete={toggleLeaving}>
							<Row
								variants={rowVariants}
								initial="hidden"
								animate="visible"
								exit="exit"
								transition={{ type: "tween", duration: 1 }}
								key={index}>
								{data?.results
									.slice(1)
									.slice(offset * index, offset * index + offset)
									.map((tv) => (
										<Box
											layoutId={tv.id + ""}
											key={tv.id}
											whileHover="hover"
											initial="normal"
											variants={boxVariants}
											onClick={() => onBoxClicked(tv.id)}
											transition={{ type: "tween" }}
											bgPhoto={makeImagePath(tv.backdrop_path, "w500")}>
											<Info variants={infoVariants}>
												<h4>{tv.name}</h4>
											</Info>
										</Box>
									))}
							</Row>
						</AnimatePresence>
					</Slider>
					<AnimatePresence>
						{bigTVMatch ? (
							<>
								<Overlay
									onClick={onOverlayClick}
									exit={{ opacity: 0 }}
									animate={{ opacity: 1 }}
								/>
								<BigMovie
									style={{ top: scrollY.get() + 100 }}
									layoutId={bigTVMatch.params.tvId}>
									{clickedTV && (
										<>
											<BigCover
												style={{
													backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
														clickedTV.backdrop_path,
														"w500"
													)})`,
												}}
											/>
											<BigTitle>{clickedTV.name}</BigTitle>
											<BigOverview>{clickedTV.overview}</BigOverview>
										</>
									)}
								</BigMovie>
							</>
						) : null}
					</AnimatePresence>
				</>
			)}
		</Wrapper>
	);
}
export default Tvs;
