//script maded by Nocta

(function() {
    'use strict';

    const tracks = [
        'https://example.com/music1.mp3',
        'https://example.com/music2.mp3',
        'https://example.com/music3.mp3',
      //you can add more files btw
    ];

    const volume = 0.5;
    const loopCurrent = false;
    const autoPlayNext = true; 
    let currentAudioDiv = null;

    function getRandomTrack() {
        return tracks[Math.floor(Math.random() * tracks.length)];
    }

    function createAudioDiv(src) {
        const container = document.createElement('div');
        container.className = 'div';
        container.style.cssText = 'position:fixed; width:0; height:0; overflow:hidden; opacity:0; pointer-events:none;';

        const audioDiv = document.createElement('div');
        audioDiv.className = 'html5audio';
        audioDiv.setAttribute('data-file', src);
        audioDiv.setAttribute('data-volume', volume);
        audioDiv.setAttribute('data-download', 'true');
        audioDiv.setAttribute('data-preload', 'metadata');
        audioDiv.setAttribute('data-options', loopCurrent ? 'autoplay,loop' : 'autoplay');

        container.appendChild(audioDiv);
        document.body.appendChild(container);

        audioDiv.addEventListener('ended', function() {
            if (autoPlayNext) {
                playRandomTrack();
            }
        });

        return container;
    }

    function playRandomTrack() {
        if (currentAudioDiv && currentAudioDiv.parentNode) {
            currentAudioDiv.parentNode.removeChild(currentAudioDiv);
        }

        const randomTrack = getRandomTrack();
        currentAudioDiv = createAudioDiv(randomTrack);
    }

    window.addEventListener('load', function() {
        playRandomTrack();
    });
})();

//Version 0.1 pre-alpha USE IT ON YOUR RISK!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
