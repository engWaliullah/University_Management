import { TSchedule } from './OfferedCourse.interface';


export const hasTimeConflict = (assignSchedules : TSchedule[], newSchedule : TSchedule ) => {

    for (const schedule of assignSchedules) {
        const existingStartTime = new Date(`1971-01-01T${schedule.startTime}:00`);
        const existingEndTime = new Date(`1971-01-01T${schedule.endTime}:00`);
        const newStartTime = new Date(`1971-01-01T${newSchedule.startTime}:00`);
        const newEndTime = new Date(`1971-01-01T${newSchedule.endTime}:00`);
        
        if (newStartTime < existingEndTime && newEndTime > existingStartTime) {
         return true
        }
    }
      return false
}


