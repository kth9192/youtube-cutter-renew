# youtube-cutter-renew
유튜브 영상의 특정 구간 저장 및 반복 재생 서비스를 제공하는 사이드 프로젝트

원본은 구글 계정으로 관리 되는 서비스이지만, 포트폴리오 공개 버전이기 때문에 가계정으로 운영된다.

- 로그인을 하면 임시 계정이 생성(로그인 => 임시 아이디 생성 / 로그아웃 => 계정 삭제)
- 원하는 영상의 링크를 집어 넣으면 영상이 세팅된다. 특정 시간대 영상 링크를 넣으면 그 지점부터 시작
- 앞뒤 시간 지점을 조정후 저장을 하면 부분적으로 링크가 저장되며 구간 반복할 수 있다.

## 링크
https://youtube-cutter-renew.vercel.app/

## 사용기술
- NEXTJS13
- axios
- SWR
- NEXT-AUTH
- Zustand
- Prisma
- PlanetScale
- React-player

 
## 프로젝트 구조
```
youtube-cutter-renew
├─ .eslintrc.json
├─ .gitignore
├─ app
│  ├─ api // api route
│  │  ├─ auth
│  │  │  ├─ clean // 임시 회원 삭제
│  │  │  │  └─ route.ts
│  │  │  └─ [...nextauth] // 임시 회원 로그인
│  │  │     └─ route.ts
│  │  └─ video // 비디오 관련 api
│  │     ├─ route.ts
│  │     └─ [id]
│  │        └─ route.ts
│  ├─ auth // 커스텀 로그인 페이지
│  │  └─ signin
│  │     └─ page.tsx
│  ├─ authSession.tsx
│  ├─ favicon.ico
│  ├─ globals.css
│  ├─ layout.tsx
│  ├─ loading.tsx
│  ├─ page.tsx // 메인 페이지
│  └─ swrProvider.tsx
├─ components // 공통 컴포넌트
│  ├─ header.tsx
│  ├─ player.tsx
│  └─ slider.tsx
├─ interface
│  └─ video.ts
├─ libs
│  ├─ client
│  │  ├─ user.ts
│  │  └─ video.ts
│  └─ server
│     └─ client.ts
├─ next.config.js
├─ package.json
├─ postcss.config.js
├─ prisma // prisma 설정
│  └─ schema.prisma
├─ public
│  ├─ clip.png
│  ├─ cut.png
│  ├─ next.svg
│  ├─ vercel.svg
│  └─ youtube-logo.png
├─ README.md
├─ shared // 공통 리소스 (상태 관리 등)
│  ├─ instance.ts
│  ├─ store
│  │  └─ globlaStore.ts
│  └─ utils.ts
├─ tailwind.config.js
├─ test.html
├─ tsconfig.json
└─ yarn.lock

```
