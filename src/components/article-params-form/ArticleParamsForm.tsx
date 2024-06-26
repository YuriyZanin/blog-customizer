import { ArrowButton } from 'components/arrow-button';
import { Text } from 'components/text';
import { Button } from 'components/button';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import { FormEvent, useRef, useState } from 'react';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import {
	ArticleStateType,
	OptionType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { Separator } from '../separator';
import { useClose } from 'src/hooks/useClose';

type ArticleParamsFormProps = {
	callback: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ callback }: ArticleParamsFormProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [state, setState] = useState<ArticleStateType>(defaultArticleState);
	const formRef = useRef<HTMLFormElement | null>(null);

	const handleClose = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	useClose({
		isOpen: isMenuOpen,
		onClose: handleClose,
		rootRef: formRef,
	});

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		callback(state);
	};

	const handleReset = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setState(defaultArticleState);
		callback(defaultArticleState);
	};

	return (
		<>
			<ArrowButton isOpen={isMenuOpen} onClick={handleClose} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isMenuOpen,
				})}>
				<form
					ref={formRef}
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text uppercase={true} weight={800} size={31}>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						selected={state.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(value: OptionType) => {
							setState({ ...state, fontFamilyOption: value });
						}}
					/>
					<RadioGroup
						title='Размер шрифта'
						name='fontSizeOption'
						options={fontSizeOptions}
						selected={state.fontSizeOption}
						onChange={(value: OptionType) => {
							setState({ ...state, fontSizeOption: value });
						}}
					/>
					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={state.fontColor}
						onChange={(value: OptionType) => {
							setState({ ...state, fontColor: value });
						}}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={state.backgroundColor}
						onChange={(value: OptionType) => {
							setState({ ...state, backgroundColor: value });
						}}
					/>
					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={state.contentWidth}
						onChange={(value: OptionType) => {
							setState({ ...state, contentWidth: value });
						}}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
