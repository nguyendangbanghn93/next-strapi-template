// module.exports.language = {
//   languages: ["vi", "en"],
//   languageDefault: "vi",
//   setLanguage(arrayLanguage) {
//     if (Array.isArray(arrayLanguage)) this.languages = arrayLanguage;
//   },
//   set(lang) {
//     if (typeof lang === "string") this.languageDefault = lang;
//   },
//   get(entity, lang) {
//     let data;
//     const convert = (entity) => {
//       if (entity && typeof entity === "object") {
//         entity = entity?.toJSON?.() || entity;

//         for (const key in entity) {
//           const val = entity[key];
//           let newKey = key;
//           if (this.languages?.find((l) => String(key)?.endsWith("_" + l))) {
//             delete entity[key];

//             const lang = key?.split("_")?.pop();

//             if (lang === lang || this.languageDefault) {
//               newKey = key.replace("_" + lang, "");
//               entity[newKey] = val;
//             }
//           }
//           if (val && typeof val === "object" && Object.keys(val).length) {
//             convert(entity[key]);
//           }
//         }
//       }
//     };
//     convert(entity);

//     return entity;
//   },
// };
