(function () {
    'use strict';

    if (!window.Lampa || !Lampa.Listener) return;

    Lampa.Listener.follow('torrent', function (data) {

        if (!data || data.type !== 'render') return;
        if (!data.element) return;

        try {
            var e = data.element;

            var text = JSON.stringify(e, function (key, value) {
                if (key === 'item') return undefined;
                if (typeof value === 'function') return undefined;
                return value;
            }, 2);

            var old = document.getElementById('atmos-debug');
            if (old) old.remove();

            var box = document.createElement('pre');

            box.id = 'atmos-debug';

            box.style.cssText =
                'position:fixed;' +
                'z-index:999999;' +
                'left:2%;' +
                'top:2%;' +
                'width:96%;' +
                'height:96%;' +
                'box-sizing:border-box;' +
                'padding:20px;' +
                'overflow:auto;' +
                'background:#111;' +
                'color:#fff;' +
                'font-size:13px;' +
                'line-height:1.4;' +
                'white-space:pre-wrap;' +
                'font-family:monospace;';

            box.textContent = text;

            document.body.appendChild(box);

        } catch (err) {
            console.log('ATMOS DEBUG:', err);
        }
    });

})();
