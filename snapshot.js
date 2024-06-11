var image = document.querySelector('#snap');
var take_photo_btn = document.querySelector('#take-photo');
var delete_photo_btn = document.querySelector('#delete-photo');
var download_photo_btn = document.querySelector('#download-photo');
    
// スナップショットボタン
take_photo_btn.addEventListener("click", function (e) {
  e.preventDefault();
  var video = document.querySelector('video');
  var snap = takeSnapshot(video);
    
  // スナップショット表示.
  image.setAttribute('src', snap);
  image.classList.add('visible');
    
  // 削除ボタンと保存ボタン有効
  delete_photo_btn.classList.remove("disabled");
  download_photo_btn.classList.remove("disabled");
    
  // 保存ボタンにスナップショットを渡す
  download_photo_btn.href = snap;
});
    
// 削除ボタン
delete_photo_btn.addEventListener("click", function(e){
    
  e.preventDefault();
    
  // スナップショットを隠す
  image.setAttribute('src', "");
  image.classList.remove("visible");
    
  // 削除ボタンと保存ボタン無効
  delete_photo_btn.classList.add("disabled");
  download_photo_btn.classList.add("disabled");
    
});
    
// スナップショットを撮る
function takeSnapshot(video) {
  var resizedCanvas = document.createElement("canvas");
  var resizedContext = resizedCanvas.getContext("2d");
  var width = video.videoWidth;
  var height = video.videoHeight;
  var aScene = document.querySelector("a-scene").components.screenshot.getCanvas("perspective");
    
  if (width && height) {
    // videoのサイズをキャンバスにセット
    resizedCanvas.width = width;
    resizedCanvas.height = height;

    // キャンバスにvideoをコピー
    resizedContext.drawImage(video, 0, 0, width, height);
    
    // カメラの画角でAR側の縮小処理を変える
    if (width > height) {
      // 横長 (PC)
      resizedContext.drawImage(aScene, 0, 0, width, height);
    } else {
      // 縦長 (スマホ)
      var scale = height / width;
      var scaledWidth = height * scale;
      var marginLeft = (width - scaledWidth) / 2;
      resizedContext.drawImage(aScene, marginLeft, 0, scaledWidth, height);
    }
    return resizedCanvas.toDataURL('image/png');
  }
}
