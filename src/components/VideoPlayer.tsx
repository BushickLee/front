import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Video, ResizeMode, AVPlaybackStatus } from 'expo-av';
import Slider from '@react-native-community/slider';
import { MaterialIcons } from '@expo/vector-icons';

export default function VideoPlayer() {
  const videoRef = useRef<Video>(null);
  const [status, setStatus] = useState<any>({});
  const [isLive, setIsLive] = useState(true);

  // 비디오 상태가 변할 때마다 실행되는 함수 (초당 2~3회 실행)
  const handlePlaybackStatusUpdate = (newStatus: AVPlaybackStatus) => {
    if (newStatus.isLoaded) {
      setStatus(newStatus);
      
      // 핵심 로직: 전체 길이(duration)와 현재 위치(position)의 차이가 10초 이내면 '라이브'로 간주!
      const duration = newStatus.durationMillis || 0;
      const position = newStatus.positionMillis || 0;
      
      if (duration - position < 10000) {
        setIsLive(true);
      } else {
        setIsLive(false);
      }
    }
  };

  // 재생바를 움직였을 때 (과거로 이동)
  const handleSliderValueChange = (value: number) => {
    if (videoRef.current) {
      videoRef.current.setPositionAsync(value);
    }
  };

  // 라이브 버튼을 눌렀을 때 (가장 최신 시간으로 점프!)
  const jumpToLive = () => {
    if (videoRef.current && status.durationMillis) {
      videoRef.current.setPositionAsync(status.durationMillis);
    }
  };

  // ⛶ 전체화면 버튼
  const toggleFullscreen = () => {
    if (videoRef.current) {
      videoRef.current.presentFullscreenPlayer();
    }
  };

  return (
    <View style={styles.container}>
      {/* 영상 출력 영역 */}
      <Video
        ref={videoRef}
        style={styles.video}
        source={{ uri: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8' }}
        useNativeControls={false} // 기본 컨트롤러 끄기! (우리가 직접 만듦)
        resizeMode={ResizeMode.CONTAIN}
        isMuted={true}
        shouldPlay={true}
        onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
      />

      {/* 우측 상단 LIVE 뱃지 (상태에 따라 색상 변경) */}
      <View style={styles.badgeContainer}>
        <View style={[styles.liveDot, { backgroundColor: isLive ? 'red' : '#333' }]} />
        <Text style={[styles.liveText, { color: isLive ? 'red' : '#333' }]}>LIVE</Text>
      </View>

      {/* 하단 커스텀 컨트롤러 바 */}
      <View style={styles.controlsContainer}>
        {/* 재생바 (슬라이더) */}
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={status.durationMillis || 100}
          value={status.positionMillis || 0}
          onSlidingComplete={handleSliderValueChange}
          minimumTrackTintColor="red"
          maximumTrackTintColor="#FFFFFF"
          thumbTintColor="red"
        />

        <View style={styles.bottomControls}>
          {/* 라이브 점프 버튼 */}
          <TouchableOpacity style={styles.liveJumpButton} onPress={jumpToLive}>
            <MaterialIcons 
              name="sensors" 
              size={20} 
              color={isLive ? "red" : "white"} 
            />
            <Text style={[styles.liveJumpText, { color: isLive ? "red" : "white" }]}>
              {isLive ? "실시간" : "라이브로 돌아가기"}
            </Text>
          </TouchableOpacity>

          {/* 전체화면 버튼 */}
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
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // 반투명 검은색 배경
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
  }
});