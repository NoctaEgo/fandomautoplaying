**📜 License**
*This script is provided "as is", without warranties. You may use, modify, and distribute it at your own discretion, while adhering to the above conditions.*
# Random HTML5 Audio Player for Fandom

This script allows you to **randomly play audio files** on your wiki running on the **Fandom/MediaWiki engine**, using the **built-in `html5audio` system**, if supported. If it fails, it falls back to using `HTMLAudioElement`.

## ✅ Features

- ✅ **Hidden playback** — audio is not displayed in the interface.
- ✅ **Random track selection** from a list.
- ✅ **No repeats in a row** (optional).
- ✅ **Configurable volume, looping, auto-play**.
- ✅ **Error handling and fallback to `HTMLAudioElement`**.
- ✅ **Optimized DOM cleanup** — prevents memory leaks.
- ✅ **Supports loading at any DOM state**.

---

## 🛠️ Installation

### Step 1: Prepare Audio Files

- Ensure all audio files:
  - Are in **MP3** format (or another format supported by the browser).
  - Are available via a **direct link** (e.g., `https://.../file.mp3`).
  - Are not protected from direct access (e.g., no CORS errors).

### Step 2: Adding the Script

1. Go to your wiki.
2. Navigate to the page: `Special:MyPage/common.js` or `MediaWiki:Common.js`.
   - This allows the script to be loaded on **all pages**.
3. Paste the **entire** JavaScript code of the script into the editor.
4. Click **"Save"**.
5. Refresh the page in your browser: `Ctrl+F5`.

---

## ⚙️ Configuration

All settings are located at the beginning of the script in the `config` object. Below is a detailed explanation:

```js
const config = {
    tracks: [
        'https://example.com/music.mp3',
        'https://example.com/music2.mp3',
        // Add your MP3 files here
    ],
    volume: 0.5,                    // Volume: from 0.0 (quiet) to 1.0 (loud)
    loopCurrent: false,             // Loop the current track? (true/false)
    autoPlayNext: true,             // Automatically play the next track? (true/false)
    avoidRepeat: true,              // Don't play the same track twice in a row? (true/false)
    preload: 'metadata',            // 'none', 'metadata', 'auto' — how to load audio
    useNativeAudioFallback: true,   // Use fallback if html5audio doesn't work? (true/false)
};
```
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `tracks` | Array | `[]` | List of direct links to MP3 files |
| `volume` | Number | `0.5` | Volume level from 0.0 (mute) to 1.0 (max) |
| `loopCurrent` | Boolean | `false` | Loop the current track |
| `autoPlayNext` | Boolean | `true` | Automatically switch to next track |
| `avoidRepeat` | Boolean | `true` | Don't play the same track twice in a row |
| `preload` | String | `'metadata'` | `'none'`, `'metadata'`, `'auto'` — when and how to load audio |
| `useNativeAudioFallback` | Boolean | `true` | Use `HTMLAudioElement` if `html5audio` doesn't work |


### 📁 Configuration Examples
1. Minimal configuration:
```
const config = {
    tracks: ['https://example.com/track1.mp3'],
    volume: 0.7,
    autoPlayNext: false,
};
```
2. Repeating background:
```
const config = {
    tracks: ['https://example.com/background.mp3'],
    volume: 0.3,
    loopCurrent: true,
    avoidRepeat: false,
};
```
3. Random playlist:
```
const config = {
    tracks: [
        'https://example.com/song1.mp3',
        'https://example.com/song2.mp3',
        'https://example.com/song3.mp3',
    ],
    volume: 0.6,
    loopCurrent: false,
    autoPlayNext: true,
    avoidRepeat: true,
};
```
## ❓ FAQ (Frequently Asked Questions)
 ### Q: Why isn't the audio playing?
  A: Check:
- **Whether the links to the audio files are accessible.**
- **Whether the server MIME types are set correctly.**
- **Whether autoplay is enabled in the browser (sometimes blocked by security policies).**
  
### Q: How to use on a specific page only?
A: Add a condition:
```
if (mw.config.get('wgPageName') === 'Main_Page') {
    // Code of the script here
}
```
### Q: Can I disable playback?
A: Remove the script from common.js or set autoPlayNext: false and do not call playRandomTrack().

### Q: What if html5audio doesn't work?
A: Ensure useNativeAudioFallback: true — then the script will automatically switch to HTMLAudioElement.

## 🔧 Troubleshooting
- **Problem: Audio is not playing**
-- Check if sound is enabled in the browser.
-- Check the browser console (F12 → Console tab) for errors.
- **Problem: Tracks are repeating**
-- Ensure avoidRepeat: true and tracks.length > 1.
- **Problem: Many audio elements in DOM**
-- The script automatically removes old elements, but on failures, the DOM might become "polluted". Ensure playRandomTrack() is not called twice.

## 🛡️ Security and Fandom Rules
- Ensure you have the right to use the audio files (copyrights).
- The script must not violate Fandom rules (e.g., excessive load, auto-playing at high volume).
- Use adaptive volume to avoid disturbing users.

# ⚠️ User Responsibility
**The user bears full responsibility for:**

*Any modifications to the script.*
*Its functionality on your wiki.*
*Adherence to Fandom rules and local wiki rules.*
*Legal consequences related to the use of audio files or code.*

**The script author is not responsible for:**

*Violation of wiki or Fandom rules.*
*Data corruption, errors, crashes.*
*Unintended behavior of the wiki or browser.*

## 📞 Support
If you have questions, suggestions, or bugs:
Contact to me.
Use the browser console for diagnostics.
