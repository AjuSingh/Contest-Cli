"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStartAndEndOfDay = void 0;
const date_fns_1 = require("date-fns");
function getStartAndEndOfDay(date = new Date()) {
    // Get the start of the day
    const start = (0, date_fns_1.startOfDay)(date);
    // Get the end of the day
    const end = (0, date_fns_1.endOfDay)(date);
    // Format dates to the required string format (e.g., "2010-11-10T03:07:43")
    const formattedStart = (0, date_fns_1.format)(start, "yyyy-MM-dd'T'HH:mm:ss");
    const formattedEnd = (0, date_fns_1.format)(end, "yyyy-MM-dd'T'HH:mm:ss");
    return { start: formattedStart, end: formattedEnd };
}
exports.getStartAndEndOfDay = getStartAndEndOfDay;
//# sourceMappingURL=time.js.map