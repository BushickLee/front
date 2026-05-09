# Toddle Guard Frontend

Toddle Guard Frontend는 Edge AI 기반 가정 내 유아 낙상 조기경보 시스템의 보호자용 React Native / Expo 앱입니다. 이 레포는 프론트엔드 전용이며, Backend, Edge, AI 모델 코드는 포함하지 않습니다.

## 빠른 실행

```bash
npm install
copy .env.example .env
npm start
```

macOS / Linux에서는 다음 명령을 사용합니다.

```bash
cp .env.example .env
```

Expo 개발 서버가 실행되면 Expo Go 또는 에뮬레이터에서 앱을 확인할 수 있습니다.

캐시 문제가 의심되면 다음 명령으로 실행합니다.

```bash
npm run start:clear
```

## 로컬 웹캠 HLS 연결

이 앱은 HLS URL 하나만 받아서 영상을 재생합니다. 웹캠, FFmpeg, `.ts` 조각 파일, `.m3u8` 생성은 별도 HLS 서버 레포가 담당합니다.

### 1. HLS 서버 실행

별도 HLS 서버 레포를 받은 뒤 해당 폴더에서 실행합니다.

```bash
pip install fastapi uvicorn opencv-python
python main.py
```

PC에 FFmpeg가 설치되어 있어야 합니다.

```bash
ffmpeg -version
```

Windows에서 `ffmpeg` 명령이 잡히지 않으면 FFmpeg의 `bin` 폴더를 PATH에 추가하거나, HLS 서버 코드가 기대하는 위치인 `C:\ffmpeg\bin\ffmpeg.exe`에 설치합니다.

서버가 정상 실행되면 다음 주소가 열려야 합니다.

```text
http://localhost:8000/status
http://localhost:8000/static/live/stream.m3u8
```

`stream.m3u8` 요청 로그가 반복되는 것은 HLS 플레이어가 새 영상 조각을 확인하는 정상 동작입니다.

### 2. 휴대폰 테스트용 PC IP 확인

Expo Go를 휴대폰에서 사용할 때는 `localhost`를 쓰면 안 됩니다. 휴대폰의 `localhost`는 개발 PC가 아니라 휴대폰 자기 자신을 의미합니다.

Windows에서 PC IPv4 주소를 확인합니다.

```powershell
ipconfig
```

예를 들어 IPv4 주소가 `192.168.0.12`라면 HLS URL은 다음과 같습니다.

```text
http://192.168.0.12:8000/static/live/stream.m3u8
```

PC와 휴대폰은 같은 Wi-Fi에 있어야 하며, Windows Defender 방화벽에서 Python의 개인 네트워크 접근을 허용해야 합니다.

### 3. Frontend 환경 변수 설정

`.env.example`을 복사해 `.env`를 만들고, 본인 PC의 HLS URL을 넣습니다.

```env
EXPO_PUBLIC_API_BASE_URL=https://api.example.com
EXPO_PUBLIC_MOCK_HLS_URL=http://192.168.0.12:8000/static/live/stream.m3u8
```

실제 `.env` 파일은 커밋하지 않습니다. `.gitignore`에 의해 제외됩니다.

환경 변수를 바꾼 뒤에는 Expo 서버를 다시 시작합니다.

```bash
npm run start:clear
```

## 현재 구현된 기능

- `HomeScreen` 단일 화면 렌더링
- HLS 스트림 재생
- 커스텀 비디오 플레이어: LIVE 배지, 재생바, 라이브 복귀, 전체화면
- 위험 알림 인앱 모달
- `expo-notifications` 기반 3초 뒤 로컬 테스트 푸시
- 위험 알림 타입, UI 단계 매핑, mock 데이터 분리
- Backend REST API 연동을 위한 최소 skeleton

## Frontend 역할

Frontend는 보호자에게 위험 알림과 영상을 보여주는 클라이언트입니다. MQTT, RTSP, Edge 추론, AI 모델 실행을 직접 처리하지 않습니다.

Frontend가 다루는 입력은 다음 세 가지입니다.

- Backend REST API 응답
- FCM / Expo Push Notification
- Backend가 제공하는 HLS URL

## Backend 연결 방식

Backend가 준비되면 다음 API skeleton을 실제 엔드포인트에 맞춰 확장합니다.

- `src/api/client.ts`: 공통 REST client
- `src/api/alerts.ts`: 위험 알림 목록/상세, push token 등록
- `src/api/cameras.ts`: 카메라 목록/상세
- `src/types/risk.ts`: 위험 알림 payload 타입
- `src/types/camera.ts`: 카메라 타입

환경 변수는 Expo public env 형식으로 주입합니다.

```env
EXPO_PUBLIC_API_BASE_URL=https://api.example.com
EXPO_PUBLIC_MOCK_HLS_URL=https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8
```

`EXPO_PUBLIC_MOCK_HLS_URL`이 없으면 앱은 Mux 테스트 HLS 스트림을 fallback으로 사용합니다.

## 시스템 구조

```text
Edge Hub
  - YOLO-Pose
  - YOLO-Furniture
  - LSTM Risk Model
  - phase / confidence / timestamp 전송
        |
        v
Backend
  - DB 저장
  - REST API
  - FCM / Expo Push
  - HLS 중계 URL 제공
        |
        v
Frontend
  - 위험 알림 수신
  - HLS 영상 확인
  - 위험 이력 조회
  - 설정 화면
```

로컬 개발 중에는 Backend 대신 HLS 서버 레포가 임시로 웹캠 HLS URL을 제공합니다.

```text
Local Webcam
        |
        v
HLS Server Repo
  - FFmpeg
  - static/live/stream.m3u8
  - static/live/stream_000.ts
        |
        v
Toddle Guard Frontend
```

## 위험 단계

| LSTM phase | 앱 표시 |
| --- | --- |
| `normal` | 정상 |
| `early_warning` | 주의 / 조기경보 |
| `imminent_fall` | 낙상 임박 |
| `post_fall` | 낙상 감지 |

## 제외해야 하는 파일

이 레포에는 다음을 포함하지 않습니다.

- Backend 서버 코드
- Edge 디바이스 코드
- AI 모델, 학습 코드, 가중치 파일
- MQTT / RTSP 직접 처리 코드
- 실제 `.env` 파일
- 개인 IP가 들어간 설정값
- Expo prebuild 결과물인 `ios/`, `android/`

## 문제 해결

`ffmpeg` 명령을 찾을 수 없으면 FFmpeg 설치와 PATH 등록을 확인합니다.

```bash
ffmpeg -version
```

휴대폰에서 HLS가 열리지 않으면 다음을 확인합니다.

- PC와 휴대폰이 같은 Wi-Fi인지
- `.env`의 HLS URL이 `localhost`가 아니라 PC IPv4인지
- HLS 서버가 계속 실행 중인지
- Windows Defender 방화벽에서 Python 개인 네트워크 접근을 허용했는지
- 브라우저에서 `http://PC_IP:8000/static/live/stream.m3u8`가 열리는지

## 다음 개발 후보

- 위험 이력 화면
- 알림 상세 화면
- 카메라/보호자 설정 화면
- Expo Push token 발급 및 Backend 등록
- 실제 Backend API 응답 연결
