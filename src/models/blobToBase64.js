
/**
 * convert blob data to base64
 * @param {*} blob data to convert
 * @param {function} callback callback function
 * @returns {base64} converted data
 */
export default function (blob, callback) {
    console.log("blob to base64");
    var reader = new FileReader();
    reader.onload = function () {
        var dataUrl = reader.result;
        var base64 = dataUrl.split(",")[2];

        if (base64 == null) {
            base64 = dataUrl.split(",")[1];
        }

        callback(base64);
    };
    reader.readAsDataURL(blob);
}
