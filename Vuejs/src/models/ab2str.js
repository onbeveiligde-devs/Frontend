
/**
 * arrayBuffer to string
 * @param {ArrayBuffer} buf data to convert
 * @returns {String} converted data
 */
export default function (buf) {
    return String.fromCharCode.apply(null, new Uint16Array(buf));
}
