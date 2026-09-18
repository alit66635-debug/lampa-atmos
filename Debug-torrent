(function () {
    'use strict';

    function esc(s) {
        return String(s)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    }

    function dump(obj) {
        var seen = [];

        try {
            return JSON.stringify(obj, function (key, value) {
                if (typeof value === 'object' && value !== null) {
                    if (seen.indexOf(value) >= 0) return '[CIRCULAR]';
                    seen.push(value);
                }

                // Не тащим DOM/jQuery в JSON
                if (key === 'item' || key === 'target') return undefined;

                return value;
            }, 2);
        } catch (e) {
            return 'JSON ERROR: ' + e;
        }
    }

    function show(element) {
        try {
            var old = document.getElementById('atmos-debug-box
