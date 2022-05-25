import PopupController from './PopupController';
import PopupView from './PopupView';
import PopupModel from './PopupModel';

export const popupView = new PopupView();
export const popupModel = new PopupModel();
export const popupController = new PopupController(popupModel, popupView);
