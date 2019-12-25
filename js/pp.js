(function () {
    "use strict";
    var pp = setTimeout(function() { 
        var a = '.AccCoo';
        var b = 'AccCoo';
    
        var gdprDlg = document.querySelector(".AccCooAlert");
        var cookiesOk = document.querySelector(a);
    
        if (!gdprDlg) {
            return;
        }
    
        gdprDlg.offsetHeight;
    
        if (!GC(b)) {
            gdprDlg.classList.add("show");
        }
    
        cookiesOk.addEventListener("click", function () {
            SC(b, true, 365);
            gdprDlg.classList.remove("show");
        });
    
        // Cookie functions from w3schools
        function SC(h, j, k) {
            var k = new Date();
            k.setTime(k.getTime() + (k * 24 * 60 * 60000));
            document.cookie = h + "=" + j + ";" + ("expires=" + k.toUTCString()) + ";path=/";
        }
    
        function GC(cc) {
            var nn = cc + "=";
            var dcc = decodeURIComponent(document.cookie);
            var ca = dcc.split(';');
            for (var i = 0; i < ca.length; i++) {
                var cd = ca[i];
                while (cd.charAt(0) === ' ') {
                    cd = cd.substring(1);
                }
                if (cd.indexOf(nn) === 0) {
                    return cd.substring(nn.length, cd.length);
                }
            }
            return "";
        }
    }, 2000); 

   
})();
