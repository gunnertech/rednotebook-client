export class Settings {
// TODO: This is horrible - but works until we get a build system
public static get API_ENDPOINT(): string { return window.location.hostname == 'localhost' ? 'http://127.0.0.1:6666/api' : 'https://rednotebook.herokuapp.com/api' }
   public static get VALID_ACCOUNT_STATUSES(): string[] { return ['active','live']; }
   // public static get VALID_ACCOUNT_STATUSES(): string[] { return ['active','in_trial','live']; }
}
