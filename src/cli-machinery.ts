import { DaemonMachine } from "./machinery/daemon-machine";

export class CLIMachinery {
	private static instance: CLIMachinery = new CLIMachinery();
	public static getInstance(): CLIMachinery { return CLIMachinery.instance; }

	private _daemonMachine = new DaemonMachine();
	public get daemonMachine(): DaemonMachine { return this._daemonMachine; }

	private constructor() {

	}
}