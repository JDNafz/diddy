import {
    Pressable, 
    StyleSheet,
    Text,
    View
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { Audio } from 'expo-av';
import { Buffer } from 'buffer';
import axios from 'axios';

const Recorder = (updateSong) => {
    const [recording, setRecording] = useState(null);

    useEffect(() => {
        // Request audio recording permissions
        Audio.requestPermissionsAsync().then(({ status }) => {
            if (status !== 'granted') {
                console.log('Permission to record audio denied');
                return;
            }


        }).catch((error) => {
            console.log('Failed to request audio permissions', error);
        });

        return () => {
            // Stop recording when component unmounts
            if (recording) {
                recording.stopAndUnloadAsync().catch((error) => {
                    console.log('Failed to stop recording', error);
                });
            }
        };
    }, []);

    const startRecording = async () => {
        Audio.setAudioModeAsync({
            allowsRecordingIOS: true,
            playsInSilentModeIOS: true,
        }).then(() => {
            const recording = new Audio.Recording();
            recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY).then(() => {
                recording.startAsync().then(() => {
                    setRecording(recording);
                }).catch((error) => {
                    console.log('Failed to start recording', error);
                });
            }).catch((error) => {
                console.log('Failed to prepare recording', error);
            });
        }).catch((error) => {
            console.log('Failed to set audio mode', error);
        });
    };

    const stopRecording = async () => {
        console.log('Stopping recording..');
        setRecording(undefined);
        await recording.stopAndUnloadAsync();
        await Audio.setAudioModeAsync(
          {
            allowsRecordingIOS: false,
          }
        );
        const uri = recording.getURI();
        console.log('Recording stopped and stored at', uri);
    }

    const sendToShazamAPI = async () => {
        if (!recording) {
            console.log('No recording available');
            return;
        }

        try {
            // Stop recording
            await recording.stopAndUnloadAsync();

            // Get the audio data
            const { uri } = recording.getURI();
            const response = await fetch(uri);
            const audioData = await response.arrayBuffer();

            // Convert audio data to base64
            const base64Data = Buffer.from(audioData).toString('base64');

            // Send base64 data to Shazam API
            const shazamResponse = await axios.post('https://api.shazam.com/v1/songs', {
                audio: {
                    value: base64Data,
                    options: {
                        filename: 'audio.wav',
                        contentType: 'audio/wav',
                    },
                },
                channel: 1,
                sampleRate: 44100,
            });

            console.log('Shazam API response:', shazamResponse.data);
        } catch (error) {
            console.log('Failed to send audio to Shazam API', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text>Audio Recorder</Text>
            {recording ? (
                <Pressable onPress={stopRecording}>
                    <Text> Stop Recording </Text>
                </Pressable>
            ) : (
                <Pressable onPress={startRecording}>
                    <Text> Start Recording </Text>
                </Pressable>
            )}
            {/* <Pressable onPress={playRecording} disabled={recording}>Play Recording</Pressable> */}
            <Pressable onPress={sendToShazamAPI} disabled={recording}><Text>Send to Shazam API</Text></Pressable>
        </View>);
};

export default Recorder;