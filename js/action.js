(function () {

  var head = document.head;
  ["https://i.postimg.cc","https://server.domainaku.com"].forEach(function (origin) {
    var preconnect = document.createElement("link");
    preconnect.rel = "preconnect";
    preconnect.href = origin;
    preconnect.crossOrigin = "";
    head.appendChild(preconnect);

    var dns = document.createElement("link");
    dns.rel = "dns-prefetch";
    dns.href = origin;
    head.appendChild(dns);
  });

  var preload = document.createElement("link");
  preload.rel = "preload";
  preload.as = "image";
  preload.href = "https://server.domainaku.com/uploads/planet88/mobile/new/download-home.webp";
  head.appendChild(preload);

  var style = document.createElement("style");
  style.textContent = `
    #extraIcons{
      width:65px !important; position:fixed !important; top:70px; left:0;
      overflow:hidden; max-height:0; transition:max-height .4s ease-out;
      background:#000000c4; border-radius:6px; box-shadow:0 3px 6px rgba(0,0,0,.2);
      z-index:9999; margin:0; padding:8px 10px; list-style:none;
      visibility:hidden;
    }
    #extraIcons.open{ max-height:600px; visibility:visible; }
    #extraIcons > li{ margin:6px 0; }
    #extraIcons img{ width:100px !important; height:auto !important; }
    #quickActions{ position:relative; z-index:100000; }
  `;
  head.appendChild(style);

  var host = window.location.hostname;

  var isPlanet88 = (host === "planet-88.net");

  var hideApkLink = (
    host === "app.planet-88.org" ||
    host === "app2.planet-88.org"
  );

  var mainHTML =
    '<div id="quickActions">'+
      '<ul style="list-style:none;padding:0;margin:0">'+
        '<li>'+
          '<a href="javascript:void(0)" id="mainIcon" style="line-height:0;display:inline-block;">'+
            '<img src="https://server.domainaku.com/uploads/planet88/mobile/new/download-home.webp" width="50" height="50">'+
          '</a>'+
        '</li>'+
      '</ul>'+
      '<ul id="extraIcons">'+
        '<li><a href="https://www.facebook.com/groups/1362789254442747" target="_blank"><img src="https://i.postimg.cc/PJWPkCQr/fbbbbb.png"></a></li>'+
        '<li><a href="https://www.instagram.com/planet88.official/" target="_blank"><img src="https://i.postimg.cc/brcsMxbB/instagrama.png"></a></li>'+
        '<li><a href="https://spin-planet88.linkevent-one.com/" target="_blank"><img src="https://server.domainaku.com/uploads/planet88/mobile/new/luckywheel.webp"></a></li>'+
        '<li><a href="https://doodviral.app/" target="_blank"><img src="https://server.domainaku.com/uploads/planet88/mobile/mysterybox.webp"></a></li>'+
        '<li><a href="https://wa.me/+6282146356595" target="_blank"><img src="https://i.postimg.cc/wvs10ftN/Whats-AP1-P.png"></a></li>'+

        (hideApkLink ? '' :
          '<li><a href="'+(isPlanet88?'/download':'javascript:void(0)')+'" class="apkLink">'+
            '<img src="https://server.domainaku.com/uploads/planet88/mobile/download-apk.webp">'+
          '</a></li>'
        )+

      '</ul>'+
    '</div>';


  var modalHTML =
    '<div id="customModal" style="display:none; position:fixed; z-index:100000; left:0; top:0; width:100%; height:100%; background:rgba(0,0,0,.6);">'+
      '<div style="background:white;width:90%;max-width:680px;padding:20px;border-radius:10px;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);">'+
        '<span id="closeModal" style="position:absolute;top:0;right:15px;font-size:40px;cursor:pointer;color:red;">×</span>'+
        '<h3 style="color:black;text-align:center;font-size:2rem;font-weight:bold;margin:12px 0 8px;">Informasi APK</h3>'+
        '<p style="color:black;margin:0 0 10px;">Silakan download aplikasi PLANET88 versi terbaru.</p>'+
        '<a href="https://server.domainaku.com/aplikasi/Planet88.apk" class="btn btn-join" style="width:100%">DOWNLOAD APK</a>'+
        '<a href="https://server.domainaku.com/aplikasi/Planet88.apk">'+
          '<img src="https://server.domainaku.com/uploads/planet88/mobile/ai.webp" alt="Banner APK" style="width:100%;margin-top:10px;border-radius:8px;display:block;">'+
        '</a>'+
      '</div>'+
    '</div>';

  function mountNow() {
    if (document.getElementById("quickActions")) return;
    var target = document.querySelector(".brand-logo");
    if (!target) return;
    target.insertAdjacentHTML("beforebegin", mainHTML);
    document.body.insertAdjacentHTML("beforeend", modalHTML);
  }

  if (document.readyState !== "loading") mountNow();
  else document.addEventListener("readystatechange", function rs(){
    if (document.readyState === "interactive") {
      document.removeEventListener("readystatechange", rs);
      mountNow();
    }
  });

  function openModal(){ document.getElementById("customModal").style.display="block"; }
  function closeModal(){ document.getElementById("customModal").style.display="none"; }

  document.addEventListener("click", function (e) {
    var main = e.target.closest("#mainIcon");
    if (main) {
      e.preventDefault();
      document.getElementById("extraIcons").classList.toggle("open");
      return;
    }

    var apk = e.target.closest(".apkLink");
    if (apk && !isPlanet88) { e.preventDefault(); openModal(); }

    if (e.target.id === "closeModal" || e.target.id === "customModal") closeModal();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeModal();
  });

})();