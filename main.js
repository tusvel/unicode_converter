var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var Unicode = /** @class */ (function () {
    function Unicode() {
        if (Unicode.instance) {
            return Unicode.instance;
        }
        Unicode.instance = this;
    }
    Unicode.prototype.get = function (str) {
        var e_1, _a;
        // Array or char points.
        var values = [];
        try {
            // Iterate for each char and get its number.
            for (var str_1 = __values(str), str_1_1 = str_1.next(); !str_1_1.done; str_1_1 = str_1.next()) {
                var char = str_1_1.value;
                // Get Unicode point
                var point = char.codePointAt(0).toString(16);
                // Get unicode block
                var zeroes_in_block = 0;
                if (point.length < 4) {
                    zeroes_in_block = 4 - point.length;
                }
                values.push("U+" + "0".repeat(zeroes_in_block) + point);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (str_1_1 && !str_1_1.done && (_a = str_1.return)) _a.call(str_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return values;
    };
    return Unicode;
}());
var UTF8 = /** @class */ (function () {
    function UTF8() {
        this.textEncoder = new TextEncoder();
        if (UTF8.instance) {
            return UTF8.instance;
        }
        UTF8.instance = this;
    }
    UTF8.prototype.code = function (str) {
        var e_2, _a, e_3, _b;
        var result = [];
        try {
            for (var str_2 = __values(str), str_2_1 = str_2.next(); !str_2_1.done; str_2_1 = str_2.next()) {
                var char = str_2_1.value;
                var arr = this.textEncoder.encode(char);
                try {
                    for (var arr_1 = (e_3 = void 0, __values(arr)), arr_1_1 = arr_1.next(); !arr_1_1.done; arr_1_1 = arr_1.next()) {
                        var binary = arr_1_1.value;
                        result.push(binary.toString(2));
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (arr_1_1 && !arr_1_1.done && (_b = arr_1.return)) _b.call(arr_1);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (str_2_1 && !str_2_1.done && (_a = str_2.return)) _a.call(str_2);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return result;
    };
    return UTF8;
}());
var Data = /** @class */ (function () {
    function Data() {
        this.unicode = new Unicode();
        this.utf8 = new UTF8();
    }
    Data.prototype.setText = function (text) {
        this.text = text;
    };
    Data.prototype.getUnicode = function () {
        return this.unicode.get(this.text);
    };
    Data.prototype.getUTF8 = function () {
        return this.utf8.code(this.text);
    };
    return Data;
}());
var data = new Data();
var input = document.getElementById('input');
var unicode = document.getElementById('unicode');
var utf8 = document.getElementById('utf8');
input.addEventListener('keyup', function () {
    data.setText(input.value);
    unicode.innerText = data.getUnicode().join(', ');
    utf8.innerText = data.getUTF8().join(' ');
});
