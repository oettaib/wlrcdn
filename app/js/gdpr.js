(function() {
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

        cookiesOk.addEventListener("click", function() {
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

    var collapseElements = document.querySelectorAll('[data-toggle="collapse"]');
    var CLASS_SHOW = 'visible-menu';
    var CLASS_COLLAPSE = 'collapse';
    var CLASS_COLLAPSING = 'collapsing';
    var CLASS_COLLAPSED = 'collapsed';
    var ANIMATION_TIME = 350; // 0.35s

    function handleCollapseElementClick(e) {
        var el = e.currentTarget;
        var collapseTargetId = el.dataset.target || el.href || null;
        if (collapseTargetId) {
            var targetEl = document.querySelector(collapseTargetId);
            var isShown = targetEl.classList.contains(CLASS_SHOW) || targetEl.classList.contains(CLASS_COLLAPSING);
            if (!isShown) {
                targetEl.classList.remove(CLASS_COLLAPSE);
                targetEl.classList.add(CLASS_COLLAPSING);
                targetEl.style.height = 0
                targetEl.classList.remove(CLASS_COLLAPSED);
                setTimeout(function() {
                    targetEl.classList.remove(CLASS_COLLAPSING);
                    targetEl.classList.add(CLASS_COLLAPSE, CLASS_SHOW);
                    targetEl.style.height = '';
                }, ANIMATION_TIME)
                targetEl.style.height = targetEl.scrollHeight + 'px';
            } else {
                targetEl.style.height = targetEl.getBoundingClientRect().height + 'px';
                targetEl.offsetHeight;
                targetEl.classList.add(CLASS_COLLAPSING);
                targetEl.classList.remove(CLASS_COLLAPSE, CLASS_SHOW);
                targetEl.style.height = '';
                setTimeout(function() {
                    targetEl.classList.remove(CLASS_COLLAPSING);
                    targetEl.classList.add(CLASS_COLLAPSE);
                }, ANIMATION_TIME);
            }
        }
    }

    collapseElements.forEach(function(el) {
        el.addEventListener('click', handleCollapseElementClick)
    })
})();