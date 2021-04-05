import React, {useState, useRef} from 'react';
import ReactPlayer from 'react-player';
import PlayerControls from "./components/PlayerControls";
import './css/App.css';

import Container from '@material-ui/core/Container'

import screenfull from 'screenfull';

// Formats the time to video time
const format = (seconds) => {
	if(isNaN(seconds)) {
		return "00:00";
	}

	const date = new Date(seconds * 1000);
	const hh = date.getUTCHours();
	const mm = date.getUTCMinutes()
	const ss = date.getUTCSeconds().toString().padStart(2, "0");
	if(hh) {
		return `${hh}:${mm.toString().padStart(2, "0")}:${ss}`;
	}

	return `${mm}:${ss}`;
}

// Count is used to count seconds of mouse inactivity
let count = 0;

function App() {

	const [state, setState] = useState({
		playing: false,
		muted: false,
		volume: 0.5,
		playbackRate: 1.0,
		played: 0,
		seeking: false,
		fullScreen: false
	});

	const { playing, muted, volume, playbackRate, played, fullScreen } = state

	const playerRef = useRef(null);
	const playerContainerRef = useRef(null);
	const controlsRef = useRef(null);

	// Logic for palying and pausing the video
	const handelPlayPause = () => {
		setState({ ...state, playing: !state.playing });
	}

	// Logic for subtracting 10 seconds
	const handleRewind = () => {
		playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10);
	}

	// Logic for adding 10 seconds
	const handleFastFoward = () => {
		playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10);
	}

	// Logic for turning the volume on and off
	const handleMute = () => {
		setState({...state, muted: !state.muted});
	}

	const handleVolumeChange = (e, newValue) => {
		setState({
			...state,
			volume: parseFloat(newValue / 100),
			muted: newValue === 0 ? true : false
		});
	}

	const handleVolumeSeekUp = (e, newValue) => {
		setState({
			...state,
			volume: parseFloat(newValue / 100),
			muted: newValue === 0 ? true : false
		});
	}

	//Logic for changing the speed rate of the video
	const handlePlaybackRate = (rate) => {
		setState({...state, playbackRate: rate})
	}

	//Logic for changing screen size
	const toggleFullScreen = (e) => {
		screenfull.toggle(playerContainerRef.current);
		setState({...state, fullScreen: !state.fullScreen});
	}


	//Logic for making the controls appear when hovering over and disappear after 3 seconds
	const handleProgress = (changeState) => {
		
		if(count > 2) {
			controlsRef.current.style.visibility = "hidden";
			count = 0;
		}

		if(controlsRef.current.style.visibility === "visible") {
			count += 1;
		}

		if(!state.seeking) {
			setState({...state, ...changeState});
		}
	}
	// This will make the contols appear once your mouse has moved
	const handleMouseMove = () => {
		controlsRef.current.style.visibility = "visible";
		count = 0;
	}

	// logic for showing the current video time
	const handleSeekChange = (e, newValue) => {
		setState({...state, played: parseFloat(newValue/100)});
	}

	const handleSeekMouseDown = () => {
		setState({...state, seeking: true});
	}

	const handleSeekMouseUp = (e, newValue) => {
		setState({...state, seeking: false});
		playerRef.current.seekTo(newValue/100);
	}

	const currentTime = playerRef.current ? playerRef.current.getCurrentTime() : "00:00";

	const elapsedTime = format(currentTime);

	return (
		<div className="App">

			<Container maxWidth="md" className="custom-height" >

				<div 
					ref={playerContainerRef} 
					className="player-wrapper"
					onMouseMove={handleMouseMove}
				>

					<ReactPlayer
						ref={playerRef}
						width="100%"
						height="100%"
						url="https://vimeo.com/145581041" 
						muted={muted}
						playing={playing}
						volume={volume}
						playbackRate={playbackRate}
						onProgress={handleProgress}
					/>

					<PlayerControls 
						ref={controlsRef}
						onPlayPause={handelPlayPause}
						playing={playing}
						onRewind={handleRewind}
						onFastFoward={handleFastFoward}
						muted={muted}
						onMute={handleMute}
						onVolumeChange={handleVolumeChange}
						onVolumeSeekUp={handleVolumeSeekUp}
						volume={volume}
						playbackRate={playbackRate}
						onPlaybackRateChange={handlePlaybackRate}
						onToggleFullScreen={toggleFullScreen}
						checkFullScreen={fullScreen}
						played={played}
						onSeek={handleSeekChange}
						onSeekMouseDown={handleSeekMouseDown}
						onSeekMouseUp={handleSeekMouseUp}
						elapsedTime={elapsedTime}
					/>

				</div>

			</Container>

		</div>
	);
}

export default App;
