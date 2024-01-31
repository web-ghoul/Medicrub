"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaxDateTime = exports.RemoveDateTime = void 0;
const RemoveDateTime = (date) => {
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getFullYear();
    const today = yyyy + '-' + mm + '-' + dd + 'T00:00:00.003+00:00';
    return today;
};
exports.RemoveDateTime = RemoveDateTime;
const MaxDateTime = (date) => {
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getFullYear();
    const today = yyyy + '-' + mm + '-' + dd + 'T23:59:59.003+00:00';
    return today;
};
exports.MaxDateTime = MaxDateTime;
