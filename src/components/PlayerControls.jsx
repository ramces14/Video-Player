import React, { useState, forwardRef } from 'react';
import ValueLabelComponent from "./ValueLabelComponent";

import '../css/PlayersControls.css';

import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Slider from '@material-ui/core/Slider';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import Forward10Icon from '@material-ui/icons/Forward10';
import Replay10Icon from '@material-ui/icons/Replay10';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import FullscreenIcon from '@material-ui/icons/Fullscreen';

// Custom Styles for the materialUi components
const customStyles = makeStyles({
   timeSlider: {
     color: "red",
     width: "92%",
   },
   bottomButtons: {
     color: "rgb(185, 180, 180)",
     "&:hover": {
       color: "rgb(255, 255, 255)",
       cursor: "pointer"
     }
   },
   skipForward: {
      marginLeft: "10px"
   },
   volumeSlider: {
     width: 100,
     marginTop: "5px",
     marginLeft: "5px",
     color: "white"
   },
   spaceForTheLeft: {
     marginLeft: "20px"
   }
});

const PlayerControls = forwardRef(({
   onPlayPause, 
   playing, 
   onRewind, 
   onFastFoward, 
   muted, onMute, 
   onVolumeChange, 
   onVolumeSeekUp,
   volume,
   playbackRate,
   onPlaybackRateChange,
   onToggleFullScreen,
   played,
   onSeek,
   onSeekMouseDown,
   onSeekMouseUp,
   elapsedTime,
}, ref) => {

   const classes = customStyles();

   const [anchorEl, setAnchorEl] = useState(null);

   const handlePopover = (event) => {
      setAnchorEl(event.currentTarget);
   };

   const handleClose = () => {
      setAnchorEl(null);
   };

   const open = Boolean(anchorEl);
   const id = open ? 'playbackrate-popover' : undefined;

   return (
      <div className="controls-wrapper" ref={ref}  >

         {/* Start of the video controls */}
         <div className="video-controls">

            {/* Start of the video progress bar */}
            <div className="time-stamp">
               <Slider 
                  className={classes.timeSlider} 
                  value={played * 100} 
                  ValueLabelComponent={(props) => (
                     <ValueLabelComponent {...props} value={elapsedTime} />
                  )} 
                  onChange={onSeek}
                  onMouseDown={onSeekMouseDown}
                  onChangeCommitted={onSeekMouseUp}
               />
               <p>{elapsedTime}</p>
            </div>
            {/* End of the progress video bar */}

            {/* Start of the bottom menu controls */}
            <div className="bottom-controls">
               
               {/* Renders the play button or the pause button */}
               {playing ? (
                  <PauseIcon onClick={onPlayPause} className={classes.bottomButtons} fontSize="large" />
               ) : (
                  <PlayArrowIcon onClick={onPlayPause} className={classes.bottomButtons} fontSize="large" />
               )}

               {/* Buttons to skip back or forwards*/}
               <div className="skip-buttons">
                  <Replay10Icon onClick={onRewind} className={classes.bottomButtons} fontSize="large" />
                  <Forward10Icon onClick={onFastFoward} className={`${classes.bottomButtons} ${classes.skipForward}`} fontSize="large" />
               </div>

               {/* Start of the volume controls */}
               <div className="volume-controls">

                  {/* Renders a volume of icon if muted or a volume up icon when sound is on */}
                  { muted ? (
                     <VolumeOffIcon 
                        onClick={onMute} 
                        className={`${classes.bottomButtons} ${classes.spaceForTheLeft}`} 
                        fontSize="large" 
                     />
                  ) : (
                     <VolumeUpIcon 
                        onClick={onMute} 
                        className={`${classes.bottomButtons} ${classes.spaceForTheLeft}`} 
                        fontSize="large"
                     />
                  )}
                  {/* Slider is used to increase the volume */}
                  <Slider 
                     className={classes.volumeSlider} 
                     min={0} 
                     max={100} 
                     value={volume * 100}
                     onChange={onVolumeChange} 
                     onChangeCommitted={onVolumeSeekUp}
                  />

               </div>
               {/* End of volume controls */}
               
               {/* This button allows the user to change video speed.
                   The video begins with 1X speed.
               */}
               <button onClick={handlePopover} className="speed-button">
                  {`${playbackRate}X`}
               </button>
               
               {/* Renders the controls to change the speed of the video */}
               <Popover
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                  }}
                  transformOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                  }}
               >

                  {/* Mapping through all of the speed choices */}
                  <div className="playback-rate">
                     {[0.5, 1, 1.5, 2].map((rate, index) => (
                     <button 
                        onClick={() => onPlaybackRateChange(rate)} 
                        className="playback-rate-buttons"
                        style={rate === playbackRate ? {color: "red"} : {color: "black"} }
                        key={index}
                     >
                     {rate}
                     </button>
                     ))}
                  </div>

               </Popover>  
               
               {/* Toggels between the regular size and a full screen size */}
               <FullscreenIcon onClick={onToggleFullScreen} className={`${classes.bottomButtons} ${classes.spaceForTheLeft}`} fontSize="large" />

            </div>
            {/* End of the botttom menu controls */}
         </div>
         {/* End of video controls */}
      </div>
   );
});

export default PlayerControls;
