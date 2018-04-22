import { widget, Widgets } from 'blessed';
import { ArtWidget } from './art.widget';
import { COMPUTER } from '../ascii-art/computer';

export class ComputerWidget extends ArtWidget {
	constructor(options: Widgets.BoxOptions) {
		options["artColor"] = "blue";
		super(options);

		this.setArt(COMPUTER);
		this.setText("Client");
	}
}