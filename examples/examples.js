import React from 'react';

// import AudioWorkletExample from './audio-worklet.js';
// import DelayLineExample from './delay-lines.js';
// import ComplexGraph from './complex-effects-graph.js';
// import BuffersAndChannels from './buffers-channels.js';
// import MediaElementSourceExample from './media-element.js';
// import MediaStreamSourceExample from './media-stream.js';
// import Mutation from './mutation.js';
// import GainMatrixExample from './gain-matrix.js';
// import CustomNodeExample from './custom-nodes.js';
import Silence from './Silence.js';
import TrafficFastmovingFreeway from './Traffic-Fastmoving-Freeway.js';
import TrafficHonking from './Traffic-Honking.js';
import TalkingCrowdedBar from './Talking-Crowded-Bar.js';
import TalkingCrowdedRestaurant from './Talking-Crowded-Restaurant.js';
import ThumpsOnFloor from './Thumps-On-Floor.js';
import ShoutingChildren from './Shouting-Children.js';
import ShoutingWeddingCheer from './Shouting-Wedding-Cheer.js';
import MusicDragonDancing from './Music-Dragon-Dancing.js';

const examples = {
  // 'audio-worklet': <AudioWorkletExample/>,
  // 'delay-lines-scheduling': <DelayLineExample />,
  // 'complex-effects-graph': <ComplexGraph/>,
  // 'buffers-channels': <BuffersAndChannels/>,
  // 'media-element': <MediaElementSourceExample/>,
  // 'media-stream': <MediaStreamSourceExample/>,
  // 'mutation': <Mutation/>,
  // 'gain-matrix': <GainMatrixExample/>,
  // 'custom-node': <CustomNodeExample />,
  'Silence': <Silence/>,
  'Traffic-Honking': <TrafficHonking/>,
  'Traffic-Fastmoving-Freeway': <TrafficFastmovingFreeway/>,
  'Talking-Crowded-Restaurant': <TalkingCrowdedRestaurant/>,
  'Talking-Crowded-Bar': <TalkingCrowdedBar/>,
  'Shouting-Children': <ShoutingChildren/>,
  'Shouting-Wedding-Cheer': <ShoutingWeddingCheer/>,
  'Music-Dragon-Dancing': <MusicDragonDancing/>,
  'Thumps-On-Floor': <ThumpsOnFloor/>,
};

export default examples;
