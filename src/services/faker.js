const userNames = [
  "scorpion",
  "liukang",
  "sonya",
  "noobsaibot",
  "shaokhan",
  "kunglao",
  "subzero",
  "samsung",
  "kitana"
];
const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

function getRN(min = 0, max = 0) {
  return Math.floor(Math.random() * (max - min) + min);
}

export default {
  generateUsername: function() {
    return `${userNames[getRN(0, userNames.length - 1)]}${getRN(1980, 2000)}`;
  },
  generatePassword: function(length = 8) {
    let result = "";
    for (var i = 0, n = chars.length; i < length; ++i) {
      result += chars.charAt(getRN(0, n));
    }
    return result;
  },
};
