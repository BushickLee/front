# 👶 ToddleGuard Frontend (토들가드 프론트엔드)

**Edge AI 기반 가정 내 유아 낙상 조기경보 및 사후 감지 시스템**의 보호자용 모바일 애플리케이션입니다.
React Native와 Expo를 기반으로 개발되었으며, 가정 내 설치된 Edge Hub(Jetson) 및 카메라와 연동하여 실시간 모니터링과 위험 알림 기능을 제공합니다.

## ✨ 주요 기능 (Key Features)
- **실시간 영상 스트리밍:** HLS(HTTP Live Streaming) 프로토콜을 이용한 실시간 홈캠 영상 시청
- **커스텀 비디오 플레이어:** 과거 영상 돌려보기, 실시간(Live) 시점으로 점프, 전체화면 기능을 지원하는 유튜브 UI 스타일의 플레이어
- **지능형 위험 알림:** 유아의 낙상 유발 위험 행동(의자 오르기 등) 및 낙상 발생 시 즉각적인 푸시 알림 수신

## 🛠 기술 스택 (Tech Stack)
- **Framework:** React Native, Expo
- **Language:** TypeScript
- **Video / Media:** expo-av
- **UI / UX:** @expo/vector-icons, @react-native-community/slider

## 🚀 로컬 실행 방법 (Getting Started)

프로젝트를 로컬 환경에서 실행하려면 Node.js와 Expo CLI가 필요합니다.

### 1. 패키지 설치
저장소를 클론한 후, 프로젝트 루트 디렉토리에서 터미널에 아래 명령어를 실행하여 필요한 라이브러리를 설치합니다.
> npm install

### 2. 앱 실행
설치가 완료되면 아래 명령어로 Expo 개발 서버를 실행합니다.
> npm start

### 3. 기기에서 확인하기
- **스마트폰:** 터미널에 나타난 QR 코드를 스마트폰의 카메라(iOS) 또는 Expo Go 앱(Android)으로 스캔하여 실기기에서 테스트할 수 있습니다.
- **에뮬레이터:** 터미널에서 'a'를 눌러 Android 에뮬레이터를 켜거나, 'i'를 눌러 iOS 시뮬레이터에서 실행할 수 있습니다.

## 📂 폴더 구조 (Folder Structure)
- assets/ : 앱 아이콘, 스플래시 이미지 등 정적 리소스
- src/components/ : VideoPlayer, AlarmModal 등 재사용 가능한 UI 컴포넌트
- src/screens/ : HomeScreen 등 앱의 주요 화면
- App.tsx : 앱의 최상위 진입점 (Entry Point)
- app.json : Expo 앱 기본 설정 파일