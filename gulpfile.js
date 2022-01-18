/** 
 * gulp --tasks .  // получить список всех заданных задач
*/
const gulp = require('gulp');

const requireDir = require('require-dir'); // использовать модули в отдельных файлах
const tasks = requireDir('./tasks');       // прописываем путь к директории, в которую будем складывать модули



exports.hello = tasks.hello;




