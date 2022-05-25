import SettingsPageController from './SettingsPageController';
import SettingsPageView from './SettingsPageView';
import SettingsPageModel from './SettingsPageModel';

export const settingsPageView = new SettingsPageView();
export const settingsPageModel = new SettingsPageModel();
export const settingsPageController = new SettingsPageController(
  settingsPageModel,
  settingsPageView
);
