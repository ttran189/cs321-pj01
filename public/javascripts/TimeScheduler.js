/**
 * Time Scheduler
 * @author: Trung Tran
 * @class:  TimeScheduler Class
 * @summary: Used for managing time input from users
 */

class TimeScheduler {
    /**
     * Create a TimeScheduler Object
     * @param {int} session time period of a slot (minutes)
     */
    constructor(session) {
        this.hour = 0;
        this.minute = 0;
        this.shift = "";
        this.hourEnd = 0;
        this.minuteEnd = 0;
        this.shiftEnd = "";
        this.slotID = 0;
        this.session = session;
    }

    /**
     * Convert hour, minute, and shift to a time slotID.
     * @param hour hour from input
     * @param minute minute from input
     * @param shift hour += 12 if PM
     */
    slotifty(hour, minute, shift) {
        if (hour < 0 || hour > 23 || minute < 0 || minute > (60 - this.session) || (shift !== "AM" && shift !== "PM")) {
            console.log("Invalid hour/minute/shift, this class won't work as expected");
            console.log("hour: " + hour + " minute: " + minute + " shift: " + shift);
        }

        if (shift === "PM" && hour !== 12) {
            hour += 12;
        } else if (shift === "AM" && hour === 12) {
            hour = 0;
        }

        this.hour = hour;
        this.minute = minute;
        this.shift = shift;
        let totalMinute = 60 * hour + minute;
        this.slotID = (totalMinute + this.session) / this.session;

        this.getShiftEnd();

        return this.slotID;
    }

    /**
     * Get slotIDs between 2 obj.
     * @param timeSchedulerObj another object of this class
     */
    getInterval(timeSchedulerObj) {
        let begin = this.slotID;
        let end = timeSchedulerObj.slotID - 1;
        let interval = [];

        if (end < begin) {
            console.log("Invalid time!");
            return;
        } else {
            for (let i = begin; i <= end; i++) {
                interval.push(i);
            }
        }
        return interval;
    }

    timeIntervalToString(timeSchedulerObj) {
        let interval = this.getInterval(timeSchedulerObj);
        if (interval.length === 0)
            return "";
        //console.log(interval);
        let lastObj = new TimeScheduler(this.session);
        let slotEndID = interval[interval.length - 1];
        lastObj.parse(slotEndID);
        //console.log(lastObj);
        return "From " + this.toString(1) + " To " + lastObj.toString(2);
    }

    /**
     * Calculate endtime of slot ID.
     */
    getShiftEnd() {
        if (this.minute === (60 - this.session)) {
            this.hourEnd = this.hour + 1;
            this.minuteEnd = 0;
        } else {
            this.hourEnd = this.hour;
            this.minuteEnd = this.minute + this.session;
        }

        if (this.hourEnd > 12)
            this.shiftEnd = "PM";
        else
            this.shiftEnd = "AM";

        if (this.hourEnd === 24) {
            this.hourEnd = 0;
            this.shiftEnd = "AM";
        }
    }

    /**
     * Convert slot ID to actual time.
     * @param {*} slotID Input slot ID
     */
    parse(slotID) {
        if (slotID < 1 || slotID > ((60 * 24) / this.session)) {
            console.log("Invalid Slot ID, this class won't work as expected");
            console.log("Slot Input ID: " + slotID);
        }

        this.slotID = slotID;
        let totalMinute = (slotID - 1) * this.session;

        if (this.slotID > (60 / this.session)) {
            this.hour = Math.floor(totalMinute / 60);
            this.minute = totalMinute % 60;
        } else {
            this.hour = 0;
            this.minute = totalMinute;
        }

        if (this.hour > 12)
            this.shift = "PM";
        else
            this.shift = "AM";

        this.getShiftEnd();

        return this;
    }

    /**
     * Print this object
     * @param {int} format how we want to print it
     * - 1: 00:00 AM (start time)
     * - 2: 00:00 AM (end time)
     * - 3: From 00:00 AM to 00:00 AM (period)
     * - 4: slot ID 
     */
    toString(format) {
        let timeString = "";
        let hour = "";
        let minute = "";
        switch (format) {
            case 1:
                if (this.hour < 10)
                    hour = "0" + this.hour;
                else
                    hour = this.hour;

                if (this.minute < 10)
                    minute = "0" + this.minute;
                else
                    minute = this.minute;
                timeString = hour + ":" + minute;
                break;
            case 2:
                if (this.hourEnd < 10)
                    hour = "0" + this.hourEnd;
                else
                    hour = this.hourEnd;

                if (this.minuteEnd < 10)
                    minute = "0" + this.minuteEnd;
                else
                    minute = this.minuteEnd;
                timeString = hour + ":" + minute;
                break;
            case 3:
                let tmp1 = this.toString(1);
                let tmp2 = this.toString(2);
                timeString = "From " + tmp1 + " To " + tmp2;
                break;
            case 4:
                timeString = "Time Slot ID: " + this.slotID;
                break;
            default:
        }
        return timeString;
    }
}