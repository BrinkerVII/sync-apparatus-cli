import { widget, Widgets } from 'blessed';
import { TINY_DEMON } from '../ascii-art/tiny-demon';
import { ArtWidget } from './art.widget';

export class DemonWidget extends ArtWidget {
	constructor(options: Widgets.BoxOptions) {
		options["artColor"] = "red";
		super(options);

		this.setArt(TINY_DEMON);
		this.setText("Demon");
	}
}