import { Menu } from "../menu";
import { InteractiveCLI } from "../interactive-cli";
import { widget } from 'blessed';
import { DemonWidget } from "../widgets/demon.widget";
import { ComputerWidget } from "../widgets/computer.widget";

export class MainMenu extends Menu {
	constructor(cli: InteractiveCLI) {
		super(cli);

		let demonWidget = new DemonWidget({
			width: "50%",
			height: "100%",
			left: 0,
			top: 0,
		});
		demonWidget.setText("Daemon");

		let computerWidget = new ComputerWidget({
			width: "50%",
			height: "100%",
			left: "50%",
			top: 0,
		});

		let statusRow = new widget.Box({
			width: "100%",
			height: "25%",
			left: 0,
			top: 0
		});
		statusRow.append(demonWidget);
		statusRow.append(computerWidget);

		this.addWidget("statusRow", statusRow);
	}
}