CODE DONT WORKING, DONT USE IT.
    CODE DONT WORKING, DONT USE IT.
    CODE DONT WORKING, DONT USE IT.
    CODE DONT WORKING, DONT USE IT.
    CODE DONT WORKING, DONT USE IT.
    CODE DONT WORKING, DONT USE IT.
    CODE DONT WORKING, DONT USE IT.
    CODE DONT WORKING, DONT USE IT.
    CODE DONT WORKING, DONT USE IT.
    CODE DONT WORKING, DONT USE IT.
    CODE DONT WORKING, DONT USE IT.
    CODE DONT WORKING, DONT USE IT.
    CODE DONT WORKING, DONT USE IT.
    CODE DONT WORKING, DONT USE IT.
    CODE DONT WORKING, DONT USE IT.
     CODE DONT WORKING, DONT USE IT.
    CODE DONT WORKING, DONT USE IT.
    CODE DONT WORKING, DONT USE IT.
    CODE DONT WORKING, DONT USE IT.
    CODE DONT WORKING, DONT USE IT.
    CODE DONT WORKING, DONT USE IT.
    CODE DONT WORKING, DONT USE IT.
    CODE DONT WORKING, DONT USE IT.
    CODE DONT WORKING, DONT USE IT.
    CODE DONT WORKING, DONT USE IT.
    CODE DONT WORKING, DONT USE IT.
    CODE DONT WORKING, DONT USE IT.
    CODE DONT WORKING, DONT USE IT.
    CODE DONT WORKING, DONT USE IT.
    CODE DONT WORKING, DONT USE IT.
    CODE DONT WORKING, DONT USE IT.
    CODE DONT WORKING, DONT USE IT.
    CODE DONT WORKING, DONT USE IT.
    CODE DONT WORKING, DONT USE IT.
    CODE DONT WORKING, DONT USE IT.
    CODE DONT WORKING, DONT USE IT.
//Script maded by NoctaEgo
//WARNING: Use of this script and any further modifications are your responsibility. 
//Please do not contact me if the script is not loading for you because you forgot to replace links or delete comments 
//(except for the author's note). Thank you. If you find any errors, please contact me via private message.
//Version:0.2
(function() {
    'use strict';
    const config = {
        tracks: [
            'https://example.com/music1.mp3',
            'https://example.com/music2.mp3',
            'https://example.com/music3.mp3',
        ],
        volume: 0.5,
        loopCurrent: false, 
        autoPlayNext: true,
        avoidRepeat: true, 
        preload: 'metadata',   // 'none', 'metadata', 'auto'
        useNativeAudioFallback: true,
    };

    let currentAudioDiv = null;
    let lastPlayedIndex = -1;

    function getRandomTrackIndex() {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * config.tracks.length);
        } while (config.avoidRepeat && randomIndex === lastPlayedIndex && config.tracks.length > 1);
        lastPlayedIndex = randomIndex;
        return randomIndex;
    }

    function createAudioDiv(src) {
        const container = document.createElement('div');
        container.className = 'div';
        container.style.cssText = 'position:fixed; width:0; height:0; overflow:hidden; opacity:0; pointer-events:none;';

        const audioDiv = document.createElement('div');
        audioDiv.className = 'html5audio';
        audioDiv.setAttribute('data-file', src);
        audioDiv.setAttribute('data-volume', config.volume);
        audioDiv.setAttribute('data-download', 'true');
        audioDiv.setAttribute('data-preload', config.preload);
        audioDiv.setAttribute('data-options', config.loopCurrent ? 'autoplay,loop' : 'autoplay');

        container.appendChild(audioDiv);
        document.body.appendChild(container);

        audioDiv.addEventListener('ended', function() {
            if (config.autoPlayNext) {
                playRandomTrack();
            }
        });

        audioDiv.addEventListener('error', function(e) {
            console.warn('Ошибка воспроизведения:', e.target.src);
            if (config.useNativeAudioFallback) {
                fallbackToNativeAudio(src);
            } else {
                playRandomTrack();
            }
        });

        return container;
    }

    function fallbackToNativeAudio(src) {
        console.info('Переход на HTMLAudioElement (fallback).');
        if (currentAudioDiv && currentAudioDiv.parentNode) {
            currentAudioDiv.parentNode.removeChild(currentAudioDiv);
        }

        const audio = new Audio();
        audio.src = src;
        audio.volume = config.volume;
        audio.preload = config.preload;
        audio.loop = config.loopCurrent;

        audio.addEventListener('ended', function() {
            if (config.autoPlayNext) {
                playRandomTrack();
            }
        });

        audio.addEventListener('error', function() {
            console.error('Ошибка в fallback audio.');
            playRandomTrack();
        });

        audio.play().catch(e => {
            console.error('Не удалось воспроизвести аудио (fallback):', e);
        });
    }

    function playRandomTrack() {
        if (currentAudioDiv && currentAudioDiv.parentNode) {
            currentAudioDiv.parentNode.removeChild(currentAudioDiv);
        }

        const randomIndex = getRandomTrackIndex();
        const randomTrack = config.tracks[randomIndex];
        currentAudioDiv = createAudioDiv(randomTrack);
    }

    function init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', playRandomTrack);
        } else {
            if (typeof mw !== 'undefined' && mw.config) {
                playRandomTrack();
            } else {
                window.addEventListener('load', playRandomTrack);
            }
        }
    }

    init();
})();
