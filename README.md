# Toddle Guard Frontend

Toddle Guard Frontend는 Edge AI 기반 가정 내 유아 낙상 조기경보 시스템의 보호자용 React Native / Expo 앱입니다. 이 레포는 프론트엔드 전용이며, Backend, Edge, AI 모델 코드는 포함하지 않습니다.

## 실행 방법

```bash
npm install
npm start
```

Expo 개발 서버가 실행되면 Expo Go 또는 에뮬레이터에서 앱을 확인할 수 있습니다.

## 현재 구현된 기능

- `HomeScreen` 단일 화면 렌더링
- HLS 테스트 스트림 재생
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

```bash
EXPO_PUBLIC_API_BASE_URL=https://api.example.com
```

실제 `.env` 파일은 커밋하지 않습니다. 필요한 값은 `.env.example`을 참고해 로컬에서만 생성하세요.

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
- Expo prebuild 결과물인 `ios/`, `android/`

## 다음 개발 후보

- 위험 이력 화면
- 알림 상세 화면
- 카메라/보호자 설정 화면
- Expo Push token 발급 및 Backend 등록
- 실제 Backend API 응답 연결
