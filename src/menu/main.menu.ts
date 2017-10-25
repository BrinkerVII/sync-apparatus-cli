import { Menu } from "../menu";
import { InteractiveCLI } from "../interactive-cli";
import { widget } from 'blessed';
import { DemonWidget } from "../widgets/demon.widget";
import { ComputerWidget } from "../widgets/computer.widget";
import { CLIMachinery } from "../cli-machinery";

export class MainMenu extends Menu {
	private demonWidget: DemonWidget;

	constructor(cli: InteractiveCLI) {
		super(cli);

		this.demonWidget = new DemonWidget({
			width: "50%",
			height: "100%",
			left: 0,
			top: 0,
		});
		this.demonWidget.setText("Daemon");

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
		statusRow.append(this.demonWidget);
		statusRow.append(computerWidget);

		this.addWidget("statusRow", statusRow);
	}

	public run() {
		setTimeout(() => {
			this.demonWidget.setText("Probing daemon...");
			this.cli.render();
			CLIMachinery.getInstance().daemonMachine.probeDaemon()
				.then(() => {
					this.demonWidget.setText("Found daemon...")
					this.cli.render();
				})
				.catch(() => {
					this.demonWidget.setText("No daemon found...")
					this.cli.render();
				});
		}, 1000); // Make it so it looks like its doing something
	}
}