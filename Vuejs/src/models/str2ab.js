/**
 * convert string to ArrayBuffer
 * @param {String} str data to convert
 * @returns {ArrayBuffer} converted data
 */
export default function (str) {
    // string to array buffer
    var buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
    var bufView = new Uint16Array(buf);
    for (var i = 0, strLen = str.length; i < strLen; i++) {
        bufView[i] = str.charCodeAt(i);
    }
    return buf;
}
