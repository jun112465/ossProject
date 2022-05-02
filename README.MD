# ossProject
Repository for OSS Project

# 로그인 및 회원기능

1. kakaoSDK를 이용해 개발 진행
2. kakao에 로그인 요청을 보내면 token을 받는다
3. token의 정확한 사용법을 아직 잘 모르겠어서 일단은 스마트폰 내에 accessToken, refreshToken만 저장
4. 서버에 카카오에서 제공해준 profile 정보(id, nickname)를 기반으로 회원이면 회원정보 반환, 아니면 회원 db에 정보 추가 후 회원정보 반환
5. 로그인 진행완료 후 메인 화면으로 navigate
6. 어플 실행 초기에 로그인 상태라면 바로 메인화면으로 navigate

kakao login 기능은 현재 ios에서만 적용가능
귀찮아서 아직 안드로이드 버전 체크를 하지 못했다.

## 무한스크롤 작동방식
1. 최초에 20개의 글 호출
2. 최하단으로 스크롤 시 20개씩 호출

## 게시글 읽기 
게시글의 id를 get 방식으로 호출해서 
데이터 얻어오기


