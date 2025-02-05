var map = new naver.maps.Map('map', {
    center: new naver.maps.LatLng(37.3595704, 127.105399),
    zoom: 10
    
});
window.navermap_authFailure = function () {
   console.error("지도 로드 실패")
}