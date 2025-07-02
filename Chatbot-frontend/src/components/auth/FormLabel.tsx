import { ChangeEvent } from "react";

import styles from "./FormLabel.module.css";

type Props = {
	className?: string;
	htmlFor: string;
	label: string;
	type: string;
	id: string;
	required: boolean;
	maxLength: number;
	minLength: number;
	value?: string;
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
	inputPH?: string;
	labelPH?: string;
    name:string
};

const FormLabel = (props: Props) => {
	return (
		<div className="form-group">
			<label 
				htmlFor={props.htmlFor} 
				className="block text-white text-sm font-medium mb-2"
			>
				{props.label}
			</label>
			<input
				type={props.type}
				id={props.id}
                name={props.name}
				required={props.required}
				maxLength={props.maxLength}
				minLength={props.minLength}
				value={props.value}
				onChange={props.onChange}
				placeholder={props.inputPH}
				className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 
				  text-white placeholder-gray-400 focus:outline-none focus:border-[#00ffff] 
				  focus:ring-1 focus:ring-[#00ffff] transition-colors duration-300"
			/>
		</div>
	);
};

export default FormLabel;
