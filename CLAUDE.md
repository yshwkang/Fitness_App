@AGENTS.md

# 운동 코치 앱 (Fitness Coach App)

손그림 와이어프레임(`fitness_UI.png`) 기반의 모바일 운동 코치 앱 프로토타입. 전체 요구사항은 [prd.md](prd.md) 참고.

## 개요

- 화면 4개: 오늘의 운동(홈) → 운동 기록 → 운동 통계 → 운동 완료
- 서버/백엔드 없음. 목업(mock) 데이터로 동작하는 클릭 가능한 프로토타입
- 모든 UI 텍스트는 한국어

## 기술 스택

- **프레임워크**: React Native + Expo (managed workflow), TypeScript
- **네비게이션**: `@react-navigation/native` — 하단 탭(홈/기록/통계/마이, `TabNavigator`) + 루트 스택(`RootNavigator`)에서 운동 완료를 모달로 표시
- **스타일링**: `StyleSheet` 기반 공통 테마 토큰(`src/theme` — colors/typography/spacing), 4화면 전반에 동일 토큰 적용
- **차트**: `react-native-svg` 커스텀 컴포넌트 — `src/components/charts/LineChart.tsx`(주간 볼륨), `DonutChart.tsx`(부위별 비율)
- **아이콘**: `@expo/vector-icons`의 Ionicons
- **폰트**: `@expo-google-fonts/noto-sans-kr` (Regular/Medium/Bold/Black), `App.tsx`에서 `useFonts`로 로딩 완료 전까지 빈 화면 렌더링
- **상태 관리**: `zustand` (`src/store/useWorkoutStore.ts`) — 세트 체크/추가, 컨디션, 메모를 화면 간 공유. 서버 저장 없음(새로고침 시 초기화)
- **미리보기**: `.claude/launch.json`에 `fitness-app-web` 설정(`npx expo start --web`, 포트 8081) — Claude Code의 브라우저 프리뷰로 확인 가능. 실기기는 Expo Go로 QR 스캔

## 프로젝트 구조

- `src/theme` — 색상/타이포/spacing 토큰
- `src/navigation` — `RootNavigator`(스택), `TabNavigator`(하단 탭), `types.ts`(파라미터 타입)
- `src/screens` — `HomeScreen`, `WorkoutLogScreen`, `StatsScreen`, `CompleteScreen`, `MyScreen`(빈 placeholder)
- `src/components` — `Card`, `PrimaryButton`, `ScreenContainer`, `WeekDots`, `charts/`
- `src/store` — `useWorkoutStore`(zustand)
- `src/data/mockData.ts` — 오늘의 운동, 세트 기록, 주간 진행률, 최근 기록, 통계용 목업 데이터

## 개발 규칙

- 4화면은 하나의 디자인 시스템(색상/타이포/버튼/카드/차트 스타일)으로 일관되게 구성 — 화면마다 스타일을 새로 정의하지 말고 공통 테마/컴포넌트를 재사용
- 실제 서비스 연동(로그인, API, 서버 저장) 범위 아님 — 목업 데이터와 클라이언트 상태로만 구현
- 와이어프레임(`fitness_UI.png`)의 화면 구조·정보 배치·핵심 기능을 임의로 변경하지 않음. 색상·타이포·아이콘·차트 스타일·여백 등 비주얼 디테일만 자유롭게 판단
- `mockData.ts`의 `todayWorkout.exerciseCount`는 `initialExerciseLogs`의 실제 종목 수와 항상 일치시킬 것 — 과거 2종목만 채워둔 채 "5종목"이라 표시해서 운동 완료 화면 합계(총 운동량/세트/칼로리)가 실제보다 작게 나온 적이 있음
- UI/화면 변경 후에는 `.claude/launch.json`의 웹 프리뷰(`fitness-app-web`)로 홈→운동 기록→운동 완료→홈 복귀, 통계 탭까지 실제로 클릭해 확인할 것
