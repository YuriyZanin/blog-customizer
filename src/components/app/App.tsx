import { useState, CSSProperties } from 'react';

import {
	ArticleStateType,
	defaultArticleState,
} from '../../constants/articleProps';
import { Article } from '../article';
import { ArticleParamsForm } from '../article-params-form';

import styles from './App.module.scss';

export const App = () => {
	const [state, setState] = useState<ArticleStateType>(defaultArticleState);

	return (
		<main>
			<div
				className={styles.main}
				style={
					{
						'--font-family': state.fontFamilyOption.value,
						'--font-size': state.fontSizeOption.value,
						'--font-color': state.fontColor.value,
						'--container-width': state.contentWidth.value,
						'--bg-color': state.backgroundColor.value,
					} as CSSProperties
				}>
				<ArticleParamsForm callback={setState} />
				<Article />
			</div>
		</main>
	);
};
