import React, { useRef, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useEvent, useEventListener } from 'expo';
import { VideoView, useVideoPlayer } from 'expo-video';
import Slider from '@react-native-community/slider';
import { MaterialIcons } from '@expo/vector-icons';

const FALLBACK_HLS_URL = 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8';
const LIVE_EDGE_THRESHOLD_SECONDS = 10;

interface VideoPlayerProps {
  hlsUrl?: string;
}

export default function VideoPlayer({ hlsUrl = FALLBACK_HLS_URL }: VideoPlayerProps) {
  const videoRef = useRef<VideoView>(null);
  const [positionSeconds, setPositionSeconds] = useState(0);
  const [durationSeconds, setDurationSeconds] = useState(0);

  const player = useVideoPlayer(
    {
      uri: hlsUrl,
      contentType: 'hls',
    },
    (videoPlayer) => {
      videoPlayer.muted = true;
      videoPlayer.timeUpdateEventInterval = 0.5;
      videoPlayer.play();
    },
  );

  const { status } = useEvent(player, 'statusChange', { status: player.status });

  useEventListener(player, 'timeUpdate', ({ currentTime }) => {
    setPositionSeconds(currentTime);
    setDurationSeconds(player.duration || 0);
  });

  useEventListener(player, 'sourceLoad', ({ duration }) => {
    setDurationSeconds(duration || 0);
  });

  const liveOffset = player.currentOffsetFromLive;
  const isLive =
    player.isLive ||
    (typeof liveOffset === 'number' && liveOffset <= LIVE_EDGE_THRESHOLD_SECONDS) ||
    (durationSeconds > 0 && durationSeconds - positionSeconds < LIVE_EDGE_THRESHOLD_SECONDS);

  const handleSliderValueChange = (value: number) => {
    player.currentTime = value;
    setPositionSeconds(value);
  };

  const jumpToLive = () => {
    if (durationSeconds > 0) {
      player.currentTime = durationSeconds;
      setPositionSeconds(durationSeconds);
    }
    player.play();
  };

  const toggleFullscreen = async () => {
    await videoRef.current?.enterFullscreen();
  };

  return (
    <View style={styles.container}>
      <VideoView
        ref={videoRef}
        style={styles.video}
        player={player}
        nativeControls={false}
        contentFit="contain"
        fullscreenOptions={{ enable: true, orientation: 'landscape' }}
        surfaceType="textureView"
      />

      {status === 'error' && (
        <View style={styles.errorOverlay}>
          <Text style={styles.errorText}>영상을 불러올 수 없습니다.</Text>
        </View>
      )}

      <View style={styles.badgeContainer}>
        <View style={[styles.liveDot, { backgroundColor: isLive ? 'red' : '#333' }]} />
        <Text style={[styles.liveText, { color: isLive ? 'red' : '#333' }]}>LIVE</Text>
      </View>

      <View style={styles.controlsContainer}>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={durationSeconds || 100}
          value={positionSeconds}
          onSlidingComplete={handleSliderValueChange}
          minimumTrackTintColor="red"
          maximumTrackTintColor="#FFFFFF"
          thumbTintColor="red"
        />

        <View style={styles.bottomControls}>
          <TouchableOpacity style={styles.liveJumpButton} onPress={jumpToLive}>
            <MaterialIcons name="sensors" size={20} color={isLive ? 'red' : 'white'} />
            <Text style={[styles.liveJumpText, { color: isLive ? 'red' : 'white' }]}>
              {isLive ? '실시간' : '라이브로 돌아가기'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={toggleFullscreen}>
            <MaterialIcons name="fullscreen" size={28} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 250,
    backgroundColor: '#000',
    position: 'relative',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  errorOverlay: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.72)',
    inset: 0,
    justifyContent: 'center',
    position: 'absolute',
  },
  errorText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  badgeContainer: {
    position: 'absolute',
    top: 15,
    right: 15,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 5,
  },
  liveText: {
    fontWeight: 'bold',
    fontSize: 12,
  },
  controlsContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 10,
    paddingBottom: 10,
    paddingTop: 5,
  },
  slider: {
    width: '100%',
    height: 30,
  },
  bottomControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  liveJumpButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  liveJumpText: {
    fontWeight: 'bold',
    marginLeft: 5,
    fontSize: 14,
  },
});
