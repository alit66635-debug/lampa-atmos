(function () {
    'use strict';

    function show(text) {
        var old = document.getElementById('atmos-debug');
        if (old) old.remove();

        var box = document.createElement('pre');

        box.id = 'atmos-debug';

        box.style.cssText =
            'position:fixed;' +
            'z-index:999999;' +
            'left:2%;top:2%;' +
            'width:96%;height:96%;' +
            'box-sizing:border-box;' +
            'padding:20px;' +
            'overflow:auto;' +
            'background:#111;color:#fff;' +
            'font-size:14px;line-height:1.4;' +
            'white-space:pre-wrap;';

        box.textContent = text;

        document.body.appendChild(box);
    }

    function start() {
        if (!window.Lampa || !Lampa.Listener) {
            setTimeout(start, 1000);
            return;
        }

        show('ATMOS DEBUG LOADED\n\nЖду событие torrent...');

        Lampa.Listener.follow('torrent', function (data) {
            if (!data) return;

            if (data.type === 'render' && data.element) {
                try {
                    show(
                        'ATMOS DEBUG: TORRENT RENDER\n\n' +
                        JSON.stringify(data.element, function (key, value) {
                            if (key === 'item') return undefined;
                            if (typeof value === 'function') return undefined;
                            return value;
                        }, 2)
                    );
                } catch (e) {
                    show('JSON ERROR:\n' + e);
                }
            }
        });
    }

    start();

})();
