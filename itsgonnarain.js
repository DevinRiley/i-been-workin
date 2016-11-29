let audioContext = new AudioContext();

function startLoop(audioBuffer, pan = 0, playbackRate = 1) {
  let sourceNode = audioContext.createBufferSource();
  let pannerNode = audioContext.createStereoPanner();

  sourceNode.buffer = audioBuffer;
  sourceNode.loop = true;
  sourceNode.loopStart = 0.05;
  sourceNode.loopEnd = 3.22;
  sourceNode.playbackRate.value = playbackRate;
  pannerNode.pan.value = pan;

  sourceNode.connect(pannerNode);
  pannerNode.connect(audioContext.destination);

  sourceNode.start();
}

fetch('ibeenworking.mp3')
  .then(response => response.arrayBuffer())
  .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
  .then(audioBuffer => {
    startLoop(audioBuffer, -1);
    startLoop(audioBuffer, -1, 0.4);
    startLoop(audioBuffer, -1, 1.002);
    startLoop(audioBuffer, 1, 1.006);
    startLoop(audioBuffer, 1, 1.008);
  })
  .catch(e => console.error(e));
