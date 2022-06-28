import schedule from 'node-schedule';

type TCreateScheduler = {
  date: Date;
  message: {
    title: string;
    body: string;
  };
  callback?: () => void;
};

export const creatSchedulerWithFCM = (props: TCreateScheduler) => {
  return new Promise<boolean>((resolve, reject) => {
    try {
      schedule.scheduleJob(props.date, () => {
        try {
          if (props.callback) props.callback();
          resolve(true);
        } catch (e) {
          resolve(false);
          reject(e);
        }
      });
    } catch (e) {
      resolve(false);
      reject(e);
    }
  });
};

type TDeleteScheduler = {
  targetId: string;
};

export const deleteScheduler = (props: TDeleteScheduler) => {
  return new Promise<boolean>((resolve, reject) => {
    try {
      resolve(schedule.cancelJob(props.targetId));
    } catch (e) {
      reject(e);
    }
  });
};
