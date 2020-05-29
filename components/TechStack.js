import { tech } from '../info.js'
import styles from './TechStack.module.css'


export default function TechStack() {
	let tech_items = [];

	for (let lang in tech) {
		tech_items.push(
		<div className={styles["tech-item"]} key={lang}>
			<div className={styles["tech-logo"]} style={{
				backgroundImage: `url('/imgs/${tech[lang]}')`
			}}></div>
			<div className={styles["tech-name"]}>{lang}</div>
		</div>);
	}

	return (
		<div className={styles["tech-cont"]}>
			{tech_items}
		</div>
	);
}
