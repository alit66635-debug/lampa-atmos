(function () {
    'use strict';

    function start() {
        if (!window.Lampa || !Lampa.Listener) return;

        Lampa.Listener.follow('torrent', function (data) {
            if (!data || data.type !== 'render' || !data.element) return;

            var e = data.element;

            try {
                var text = JSON.stringify(e, function (k, v) {
                    if (k === 'item' || k === 'target') return undefined;
                    if (typeof v === 'function') return undefined;
                    return v;
                }, 2);

                var old = document.getElementById('atmos-debug');
                if (old) old.remove();

                var box = document.createElement('pre');
                box.id = 'atmos-debug';

                box.style.cssText =
                    'position:fixed;z-index:999999;' +
                    'left:2%;right:2%;top:3%;bottom:3%;' +
                    'overflow:auto;padding:20px;' +
                    'background:#111;color:#fff;' +
                    'font-size:14px;white-space:pre-wrap;' +
                    'font-family:monospace;';

                box.textContent = text;

                document.body.appendChild(box);
            } catch (err) {
                console.log('ATMOS DEBUG ERROR', err);
            }
        });
    }

    if (window.Lampa && Lampa.Listener) {
        start();
    } else {
        setTimeout(start, 3000);
    }
})();
