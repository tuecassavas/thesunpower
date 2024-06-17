"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDistanceGatherThan = exports.isToday = exports.getCurrentUTC = void 0;
const getCurrentUTC = () => new Date(new Date().toLocaleString('en-US', { timeZone: 'UTC' }));
exports.getCurrentUTC = getCurrentUTC;
const isToday = (dateToCheck) => {
    const currentDate = new Date();
    return (dateToCheck.getFullYear() === currentDate.getFullYear() &&
        dateToCheck.getMonth() === currentDate.getMonth() &&
        dateToCheck.getDate() === currentDate.getDate());
};
exports.isToday = isToday;
const isDistanceGatherThan = (dateToCheck, distance) => {
    const currentDate = new Date();
    const differenceInMillis = Math.abs(currentDate.getTime() - dateToCheck.getTime());
    return differenceInMillis > distance;
};
exports.isDistanceGatherThan = isDistanceGatherThan;
