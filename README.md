# diddy

## Description
A mobile app that helps users find the BPM of a song either by search (text or music clip) or (possibly) by tapping along to the beat.


<!-- npx create-expo-app-diddy -->

<!-- https://github.com/alanjhughes/expo-shazamkit -->

## Onboarding 
- [ ] Clone this repo
- [ ] `npm install`
- [ ] install android studio and set up a virtual device and/or connect a physical device
Detailed instructions: https://docs.expo.dev/workflow/android-studio-emulator/
- [ ] edit .zshrc/.bashrc so that ANDROID_HOME is set to the location of your android sdk
```
export ANDROID_HOME=/Users/<yourusername>/Library/Android/sdk
```
- [ ] add the following to your .zshrc/.bashrc below the ANDROID_HOME line
```
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
```
- [ ] modify the 'import App' line of ./node_modules/expo/AppEntry.js to the following
```
import App from '../../src/components/App';
```
- [ ] Existing team member adds you to the github repo