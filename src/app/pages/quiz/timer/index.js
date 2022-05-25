import TimerController from './TimerController';
import TimerView from './TimerView';
import TimerModel from './TimerModel';

export const timerView = new TimerView();
export const timerModel = new TimerModel();
export const timerController = new TimerController(timerModel, timerView);
