import { Menu } from "../menu";
import { widget } from 'blessed';
import { SAIL_BOAT } from "../ascii-art/sail-boat";
import { SYNC_APPARATUS_FIGLET } from "../ascii-art/sync-apparatus-figlet";
import { InteractiveCLI } from "../interactive-cli";

export class WelcomeMenu extends Menu {
	private banner: boolean = true;

	constructor(cli: InteractiveCLI) {
		super(cli);

		let boat = new widget.Text({
			top: 1,
			left: "center",
			width: "shrink",
			height: "shrink"
		});
		boat.setText(SAIL_BOAT)
		this.addWidget("boat", boat);

		let figlet = new widget.Text({
			bottom: 0,
			left: "center",
			width: 78,
			height: "shrink",
			fg: "blue"
		})
		figlet.setText(SYNC_APPARATUS_FIGLET);
		this.addWidget("figlet", figlet);

		let continueBanner = new widget.Text({
			bottom: 7,
			left: "center",
			width: "shrink",
			height: "shrink",
			border: "line",
			fg: "blue"
		});
		continueBanner.setText(" Press enter to continue ");
		this.addWidget("continueBanner", continueBanner);

		this.cli.key(["enter"], () => {
			
		});
	}
}