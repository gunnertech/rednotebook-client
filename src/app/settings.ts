export class Settings {
   public static get API_ENDPOINT(): string { return 'http://127.0.0.1:6666/api/'; }
   public static get VALID_ACCOUNT_STATUSES(): string[] { return ['active','live']; }
   // public static get VALID_ACCOUNT_STATUSES(): string[] { return ['active','in_trial','live']; }
}