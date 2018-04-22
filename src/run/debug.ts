import { InteractiveCLI } from "../interactive-cli";

export class DebugCLI {
	constructor(private cli = new InteractiveCLI()) {

	}
}

export const DEBUG_CLI = new DebugCLI();