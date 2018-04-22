import * as request from 'request-promise';
import { UrlOptions } from 'request';
import { Daemon } from 'sync-apparatus-daemon';

export class DaemonMachine {
	private probing: boolean = false;
	private _daemon: Daemon
	public get daemon(): Daemon { return this._daemon }

	constructor(private connectionString = "http://localhost:3000") {

	}

	public probeDaemon(): Promise<void> {
		let options: UrlOptions = {
			url: this.connectionString + "/hello"
		}

		this.probing = true;
		return new Promise<void>((resolve, reject) => {
			request(options)
				.then(response => {
					this.probing = false;
					resolve();
				})
				.catch((err) => {
					this.probing = false;
					reject(err);
				});
		});
	}

	public instanceDaemon(): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			let instance = () => {
				try {
					this._daemon = new Daemon();
					resolve();
				} catch (e) {
					reject(new Error(e));
				}
			}

			if (this.probing) {
				let timer = setInterval(() => {
					if (!this.probing) {
						clearInterval(timer);
						instance();
					}
				}, 100);
			} else { instance(); }
		});
	}
}