@AGENTS.md

# 운동 코치 앱 (Fitness Coach App)

손그림 와이어프레임(`fitness_UI.png`) 기반의 모바일 운동 코치 앱 프로토타입. 전체 요구사항은 [prd.md](prd.md) 참고.

## 개요

- 화면 4개: 오늘의 운동(홈) → 운동 기록 → 운동 통계 → 운동 완료
- 서버/백엔드 없음. 목업(mock) 데이터로 동작하는 클릭 가능한 프로토타입
- 모든 UI 텍스트는 한국어

## 기술 스택

- **프레임워크**: React Native + Expo (managed workflow), TypeScript
- **네비게이션**: `@react-navigation/native` — 하단 탭(홈/기록/통계/마이) + 스택(운동 기록 → 운동 완료)
- **스타일링**: 공통 테마 토큰(색상/타이포/간격) 기반. NativeWind 또는 `StyleSheet` 사용, 4화면 전반에 동일 토큰 적용
- **차트**: `react-native-svg` 커스텀 컴포넌트(라인 차트, 도넛 차트) 또는 `victory-native`
- **아이콘**: `@expo/vector-icons` 또는 인라인 SVG
- **폰트**: `expo-google-fonts` — Noto Sans KR
- **상태 관리**: React Context 또는 Zustand (화면 간 공유: 오늘의 운동, 세트 기록, 통계). 로컬 영속화는 `AsyncStorage`
- **미리보기**: Expo Go로 QR 스캔 후 실기기 확인 (네이티브 빌드 툴체인 불필요)

## 개발 규칙

- 4화면은 하나의 디자인 시스템(색상/타이포/버튼/카드/차트 스타일)으로 일관되게 구성 — 화면마다 스타일을 새로 정의하지 말고 공통 테마/컴포넌트를 재사용
- 실제 서비스 연동(로그인, API, 서버 저장) 범위 아님 — 목업 데이터와 클라이언트 상태로만 구현
- 와이어프레임(`fitness_UI.png`)의 화면 구조·정보 배치·핵심 기능을 임의로 변경하지 않음. 색상·타이포·아이콘·차트 스타일·여백 등 비주얼 디테일만 자유롭게 판단
